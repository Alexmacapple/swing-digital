# PRD-010 : Transcripts accessibles des vidéos publiques

**Statut** : Cadré, implémentation à planifier
**Date** : 2026-06-21
**Auteur** : Alex
**Source** : Conversation, inventaire des liens vidéo publics et référence WAI-ARIA APG Disclosure

---

## Vision

Le quoi : chaque vidéo publique Swing Digital concernée doit disposer d'une transcription textuelle corrigée, publiée à proximité immédiate du média ou du lien vidéo dans un disclosure accessible.

Le pourquoi : une vidéo externe intégrée ou liée ne suffit pas à rendre le contenu multimédia accessible. Le mécanisme utile est double : extraire l'audio pour produire une base textuelle, puis publier cette transcription comme alternative adjacente, actionnable au clavier et compréhensible par les technologies d'assistance. Cela améliore l'accès au contenu pour les personnes sourdes, malentendantes, non disponibles pour l'écoute audio, ainsi que la lisibilité SEO/GEO sans inventer de métriques.

Le comment : renvoyé au Plan d'implémentation.

## Exemple bout-en-bout (projeté)

Le crawl public confirme six vidéos publiques à traiter :

```txt
https://www.youtube.com/watch?v=Le2Ybd_X6A0
https://www.youtube.com/watch?v=0YDIZeBbYL0
https://vimeo.com/250420667
https://vimeo.com/528291420
https://vimeo.com/782642139
https://vimeo.com/838300539
```

Le fichier `videos.txt` est créé à la racine avec ces six URL.

`yt-dlp` récupère les pistes audio dans `swing_audio/`, les fichiers vidéo de contrôle dans `swing_videos/` si nécessaire, et les sous-titres disponibles dans `swing_subtitles/`.

Whisper transcrit chaque MP3 en français avec le modèle `medium`, puis écrit les formats `.txt`, `.srt`, `.vtt`, `.json` et `.tsv` dans `transcripts/`.

Le transcript brut de chaque vidéo est corrigé avec le workflow `transcript` : sauvegarde du brut, correction de forme seulement, validation d'intégrité, rapport de corrections et signalement des passages incertains.

Le transcript final de la vidéo YouTube associée à Galerie Joseph est publié sur la page d'accueil, à proximité du lien public, sans dupliquer le même transcript pour chaque occurrence du même lien.

Le transcript final de `DESSINE-MOI LE VENT (teaser)` est publié sous la vidéo Vimeo de `dessine-moi-le-vent.html`.

Les transcripts des autres iframes publiques sont publiés sous leur vidéo respective : `voyage-autour-de-moi.html`, `monroe-piece.html`, `experience-monroe.html` et `monroe-podcasts.html`.

Chaque transcript est masqué par défaut dans un disclosure avec un bouton adjacent : état `aria-expanded="false"`, cible unique via `aria-controls`, panneau `hidden`, ouverture et fermeture au clic comme au clavier.

À l'ouverture, le bouton passe à `aria-expanded="true"` et le texte intégral devient lisible dans l'ordre oral d'origine.

Sans JavaScript, un fallback permet encore d'accéder au transcript.

Le build `dist/` publie les pages HTML enrichies, pas les fichiers audio ou vidéo de travail.

Les contrôles RGAA, SEO, préproduction et Playwright passent sans régression, après restauration du harnais de tests versionné.

---

## Contexte

Les pages publiques listées dans le plan du site exposent six URL vidéo externes confirmées dans le périmètre PRD-010 :

- `https://www.youtube.com/watch?v=Le2Ybd_X6A0`, depuis la page d'accueil, associé à Galerie Joseph ;
- `https://vimeo.com/250420667`, depuis `dessine-moi-le-vent.html`, pour le teaser `DESSINE-MOI LE VENT`.
- `https://vimeo.com/528291420`, depuis `voyage-autour-de-moi.html` ;
- `https://vimeo.com/782642139`, depuis `monroe-piece.html` ;
- `https://vimeo.com/838300539`, depuis `experience-monroe.html` ;
- `https://www.youtube.com/watch?v=0YDIZeBbYL0`, depuis `monroe-podcasts.html`.

Le site contient déjà un pattern disclosure en JavaScript (`button[aria-expanded][aria-controls]`) et une implémentation existante pour les citations presse de L'Expérience Monroe. Le nouveau composant doit réutiliser ce socle tout en évitant les fragilités connues : libellé trop spécifique aux citations, remplacement par `textContent` qui casserait d'éventuels enfants HTML, absence de fallback lisible sans JavaScript.

