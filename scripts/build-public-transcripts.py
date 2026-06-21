#!/usr/bin/env python3
"""Génère les transcripts publics Swing Digital depuis les sorties STT."""

from __future__ import annotations

import html
import re
import shutil
from dataclasses import dataclass
from datetime import datetime
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
TRANSCRIPTS_DIR = ROOT / "transcripts"
PUBLIC_DIR = ROOT / "docs" / "transcripts"
SRC_DIR = ROOT / "src"
CSS_VERSION = "20260621-1900"


@dataclass(frozen=True)
class TranscriptConfig:
    slug: str
    title: str
    source: str
    headings: tuple[str, ...]
    source_label: str = "transcript faster-whisper français"
    replacement_overrides: tuple[tuple[str, str], ...] = ()
    translated_text: str | None = None


COMMON_REPLACEMENTS: tuple[tuple[str, str], ...] = (
    ("Epinès-sur-Seine", "Épinay-sur-Seine"),
    ("moutés", "montés"),
    ("Le cat, c'est", "Le théâtre, c'est"),
    ("tu te montes devant", "tu te montres devant"),
    ("des envois", "des ennuis"),
    ("ne racont que", "ne racontent que"),
    ("la humilité", "l'humilité"),
    ("trésors en bouille", "trésors en vous"),
    ("La concert d'orientation", "La conseillère d'orientation"),
    ("Je m'instage chez elle.", "Je m'installe chez elle."),
    ("Il devient folle.", "Elle devient folle."),
    ("Hivre de bonheur.", "Ivre de bonheur."),
    ("le plus gros bus", "le plus gros buzz"),
    ("une liaison cumulueuse", "une liaison tumultueuse"),
    ("Marilyn, est-ce que je peux vous peser\nune question personnelle ?", "Marilyn, est-ce que je peux vous poser\nune question personnelle ?"),
    ("quand vous y apparissez", "quand vous y apparaissez"),
    ("plus d'écoles à dramatique", "plus d'écoles d'art dramatique"),
    ("plus d'arrosage de plouze", "plus d'arrosage de pelouse"),
    ("Milton Green", "Milton Greene"),
    ("Milti est mon mentor.", "Milton est mon mentor."),
    ("Milton Green-Mountain Road", "Milton Greene-Marilyn Monroe"),
)


