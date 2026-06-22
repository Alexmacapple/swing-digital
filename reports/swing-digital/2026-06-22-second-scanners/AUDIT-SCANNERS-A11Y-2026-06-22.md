# Audit complémentaire scanners accessibilité

Date : 2026-06-22
Cible : build local `http://127.0.0.1:8792`
Périmètre : 27 URL du sitemap local
Référentiel scanner : WCAG2AA, à rapprocher du RGAA 4.1.2 avec prudence.

## Résumé exécutif

- Pa11y 9.1.1 : 0 erreurs, 352 avertissements, 2379 vérifications manuelles.
- HTML_CodeSniffer 2.5.1 : 0 erreurs, 352 avertissements, 2379 vérifications manuelles.
- Lighthouse 13.0.3 accessibilité : score 100-100/100, 0 page(s) avec audit échoué.

Important : ces scanners ne couvrent pas les 108 critères RGAA. Ils détectent une partie automatisable des critères WCAG/RGAA et remontent aussi de nombreuses vérifications manuelles à confirmer ou invalider humainement.

## Pages avec erreurs bloquantes scanner

- Pa11y : aucune erreur automatique.
- HTML_CodeSniffer : aucune erreur automatique.
- Lighthouse : aucun audit automatique échoué.

## Top codes Pa11y

- 1153 x `WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81` — Check that the link text combined with programmatically determined link context identifies the purpose of the link.
  Pages : /, /for-ai, /espaces-augmentes.html, /experiences-series.html, /the-party.html, /memory-box-vr.html, /films.html, /reservations.html
- 178 x `WCAG2AA.Principle1.Guideline1_1.1_1_1.G73,G74` — If this image cannot be fully described in a short text alternative, ensure a long text alternative is also available, such as in the body text or through a link.
  Pages : /, /espaces-augmentes.html, /experiences-series.html, /the-party.html, /memory-box-vr.html, /reservations.html, /experience-monroe.html, /voyage-autour-de-moi.html
- 173 x `WCAG2AA.Principle1.Guideline1_1.1_1_1.G94.Image` — Ensure that the img element's alt text serves the same purpose and presents the same information as the image.
  Pages : /, /espaces-augmentes.html, /experiences-series.html, /the-party.html, /memory-box-vr.html, /reservations.html, /experience-monroe.html, /voyage-autour-de-moi.html
- 133 x `WCAG2AA.Principle3.Guideline3_2.3_2_1.G107` — Check that a change of context does not occur when this input field receives focus.
  Pages : /, /espaces-augmentes.html, /experiences-series.html, /the-party.html, /memory-box-vr.html, /films.html, /reservations.html, /experience-monroe.html
- 116 x `WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.BgImage` — This element's text is placed on a background image. Ensure the contrast ratio between the text and all covered parts of the image are at least 4.5:1.
  Pages : /, /espaces-augmentes.html, /the-party.html, /memory-box-vr.html, /films.html, /reservations.html, /experience-monroe.html, /voyage-autour-de-moi.html
- 79 x `WCAG2AA.Principle1.Guideline1_4.1_4_10.C32,C31,C33,C38,SCR34,G206` — This element has "position: fixed". This may require scrolling in two dimensions, which is considered a failure of this Success Criterion.
  Pages : /, /for-ai, /espaces-augmentes.html, /experiences-series.html, /the-party.html, /memory-box-vr.html, /films.html, /reservations.html
- 69 x `WCAG2AA.Principle1.Guideline1_4.1_4_3.G145.Abs` — This element is absolutely positioned and the background color can not be determined. Ensure the contrast ratio between the text and all covered parts of the background are at least 3:1.
  Pages : /, /espaces-augmentes.html, /experiences-series.html, /the-party.html, /memory-box-vr.html, /reservations.html, /experience-monroe.html, /voyage-autour-de-moi.html
- 64 x `WCAG2AA.Principle1.Guideline1_4.1_4_3.G145.BgImage` — This element's text is placed on a background image. Ensure the contrast ratio between the text and all covered parts of the image are at least 3:1.
  Pages : /, /espaces-augmentes.html, /the-party.html, /memory-box-vr.html, /films.html, /reservations.html, /experience-monroe.html, /voyage-autour-de-moi.html
- 27 x `WCAG2AA.Principle2.Guideline2_4.2_4_2.H25.2` — Check that the title element describes the document.
  Pages : /, /for-ai, /espaces-augmentes.html, /experiences-series.html, /the-party.html, /memory-box-vr.html, /films.html, /reservations.html
- 27 x `WCAG2AA.Principle1.Guideline1_3.1_3_2.G57` — Check that the content is ordered in a meaningful sequence when linearised, such as when style sheets are disabled.
  Pages : /, /for-ai, /espaces-augmentes.html, /experiences-series.html, /the-party.html, /memory-box-vr.html, /films.html, /reservations.html
- 27 x `WCAG2AA.Principle1.Guideline1_3.1_3_3.G96` — Where instructions are provided for understanding the content, do not rely on sensory characteristics alone (such as shape, size or location) to describe objects.
  Pages : /, /for-ai, /espaces-augmentes.html, /experiences-series.html, /the-party.html, /memory-box-vr.html, /films.html, /reservations.html
