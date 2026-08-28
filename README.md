# Desktop Dream

[![Production](https://img.shields.io/badge/production-desktop--dream.vercel.app-8f6078)](https://desktop-dream.vercel.app)

Desktop Dream is an interactive Linux-desktop documentation site for a real EndeavourOS + KDE Plasma Wayland rice. The wallpaper, top panel and dock remain the main interface; installation, dotfiles, appearance, panels, workspaces, packages, full guide and troubleshooting open as desktop windows.

![Mauve_girl wallpaper used by the rice](public/assets/wallpapers/main-wallpaper.webp)

## Audited rice

- EndeavourOS / Arch Linux
- KDE Plasma 6.7.4 and KWin 6.7.4
- Wayland
- Ant-Dark Plasma theme, BreezeDark colors and Darkly application style
- Klassy decorations, Reversal icons and macOS-White cursor
- FantasqueSansM Nerd Font + Agave Nerd Font
- Ghostty 1.3.1 and Fastfetch 2.67.1
- seven virtual desktops with `Alt+1` through `Alt+7`
- dual-screen floating top panels and bottom docks

The live Linux system was used strictly as a read-only source. Repository copies were sanitized before commit.

## Website

Open <https://desktop-dream.vercel.app>.

The dock contains nine real apps:

1. Terminal — safe frontend command simulation with EN/RU help, history, animated fun commands and a screenshot-matched demo Fastfetch; it never executes commands or reads visitor hardware.
2. Files — actual `rice/` tree, code viewer, copy, raw download and GitHub links.
3. Appearance — themes, colors, fonts, icons, cursor, decoration and wallpaper.
4. Plasma — exact four-panel composition and widget sources.
5. Workspaces — seven desktops and shortcut locations.
6. Ghostty & Fastfetch — audited terminal values and preview.
7. Packages — rice-only official, AUR, optional, fonts and widgets.
8. Guide — full clean-system installation flow.
9. Troubleshooting — doctor, common failures, backup and rollback.

Windows can be focused, dragged, minimized, closed and reopened. The top panel supports click or `Alt+1…Alt+7` workspace simulation. Displayed CPU/RAM values are explicitly decorative, not visitor telemetry.

## Quick install

```bash
git clone https://github.com/AdminPanelHunmaster/desktop-dream.git
cd desktop-dream
bash rice/scripts/install.sh
```

The safe default installs the repository wallpaper plus Ghostty and Fastfetch only after creating a backup. For the opt-in full route:

```bash
bash rice/scripts/install.sh --packages --aur --apply-kde --plasma-layout
```

Read [rice/docs/installation.md](rice/docs/installation.md) before using the full command. The captured Plasma layout targets 1920×1080 + 1366×768.

## Manual installation

Use [rice/docs/manual-setup.md](rice/docs/manual-setup.md) to recreate the desktop through KDE System Settings without applying the repository snapshot. [rice/docs/components.md](rice/docs/components.md) explains what each file and component controls.

## Safety and backups

- Existing destinations are backed up to `~/.rice-backup/<timestamp>/`.
- The installer refuses to run as root.
- Package, AUR, KDE and full panel actions are explicit flags.
- The installer does not update the system, restart Plasma/KWin, log out or reboot.
- The full global-shortcuts file is not distributed; only seven workspace keys are merged.
- Monitor EDIDs/output configuration, activity UUIDs, personal paths and unrelated application settings are excluded.
- Third-party binary plugins/themes are linked upstream, not copied into this repository.

Create a standalone backup:

```bash
bash rice/scripts/backup.sh --include-plasma-layout
```

Run the read-only verifier:

```bash
bash rice/scripts/doctor.sh
```

See [rice/docs/troubleshooting.md](rice/docs/troubleshooting.md) for rollback and common issues.

## Repository structure

```text
.
├── public/assets/wallpapers/ Website wallpaper
├── rice/
│ ├── assets/wallpapers/ Installable wallpaper copy
│ ├── config/ Sanitized Fastfetch, Ghostty, KDE, KWin and Plasma copies
│ ├── docs/ Installation, components, manual setup, troubleshooting
│ ├── scripts/ Safe installer, read-only doctor, standalone backup
│ └── manifest.json Audited machine-readable rice manifest
└── src/
├── components/desktop/ Desktop, top panel, dock, windows and apps
└── data/ Shared website rice content and real file imports
```

## Development

The project uses React 19, TanStack Start/Router, Vite, Tailwind CSS and Lucide. No backend, database, authentication or new UI framework is required.

```bash
pnpm install
pnpm dev
pnpm lint
pnpm build
```

The repository currently includes `bun.lock`; Bun can also be used with the equivalent scripts.

## Lovable

This project was originally built with [Lovable](https://lovable.dev) and remains connected to the Lovable editor:

<https://lovable.dev/projects/ac249e19-eb9b-4987-9f89-ce782b5a904e>

Changes pushed to the connected `main` branch sync back to Lovable. Do not rewrite published history.

## Deployment

The existing Vercel project is `desktop-dream`. Pushes to `main` deploy through the already connected Git integration:

<https://desktop-dream.vercel.app>

No additional Vercel project is needed.
