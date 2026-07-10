"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
};

/**
 * A single, site-wide canvas rendering a subtle particle/data-flow network —
 * evokes AI/data-science visuals without shipping a video file. Respects
 * prefers-reduced-motion (renders one static frame, no animation loop) and
 * pauses via IntersectionObserver-free rAF throttling when tab is hidden.
 */
export default function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let particles: Particle[] = [];
    let raf = 0;
    let mouseX = width / 2;
    let mouseY = height / 2;
    let paused = document.hidden;
    let frameCount = 0;
    let cachedSignalRgb = "125, 211, 192";

    const DENSITY = 12000; // px^2 per particle — lower = more particles
    const MAX_DIST = 140;

    function getSignalRgb(): string {
      // Read the live --color-signal value so particles match the active
      // theme (light/dark) without needing a separate canvas re-init.
      const hex = getComputedStyle(document.documentElement)
        .getPropertyValue("--color-signal")
        .trim();
      const parsed = hexToRgb(hex);
      return parsed ?? "125, 211, 192";
    }

    function hexToRgb(hex: string): string | null {
      const match = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      if (!match) return null;
      const r = parseInt(match[1], 16);
      const g = parseInt(match[2], 16);
      const b = parseInt(match[3], 16);
      return `${r}, ${g}, ${b}`;
    }

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas!.width = width;
      canvas!.height = height;
      cachedSignalRgb = getSignalRgb();
      const count = Math.min(90, Math.floor((width * height) / DENSITY));
      particles = Array.from({ length: count }).map(() => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
      }));
    }

    function draw() {
      if (!ctx || paused) {
        raf = requestAnimationFrame(draw);
        return;
      }

      frameCount += 1;
      if (frameCount % 30 === 0) {
        cachedSignalRgb = getSignalRgb();
      }

      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Gentle pull toward mouse for interactivity, capped so it stays subtle
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180 && dist > 0) {
          p.x += (dx / dist) * 0.15;
          p.y += (dy / dist) * 0.15;
        }
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            const opacity = (1 - dist / MAX_DIST) * 0.12;
            ctx.strokeStyle = `rgba(${cachedSignalRgb}, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (const p of particles) {
        ctx.fillStyle = `rgba(${cachedSignalRgb}, 0.4)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.4, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    }

    function onMouseMove(e: MouseEvent) {
      mouseX = e.clientX;
      mouseY = e.clientY;
    }

    function onVisibility() {
      paused = document.hidden;
    }

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("visibilitychange", onVisibility);

    if (prefersReduced) {
      // Render a single static frame, no animation loop.
      draw();
    } else {
      raf = requestAnimationFrame(draw);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none opacity-60"
      aria-hidden="true"
    />
  );
}
