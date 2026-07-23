"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useTranslations } from "next-intl";

export type ToolKey = "quiet" | "battery" | "privacy" | "developer";

type ExperienceContextValue = {
  activeTools: ToolKey[];
  automationEnabled: boolean;
  automationThreshold: number;
  workload: number;
  toggleTool: (tool: ToolKey) => void;
  resetTools: () => void;
  applyRecommended: () => void;
  setAutomationEnabled: (enabled: boolean) => void;
  setAutomationThreshold: (value: number) => void;
  setWorkload: (value: number) => void;
};

const ExperienceContext = createContext<ExperienceContextValue | null>(null);

const COLORS: Record<ToolKey, { accent: string; glow: string }> = {
  quiet: { accent: "#7c9cff", glow: "rgba(124,156,255,.22)" },
  battery: { accent: "#53d68a", glow: "rgba(83,214,138,.2)" },
  privacy: { accent: "#b78cff", glow: "rgba(183,140,255,.2)" },
  developer: { accent: "#58c7ff", glow: "rgba(88,199,255,.2)" },
};

export function KelvinExperienceProvider({ children }: { children: ReactNode }) {
  const [activeTools, setActiveTools] = useState<ToolKey[]>([]);
  const [automationEnabled, setAutomationEnabled] = useState(false);
  const [automationThreshold, setAutomationThreshold] = useState(72);
  const [workload, setWorkload] = useState(32);

  useEffect(() => {
    const root = document.documentElement;
    const latest = activeTools.at(-1);
    if (!latest) {
      root.style.removeProperty("--command-accent");
      root.style.removeProperty("--command-glow");
      root.removeAttribute("data-command-mode");
      return;
    }
    root.style.setProperty("--command-accent", COLORS[latest].accent);
    root.style.setProperty("--command-glow", COLORS[latest].glow);
    root.setAttribute("data-command-mode", latest);
  }, [activeTools]);

  const value = useMemo<ExperienceContextValue>(
    () => ({
      activeTools,
      automationEnabled,
      automationThreshold,
      workload,
      toggleTool: (tool) =>
        setActiveTools((current) =>
          current.includes(tool)
            ? current.filter((item) => item !== tool)
            : [...current, tool]
        ),
      resetTools: () => {
        setActiveTools([]);
        setAutomationEnabled(false);
        setWorkload(32);
      },
      applyRecommended: () => {
        setActiveTools(
          workload >= 70
            ? ["quiet", "battery", "privacy"]
            : workload >= 40
              ? ["battery", "privacy"]
              : ["battery"]
        );
        setAutomationEnabled(workload >= 40);
        setAutomationThreshold(workload >= 70 ? 68 : 72);
      },
      setAutomationEnabled,
      setAutomationThreshold,
      setWorkload,
    }),
    [activeTools, automationEnabled, automationThreshold, workload]
  );

  return (
    <ExperienceContext.Provider value={value}>
      {children}
      <ExperienceDock />
    </ExperienceContext.Provider>
  );
}

export function useKelvinExperience() {
  const value = useContext(ExperienceContext);
  if (!value) {
    throw new Error("useKelvinExperience must be used within KelvinExperienceProvider");
  }
  return value;
}

function ExperienceDock() {
  const t = useTranslations("Experience");
  const {
    activeTools,
    automationEnabled,
    resetTools,
  } = useKelvinExperience();
  if (activeTools.length === 0 && !automationEnabled) return null;

  return (
    <aside className="experience-dock fixed bottom-4 left-1/2 z-[80] flex max-w-[calc(100vw-2rem)] -translate-x-1/2 items-center gap-3 rounded-full border border-white/10 bg-[#0b0f16]/85 px-3 py-2 shadow-[0_18px_60px_rgba(0,0,0,.5)] backdrop-blur-2xl">
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--command-glow)] text-[10px] font-bold text-[var(--command-accent)]">
        {activeTools.length + Number(automationEnabled)}
      </span>
      <span className="experience-dock-label truncate text-[11px] font-medium text-white/70">
        {automationEnabled ? t("automationActive") : t("modulesActive", { count: activeTools.length })}
      </span>
      <button
        type="button"
        onClick={() => {
          resetTools();
        }}
        className="experience-dock-reset rounded-full border border-white/10 px-2.5 py-1 text-[10px] text-white/45 transition hover:bg-white/10 hover:text-white"
      >
        {t("reset")}
      </button>
    </aside>
  );
}
