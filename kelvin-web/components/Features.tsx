import { useTranslations } from "next-intl";
import Reveal from "./Reveal";
import { Icon } from "./icons";
import {
  LazyPower,
  LazyFans,
  LazyToggles,
  LazyLayout,
  LazySecurity,
  LazyDev,
} from "./LazyWidget";

export default function Features() {
  const t = useTranslations("Features");

  return (
    <section id="features" className="border-t border-line py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-[980px] px-5 text-center">
        <Reveal as="span" className="eyebrow mb-4">
          {t("eyebrow")}
        </Reveal>
        <Reveal
          as="h2"
          index={1}
          className="text-[clamp(2rem,5vw,3.5rem)] font-semibold tracking-[-0.025em] text-tx"
        >
          {t("title")}
        </Reveal>
      </div>

      <div className="mx-auto mt-16 max-w-[1100px] space-y-24 px-5 sm:mt-24 sm:space-y-32 lg:space-y-40">
        <BigFeature
          n={1}
          icon="power"
          title={t("power.title")}
          desc={t("power.desc")}
          visual={<LazyPower />}
        />
        <BigFeature
          n={2}
          icon="fans"
          title={t("fans.title")}
          desc={t("fans.desc")}
          visual={<LazyFans />}
          flip
        />
        <BigFeature
          n={3}
          icon="toggles"
          title={t("toggles.title")}
          desc={t("toggles.desc")}
          visual={<LazyToggles />}
        />
        <BigFeature
          n={4}
          icon="layout"
          title={t("layout.title")}
          desc={t("layout.desc")}
          visual={<LazyLayout />}
          flip
        />
        <BigFeature
          n={5}
          icon="security"
          title={t("security.title")}
          desc={t("security.desc")}
          visual={<LazySecurity />}
        />
        <BigFeature
          n={6}
          icon="dev"
          title={t("dev.title")}
          desc={t("dev.desc")}
          visual={<LazyDev />}
          flip
        />
      </div>
    </section>
  );
}

type BigFeatureProps = {
  n: number;
  icon: "power" | "fans" | "toggles" | "layout" | "security" | "dev";
  title: string;
  desc: string;
  visual: React.ReactNode;
  flip?: boolean;
};

/* Apple-style alternating block: text one side, live UI the other.
   The glow under the visual is the "product lights up" effect. */
function BigFeature({ n, icon, title, desc, visual, flip }: BigFeatureProps) {
  return (
    <div className="grid items-center gap-10 sm:gap-16 lg:grid-cols-2">
      {/* text */}
      <Reveal
        index={0}
        className={`flex flex-col ${flip ? "lg:order-2 lg:text-right" : "lg:order-1"}`}
      >
        <div
          className={`mb-5 flex items-center gap-3 ${
            flip ? "lg:flex-row-reverse" : ""
          }`}
        >
          <span className="icon-chip">
            <Icon name={icon} width={24} height={24} />
          </span>
          <span className="text-[13px] font-medium uppercase tracking-[0.14em] text-faint">
            {String(n).padStart(2, "0")}
          </span>
        </div>
        <h3 className="text-[clamp(1.75rem,4vw,2.5rem)] font-semibold tracking-[-0.02em] text-tx">
          {title}
        </h3>
        <p
          className={`mt-4 max-w-md text-[clamp(1rem,1.6vw,1.125rem)] leading-relaxed text-mut ${
            flip ? "lg:ml-auto" : ""
          }`}
        >
          {desc}
        </p>
      </Reveal>

      {/* visual */}
      <Reveal
        index={1}
        className={`relative ${flip ? "lg:order-1" : "lg:order-2"}`}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(closest-side, rgba(51,199,209,0.18), rgba(42,134,240,0.09) 55%, transparent)",
          }}
        />
        {visual}
      </Reveal>
    </div>
  );
}
