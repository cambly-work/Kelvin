import { useTranslations } from "next-intl";
import Image from "next/image";
import Reveal from "./Reveal";

export default function Showcase() {
  const t = useTranslations("Showcase");

  return (
    <section className="py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-[980px] px-5 text-center">
        <Reveal as="span" className="eyebrow mb-4">
          {t("eyebrow")}
        </Reveal>
        <Reveal
          as="h2"
          index={1}
          className="mx-auto max-w-[700px] text-balance text-[clamp(2rem,5vw,3.5rem)] font-semibold tracking-[-0.025em] text-tx"
        >
          {t("title")}
        </Reveal>
        <Reveal
          as="p"
          index={2}
          className="mx-auto mt-4 max-w-[600px] text-[clamp(1rem,1.6vw,1.125rem)] leading-relaxed text-mut"
        >
          {t("desc")}
        </Reveal>

        {/* both panels side by side, each with its own ambient glow */}
        <Reveal index={3} className="mt-14 flex flex-wrap items-center justify-center gap-6">
          <ShowcaseShot
            src="/assets/panel-ru-1.png"
            alt="Kelvin — panel"
            w={652}
            h={2072}
          />
          <ShowcaseShot
            src="/assets/panel-pt-2.png"
            alt="Kelvin — panel"
            w={712}
            h={1876}
          />
        </Reveal>
      </div>
    </section>
  );
}

function ShowcaseShot({
  src,
  alt,
  w,
  h,
}: {
  src: string;
  alt: string;
  w: number;
  h: number;
}) {
  return (
    <div className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(closest-side, rgba(51,199,209,0.18), rgba(42,134,240,0.09) 55%, transparent)",
        }}
      />
      <Image
        src={src}
        alt={alt}
        width={w}
        height={h}
        quality={75}
        sizes="(max-width: 768px) 42vw, 220px"
        className="h-auto w-auto max-h-[460px] rounded-[18px] border border-line-strong"
        style={{
          aspectRatio: `${w} / ${h}`,
          boxShadow: "0 1px 0 rgba(255,255,255,0.06) inset, 0 30px 70px -22px rgba(0,0,0,0.55)",
        }}
      />
    </div>
  );
}
