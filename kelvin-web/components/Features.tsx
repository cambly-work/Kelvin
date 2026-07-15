import { useTranslations } from "next-intl";
import Image from "next/image";
import Reveal from "./Reveal";

export default function Features() {
  const t = useTranslations("Features");

  return (
    <section id="features" className="bg-bg2 pt-20 pb-10 sm:pt-28 sm:pb-14 lg:pt-32">
      <div className="mx-auto max-w-[980px] px-5 text-center">
        <Reveal
          as="h2"
          className="text-[clamp(2rem,5vw,3.5rem)] font-semibold tracking-[-0.025em] text-tx"
        >
          {t("title")}
        </Reveal>
      </div>

      {/* Feature blocks — Apple style: alternating big tiles */}
      <div className="mx-auto mt-14 grid max-w-[1024px] gap-4 px-5 sm:mt-20 sm:grid-cols-2">
        <BigTile
          title={t("power.title")}
          desc={t("power.desc")}
          img="/assets/flow.png"
          index={1}
          featured
        />
        <BigTile
          title={t("fans.title")}
          desc={t("fans.desc")}
          index={2}
        />
        <BigTile
          title={t("toggles.title")}
          desc={t("toggles.desc")}
          index={3}
        />
        <BigTile
          title={t("security.title")}
          desc={t("security.desc")}
          index={4}
        />
        <BigTile
          title={t("layout.title")}
          desc={t("layout.desc")}
          index={5}
          className="sm:col-span-2"
        />
        <BigTile
          title={t("dev.title")}
          desc={t("dev.title")}
          descOverride={t("dev.desc")}
          index={6}
          className="sm:col-span-2"
        />
      </div>
    </section>
  );
}

type TileProps = {
  title: string;
  desc: string;
  descOverride?: string;
  img?: string;
  index?: number;
  featured?: boolean;
  className?: string;
};

function BigTile({
  title,
  desc,
  descOverride,
  img,
  index = 0,
  featured = false,
  className = "",
}: TileProps) {
  return (
    <Reveal
      as="article"
      index={index}
      className={`group relative flex flex-col overflow-hidden rounded-3xl bg-surface p-8 sm:p-10 ${className}`}
    >
      <h3 className="text-[clamp(1.5rem,3vw,2rem)] font-semibold tracking-tight text-tx">
        {title}
      </h3>
      <p className="mt-2 max-w-md text-[17px] leading-relaxed text-mut">
        {descOverride ?? desc}
      </p>
      {img && (
        <div className="mt-6 flex-1">
          <Image
            src={img}
            alt={title}
            width={664}
            height={600}
            sizes="(max-width: 768px) 90vw, 480px"
            className="w-full rounded-2xl"
          />
        </div>
      )}
      {/* accent gradient line at bottom — subtle on hover */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-accent to-transparent transition-transform duration-700 group-hover:scale-x-100"
      />
    </Reveal>
  );
}
