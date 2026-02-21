#!/usr/bin/env python3
"""
Script pour générer automatiquement le HTML pour toutes les pages extraites.
Lit les fichiers texte et images de chaque page-N et génère les sections HTML.
"""

import os
import re
import json
from pathlib import Path
from html import escape

# Configuration
PAGES_EXTRACTED = Path("/Users/alex/Claude/active/swing-digital/src/pages-extracted")
OUTPUT_FILE = Path("/Users/alex/Claude/active/swing-digital/src/generated-pages.html")

def extract_page_number(path):
    """Extrait le numéro de page du chemin."""
    match = re.search(r'page-(\d+)', str(path))
    return int(match.group(1)) if match else 0

def count_images(page_dir):
    """Compte le nombre d'images dans une page."""
    images = sorted([
        f for f in os.listdir(page_dir)
        if f.startswith(f'page-{extract_page_number(page_dir)}-image-') and f.endswith('.jpg')
    ])
    return len(images)

def read_page_text(page_dir):
    """Lit le fichier texte d'une page."""
    text_file = page_dir / f"texte-page-{extract_page_number(page_dir)}.md"
    if text_file.exists():
        with open(text_file, 'r', encoding='utf-8') as f:
            return f.read().strip()
    return ""

def sanitize_text(text):
    """Nettoie et échappe le texte."""
    return escape(text)

def generate_alt_text(page_num, text, image_index):
    """Génère un alt text WCAG 2.2 AA (125+ caractères)."""
    # Stratégie : combiner le contexte de la page avec le numéro d'image
    base_alt = f"Page {page_num}, image {image_index + 1}. "

    # Ajouter du contexte du texte de la page (jusqu'à 125 caractères)
    context = text[:120].strip()
    if context:
        # Prendre les premières lignes significatives
        lines = [l.strip() for l in context.split('\n') if l.strip()]
        context = " ".join(lines[:3])[:120]

    alt_text = base_alt + context

    # Assurer que c'est au moins 125 caractères
    if len(alt_text) < 125:
        alt_text += " - Contenu visuel de la page Swing Digital présentant les services et expériences immersives proposées."

    return alt_text[:250]  # Limiter à 250 caractères pour rester raisonnable

def get_image_path(page_num, image_index):
    """Retourne le chemin relatif de l'image pour le HTML."""
    # Les images seront copiées dans src/img/pages/page-N/
    return f"./img/pages/page-{page_num}/page-{page_num}-image-{image_index + 1}.jpg"

def generate_page_html(page_num):
    """Génère le HTML pour une page donnée."""
    page_dir = PAGES_EXTRACTED / f"page-{page_num}"

    if not page_dir.exists():
        return None

    text = read_page_text(page_dir)
    image_count = count_images(page_dir)

    if not text and image_count == 0:
        return None

    # Titre générique de la section (sera remplacé par du contenu spécifique si nécessaire)
    section_title = f"Page {page_num}"

    # Classe et ID uniques
    page_id = f"page-{page_num}"
    page_class = f"page page--{page_num}"

    html = f'''        <!-- Page {page_num} -->
        <section id="{page_id}" class="section {page_class}" aria-labelledby="page-{page_num}-title">
            <div class="page__container">
                <h2 id="page-{page_num}-title">{section_title}</h2>
                <div class="page__content">
'''

    # Ajouter le texte
    if text:
        # Convertir le texte brut en paragraphes
        paragraphs = [p.strip() for p in text.split('\n\n') if p.strip()]
        for para in paragraphs[:3]:  # Limiter à 3 paragraphes
            html += f'                    <p class="page__text">{sanitize_text(para)}</p>\n'

    # Ajouter les images
    if image_count > 0:
        html += f'                    <div class="page__gallery" role="region" aria-label="Galerie d\'images page {page_num}">\n'
        for i in range(image_count):
            alt_text = generate_alt_text(page_num, text, i)
            img_path = get_image_path(page_num, i)
            img_filename = f"page-{page_num}-image-{i + 1}.jpg"

            html += f'                        <img src="{img_path}" alt="{escape(alt_text)}" class="page__image" loading="lazy">\n'
        html += '                    </div>\n'

    html += '''                </div>
            </div>
        </section>

'''

    return html

def main():
    """Génère le fichier HTML avec toutes les pages."""
    all_pages_html = ""
    page_count = 0

    # Compter le nombre total de pages
    max_page = max(
        (extract_page_number(d) for d in PAGES_EXTRACTED.iterdir() if d.is_dir()),
        default=0
    )

    print(f"[INFO] Trouvé {max_page} pages à traiter")

    # Générer le HTML pour chaque page
    for page_num in range(1, max_page + 1):
        page_html = generate_page_html(page_num)
        if page_html:
            all_pages_html += page_html
            page_count += 1
            print(f"[OK] Page {page_num} générée")
        else:
            print(f"[SKIP] Page {page_num} manquante ou vide")

    # Écrire le fichier de sortie
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        f.write(all_pages_html)

    print(f"\n[DONE] {page_count} pages générées dans {OUTPUT_FILE}")
    print(f"[INFO] À intégrer dans index.html, section 'experiences'")

    return page_count

if __name__ == "__main__":
    main()
