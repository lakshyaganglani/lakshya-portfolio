export default function StatusPill() {
  return (
    <div className="rounded-md border border-border bg-surface-hi px-3 py-2.5">
      <div className="flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
        </span>
        <span className="text-[11px] font-mono text-text-muted">status: open to work</span>
      </div>
    </div>
  );
}
