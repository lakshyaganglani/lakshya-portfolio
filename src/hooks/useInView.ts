"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Returns a ref to attach to an element and a boolean that flips true
 * once the element scrolls into view. Fires once (doesn't re-trigger
 * on scroll back out), and respects prefers-reduced-motion by being
 * true immediately in that case.
 */
export function useInView<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      // Defer to avoid a synchronous setState directly in the effect body.
      queueMicrotask(() => setInView(true));
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}
