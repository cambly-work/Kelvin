"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import LocaleSwitcher from "./LocaleSwitcher";
import ThemeToggle from "./ThemeToggle";

export default function Nav() {
  const t = useTranslations("Nav");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "/#features", label: t("features") },
    { href: "/#pricing", label: t("pricing") },
    { href: "/#faq", label: t("faq") },
  ] as const;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? "border-b border-line bg-bg/85 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-12 max-w-[1024px] items-center justify-between px-5">
        {/* brand */}
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
          <span>Kelvin</span>
        </Link>

        {/* center links — desktop */}
        <div className="hidden items-center gap-7 text-[13px] text-mut md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="transition-colors hover:text-tx"
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* right cluster */}
        <div className="flex items-center gap-4">
          <Link
            href="/#download"
            className="btn-primary hidden !px-4 !py-2 !text-[13px] sm:inline-block"
          >
            {t("download")}
          </Link>
          <span className="hidden md:block">
            <LocaleSwitcher />
          </span>
          <ThemeToggle />
          {/* mobile toggle */}
          <button
            className="text-tx md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={open}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            >
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <>
                  <path d="M3 7h18" />
                  <path d="M3 12h18" />
                  <path d="M3 17h18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* mobile dropdown */}
      {open && (
        <div className="border-t border-line bg-bg/95 px-5 py-2 backdrop-blur-md md:hidden">
          <div className="flex flex-col">
            {[...links, { href: "/#download", label: t("download") }].map(
              (l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-2 py-2.5 text-[14px] text-mut hover:text-tx"
                >
                  {l.label}
                </Link>
              )
            )}
            <div className="px-2 py-2.5">
              <LocaleSwitcher />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
