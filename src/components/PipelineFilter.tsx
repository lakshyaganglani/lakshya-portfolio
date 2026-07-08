"use client";

import { filters, type FilterKey } from "@/data/profile";

export default function PipelineFilter({
  active,
  onChange,
}: {
  active: FilterKey;
  onChange: (key: FilterKey) => void;
}) {
  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by skill area">
        {filters.map((f) => {
          const isActive = active === f.key;
          return (
            <button
              key={f.key}
              onClick={() => onChange(f.key)}
              aria-pressed={isActive}
              className={`group relative rounded-md border px-3.5 py-2 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "border-signal bg-signal/10 text-signal"
                  : "border-border text-text-muted hover:text-text hover:border-text-faint"
              }`}
            >
              <span className="flex items-center gap-2">
                <span
                  className={`h-1.5 w-1.5 rounded-full transition-colors ${
                    isActive ? "bg-signal animate-pulse-slow" : "bg-text-faint"
                  }`}
                />
                {f.label}
              </span>
            </button>
          );
        })}
      </div>
      <p className="mt-3 text-sm text-text-faint font-mono">
        {filters.find((f) => f.key === active)?.description}
      </p>
    </div>
  );
}
