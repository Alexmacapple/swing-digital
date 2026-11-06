"""Tokens, tokens.css, bundle.css, guides de composants, README, couverture, DESIGN.md."""
import re, os, json, shutil, collections

SRC = '/Users/alex/Claude/projets-heberges/swing-digital/src'
OUT = '/private/tmp/claude-502/-Users-alex-Claude/516d003b-a054-4e9b-bfff-26174b8fe9e3/scratchpad/ds-swing/out'
PROJ = os.path.join(OUT, 'project')
inv = json.load(open(os.path.join(OUT, 'inventory.json')))

def lum(h):
    h = h.lstrip('#'); h = ''.join(c * 2 for c in h) if len(h) == 3 else h
    r = [int(h[i:i + 2], 16) / 255 for i in (0, 2, 4)]
    r = [c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4 for c in r]
    return 0.2126 * r[0] + 0.7152 * r[1] + 0.0722 * r[2]
def cr(a, b):
    x, y = sorted([lum(a), lum(b)], reverse=True); return f"{(x + 0.05) / (y + 0.05):.2f}".replace('.', ',')

W, K, P, N = '#ffffff', '#000000', '#c9365d', '#1a2744'
# (nom par rôle, valeur, anciennes variables, usage)
COLORS = [
    ('ink', '#000000', ['--color-primary', '--color-text', '--color-black'], f"Texte principal sur `paper` ({cr(K, W)}:1) ; fond de l'en-tête, du fil d'Ariane et du pied de page."),
    ('paper', '#ffffff', ['--color-secondary', '--color-white'], f"Texte sur `ink`, `ground-pink` ({cr(W, P)}:1), `ground-red` ({cr(W, '#be2f31')}:1) et `ground-navy` ({cr(W, N)}:1) ; fond des panneaux clairs. 210 usages."),
    ('ground-pink', '#c9365d', ['--color-background-pink-readable'], f"Fond de page par défaut (body) et des diapositives ; porte du texte `paper` ({cr(W, P)}:1)."),
    ('ground-red', '#be2f31', ['--color-bg-red'], f"Fond rouge qui porte du texte `paper` ({cr(W, '#be2f31')}:1), départ et fin de --gradient-hero."),
    ('ground-navy', '#1a2744', ['--color-bg-navy'], f"Fond nuit des sections sombres ; texte `paper` ({cr(W, N)}:1) et titres `title-blue-on-navy` / `title-red-on-navy`."),
    ('surface-gray', '#f0f0f0', ['--color-gray-lightest'], f"Fond gris clair ; texte `ink` ({cr(K, '#f0f0f0')}:1)."),
    ('surface-gray-alt', '#ebebeb', ['--color-bg-gold-light'], "Fond gris clair alternatif (nommé « gold-light » dans le source alors qu'il est gris)."),
    ('text-red', '#ce3b3d', ['--color-brand-alt', '--color-brand-btn', '--color-text-red'], f"Texte rouge sur `paper` ({cr('#ce3b3d', W)}:1) ; fond de bouton à texte `paper`. Fin de --gradient-brand."),
    ('button-red', '#c23537', ['--color-brand-red-btn'], f"Fond de bouton rouge à texte `paper` ({cr(W, '#c23537')}:1)."),
    ('text-rose', '#b5364e', ['--color-text-gold', '--color-brand-rose'], f"Texte rose foncé sur `paper` ({cr('#b5364e', W)}:1). Nommé « text-gold » dans le source alors qu'il est rose."),
    ('text-gold-900', '#5c4200', ['--color-text-gold-darker'], f"Texte or foncé sur `paper` ({cr('#5c4200', W)}:1) et sur `decor-gold` ({cr('#5c4200', '#e8c84a')}:1). 19 usages."),
    ('text-gold-800', '#5c4800', ['--color-text-gold-dark'], f"Texte or foncé sur `paper` ({cr('#5c4800', W)}:1). Écart minime avec `text-gold-900` : candidat à fusion."),
    ('text-gray-900', '#333333', ['--color-gray-dark'], f"Texte secondaire sur `paper` ({cr('#333333', W)}:1)."),
    ('text-gray-700', '#555555', ['--color-gray-medium'], f"Texte tertiaire sur `paper` ({cr('#555555', W)}:1)."),
    ('text-gray-500', '#767676', ['--color-gray-light'], f"Mentions et crédits sur `paper` ({cr('#767676', W)}:1), plancher du contraste AA."),
    ('accent-teal', '#1a7387', ['--color-teal'], f"Accent bleu-vert ; texte sur `paper` ({cr('#1a7387', W)}:1)."),
    ('accent-indigo', '#3b3f72', ['--color-indigo'], f"Accent indigo ; texte `paper` dessus ({cr(W, '#3b3f72')}:1)."),
    ('accent-indigo-dark', '#4a4e82', ['--color-indigo-dark'], f"Indigo plus clair que son nom ne l'indique ; texte `paper` dessus ({cr(W, '#4a4e82')}:1)."),
    ('accent-indigo-light', '#6b6fa0', ['--color-indigo-light'], f"Indigo clair, décoratif ; texte `paper` dessus {cr(W, '#6b6fa0')}:1 (grand texte seulement)."),
    ('accent-violet', '#7b4fbf', ['--color-violet'], f"Accent violet ; texte `paper` dessus ({cr(W, '#7b4fbf')}:1)."),
    ('accent-brown', '#8b5e3c', ['--color-brown'], f"Accent brun ; texte `paper` dessus ({cr(W, '#8b5e3c')}:1)."),
    ('title-blue-on-navy', '#6f86ff', ['--color-title-blue-on-navy'], f"Grand titre bleu sur `ground-navy` ({cr('#6f86ff', N)}:1), réservé aux titres."),
    ('title-red-on-navy', '#ff5a5f', ['--color-title-red-on-navy'], f"Grand titre rouge sur `ground-navy` ({cr('#ff5a5f', N)}:1), réservé aux titres."),
    ('decor-red', '#e8494b', ['--color-brand'], f"Rouge de marque, décoratif ou grand texte : {cr('#e8494b', W)}:1 sur `paper`, échoue en texte courant."),
    ('decor-red-mid', '#d04848', ['--color-red-mid'], f"Milieu de --gradient-hero ; {cr(W, '#d04848')}:1 avec `paper`, sous le seuil en texte courant."),
    ('decor-gold', '#e8c84a', ['--color-brand-gold'], f"Or de marque, décoratif uniquement : {cr('#e8c84a', W)}:1 sur `paper`, {cr('#e8c84a', P)}:1 sur `ground-pink` (grand texte seulement). Porte du texte `ink` ({cr(K, '#e8c84a')}:1)."),
    ('decor-gold-start', '#d4a843', ['--color-gold-gradient-start'], "Départ du dégradé or."),
    ('decor-gold-end', '#c49a3a', ['--color-gold-gradient-end'], "Fin du dégradé or."),
    ('decor-pink', '#ff427d', ['--color-background-pink'], f"Rose vif décoratif, jamais sous du texte `paper` courant ({cr(W, '#ff427d')}:1)."),
    ('decor-pink-soft', '#e84878', ['--color-brand-pink'], "Rose de marque décoratif."),
    ('decor-pink-gradient', '#e84a7e', ['--color-brand-pink-gradient'], "Arrêt rose des dégradés."),
    ('decor-coral', '#ff6b6b', ['--color-accent', '--color-brand-coral'], "Corail décoratif."),
    ('decor-peach', '#ff9966', ['--color-brand-peach'], "Pêche décoratif."),
    ('decor-pale', '#ffb3a7', ['--color-brand-pale'], f"Rose pâle : texte `ink` dessus ({cr(K, '#ffb3a7')}:1) ; sur `ground-pink` {cr('#ffb3a7', P)}:1, décoratif seulement."),
    ('decor-rose-light', '#f0a0a0', ['--color-brand-rose-light'], "Rose clair décoratif."),
    ('decor-rose-medium', '#e87070', ['--color-brand-rose-medium'], "Rose moyen décoratif."),
    ('overlay-45', 'rgba(0, 0, 0, 0.45)', ['--shadow-overlay-light'], "Voile noir léger sur les images portant du texte `paper`."),
    ('overlay-50', 'rgba(0, 0, 0, 0.5)', ['--shadow-overlay-medium'], "Voile noir moyen sur les images."),
    ('overlay-70', 'rgba(0, 0, 0, 0.7)', ['--shadow-overlay-heavy'], "Voile noir fort sur les images très claires."),
    ('border-white-30', 'rgba(255, 255, 255, 0.3)', ['--border-white-subtle'], "Filet blanc discret sur fond sombre (décoratif, sous 3:1)."),
]
DROPPED = ['--color-brand-light (#F49C9E)', '--color-brand-red-dark (#c0392b)']
SPACING = [('space-2xs', '0.3rem', 'Écart minimal, entre une icône et son texte.'),
           ('space-xs', '0.5rem', 'Écart entre éléments serrés, marge sous une notice.'),
           ('space-sm-tight', '0.8rem', 'Écart intermédiaire, listes compactes.'),
           ('space-sm', '1rem', 'Écart de base entre paragraphes et éléments.'),
           ('space-md', '1.5rem', 'Marge intérieure des panneaux et cartes.'),
           ('space-lg', '2rem', 'Marge entre blocs, marge intérieure des textes de diapositive.'),
           ('space-xl', '3rem', 'Écart entre sections internes.'),
           ('space-2xl', '4rem', "Marges du pied de page, grands écarts.")]
