"use client";

import { useEffect, useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/routing";

export default function Hero() {
  const t = useTranslations("Hero");
  const locale = useLocale();
  const stageRef = useRef<HTMLDivElement | null>(null);
  const panelSrc =
    locale === "pt" ? "/assets/panel-pt-1.png" : "/assets/panel-ru-1.png";
  const panelW = locale === "pt" ? 808 : 652;
  const panelH = locale === "pt" ? 2252 : 2072;

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const move = (event: PointerEvent) => {
      const rect = stage.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      stage.style.setProperty("--stage-x", `${x * 8}px`);
      stage.style.setProperty("--stage-y", `${y * 8}px`);
    };
    const reset = () => {
      stage.style.setProperty("--stage-x", "0px");
      stage.style.setProperty("--stage-y", "0px");
    };
    stage.addEventListener("pointermove", move);
    stage.addEventListener("pointerleave", reset);
    return () => {
      stage.removeEventListener("pointermove", move);
      stage.removeEventListener("pointerleave", reset);
    };
  }, []);

  return (
    <section className="relative overflow-hidden px-5 pb-20 pt-32 sm:pt-40">
      <div className="hero-aurora pointer-events-none absolute inset-x-0 top-0 -z-10 h-[900px]" />

      <div className="mx-auto max-w-[1180px] text-center">
        <p
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/[0.07] px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-accent"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_12px_var(--color-accent)]" />
          {t("eyebrow")}
        </p>

        <h1
          className="mx-auto max-w-[1050px] text-balance text-[clamp(3.5rem,9vw,7.5rem)] font-bold leading-[0.88] tracking-[-0.068em] text-tx"
        >
          {t("title")}
        </h1>

        <p
          className="mx-auto mt-8 max-w-[720px] text-pretty text-[clamp(1.125rem,2.2vw,1.4rem)] leading-relaxed text-mut"
        >
          {t("lead")}
        </p>

        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/#download" className="btn-primary w-full sm:w-auto">
            {t("ctaPrimary")}
          </Link>
          <Link href="/#demo" className="btn-secondary w-full sm:w-auto">
            {t("ctaDemo")}
            <span aria-hidden className="ml-2">↓</span>
          </Link>
        </div>

        <p className="mt-5 text-[12px] text-faint">
          {t("micro")}
        </p>

        <div className="mt-14 sm:mt-20">
          <div ref={stageRef} className="hero-stage relative mx-auto h-[600px] max-w-[1120px] overflow-hidden rounded-[32px] border border-line text-left sm:h-[680px]">
            <div className="hero-stage-surface absolute inset-0" />
            <div className="demo-grid absolute inset-0 opacity-25" />
            <span className="absolute left-1/2 top-6 z-10 -translate-x-1/2 rounded-full border border-line bg-surface/65 px-3 py-1.5 text-[9px] font-semibold tracking-[0.15em] text-faint backdrop-blur-xl">
              KELVIN / LIVE SYSTEM
            </span>

            <Metric className="left-[5%] top-[16%]" label={t("metricPower")} value="18.4 W" detail={t("metricLive")} />
            <Metric className="right-[4%] top-[20%]" label={t("metricThermal")} value="48°" detail={t("metricNormal")} align="right" />
            <Metric className="bottom-[8%] left-[7%]" label={t("metricPrivacy")} value={t("metricLocal")} detail={t("metricTelemetry")} />
            <Metric className="bottom-[10%] right-[5%]" label={t("metricControl")} value="6 / 6" detail={t("metricReady")} align="right" />

            <div
              className="hero-product absolute left-1/2 top-[13%] h-[76%] overflow-hidden rounded-[24px] border border-line bg-surface"
              style={{ width: "clamp(250px, 30.5%, 340px)" }}
            >
              <Image
                src={panelSrc}
                alt={t("productAlt")}
                width={panelW}
                height={panelH}
                priority
                fetchPriority="high"
                quality={80}
                sizes="(max-width: 640px) 58vw, 370px"
                className="h-auto w-full"
              />
            </div>

            <div className="absolute bottom-0 left-1/2 h-32 w-[50%] -translate-x-1/2 bg-accent/10 blur-[100px]" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Metric({
  className,
  label,
  value,
  detail,
  align = "left",
}: {
  className: string;
  label: string;
  value: string;
  detail: string;
  align?: "left" | "right";
}) {
  return (
    <div className={`absolute z-10 hidden sm:block ${className} ${align === "right" ? "text-right" : ""}`}>
      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-faint">{label}</p>
      <p className="mt-2 text-[clamp(1.6rem,2.6vw,2.3rem)] font-semibold tracking-[-0.05em] text-tx">{value}</p>
      <p className="mt-1 text-[11px] text-faint">{detail}</p>
    </div>
  );
}
