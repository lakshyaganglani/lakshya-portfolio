"use client";

import { useTheme } from "@/hooks/useTheme";

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggleTheme, mounted } = useTheme();

  // Avoid rendering theme-dependent icon before mount to prevent mismatch;
  // reserve the same footprint so layout doesn't shift.
  if (!mounted) {
    return <div className={`h-9 w-9 ${className}`} aria-hidden="true" />;
  }

  return (
    <button
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      className={`relative flex h-9 w-9 items-center justify-center rounded-md border border-border text-text-muted hover:text-signal hover:border-signal-dim transition-colors ${className}`}
    >
      <SunIcon
        className={`absolute h-4 w-4 transition-all duration-300 ${
          theme === "light" ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-50"
        }`}
      />
      <MoonIcon
        className={`absolute h-4 w-4 transition-all duration-300 ${
          theme === "dark" ? "opacity-100 rotate-0 scale-100" : "opacity-0 rotate-90 scale-50"
        }`}
      />
    </button>
  );
}

function SunIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M12 2v2.5M12 19.5V22M4.2 4.2l1.8 1.8M18 18l1.8 1.8M2 12h2.5M19.5 12H22M4.2 19.8l1.8-1.8M18 6l1.8-1.8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}
