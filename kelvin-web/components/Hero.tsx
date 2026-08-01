"use client";

import { useEffect, useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import appcast from "@/public/appcast.json";
import { Link } from "@/i18n/routing";
import KelvinPanel from "./KelvinPanel";

export default function Hero() {
  const t = useTranslations("Hero");
  const locale = useLocale();
  const productRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = productRef.current;
    if (!node || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const move = (event: PointerEvent) => {
      const rect = node.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      node.style.setProperty("--hero-tilt-x", `${x * 7}deg`);
      node.style.setProperty("--hero-tilt-y", `${y * -5}deg`);
    };
    const reset = () => {
      node.style.setProperty("--hero-tilt-x", "0deg");
      node.style.setProperty("--hero-tilt-y", "0deg");
    };

    node.addEventListener("pointermove", move);
    node.addEventListener("pointerleave", reset);
    return () => {
      node.removeEventListener("pointermove", move);
      node.removeEventListener("pointerleave", reset);
    };
  }, []);

  return (
    <section className="kelvin-hero relative overflow-hidden px-5 pb-24 pt-28 sm:pt-36">
      <div className="kelvin-hero-grid pointer-events-none absolute inset-0" />
      <div className="kelvin-hero-glow pointer-events-none absolute inset-0" />

      <div className="relative mx-auto grid max-w-[1240px] items-center gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:gap-8">
        <div className="relative z-10 lg:pb-12">
          <p className="kelvin-kicker">
            <span className="kelvin-live-dot" />
            {t("eyebrow")}
          </p>

          <h1 className="mt-7 max-w-[760px] text-balance text-[clamp(3.7rem,8vw,7rem)] font-bold leading-[0.86] tracking-[-0.075em] text-tx">
            {t("title")}
          </h1>

          <p className="mt-8 max-w-[650px] text-pretty text-[clamp(1.08rem,2vw,1.32rem)] leading-[1.65] text-mut">
            {t("lead")}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href={appcast.url} className="btn-primary text-center">
              {t("ctaPrimary")}
            </a>
            <Link href="/#demo" className="btn-secondary text-center">
              {t("ctaDemo")}
              <span aria-hidden className="ml-2">↓</span>
            </Link>
          </div>

          <div className="mt-7 flex flex-wrap gap-2">
            {["macOS 11+", "Intel + Apple Silicon", "$19 · one time", "0 telemetry"].map((item) => (
              <span key={item} className="kelvin-mini-chip">{item}</span>
            ))}
          </div>

          <p className="mt-5 max-w-[620px] text-[12px] leading-relaxed text-faint">
            {t("micro")}
          </p>
        </div>

        <div ref={productRef} className="kelvin-hero-product relative mx-auto w-full max-w-[650px]" aria-label={t("productAlt")}>
          <div className="kelvin-desktop-shell">
            <div className="kelvin-menu-bar" aria-hidden>
              <div className="flex items-center gap-2.5">
                <span className="font-semibold">●</span>
                <span>Kelvin</span>
              </div>
              <div className="flex items-center gap-4 text-white/55">
                <span>100%</span><span>59W</span><span>99°</span><span>⌁</span>
              </div>
            </div>
            <div className="kelvin-desktop-space">
              <div className="kelvin-screenshot-window kelvin-screenshot-window--ui">
                <KelvinPanel locale={locale} compact />
              </div>
              <div className="kelvin-engineering-readout" aria-hidden>
                <span>SMC / LIVE</span>
                <span>LOCAL PROCESSING</span>
                <span>0 CLOUD</span>
              </div>
            </div>
          </div>

          <div className="kelvin-shot-note">
            <span className="kelvin-live-dot" />
            {locale === "ru" ? "Интерактивный интерфейс · попробуйте переключатели" : "Interface interativa · experimente os controlos"}
          </div>
        </div>
      </div>
    </section>
  );
}
