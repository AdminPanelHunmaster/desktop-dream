import { Minus, X } from "lucide-react";
import {
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";

export type WindowSize = "medium" | "large" | "wide";

export function Window({
  title,
  onClose,
  onMinimize,
  onFocus,
  active,
  zIndex,
  size = "large",
  initialOffset = { x: 0, y: 0 },
  children,
}: {
  title: string;
  onClose: () => void;
  onMinimize: () => void;
  onFocus: () => void;
  active: boolean;
  zIndex: number;
  size?: WindowSize;
  initialOffset?: { x: number; y: number };
  children?: ReactNode;
}) {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState(initialOffset);
  const drag = useRef<{
    pointerId: number;
    x: number;
    y: number;
    originX: number;
    originY: number;
  } | null>(null);

  useEffect(() => {
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const beginDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    onFocus();
    drag.current = {
      pointerId: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      originX: position.x,
      originY: position.y,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const moveDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    const state = drag.current;
    if (!state || state.pointerId !== event.pointerId) return;
    const maxX = Math.max(0, window.innerWidth / 2 - 96);
    const maxY = Math.max(0, window.innerHeight / 2 - 82);
    setPosition({
      x: Math.min(maxX, Math.max(-maxX, state.originX + event.clientX - state.x)),
      y: Math.min(maxY, Math.max(-maxY, state.originY + event.clientY - state.y)),
    });
  };

  const endDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (drag.current?.pointerId === event.pointerId) drag.current = null;
  };

  const close = () => {
    setVisible(false);
    window.setTimeout(onClose, 180);
  };

  const minimize = () => {
    setVisible(false);
    window.setTimeout(onMinimize, 160);
  };

  return (
    <section
      role="dialog"
      aria-label={title}
      aria-modal="false"
      onPointerDown={onFocus}
      className={[
        "desktop-window",
        "window-" + size,
        active ? "is-active" : "",
        visible ? "is-visible" : "",
      ].join(" ")}
      style={{
        zIndex,
        left: "calc(50% + " + position.x + "px)",
        top: "calc(50% + " + position.y + "px)",
      }}
    >
      <div
        className="window-titlebar"
        onPointerDown={beginDrag}
        onPointerMove={moveDrag}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <span>{title}</span>
        <div className="window-controls">
          <button
            type="button"
            aria-label={"Minimize " + title}
            onPointerDown={(event) => event.stopPropagation()}
            onClick={minimize}
          >
            <Minus aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label={"Close " + title}
            onPointerDown={(event) => event.stopPropagation()}
            onClick={close}
          >
            <X aria-hidden="true" />
          </button>
        </div>
      </div>
      <div className="window-content">{children}</div>
    </section>
  );
}
