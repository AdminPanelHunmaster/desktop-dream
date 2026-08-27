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
  guideSteps,
  packages,
  panels,
  repository,
  terminalPreview,
  thirdParty,
  troubleshooting,
  widgets,
  workspaces,
} from "@/data/rice";
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
  return (
    <div className="doc-app app-scroll">
      <AppIntro eyebrow="Appearance stack" title="Dark, square, restrained">
        The values below were read from the live system. Third-party projects stay upstream; the
        repository stores only owner configuration and an included wallpaper.
      </AppIntro>
      <section className="appearance-list">
        {appearanceFacts.map(([name, value, purpose]) => (
          <article key={name}>
            <span>{name}</span>
            <strong>{value}</strong>
            <p>{purpose}</p>
          </article>
        ))}
      </section>
      <section className="app-section">
        <div className="section-heading">
          <span>Sources</span>
          <h3>Third-party components</h3>
        </div>
        <div className="source-list">
          {thirdParty.map((item) => (
            <a key={item.name} href={item.source} target="_blank" rel="noreferrer">
              <div>
                <strong>{item.name}</strong>
                <span>{item.kind}</span>
              </div>
              <ExternalLink aria-hidden="true" />
            </a>
          ))}
        </div>
      </section>
      <section className="wallpaper-card">
        <img src="/assets/wallpapers/main-wallpaper.webp" alt="Mauve_girl rice wallpaper" />
        <div>
          <span>Included asset</span>
          <strong>Mauve_girl.webp</strong>
          <a href={rawFileUrl("rice/assets/wallpapers/Mauve_girl.webp")} download>
            <Download aria-hidden="true" />
            Download
          </a>
        </div>
      </section>
    </div>
  );
}

