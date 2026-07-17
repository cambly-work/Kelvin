import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import LocaleSwitcher from "./LocaleSwitcher";
import ThemeToggle from "./ThemeToggle";

export default function LegalLayout({
  children,
}: {
  children: ReactNode;
}) {
  const t = useTranslations("Legal");
  const footer = useTranslations("Footer");

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-bg/85 backdrop-blur-md">
        <nav className="mx-auto flex h-12 max-w-[1024px] items-center justify-between px-5">
          <Link
            href="/"
            className="flex items-center gap-2 text-[14px] font-semibold text-tx"
          >
            <img
              src="/assets/icon.png"
              alt="Kelvin"
              width={18}
              height={18}
              className="rounded-[4px]"
            />
            Kelvin
          </Link>
          <div className="flex items-center gap-4">
            <LocaleSwitcher />
            <ThemeToggle />
          </div>
        </nav>
      </header>

      <main className="flex-1">
        <section className="mx-auto max-w-[47.5rem] px-5 pb-10 pt-24 sm:px-8 sm:pb-20 sm:pt-28 lg:px-8">
          <Link
            href="/"
            className="mb-7 inline-block text-[14px] text-mut transition-colors hover:text-tx"
          >
            {t("back")}
          </Link>
          {children}
        </section>
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto max-w-[1024px] px-5 py-8 text-[13px] text-faint">
          {footer("legal")}
        </div>
      </footer>
    </>
  );
}
