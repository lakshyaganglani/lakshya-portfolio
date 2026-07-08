export default function Badge({
  children,
  active = false,
  dim = false,
}: {
  children: React.ReactNode;
  active?: boolean;
  dim?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center rounded border px-2 py-1 text-[11px] font-mono transition-colors ${
        active
          ? "border-signal-dim bg-signal/10 text-signal"
          : dim
          ? "border-border text-text-faint"
          : "border-border text-text-muted"
      }`}
    >
      {children}
    </span>
  );
}