Le référentiel RGAA demande une transcription textuelle ou alternative pour les médias temporels pré-enregistrés quand c'est nécessaire, ainsi que la pertinence de cette alternative. Le WAI-ARIA APG décrit le pattern disclosure avec un bouton qui contrôle l'affichage d'un contenu et expose son état via `aria-expanded`.

---

## Problème

Les vidéos externes publiques ne disposent pas aujourd'hui d'une transcription textuelle publiée à proximité du média ou du lien qui les expose.

Cela crée quatre problèmes :

- accessibilité : le contenu oral ou sonore n'est pas disponible sous forme textuelle adjacente ;
- conformité : les critères RGAA multimédia ne peuvent pas être validés de manière robuste sans alternative textuelle pertinente ;
- qualité éditoriale : une transcription brute Whisper peut contenir des erreurs, hallucinations ou graphies instables ;
- exploitation : les fichiers audio, vidéo, sous-titres, transcripts bruts et transcripts corrigés doivent être distingués pour ne pas publier ou versionner des artefacts inutiles.

---

## Solution

Mettre en place une chaîne documentaire et technique en quatre couches :

1. inventorier les URL vidéo publiques à traiter, avec `videos.txt` comme source de départ ;
2. récupérer localement l'audio, les éventuels sous-titres et les vidéos de contrôle avec `yt-dlp`, sans versionner ces artefacts lourds ;
3. produire puis corriger des transcripts avec Whisper et le workflow `transcript`, en conservant les bruts, les audits et les incertitudes ;
4. publier les transcripts corrigés sous forme de disclosure accessible adjacent à chaque vidéo ou lien vidéo public concerné.

Le périmètre validé est :

```txt
https://www.youtube.com/watch?v=Le2Ybd_X6A0
https://www.youtube.com/watch?v=0YDIZeBbYL0
https://vimeo.com/250420667
https://vimeo.com/528291420
https://vimeo.com/782642139
https://vimeo.com/838300539
```

Le recroisement avec `src/*.html` a validé l'inclusion des autres iframes Vimeo ou YouTube publiques dans le même lot. Toute nouvelle vidéo découverte ultérieurement devra être ajoutée explicitement à `videos.txt` ou reportée dans un autre PRD.

---

## Options évaluées

### Option A (retenue) : transcripts corrigés publiés en disclosure adjacent

**Avantages** :
- répond directement au besoin RGAA de transcription textuelle accessible ;
- garde les vidéos chez YouTube/Vimeo sans auto-hébergement ni alourdissement du site ;
- s'intègre au pattern disclosure déjà présent dans le site ;
- améliore la lisibilité humaine et machine du contenu vidéo ;
- permet de publier un transcript éditorialement contrôlé, pas un brut STT.

**Inconvénients** :
- nécessite une passe de correction rigoureuse après Whisper ;
- ajoute du contenu HTML potentiellement long dans les pages ;
- demande des contrôles clavier, lecteur d'écran et responsive ;
- impose une gestion claire des artefacts locaux non versionnés.

### Option B : publier seulement les fichiers `.srt` ou `.vtt`

**Avantages** :
- utile pour le sous-titrage synchronisé ;
- conserve les timecodes ;
- peut être réutilisé par des lecteurs vidéo ou des workflows externes.

**Inconvénients** :
- ne garantit pas une transcription textuelle facilement lisible dans la page ;
- ne répond pas au besoin de disclosure adjacent demandé ;
- dépend du support des plateformes externes si les vidéos restent chez YouTube/Vimeo ;
- moins exploitable pour les lecteurs qui veulent parcourir le texte hors lecteur vidéo.

### Option C : page centralisée de transcripts

**Avantages** :
- limite la longueur des pages existantes ;
- facilite la maintenance d'un index unique des transcripts ;
- évite de dupliquer du texte si une même vidéo est référencée plusieurs fois.

**Inconvénients** :
- éloigne l'alternative du média, alors que le RGAA privilégie une alternative adjacente ou accessible via lien/bouton adjacent ;
- ajoute un détour de navigation ;
- risque d'être moins clair pour les utilisateurs de technologies d'assistance ;
- ne respecte pas la demande de publication sous chaque vidéo.

### Option D : télécharger et auto-héberger les vidéos avec sous-titres

**Avantages** :
- maîtrise complète du lecteur, des pistes de sous-titres et des fichiers ;
- possibilité d'intégrer directement des pistes `.vtt` dans un élément `<video>` ;
- indépendance accrue vis-à-vis des plateformes externes.

