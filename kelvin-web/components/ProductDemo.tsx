"use client";

import { useId, useState } from "react";
import KelvinPanel from "./KelvinPanel";
import PanelIcon, { type PanelIconName } from "./PanelIcon";
import {
  applyScenario,
  previewMetrics,
  scenarioApplied,
  scenarioState,
  type PreviewModule,
  type PreviewScenario,
} from "@/lib/preview-model";

const scenarios: PreviewScenario[] = ["desk", "focus", "render"];
const icons: Record<PreviewScenario, PanelIconName> = {
  desk: "battery",
  focus: "coffee",
  render: "fan",
};
const copy = {
  ru: {
    eyebrow: "Попробуйте Kelvin",
    title: "Одно действие.\nПонятный результат.",
    intro:
      "Выберите знакомую ситуацию и посмотрите, как Kelvin помогает управлять Mac.",
    desk: {
      title: "За рабочим столом",
      short: "Mac подключён к зарядке",
      text: "Батарея уже на 80%. Включите лимит, чтобы приостановить зарядку: питание Mac продолжится от адаптера.",
      action: "Ограничить заряд до 80%",
      result: "Зарядка на паузе. Потребление самого Mac не изменилось.",
    },
    focus: {
      title: "Работа без перерывов",
      short: "Чтение, созвон или презентация",
      text: "Не дайте Mac уснуть и включите более тёплый оттенок экрана. Два привычных действия рядом с показателями системы.",
      action: "Включить режим работы",
      result:
        "Сон отключён, Night Shift включён. Настройки можно изменить отдельно в панели.",
    },
    render: {
      title: "Под высокой нагрузкой",
      short: "Сборка проекта или рендер",
      text: "Посмотрите на датчики и включите усиленное охлаждение. В примере обороты вырастут, а расчётная температура снизится.",
      action: "Настроить охлаждение",
      result:
        "Профиль охлаждения и автоматика включены. Реальный эффект зависит от модели и нагрузки.",
    },
    load: "Нагрузка в примере",
    light: "Лёгкая",
    high: "Высокая",
    next: "Попробуйте действие",
    done: "Применено в превью",
    reset: "Начать заново",
    disclaimer:
      "Это модель, не показания вашего устройства. Все действия остаются внутри превью.",
    battery: "В батарею",
    cpu: "Температура CPU",
    awake: "Сон Mac",
    enabled: "Разрешён",
    disabled: "Отключён",
    watts: "Вт",
    caption: "Можно нажимать и на элементы самой панели",
  },
  pt: {
    eyebrow: "Experimente o Kelvin",
    title: "Uma ação.\nUm resultado claro.",
    intro:
      "Escolha uma situação do dia a dia e veja como o Kelvin ajuda a controlar o Mac.",
    desk: {
      title: "Na mesa de trabalho",
      short: "Mac conectado ao carregador",
      text: "A bateria já está em 80%. Ative o limite para pausar a carga: o adaptador continua alimentando o Mac.",
      action: "Limitar a carga a 80%",
      result: "Carga em pausa. O consumo do próprio Mac não mudou.",
    },
    focus: {
      title: "Trabalho sem pausas",
      short: "Leitura, chamada ou apresentação",
      text: "Mantenha o Mac acordado e ative tons mais quentes na tela. Duas ações do dia a dia ao lado dos indicadores do sistema.",
      action: "Ativar modo de trabalho",
      result:
        "Repouso desativado e Night Shift ativado. Você pode mudar cada ajuste no painel.",
    },
    render: {
      title: "Sob carga elevada",
      short: "Compilação ou renderização",
      text: "Confira os sensores e reforce o resfriamento. Neste exemplo, a rotação aumenta e a temperatura calculada diminui.",
      action: "Ajustar resfriamento",
      result:
        "Perfil de resfriamento e automação ativados. O efeito real depende do modelo e da carga.",
    },
    load: "Carga no exemplo",
    light: "Leve",
    high: "Alta",
    next: "Experimente uma ação",
    done: "Aplicado na prévia",
    reset: "Recomeçar",
    disclaimer:
      "É um modelo, não uma leitura do seu dispositivo. As ações ficam apenas na prévia.",
    battery: "Para a bateria",
    cpu: "Temperatura da CPU",
    awake: "Repouso do Mac",
    enabled: "Permitido",
    disabled: "Desativado",
    watts: "W",
    caption: "Você também pode usar os controles do painel",
  },
};

