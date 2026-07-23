"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import Reveal from "./Reveal";
import { Icon, type FeatureIcon } from "./icons";
import { useKelvinExperience, type ToolKey } from "./KelvinExperience";

type Mode = "focus" | "daily" | "heavy";
type QuickAction = "caffeine" | "nightShift" | "hiddenFiles";

const MODES: { key: Mode; load: number; icon: FeatureIcon }[] = [
  { key: "focus", load: 24, icon: "toggles" },
  { key: "daily", load: 52, icon: "power" },
  { key: "heavy", load: 88, icon: "fans" },
];

const QUICK_ACTIONS: { key: QuickAction; icon: FeatureIcon }[] = [
  { key: "caffeine", icon: "toggles" },
  { key: "nightShift", icon: "power" },
  { key: "hiddenFiles", icon: "dev" },
];

const PROTECTION: { key: ToolKey; icon: FeatureIcon }[] = [
  { key: "battery", icon: "power" },
  { key: "privacy", icon: "security" },
  { key: "quiet", icon: "fans" },
];

export default function ProductDemo({ locale: _locale }: { locale: string }) {
  const t = useTranslations("LiveLab");
  const labRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<Mode>("daily");
  const [quickActions, setQuickActions] = useState<QuickAction[]>([
    "nightShift",
  ]);
  const [applied, setApplied] = useState(false);
  const {
    activeTools,
    automationEnabled,
    workload,
    toggleTool,
    setAutomationEnabled,
    setAutomationThreshold,
    setWorkload,
    applyRecommended,
    resetTools,
  } = useKelvinExperience();

  const batteryCare = activeTools.includes("battery");
  const cooling = activeTools.includes("quiet");
  const temperature = Math.max(
    39,
    Math.round(42 + workload * 0.39 - (batteryCare ? 3 : 0) - (cooling ? 10 : 0))
  );
  const power = Math.max(
    6,
    8 + workload * 0.27 - (batteryCare ? 4 : 0)
  ).toFixed(1);
  const protectedCount =
    activeTools.length + quickActions.length + Number(automationEnabled);
  const isReady =
    mode === "heavy"
      ? cooling && automationEnabled
      : mode === "focus"
        ? quickActions.includes("caffeine") &&
          quickActions.includes("nightShift")
        : batteryCare;

  const selectMode = (nextMode: Mode, load: number) => {
    setMode(nextMode);
    setWorkload(load);
    setApplied(false);
  };

  const toggleQuickAction = (action: QuickAction) => {
    setQuickActions((current) =>
      current.includes(action)
        ? current.filter((item) => item !== action)
        : [...current, action]
    );
    setApplied(false);
  };

  const applyMode = () => {
    if (mode === "focus") {
      resetTools();
      setWorkload(24);
      setQuickActions(["caffeine", "nightShift"]);
      toggleTool("privacy");
    } else if (mode === "daily") {
      applyRecommended();
      setQuickActions(["nightShift", "hiddenFiles"]);
    } else {
      applyRecommended();
      setAutomationEnabled(true);
      setAutomationThreshold(68);
    }
    setApplied(true);
  };

  const resetLab = () => {
    resetTools();
    setMode("daily");
    setWorkload(52);
    setQuickActions(["nightShift"]);
    setApplied(false);
  };

  const modeColor = {
    focus: "#a98bff",
    daily: "#1684ef",
    heavy: "#ff875f",
  }[mode];
  const modeIcon = MODES.find((item) => item.key === mode)?.icon ?? "power";

  return (
    <section
      id="demo"
      className="relative overflow-hidden border-b border-line bg-[linear-gradient(180deg,var(--color-bg),var(--color-surface),var(--color-bg))]"
    >
      <div className="mx-auto max-w-[1180px] px-5 py-24 sm:py-32">
        <Reveal className="mx-auto max-w-[760px] text-center">
          <p className="section-eyebrow">{t("eyebrow")}</p>
          <h2 className="section-title">{t("simple.title")}</h2>
          <p className="section-lead">{t("simple.lead")}</p>
        </Reveal>

        <div
          ref={labRef}
          className="live-lab live-lab--clear mt-14 overflow-hidden rounded-[34px] border border-line"
          data-mode={mode}
          style={{ "--lab-mode": modeColor } as React.CSSProperties}
          onPointerMove={(event) => {
            const rect = labRef.current?.getBoundingClientRect();
            if (!rect || !labRef.current) return;
            labRef.current.style.setProperty(
              "--lab-x",
              `${event.clientX - rect.left}px`
            );
            labRef.current.style.setProperty(
              "--lab-y",
              `${event.clientY - rect.top}px`
            );
          }}
        >
          <div className="flex flex-col gap-3 border-b border-line bg-surface px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7">
            <div className="flex items-center gap-3">
              <span
                className={`h-2.5 w-2.5 rounded-full ${
                  isReady
                    ? "bg-[#53d68a] shadow-[0_0_12px_#53d68a]"
                    : "bg-[#ffbd59] shadow-[0_0_12px_#ffbd59]"
                }`}
              />
              <div>
                <p className="text-[12px] font-semibold text-tx">
                  {isReady ? t("simple.ready") : t("simple.needsSetup")}
                </p>
                <p className="text-[10px] text-faint">
                  {t("simple.active", { count: protectedCount })}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={resetLab}
              className="w-fit rounded-full border border-line px-3 py-1.5 text-[10px] text-faint transition hover:bg-tx/10 hover:text-tx"
            >
              {t("reset")}
            </button>
          </div>

          <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
            <div className="border-b border-line bg-bg/55 p-5 sm:p-7 lg:border-b-0 lg:border-r">
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-accent">
                {t("simple.choose")}
              </p>
              <div className="mt-4 grid gap-2 sm:grid-cols-3 lg:grid-cols-1">
                {MODES.map((item) => {
                  const selected = mode === item.key;
                  return (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => selectMode(item.key, item.load)}
                      aria-pressed={selected}
                      className={`group flex items-start gap-4 rounded-[18px] border p-4 text-left transition ${
                        selected
                          ? "border-accent/45 bg-accent/10 shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--color-accent)_12%,transparent)]"
                          : "border-line bg-surface/55 hover:border-accent/25 hover:bg-surface"
                      }`}
                    >
                      <span
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-line ${
                          selected ? "bg-accent text-white" : "bg-bg/45 text-faint"
                        }`}
                      >
                        <Icon name={item.icon} width={18} height={18} />
                      </span>
                      <span>
                        <span className="block text-[13px] font-semibold text-tx">
                          {t(`modes.${item.key}.title`)}
                        </span>
                        <span className="mt-1 block text-[10px] leading-relaxed text-faint">
                          {t(`modes.${item.key}.desc`)}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-6">
                <div className="flex items-center justify-between">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-faint">
                    {t("simple.load")}
                  </p>
                  <strong className="text-[12px] text-tx">{workload}%</strong>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={workload}
                  onChange={(event) => {
                    setWorkload(Number(event.target.value));
                    setApplied(false);
                  }}
                  className="automation-range mt-3 w-full"
                  aria-label={t("load.aria")}
                  style={
                    { "--range-progress": `${workload}%` } as React.CSSProperties
                  }
                />
              </div>

              <div className="relative mt-6 hidden min-h-48 overflow-hidden rounded-[22px] border border-line bg-surface/50 p-5 lg:flex lg:items-center lg:justify-center">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,color-mix(in_srgb,var(--lab-mode)_12%,transparent),transparent_62%)]" />
                <div className="relative flex flex-col items-center text-center">
                  <div className="lab-orbit relative flex h-24 w-24 items-center justify-center rounded-full border border-[color-mix(in_srgb,var(--lab-mode)_32%,transparent)]">
                    <span className="absolute inset-2 rounded-full border border-dashed border-[color-mix(in_srgb,var(--lab-mode)_34%,transparent)]" />
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[color-mix(in_srgb,var(--lab-mode)_15%,transparent)] text-[var(--lab-mode)] shadow-[0_0_28px_color-mix(in_srgb,var(--lab-mode)_25%,transparent)]">
                      <Icon name={modeIcon} width={21} height={21} />
                    </span>
                    <span className="absolute left-1/2 top-[-3px] h-2 w-2 -translate-x-1/2 rounded-full bg-[var(--lab-mode)] shadow-[0_0_12px_var(--lab-mode)]" />
                  </div>
                  <p className="mt-4 text-[11px] font-semibold text-tx">
                    {t(`modes.${mode}.profile`)}
                  </p>
                  <p className="mt-1 text-[8px] uppercase tracking-[0.12em] text-faint">
                    {t("preview.local")}
                  </p>
                </div>
              </div>
            </div>

            <div className="relative bg-surface p-5 sm:p-8">
              <div className="demo-grid pointer-events-none absolute inset-0 opacity-[0.14]" />
              <div className="relative">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-accent">
                      {t("simple.result")}
                    </p>
                    <h3 className="mt-2 text-[clamp(1.7rem,4vw,2.7rem)] font-semibold tracking-[-0.045em] text-tx">
                      {t(`modes.${mode}.result`)}
                    </h3>
                    <p className="mt-2 max-w-[500px] text-[12px] leading-relaxed text-mut">
                      {t(`modes.${mode}.resultDesc`)}
                    </p>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <SimpleMetric label={t("metrics.cpu")} value={`${temperature}°`} />
                    <SimpleMetric label={t("metrics.power")} value={`${power} W`} />
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-2 rounded-[20px] border border-line bg-bg/45 p-3 sm:p-4">
                  <FlowNode
                    index="01"
                    label={t("flow.signal")}
                    value={t(`flow.${mode}.signal`)}
                    active
                  />
                  <FlowConnector active />
                  <FlowNode
                    index="02"
                    label={t("flow.action")}
                    value={t(`flow.${mode}.action`)}
                    active={applied || isReady}
                  />
                  <FlowConnector active={applied || isReady} />
                  <FlowNode
                    index="03"
                    label={t("flow.result")}
                    value={t(`flow.${mode}.result`)}
                    active={isReady}
                  />
                </div>

                <div className="mt-7 rounded-[24px] border border-line bg-bg/55 p-4 sm:p-5">
                  <div className="flex items-center justify-between">
                    <p className="text-[12px] font-semibold text-tx">
                      {t("simple.quickActions")}
                    </p>
                    <span className="text-[9px] text-faint">
                      {t("simple.clickHint")}
                    </span>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {QUICK_ACTIONS.map(({ key, icon }) => {
                      const enabled = quickActions.includes(key);
                      return (
                        <ActionButton
                          key={key}
                          icon={icon}
                          label={t(`actions.${key}.title`)}
                          detail={t(`actions.${key}.desc`)}
                          enabled={enabled}
                          onClick={() => toggleQuickAction(key)}
                        />
                      );
                    })}
                  </div>
                </div>

                <div className="mt-3 rounded-[24px] border border-line bg-bg/55 p-4 sm:p-5">
                  <p className="text-[12px] font-semibold text-tx">
                    {t("simple.protection")}
                  </p>
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {PROTECTION.map(({ key, icon }) => {
                      const enabled = activeTools.includes(key);
                      return (
                        <button
                          key={key}
                          type="button"
                          onClick={() => {
                            toggleTool(key);
                            setApplied(false);
                          }}
                          aria-pressed={enabled}
                          className={`flex min-h-20 flex-col items-center justify-center gap-2 rounded-[15px] border px-2 text-center transition ${
                            enabled
                              ? "border-accent/40 bg-accent/10 text-accent"
                              : "border-line bg-surface/45 text-faint hover:bg-tx/[0.05] hover:text-tx"
                          }`}
                        >
                          <Icon name={icon} width={17} height={17} />
                          <span className="text-[9px] font-semibold">
                            {t(`protect.${key}`)}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-3 overflow-hidden rounded-[20px] border border-line bg-bg/45">
                  <div className="flex items-center justify-between border-b border-line px-4 py-3">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.13em] text-faint">
                      {t("activity.title")}
                    </p>
                    <span className="flex items-center gap-1.5 text-[8px] text-faint">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#53d68a]" />
                      {t("activity.live")}
                    </span>
                  </div>
                  <div className="grid sm:grid-cols-3">
                    <ActivityItem
                      label={t("activity.input")}
                      value={t(`activity.${mode}.input`)}
                    />
                    <ActivityItem
                      label={t("activity.modules")}
                      value={t("activity.modulesValue", {
                        count: protectedCount,
                      })}
                    />
                    <ActivityItem
                      label={t("activity.state")}
                      value={
                        isReady
                          ? t("activity.protected")
                          : t("activity.waiting")
                      }
                    />
                  </div>
                </div>

                <div className="mt-5 flex flex-col gap-3 rounded-[22px] border border-accent/25 bg-accent/[0.07] p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-[12px] font-semibold text-tx">
                      {applied ? t("simple.applied") : t(`modes.${mode}.profile`)}
                    </p>
                    <p className="mt-1 text-[10px] text-faint">
                      {applied
                        ? t("simple.appliedDesc")
                        : t("simple.oneClick")}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={applyMode}
                    className="btn-primary shrink-0 text-center"
                  >
                    {applied ? t("simple.done") : t("simple.apply")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FlowNode({
  index,
  label,
  value,
  active,
}: {
  index: string;
  label: string;
  value: string;
  active: boolean;
}) {
  return (
    <div className={`min-w-0 text-center transition-opacity ${active ? "opacity-100" : "opacity-40"}`}>
      <span
        className={`mx-auto flex h-7 w-7 items-center justify-center rounded-full border text-[8px] font-bold ${
          active
            ? "border-[var(--lab-mode)] bg-[color-mix(in_srgb,var(--lab-mode)_14%,transparent)] text-[var(--lab-mode)] shadow-[0_0_16px_color-mix(in_srgb,var(--lab-mode)_28%,transparent)]"
            : "border-line text-faint"
        }`}
      >
        {index}
      </span>
      <p className="mt-2 text-[7px] font-semibold uppercase tracking-[0.12em] text-faint">
        {label}
      </p>
      <p className="mt-1 truncate text-[9px] font-medium text-tx">{value}</p>
    </div>
  );
}

function FlowConnector({ active }: { active: boolean }) {
  return (
    <span
      className={`relative h-px w-5 overflow-hidden bg-line sm:w-8 ${
        active ? "after:absolute after:inset-y-0 after:w-1/2 after:animate-[flow_1.8s_ease-in-out_infinite] after:bg-[var(--lab-mode)]" : ""
      }`}
      aria-hidden
    />
  );
}

function ActivityItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-line px-4 py-3 last:border-0 sm:border-b-0 sm:border-r">
      <p className="text-[8px] uppercase tracking-[0.1em] text-faint">{label}</p>
      <p className="mt-1 truncate text-[10px] font-medium text-tx">{value}</p>
    </div>
  );
}

function SimpleMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-20 rounded-[14px] border border-line bg-bg/50 px-3 py-2.5">
      <p className="text-[8px] uppercase tracking-[0.12em] text-faint">{label}</p>
      <p className="mt-1 text-[15px] font-semibold text-tx">{value}</p>
    </div>
  );
}

function ActionButton({
  icon,
  label,
  detail,
  enabled,
  onClick,
}: {
  icon: FeatureIcon;
  label: string;
  detail: string;
  enabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={enabled}
      className={`flex min-h-24 items-start gap-3 rounded-[15px] border p-3 text-left transition ${
        enabled
          ? "border-accent/40 bg-accent/10 text-tx"
          : "border-line bg-surface/45 text-mut hover:bg-tx/[0.05] hover:text-tx"
      }`}
    >
      <span className={enabled ? "text-accent" : "text-faint"}>
        <Icon name={icon} width={17} height={17} />
      </span>
      <span>
        <span className="block text-[10px] font-semibold">{label}</span>
        <span className="mt-1 block text-[8px] leading-relaxed text-faint">
          {detail}
        </span>
      </span>
    </button>
  );
}