RADIUS = [('radius-xs', '2px', 'Petits éléments : badges, étiquettes (4 usages).'),
          ('radius-sm', '4px', 'Rayon le plus fréquent : boutons, champs, vignettes (8 usages).'),
          ('radius-md', '8px', 'Cartes et panneaux (7 usages).'),
          ('radius-pill', '999px', 'Pilules et étiquettes arrondies (2 usages).'),
          ('radius-round', '50%', 'Boutons ronds lecture et son, pastilles (5 usages).')]
SHADOWS = [('shadow-card', '0 4px 12px rgba(0, 0, 0, 0.15)', 'Carte au repos.'),
           ('shadow-card-hover', '0 8px 20px rgba(0, 0, 0, 0.25)', 'Carte survolée.'),
           ('shadow-drop', '0 4px 20px rgba(0, 0, 0, 0.2)', 'Objet posé sur une image (téléphone, affiche).'),
           ('shadow-drop-heavy', '0 4px 20px rgba(0, 0, 0, 0.3)', 'Objet posé sur une image claire.'),
           ('shadow-text', '0 1px 4px rgba(0, 0, 0, 0.7)', "Ombre de texte (text-shadow) pour un titre `paper` posé sur une photo.")]
FAM = '"Satoshi", Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
STYLES = [  # nom, taille max, interlignage, graisse, usage
    ('type-giant', '128px', 1.04, 900, "Numéros géants de chapitre (--size-4xl, clamp 64 → 128 px)."),
    ('type-hero', '80px', 1.04, 900, "Titre de héros (--fs-hero = --size-3xl, clamp 38 → 80 px), souvent en capitales."),
    ('type-title-xl', '60px', 1.04, 900, "Titre de page proéminent (--fs-title-xl = --size-2xl, clamp 32 → 60 px)."),
    ('type-title', '43px', 1.16, 900, "Titre de section standard (--fs-title = --size-xl, clamp 25 → 43 px)."),
    ('type-title-compact', '34px', 1.16, 900, "Titre compact (--size-lg, clamp 22 → 34 px)."),
    ('type-subtitle', '24px', 1.34, 400, "Sous-titre (--fs-subtitle = --size-md, clamp 18 → 24 px)."),
    ('type-body', '19px', 1.62, 400, "Corps de texte (--fs-body = --size-sm, clamp 16 → 19 px), mesure 64ch."),
    ('type-label', '19px', 1.48, 700, "Lien de navigation, libellé, bouton : corps en 700."),
    ('type-caption', '16px', 1.48, 400, "Légende (--fs-caption = --size-xs, clamp 14 → 16 px)."),
    ('type-credit', '13px', 1.48, 400, "Crédit photo (--fs-credit = --size-2xs, 13 px)."),
]