THE_ARCHIVES_FR = """Milton Greene est photographe. Pendant des années, des millions d'entre nous ont vu ses images en couverture de Look, Life, Vogue et d'autres magazines.
Milton, trente-trois ans, sa femme et leur fils d'un an vivent dans cette maison de cent cinquante ans à Weston, dans le Connecticut.
C'est à environ une heure de route de son studio à Manhattan.

Milton Greene était mon mentor. C'était mon meilleur ami : grandir autour de lui, apprendre la photographie avec lui, apprendre à tirer les images avec lui.
Quand j'ai décidé de ranger mes appareils et d'entrer dans la restauration, c'était par amour pour mon père.
Il est mort le cœur brisé à l'idée que certains des meilleurs travaux qu'il ait jamais faits n'aient jamais été publiés, jamais vus, et ne puissent jamais être reproduits.
Quand j'ai découvert le numérique, j'ai vu l'occasion de ramener mon père à moi, et de ramener les photos au monde.

Je pense qu'il est important de capturer ces images aussi bien que la technologie le permet.
La technologie continue de changer, donc parfois nous recommençons encore et encore.
Il n'y a qu'un nombre limité de photographies : quatre mille dans toute la collaboration entre Milton Greene et Marilyn Monroe.
Travaillons sur toutes celles que nous pouvons.

Ce que nous faisons, c'est entrer dans l'image et capturer l'œil, les lèvres, en nous assurant de conserver les détails dans les hautes lumières et dans les ombres.
Nous exportons donc depuis FlexColor, le logiciel fourni avec le scanner, vers Photoshop.
Du début à la fin, cela représente en moyenne quarante à soixante heures, selon l'image.
La plus grande partie du nettoyage se fait pixel par pixel avec l'outil correcteur.
Cela peut prendre trente à quarante heures de travail.
Ce que les gens ne mesurent pas vraiment, c'est le niveau de détail de ce travail ; quand on manipule vraiment ces pixels, il faut faire attention à ne pas créer de cicatrice numérique.

Ici, on voit l'état du film.
C'est de la poussière incrustée à la surface du film.
Une rayure ici, des rayures là.
Ce sont de petites choses, mais voyez comme cela interfère avec les cheveux.
Tout est là.
Rav a tracé un détourage, puis il l'adoucit selon la douceur du film.
Une fois que j'ai le masque, cela me permet de choisir quels outils de calques de correction couleur je vais utiliser.
La plupart du temps, ce sera un choix entre teinte et saturation, courbes et correction sélective.
Parfois il y aura deux ou trois calques de réglage avec un masque.
D'autres fois, il peut y en avoir jusqu'à six.
Sur le visage et les cheveux, obtenir les bonnes couleurs demande davantage de contrôle avec les masques.

Nous tirerons probablement sept épreuves pour sentir comment l'image s'imprime et comment elle rend à l'écran, parce que l'écran donne beaucoup plus d'informations que ce que l'on peut vraiment obtenir sur papier.
Mais j'ai besoin de voir les tirages en grand pour vraiment voir les bords des masques, leur fusion, et s'il y a une erreur à corriger.
Quand j'avais onze ans, mon père m'a mis dans la chambre noire et m'a appris à tirer.
Sa manière d'aborder l'image, ce qu'il voulait renforcer, assombrir, retenir ou contrôler, permettait de tirer le meilleur de l'image.
Le tirage finissait donc par paraître différent du morceau de film original achevé.
C'est ce que fait un tireur d'art : il apporte une autre couche d'expertise pour que le tirage tienne par lui-même.

La commande originale de Look magazine qui a amené Milton à photographier Marilyn consistait en fait à photographier plusieurs jeunes talents prometteurs à Hollywood.
Les rédacteurs de Look ont présenté le portfolio de Milton à Marilyn.
Quand elle a vu ses photographies, elle a été très enthousiaste à l'idée de travailler avec lui.
Ils se sont rencontrés en Californie et ont fait la séance de la mandoline et du négligé le premier jour.
En voyant les films le lendemain matin, Marilyn a vu dans la photographie de Milton une part d'elle-même qui était réelle.
Il n'aurait jamais laissé qui que ce soit voir une mauvaise photo s'il en avait prise une, et elle pouvait croire qu'il était un protecteur.
C'est ainsi que leur relation de photographe et de muse s'est construite.
Dans les mois qui ont suivi, Milton est retourné en Californie pour photographier Marilyn.
Ils allaient au département costumes de la 20th Century Fox, enfilaient une tenue de fantaisie, puis partaient photographier sur les plateaux extérieurs.
Sur une courte période, on voit des photographies de Marilyn qui joue à se déguiser, qu'elle soit paysanne, gitane ou prostituée.
Il y a une part de fantaisie et de plaisir dans leur collaboration.
Ils s'amusaient. C'était du faire-semblant.
Tout ce que Milton voulait faire, c'était prouver qu'elle pouvait être l'actrice de composition qu'elle voulait être, et construire sa confiance."""


