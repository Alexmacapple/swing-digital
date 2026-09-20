#!/usr/bin/env bash
set -Eeuo pipefail

# Publication contrôlée depuis le dépôt source.
# Le dépôt doit être propre et les modifications de main déjà commitées.

readonly production_branch="production"
readonly production_domain="${SWING_PRODUCTION_DOMAIN:-https://www.swingdigitalproduction.com}"
readonly script_dir="$(CDPATH= cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
readonly repo_root="$(cd -- "$script_dir/.." && pwd)"
readonly production_worktree="${SWING_PRODUCTION_WORKTREE:-$HOME/Claude-worktrees/swing-production}"

fail() {
    printf 'ERREUR : %s\n' "$*" >&2
    exit 1
}

info() {
    printf '\n==> %s\n' "$*"
}

cd -- "$repo_root"

[ "$(git rev-parse --show-toplevel)" = "$repo_root" ] || fail "le dépôt Git courant n'est pas celui du projet"
[ "$(git symbolic-ref --quiet --short HEAD)" = "main" ] || fail "lancer ce script depuis la branche main"
[ -z "$(git status --porcelain)" ] || fail "l'arbre main n'est pas propre ; commite d'abord les modifications"

info "Synchronisation et contrôle de main"
git fetch --prune origin main
git merge-base --is-ancestor origin/main HEAD || fail "main est en retard ou divergent de origin/main"
git push origin main

info "Tests"
npm test
npm run seo:check

info "Construction de dist/"
npm run build:prod
npm run prod:preflight -- "$production_domain"

info "Préparation de la branche $production_branch"
if [ ! -e "$production_worktree/.git" ]; then
    mkdir -p "$(dirname -- "$production_worktree")"
    git worktree add "$production_worktree" "$production_branch"
fi

[ "$(git -C "$production_worktree" rev-parse --show-toplevel)" = "$production_worktree" ] \
    || fail "le chemin de worktree de production est invalide : $production_worktree"
[ -z "$(git -C "$production_worktree" status --porcelain)" ] \
    || fail "le worktree production n'est pas propre"

git -C "$production_worktree" fetch origin "$production_branch"
git -C "$production_worktree" merge --ff-only "origin/$production_branch"

info "Copie exclusive de dist/ vers production"
rsync -a --delete --exclude='.git' dist/ "$production_worktree/"
git -C "$production_worktree" add -A

if git -C "$production_worktree" diff --cached --quiet; then
    printf 'Aucune modification à publier dans production.\n'
    exit 0
fi

git -C "$production_worktree" commit -m "build(prod): publier la nouvelle version"
git -C "$production_worktree" push origin "$production_branch"

printf '\nPublication terminée : %s\n' "$production_domain"
