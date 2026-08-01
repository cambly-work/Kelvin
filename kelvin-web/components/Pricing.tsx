"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import Reveal from "./Reveal";

export default function Pricing() {
  const t = useTranslations("Compare");
  const locale = useLocale();
  const freeFeatures = t.raw("free.features") as string[];
  const proFeatures = t.raw("pro.features") as string[];
  const planLabel = locale === "pt" ? "PLANO" : "ТАРИФ";
  const freeScope = locale === "pt" ? "Monitoramento completo" : "Полный мониторинг";
  const proScope = locale === "pt" ? "Controle e automação" : "Управление и автоматизация";

  return (
    <section id="pricing" className="kelvin-pricing relative overflow-hidden border-t border-line">
      <div className="kelvin-pricing-aura pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-[1120px] px-5 py-24 sm:py-32">
        <Reveal as="p" className="section-eyebrow text-center">
          {t("eyebrow")}
        </Reveal>
        <Reveal as="h2" index={1} className="mx-auto max-w-[840px] text-balance text-center text-[clamp(2.8rem,6vw,5rem)] font-bold leading-[0.95] tracking-[-0.055em] text-tx">
          {t("title")}
        </Reveal>
        <Reveal as="p" index={2} className="mx-auto mt-6 max-w-[620px] text-center text-[17px] leading-relaxed text-mut">
          {t("sub")}
        </Reveal>

        <div className="mt-14 grid gap-4 lg:grid-cols-2">
          <Reveal>
            <div className="kelvin-price-card">
              <div className="kelvin-price-head">
                <span>{planLabel} / 01</span><i />
              </div>
              <p className="kelvin-price-scope">{freeScope}</p>
              <h3 className="mt-3 text-[24px] font-bold text-tx">{t("free.name")}</h3>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-[52px] font-bold tracking-[-0.055em] text-tx">
                  {t("free.price")}
                </span>
                <span className="text-[14px] text-faint">{t("free.period")}</span>
              </div>
              <ul className="mt-7 flex-1 space-y-3">
                {freeFeatures.map((f) => (
                  <li key={f} className="flex gap-3 text-[15px] text-mut">
                    <Check />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/#download" className="btn-secondary mt-8 w-full text-center">
                {t("free.cta")}
              </Link>
            </div>
          </Reveal>

          <Reveal index={1}>
            <div className="kelvin-price-card kelvin-price-card--pro">
              <div className="kelvin-price-card-glow" />
              <div className="kelvin-price-head">
                <span>{planLabel} / 02</span><i />
              </div>
              <span className="kelvin-price-badge">
                {t("pro.badge")}
              </span>
              <p className="kelvin-price-scope">{proScope}</p>
              <h3 className="mt-3 text-[24px] font-bold text-tx">{t("pro.name")}</h3>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-gradient text-[56px] font-bold tracking-[-0.055em]">
                  {t("pro.price")}
                </span>
                <span className="text-[14px] text-faint">{t("pro.period")}</span>
              </div>
              <ul className="mt-7 flex-1 space-y-3">
                {proFeatures.map((f) => (
                  <li key={f} className="flex gap-3 text-[15px] text-tx">
                    <Check />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/#download" className="btn-primary mt-8 w-full text-center">
                {t("pro.cta")}
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Check() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mt-0.5 shrink-0 text-accent"
      aria-hidden
    >
      <path d="m5 12 5 5 9-9" />
    </svg>
  );
}
