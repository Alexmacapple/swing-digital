"""Génère le design system Swing Digital depuis src/ (lecture seule du dépôt).

Sortie : OUT/project/... (composants, bundle.css, img/ réduites).
"""
import re, os, json, glob, shutil, subprocess, collections

SRC = '/Users/alex/Claude/projets-heberges/swing-digital/src'
OUT = '/private/tmp/claude-502/-Users-alex-Claude/516d003b-a054-4e9b-bfff-26174b8fe9e3/scratchpad/ds-swing/out'
PROJ = os.path.join(OUT, 'project')

# Composants : clé de section -> (Nom, groupe, page source, résumé, hauteur)
SPECS = [
    # Structure commune
    ('@skip-links', 'SkipLinks', 'Structure', 'index.html', "Liens d'évitement placés en tête de chaque page, visibles au focus clavier.", 140),
    ('@site-header', 'SiteHeader', 'Structure', 'index.html', "En-tête noir fixe : logotype typographique entre deux barres, sélecteur de langue et menu principal à trois niveaux.", 200),
    ('@breadcrumb', 'Breadcrumb', 'Structure', 'experience-monroe.html', "Fil d'Ariane noir collant sous l'en-tête, présent sur toutes les pages.", 160),
    ('@language-switcher', 'LanguageSwitcher', 'Structure', 'index.html', "Bascule Français / English, la langue courante portant aria-current.", 120),
    ('@site-footer', 'SiteFooter', 'Structure', 'index.html', "Pied de page noir : navigation secondaire, mentions et sélecteur de langue.", 520),
    ('@back-to-top', 'BackToTop', 'Structure', 'index.html', "Bouton flottant de retour en haut, créé par js/main.js après 300 px de défilement.", 160),
    # Accueil
    ('hero-page1', 'HeroVideo', 'Accueil', 'index.html', "Héros plein écran sur vidéo de fond, avec contrôles lecture et son, accroche, mots-dièse et partenaires.", 760),
    ('page-404-hero', 'Hero404', 'Accueil', '404.html', "Variante du héros vidéo pour la page introuvable.", 760),
    ('page3', 'StudioIntro', 'Accueil', 'index.html', "Présentation du studio et de ses créations, avec galerie, crédits et transcription dépliable.", 900),
    ('team', 'TeamGrid', 'Accueil', 'index.html', "Grille « Qui sommes-nous ? » : portrait, prénom, nom et rôle de chaque membre.", 820),
    ('partners-page', 'PartnersLogos', 'Accueil', 'index.html', "Mur de logos « Ils nous ont fait confiance ».", 760),
    ('page62', 'ContactVideo', 'Accueil', 'index.html', "Bloc contact sur vidéo de fond : marque, adresse et courriel.", 640),
    # Espaces et séries
    ('page5', 'SpaceStoryIntro', 'Espaces et séries', 'espaces-augmentes.html', "Ouverture « Réinventer l'espace des récits » : titre, sous-titre et grande image.", 760),
    ('page6', 'MixedRealityFeatures', 'Espaces et séries', 'espaces-augmentes.html', "Trois arguments titrés (réalité mixte, ancrage, espace) à côté d'une image.", 820),
    ('full-image-page', 'FullImage', 'Espaces et séries', 'espaces-augmentes.html', "Image seule en pleine page, variante --entiere pour l'image non recadrée.", 640),
    ('page9', 'SeriesIntroGrid', 'Espaces et séries', 'experiences-series.html', "Introduction aux expériences et séries : mots-dièse puis grille de cartes projet.", 820),
    ('page10', 'DevelopmentGrid', 'Espaces et séries', 'experiences-series.html', "Grille des projets en développement, même carte que SeriesIntroGrid.", 760),
    ('page57', 'CorporateOffer', 'Espaces et séries', 'xr-corporate.html', "Offre XR pour les entreprises : titre, accroche, argumentaire, étiquettes et appel à l'action.", 820),
    # Monroe
    ('page12', 'PressReview', 'Monroe', 'experience-monroe.html', "Revue de presse : affiche, citations dépliables et bandeau de logos médias.", 900),
    ('page13', 'ChapterCards', 'Monroe', 'experience-monroe.html', "Cartes numérotées vers les chapitres Monroe (fond sombre ou rose), réutilisées par la section page24.", 860),
    ('page14', 'PlayOpener', 'Monroe', 'monroe-piece.html', "Ouverture de chapitre « La Pièce » : grand numéro, titre, couverture et portrait.", 760),
    ('page16', 'PlayStillsPair', 'Monroe', 'monroe-piece.html', "Deux images superposées de la pièce avec crédit, variantes --champ et --couloir.", 700),
    ('page20', 'GraphicNovelOpener', 'Monroe', 'monroe-roman-graphique.html', "Ouverture « Le Roman graphique » : numéro, titre, couverture.", 760),
    ('page21', 'GraphicNovelPlates', 'Monroe', 'monroe-roman-graphique.html', "Grille des planches du roman graphique.", 760),
    ('page23', 'InstallationOpener', 'Monroe', 'monroe-installation.html', "Ouverture « Installation interactive » : image, voile, numéro et bande or.", 700),
    ('page25', 'PhotoGallery', 'Monroe', 'monroe-photographie.html', "Galerie photographique : lettre de catégorie, panoramique créditée, figures légendées.", 900),
    ('page26', 'PhotoFeature', 'Monroe', 'monroe-photographie.html', "Photographie seule avec son crédit.", 700),
    ('page27', 'PhotoCredited', 'Monroe', 'monroe-photographie.html', "Photographie titrée et créditée, répétée trois fois sur la page Photographies.", 700),
    ('page30', 'PhotoPairGrid', 'Monroe', 'monroe-photographie.html', "Grille de deux photographies titrées et créditées.", 700),
    ('page31', 'CompositionGallery', 'Monroe', 'monroe-composition.html', "Composition électroacoustique : catégorie, compositeur et galerie.", 760),
    ('page32', 'InstallationComposer', 'Monroe', 'monroe-composition.html', "Installation interactive : catégorie, texte du compositeur et image.", 760),
    ('page33', 'PodcastPlayer', 'Monroe', 'monroe-podcasts.html', "Lecteur de podcasts : liste d'épisodes, épisode actif, transcriptions dépliables.", 1000),
    ('page34', 'InterviewPortraits', 'Monroe', 'monroe-interviews.html', "Portraits d'interviewés avec légende nom et qualité.", 760),
    ('page35', 'InterviewSplit', 'Monroe', 'monroe-interviews.html', "Interview en deux colonnes : catégorie et légende à gauche, portrait à droite.", 760),
    ('interviews-videos', 'InterviewVideos', 'Monroe', 'monroe-interviews.html', "Grille des interviews en vidéo : lecteur intégré, nom et crédit.", 700),
    ('page36', 'ExperiencesMosaic', 'Monroe', 'monroe-experiences.html', "Mosaïque de photos de trois tailles pour les expériences interactives.", 820),
    ('page37', 'EstradeFeature', 'Monroe', 'monroe-experiences.html', "Mise en avant « L'estrade » : titre empilé, lettre, photo et crédit.", 760),
    ('page38', 'QuizOpener', 'Monroe', 'monroe-quiz.html', "Ouverture du quiz Marilyn : catégorie, titre et téléphone.", 760),
    ('quiz-jouer', 'QuizPlay', 'Monroe', 'monroe-quiz.html', "Accès au quiz : lien d'action, note et images à observer.", 820),
    ('page39', 'SeriesSelection', 'Monroe', 'serie-marilyn.html', "Présentation de la série : numéro, format, sélection en liste et photo.", 820),
    # Médias
    ('page11', 'VideoSection', 'Médias', 'dessine-moi-le-vent.html', "Section vidéo plein cadre avec boutons lecture et son, réutilisée sur huit pages.", 640),
    ('media-transcript', 'MediaTranscript', 'Médias', 'index.html', "Transcription dépliable d'un média : bouton, panneau et sections titrées.", 420),
    # Projets
    ('page43', 'AwardsHero', 'Projets', 'voyage-autour-de-moi.html', "Héros de projet sur image : titre, sous-titre, prix et bandeau de logos.", 820),
    ('page44', 'AwardsDetail', 'Projets', 'voyage-autour-de-moi.html', "Détail du projet : panoramique, description, étiquettes et prix.", 820),
    ('page46', 'AppProjectHero', 'Projets', 'dessine-moi-le-vent.html', "Héros d'application : titre, visuel, badges App Store et Google Play, lien Vimeo.", 760),
    ('page47', 'ProjectDetailGallery', 'Projets', 'dessine-moi-le-vent.html', "Détail de projet : texte, crédit, galerie et bandeau de logos.", 860),
    ('page48', 'PortraitSeriesHero', 'Projets', 'ni-vues-ni-connues.html', "Héros « Ni vues ni connues » : bandeaux image, titre, accroche et logos.", 820),
    ('page49', 'PortraitGrid', 'Projets', 'ni-vues-ni-connues.html', "Grille de portraits avec description et accroche.", 820),
    ('page50', 'PosterFullBleed', 'Projets', 'marilyn.html', "Affiche en fond plein cadre, variante --export.", 700),
    ('page51', 'QuoteSplit', 'Projets', 'marilyn.html', "Deux colonnes : catégorie, titre, description et citations, photo.", 760),
    ('page52', 'ExportImage', 'Projets', 'marilyn.html', "Image d'export seule, variante --export.", 700),
    ('page53', 'ProjectPosterHeader', 'Projets', 'charlotte-henschel.html', "En-tête de projet : catégorie, titre, description, logos et affiche (Charlotte Henschel, Toulouse-Lautrec).", 820),
    ('page54', 'PhotoMosaic', 'Projets', 'toulouse-lautrec.html', "Mosaïque photo avec un grand visuel et un paragraphe.", 820),
    ('page56', 'BioPanel', 'Projets', 'charlotte-henschel.html', "Panneau biographique, variante --solo sans tableaux.", 640),
    # Pages utilitaires
    ('seo-geo-panel', 'AnswerPanel', 'Pages utilitaires', 'espaces-augmentes.html', "Panneau question-réponse pour les moteurs et les agents : titre, réponse et tableau.", 560),
    ('sitemap-page', 'LinkListPage', 'Pages utilitaires', 'films.html', "Page liste : titre, chapeau et liste de liens (Films, Plan du site, Mentions légales, Memory Box, The Party).", 640),
    ('page58', 'NewsletterSignup', 'Pages utilitaires', 'reservations.html', "Bloc « Restez informé » : texte, liste, bouton d'inscription et réservation désactivée.", 640),
]

