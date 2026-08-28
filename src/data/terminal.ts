export type TerminalLocale = "en" | "ru";

export const endeavourAscii = [
  "                    ./o.",
  "                  ./sssso-",
  "                .:osssssss+-",
  "              .:+ssssssssss/.",
  "            .-/ossssssssssssso/.",
  "          .-/+sssssssssssssssso+:",
  "        .:/+ssssssssssssssssssso+/.",
  "      .://osssssssssssssssssssssso++.",
  "    .://+ssssssssssssssssssssssssso++:",
  "  .:///osssssssssssssssssssssssssso+++.",
  " .////ssssssssssssssssssssssssssssso++.",
  "/////ossssssssssssssssssssssssssssso++.",
  "+++++ssssssssssssssssssssssssssssso++++",
  "  .+ossssssssssssssssssssssssssssso+++.",
  "    -+sssssssssssssssssssssssssssso+/.",
  "      :+sssssssssssssssssssssssso+/.",
  "        ./osssssssssssssssssso+/-",
  "          .-+osssssssssssso+/.",
  "             .:/+++++++/:-",
];

export const fastfetchHardware = [
  ["▣", "PC: Test Device"],
  ["◇", "Nitro ANV15-52 (Demo)"],
  ["▤", "1920x1080 @ 165Hz"],
  ["▤", "1366x768 @ 60Hz"],
  ["◉", "Intel(R) Core(TM) 5 210H (8+4) @ 4.80 GHz"],
  ["▥", "NVIDIA GeForce RTX 5050 Max-Q / Mobile [Discrete]"],
  ["▥", "Intel Graphics @ 1.40 GHz [Integrated]"],
  ["▦", "5.13 GiB / 15.30 GiB (34%)"],
  ["♻", "0 B / 512.00 MiB (0%)"],
  ["▱", "47.67 GiB / 466.41 GiB (10%) - ext4"],
  ["◷", "Demo installation"],
] as const;

export const fastfetchSoftware = [
  ["♙", "OS: EndeavourOS x86_64"],
  ["✿", "Linux 7.1.9-arch1-2"],
  ["◇", "24 (flatpak-user), 1445 (pacman)"],
  ["▣", "ghostty 1.3.1-arch2"],
  ["⌁", "zsh 5.9.2"],
  ["▦", "DE: KDE Plasma 6.7.4"],
  ["▤", "Plasma login (Wayland)"],
  ["▤", "KWin (Wayland)"],
  ["⚑", "Klassy"],
  ["➤", "macOS-White (24px)"],
  ["A", "FantasqueSansM Nerd Font (10pt)"],
  ["A", "Agave Nerd Font (14pt)"],
] as const;

export const commandGroups = [
  {
    title: "SYSTEM",
    commands: ["fastfetch", "uname", "whoami", "date", "time"],
  },
  { title: "RICE", commands: ["rice", "guide", "github"] },
  { title: "FILES", commands: ["ls", "pwd", "cat about.txt"] },
  { title: "FUN", commands: ["sl", "cava", "cmatrix", "fortune"] },
  { title: "TERMINAL", commands: ["clear", "help"] },
] as const;

const descriptions = {
  en: {
    fastfetch: "Show static demo system information",
    uname: "Show demo kernel information",
    whoami: "Show the current demo user",
    date: "Show the real client-side date",
    time: "Show the real client-side time",
    rice: "Describe the Desktop Dream rice",
    guide: "Open the installation guide window",
    github: "Open the real GitHub repository",
    ls: "List demo files",
    pwd: "Print the demo working directory",
    "cat about.txt": "Read the local demo text file",
    sl: "Run a tiny steam locomotive",
    cava: "Run a visualizer demo (no audio access)",
    cmatrix: "Run a small Matrix-style demo",
    fortune: "Print a random local quote",
    clear: "Clear terminal output",
    help: "Show this help",
  },
  ru: {
    fastfetch: "Показать статичную информацию demo-системы",
    uname: "Показать информацию о demo-ядре",
    whoami: "Показать текущего demo-пользователя",
    date: "Показать реальную клиентскую дату",
    time: "Показать реальное клиентское время",
    rice: "Рассказать о rice Desktop Dream",
    guide: "Открыть окно инструкции по установке",
    github: "Открыть настоящий GitHub repository",
    ls: "Показать demo-файлы",
    pwd: "Показать demo-рабочую директорию",
    "cat about.txt": "Прочитать локальный demo-файл",
    sl: "Запустить маленький паровоз",
    cava: "Запустить demo-визуализатор без доступа к аудио",
    cmatrix: "Запустить небольшую Matrix-demo",
    fortune: "Показать случайную локальную фразу",
    clear: "Очистить вывод терминала",
    help: "Показать эту справку",
  },
} as const;

