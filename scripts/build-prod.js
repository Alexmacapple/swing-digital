#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const srcDir = path.join(root, 'src');
const distDir = path.join(root, 'dist');

const excludedRootFiles = new Set([
    'CLAUDE.md',
    'README.md',
    'ROADMAP.md',
    'todo.md',
    'generated-pages.html',
    'maquette-site.pdf',
]);

const excludedDirs = new Set([
    'pages-extracted',
]);

const excludedNames = new Set([
    '.DS_Store',
    '.gitkeep',
    'Thumbs.db',
]);

function shouldSkip(relativePath, dirent) {
    const parts = relativePath.split(path.sep);

    if (excludedNames.has(dirent.name)) {
        return true;
    }

    if (parts.some((part) => excludedDirs.has(part))) {
        return true;
    }

    if (parts.length === 1 && excludedRootFiles.has(dirent.name)) {
        return true;
    }

    return false;
}

function copyTree(fromDir, toDir, baseDir, manifest) {
    fs.mkdirSync(toDir, { recursive: true });

    for (const dirent of fs.readdirSync(fromDir, { withFileTypes: true })) {
        const source = path.join(fromDir, dirent.name);
        const relative = path.relative(baseDir, source);
        const target = path.join(toDir, dirent.name);

        if (shouldSkip(relative, dirent)) {
            manifest.excluded.push(relative);
            continue;
        }

        if (dirent.isDirectory()) {
            copyTree(source, target, baseDir, manifest);
            continue;
        }

        if (!dirent.isFile()) {
            manifest.excluded.push(relative);
            continue;
        }

        fs.copyFileSync(source, target);
        manifest.files.push(relative);
        manifest.bytes += fs.statSync(source).size;
    }
}

function buildProd() {
    if (!fs.existsSync(srcDir)) {
        throw new Error(`Répertoire source introuvable : ${srcDir}`);
    }

    fs.rmSync(distDir, { recursive: true, force: true });

    const manifest = {
        files: [],
        excluded: [],
        bytes: 0,
    };

    copyTree(srcDir, distDir, srcDir, manifest);
    return manifest;
}

if (require.main === module) {
    const manifest = buildProd();
    console.log(`Build production OK : ${manifest.files.length} fichier(s) copiés dans dist/`);
    console.log(`${manifest.excluded.length} artefact(s) exclu(s)`);
}

module.exports = {
    buildProd,
    distDir,
    srcDir,
};