CONFIGS: tuple[TranscriptConfig, ...] = (
    TranscriptConfig(
        slug="galerie-joseph",
        title="Prolongation de L'Expérience Monroe",
        source="Prolongation de l'Expérience Monroe pour les fêtes, jusqu'au 14 janvier 2024 [Le2Ybd_X6A0].fr.txt",
        headings=("La Galerie Joseph", "Le parcours Monroe", "Dans la peau de Marilyn"),
    ),
    TranscriptConfig(
        slug="dessine-moi-le-vent",
        title="Dessine-moi le vent",
        source="DESSINE-MOI LE VENT (teaser) [250420667].fr.txt",
        headings=("Un livre augmenté", "L'imaginaire de Naël et Leïla", "Un spectacle mobile"),
    ),
    TranscriptConfig(
        slug="voyage-autour-de-moi",
        title="Voyage autour de moi",
        source="Voyage autour de moi [528291420].fr.txt",
        headings=("Première rencontre", "Questions d'adolescence", "Amour, peurs et famille", "Ateliers et théâtre", "Rêves et texte final"),
    ),
    TranscriptConfig(
        slug="the-play",
        title="Marilyn Monroe - Confession inachevée",
        source="Marilyn Monroe - Confession inachevée - Roman Graphique. [782642139].fr.txt",
        headings=("Générique", "Entrée en scène"),
        replacement_overrides=(("Générique\nGénérique", "Générique"),),
    ),
    TranscriptConfig(
        slug="experience-monroe",
        title="L'Expérience Monroe",
        source="L'EXPERIENCE MONROE - UN RÉCIT TRANSMÉDIA [838300539].fr.txt",
        headings=("Le texte de Marilyn", "Les formes du parcours", "Forum des images", "VR et mémoire", "Le travail de création"),
    ),
    TranscriptConfig(
        slug="podcast-devenir-marilyn",
        title="Podcast - Devenir Marilyn",
        source="DEVENIR MARILYN - (Transforming into Marilyn)  Épisode 1 - Episode 2 [0YDIZeBbYL0].fr.txt",
        headings=("Norma Jeane et Gladys", "La maison puis l'orphelinat", "Construire Marilyn"),
    ),
    TranscriptConfig(
        slug="podcast-icone-coree",
        title="Podcast - Une icône en Corée",
        source="UNE ICÔNE EN CORÉE (An Icon in Korea) - Épisode 3 ⧸ UN SAGE M' OUVRE LES YEUX -  Épisode 4 [iJjEmnqXWzU].fr.txt",
        headings=("La scène en Corée", "La question du jeu", "Devenir artiste"),
    ),
    TranscriptConfig(
        slug="podcast-kennedy",
        title="Podcast - Kennedy et moi",
        source="KENNEDY ET MOI ( The President and I) EPISODE 4 [FD7Du_SD-QI].fr.txt",
        headings=("Happy birthday, Mr. President", "Une relation mondaine", "Rumeurs et politique"),
    ),
    TranscriptConfig(
        slug="podcast-ma-mort",
        title="Podcast - Ma mort et après...",
        source="MA MORT ET ÂPRES...( The After life)  ÉPISODE 5 et 6 [rx0VDLfEbLU].fr.txt",
        headings=("La Fox et les économies", "Le 4 août", "Après la mort"),
    ),
    TranscriptConfig(
        slug="podcast-the-archives",
        title="Podcast - The Archives",
        source="The archives - Joshua Greene [AB2Fb1wdHoo].en.txt",
        headings=("Milton Greene", "Restaurer les images", "Masques et tirages", "Marilyn devant l'objectif"),
        source_label="transcript faster-whisper anglais, traduction française",
        translated_text=THE_ARCHIVES_FR,
    ),
)


PAGE_TARGETS = {
    "src/index.html": ("galerie-joseph",),
    "src/dessine-moi-le-vent.html": ("dessine-moi-le-vent",),
    "src/voyage-autour-de-moi.html": ("voyage-autour-de-moi",),
    "src/monroe-piece.html": ("the-play",),
    "src/experience-monroe.html": ("experience-monroe",),
    "src/monroe-podcasts.html": (
        "podcast-devenir-marilyn",
        "podcast-icone-coree",
        "podcast-kennedy",
        "podcast-ma-mort",
        "podcast-the-archives",
    ),
}


def slug_to_config() -> dict[str, TranscriptConfig]:
    return {config.slug: config for config in CONFIGS}


def normalize_text(text: str, config: TranscriptConfig) -> tuple[str, list[tuple[str, str, str]]]:
    replacements = list(COMMON_REPLACEMENTS) + list(config.replacement_overrides)
    changes: list[tuple[str, str, str]] = []
    for before, after in replacements:
        if before in text:
            text = text.replace(before, after)
            changes.append((before, after, "correction de forme ou graphie confirmee"))

    subtitle_credit_pattern = r"\s*(?:Crédit de sous-titrage|Sous-titrage) ST'501"
    if re.search(subtitle_credit_pattern, text):
        text = re.sub(subtitle_credit_pattern, "", text)
        changes.append((
            "mention technique de sous-titrage",
            "suppression",
            "suppression d'une mention technique de sous-titrage",
        ))

    text = re.sub(r"\n{3,}", "\n\n", text.strip())
    return text.strip() + "\n", changes


def backup_sources(timestamp: str) -> None:
    for config in CONFIGS:
        source = TRANSCRIPTS_DIR / config.source
        if not source.exists():
            raise FileNotFoundError(source)
        existing_backups = sorted(source.parent.glob(f"{source.name}.bak-*"))
        if existing_backups:
            continue
        backup = source.with_name(f"{source.name}.bak-{timestamp}")
        shutil.copy2(source, backup)


def words_count(text: str) -> int:
    return len(re.findall(r"[0-9A-Za-zÀ-ÖØ-öø-ÿ_'-]+", text))


