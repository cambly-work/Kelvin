import { useTranslations } from "next-intl";
import Image from "next/image";
import Reveal from "./Reveal";

export default function Showcase() {
  const t = useTranslations("Showcase");

  return (
    <section className="border-t border-line">
      <div className="mx-auto max-w-[980px] px-5 py-24 text-center sm:py-32">
        <Reveal as="h2" className="mx-auto max-w-[700px] text-balance text-[clamp(2rem,5vw,3.5rem)] font-semibold tracking-[-0.025em] text-tx">
          {t("title")}
        </Reveal>
        <Reveal as="p" index={1} className="mx-auto mt-4 max-w-[600px] text-[clamp(1.0625rem,1.8vw,1.25rem)] leading-relaxed text-mut">
          {t("desc")}
        </Reveal>

        <Reveal index={2} className="mt-14 flex flex-wrap items-center justify-center gap-6">
          <ShowcaseShot src="/assets/panel-ru-1.png" alt="Kelvin" w={652} h={2072} />
          <ShowcaseShot src="/assets/panel-pt-2.png" alt="Kelvin" w={712} h={1876} />
        </Reveal>
      </div>
    </section>
  );
}

function ShowcaseShot({ src, alt, w, h }: { src: string; alt: string; w: number; h: number }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={w}
      height={h}
      quality={75}
      sizes="(max-width: 768px) 42vw, 220px"
      className="h-auto w-auto max-h-[460px] rounded-[18px] border border-line"
      style={{
        aspectRatio: `${w} / ${h}`,
        boxShadow: "var(--shadow-product)",
      }}
    />
  );
}
