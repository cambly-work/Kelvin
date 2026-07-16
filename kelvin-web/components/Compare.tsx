import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import Reveal from "./Reveal";

export default function Compare() {
  const t = useTranslations("Compare");
  const freeFeatures = t.raw("free.features") as string[];
  const proFeatures = t.raw("pro.features") as string[];

  return (
    <section id="compare" className="border-t border-line">
      <div className="mx-auto max-w-[980px] px-5 py-24 text-center sm:py-32">
        <Reveal as="h2" className="mx-auto max-w-[700px] text-balance text-[clamp(2rem,5vw,3.5rem)] font-semibold tracking-[-0.025em] text-tx">
          {t("title")}
        </Reveal>
        <Reveal as="p" index={1} className="mx-auto mt-4 max-w-[560px] text-[clamp(1.0625rem,1.8vw,1.25rem)] leading-relaxed text-mut">
          {t("sub")}
        </Reveal>

        <div className="mt-14 grid items-stretch gap-4 text-left sm:grid-cols-2">
          {/* Free */}
          <Reveal as="article" index={2} className="card card-hover flex h-full flex-col rounded-[18px] p-8 sm:p-10">
            <h3 className="text-[24px] font-semibold text-tx">{t("free.name")}</h3>
            <p className="mt-1 text-[17px] text-mut">
              {t("free.price")} · {t("free.period")}
            </p>
            <ul className="mt-6 space-y-3">
              {freeFeatures.map((f) => (
                <FeatureRow key={f} text={f} />
              ))}
            </ul>
          </Reveal>

          {/* Pro */}
          <Reveal as="article" index={3} className="card card-hover relative flex h-full flex-col rounded-[18px] p-8 ring-1 ring-accent/30 sm:p-10">
            <div className="absolute right-6 top-6 rounded-full bg-accent px-3 py-1 text-[12px] font-semibold text-ink">
              {t("pro.badge")}
            </div>
            <h3 className="pr-16 text-[24px] font-semibold text-tx">{t("pro.name")}</h3>
            <p className="mt-1 text-[17px] text-mut">
              {t("pro.price")} · {t("pro.period")}
            </p>
            <ul className="mt-6 space-y-3">
              {proFeatures.map((f) => (
                <FeatureRow key={f} text={f} highlight />
              ))}
            </ul>
            <Link href="/#pricing" className="btn-primary mt-auto w-fit px-6 py-2.5 pt-8">
              {t("pro.cta")}
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function FeatureRow({ text, highlight }: { text: string; highlight?: boolean }) {
  return (
    <li className={`flex items-start gap-3 text-[15px] leading-snug ${highlight ? "text-tx" : "text-mut"}`}>
      <svg className="mt-0.5 h-[18px] w-[18px] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--color-accent)" }} aria-hidden>
        <path d="M20 6 9 17l-5-5" />
      </svg>
      {text}
    </li>
  );
}
