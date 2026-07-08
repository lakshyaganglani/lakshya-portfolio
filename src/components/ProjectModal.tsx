"use client";

import { useEffect, useRef } from "react";
import Badge from "@/components/Badge";
import type { Project } from "@/data/profile";

export default function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
    >
      <div
        className="absolute inset-0 bg-bg/80 backdrop-blur-sm animate-fade-up"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-lg border border-border bg-surface p-6 sm:p-8 animate-fade-up">
        <button
          ref={closeRef}
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-5 right-5 flex h-8 w-8 items-center justify-center rounded-md border border-border text-text-muted hover:text-signal hover:border-signal-dim transition-colors"
        >
          ×
        </button>

        <p className="text-xs font-mono uppercase tracking-wide text-signal mb-2">
          {project.status === "shipped" ? "Production system" : "Personal project"}
        </p>
        <h2
          id="project-modal-title"
          className="font-display font-semibold text-2xl sm:text-3xl text-text mb-6 pr-10"
        >
          {project.title}
        </h2>

        <div className="grid gap-6 mb-6">
          <div>
            <p className="text-xs font-mono uppercase tracking-wide text-text-faint mb-2">
              Problem
            </p>
            <p className="text-sm text-text-muted leading-relaxed">{project.problem}</p>
          </div>
          <div>
            <p className="text-xs font-mono uppercase tracking-wide text-text-faint mb-2">
              Solution
            </p>
            <p className="text-sm text-text-muted leading-relaxed">{project.solution}</p>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-xs font-mono uppercase tracking-wide text-text-faint mb-3">
            Measurable impact
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-px rounded-md overflow-hidden border border-border bg-border">
            {project.impact.map((i) => (
              <div key={i.label} className="bg-surface-hi p-3">
                <p className="font-display font-semibold text-lg text-signal">{i.metric}</p>
                <p className="text-[11px] text-text-muted leading-snug">{i.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-mono uppercase tracking-wide text-text-faint mb-2">
            Stack
          </p>
          <div className="flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <Badge key={t}>{t}</Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
