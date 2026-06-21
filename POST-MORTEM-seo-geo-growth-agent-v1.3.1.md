# Post-mortem — `bacoco/seo-geo-growth-agent` v1.3.1

Date : 21 juin 2026  
Périmètre : installation externe depuis le tag GitHub `v1.3.1`  
Objectif : confirmer que la release est installable et que le skill fonctionne après installation.

## Résumé

La release `v1.3.1` est installable et fonctionnelle depuis un environnement temporaire propre.
Le tag GitHub existe, le clone ciblé fonctionne, les validations source passent, l’installation runtime réussit, `skill_doctor.py` passe, et `skill_demo.py` produit un `demo-result.json` avec le statut global `pass`.

## Résultat vérifié

- Tag cloné : `v1.3.1`
- Commit : `5c21c0a`
- Release GitHub : disponible
- Validation source : OK
- Installation runtime : OK
- Doctor installé : OK
- Démo installée : OK
- `demo-result.json` :
  - `status` : `pass`
  - `golden_audit.validation_status` : `pass`
  - `install_doctor.status` : `pass`

## Points positifs

- Le protocole `INSTALL_FOR_AGENTS.md` est exploitable depuis zéro.
- Le raw GitHub du protocole d’installation répond correctement.
- Le runtime installé contient bien `examples/reference-audit`.
- Aucun chemin déclaré dans `manifest.json` n’est cassé.
- Les fichiers de maintenance majeurs ne sont pas copiés : `.git`, `.github`, `.gitignore`, `assets`, `scripts/install.sh`, `scripts/validate_skill.py`.
- Le golden audit rend la démo installée autonome, ce qui corrige le problème de runtime observé en `v1.3.0`.

## Issues relevées

### 1. `__pycache__` généré après doctor/démo

Le runtime fraîchement installé est propre.
Après exécution de `skill_doctor.py` ou `skill_demo.py`, Python génère `scripts/__pycache__/*.pyc`.

Impact : faible.  
Risque : bruit dans un runtime installé si l’utilisateur inspecte le dossier après validation.

Action recommandée : exécuter les validations avec `PYTHONDONTWRITEBYTECODE=1` ou nettoyer `__pycache__` après doctor.

### 2. `examples/README.md` installé mais non listé

`install.sh` copie tout `examples/`, ce qui installe aussi `examples/README.md`.
La documentation liste surtout `examples/reference-audit/`.

Impact : faible.  
Risque : petite incohérence entre contenu réel et documentation.

Action recommandée : soit documenter `examples/README.md`, soit copier uniquement `examples/reference-audit/`.

### 3. User-Agent interne resté en `1.2`

Certains scripts HTTP utilisent encore :

```text
User-Agent: seo-geo-growth-agent/1.2
```

Impact : faible à moyen.  
Risque : traçabilité imprécise dans les logs serveur.

Action recommandée : centraliser la version runtime et envoyer `seo-geo-growth-agent/1.3.1`.

### 4. Prérequis Node à documenter plus explicitement

`skill_doctor.py` lance `node --check` sur le script `.mjs`.
Sans Node installé, le doctor échoue.

Impact : moyen pour les utilisateurs externes.

Action recommandée : ajouter une section « Prérequis » dans `README.md` et `INSTALL_FOR_AGENTS.md` : Python 3, Bash, Git, Node, Chrome/Chromium optionnel pour les captures.

## Sécurité URL

Il est recommandé d’ajouter une validation explicite des schémas URL sur les scripts qui fetchent ou naviguent :

- `run_full_audit.py`
- `check_ard_readiness.py`
- `seo_geo_audit.py`
- `validate_ard_catalog.py`
- `capture_site_screenshots.mjs`

Règle proposée : autoriser seulement `http://` et `https://` pour les accès réseau.
Pour les cibles locales ou IP privées, ajouter une option explicite du type `--allow-local`.

## Conclusion

La release `v1.3.1` est publiable et utilisable par un utilisateur externe.
Les problèmes restants sont des améliorations de propreté, documentation, traçabilité et durcissement URL, pas des bloqueurs d’installation.
