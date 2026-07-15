import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import Reveal from "./Reveal";

export default function Compare() {
  const t = useTranslations("Compare");
  const freeFeatures = t.raw("free.features") as string[];
  const proFeatures = t.raw("pro.features") as string[];

  return (
    <section id="compare" className="border-t border-line py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-[980px] px-5 text-center">
        <Reveal as="span" className="eyebrow mb-4">
          {t("eyebrow")}
        </Reveal>
        <Reveal
          as="h2"
          index={1}
          className="mx-auto max-w-[700px] text-balance text-[clamp(2rem,5vw,3.5rem)] font-semibold tracking-[-0.025em] text-tx"
        >
          {t("title")}
        </Reveal>
        <Reveal
          as="p"
          index={2}
          className="mx-auto mt-4 max-w-[560px] text-[clamp(1rem,1.6vw,1.125rem)] leading-relaxed text-mut"
        >
          {t("sub")}
        </Reveal>

        <div className="mt-14 grid items-stretch gap-4 text-left sm:grid-cols-2">
          {/* Free */}
          <Reveal
            as="article"
            index={2}
            className="glass glass-interactive flex h-full flex-col rounded-[20px] p-8 sm:p-10"
          >
            <h3 className="text-[24px] font-semibold text-tx">
              {t("free.name")}
            </h3>
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
          <Reveal
            as="article"
            index={3}
            className="glass relative flex h-full flex-col overflow-hidden rounded-[20px] p-8 ring-1 ring-accent/40 sm:p-10"
          >
            {/* gradient wash at top */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-2/3"
              style={{
                background:
                  "linear-gradient(180deg, rgba(51,199,209,0.10), transparent)",
              }}
            />
            <div className="grad absolute right-6 top-6 rounded-full px-3 py-1 text-[12px] font-semibold text-ink shadow-[0_6px_18px_rgba(42,134,240,0.32)]">
              {t("pro.badge")}
            </div>
            <h3 className="relative pr-16 text-[24px] font-semibold text-tx">
              {t("pro.name")}
            </h3>
            <p className="relative mt-1 text-[17px] text-mut">
              {t("pro.price")} · {t("pro.period")}
            </p>
            <ul className="relative mt-6 space-y-3">
              {proFeatures.map((f) => (
                <FeatureRow key={f} text={f} highlight />
              ))}
            </ul>
            <Link
              href="/#pricing"
              className="btn-primary relative mt-auto inline-block w-fit px-6 py-2.5 pt-8"
            >
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
      <span className="tick mt-0.5 shrink-0" aria-hidden />
      {text}
    </li>
  );
}