def tokens():
    t = {"name": "Swing Digital", "version": 1,
         "color": {"themes": [{"id": "light", "name": "Site"}],
                   "tokens": [{"name": n, "value": v, "usage": u + " Ancien nom : " + ", ".join(f"`{o}`" for o in old) + "."} for n, v, old, u in COLORS]},
         "type": {"fonts": [{"family": "Satoshi", "file": "fonts/Satoshi-Variable.woff2", "weight": "300 900", "style": "normal"},
                            {"family": "Satoshi", "file": "fonts/Satoshi-VariableItalic.woff2", "weight": "300 900", "style": "italic"}],
                  "families": {"sans": FAM},
                  "groups": [{"name": "Affichage", "family": "sans", "styles": []}, {"name": "Texte", "family": "sans", "styles": []}]},
         "spacing": {"tokens": [{"name": n, "value": v, "usage": u} for n, v, u in SPACING]},
         "radius": {"note": "Le source écrit ses rayons en dur ; ces tokens en sont le relevé. 1px, 3px, 6px et 0.15rem restent à ramener sur cette échelle.",
                    "tokens": [{"name": n, "value": v, "usage": u} for n, v, u in RADIUS]},
         "shadow": {"tokens": [{"name": n, "value": v, "usage": u} for n, v, u in SHADOWS]},
         "meta": {"source": "github", "repo": "Alexmacapple/swing-digital", "ref": "main@e27cb5f", "package": "src",
                  "paths": {"tokens": ["src/css/style.css"], "fonts": ["src/fonts/"], "assets": ["src/img/partners/", "src/img/icons/"], "docs": ["GUIDELINES-TEMPLATES.md"]},
                  "synced": "2026-11-06"}}
    for i, (n, s, lh, w, u) in enumerate(STYLES):
        st = {"name": n, "fontSize": s, "lineHeight": lh, "fontWeight": w, "usage": u, "sample": "Espaces augmentés"}
        t["type"]["groups"][0 if i < 5 else 1]["styles"].append(st)
    return t

