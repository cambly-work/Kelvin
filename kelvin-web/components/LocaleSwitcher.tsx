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
    <div className="flex items-center gap-1.5 text-[13px] font-medium text-mut">
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
