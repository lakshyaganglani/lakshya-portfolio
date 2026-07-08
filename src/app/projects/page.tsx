"use client";

import { useState, useMemo } from "react";
import Eyebrow from "@/components/Eyebrow";
import Badge from "@/components/Badge";
import PipelineFilter from "@/components/PipelineFilter";
import ProjectModal from "@/components/ProjectModal";
import { projects, type FilterKey, type Project } from "@/data/profile";

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");
  const [selected, setSelected] = useState<Project | null>(null);

  const visible = useMemo(() => {
    if (activeFilter === "all") return projects;
    return projects.filter((p) => p.filters.includes(activeFilter));
  }, [activeFilter]);

  return (
    <div className="animate-fade-up">
      <Eyebrow>Case studies</Eyebrow>
      <h1 className="font-display font-semibold text-4xl text-text mb-4">
        Projects & impact
      </h1>
      <p className="text-text-muted leading-relaxed mb-8 max-w-2xl">
        Each project below opens into a short case study: the problem, what I
        built, and the measurable outcome.
      </p>

      <div className="mb-10">
        <PipelineFilter active={activeFilter} onChange={setActiveFilter} />
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        {visible.map((p) => (
          <button
            key={p.id}
            onClick={() => setSelected(p)}
            className="text-left rounded-lg border border-border bg-surface p-6 hover:border-signal-dim transition-colors group flex flex-col"
          >
            <p className="text-[11px] font-mono uppercase tracking-wide text-text-faint mb-3">
              {p.status === "shipped" ? "Production system" : "Personal project"}
            </p>
            <h3 className="font-display font-semibold text-lg text-text mb-2 group-hover:text-signal transition-colors">
              {p.title}
            </h3>
            <p className="text-sm text-text-muted leading-relaxed mb-4 flex-1">
              {p.summary}
            </p>

            <div className="grid grid-cols-2 gap-2 mb-4">
              {p.impact.slice(0, 2).map((i) => (
                <div key={i.label} className="rounded-md bg-surface-hi px-3 py-2">
                  <p className="font-display font-semibold text-sm text-signal">
                    {i.metric}
                  </p>
                  <p className="text-[10px] text-text-faint leading-snug">{i.label}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-1.5 mb-4">
              {p.tech.slice(0, 4).map((t) => (
                <Badge key={t} dim>
                  {t}
                </Badge>
              ))}
            </div>

            <span className="text-sm font-mono text-signal group-hover:text-signal-dim transition-colors mt-auto">
              view case study →
            </span>
          </button>
        ))}
        {visible.length === 0 && (
          <p className="text-sm text-text-faint font-mono col-span-2">
            No projects tagged for this filter yet.
          </p>
        )}
      </div>

      {selected && (
        <ProjectModal project={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}
