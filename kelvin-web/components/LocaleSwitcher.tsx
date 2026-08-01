"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "@/i18n/routing";

export default function LocaleSwitcher() {
  const t = useTranslations("A11y");
  const locale = useLocale();
  const pathname = usePathname();

  function switchTo(next: "ru" | "pt") {
    if (next === locale) return;
    const hash = window.location.hash;
    window.location.assign(`/${next}${pathname}${hash}`);
  }

  return (
    <div
      className="flex items-center gap-1.5 text-[13px] font-medium text-mut"
      role="group"
      aria-label={t("language")}
    >
      <button
        onClick={() => switchTo("ru")}
        aria-pressed={locale === "ru"}
        className={`transition-colors ${
          locale === "ru" ? "text-tx" : "hover:text-mut"
        }`}
      >
        RU
      </button>
      <span className="text-faint/50">·</span>
      <button
        onClick={() => switchTo("pt")}
        aria-pressed={locale === "pt"}
        className={`transition-colors ${
          locale === "pt" ? "text-tx" : "hover:text-mut"
        }`}
      >
        PT
      </button>
    </div>
  );
}
