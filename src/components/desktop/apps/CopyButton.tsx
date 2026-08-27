import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";

export function CopyButton({
  value,
  label = "Copy",
  compact = false,
}: {
  value: string;
  label?: string;
  compact?: boolean;
}) {
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

  const labelText = status === "copied" ? "Copied" : status === "failed" ? "Copy failed" : label;

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
