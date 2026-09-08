import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import Reveal from "./Reveal";
import { release } from "@/lib/release";

export default function Download() {
  const t = useTranslations("Download");
  const locale = useLocale();
  const steps = t.raw("steps") as {title: string; text: string}[];
  return (
    <section id="download" className="download-section relative overflow-hidden">
      <div className="kelvin-download-grid pointer-events-none absolute inset-0" />
      <Reveal className="relative mx-auto max-w-[1100px] px-5 py-24 text-center sm:py-32">
        <Image src="/assets/icon.png" alt="" width={54} height={54} className="mx-auto mb-7 rounded-[14px] shadow-[0_18px_50px_rgba(53,203,211,.22)]" />
        <p className="section-eyebrow">{t("eyebrow")}</p>
        <h2 className="text-[clamp(2.5rem,6vw,4.75rem)] font-bold tracking-[-0.045em] text-tx">{t("title")}</h2>
        <p className="mx-auto mt-4 max-w-[520px] text-mut">{t("lead")}</p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          {release.downloadUrl ? (
            <a href={release.downloadUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">{t("ctaPrimary")}</a>
          ) : (
            <div className="kelvin-download-pending" role="status"><span aria-hidden>◷</span>{t("pending")}</div>
          )}
        </div>
        {!release.downloadUrl && <p className="mx-auto mt-4 max-w-[520px] text-sm text-mut">{t("pendingNote")}</p>}
        <div className="kelvin-download-readout mx-auto mt-9 flex max-w-[780px] flex-wrap justify-center gap-x-6 gap-y-2 text-[11px] font-medium text-mut">
          <span>{t("version", { version: release.version })}</span><span>{t("compatibility")}</span><span>{t("free")}</span>
          <a href={`/${locale}/notes`} className="text-accent hover:underline">{t("changelog")}</a>
        </div>
        <ol className="kelvin-install-steps">
          {steps.map((step, index) => <li key={step.title}><span className="kelvin-install-number" aria-hidden>0{index + 1}</span><h3>{step.title}</h3><p>{step.text}</p></li>)}
        </ol>
        <p className="mx-auto mt-6 max-w-[680px] text-[13px] leading-relaxed text-faint">{t("micro")}</p>
      </Reveal>
    </section>
  );
}
