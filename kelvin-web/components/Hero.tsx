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
    <section className="relative overflow-hidden px-5 pb-10 pt-40 text-center sm:pt-48">
      {/* Warp-style размытые акцентные пятна на фоне */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {/* Центральное верхнее свечение */}
        <div
          className="absolute left-1/2 top-0 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-3xl"
          style={{
            background: "radial-gradient(circle, color-mix(in srgb, var(--color-accent) 25%, transparent), transparent 70%)",
          }}
        />
        {/* Второстепенные пятна */}
        <div
          className="absolute left-1/4 top-1/3 h-96 w-96 rounded-full opacity-20 blur-2xl"
          style={{
            background: "radial-gradient(circle, color-mix(in srgb, var(--color-accent) 20%, transparent), transparent 70%)",
          }}
        />
        <div
          className="absolute right-1/4 top-1/4 h-80 w-80 rounded-full opacity-25 blur-2xl"
          style={{
            background: "radial-gradient(circle, color-mix(in srgb, var(--color-accent) 18%, transparent), transparent 70%)",
          }}
        />
      </div>

      <div className="mx-auto max-w-[980px]">
        <Reveal
          as="p"
          className="mb-5 text-[13px] font-medium uppercase tracking-[0.14em] text-accent"
        >
          {t("eyebrow")}
        </Reveal>

        <Reveal
          as="h1"
          index={1}
          className="text-balance text-[clamp(2.75rem,8vw,5.5rem)] font-bold leading-[1.02] tracking-[-0.035em] text-tx"
        >
          {t("title")}
        </Reveal>

        <Reveal
          as="p"
          index={2}
          className="mx-auto mt-6 max-w-[640px] text-pretty text-[clamp(1.125rem,2.2vw,1.375rem)] leading-snug text-mut"
        >
          {t("lead")}
        </Reveal>

        <Reveal index={3} className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/#download"
            className="btn-primary transition-transform duration-200 hover:scale-105"
          >
            {t("ctaPrimary")}
          </Link>
          <Link
            href="/#pricing"
            className="btn-secondary transition-transform duration-200 hover:scale-105"
          >
            {t("ctaSecondary")}
          </Link>
        </Reveal>

        <Reveal index={4} as="p" className="mt-6 text-[13px] text-faint">
          {t("micro")}
        </Reveal>
      </div>

      {/* Скриншот с мягким свечением и едва заметной обводкой */}
      <Reveal index={5} className="relative mx-auto mt-16 w-fit lg:mt-20">
        {/* Дополнительное свечение позади скриншота */}
        <div
          className="absolute inset-0 -z-10 scale-110 rounded-[22px] opacity-60 blur-2xl"
          style={{
            background: "radial-gradient(circle at 50% 50%, color-mix(in srgb, var(--color-accent) 30%, transparent), transparent 70%)",
          }}
        />
        <div className="glow relative">
          <Image
            src={panelSrc}
            alt={t("title")}
            width={panelW}
            height={panelH}
            priority
            fetchPriority="high"
            quality={80}
            sizes="(max-width: 768px) 88vw, 480px"
            className="mx-auto h-auto w-auto max-h-[72vh] rounded-[22px] border border-white/[0.06]"
            style={{
              aspectRatio: `${panelW} / ${panelH}`,
              boxShadow: "0 0 60px -20px color-mix(in srgb, var(--color-accent) 40%, transparent), var(--shadow-product)",
            }}
          />
        </div>
      </Reveal>
    </section>
  );
}
