import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import Reveal from "./Reveal";

export default function Hero() {
  const t = useTranslations("Hero");
  const locale = useLocale();
  const panelSrc = locale === "pt" ? "/assets/panel-pt-1.png" : "/assets/panel-ru-1.png";
  const panelW = locale === "pt" ? 808 : 652;
  const panelH = locale === "pt" ? 2252 : 2072;

  return (
    <section className="overflow-hidden px-5 pb-10 pt-28 text-center sm:pt-36">
      <div className="mx-auto max-w-[980px]">
        <Reveal
          as="h1"
          className="text-balance text-[clamp(2.75rem,8vw,5.5rem)] font-semibold leading-[1.04] tracking-[-0.025em] text-tx"
        >
          {t("title")}
        </Reveal>

        <Reveal
          as="p"
          index={1}
          className="mx-auto mt-6 max-w-[640px] text-pretty text-[clamp(1.125rem,2.2vw,1.5rem)] font-normal leading-snug text-mut"
        >
          {t("lead")}
        </Reveal>

        <Reveal index={2} className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/#download" className="btn-primary inline-block px-7 py-3">
            {t("ctaPrimary")}
          </Link>
          <Link href="/#pricing" className="btn-secondary inline-block px-6 py-3">
            {t("ctaSecondary")}
          </Link>
        </Reveal>
      </div>

      {/* Product screenshot — honest, simple shadow, no glow */}
      <Reveal index={3} className="relative mx-auto mt-16 w-fit lg:mt-20">
        <Image
          src={panelSrc}
          alt="Kelvin"
          width={panelW}
          height={panelH}
          priority
          fetchPriority="high"
          quality={80}
          sizes="(max-width: 768px) 88vw, 480px"
          className="mx-auto h-auto w-auto max-h-[70vh] rounded-[22px] border border-line"
          style={{
            aspectRatio: `${panelW} / ${panelH}`,
            boxShadow: "0 30px 80px -30px rgba(0,0,0,0.8)",
          }}
        />
      </Reveal>
    </section>
  );
}
