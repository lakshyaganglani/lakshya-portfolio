"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Eyebrow from "@/components/Eyebrow";
import PipelineGraph from "@/components/PipelineGraph";
import PipelineFilter from "@/components/PipelineFilter";
import Badge from "@/components/Badge";
import {
  person,
  stats,
  projects,
  skillGroups,
  type FilterKey,
} from "@/data/profile";

export default function Home() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");

  const visibleProjects = useMemo(() => {
    if (activeFilter === "all") return projects;
    return projects.filter((p) => p.filters.includes(activeFilter));
  }, [activeFilter]);

  const visibleSkillGroups = useMemo(() => {
    if (activeFilter === "all") return skillGroups;
    return skillGroups.filter((g) => g.filters.includes(activeFilter));
  }, [activeFilter]);

  return (
    <div className="animate-fade-up">
      {/* Hero */}
      <section className="mb-16">
        <Eyebrow>{person.role} · Building at TCS</Eyebrow>
        <h1 className="font-display font-semibold text-4xl sm:text-5xl lg:text-6xl leading-[1.05] text-text text-balance mb-6 max-w-3xl">
          {person.tagline}
        </h1>
        <p className="text-base sm:text-lg text-text-muted max-w-2xl leading-relaxed mb-8">
          {person.resumeSummary}
        </p>
        <div className="flex flex-wrap gap-3 mb-12">
          <Link
            href="/projects"
            className="rounded-md bg-signal px-5 py-2.5 text-sm font-semibold text-bg hover:bg-signal-dim transition-colors"
          >
            View case studies
          </Link>
          <Link
            href="/contact"
            className="rounded-md border border-border px-5 py-2.5 text-sm font-semibold text-text hover:border-text-faint transition-colors"
          >
            Get in touch
          </Link>
        </div>

        <PipelineGraph />
      </section>

      {/* Stats strip */}
      <section className="mb-16 grid grid-cols-2 md:grid-cols-4 gap-px rounded-lg overflow-hidden border border-border bg-border">
        {stats.map((s) => (
          <div key={s.label} className="bg-surface p-5">
            <p className="font-display font-semibold text-2xl sm:text-3xl text-signal mb-1">
              {s.value}
            </p>
            <p className="text-xs text-text-muted leading-snug mb-2">{s.label}</p>
            <p className="text-[10px] font-mono text-text-faint truncate">{s.mono}</p>
          </div>
        ))}
      </section>

      {/* Quick filter */}
      <section className="mb-10">
        <Eyebrow>Quick filter</Eyebrow>
        <h2 className="font-display font-semibold text-2xl text-text mb-4">
          Filter by what you care about
        </h2>
        <PipelineFilter active={activeFilter} onChange={setActiveFilter} />
      </section>

      {/* Filtered skills */}
      <section className="mb-16">
        <div className="grid sm:grid-cols-2 gap-4">
          {visibleSkillGroups.map((group) => (
            <div
              key={group.group}
              className="rounded-lg border border-border bg-surface p-5 animate-fade-up"
            >
              <p className="font-display font-semibold text-sm text-text mb-3">
                {group.group}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {group.skills.map((s) => (
                  <Badge key={s}>{s}</Badge>
                ))}
              </div>
            </div>
          ))}
          {visibleSkillGroups.length === 0 && (
            <p className="text-sm text-text-faint font-mono col-span-2">
              No skill group matches this filter yet.
            </p>
          )}
        </div>
      </section>

      {/* Filtered projects preview */}
      <section>
        <Eyebrow>Relevant work</Eyebrow>
        <div className="flex items-baseline justify-between mb-5">
          <h2 className="font-display font-semibold text-2xl text-text">
            {visibleProjects.length} project{visibleProjects.length !== 1 ? "s" : ""} matched
          </h2>
          <Link
            href="/projects"
            className="text-sm font-mono text-signal hover:text-signal-dim transition-colors"
          >
            view all →
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {visibleProjects.map((p) => (
            <Link
              key={p.id}
              href="/projects"
              className="rounded-lg border border-border bg-surface p-5 hover:border-signal-dim transition-colors group animate-fade-up"
            >
              <p className="font-display font-semibold text-text mb-2 group-hover:text-signal transition-colors">
                {p.title}
              </p>
              <p className="text-sm text-text-muted leading-relaxed mb-3">{p.summary}</p>
              <div className="flex flex-wrap gap-1.5">
                {p.tech.slice(0, 3).map((t) => (
                  <Badge key={t} dim>
                    {t}
                  </Badge>
                ))}
              </div>
            </Link>
          ))}
          {visibleProjects.length === 0 && (
            <p className="text-sm text-text-faint font-mono col-span-2">
              No projects tagged for this filter yet — check back soon.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
