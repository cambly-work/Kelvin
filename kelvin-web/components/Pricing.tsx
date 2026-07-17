import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import Reveal from "./Reveal";

export default function Pricing() {
  const t = useTranslations("Compare");
  const freeFeatures = t.raw("free.features") as string[];
  const proFeatures = t.raw("pro.features") as string[];

  return (
    <section id="pricing" className="border-t border-line">
      <div className="mx-auto max-w-[980px] px-5 py-24 sm:py-32">
        <Reveal as="p" className="mb-4 text-center text-[13px] font-medium uppercase tracking-[0.14em] text-accent">
          {t("eyebrow")}
        </Reveal>
        <Reveal as="h2" index={1} className="mx-auto max-w-[680px] text-balance text-center text-[clamp(2rem,5vw,3.25rem)] font-bold tracking-[-0.03em] text-tx">
          {t("title")}
        </Reveal>
        <Reveal as="p" index={2} className="mx-auto mt-4 max-w-[560px] text-center text-mut">
          {t("sub")}
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {/* Free */}
          <Reveal className="card rounded-[18px] p-8">
            <h3 className="text-[20px] font-bold text-tx">{t("free.name")}</h3>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-[42px] font-bold tracking-[-0.02em] text-tx">
                {t("free.price")}
              </span>
              <span className="text-[14px] text-faint">{t("free.period")}</span>
            </div>
            <ul className="mt-6 space-y-3">
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
          </Reveal>

          {/* Pro — emphasized */}
          <Reveal
            index={1}
            className="card relative overflow-hidden rounded-[18px] p-8 ring-1 ring-accent/40"
          >
            <span className="absolute right-5 top-5 rounded-full bg-accent px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
              {t("pro.badge")}
            </span>
            <h3 className="text-[20px] font-bold text-tx">{t("pro.name")}</h3>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-gradient text-[48px] font-bold tracking-[-0.02em]">
                {t("pro.price")}
              </span>
              <span className="text-[14px] text-faint">{t("pro.period")}</span>
            </div>
            <ul className="mt-6 space-y-3">
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
