"use client";

import { useRef, useState } from "react";

/**
 * Applies a subtle 3D tilt to its child based on cursor position within
 * the element. Kept small (max ~6deg) so it reads as polish, not a gimmick.
 */
export default function TiltCard({
  children,
  className = "",
  maxTilt = 6,
}: {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width; // 0..1
    const py = (e.clientY - rect.top) / rect.height; // 0..1
    const rotateY = (px - 0.5) * maxTilt * 2;
    const rotateX = (0.5 - py) * maxTilt * 2;
    setStyle({
      transform: `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`,
    });
  }

  function handleMouseLeave() {
    setStyle({
      transform: "perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0)",
    });
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`transition-transform duration-200 ease-out will-change-transform ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
