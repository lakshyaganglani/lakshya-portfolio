"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { person } from "@/data/profile";
import StatusPill from "@/components/StatusPill";
import Magnetic from "@/components/Magnetic";
import CustomCursor from "@/components/CustomCursor";

const NAV_ITEMS = [
  { href: "/", label: "Home", mono: "~/" },
  { href: "/about", label: "About", mono: "~/about" },
  { href: "/projects", label: "Projects", mono: "~/projects" },
  { href: "/contact", label: "Contact", mono: "~/contact" },
];

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex bg-bg">
      <CustomCursor />
      {/* Desktop sidebar */}
      <aside
        className={`hidden md:flex flex-col shrink-0 border-r border-border bg-surface transition-[width] duration-300 ease-out ${
          collapsed ? "w-[76px]" : "w-[264px]"
        }`}
      >
        <SidebarContent collapsed={collapsed} pathname={pathname} onNavigate={() => {}} />
        <button
          onClick={() => setCollapsed((c) => !c)}
          aria-label={collapsed ? "Expand navigation" : "Collapse navigation"}
          aria-expanded={!collapsed}
          className="m-3 flex items-center justify-center gap-2 rounded-md border border-border py-2 text-xs font-mono text-text-muted hover:text-signal hover:border-signal-dim transition-colors"
        >
          <ChevronIcon collapsed={collapsed} />
          {!collapsed && <span>collapse</span>}
        </button>
      </aside>

      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 inset-x-0 z-40 flex items-center justify-between h-16 px-4 border-b border-border bg-surface/95 backdrop-blur">
        <Link href="/" className="font-display font-semibold text-text tracking-tight">
          {initials(person.name)}
          <span className="text-signal">.</span>
        </Link>
        <button
          onClick={() => setMobileOpen((o) => !o)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          className="flex flex-col justify-center items-center w-10 h-10 gap-1.5"
        >
          <span
            className={`block h-[1.5px] w-6 bg-text transition-transform ${mobileOpen ? "translate-y-[3px] rotate-45" : ""}`}
          />
          <span
            className={`block h-[1.5px] w-6 bg-text transition-transform ${mobileOpen ? "-translate-y-[3px] -rotate-45" : ""}`}
          />
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-30 top-16 bg-bg animate-fade-up">
          <SidebarContent
            collapsed={false}
            pathname={pathname}
            onNavigate={() => setMobileOpen(false)}
          />
        </div>
      )}

      {/* Main content */}
      <main className="flex-1 min-w-0 pt-16 md:pt-0">
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-8 lg:px-12 py-10 md:py-16">
          {children}
          <SignatureFooter />
        </div>
      </main>

      {/* Ambient conversion CTA — hidden on the contact page itself */}
      {pathname !== "/contact" && (
        <div className="fixed bottom-5 right-5 z-40">
          <Magnetic strength={0.15}>
            <Link
              href="/contact"
              className="flex items-center gap-2 rounded-full bg-signal px-4 py-3 text-sm font-semibold text-bg shadow-lg shadow-signal/20 hover:bg-signal-dim transition-colors"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-bg opacity-50" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-bg" />
              </span>
              Available for work
            </Link>
          </Magnetic>
        </div>
      )}
    </div>
  );
}

function SignatureFooter() {
  return (
    <footer className="mt-24 pt-8 border-t border-border">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-signal/10 border border-signal-dim font-mono text-xs text-signal shrink-0">
            LG
          </span>
          <p className="text-sm text-text-muted">
            Made by{" "}
            <span className="font-display font-semibold text-text">
              Lakshya Ganglani
            </span>
          </p>
        </div>
        <p className="text-xs font-mono text-text-faint">
          Built with Next.js & Tailwind · thanks for stopping by
        </p>
      </div>
    </footer>
  );
}

function SidebarContent({
  collapsed,
  pathname,
  onNavigate,
}: {
  collapsed: boolean;
  pathname: string;
  onNavigate: () => void;
}) {
  return (
    <div className="flex flex-col flex-1 px-4 pt-6">
      <Link href="/" onClick={onNavigate} className="flex items-center gap-2.5 mb-9 px-1">
        <span className="flex h-8 w-8 items-center justify-center rounded-md bg-signal/10 border border-signal-dim font-mono text-sm text-signal shrink-0">
          LG
        </span>
        {!collapsed && (
          <div className="min-w-0">
            <p className="font-display font-semibold text-sm text-text truncate">
              {person.name}
            </p>
            <p className="text-[11px] font-mono text-text-faint truncate">{person.role}</p>
          </div>
        )}
      </Link>

      <nav className="relative flex flex-col gap-1" aria-label="Primary">
        <SlidingPill pathname={pathname} />
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              data-nav-item={item.href}
              className={`group relative z-10 flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors ${
                active
                  ? "text-signal"
                  : "text-text-muted hover:text-text hover:bg-surface-hi"
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full shrink-0 transition-colors ${
                  active ? "bg-signal" : "bg-text-faint group-hover:bg-text-muted"
                }`}
              />
              {!collapsed && <span className="font-medium">{item.label}</span>}
              {!collapsed && (
                <span className="ml-auto text-[11px] font-mono text-text-faint">
                  {item.mono}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto mb-4 pt-6">
        {!collapsed && <StatusPill />}
      </div>
    </div>
  );
}

function SlidingPill({ pathname }: { pathname: string }) {
  const [rect, setRect] = useState<{ top: number; height: number } | null>(null);

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      const active = document.querySelector<HTMLElement>(
        `[data-nav-item="${pathname}"]`
      );
      const parent = active?.parentElement;
      if (active && parent) {
        const parentRect = parent.getBoundingClientRect();
        const activeRect = active.getBoundingClientRect();
        setRect({
          top: activeRect.top - parentRect.top,
          height: activeRect.height,
        });
      } else {
        setRect(null);
      }
    });
    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  if (!rect) return null;

  return (
    <span
      className="absolute left-0 right-0 rounded-md bg-signal/10 border border-signal-dim/40 transition-all duration-300 ease-out pointer-events-none"
      style={{ top: rect.top, height: rect.height }}
      aria-hidden="true"
    />
  );
}

function ChevronIcon({ collapsed }: { collapsed: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      className={`transition-transform duration-300 ${collapsed ? "rotate-180" : ""}`}
    >
      <path
        d="M9 2.5L4 7L9 11.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("");
}
