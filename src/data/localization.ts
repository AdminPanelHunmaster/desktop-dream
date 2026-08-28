import type { Locale } from "@/i18n/locale";

export type AppId =
  | "install"
  | "files"
  | "appearance"
  | "plasma"
  | "workspaces"
  | "fastfetch"
  | "packages"
  | "guide"
  | "troubleshooting";

type LocalizedContent = {
  apps: Record<AppId, { title: string; label: string }>;
  desktop: {
    aria: string;
    languages: string;
    languageHint: string;
    decorativeMetrics: string;
    wifi: string;
    volume: string;
    battery: string;
    dock: string;
    minimize: string;
    close: string;
  };
  common: {
    sources: string;
    download: string;
    downloadAll: string;
    openGithub: string;
    copy: string;
    copied: string;
    copyFailed: string;
    readInstallation: string;
  };
  files: {
    tree: string;
    downloadRaw: string;
    repositoryCopy: string;
    wallpaperAlt: string;
  };
  appearance: {
    eyebrow: string;
    title: string;
    intro: string;
    thirdParty: string;
    included: string;
    wallpaperAlt: string;
    factNames: string[];
    factPurposes: string[];
    kinds: string[];
  };
  plasma: {
    eyebrow: string;
    title: string;
    intro: string;
    widgets: string;
    upstream: string;
    safety: string;
    panelTitles: string[];
    widgetPurposes: string[];
    widgetNames: Record<string, string>;
  };
  workspaces: {
    eyebrow: string;
    title: string;
    intro: string;
    desktop: string;
    config: string;
    location: string;
    siteHint: string;
  };
  fastfetch: {
    terminalSurface: string;
    font: string;
    background: string;
    blur: string;
    enabled: string;
    padding: string;
    palette: string;
    paletteValue: string;
    audited: string;
    description: string;
    config: string;
    ghosttyConfig: string;
    windowTheme: string;
  };
  packages: {
    eyebrow: string;
    title: string;
    intro: string;
    groups: Record<string, string>;
    purposes: Record<string, string>;
    sourceLabel: string;
  };
  guide: {
    eyebrow: string;
    title: string;
    intro: string;
    steps: Array<{ title: string; body: string }>;
  };
  troubleshooting: {
    eyebrow: string;
    title: string;
    intro: string;
    doctor: string;
    doctorBody: string;
    configured: string;
    optional: string;
    rollback: string;
    rollbackBody: string;
    items: Array<[string, string]>;
  };
  errors: {
    notFound: string;
    notFoundBody: string;
    loadFailed: string;
    loadFailedBody: string;
    retry: string;
    home: string;
  };
};

const appNames = {
  en: [
    "Install",
    "Dotfiles",
    "Appearance",
    "Plasma",
    "Workspaces",
    "Fastfetch",
    "Packages",
    "Guide",
    "Troubleshooting",
  ],
  ru: [
    "Установка",
    "Dotfiles",
    "Оформление",
    "Plasma",
    "Столы",
    "Fastfetch",
    "Пакеты",
    "Инструкция",
    "Решение проблем",
  ],
  uk: [
    "Встановлення",
    "Dotfiles",
    "Оформлення",
    "Plasma",
    "Стільниці",
    "Fastfetch",
    "Пакунки",
    "Інструкція",
    "Усунення проблем",
  ],
  de: [
    "Installation",
    "Dotfiles",
    "Erscheinungsbild",
    "Plasma",
    "Arbeitsflächen",
    "Fastfetch",
    "Pakete",
    "Anleitung",
    "Fehlerbehebung",
  ],
  pl: [
    "Instalacja",
    "Dotfiles",
    "Wygląd",
    "Plasma",
    "Pulpity",
    "Fastfetch",
    "Pakiety",
    "Poradnik",
    "Rozwiązywanie problemów",
  ],
  cs: [
    "Instalace",
    "Dotfiles",
    "Vzhled",
    "Plasma",
    "Plochy",
    "Fastfetch",
    "Balíčky",
    "Průvodce",
    "Řešení problémů",
  ],
  hu: [
    "Telepítés",
    "Dotfiles",
    "Megjelenés",
    "Plasma",
    "Munkaterületek",
    "Fastfetch",
    "Csomagok",
    "Útmutató",
    "Hibaelhárítás",
  ],
} as const;

function apps(locale: Locale): LocalizedContent["apps"] {
  const names = appNames[locale];
  return {
    install: { label: names[0], title: `Terminal — ${names[0]}` },
    files: { label: names[1], title: names[1] },
    appearance: { label: names[2], title: names[2] },
    plasma: { label: names[3], title: names[3] },
    workspaces: { label: names[4], title: names[4] },
    fastfetch: { label: names[5], title: `Ghostty & Fastfetch` },
    packages: { label: names[6], title: names[6] },
    guide: { label: names[7], title: names[7] },
    troubleshooting: { label: names[8], title: names[8] },
  };
}

const packageNames = [
  "plasma-desktop",
  "kwin",
  "ghostty",
  "fastfetch",
  "darkly",
  "klassy",
  "reversal-icon-theme-git",
  "apple_cursor",
  "kwin-effect-rounded-corners-git",
  "kvantum",
  "konsole",
  "ttf-fantasque-nerd",
  "ttf-agave-nerd",
  "YAKITORI / ZinHena faces",
  "Kara 1.0.0",
  "KVitals 3.1.1",
  "ClearClock 0.3",
] as const;

function purposes(values: string[]) {
  return Object.fromEntries(packageNames.map((name, index) => [name, values[index]]));
}

