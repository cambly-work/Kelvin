import { useTranslations } from "next-intl";
import Reveal from "./Reveal";

export default function Privacy() {
  const t = useTranslations("Privacy");
  const pills = t.raw("pills") as string[];

  return (
    <section id="privacy" className="py-20 sm:py-28 lg:py-32">
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

        <Reveal index={2} className="mt-10 flex flex-wrap justify-center gap-3">
          {pills.map((pill) => (
            <span
              key={pill}
              className="glass rounded-full px-5 py-2.5 text-[15px] text-tx"
            >
              {pill}
            </span>
          ))}
        </Reveal>

        <Reveal
          as="p"
          index={3}
          className="mx-auto mt-8 max-w-[600px] text-[clamp(1rem,1.6vw,1.125rem)] leading-relaxed text-mut"
        >
          {t("note")}
        </Reveal>
      </div>
    </section>
  );
}
