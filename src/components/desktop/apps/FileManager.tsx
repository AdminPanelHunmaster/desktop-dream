import {
  ChevronRight,
  Download,
  ExternalLink,
  File,
  FileCode2,
  Folder,
  ImageIcon,
} from "lucide-react";
import { useMemo, useState } from "react";
import { githubFileUrl, rawFileUrl, riceFiles, type RiceFile } from "@/data/rice-files";
import { CopyButton } from "./CopyButton";
import { content } from "@/data/localization";
import { useLocale } from "@/i18n/use-locale";

const folderFor = (path: string) => {
  const parts = path.split("/");
  if (parts.length <= 2) return "rice/";
  return parts.slice(0, -1).join("/");
};

function FileIcon({ file }: { file: RiceFile }) {
  return file.language === "image" ? (
    <ImageIcon aria-hidden="true" />
  ) : file.language === "text" ? (
    <File aria-hidden="true" />
  ) : (
    <FileCode2 aria-hidden="true" />
  );
}

export function FileManager() {
  const { locale } = useLocale();
  const copy = content[locale];
  const [selectedPath, setSelectedPath] = useState("rice/config/fastfetch/config.jsonc");
  const selected = riceFiles.find((file) => file.path === selectedPath) ?? riceFiles[0]!;
  const folders = useMemo(() => {
    const map = new Map<string, RiceFile[]>();
    for (const file of riceFiles) {
      const folder = folderFor(file.path);
      map.set(folder, [...(map.get(folder) ?? []), file]);
    }
    return [...map.entries()];
  }, []);

  return (
    <div className="file-manager">
      <aside className="file-sidebar" aria-label={copy.files.tree}>
        <div className="file-location">
          <Folder aria-hidden="true" />
          <span>desktop-dream</span>
        </div>
        <div className="file-tree app-scroll">
          {folders.map(([folder, files], index) => (
            <details key={folder} open={index < 5}>
              <summary>
                <ChevronRight aria-hidden="true" />
                <span>{folder}</span>
              </summary>
              <div>
                {files.map((file) => (
                  <button
                    type="button"
                    key={file.path}
                    onClick={() => setSelectedPath(file.path)}
                    className={file.path === selected.path ? "is-selected" : undefined}
                  >
                    <FileIcon file={file} />
                    <span>{file.path.split("/").at(-1)}</span>
                  </button>
                ))}
              </div>
            </details>
          ))}
        </div>
      </aside>

      <section className="code-viewer">
        <header>
          <div>
            <strong>{selected.path.split("/").at(-1)}</strong>
            <span>{selected.path}</span>
          </div>
          <div className="code-actions">
            {selected.content && <CopyButton value={selected.content} compact />}
            <a
              className="app-button"
              href={rawFileUrl(selected.path)}
              download
              title={copy.files.downloadRaw}
              aria-label={copy.files.downloadRaw}
            >
              <Download aria-hidden="true" />
            </a>
            <a
              className="app-button"
              href={githubFileUrl(selected.path)}
              target="_blank"
              rel="noreferrer"
              title={copy.common.openGithub}
              aria-label={copy.common.openGithub}
            >
              <ExternalLink aria-hidden="true" />
            </a>
          </div>
        </header>
        <div className="code-meta">
          <span>{selected.language}</span>
          <span>{selected.sizeLabel}</span>
          <span>{copy.files.repositoryCopy}</span>
        </div>
        {selected.language === "image" ? (
          <div className="wallpaper-view">
            <img src="/assets/wallpapers/main-wallpaper.webp" alt={copy.files.wallpaperAlt} />
          </div>
        ) : (
          <pre className="app-scroll">
            <code>{selected.content}</code>
          </pre>
        )}
      </section>
    </div>
  );
}
