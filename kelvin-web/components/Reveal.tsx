"use client";

import { motion } from "motion/react";
import type { ElementType, ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** element tag to render (preserves semantic HTML for a11y/SEO) */
  as?: ElementType;
  className?: string;
  /** stagger index — adds delay = index * 80ms */
  index?: number;
  id?: string;
  style?: React.CSSProperties;
};

/**
 * Scroll-reveal wrapper powered by motion. Animates opacity + y-offset when
 * the element scrolls into view. Preserves semantic tag via `as`.
 * motion respects prefers-reduced-motion automatically.
 */
export default function Reveal({
  children,
  as: Tag = "div",
  className,
  index = 0,
  id,
  style,
}: RevealProps) {
  const MotionTag = motion(Tag);

  return (
    <MotionTag
      id={id}
      className={className}
      style={style}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.22, 0.61, 0.36, 1],
      }}
    >
      {children}
    </MotionTag>
  );
}
