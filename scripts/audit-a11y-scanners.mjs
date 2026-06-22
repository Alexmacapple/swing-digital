#!/usr/bin/env node
import fs from 'node:fs/promises';
import fsSync from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';
import { chromium } from '@playwright/test';
import lighthouse from 'lighthouse';
import { launch as launchChrome } from 'chrome-launcher';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

const DEFAULT_PUBLIC_BASE = 'https://swing.appmiweb.com';
const DEFAULT_PORT = 8792;
const DEFAULT_STANDARD = 'WCAG2AA';
const PA11Y_PACKAGE = 'pa11y@9.1.1';
const HTMLCS_PACKAGE = 'html_codesniffer@2.5.1';

function usage() {
    console.log(`Usage : npm run a11y:scanners -- [options]

Options :
  --root <dir>           Dossier servi localement, défaut : dist
  --sitemap <file>       Sitemap à parcourir, défaut : <root>/sitemap.xml
  --out <dir>            Dossier de sortie, défaut : reports/swing-digital/YYYY-MM-DD-second-scanners
  --public-base <url>    Base publique pour les rapports, défaut : ${DEFAULT_PUBLIC_BASE}
  --base <url>           Serveur déjà lancé, ex. http://127.0.0.1:8792
  --port <number>        Port du serveur local auto-lancé, défaut : ${DEFAULT_PORT}
  --standard <name>      Standard HTMLCS/Pa11y, défaut : ${DEFAULT_STANDARD}
  --skip-pa11y           Ignore Pa11y
  --skip-htmlcs          Ignore HTML_CodeSniffer
  --skip-lighthouse      Ignore Lighthouse
  --help                 Affiche cette aide
`);
}

function parseArgs(argv) {
    const today = new Date().toISOString().slice(0, 10);
    const options = {
        root: 'dist',
        sitemap: null,
        out: path.join('reports', 'swing-digital', `${today}-second-scanners`),
        publicBase: DEFAULT_PUBLIC_BASE,
        base: null,
        port: DEFAULT_PORT,
        standard: DEFAULT_STANDARD,
        skipPa11y: false,
        skipHtmlcs: false,
        skipLighthouse: false,
        help: false
    };

    for (let index = 0; index < argv.length; index += 1) {
        const arg = argv[index];
        const next = () => {
            const value = argv[index + 1];
            if (!value || value.startsWith('--')) {
                throw new Error(`Option ${arg} sans valeur.`);
            }
            index += 1;
            return value;
        };

        if (arg === '--root') options.root = next();
        else if (arg === '--sitemap') options.sitemap = next();
        else if (arg === '--out') options.out = next();
        else if (arg === '--public-base') options.publicBase = next();
        else if (arg === '--base') options.base = next().replace(/\/+$/, '');
        else if (arg === '--port') options.port = Number.parseInt(next(), 10);
        else if (arg === '--standard') options.standard = next();
        else if (arg === '--skip-pa11y') options.skipPa11y = true;
        else if (arg === '--skip-htmlcs') options.skipHtmlcs = true;
        else if (arg === '--skip-lighthouse') options.skipLighthouse = true;
        else if (arg === '--help' || arg === '-h') options.help = true;
        else throw new Error(`Option inconnue : ${arg}`);
    }

    if (!Number.isInteger(options.port) || options.port < 1 || options.port > 65535) {
        throw new Error(`Port invalide : ${options.port}`);
    }

    options.root = path.resolve(repoRoot, options.root);
    options.sitemap = path.resolve(repoRoot, options.sitemap || path.join(options.root, 'sitemap.xml'));
    options.out = path.resolve(repoRoot, options.out);
    options.publicBase = options.publicBase.replace(/\/+$/, '');

    return options;
}

