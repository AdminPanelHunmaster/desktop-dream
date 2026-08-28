# Installation

This guide starts from EndeavourOS or Arch Linux with KDE Plasma installed. The target session is Wayland. Read the whole guide once before applying the monitor-specific layout.

## Scope, prerequisites and known limits

Start with an EndeavourOS installation that includes KDE Plasma, or an Arch Linux installation where Plasma already starts correctly. Work as a normal user with network access and working `sudo`; never run `install.sh` as root.

The captured source system reported:

- EndeavourOS / Arch Linux;
- Plasma 6.7.4 and KWin 6.7.4;
- a Plasma Wayland session;
- a 1920×1080 primary screen and a 1366×768 secondary screen;
- seven virtual desktops in one row.

Those values describe the audited source, not a promise that third-party binary effects work on every later Plasma release. Klassy, Darkly and Rounded Corners must support the Qt/Plasma/KWin ABI installed on the target. Exact behavior on X11, a single screen, different scaling or a different Plasma major version was not verified; use the manual route when the topology differs.

Required before continuing:

1. A working Plasma desktop and a way to log out and select `Plasma (Wayland)`.
2. `git`, `bash`, `pacman`, `sudo` and enough disk space for packages and backups.
3. An existing `paru` or `yay` only if the AUR route will be used. The repository does not bootstrap an AUR helper.
4. Time to inspect every plan and the directory created under `~/.rice-backup/`.

## Choose the installation depth

| Route                    | Command                                        | Changes                                                  |
| ------------------------ | ---------------------------------------------- | -------------------------------------------------------- |
| Read-only audit          | `bash rice/scripts/doctor.sh`                  | Reports state; writes no configuration                   |
| Backup only              | `bash rice/scripts/backup.sh`                  | Copies relevant existing files into a timestamped backup |
| Safe application files   | `bash rice/scripts/install.sh`                 | Wallpaper, Ghostty and Fastfetch after backup            |
| Official packages        | `bash rice/scripts/install.sh --packages`      | Documented `pacman --needed` package set                 |
| Reviewed AUR components  | `bash rice/scripts/install.sh --aur`           | Uses an existing AUR helper after showing the plan       |
| KDE/KWin appearance      | `bash rice/scripts/install.sh --apply-kde`     | Sanitized KDE/KWin files plus a seven-key shortcut merge |
| Exact dual-screen panels | `bash rice/scripts/install.sh --plasma-layout` | Monitor-specific Plasma snapshot; use only deliberately  |

Flags can be combined, but a first-time user should apply one layer at a time and run the doctor between layers. No route restarts Plasma, logs out, reboots or performs a full system update.

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

Why each group exists:

- Plasma/KWin provide the audited desktop and Wayland compositor.
- Ghostty and Fastfetch reproduce the terminal surface and system-information layout.
- Darkly is the active Qt application style; Kvantum was present on the source system but is optional for this reproduction.
- FantasqueSansM Nerd Font supplies Plasma UI glyphs; Agave Nerd Font is used by Ghostty and fixed-width UI.

The complete rice-only list and exact source URLs are in `rice/manifest.json` and the website Packages window. It is intentionally not a dump of the source machine's full package database.

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

The destinations and responsibilities are:

| Repository copy                          | Target                                                    | Responsibility                           |
| ---------------------------------------- | --------------------------------------------------------- | ---------------------------------------- |
| `rice/assets/wallpapers/Mauve_girl.webp` | `~/.local/share/wallpapers/desktop-dream/Mauve_girl.webp` | Desktop and lock-screen artwork          |
| `rice/config/ghostty/config`             | `~/.config/ghostty/config`                                | Font, palette, opacity, blur and padding |
| `rice/config/fastfetch/config.jsonc`     | `~/.config/fastfetch/config.jsonc`                        | EndeavourOS artwork and module layout    |

After this stage, fully close and reopen Ghostty. Run `fastfetch --config ~/.config/fastfetch/config.jsonc` and confirm that Nerd Font glyphs render. Hardware values naturally describe the target machine; only the website simulation uses static Test Device values.

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

Before logging out, note that these are owner configuration copies, not universal defaults. If an appearance item is unavailable in System Settings, do not force its name into a config: install a compatible upstream package first. The source system's unrelated KDE settings, monitor EDIDs, activity UUIDs and global shortcuts were deliberately excluded.

## 9. Optional exact Plasma layout

```bash
bash rice/scripts/install.sh --plasma-layout
```

The snapshot was captured from a 1920×1080 primary screen plus a 1366×768 secondary screen. Plasma containment IDs, panel lengths and screen indexes are preserved so the layout can be reproduced, but another monitor topology may place panels incorrectly. Use System Settings → Display & Monitor and Plasma Edit Mode for manual correction.

The installer backs up both `plasmashellrc` and `plasma-org.kde.plasma.desktop-appletsrc`, replaces the `@WALLPAPER@` placeholder in a temporary staged copy, then installs it. It does not kill or restart `plasmashell`.

The observed panel composition is:

