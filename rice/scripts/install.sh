#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd -P)"
RICE_DIR="$(cd -- "$SCRIPT_DIR/.." && pwd -P)"
REPO_DIR="$(cd -- "$RICE_DIR/.." && pwd -P)"

INSTALL_PACKAGES=false
INSTALL_AUR=false
APPLY_KDE=false
APPLY_LAYOUT=false
ASSUME_YES=false
DRY_RUN=false
BACKUP_DIR=""

usage() {
  cat <<'EOF'
Usage: bash rice/scripts/install.sh [options]

Safe default:
  Install the repository wallpaper, Fastfetch and Ghostty configs after backup.

Options:
  --packages       Install official Arch repository packages with pacman.
  --aur            Install reviewed AUR component names with an existing paru/yay.
  --apply-kde      Apply sanitized KDE/KWin appearance files and workspace shortcuts.
  --plasma-layout  Apply the captured dual-screen Plasma panel snapshot.
  --dry-run        Print every planned action without writing anything.
  --yes            Skip the final confirmation (backups are still created).
  -h, --help       Show this help.

The script never restarts Plasma, logs out, reboots or deletes an existing config.
EOF
}

while (($#)); do
  case "$1" in
    --packages) INSTALL_PACKAGES=true ;;
    --aur) INSTALL_AUR=true ;;
    --apply-kde) APPLY_KDE=true ;;
    --plasma-layout) APPLY_LAYOUT=true ;;
    --dry-run) DRY_RUN=true ;;
    --yes) ASSUME_YES=true ;;
    -h|--help) usage; exit 0 ;;
    *) printf 'Unknown option: %s\n' "$1" >&2; usage >&2; exit 2 ;;
  esac
  shift
done

if [[ "${EUID:-$(id -u)}" -eq 0 ]]; then
  printf 'Do not run the rice installer as root. It manages per-user files.\n' >&2
  exit 1
fi

OS_RELEASE_FILE="${RICE_OS_RELEASE_FILE:-/etc/os-release}"
if [[ ! -r "$OS_RELEASE_FILE" ]]; then
  printf 'Cannot identify the operating system: %s is missing.\n' "$OS_RELEASE_FILE" >&2
  exit 1
fi

# shellcheck disable=SC1091
source "$OS_RELEASE_FILE"
if [[ "${ID:-}" != "arch" && "${ID:-}" != "endeavouros" && "${ID_LIKE:-}" != *arch* ]]; then
  printf 'Unsupported distribution: %s. This installer targets Arch/EndeavourOS.\n' "${PRETTY_NAME:-unknown}" >&2
  exit 1
fi

required_repo_files=(
  "$RICE_DIR/config/fastfetch/config.jsonc"
  "$RICE_DIR/config/ghostty/config"
  "$RICE_DIR/config/kde/kdeglobals"
  "$RICE_DIR/config/kwin/kwinrc"
  "$RICE_DIR/config/plasma/plasma-org.kde.plasma.desktop-appletsrc"
  "$RICE_DIR/assets/wallpapers/Mauve_girl.webp"
)
for file in "${required_repo_files[@]}"; do
  [[ -r "$file" ]] || { printf 'Repository file is missing: %s\n' "$file" >&2; exit 1; }
done

official_packages=(
  plasma-desktop plasma-workspace kwin
  fastfetch ghostty darkly kvantum
  ttf-fantasque-nerd ttf-agave-nerd
)
aur_packages=(
  klassy reversal-icon-theme-git apple_cursor kwin-effect-rounded-corners-git
)

printf 'Desktop Dream rice installer\n'
printf 'Target: %s\n' "${PRETTY_NAME:-Arch Linux}"
printf 'Repository: %s\n\n' "$REPO_DIR"
printf 'Planned actions:\n'
printf '  • backup and install wallpaper, Fastfetch and Ghostty\n'
[[ "$INSTALL_PACKAGES" == true ]] && printf '  • install official packages: %s\n' "${official_packages[*]}"
[[ "$INSTALL_AUR" == true ]] && printf '  • request AUR packages: %s\n' "${aur_packages[*]}"
[[ "$APPLY_KDE" == true ]] && printf '  • replace sanitized KDE/KWin appearance files and merge Alt+1…Alt+7\n'
[[ "$APPLY_LAYOUT" == true ]] && printf '  • replace the 1920×1080 + 1366×768 Plasma panel snapshot\n'
printf '\nEvery existing destination is backed up under ~/.rice-backup/<timestamp>/.\n'

if [[ "$DRY_RUN" == true ]]; then
  printf '\nDry run complete. No files or packages were changed.\n'
  exit 0
fi

if [[ "$ASSUME_YES" != true ]]; then
  read -r -p 'Continue? [y/N] ' reply
  [[ "$reply" =~ ^[Yy]$ ]] || { printf 'Cancelled.\n'; exit 0; }
fi

ensure_backup_dir() {
  if [[ -z "$BACKUP_DIR" ]]; then
    BACKUP_DIR="$HOME/.rice-backup/$(date +%Y%m%d-%H%M%S)"
    mkdir -p "$BACKUP_DIR"
  fi
}

backup_one() {
  local target="$1" relative destination
  [[ -e "$target" || -L "$target" ]] || return 0
  ensure_backup_dir
  relative="${target#"$HOME"/}"
  destination="$BACKUP_DIR/$relative"
  [[ -e "$destination" || -L "$destination" ]] && return 0
  mkdir -p "$(dirname "$destination")"
  cp -a -- "$target" "$destination"
  printf '✓ Backup: %s\n' "$relative"
}

