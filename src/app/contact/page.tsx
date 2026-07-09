"use client";

import Eyebrow from "@/components/Eyebrow";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import TiltCard from "@/components/TiltCard";
import { person } from "@/data/profile";

export default function Contact() {
  return (
    <div className="animate-fade-up max-w-3xl">
      <Eyebrow>Connect</Eyebrow>
      <h1 className="font-display font-semibold text-4xl text-text mb-4">
        Let&apos;s talk data
      </h1>
      <p className="text-text-muted leading-relaxed mb-10 max-w-xl">
        Open to data engineering roles, freelance pipeline work, and
        conversations about analytics infrastructure. Reach out directly or
        use the form below.
      </p>

      <div className="grid md:grid-cols-2 gap-10">
        <Reveal>
          <ContactForm />
        </Reveal>

        <Reveal delay={120}>
          <div className="flex flex-col gap-3">
            <TiltCard maxTilt={3}>
              <a
                href={person.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-lg border border-border bg-surface p-5 hover:border-signal-dim transition-colors group"
              >
                <div>
                  <p className="font-display font-semibold text-text mb-1 group-hover:text-signal transition-colors">
                    LinkedIn
                  </p>
                  <p className="text-xs font-mono text-text-faint">
                    linkedin.com/in/lakshya-ganglani
                  </p>
                </div>
                <ArrowIcon />
              </a>
            </TiltCard>

            <TiltCard maxTilt={3}>
              <a
                href={person.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-lg border border-border bg-surface p-5 hover:border-signal-dim transition-colors group"
              >
                <div>
                  <p className="font-display font-semibold text-text mb-1 group-hover:text-signal transition-colors">
                    GitHub
                  </p>
                  <p className="text-xs font-mono text-text-faint">
                    view repositories & code
                  </p>
                </div>
                <ArrowIcon />
              </a>
            </TiltCard>

            <TiltCard maxTilt={3}>
              <a
                href={`mailto:${person.email}`}
                className="flex items-center justify-between rounded-lg border border-border bg-surface p-5 hover:border-signal-dim transition-colors group"
              >
                <div>
                  <p className="font-display font-semibold text-text mb-1 group-hover:text-signal transition-colors">
                    Email
                  </p>
                  <p className="text-xs font-mono text-text-faint">{person.email}</p>
                </div>
                <ArrowIcon />
              </a>
            </TiltCard>

            <div className="rounded-lg border border-border bg-surface-hi p-5 mt-2">
              <p className="text-xs font-mono uppercase tracking-wide text-text-faint mb-2">
                Response time
              </p>
              <p className="text-sm text-text-muted">
                Typically replies within 1–2 business days.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className="shrink-0 text-text-faint group-hover:text-signal group-hover:translate-x-0.5 transition-all"
    >
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