- 27 x `WCAG2AA.Principle1.Guideline1_3.1_3_4.` — Check that content does not restrict its view and operation to a single display orientation, such as portrait or landscape, unless a specific display orientation is essential.
  Pages : /, /for-ai, /espaces-augmentes.html, /experiences-series.html, /the-party.html, /memory-box-vr.html, /films.html, /reservations.html

## Top codes HTML_CodeSniffer

- 1153 x `WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81` — Check that the link text combined with programmatically determined link context identifies the purpose of the link.
  Pages : /, /for-ai, /espaces-augmentes.html, /experiences-series.html, /the-party.html, /memory-box-vr.html, /films.html, /reservations.html
- 178 x `WCAG2AA.Principle1.Guideline1_1.1_1_1.G73,G74` — If this image cannot be fully described in a short text alternative, ensure a long text alternative is also available, such as in the body text or through a link.
  Pages : /, /espaces-augmentes.html, /experiences-series.html, /the-party.html, /memory-box-vr.html, /reservations.html, /experience-monroe.html, /voyage-autour-de-moi.html
- 173 x `WCAG2AA.Principle1.Guideline1_1.1_1_1.G94.Image` — Ensure that the img element's alt text serves the same purpose and presents the same information as the image.
  Pages : /, /espaces-augmentes.html, /experiences-series.html, /the-party.html, /memory-box-vr.html, /reservations.html, /experience-monroe.html, /voyage-autour-de-moi.html
- 133 x `WCAG2AA.Principle3.Guideline3_2.3_2_1.G107` — Check that a change of context does not occur when this input field receives focus.
  Pages : /, /espaces-augmentes.html, /experiences-series.html, /the-party.html, /memory-box-vr.html, /films.html, /reservations.html, /experience-monroe.html
- 116 x `WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.BgImage` — This element's text is placed on a background image. Ensure the contrast ratio between the text and all covered parts of the image are at least 4.5:1.
  Pages : /, /espaces-augmentes.html, /the-party.html, /memory-box-vr.html, /films.html, /reservations.html, /experience-monroe.html, /voyage-autour-de-moi.html
- 79 x `WCAG2AA.Principle1.Guideline1_4.1_4_10.C32,C31,C33,C38,SCR34,G206` — This element has "position: fixed". This may require scrolling in two dimensions, which is considered a failure of this Success Criterion.
  Pages : /, /for-ai, /espaces-augmentes.html, /experiences-series.html, /the-party.html, /memory-box-vr.html, /films.html, /reservations.html
- 69 x `WCAG2AA.Principle1.Guideline1_4.1_4_3.G145.Abs` — This element is absolutely positioned and the background color can not be determined. Ensure the contrast ratio between the text and all covered parts of the background are at least 3:1.
  Pages : /, /espaces-augmentes.html, /experiences-series.html, /the-party.html, /memory-box-vr.html, /reservations.html, /experience-monroe.html, /voyage-autour-de-moi.html
- 64 x `WCAG2AA.Principle1.Guideline1_4.1_4_3.G145.BgImage` — This element's text is placed on a background image. Ensure the contrast ratio between the text and all covered parts of the image are at least 3:1.
  Pages : /, /espaces-augmentes.html, /the-party.html, /memory-box-vr.html, /films.html, /reservations.html, /experience-monroe.html, /voyage-autour-de-moi.html
- 27 x `WCAG2AA.Principle2.Guideline2_4.2_4_2.H25.2` — Check that the title element describes the document.
  Pages : /, /for-ai, /espaces-augmentes.html, /experiences-series.html, /the-party.html, /memory-box-vr.html, /films.html, /reservations.html
- 27 x `WCAG2AA.Principle1.Guideline1_3.1_3_2.G57` — Check that the content is ordered in a meaningful sequence when linearised, such as when style sheets are disabled.
  Pages : /, /for-ai, /espaces-augmentes.html, /experiences-series.html, /the-party.html, /memory-box-vr.html, /films.html, /reservations.html
- 27 x `WCAG2AA.Principle1.Guideline1_3.1_3_3.G96` — Where instructions are provided for understanding the content, do not rely on sensory characteristics alone (such as shape, size or location) to describe objects.
  Pages : /, /for-ai, /espaces-augmentes.html, /experiences-series.html, /the-party.html, /memory-box-vr.html, /films.html, /reservations.html
- 27 x `WCAG2AA.Principle1.Guideline1_3.1_3_4.` — Check that content does not restrict its view and operation to a single display orientation, such as portrait or landscape, unless a specific display orientation is essential.
  Pages : /, /for-ai, /espaces-augmentes.html, /experiences-series.html, /the-party.html, /memory-box-vr.html, /films.html, /reservations.html

## Audits Lighthouse échoués

Aucun audit automatique échoué.

## Fichiers bruts

- `raw/pa11y.json`
- `raw/htmlcs.json`
- `raw/lighthouse.json`

## Limites

- Pas un audit RGAA complet à lui seul : absence de vérification humaine des alternatives pertinentes, cohérence éditoriale, ordre de lecture réel, restitution lecteur d’écran, compréhension des contenus, etc.
- Les notices Pa11y et HTML_CodeSniffer sont massivement des demandes de contrôle manuel, pas des non-conformités confirmées.
- Le site utilise des vidéos, iframes et sections immersives : certaines règles nécessitent inspection clavier et lecteur d’écran réels.
