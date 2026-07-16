import { useTranslations } from "next-intl";
import Reveal from "./Reveal";
import CountUp from "./CountUp";

export default function Pricing() {
  const t = useTranslations("Pricing");
  const features = t.raw("features") as string[];
  // price is "$19" — extract the numeric part for count-up
  const priceNum = parseInt(t("price").replace(/\D/g, ""), 10) || 19;

  return (
    <section id="pricing" className="border-t border-line">
      <div className="mx-auto max-w-[980px] px-5 py-24 text-center sm:py-32">
        <Reveal as="h2" className="text-[clamp(2rem,5vw,3.5rem)] font-semibold tracking-[-0.025em] text-tx">
          {t("title")}
        </Reveal>

        {/* price — the single gradient on the page, counts up on view */}
        <Reveal index={1} className="mt-6">
          <span className="text-gradient text-[clamp(4rem,10vw,7rem)] font-semibold tracking-[-0.03em]">
            <CountUp value={priceNum} prefix="$" />
          </span>
          <span className="ml-3 text-[21px] text-mut">{t("note")}</span>
        </Reveal>

        {/* solid price card */}
        <Reveal index={2} className="card mx-auto mt-10 max-w-[460px] rounded-[20px] p-8 text-left sm:p-10">
          <ul className="space-y-3">
            {features.map((f) => (
              <li key={f} className="flex items-start gap-3 text-[15px] leading-snug text-tx">
                <svg className="mt-0.5 h-[18px] w-[18px] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--color-accent)" }} aria-hidden>
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                {f}
              </li>
            ))}
          </ul>

          {/* BUY_URL: заменить на checkout Lemon Squeezy при подключении магазина */}
          <a href="https://trykelvin.com" className="btn-primary mt-8 block w-full px-8 py-3.5 text-center text-[16px]">
            {t("cta")}
          </a>
        </Reveal>

        <Reveal as="p" index={3} className="mx-auto mt-5 max-w-[480px] text-[13px] leading-relaxed text-faint">
          {t("micro")}
        </Reveal>
      </div>
    </section>
  );
}
