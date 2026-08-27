#!/usr/bin/env bash
set -euo pipefail

ok=0
warnings=0
errors=0

pass() { printf '✓ Installed     %s\n' "$1"; ok=$((ok + 1)); }
configured() { printf '✓ Configured    %s\n' "$1"; ok=$((ok + 1)); }
warn() { printf '⚠ Optional component missing  %s\n' "$1"; warnings=$((warnings + 1)); }
fail() { printf '✗ Required component missing  %s\n' "$1"; errors=$((errors + 1)); }

has_package() {
  command -v pacman >/dev/null 2>&1 && pacman -Q "$1" >/dev/null 2>&1
}

check_package() {
  local package="$1" required="${2:-true}"
  if has_package "$package"; then
    pass "$package"
  elif [[ "$required" == true ]]; then
    fail "$package"
  else
    warn "$package"
  fi
}

check_path() {
  local path="$1" label="$2" required="${3:-true}"
  if [[ -e "$path" || -L "$path" ]]; then
    configured "$label"
  elif [[ "$required" == true ]]; then
    fail "$label ($path)"
  else
    warn "$label ($path)"
  fi
}

printf 'Desktop Dream rice doctor (read-only)\n\n'

if [[ -r /etc/os-release ]]; then
  # shellcheck disable=SC1091
  source /etc/os-release
  if [[ "${ID:-}" == "arch" || "${ID:-}" == "endeavouros" || "${ID_LIKE:-}" == *arch* ]]; then
    pass "${PRETTY_NAME:-Arch-based Linux}"
  else
    fail "Arch Linux or EndeavourOS"
  fi
else
  fail "/etc/os-release"
fi

if [[ "${XDG_CURRENT_DESKTOP:-}" == *KDE* ]] || command -v plasmashell >/dev/null 2>&1; then
  pass "KDE Plasma"
else
  fail "KDE Plasma"
fi

if [[ "${XDG_SESSION_TYPE:-}" == "wayland" ]]; then
  configured "Wayland session"
else
  warn "Wayland session (current: ${XDG_SESSION_TYPE:-unknown})"
fi

for package in plasma-desktop plasma-workspace kwin fastfetch ghostty ttf-fantasque-nerd ttf-agave-nerd; do
  check_package "$package" true
done
for package in darkly kvantum; do
  check_package "$package" false
done

check_path "$HOME/.config/fastfetch/config.jsonc" "Fastfetch config"
check_path "$HOME/.config/ghostty/config" "Ghostty config"
check_path "$HOME/.config/kdeglobals" "KDE globals"
check_path "$HOME/.config/kwinrc" "KWin config"
check_path "$HOME/.config/plasmarc" "Plasma theme config"
check_path "$HOME/.config/kglobalshortcutsrc" "global shortcuts"
check_path "$HOME/.config/plasmashellrc" "Plasma panel sizes" false
check_path "$HOME/.config/plasma-org.kde.plasma.desktop-appletsrc" "Plasma panel layout" false
check_path "$HOME/.local/share/wallpapers/desktop-dream/Mauve_girl.webp" "Mauve wallpaper"

check_path "$HOME/.local/share/plasma/desktoptheme/Ant-Dark" "Ant-Dark Plasma theme" false
check_path "$HOME/.local/share/icons/Reversal" "Reversal icons" false
check_path "$HOME/.local/share/icons/macOS-White" "macOS-White cursor" false
check_path "$HOME/.config/klassy/klassyrc" "Klassy config" false
check_path "$HOME/.config/plasma-workspace/env/kara.sh" "Kara QML environment" false
check_path "$HOME/.local/share/plasma/plasmoids/org.dhruv8sh.kara" "Kara widget" false
check_path "$HOME/.local/share/plasma/plasmoids/org.kde.plasma.kvitals" "KVitals widget" false
check_path "$HOME/.local/share/plasma/plasmoids/org.kde.plasma.clearclock" "ClearClock widget" false
check_path "$HOME/.local/share/fonts/YAKITORI.ttf" "YAKITORI desktop-clock font" false

if command -v kreadconfig6 >/dev/null 2>&1; then
  desktops="$(kreadconfig6 --file kwinrc --group Desktops --key Number 2>/dev/null || true)"
  [[ "$desktops" == "7" ]] && configured "7 virtual desktops" || warn "7 virtual desktops (found: ${desktops:-unset})"

  icons="$(kreadconfig6 --file kdeglobals --group Icons --key Theme 2>/dev/null || true)"
  [[ "$icons" == "Reversal" ]] && configured "Reversal icon theme" || warn "Reversal icon theme (found: ${icons:-unset})"

  cursor="$(kreadconfig6 --file kcminputrc --group Mouse --key cursorTheme 2>/dev/null || true)"
  [[ "$cursor" == "macOS-White" ]] && configured "macOS-White cursor" || warn "macOS-White cursor (found: ${cursor:-unset})"

  plasma_theme="$(kreadconfig6 --file plasmarc --group Theme --key name 2>/dev/null || true)"
  [[ "$plasma_theme" == "Ant-Dark" ]] && configured "Ant-Dark Plasma theme selected" || warn "Ant-Dark selected (found: ${plasma_theme:-unset})"

  blur="$(kreadconfig6 --file kwinrc --group Plugins --key blurEnabled 2>/dev/null || true)"
  [[ "$blur" == "true" ]] && configured "KWin blur" || warn "KWin blur enabled"
else
  warn "kreadconfig6; detailed KDE checks skipped"
fi

for desktop in 1 2 3 4 5 6 7; do
  if grep -F "Switch to Desktop $desktop=Alt+$desktop," "$HOME/.config/kglobalshortcutsrc" >/dev/null 2>&1; then
    configured "Alt+$desktop → Desktop $desktop"
  else
    warn "Alt+$desktop → Desktop $desktop"
  fi
done

printf '\nSummary: %d checks passed, %d optional warnings, %d required failures.\n' "$ok" "$warnings" "$errors"
if (( errors > 0 )); then
  exit 1
fi
