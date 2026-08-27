export const repository = {
  owner: "AdminPanelHunmaster",
  name: "desktop-dream",
  branch: "main",
  url: "https://github.com/AdminPanelHunmaster/desktop-dream",
  zip: "https://github.com/AdminPanelHunmaster/desktop-dream/archive/refs/heads/main.zip",
  riceTree: "https://github.com/AdminPanelHunmaster/desktop-dream/tree/main/rice",
} as const;

export const systemFacts = [
  ["Distribution", "EndeavourOS / Arch Linux"],
  ["Desktop", "KDE Plasma 6.7.4"],
  ["Session", "Wayland"],
  ["Window manager", "KWin 6.7.4"],
  ["Terminal", "Ghostty 1.3.1"],
  ["System fetch", "Fastfetch 2.67.1"],
] as const;

export const appearanceFacts = [
  ["Plasma theme", "Ant-Dark", "Plasma panels and widgets"],
  ["Color scheme", "BreezeDark", "KDE color palette"],
  ["Application style", "Darkly", "Qt controls and surfaces"],
  ["Window decoration", "Klassy", "10 px radius, restrained translucency"],
  ["Icons", "Reversal", "Colorful rectangular icon theme"],
  ["Cursor", "macOS-White · 24 px", "White Apple cursor variant"],
  ["UI font", "FantasqueSansM Nerd Font · 10", "Menus, panels and controls"],
  ["Monospace", "Agave Nerd Font · 12", "Ghostty and fixed-width text"],
  [
    "Desktop clock",
    "ZinHenaBokuryu · ZinHenaKaede-RKF · YAKITORI",
    "Not redistributed; provide licensed copies or choose substitutes",
  ],
  ["Wallpaper", "Mauve_girl", "Repository asset included with the rice"],
] as const;

export const thirdParty = [
  { name: "Ant-Dark", kind: "Plasma theme", source: "https://github.com/EliverLara/Ant" },
  { name: "Darkly", kind: "Application style", source: "https://github.com/Bali10050/Darkly" },
  { name: "Klassy", kind: "Window decoration", source: "https://github.com/paulmcauley/klassy" },
  {
    name: "Reversal",
    kind: "Icon theme",
    source: "https://github.com/yeyushengfan258/Reversal-icon-theme",
  },
  { name: "Apple Cursor", kind: "Cursor theme", source: "https://github.com/ful1e5/apple_cursor" },
  {
    name: "KDE Rounded Corners",
    kind: "KWin effect",
    source: "https://github.com/matinlotfali/KDE-Rounded-Corners",
  },
] as const;

export const panels = [
  {
    title: "Primary · top",
    geometry: "1040 × 28 · floating",
    widgets: [
      "Kara",
      "Expanding spacer",
      "KVitals",
      "Network",
      "Volume",
      "Battery",
      "Digital Clock",
    ],
  },
  {
    title: "Primary · bottom",
    geometry: "980 × 46 · floating",
    widgets: [
      "Kickoff",
      "Icons-only Task Manager",
      "Margin separator",
      "System Tray",
      "Digital Clock",
      "Show Desktop",
    ],
  },
  {
    title: "Secondary · top",
    geometry: "760 × 27 · floating",
    widgets: [
      "Kara",
      "Expanding spacer",
      "KVitals",
      "Network",
      "Volume",
      "Battery",
      "Digital Clock",
    ],
  },
  {
    title: "Secondary · bottom",
    geometry: "620 × 40 · floating",
    widgets: ["Kickoff", "Icons-only Task Manager", "Digital Clock"],
  },
] as const;

export const widgets = [
  {
    name: "Kara 1.0.0",
    purpose: "Virtual desktop switcher",
    source: "https://github.com/dhruv8sh/kara",
  },
  {
    name: "KVitals 3.1.1",
    purpose: "Compact panel metrics",
    source: "https://github.com/yassine20011/kvitals",
  },
  {
    name: "ClearClock 0.3",
    purpose: "Desktop date/time widget",
    source: "https://github.com/qewer33/ClearClock",
  },
] as const;

export const workspaces = Array.from({ length: 7 }, (_, index) => ({
  desktop: index + 1,
  shortcut: "Alt + " + (index + 1),
}));

