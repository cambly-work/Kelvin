import { useLocale, useTranslations } from "next-intl";
import Reveal from "./Reveal";

export default function Trust() {
  const t = useTranslations("Privacy");
  const locale = useLocale();
  const pills = t.raw("pills") as string[];
  const localCore = locale === "pt" ? "NÚCLEO LOCAL" : "ЛОКАЛЬНОЕ ЯДРО";
  const external = locale === "pt" ? "0 telemetria" : "0 телеметрии";
  const processing = locale === "pt" ? "Processamento no Mac" : "Обработка на Mac";

  return (
    <section id="privacy" className="kelvin-privacy relative overflow-hidden border-y border-line bg-surface/35">
      <div className="mx-auto grid max-w-[1180px] gap-12 px-5 py-24 sm:py-32 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
        <Reveal>
          <p className="section-eyebrow !text-left">{t("eyebrow")}</p>
          <h2 className="section-title !text-left">{t("title")}</h2>
          <p className="mt-6 max-w-[520px] text-[17px] leading-relaxed text-mut">
            {t("note")}
          </p>
        </Reveal>
        <Reveal index={1} className="kelvin-privacy-console">
          <div className="kelvin-privacy-console-head">
            <span>{localCore}</span><span className="kelvin-live-dot" />
          </div>
          <div className="kelvin-local-route" aria-hidden>
            <span>MAC</span><i /><b>KELVIN</b><i /><span>SMC</span>
          </div>
          <div className="kelvin-privacy-readout">
            <strong>{external}</strong><span>{processing}</span>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {pills.map((pill, index) => (
              <div key={pill} className="kelvin-privacy-item">
                <span>0{index + 1}</span>
                <p>{pill}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
