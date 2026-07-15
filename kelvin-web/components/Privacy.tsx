import { useTranslations } from "next-intl";
import Reveal from "./Reveal";

export default function Privacy() {
  const t = useTranslations("Privacy");
  const pills = t.raw("pills") as string[];

  return (
    <section id="privacy" className="border-t border-line">
      <div className="mx-auto max-w-[980px] px-5 py-24 text-center sm:py-32">
        <Reveal as="h2" className="text-[clamp(2rem,5vw,3.5rem)] font-semibold tracking-[-0.025em] text-tx">
          {t("title")}
        </Reveal>

        <Reveal index={1} className="mt-10 flex flex-wrap justify-center gap-3">
          {pills.map((pill) => (
            <span key={pill} className="rounded-full bg-surface px-5 py-2.5 text-[15px] text-tx">
              {pill}
            </span>
          ))}
        </Reveal>

        <Reveal as="p" index={2} className="mx-auto mt-8 max-w-[600px] text-[clamp(1.0625rem,1.8vw,1.25rem)] leading-relaxed text-mut">
          {t("note")}
        </Reveal>
      </div>
    </section>
  );
}
