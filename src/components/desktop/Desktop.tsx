import {
  BookOpen,
  Folder,
  Gauge,
  Grid3X3,
  Package,
  Palette,
  PanelsTopLeft,
  Settings,
  Terminal,
  type LucideIcon,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState, type ComponentType } from "react";
import { content, type AppId } from "@/data/localization";
import { locales } from "@/i18n/locale";
import { useLocale } from "@/i18n/use-locale";
import { Dock, type DockItem } from "./Dock";
import { TopPanel } from "./TopPanel";
import { Window, type WindowSize } from "./Window";
import { WALLPAPER_URL } from "./constants";
import { InstallTerminal } from "./apps/InstallTerminal";
import { FileManager } from "./apps/FileManager";
import {
  AppearanceApp,
  FastfetchApp,
  GuideApp,
  PackagesApp,
  PlasmaApp,
  TroubleshootingApp,
  WorkspacesApp,
} from "./apps/DocumentationApps";

type AppDefinition = {
  id: AppId;
  icon: LucideIcon;
  size: WindowSize;
  component: ComponentType;
};

type OpenWindow = { id: AppId; zIndex: number; minimized: boolean };

const apps: AppDefinition[] = [
  {
    id: "install",
    icon: Terminal,
    size: "large",
    component: InstallTerminal,
  },
  {
    id: "files",
    icon: Folder,
    size: "wide",
    component: FileManager,
  },
  {
    id: "appearance",
    icon: Palette,
    size: "large",
    component: AppearanceApp,
  },
  {
    id: "plasma",
    icon: PanelsTopLeft,
    size: "large",
    component: PlasmaApp,
  },
  {
    id: "workspaces",
    icon: Grid3X3,
    size: "medium",
    component: WorkspacesApp,
  },
  {
    id: "fastfetch",
    icon: Gauge,
    size: "large",
    component: FastfetchApp,
  },
  {
    id: "packages",
    icon: Package,
    size: "large",
    component: PackagesApp,
  },
  {
    id: "guide",
    icon: BookOpen,
    size: "large",
    component: GuideApp,
  },
  {
    id: "troubleshooting",
    icon: Settings,
    size: "large",
    component: TroubleshootingApp,
  },
];

export function Desktop() {
  const { locale, setLocale } = useLocale();
  const copy = content[locale];
  const [windows, setWindows] = useState<OpenWindow[]>([]);
  const nextZ = useRef(30);

  const focusWindow = (id: AppId) => {
    nextZ.current += 1;
    const zIndex = nextZ.current;
    setWindows((current) =>
      current.map((window) => (window.id === id ? { ...window, zIndex } : window)),
    );
  };

  const openWindow = useCallback((id: AppId) => {
    nextZ.current += 1;
    const zIndex = nextZ.current;
    setWindows((current) => {
      const existing = current.find((window) => window.id === id);
      if (existing) {
        return current.map((window) =>
          window.id === id ? { ...window, minimized: false, zIndex } : window,
        );
      }
      return [...current, { id, minimized: false, zIndex }];
    });
  }, []);

  useEffect(() => {
    const onOpenApp = (event: Event) => {
      const id = (event as CustomEvent<AppId>).detail;
      if (apps.some((app) => app.id === id)) openWindow(id);
    };
    window.addEventListener("desktop-dream:open-app", onOpenApp);
    return () => window.removeEventListener("desktop-dream:open-app", onOpenApp);
  }, [openWindow]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!event.altKey || event.ctrlKey || event.metaKey) return;
      const language = locales.find((entry) => entry.number === Number(event.key));
      if (!language) return;
      event.preventDefault();
      setLocale(language.id);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [setLocale]);

  const topWindow = windows
    .filter((window) => !window.minimized)
    .reduce<OpenWindow | undefined>(
      (top, window) => (!top || window.zIndex > top.zIndex ? window : top),
      undefined,
    );

  const dockItems: DockItem[] = apps.map((app) => {
    const state = windows.find((window) => window.id === app.id);
    return {
      id: app.id,
      label: copy.apps[app.id].label,
      icon: app.icon,
      onOpen: () => openWindow(app.id),
      active: Boolean(state && !state.minimized),
      minimized: Boolean(state?.minimized),
    };
  });

  return (
    <main
      className="desktop-root"
      style={{ backgroundImage: 'url("' + WALLPAPER_URL + '")' }}
      aria-label={copy.desktop.aria}
    >
      <TopPanel />
      <div className="workspace-toast" aria-live="polite">
        {locales.find((entry) => entry.id === locale)?.name}
      </div>

      {windows.map((windowState, index) => {
        if (windowState.minimized) return null;
        const app = apps.find((candidate) => candidate.id === windowState.id);
        if (!app) return null;
        const AppComponent = app.component;
        return (
          <Window
            key={app.id}
            title={copy.apps[app.id].title}
            size={app.size}
            zIndex={windowState.zIndex}
            active={topWindow?.id === app.id}
            initialOffset={{ x: (index % 4) * 22 - 22, y: (index % 3) * 18 - 18 }}
            onFocus={() => focusWindow(app.id)}
            onMinimize={() =>
              setWindows((current) =>
                current.map((item) => (item.id === app.id ? { ...item, minimized: true } : item)),
              )
            }
            onClose={() => setWindows((current) => current.filter((item) => item.id !== app.id))}
          >
            <AppComponent />
          </Window>
        );
      })}
      <Dock items={dockItems} />
    </main>
  );
}
