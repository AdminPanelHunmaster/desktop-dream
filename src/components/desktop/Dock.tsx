import type { LucideIcon } from "lucide-react";

export type DockItem = {
  id: string;
  label: string;
  icon: LucideIcon;
  onOpen?: () => void;
};

export function Dock({ items }: { items: DockItem[] }) {
  return (
    <nav className="panel-surface absolute bottom-5 left-1/2 z-20 -translate-x-1/2 select-none rounded-2xl px-2.5 py-2">
      <ul className="flex items-end gap-1.5">
        {items.map(({ id, label, icon: Icon, onOpen }) => (
          <li key={id} className="group relative">
            <span
              role="tooltip"
              className="pointer-events-none absolute bottom-[calc(100%+10px)] left-1/2 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-md border border-white/10 bg-black/70 px-2 py-1 text-[11px] text-panel-foreground opacity-0 shadow-lg backdrop-blur-md transition-all duration-150 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-hover:delay-200 group-focus-within:translate-y-0 group-focus-within:opacity-100"
            >
              {label}
            </span>
            <button
              type="button"
              aria-label={label}
              onClick={onOpen}
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl text-panel-foreground/80 outline-none transition-transform duration-200 ease-out hover:-translate-y-1 hover:scale-115 hover:text-panel-foreground focus-visible:ring-2 focus-visible:ring-panel-foreground/40 active:scale-95 active:duration-100"
            >
              <Icon className="h-5 w-5" />
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
