import { BatteryMedium, Cpu, MemoryStick, Network, Volume2, Wifi } from "lucide-react";
import { useEffect, useState } from "react";
import { WORKSPACES } from "./constants";

function Clock() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = window.setInterval(() => setNow(new Date()), 15_000);
    return () => window.clearInterval(id);
  }, []);

  const label = now
    ? [
        String(now.getDate()).padStart(2, "0") + "." + String(now.getMonth() + 1).padStart(2, "0"),
        String(now.getHours()).padStart(2, "0") + ":" + String(now.getMinutes()).padStart(2, "0"),
      ].join(" ")
    : "--.-- --:--";

  return <time className="panel-clock">{label}</time>;
}

export function TopPanel({
  activeWorkspace,
  onWorkspaceChange,
}: {
  activeWorkspace: number;
  onWorkspaceChange: (workspace: number) => void;
}) {
  return (
    <header className="panel-surface desktop-top-panel">
      <nav aria-label="Website workspaces">
        {WORKSPACES.map((workspace) => (
          <button
            key={workspace}
            type="button"
            onClick={() => onWorkspaceChange(workspace)}
            aria-label={"Workspace " + workspace}
            aria-current={workspace === activeWorkspace ? "page" : undefined}
            className={workspace === activeWorkspace ? "is-active" : undefined}
          >
            {workspace}
          </button>
        ))}
      </nav>
      <div className="panel-status" title="Decorative rice preview metrics — not visitor hardware">
        <span className="metric-wide">
          <Cpu aria-hidden="true" />
          demo 12%
        </span>
        <span className="metric-wide">
          <MemoryStick aria-hidden="true" />
          demo 48%
        </span>
        <span className="metric-desktop">
          <Network aria-hidden="true" />
          1.2M
        </span>
        <Wifi aria-label="Wi-Fi preview" />
        <Volume2 aria-label="Volume preview" />
        <BatteryMedium aria-label="Battery preview" />
        <Clock />
      </div>
    </header>
  );
}
