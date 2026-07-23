import { useTranslations } from "next-intl";
import Reveal from "./Reveal";

export default function Trust() {
  const t = useTranslations("Privacy");
  const pills = t.raw("pills") as string[];

  return (
    <section id="privacy" className="border-y border-line bg-surface/35">
      <div className="mx-auto grid max-w-[1100px] gap-12 px-5 py-24 sm:py-32 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <Reveal>
          <p className="section-eyebrow !text-left">{t("eyebrow")}</p>
          <h2 className="section-title !text-left">{t("title")}</h2>
          <p className="mt-6 max-w-[520px] text-[17px] leading-relaxed text-mut">
            {t("note")}
          </p>
        </Reveal>
        <Reveal index={1} className="grid gap-3 sm:grid-cols-2">
          {pills.map((pill, index) => (
            <div
              key={pill}
              className="min-h-32 rounded-[18px] border border-line bg-bg/65 p-5"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/10 text-[13px] font-semibold text-accent">
                0{index + 1}
              </span>
              <p className="mt-5 text-[15px] font-medium leading-snug text-tx">{pill}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