export const content: Record<Locale, LocalizedContent> = {
  en: {
    apps: apps("en"),
    desktop: {
      aria: "Interactive KDE rice documentation desktop",
      languages: "Site language",
      languageHint: "Language {number}: {name}",
      decorativeMetrics: "Decorative rice preview metrics — not visitor hardware",
      wifi: "Wi-Fi preview",
      volume: "Volume preview",
      battery: "Battery preview",
      dock: "Rice applications",
      minimize: "Minimize",
      close: "Close",
    },
    common: {
      sources: "Sources",
      download: "Download",
      downloadAll: "Download all",
      openGithub: "Open on GitHub",
      copy: "Copy",
      copied: "Copied",
      copyFailed: "Copy failed",
      readInstallation: "Read installation.md",
    },
    files: {
      tree: "Rice file tree",
      downloadRaw: "Download raw file",
      repositoryCopy: "sanitized repository copy",
      wallpaperAlt: "Mauve rice wallpaper",
    },
    appearance: {
      eyebrow: "Appearance stack",
      title: "Dark, square, restrained",
      intro:
        "These values were read from the source system. Third-party projects stay upstream; the repository contains only owner configuration and the included wallpaper.",
      thirdParty: "Third-party components",
      included: "Included asset",
      wallpaperAlt: "Mauve_girl rice wallpaper",
      factNames: [
        "Plasma theme",
        "Color scheme",
        "Application style",
        "Window decoration",
        "Icons",
        "Cursor",
        "UI font",
        "Monospace",
        "Desktop clock",
        "Wallpaper",
      ],
      factPurposes: [
        "Plasma panels and widgets",
        "KDE color palette",
        "Qt controls and surfaces",
        "10 px radius, restrained translucency",
        "Colorful rectangular icon theme",
        "White Apple cursor variant",
        "Menus, panels and controls",
        "Ghostty and fixed-width text",
        "Not redistributed; provide licensed copies or choose substitutes",
        "Repository asset included with the rice",
      ],
      kinds: [
        "Plasma theme",
        "Application style",
        "Window decoration",
        "Icon theme",
        "Cursor theme",
        "KWin effect",
      ],
    },
    plasma: {
      eyebrow: "Plasma shell",
      title: "Four floating panels, two screens",
      intro:
        "The audited layout uses a 1920×1080 primary display and a 1366×768 secondary display. Panel geometry is reproducible, but a different monitor topology must be adjusted manually.",
      widgets: "Widgets",
      upstream: "Exact upstream sources",
      safety: "--plasma-layout is opt-in, creates a backup first and never restarts plasmashell.",
      panelTitles: ["Primary · top", "Primary · bottom", "Secondary · top", "Secondary · bottom"],
      widgetPurposes: [
        "Virtual desktop switcher",
        "Compact panel metrics",
        "Desktop date/time widget",
      ],
      widgetNames: {},
    },
    workspaces: {
      eyebrow: "KWin desktops",
      title: "Seven desktops, one row",
      intro:
        "Each shortcut was copied from the source kglobalshortcutsrc. The installer merges these keys instead of publishing or replacing every global shortcut.",
      desktop: "Desktop",
      config: "Config",
      location: "Where it lives",
      siteHint:
        "Alt+1…Alt+7 are the real rice shortcuts. On this website the same keys select languages 1…7; they never read or change your operating system.",
    },
    fastfetch: {
      terminalSurface: "Terminal surface",
      font: "Font",
      background: "Background",
      blur: "Blur",
      enabled: "Enabled",
      padding: "Padding",
      palette: "Palette",
      paletteValue: "Mauve / rose / slate",
      audited: "Audited configuration",
      description:
        "Uses the built-in EndeavourOS mark recolored in dusty rose, muted mauve and violet. The module layout covers hardware and software. Device values shown by the interactive terminal are explicitly static demo data and never visitor telemetry.",
      config: "Fastfetch config",
      ghosttyConfig: "Ghostty config",
      windowTheme: "WM Theme",
    },
    packages: {
      eyebrow: "Rice packages only",
      title: "Small, explicit dependency set",
      intro:
        "This is not a dump of every installed package. It contains only software that materially contributes to the observed desktop.",
      groups: {
        "Official repositories": "Official repositories",
        AUR: "AUR",
        Optional: "Optional",
        Fonts: "Fonts",
        "Plasma widgets": "Plasma widgets",
      },
      purposes: purposes([
        "KDE Plasma desktop",
        "Wayland compositor and window manager",
        "Rice terminal",
        "System information view",
        "Qt application style",
        "Window decorations and Klassy defaults",
        "Reversal icon theme",
        "macOS-White cursor",
        "ShapeCorners KWin effect",
        "Installed on the source system; not the active app style",
        "Fallback KDE terminal profile",
        "Plasma UI font with glyphs",
        "Ghostty and fixed-width font",
        "Optional exact ClearClock typography; files are not redistributed",
        "Virtual desktop switcher",
        "Compact panel metrics",
        "Desktop date/time widget",
      ]),
      sourceLabel: "source",
    },
    guide: {
      eyebrow: "From clean KDE to this rice",
      title: "Complete, cautious installation path",
      intro:
        "This route starts with a clean EndeavourOS KDE installation and explains what changes, where it is stored, when logout is required, how to verify it and how to return to the backup.",
      steps: [
        {
          title: "Confirm the supported target",
          body: "Use EndeavourOS or Arch Linux with KDE Plasma and select Plasma (Wayland). The captured source was Plasma/KWin 6.7.4; binary KWin effects must match the ABI of your installed version, so do not force an incompatible build.",
        },
        {
          title: "Prepare a normal user session",
          body: "Log in as a regular user with working network access and sudo. Do not run the installer as root. Finish any deliberate system update and reboot beforehand if your kernel or Plasma changed; this repository never updates the operating system.",
        },
        {
          title: "Clone the repository",
          body: "Clone Desktop Dream and enter its directory. The website, documentation, sanitized configs, wallpaper and scripts are versioned together; there is no hidden download service or backend.",
        },
        {
          title: "Inspect the evidence and scripts",
          body: "Read rice/manifest.json, rice/docs/components.md and the installer before running anything. The manifest distinguishes repository files from third-party projects and records what was actually observed on the read-only source system.",
        },
        {
          title: "Run the read-only preflight",
          body: "Run doctor.sh first. It reports distribution, Plasma, Wayland, packages, themes, fonts, files, effects and shortcuts without applying settings. Resolve required failures before moving on; optional warnings can be handled later.",
        },
        {
          title: "Create a recoverable backup",
          body: "backup.sh copies existing relevant paths to ~/.rice-backup/<timestamp>/ while preserving their relative layout. Include the Plasma snapshot only if you intend to replace panels; inspect the resulting directory before installation.",
        },
        {
          title: "Install official packages",
          body: "The --packages route installs only the documented repository packages with pacman --needed and shows the plan first. It includes Plasma/KWin, Ghostty, Fastfetch, Darkly, Kvantum and the two Nerd Fonts; it does not perform pacman -Syu.",
        },
        {
          title: "Review and install AUR components",
          body: "The --aur route requires an existing paru or yay. Review the PKGBUILDs for Klassy, Reversal, Apple Cursor and Rounded Corners. If a package does not support your Plasma/KWin version, stop and use the compatible upstream release instead.",
        },
        {
          title: "Install non-vendored themes and widgets",
          body: "Install Ant-Dark, Kara, KVitals and ClearClock from the exact links in Appearance and Plasma. They are intentionally not copied into this repository. The exact ClearClock fonts are not redistributed; provide licensed files or choose substitutes.",
        },
        {
          title: "Install the safe app configuration",
          body: "The default installer backs up and copies the wallpaper, ~/.config/ghostty/config and ~/.config/fastfetch/config.jsonc. It does not touch KDE/KWin or restart Plasma. Restart Ghostty to load its font, palette, padding, opacity and blur settings.",
        },
        {
          title: "Apply KDE and KWin only when ready",
          body: "--apply-kde installs the sanitized kdeglobals, kcminputrc, kscreenlockerrc, klassyrc, kwinrc and plasmarc copies, then merges only Alt+1…Alt+7. It changes theme, fonts, cursor, decoration and effects after backup, but does not restart Plasma.",
        },
        {
          title: "Choose an exact or manual panel route",
          body: "The captured Plasma layout is specific to 1920×1080 plus 1366×768. Use --plasma-layout only for a close topology. Otherwise create the four floating panels manually from the documented dimensions and widget order.",
        },
        {
          title: "Recreate workspaces and shortcuts",
          body: "Verify seven virtual desktops in one row in System Settings. Under Keyboard → Shortcuts → KWin assign direct switching Alt+1 through Alt+7, removing conflicts first. The shipped snippet contains only these seven mappings.",
        },
        {
          title: "Check terminal and Fastfetch",
          body: "Confirm Agave Nerd Font is available, restart Ghostty, then run Fastfetch with the shipped config. The real command reads the current machine at runtime; the website terminal intentionally shows static Test Device values instead.",
        },
        {
          title: "Apply the session changes",
          body: "Save work, log out and choose Plasma (Wayland), then log back in. A logout is needed for the most reliable reload of fonts, cursor, Qt/KWin plugins, global shortcuts and Plasma configuration; no script performs it for you.",
        },
        {
          title: "Verify the result",
          body: "Run doctor.sh and inspect every required line. Confirm theme entries, Ghostty glyphs, wallpaper, four panels, seven shortcuts, Klassy decorations and restrained blur. Different screen geometry is a documented reason for manual panel adjustment, not a failed install.",
        },
        {
          title: "Diagnose one layer at a time",
          body: "Use Troubleshooting before resetting Plasma. For missing glyphs check fc-match; for binary themes check the Plasma ABI; for panel placement restore only the two Plasma files; for blur artifacts disable Rounded Corners and then Blur to isolate the cause.",
        },
        {
          title: "Roll back from the timestamped copy",
          body: "Log out before restoring Plasma or KWin files. Inspect ~/.rice-backup/<timestamp>/ and copy only the affected relative path back. Restore the full .config or .local tree only when you intentionally want a complete rollback.",
        },
      ],
    },
    troubleshooting: {
      eyebrow: "Settings & recovery",
      title: "Diagnose before resetting",
      intro:
        "The doctor is read-only. Backups preserve relative paths, so one broken component can be restored without wiping the rest of Plasma.",
      doctor: "Run the rice doctor",
      doctorBody:
        "Checks OS, Plasma, Wayland, packages, themes, files, effects and all seven shortcuts.",
      configured: "Installed / configured",
      optional: "Optional component missing",
      rollback: "Rollback",
      rollbackBody:
        "Log out before restoring Plasma/KWin files. Inspect the timestamped directory and copy only the affected relative path back.",
      items: [
        [
          "Missing glyphs",
          "Install both Nerd Font packages, restart Ghostty and check fc-match for Agave Nerd Font.",
        ],
        [
          "Theme is not listed",
          "Qt/KWin binary plugins must match the current Plasma ABI. Reinstall or rebuild the compatible upstream component after a major upgrade.",
        ],
        [
          "Alt shortcuts do nothing",
          "Open System Settings → Keyboard → Shortcuts → KWin, remove conflicts and assign direct desktop switching.",
        ],
        [
          "Panel is on the wrong screen",
          "Restore the two Plasma files from backup and rebuild panels manually. The captured layout uses screen indexes 0 and 1.",
        ],
        [
          "Blur artifacts",
          "Disable Rounded Corners and then Blur to isolate the incompatible effect. The captured blur strength is 8.",
        ],
        [
          "Wallpaper is blank",
          "Select ~/.local/share/wallpapers/desktop-dream/Mauve_girl.webp manually; Plasma may retain an older absolute path.",
        ],
        [
          "Need to roll back",
          "Log out before panel/KWin restoration and copy only the affected path from ~/.rice-backup/<timestamp>/.",
        ],
      ],
    },
    errors: {
      notFound: "Page not found",
      notFoundBody: "The page you are looking for does not exist or has moved.",
      loadFailed: "This page did not load",
      loadFailedBody: "Something went wrong. Try again or return to the desktop.",
      retry: "Try again",
      home: "Go home",
    },
  },

  ru: {
    apps: apps("ru"),
    desktop: {
      aria: "Интерактивный рабочий стол с документацией KDE rice",
      languages: "Язык сайта",
      languageHint: "Язык {number}: {name}",
      decorativeMetrics: "Декоративные показатели rice — не данные компьютера посетителя",
      wifi: "Демо Wi-Fi",
      volume: "Демо громкости",
      battery: "Демо батареи",
      dock: "Приложения rice",
      minimize: "Свернуть",
      close: "Закрыть",
    },
    common: {
      sources: "Источники",
      download: "Скачать",
      downloadAll: "Скачать всё",
      openGithub: "Открыть на GitHub",
      copy: "Копировать",
      copied: "Скопировано",
      copyFailed: "Не удалось скопировать",
      readInstallation: "Читать installation.md",
    },
    files: {
      tree: "Дерево файлов rice",
      downloadRaw: "Скачать исходный файл",
      repositoryCopy: "обезличенная копия из repository",
      wallpaperAlt: "Обои Mauve для rice",
    },
    appearance: {
      eyebrow: "Стек оформления",
      title: "Тёмный, квадратный, сдержанный",
      intro:
        "Эти значения прочитаны из исходной системы. Сторонние проекты остаются upstream; repository содержит только конфигурацию владельца и включённые обои.",
      thirdParty: "Сторонние компоненты",
      included: "Включённый ресурс",
      wallpaperAlt: "Обои rice Mauve_girl",
      factNames: [
        "Тема Plasma",
        "Цветовая схема",
        "Стиль приложений",
        "Оформление окон",
        "Значки",
        "Курсор",
        "Шрифт интерфейса",
        "Моноширинный шрифт",
        "Часы рабочего стола",
        "Обои",
      ],
      factPurposes: [
        "Панели и виджеты Plasma",
        "Цветовая палитра KDE",
        "Элементы и поверхности Qt",
        "Радиус 10 px и сдержанная прозрачность",
        "Цветная прямоугольная тема значков",
        "Белый вариант курсора Apple",
        "Меню, панели и элементы управления",
        "Ghostty и моноширинный текст",
        "Не распространяются; предоставьте лицензионные копии или выберите замену",
        "Ресурс repository, включённый в rice",
      ],
      kinds: [
        "Тема Plasma",
        "Стиль приложений",
        "Оформление окон",
        "Тема значков",
        "Тема курсора",
        "Эффект KWin",
      ],
    },
    plasma: {
      eyebrow: "Оболочка Plasma",
      title: "Четыре плавающие панели, два экрана",
      intro:
        "Проверенная раскладка использует основной экран 1920×1080 и второй 1366×768. Геометрия воспроизводима, но другую конфигурацию мониторов нужно настроить вручную.",
      widgets: "Виджеты",
      upstream: "Точные upstream-источники",
      safety:
        "--plasma-layout включается явно, сначала создаёт backup и никогда не перезапускает plasmashell.",
      panelTitles: ["Основной · верх", "Основной · низ", "Второй · верх", "Второй · низ"],
      widgetPurposes: [
        "Переключатель виртуальных столов",
        "Компактные показатели панели",
        "Дата и время на рабочем столе",
      ],
      widgetNames: {
        "Expanding spacer": "Расширяемый разделитель",
        Network: "Сеть",
        Volume: "Громкость",
        Battery: "Батарея",
        "Digital Clock": "Цифровые часы",
        "Icons-only Task Manager": "Менеджер задач со значками",
        "Margin separator": "Разделитель с отступом",
        "System Tray": "Системный лоток",
        "Show Desktop": "Показать рабочий стол",
      },
    },
    workspaces: {
      eyebrow: "Рабочие столы KWin",
      title: "Семь столов в один ряд",
      intro:
        "Каждое сочетание скопировано из исходного kglobalshortcutsrc. Installer объединяет только эти ключи и не публикует или заменяет все глобальные shortcuts.",
      desktop: "Рабочий стол",
      config: "Конфигурация",
      location: "Где хранится",
      siteHint:
        "Alt+1…Alt+7 — реальные shortcuts rice. На сайте эти же клавиши выбирают языки 1…7 и не читают и не меняют вашу ОС.",
    },
    fastfetch: {
      terminalSurface: "Поверхность терминала",
      font: "Шрифт",
      background: "Фон",
      blur: "Размытие",
      enabled: "Включено",
      padding: "Отступы",
      palette: "Палитра",
      paletteValue: "Лиловый / розовый / сланцевый",
      audited: "Проверенная конфигурация",
      description:
        "Используется встроенный знак EndeavourOS, перекрашенный в приглушённые розовые, лиловые и фиолетовые тона. Интерактивный Terminal показывает явно помеченные статичные demo-данные, а не показатели посетителя.",
      config: "Конфиг Fastfetch",
      ghosttyConfig: "Конфиг Ghostty",
      windowTheme: "Тема окон",
    },
    packages: {
      eyebrow: "Только пакеты rice",
      title: "Небольшой явный набор зависимостей",
      intro:
        "Это не список всех установленных пакетов, а только программы, существенно влияющие на наблюдаемый рабочий стол.",
      groups: {
        "Official repositories": "Официальные repositories",
        AUR: "AUR",
        Optional: "Необязательные",
        Fonts: "Шрифты",
        "Plasma widgets": "Виджеты Plasma",
      },
      purposes: purposes([
        "Рабочий стол KDE Plasma",
        "Wayland-композитор и оконный менеджер",
        "Терминал rice",
        "Просмотр информации о системе",
        "Стиль приложений Qt",
        "Оформление окон и настройки Klassy",
        "Тема значков Reversal",
        "Курсор macOS-White",
        "Эффект KWin ShapeCorners",
        "Установлен в исходной системе, но не является активным стилем",
        "Резервный профиль терминала KDE",
        "Шрифт интерфейса Plasma с глифами",
        "Шрифт Ghostty и моноширинного текста",
        "Необязательная точная типографика ClearClock; файлы не распространяются",
        "Переключатель виртуальных столов",
        "Компактные показатели панели",
        "Дата и время на рабочем столе",
      ]),
      sourceLabel: "источник",
    },
    guide: {
      eyebrow: "От чистой KDE до этого rice",
      title: "Полный безопасный путь установки",
      intro:
        "Путь начинается с чистой EndeavourOS KDE и объясняет изменения, расположение файлов, необходимость выхода из сессии, проверку и возврат к backup.",
      steps: [
        {
          title: "Проверьте целевую систему",
          body: "Используйте EndeavourOS или Arch Linux с KDE Plasma и сессию Plasma (Wayland). Исходная система имела Plasma/KWin 6.7.4; бинарные эффекты KWin должны соответствовать ABI вашей версии.",
        },
        {
          title: "Подготовьте обычную сессию пользователя",
          body: "Войдите обычным пользователем с сетью и sudo; не запускайте installer от root. Заранее завершите осознанное обновление и перезагрузитесь, если менялись kernel или Plasma: repository сам систему не обновляет.",
        },
        {
          title: "Клонируйте repository",
          body: "Клонируйте Desktop Dream и перейдите в каталог. Сайт, документация, обезличенные configs, обои и scripts версионируются вместе; скрытого backend или сервиса загрузки нет.",
        },
        {
          title: "Изучите данные и scripts",
          body: "До запуска прочитайте rice/manifest.json, rice/docs/components.md и installer. Manifest отделяет файлы repository от сторонних проектов и фиксирует только реально найденное в read-only системе.",
        },
        {
          title: "Запустите read-only проверку",
          body: "Сначала запустите doctor.sh. Он проверяет дистрибутив, Plasma, Wayland, пакеты, темы, шрифты, файлы, эффекты и shortcuts без применения настроек.",
        },
        {
          title: "Создайте восстанавливаемый backup",
          body: "backup.sh копирует существующие пути в ~/.rice-backup/<timestamp>/ с сохранением структуры. Включайте snapshot Plasma только если собираетесь заменять панели, и обязательно просмотрите результат.",
        },
        {
          title: "Установите официальные пакеты",
          body: "Режим --packages заранее показывает план и применяет pacman --needed только к документированным пакетам. Он не выполняет pacman -Syu и не обновляет систему целиком.",
        },
        {
          title: "Проверьте и установите AUR-компоненты",
          body: "Режим --aur требует уже установленный paru или yay. Проверьте PKGBUILD для Klassy, Reversal, Apple Cursor и Rounded Corners; при несовместимости с Plasma остановитесь.",
        },
        {
          title: "Установите внешние темы и виджеты",
          body: "Установите Ant-Dark, Kara, KVitals и ClearClock по точным ссылкам в Appearance и Plasma. Их код намеренно не включён. Для точных шрифтов ClearClock нужны лицензионные копии или замены.",
        },
        {
          title: "Установите безопасные configs приложений",
          body: "Обычный installer сначала делает backup, затем копирует обои, ~/.config/ghostty/config и ~/.config/fastfetch/config.jsonc. KDE/KWin он не трогает; для загрузки настроек перезапустите только Ghostty.",
        },
        {
          title: "Примените KDE и KWin, когда готовы",
          body: "--apply-kde ставит обезличенные kdeglobals, kcminputrc, kscreenlockerrc, klassyrc, kwinrc и plasmarc, затем объединяет только Alt+1…Alt+7. Plasma автоматически не перезапускается.",
        },
        {
          title: "Выберите точную или ручную панель",
          body: "Snapshot рассчитан на 1920×1080 и 1366×768. Используйте --plasma-layout только при близкой конфигурации; иначе создайте четыре floating panel вручную по размерам и порядку widgets.",
        },
        {
          title: "Настройте рабочие столы и shortcuts",
          body: "Проверьте семь виртуальных столов в один ряд. В Keyboard → Shortcuts → KWin назначьте Alt+1…Alt+7 после устранения конфликтов; snippet содержит только эти семь строк.",
        },
        {
          title: "Проверьте Terminal и Fastfetch",
          body: "Убедитесь, что доступен Agave Nerd Font, перезапустите Ghostty и запустите Fastfetch с конфигом repository. Настоящий Fastfetch читает текущую машину; сайт показывает статичный Test Device.",
        },
        {
          title: "Примените изменения сессии",
          body: "Сохраните работу, выйдите из системы и снова выберите Plasma (Wayland). Logout надёжно перезагружает fonts, cursor, Qt/KWin plugins, shortcuts и Plasma; scripts не выполняют его сами.",
        },
        {
          title: "Проверьте результат",
          body: "Запустите doctor.sh и проверьте каждую обязательную строку, темы, glyphs Ghostty, wallpaper, четыре panel, семь shortcuts, Klassy и умеренный blur. Другая геометрия экрана требует ручной корректировки.",
        },
        {
          title: "Диагностируйте по одному слою",
          body: "Сначала используйте Troubleshooting. Для glyphs проверьте fc-match, для бинарных тем — ABI Plasma, для panel — два Plasma-файла, для blur — поочерёдно Rounded Corners и Blur.",
        },
        {
          title: "Откатитесь из timestamped backup",
          body: "Перед восстановлением Plasma или KWin выйдите из сессии. Просмотрите ~/.rice-backup/<timestamp>/ и верните только повреждённый относительный путь; полный rollback выполняйте только осознанно.",
        },
      ],
    },
    troubleshooting: {
      eyebrow: "Настройки и восстановление",
      title: "Сначала диагностика, потом сброс",
      intro:
        "Doctor работает read-only. Backup сохраняет относительные пути, поэтому один компонент можно восстановить без сброса всей Plasma.",
      doctor: "Запустить doctor rice",
      doctorBody:
        "Проверяет ОС, Plasma, Wayland, пакеты, темы, файлы, эффекты и все семь shortcuts.",
      configured: "Установлено / настроено",
      optional: "Нет необязательного компонента",
      rollback: "Откат",
      rollbackBody:
        "Выйдите из сессии перед восстановлением файлов Plasma/KWin. Просмотрите timestamped каталог и верните только нужный путь.",
      items: [
        [
          "Нет glyphs",
          "Установите оба Nerd Font, перезапустите Ghostty и проверьте Agave Nerd Font через fc-match.",
        ],
        [
          "Тема отсутствует в списке",
          "Бинарные Qt/KWin plugins должны соответствовать ABI Plasma. Установите совместимую upstream-версию.",
        ],
        [
          "Alt shortcuts не работают",
          "Откройте System Settings → Keyboard → Shortcuts → KWin, устраните конфликты и назначьте прямое переключение.",
        ],
        [
          "Panel на неверном экране",
          "Восстановите два файла Plasma из backup и соберите панели вручную. Snapshot использует screen indexes 0 и 1.",
        ],
        [
          "Артефакты blur",
          "Отключите Rounded Corners, затем Blur, чтобы найти несовместимый эффект. Зафиксированная сила blur — 8.",
        ],
        [
          "Нет wallpaper",
          "Вручную выберите ~/.local/share/wallpapers/desktop-dream/Mauve_girl.webp; Plasma могла сохранить старый абсолютный путь.",
        ],
        [
          "Нужен rollback",
          "Выйдите из сессии и верните только повреждённый путь из ~/.rice-backup/<timestamp>/.",
        ],
      ],
    },
    errors: {
      notFound: "Страница не найдена",
      notFoundBody: "Запрошенная страница не существует или была перемещена.",
      loadFailed: "Страница не загрузилась",
      loadFailedBody: "Произошла ошибка. Попробуйте снова или вернитесь на рабочий стол.",
      retry: "Повторить",
      home: "На главную",
    },
  },

  uk: {
    apps: apps("uk"),
    desktop: {
      aria: "Інтерактивна стільниця з документацією KDE rice",
      languages: "Мова сайту",
      languageHint: "Мова {number}: {name}",
      decorativeMetrics: "Декоративні показники rice — не дані комп’ютера відвідувача",
      wifi: "Демо Wi-Fi",
      volume: "Демо гучності",
      battery: "Демо батареї",
      dock: "Застосунки rice",
      minimize: "Згорнути",
      close: "Закрити",
    },
    common: {
      sources: "Джерела",
      download: "Завантажити",
      downloadAll: "Завантажити все",
      openGithub: "Відкрити на GitHub",
      copy: "Копіювати",
      copied: "Скопійовано",
      copyFailed: "Не вдалося скопіювати",
      readInstallation: "Читати installation.md",
    },
    files: {
      tree: "Дерево файлів rice",
      downloadRaw: "Завантажити вихідний файл",
      repositoryCopy: "знеособлена копія з repository",
      wallpaperAlt: "Шпалери Mauve для rice",
    },
    appearance: {
      eyebrow: "Стек оформлення",
      title: "Темний, квадратний, стриманий",
      intro:
        "Ці значення прочитані з вихідної системи. Сторонні проєкти залишаються upstream; repository містить лише конфігурацію власника та шпалери.",
      thirdParty: "Сторонні компоненти",
      included: "Доданий ресурс",
      wallpaperAlt: "Шпалери rice Mauve_girl",
      factNames: [
        "Тема Plasma",
        "Колірна схема",
        "Стиль застосунків",
        "Оформлення вікон",
        "Піктограми",
        "Курсор",
        "Шрифт інтерфейсу",
        "Моноширинний шрифт",
        "Годинник стільниці",
        "Шпалери",
      ],
      factPurposes: [
        "Панелі й віджети Plasma",
        "Колірна палітра KDE",
        "Елементи й поверхні Qt",
        "Радіус 10 px і стримана прозорість",
        "Кольорова прямокутна тема піктограм",
        "Білий варіант курсора Apple",
        "Меню, панелі й елементи керування",
        "Ghostty і моноширинний текст",
        "Не поширюються; надайте ліцензійні копії або заміни",
        "Ресурс repository, включений до rice",
      ],
      kinds: [
        "Тема Plasma",
        "Стиль застосунків",
        "Оформлення вікон",
        "Тема піктограм",
        "Тема курсора",
        "Ефект KWin",
      ],
    },
    plasma: {
      eyebrow: "Оболонка Plasma",
      title: "Чотири плаваючі панелі, два екрани",
      intro:
        "Перевірена схема використовує основний дисплей 1920×1080 і другий 1366×768. Геометрію можна відтворити, але іншу топологію моніторів слід налаштувати вручну.",
      widgets: "Віджети",
      upstream: "Точні upstream-джерела",
      safety:
        "--plasma-layout вмикається явно, спочатку створює backup і не перезапускає plasmashell.",
      panelTitles: ["Основний · верх", "Основний · низ", "Другий · верх", "Другий · низ"],
      widgetPurposes: [
        "Перемикач віртуальних стільниць",
        "Компактні показники панелі",
        "Дата й час на стільниці",
      ],
      widgetNames: {
        "Expanding spacer": "Розширюваний роздільник",
        Network: "Мережа",
        Volume: "Гучність",
        Battery: "Батарея",
        "Digital Clock": "Цифровий годинник",
        "Icons-only Task Manager": "Менеджер завдань із піктограмами",
        "Margin separator": "Роздільник із відступом",
        "System Tray": "Системний лоток",
        "Show Desktop": "Показати стільницю",
      },
    },
    workspaces: {
      eyebrow: "Стільниці KWin",
      title: "Сім стільниць в один ряд",
      intro:
        "Кожне скорочення скопійоване з вихідного kglobalshortcutsrc. Installer об’єднує лише ці ключі й не замінює всі глобальні shortcuts.",
      desktop: "Стільниця",
      config: "Конфігурація",
      location: "Де зберігається",
      siteHint:
        "Alt+1…Alt+7 — справжні shortcuts rice. На сайті ці клавіші вибирають мови 1…7 і не читають та не змінюють вашу ОС.",
    },
    fastfetch: {
      terminalSurface: "Поверхня термінала",
      font: "Шрифт",
      background: "Тло",
      blur: "Розмиття",
      enabled: "Увімкнено",
      padding: "Відступи",
      palette: "Палітра",
      paletteValue: "Ліловий / рожевий / сланцевий",
      audited: "Перевірена конфігурація",
      description:
        "Використано вбудований знак EndeavourOS у приглушених рожевих, лілових і фіолетових тонах. Інтерактивний Terminal показує позначені статичні demo-дані, а не показники відвідувача.",
      config: "Конфіг Fastfetch",
      ghosttyConfig: "Конфіг Ghostty",
      windowTheme: "Тема вікон",
    },
    packages: {
      eyebrow: "Лише пакунки rice",
      title: "Невеликий явний набір залежностей",
      intro: "Це не перелік усіх встановлених пакунків, а лише ПЗ, що суттєво формує цю стільницю.",
      groups: {
        "Official repositories": "Офіційні repositories",
        AUR: "AUR",
        Optional: "Необов’язкові",
        Fonts: "Шрифти",
        "Plasma widgets": "Віджети Plasma",
      },
      purposes: purposes([
        "Стільниця KDE Plasma",
        "Wayland-композитор і менеджер вікон",
        "Термінал rice",
        "Перегляд інформації про систему",
        "Стиль застосунків Qt",
        "Оформлення вікон і налаштування Klassy",
        "Тема піктограм Reversal",
        "Курсор macOS-White",
        "Ефект KWin ShapeCorners",
        "Є у вихідній системі, але не є активним стилем",
        "Резервний профіль термінала KDE",
        "Шрифт інтерфейсу Plasma з гліфами",
        "Шрифт Ghostty і моноширинного тексту",
        "Необов’язкова точна типографіка ClearClock; файли не поширюються",
        "Перемикач віртуальних стільниць",
        "Компактні показники панелі",
        "Дата й час на стільниці",
      ]),
      sourceLabel: "джерело",
    },
    guide: {
      eyebrow: "Від чистої KDE до цього rice",
      title: "Повний обережний шлях встановлення",
      intro:
        "Шлях починається з чистої EndeavourOS KDE і пояснює зміни, файли, вихід із сесії, перевірку та повернення до backup.",
      steps: [
        {
          title: "Перевірте цільову систему",
          body: "Використовуйте EndeavourOS або Arch Linux з KDE Plasma та сесією Plasma (Wayland). Джерело мало Plasma/KWin 6.7.4; бінарні ефекти KWin повинні відповідати ABI вашої версії.",
        },
        {
          title: "Підготуйте звичайну сесію",
          body: "Увійдіть звичайним користувачем із мережею та sudo; не запускайте installer від root. Заздалегідь завершіть свідоме оновлення й перезавантаження, якщо змінилися kernel або Plasma.",
        },
        {
          title: "Клонуйте repository",
          body: "Клонуйте Desktop Dream і відкрийте каталог. Сайт, документація, знеособлені configs, шпалери та scripts версіонуються разом; прихованого backend немає.",
        },
        {
          title: "Перегляньте докази й scripts",
          body: "До запуску прочитайте rice/manifest.json, rice/docs/components.md та installer. Manifest відокремлює файли repository від сторонніх проєктів і містить лише перевірені факти.",
        },
        {
          title: "Запустіть read-only перевірку",
          body: "Спочатку запустіть doctor.sh. Він перевіряє дистрибутив, Plasma, Wayland, пакунки, теми, шрифти, файли, ефекти та shortcuts без застосування змін.",
        },
        {
          title: "Створіть відновлюваний backup",
          body: "backup.sh копіює наявні шляхи до ~/.rice-backup/<timestamp>/ зі збереженням структури. Додавайте snapshot Plasma лише перед заміною панелей і перевірте каталог.",
        },
        {
          title: "Встановіть офіційні пакунки",
          body: "Режим --packages показує план і виконує pacman --needed лише для задокументованих пакетів. Він не запускає pacman -Syu і не оновлює всю систему.",
        },
        {
          title: "Перевірте AUR-компоненти",
          body: "Режим --aur потребує готового paru або yay. Перевірте PKGBUILD для Klassy, Reversal, Apple Cursor і Rounded Corners та зупиніться, якщо вони несумісні з Plasma.",
        },
        {
          title: "Встановіть зовнішні теми й віджети",
          body: "Встановіть Ant-Dark, Kara, KVitals і ClearClock за посиланнями Appearance та Plasma. Їх навмисно не включено; для точних шрифтів ClearClock потрібні ліцензійні копії або заміни.",
        },
        {
          title: "Встановіть безпечні configs",
          body: "Звичайний installer робить backup і копіює шпалери, ~/.config/ghostty/config та ~/.config/fastfetch/config.jsonc. KDE/KWin не змінюються; перезапустіть Ghostty.",
        },
        {
          title: "Застосуйте KDE і KWin, коли готові",
          body: "--apply-kde встановлює знеособлені kdeglobals, kcminputrc, kscreenlockerrc, klassyrc, kwinrc і plasmarc та об’єднує лише Alt+1…Alt+7. Plasma не перезапускається.",
        },
        {
          title: "Оберіть точний або ручний шлях панелей",
          body: "Snapshot призначений для 1920×1080 і 1366×768. Використовуйте --plasma-layout лише для близької топології; інакше створіть чотири floating panel вручну.",
        },
        {
          title: "Налаштуйте стільниці й shortcuts",
          body: "Перевірте сім віртуальних стільниць в один ряд. У Keyboard → Shortcuts → KWin призначте Alt+1…Alt+7 після усунення конфліктів.",
        },
        {
          title: "Перевірте Terminal і Fastfetch",
          body: "Перевірте Agave Nerd Font, перезапустіть Ghostty і запустіть Fastfetch із конфігом. Справжня команда читає поточну машину; сайт показує статичний Test Device.",
        },
        {
          title: "Застосуйте зміни сесії",
          body: "Збережіть роботу, вийдіть і знову виберіть Plasma (Wayland). Logout надійно перезавантажує fonts, cursor, plugins, shortcuts і Plasma; scripts цього не роблять.",
        },
        {
          title: "Перевірте результат",
          body: "Запустіть doctor.sh і перевірте обов’язкові рядки, теми, glyphs Ghostty, wallpaper, чотири panel, сім shortcuts, Klassy та стриманий blur.",
        },
        {
          title: "Діагностуйте по одному шару",
          body: "Скористайтеся Troubleshooting: для glyphs — fc-match, бінарних тем — ABI Plasma, panel — два Plasma-файли, blur — Rounded Corners і потім Blur.",
        },
        {
          title: "Відкотіться з timestamped backup",
          body: "Вийдіть із сесії перед відновленням Plasma або KWin. Перегляньте ~/.rice-backup/<timestamp>/ і поверніть лише пошкоджений відносний шлях.",
        },
      ],
    },
    troubleshooting: {
      eyebrow: "Налаштування й відновлення",
      title: "Спочатку діагностика, потім скидання",
      intro:
        "Doctor працює read-only. Backup зберігає відносні шляхи, тому один компонент можна повернути без скидання всієї Plasma.",
      doctor: "Запустити doctor rice",
      doctorBody: "Перевіряє ОС, Plasma, Wayland, пакунки, теми, файли, ефекти й сім shortcuts.",
      configured: "Встановлено / налаштовано",
      optional: "Немає необов’язкового компонента",
      rollback: "Відкат",
      rollbackBody:
        "Вийдіть із сесії перед відновленням Plasma/KWin. Перегляньте timestamped каталог і поверніть лише потрібний шлях.",
      items: [
        [
          "Немає glyphs",
          "Встановіть обидва Nerd Font, перезапустіть Ghostty і перевірте Agave Nerd Font через fc-match.",
        ],
        [
          "Теми немає у списку",
          "Бінарні Qt/KWin plugins мають відповідати ABI Plasma; встановіть сумісну upstream-версію.",
        ],
        [
          "Alt shortcuts не працюють",
          "Відкрийте System Settings → Keyboard → Shortcuts → KWin, усуньте конфлікти й призначте пряме перемикання.",
        ],
        [
          "Panel не на тому екрані",
          "Відновіть два файли Plasma з backup і створіть панелі вручну. Snapshot використовує screen indexes 0 та 1.",
        ],
        [
          "Артефакти blur",
          "Вимкніть Rounded Corners, потім Blur, щоб знайти несумісний ефект. Зафіксована сила blur — 8.",
        ],
        [
          "Немає wallpaper",
          "Виберіть ~/.local/share/wallpapers/desktop-dream/Mauve_girl.webp вручну; Plasma могла зберегти старий шлях.",
        ],
        [
          "Потрібен rollback",
          "Вийдіть із сесії й поверніть лише пошкоджений шлях із ~/.rice-backup/<timestamp>/.",
        ],
      ],
    },
    errors: {
      notFound: "Сторінку не знайдено",
      notFoundBody: "Запитаної сторінки не існує або її переміщено.",
      loadFailed: "Сторінка не завантажилася",
      loadFailedBody: "Сталася помилка. Спробуйте ще раз або поверніться на стільницю.",
      retry: "Спробувати ще",
      home: "На головну",
    },
  },

  de: {
    apps: apps("de"),
    desktop: {
      aria: "Interaktiver KDE-Rice-Dokumentationsdesktop",
      languages: "Seitensprache",
      languageHint: "Sprache {number}: {name}",
      decorativeMetrics: "Dekorative Rice-Vorschauwerte — keine Besucherhardware",
      wifi: "WLAN-Vorschau",
      volume: "Lautstärke-Vorschau",
      battery: "Akku-Vorschau",
      dock: "Rice-Anwendungen",
      minimize: "Minimieren",
      close: "Schließen",
    },
    common: {
      sources: "Quellen",
      download: "Herunterladen",
      downloadAll: "Alles herunterladen",
      openGithub: "Auf GitHub öffnen",
      copy: "Kopieren",
      copied: "Kopiert",
      copyFailed: "Kopieren fehlgeschlagen",
      readInstallation: "installation.md lesen",
    },
    files: {
      tree: "Rice-Dateibaum",
      downloadRaw: "Rohdatei herunterladen",
      repositoryCopy: "bereinigte Repository-Kopie",
      wallpaperAlt: "Mauve-Rice-Hintergrundbild",
    },
    appearance: {
      eyebrow: "Erscheinungsbild",
      title: "Dunkel, eckig, zurückhaltend",
      intro:
        "Diese Werte wurden vom Quellsystem gelesen. Drittprojekte bleiben upstream; das Repository enthält nur die Konfiguration des Besitzers und das Hintergrundbild.",
      thirdParty: "Drittanbieter-Komponenten",
      included: "Enthaltene Datei",
      wallpaperAlt: "Mauve_girl-Rice-Hintergrundbild",
      factNames: [
        "Plasma-Theme",
        "Farbschema",
        "Anwendungsstil",
        "Fensterdekoration",
        "Symbole",
        "Cursor",
        "UI-Schrift",
        "Festbreitenschrift",
        "Desktop-Uhr",
        "Hintergrundbild",
      ],
      factPurposes: [
        "Plasma-Panels und Widgets",
        "KDE-Farbpalette",
        "Qt-Steuerelemente und Oberflächen",
        "10-px-Radius und dezente Transparenz",
        "Farbiges rechteckiges Symbol-Theme",
        "Weiße Apple-Cursorvariante",
        "Menüs, Panels und Bedienelemente",
        "Ghostty und Festbreitentext",
        "Nicht weitergegeben; lizenzierte Kopien oder Ersatz verwenden",
        "Im Rice enthaltene Repository-Datei",
      ],
      kinds: [
        "Plasma-Theme",
        "Anwendungsstil",
        "Fensterdekoration",
        "Symbol-Theme",
        "Cursor-Theme",
        "KWin-Effekt",
      ],
    },
    plasma: {
      eyebrow: "Plasma-Shell",
      title: "Vier schwebende Panels, zwei Bildschirme",
      intro:
        "Das geprüfte Layout verwendet 1920×1080 primär und 1366×768 sekundär. Die Geometrie ist reproduzierbar, eine andere Monitortopologie muss jedoch manuell angepasst werden.",
      widgets: "Widgets",
      upstream: "Exakte Upstream-Quellen",
      safety: "--plasma-layout ist optional, sichert zuerst und startet plasmashell niemals neu.",
      panelTitles: ["Primär · oben", "Primär · unten", "Sekundär · oben", "Sekundär · unten"],
      widgetPurposes: [
        "Umschalter virtueller Arbeitsflächen",
        "Kompakte Panel-Metriken",
        "Desktop-Datum und -Uhrzeit",
      ],
      widgetNames: {
        "Expanding spacer": "Erweiterbarer Abstandhalter",
        Network: "Netzwerk",
        Volume: "Lautstärke",
        Battery: "Akku",
        "Digital Clock": "Digitaluhr",
        "Icons-only Task Manager": "Fensterleiste nur mit Symbolen",
        "Margin separator": "Abstandstrenner",
        "System Tray": "Systemabschnitt der Kontrollleiste",
        "Show Desktop": "Arbeitsfläche anzeigen",
      },
    },
    workspaces: {
      eyebrow: "KWin-Arbeitsflächen",
      title: "Sieben Arbeitsflächen in einer Reihe",
      intro:
        "Jedes Kürzel stammt aus der Quell-kglobalshortcutsrc. Der Installer führt nur diese Schlüssel zusammen, statt sämtliche globalen Tastenkürzel zu ersetzen.",
      desktop: "Arbeitsfläche",
      config: "Konfiguration",
      location: "Speicherort",
      siteHint:
        "Alt+1…Alt+7 sind die echten Rice-Kürzel. Auf dieser Website wählen dieselben Tasten die Sprachen 1…7 und verändern das Betriebssystem nicht.",
    },
    fastfetch: {
      terminalSurface: "Terminaloberfläche",
      font: "Schrift",
      background: "Hintergrund",
      blur: "Unschärfe",
      enabled: "Aktiviert",
      padding: "Innenabstand",
      palette: "Palette",
      paletteValue: "Mauve / Rosa / Schiefer",
      audited: "Geprüfte Konfiguration",
      description:
        "Verwendet das integrierte EndeavourOS-Zeichen in gedecktem Rosa, Mauve und Violett. Das interaktive Terminal zeigt ausdrücklich statische Demo-Daten und keine Besuchertelemetrie.",
      config: "Fastfetch-Konfiguration",
      ghosttyConfig: "Ghostty-Konfiguration",
      windowTheme: "Fenster-Theme",
    },
    packages: {
      eyebrow: "Nur Rice-Pakete",
      title: "Kleine, explizite Abhängigkeitsmenge",
      intro:
        "Dies ist keine Liste aller installierten Pakete, sondern nur der Software, die den beobachteten Desktop tatsächlich prägt.",
      groups: {
        "Official repositories": "Offizielle Repositories",
        AUR: "AUR",
        Optional: "Optional",
        Fonts: "Schriften",
        "Plasma widgets": "Plasma-Widgets",
      },
      purposes: purposes([
        "KDE-Plasma-Desktop",
        "Wayland-Compositor und Fenstermanager",
        "Rice-Terminal",
        "Systeminformationsansicht",
        "Qt-Anwendungsstil",
        "Fensterdekoration und Klassy-Vorgaben",
        "Reversal-Symbol-Theme",
        "macOS-White-Cursor",
        "ShapeCorners-KWin-Effekt",
        "Auf dem Quellsystem installiert, aber nicht aktiv",
        "KDE-Ersatzterminalprofil",
        "Plasma-UI-Schrift mit Glyphen",
        "Ghostty- und Festbreitenschrift",
        "Optionale exakte ClearClock-Typografie; Dateien werden nicht verteilt",
        "Umschalter virtueller Arbeitsflächen",
        "Kompakte Panel-Metriken",
        "Desktop-Datum und -Uhrzeit",
      ]),
      sourceLabel: "Quelle",
    },
    guide: {
      eyebrow: "Von sauberem KDE zu diesem Rice",
      title: "Vollständiger, vorsichtiger Installationsweg",
      intro:
        "Dieser Weg beginnt mit einer sauberen EndeavourOS-KDE-Installation und erklärt Änderungen, Speicherorte, Abmeldung, Prüfung und Wiederherstellung.",
      steps: [
        {
          title: "Unterstütztes Ziel bestätigen",
          body: "EndeavourOS oder Arch Linux mit KDE Plasma und Plasma (Wayland) verwenden. Das Quellsystem hatte Plasma/KWin 6.7.4; binäre KWin-Effekte müssen zur ABI der installierten Version passen.",
        },
        {
          title: "Normale Benutzersitzung vorbereiten",
          body: "Als normaler Benutzer mit Netzwerk und sudo anmelden; den Installer nicht als root starten. Bewusste Updates und einen nötigen Neustart vorher abschließen, da das Repository das System nie aktualisiert.",
        },
        {
          title: "Repository klonen",
          body: "Desktop Dream klonen und in das Verzeichnis wechseln. Website, Dokumentation, bereinigte Configs, Hintergrundbild und Scripts werden gemeinsam versioniert; es gibt kein verstecktes Backend.",
        },
        {
          title: "Nachweise und Scripts prüfen",
          body: "Vor der Ausführung rice/manifest.json, rice/docs/components.md und den Installer lesen. Das Manifest trennt Repository-Dateien von Drittprojekten und enthält nur geprüfte Beobachtungen.",
        },
        {
          title: "Read-only-Vorprüfung ausführen",
          body: "Zuerst doctor.sh starten. Es prüft Distribution, Plasma, Wayland, Pakete, Themes, Schriften, Dateien, Effekte und Kürzel, ohne Einstellungen anzuwenden.",
        },
        {
          title: "Wiederherstellbares Backup erstellen",
          body: "backup.sh kopiert vorhandene Pfade strukturerhaltend nach ~/.rice-backup/<timestamp>/. Den Plasma-Snapshot nur vor einem Panel-Ersatz einschließen und das Ergebnis prüfen.",
        },
        {
          title: "Offizielle Pakete installieren",
          body: "--packages zeigt den Plan und verwendet pacman --needed nur für dokumentierte Pakete. Es führt kein pacman -Syu aus und aktualisiert nicht das gesamte System.",
        },
        {
          title: "AUR-Komponenten prüfen",
          body: "--aur benötigt vorhandenes paru oder yay. PKGBUILDs für Klassy, Reversal, Apple Cursor und Rounded Corners prüfen und bei Plasma-Inkompatibilität stoppen.",
        },
        {
          title: "Externe Themes und Widgets installieren",
          body: "Ant-Dark, Kara, KVitals und ClearClock über die Links in Erscheinungsbild und Plasma installieren. Sie werden nicht vendort; für exakte ClearClock-Schriften sind lizenzierte Dateien oder Ersatz nötig.",
        },
        {
          title: "Sichere App-Configs installieren",
          body: "Der Standardlauf sichert und kopiert Hintergrundbild, ~/.config/ghostty/config und ~/.config/fastfetch/config.jsonc. KDE/KWin bleiben unverändert; anschließend nur Ghostty neu starten.",
        },
        {
          title: "KDE und KWin bewusst anwenden",
          body: "--apply-kde installiert bereinigte kdeglobals, kcminputrc, kscreenlockerrc, klassyrc, kwinrc und plasmarc und führt nur Alt+1…Alt+7 zusammen. Plasma wird nicht neu gestartet.",
        },
        {
          title: "Exakten oder manuellen Panelweg wählen",
          body: "Der Snapshot gilt für 1920×1080 plus 1366×768. --plasma-layout nur bei ähnlicher Topologie verwenden; andernfalls vier schwebende Panels manuell nach Reihenfolge und Maßen erstellen.",
        },
        {
          title: "Arbeitsflächen und Kürzel einrichten",
          body: "Sieben virtuelle Arbeitsflächen in einer Reihe prüfen. Unter Keyboard → Shortcuts → KWin Alt+1…Alt+7 nach dem Entfernen von Konflikten zuweisen.",
        },
        {
          title: "Terminal und Fastfetch prüfen",
          body: "Agave Nerd Font prüfen, Ghostty neu starten und Fastfetch mit der Konfiguration ausführen. Der echte Befehl liest den aktuellen Rechner; die Website zeigt ein statisches Test Device.",
        },
        {
          title: "Sitzungsänderungen aktivieren",
          body: "Arbeit speichern, abmelden und erneut Plasma (Wayland) wählen. Die Abmeldung lädt Schriften, Cursor, Plugins, Kürzel und Plasma zuverlässig neu; Scripts tun dies nicht selbst.",
        },
        {
          title: "Ergebnis verifizieren",
          body: "doctor.sh ausführen und Pflichtzeilen, Themes, Ghostty-Glyphen, Hintergrundbild, vier Panels, sieben Kürzel, Klassy und dezente Unschärfe prüfen.",
        },
        {
          title: "Schichtweise diagnostizieren",
          body: "Troubleshooting nutzen: fc-match für Glyphen, Plasma-ABI für binäre Themes, zwei Plasma-Dateien für Panels und zuerst Rounded Corners, dann Blur für Artefakte.",
        },
        {
          title: "Aus dem Zeitstempel-Backup zurückrollen",
          body: "Vor Plasma- oder KWin-Wiederherstellung abmelden. ~/.rice-backup/<timestamp>/ prüfen und nur den betroffenen relativen Pfad zurückkopieren.",
        },
      ],
    },
    troubleshooting: {
      eyebrow: "Einstellungen und Wiederherstellung",
      title: "Erst diagnostizieren, dann zurücksetzen",
      intro:
        "Der Doctor ist read-only. Backups bewahren relative Pfade, sodass eine Komponente ohne kompletten Plasma-Reset wiederhergestellt werden kann.",
      doctor: "Rice-Doctor ausführen",
      doctorBody:
        "Prüft Betriebssystem, Plasma, Wayland, Pakete, Themes, Dateien, Effekte und alle sieben Kürzel.",
      configured: "Installiert / konfiguriert",
      optional: "Optionale Komponente fehlt",
      rollback: "Rollback",
      rollbackBody:
        "Vor dem Wiederherstellen von Plasma/KWin abmelden. Zeitstempelordner prüfen und nur den betroffenen relativen Pfad kopieren.",
      items: [
        [
          "Glyphen fehlen",
          "Beide Nerd Fonts installieren, Ghostty neu starten und Agave Nerd Font mit fc-match prüfen.",
        ],
        [
          "Theme fehlt in der Liste",
          "Binäre Qt/KWin-Plugins müssen zur Plasma-ABI passen; eine kompatible Upstream-Version installieren.",
        ],
        [
          "Alt-Kürzel funktionieren nicht",
          "System Settings → Keyboard → Shortcuts → KWin öffnen, Konflikte entfernen und direkte Umschaltung zuweisen.",
        ],
        [
          "Panel ist auf dem falschen Bildschirm",
          "Die zwei Plasma-Dateien aus dem Backup wiederherstellen und Panels manuell bauen. Der Snapshot nutzt Screen-Indizes 0 und 1.",
        ],
        [
          "Unschärfeartefakte",
          "Rounded Corners und danach Blur deaktivieren, um den inkompatiblen Effekt zu finden. Die erfasste Stärke ist 8.",
        ],
        [
          "Hintergrundbild fehlt",
          "~/.local/share/wallpapers/desktop-dream/Mauve_girl.webp manuell wählen; Plasma kann einen alten Pfad behalten.",
        ],
        [
          "Rollback nötig",
          "Abmelden und nur den betroffenen Pfad aus ~/.rice-backup/<timestamp>/ zurückkopieren.",
        ],
      ],
    },
    errors: {
      notFound: "Seite nicht gefunden",
      notFoundBody: "Die gesuchte Seite existiert nicht oder wurde verschoben.",
      loadFailed: "Diese Seite wurde nicht geladen",
      loadFailedBody: "Ein Fehler ist aufgetreten. Erneut versuchen oder zum Desktop zurückkehren.",
      retry: "Erneut versuchen",
      home: "Zur Startseite",
    },
  },

  pl: {
    apps: apps("pl"),
    desktop: {
      aria: "Interaktywny pulpit dokumentacji KDE rice",
      languages: "Język witryny",
      languageHint: "Język {number}: {name}",
      decorativeMetrics: "Dekoracyjne metryki rice — nie sprzęt odwiedzającego",
      wifi: "Podgląd Wi-Fi",
      volume: "Podgląd głośności",
      battery: "Podgląd baterii",
      dock: "Aplikacje rice",
      minimize: "Minimalizuj",
      close: "Zamknij",
    },
    common: {
      sources: "Źródła",
      download: "Pobierz",
      downloadAll: "Pobierz wszystko",
      openGithub: "Otwórz na GitHub",
      copy: "Kopiuj",
      copied: "Skopiowano",
      copyFailed: "Kopiowanie nie powiodło się",
      readInstallation: "Czytaj installation.md",
    },
    files: {
      tree: "Drzewo plików rice",
      downloadRaw: "Pobierz surowy plik",
      repositoryCopy: "oczyszczona kopia z repository",
      wallpaperAlt: "Tapeta Mauve rice",
    },
    appearance: {
      eyebrow: "Stos wyglądu",
      title: "Ciemny, kanciasty, powściągliwy",
      intro:
        "Te wartości odczytano z systemu źródłowego. Projekty zewnętrzne pozostają upstream; repository zawiera tylko konfigurację właściciela i tapetę.",
      thirdParty: "Komponenty zewnętrzne",
      included: "Dołączony zasób",
      wallpaperAlt: "Tapeta rice Mauve_girl",
      factNames: [
        "Motyw Plasma",
        "Schemat kolorów",
        "Styl aplikacji",
        "Dekoracja okien",
        "Ikony",
        "Kursor",
        "Czcionka UI",
        "Czcionka monospace",
        "Zegar pulpitu",
        "Tapeta",
      ],
      factPurposes: [
        "Panele i widżety Plasma",
        "Paleta kolorów KDE",
        "Kontrolki i powierzchnie Qt",
        "Promień 10 px i umiarkowana przezroczystość",
        "Kolorowy prostokątny motyw ikon",
        "Biała odmiana kursora Apple",
        "Menu, panele i elementy sterujące",
        "Ghostty i tekst stałej szerokości",
        "Nie są rozpowszechniane; użyj licencjonowanych kopii lub zamienników",
        "Zasób repository dołączony do rice",
      ],
      kinds: [
        "Motyw Plasma",
        "Styl aplikacji",
        "Dekoracja okien",
        "Motyw ikon",
        "Motyw kursora",
        "Efekt KWin",
      ],
    },
    plasma: {
      eyebrow: "Powłoka Plasma",
      title: "Cztery pływające panele, dwa ekrany",
      intro:
        "Sprawdzony układ używa głównego ekranu 1920×1080 i dodatkowego 1366×768. Geometrię można odtworzyć, lecz inną topologię monitorów trzeba poprawić ręcznie.",
      widgets: "Widżety",
      upstream: "Dokładne źródła upstream",
      safety:
        "--plasma-layout jest opcjonalne, najpierw tworzy backup i nigdy nie restartuje plasmashell.",
      panelTitles: ["Główny · góra", "Główny · dół", "Dodatkowy · góra", "Dodatkowy · dół"],
      widgetPurposes: [
        "Przełącznik wirtualnych pulpitów",
        "Kompaktowe metryki panelu",
        "Data i czas na pulpicie",
      ],
      widgetNames: {
        "Expanding spacer": "Rozszerzalny odstęp",
        Network: "Sieć",
        Volume: "Głośność",
        Battery: "Bateria",
        "Digital Clock": "Zegar cyfrowy",
        "Icons-only Task Manager": "Menedżer zadań tylko z ikonami",
        "Margin separator": "Separator z marginesem",
        "System Tray": "Zasobnik systemowy",
        "Show Desktop": "Pokaż pulpit",
      },
    },
    workspaces: {
      eyebrow: "Pulpity KWin",
      title: "Siedem pulpitów w jednym rzędzie",
      intro:
        "Każdy skrót pochodzi ze źródłowego kglobalshortcutsrc. Installer scala tylko te klucze, zamiast zastępować wszystkie globalne skróty.",
      desktop: "Pulpit",
      config: "Konfiguracja",
      location: "Gdzie się znajduje",
      siteHint:
        "Alt+1…Alt+7 to prawdziwe skróty rice. W tej witrynie te same klawisze wybierają języki 1…7 i nie zmieniają systemu operacyjnego.",
    },
    fastfetch: {
      terminalSurface: "Powierzchnia terminala",
      font: "Czcionka",
      background: "Tło",
      blur: "Rozmycie",
      enabled: "Włączone",
      padding: "Odstępy",
      palette: "Paleta",
      paletteValue: "Mauve / róż / łupek",
      audited: "Sprawdzona konfiguracja",
      description:
        "Używa wbudowanego znaku EndeavourOS w przygaszonym różu, mauve i fiolecie. Interaktywny Terminal pokazuje wyraźnie oznaczone statyczne dane demo, a nie telemetrię odwiedzającego.",
      config: "Konfiguracja Fastfetch",
      ghosttyConfig: "Konfiguracja Ghostty",
      windowTheme: "Motyw okien",
    },
    packages: {
      eyebrow: "Tylko pakiety rice",
      title: "Mały, jawny zestaw zależności",
      intro:
        "To nie jest lista wszystkich zainstalowanych pakietów, lecz tylko oprogramowania istotnie tworzącego obserwowany pulpit.",
      groups: {
        "Official repositories": "Oficjalne repozytoria",
        AUR: "AUR",
        Optional: "Opcjonalne",
        Fonts: "Czcionki",
        "Plasma widgets": "Widżety Plasma",
      },
      purposes: purposes([
        "Pulpit KDE Plasma",
        "Kompozytor Wayland i menedżer okien",
        "Terminal rice",
        "Widok informacji o systemie",
        "Styl aplikacji Qt",
        "Dekoracje okien i ustawienia Klassy",
        "Motyw ikon Reversal",
        "Kursor macOS-White",
        "Efekt KWin ShapeCorners",
        "Zainstalowany w systemie źródłowym, ale nieaktywny",
        "Awaryjny profil terminala KDE",
        "Czcionka UI Plasma z glifami",
        "Czcionka Ghostty i monospace",
        "Opcjonalna dokładna typografia ClearClock; pliki nie są rozpowszechniane",
        "Przełącznik wirtualnych pulpitów",
        "Kompaktowe metryki panelu",
        "Data i czas na pulpicie",
      ]),
      sourceLabel: "źródło",
    },
    guide: {
      eyebrow: "Od czystego KDE do tego rice",
      title: "Pełna, ostrożna ścieżka instalacji",
      intro:
        "Ścieżka zaczyna się od czystego EndeavourOS KDE i wyjaśnia zmiany, położenie plików, wylogowanie, weryfikację i powrót do backup.",
      steps: [
        {
          title: "Potwierdź wspierany system",
          body: "Użyj EndeavourOS lub Arch Linux z KDE Plasma oraz sesji Plasma (Wayland). System źródłowy miał Plasma/KWin 6.7.4; binarne efekty KWin muszą pasować do ABI zainstalowanej wersji.",
        },
        {
          title: "Przygotuj zwykłą sesję użytkownika",
          body: "Zaloguj się jako zwykły użytkownik z siecią i sudo; nie uruchamiaj installer jako root. Świadomą aktualizację i restart po zmianie kernel lub Plasma wykonaj wcześniej.",
        },
        {
          title: "Sklonuj repository",
          body: "Sklonuj Desktop Dream i przejdź do katalogu. Witryna, dokumentacja, oczyszczone configs, tapeta i scripts są wersjonowane razem; nie ma ukrytego backend.",
        },
        {
          title: "Sprawdź dowody i scripts",
          body: "Przed uruchomieniem przeczytaj rice/manifest.json, rice/docs/components.md i installer. Manifest oddziela pliki repository od projektów zewnętrznych i zawiera wyłącznie sprawdzone fakty.",
        },
        {
          title: "Uruchom kontrolę read-only",
          body: "Najpierw uruchom doctor.sh. Sprawdza dystrybucję, Plasma, Wayland, pakiety, motywy, czcionki, pliki, efekty i skróty bez stosowania ustawień.",
        },
        {
          title: "Utwórz przywracalny backup",
          body: "backup.sh kopiuje istniejące ścieżki do ~/.rice-backup/<timestamp>/ z zachowaniem struktury. Snapshot Plasma dodaj tylko przed wymianą paneli i sprawdź wynik.",
        },
        {
          title: "Zainstaluj oficjalne pakiety",
          body: "--packages pokazuje plan i używa pacman --needed tylko dla udokumentowanych pakietów. Nie wykonuje pacman -Syu ani pełnej aktualizacji systemu.",
        },
        {
          title: "Sprawdź komponenty AUR",
          body: "--aur wymaga istniejącego paru lub yay. Przejrzyj PKGBUILD Klassy, Reversal, Apple Cursor i Rounded Corners; zatrzymaj się przy niezgodności z Plasma.",
        },
        {
          title: "Zainstaluj zewnętrzne motywy i widżety",
          body: "Zainstaluj Ant-Dark, Kara, KVitals i ClearClock z linków w Appearance i Plasma. Nie są dołączone; dokładne czcionki ClearClock wymagają licencjonowanych plików lub zamienników.",
        },
        {
          title: "Zainstaluj bezpieczne configs",
          body: "Domyślny installer tworzy backup i kopiuje tapetę, ~/.config/ghostty/config oraz ~/.config/fastfetch/config.jsonc. KDE/KWin pozostają bez zmian; zrestartuj Ghostty.",
        },
        {
          title: "Świadomie zastosuj KDE i KWin",
          body: "--apply-kde instaluje oczyszczone kdeglobals, kcminputrc, kscreenlockerrc, klassyrc, kwinrc i plasmarc oraz scala tylko Alt+1…Alt+7. Plasma nie jest restartowana.",
        },
        {
          title: "Wybierz dokładny lub ręczny układ paneli",
          body: "Snapshot dotyczy 1920×1080 i 1366×768. --plasma-layout używaj tylko przy podobnej topologii; inaczej zbuduj ręcznie cztery pływające panele.",
        },
        {
          title: "Skonfiguruj pulpity i skróty",
          body: "Sprawdź siedem wirtualnych pulpitów w jednym rzędzie. W Keyboard → Shortcuts → KWin przypisz Alt+1…Alt+7 po usunięciu konfliktów.",
        },
        {
          title: "Sprawdź Terminal i Fastfetch",
          body: "Sprawdź Agave Nerd Font, uruchom ponownie Ghostty i Fastfetch z konfiguracją. Prawdziwe polecenie czyta bieżącą maszynę; witryna pokazuje statyczne Test Device.",
        },
        {
          title: "Zastosuj zmiany sesji",
          body: "Zapisz pracę, wyloguj się i ponownie wybierz Plasma (Wayland). Wylogowanie przeładowuje fonts, cursor, plugins, shortcuts i Plasma; scripts tego nie robią.",
        },
        {
          title: "Zweryfikuj wynik",
          body: "Uruchom doctor.sh i sprawdź wymagane pozycje, motywy, glyphs Ghostty, tapetę, cztery panele, siedem skrótów, Klassy i umiarkowane rozmycie.",
        },
        {
          title: "Diagnozuj warstwami",
          body: "Użyj Troubleshooting: fc-match dla glyphs, ABI Plasma dla binarnych motywów, dwóch plików Plasma dla paneli oraz kolejno Rounded Corners i Blur dla artefaktów.",
        },
        {
          title: "Wycofaj z timestamped backup",
          body: "Wyloguj się przed przywracaniem Plasma lub KWin. Sprawdź ~/.rice-backup/<timestamp>/ i skopiuj z powrotem tylko uszkodzoną ścieżkę względną.",
        },
      ],
    },
    troubleshooting: {
      eyebrow: "Ustawienia i odzyskiwanie",
      title: "Diagnozuj przed resetem",
      intro:
        "Doctor działa read-only. Backup zachowuje ścieżki względne, więc można przywrócić jeden komponent bez kasowania całej Plasma.",
      doctor: "Uruchom doctor rice",
      doctorBody:
        "Sprawdza system, Plasma, Wayland, pakiety, motywy, pliki, efekty i siedem skrótów.",
      configured: "Zainstalowane / skonfigurowane",
      optional: "Brak opcjonalnego komponentu",
      rollback: "Rollback",
      rollbackBody:
        "Wyloguj się przed przywróceniem plików Plasma/KWin. Sprawdź katalog z datą i kopiuj tylko dotkniętą ścieżkę.",
      items: [
        [
          "Brak glyphs",
          "Zainstaluj oba Nerd Font, uruchom ponownie Ghostty i sprawdź Agave Nerd Font przez fc-match.",
        ],
        [
          "Motywu nie ma na liście",
          "Binarne plugins Qt/KWin muszą pasować do ABI Plasma; zainstaluj zgodną wersję upstream.",
        ],
        [
          "Skróty Alt nie działają",
          "Otwórz System Settings → Keyboard → Shortcuts → KWin, usuń konflikty i przypisz bezpośrednie przełączanie.",
        ],
        [
          "Panel jest na złym ekranie",
          "Przywróć dwa pliki Plasma z backup i zbuduj panele ręcznie. Snapshot używa indeksów 0 i 1.",
        ],
        [
          "Artefakty rozmycia",
          "Wyłącz Rounded Corners, potem Blur, aby znaleźć niezgodny efekt. Zarejestrowana siła to 8.",
        ],
        [
          "Brak tapety",
          "Wybierz ręcznie ~/.local/share/wallpapers/desktop-dream/Mauve_girl.webp; Plasma mogła zachować starą ścieżkę.",
        ],
        [
          "Potrzebny rollback",
          "Wyloguj się i przywróć tylko uszkodzoną ścieżkę z ~/.rice-backup/<timestamp>/.",
        ],
      ],
    },
    errors: {
      notFound: "Nie znaleziono strony",
      notFoundBody: "Szukana strona nie istnieje albo została przeniesiona.",
      loadFailed: "Nie udało się wczytać strony",
      loadFailedBody: "Wystąpił błąd. Spróbuj ponownie lub wróć do pulpitu.",
      retry: "Spróbuj ponownie",
      home: "Strona główna",
    },
  },

  cs: {
    apps: apps("cs"),
    desktop: {
      aria: "Interaktivní plocha s dokumentací KDE rice",
      languages: "Jazyk webu",
      languageHint: "Jazyk {number}: {name}",
      decorativeMetrics: "Dekorativní metriky rice — nikoli hardware návštěvníka",
      wifi: "Náhled Wi-Fi",
      volume: "Náhled hlasitosti",
      battery: "Náhled baterie",
      dock: "Aplikace rice",
      minimize: "Minimalizovat",
      close: "Zavřít",
    },
    common: {
      sources: "Zdroje",
      download: "Stáhnout",
      downloadAll: "Stáhnout vše",
      openGithub: "Otevřít na GitHub",
      copy: "Kopírovat",
      copied: "Zkopírováno",
      copyFailed: "Kopírování selhalo",
      readInstallation: "Číst installation.md",
    },
    files: {
      tree: "Strom souborů rice",
      downloadRaw: "Stáhnout zdrojový soubor",
      repositoryCopy: "anonymizovaná kopie z repository",
      wallpaperAlt: "Tapeta Mauve rice",
    },
    appearance: {
      eyebrow: "Vzhled",
      title: "Tmavý, hranatý, střídmý",
      intro:
        "Tyto hodnoty byly přečteny ze zdrojového systému. Projekty třetích stran zůstávají upstream; repository obsahuje pouze konfiguraci vlastníka a tapetu.",
      thirdParty: "Komponenty třetích stran",
      included: "Přiložený soubor",
      wallpaperAlt: "Tapeta rice Mauve_girl",
      factNames: [
        "Motiv Plasma",
        "Barevné schéma",
        "Styl aplikací",
        "Dekorace oken",
        "Ikony",
        "Kurzor",
        "Písmo UI",
        "Neproporcionální písmo",
        "Hodiny plochy",
        "Tapeta",
      ],
      factPurposes: [
        "Panely a widgety Plasma",
        "Barevná paleta KDE",
        "Ovládací prvky a povrchy Qt",
        "Poloměr 10 px a střídmá průhlednost",
        "Barevný obdélníkový motiv ikon",
        "Bílá varianta kurzoru Apple",
        "Nabídky, panely a ovládání",
        "Ghostty a text s pevnou šířkou",
        "Nešíří se; použijte licencované kopie nebo náhrady",
        "Soubor repository přiložený k rice",
      ],
      kinds: [
        "Motiv Plasma",
        "Styl aplikací",
        "Dekorace oken",
        "Motiv ikon",
        "Motiv kurzoru",
        "Efekt KWin",
      ],
    },
    plasma: {
      eyebrow: "Prostředí Plasma",
      title: "Čtyři plovoucí panely, dvě obrazovky",
      intro:
        "Ověřené rozložení používá primární obrazovku 1920×1080 a sekundární 1366×768. Geometrii lze reprodukovat, ale jinou topologii monitorů upravte ručně.",
      widgets: "Widgety",
      upstream: "Přesné upstream zdroje",
      safety: "--plasma-layout je volitelný, nejdříve zálohuje a nikdy nerestartuje plasmashell.",
      panelTitles: [
        "Primární · nahoře",
        "Primární · dole",
        "Sekundární · nahoře",
        "Sekundární · dole",
      ],
      widgetPurposes: [
        "Přepínač virtuálních ploch",
        "Kompaktní metriky panelu",
        "Datum a čas na ploše",
      ],
      widgetNames: {
        "Expanding spacer": "Roztažitelná mezera",
        Network: "Síť",
        Volume: "Hlasitost",
        Battery: "Baterie",
        "Digital Clock": "Digitální hodiny",
        "Icons-only Task Manager": "Správce úloh pouze s ikonami",
        "Margin separator": "Oddělovač s okrajem",
        "System Tray": "Systémová lišta",
        "Show Desktop": "Zobrazit plochu",
      },
    },
    workspaces: {
      eyebrow: "Plochy KWin",
      title: "Sedm ploch v jedné řadě",
      intro:
        "Každá zkratka pochází ze zdrojového kglobalshortcutsrc. Installer slučuje pouze tyto klíče a nenahrazuje všechny globální zkratky.",
      desktop: "Plocha",
      config: "Konfigurace",
      location: "Kde je uložena",
      siteHint:
        "Alt+1…Alt+7 jsou skutečné zkratky rice. Na webu stejné klávesy volí jazyky 1…7 a nemění operační systém.",
    },
    fastfetch: {
      terminalSurface: "Povrch terminálu",
      font: "Písmo",
      background: "Pozadí",
      blur: "Rozmazání",
      enabled: "Zapnuto",
      padding: "Odsazení",
      palette: "Paleta",
      paletteValue: "Mauve / růžová / břidlicová",
      audited: "Ověřená konfigurace",
      description:
        "Používá vestavěný znak EndeavourOS v tlumené růžové, mauve a fialové. Interaktivní Terminal zobrazuje jasně označená statická demo data, nikoli telemetrii návštěvníka.",
      config: "Konfigurace Fastfetch",
      ghosttyConfig: "Konfigurace Ghostty",
      windowTheme: "Motiv oken",
    },
    packages: {
      eyebrow: "Pouze balíčky rice",
      title: "Malá, explicitní sada závislostí",
      intro:
        "Nejde o výpis všech nainstalovaných balíčků, ale jen softwaru, který skutečně tvoří pozorovanou plochu.",
      groups: {
        "Official repositories": "Oficiální repozitáře",
        AUR: "AUR",
        Optional: "Volitelné",
        Fonts: "Písma",
        "Plasma widgets": "Widgety Plasma",
      },
      purposes: purposes([
        "Plocha KDE Plasma",
        "Wayland kompozitor a správce oken",
        "Terminál rice",
        "Zobrazení informací o systému",
        "Styl aplikací Qt",
        "Dekorace oken a výchozí Klassy",
        "Motiv ikon Reversal",
        "Kurzor macOS-White",
        "Efekt KWin ShapeCorners",
        "Nainstalováno ve zdrojovém systému, ale není aktivní",
        "Záložní profil terminálu KDE",
        "Písmo UI Plasma s glyfy",
        "Písmo Ghostty a textu s pevnou šířkou",
        "Volitelná přesná typografie ClearClock; soubory se nešíří",
        "Přepínač virtuálních ploch",
        "Kompaktní metriky panelu",
        "Datum a čas na ploše",
      ]),
      sourceLabel: "zdroj",
    },
    guide: {
      eyebrow: "Od čistého KDE k tomuto rice",
      title: "Úplný a opatrný postup instalace",
      intro:
        "Postup začíná čistým EndeavourOS KDE a vysvětluje změny, umístění souborů, odhlášení, ověření i návrat ze zálohy.",
      steps: [
        {
          title: "Potvrďte podporovaný cíl",
          body: "Použijte EndeavourOS nebo Arch Linux s KDE Plasma a Plasma (Wayland). Zdroj měl Plasma/KWin 6.7.4; binární efekty KWin musí odpovídat ABI instalované verze.",
        },
        {
          title: "Připravte běžnou relaci",
          body: "Přihlaste se jako běžný uživatel se sítí a sudo; installer nespouštějte jako root. Vědomou aktualizaci a restart po změně kernel nebo Plasma dokončete předem.",
        },
        {
          title: "Naklonujte repository",
          body: "Naklonujte Desktop Dream a vstupte do adresáře. Web, dokumentace, anonymizované configs, tapeta a scripts se verzují společně; skrytý backend neexistuje.",
        },
        {
          title: "Prohlédněte důkazy a scripts",
          body: "Před spuštěním přečtěte rice/manifest.json, rice/docs/components.md a installer. Manifest odděluje soubory repository od projektů třetích stran a uvádí jen ověřená fakta.",
        },
        {
          title: "Spusťte read-only kontrolu",
          body: "Nejprve spusťte doctor.sh. Ověří distribuci, Plasma, Wayland, balíčky, motivy, písma, soubory, efekty a zkratky bez použití změn.",
        },
        {
          title: "Vytvořte obnovitelnou zálohu",
          body: "backup.sh kopíruje existující cesty do ~/.rice-backup/<timestamp>/ se zachováním struktury. Snapshot Plasma přidejte jen před výměnou panelů a výsledek zkontrolujte.",
        },
        {
          title: "Nainstalujte oficiální balíčky",
          body: "--packages ukáže plán a použije pacman --needed jen pro dokumentované balíčky. Nespouští pacman -Syu ani celkovou aktualizaci systému.",
        },
        {
          title: "Prověřte komponenty AUR",
          body: "--aur vyžaduje existující paru nebo yay. Zkontrolujte PKGBUILD Klassy, Reversal, Apple Cursor a Rounded Corners; při nekompatibilitě s Plasma zastavte.",
        },
        {
          title: "Nainstalujte externí motivy a widgety",
          body: "Ant-Dark, Kara, KVitals a ClearClock instalujte z odkazů Appearance a Plasma. Nejsou vendorizovány; přesná písma ClearClock vyžadují licencované soubory nebo náhrady.",
        },
        {
          title: "Nainstalujte bezpečné configs",
          body: "Výchozí installer zálohuje a kopíruje tapetu, ~/.config/ghostty/config a ~/.config/fastfetch/config.jsonc. KDE/KWin nemění; poté restartujte jen Ghostty.",
        },
        {
          title: "Vědomě použijte KDE a KWin",
          body: "--apply-kde nainstaluje anonymizované kdeglobals, kcminputrc, kscreenlockerrc, klassyrc, kwinrc a plasmarc a sloučí pouze Alt+1…Alt+7. Plasma se nerestartuje.",
        },
        {
          title: "Zvolte přesnou nebo ruční cestu panelů",
          body: "Snapshot platí pro 1920×1080 a 1366×768. --plasma-layout používejte jen s podobnou topologií; jinak ručně vytvořte čtyři plovoucí panely.",
        },
        {
          title: "Nastavte plochy a zkratky",
          body: "Ověřte sedm virtuálních ploch v jedné řadě. V Keyboard → Shortcuts → KWin přiřaďte Alt+1…Alt+7 po odstranění konfliktů.",
        },
        {
          title: "Ověřte Terminal a Fastfetch",
          body: "Ověřte Agave Nerd Font, restartujte Ghostty a spusťte Fastfetch s konfigurací. Skutečný příkaz čte aktuální počítač; web ukazuje statické Test Device.",
        },
        {
          title: "Aktivujte změny relace",
          body: "Uložte práci, odhlaste se a znovu zvolte Plasma (Wayland). Odhlášení spolehlivě načte fonts, cursor, plugins, shortcuts a Plasma; scripts to nedělají.",
        },
        {
          title: "Ověřte výsledek",
          body: "Spusťte doctor.sh a zkontrolujte povinné řádky, motivy, glyphs Ghostty, tapetu, čtyři panely, sedm zkratek, Klassy a střídmý blur.",
        },
        {
          title: "Diagnostikujte po vrstvách",
          body: "Použijte Troubleshooting: fc-match pro glyphs, ABI Plasma pro binární motivy, dva Plasma soubory pro panely a postupně Rounded Corners a Blur pro artefakty.",
        },
        {
          title: "Vraťte se z timestamped backup",
          body: "Před obnovením Plasma nebo KWin se odhlaste. Prohlédněte ~/.rice-backup/<timestamp>/ a vraťte pouze poškozenou relativní cestu.",
        },
      ],
    },
    troubleshooting: {
      eyebrow: "Nastavení a obnova",
      title: "Nejprve diagnostikujte, potom resetujte",
      intro:
        "Doctor je read-only. Zálohy zachovávají relativní cesty, takže lze obnovit jednu součást bez smazání celé Plasma.",
      doctor: "Spustit doctor rice",
      doctorBody:
        "Kontroluje systém, Plasma, Wayland, balíčky, motivy, soubory, efekty a sedm zkratek.",
      configured: "Nainstalováno / nastaveno",
      optional: "Chybí volitelná součást",
      rollback: "Návrat",
      rollbackBody:
        "Před obnovením Plasma/KWin se odhlaste. Prohlédněte adresář s časem a kopírujte jen dotčenou cestu.",
      items: [
        [
          "Chybí glyphs",
          "Nainstalujte oba Nerd Font, restartujte Ghostty a ověřte Agave Nerd Font pomocí fc-match.",
        ],
        [
          "Motiv není v seznamu",
          "Binární Qt/KWin plugins musí odpovídat ABI Plasma; nainstalujte kompatibilní upstream verzi.",
        ],
        [
          "Alt zkratky nefungují",
          "Otevřete System Settings → Keyboard → Shortcuts → KWin, odstraňte konflikty a přiřaďte přímé přepínání.",
        ],
        [
          "Panel je na špatné obrazovce",
          "Obnovte dva soubory Plasma ze zálohy a panely vytvořte ručně. Snapshot používá indexy 0 a 1.",
        ],
        [
          "Artefakty rozmazání",
          "Vypněte Rounded Corners a potom Blur, abyste našli nekompatibilní efekt. Zachycená síla je 8.",
        ],
        [
          "Chybí tapeta",
          "Ručně vyberte ~/.local/share/wallpapers/desktop-dream/Mauve_girl.webp; Plasma mohla zachovat starou cestu.",
        ],
        [
          "Je nutný rollback",
          "Odhlaste se a obnovte jen poškozenou cestu z ~/.rice-backup/<timestamp>/.",
        ],
      ],
    },
    errors: {
      notFound: "Stránka nenalezena",
      notFoundBody: "Hledaná stránka neexistuje nebo byla přesunuta.",
      loadFailed: "Stránku se nepodařilo načíst",
      loadFailedBody: "Došlo k chybě. Zkuste to znovu nebo se vraťte na plochu.",
      retry: "Zkusit znovu",
      home: "Domů",
    },
  },

  hu: {
    apps: apps("hu"),
    desktop: {
      aria: "Interaktív KDE rice dokumentációs asztal",
      languages: "A webhely nyelve",
      languageHint: "{number}. nyelv: {name}",
      decorativeMetrics: "Dekoratív rice-mérőszámok — nem a látogató hardvere",
      wifi: "Wi-Fi előnézet",
      volume: "Hangerő előnézet",
      battery: "Akkumulátor előnézet",
      dock: "Rice alkalmazások",
      minimize: "Kis méret",
      close: "Bezárás",
    },
    common: {
      sources: "Források",
      download: "Letöltés",
      downloadAll: "Összes letöltése",
      openGithub: "Megnyitás GitHubon",
      copy: "Másolás",
      copied: "Másolva",
      copyFailed: "A másolás sikertelen",
      readInstallation: "installation.md megnyitása",
    },
    files: {
      tree: "Rice fájlfa",
      downloadRaw: "Nyers fájl letöltése",
      repositoryCopy: "anonimizált repository-másolat",
      wallpaperAlt: "Mauve rice háttérkép",
    },
    appearance: {
      eyebrow: "Megjelenési rétegek",
      title: "Sötét, szögletes, visszafogott",
      intro:
        "Ezeket az értékeket a forrásrendszerből olvastuk ki. A külső projektek upstream maradnak; a repository csak a tulajdonos konfigurációját és a háttérképet tartalmazza.",
      thirdParty: "Külső összetevők",
      included: "Mellékelt erőforrás",
      wallpaperAlt: "Mauve_girl rice háttérkép",
      factNames: [
        "Plasma téma",
        "Színséma",
        "Alkalmazásstílus",
        "Ablakdekoráció",
        "Ikonok",
        "Kurzor",
        "UI betűtípus",
        "Monospace betűtípus",
        "Asztali óra",
        "Háttérkép",
      ],
      factPurposes: [
        "Plasma panelek és widgetek",
        "KDE színpaletta",
        "Qt vezérlők és felületek",
        "10 px sugár és mérsékelt áttetszőség",
        "Színes, téglalap alakú ikontéma",
        "Fehér Apple-kurzorváltozat",
        "Menük, panelek és vezérlők",
        "Ghostty és rögzített szélességű szöveg",
        "Nincs terjesztve; licencelt példány vagy helyettesítő kell",
        "A rice részeként mellékelt repository-erőforrás",
      ],
      kinds: [
        "Plasma téma",
        "Alkalmazásstílus",
        "Ablakdekoráció",
        "Ikontéma",
        "Kurzortéma",
        "KWin-effektus",
      ],
    },
    plasma: {
      eyebrow: "Plasma felület",
      title: "Négy lebegő panel, két képernyő",
      intro:
        "Az ellenőrzött elrendezés 1920×1080 elsődleges és 1366×768 másodlagos kijelzőt használ. A geometria reprodukálható, de eltérő monitortopológiát kézzel kell igazítani.",
      widgets: "Widgetek",
      upstream: "Pontos upstream források",
      safety:
        "A --plasma-layout külön kapcsolható, előbb backup készül, és soha nem indítja újra a plasmashellt.",
      panelTitles: [
        "Elsődleges · felső",
        "Elsődleges · alsó",
        "Másodlagos · felső",
        "Másodlagos · alsó",
      ],
      widgetPurposes: ["Virtuális asztalváltó", "Kompakt panelmérők", "Asztali dátum és idő"],
      widgetNames: {
        "Expanding spacer": "Rugalmas térköz",
        Network: "Hálózat",
        Volume: "Hangerő",
        Battery: "Akkumulátor",
        "Digital Clock": "Digitális óra",
        "Icons-only Task Manager": "Csak ikonos feladatkezelő",
        "Margin separator": "Margóelválasztó",
        "System Tray": "Rendszertálca",
        "Show Desktop": "Asztal megjelenítése",
      },
    },
    workspaces: {
      eyebrow: "KWin munkaterületek",
      title: "Hét asztal egy sorban",
      intro:
        "Minden gyorsbillentyű a forrás kglobalshortcutsrc fájlból származik. Az installer csak ezeket a kulcsokat egyesíti, nem cseréli le az összes globális shortcutot.",
      desktop: "Asztal",
      config: "Konfiguráció",
      location: "Tárolási hely",
      siteHint:
        "Az Alt+1…Alt+7 a rice valódi gyorsbillentyűi. A webhelyen ugyanezek az 1…7 nyelvet választják, és nem módosítják az operációs rendszert.",
    },
    fastfetch: {
      terminalSurface: "Terminálfelület",
      font: "Betűtípus",
      background: "Háttér",
      blur: "Elmosás",
      enabled: "Bekapcsolva",
      padding: "Térköz",
      palette: "Paletta",
      paletteValue: "Mauve / rózsa / pala",
      audited: "Ellenőrzött konfiguráció",
      description:
        "A beépített EndeavourOS-jelet tompa rózsa, mauve és ibolya színekkel használja. Az interaktív Terminal egyértelműen statikus demo-adatokat mutat, nem látogatói telemetriát.",
      config: "Fastfetch konfiguráció",
      ghosttyConfig: "Ghostty konfiguráció",
      windowTheme: "Ablaktéma",
    },
    packages: {
      eyebrow: "Csak rice csomagok",
      title: "Kis, egyértelmű függőségkészlet",
      intro:
        "Ez nem minden telepített csomag listája, csak az a szoftver, amely ténylegesen meghatározza a megfigyelt asztalt.",
      groups: {
        "Official repositories": "Hivatalos tárolók",
        AUR: "AUR",
        Optional: "Opcionális",
        Fonts: "Betűtípusok",
        "Plasma widgets": "Plasma widgetek",
      },
      purposes: purposes([
        "KDE Plasma asztal",
        "Wayland kompozitor és ablakkezelő",
        "Rice terminál",
        "Rendszerinformációs nézet",
        "Qt alkalmazásstílus",
        "Ablakdekorációk és Klassy alapértékek",
        "Reversal ikontéma",
        "macOS-White kurzor",
        "ShapeCorners KWin-effektus",
        "Telepítve a forrásrendszeren, de nem aktív",
        "Tartalék KDE terminálprofil",
        "Plasma UI betűtípus karakterjelekkel",
        "Ghostty és rögzített szélességű betűtípus",
        "Opcionális pontos ClearClock tipográfia; a fájlok nincsenek terjesztve",
        "Virtuális asztalváltó",
        "Kompakt panelmérők",
        "Asztali dátum és idő",
      ]),
      sourceLabel: "forrás",
    },
    guide: {
      eyebrow: "A tiszta KDE-től eddig a rice-ig",
      title: "Teljes, óvatos telepítési út",
      intro:
        "Az út tiszta EndeavourOS KDE-ről indul, és leírja a változásokat, fájlhelyeket, kijelentkezést, ellenőrzést és backup-visszaállítást.",
      steps: [
        {
          title: "Ellenőrizd a támogatott célt",
          body: "EndeavourOS vagy Arch Linux, KDE Plasma és Plasma (Wayland) munkamenet szükséges. A forrás Plasma/KWin 6.7.4 volt; a bináris KWin-effektusoknak illeszkedniük kell a telepített ABI-hoz.",
        },
        {
          title: "Készíts elő normál felhasználói munkamenetet",
          body: "Normál felhasználóként, hálózattal és sudo-val jelentkezz be; az installert ne futtasd rootként. A tudatos frissítést és kernel/Plasma utáni újraindítást előbb végezd el.",
        },
        {
          title: "Klónozd a repository-t",
          body: "Klónozd a Desktop Dreamet és lépj a könyvtárba. A webhely, dokumentáció, anonimizált configs, háttérkép és scripts együtt verziózott; nincs rejtett backend.",
        },
        {
          title: "Vizsgáld meg a bizonyítékokat és scripteket",
          body: "Futtatás előtt olvasd el a rice/manifest.json, rice/docs/components.md és installer fájlokat. A manifest elkülöníti a repository fájljait a külső projektektől és csak ellenőrzött tényeket tartalmaz.",
        },
        {
          title: "Futtasd a read-only előellenőrzést",
          body: "Először futtasd a doctor.sh-t. Beállítások alkalmazása nélkül ellenőrzi a disztribúciót, Plasma, Wayland, csomagokat, témákat, betűket, fájlokat, effektusokat és shortcutokat.",
        },
        {
          title: "Készíts visszaállítható backupot",
          body: "A backup.sh az útvonalstruktúra megtartásával másol a ~/.rice-backup/<timestamp>/ alá. Plasma snapshotot csak panelcsere előtt adj hozzá, majd ellenőrizd az eredményt.",
        },
        {
          title: "Telepítsd a hivatalos csomagokat",
          body: "A --packages megmutatja a tervet és csak dokumentált csomagokra használ pacman --needed parancsot. Nem futtat pacman -Syu-t és nem frissíti az egész rendszert.",
        },
        {
          title: "Vizsgáld át az AUR-összetevőket",
          body: "A --aur meglévő paru vagy yay programot igényel. Nézd át a Klassy, Reversal, Apple Cursor és Rounded Corners PKGBUILD fájljait; inkompatibilis Plasma esetén állj meg.",
        },
        {
          title: "Telepítsd a külső témákat és widgeteket",
          body: "Az Ant-Dark, Kara, KVitals és ClearClock az Appearance és Plasma linkjeiről telepítendő. Nincsenek vendorizálva; a pontos ClearClock betűkhöz licencelt fájl vagy helyettesítő kell.",
        },
        {
          title: "Telepítsd a biztonságos configs fájlokat",
          body: "Az alap installer backup után másolja a háttérképet, ~/.config/ghostty/config és ~/.config/fastfetch/config.jsonc fájlokat. KDE/KWin nem változik; utána csak a Ghosttyt indítsd újra.",
        },
        {
          title: "Tudatosan alkalmazd a KDE és KWin beállításokat",
          body: "A --apply-kde telepíti az anonimizált kdeglobals, kcminputrc, kscreenlockerrc, klassyrc, kwinrc és plasmarc fájlokat, majd csak Alt+1…Alt+7 értékeit egyesíti. A Plasma nem indul újra.",
        },
        {
          title: "Válassz pontos vagy kézi panelutat",
          body: "A snapshot 1920×1080 és 1366×768 kijelzőkhöz készült. A --plasma-layout csak hasonló topológián használd; különben kézzel építs négy lebegő panelt.",
        },
        {
          title: "Állítsd be az asztalokat és shortcutokat",
          body: "Ellenőrizd a hét virtuális asztalt egy sorban. A Keyboard → Shortcuts → KWin alatt az ütközések eltávolítása után rendeld hozzá az Alt+1…Alt+7 kombinációkat.",
        },
        {
          title: "Ellenőrizd a Terminalt és Fastfetch-et",
          body: "Ellenőrizd az Agave Nerd Fontot, indítsd újra a Ghosttyt, és futtasd a Fastfetch-et a konfigurációval. A valódi parancs az aktuális gépet olvassa; a webhely statikus Test Device-ot mutat.",
        },
        {
          title: "Aktiváld a munkamenet változásait",
          body: "Mentsd a munkát, jelentkezz ki, majd válaszd ismét a Plasma (Wayland) munkamenetet. Ez megbízhatóan újratölti a fonts, cursor, plugins, shortcuts és Plasma elemeket; scripts nem teszik meg.",
        },
        {
          title: "Ellenőrizd az eredményt",
          body: "Futtasd a doctor.sh-t, és ellenőrizd a kötelező sorokat, témákat, Ghostty glyphs, háttérképet, négy panelt, hét shortcutot, Klassy dekorációt és mérsékelt blur értéket.",
        },
        {
          title: "Rétegenként diagnosztizálj",
          body: "Használd a Troubleshooting részt: fc-match a glyphs, Plasma ABI a bináris témák, két Plasma fájl a panelek, majd Rounded Corners és Blur az artefaktumok vizsgálatához.",
        },
        {
          title: "Állj vissza a timestamped backupból",
          body: "Plasma vagy KWin visszaállítása előtt jelentkezz ki. Vizsgáld meg a ~/.rice-backup/<timestamp>/ tartalmát, és csak az érintett relatív útvonalat másold vissza.",
        },
      ],
    },
    troubleshooting: {
      eyebrow: "Beállítások és helyreállítás",
      title: "Előbb diagnózis, aztán visszaállítás",
      intro:
        "A doctor read-only. A backup megtartja a relatív útvonalakat, ezért egy összetevő a teljes Plasma törlése nélkül visszaállítható.",
      doctor: "Rice doctor futtatása",
      doctorBody:
        "Ellenőrzi az OS, Plasma, Wayland, csomagok, témák, fájlok, effektusok és mind a hét shortcut állapotát.",
      configured: "Telepítve / beállítva",
      optional: "Opcionális összetevő hiányzik",
      rollback: "Visszaállítás",
      rollbackBody:
        "Plasma/KWin fájlok visszaállítása előtt jelentkezz ki. Vizsgáld meg az időbélyeges könyvtárat, és csak az érintett útvonalat másold.",
      items: [
        [
          "Hiányzó glyphs",
          "Telepítsd mindkét Nerd Fontot, indítsd újra a Ghosttyt, és ellenőrizd az Agave Nerd Fontot fc-match használatával.",
        ],
        [
          "A téma nincs a listában",
          "A bináris Qt/KWin plugins fájloknak illeszkedniük kell a Plasma ABI-hoz; kompatibilis upstream verziót telepíts.",
        ],
        [
          "Az Alt shortcutok nem működnek",
          "Nyisd meg a System Settings → Keyboard → Shortcuts → KWin részt, szüntesd meg az ütközéseket, és rendeld hozzá a közvetlen váltást.",
        ],
        [
          "A panel rossz képernyőn van",
          "Állítsd vissza a két Plasma fájlt a backupból, és építsd fel kézzel a paneleket. A snapshot 0 és 1 indexet használ.",
        ],
        [
          "Blur artefaktumok",
          "Kapcsold ki a Rounded Corners, majd a Blur effektust az inkompatibilitás elkülönítéséhez. A rögzített erősség 8.",
        ],
        [
          "Hiányzó háttérkép",
          "Válaszd ki kézzel a ~/.local/share/wallpapers/desktop-dream/Mauve_girl.webp fájlt; a Plasma megtarthatta a régi útvonalat.",
        ],
        [
          "Rollback szükséges",
          "Jelentkezz ki, és csak a hibás útvonalat állítsd vissza a ~/.rice-backup/<timestamp>/ alól.",
        ],
      ],
    },
    errors: {
      notFound: "Az oldal nem található",
      notFoundBody: "A keresett oldal nem létezik vagy áthelyezték.",
      loadFailed: "Az oldal nem töltődött be",
      loadFailedBody: "Hiba történt. Próbáld újra, vagy térj vissza az asztalra.",
      retry: "Újra",
      home: "Kezdőlap",
    },
  },
};