export function PlasmaApp() {
  return (
    <div className="doc-app app-scroll">
      <AppIntro eyebrow="Plasma shell" title="Four floating panels, two screens">
        The audited layout uses a 1920×1080 primary display and 1366×768 secondary display. Panel
        geometry is reproducible, but another monitor topology should be adjusted manually.
      </AppIntro>
      <div className="panel-stack">
        {panels.map((panel) => (
          <article key={panel.title}>
            <header>
              <MonitorCog aria-hidden="true" />
              <div>
                <strong>{panel.title}</strong>
                <span>{panel.geometry}</span>
              </div>
            </header>
            <div className="widget-flow">
              {panel.widgets.map((widget, index) => (
                <span key={widget}>
                  {widget}
                  {index < panel.widgets.length - 1 && <ArrowRight aria-hidden="true" />}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
      <section className="app-section">
        <div className="section-heading">
          <span>Widgets</span>
          <h3>Exact upstream sources</h3>
        </div>
        <div className="source-list">
          {widgets.map((widget) => (
            <a key={widget.name} href={widget.source} target="_blank" rel="noreferrer">
              <div>
                <strong>{widget.name}</strong>
                <span>{widget.purpose}</span>
              </div>
              <ExternalLink aria-hidden="true" />
            </a>
          ))}
        </div>
      </section>
      <div className="safety-note">
        <AlertTriangle aria-hidden="true" />
        <p>
          <code>--plasma-layout</code> is opt-in, backed up first, and never restarts plasmashell.
        </p>
      </div>
    </div>
  );
}

export function WorkspacesApp() {
  return (
    <div className="doc-app app-scroll">
      <AppIntro eyebrow="KWin desktops" title="Seven desktops, one row">
        Each shortcut is copied from the live <code>kglobalshortcutsrc</code>. The installer merges
        these keys instead of publishing or replacing every global shortcut.
      </AppIntro>
      <div className="workspace-map">
        {workspaces.map((workspace) => (
          <article key={workspace.desktop}>
            <kbd>{workspace.shortcut}</kbd>
            <ArrowRight aria-hidden="true" />
            <div>
              <span>Desktop</span>
              <strong>{workspace.desktop}</strong>
            </div>
          </article>
        ))}
      </div>
      <section className="app-section">
        <div className="section-heading">
          <span>Config</span>
          <h3>Where it lives</h3>
        </div>
        <div className="path-list">
          <code>~/.config/kwinrc → [Desktops] Number=7, Rows=1</code>
          <code>~/.config/kglobalshortcutsrc → [kwin] Switch to Desktop N</code>
          <code>rice/config/kde/kglobalshortcutsrc.snippet → sanitized merge source</code>
        </div>
      </section>
      <p className="app-copy">
        Try <kbd>Alt</kbd> + <kbd>1</kbd>…<kbd>7</kbd> now: the website changes its own active
        workspace without reading or changing your operating system.
      </p>
    </div>
  );
}

export function FastfetchApp() {
  return (
    <div className="fastfetch-app app-scroll">
      <div className="fastfetch-preview">
        <pre>{terminalPreview.join("\n")}</pre>
      </div>
      <section className="app-section">
        <div className="section-heading">
          <span>Ghostty</span>
          <h3>Terminal surface</h3>
        </div>
        <div className="fact-grid">
          <div className="fact-row">
            <span>Font</span>
            <strong>Agave Nerd Font 14</strong>
          </div>
          <div className="fact-row">
            <span>Background</span>
            <strong>#0d0c0d · 86%</strong>
          </div>
          <div className="fact-row">
            <span>Blur</span>
            <strong>Enabled</strong>
          </div>
          <div className="fact-row">
            <span>Padding</span>
            <strong>14 × 12</strong>
          </div>
          <div className="fact-row">
            <span>Palette</span>
            <strong>Mauve / rose / slate</strong>
          </div>
        </div>
      </section>
      <section className="app-section">
        <div className="section-heading">
          <span>Fastfetch</span>
          <h3>Audited configuration</h3>
        </div>
        <p className="app-copy">
          Uses the built-in EndeavourOS mark recolored in dusty rose, muted mauve and violet. The
          module layout covers hardware, software, media, date, uptime and weather. Device-specific
          results are generated at runtime and were never committed.
        </p>
        <Command>fastfetch --config ~/.config/fastfetch/config.jsonc</Command>
        <div className="action-row">
          <a
            className="app-button"
            href={rawFileUrl("rice/config/fastfetch/config.jsonc")}
            download
          >
            <Download aria-hidden="true" />
            Fastfetch config
          </a>
          <a className="app-button" href={rawFileUrl("rice/config/ghostty/config")} download>
            <Download aria-hidden="true" />
            Ghostty config
          </a>
        </div>
      </section>
    </div>
  );
}

export function PackagesApp() {
  return (
    <div className="doc-app app-scroll">
      <AppIntro eyebrow="Rice packages only" title="Small, explicit dependency set">
        This is not a dump of every installed package. It contains only software that materially
        contributes to the observed desktop.
      </AppIntro>
      {Object.entries(packages).map(([group, entries]) => (
        <section className="package-group" key={group}>
          <h3>{group}</h3>
          <div>
            {entries.map((entry) => (
              <article key={entry.name}>
                <div>
                  <strong>{entry.name}</strong>
                  <p>{entry.purpose}</p>
                </div>
                <code>{entry.command}</code>
                <div className="package-actions">
                  <CopyButton value={entry.command} compact />
                  <a
                    href={entry.source}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={entry.name + " source"}
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
  return (
    <div className="doc-app app-scroll">
      <AppIntro eyebrow="From clean KDE to this rice" title="Full installation path">
        Each stage says what changes, why it exists and whether it is safe to automate. The source
        system is not modified by this documentation site.
      </AppIntro>
      <ol className="guide-steps">
        {guideSteps.map((step, index) => (
          <li key={step.title}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <div>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
              {step.command && <Command>{step.command}</Command>}
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
          Read installation.md
        </a>
        <a className="app-button" href={repository.zip}>
          <Download aria-hidden="true" />
          Download all
        </a>
      </div>
    </div>
  );
}

export function TroubleshootingApp() {
  return (
    <div className="doc-app app-scroll">
      <AppIntro eyebrow="Settings & recovery" title="Diagnose before resetting">
        The doctor is read-only. Backups preserve relative paths, so one broken component can be
        restored without wiping the rest of Plasma.
      </AppIntro>
      <section className="doctor-card">
        <div>
          <ShieldCheck aria-hidden="true" />
          <div>
            <strong>Run the rice doctor</strong>
            <p>
              Checks OS, Plasma, Wayland, packages, themes, files, effects and all seven shortcuts.
            </p>
          </div>
        </div>
        <Command>bash rice/scripts/doctor.sh</Command>
        <div className="doctor-legend">
          <span>
            <CheckCircle2 /> Installed / configured
          </span>
          <span>
            <AlertTriangle /> Optional component missing
          </span>
        </div>
      </section>
      <div className="trouble-list">
        {troubleshooting.map(([title, body]) => (
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
          <strong>Rollback</strong>
          <p>
            Log out before restoring Plasma/KWin files. Inspect the timestamped directory and copy
            only the affected relative path back.
          </p>
          <code>~/.rice-backup/YYYYMMDD-HHMMSS/</code>
        </div>
      </section>
    </div>
  );
}
