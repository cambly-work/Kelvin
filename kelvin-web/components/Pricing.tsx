import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import Reveal from "./Reveal";

export default function Pricing() {
  const t = useTranslations("FreeForever");
  const features = t.raw("features") as string[];
  return (
    <section id="pricing" className="kelvin-pricing relative overflow-hidden border-t border-line">
      <div className="kelvin-pricing-aura pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-[1120px] px-5 py-24 sm:py-32">
        <Reveal className="kelvin-free-card">
          <div>
            <p className="section-eyebrow !text-left">{t("eyebrow")}</p>
            <h2 className="whitespace-pre-line text-balance text-[clamp(2.6rem,5vw,4.5rem)] font-bold leading-[1.02] tracking-[-0.055em] text-tx">{t("title")}</h2>
            <p className="mt-6 max-w-[550px] text-[17px] leading-relaxed text-mut">{t("lead")}</p>
            <Link href="/#download" className="btn-primary mt-8 inline-flex">{t("cta")}<span aria-hidden>↓</span></Link>
          </div>
          <div className="kelvin-free-included">
            <span className="kelvin-mini-chip">{t("badge")}</span>
            <p className="my-6 flex items-baseline gap-3"><strong className="text-[64px] leading-none tracking-[-0.06em] text-tx">{t("zero")}</strong><span className="text-mut">{t("forever")}</span></p>
            <ul className="space-y-3">
              {features.map(feature => <li key={feature} className="flex gap-3 text-[14px] text-tx"><span aria-hidden className="text-accent">✓</span>{feature}</li>)}
            </ul>
          </div>
        </Reveal>
        <p className="mx-auto mt-6 max-w-[720px] text-center text-[13px] leading-relaxed text-faint">{t("note")}</p>
        <p className="mt-5 text-center text-[14px]">
          <a href="https://github.com/cambly-work/kelvin_app" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-accent underline decoration-accent/30 underline-offset-4 transition-colors hover:text-tx">
            {t("openProject")}<span aria-hidden>↗</span>
          </a>
        </p>
      </div>
    </section>
  );
}
