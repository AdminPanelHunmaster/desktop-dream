import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";
import { content } from "@/data/localization";
import { useLocale } from "@/i18n/use-locale";

export function CopyButton({
  value,
  label,
  compact = false,
}: {
  value: string;
  label?: string;
  compact?: boolean;
}) {
  const { locale } = useLocale();
  const copyText = content[locale].common;
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");

  useEffect(() => {
    if (status === "idle") return;
    const timeout = window.setTimeout(() => setStatus("idle"), 1600);
    return () => window.clearTimeout(timeout);
  }, [status]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
  };

  const labelText =
    status === "copied"
      ? copyText.copied
      : status === "failed"
        ? copyText.copyFailed
        : (label ?? copyText.copy);

  return (
    <button
      type="button"
      onClick={() => void copy()}
      className="app-button"
      aria-label={labelText}
      title={labelText}
    >
      {status === "copied" ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
      {!compact && <span>{labelText}</span>}
    </button>
  );
}
