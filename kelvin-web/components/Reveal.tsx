"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** stagger index — adds transitionDelay = index * 80ms */
  index?: number;
  id?: string;
  style?: React.CSSProperties;
};

/**
 * Lightweight scroll-reveal using CSS + IntersectionObserver.
 * Keeps motion out of the initial bundle (it's reserved for richer
 * interactions: parallax, count-up). Respects prefers-reduced-motion.
 */
export default function Reveal({
  children,
  as: Tag = "div",
  className,
  index = 0,
  id,
  style,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduce || !("IntersectionObserver" in window)) {
      el.classList.add("is-in");
      return;
    }

    if (index > 0) {
      el.style.transitionDelay = `${index * 80}ms`;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          el.classList.add("is-in");
          io.unobserve(el);
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [index]);

  return (
    <Tag
      ref={ref as never}
      className={className}
      data-reveal
      id={id}
      style={style}
    >
      {children}
    </Tag>
  );
}
