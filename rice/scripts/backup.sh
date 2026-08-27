#!/usr/bin/env bash
set -euo pipefail

BACKUP_ROOT="${RICE_BACKUP_ROOT:-$HOME/.rice-backup}"
TIMESTAMP="${RICE_BACKUP_TIMESTAMP:-$(date +%Y%m%d-%H%M%S)}"
BACKUP_DIR="$BACKUP_ROOT/$TIMESTAMP"
INCLUDE_LAYOUT=false

usage() {
  cat <<'EOF'
Usage: bash rice/scripts/backup.sh [--include-plasma-layout]

Creates a read-only-style copy of existing rice-related user configuration at:
  ~/.rice-backup/<timestamp>/
EOF
}

for arg in "$@"; do
  case "$arg" in
    --include-plasma-layout) INCLUDE_LAYOUT=true ;;
    -h|--help) usage; exit 0 ;;
    *) printf 'Unknown option: %s\n' "$arg" >&2; usage >&2; exit 2 ;;
  esac
done

if [[ "${EUID:-$(id -u)}" -eq 0 ]]; then
  printf 'Do not run this user-config backup as root.\n' >&2
  exit 1
fi

targets=(
  "$HOME/.config/fastfetch"
  "$HOME/.config/ghostty"
  "$HOME/.config/kdeglobals"
  "$HOME/.config/kcminputrc"
  "$HOME/.config/kscreenlockerrc"
  "$HOME/.config/klassy/klassyrc"
  "$HOME/.config/kwinrc"
  "$HOME/.config/kglobalshortcutsrc"
  "$HOME/.config/plasmarc"
  "$HOME/.local/share/wallpapers/desktop-dream"
)

if [[ "$INCLUDE_LAYOUT" == true ]]; then
  targets+=(
    "$HOME/.config/plasmashellrc"
    "$HOME/.config/plasma-org.kde.plasma.desktop-appletsrc"
  )
fi

copied=0
for target in "${targets[@]}"; do
  [[ -e "$target" || -L "$target" ]] || continue
  relative="${target#"$HOME"/}"
  destination="$BACKUP_DIR/$relative"
  mkdir -p "$(dirname "$destination")"
  cp -a -- "$target" "$destination"
  printf '✓ Backed up %s\n' "$relative"
  copied=$((copied + 1))
done

if (( copied == 0 )); then
  printf 'No matching files were found; no backup directory was created.\n'
  exit 0
fi

printf '\nBackup complete: %s\n' "$BACKUP_DIR"
