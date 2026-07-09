"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A small glowing cursor-follower, desktop only (checks for fine pointer +
 * hover support so it never activates on touch devices). Trails the real
 * cursor with slight lag via lerp, and scales up over interactive elements.
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [hoveringInteractive, setHoveringInteractive] = useState(false);

  useEffect(() => {
    const supportsFinePointer = window.matchMedia(
      "(pointer: fine) and (hover: hover)"
    ).matches;
    queueMicrotask(() => setEnabled(supportsFinePointer));
  }, []);

  useEffect(() => {
    if (!enabled) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let raf: number;

    function onMouseMove(e: MouseEvent) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
      }
      const target = e.target as HTMLElement;
      setHoveringInteractive(
        !!target.closest('a, button, [role="button"], input, textarea')
      );
    }

    function tick() {
      // Lerp the ring toward the real cursor position for a soft trailing feel.
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px)`;
      }
      raf = requestAnimationFrame(tick);
    }

    window.addEventListener("mousemove", onMouseMove);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[100] h-1.5 w-1.5 rounded-full bg-signal pointer-events-none -translate-x-1/2 -translate-y-1/2"
        aria-hidden="true"
      />
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 z-[100] rounded-full border pointer-events-none -translate-x-1/2 -translate-y-1/2 transition-[width,height,opacity,border-color] duration-200 ${
          hoveringInteractive
            ? "h-9 w-9 border-signal opacity-80"
            : "h-6 w-6 border-signal-dim opacity-50"
        }`}
        aria-hidden="true"
      />
    </>
  );
}
