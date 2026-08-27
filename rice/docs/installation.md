# Installation

This guide starts from EndeavourOS or Arch Linux with KDE Plasma installed. The target session is Wayland. Read the whole guide once before applying the monitor-specific layout.

## 1. Update deliberately

On a new installation, update the system using your normal maintenance process and reboot if the kernel or Plasma was upgraded. The repository installer does not update the system automatically.

## 2. Clone

```bash
git clone https://github.com/AdminPanelHunmaster/desktop-dream.git
cd desktop-dream
```

## 3. Inspect and back up

```bash
sed -n '1,260p' rice/scripts/install.sh
bash rice/scripts/doctor.sh
bash rice/scripts/backup.sh
```

Backups are written to `~/.rice-backup/<timestamp>/`. The directory keeps the original relative paths, so `.config/kwinrc` is easy to identify and restore.

## 4. Install repository packages

```bash
bash rice/scripts/install.sh --packages
```

This asks `pacman` for Plasma, KWin, Ghostty, Fastfetch, Darkly, Kvantum and the two Nerd Fonts. It uses `--needed` and shows the package list before invoking `sudo`.

## 5. Install AUR appearance components

```bash
bash rice/scripts/install.sh --aur
```

The installer uses an already installed `paru` or `yay`; it never bootstraps an AUR helper. The requested packages are `klassy`, `reversal-icon-theme-git`, `apple_cursor` and `kwin-effect-rounded-corners-git`. Review every PKGBUILD as usual.

If an AUR package is out of date for your Plasma version, use the linked upstream project instead of forcing an incompatible binary.

## 6. Install third-party Plasma content

Install Ant-Dark and the widgets from upstream:

- Ant-Dark: <https://github.com/EliverLara/Ant>
- Kara: <https://github.com/dhruv8sh/kara>
- KVitals: <https://github.com/yassine20011/kvitals>
- ClearClock: <https://github.com/qewer33/ClearClock>

Follow the version-specific upstream instructions. Plasma 6 widgets can normally be installed from a downloaded package with `kpackagetool6`, but the repository installer intentionally does not download and execute mutable upstream content.

The captured ClearClock face uses `ZinHenaBokuryu`, `ZinHenaKaede-RKF` and `YAKITORI`. They are not shipped because redistribution permission could not be established. Obtain licensed copies yourself (YAKITORI: <https://www.mksd.jp/yakitori.html>) or select substitute fonts in ClearClock before applying the exact layout.

## 7. Install app configs and wallpaper

```bash
bash rice/scripts/install.sh
```

The safe default installs the wallpaper, Ghostty and Fastfetch copies. Existing files are backed up first. It does not restart Plasma and does not apply KDE settings.

## 8. Apply KDE/KWin appearance

```bash
bash rice/scripts/install.sh --apply-kde
```

This is opt-in because it replaces KDE palette, cursor, lock-screen, Klassy and curated KWin files after backup. It also merges only the seven workspace shortcuts. Log out and back into the Plasma Wayland session afterward.

Responsibilities:

- `kdeglobals`: colors, fonts, icons, Darkly and Ghostty as terminal.
- `kcminputrc`: macOS-White cursor and 24 px size.
- `kscreenlockerrc`: lock-screen wallpaper.
- `klassyrc`: titlebar opacity, buttons, shadows and radius.
- `kara.sh`: the user-local QML search path used by Kara.
- `kwinrc`: desktop count, effects, blur/translucency and decoration.
- `plasmarc`: Ant-Dark Plasma theme.

## 9. Optional exact Plasma layout

```bash
bash rice/scripts/install.sh --plasma-layout
```

The snapshot was captured from a 1920×1080 primary screen plus a 1366×768 secondary screen. Plasma containment IDs, panel lengths and screen indexes are preserved so the layout can be reproduced, but another monitor topology may place panels incorrectly. Use System Settings → Display & Monitor and Plasma Edit Mode for manual correction.

The installer backs up both `plasmashellrc` and `plasma-org.kde.plasma.desktop-appletsrc`, replaces the `@WALLPAPER@` placeholder in a temporary staged copy, then installs it. It does not kill or restart `plasmashell`.

## 10. Verify

```bash
bash rice/scripts/doctor.sh
fastfetch
```

Check:

1. The session reports Wayland.
2. Appearance entries exist in System Settings.
3. `Alt+1` through `Alt+7` switch directly.
4. Ghostty renders Nerd Font glyphs.
5. Top panels contain Kara, KVitals, network, volume, battery and clock.
6. Blur is restrained and does not reduce readability.

## Rollback

Log out of Plasma before restoring panel/KWin files. Choose the required timestamp and copy its contents back:

```bash
BACKUP="$HOME/.rice-backup/YYYYMMDD-HHMMSS"
cp -a "$BACKUP/.config/." "$HOME/.config/"
cp -a "$BACKUP/.local/." "$HOME/.local/"
```

Inspect `$BACKUP` before running either command. If only one component is broken, restore only that file.
