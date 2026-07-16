import { useTranslations } from "next-intl";
import Image from "next/image";
import Reveal from "./Reveal";
import { Icon } from "./icons";

export default function Features({ locale }: { locale: string }) {
  const t = useTranslations("Features");
  // Crop screenshots are only available for the RU panel layout.
  // On other locales, fall back to text+icon for all features so visitors
  // never see screenshots with foreign-language labels.
  const hasCrops = locale === "ru";

  return (
    <section id="features" className="border-t border-line">
      {/* Section heading */}
      <div className="mx-auto max-w-[980px] px-5 pt-24 pb-10 text-center sm:pt-32">
        <Reveal as="h2" className="text-[clamp(2rem,5vw,3.5rem)] font-semibold tracking-[-0.025em] text-tx">
          {t("title")}
        </Reveal>
      </div>

      {hasCrops ? (
        /* RU: four big product blocks with honest screenshot crops */
        <div>
          <BigFeature icon="power" title={t("power.title")} desc={t("power.desc")} crop="/assets/crops/ru-power.png" cropW={652} cropH={207} />
          <BigFeature icon="fans" title={t("fans.title")} desc={t("fans.desc")} crop="/assets/crops/ru-fans.png" cropW={652} cropH={210} flip />
          <BigFeature icon="toggles" title={t("toggles.title")} desc={t("toggles.desc")} crop="/assets/crops/ru-toggles.png" cropW={652} cropH={214} />
          <BigFeature icon="security" title={t("security.title")} desc={t("security.desc")} crop="/assets/crops/ru-settings.png" cropW={652} cropH={267} flip />
        </div>
      ) : (
        /* PT: text+icon for all six features (no foreign-label screenshots) */
        <div className="mx-auto max-w-[980px] px-5">
          <div className="grid gap-12 sm:grid-cols-2 sm:gap-x-16 sm:gap-y-16">
            <TextFeature icon="power" title={t("power.title")} desc={t("power.desc")} />
            <TextFeature icon="fans" title={t("fans.title")} desc={t("fans.desc")} />
            <TextFeature icon="toggles" title={t("toggles.title")} desc={t("toggles.desc")} />
            <TextFeature icon="security" title={t("security.title")} desc={t("security.desc")} />
            <TextFeature icon="layout" title={t("layout.title")} desc={t("layout.desc")} />
            <TextFeature icon="dev" title={t("dev.title")} desc={t("dev.desc")} />
          </div>
        </div>
      )}

      {/* RU: two quieter text-only features below the crops */}
      {hasCrops && (
        <div className="mx-auto max-w-[980px] px-5 py-24 sm:py-32">
          <div className="grid gap-12 sm:grid-cols-2 sm:gap-16">
            <TextFeature icon="layout" title={t("layout.title")} desc={t("layout.desc")} />
            <TextFeature icon="dev" title={t("dev.title")} desc={t("dev.desc")} />
          </div>
        </div>
      )}
    </section>
  );
}

type BigFeatureProps = {
  icon: "power" | "fans" | "toggles" | "security";
  title: string;
  desc: string;
  crop: string;
  cropW: number;
  cropH: number;
  flip?: boolean;
};

function BigFeature({ icon, title, desc, crop, cropW, cropH, flip }: BigFeatureProps) {
  return (
    <div className="border-t border-line">
      <div className="mx-auto grid max-w-[980px] items-center gap-10 px-5 py-20 sm:py-28 lg:grid-cols-2 lg:gap-16">
        <Reveal className={flip ? "lg:order-2 lg:text-left" : "lg:order-1"}>
          <span className="mb-5 block text-accent">
            <Icon name={icon} width={28} height={28} />
          </span>
          <h3 className="text-[clamp(1.75rem,4vw,2.5rem)] font-semibold tracking-[-0.02em] text-tx">
            {title}
          </h3>
          <p className="mt-4 max-w-md text-[clamp(1.0625rem,1.8vw,1.25rem)] leading-relaxed text-mut">
            {desc}
          </p>
        </Reveal>
        <Reveal index={1} className={flip ? "lg:order-1" : "lg:order-2"}>
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
  icon: "power" | "fans" | "toggles" | "security" | "layout" | "dev";
  title: string;
  desc: string;
}) {
  return (
    <Reveal>
      <span className="mb-4 block text-accent">
        <Icon name={icon} width={28} height={28} />
      </span>
      <h3 className="text-[24px] font-semibold tracking-[-0.02em] text-tx">
        {title}
      </h3>
      <p className="mt-3 text-[17px] leading-relaxed text-mut">{desc}</p>
    </Reveal>
  );
}
