"use client";

import { useEffect, useState } from "react";

const MESSAGES = [
  "currently: monitoring 100+ pipelines",
  "currently: 99.5% daily success rate",
  "currently: open to data engineering roles",
  "currently: shipping on Azure Data Factory",
];

export default function StatusTicker() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % MESSAGES.length);
    }, 3200);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex items-center gap-2 h-5 overflow-hidden">
      <span className="relative flex h-1.5 w-1.5 shrink-0">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-60" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-signal" />
      </span>
      <span
        key={index}
        className="text-xs font-mono text-text-faint animate-fade-up"
      >
        {MESSAGES[index]}
      </span>
    </div>
  );
}
