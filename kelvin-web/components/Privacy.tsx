import { useTranslations } from "next-intl";
import Reveal from "./Reveal";

export default function Privacy() {
  const t = useTranslations("Privacy");
  const pills = t.raw("pills") as string[];

  return (
    <section id="privacy" className="bg-bg py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-[980px] px-5 text-center">
        <Reveal
          as="h2"
          className="text-[clamp(2rem,5vw,3.5rem)] font-semibold tracking-[-0.025em] text-tx"
        >
          {t("title")}
        </Reveal>

        <Reveal index={1} className="mt-10 flex flex-wrap justify-center gap-3">
          {pills.map((pill) => (
            <span
              key={pill}
              className="rounded-full bg-surface px-5 py-2 text-[15px] text-tx"
            >
              {pill}
            </span>
          ))}
        </Reveal>

        <Reveal
          as="p"
          index={2}
          className="mx-auto mt-8 max-w-[600px] text-[19px] leading-relaxed text-mut"
        >
          {t("note")}
        </Reveal>
      </div>
    </section>
  );
}
