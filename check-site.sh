#!/bin/bash
# check-site.sh — Validation post-decoupe du site Swing Digital
# Execute depuis la racine du projet (ou le repertoire src/)

set -e

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
NC='\033[0m'

ERRORS=0
WARNINGS=0

# Detecter le repertoire src/
if [ -d "src" ]; then
    SRC="src"
elif [ -f "index.html" ]; then
    SRC="."
else
    echo -e "${RED}Erreur : repertoire src/ introuvable${NC}"
    exit 1
fi

echo "=== Validation du site Swing Digital ==="
echo "Repertoire : $SRC"
echo ""

# Liste des 22 fichiers HTML attendus
HTML_FILES=(
    "index.html"
    "espaces-augmentes.html"
    "experiences-series.html"
    "reservations.html"
    "experience-monroe.html"
    "voyage-autour-de-moi.html"
    "dessine-moi-le-vent.html"
    "ni-vues-ni-connues.html"
    "marilyn.html"
    "toulouse-lautrec.html"
    "charlotte-henschel.html"
    "xr-corporate.html"
    "monroe-piece.html"
    "monroe-roman-graphique.html"
    "monroe-installation.html"
    "monroe-photographie.html"
    "monroe-composition.html"
    "monroe-podcasts.html"
    "monroe-interviews.html"
    "monroe-experiences.html"
    "monroe-quiz.html"
    "404.html"
)

# 1. Verification des fichiers HTML existants
echo "--- 1. Fichiers HTML ---"
for f in "${HTML_FILES[@]}"; do
    if [ -f "$SRC/$f" ]; then
        echo -e "  ${GREEN}OK${NC} $f"
    else
        echo -e "  ${RED}MANQUANT${NC} $f"
        ((ERRORS++))
    fi
done
echo ""

# 2. Verification sitemap.xml et robots.txt
echo "--- 2. Fichiers SEO ---"
for f in sitemap.xml robots.txt; do
    if [ -f "$SRC/$f" ]; then
        echo -e "  ${GREEN}OK${NC} $f"
    else
        echo -e "  ${RED}MANQUANT${NC} $f"
        ((ERRORS++))
    fi
done
echo ""

# 3. Liens internes casses
echo "--- 3. Liens internes ---"
for f in "${HTML_FILES[@]}"; do
    if [ ! -f "$SRC/$f" ]; then continue; fi

    # Extraire les href locaux (pas mailto, pas http/https, pas #)
    hrefs=$(grep -oE 'href="[^"#][^"]*\.html[^"]*"' "$SRC/$f" | sed 's/href="//;s/"//' | grep -v '^http' | grep -v '^mailto' | sort -u)

    for href in $hrefs; do
        # Extraire le fichier (avant # ou ?)
        target_file=$(echo "$href" | cut -d'#' -f1 | cut -d'?' -f1)
        if [ -n "$target_file" ] && [ ! -f "$SRC/$target_file" ]; then
            echo -e "  ${RED}LIEN CASSE${NC} $f -> $target_file"
            ((ERRORS++))
        fi
    done
done
echo -e "  ${GREEN}Verification terminee${NC}"
echo ""

# 4. Coherence header/footer
echo "--- 4. Coherence header/footer ---"
for f in "${HTML_FILES[@]}"; do
    if [ ! -f "$SRC/$f" ]; then continue; fi

    # Verifier skip link
    if ! grep -q 'class="skip-link"' "$SRC/$f"; then
        echo -e "  ${RED}SKIP LINK MANQUANT${NC} $f"
        ((ERRORS++))
    fi

    # Verifier header
    if ! grep -q 'class="site-header"' "$SRC/$f"; then
        echo -e "  ${RED}HEADER MANQUANT${NC} $f"
        ((ERRORS++))
    fi

    # Verifier footer
    if ! grep -q 'role="contentinfo"' "$SRC/$f"; then
        echo -e "  ${RED}FOOTER MANQUANT${NC} $f"
        ((ERRORS++))
    fi

    # Verifier breadcrumb
    if ! grep -q 'aria-label="Fil' "$SRC/$f"; then
        echo -e "  ${RED}BREADCRUMB MANQUANT${NC} $f"
        ((ERRORS++))
    fi

    # Verifier data-section
    if ! grep -q 'data-section=' "$SRC/$f"; then
        echo -e "  ${RED}DATA-SECTION MANQUANT${NC} $f"
        ((ERRORS++))
    fi

    # Verifier main role
    if ! grep -q 'role="main"' "$SRC/$f"; then
        echo -e "  ${RED}MAIN ROLE MANQUANT${NC} $f"
        ((ERRORS++))
    fi
done
echo -e "  ${GREEN}Verification terminee${NC}"
echo ""

# 5. Breadcrumb aria-current
echo "--- 5. Breadcrumb aria-current ---"
for f in "${HTML_FILES[@]}"; do
    if [ ! -f "$SRC/$f" ]; then continue; fi

    if ! grep -q 'breadcrumb.*aria-current="page"' "$SRC/$f" && ! grep -A5 'breadcrumb__item' "$SRC/$f" | grep -q 'aria-current="page"'; then
        echo -e "  ${YELLOW}ATTENTION${NC} $f — verifier aria-current dans le breadcrumb"
        ((WARNINGS++))
    fi
done
echo -e "  ${GREEN}Verification terminee${NC}"
echo ""

# 6. SEO : title et meta description
echo "--- 6. SEO ---"
for f in "${HTML_FILES[@]}"; do
    if [ ! -f "$SRC/$f" ]; then continue; fi

    if ! grep -q '<title>' "$SRC/$f"; then
        echo -e "  ${RED}TITLE MANQUANT${NC} $f"
        ((ERRORS++))
    fi

    if ! grep -q 'name="description"' "$SRC/$f"; then
        echo -e "  ${RED}META DESC MANQUANTE${NC} $f"
        ((ERRORS++))
    fi

    if ! grep -q 'lang="fr"' "$SRC/$f"; then
        echo -e "  ${RED}LANG FR MANQUANT${NC} $f"
        ((ERRORS++))
    fi
done
echo -e "  ${GREEN}Verification terminee${NC}"
echo ""

# 7. Ancres internes
echo "--- 7. Ancres internes ---"
for f in "${HTML_FILES[@]}"; do
    if [ ! -f "$SRC/$f" ]; then continue; fi

    # Extraire les ancres locales (href="#xxx" mais pas href="#")
    anchors=$(grep -oE 'href="#[^"]+"' "$SRC/$f" 2>/dev/null | sed 's/href="#//;s/"//' | sort -u)

    for anchor in $anchors; do
        if ! grep -q "id=\"$anchor\"" "$SRC/$f"; then
            echo -e "  ${YELLOW}ANCRE ORPHELINE${NC} $f -> #$anchor"
            ((WARNINGS++))
        fi
    done
done
echo -e "  ${GREEN}Verification terminee${NC}"
echo ""

# Resume
echo "=== Resume ==="
echo -e "Fichiers HTML : ${#HTML_FILES[@]}"
echo -e "Erreurs : ${RED}${ERRORS}${NC}"
echo -e "Avertissements : ${YELLOW}${WARNINGS}${NC}"

if [ $ERRORS -eq 0 ]; then
    echo -e "\n${GREEN}Site valide !${NC}"
    exit 0
else
    echo -e "\n${RED}Des erreurs ont ete detectees.${NC}"
    exit 1
fi
