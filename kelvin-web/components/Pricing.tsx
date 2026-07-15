import { useTranslations } from "next-intl";
import Reveal from "./Reveal";

export default function Pricing() {
  const t = useTranslations("Pricing");
  const features = t.raw("features") as string[];

  return (
    <section id="pricing" className="border-t border-line py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-[980px] px-5 text-center">
        <Reveal as="span" className="eyebrow mb-4">
          {t("eyebrow")}
        </Reveal>
        <Reveal
          as="h2"
          index={1}
          className="text-[clamp(2rem,5vw,3.5rem)] font-semibold tracking-[-0.025em] text-tx"
        >
          {t("title")}
        </Reveal>

        {/* price — gradient text */}
        <Reveal index={2} className="mt-6">
          <span
            className="text-[clamp(4rem,10vw,7rem)] font-bold tracking-[-0.03em]"
            style={{
              background:
                "linear-gradient(135deg, #4deaea 0%, #33c7d1 45%, #2a86f0 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {t("price")}
          </span>
          <span className="ml-3 text-[21px] text-mut">{t("note")}</span>
        </Reveal>

        {/* glass price card */}
        <Reveal
          index={3}
          className="glass mx-auto mt-10 max-w-[460px] overflow-hidden rounded-[24px] p-8 text-left ring-1 ring-accent/30 sm:p-10"
        >
          <ul className="space-y-3">
            {features.map((f) => (
              <li
                key={f}
                className="flex items-start gap-3 text-[15px] leading-snug text-tx"
              >
                <span className="tick mt-0.5 shrink-0" aria-hidden />
                {f}
              </li>
            ))}
          </ul>

          {/* BUY_URL: заменить на checkout Lemon Squeezy при подключении магазина */}
          <a
            href="https://trykelvin.com"
            className="btn-primary mt-8 block w-full px-8 py-3.5 text-center text-[16px]"
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
