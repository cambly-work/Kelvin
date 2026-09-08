export type PreviewModule = "power" | "hardware" | "privacy" | "health";
export type PreviewScenario = "desk" | "focus" | "render";
export type PreviewState = {
  chargeMode: "off" | "limit" | "sail";
  awake: boolean;
  nightShift: boolean;
  hiddenFiles: boolean;
  launchAtLogin: boolean;
  cooling: boolean;
  automation: boolean;
  workload: number;
  gpuMode: "auto" | "integrated" | "discrete";
};

export const INITIAL_PREVIEW: PreviewState = {
  chargeMode: "off",
  awake: false,
  nightShift: false,
  hiddenFiles: false,
  launchAtLogin: false,
  cooling: false,
  automation: false,
  workload: 32,
  gpuMode: "auto",
};

/** Illustrative snapshots only. No device APIs and no claims of measured savings. */
export function previewMetrics(state: PreviewState) {
  const workload = Math.min(
    100,
    Math.max(0, Number.isFinite(state.workload) ? state.workload : 32),
  );
  const coolingActive = state.cooling || (state.automation && workload >= 70);
  const system = Math.round((6 + workload * 0.38) * 10) / 10;
  const battery = state.chargeMode === "off" ? 8 : 0;
  return {
    system,
    battery,
    adapter: Math.round((system + battery) * 10) / 10,
    cpu: Math.round(40 + workload * 0.44 - (coolingActive ? 8 : 0)),
    gpu: Math.round(36 + workload * 0.32),
    rpm:
      Math.round((1800 + workload * 24 + (coolingActive ? 700 : 0)) / 100) *
      100,
    coolingActive,
  };
}

export function scenarioState(scenario: PreviewScenario): PreviewState {
  return {
    ...INITIAL_PREVIEW,
    workload: scenario === "render" ? 84 : scenario === "focus" ? 24 : 32,
  };
}

export function applyScenario(
  state: PreviewState,
  scenario: PreviewScenario,
): PreviewState {
  if (scenario === "desk") return { ...state, chargeMode: "limit" };
  if (scenario === "focus") return { ...state, awake: true, nightShift: true };
  return { ...state, cooling: true, automation: true };
}

export function scenarioApplied(
  state: PreviewState,
  scenario: PreviewScenario,
) {
  return scenario === "desk"
    ? state.chargeMode === "limit"
    : scenario === "focus"
      ? state.awake && state.nightShift
      : state.cooling && state.automation;
}
