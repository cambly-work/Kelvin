import { useTranslations } from "next-intl";
import Image from "next/image";
import Reveal from "./Reveal";
import { Icon, type FeatureIcon } from "./icons";

export default function Features({ locale }: { locale: string }) {
  const t = useTranslations("Features");
  // Crop screenshots only exist for the RU panel layout.
  // On other locales, fall back to text+icon for all features so visitors
  // never see screenshots with foreign-language labels.
  const hasCrops = locale === "ru";

  const big: {
    key: "power" | "fans" | "toggles" | "security";
    crop: string;
    cropW: number;
    cropH: number;
    flip?: boolean;
  }[] = [
    { key: "power", crop: "/assets/crops/ru-power.png", cropW: 652, cropH: 207 },
    { key: "fans", crop: "/assets/crops/ru-fans.png", cropW: 652, cropH: 210, flip: true },
    { key: "toggles", crop: "/assets/crops/ru-toggles.png", cropW: 652, cropH: 214 },
    { key: "security", crop: "/assets/crops/ru-settings.png", cropW: 652, cropH: 267, flip: true },
  ];

  const quiet: ("layout" | "dev")[] = ["layout", "dev"];

  return (
    <section id="features" className="border-t border-line">
      {/* heading */}
      <div className="mx-auto max-w-[980px] px-5 pt-24 pb-6 text-center sm:pt-32">
        <Reveal as="p" className="mb-4 text-[13px] font-medium uppercase tracking-[0.14em] text-accent">
          {t("eyebrow")}
        </Reveal>
        <Reveal as="h2" index={1} className="text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-[-0.03em] text-tx">
          {t("title")}
        </Reveal>
      </div>

      {hasCrops ? (
        <div>
          {big.map((f) => (
            <BigFeature
              key={f.key}
              icon={f.key}
              title={t(`${f.key}.title`)}
              desc={t(`${f.key}.desc`)}
              crop={f.crop}
              cropW={f.cropW}
              cropH={f.cropH}
              flip={f.flip}
            />
          ))}
        </div>
      ) : (
        <div className="mx-auto max-w-[980px] px-5">
          <div className="grid gap-12 sm:grid-cols-2 sm:gap-x-16 sm:gap-y-16">
            {[...big.map((b) => b.key), ...quiet].map((k) => (
              <TextFeature key={k} icon={k} title={t(`${k}.title`)} desc={t(`${k}.desc`)} />
            ))}
          </div>
        </div>
      )}

      {/* RU: two quieter text-only features below the crops */}
      {hasCrops && (
        <div className="mx-auto max-w-[980px] px-5 py-24 sm:py-32">
          <div className="grid gap-12 sm:grid-cols-2 sm:gap-16">
            {quiet.map((k) => (
              <TextFeature key={k} icon={k} title={t(`${k}.title`)} desc={t(`${k}.desc`)} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

function BigFeature({
  icon,
  title,
  desc,
  crop,
  cropW,
  cropH,
  flip,
}: {
  icon: FeatureIcon;
  title: string;
  desc: string;
  crop: string;
  cropW: number;
  cropH: number;
  flip?: boolean;
}) {
  return (
    <div className="border-t border-line">
      <div className="mx-auto grid max-w-[980px] items-center gap-10 px-5 py-20 sm:py-28 lg:grid-cols-2 lg:gap-16">
        <Reveal className={flip ? "lg:order-2 lg:text-left" : "lg:order-1"}>
          <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-[14px] border border-line bg-surface text-accent">
            <Icon name={icon} width={24} height={24} />
          </span>
          <h3 className="text-[clamp(1.75rem,4vw,2.5rem)] font-bold tracking-[-0.025em] text-tx">
            {title}
          </h3>
          <p className="mt-4 max-w-md text-[clamp(1.0625rem,1.8vw,1.25rem)] leading-relaxed text-mut">
            {desc}
          </p>
        </Reveal>
        <Reveal index={1} className={flip ? "lg:order-1" : "lg:order-2"}>
          <div className="glow relative">
            <Image
              src={crop}
              alt={title}
              width={cropW}
              height={cropH}
              quality={80}
              sizes="(max-width: 768px) 90vw, 460px"
              className="h-auto w-full rounded-[18px] border border-line"
              style={{
                aspectRatio: `${cropW} / ${cropH}`,
                boxShadow: "var(--shadow-product)",
              }}
            />
          </div>
        </Reveal>
      </div>
    </div>
  );
}

function TextFeature({
  icon,
  title,
  desc,
}: {
  icon: FeatureIcon;
  title: string;
  desc: string;
}) {
  return (
    <Reveal>
      <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-[12px] border border-line bg-surface text-accent">
        <Icon name={icon} width={22} height={22} />
      </span>
      <h3 className="text-[24px] font-bold tracking-[-0.02em] text-tx">{title}</h3>
      <p className="mt-3 text-[17px] leading-relaxed text-mut">{desc}</p>
    </Reveal>
  );
}
