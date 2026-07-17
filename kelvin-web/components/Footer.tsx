import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export default function Footer() {
  const t = useTranslations("Footer");
  const legal = useTranslations("Legal");

  return (
    <footer className="relative bg-bg/60 backdrop-blur-2xl">
      {/* градиентная черта сверху (как у Warp) */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent dark:hidden"
        aria-hidden="true"
      />
      <div className="mx-auto flex max-w-[1100px] flex-col gap-4 px-6 py-8 text-[13px] text-faint sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <img
            src="/assets/icon.png"
            alt="Kelvin"
            width={16}
            height={16}
            className="rounded-[3px]"
          />
          <span className="font-medium text-mut">Kelvin</span>
        </div>
        <nav className="flex flex-wrap gap-x-5 gap-y-2">
          <Link href="/privacy" className="transition-colors hover:text-tx">
            {t("privacy")}
          </Link>
          <Link href="/eula" className="transition-colors hover:text-tx">
            {t("eula")}
          </Link>
          <Link href="/notes" className="transition-colors hover:text-tx">
            {legal("notes.title")}
          </Link>
          <a
            href="mailto:cambly.studio@gmail.com"
            className="transition-colors hover:text-tx"
          >
            {t("support")}
          </a>
        </nav>
        <p className="sm:text-right">{t("legal")}</p>
      </div>
    </footer>
  );
}