1. Primary top, 1040×28: Kara → expanding spacer → KVitals → Network → Volume → Battery → Digital Clock.
2. Primary bottom, 980×46: Kickoff → Icons-only Task Manager → margin separator → System Tray → Digital Clock → Show Desktop.
3. Secondary top, 760×27: Kara → expanding spacer → KVitals → Network → Volume → Battery → Digital Clock.
4. Secondary bottom, 620×40: Kickoff → Icons-only Task Manager → Digital Clock.

For a different screen arrangement, do not apply the snapshot. Enter Plasma Edit Mode, create floating top and bottom panels, add widgets in the documented order and scale lengths proportionally. Screen indexes and containment IDs are machine-specific; usability is more important than matching pixel counts.

## 10. Workspaces and shortcuts

The sanitized `kwinrc` records seven desktops in one row. The installer does not replace the owner's complete `kglobalshortcutsrc`; it merges only the seven direct-switch lines from `rice/config/kde/kglobalshortcutsrc.snippet`.

Verify manually in System Settings → Keyboard → Shortcuts → KWin:

- `Alt+1` → Desktop 1;
- `Alt+2` → Desktop 2;
- continue through `Alt+7` → Desktop 7.

Remove conflicts before assigning a key. If another application owns an `Alt` combination, decide which behavior to keep rather than overwriting it silently.

## 11. Apply the session changes

Save open work, log out and select `Plasma (Wayland)` before logging back in. Logout/login is the safest way to reload fonts, cursor selection, Qt/KWin binary plugins, global shortcuts and Plasma files together. The scripts deliberately do not perform logout, reboot or a Plasma/KWin restart.

## 12. Verify

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

Also verify the individual layers:

| Layer      | Check                                                                         | If it fails                                                          |
| ---------- | ----------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| Session    | `printf '%s\n' "$XDG_SESSION_TYPE"` reports `wayland`                         | Select Plasma (Wayland) at login                                     |
| Fonts      | `fc-match "Agave Nerd Font"` and `fc-match "FantasqueSansM Nerd Font"`        | Install both Nerd Font packages and restart apps                     |
| Terminal   | Ghostty uses Agave 14, the mauve palette and readable 0.86 opacity            | Compare `~/.config/ghostty/config` with the repository copy          |
| Fastfetch  | EndeavourOS artwork and Hardware/Software structure render                    | Run with the explicit `--config` path and inspect JSONC errors       |
| Appearance | Ant-Dark, BreezeDark, Darkly, Klassy, Reversal and macOS-White are selectable | Install or rebuild the compatible upstream component                 |
| KWin       | Klassy decoration, restrained blur and rounded corners work without artifacts | Disable Rounded Corners, then Blur, to isolate an ABI/effect problem |
| Workspaces | All seven direct `Alt` shortcuts switch correctly                             | Remove conflicts in KWin shortcuts                                   |
| Panels     | Four panels appear on the intended screens with the documented widgets        | Restore only the Plasma files and use the manual panel route         |

ClearClock may use a substitute font. The exact `ZinHenaBokuryu`, `ZinHenaKaede-RKF` and `YAKITORI` files were not redistributed because their authoritative licensing could not all be verified. This is an explicit manual difference, not an installer failure.

## 13. Troubleshoot without destructive resets

Start with `bash rice/scripts/doctor.sh` and `rice/docs/troubleshooting.md`. Diagnose one layer at a time. Do not delete all Plasma configuration as a first response, and do not copy another machine's monitor/EDID files.

Common isolation order:

1. Missing glyphs: verify fonts with `fc-match`, then restart Ghostty.
2. Missing theme or decoration: verify the package and Plasma ABI, then log out/in.
3. Broken shortcuts: inspect conflicts in KWin shortcut settings.
4. Wrong-screen panels: restore only `plasmashellrc` and `plasma-org.kde.plasma.desktop-appletsrc`, then use the manual layout.
5. Blur artifacts: disable Rounded Corners first, then Blur.
6. Missing wallpaper: select the stable repository-installed path manually.

## Rollback

Log out of Plasma before restoring panel/KWin files. Choose the required timestamp and copy its contents back:

```bash
BACKUP="$HOME/.rice-backup/YYYYMMDD-HHMMSS"
cp -a "$BACKUP/.config/." "$HOME/.config/"
cp -a "$BACKUP/.local/." "$HOME/.local/"
```

Inspect `$BACKUP` before running either command. If only one component is broken, restore only that file.

Safer component examples:

```bash
# Inspect first; this does not restore anything.
find "$BACKUP" -maxdepth 5 -type f -print

# Example: restore only Ghostty.
cp -a "$BACKUP/.config/ghostty/." "$HOME/.config/ghostty/"

# Example: restore only KWin configuration while logged out of Plasma.
cp -a "$BACKUP/.config/kwinrc" "$HOME/.config/kwinrc"
```

Do not paste these commands before confirming the selected timestamp and that the source path exists. Plasma/KWin and panel files should be restored while logged out. Application-only files such as Ghostty can be restored separately and the application restarted.
