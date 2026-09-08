"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import KelvinPanel from "./KelvinPanel";

export default function Hero() {
  const t = useTranslations("Hero");
  const locale = useLocale();
  const chips =
    locale === "pt"
      ? [
          "macOS 11+",
          "Intel + Apple Silicon",
          "grátis para sempre",
          "zero telemetria",
        ]
      : [
          "macOS 11+",
          "Intel + Apple Silicon",
          "бесплатно навсегда",
          "без телеметрии",
        ];

  return (
    <section className="kelvin-hero relative overflow-hidden px-5 pb-24 pt-28 sm:pt-32 lg:pt-28">
      <div className="kelvin-hero-grid pointer-events-none absolute inset-0" />
      <div className="kelvin-hero-glow pointer-events-none absolute inset-0" />

      <div className="relative mx-auto grid max-w-[1240px] items-center gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:gap-8">
        <div className="relative z-10 lg:pb-12">
          <p className="kelvin-kicker">
            <span className="kelvin-live-dot" />
            {t("eyebrow")}
          </p>

          <h1 className="mt-7 max-w-[760px] text-balance text-[clamp(3.45rem,7vw,5.65rem)] font-bold leading-[0.88] tracking-[-0.07em] text-tx">
            {t("title")}
          </h1>

          <p className="mt-6 max-w-[650px] text-pretty text-[clamp(1.04rem,1.7vw,1.2rem)] leading-[1.55] text-mut">
            {t("lead")}
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link href="/#download" className="btn-primary text-center">
              {t("ctaPrimary")}
            </Link>
            <Link href="/#demo" className="btn-secondary text-center">
              {t("ctaDemo")}
              <span aria-hidden className="ml-2">
                ↓
              </span>
            </Link>
          </div>

          <div className="mt-7 flex flex-wrap gap-2">
            {chips.map((item) => (
              <span key={item} className="kelvin-mini-chip">
                {item}
              </span>
            ))}
          </div>

          <p className="mt-5 max-w-[620px] text-[12px] leading-relaxed text-faint">
            {t("micro")}
          </p>
        </div>

        <div className="kp-hero-stage" aria-label={t("productAlt")}>
          <div className="kp-stage-label">
            <span>Kelvin</span>
            <span>macOS</span>
          </div>
          <KelvinPanel locale={locale} compact />
          <p className="kp-stage-caption">
            {locale === "ru"
              ? "Интерактивное превью · демонстрационные данные"
              : "Prévia interativa · dados de demonstração"}
          </p>
        </div>
      </div>
    </section>
  );
}
