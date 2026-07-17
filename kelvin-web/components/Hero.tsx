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
    <section className="relative overflow-hidden px-5 pb-10 pt-32 text-center sm:pt-40">
      {/* subtle radial accent in the background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[600px]"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 0%, color-mix(in srgb, var(--color-accent) 14%, transparent), transparent 70%)",
        }}
      />

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
          <Link href="/#download" className="btn-primary">
            {t("ctaPrimary")}
          </Link>
          <Link href="/#pricing" className="btn-secondary">
            {t("ctaSecondary")}
          </Link>
        </Reveal>

        <Reveal index={4} as="p" className="mt-6 text-[13px] text-faint">
          {t("micro")}
        </Reveal>
      </div>

      {/* giant product screenshot with glow */}
      <Reveal index={5} className="relative mx-auto mt-16 w-fit lg:mt-20">
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
            className="mx-auto h-auto w-auto max-h-[72vh] rounded-[22px] border border-line"
            style={{
              aspectRatio: `${panelW} / ${panelH}`,
              boxShadow: "var(--shadow-product)",
            }}
          />
        </div>
      </Reveal>
    </section>
  );
}
