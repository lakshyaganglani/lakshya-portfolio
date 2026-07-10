"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Badge from "@/components/Badge";
import CountUp from "@/components/CountUp";
import Reveal from "@/components/Reveal";
import { recommenderPriorities, projects } from "@/data/profile";

export default function ProjectRecommender() {
  const [selected, setSelected] = useState<string[]>([]);

  function toggle(key: string) {
    setSelected((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  }

  const ranked = useMemo(() => {
    if (selected.length === 0) return [];

    const scores = new Map<string, number>();
    for (const p of projects) scores.set(p.id, 0);

    for (const key of selected) {
      const priority = recommenderPriorities.find((r) => r.key === key);
      if (!priority) continue;
      for (const [projectId, weight] of Object.entries(priority.weights)) {
        scores.set(projectId, (scores.get(projectId) ?? 0) + weight);
      }
    }

    return projects
      .map((p) => ({ project: p, score: scores.get(p.id) ?? 0 }))
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score);
  }, [selected]);

  const topScore = ranked[0]?.score ?? 0;

  return (
    <div>
      <div className="rounded-lg border border-border bg-surface p-5 mb-6">
        <p className="text-xs font-mono uppercase tracking-wide text-text-faint mb-1">
          How it works
        </p>
        <p className="text-sm text-text-muted leading-relaxed">
          Pick what matters most to you. This runs a simple, transparent
          weighted-match against my real project tags — no external model,
          nothing sent off-device. Just a fast way to skip to the project
          that&apos;s actually relevant to you.
        </p>
      </div>

      <p className="text-xs font-mono uppercase tracking-wide text-text-faint mb-3">
        What are you looking for?
      </p>
      <div className="flex flex-wrap gap-2 mb-8" role="group" aria-label="Select priorities">
        {recommenderPriorities.map((priority) => {
          const isActive = selected.includes(priority.key);
          return (
            <button
              key={priority.key}
              onClick={() => toggle(priority.key)}
              aria-pressed={isActive}
              className={`rounded-md border px-3.5 py-2 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "border-signal bg-signal/10 text-signal"
                  : "border-border text-text-muted hover:text-text hover:border-text-faint"
              }`}
            >
              {priority.label}
            </button>
          );
        })}
      </div>

      {selected.length === 0 && (
        <p className="text-sm text-text-faint font-mono">
          Select one or more priorities above to see a ranked match.
        </p>
      )}

      {selected.length > 0 && ranked.length === 0 && (
        <p className="text-sm text-text-faint font-mono">
          No strong match for that combination yet — try a different priority.
        </p>
      )}

      <div className="flex flex-col gap-4">
        {ranked.map(({ project, score }, i) => (
          <Reveal key={project.id} delay={i * 80}>
            <Link
              href="/projects"
              className="block rounded-lg border border-border bg-surface p-5 hover:border-signal-dim transition-colors group"
            >
              <div className="flex items-start justify-between gap-4 mb-2">
                <p className="font-display font-semibold text-text group-hover:text-signal transition-colors">
                  {project.title}
                </p>
                <div className="shrink-0 text-right">
                  <p className="font-mono text-xs text-signal">
                    {i === 0 ? "Best match" : "Also relevant"}
                  </p>
                  <p className="font-mono text-[10px] text-text-faint">
                    match score: <CountUp value={`${score}`} />/{topScore || 1}
                  </p>
                </div>
              </div>
              <p className="text-sm text-text-muted leading-relaxed mb-3">
                {project.summary}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {project.tech.slice(0, 4).map((t) => (
                  <Badge key={t} dim>
                    {t}
                  </Badge>
                ))}
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
