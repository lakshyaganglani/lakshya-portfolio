"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Eyebrow from "@/components/Eyebrow";
import PipelineGraph from "@/components/PipelineGraph";
import PipelineFilter from "@/components/PipelineFilter";
import Badge from "@/components/Badge";
import Reveal from "@/components/Reveal";
import CountUp from "@/components/CountUp";
import Magnetic from "@/components/Magnetic";
import TiltCard from "@/components/TiltCard";
import StatusTicker from "@/components/StatusTicker";
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
        <p className="text-base sm:text-lg text-text-muted max-w-2xl leading-relaxed mb-5">
          {person.resumeSummary}
        </p>
        <div className="mb-8">
          <StatusTicker />
        </div>
        <div className="flex flex-wrap gap-3 mb-12">
          <Magnetic>
            <Link
              href="/projects"
              className="inline-block rounded-md bg-signal px-5 py-2.5 text-sm font-semibold text-bg hover:bg-signal-dim transition-colors"
            >
              View case studies
            </Link>
          </Magnetic>
          <Magnetic strength={0.2}>
            <Link
              href="/contact"
              className="inline-block rounded-md border border-border px-5 py-2.5 text-sm font-semibold text-text hover:border-text-faint transition-colors"
            >
              Get in touch
            </Link>
          </Magnetic>
        </div>

        <PipelineGraph />
      </section>

      {/* Stats strip */}
      <Reveal>
        <section className="mb-16 grid grid-cols-2 md:grid-cols-4 gap-px rounded-lg overflow-hidden border border-border bg-border">
          {stats.map((s) => (
            <div key={s.label} className="bg-surface p-5">
              <p className="font-display font-semibold text-2xl sm:text-3xl text-signal mb-1">
                <CountUp value={s.value} />
              </p>
              <p className="text-xs text-text-muted leading-snug mb-2">{s.label}</p>
              <p className="text-[10px] font-mono text-text-faint truncate">{s.mono}</p>
            </div>
          ))}
        </section>
      </Reveal>

      {/* Quick filter */}
      <Reveal>
        <section className="mb-10">
          <Eyebrow>Quick filter</Eyebrow>
          <h2 className="font-display font-semibold text-2xl text-text mb-4">
            Filter by what you care about
          </h2>
          <PipelineFilter active={activeFilter} onChange={setActiveFilter} />
        </section>
      </Reveal>

      {/* Filtered skills */}
      <section className="mb-16">
        <div className="grid sm:grid-cols-2 gap-4">
          {visibleSkillGroups.map((group, i) => (
            <Reveal key={group.group} delay={i * 80}>
              <TiltCard className="rounded-lg border border-border bg-surface p-5 h-full">
                <p className="font-display font-semibold text-sm text-text mb-3">
                  {group.group}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {group.skills.map((s) => (
                    <Badge key={s}>{s}</Badge>
                  ))}
                </div>
              </TiltCard>
            </Reveal>
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
          {visibleProjects.map((p, i) => (
            <Reveal key={p.id} delay={i * 80}>
              <TiltCard className="h-full">
                <Link
                  href="/projects"
                  className="block h-full rounded-lg border border-border bg-surface p-5 hover:border-signal-dim transition-colors group"
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
              </TiltCard>
            </Reveal>
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
