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
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Dock, type DockItem } from "./Dock";
import { TopPanel } from "./TopPanel";
import { Window, type WindowSize } from "./Window";
import { WALLPAPER_URL, WORKSPACES } from "./constants";
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

type AppId =
  | "install"
  | "files"
  | "appearance"
  | "plasma"
  | "workspaces"
  | "fastfetch"
  | "packages"
  | "guide"
  | "troubleshooting";

type AppDefinition = {
  id: AppId;
  title: string;
  label: string;
  icon: LucideIcon;
  size: WindowSize;
  content: ReactNode;
};

type OpenWindow = { id: AppId; zIndex: number; minimized: boolean };

const apps: AppDefinition[] = [
  {
    id: "install",
    title: "Terminal — Install",
    label: "Install",
    icon: Terminal,
    size: "large",
    content: <InstallTerminal />,
  },
  {
    id: "files",
    title: "Files — Dotfiles",
    label: "Dotfiles",
    icon: Folder,
    size: "wide",
    content: <FileManager />,
  },
  {
    id: "appearance",
    title: "Appearance",
    label: "Appearance",
    icon: Palette,
    size: "large",
    content: <AppearanceApp />,
  },
  {
    id: "plasma",
    title: "Plasma — Panels & Widgets",
    label: "Plasma",
    icon: PanelsTopLeft,
    size: "large",
    content: <PlasmaApp />,
  },
  {
    id: "workspaces",
    title: "Workspaces",
    label: "Workspaces",
    icon: Grid3X3,
    size: "medium",
    content: <WorkspacesApp />,
  },
  {
    id: "fastfetch",
    title: "Ghostty & Fastfetch",
    label: "Fastfetch",
    icon: Gauge,
    size: "large",
    content: <FastfetchApp />,
  },
  {
    id: "packages",
    title: "Packages",
    label: "Packages",
    icon: Package,
    size: "large",
    content: <PackagesApp />,
  },
  {
    id: "guide",
    title: "Guide — Installation",
    label: "Guide",
    icon: BookOpen,
    size: "large",
    content: <GuideApp />,
  },
  {
    id: "troubleshooting",
    title: "Settings & Troubleshooting",
    label: "Troubleshooting",
    icon: Settings,
    size: "large",
    content: <TroubleshootingApp />,
  },
];

export function Desktop() {
  const [windows, setWindows] = useState<OpenWindow[]>([]);
  const [activeWorkspace, setActiveWorkspace] = useState(1);
  const nextZ = useRef(30);

  const focusWindow = (id: AppId) => {
    nextZ.current += 1;
    const zIndex = nextZ.current;
    setWindows((current) =>
      current.map((window) => (window.id === id ? { ...window, zIndex } : window)),
    );
  };

  const openWindow = (id: AppId) => {
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
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!event.altKey || event.ctrlKey || event.metaKey) return;
      const workspace = Number(event.key);
      if (!WORKSPACES.includes(workspace)) return;
      event.preventDefault();
      setActiveWorkspace(workspace);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

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
      label: app.label,
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
      aria-label="Interactive KDE rice documentation desktop"
    >
      <TopPanel activeWorkspace={activeWorkspace} onWorkspaceChange={setActiveWorkspace} />
      <div className="workspace-toast" aria-live="polite">
        workspace {activeWorkspace}
      </div>

      {windows.map((windowState, index) => {
        if (windowState.minimized) return null;
        const app = apps.find((candidate) => candidate.id === windowState.id);
        if (!app) return null;
        return (
          <Window
            key={app.id}
            title={app.title}
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
            {app.content}
          </Window>
        );
      })}
      <Dock items={dockItems} />
    </main>
  );
}
