"use client";

import { useEffect, useState } from "react";
import { useInView } from "@/hooks/useInView";

/**
 * Animates a numeric value from 0 to its target when scrolled into view.
 * Parses strings like "99.5%", "100+", "60%" — animates the numeric part,
 * preserves prefix/suffix characters (%, +, etc.) as-is.
 */
export default function CountUp({
  value,
  duration = 1200,
}: {
  value: string;
  duration?: number;
}) {
  const { ref, inView } = useInView<HTMLSpanElement>(0.4);
  const [display, setDisplay] = useState("0");

  const match = value.match(/^([^\d]*)([\d.]+)(.*)$/);
  const prefix = match?.[1] ?? "";
  const target = match ? parseFloat(match[2]) : 0;
  const suffix = match?.[3] ?? "";
  const decimals = match?.[2].includes(".") ? match[2].split(".")[1].length : 0;

  useEffect(() => {
    if (!inView || !match) {
      if (!match) queueMicrotask(() => setDisplay(value));
      return;
    }

    let raf: number;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;
      setDisplay(current.toFixed(decimals));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <span ref={ref}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
