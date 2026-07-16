"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

/**
 * Hero product screenshot with subtle scroll parallax. The image drifts up
 * slightly slower than the scroll, creating depth. motion disables this
 * automatically under prefers-reduced-motion.
 */
export default function HeroProduct({
  src,
  alt,
  width,
  height,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // move up to 40px as the hero scrolls away
  const y = useTransform(scrollYProgress, [0, 1], [0, -40]);

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className="relative mx-auto mt-16 w-fit lg:mt-20"
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority
        fetchPriority="high"
        quality={80}
        sizes="(max-width: 768px) 88vw, 480px"
        className="mx-auto h-auto w-auto max-h-[70vh] rounded-[22px] border border-line"
        style={{
          aspectRatio: `${width} / ${height}`,
          boxShadow: "var(--shadow-product)",
        }}
      />
    </motion.div>
  );
}
