import { X } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";

export function Window({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children?: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setOpen(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const close = () => {
    setOpen(false);
    setTimeout(onClose, 200);
  };

  return (
    <div
      role="dialog"
      aria-label={title}
      className={`panel-surface absolute left-1/2 top-1/2 z-10 w-[min(520px,80vw)] -translate-x-1/2 -translate-y-1/2 select-none overflow-hidden rounded-xl transition-all duration-200 ease-out ${
        open ? "translate-y-[-50%] scale-100 opacity-100" : "translate-y-[-44%] scale-[0.96] opacity-0"
      }`}
    >
      <div className="flex h-9 items-center justify-between border-b border-white/10 px-3 text-xs font-medium text-panel-foreground/80">
        <span>{title}</span>
        <button
          type="button"
          aria-label="Close window"
          onClick={close}
          className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-md outline-none transition-colors duration-150 hover:bg-white/10 hover:text-panel-foreground focus-visible:ring-2 focus-visible:ring-panel-foreground/40"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
      <div className="flex h-52 items-center justify-center text-sm text-panel-foreground/60">
        {children ?? "Application placeholder"}
      </div>
    </div>
  );
}
