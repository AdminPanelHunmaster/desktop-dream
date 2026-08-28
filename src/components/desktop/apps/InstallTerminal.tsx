import { ExternalLink, Languages, ShieldCheck } from "lucide-react";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { repository } from "@/data/rice";
import {
  commandGroups,
  descriptionFor,
  endeavourAscii,
  fastfetchHardware,
  fastfetchSoftware,
  fortunes,
  terminalCopy,
  type TerminalLocale,
} from "@/data/terminal";

type EntryKind = "welcome" | "text" | "help" | "fastfetch" | "train" | "cava" | "matrix" | "github";

type TerminalEntry = {
  id: number;
  command?: string;
  kind: EntryKind;
  locale: TerminalLocale;
  text?: string;
};

type ActiveProcess = { id: number; kind: "cava" | "matrix" } | null;

const prompt = (
  <>
    <span className="terminal-user">demo@endeavour</span>
    <span className="terminal-separator">:</span>
    <span className="terminal-path">~/desktop-dream</span>
    <span className="terminal-separator">$</span>
  </>
);

function Welcome({ locale }: { locale: TerminalLocale }) {
  const copy = terminalCopy[locale];
  return (
    <div className="terminal-welcome">
      <strong>{copy.welcome}</strong>
      <p>{copy.demo}</p>
      <p>{copy.noExecution}</p>
      <p className="terminal-welcome-hint">{copy.hint}</p>
    </div>
  );
}

function Help({ locale }: { locale: TerminalLocale }) {
  return (
    <div className="terminal-help" aria-label="Available demo commands">
      {commandGroups.map((group) => (
        <section key={group.title}>
          <strong>{group.title}</strong>
          {group.commands.map((command) => (
            <div key={command}>
              <code>{command}</code>
              <span>{descriptionFor(locale, command)}</span>
            </div>
          ))}
        </section>
      ))}
    </div>
  );
}

function FastfetchFrame({
  title,
  items,
}: {
  title: string;
  items: ReadonlyArray<readonly [string, string]>;
}) {
  return (
    <fieldset className="fastfetch-frame">
      <legend>{title}</legend>
      <div>
        {items.map(([icon, value]) => (
          <p key={value}>
            <span aria-hidden="true">{icon}</span>
            <span>{value}</span>
          </p>
        ))}
      </div>
    </fieldset>
  );
}

function DemoFastfetch({ locale }: { locale: TerminalLocale }) {
  const copy = terminalCopy[locale];
  return (
    <section className="fastfetch-demo" aria-label="Static Desktop Dream Fastfetch demonstration">
      <header>
        <span>{copy.demoBadge}</span>
        <small>{copy.fastfetchNote}</small>
      </header>
      <div className="fastfetch-layout">
        <pre className="fastfetch-ascii" aria-label="EndeavourOS ASCII logo">
          {endeavourAscii.join("\n")}
        </pre>
        <div className="fastfetch-information">
          <p className="fastfetch-quote">And the Meek shall inherit the Earth...</p>
          <FastfetchFrame title="Hardware" items={fastfetchHardware} />
          <FastfetchFrame title="Software" items={fastfetchSoftware} />
        </div>
      </div>
    </section>
  );
}

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function Train({ locale }: { locale: TerminalLocale }) {
  const [finished, setFinished] = useState(false);
  return (
    <div className="train-demo" aria-label="ASCII steam locomotive demo">
      {!finished ? (
        <pre className="train-sprite" onAnimationEnd={() => setFinished(true)}>
          {`      ====        ________                ___________
  _D _|  |_______/        \\__I_I_____===__|_________|
   |(_)---  |   H\\________/ |   |        =|___ ___|      _________________
   /     |  |   H  |  |     |   |         ||_| |_||     _|                \\_____A
  |      |  |   H  |__--------------------| [___] |   =|                        |
  | ________|___H__/__|_____/[][]~\\_______|       |   -|                        |
  |/ |   |-----------I_____I [][] []  D   |=======|____|________________________|_
__/ =| o |=-~~\\  /~~\\  /~~\\  /~~\\ ____Y___________|__|__________________________|
 |/-=|___|=    ||    ||    ||    |_____/~\\___/          |_D__D__D_|  |_D__D__D_|
  \\_/      \\O=====O=====O=====O_/      \\_/               \\_/   \\_/    \\_/   \\_/`}
        </pre>
      ) : (
        <p className="terminal-muted">{terminalCopy[locale].trainDone}</p>
      )}
    </div>
  );
}