export default function ProductDemo({ locale }: { locale: string }) {
  const t = copy[locale === "pt" ? "pt" : "ru"];
  const id = useId();
  const [scenario, setScenario] = useState<PreviewScenario>("desk");
  const [state, setState] = useState(() => scenarioState("desk"));
  const [module, setModule] = useState<PreviewModule>("power");
  const selected = t[scenario];
  const done = scenarioApplied(state, scenario);
  const current = previewMetrics(state);
  const after = previewMetrics(applyScenario(state, scenario));
  const select = (next: PreviewScenario) => {
    setScenario(next);
    setState(scenarioState(next));
    setModule(next === "render" ? "hardware" : "power");
  };
  const beforeValue =
    scenario === "desk"
      ? `${current.battery} ${t.watts}`
      : scenario === "render"
        ? `${current.cpu}°`
        : state.awake
          ? t.disabled
          : t.enabled;
  const afterValue =
    scenario === "desk"
      ? `${after.battery} ${t.watts}`
      : scenario === "render"
        ? `${after.cpu}°`
        : t.disabled;

  return (
    <section id="demo" className="kp-demo-section">
      <div className="kp-section-inner">
        <header className="kp-section-intro">
          <p className="section-eyebrow !text-left">{t.eyebrow}</p>
          <h2>{t.title}</h2>
          <p>{t.intro}</p>
        </header>
        <div className="kp-demo-layout">
          <div className="kp-guide">
            <div className="kp-scenarios" role="group" aria-label={t.eyebrow}>
              {scenarios.map((item) => (
                <button
                  type="button"
                  key={item}
                  aria-pressed={scenario === item}
                  onClick={() => select(item)}
                >
                  <span className="kp-scenario-icon">
                    <PanelIcon name={icons[item]} />
                  </span>
                  <span>
                    <strong>{t[item].title}</strong>
                    <small>{t[item].short}</small>
                  </span>
                  <span className="kp-scenario-radio" />
                </button>
              ))}
            </div>
            <div className="kp-guide-action">
              <span className="kp-step-label">{done ? t.done : t.next}</span>
              <p>{selected.text}</p>
              <div className="kp-load-control">
                <label htmlFor={id + "-load"}>
                  {t.load}
                  <output>{state.workload}%</output>
                </label>
                <input
                  id={id + "-load"}
                  type="range"
                  min="0"
                  max="100"
                  value={state.workload}
                  onChange={(event) =>
                    setState({ ...state, workload: Number(event.target.value) })
                  }
                />
                <div>
                  <span>{t.light}</span>
                  <span>{t.high}</span>
                </div>
              </div>
              <div className="kp-result" aria-live="polite">
                <span>
                  {scenario === "desk"
                    ? t.battery
                    : scenario === "render"
                      ? t.cpu
                      : t.awake}
                </span>
                <div>
                  {!done && (
                    <>
                      <span>{beforeValue}</span>
                      <PanelIcon name="arrow" size={18} />
                    </>
                  )}
                  <strong>{done ? beforeValue : afterValue}</strong>
                  {done && <PanelIcon name="check" size={18} />}
                </div>
              </div>
              <button
                type="button"
                className="kp-apply"
                disabled={done}
                onClick={() => {
                  setState(applyScenario(state, scenario));
                  setModule(scenario === "render" ? "hardware" : "power");
                }}
              >
                <PanelIcon name={done ? "check" : icons[scenario]} size={18} />
                {done ? t.done : selected.action}
              </button>
              <p className="kp-result-note" role="status">
                {done ? selected.result : t.disclaimer}
              </p>
              <button
                type="button"
                className="kp-guide-reset"
                onClick={() => select(scenario)}
              >
                <PanelIcon name="reset" size={14} />
                {t.reset}
              </button>
            </div>
          </div>
          <div className="kp-demo-stage">
            <KelvinPanel
              locale={locale}
              compact
              state={state}
              onStateChange={setState}
              activeModule={module}
              onModuleChange={setModule}
            />
            <p className="kp-stage-caption">{t.caption}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