def blocks(h, tag):
    out = []; i = 0
    while True:
        m = re.search(r'<%s\b' % tag, h[i:])
        if not m: break
        s = i + m.start(); depth = 0; e = None
        for t in re.finditer(r'<(/?)%s\b' % tag, h[s:]):
            depth += -1 if t.group(1) else 1
            if depth == 0:
                e = h.find('>', s + t.end()) + 1; break
        out.append(h[s:e]); i = e
    return out

def first_class(b):
    m = re.search(r'class="([^"]*)"', b[:400]); return m.group(1).split() if m else []

def find_block(page, key):
    h = open(os.path.join(SRC, page)).read()
    if key == '@skip-links': return blocks(h, 'nav')[0] if 'skip-links' in first_class(blocks(h,'nav')[0]) else None
    if key == '@site-header': return blocks(h, 'header')[0]
    if key == '@breadcrumb': return next(b for b in blocks(h, 'nav') if 'breadcrumb' in first_class(b))
    if key == '@language-switcher': return next(b for b in blocks(h, 'nav') if 'language-switcher' in first_class(b))
    if key == '@site-footer': return blocks(h, 'footer')[0]
    if key == '@back-to-top':
        return ('<button class="back-to-top back-to-top--visible" type="button" aria-label="Retour en haut de page">'
                '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M12 4l-8 8h5v8h6v-8h5z" fill="currentColor"/></svg></button>')
    if key == 'media-transcript':
        m = re.search(r'<div class="media-transcript"', h)
        return blocks(h[m.start():], 'div')[0]
    for b in blocks(h, 'section'):
        if key in first_class(b): return b
    raise SystemExit(f'introuvable : {key} dans {page}')