**Inconvénients** :
- questions de droits et de conditions d'utilisation à arbitrer avant publication ;
- poids important dans `dist/` et sur l'hébergement ;
- changement de stratégie média supérieur au besoin initial ;
- maintenance plus lourde pour une page vitrine statique.

---

## Décision

Retenir l'option A.

Les vidéos restent hébergées ou liées via leurs plateformes actuelles. Les fichiers récupérés par `yt-dlp` servent uniquement à la transcription et au contrôle local, sauf décision explicite de droits et d'hébergement.

Les transcripts corrigés sont publiés en HTML adjacent à chaque vidéo ou lien vidéo public concerné, dans un disclosure accessible inspiré du WAI-ARIA APG et contrôlé avec les critères RGAA multimédia.

Les fichiers `.srt` et `.vtt` restent des livrables utiles, mais secondaires. Ils ne remplacent pas la transcription textuelle visible dans la page.

---

## Plan d'implémentation

1. Créer ou confirmer `videos.txt` à la racine avec les six URL du périmètre validé.
2. Recroiser le périmètre avec `src/*.html`, `plan-du-site.html` et les iframes externes pour produire un inventaire daté des vidéos incluses, exclues ou reportées.
3. Ajouter ou vérifier des règles `.gitignore` pour exclure `swing_audio/`, `swing_videos/`, `swing_subtitles/` et les artefacts Whisper bruts si ceux-ci ne doivent pas être versionnés.
4. Vérifier localement la disponibilité de `yt-dlp`, `ffmpeg` et `whisper`, sans lancer de commande `sudo` depuis Codex.
5. Récupérer l'audio avec :

   ```bash
   mkdir -p swing_audio

   yt-dlp \
     -x --audio-format mp3 --audio-quality 0 \
     -o "swing_audio/%(title).200s [%(id)s].%(ext)s" \
     -a videos.txt
   ```

6. Récupérer les sous-titres disponibles avec :

   ```bash
   mkdir -p swing_subtitles

   yt-dlp \
     --write-subs --write-auto-subs \
     --sub-langs "fr,en.*" \
     --skip-download \
     -o "swing_subtitles/%(title).200s [%(id)s].%(ext)s" \
     -a videos.txt
   ```

7. Récupérer les fichiers vidéo uniquement si nécessaire au contrôle qualité, dans `swing_videos/`, sans les publier.
8. Transcrire les MP3 avec Whisper en français :

   ```bash
   mkdir -p transcripts

   for f in swing_audio/*.mp3; do
     whisper "$f" \
       --language French \
       --task transcribe \
       --model medium \
       --output_dir transcripts \
       --output_format all
   done
   ```

9. Pour chaque transcript brut, appliquer le workflow `transcript` en sortie Markdown structurée accessible, avec rapport d'audit séparé et sauvegarde du brut.
10. Conserver les corrections de forme uniquement : accents, ponctuation, graphies évidentes, passages `[inaudible]`; ne pas résumer, traduire, réordonner ou compléter les propos.
11. Créer un composant HTML de transcript avec titre explicite, bouton disclosure adjacent, panneau contrôlé par identifiant unique et fallback sans JavaScript.
12. Adapter `initDisclosure()` pour gérer des libellés génériques via un enfant de bouton dédié, sans détruire les icônes ou le balisage interne avec `textContent`.
13. Publier le transcript YouTube sur `src/index.html` à proximité de la première occurrence pertinente du lien Galerie Joseph ; les occurrences suivantes du même lien doivent pointer vers le même transcript ou rester sans duplication.
14. Publier le transcript Vimeo sous la vidéo principale de `src/dessine-moi-le-vent.html`.
15. Ajouter les styles nécessaires dans `src/css/style.css` avec contraste, lisibilité, responsive, hauteur maximale raisonnable et focus visible.
16. Mettre à jour les paramètres `style.css?v=...` sur les pages modifiées si le CSS visible change.
17. Générer `dist/` avec `npm run build:prod`.
18. Vérifier clavier et disclosure avec Playwright : clic, Entrée, Espace, état `aria-expanded`, visibilité du panneau et focus.
19. Vérifier l'accessibilité statique avec les tests existants et un contrôle manuel RGAA sur les critères multimédia concernés.
20. Restaurer le harnais Playwright si le dossier `tests/` est absent, puis relancer `npm test`, `npm run seo:check`, `npm run appmiweb:preflight` et, si publié en préproduction, `npm run appmiweb:search-crawl`.

---

