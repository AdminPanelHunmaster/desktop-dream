# Manual setup

Use this route when you want to recreate the rice through KDE System Settings and file-by-file copies instead of allowing the installer to write KDE configuration. It is slower but is the safest route for a different monitor topology or Plasma version.

## 1. Confirm the target and preserve the current desktop

Use EndeavourOS or Arch Linux with KDE Plasma and select a Plasma Wayland session. The audited source used Plasma/KWin 6.7.4. Third-party Qt/KWin binary plugins must match the target ABI.

Create a backup before copying anything:

```bash
bash rice/scripts/backup.sh --include-plasma-layout
```

Inspect `~/.rice-backup/<timestamp>/`. If you do not want to use the repository backup script, copy each destination named below to your own timestamped directory before replacing it.

## 2. Install the rice-only dependencies

Open `rice/manifest.json` and the website Packages window. Install the official packages needed for Plasma, KWin, Ghostty, Fastfetch, Darkly and the two Nerd Fonts. Review AUR PKGBUILDs for Klassy, Reversal, Apple Cursor and Rounded Corners before installing them.

Install these non-vendored projects from upstream:

- Ant-Dark: <https://github.com/EliverLara/Ant>
- Kara: <https://github.com/dhruv8sh/kara>
- KVitals: <https://github.com/yassine20011/kvitals>
- ClearClock: <https://github.com/qewer33/ClearClock>

Do not copy compiled theme/effect binaries from the source machine. If a project does not support the installed Plasma version, use a compatible release or omit it and document the difference.

## 3. Install wallpaper and application configs

Copy the wallpaper to a stable path:

```text
rice/assets/wallpapers/Mauve_girl.webp
→ ~/.local/share/wallpapers/desktop-dream/Mauve_girl.webp
```

After backing up existing destinations, copy:

```text
rice/config/ghostty/config
→ ~/.config/ghostty/config

rice/config/fastfetch/config.jsonc
→ ~/.config/fastfetch/config.jsonc
```

Restart Ghostty. Verify `fc-match "Agave Nerd Font"`, then run `fastfetch --config ~/.config/fastfetch/config.jsonc`. Hardware output belongs to the target machine and will differ from screenshots.

## 4. Select the appearance stack

In System Settings → Colors & Themes select BreezeDark, Darkly, Ant-Dark, Reversal, macOS-White at 24 px and Klassy.

Set FantasqueSansM Nerd Font 10 for general/menu/toolbar text, Agave Nerd Font 12 for fixed-width text and Inter 10 for active titles. The source ClearClock snapshot also references `ZinHenaBokuryu`, `ZinHenaKaede-RKF` and `YAKITORI`; use licensed copies or available substitutes because these files are not redistributed.

In Klassy configure the observed 10 px radius, active/inactive title opacity 76/58, a large shadow and a 1 px contrast outline. Exact option names can vary between Klassy versions; if an option is absent, do not invent a replacement value.

## 5. Configure KWin effects

Use `rice/config/kwin/kwinrc` as the value reference while changing settings through System Settings:

- Blur enabled, strength 8, noise 1.
- Translucency enabled: menus 78%, dialogs 94%, move/resize 90%.
- Scale transition 180 ms; Overview transition 200 ms.
- Slide effect with zero horizontal and vertical gaps.
- Rounded Corners / ShapeCorners enabled only when compatible.

If artifacts appear, disable Rounded Corners first and Blur second. Avoid changing the compositor backend merely to match a screenshot.

## 6. Create workspaces and shortcuts

Create seven virtual desktops in one row. In System Settings → Keyboard → Shortcuts → KWin assign direct switching:

```text
Alt+1 → Desktop 1
Alt+2 → Desktop 2
Alt+3 → Desktop 3
Alt+4 → Desktop 4
Alt+5 → Desktop 5
Alt+6 → Desktop 6
Alt+7 → Desktop 7
```

Search for conflicts before assigning each key. The repository snippet contains only these seven shortcuts and is not a complete global-shortcuts file.

## 7. Recreate panels

The source system had four floating panels across two screens.

Primary 1920×1080:

1. Top, 1040×28: Kara → expanding spacer → KVitals → Network → Volume → Battery → Digital Clock.
2. Bottom, 980×46: Kickoff → Icons-only Task Manager → margin separator → System Tray → Digital Clock → Show Desktop.

Secondary 1366×768:

1. Top, 760×27: Kara → expanding spacer → KVitals → Network → Volume → Battery → Digital Clock.
2. Bottom, 620×40: Kickoff → Icons-only Task Manager → Digital Clock.

Enter Plasma Edit Mode, create one panel at a time, enable floating behavior and add widgets in order. On different screens, scale panel lengths proportionally and keep controls readable. Panel screen indexes and containment IDs are machine-specific, so do not transplant them unless the topology closely matches.

Add ClearClock to the primary desktop, not the top panel. Select available substitute fonts if the exact licensed faces are unavailable.

## 8. Apply and verify

Save work, log out, select Plasma (Wayland) and log back in. Run:

```bash
bash rice/scripts/doctor.sh
fastfetch
```

Verify themes, fonts, cursor, Klassy decoration, restrained blur, wallpaper, panel order and all seven shortcuts. A difference caused by monitor geometry or an unavailable licensed font requires manual adjustment.

## 9. Roll back a manual change

Use the timestamped backup and restore only the affected relative path. Log out before restoring `kwinrc`, `plasmashellrc` or `plasma-org.kde.plasma.desktop-appletsrc`. Do not delete all Plasma configuration as a first troubleshooting step; see `troubleshooting.md` for component-specific recovery.