def pages_using(key):
    hits = []
    for f in sorted(glob.glob(os.path.join(SRC, '*.html'))):
        h = open(f).read()
        if key.startswith('@'):
            cls = key[1:]
            if re.search(r'class="[^"]*\b%s\b' % re.escape(cls), h) or (cls == 'back-to-top'): hits.append(os.path.basename(f))
        elif re.search(r'class="(?:[^"]*\s)?%s(?:\s[^"]*)?"' % re.escape(key), h): hits.append(os.path.basename(f))
    return hits

IMG_RE = re.compile(r'((?:src|poster)=")(img/[^"]+)(")')
SRCSET_RE = re.compile(r'(srcset=")([^"]+)(")')
needed = set()

def rewrite(b):
    b = re.sub(r'<noscript\b.*?</noscript>', '', b, flags=re.S)
    b = re.sub(r'<!--.*?-->', '', b, flags=re.S)
    # iframes interdites dans un aperçu : bloc de remplacement au même emplacement
    def iframe_sub(m):
        title = re.search(r'title="([^"]*)"', m.group(0))
        t = title.group(1) if title else 'Lecteur vidéo'
        return ('<div class="ds-iframe-placeholder" style="aspect-ratio:16/9;width:100%;background:#000;color:#fff;'
                'display:flex;align-items:center;justify-content:center;font-size:16px;text-align:center;padding:1rem;box-sizing:border-box">'
                f'Lecteur intégré non chargé dans l\'aperçu : {t}</div>')
    b = re.sub(r'<iframe\b.*?</iframe>', iframe_sub, b, flags=re.S)
    # vidéos : on garde l'élément et son poster, sans flux
    b = re.sub(r'<source\b[^>]*>', '', b)
    b = re.sub(r'(<video\b[^>]*?)\s(?:data-)?src="[^"]*"', r'\1', b)
    def img_sub(m):
        p = m.group(2).split('?')[0]; needed.add(p); return m.group(1) + '../../' + p + m.group(3)
    b = IMG_RE.sub(img_sub, b)
    def srcset_sub(m):
        parts = []
        for part in m.group(2).split(','):
            part = part.strip(); bits = part.split()
            if bits and bits[0].startswith('img/'):
                needed.add(bits[0].split('?')[0]); bits[0] = '../../' + bits[0]
            parts.append(' '.join(bits))
        return m.group(1) + ', '.join(parts) + m.group(3)
    b = SRCSET_RE.sub(srcset_sub, b)
    # liens internes neutralisés : l'aperçu ne navigue pas
    b = re.sub(r'href="(?!#|https?:|mailto:|tel:)[^"]*"', 'href="#"', b)
    b = b.replace(' reveal ', ' reveal reveal--visible ').replace('class="reveal ', 'class="reveal reveal--visible ').replace(' reveal"', ' reveal reveal--visible"')
    return b

