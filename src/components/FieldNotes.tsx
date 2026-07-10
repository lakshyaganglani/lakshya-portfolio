"use client";

import { fieldNotes } from "@/data/profile";
import Badge from "@/components/Badge";
import Reveal from "@/components/Reveal";
import TiltCard from "@/components/TiltCard";

export default function FieldNotes() {
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {fieldNotes.map((note, i) => (
        <Reveal key={note.title} delay={i * 80}>
          <TiltCard className="h-full" maxTilt={4}>
            <a
              href={note.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full flex-col rounded-lg border border-border bg-surface p-5 hover:border-signal-dim transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <Badge dim>{note.type === "paper" ? "Paper" : "Newsletter"}</Badge>
                <span className="text-text-faint group-hover:text-signal group-hover:translate-x-0.5 transition-all">
                  <ArrowIcon />
                </span>
              </div>
              <p className="font-display font-semibold text-text mb-1 group-hover:text-signal transition-colors">
                {note.title}
              </p>
              <p className="text-xs font-mono text-text-faint mb-3">
                {note.author} · {note.source}
              </p>
              <p className="text-sm text-text-muted leading-relaxed">{note.note}</p>
            </a>
          </TiltCard>
        </Reveal>
      ))}
    </div>
  );
}

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
      <path
        d="M4 12L12 4M12 4H5M12 4V11"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
