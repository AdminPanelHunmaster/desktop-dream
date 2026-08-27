import { createFileRoute } from "@tanstack/react-router";
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
import wallpaperAsset from "../assets/wallpaper.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Linux Rice Desktop" },
      { name: "description", content: "A minimal Linux rice desktop interface." },
      { property: "og:title", content: "Linux Rice Desktop" },
      { property: "og:description", content: "A minimal Linux rice desktop interface." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const WORKSPACES = [1, 2, 3, 4, 5, 6];
const SYSTEM_ITEMS = ["CPU", "RAM", "NET", "WIFI", "VOL", "BAT", "TIME"];
const DOCK_ICONS = [
  { icon: Terminal, label: "Icon 1" },
  { icon: Folder, label: "Icon 2" },
  { icon: Globe, label: "Icon 3" },
  { icon: Mail, label: "Icon 4" },
  { icon: Music, label: "Icon 5" },
  { icon: Calendar, label: "Icon 6" },
  { icon: FileText, label: "Icon 7" },
  { icon: Search, label: "Icon 8" },
  { icon: Settings, label: "Icon 9" },
];

function Index() {
  return (
    <div
      className="relative h-screen w-screen overflow-hidden"
      style={{
        backgroundImage: `url(${wallpaperAsset.url})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Top panel */}
      <header className="absolute left-3 right-3 top-3 flex h-9 items-center justify-between rounded-lg bg-panel/90 px-3 text-xs font-medium text-panel-foreground/90 shadow-sm backdrop-blur-sm">
        <nav className="flex items-center gap-1.5">
          {WORKSPACES.map((num) => (
            <button
              key={num}
              type="button"
              className="flex h-5 w-5 items-center justify-center rounded transition-colors hover:bg-white/10 hover:text-panel-foreground"
              aria-label={`Workspace ${num}`}
            >
              {num}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {SYSTEM_ITEMS.map((item) => (
            <span
              key={item}
              className="hidden tracking-wide text-panel-foreground/70 sm:inline"
            >
              {item}
            </span>
          ))}
        </div>
      </header>

      {/* Bottom dock */}
      <nav className="absolute bottom-5 left-1/2 z-10 -translate-x-1/2 rounded-2xl bg-panel/90 px-3 py-2 shadow-sm backdrop-blur-sm">
        <ul className="flex items-center gap-2">
          {DOCK_ICONS.map(({ icon: Icon, label }) => (
            <li key={label}>
              <button
                type="button"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-xl text-panel-foreground/80 transition-all duration-150 ease-out hover:scale-110 hover:bg-white/10 hover:text-panel-foreground"
              >
                <Icon className="h-5 w-5" />
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
