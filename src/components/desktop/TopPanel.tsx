import { Cpu, MemoryStick, Wifi, Network, Volume2, BatteryMedium } from "lucide-react";
import { useEffect, useState } from "react";
import { WORKSPACES } from "./constants";

function Clock() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000 * 15);
    return () => clearInterval(id);
  }, []);

  const label = now
    ? `${String(now.getDate()).padStart(2, "0")}.${String(now.getMonth() + 1).padStart(2, "0")} ${String(
        now.getHours(),
      ).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`
    : "--.-- --:--";

  return <span className="tabular-nums text-panel-foreground">{label}</span>;
}

export function TopPanel() {
  const [activeWorkspace, setActiveWorkspace] = useState(1);

  return (
    <header className="panel-surface absolute left-3 right-3 top-3 z-20 flex h-9 select-none items-center justify-between rounded-lg px-2 text-xs font-medium text-panel-foreground/80">
      <nav className="flex items-center gap-1">
        {WORKSPACES.map((num) => {
          const active = num === activeWorkspace;
          return (
            <button
              key={num}
              type="button"
              onClick={() => setActiveWorkspace(num)}
              aria-label={`Workspace ${num}`}
              aria-current={active ? "true" : undefined}
              className={`flex h-6 w-6 cursor-pointer items-center justify-center rounded-md outline-none transition-all duration-200 ease-out focus-visible:ring-2 focus-visible:ring-panel-foreground/40 ${
                active
                  ? "scale-105 bg-panel-foreground/15 text-panel-foreground"
                  : "text-panel-foreground/60 hover:bg-panel-foreground/10 hover:text-panel-foreground"
              }`}
            >
              {num}
            </button>
          );
        })}
      </nav>

      <div className="flex items-center gap-3 pr-1 text-panel-foreground/70">
        <span className="hidden items-center gap-1.5 sm:flex">
          <Cpu className="h-3.5 w-3.5" /> 12%
        </span>
        <span className="hidden items-center gap-1.5 sm:flex">
          <MemoryStick className="h-3.5 w-3.5" /> 48%
        </span>
        <span className="hidden items-center gap-1.5 md:flex">
          <Network className="h-3.5 w-3.5" /> 1.2M
        </span>
        <Wifi className="hidden h-3.5 w-3.5 sm:block" aria-label="Wi-Fi" />
        <Volume2 className="hidden h-3.5 w-3.5 sm:block" aria-label="Volume" />
        <BatteryMedium className="hidden h-3.5 w-3.5 sm:block" aria-label="Battery" />
        <Clock />
      </div>
    </header>
  );
}