def tokens_css():
    L = ['/* Swing Digital — generated from tokens.json */',
         ':root, [data-theme="light"] {']
    L += [f'  --{n}: {v};' for n, v, _, _ in COLORS]
    L += [f'  --{n}: {v};' for n, v, _ in SHADOWS]
    L += ['}', ':root {']
    L += [f'  --{n}: {v};' for n, v, _ in SPACING]
    L += [f'  --{n}: {v};' for n, v, _ in RADIUS]
    L += [f'  --font-sans: {FAM};', '}']
    for n, s, lh, w, _ in STYLES:
        L.append(f'.{n} {{ font-family: var(--font-sans); font-size: {s}; line-height: {lh}; font-weight: {w}; }}')
    for f, st in [('Satoshi-Variable.woff2', 'normal'), ('Satoshi-VariableItalic.woff2', 'italic')]:
        L.append(f"@font-face {{ font-family: 'Satoshi'; src: url('fonts/{f}') format('woff2'); font-weight: 300 900; font-style: {st}; font-display: swap; }}")
    return '\n'.join(L) + '\n'

def bundle_css():
    css = open(os.path.join(SRC, 'css/style.css')).read()
    # @font-face : portés par tokens.css
    css = re.sub(r'@font-face\s*\{[^}]*\}\s*', '', css)
    m = re.search(r':root\s*\{', css); start = m.end()
    end = css.index('\n}', start)
    body = css[start:end]
    moved = {o for _, _, old, _ in COLORS for o in old} | {'--' + n for n, _, _ in SPACING} | {'--' + n for n, _, _ in SHADOWS}
    moved |= {d.split(' ')[0] for d in DROPPED}
    kept = []
    for line in body.split('\n'):
        mm = re.match(r'\s*(--[\w-]+)\s*:', line)
        if mm and mm.group(1) in moved: continue
        kept.append(line)
    alias = ['', '    /* === Alias vers les tokens du design system (tokens.css) ===',
             '       Les anciens noms restent utilisables pendant la migration. */']
    for n, _, old, _ in COLORS:
        for o in old:
            if o.startswith('--shadow-overlay') or o == '--border-white-subtle' or o.startswith('--color'):
                alias.append(f'    {o}: var(--{n});')
    new_root = '\n'.join(alias) + '\n' + '\n'.join(kept)
    head = ('/* Swing Digital — feuille des composants, dérivée de src/css/style.css (main@e27cb5f).\n'
            '   Les couleurs, espacements, ombres et polices vivent dans tokens.css ; ce fichier garde\n'
            '   les alias des anciens noms, les tailles fluides clamp(), les dégradés et toutes les règles. */\n')
    return head + css[:start] + new_root + css[end:]

SHARED = ['title', 'subtitle', 'header', 'container', 'image', 'photo', 'credit', 'category', 'category-letter',
          'category-title', 'logos', 'logos-bar', 'logo', 'gallery', 'badge', 'grid', 'description', 'text', 'left', 'right', 'number', 'cover']