function execFile(command, args, options = {}) {
    return new Promise((resolve, reject) => {
        const child = spawn(command, args, {
            cwd: options.cwd || repoRoot,
            env: process.env,
            stdio: ['ignore', 'pipe', 'pipe']
        });
        let stdout = '';
        let stderr = '';
        let timedOut = false;
        const timeout = options.timeoutMs
            ? setTimeout(() => {
                timedOut = true;
                child.kill('SIGTERM');
            }, options.timeoutMs)
            : null;

        child.stdout.on('data', (chunk) => {
            stdout += chunk;
        });
        child.stderr.on('data', (chunk) => {
            stderr += chunk;
        });
        child.on('error', reject);
        child.on('close', (code) => {
            if (timeout) clearTimeout(timeout);
            const result = { code, stdout, stderr };
            if (timedOut) {
                reject(Object.assign(new Error(`${command} a dépassé ${options.timeoutMs} ms.`), result));
                return;
            }
            if (code !== 0 && !options.acceptNonZero) {
                reject(Object.assign(new Error(`${command} ${args.join(' ')} a échoué avec le code ${code}.`), result));
                return;
            }
            resolve(result);
        });
    });
}

async function waitForServer(baseUrl, timeoutMs = 15000) {
    const startedAt = Date.now();
    let lastError = null;

    while (Date.now() - startedAt < timeoutMs) {
        try {
            const response = await fetch(`${baseUrl}/`, { method: 'HEAD' });
            if (response.ok || response.status < 500) return;
        } catch (error) {
            lastError = error;
        }
        await new Promise((resolve) => setTimeout(resolve, 250));
    }

    throw new Error(`Serveur local indisponible sur ${baseUrl}. Dernière erreur : ${lastError?.message || 'inconnue'}`);
}

async function startLocalServer(options) {
    if (options.base) {
        await waitForServer(options.base);
        return { baseUrl: options.base, stop: async () => {} };
    }

    const baseUrl = `http://127.0.0.1:${options.port}`;
    const child = spawn('python3', ['scripts/serve-test.py', String(options.port), options.root], {
        cwd: repoRoot,
        stdio: ['ignore', 'ignore', 'ignore']
    });

    await waitForServer(baseUrl);

    return {
        baseUrl,
        stop: async () => {
            if (child.exitCode !== null) return;
            child.kill('SIGTERM');
            await new Promise((resolve) => child.once('close', resolve));
        }
    };
}

async function readSitemapUrls(options, baseUrl) {
    const sitemap = await fs.readFile(options.sitemap, 'utf8');
    const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].trim());

    if (locs.length === 0) {
        throw new Error(`Aucune URL trouvée dans ${options.sitemap}`);
    }

    return locs.map((publicUrl) => {
        const parsed = new URL(publicUrl);
        const pathname = parsed.pathname || '/';
        const search = parsed.search || '';
        return {
            path: `${pathname}${search}`,
            publicUrl: `${options.publicBase}${pathname}${search}`,
            localUrl: `${baseUrl}${pathname}${search}`
        };
    });
}

function countByType(items, typeGetter) {
    return items.reduce((counts, item) => {
        const type = typeGetter(item) || 'unknown';
        counts[type] = (counts[type] || 0) + 1;
        return counts;
    }, {});
}

function aggregateTypeCounts(results, fieldName) {
    return results.reduce((counts, result) => {
        const source = result[fieldName] || {};
        for (const [type, count] of Object.entries(source)) {
            counts[type] = (counts[type] || 0) + count;
        }
        return counts;
    }, {});
}

function topCodes(results, messagesField) {
    const byCode = new Map();

    for (const result of results) {
        for (const message of result[messagesField] || []) {
            const code = message.code || 'sans-code';
            const existing = byCode.get(code) || {
                code,
                count: 0,
                message: message.message || '',
                pages: new Set()
            };
            existing.count += 1;
            existing.pages.add(result.path);
            byCode.set(code, existing);
        }
    }

    return [...byCode.values()]
        .sort((left, right) => right.count - left.count)
        .slice(0, 12)
        .map((entry) => ({
            code: entry.code,
            count: entry.count,
            message: entry.message,
            pages: [...entry.pages].slice(0, 8)
        }));
}