def paragraphs_from_text(text: str, max_words: int = 70) -> list[str]:
    normalized = re.sub(r"\s+", " ", text.strip())
    sentences = [part.strip() for part in re.split(r"(?<=[.!?…])\s+", normalized) if part.strip()]
    paragraphs: list[str] = []
    current_sentences: list[str] = []
    current_words = 0

    for sentence in sentences:
        sentence_words = words_count(sentence)
        if current_sentences and current_words + sentence_words > max_words:
            paragraphs.append(" ".join(current_sentences))
            current_sentences = []
            current_words = 0

        current_sentences.append(sentence)
        current_words += sentence_words

    if current_sentences:
        paragraphs.append(" ".join(current_sentences))

    return paragraphs


def split_sections(paragraphs: list[str], headings: tuple[str, ...]) -> list[tuple[str, list[str]]]:
    if not paragraphs:
        return [(headings[0], [])]

    section_count = len(headings)
    result: list[tuple[str, list[str]]] = []
    for index, heading in enumerate(headings):
        start = round(index * len(paragraphs) / section_count)
        end = round((index + 1) * len(paragraphs) / section_count)
        result.append((heading, paragraphs[start:end]))
    return result


def render_transcript(config: TranscriptConfig, text: str) -> str:
    panel_id = f"transcript-{config.slug}"
    sections = split_sections(paragraphs_from_text(text), config.headings)

    lines = [
        f'<div class="media-transcript" data-transcript="{html.escape(config.slug)}">',
        (
            f'    <button class="media-transcript__button" type="button" '
            f'aria-expanded="false" aria-controls="{panel_id}" '
            f'data-label-show="Lire la transcription : {html.escape(config.title)}" '
            f'data-label-hide="Masquer la transcription : {html.escape(config.title)}">'
            f'<span class="js-disclosure-label">Lire la transcription : {html.escape(config.title)}</span></button>'
        ),
        f'    <div id="{panel_id}" class="media-transcript__panel" hidden>',
        f'        <h3 class="media-transcript__title">Transcription - {html.escape(config.title)}</h3>',
    ]

    for heading, section_paragraphs in sections:
        if not section_paragraphs:
            continue
        lines.append('        <section class="media-transcript__section">')
        lines.append(f'            <h4>{html.escape(heading)}</h4>')
        for paragraph in section_paragraphs:
            lines.append(f'            <p>{html.escape(paragraph)}</p>')
        lines.append("        </section>")

    lines.extend(["    </div>", "</div>"])
    return "\n".join(lines)


def write_public_files(timestamp: str) -> dict[str, str]:
    PUBLIC_DIR.mkdir(parents=True, exist_ok=True)
    rendered: dict[str, str] = {}

    for config in CONFIGS:
        source = TRANSCRIPTS_DIR / config.source
        source_text = source.read_text(encoding="utf-8")
        if config.translated_text is not None:
            corrected_text = config.translated_text.strip() + "\n"
            changes = [("transcript anglais source", "traduction française publiée", "traduction")]
        else:
            corrected_text, changes = normalize_text(source_text, config)

        corrected_path = PUBLIC_DIR / f"{config.slug}.fr.corrected.txt"
        report_path = PUBLIC_DIR / f"rapport-corrections-{config.slug}.md"
        html_path = PUBLIC_DIR / f"{config.slug}.html"

        corrected_path.write_text(corrected_text, encoding="utf-8")
        rendered_html = render_transcript(config, corrected_text)
        html_path.write_text(rendered_html + "\n", encoding="utf-8")
        rendered[config.slug] = rendered_html

        report_lines = [
            f"# Rapport de corrections - {config.title}",
            "",
            f"- Source : `{source.relative_to(ROOT)}`",
            f"- Sauvegarde source : `{source.name}.bak-{timestamp}`",
            f"- Source primaire : {config.source_label}",
            "- Locuteurs : non applicable, aucun label de locuteur source.",
            "",
            "## Corrections appliquées",
            "",
            "| Avant | Après | Catégorie |",
            "|---|---|---|",
        ]
        if changes:
            for before, after, category in changes:
                report_lines.append(f"| `{before}` | `{after}` | {category} |")
        else:
            report_lines.append("| Aucune correction automatique appliquée | Aucune | Non applicable |")

        report_lines.extend(
            [
                "",
                "## Elements non resolus",
                "",
                "- Passages incertains conservés quand la source STT ne permet pas une correction sûre.",
                "- Noms propres et graphies à revérifier par l'équipe métier.",
            ]
        )
        report_path.write_text("\n".join(report_lines) + "\n", encoding="utf-8")

    return rendered


