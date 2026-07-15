import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export default function Footer() {
  const t = useTranslations("Footer");

  return (
    <footer className="border-t border-white/10 bg-bg px-5 py-8 sm:px-8">
      <div className="mx-auto flex max-w-[980px] flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
        <div className="flex items-center gap-2 text-[14px] text-mut">
          <img
            src="/assets/icon.png"
            alt=""
            width={16}
            height={16}
            className="rounded-[4px]"
          />
          <span>Kelvin</span>
        </div>
        <nav className="flex gap-5 text-[12px] text-faint">
          <Link href="/privacy" className="transition-colors hover:text-mut">
            {t("privacy")}
          </Link>
          <Link href="/eula" className="transition-colors hover:text-mut">
            {t("eula")}
          </Link>
          <a
            href="mailto:cambly.studio@gmail.com"
            className="transition-colors hover:text-mut"
          >
            {t("support")}
          </a>
        </nav>
      </div>
      <p className="mx-auto mt-4 max-w-[980px] text-center text-[11px] text-faint">
        {t("legal")}
      </p>
    </footer>
  );
}
