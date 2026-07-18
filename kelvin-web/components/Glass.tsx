"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Glass — живое стекло в стиле macOS 26 Liquid Glass.
 *
 * Три вещи, которые отличают его от статичной плашки:
 *
 *  1. SPOTLIGHT бежит за курсором. На mousemove считаем позицию мыши
 *     относительно центра элемента и кладём в --mx/--my. CSS рисует
 *     radial-gradient в этой точке — блик света сквозь стекло.
 *
 *  2. IRIDESCENCE — бензиновая плёнка. Два медленно вращающихся
 *     conic-gradient слоя (--irid-1, --irid-2) дают перелив
 *     розовый↔циан↔жёлтый по краям. Сдвигаются через --shift на scrolle.
 *
 *  3. ABERRATION — хроматическая франжа по краю (inset box-shadows).
 *
 * Сам компонент только считает математику и выставляет переменные —
 * всё рисование в .glass--live в globals.css.
 */
export default function Glass({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "header" | "article" | "li";
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // pointer-move для блика. passive, дёшево: только Math + CSS var.
    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      el.style.setProperty("--mx", `${x}%`);
      el.style.setProperty("--my", `${y}%`);
      // сила близости курсора — ярче, когда мышь над элементом
      const inside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;
      el.style.setProperty("--spot", inside ? "0.5" : "0.15");
    };

    // --shift для иридесценции — медленный дрейф, не привязанный к курсору
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const vh = window.innerHeight || 1;
        // 0 сверху вьюпорта → 1 снизу
        const progress = Math.max(
          0,
          Math.min(1, (r.top + r.height / 2) / vh)
        );
        el.style.setProperty("--shift", `${progress * 360}deg`);
        raf = 0;
      });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const Comp = Tag as any;
  return (
    <Comp ref={ref as any} className={`glass glass--live ${className}`}>
      {children}
    </Comp>
  );
}
