# Version EN — glossaire et routes

Ce document fixe le vocabulaire visible et la correspondance des 29 pages
françaises vers leur version anglaise locale. Les URLs anglaises sont regroupées
sous `/en/` et conservent les mêmes noms de fichiers afin de limiter les
risques de rupture des médias et des liens internes.

## Glossaire éditorial

| Français | Anglais retenu | Règle |
| --- | --- | --- |
| expériences immersives | immersive experiences | Forme générique du site |
| espaces augmentés | augmented spaces | Catégorie XR, jamais « increased spaces » |
| réalité mixte | mixed reality | « XR » reste inchangé dans les noms de catégorie |
| spectacle vivant | live performance | Contexte artistique |
| création sonore | sound creation | Texte institutionnel |
| récit audiovisuel | audiovisual storytelling | Films et formats |
| transcription | transcript | Boutons et panneaux média |
| lire la transcription | read the transcript | Libellé d’action |
| réservation | booking | La page reste informative et non transactionnelle |
| plan du site | sitemap | Navigation et SEO |
| mentions légales | legal notice | Page réglementaire |

## Correspondance des routes

Chaque fichier ci-dessous est servi depuis `src/en/` et possède un lien
`hreflang="fr"` réciproque vers la source française.

- `/en/` et `/en/404.html`
- `/en/charlotte-henschel.html`, `/en/dessine-moi-le-vent.html`
- `/en/espaces-augmentes.html`, `/en/experience-monroe.html`
- `/en/experiences-series.html`, `/en/films.html`
- `/en/for-ai/index.html`, `/en/marilyn.html`
- `/en/memory-box-vr.html`, `/en/mentions-legales.html`
- `/en/monroe-composition.html`, `/en/monroe-experiences.html`
- `/en/monroe-installation.html`, `/en/monroe-interviews.html`
- `/en/monroe-photographie.html`, `/en/monroe-piece.html`
- `/en/monroe-podcasts.html`, `/en/monroe-quiz.html`
- `/en/monroe-roman-graphique.html`, `/en/ni-vues-ni-connues.html`
- `/en/plan-du-site.html`, `/en/reservations.html`
- `/en/serie-marilyn.html`, `/en/the-party.html`
- `/en/toulouse-lautrec.html`, `/en/voyage-autour-de-moi.html`
- `/en/xr-corporate.html`

Le test `tests/en-site.spec.js` est l’oracle de cette carte et vérifie aussi
la conservation du nombre de blocs de transcription entre les deux langues.
