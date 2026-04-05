"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot = dotRef.current!;
    const ring = ringRef.current!;

    const onMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      dot.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      ring.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const hit = !!t.closest('a, button, [role="button"], input, textarea, select, [data-cursor="pointer"]');
      ring.classList.toggle("cursor-hover", hit);
      dot.classList.toggle("cursor-hover", hit);
    };

    const onDown = () => {
      dot.classList.add("cursor-click");
      ring.classList.add("cursor-click");
    };
    const onUp = () => {
      dot.classList.remove("cursor-click");
      ring.classList.remove("cursor-click");
    };

    const onLeave = () => {
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };
    const onEnter = () => {
      dot.style.opacity = "1";
      ring.style.opacity = "1";
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true, capture: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver, true);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, []);

  return (
    <>
      <style jsx global>{`
        body:has(.cursor-dot) *,
        body:has(.cursor-dot) *::before,
        body:has(.cursor-dot) *::after {
          cursor: none !important;
        }
        @media (pointer: coarse) {
          .cursor-dot, .cursor-ring { display: none !important; }
          body *,
          body *::before,
          body *::after {
            cursor: auto !important;
          }
        }
      `}</style>
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "rgba(99,102,241,0.9)",
          pointerEvents: "none",
          zIndex: 9999,
          willChange: "transform",
          transition: "width 0.15s, height 0.15s, background 0.15s, opacity 0.15s",
        }}
      />
      <div
        ref={ringRef}
        className="cursor-ring"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 28,
          height: 28,
          borderRadius: "50%",
          border: "1.5px solid rgba(99,102,241,0.3)",
          pointerEvents: "none",
          zIndex: 9998,
          willChange: "transform",
          transition: "width 0.12s, height 0.12s, border 0.12s, opacity 0.15s",
        }}
      />
      <style jsx global>{`
        .cursor-ring.cursor-hover {
          width: 40px !important;
          height: 40px !important;
          border-color: rgba(99,102,241,0.5) !important;
          border-width: 2px !important;
        }
        .cursor-dot.cursor-hover {
          width: 5px !important;
          height: 5px !important;
          background: rgba(99,102,241,1) !important;
        }
        .cursor-ring.cursor-click {
          width: 20px !important;
          height: 20px !important;
          border-color: rgba(99,102,241,0.6) !important;
        }
        .cursor-dot.cursor-click {
          width: 4px !important;
          height: 4px !important;
        }
      `}</style>
    </>
  );
}
