import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import ts from "typescript";

const source = readFileSync(
  new URL("../lib/preview-model.ts", import.meta.url),
  "utf8",
);
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS },
}).outputText;
const exports = {};
runInNewContext(compiled, { exports });
const {
  INITIAL_PREVIEW,
  previewMetrics,
  scenarioState,
  applyScenario,
  scenarioApplied,
} = exports;
for (const scenario of ["desk", "focus", "render"]) {
  const state = scenarioState(scenario);
  const original = JSON.stringify(state);
  assert.equal(scenarioApplied(state, scenario), false);
  const applied = applyScenario(state, scenario);
  assert.equal(scenarioApplied(applied, scenario), true);
  assert.equal(JSON.stringify(state), original, "Do not mutate initial state");
  assert.deepEqual(
    applyScenario(applied, scenario),
    applied,
    "Applying twice is safe",
  );
  assert.equal(applied.workload, state.workload);
  assert.equal(
    scenarioApplied(scenarioState(scenario), scenario),
    false,
    "Reset clears scenario",
  );
}
for (const workload of [-100, 0, 24, 32, 69, 70, 84, 100, 999, NaN, Infinity]) {
  for (const chargeMode of ["off", "limit", "sail"]) {
    const state = { ...INITIAL_PREVIEW, workload, chargeMode };
    const metrics = previewMetrics(state);
    assert.ok(
      Math.abs(metrics.adapter - metrics.system - metrics.battery) < 0.00001,
      "Adapter = Mac + charge",
    );
    assert.ok(metrics.system >= 6 && metrics.system <= 44);
    assert.ok(metrics.cpu >= 40 && metrics.cpu <= 84);
    assert.equal(metrics.battery, chargeMode === "off" ? 8 : 0);
    assert.equal(
      previewMetrics({ ...state, chargeMode: "limit" }).system,
      metrics.system,
      "Charge limit is not reduced Mac consumption",
    );
    const cooled = previewMetrics({ ...state, cooling: true });
    assert.ok(cooled.cpu < metrics.cpu && cooled.rpm > metrics.rpm);
  }
}
assert.equal(
  previewMetrics({ ...INITIAL_PREVIEW, automation: true, workload: 69 })
    .coolingActive,
  false,
);
assert.equal(
  previewMetrics({ ...INITIAL_PREVIEW, automation: true, workload: 70 })
    .coolingActive,
  true,
);
console.log("Preview scenarios, reset, bounds and energy balance: PASS");
