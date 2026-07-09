"use client";

import { pipelineNodes } from "@/data/profile";

export default function PipelineGraph() {
  return (
    <div className="w-full overflow-x-auto">
      <div className="flex items-stretch gap-0 min-w-[560px] md:min-w-0">
        {pipelineNodes.map((node, i) => (
          <div key={node.id} className="flex items-stretch flex-1">
            <div
              className="flex-1 rounded-lg border border-border bg-surface p-4 hover:border-signal-dim hover:-translate-y-0.5 transition-all duration-300 animate-node-in"
              style={{ animationDelay: `${i * 150}ms` }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="h-1.5 w-1.5 rounded-full bg-signal animate-pulse-slow" />
                <span className="text-[11px] font-mono text-text-faint">
                  0{i + 1}
                </span>
              </div>
              <p className="font-display font-semibold text-sm text-text mb-1">
                {node.label}
              </p>
              <p className="text-xs text-text-muted leading-snug">{node.detail}</p>
            </div>
            {i < pipelineNodes.length - 1 && (
              <div
                className="relative flex items-center px-1.5 animate-node-in"
                style={{ animationDelay: `${i * 150 + 100}ms` }}
                aria-hidden="true"
              >
                <svg width="24" height="12" viewBox="0 0 24 12" fill="none" overflow="visible">
                  <line
                    x1="0"
                    y1="6"
                    x2="18"
                    y2="6"
                    stroke="var(--color-signal-dim)"
                    strokeWidth="1.5"
                    strokeDasharray="3 3"
                    className="animate-dash"
                  />
                  <path
                    d="M15 2L19 6L15 10"
                    stroke="var(--color-signal-dim)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                  {/* Traveling pulse dot along the connector, staggered per-connector */}
                  <circle r="2" fill="var(--color-signal)">
                    <animateMotion
                      dur="2.2s"
                      repeatCount="indefinite"
                      begin={`${i * 0.5}s`}
                      path="M0,6 L18,6"
                    />
                    <animate
                      attributeName="opacity"
                      values="0;1;1;0"
                      keyTimes="0;0.1;0.85;1"
                      dur="2.2s"
                      repeatCount="indefinite"
                      begin={`${i * 0.5}s`}
                    />
                  </circle>
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
