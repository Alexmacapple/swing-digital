# RETEX à Loïc — Swing Digital SEO/GEO préproduction

Date : 2026-06-21  
Contexte : audit SEO/GEO de `https://swing.appmiweb.com/#page-1`, préparation production finale et usage du skill `seo-geo-growth-agent`.

## Message court

La préproduction Swing Digital est saine côté crawl et lisibilité agent, mais elle n'est pas encore prête pour la production finale. Les blocages ne sont pas des bugs de rendu majeurs : ce sont surtout des décisions de lancement à verrouiller, la mesure propriétaire à préparer et une vigilance sur les URL canoniques.

## À dire à Loïc en priorité

1. Le crawl public est propre : `npm run appmiweb:search-crawl` passe avec `0 écart` sur `24 URL sitemap contrôlées`.
2. Le preflight préproduction passe, mais avec 3 avertissements attendus : hébergeur légal manquant, CTA Réservations désactivés, billetterie annoncée comme bientôt disponible.
3. Les endpoints IA existent et répondent : `/llms.txt`, `/for-ai`, `/for-ai.json`, `/for-ai.txt`.
4. L'URL `https://swing.appmiweb.com/#page-1` ne doit pas devenir une URL SEO ou de partage : la capture arrive sur Contact avec une grande zone rouge, pas sur la promesse principale.
5. La bonne URL de référence reste `https://swing.appmiweb.com/`, puis le futur domaine final HTTPS.
6. Les métriques SEO/GEO réelles restent `unknown` tant qu'on n'a pas GSC, GA4/GTM, Bing Webmaster, logs serveur et événements de conversion.
7. Le backlog production finale est inscrit dans `todo.md`.

## Décisions à demander

- Quel est le domaine final HTTPS ?
- Quel est l'hébergeur légal réel à afficher dans les mentions légales ?
- Réservations doit-elle rester informative ou devenir transactionnelle ?
- Quelle stack de mesure est retenue : GA4 direct, GTM, autre outil ou mesure différée ?
- Qui valide la politique de publication des fichiers IA et des claims citables ?

## Points à ne pas sur-vendre

- Ne pas dire que le site est prêt production finale.
- Ne pas annoncer de trafic, CTR, positions, citations IA ou conversions : aucune donnée propriétaire ne le prouve encore.
- Ne pas traiter `llms.txt` comme un facteur de ranking Google.
- Ne pas corriger le lazy-load si les images chargent après scroll : l'audit actuel ne montre pas d'image cassée après exposition.

## Points outil à remonter à Loïc

- `run_full_audit.py` est plus fiable avec un `--output-dir` absolu ; le chemin relatif a provoqué un premier échec trompeur.
- Le validateur du rapport a besoin d'un `screenshot_status` explicite même quand les captures existent.
- Le résumé généré automatiquement peut rester trop générique ou en anglais si aucun `audit.json` enrichi n'est fourni.
- `generate_html_audit_report.py` émet un `SyntaxWarning` sur une séquence d'échappement JavaScript.
- Certains scripts utilisent encore un User-Agent interne `seo-geo-growth-agent/1.2` alors que le skill installé est en `1.3.1`.

## Artefacts à pointer

- Backlog production : `todo.md`
- Rapport audit page fragmentée : `reports/swing-digital/2026-06-21-seo-geo-audit-page-1-full/index.html`
- Validation du rapport : `reports/swing-digital/2026-06-21-seo-geo-audit-page-1-full/report-validation.json`
- Rapport Loïc précédent : `reports/swing-digital/2026-06-21-seo-geo-audit-loic-handoff/index.html`

## Phrase de conclusion proposée

Le bon statut est : préproduction techniquement saine, production finale encore gated. On peut continuer à durcir GEO/Citation et qualité agent, mais on ne doit pas lancer la prod tant que domaine final, mentions légales, Réservations et mesure réelle ne sont pas verrouillés.
