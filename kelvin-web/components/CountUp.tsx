"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useMotionValue, animate } from "motion/react";

/**
 * Animated count-up. Counts from 0 to `value` when scrolled into view.
 * motion disables the animation under prefers-reduced-motion (jumps to value).
 */
export default function CountUp({
  value,
  prefix = "",
  duration = 1.2,
  className,
}: {
  value: number;
  prefix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const [display, setDisplay] = useState(0);
  const mv = useMotionValue(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, value, {
      duration,
      ease: [0.22, 0.61, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value, duration, mv]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
    </span>
  );
}