export type RicePackage = {
  name: string;
  purpose: string;
  command: string;
  source: string;
};

export const packages: Record<
  "Official repositories" | "AUR" | "Optional" | "Fonts" | "Plasma widgets",
  RicePackage[]
> = {
  "Official repositories": [
    {
      name: "plasma-desktop",
      purpose: "KDE Plasma desktop",
      command: "sudo pacman -S --needed plasma-desktop",
      source: "https://archlinux.org/packages/extra/x86_64/plasma-desktop/",
    },
    {
      name: "kwin",
      purpose: "Wayland compositor and window manager",
      command: "sudo pacman -S --needed kwin",
      source: "https://archlinux.org/packages/extra/x86_64/kwin/",
    },
    {
      name: "ghostty",
      purpose: "Rice terminal",
      command: "sudo pacman -S --needed ghostty",
      source: "https://archlinux.org/packages/extra/x86_64/ghostty/",
    },
    {
      name: "fastfetch",
      purpose: "System information view",
      command: "sudo pacman -S --needed fastfetch",
      source: "https://archlinux.org/packages/extra/x86_64/fastfetch/",
    },
    {
      name: "darkly",
      purpose: "Qt application style",
      command: "sudo pacman -S --needed darkly",
      source: "https://github.com/Bali10050/Darkly",
    },
  ],
  AUR: [
    {
      name: "klassy",
      purpose: "Window decorations and Klassy defaults",
      command: "paru -S --needed klassy",
      source: "https://aur.archlinux.org/packages/klassy",
    },
    {
      name: "reversal-icon-theme-git",
      purpose: "Reversal icon theme",
      command: "paru -S --needed reversal-icon-theme-git",
      source: "https://aur.archlinux.org/packages/reversal-icon-theme-git",
    },
    {
      name: "apple_cursor",
      purpose: "macOS-White cursor",
      command: "paru -S --needed apple_cursor",
      source: "https://aur.archlinux.org/packages/apple_cursor",
    },
    {
      name: "kwin-effect-rounded-corners-git",
      purpose: "ShapeCorners KWin effect",
      command: "paru -S --needed kwin-effect-rounded-corners-git",
      source: "https://aur.archlinux.org/packages/kwin-effect-rounded-corners-git",
    },
  ],
  Optional: [
    {
      name: "kvantum",
      purpose: "Installed on the source system; not the active app style",
      command: "sudo pacman -S --needed kvantum",
      source: "https://archlinux.org/packages/extra/x86_64/kvantum/",
    },
    {
      name: "konsole",
      purpose: "Fallback KDE terminal profile",
      command: "sudo pacman -S --needed konsole",
      source: "https://archlinux.org/packages/extra/x86_64/konsole/",
    },
  ],
  Fonts: [
    {
      name: "ttf-fantasque-nerd",
      purpose: "Plasma UI font with glyphs",
      command: "sudo pacman -S --needed ttf-fantasque-nerd",
      source: "https://archlinux.org/packages/extra/any/ttf-fantasque-nerd/",
    },
    {
      name: "ttf-agave-nerd",
      purpose: "Ghostty and fixed-width font",
      command: "sudo pacman -S --needed ttf-agave-nerd",
      source: "https://archlinux.org/packages/extra/any/ttf-agave-nerd/",
    },
    {
      name: "YAKITORI / ZinHena faces",
      purpose: "Optional exact ClearClock typography; files are not redistributed",
      command: "Install licensed copies manually or select substitute ClearClock fonts",
      source: "https://www.mksd.jp/yakitori.html",
    },
  ],
  "Plasma widgets": widgets.map((widget) => ({
    name: widget.name,
    purpose: widget.purpose,
    command: "Install the Plasma 6 package from upstream",
    source: widget.source,
  })),
};

