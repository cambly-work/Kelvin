"use client";

import { useEffect, useRef, useState } from "react";

/* =========================================================================
   FeatureWidgets — live CSS/SVG recreations of Kelvin's popover UI.
   Each is a self-contained glass tile mimicking the real macOS panel.
   Animated on transform/opacity only; respects prefers-reduced-motion.
   ========================================================================= */

function useInView<T extends Element>() {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      setSeen(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setSeen(true);
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, seen };
}

const tileBase =
  "glass relative w-full rounded-[18px] p-5 sm:p-6 text-[14px] text-tx";

/* --- 1. Power: charge ring + live draw graph --------------------------- */
export function PowerWidget() {
  const pct = 78;
  const watts = 12;
  const bars = [4, 6, 5, 8, 10, 7, 9, 11, 8, 10, 7, 6];
  const { ref, seen } = useInView<HTMLDivElement>();
  return (
    <div ref={ref} className={tileBase}>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[12px] uppercase tracking-[0.12em] text-mut">
            Battery
          </div>
          <div className="mt-1 flex items-baseline gap-1">
            <span className="text-[34px] font-semibold leading-none">{pct}%</span>
          </div>
        </div>
        {/* charge ring */}
        <svg width="78" height="78" viewBox="0 0 78 78" className="-rotate-90">
          <circle
            cx="39"
            cy="39"
            r="32"
            fill="none"
            stroke="rgba(255,255,255,0.09)"
            strokeWidth="6"
          />
          <circle
            cx="39"
            cy="39"
            r="32"
            fill="none"
            stroke="url(#pw-grad)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={2 * Math.PI * 32}
            strokeDashoffset={seen ? 2 * Math.PI * 32 * (1 - pct / 100) : 2 * Math.PI * 32}
            style={{ transition: "stroke-dashoffset 1.2s var(--ease-kelvin)" }}
          />
          <defs>
            <linearGradient id="pw-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#33c7d1" />
              <stop offset="100%" stopColor="#2a86f0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* live draw graph */}
      <div className="mt-5">
        <div className="mb-2 flex items-center justify-between text-[12px] text-mut">
          <span>Power draw</span>
          <span className="font-medium text-tx">⌁ {watts} W</span>
        </div>
        <div className="flex h-16 items-end gap-1.5">
          {bars.map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-t-[3px] grad"
              style={{
                height: seen ? `${h * 8}%` : "0%",
                opacity: 0.55 + (i / bars.length) * 0.45,
                transition: `height 0.6s var(--ease-kelvin) ${i * 50}ms, opacity 0.4s ${i * 50}ms`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* --- 2. Fans: RPM↔temp curve ------------------------------------------- */
export function FansWidget() {
  const rpm = 3900;
  const temp = 62;
  const { ref, seen } = useInView<HTMLDivElement>();
  return (
    <div ref={ref} className={tileBase}>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[12px] uppercase tracking-[0.12em] text-mut">
            Fans
          </div>
          <div className="mt-1 text-[28px] font-semibold leading-none">
            {seen ? rpm.toLocaleString() : "0"}{" "}
            <span className="text-[14px] font-normal text-mut">RPM</span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-[12px] uppercase tracking-[0.12em] text-mut">
            CPU
          </div>
          <div className="text-[28px] font-semibold leading-none text-orange">
            {temp}°
          </div>
        </div>
      </div>

      {/* fan curve */}
      <svg viewBox="0 0 280 90" className="mt-4 w-full" fill="none">
        <defs>
          <linearGradient id="fw-grad" x1="0" y1="0" x2="280" y2="0">
            <stop offset="0%" stopColor="#33c7d1" />
            <stop offset="100%" stopColor="#2a86f0" />
          </linearGradient>
          <linearGradient id="fw-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(42,134,240,0.25)" />
            <stop offset="100%" stopColor="rgba(42,134,240,0)" />
          </linearGradient>
        </defs>
        {[0, 1, 2].map((g) => (
          <line
            key={g}
            x1="0"
            y1={22 * g + 22}
            x2="280"
            y2={22 * g + 22}
            stroke="rgba(255,255,255,0.06)"
          />
        ))}
        <path
          d="M0 80 C 60 80, 90 78, 130 50 S 210 18, 280 12 L 280 90 L 0 90 Z"
          fill="url(#fw-fill)"
          opacity={seen ? 1 : 0}
          style={{ transition: "opacity 0.8s 0.3s var(--ease-kelvin)" }}
        />
        <path
          d="M0 80 C 60 80, 90 78, 130 50 S 210 18, 280 12"
          stroke="url(#fw-grad)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="600"
          strokeDashoffset={seen ? "0" : "600"}
          style={{ transition: "stroke-dashoffset 1.4s var(--ease-kelvin)" }}
        />
      </svg>

      <div className="mt-2 flex items-center gap-2 text-[12px]">
        <span className="rounded-full bg-accent/15 px-2.5 py-0.5 font-medium text-accent">
          Auto
        </span>
        <span className="text-mut">Thermal protection on</span>
      </div>
    </div>
  );
}

/* --- 3. Toggles: Wi-Fi / Bluetooth / Dark ------------------------------ */
export function TogglesWidget() {
  const { ref } = useInView<HTMLDivElement>();
  const [on, setOn] = useState([true, false, true]);

  const labels = ["Wi-Fi", "Bluetooth", "Dark Mode"];
  const icons = ["􀙇", "􀺞", "􀾫"]; // SF-ish glyphs as text fallback

  return (
    <div ref={ref} className={tileBase}>
      <div className="text-[12px] uppercase tracking-[0.12em] text-mut">
        Quick toggles
      </div>
      <div className="mt-3 space-y-2.5">
        {labels.map((label, i) => (
          <button
            key={label}
            onClick={() => setOn((prev) => prev.map((v, j) => (j === i ? !v : v)))}
            className="flex w-full items-center justify-between rounded-[12px] bg-white/[0.03] px-4 py-3 text-left transition-colors hover:bg-white/[0.06]"
          >
            <span className="flex items-center gap-3">
              <span className="grid h-6 w-6 place-items-center rounded-[7px] bg-white/5 text-[13px] text-tx">
                {icons[i]}
              </span>
              <span className="font-medium">{label}</span>
            </span>
            {/* SF-style switch */}
            <span
              className={`relative h-[26px] w-[42px] rounded-full transition-colors duration-300 ${
                on[i] ? "grad" : "bg-white/15"
              }`}
            >
              <span
                className="absolute top-[2px] h-[22px] w-[22px] rounded-full bg-white shadow-sm transition-transform duration-300"
                style={{
                  transform: on[i] ? "translateX(18px)" : "translateX(2px)",
                }}
              />
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* --- 4. Layout: RU↔EN auto-fix ----------------------------------------- */
export function LayoutWidget() {
  const { ref, seen } = useInView<HTMLDivElement>();
  const wrong = "Ghbdby";
  const right = "Привет";
  const [fixed, setFixed] = useState(false);
  useEffect(() => {
    if (!seen) return;
    // one-shot: fix the layout a moment after entering view, then stop
    const t = setTimeout(() => setFixed(true), 600);
    return () => clearTimeout(t);
  }, [seen]);

  return (
    <div ref={ref} className={tileBase}>
      <div className="flex items-center justify-between">
        <div className="text-[12px] uppercase tracking-[0.12em] text-mut">
          Auto layout
        </div>
        <span className="rounded-full bg-accent/15 px-2.5 py-0.5 text-[12px] font-medium text-accent">
          RU↔EN
        </span>
      </div>

      {/* typed text that fixes itself */}
      <div className="mt-5 rounded-[12px] bg-white/[0.03] px-5 py-5 text-center">
        <div
          className="text-[40px] font-semibold tracking-tight"
          style={{
            fontFamily: "ui-monospace, 'SF Mono', Menlo, monospace",
            color: fixed ? "var(--color-tx)" : "var(--color-faint)",
          }}
        >
          {fixed ? right : wrong}
        </div>
        <div className="mt-2 h-4 text-[12px] text-mut">
          {fixed ? "✓ Layout fixed" : "typing in wrong layout…"}
        </div>
      </div>

      {/* mini keyboard row */}
      <div className="mt-4 flex justify-center gap-1.5">
        {["Q", "W", "E", "R", "T", "Y"].map((k) => (
          <span
            key={k}
            className="grid h-9 w-9 place-items-center rounded-[7px] border border-line bg-white/[0.04] text-[13px] font-medium text-faint"
          >
            {k}
          </span>
        ))}
      </div>
    </div>
  );
}

/* --- 5. Security: firewall rules --------------------------------------- */
export function SecurityWidget() {
  const { ref, seen } = useInView<HTMLDivElement>();
  const rules = [
    { label: "Block incoming", on: true },
    { label: "Stealth mode", on: true },
    { label: "Gatekeeper", on: true },
    { label: "Quarantine", on: false },
  ];
  return (
    <div ref={ref} className={tileBase}>
      <div className="flex items-center gap-3">
        <span className="icon-chip">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
            <path d="M12 3 5 6v5c0 4.4 3 8.4 7 10 4-1.6 7-5.6 7-10V6l-7-3Z" />
            <path d="m9 12 2 2 4-4" />
          </svg>
        </span>
        <div>
          <div className="font-semibold">Firewall</div>
          <div className="text-[12px] text-green">Protected</div>
        </div>
      </div>

      <div className="mt-4 space-y-1">
        {rules.map((r, i) => (
          <div
            key={r.label}
            className="flex items-center justify-between rounded-[10px] px-3 py-2.5"
            style={{
              opacity: seen ? 1 : 0,
              transform: seen ? "none" : "translateX(-8px)",
              transition: `opacity 0.5s ${i * 100}ms var(--ease-kelvin), transform 0.5s ${i * 100}ms var(--ease-kelvin)`,
            }}
          >
            <span className="text-[13px] text-mut">{r.label}</span>
            <span
              className={`text-[12px] font-medium ${
                r.on ? "text-green" : "text-faint"
              }`}
            >
              {r.on ? "On" : "Off"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* --- 6. Dev: terminal + menu-bar monitor ------------------------------- */
export function DevWidget() {
  const { ref, seen } = useInView<HTMLDivElement>();
  const cpu = 34;
  const ram = 58;
  return (
    <div ref={ref} className={tileBase}>
      {/* menu-bar mini monitor */}
      <div className="flex items-center justify-between rounded-[10px] bg-white/[0.03] px-3 py-2">
        <div className="flex items-center gap-4 text-[12px]">
          <span className="flex items-center gap-1.5">
            <span className="text-mut">CPU</span>
            <span className="font-medium text-accent">{seen ? cpu : 0}%</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="text-mut">RAM</span>
            <span className="font-medium text-accent-blue">{seen ? ram : 0}%</span>
          </span>
        </div>
        <div className="flex h-5 items-end gap-0.5">
          {[5, 8, 6, 9, 7, 10, 6, 8].map((h, i) => (
            <span
              key={i}
              className="w-1 rounded-sm grad"
              style={{
                height: seen ? `${h * 10}%` : "0%",
                transition: `height 0.5s ${i * 40}ms var(--ease-kelvin)`,
              }}
            />
          ))}
        </div>
      </div>

      {/* terminal */}
      <div className="mt-3 rounded-[12px] bg-black/40 p-4 font-mono text-[12.5px] leading-relaxed">
        <div className="mb-2 flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-orange/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-green/80" />
        </div>
        <div className="text-mut">
          <span className="text-accent">brew</span> services list
        </div>
        <div className="mt-1 text-tx">
          nginx <span className="text-green">started</span>
        </div>
        <div className="text-tx">
          redis <span className="text-green">started</span>
        </div>
        <div className="mt-2 flex">
          <span className="text-accent">›</span>
          <span className="ml-1.5 inline-block h-4 w-2 animate-pulse bg-tx/70" />
        </div>
      </div>
    </div>
  );
}