async function getPa11yVersion() {
    try {
        const result = await execFile('npx', ['--yes', PA11Y_PACKAGE, '--version'], {
            timeoutMs: 120000,
            acceptNonZero: true
        });
        return result.stdout.trim() || null;
    } catch {
        return null;
    }
}

async function runPa11y(urls, options) {
    const version = await getPa11yVersion();
    const results = [];

    for (const target of urls) {
        const startedAt = Date.now();
        console.log(`[Pa11y] ${target.path}`);
        const result = await execFile('npx', [
            '--yes',
            PA11Y_PACKAGE,
            target.localUrl,
            '--standard',
            options.standard,
            '--include-warnings',
            '--include-notices',
            '--reporter',
            'json'
        ], {
            timeoutMs: 120000,
            acceptNonZero: true
        });

        let payload;
        try {
            payload = JSON.parse(result.stdout);
        } catch (error) {
            throw new Error(`JSON Pa11y invalide pour ${target.path} : ${error.message}\n${result.stderr}`);
        }

        const issues = Array.isArray(payload) ? payload : payload.issues || [];
        results.push({
            ...target,
            tool: 'Pa11y',
            version,
            standard: options.standard,
            durationMs: Date.now() - startedAt,
            issueCount: issues.length,
            countsByType: countByType(issues, (issue) => issue.type),
            issues
        });
    }

    return results;
}

async function loadHtmlcsSource() {
    const localCandidates = [
        path.join(repoRoot, 'node_modules', 'html_codesniffer', 'build', 'HTMLCS.js'),
        path.join(repoRoot, 'node_modules', 'html_codesniffer', 'HTMLCS.js')
    ];

    for (const candidate of localCandidates) {
        if (fsSync.existsSync(candidate)) {
            return {
                source: await fs.readFile(candidate, 'utf8'),
                version: await readHtmlcsVersion(path.dirname(path.dirname(candidate))),
                cleanup: async () => {}
            };
        }
    }

    const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'swing-htmlcs-'));
    const pack = await execFile('npm', ['pack', HTMLCS_PACKAGE, '--silent', '--pack-destination', tmpDir], {
        timeoutMs: 120000
    });
    const tarball = pack.stdout.trim().split(/\r?\n/).filter(Boolean).pop();
    if (!tarball) {
        throw new Error(`Impossible de récupérer ${HTMLCS_PACKAGE}.`);
    }

    await execFile('tar', ['-xzf', path.join(tmpDir, tarball), '-C', tmpDir], {
        timeoutMs: 30000
    });

    const packageDir = path.join(tmpDir, 'package');
    const htmlcsPath = path.join(packageDir, 'build', 'HTMLCS.js');

    return {
        source: await fs.readFile(htmlcsPath, 'utf8'),
        version: await readHtmlcsVersion(packageDir),
        cleanup: async () => {
            await fs.rm(tmpDir, { recursive: true, force: true });
        }
    };
}

async function readHtmlcsVersion(packageDir) {
    try {
        const packageJson = JSON.parse(await fs.readFile(path.join(packageDir, 'package.json'), 'utf8'));
        return packageJson.version || null;
    } catch {
        return null;
    }
}

function typeLabelFromHtmlcs(type) {
    if (type === 1) return 'error';
    if (type === 2) return 'warning';
    if (type === 3) return 'notice';
    return 'unknown';
}