export const terminalCopy = {
  en: {
    welcome: "Welcome to Desktop Dream Terminal",
    demo: "This is a demo terminal.",
    noExecution: "It does not execute commands on your computer.",
    hint: 'Type "help" to see available commands.',
    placeholder: "Type a safe demo command…",
    ariaInput: "Desktop Dream demo command",
    demoBadge: "DEMO DEVICE · STATIC VALUES",
    fastfetchNote: "Visual simulation — not visitor hardware",
    unknown: (command: string) => `command not found: ${command}. Type "help".`,
    about:
      "Desktop Dream is an interactive documentation desktop for a sanitized EndeavourOS + KDE Plasma Wayland rice.",
    rice: "EndeavourOS · KDE Plasma 6.7.4 · Wayland · KWin · Ant-Dark · Klassy · Reversal · Ghostty · Fastfetch",
    guide: "Opening the installation guide…",
    github: "Opening github.com/AdminPanelHunmaster/desktop-dream…",
    cava: "CAVA demo visualizer\nPress Ctrl+C to stop\nNo microphone or audio access is used.",
    matrix: "CMATRIX demo\nPress Ctrl+C to stop",
    stopped: "^C  demo animation stopped",
    trainDone: "The little train has left the terminal.",
    language: "Terminal language",
  },
  ru: {
    welcome: "Добро пожаловать в Desktop Dream Terminal",
    demo: "Это тестовый терминал.",
    noExecution: "Он не выполняет команды на вашем компьютере.",
    hint: 'Введите "help", чтобы увидеть доступные команды.',
    placeholder: "Введите безопасную demo-команду…",
    ariaInput: "Demo-команда Desktop Dream",
    demoBadge: "ТЕСТОВОЕ УСТРОЙСТВО · СТАТИЧНЫЕ ДАННЫЕ",
    fastfetchNote: "Визуальная симуляция — не данные компьютера посетителя",
    unknown: (command: string) => `команда не найдена: ${command}. Введите "help".`,
    about:
      "Desktop Dream — интерактивная документация обезличенного EndeavourOS + KDE Plasma Wayland rice.",
    rice: "EndeavourOS · KDE Plasma 6.7.4 · Wayland · KWin · Ant-Dark · Klassy · Reversal · Ghostty · Fastfetch",
    guide: "Открываю инструкцию по установке…",
    github: "Открываю github.com/AdminPanelHunmaster/desktop-dream…",
    cava: "CAVA demo-визуализатор\nНажмите Ctrl+C для остановки\nМикрофон и настоящее аудио не используются.",
    matrix: "CMATRIX demo\nНажмите Ctrl+C для остановки",
    stopped: "^C  demo-анимация остановлена",
    trainDone: "Маленький поезд покинул терминал.",
    language: "Язык терминала",
  },
} as const;

export const descriptionFor = (locale: TerminalLocale, command: string) =>
  descriptions[locale][command as keyof (typeof descriptions)["en"]];

export const fortunes = {
  en: [
    "Make it work, make it clear, then make it beautiful.",
    "A quiet desktop leaves room for loud ideas.",
    "Backups are cheaper than regrets.",
    "The best rice is the one you can still use.",
  ],
  ru: [
    "Сначала надёжность, затем ясность, затем красота.",
    "Спокойный рабочий стол оставляет место громким идеям.",
    "Резервная копия дешевле сожалений.",
    "Лучший rice — тот, которым удобно пользоваться.",
  ],
} as const;
