"use client";

import { useEffect, useState } from "react";

export default function DrawnMark({ className = "" }: { className?: string }) {
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setDrawn(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      {/* A simple node-and-path motif echoing the pipeline theme */}
      <path
        d="M8 48 L8 32 L24 32 L24 16 L40 16 L40 40 L56 40 L56 24"
        stroke="var(--color-signal)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={100}
        style={{
          strokeDasharray: 100,
          strokeDashoffset: drawn ? 0 : 100,
          transition: "stroke-dashoffset 1.4s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      />
      {[
        [8, 48],
        [24, 32],
        [40, 16],
        [56, 24],
      ].map(([cx, cy], i) => (
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r="3"
          fill="var(--color-bg)"
          stroke="var(--color-signal)"
          strokeWidth="2"
          style={{
            opacity: drawn ? 1 : 0,
            transition: `opacity 0.3s ease-out ${0.3 + i * 0.28}s`,
          }}
        />
      ))}
    </svg>
  );
}
