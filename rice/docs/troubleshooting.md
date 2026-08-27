# Troubleshooting

## Start with the doctor

```bash
bash rice/scripts/doctor.sh
```

It is read-only. Required failures use `✗`; third-party components that can be installed later use `⚠`.

## Missing Nerd Font glyphs

Install `ttf-fantasque-nerd` and `ttf-agave-nerd`, then fully restart Ghostty. Check `fc-match "Agave Nerd Font"` and `fc-match "FantasqueSansM Nerd Font"`.

## Darkly, Klassy, icons or cursor are absent

Confirm the package/theme directory exists, then log out and back in. Qt application styles are binary plugins and must match the current Qt/Plasma ABI. Do not copy the owner's compiled `.so` files.

## Workspace shortcuts do not work

Open System Settings → Keyboard → Shortcuts → KWin and search for “Switch to Desktop”. Remove conflicts before assigning `Alt+1` … `Alt+7`. The installer only merges these seven keys.

## Panel appears on the wrong monitor

The snapshot uses screen indexes 0 and 1 for 1920×1080 + 1366×768. Restore the two Plasma files from backup, then rebuild the panels manually using `components.md`. Do not edit monitor EDID/output files from another machine.

## Plasma panel is broken

First restore only:

```text
~/.config/plasmashellrc
~/.config/plasma-org.kde.plasma.desktop-appletsrc
```

from the newest `~/.rice-backup/<timestamp>/`. Log out before replacement and log back in afterward. Avoid deleting all Plasma configuration as a first response.

## Blur looks excessive or causes artifacts

Disable the Rounded Corners effect temporarily, then Blur, to isolate the cause. Verify the effect version supports your exact KWin release. The captured values are blur strength 8 and noise 1; lower blur before changing the compositor backend.

## Wallpaper is missing

The installer places it at:

```text
~/.local/share/wallpapers/desktop-dream/Mauve_girl.webp
```

Select that file manually in Desktop and Wallpaper settings if Plasma kept an old absolute path.

## Ghostty is too transparent

Set `background-opacity = 1` temporarily. If readability returns, tune the shipped 0.86 value for your compositor/display rather than enabling stronger blur.

## Restore a backup

Inspect the backup directory, log out of Plasma for panel/KWin restoration, and copy only the affected relative path back. A full rollback example is in `installation.md`.

## Wayland notes

This rice was audited on Wayland. X11 can differ in blur, scaling, cursor handling and panel placement. KWin effect binaries must match the installed KWin ABI; rebuild or reinstall them after major Plasma upgrades.
