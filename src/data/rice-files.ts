import manifest from "../../rice/manifest.json?raw";
import riceReadme from "../../rice/README.md?raw";
import installation from "../../rice/docs/installation.md?raw";
import components from "../../rice/docs/components.md?raw";
import troubleshootingDoc from "../../rice/docs/troubleshooting.md?raw";
import manualSetup from "../../rice/docs/manual-setup.md?raw";
import installer from "../../rice/scripts/install.sh?raw";
import doctor from "../../rice/scripts/doctor.sh?raw";
import backup from "../../rice/scripts/backup.sh?raw";
import fastfetch from "../../rice/config/fastfetch/config.jsonc?raw";
import fastfetchAscii from "../../rice/config/fastfetch/ascii.txt?raw";
import ghostty from "../../rice/config/ghostty/config?raw";
import kdeglobals from "../../rice/config/kde/kdeglobals?raw";
import shortcuts from "../../rice/config/kde/kglobalshortcutsrc.snippet?raw";
import kcminputrc from "../../rice/config/kde/kcminputrc?raw";
import kscreenlockerrc from "../../rice/config/kde/kscreenlockerrc?raw";
import klassyrc from "../../rice/config/kde/klassyrc?raw";
import karaEnv from "../../rice/config/kde/kara.sh?raw";
import kwinrc from "../../rice/config/kwin/kwinrc?raw";
import plasmarc from "../../rice/config/plasma/plasmarc?raw";
import plasmashellrc from "../../rice/config/plasma/plasmashellrc?raw";
import appletsrc from "../../rice/config/plasma/plasma-org.kde.plasma.desktop-appletsrc?raw";
import { repository } from "./rice";

export type RiceFile = {
  path: string;
  content?: string;
  language: string;
  sizeLabel: string;
};

const byteSize = (value: string) =>
  typeof TextEncoder === "undefined" ? value.length : new TextEncoder().encode(value).length;

const textFile = (path: string, content: string, language: string): RiceFile => ({
  path,
  content,
  language,
  sizeLabel: byteSize(content).toLocaleString() + " B",
});

export const riceFiles: RiceFile[] = [
  textFile("rice/README.md", riceReadme, "markdown"),
  textFile("rice/manifest.json", manifest, "json"),
  textFile("rice/config/fastfetch/config.jsonc", fastfetch, "jsonc"),
  textFile("rice/config/fastfetch/ascii.txt", fastfetchAscii, "text"),
  textFile("rice/config/ghostty/config", ghostty, "ini"),
  textFile("rice/config/kde/kdeglobals", kdeglobals, "ini"),
  textFile("rice/config/kde/kglobalshortcutsrc.snippet", shortcuts, "ini"),
  textFile("rice/config/kde/kcminputrc", kcminputrc, "ini"),
  textFile("rice/config/kde/kscreenlockerrc", kscreenlockerrc, "ini"),
  textFile("rice/config/kde/klassyrc", klassyrc, "ini"),
  textFile("rice/config/kde/kara.sh", karaEnv, "bash"),
  textFile("rice/config/kwin/kwinrc", kwinrc, "ini"),
  textFile("rice/config/plasma/plasmarc", plasmarc, "ini"),
  textFile("rice/config/plasma/plasmashellrc", plasmashellrc, "ini"),
  textFile("rice/config/plasma/plasma-org.kde.plasma.desktop-appletsrc", appletsrc, "ini"),
  textFile("rice/scripts/install.sh", installer, "bash"),
  textFile("rice/scripts/doctor.sh", doctor, "bash"),
  textFile("rice/scripts/backup.sh", backup, "bash"),
  textFile("rice/docs/installation.md", installation, "markdown"),
  textFile("rice/docs/components.md", components, "markdown"),
  textFile("rice/docs/troubleshooting.md", troubleshootingDoc, "markdown"),
  textFile("rice/docs/manual-setup.md", manualSetup, "markdown"),
  {
    path: "rice/assets/wallpapers/Mauve_girl.webp",
    language: "image",
    sizeLabel: "125 KB",
  },
];

export const githubFileUrl = (path: string) =>
  repository.url + "/blob/" + repository.branch + "/" + path;

export const rawFileUrl = (path: string) =>
  "https://raw.githubusercontent.com/" +
  repository.owner +
  "/" +
  repository.name +
  "/" +
  repository.branch +
  "/" +
  path;
