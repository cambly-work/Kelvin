"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Subtle parallax for the hero screenshot — translates the image a fraction of
 * the scroll offset so it appears to float. Disabled under reduced-motion.
 * Uses transform only (no layout thrash).
 */
export default function HeroParallax({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) return;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        // only parallax while the hero is in view
        if (rect.bottom < 0 || rect.top > window.innerHeight) return;
        // move up to ~40px based on how far the hero has scrolled
        const offset = Math.min(window.scrollY * 0.06, 40);
        el.style.transform = `translateY(${-offset}px)`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={ref} className={className} style={{ willChange: "transform" }}>
      {children}
    </div>
  );
}
