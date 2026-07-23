import { useLocale, useTranslations } from "next-intl";
import Reveal from "./Reveal";
import appcast from "@/public/appcast.json";

export default function Download() {
  const t = useTranslations("Download");
  const locale = useLocale();

  return (
    <section id="download" className="download-section relative overflow-hidden">
      <Reveal className="relative mx-auto max-w-[980px] px-5 py-24 text-center sm:py-36">
        <p className="section-eyebrow">{t("eyebrow")}</p>
        <h2 className="text-[clamp(2.5rem,6vw,4.75rem)] font-bold tracking-[-0.045em] text-tx">
          {t("title")}
        </h2>
        <p className="mx-auto mt-4 max-w-[520px] text-mut">{t("lead")}</p>

        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <a href={appcast.url} className="btn-primary">
            {t("ctaPrimary")}
          </a>
          <a
            href="https://trykelvin.lemonsqueezy.com/checkout/buy/9f0f7e7c-7be9-4def-94e2-99b8e2c6b801"
            className="btn-secondary"
          >
            {t("ctaSecondary")}
          </a>
        </div>

        <div className="mx-auto mt-8 flex max-w-[620px] flex-wrap justify-center gap-x-6 gap-y-2 text-[12px] font-medium text-mut">
          <span>{t("version", { version: appcast.version })}</span>
          <span>{t("compatibility")}</span>
          <span>{t("trial")}</span>
          <a href={`/${locale}/notes`} className="text-accent hover:underline">
            {t("changelog")}
          </a>
        </div>
        <p className="mx-auto mt-6 max-w-[560px] text-[13px] leading-relaxed text-faint">
          {t("micro")}
        </p>
      </Reveal>
    </section>
  );
}
