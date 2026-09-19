#!/bin/bash
# Publie le site de recette sur GitHub Pages (branche gh-pages).
#
# Usage : scripts/publier-gh-pages.sh            publie
#         scripts/publier-gh-pages.sh --a-blanc  prépare et vérifie, sans commit ni push
#
# Principe : dist/ est reconstruit depuis main, copié dans un worktree dédié à la branche gh-pages,
# puis commité et poussé NORMALEMENT (jamais de push forcé : l'historique de gh-pages s'allonge, mais les
# images, identiques à celles de main, ne sont stockées qu'une fois par git).
# La copie publiée porte un « noindex » sur chaque page : c'est une recette, pas un site à référencer.
# src/ n'est jamais modifié.
set -euo pipefail

RACINE="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
WORKTREE="${SWING_GH_PAGES_WORKTREE:-$HOME/Claude-worktrees/swing-gh-pages}"
BRANCHE="gh-pages"
A_BLANC=0
[ "${1:-}" = "--a-blanc" ] && A_BLANC=1

cd "$RACINE"

# 1. Garde-fous : on publie main, propre et poussé. À blanc, ce ne sont que des avertissements : rien ne sort.
refuser() {
    if [ "$A_BLANC" = "1" ]; then echo "AVERTISSEMENT (bloquant hors mode à blanc) : $1" >&2; else echo "ÉCHEC : $1" >&2; exit 1; fi
}
[ "$(git branch --show-current)" = "main" ] || refuser "se placer sur main."
[ -z "$(git status --porcelain)" ] || refuser "arbre de travail non propre."
git fetch --quiet origin
[ "$(git rev-parse HEAD)" = "$(git rev-parse origin/main)" ] || refuser "main n'est pas aligné sur origin/main."
SHA="$(git rev-parse --short HEAD)"

# 2. Construction.
npm run --silent build:prod > /dev/null
[ -f dist/index.html ] || { echo "ÉCHEC : dist/index.html absent après construction." >&2; exit 1; }

# 3. Worktree de la branche gh-pages (créée orpheline la première fois).
if [ ! -e "$WORKTREE/.git" ]; then
    mkdir -p "$(dirname "$WORKTREE")"
    if git show-ref --verify --quiet "refs/heads/$BRANCHE"; then
        git worktree add --quiet "$WORKTREE" "$BRANCHE"
    elif git ls-remote --exit-code --heads origin "$BRANCHE" > /dev/null 2>&1; then
        git fetch --quiet origin "$BRANCHE:$BRANCHE"
        git worktree add --quiet "$WORKTREE" "$BRANCHE"
    else
        git worktree add --quiet --orphan -b "$BRANCHE" "$WORKTREE"
    fi
fi
[ "$(git -C "$WORKTREE" branch --show-current)" = "$BRANCHE" ] || { echo "ÉCHEC : $WORKTREE n'est pas sur $BRANCHE." >&2; exit 1; }

# 4. Copie miroir de dist/ (le .git du worktree est préservé).
rsync -a --delete --exclude ".git" dist/ "$WORKTREE/"

# 5. Spécificités de la copie de recette.
touch "$WORKTREE/.nojekyll"
printf 'User-agent: *\nDisallow: /\n' > "$WORKTREE/robots.txt"
python3 - "$WORKTREE" <<'PY'
import pathlib, re, sys
racine = pathlib.Path(sys.argv[1])
balise = '<meta name="robots" content="noindex, nofollow">'
for page in sorted(racine.rglob('*.html')):
    if '.git' in page.parts:
        continue
    html = page.read_text(encoding='utf-8')
    html = re.sub(r'\s*<meta name="robots"[^>]*>', '', html)
    html, n = re.subn(r'(<meta charset="[^"]*">)', r'\1\n    ' + balise, html, count=1)
    if n != 1:
        sys.exit('ÉCHEC : balise charset introuvable dans %s' % page)
    page.write_text(html, encoding='utf-8')
PY

# 6. Vérification : chaque page HTML publiée porte le noindex.
PAGES="$(find "$WORKTREE" -name "*.html" -not -path "*/.git/*" | wc -l | tr -d ' ')"
NOINDEX="$(grep -rl --include="*.html" 'name="robots" content="noindex, nofollow"' "$WORKTREE" | wc -l | tr -d ' ')"
[ "$PAGES" -gt 0 ] && [ "$PAGES" = "$NOINDEX" ] || { echo "ÉCHEC : $NOINDEX page(s) sur $PAGES portent le noindex." >&2; exit 1; }
echo "Préparé : $PAGES pages HTML, toutes en noindex, depuis main $SHA, dans $WORKTREE"

if [ "$A_BLANC" = "1" ]; then
    echo "À blanc : ni commit ni push."
    exit 0
fi

# 7. Commit et push normaux.
cd "$WORKTREE"
git add -A
if git diff --cached --quiet; then
    echo "Rien à publier : gh-pages est déjà à jour pour main $SHA."
    exit 0
fi
git commit --quiet -m "chore(pages): publier la recette depuis main $SHA"
git push --quiet origin "$BRANCHE"
echo "Publié : $(git rev-parse --short HEAD) sur $BRANCHE, depuis main $SHA"
