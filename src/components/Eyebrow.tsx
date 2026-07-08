export default function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.14em] text-signal mb-3">
      <span className="h-px w-5 bg-signal-dim" />
      {children}
    </p>
  );
}
