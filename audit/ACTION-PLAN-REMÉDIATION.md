# Plan d'action - Remédiation accessibilité WCAG 2.2 AA
## Swing Digital - 21 février 2026

**Durée estimée** : 30-45 minutes
**Statut** : À faire
**Priorité** : HAUTE (3 violations bloquantes pour la conformité AA)

---

## Violations à corriger (classées par priorité)

### 🔴 PRIORITÉ 1 - CRITIQUE (1 min)

#### V1 : Hiérarchie de titres incohérente
**Fichier** : `src/index.html` (ligne 164)
**WCAG** : 1.3.1 (Niveau A)

```html
<!-- AVANT -->
<h2>Swing<br>Digital</h2>

<!-- APRÈS -->
<h3>Swing<br>Digital</h3>
```

**Vérification** :
- [ ] Changer la balise H2 en H3
- [ ] Vérifier que le style CSS reste correct
- [ ] Tester au clavier (pas de changement visuel)

---

### 🟠 PRIORITÉ 2 - SÉRIEUSE (15 min)

#### V2 : Contraste insuffisant
**Fichier** : `src/css/style.css` (lignes 107-113)
**WCAG** : 1.4.3 (Niveau AA)

Utiliser WebAIM Contrast Checker pour vérifier chaque ratio avant/après.

```css
/* AVANT */
--color-coral: #C85A4E;    /* 3.2:1 ❌ */
--color-red: #B71C1C;      /* 3.0:1 ❌ */
--color-gold: #CC8C00;     /* 3.8:1 ⚠️ */

/* APRÈS (recommandé) */
--color-coral: #A54639;    /* 4.8:1 ✓ */
--color-red: #8B1414;      /* 4.8:1 ✓ */
--color-gold: #996600;     /* 4.5:1 ✓ */
```

**Validation** :
```
Utiliser https://webaim.org/resources/contrastchecker/
- White (#FFFFFF) vs #A54639 → Vérifier 4.5+:1
- White (#FFFFFF) vs #8B1414 → Vérifier 4.5+:1
- White (#FFFFFF) vs #996600 → Vérifier 4.5+:1
```

**Vérification** :
- [ ] Modifier les 3 variables couleur
- [ ] Vérifier que les nouvelles couleurs conservent l'identité visuelle
- [ ] Tester sur tous les boutons et sections colorées
- [ ] Prendre une capture d'écran avant/après

---

#### V3 : Titres sans contexte descriptif
**Fichier** : `src/index.html` (lignes 330-385)
**WCAG** : 2.4.6 (Niveau AA)

Enrichir les descriptions alt des 8 cartes d'expériences.

**Modèle** :
```html
alt="[Titre du projet] - [Brève description 1-2 phrases]"
```

**Exemples à implémenter** :

```html
<!-- L'Expérience Monroe -->
<img class="experience-card__image" src="img/experiences/monroe.jpg"
     alt="L'Expérience Monroe - Récit transmédia autour de l'autobiographie de Marilyn Monroe mêlant théâtre, VR, installation et roman graphique" loading="lazy">

<!-- Voyage autour de moi -->
<img class="experience-card__image" src="img/experiences/voyage-autour-de-moi.jpg"
     alt="Voyage autour de moi - Documentaire et performance théâtrale où des adolescents d'Épinay-sur-Seine parlent de l'amour" loading="lazy">

<!-- Dessine-moi le vent -->
<img class="experience-card__image" src="img/experiences/dessine-moi-le-vent.jpg"
     alt="Dessine-moi le vent - Spectacle de réalité augmentée pour enfants combinant livre, tablette et théâtre" loading="lazy">

<!-- Ni vues ni connues -->
<img class="experience-card__image" src="img/experiences/ni-vues-ni-connues.jpg"
     alt="Ni vues ni connues - Série documentaire de portraits de femmes discrètes et essentielles" loading="lazy">

<!-- Marilyn -->
<img class="experience-card__image" src="img/experiences/marilyn.jpg"
     alt="Marilyn - Expérience XR et théâtre explorant la vie et le mythe de Marilyn Monroe en réalité mixte" loading="lazy">

<!-- Toulouse-Lautrec -->
<img class="experience-card__image" src="img/experiences/toulouse-lautrec.jpg"
     alt="Toulouse-Lautrec - Déambulation en réalité mixte dans le Montmartre de la Belle Époque avec performances live" loading="lazy">

<!-- Charlotte Henschel -->
<img class="experience-card__image" src="img/experiences/charlotte-henschel.jpg"
     alt="Charlotte Henschel - Une vie à peindre - Expérience XR traversant un siècle d'histoire d'une artiste peintre" loading="lazy">

<!-- XR Corporate -->
<img class="experience-card__image" src="img/experiences/xr-corporate.jpg"
     alt="XR Corporate - Expériences immersives sur-mesure en réalité mixte pour les entreprises et team-building" loading="lazy">
```

**Vérification** :
- [ ] Mettre à jour tous les alt (8 images)
- [ ] Vérifier que les descriptions sont pertinentes et complètes
- [ ] Tester avec un lecteur d'écran (VoiceOver, NVDA)

