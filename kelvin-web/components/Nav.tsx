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
          ? "border-b border-line/40 bg-bg/70 shadow-[0_1px_2px_rgba(0,0,0,0.04)] backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      {/* ───── градиентная полоса-блик по нижней границе (как у Warp) ───── */}
      <div
        className={`pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent transition-opacity duration-500 ${
          scrolled ? "opacity-100" : "opacity-0"
        }`}
      />

      <nav className="mx-auto flex h-14 max-w-[1100px] items-center justify-between px-6">
        {/* Бренд */}
        <Link
          href="/"
          className="flex items-center gap-2.5 text-[15px] font-semibold tracking-tight text-tx"
        >
          <img
            src="/assets/icon.png"
            alt="Kelvin"
            width={20}
            height={20}
            className="rounded-[5px]"
          />
          {/* Опционально: градиентный текст как у Warp (раскомментируй, если нужно) */}
          {/* <span className="bg-gradient-to-r from-violet-600 to-blue-500 bg-clip-text text-transparent">
            Kelvin
          </span> */}
          <span>Kelvin</span>
        </Link>

        {/* Центральные ссылки (десктоп) */}
        <div className="hidden items-center gap-8 text-[13.5px] text-mut md:flex">
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

        {/* Правый кластер */}
        <div className="flex items-center gap-4">
          {/* Warp‑стайл CTA‑кнопка с градиентом, тенью и микро‑анимацией */}
          <Link
            href="/#download"
            className="relative inline-flex items-center justify-center rounded-full px-6 py-2 text-[13px] font-medium text-white shadow-lg shadow-violet-500/25 transition-all duration-300 hover:scale-[1.04] hover:shadow-violet-500/40 bg-gradient-to-r from-violet-600 to-blue-500"
          >
            {t("download")}
          </Link>

          <span className="hidden md:block">
            <LocaleSwitcher />
          </span>
          <ThemeToggle />

          {/* Мобильная кнопка‑гамбургер */}
          <button
            className="text-tx md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={open}
          >
            <svg
              width="20"
              height="20"
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

      {/* Мобильное меню – тоже с матовым стеклом */}
      {open && (
        <div className="border-t border-line/40 bg-bg/80 px-6 py-3 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-1">
            {[...links, { href: "/#download", label: t("download") }].map(
              (l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-[15px] text-mut transition-colors hover:bg-tx/5 hover:text-tx"
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
