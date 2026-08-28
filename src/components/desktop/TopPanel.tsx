import { BatteryMedium, Cpu, MemoryStick, Network, Volume2, Wifi } from "lucide-react";
import { useEffect, useState } from "react";
import { content } from "@/data/localization";
import { locales } from "@/i18n/locale";
import { useLocale } from "@/i18n/use-locale";

function Clock() {
  const { localeTag } = useLocale();
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = window.setInterval(() => setNow(new Date()), 15_000);
    return () => window.clearInterval(id);
  }, []);

  const label = now
    ? new Intl.DateTimeFormat(localeTag, {
        day: "2-digit",
        month: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }).format(now)
    : "--.-- --:--";

  return <time className="panel-clock">{label}</time>;
}

export function TopPanel() {
  const { locale, setLocale } = useLocale();
  const copy = content[locale].desktop;
  return (
    <header className="panel-surface desktop-top-panel">
      <nav aria-label={copy.languages}>
        {locales.map((language) => (
          <button
            key={language.id}
            type="button"
            onClick={() => setLocale(language.id)}
            aria-label={copy.languageHint
              .replace("{number}", String(language.number))
              .replace("{name}", language.name)}
            aria-pressed={language.id === locale}
            title={language.name}
            className={language.id === locale ? "is-active" : undefined}
          >
            {language.number}
          </button>
        ))}
      </nav>
      <div className="panel-status" title={copy.decorativeMetrics}>
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
        <Wifi aria-label={copy.wifi} />
        <Volume2 aria-label={copy.volume} />
        <BatteryMedium aria-label={copy.battery} />
        <Clock />
      </div>
    </header>
  );
}