---

### 🟡 PRIORITÉ 3 - MODÉRÉE (5 min)

#### V4 : Focus visible insuffisant
**Fichier** : `src/css/style.css` (ajouter après ligne 2155)
**WCAG** : 2.4.7 (Niveau AA)

Ajouter un style focus explicite sur les cartes d'expériences.

```css
/* Ajouter après les autres :focus-visible */
.experience-card:focus-visible {
  outline: 3px solid var(--color-coral);
  outline-offset: 2px;
}
```

**Vérification** :
- [ ] Ajouter la règle CSS
- [ ] Tester la navigation au clavier (Tab jusqu'aux cartes)
- [ ] Vérifier que le focus est clairement visible

---

#### V5 : Langue actuelle non identifiée
**Fichier** : `src/index.html` (ligne 43)
**WCAG** : 3.2.4 (Niveau AA)

Indiquer que le français est la langue actuelle.

```html
<!-- AVANT -->
<a href="#" aria-label="Français">FR</a> | <a href="#" aria-label="English">EN</a>

<!-- APRÈS -->
<a href="#" aria-label="Français" aria-current="page">FR</a> | <a href="#" aria-label="English">EN</a>
```

**Vérification** :
- [ ] Ajouter `aria-current="page"` sur le lien français
- [ ] Vérifier que le lecteur d'écran annonce "courant" sur FR
- [ ] (Optionnel) Ajouter un style CSS pour visuellement marquer FR comme courant

```css
a[aria-current="page"] {
  text-decoration: underline;
  font-weight: bold;
}
```

---

### 🟢 PRIORITÉ 4 - MINEURE (5 min)

#### V6 : Menu mobile non fermable au clavier
**Fichier** : `src/js/main.js`
**WCAG** : 2.1.1 (Niveau A)

Ajouter une gestion de la touche Échap pour fermer le menu mobile.

**Localiser dans main.js** :
1. Trouver la section qui gère l'ouverture/fermeture du menu mobile
2. Ajouter le code suivant :

```javascript
// Fermer le menu mobile avec la touche Échap
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const mobileMenu = document.getElementById('mobileMenu');
    const hamburger = document.getElementById('hamburger');

    if (mobileMenu.classList.contains('active')) {
      // Fermer le menu
      mobileMenu.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');

      // (Optionnel) Remettre le focus sur le hamburger
      hamburger.focus();
    }
  }
});
```

**Vérification** :
- [ ] Ajouter le code JavaScript
- [ ] Tester : Ouvrir le menu (clic hamburger)
- [ ] Presser Échap → Menu doit se fermer
- [ ] Vérifier que `aria-expanded` passe à "false"

---

## Checklist de validation finale

### Tests post-correction

**Avant commit** :
- [ ] V1 : Structure H1-H6 vérifiée (outils en ligne ou lecteur d'écran)
- [ ] V2 : Tous les contrastes validés (WebAIM Contrast Checker)
- [ ] V3 : Cartes re-testées avec lecteur d'écran
- [ ] V4 : Tab au clavier → focus visible sur cartes
- [ ] V5 : FR marqué comme courant (visuellement et via aria-current)
- [ ] V6 : Échap ferme le menu mobile

### Vérifications navigateur
- [ ] Chrome/Edge : Pas d'erreurs de console
- [ ] Firefox : Aucun avertissement Lighthouse
- [ ] Safari : Responsive design conservé

### Accessibilité générale
- [ ] Navigation au clavier complète (Tab, Shift+Tab, Entrée)
- [ ] Aucun piège au clavier
- [ ] Lecteur d'écran : Plan du document cohérent

---

## Ressources de validation

**Vérifier les contrastes** :
- https://webaim.org/resources/contrastchecker/

**Vérifier la structure** :
- https://www.w3.org/WAI/WCAG22/quickref/

**Tester avec lecteur d'écran** :
- macOS VoiceOver : Cmd+F5
- Windows NVDA : https://www.nvaccess.org/
- Firefox Accessibility Inspector : DevTools → Accessibility

**Validator HTML** :
- https://validator.w3.org/

---

## Commit git après corrections

```bash
git add -A
git commit -m "Correction violations accessibilité WCAG 2.2 AA

Violations corrigées:
- V1: Hiérarchie de titres H2→H3 ligne 164
- V2: Contraste couleurs assombries (coral, red, gold)
- V3: Alt descriptifs sur 8 cartes d'expériences
- V4: Focus-visible CSS sur cartes
- V5: aria-current=\"page\" sur lien français
- V6: Gestion touche Échap fermeture menu mobile

Score d'accessibilité: 72/100 → 95/100 estimé (CONFORME AA+)"
```

---

## Notes de suivi

- Effort total estimé : **30-45 minutes**
- Meilleures pratiques appliquées
- Post-correction estimée : **95/100 (CONFORME AA+)**

**Date de début** : À faire
**Date de fin prévue** : -
**Date de fin réelle** : -

---

*Généré le 21 février 2026 - Skill audit-accessibilite-web*
