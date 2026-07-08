"use client";

import { useState, useMemo } from "react";
import Eyebrow from "@/components/Eyebrow";
import Badge from "@/components/Badge";
import { timeline, certifications, skillGroups } from "@/data/profile";

export default function About() {
  const allTech = useMemo(() => {
    const set = new Set<string>();
    timeline.forEach((t) => t.tech.forEach((tech) => set.add(tech)));
    return Array.from(set).sort();
  }, []);

  const [activeTech, setActiveTech] = useState<string | null>(null);

  const toggleTech = (tech: string) => {
    setActiveTech((prev) => (prev === tech ? null : tech));
  };

  return (
    <div className="animate-fade-up max-w-3xl">
      <Eyebrow>About</Eyebrow>
      <h1 className="font-display font-semibold text-4xl text-text mb-4">
        Career log
      </h1>
      <p className="text-text-muted leading-relaxed mb-10 max-w-2xl">
        A record of what I&apos;ve built and where. Click a technology below to
        highlight every stop on the timeline where I used it.
      </p>

      {/* Tech badge filter */}
      <div className="mb-12 rounded-lg border border-border bg-surface p-5">
        <p className="text-xs font-mono uppercase tracking-wide text-text-faint mb-3">
          Filter timeline by technology
        </p>
        <div className="flex flex-wrap gap-2">
          {allTech.map((tech) => (
            <button key={tech} onClick={() => toggleTech(tech)}>
              <Badge active={activeTech === tech}>{tech}</Badge>
            </button>
          ))}
          {activeTech && (
            <button
              onClick={() => setActiveTech(null)}
              className="text-xs font-mono text-text-faint hover:text-signal transition-colors ml-1"
            >
              clear ×
            </button>
          )}
        </div>
      </div>

      {/* Timeline */}
      <div className="relative pl-8 mb-16">
        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border" aria-hidden="true" />
        <div className="flex flex-col gap-8">
          {timeline.map((item) => {
            const matches = activeTech ? item.tech.includes(activeTech) : true;
            return (
              <div
                key={item.id}
                className={`relative transition-opacity duration-300 ${
                  activeTech && !matches ? "opacity-30" : "opacity-100"
                }`}
              >
                <span
                  className={`absolute -left-8 top-1.5 h-3.5 w-3.5 rounded-full border-2 ${
                    matches && activeTech
                      ? "border-signal bg-signal"
                      : "border-border bg-surface"
                  }`}
                  aria-hidden="true"
                />
                <p className="text-xs font-mono text-text-faint mb-1">{item.period}</p>
                <h3 className="font-display font-semibold text-lg text-text mb-0.5">
                  {item.title}
                </h3>
                <p className="text-sm text-signal font-medium mb-3">{item.org}</p>
                <p className="text-sm text-text-muted leading-relaxed mb-3">
                  {item.summary}
                </p>
                <ul className="flex flex-col gap-1.5 mb-4">
                  {item.bullets.map((b, i) => (
                    <li
                      key={i}
                      className="text-sm text-text-muted leading-relaxed flex gap-2"
                    >
                      <span className="text-signal-dim mt-1.5 h-1 w-1 rounded-full bg-signal-dim shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-1.5">
                  {item.tech.map((t) => (
                    <Badge key={t} active={t === activeTech}>
                      {t}
                    </Badge>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Skills detail */}
      <section className="mb-16">
        <Eyebrow>Toolkit</Eyebrow>
        <h2 className="font-display font-semibold text-2xl text-text mb-5">
          Skills by category
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {skillGroups.map((group) => (
            <div key={group.group} className="rounded-lg border border-border bg-surface p-5">
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
        </div>
      </section>

      {/* Certifications */}
      <section>
        <Eyebrow>Coursework & Certifications</Eyebrow>
        <h2 className="font-display font-semibold text-2xl text-text mb-5">
          Continued learning
        </h2>
        <div className="flex flex-col gap-2">
          {certifications.map((c) => (
            <div
              key={c.name}
              className="flex items-center justify-between rounded-md border border-border bg-surface px-4 py-3"
            >
              <span className="text-sm text-text">{c.name}</span>
              <span className="text-xs font-mono text-text-faint shrink-0 ml-3">
                {c.issuer}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
