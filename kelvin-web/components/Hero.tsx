import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import Reveal from "./Reveal";

export default function Hero() {
  const t = useTranslations("Hero");
  const locale = useLocale();
  // Show the panel screenshot in the visitor's language
  const panelSrc = locale === "pt" ? "/assets/panel-pt-1.png" : "/assets/panel-ru-1.png";
  const panelW = locale === "pt" ? 808 : 652;
  const panelH = locale === "pt" ? 2252 : 2072;

  return (
    <section className="relative overflow-hidden pt-28 pb-0 text-center sm:pt-32 lg:pt-36">
      {/* ambient accent glow at top — very subtle, fades to the canvas */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[600px]"
        style={{
          background:
            "radial-gradient(ellipse 800px 400px at 50% 0%, rgba(51,199,209,0.14), transparent 70%)",
        }}
      />

      <div className="mx-auto max-w-[980px] px-5">
        <Reveal as="span" className="eyebrow mb-5 text-center">
          {t("eyebrow")}
        </Reveal>

        <Reveal
          as="h1"
          index={1}
          className="text-balance text-[clamp(2.75rem,8vw,5.5rem)] font-semibold leading-[1.04] tracking-[-0.025em] text-tx"
        >
          {t("title")}
        </Reveal>

        <Reveal
          as="p"
          index={2}
          className="mx-auto mt-6 max-w-[640px] text-pretty text-[clamp(1.125rem,2.2vw,1.5rem)] font-normal leading-snug text-mut"
        >
          {t("lead")}
        </Reveal>

        <Reveal index={3} className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/#download"
            className="btn-primary inline-block px-7 py-3"
          >
            {t("ctaPrimary")}
          </Link>
          <Link href="/#pricing" className="btn-secondary inline-block px-6 py-3">
            {t("ctaSecondary")}
          </Link>
        </Reveal>

        <Reveal as="p" index={4} className="mx-auto mt-6 max-w-[560px] text-[13px] leading-relaxed text-faint">
          {t("micro")}
        </Reveal>
      </div>

      {/* product screenshot — the device "lights up" with ambient glow + deep shadow */}
      <Reveal index={3} className="relative mt-16 lg:mt-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(closest-side, rgba(51,199,209,0.25), rgba(42,134,240,0.12) 55%, transparent)",
          }}
        />
        <Image
          src={panelSrc}
          alt="Kelvin"
          width={panelW}
          height={panelH}
          priority
          fetchPriority="high"
          quality={80}
          sizes="(max-width: 768px) 88vw, 480px"
          className="mx-auto h-auto w-auto max-h-[70vh] rounded-[22px] border border-line-strong"
          style={{
            aspectRatio: `${panelW} / ${panelH}`,
            boxShadow: "0 1px 0 rgba(255,255,255,0.06) inset, 0 40px 90px -20px rgba(0,0,0,0.6)",
          }}
        />
      </Reveal>
    </section>
  );
}
