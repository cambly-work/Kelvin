"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useTranslations } from "next-intl";
import { Icon, type FeatureIcon } from "./icons";
import {
  useKelvinExperience,
  type ToolKey,
} from "./KelvinExperience";

const TOOL_META: Record<
  ToolKey,
  { icon: FeatureIcon; color: string; glow: string }
> = {
  quiet: { icon: "fans", color: "#7c9cff", glow: "rgba(124,156,255,.22)" },
  battery: { icon: "power", color: "#53d68a", glow: "rgba(83,214,138,.2)" },
  privacy: { icon: "security", color: "#b78cff", glow: "rgba(183,140,255,.2)" },
  developer: { icon: "dev", color: "#58c7ff", glow: "rgba(88,199,255,.2)" },
};

export default function KelvinCommandCenter() {
  const t = useTranslations("CommandCenter");
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { activeTools, toggleTool, resetTools } = useKelvinExperience();
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const wasOpenRef = useRef(false);

  const tools = Object.keys(TOOL_META) as ToolKey[];

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((value) => !value);
      }
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => dialogRef.current?.focus());
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      if (wasOpenRef.current) triggerRef.current?.focus({ preventScroll: true });
    }
    wasOpenRef.current = open;
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const latestActive = activeTools.at(-1);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        className="command-trigger hidden items-center gap-2 rounded-full border border-line bg-tx/[0.035] px-3 py-1.5 text-[11px] font-medium text-mut transition hover:border-accent/35 hover:text-tx lg:flex"
        aria-haspopup="dialog"
      >
        <span className={`h-1.5 w-1.5 rounded-full ${activeTools.length ? "bg-[var(--command-accent)] shadow-[0_0_8px_var(--command-accent)]" : "bg-faint"}`} />
        {latestActive ? t("activeCount", { count: activeTools.length }) : t("trigger")}
        <kbd className="rounded border border-line px-1.5 py-0.5 font-sans text-[9px] text-faint">⌘ K</kbd>
      </button>

      {open && mounted && createPortal(
        <div
          className="command-overlay fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[12vh] sm:pt-[16vh]"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setOpen(false);
          }}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="command-title"
            tabIndex={-1}
            className="command-panel relative w-full max-w-[680px] overflow-hidden rounded-[28px] border border-line bg-bg/90 shadow-[0_40px_140px_rgba(0,0,0,.45)] outline-none backdrop-blur-3xl"
          >
            <div className="flex items-start justify-between border-b border-line px-6 py-5 sm:px-7">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-accent">
                  {t("eyebrow")}
                </p>
                <h2 id="command-title" className="mt-1.5 text-[22px] font-semibold tracking-[-0.025em] text-tx">
                  {t("title")}
                </h2>
                <p className="mt-1 text-[13px] text-mut">{t("lead")}</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-mut transition hover:bg-tx/10 hover:text-tx"
                aria-label={t("close")}
              >
                <span aria-hidden>×</span>
              </button>
            </div>

            <div className="grid gap-3 p-4 sm:grid-cols-2 sm:p-5">
              {tools.map((key) => {
                const selected = activeTools.includes(key);
                const meta = TOOL_META[key];
                return (
                  <button
                    key={key}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => toggleTool(key)}
                    className={`command-tool relative min-h-36 overflow-hidden rounded-[18px] border p-5 text-left transition-all duration-300 ${
                      selected
                        ? "border-[var(--tool-color)] bg-[var(--tool-glow)]"
                        : "border-line bg-tx/[0.035] hover:-translate-y-0.5 hover:border-accent/25 hover:bg-tx/[0.055]"
                    }`}
                    style={{
                      "--tool-color": meta.color,
                      "--tool-glow": meta.glow,
                    } as React.CSSProperties}
                  >
                    <span
                      className="flex h-9 w-9 items-center justify-center rounded-xl border border-line bg-bg/35"
                      style={{ color: meta.color }}
                    >
                      <Icon name={meta.icon} width={18} height={18} />
                    </span>
                    <span className="mt-5 flex items-center justify-between">
                      <span className="text-[15px] font-semibold text-tx">{t(`${key}.title`)}</span>
                      <span className={`h-2 w-2 rounded-full ${selected ? "animate-pulse" : "bg-tx/15"}`} style={selected ? { background: meta.color, boxShadow: `0 0 12px ${meta.color}` } : undefined} />
                    </span>
                    <span className="mt-1.5 block text-[12px] leading-relaxed text-mut">
                      {t(`${key}.desc`)}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between border-t border-line px-6 py-4 text-[11px] text-faint">
              <span>{activeTools.length ? t("activeCount", { count: activeTools.length }) : t("idle")}</span>
              {activeTools.length > 0 && (
                <button type="button" onClick={resetTools} className="text-mut transition hover:text-tx">
                  {t("reset")}
                </button>
              )}
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
