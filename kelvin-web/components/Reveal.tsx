"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** stagger index — adds transitionDelay = index * 60ms */
  index?: number;
  id?: string;
  style?: React.CSSProperties;
};

/**
 * Scroll-reveal wrapper. Starts hidden (opacity 0 + blur, see globals.css)
 * and flips to visible when scrolled into view via IntersectionObserver.
 * Respects prefers-reduced-motion (elements stay visible by default).
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
      el.style.transitionDelay = `${index * 60}ms`;
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