def marker(slug: str, block: str) -> str:
    return f"<!-- transcript:{slug}:start -->\n{block}\n<!-- transcript:{slug}:end -->"


def replace_or_insert(text: str, slug: str, block: str, fallback_anchor: str, after: bool = True) -> str:
    start_marker = f"<!-- transcript:{slug}:start -->"
    end_marker = f"<!-- transcript:{slug}:end -->"
    wrapped = marker(slug, block)

    if start_marker in text and end_marker in text:
        start = text.index(start_marker)
        end = text.index(end_marker, start) + len(end_marker)
        return text[:start] + wrapped + text[end:]

    index = text.index(fallback_anchor)
    insert_at = index + len(fallback_anchor) if after else index
    return text[:insert_at] + "\n" + wrapped + text[insert_at:]


def remove_marker(text: str, slug: str) -> str:
    start_marker = f"<!-- transcript:{slug}:start -->"
    end_marker = f"<!-- transcript:{slug}:end -->"
    if start_marker not in text or end_marker not in text:
        return text
    start = text.index(start_marker)
    end = text.index(end_marker, start) + len(end_marker)
    return text[:start] + text[end:]


def after_section(text: str, section_id: str) -> str:
    section_start = text.index(f'<section id="{section_id}"')
    return text.index("</section>", section_start) + len("</section>")


def inject_pages(rendered: dict[str, str]) -> None:
    index_path = SRC_DIR / "index.html"
    text = index_path.read_text(encoding="utf-8")
    anchor = '<p class="page3__project-meta">Diffusion : Forum des images, <a href="https://youtu.be/Le2Ybd_X6A0?si=hi0dl2k455NCpaog" target="_blank" rel="noopener noreferrer">Galerie Joseph</a></p>'
    text = replace_or_insert(text, "galerie-joseph", rendered["galerie-joseph"], anchor)
    index_path.write_text(update_css_version(text), encoding="utf-8")

    for page, section_id, slug in (
        ("dessine-moi-le-vent.html", "page-45", "dessine-moi-le-vent"),
        ("voyage-autour-de-moi.html", "page-42", "voyage-autour-de-moi"),
        ("monroe-piece.html", "page-19", "the-play"),
        ("experience-monroe.html", "page-11", "experience-monroe"),
    ):
        path = SRC_DIR / page
        text = path.read_text(encoding="utf-8")
        if f"<!-- transcript:{slug}:start -->" in text:
            text = replace_or_insert(text, slug, rendered[slug], "")
        else:
            insert_at = after_section(text, section_id)
            text = text[:insert_at] + "\n" + marker(slug, rendered[slug]) + text[insert_at:]
        path.write_text(update_css_version(text), encoding="utf-8")

    podcasts_path = SRC_DIR / "monroe-podcasts.html"
    text = podcasts_path.read_text(encoding="utf-8")
    podcast_block = "\n".join(rendered[slug] for slug in PAGE_TARGETS["src/monroe-podcasts.html"])
    text = remove_marker(text, "podcasts")
    insert_at = after_section(text, "page-33")
    wrapped_podcasts = marker(
        "podcasts",
        (
            '<section class="media-transcripts media-transcripts--podcasts" '
            'aria-labelledby="podcasts-transcripts-title">\n'
            '    <h2 id="podcasts-transcripts-title" class="media-transcripts__title">Transcriptions des podcasts</h2>\n'
            f"{podcast_block}\n"
            "</section>"
        ),
    )
    text = text[:insert_at] + "\n" + wrapped_podcasts + text[insert_at:]
    podcasts_path.write_text(update_css_version(text), encoding="utf-8")


def update_css_version(text: str) -> str:
    return re.sub(r"css/style\.css\?v=[0-9-]+", f"css/style.css?v={CSS_VERSION}", text)


def main() -> int:
    timestamp = datetime.now().strftime("%Y%m%d-%H%M%S")
    backup_sources(timestamp)
    rendered = write_public_files(timestamp)
    inject_pages(rendered)
    print(f"Transcripts publics générés : {len(rendered)}")
    print(f"Dossier : {PUBLIC_DIR.relative_to(ROOT)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
