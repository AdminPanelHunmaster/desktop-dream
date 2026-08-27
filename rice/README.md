# Desktop Dream rice

This directory is a sanitized, reproducible snapshot of the rice currently used on the owner's EndeavourOS workstation. The live machine was treated as read-only. Files here are copies, not symlinks.

## What is reproduced

- EndeavourOS / Arch Linux with KDE Plasma 6.7.4 and KWin on Wayland
- Ant-Dark Plasma style, BreezeDark colors and Darkly application style
- Klassy decorations, Reversal icons and macOS-White cursor
- FantasqueSansM Nerd Font for UI and Agave Nerd Font for monospace text
- ClearClock font names are documented, but the unverified/licensed font files are not redistributed
- Ghostty and the custom Fastfetch layout
- seven virtual desktops with `Alt+1` through `Alt+7`
- floating top panels and bottom docks for the observed 1920×1080 + 1366×768 layout
- KWin blur, translucency, scale/slide timing and rounded-corner settings

## Quick start

```bash
git clone https://github.com/AdminPanelHunmaster/desktop-dream.git
cd desktop-dream
bash rice/scripts/install.sh
```

The default run installs only repository-owned files after showing a plan and creating `~/.rice-backup/<timestamp>/`. Package installation, KDE settings and the screen-specific Plasma layout require explicit flags:

```bash
bash rice/scripts/install.sh --packages --aur --apply-kde --plasma-layout
```

Read [installation.md](docs/installation.md) before using the full command. Never run the installer as root.

## Safety model

- Existing destinations are copied to a timestamped backup before replacement.
- The whole Plasma layout is opt-in because it is monitor- and panel-ID-specific.
- The full global-shortcut file is not shipped. Only the seven rice shortcuts are merged.
- Third-party themes and widgets are referenced by source instead of vendored.
- No password, token, Wi-Fi profile, browser data, SSH material, monitor EDID or activity UUID is included.
- `@WALLPAPER@` is replaced by the installer only in the repository copy staged for installation.

## Structure

```text
rice/
├── assets/wallpapers/
├── config/
│   ├── fastfetch/
│   ├── ghostty/
│   ├── kde/
│   ├── kwin/
│   └── plasma/
├── docs/
├── scripts/
└── manifest.json
```

Use `bash rice/scripts/doctor.sh` for a read-only verification. Use `bash rice/scripts/backup.sh` to create a standalone backup before manual changes.
