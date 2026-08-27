import { Download, ExternalLink, ShieldCheck } from "lucide-react";
import { repository, systemFacts } from "@/data/rice";
import { CopyButton } from "./CopyButton";

const cloneCommand = "git clone " + repository.url + ".git\ncd " + repository.name;
const installCommand = "bash rice/scripts/install.sh";
const fullCommand = "bash rice/scripts/install.sh --packages --aur --apply-kde --plasma-layout";

function TerminalCommand({ command, prompt = "$" }: { command: string; prompt?: string }) {
  return (
    <div className="terminal-command">
      <pre>
        <span aria-hidden="true" className="terminal-prompt">
          {prompt}{" "}
        </span>
        {command}
      </pre>
      <CopyButton value={command} compact />
    </div>
  );
}

export function InstallTerminal() {
  return (
    <div className="terminal-app app-scroll">
      <div className="terminal-output" aria-label="Installation terminal">
        <p>
          <span className="terminal-prompt">user@endeavour</span>
          <span className="text-white/45">:</span>
          <span className="text-[#c98eaa]">~/desktop-dream</span>
          <span className="text-white/45">$</span> ./welcome
        </p>
        <p className="mt-3 text-white/90">
          Desktop Dream — a reproducible KDE Plasma rice, not a mock download.
        </p>
        <p className="mt-1 max-w-2xl text-white/55">
          The repository contains sanitized copies of the audited configs. Existing user files are
          backed up before the future installer writes anything.
        </p>
      </div>

      <section className="app-section">
        <div className="section-heading">
          <span>01</span>
          <h2>System requirements</h2>
        </div>
        <div className="fact-grid">
          {systemFacts.map(([label, value]) => (
            <div key={label} className="fact-row">
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="app-section">
        <div className="section-heading">
          <span>02</span>
          <h2>Clone</h2>
        </div>
        <TerminalCommand command={cloneCommand} />
      </section>

      <section className="app-section">
        <div className="section-heading">
          <span>03</span>
          <h2>Safe install</h2>
        </div>
        <p className="app-copy">
          Installs the wallpaper, Ghostty and Fastfetch after a timestamped backup. KDE, packages
          and the monitor-specific panel snapshot remain opt-in.
        </p>
        <TerminalCommand command={installCommand} />
        <details className="terminal-details">
          <summary>Full reproduction command</summary>
          <p>Read the guide first. The panel snapshot was captured from 1920×1080 + 1366×768.</p>
          <TerminalCommand command={fullCommand} />
        </details>
      </section>

      <section className="app-section">
        <div className="section-heading">
          <span>04</span>
          <h2>Get the files</h2>
        </div>
        <div className="action-row">
          <a className="app-button app-button-primary" href={repository.zip}>
            <Download aria-hidden="true" />
            Download ZIP
          </a>
          <a className="app-button" href={repository.riceTree} target="_blank" rel="noreferrer">
            <ExternalLink aria-hidden="true" />
            Open rice/ on GitHub
          </a>
        </div>
        <div className="safety-note">
          <ShieldCheck aria-hidden="true" />
          <p>
            No secrets, Wi-Fi profiles, monitor EDIDs, activity UUIDs or compiled third-party
            plugins are included.
          </p>
        </div>
      </section>
    </div>
  );
}