async function runHtmlcs(urls, options) {
    const htmlcs = await loadHtmlcsSource();
    const browser = await chromium.launch();
    const results = [];

    try {
        for (const target of urls) {
            const startedAt = Date.now();
            console.log(`[HTMLCS] ${target.path}`);
            const page = await browser.newPage();
            try {
                await page.goto(target.localUrl, { waitUntil: 'domcontentloaded', timeout: 60000 });
                await page.waitForLoadState('load', { timeout: 20000 }).catch(() => {});
                await page.waitForTimeout(750);
                await page.addScriptTag({ content: htmlcs.source });
                const messages = await page.evaluate(async (standard) => {
                    function wait(ms) {
                        return new Promise((resolve) => setTimeout(resolve, ms));
                    }

                    function safeText(element) {
                        const text = element?.innerText || element?.textContent || '';
                        return text.replace(/\s+/g, ' ').trim().slice(0, 240);
                    }

                    function selectorFor(element) {
                        if (!element || element.nodeType !== Node.ELEMENT_NODE) return null;
                        const parts = [];
                        let current = element;

                        while (current && current.nodeType === Node.ELEMENT_NODE) {
                            let part = current.localName;
                            if (!part) break;

                            if (current.id && typeof CSS !== 'undefined' && typeof CSS.escape === 'function') {
                                part += `#${CSS.escape(current.id)}`;
                                parts.unshift(part);
                                break;
                            }

                            const parent = current.parentElement;
                            if (parent) {
                                const sameTag = Array.from(parent.children).filter((child) => child.localName === current.localName);
                                if (sameTag.length > 1) {
                                    part += `:nth-of-type(${sameTag.indexOf(current) + 1})`;
                                }
                            }

                            parts.unshift(part);
                            if (current === document.documentElement) break;
                            current = parent;
                        }

                        return parts.join(' > ') || null;
                    }

                    function serializeElement(node) {
                        if (!node || node.nodeType !== Node.ELEMENT_NODE || typeof node.getAttribute !== 'function') {
                            return null;
                        }

                        return {
                            tagName: node.tagName || null,
                            id: node.getAttribute('id'),
                            className: typeof node.className === 'string' ? node.className : '',
                            text: safeText(node)
                        };
                    }

                    if (window.HTMLCS_RUNNER && typeof window.HTMLCS_RUNNER.run === 'function') {
                        window.HTMLCS_RUNNER.run(standard);
                        await wait(3000);
                    } else if (window.HTMLCS && typeof window.HTMLCS.process === 'function') {
                        await new Promise((resolve) => {
                            window.HTMLCS.process(standard, document, resolve);
                        });
                        await wait(100);
                    } else {
                        throw new Error('HTML_CodeSniffer non disponible dans la page.');
                    }

                    const rawMessages = window.HTMLCS?.getMessages ? window.HTMLCS.getMessages() : [];
                    return rawMessages.map((message) => ({
                        type: message.type,
                        typeLabel: message.type === 1 ? 'error' : message.type === 2 ? 'warning' : message.type === 3 ? 'notice' : 'unknown',
                        code: message.code || null,
                        message: message.msg || message.message || '',
                        selector: selectorFor(message.element),
                        element: serializeElement(message.element)
                    }));
                }, options.standard);

                results.push({
                    ...target,
                    tool: 'HTML_CodeSniffer',
                    version: htmlcs.version,
                    standard: options.standard,
                    durationMs: Date.now() - startedAt,
                    messageCount: messages.length,
                    countsByType: countByType(messages, (message) => message.typeLabel || typeLabelFromHtmlcs(message.type)),
                    messages
                });
            } finally {
                await page.close();
            }
        }
    } finally {
        await browser.close();
        await htmlcs.cleanup();
    }

    return results;
}

async function runLighthouse(urls) {
    const chrome = await launchChrome({
        chromeFlags: ['--headless=new', '--disable-gpu', '--no-sandbox']
    });
    const results = [];

    try {
        for (const target of urls) {
            const startedAt = Date.now();
            console.log(`[Lighthouse] ${target.path}`);
            const result = await lighthouse(target.localUrl, {
                port: chrome.port,
                onlyCategories: ['accessibility'],
                output: 'json',
                logLevel: 'error'
            });

            const lhr = result.lhr;
            const accessibility = lhr.categories.accessibility;
            const failedAudits = Object.values(lhr.audits)
                .filter((audit) => audit.scoreDisplayMode === 'binary' && audit.score === 0)
                .map((audit) => ({
                    id: audit.id,
                    title: audit.title,
                    description: audit.description,
                    score: audit.score
                }));

            results.push({
                ...target,
                tool: 'Lighthouse',
                version: lhr.lighthouseVersion || null,
                durationMs: Date.now() - startedAt,
                score: Math.round((accessibility.score || 0) * 100),
                failedAuditCount: failedAudits.length,
                failedAudits
            });
        }
    } finally {
        await chrome.kill();
    }

    return results;
}

