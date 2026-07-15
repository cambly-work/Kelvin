import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import Reveal from "./Reveal";

export default function Hero() {
  const t = useTranslations("Hero");

  return (
    <section className="relative overflow-hidden pt-28 pb-0 text-center sm:pt-32 lg:pt-40">
      {/* ambient accent glow at top — very subtle, fades to pure black */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[600px]"
        style={{
          background:
            "radial-gradient(ellipse 800px 400px at 50% 0%, rgba(51,199,209,0.12), transparent 70%)",
        }}
      />

      <div className="mx-auto max-w-[980px] px-5">
        <Reveal
          as="span"
          className="mb-5 block text-[15px] font-normal text-accent"
        >
          {t("eyebrow")}
        </Reveal>

        <Reveal
          as="h1"
          index={1}
          className="text-balance text-[clamp(2.75rem,8vw,6rem)] font-semibold leading-[1.05] tracking-[-0.025em] text-tx"
        >
          {t("title")}
        </Reveal>

        <Reveal
          as="p"
          index={2}
          className="mx-auto mt-6 max-w-[680px] text-pretty text-[clamp(1.25rem,2.5vw,1.75rem)] font-normal leading-snug text-mut"
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
          <Link
            href="/#pricing"
            className="link-arrow px-2 py-3"
          >
            {t("ctaSecondary")}
          </Link>
        </Reveal>

        <Reveal
          as="p"
          index={4}
          className="mt-6 text-[13px] text-faint"
        >
          {t("micro")}
        </Reveal>
      </div>

      {/* product screenshot — Apple style: centered, large, drop shadow */}
      <Reveal index={3} className="relative mt-16 lg:mt-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse 600px 300px at 50% 50%, rgba(42,134,240,0.15), transparent 70%)",
          }}
        />
        <Image
          src="/assets/popover-dark.png"
          alt="Kelvin"
          width={664}
          height={1574}
          priority
          sizes="(max-width: 768px) 90vw, 664px"
          className="mx-auto h-auto w-auto max-h-[70vh] rounded-2xl"
          style={{
            filter: "drop-shadow(0 50px 100px rgba(0,0,0,0.8))",
          }}
        />
      </Reveal>
    </section>
  );
}
