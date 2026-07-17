import { useTranslations } from "next-intl";
import Reveal from "./Reveal";
import appcast from "@/public/appcast.json";

export default function Download() {
  const t = useTranslations("Download");

  return (
    <section id="download" className="border-t border-line">
      <Reveal className="mx-auto max-w-[980px] px-5 py-24 text-center sm:py-32">
        <h2 className="text-[clamp(2rem,5vw,3.25rem)] font-bold tracking-[-0.03em] text-tx">
          {t("title")}
        </h2>
        <p className="mx-auto mt-4 max-w-[520px] text-mut">{t("lead")}</p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
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

        <p className="mx-auto mt-6 max-w-[560px] text-[13px] leading-relaxed text-faint">
          {t("micro")}
        </p>
      </Reveal>
    </section>
  );
}