## Spécifications d'implémentation

En tant que LLM qui implémente ce PRD, les éléments manquants ou à figer avant exécution sont :

- la politique de versionnement des transcripts corrigés, des rapports d'audit et des fichiers `.srt`/`.vtt` ;
- la décision de placement exacte du transcript YouTube sur la page d'accueil, car le même lien y apparaît plusieurs fois ;
- la décision de placement exacte du transcript YouTube de `monroe-podcasts.html`, car la vidéo est intégrée comme contenu de podcast ;
- la liste métier des noms propres attendus dans les vidéos, si l'équipe veut valider les graphies ;
- la confirmation que les fichiers audio/vidéo téléchargés servent uniquement à l'analyse locale et ne sont pas publiés ;
- le niveau de verbatim attendu : transcription lisible corrigée ou conservation maximale des hésitations.

Ces points ne bloquent pas la création du PRD, mais ils doivent être résolus avant la publication finale des transcripts.

---

## Métriques de succès

- `videos.txt` existe à la racine et contient les six URL du périmètre validé, une par ligne.
- Un inventaire daté liste 100 % des vidéos incluses, exclues ou reportées après recrawl de `src/*.html`.
- Pour chaque URL incluse, au moins un fichier audio MP3 existe dans `swing_audio/` après exécution de `yt-dlp`.
- Pour chaque URL incluse, Whisper produit au minimum un `.txt`, un `.srt`, un `.vtt`, un `.json` et un `.tsv` dans `transcripts/`.
- Pour chaque transcript publié, un transcript corrigé et un rapport d'audit séparé existent.
- Le validateur `validate_transcript_integrity.py` du workflow `transcript` passe sur chaque transcript corrigé ou indique explicitement pourquoi le cas est non applicable.
- Aucun fichier audio ou vidéo de travail n'est présent dans `src/` ou `dist/`.
- Chaque vidéo ou lien vidéo inclus dispose d'un bouton ou lien adjacent donnant accès à la transcription textuelle.
- Chaque bouton disclosure possède un `aria-expanded` cohérent avec l'état visible du panneau.
- Chaque `aria-controls` référence un identifiant unique existant dans la même page.
- Au clavier, Entrée et Espace ouvrent et ferment chaque disclosure.
- Avec JavaScript désactivé, le transcript reste accessible via un fallback vérifiable.
- Les pages modifiées ne créent aucun nouveau H1 et conservent une hiérarchie H2/H3 cohérente.
- Le dossier `tests/` ou une alternative de validation versionnée existe à nouveau avant d'utiliser Playwright comme preuve.
- `npm run build:prod` termine avec un code `0`.
- `npm test` termine avec un code `0`.
- `npm run seo:check` termine avec un code `0`.
- `npm run appmiweb:preflight` termine avec un code `0`, hors avertissements préproduction déjà documentés.

---

## Limites inhérentes au LLM

Le post-traitement de transcript assisté par LLM ne garantit pas à lui seul la fidélité au contenu oral.

Limites structurelles à prendre en compte :

- Whisper peut omettre des mots, halluciner des segments courts ou mal ponctuer les échanges.
- Un LLM peut lisser le registre oral alors que le workflow `transcript` exige de conserver les formulations réellement prononcées.
- Un LLM peut normaliser à tort un nom propre, un organisme ou un acronyme connu mais absent du brut.
- La correction doit porter sur la forme, pas sur le fond : pas de résumé, pas de reformulation, pas de traduction implicite.
- Les passages inaudibles doivent être signalés, jamais devinés.
- Sans écoute humaine ponctuelle ou source témoin, les désaccords entre Whisper, sous-titres automatiques et audio doivent rester documentés comme incertains.
- Le coût réel inclut la récupération des médias, le temps Whisper, la correction, les contrôles RGAA et la validation éditoriale.

---

## Références

- WAI-ARIA Authoring Practices Guide, pattern Disclosure : `https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/`
- Exemple APG image description : `https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-image-description/`
- RGAA, critères et tests, thématique Multimédia : `https://accessibilite.numerique.gouv.fr/methode/criteres-et-tests/`
- yt-dlp : `https://github.com/yt-dlp/yt-dlp`
- OpenAI Whisper : `https://github.com/openai/whisper`

---

## Changelog

| Date | Auteur | Changement |
|------|--------|------------|
| 2026-06-21 | Alex + Codex | Extension du périmètre à toutes les vidéos publiques trouvées dans `src/*.html` |
| 2026-06-21 | Alex + Codex | Création du PRD |
