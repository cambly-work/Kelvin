import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import Nav from "./Nav";
import Footer from "./Footer";

export default function LegalLayout({
  children,
}: {
  children: ReactNode;
}) {
  const t = useTranslations("Legal");

  return (
    <>
      <Nav />
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
      <Footer />
    </>
  );
}