function lighthouseSummary(results) {
    if (results.length === 0) return null;
    const scores = results.map((result) => result.score);
    return {
        pages: results.length,
        minScore: Math.min(...scores),
        maxScore: Math.max(...scores),
        failedAuditPages: results.filter((result) => result.failedAuditCount > 0).length,
        failedAudits: results.reduce((total, result) => total + result.failedAuditCount, 0)
    };
}

function writeTopCodesSection(title, entries) {
    if (entries.length === 0) {
        return `## ${title}\n\nAucun message.\n`;
    }

    const lines = [`## ${title}`, ''];
    for (const entry of entries) {
        lines.push(`- ${entry.count} x \`${entry.code}\` — ${entry.message}`);
        lines.push(`  Pages : ${entry.pages.join(', ')}`);
    }
    lines.push('');
    return lines.join('\n');
}

function buildMarkdownReport(summary, raw) {
    const pa11yCounts = summary.pa11ySummary || {};
    const htmlcsCounts = summary.htmlcsSummary || {};
    const lighthouse = summary.lighthouseSummary;
    const scoreText = lighthouse
        ? `${lighthouse.minScore}-${lighthouse.maxScore}/100`
        : 'non lancé';

    return `# Audit complémentaire scanners accessibilité

Date : ${summary.generatedAt.slice(0, 10)}
Cible : build local \`${summary.localBase}\`
Périmètre : ${summary.urls.length} URL du sitemap local
Référentiel scanner : ${summary.standard}, à rapprocher du RGAA 4.1.2 avec prudence.

## Résumé exécutif

- Pa11y ${summary.pa11yVersion || 'non lancé'} : ${pa11yCounts.error || 0} erreurs, ${pa11yCounts.warning || 0} avertissements, ${pa11yCounts.notice || 0} vérifications manuelles.
- HTML_CodeSniffer ${summary.htmlcsVersion || 'non lancé'} : ${htmlcsCounts.error || 0} erreurs, ${htmlcsCounts.warning || 0} avertissements, ${htmlcsCounts.notice || 0} vérifications manuelles.
- Lighthouse ${summary.lighthouseVersion || 'non lancé'} accessibilité : score ${scoreText}, ${lighthouse?.failedAuditPages || 0} page(s) avec audit échoué.

Important : ces scanners ne couvrent pas les 108 critères RGAA. Ils détectent une partie automatisable des critères WCAG/RGAA et remontent aussi de nombreuses vérifications manuelles à confirmer ou invalider humainement.

## Pages avec erreurs bloquantes scanner

- Pa11y : ${raw.pa11y.filter((result) => (result.countsByType.error || 0) > 0).map((result) => result.path).join(', ') || 'aucune erreur automatique'}.
- HTML_CodeSniffer : ${raw.htmlcs.filter((result) => (result.countsByType.error || 0) > 0).map((result) => result.path).join(', ') || 'aucune erreur automatique'}.
- Lighthouse : ${raw.lighthouse.filter((result) => result.failedAuditCount > 0).map((result) => result.path).join(', ') || 'aucun audit automatique échoué'}.

${writeTopCodesSection('Top codes Pa11y', topCodes(raw.pa11y, 'issues'))}
${writeTopCodesSection('Top codes HTML_CodeSniffer', topCodes(raw.htmlcs, 'messages'))}
## Audits Lighthouse échoués

${raw.lighthouse.flatMap((result) => result.failedAudits.map((audit) => `- ${result.path} : \`${audit.id}\` — ${audit.title}`)).join('\n') || 'Aucun audit automatique échoué.'}

## Fichiers bruts

- \`raw/pa11y.json\`
- \`raw/htmlcs.json\`
- \`raw/lighthouse.json\`

## Limites

- Pas un audit RGAA complet à lui seul : absence de vérification humaine des alternatives pertinentes, cohérence éditoriale, ordre de lecture réel, restitution lecteur d’écran, compréhension des contenus, etc.
- Les notices Pa11y et HTML_CodeSniffer sont massivement des demandes de contrôle manuel, pas des non-conformités confirmées.
- Le site utilise des vidéos, iframes et sections immersives : certaines règles nécessitent inspection clavier et lecteur d’écran réels.
`;
}