install_file() {
  local source="$1" target="$2" mode="${3:-0644}"
  backup_one "$target"
  mkdir -p "$(dirname "$target")"
  install -m "$mode" "$source" "$target"
  printf '✓ Installed: %s\n' "${target#"$HOME"/}"
}

install_directory_contents() {
  local source="$1" target="$2"
  backup_one "$target"
  mkdir -p "$target"
  cp -a -- "$source/." "$target/"
  printf '✓ Installed: %s/\n' "${target#"$HOME"/}"
}

if [[ "$INSTALL_PACKAGES" == true ]]; then
  command -v pacman >/dev/null 2>&1 || { printf 'pacman is required.\n' >&2; exit 1; }
  printf '\nInstalling official packages…\n'
  sudo pacman -S --needed "${official_packages[@]}"
fi

if [[ "$INSTALL_AUR" == true ]]; then
  if command -v paru >/dev/null 2>&1; then
    aur_helper=paru
  elif command -v yay >/dev/null 2>&1; then
    aur_helper=yay
  else
    printf 'No AUR helper found. Install/review paru or yay yourself, then rerun --aur.\n' >&2
    exit 1
  fi
  printf '\nInstalling AUR appearance components with %s…\n' "$aur_helper"
  "$aur_helper" -S --needed "${aur_packages[@]}"
fi

printf '\nInstalling repository-owned files…\n'
install_directory_contents "$RICE_DIR/config/fastfetch" "$HOME/.config/fastfetch"
install_file "$RICE_DIR/config/ghostty/config" "$HOME/.config/ghostty/config"
install_file "$RICE_DIR/assets/wallpapers/Mauve_girl.webp" "$HOME/.local/share/wallpapers/desktop-dream/Mauve_girl.webp"

stage_with_wallpaper() {
  local source="$1" staged="$2"
  sed "s|@WALLPAPER@|$HOME/.local/share/wallpapers/desktop-dream/Mauve_girl.webp|g" "$source" > "$staged"
}

if [[ "$APPLY_KDE" == true ]]; then
  printf '\nApplying sanitized KDE/KWin appearance copies…\n'
  temp_dir="$(mktemp -d)"
  trap 'rm -rf -- "$temp_dir"' EXIT
  stage_with_wallpaper "$RICE_DIR/config/kde/kscreenlockerrc" "$temp_dir/kscreenlockerrc"

  install_file "$RICE_DIR/config/kde/kdeglobals" "$HOME/.config/kdeglobals"
  install_file "$RICE_DIR/config/kde/kcminputrc" "$HOME/.config/kcminputrc"
  install_file "$temp_dir/kscreenlockerrc" "$HOME/.config/kscreenlockerrc"
  install_file "$RICE_DIR/config/kde/klassyrc" "$HOME/.config/klassy/klassyrc"
  install_file "$RICE_DIR/config/kde/kara.sh" "$HOME/.config/plasma-workspace/env/kara.sh"
  install_file "$RICE_DIR/config/kwin/kwinrc" "$HOME/.config/kwinrc"
  install_file "$RICE_DIR/config/plasma/plasmarc" "$HOME/.config/plasmarc"

  if command -v kwriteconfig6 >/dev/null 2>&1; then
    backup_one "$HOME/.config/kglobalshortcutsrc"
    for desktop in 1 2 3 4 5 6 7; do
      case "$desktop" in
        1|2|3|4) fallback="Ctrl+F$desktop\\tMeta+F$desktop" ;;
        *) fallback="none" ;;
      esac
      kwriteconfig6 --file kglobalshortcutsrc --group kwin \
        --key "Switch to Desktop $desktop" \
        "Alt+$desktop,$fallback,Switch to Desktop $desktop"
    done
    printf '✓ Merged: Alt+1…Alt+7 workspace shortcuts\n'
  else
    printf '⚠ kwriteconfig6 missing; merge config/kde/kglobalshortcutsrc.snippet manually.\n'
  fi
fi

if [[ "$APPLY_LAYOUT" == true ]]; then
  printf '\nApplying opt-in Plasma layout snapshot…\n'
  printf '⚠ Captured for 1920×1080 + 1366×768. Different displays need manual adjustment.\n'
  temp_dir="${temp_dir:-$(mktemp -d)}"
  trap 'rm -rf -- "$temp_dir"' EXIT
  stage_with_wallpaper \
    "$RICE_DIR/config/plasma/plasma-org.kde.plasma.desktop-appletsrc" \
    "$temp_dir/plasma-org.kde.plasma.desktop-appletsrc"
  install_file "$RICE_DIR/config/plasma/plasmashellrc" "$HOME/.config/plasmashellrc"
  install_file "$temp_dir/plasma-org.kde.plasma.desktop-appletsrc" \
    "$HOME/.config/plasma-org.kde.plasma.desktop-appletsrc"
fi

printf '\nInstallation files are in place.\n'
[[ -n "$BACKUP_DIR" ]] && printf 'Backup: %s\n' "$BACKUP_DIR"
printf 'Log out and back into the Plasma Wayland session to apply KDE/panel changes.\n'
printf 'The installer intentionally did not restart Plasma or KWin.\n'
printf 'Run: bash rice/scripts/doctor.sh\n'
printf '\nManual upstream components:\n'
printf '  Ant-Dark: https://github.com/EliverLara/Ant\n'
printf '  Kara: https://github.com/dhruv8sh/kara\n'
printf '  KVitals: https://github.com/yassine20011/kvitals\n'
printf '  ClearClock: https://github.com/qewer33/ClearClock\n'
