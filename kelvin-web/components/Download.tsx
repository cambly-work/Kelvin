"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import Reveal from "./Reveal";

type VersionInfo = {
  version: string;
  url: string;
  minOS: string;
};

export default function Download() {
  const t = useTranslations("Download");
  const [info, setInfo] = useState<VersionInfo | null>(null);

  useEffect(() => {
    fetch("/api/latest-version")
      .then((r) => r.json())
      .then(setInfo)
      .catch(() => {});
  }, []);

  const dmgHref = info?.url ?? "#";

  return (
    <section id="download" className="bg-bg py-24 text-center sm:py-32 lg:py-40">
      <div className="mx-auto max-w-[980px] px-5">
        <Reveal
          as="h2"
          className="text-[clamp(2.5rem,7vw,5rem)] font-semibold tracking-[-0.025em] text-tx"
        >
          {t("title")}
        </Reveal>
        <Reveal
          as="p"
          index={1}
          className="mx-auto mt-4 max-w-[500px] text-[clamp(1.125rem,2vw,1.375rem)] text-mut"
        >
          {t("lead")}
        </Reveal>
        <Reveal index={2} className="mt-8 flex flex-wrap justify-center gap-4">
          <a
            href={dmgHref}
            className="btn-primary inline-block px-8 py-3.5"
          >
            {t("ctaPrimary")}
            {info?.version && (
              <span className="opacity-70"> · v{info.version}</span>
            )}
          </a>
          <Link
            href="/#pricing"
            className="link-arrow px-2 py-3.5"
          >
            {t("ctaSecondary")}
          </Link>
        </Reveal>
        <Reveal
          as="p"
          index={3}
          className="mx-auto mt-6 max-w-[500px] text-[13px] leading-relaxed text-faint"
        >
          {t("micro")}
        </Reveal>
      </div>
    </section>
  );
}