function Cava({ running, locale }: { running: boolean; locale: TerminalLocale }) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (!running || prefersReducedMotion()) return;
    const timer = window.setInterval(() => setTick((value) => value + 1), 110);
    return () => window.clearInterval(timer);
  }, [running]);

  const levels = "▁▂▃▄▅▆▇█";
  const bars = Array.from({ length: 28 }, (_, index) => {
    const wave = Math.sin((index + tick) * 0.72) + Math.sin((index - tick * 1.4) * 0.29);
    return levels[Math.max(0, Math.min(7, Math.round((wave + 2) * 1.75)))]!;
  });

  return (
    <div className="terminal-process" aria-live="off">
      <pre>{terminalCopy[locale].cava}</pre>
      <div className="cava-bars" aria-label="Decorative demo visualizer">
        {bars.map((bar, index) => (
          <span key={index}>{bar}</span>
        ))}
      </div>
    </div>
  );
}

const matrixAlphabet = "01アイウエオカキクケコサシスセソ";

function createMatrixLine(length: number, offset: number) {
  return Array.from(
    { length },
    (_, index) =>
      matrixAlphabet[(index * 7 + offset * 3 + Math.floor(offset / 2)) % matrixAlphabet.length],
  ).join("");
}

function Matrix({ running, locale }: { running: boolean; locale: TerminalLocale }) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (!running || prefersReducedMotion()) return;
    const timer = window.setInterval(() => setTick((value) => value + 1), 125);
    return () => window.clearInterval(timer);
  }, [running]);

  return (
    <div className="terminal-process" aria-live="off">
      <pre>{terminalCopy[locale].matrix}</pre>
      <pre className="matrix-demo" aria-label="Decorative Matrix animation">
        {Array.from({ length: 7 }, (_, row) => createMatrixLine(42, tick + row * 5)).join("\n")}
      </pre>
    </div>
  );
}

function Entry({
  entry,
  locale,
  activeProcess,
}: {
  entry: TerminalEntry;
  locale: TerminalLocale;
  activeProcess: ActiveProcess;
}) {
  const entryLocale = entry.kind === "welcome" ? locale : entry.locale;
  return (
    <article className="terminal-entry">
      {entry.command && (
        <div className="terminal-history-command">
          {prompt} <span>{entry.command}</span>
        </div>
      )}
      {entry.kind === "welcome" && <Welcome locale={entryLocale} />}
      {entry.kind === "text" && <pre className="terminal-text-output">{entry.text}</pre>}
      {entry.kind === "help" && <Help locale={entryLocale} />}
      {entry.kind === "fastfetch" && <DemoFastfetch locale={entryLocale} />}
      {entry.kind === "train" && <Train locale={entryLocale} />}
      {entry.kind === "cava" && (
        <Cava running={activeProcess?.id === entry.id} locale={entryLocale} />
      )}
      {entry.kind === "matrix" && (
        <Matrix running={activeProcess?.id === entry.id} locale={entryLocale} />
      )}
      {entry.kind === "github" && (
        <a className="terminal-link" href={repository.url} target="_blank" rel="noreferrer">
          {entry.text}
          <ExternalLink aria-hidden="true" />
        </a>
      )}
    </article>
  );
}

