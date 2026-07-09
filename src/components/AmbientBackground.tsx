export default function AmbientBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-grid-drift opacity-40" />
      <div
        className="glow-orb animate-glow w-[420px] h-[420px] -top-40 -left-20 opacity-20"
        style={{ animationDelay: "0s" }}
      />
      <div
        className="glow-orb animate-glow w-[320px] h-[320px] top-20 right-0 opacity-15"
        style={{ animationDelay: "1.5s" }}
      />
    </div>
  );
}
