import { useTranslations } from "next-intl";
import Image from "next/image";
import Reveal from "./Reveal";

export default function Showcase() {
  const t = useTranslations("Showcase");

  return (
    <section className="bg-bg py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-[980px] px-5 text-center">
        <Reveal
          as="span"
          className="mb-4 block text-[17px] text-accent"
        >
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
          className="mx-auto mt-4 max-w-[600px] text-[19px] leading-relaxed text-mut"
        >
          {t("desc")}
        </Reveal>

        <Reveal
          index={3}
          className="mt-14 flex justify-center"
        >
          <Image
            src="/assets/popover-light.png"
            alt={t("title")}
            width={664}
            height={1574}
            sizes="(max-width: 768px) 90vw, 500px"
            className="h-auto w-auto max-h-[500px] rounded-2xl"
            style={{ filter: "drop-shadow(0 40px 80px rgba(0,0,0,0.5))" }}
          />
        </Reveal>
      </div>
    </section>
  );
}