export const guideSteps = [
  {
    title: "Confirm the target",
    body: "Use EndeavourOS or Arch Linux with KDE Plasma and select the Plasma (Wayland) session. The captured setup is Plasma/KWin 6.7.4; binary KWin effects must match your installed ABI.",
    command: 'printf "session=%s desktop=%s\\\\n" "$XDG_SESSION_TYPE" "$XDG_CURRENT_DESKTOP"',
  },
  {
    title: "Clone the real repository",
    body: "The website, documentation and sanitized dotfiles live together. No separate download service or hidden backend is involved.",
    command:
      "git clone https://github.com/AdminPanelHunmaster/desktop-dream.git\\ncd desktop-dream",
  },
  {
    title: "Read and back up",
    body: "Inspect the installer before running it. The standalone backup preserves relative paths below ~/.rice-backup/<timestamp>/.",
    command:
      "sed -n '1,260p' rice/scripts/install.sh\\nbash rice/scripts/backup.sh --include-plasma-layout",
  },
  {
    title: "Install repository packages",
    body: "The package flag shows the exact pacman list and uses --needed. The script never performs a system-wide update.",
    command: "bash rice/scripts/install.sh --packages",
  },
  {
    title: "Install reviewed AUR components",
    body: "An existing paru or yay is required. Review the PKGBUILDs for Klassy, Reversal, Apple Cursor and KDE Rounded Corners.",
    command: "bash rice/scripts/install.sh --aur",
  },
  {
    title: "Install third-party Plasma content",
    body: "Install Ant-Dark, Kara, KVitals and ClearClock from the upstream links. They are intentionally not vendored or downloaded. ClearClock's exact user-local fonts are documented but not redistributed.",
  },
  {
    title: "Apply app configs",
    body: "The safe default installs the wallpaper plus Ghostty and Fastfetch after backing up any existing destination.",
    command: "bash rice/scripts/install.sh",
  },
  {
    title: "Apply KDE and KWin",
    body: "The opt-in flag installs sanitized KDE/KWin copies and merges only Alt+1…Alt+7. It does not restart Plasma.",
    command: "bash rice/scripts/install.sh --apply-kde",
  },
  {
    title: "Choose the panel route",
    body: "The exact layout snapshot targets 1920×1080 + 1366×768. Use --plasma-layout only for a close topology; otherwise recreate panels manually from the Plasma app.",
    command: "bash rice/scripts/install.sh --plasma-layout",
  },
  {
    title: "Log in and verify",
    body: "Log out, select Plasma (Wayland), log back in and run the read-only doctor. Check fonts, theme entries, shortcuts, panels and restrained blur.",
    command: "bash rice/scripts/doctor.sh\\nfastfetch",
  },
] as const;

export const troubleshooting = [
  [
    "Missing glyphs",
    'Install both Nerd Font packages, restart Ghostty and check fc-match "Agave Nerd Font".',
  ],
  [
    "Theme is not listed",
    "Qt/KWin binary plugins must match the current Plasma ABI. Reinstall or rebuild the upstream component after a major Plasma upgrade.",
  ],
  [
    "Alt shortcuts do nothing",
    "Open System Settings → Keyboard → Shortcuts → KWin, remove conflicts and assign direct desktop switching.",
  ],
  [
    "Panel is on the wrong screen",
    "Restore the two Plasma files from backup and rebuild panels manually. The captured layout uses screen indexes 0/1.",
  ],
  [
    "Blur artifacts",
    "Disable Rounded Corners, then Blur, to isolate the incompatible effect. Keep blur strength near the captured value of 8.",
  ],
  [
    "Wallpaper is blank",
    "Select ~/.local/share/wallpapers/desktop-dream/Mauve_girl.webp manually; Plasma may retain an older absolute path.",
  ],
  [
    "Need to roll back",
    "Log out before panel/KWin restoration and copy only the affected path from ~/.rice-backup/<timestamp>/.",
  ],
] as const;

export const terminalPreview = [
  "          /\\\\",
  "         /  \\\\       Desktop Dream",
  "        / /\\\\ \\\\      EndeavourOS · KDE Plasma 6.7.4",
  "       / ____ \\\\     KWin · Wayland",
  "      /_/    \\\\_\\\\    Ghostty · Fastfetch",
  "",
  "  WM Theme    Klassy",
  "  Plasma      Ant-Dark",
  "  Icons       Reversal",
  "  Font        Agave Nerd Font",
] as const;