async function writeReports(options, localBase, urls, raw) {
    await fs.mkdir(path.join(options.out, 'raw'), { recursive: true });

    const pa11ySummary = aggregateTypeCounts(raw.pa11y, 'countsByType');
    const htmlcsSummary = aggregateTypeCounts(raw.htmlcs, 'countsByType');
    const lighthouse = lighthouseSummary(raw.lighthouse);
    const generatedAt = new Date().toISOString();

    const summary = {
        generatedAt,
        localBase,
        publicBase: options.publicBase,
        standard: options.standard,
        urls,
        pa11yVersion: raw.pa11y.find((result) => result.version)?.version || null,
        htmlcsVersion: raw.htmlcs.find((result) => result.version)?.version || null,
        lighthouseVersion: raw.lighthouse.find((result) => result.version)?.version || null,
        pa11ySummary,
        htmlcsSummary,
        lighthouseSummary: lighthouse
    };

    await fs.writeFile(path.join(options.out, 'raw', 'pa11y.json'), JSON.stringify(raw.pa11y, null, 2));
    await fs.writeFile(path.join(options.out, 'raw', 'htmlcs.json'), JSON.stringify(raw.htmlcs, null, 2));
    await fs.writeFile(path.join(options.out, 'raw', 'lighthouse.json'), JSON.stringify(raw.lighthouse, null, 2));
    await fs.writeFile(path.join(options.out, 'summary.json'), JSON.stringify(summary, null, 2));
    await fs.writeFile(
        path.join(options.out, `AUDIT-SCANNERS-A11Y-${generatedAt.slice(0, 10)}.md`),
        buildMarkdownReport(summary, raw)
    );

    return summary;
}

async function main() {
    let options;
    try {
        options = parseArgs(process.argv.slice(2));
    } catch (error) {
        console.error(`[ERREUR] ${error.message}`);
        usage();
        process.exitCode = 1;
        return;
    }

    if (options.help) {
        usage();
        return;
    }

    if (!fsSync.existsSync(options.root)) {
        throw new Error(`Dossier à servir introuvable : ${options.root}`);
    }
    if (!fsSync.existsSync(options.sitemap)) {
        throw new Error(`Sitemap introuvable : ${options.sitemap}`);
    }

    const server = await startLocalServer(options);
    try {
        const urls = await readSitemapUrls(options, server.baseUrl);
        console.log(`[A11Y] ${urls.length} URL à scanner depuis ${server.baseUrl}`);

        const raw = {
            pa11y: options.skipPa11y ? [] : await runPa11y(urls, options),
            htmlcs: options.skipHtmlcs ? [] : await runHtmlcs(urls, options),
            lighthouse: options.skipLighthouse ? [] : await runLighthouse(urls)
        };

        const summary = await writeReports(options, server.baseUrl, urls, raw);
        console.log(`[A11Y] Rapport écrit dans ${path.relative(repoRoot, options.out)}`);
        console.log(`[A11Y] Pa11y : ${summary.pa11ySummary.error || 0} erreurs, ${summary.pa11ySummary.warning || 0} avertissements, ${summary.pa11ySummary.notice || 0} notices`);
        console.log(`[A11Y] HTMLCS : ${summary.htmlcsSummary.error || 0} erreurs, ${summary.htmlcsSummary.warning || 0} avertissements, ${summary.htmlcsSummary.notice || 0} notices`);
        if (summary.lighthouseSummary) {
            console.log(`[A11Y] Lighthouse : ${summary.lighthouseSummary.minScore}-${summary.lighthouseSummary.maxScore}/100`);
        }
    } finally {
        await server.stop();
    }
}

main().catch((error) => {
    console.error(`[ERREUR] ${error.stack || error.message}`);
    process.exitCode = 1;
});
