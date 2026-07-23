"use client";

import { useTranslations } from "next-intl";
import Reveal from "./Reveal";
import { Icon, type FeatureIcon } from "./icons";
import { useKelvinExperience, type ToolKey } from "./KelvinExperience";

const LOAD_PRESETS = [
  { value: 18, key: "idle" },
  { value: 52, key: "work" },
  { value: 88, key: "render" },
] as const;

const TOOL_ICONS: Record<ToolKey, FeatureIcon> = {
  quiet: "fans",
  battery: "power",
  privacy: "security",
  developer: "dev",
};

export default function ProductDemo({ locale: _locale }: { locale: string }) {
  const t = useTranslations("LiveLab");
  const {
    activeTools,
    automationEnabled,
    automationThreshold,
    workload,
    toggleTool,
    setAutomationEnabled,
    setAutomationThreshold,
    setWorkload,
    applyRecommended,
    resetTools,
  } = useKelvinExperience();

  const cooling = activeTools.includes("quiet");
  const batteryCare = activeTools.includes("battery");
  const privacy = activeTools.includes("privacy");
  const developer = activeTools.includes("developer");
  const rawTemperature = Math.round(
    39 + workload * 0.46 + (developer ? 7 : 0) - (batteryCare ? 4 : 0)
  );
  const automationTriggered =
    automationEnabled && rawTemperature >= automationThreshold;
  const temperature = Math.max(
    36,
    rawTemperature - (cooling ? 9 : 0) - (automationTriggered ? 11 : 0)
  );
  const power = Math.max(
    5.8,
    7.4 + workload * 0.29 + (developer ? 5.2 : 0) - (batteryCare ? 4.6 : 0)
  ).toFixed(1);
  const rpm = automationTriggered
    ? 4400
    : cooling
      ? 3200
      : Math.round(1250 + workload * 17);
  const protectionScore = Math.min(
    100,
    34 +
      activeTools.length * 13 +
      Number(automationEnabled) * 12 +
      Number(privacy) * 8
  );
  const profile =
    workload >= 70
      ? t("profiles.thermal")
      : workload >= 40
        ? t("profiles.balanced")
        : t("profiles.battery");
  const status =
    temperature >= 78
      ? t("status.hot")
      : temperature >= 66
        ? t("status.attention")
        : t("status.normal");
  const statusTone =
    temperature >= 78
      ? "bg-[#ff6b6b] shadow-[0_0_12px_#ff6b6b]"
      : temperature >= 66
        ? "bg-[#ffbd59] shadow-[0_0_12px_#ffbd59]"
        : "bg-[#53d68a] shadow-[0_0_12px_#53d68a]";
  const graph = [0.34, 0.48, 0.42, 0.63, 0.52, 0.74, 0.66, 0.86, 0.72, 0.94];

  return (
    <section
      id="demo"
      className="relative overflow-hidden border-b border-line bg-[linear-gradient(180deg,var(--color-bg),var(--color-surface),var(--color-bg))]"
    >
      <div className="mx-auto max-w-[1180px] px-5 py-24 sm:py-32">
        <Reveal className="mx-auto max-w-[780px] text-center">
          <p className="section-eyebrow">{t("eyebrow")}</p>
          <h2 className="section-title">{t("title")}</h2>
          <p className="section-lead">{t("lead")}</p>
        </Reveal>

        <div className="live-lab mt-14 overflow-hidden rounded-[32px] border border-line bg-surface/72 shadow-[0_45px_130px_-55px_rgba(0,0,0,.8)]">
          <div className="flex flex-col gap-3 border-b border-line px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7">
            <div className="flex items-center gap-3">
              <span className={`h-2 w-2 rounded-full ${statusTone}`} />
              <div>
                <p className="text-[12px] font-semibold text-tx">{t("system")}</p>
                <p className="text-[10px] text-faint">{t("local")}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-medium text-faint">
              <span className="rounded-full border border-line bg-bg/50 px-3 py-1.5">
                {t("profile")}: <strong className="text-tx">{profile}</strong>
              </span>
              <button
                type="button"
                onClick={resetTools}
                className="rounded-full border border-line px-3 py-1.5 transition hover:bg-tx/10 hover:text-tx"
              >
                {t("reset")}
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-[0.78fr_1.22fr]">
            <div className="border-b border-line p-5 sm:p-7 lg:border-b-0 lg:border-r">
              <LabStep number="01" title={t("load.title")} description={t("load.desc")}>
                <div className="mt-5 flex gap-2">
                  {LOAD_PRESETS.map((preset) => (
                    <button
                      key={preset.key}
                      type="button"
                      onClick={() => setWorkload(preset.value)}
                      aria-pressed={workload === preset.value}
                      className={`flex-1 rounded-xl border px-2 py-2.5 text-[11px] font-medium transition ${
                        workload === preset.value
                          ? "border-accent/45 bg-accent/12 text-accent"
                          : "border-line bg-bg/35 text-mut hover:bg-tx/[0.05] hover:text-tx"
                      }`}
                    >
                      {t(`load.${preset.key}`)}
                    </button>
                  ))}
                </div>
                <div className="mt-5 flex items-center gap-4">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={workload}
                    onChange={(event) => setWorkload(Number(event.target.value))}
                    className="automation-range min-w-0 flex-1"
                    aria-label={t("load.aria")}
                    style={{ "--range-progress": `${workload}%` } as React.CSSProperties}
                  />
                  <strong className="w-10 text-right text-[14px] text-tx">{workload}%</strong>
                </div>
              </LabStep>

              <LabStep number="02" title={t("protect.title")} description={t("protect.desc")}>
                <div className="mt-5 grid grid-cols-2 gap-2">
                  {(Object.keys(TOOL_ICONS) as ToolKey[]).map((key) => {
                    const enabled = activeTools.includes(key);
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => toggleTool(key)}
                        aria-pressed={enabled}
                        className={`flex min-h-20 items-start gap-3 rounded-[14px] border p-3 text-left transition ${
                          enabled
                            ? "border-accent/40 bg-accent/10 text-tx"
                            : "border-line bg-bg/35 text-mut hover:bg-tx/[0.05] hover:text-tx"
                        }`}
                      >
                        <span className={`mt-0.5 ${enabled ? "text-accent" : "text-faint"}`}>
                          <Icon name={TOOL_ICONS[key]} width={17} height={17} />
                        </span>
                        <span>
                          <span className="block text-[11px] font-semibold">{t(`protect.${key}`)}</span>
                          <span className="mt-1 block text-[9px] text-faint">
                            {enabled ? t("on") : t("off")}
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </LabStep>

              <LabStep number="03" title={t("automation.title")} description={t("automation.desc")}>
                <div className="mt-5 rounded-[16px] border border-line bg-bg/35 p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-[11px] font-semibold text-tx">Thermal Guard</p>
                      <p className="mt-1 text-[9px] text-faint">
                        {t("automation.threshold", { value: automationThreshold })}
                      </p>
                    </div>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={automationEnabled}
                      aria-label={t("automation.toggle")}
                      onClick={() => setAutomationEnabled(!automationEnabled)}
                      className={`relative h-8 w-14 rounded-full border transition ${
                        automationEnabled
                          ? "border-accent/50 bg-accent/25"
                          : "border-line bg-tx/[0.05]"
                      }`}
                    >
                      <span
                        className={`absolute top-1 h-6 w-6 rounded-full transition-all ${
                          automationEnabled ? "left-7 bg-accent" : "left-1 bg-faint"
                        }`}
                      />
                    </button>
                  </div>
                  <input
                    type="range"
                    min="55"
                    max="90"
                    value={automationThreshold}
                    onChange={(event) =>
                      setAutomationThreshold(Number(event.target.value))
                    }
                    className="automation-range mt-4 w-full"
                    aria-label={t("automation.aria")}
                    style={{
                      "--range-progress": `${((automationThreshold - 55) / 35) * 100}%`,
                    } as React.CSSProperties}
                  />
                </div>
              </LabStep>
            </div>

            <div className="relative overflow-hidden bg-bg p-5 sm:p-8">
              <div className="demo-grid pointer-events-none absolute inset-0 opacity-30" />
              <div className="relative">
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <Telemetry label={t("metrics.cpu")} value={`${temperature}°`} detail={status} />
                  <Telemetry label={t("metrics.power")} value={`${power} W`} detail={t("metrics.live")} />
                  <Telemetry label={t("metrics.fans")} value={`${rpm}`} detail="RPM" />
                  <Telemetry label={t("metrics.score")} value={`${protectionScore}`} detail="/ 100" />
                </div>

                <div className="mt-4 overflow-hidden rounded-[24px] border border-line bg-surface/68 p-5 sm:p-7">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-faint">
                        {t("chart.eyebrow")}
                      </p>
                      <h3 className="mt-2 text-[20px] font-semibold tracking-[-0.03em] text-tx">
                        {t("chart.title")}
                      </h3>
                    </div>
                    <span className={`rounded-full border px-3 py-1.5 text-[10px] font-medium ${
                      automationTriggered
                        ? "border-accent/40 bg-accent/10 text-accent"
                        : "border-line bg-bg/40 text-faint"
                    }`}>
                      {automationTriggered ? t("chart.responding") : t("chart.observing")}
                    </span>
                  </div>

                  <div className="mt-8 flex h-40 items-end gap-2" aria-hidden>
                    {graph.map((point, index) => {
                      const height = Math.max(
                        12,
                        Math.min(100, point * workload + (index % 3) * 7)
                      );
                      return (
                        <span
                          key={index}
                          className={`w-full rounded-t-[5px] transition-[height,background-color] duration-500 ${
                            temperature >= 78
                              ? "bg-[#ff6b6b]/70"
                              : automationTriggered
                                ? "bg-[#53d68a]/70"
                                : "bg-accent/55"
                          }`}
                          style={{ height: `${height}%` }}
                        />
                      );
                    })}
                  </div>
                  <div className="mt-3 flex justify-between text-[9px] text-faint">
                    <span>{t("chart.before")}</span>
                    <span>{t("chart.now")}</span>
                  </div>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto]">
                  <div className="rounded-[20px] border border-line bg-surface/68 p-5">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-accent">
                      {t("recommendation.eyebrow")}
                    </p>
                    <p className="mt-2 text-[18px] font-semibold tracking-[-0.025em] text-tx">
                      {profile}
                    </p>
                    <p className="mt-2 max-w-[460px] text-[11px] leading-relaxed text-mut">
                      {t(
                        workload >= 70
                          ? "recommendation.thermal"
                          : workload >= 40
                            ? "recommendation.balanced"
                            : "recommendation.battery"
                      )}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={applyRecommended}
                    className="btn-primary min-w-44 self-center text-center sm:max-w-48"
                  >
                    {t("recommendation.apply")}
                  </button>
                </div>

                <p className="mt-4 text-center text-[9px] text-faint">
                  {t("disclaimer")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function LabStep({
  number,
  title,
  description,
  children,
}: {
  number: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-line py-6 first:pt-0 last:border-0 last:pb-0">
      <div className="flex gap-3">
        <span className="mt-0.5 text-[9px] font-semibold text-accent">{number}</span>
        <div>
          <h3 className="text-[14px] font-semibold text-tx">{title}</h3>
          <p className="mt-1 text-[10px] leading-relaxed text-faint">{description}</p>
        </div>
      </div>
      {children}
    </div>
  );
}

function Telemetry({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="rounded-[16px] border border-line bg-surface/60 p-4">
      <p className="text-[9px] uppercase tracking-[0.12em] text-faint">{label}</p>
      <p className="mt-2 text-[20px] font-semibold tracking-[-0.04em] text-tx">{value}</p>
      <p className="mt-1 truncate text-[9px] text-faint">{detail}</p>
    </div>
  );
}