def preview(name, group, height, html, page, key):
    width = 1280
    wrap_pre, wrap_post = '<div class="ds-preview" style="position:relative;min-height:100%">', '</div>'
    if key == '@site-header':
        html = html.replace('class="site-header"', 'class="site-header" style="position:relative"')
    if key == '@back-to-top':
        wrap_pre = '<div class="ds-preview" style="position:relative;min-height:160px;background:#fff">'
    script = ("<script>document.querySelectorAll('.reveal').forEach(function(e){e.classList.add('reveal--visible')});"
              "document.querySelectorAll('img[loading=lazy]').forEach(function(i){i.loading='eager'});</script>")
    return (f'<!-- @dsCard group="{group}" height={height} width={width} subtitle="{page}" -->\n'
            f'{wrap_pre}\n{html}\n{wrap_post}\n{script}\n')

def main():
    if os.path.exists(OUT): shutil.rmtree(OUT)
    os.makedirs(os.path.join(PROJ, 'components'))
    inventory = []
    for key, name, group, page, summary, height in SPECS:
        raw = find_block(page, key)
        html = rewrite(raw)
        d = os.path.join(PROJ, 'components', name); os.makedirs(d)
        open(os.path.join(d, 'preview.html'), 'w').write(preview(name, group, height, html, page, key))
        root = first_class(raw)
        classes = sorted(set(c for cl in re.findall(r'class="([^"]*)"', raw) for c in cl.split()))
        pg = pages_using(key if key != 'media-transcript' else 'media-transcript')
        imgs = sorted(set(m for m in re.findall(r'(?:src|poster)="(img/[^"?]+)', raw)))
        has_video = bool(re.search(r'<video\b', raw)); has_iframe = bool(re.search(r'<iframe\b', raw))
        inventory.append(dict(key=key, name=name, group=group, page=page, summary=summary, root=root,
                              classes=classes, pages=pg, images=len(imgs), video=has_video, iframe=has_iframe))
    json.dump(inventory, open(os.path.join(OUT, 'inventory.json'), 'w'), ensure_ascii=False, indent=1)
    # images CSS de fond
    css = open(os.path.join(SRC, 'css/style.css')).read()
    for p in re.findall(r"url\(['\"]?\.\./(img/[^)'\"]+)", css): needed.add(p)
    total = 0
    for p in sorted(needed):
        s = os.path.join(SRC, p); t = os.path.join(PROJ, p)
        if not os.path.exists(s): print('ABSENTE', p); continue
        os.makedirs(os.path.dirname(t), exist_ok=True)
        if p.lower().endswith(('.jpg', '.jpeg', '.webp')) and os.path.getsize(s) > 450_000:
            subprocess.run(['sips', '-s', 'format', 'jpeg', '-s', 'formatOptions', '70', '-Z', '1600', s, '--out', t],
                           check=True, capture_output=True)
        else:
            shutil.copy2(s, t)
        total += os.path.getsize(t)
    print(len(SPECS), 'composants ;', len(needed), 'images ;', round(total/1e6, 1), 'Mo')
    big = [(p, os.path.getsize(os.path.join(PROJ, p))) for p in needed if os.path.exists(os.path.join(PROJ, p)) and os.path.getsize(os.path.join(PROJ, p)) > 512_000]
    print('images > 512 Ko :', big)

main()
