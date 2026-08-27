import {
  Terminal,
  Folder,
  Globe,
  Mail,
  Music,
  Settings,
  Calendar,
  FileText,
  Search,
} from "lucide-react";
import { useState } from "react";
import { Dock, type DockItem } from "./Dock";
import { TopPanel } from "./TopPanel";
import { Window } from "./Window";
import { WALLPAPER_URL } from "./constants";

type OpenWindow = { id: string; title: string };

export function Desktop() {
  const [windows, setWindows] = useState<OpenWindow[]>([]);

  const openWindow = (win: OpenWindow) => {
    setWindows((prev) => (prev.some((w) => w.id === win.id) ? prev : [...prev, win]));
  };

  const dockItems: DockItem[] = [
    {
      id: "icon-1",
      label: "Icon 1",
      icon: Terminal,
      onOpen: () => openWindow({ id: "icon-1", title: "Icon 1" }),
    },
    { id: "icon-2", label: "Icon 2", icon: Folder },
    { id: "icon-3", label: "Icon 3", icon: Globe },
    { id: "icon-4", label: "Icon 4", icon: Mail },
    { id: "icon-5", label: "Icon 5", icon: Music },
    { id: "icon-6", label: "Icon 6", icon: Calendar },
    { id: "icon-7", label: "Icon 7", icon: FileText },
    { id: "icon-8", label: "Icon 8", icon: Search },
    { id: "icon-9", label: "Icon 9", icon: Settings },
  ];

  return (
    <div
      className="relative h-screen w-screen overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url("${WALLPAPER_URL}")` }}
    >
      <TopPanel />

      {windows.map((win) => (
        <Window
          key={win.id}
          title={win.title}
          onClose={() => setWindows((prev) => prev.filter((w) => w.id !== win.id))}
        />
      ))}

      <Dock items={dockItems} />
    </div>
  );
}
