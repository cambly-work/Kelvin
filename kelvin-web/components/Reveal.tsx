"use client";

import {
  useEffect,
  useRef,
  useState,
  type ElementType,
  type ReactNode,
  type CSSProperties,
} from "react";

/**
 * Scroll reveal wrapper. Starts hidden via the `.reveal` class (see
 * globals.css) and adds `.reveal-visible` when scrolled into view.
 * `index` staggers the transition delay.
 * Additional props (like `style`, `id`, `aria-*`) are passed to the rendered element.
 */
export default function Reveal({
  as,
  index = 0,
  className: externalClassName = "",
  style: externalStyle,
  children,
  ...rest
}: {
  as?: ElementType;
  index?: number;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  // rest props (HTML attributes)
  [key: string]: unknown;
}) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Merge external className with internal reveal classes
  const mergedClassName = `reveal ${visible ? "reveal-visible" : ""} ${externalClassName}`.trim();

  // Merge external style with internal transition delay
  const mergedStyle: CSSProperties = {
    ...(externalStyle as CSSProperties),
    transitionDelay: `${index * 90}ms`,
  };

  return (
    <Tag
      ref={ref}
      className={mergedClassName}
      style={mergedStyle}
      {...rest}
    >
      {children}
    </Tag>
  );
}