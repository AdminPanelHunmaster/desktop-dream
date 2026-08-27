import type { LucideIcon } from "lucide-react";

export type DockItem = {
  id: string;
  label: string;
  icon: LucideIcon;
  onOpen: () => void;
  active: boolean;
  minimized: boolean;
};

export function Dock({ items }: { items: DockItem[] }) {
  return (
    <nav className="panel-surface desktop-dock" aria-label="Rice applications">
      <ul>
        {items.map(({ id, label, icon: Icon, onOpen, active, minimized }) => (
          <li key={id} className="dock-group">
            <span role="tooltip" className="dock-tooltip">
              {label}
            </span>
            <button
              type="button"
              aria-label={label}
              aria-pressed={active}
              onClick={onOpen}
              className={active ? "is-active" : undefined}
            >
              <Icon aria-hidden="true" />
              {(active || minimized) && (
                <span className={minimized ? "dock-indicator is-minimized" : "dock-indicator"} />
              )}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
