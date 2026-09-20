#!/usr/bin/env bash
set -eu

# Synchronisation manuelle du document root OVH.
# Le script ne construit pas le site et ne force jamais l'historique.

# Lancer le script depuis le document root, ou fournir SWING_OVH_ROOT.
readonly ovh_root="${SWING_OVH_ROOT:-$(pwd)}"
readonly production_branch="production"

fail() {
    printf 'ERREUR : %s\n' "$*" >&2
    exit 1
}

cd -- "$ovh_root" || fail "document root introuvable : $ovh_root"
git rev-parse --is-inside-work-tree >/dev/null 2>&1 \
    || fail "ce document root n'est pas un dépôt Git ; configure le déploiement Git OVH"

[ -z "$(git status --porcelain)" ] \
    || fail "le document root contient des modifications locales ; aucune mise à jour effectuée"

current_branch="$(git symbolic-ref --quiet --short HEAD || true)"
if [ "$current_branch" != "$production_branch" ]; then
    git show-ref --verify --quiet "refs/heads/$production_branch" \
        || fail "la branche locale $production_branch est absente"
    git checkout "$production_branch"
fi

git fetch origin "$production_branch"
git merge --ff-only "origin/$production_branch"

printf 'Document root synchronisé : %s\n' "$ovh_root"
git log -1 --oneline