def comp_readmes():
    by_suffix = collections.defaultdict(list)
    for c in inv:
        sufs = {cl.split('__', 1)[1] for cl in c['classes'] if '__' in cl and re.match(r'page\d+__', cl)}
        c['suffixes'] = sufs
        for s in sufs: by_suffix[s].append(c['name'])
    for c in inv:
        d = os.path.join(PROJ, 'components', c['name'])
        root = ' '.join(f'`.{r}`' for r in c['root']) or '—'
        elems = [cl for cl in c['classes'] if '__' in cl and not cl.startswith('media-transcript')][:40]
        mods = sorted({cl for cl in c['classes'] if '--' in cl})
        js = []
        joined = ' '.join(c['classes'])
        if 'play-btn' in joined: js.append('boutons lecture/pause pilotés par `js/main.js`')
        if 'sound-btn' in joined: js.append('bouton son pilotés par `js/main.js`')
        if 'media-transcript' in joined or c['name'] == 'MediaTranscript': js.append('transcription dépliable (`.js-disclosure-label`, `js/main.js`)')
        if 'disclosure-btn' in joined: js.append('bouton dépliant des citations')
        if 'burger' in joined: js.append('menu burger mobile (`aria-expanded`)')
        if 'episode-btn' in joined: js.append("changement d'épisode")
        provides = []
        if c['images']: provides.append(f"{c['images']} image(s) avec texte alternatif ou `alt=\"\"` si décoratives")
        if c['video']: provides.append('une vidéo MP4 et son image poster (non chargée dans l’aperçu)')
        if c['iframe']: provides.append('un lecteur intégré Vimeo ou YouTube (remplacé par un bloc noir dans l’aperçu)')
        provides.append('les textes : titres, paragraphes, crédits, dans la langue de la page (`lang`)')
        shared = []
        for s in sorted(c['suffixes']):
            if s in SHARED and len(by_suffix[s]) > 1:
                others = [o for o in by_suffix[s] if o != c['name']]
                shared.append(f"- `__{s}` : aussi dans {', '.join(others[:8])}{' …' if len(others) > 8 else ''}")
        pages = ', '.join(f'`{p}`' for p in c['pages']) or f"`{c['page']}`"
        txt = [f"# {c['name']}", '', c['summary'], '',
               '## Où il sert', '',
               f"Pages : {pages}. La version anglaise (`en/`) reprend la même structure.", '',
               '## Structure', '', f"Racine : {root}."]
        if elems: txt += ['', 'Éléments : ' + ', '.join(f'`.{e}`' for e in elems) + '.']
        if mods: txt += ['', 'Variantes : ' + ', '.join(f'`.{m}`' for m in mods) + '.']
        txt += ['', '## Ce que fournit l’intégrateur', ''] + [f'- {p}' for p in provides]
        if js: txt += ['', '## Comportement', ''] + [f'- {j}' for j in js]
        if shared:
            txt += ['', '## Motifs partagés à extraire', '',
                    'Ces éléments existent sous un autre préfixe de page ; ils sont candidats à un composant commun :', ''] + shared
        txt += ['', '## Règles', '',
                '- Titres en `type-title` ou `type-title-xl`, graisse 900 ; corps en `type-body`.',
                '- Texte `paper` seulement sur `ground-pink`, `ground-red`, `ground-navy`, `ink` ou une image voilée par `overlay-45` au minimum.',
                '- Crédits photo en `type-credit`, jamais en `decor-gold` sur fond clair.',
                '']
        open(os.path.join(d, 'README.md'), 'w').write('\n'.join(txt))

def write_all():
    json.dump(tokens(), open(os.path.join(PROJ, 'tokens.json'), 'w'), ensure_ascii=False, indent=1)
    open(os.path.join(PROJ, 'tokens.css'), 'w').write(tokens_css())
    open(os.path.join(PROJ, 'components', 'bundle.css'), 'w').write(bundle_css())
    os.makedirs(os.path.join(PROJ, 'fonts'), exist_ok=True)
    for f in ['Satoshi-Variable.woff2', 'Satoshi-VariableItalic.woff2']:
        shutil.copy2(os.path.join(SRC, 'fonts', f), os.path.join(PROJ, 'fonts', f))
    comp_readmes()
    print('ok', len(COLORS), 'couleurs ;', sum(len(o) for _, _, o, _ in COLORS), 'anciens noms couverts')

write_all()
