import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Download,
  ExternalLink,
  MonitorCog,
  RotateCcw,
  ShieldCheck,
} from "lucide-react";
import {
  appearanceFacts,
  guideCommands,
  packages,
  panels,
  repository,
  terminalPreview,
  thirdParty,
  widgets,
  workspaces,
} from "@/data/rice";
import { content } from "@/data/localization";
import { useLocale } from "@/i18n/use-locale";
import { rawFileUrl } from "@/data/rice-files";
import { CopyButton } from "./CopyButton";

function AppIntro({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <header className="doc-intro">
      <span>{eyebrow}</span>
      <h2>{title}</h2>
      <p>{children}</p>
    </header>
  );
}

function Command({ children }: { children: string }) {
  return (
    <div className="terminal-command">
      <pre>{children}</pre>
      <CopyButton value={children} compact />
    </div>
  );
}

export function AppearanceApp() {
  const { locale } = useLocale();
  const copy = content[locale];
  return (
    <div className="doc-app app-scroll">
      <AppIntro eyebrow={copy.appearance.eyebrow} title={copy.appearance.title}>
        {copy.appearance.intro}
      </AppIntro>
      <section className="appearance-list">
        {appearanceFacts.map(([, value], index) => (
          <article key={value}>
            <span>{copy.appearance.factNames[index]}</span>
            <strong>{value}</strong>
            <p>{copy.appearance.factPurposes[index]}</p>
          </article>
        ))}
      </section>
      <section className="app-section">
        <div className="section-heading">
          <span>{copy.common.sources}</span>
          <h3>{copy.appearance.thirdParty}</h3>
        </div>
        <div className="source-list">
          {thirdParty.map((item, index) => (
            <a key={item.name} href={item.source} target="_blank" rel="noreferrer">
              <div>
                <strong>{item.name}</strong>
                <span>{copy.appearance.kinds[index]}</span>
              </div>
              <ExternalLink aria-hidden="true" />
            </a>
          ))}
        </div>
      </section>
      <section className="wallpaper-card">
        <img src="/assets/wallpapers/main-wallpaper.webp" alt={copy.appearance.wallpaperAlt} />
        <div>
          <span>{copy.appearance.included}</span>
          <strong>Mauve_girl.webp</strong>
          <a href={rawFileUrl("rice/assets/wallpapers/Mauve_girl.webp")} download>
            <Download aria-hidden="true" />
            {copy.common.download}
          </a>
        </div>
      </section>
    </div>
  );
}

