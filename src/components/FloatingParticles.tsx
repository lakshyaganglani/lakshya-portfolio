// Deterministic pseudo-random positions (seeded) so server and client render
// identically — avoids hydration mismatches from Math.random() in render.
const PARTICLES = Array.from({ length: 14 }).map((_, i) => {
  const seed = (i * 137.5) % 100;
  return {
    left: `${(seed * 1.7) % 100}%`,
    top: `${(seed * 2.3) % 100}%`,
    size: 2 + (i % 3),
    duration: 6 + (i % 5),
    delay: (i % 7) * 0.6,
  };
});

export default function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {PARTICLES.map((p, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-signal/40 animate-pulse-slow"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