export function InstallTerminal({ onOpenGuide }: { onOpenGuide: () => void }) {
  const [locale, setLocale] = useState<TerminalLocale>("en");
  const [entries, setEntries] = useState<TerminalEntry[]>([
    { id: 0, kind: "welcome", locale: "en" },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [activeProcess, setActiveProcess] = useState<ActiveProcess>(null);
  const nextId = useRef(1);
  const draft = useRef("");
  const inputRef = useRef<HTMLInputElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (navigator.language.toLowerCase().startsWith("ru")) setLocale("ru");
  }, []);

  useEffect(() => {
    const screen = screenRef.current;
    if (!screen) return;
    screen.scrollTo({
      top: screen.scrollHeight,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  }, [entries, activeProcess]);

  const append = (entry: Omit<TerminalEntry, "id" | "locale">) => {
    const created = { ...entry, id: nextId.current++, locale };
    setEntries((current) => [...current, created]);
    return created.id;
  };

  const stopProcess = () => {
    if (!activeProcess) return;
    setActiveProcess(null);
    append({ kind: "text", text: terminalCopy[locale].stopped });
  };

  const runCommand = (rawCommand: string) => {
    const command = rawCommand.trim().toLowerCase().replace(/\s+/g, " ");
    if (!command || activeProcess) return;

    setHistory((current) => [...current, rawCommand]);
    setHistoryIndex(history.length + 1);
    draft.current = "";

    if (command === "clear") {
      setEntries([]);
      return;
    }

    if (command === "help") append({ command: rawCommand, kind: "help" });
    else if (command === "fastfetch") append({ command: rawCommand, kind: "fastfetch" });
    else if (command === "date") {
      append({
        command: rawCommand,
        kind: "text",
        text: new Intl.DateTimeFormat(locale === "ru" ? "ru-RU" : "en-GB", {
          dateStyle: "full",
        }).format(new Date()),
      });
    } else if (command === "time") {
      append({
        command: rawCommand,
        kind: "text",
        text: new Intl.DateTimeFormat(locale === "ru" ? "ru-RU" : "en-GB", {
          timeStyle: "medium",
        }).format(new Date()),
      });
    } else if (command === "whoami") append({ command: rawCommand, kind: "text", text: "demo" });
    else if (command === "uname") {
      append({
        command: rawCommand,
        kind: "text",
        text: "Linux desktop-dream 7.1.9-arch1-2 #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux (demo)",
      });
    } else if (command === "pwd") {
      append({ command: rawCommand, kind: "text", text: "/home/demo/desktop-dream" });
    } else if (command === "ls") {
      append({ command: rawCommand, kind: "text", text: "about.txt  rice/  configs/  guide/" });
    } else if (command === "cat about.txt") {
      append({ command: rawCommand, kind: "text", text: terminalCopy[locale].about });
    } else if (command === "rice") {
      append({ command: rawCommand, kind: "text", text: terminalCopy[locale].rice });
    } else if (command === "guide") {
      append({ command: rawCommand, kind: "text", text: terminalCopy[locale].guide });
      onOpenGuide();
    } else if (command === "github") {
      append({ command: rawCommand, kind: "github", text: terminalCopy[locale].github });
      window.open(repository.url, "_blank", "noopener,noreferrer");
    } else if (command === "sl") append({ command: rawCommand, kind: "train" });
    else if (command === "cava" || command === "cmatrix") {
      const kind = command === "cava" ? "cava" : "matrix";
      const id = append({ command: rawCommand, kind });
      setActiveProcess({ id, kind });
    } else if (command === "fortune") {
      const choices = fortunes[locale];
      append({
        command: rawCommand,
        kind: "text",
        text: choices[Math.floor(Math.random() * choices.length)],
      });
    } else {
      append({ command: rawCommand, kind: "text", text: terminalCopy[locale].unknown(rawCommand) });
    }
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.ctrlKey && event.key.toLowerCase() === "c") {
      if (activeProcess) {
        event.preventDefault();
        stopProcess();
      }
      return;
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (!history.length) return;
      if (historyIndex >= history.length) draft.current = input;
      const next = Math.max(0, Math.min(history.length - 1, historyIndex - 1));
      setHistoryIndex(next);
      setInput(history[next] ?? "");
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      if (!history.length) return;
      const next = Math.min(history.length, historyIndex + 1);
      setHistoryIndex(next);
      setInput(next === history.length ? draft.current : (history[next] ?? ""));
    }
  };

  const copy = terminalCopy[locale];
  return (
    <div className="terminal-app interactive-terminal" onClick={() => inputRef.current?.focus()}>
      <header className="terminal-toolbar">
        <div>
          <ShieldCheck aria-hidden="true" />
          <span>{copy.demoBadge}</span>
        </div>
        <div className="terminal-locale" aria-label={copy.language}>
          <Languages aria-hidden="true" />
          {(["en", "ru"] as const).map((language) => (
            <button
              type="button"
              key={language}
              className={language === locale ? "is-active" : undefined}
              aria-pressed={language === locale}
              onClick={(event) => {
                event.stopPropagation();
                setLocale(language);
              }}
            >
              {language.toUpperCase()}
            </button>
          ))}
        </div>
      </header>
      <div ref={screenRef} className="terminal-screen app-scroll" role="log" aria-live="polite">
        {entries.map((entry) => (
          <Entry key={entry.id} entry={entry} locale={locale} activeProcess={activeProcess} />
        ))}
        <form
          className="terminal-input-row"
          onSubmit={(event) => {
            event.preventDefault();
            const command = input;
            setInput("");
            runCommand(command);
          }}
        >
          <label htmlFor="desktop-dream-command">{prompt}</label>
          <input
            ref={inputRef}
            id="desktop-dream-command"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={onKeyDown}
            autoComplete="off"
            autoCapitalize="none"
            spellCheck={false}
            aria-label={copy.ariaInput}
            placeholder={activeProcess ? "Ctrl+C" : copy.placeholder}
            readOnly={Boolean(activeProcess)}
            autoFocus
          />
        </form>
      </div>
    </div>
  );
}
