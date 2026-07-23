"use client";

import { useTranslations } from "next-intl";
import Reveal from "./Reveal";
import { useKelvinExperience } from "./KelvinExperience";

export default function AutomationBuilder() {
  const t = useTranslations("Automation");
  const {
    automationEnabled,
    automationThreshold,
    setAutomationEnabled,
    setAutomationThreshold,
  } = useKelvinExperience();

  return (
    <section id="automation" className="border-b border-line">
      <div className="mx-auto max-w-[1100px] px-5 py-24 sm:py-32">
        <Reveal className="mx-auto max-w-[720px] text-center">
          <p className="section-eyebrow">{t("eyebrow")}</p>
          <h2 className="section-title">{t("title")}</h2>
          <p className="section-lead">{t("lead")}</p>
        </Reveal>

        <Reveal index={1} className="automation-canvas relative mx-auto mt-14 max-w-[920px] overflow-hidden rounded-[30px] border border-line bg-surface/65 p-5 shadow-[0_35px_120px_-55px_rgba(0,0,0,.65)] sm:p-8">
          <div className="demo-grid absolute inset-0 opacity-20" />
          <div className="relative grid items-stretch gap-4 lg:grid-cols-[1fr_auto_1fr_auto_1fr]">
            <RuleCard index="01" eyebrow={t("when")} title={t("temperature")} tone="blue">
              <div className="mt-6">
                <div className="flex items-center justify-between text-[12px] text-faint">
                  <button
                    type="button"
                    onClick={() => setAutomationThreshold(Math.max(55, automationThreshold - 1))}
                    className="flex h-7 w-7 items-center justify-center rounded-lg border border-line text-mut transition hover:bg-tx/10 hover:text-tx"
                    aria-label={t("decrease")}
                  >
                    −
                  </button>
                  <strong className="text-[18px] text-tx">{automationThreshold}°</strong>
                  <button
                    type="button"
                    onClick={() => setAutomationThreshold(Math.min(90, automationThreshold + 1))}
                    className="flex h-7 w-7 items-center justify-center rounded-lg border border-line text-mut transition hover:bg-tx/10 hover:text-tx"
                    aria-label={t("increase")}
                  >
                    +
                  </button>
                </div>
                <input
                  type="range"
                  min="55"
                  max="90"
                  value={automationThreshold}
                  onChange={(event) => setAutomationThreshold(Number(event.target.value))}
                  className="automation-range mt-4 w-full"
                  aria-label={t("threshold")}
                />
              </div>
            </RuleCard>

            <Connector />

            <RuleCard index="02" eyebrow={t("then")} title={t("fanProfile")} tone="violet">
              <div className="mt-6 flex items-end gap-1.5" aria-hidden>
                {[30, 45, 38, 62, 78, 66, 92].map((height, index) => (
                  <span
                    key={index}
                    className="w-full rounded-t bg-accent/55"
                    style={{ height }}
                  />
                ))}
              </div>
            </RuleCard>

            <Connector />

            <RuleCard index="03" eyebrow={t("result")} title={t("protected")} tone="green">
              <div className="mt-7 flex items-center gap-3">
                <span className={`h-3 w-3 rounded-full ${automationEnabled ? "animate-pulse bg-[#53d68a] shadow-[0_0_16px_#53d68a]" : "bg-white/20"}`} />
                  <span className="text-[13px] text-mut">
                  {automationEnabled ? t("watching") : t("disabled")}
                </span>
              </div>
            </RuleCard>
          </div>

          <div className="relative mt-5 flex flex-col items-center justify-between gap-4 rounded-[18px] border border-line bg-bg/35 px-5 py-4 sm:flex-row">
            <div>
              <p className="text-[13px] font-semibold text-tx">{t("ruleName")}</p>
              <p className="mt-1 text-[11px] text-faint">{t("local")}</p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={automationEnabled}
              onClick={() => setAutomationEnabled(!automationEnabled)}
              className={`relative h-9 w-[68px] rounded-full border transition-colors ${
                automationEnabled ? "border-accent/50 bg-accent/25" : "border-line bg-tx/[0.05]"
              }`}
            >
              <span
                className={`absolute top-1 h-7 w-7 rounded-full transition-all ${
                  automationEnabled
                    ? "left-9 bg-accent shadow-[0_0_18px_var(--command-glow)]"
                    : "left-1 bg-faint"
                }`}
              />
              <span className="sr-only">{automationEnabled ? t("disable") : t("enable")}</span>
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function RuleCard({
  index,
  eyebrow,
  title,
  children,
  tone,
}: {
  index: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
  tone: "blue" | "violet" | "green";
}) {
  const toneClass = {
    blue: "from-[#58a6ff]/15",
    violet: "from-[#a98bff]/15",
    green: "from-[#53d68a]/15",
  }[tone];
  return (
    <div className={`relative min-h-52 overflow-hidden rounded-[20px] border border-line bg-gradient-to-br ${toneClass} to-transparent p-5`}>
      <span className="text-[10px] font-semibold text-faint">{index}</span>
      <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.14em] text-accent">{eyebrow}</p>
      <h3 className="mt-2 text-[18px] font-semibold tracking-[-0.025em] text-tx">{title}</h3>
      {children}
    </div>
  );
}

function Connector() {
  return (
    <div className="hidden items-center lg:flex" aria-hidden>
      <span className="h-px w-6 bg-gradient-to-r from-white/10 to-accent/50" />
      <span className="-ml-1 h-2 w-2 rotate-45 border-r border-t border-accent/60" />
    </div>
  );
}
