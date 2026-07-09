"use client";

import { techMatrix } from "@/data/profile";
import Reveal from "@/components/Reveal";

const LEVEL_LABEL: Record<string, string> = {
  core: "Core",
  working: "Working",
  learning: "Learning",
};

const LEVEL_DOTS: Record<string, number> = {
  core: 3,
  working: 2,
  learning: 1,
};

export default function TechMatrix() {
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {techMatrix.map((row, i) => (
        <Reveal key={row.category} delay={i * 80}>
          <div className="h-full rounded-lg border border-border bg-surface p-5">
            <p className="font-display font-semibold text-sm text-text mb-4">
              {row.category}
            </p>
            <div className="flex flex-col gap-2.5">
              {row.tools.map((tool) => (
                <div
                  key={tool.name}
                  className="flex items-center justify-between gap-3 group"
                >
                  <span className="text-sm text-text-muted group-hover:text-text transition-colors">
                    {tool.name}
                  </span>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[10px] font-mono text-text-faint hidden sm:inline">
                      {LEVEL_LABEL[tool.level]}
                    </span>
                    <div className="flex gap-0.5" aria-hidden="true">
                      {[1, 2, 3].map((dot) => (
                        <span
                          key={dot}
                          className={`h-1.5 w-1.5 rounded-full transition-colors ${
                            dot <= LEVEL_DOTS[tool.level]
                              ? "bg-signal"
                              : "bg-border"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
