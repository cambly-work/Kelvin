import { useTranslations } from "next-intl";
import Reveal from "./Reveal";

export default function Pricing() {
  const t = useTranslations("Pricing");
  const features = t.raw("features") as string[];

  return (
    <section id="pricing" className="bg-bg2 py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-[980px] px-5 text-center">
        <Reveal
          as="h2"
          className="text-[clamp(2rem,5vw,3.5rem)] font-semibold tracking-[-0.025em] text-tx"
        >
          {t("title")}
        </Reveal>

        <Reveal index={1} className="mt-8">
          <span className="text-[clamp(4rem,10vw,7rem)] font-semibold tracking-[-0.03em] text-tx">
            {t("price")}
          </span>
          <span className="ml-3 text-[21px] text-mut">{t("note")}</span>
        </Reveal>

        <Reveal
          as="ul"
          index={2}
          className="mx-auto mt-10 max-w-[420px] space-y-3 text-left"
        >
          {features.map((f) => (
            <li
              key={f}
              className="flex items-start gap-3 text-[15px] leading-snug text-tx"
            >
              <svg
                className="mt-0.5 h-[18px] w-[18px] shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ color: "var(--color-accent)" }}
                aria-hidden
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
              {f}
            </li>
          ))}
        </Reveal>

        {/* BUY_URL: заменить на checkout Lemon Squeezy при подключении магазина */}
        <Reveal index={3} className="mt-10">
          <a
            href="https://trykelvin.com"
            className="btn-primary inline-block px-8 py-3"
          >
            {t("cta")}
          </a>
        </Reveal>

        <Reveal
          as="p"
          index={4}
          className="mx-auto mt-5 max-w-[480px] text-[13px] leading-relaxed text-faint"
        >
          {t("micro")}
        </Reveal>
      </div>
    </section>
  );
}