export function PlasmaApp() {
  const { locale } = useLocale();
  const copy = content[locale];
  return (
    <div className="doc-app app-scroll">
      <AppIntro eyebrow={copy.plasma.eyebrow} title={copy.plasma.title}>
        {copy.plasma.intro}
      </AppIntro>
      <div className="panel-stack">
        {panels.map((panel, panelIndex) => (
          <article key={panel.title}>
            <header>
              <MonitorCog aria-hidden="true" />
              <div>
                <strong>{copy.plasma.panelTitles[panelIndex]}</strong>
                <span>{panel.geometry}</span>
              </div>
            </header>
            <div className="widget-flow">
              {panel.widgets.map((widget, index) => (
                <span key={widget}>
                  {copy.plasma.widgetNames[widget] ?? widget}
                  {index < panel.widgets.length - 1 && <ArrowRight aria-hidden="true" />}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
      <section className="app-section">
        <div className="section-heading">
          <span>{copy.plasma.widgets}</span>
          <h3>{copy.plasma.upstream}</h3>
        </div>
        <div className="source-list">
          {widgets.map((widget, index) => (
            <a key={widget.name} href={widget.source} target="_blank" rel="noreferrer">
              <div>
                <strong>{widget.name}</strong>
                <span>{copy.plasma.widgetPurposes[index]}</span>
              </div>
              <ExternalLink aria-hidden="true" />
            </a>
          ))}
        </div>
      </section>
      <div className="safety-note">
        <AlertTriangle aria-hidden="true" />
        <p>{copy.plasma.safety}</p>
      </div>
    </div>
  );
}

export function WorkspacesApp() {
  const { locale } = useLocale();
  const copy = content[locale];
  return (
    <div className="doc-app app-scroll">
      <AppIntro eyebrow={copy.workspaces.eyebrow} title={copy.workspaces.title}>
        {copy.workspaces.intro}
      </AppIntro>
      <div className="workspace-map">
        {workspaces.map((workspace) => (
          <article key={workspace.desktop}>
            <kbd>{workspace.shortcut}</kbd>
            <ArrowRight aria-hidden="true" />
            <div>
              <span>{copy.workspaces.desktop}</span>
              <strong>{workspace.desktop}</strong>
            </div>
          </article>
        ))}
      </div>
      <section className="app-section">
        <div className="section-heading">
          <span>{copy.workspaces.config}</span>
          <h3>{copy.workspaces.location}</h3>
        </div>
        <div className="path-list">
          <code>~/.config/kwinrc → [Desktops] Number=7, Rows=1</code>
          <code>~/.config/kglobalshortcutsrc → [kwin] Switch to Desktop N</code>
          <code>rice/config/kde/kglobalshortcutsrc.snippet → sanitized merge source</code>
        </div>
      </section>
      <p className="app-copy">{copy.workspaces.siteHint}</p>
    </div>
  );
}

export function FastfetchApp() {
  const { locale } = useLocale();
  const copy = content[locale];
  const plasmaThemeLabel = copy.appearance.factNames[0] ?? "Theme";
  const iconsLabel = copy.appearance.factNames[4] ?? "Icons";
  const preview = [
    ...terminalPreview.slice(0, 6),
    `  ${copy.fastfetch.windowTheme.padEnd(12)}Klassy`,
    `  ${plasmaThemeLabel.padEnd(12)}Ant-Dark`,
    `  ${iconsLabel.padEnd(12)}Reversal`,
    `  ${copy.fastfetch.font.padEnd(12)}Agave Nerd Font`,
  ];
  return (
    <div className="fastfetch-app app-scroll">
      <div className="fastfetch-preview">
        <pre>{preview.join("\n")}</pre>
      </div>
      <section className="app-section">
        <div className="section-heading">
          <span>Ghostty</span>
          <h3>{copy.fastfetch.terminalSurface}</h3>
        </div>
        <div className="fact-grid">
          <div className="fact-row">
            <span>{copy.fastfetch.font}</span>
            <strong>Agave Nerd Font 14</strong>
          </div>
          <div className="fact-row">
            <span>{copy.fastfetch.background}</span>
            <strong>#0d0c0d · 86%</strong>
          </div>
          <div className="fact-row">
            <span>{copy.fastfetch.blur}</span>
            <strong>{copy.fastfetch.enabled}</strong>
          </div>
          <div className="fact-row">
            <span>{copy.fastfetch.padding}</span>
            <strong>14 × 12</strong>
          </div>
          <div className="fact-row">
            <span>{copy.fastfetch.palette}</span>
            <strong>{copy.fastfetch.paletteValue}</strong>
          </div>
        </div>
      </section>
      <section className="app-section">
        <div className="section-heading">
          <span>Fastfetch</span>
          <h3>{copy.fastfetch.audited}</h3>
        </div>
        <p className="app-copy">{copy.fastfetch.description}</p>
        <Command>fastfetch --config ~/.config/fastfetch/config.jsonc</Command>
        <div className="action-row">
          <a
            className="app-button"
            href={rawFileUrl("rice/config/fastfetch/config.jsonc")}
            download
          >
            <Download aria-hidden="true" />
            {copy.fastfetch.config}
          </a>
          <a className="app-button" href={rawFileUrl("rice/config/ghostty/config")} download>
            <Download aria-hidden="true" />
            {copy.fastfetch.ghosttyConfig}
          </a>
        </div>
      </section>
    </div>
  );
}

export function PackagesApp() {
  const { locale } = useLocale();
  const copy = content[locale];
  return (
    <div className="doc-app app-scroll">
      <AppIntro eyebrow={copy.packages.eyebrow} title={copy.packages.title}>
        {copy.packages.intro}
      </AppIntro>
      {Object.entries(packages).map(([group, entries]) => (
        <section className="package-group" key={group}>
          <h3>{copy.packages.groups[group] ?? group}</h3>
          <div>
            {entries.map((entry) => (
              <article key={entry.name}>
                <div>
                  <strong>{entry.name}</strong>
                  <p>{copy.packages.purposes[entry.name] ?? entry.purpose}</p>
                </div>
                <code>{entry.command}</code>
                <div className="package-actions">
                  <CopyButton value={entry.command} compact />
                  <a
                    href={entry.source}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={entry.name + " " + copy.packages.sourceLabel}
                  >
                    <ExternalLink aria-hidden="true" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

export function GuideApp() {
  const { locale } = useLocale();
  const copy = content[locale];
  return (
    <div className="doc-app app-scroll">
      <AppIntro eyebrow={copy.guide.eyebrow} title={copy.guide.title}>
        {copy.guide.intro}
      </AppIntro>
      <ol className="guide-steps">
        {copy.guide.steps.map((step, index) => (
          <li key={step.title}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <div>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
              {guideCommands[index] && <Command>{guideCommands[index]}</Command>}
            </div>
          </li>
        ))}
      </ol>
      <div className="action-row">
        <a
          className="app-button app-button-primary"
          href={repository.url + "/blob/main/rice/docs/installation.md"}
          target="_blank"
          rel="noreferrer"
        >
          <ExternalLink aria-hidden="true" />
          {copy.common.readInstallation}
        </a>
        <a className="app-button" href={repository.zip}>
          <Download aria-hidden="true" />
          {copy.common.downloadAll}
        </a>
      </div>
    </div>
  );
}

export function TroubleshootingApp() {
  const { locale } = useLocale();
  const copy = content[locale];
  return (
    <div className="doc-app app-scroll">
      <AppIntro eyebrow={copy.troubleshooting.eyebrow} title={copy.troubleshooting.title}>
        {copy.troubleshooting.intro}
      </AppIntro>
      <section className="doctor-card">
        <div>
          <ShieldCheck aria-hidden="true" />
          <div>
            <strong>{copy.troubleshooting.doctor}</strong>
            <p>{copy.troubleshooting.doctorBody}</p>
          </div>
        </div>
        <Command>bash rice/scripts/doctor.sh</Command>
        <div className="doctor-legend">
          <span>
            <CheckCircle2 /> {copy.troubleshooting.configured}
          </span>
          <span>
            <AlertTriangle /> {copy.troubleshooting.optional}
          </span>
        </div>
      </section>
      <div className="trouble-list">
        {copy.troubleshooting.items.map(([title, body]) => (
          <details key={title}>
            <summary>
              <span>{title}</span>
              <ArrowRight aria-hidden="true" />
            </summary>
            <p>{body}</p>
          </details>
        ))}
      </div>
      <section className="rollback-card">
        <RotateCcw aria-hidden="true" />
        <div>
          <strong>{copy.troubleshooting.rollback}</strong>
          <p>{copy.troubleshooting.rollbackBody}</p>
          <code>~/.rice-backup/YYYYMMDD-HHMMSS/</code>
        </div>
      </section>
    </div>
  );
}
