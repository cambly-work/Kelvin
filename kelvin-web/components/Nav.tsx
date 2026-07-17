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
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || open
          ? "border-b border-white/[0.06] bg-bg/60 shadow-[0_1px_3px_rgba(0,0,0,0.03)] backdrop-blur-2xl"
          : "border-b border-transparent"
      }`}
    >
      {/* ─── тонкая градиентная «дорожка» снизу, как у Warp ─── */}
      <div
        className={`pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent transition-opacity duration-500 dark:hidden ${
          scrolled ? "opacity-100" : "opacity-0"
        }`}
      />

      <nav className="mx-auto flex h-14 max-w-[1100px] items-center justify-between px-6">
        {/* brand */}
        <Link
          href="/"
          className="flex items-center gap-2.5 text-[14px] font-semibold tracking-tight text-tx"
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
        <div className="hidden items-center gap-8 text-[13px] text-mut md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="transition-all duration-200 hover:scale-[1.03] hover:text-tx"
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* right cluster */}
        <div className="flex items-center gap-4">
          <Link
            href="/#download"
            className="btn-primary hidden !px-4 !py-2 !text-[13px] transition-transform duration-200 hover:scale-[1.04] sm:inline-block"
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

      {/* mobile dropdown — тоже стеклянный */}
      {open && (
        <div className="border-t border-white/[0.06] bg-bg/60 px-6 py-3 backdrop-blur-2xl md:hidden">
          <div className="flex flex-col gap-1">
            {[...links, { href: "/#download", label: t("download") }].map(
              (l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-[15px] text-mut transition-all duration-200 hover:scale-[1.02] hover:bg-tx/[0.04] hover:text-tx"
                >
                  {l.label}
                </Link>
              )
            )}
            <div className="px-3 py-2.5">
              <LocaleSwitcher />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
