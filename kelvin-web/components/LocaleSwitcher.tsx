"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function switchTo(next: string) {
    if (next === locale) return;
    // @ts-expect-error — pathname is a typed route but params shape varies
    router.replace({ pathname, params: {} }, { locale: next });
  }

  return (
    <div className="flex items-center gap-1.5 text-[11px] text-faint">
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
        onClick={() => switchTo("en")}
        aria-pressed={locale === "en"}
        className={`transition-colors ${
          locale === "en" ? "text-tx" : "hover:text-mut"
        }`}
      >
        EN
      </button>
    </div>
  );
}
