"use client";

import { useEffect, useState } from "react";

/**
 * Splits given text segments into words and reveals them with a staggered
 * rise-and-fade on mount. Word delays are precomputed before render so no
 * mutable counter is touched during the render pass itself.
 */
export default function TypewriterHeadline({
  segments,
  className = "",
  wordDelayMs = 45,
}: {
  segments: { text: string; gradient?: boolean }[];
  className?: string;
  wordDelayMs?: number;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  // Precompute a flat, ordered list of word delays across all segments so
  // rendering below is a pure map with no counter mutation.
  const wordDelays: number[][] = [];
  {
    let count = 0;
    for (const seg of segments) {
      const words = seg.text.split(" ");
      wordDelays.push(words.map((_, i) => (count + i) * wordDelayMs));
      count += words.length;
    }
  }

  return (
    <h1 className={className}>
      {segments.map((seg, segIdx) => (
        <span key={segIdx} className={seg.gradient ? "text-gradient" : "text-text"}>
          {seg.text.split(" ").map((word, i) => (
            <span key={i} className="inline-block overflow-hidden align-bottom">
              <span
                className="inline-block transition-all duration-700 ease-out"
                style={{
                  transitionDelay: `${wordDelays[segIdx][i]}ms`,
                  transform: mounted ? "translateY(0)" : "translateY(110%)",
                  opacity: mounted ? 1 : 0,
                }}
              >
                {word}
                {i < seg.text.split(" ").length - 1 ? "\u00A0" : ""}
              </span>
            </span>
          ))}
          {segIdx < segments.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </h1>
  );
}
