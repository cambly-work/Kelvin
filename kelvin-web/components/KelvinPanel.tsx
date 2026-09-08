"use client";

import { useId, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import PanelIcon, { type PanelIconName } from "./PanelIcon";
import {
  INITIAL_PREVIEW,
  previewMetrics,
  type PreviewModule,
  type PreviewState,
} from "@/lib/preview-model";

export type KelvinModule = PreviewModule;
const MODULES = ["power", "hardware", "privacy", "health"] as const;
const ICONS: Record<PreviewModule, PanelIconName> = {
  power: "bolt",
  hardware: "chip",
  privacy: "shield",
  health: "heart",
};
const COPY = {
  ru: {
    demo: "Превью",
    settings: "Настройки превью",
    reset: "Сбросить превью",
    charge: "Батарея заряжается",
    limit: "Заряд на паузе",
    sail: "Парусный режим",
    adapter: "Питание от адаптера",
    battery: "В батарею",
    system: "Потребление Mac",
    temperature: "Температура CPU",
    power: "Питание",
    hardware: "Датчики",
    privacy: "Сеть",
    health: "Здоровье",
    modes: ["Без лимита", "Лимит 80%", "Парус"],
    modeLabel: "Режим заряда",
    awake: "Не засыпать",
    night: "Night Shift",
    on: "Включено",
    off: "Выключено",
    chargeHint: "Лимит выключен. Зарядка продолжается.",
    limitHint: "Лимит 80% достигнут. Mac питается от адаптера.",
    sailHint:
      "Диапазон 70–80%. При 80% зарядка на паузе, ниже 70% возобновится.",
    graph: "Потребление за минуту",
    ago: "60 с назад",
    now: "Сейчас",
    watts: "Вт",
    flow: "Баланс питания",
    consumers: "Куда уходит энергия",
    memory: "Память",
    other: "Остальное",
    apps: "Приложения",
    impact: "Влияние",
    net: "Сеть",
    impactHint: "Влияние — относительный показатель, не ватты.",
    netHint: "Число сетевых направлений в примере.",
    cpuHint: "Доля CPU в примере.",
    cooling: "Усиленное охлаждение",
    coolingHint: "Пример профиля для Mac с вентиляторами.",
    automatic: "Автоматика по температуре",
    automaticHint: "В примере включается при высокой нагрузке.",
    gpuLabel: "Режим графики",
    gpuModes: ["Авто", "Встроенная", "Дискретная"],
    gpuHint: "Переключение — только на совместимых Intel Mac с двумя GPU.",
    networkTitle: "Соединения под контролем",
    connections: "соединения",
    destinations: "направления",
    views: ["Приложения", "Страны", "Порты"],
    countries: ["Бразилия", "США", "Германия", "Канада"],
    privacyHint: "Локальный снимок соединений. GeoIP без облака.",
    camera: "Камера и микрофон не активны",
    healthTitle: "Батарея в хорошем состоянии",
    capacity: "Исходной ёмкости",
    cycles: "Циклов",
    batteryTemp: "Температура",
    healthHint:
      "Стабильная ёмкость в примере истории. Нет заметного снижения за месяц.",
    history: "Ёмкость · 30 дней",
    historyAgo: "30 дней назад",
    launch: "Запуск при входе",
    hidden: "Скрытые файлы Finder",
    settingsHint: "Настройки этой демонстрации не меняют ваш Mac.",
    footer: "Демонстрационные данные · не диагностика вашего Mac",
  },
  pt: {
    demo: "Prévia",
    settings: "Ajustes da prévia",
    reset: "Redefinir prévia",
    charge: "Bateria carregando",
    limit: "Carga em pausa",
    sail: "Modo vela",
    adapter: "Energia do adaptador",
    battery: "Para a bateria",
    system: "Consumo do Mac",
    temperature: "Temperatura da CPU",
    power: "Energia",
    hardware: "Sensores",
    privacy: "Rede",
    health: "Saúde",
    modes: ["Sem limite", "Limite 80%", "Vela"],
    modeLabel: "Modo de carga",
    awake: "Manter ativo",
    night: "Night Shift",
    on: "Ativado",
    off: "Desativado",
    chargeHint: "Sem limite de carga. A bateria continua carregando.",
    limitHint: "Limite de 80% atingido. O Mac usa o adaptador.",
    sailHint: "Faixa de 70–80%. Pausa em 80%; a carga volta abaixo de 70%.",
    graph: "Consumo no último minuto",
    ago: "60 s atrás",
    now: "Agora",
    watts: "W",
    flow: "Balanço de energia",
    consumers: "Uso de energia",
    memory: "Memória",
    other: "Outros",
    apps: "Aplicativos",
    impact: "Impacto",
    net: "Rede",
    impactHint: "Impacto é um índice relativo, não watts.",
    netHint: "Número de destinos de rede no exemplo.",
    cpuHint: "Uso de CPU no exemplo.",
    cooling: "Resfriamento reforçado",
    coolingHint: "Exemplo de perfil para Macs com ventoinhas.",
    automatic: "Automação térmica",
    automaticHint: "No exemplo, atua sob carga elevada.",
    gpuLabel: "Modo gráfico",
    gpuModes: ["Auto", "Integrada", "Dedicada"],
    gpuHint: "Troca apenas em Macs Intel compatíveis com duas GPUs.",
    networkTitle: "Conexões à vista",
    connections: "conexões",
    destinations: "destinos",
    views: ["Apps", "Países", "Portas"],
    countries: ["Brasil", "EUA", "Alemanha", "Canadá"],
    privacyHint: "Conexões locais. GeoIP sem nuvem.",
    camera: "Câmera e microfone inativos",
    healthTitle: "Bateria em boas condições",
    capacity: "Capacidade original",
    cycles: "Ciclos",
    batteryTemp: "Temperatura",
    healthHint:
      "Capacidade estável neste histórico de exemplo. Sem queda relevante no mês.",
    history: "Capacidade · 30 dias",
    historyAgo: "30 dias atrás",
    launch: "Iniciar ao entrar",
    hidden: "Arquivos ocultos no Finder",
    settingsHint: "Os ajustes desta demonstração não alteram seu Mac.",
    footer: "Dados de demonstração · não é um diagnóstico do seu Mac",
  },
};

export default function KelvinPanel({
  locale,
  activeModule,
  onModuleChange,
  compact = false,
  state: controlled,
  onStateChange,
}: {
  locale: string;
  activeModule?: KelvinModule;
  onModuleChange?: (module: KelvinModule) => void;
  compact?: boolean;
  state?: PreviewState;
  onStateChange?: (state: PreviewState) => void;
}) {
  const t = COPY[locale === "pt" ? "pt" : "ru"];
  const id = useId();
  const [localState, setLocalState] = useState<PreviewState>({
    ...INITIAL_PREVIEW,
  });
  const state = controlled ?? localState;
  const [internalModule, setInternalModule] = useState<KelvinModule>("power");
  const currentModule = activeModule ?? internalModule;
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [networkView, setNetworkView] = useState(0);
  const [sort, setSort] = useState<"impact" | "cpu" | "net">("impact");
  const metrics = previewMetrics(state);
  const format = (value: number) =>
    new Intl.NumberFormat(locale === "pt" ? "pt-BR" : "ru-RU", {
      maximumFractionDigits: 1,
    }).format(value);
  const watts = (value: number) => format(value) + " " + t.watts;
  const update = (patch: Partial<PreviewState>) => {
    const next = { ...state, ...patch };
    if (onStateChange) onStateChange(next);
    else setLocalState(next);
  };
  const select = (module: KelvinModule) => {
    setInternalModule(module);
    onModuleChange?.(module);
  };
  const reset = () => {
    if (onStateChange) onStateChange({ ...INITIAL_PREVIEW });
    else setLocalState({ ...INITIAL_PREVIEW });
    setSettingsOpen(false);
    setNetworkView(0);
    setSort("impact");
    select("power");
  };
  const tabKeys = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const next =
      event.key === "ArrowRight"
        ? (index + 1) % 4
        : event.key === "ArrowLeft"
          ? (index + 3) % 4
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? 3
              : null;
    if (next === null) return;
    event.preventDefault();
    select(MODULES[next]);
    document.getElementById(id + "-" + MODULES[next])?.focus();
  };
  const chargeTitle =
    state.chargeMode === "off"
      ? t.charge
      : state.chargeMode === "limit"
        ? t.limit
        : t.sail;
  const apps = [
    { name: "Xcode", impact: 42, cpu: 76, net: 2 },
    { name: "Safari", impact: 18, cpu: 24, net: 7 },
    { name: "Mail", impact: 3, cpu: 1, net: 1 },
  ];
  const connections =
    networkView === 0
      ? [
          ["Safari", 26],
          ["Xcode", 12],
          ["Mail", 5],
        ]
      : networkView === 1
        ? t.countries.map((name, index) => [name, [20, 12, 7, 4][index]])
        : [
            ["HTTPS · 443", 35],
            ["DNS · 53", 5],
            ["IMAPS · 993", 3],
          ];

  return (
    <div className={`kp-panel ${compact ? "kp-panel--compact" : ""}`}>
      <div className="kp-toolbar">
        <span className="kp-brand">
          <Image src="/assets/icon.png" width={24} height={24} alt="" />
          Kelvin <span className="kp-demo-tag">{t.demo}</span>
        </span>
        <div className="kp-toolbar-actions">
          <button
            type="button"
            className="kp-icon-button"
            title={t.reset}
            aria-label={t.reset}
            onClick={reset}
          >
            <PanelIcon name="reset" size={17} />
          </button>
          <button
            type="button"
            className="kp-icon-button"
            title={t.settings}
            aria-label={t.settings}
            aria-expanded={settingsOpen}
            aria-controls={id + "-settings"}
            onClick={() => setSettingsOpen((value) => !value)}
          >
            <PanelIcon name="settings" size={18} />
          </button>
        </div>
      </div>

      <div id={id + "-settings"} hidden={!settingsOpen} className="kp-settings">
        <Toggle
          label={t.launch}
          on={state.launchAtLogin}
          onChange={() => update({ launchAtLogin: !state.launchAtLogin })}
          icon="settings"
        />
        <Toggle
          label={t.hidden}
          on={state.hiddenFiles}
          onChange={() => update({ hiddenFiles: !state.hiddenFiles })}
          icon="folder"
        />
        <p className="kp-hint">{t.settingsHint}</p>
      </div>

      <div className="kp-summary">
        <div className="kp-battery-ring" aria-label="80%">
          <svg viewBox="0 0 100 100" aria-hidden="true">
            <circle className="kp-ring-track" cx="50" cy="50" r="43" />
            <circle
              className="kp-ring-fill"
              cx="50"
              cy="50"
              r="43"
              pathLength="100"
              strokeDasharray="80 100"
            />
          </svg>
          <div>
            <strong>
              80<span>%</span>
            </strong>
            <PanelIcon name="battery" size={18} />
          </div>
        </div>
        <div className="kp-charge-status">
          <span className="kp-device">MacBook Pro · Intel</span>
          <h3>{chargeTitle}</h3>
          <p>
            <span className="kp-status-dot" />
            {t.adapter}
          </p>
        </div>
      </div>
      <div className="kp-metrics">
        <Metric value={watts(metrics.system)} label={t.system} />
        <Metric value={metrics.cpu + "°"} label={t.temperature} />
        <Metric value={watts(metrics.battery)} label={t.battery} />
      </div>

      <div className="kp-quick-actions">
        <button
          type="button"
          aria-pressed={state.awake}
          className={state.awake ? "is-on" : ""}
          onClick={() => update({ awake: !state.awake })}
        >
          <span className="kp-control-icon">
            <PanelIcon name="coffee" />
          </span>
          <span>
            {t.awake}
            <small>{state.awake ? t.on : t.off}</small>
          </span>
        </button>
        <button
          type="button"
          aria-pressed={state.nightShift}
          className={state.nightShift ? "is-on" : ""}
          onClick={() => update({ nightShift: !state.nightShift })}
        >
          <span className="kp-control-icon">
            <PanelIcon name="moon" />
          </span>
          <span>
            {t.night}
            <small>{state.nightShift ? t.on : t.off}</small>
          </span>
        </button>
      </div>

      <div
        className="kp-tabs"
        role="tablist"
        aria-label={locale === "pt" ? "Módulos do Kelvin" : "Модули Kelvin"}
      >
        {MODULES.map((module, index) => (
          <button
            key={module}
            type="button"
            role="tab"
            id={id + "-" + module}
            aria-controls={id + "-content"}
            aria-selected={currentModule === module}
            tabIndex={currentModule === module ? 0 : -1}
            onKeyDown={(event) => tabKeys(event, index)}
            onClick={() => select(module)}
          >
            <PanelIcon name={ICONS[module]} size={18} />
            <span>{t[module]}</span>
          </button>
        ))}
      </div>

      <div
        className="kp-module"
        id={id + "-content"}
        role="tabpanel"
        aria-labelledby={id + "-" + currentModule}
        tabIndex={0}
      >
        {currentModule === "power" && (
          <>
            <div className="kp-section-heading">
              <span>{t.modeLabel}</span>
              <PanelIcon name="battery" size={17} />
            </div>
            <div className="kp-segment" role="group" aria-label={t.modeLabel}>
              {(["off", "limit", "sail"] as const).map((mode, index) => (
                <button
                  key={mode}
                  type="button"
                  aria-pressed={state.chargeMode === mode}
                  onClick={() => update({ chargeMode: mode })}
                >
                  {t.modes[index]}
                </button>
              ))}
            </div>
            <p className="kp-hint kp-charge-hint" role="status">
              {state.chargeMode === "off"
                ? t.chargeHint
                : state.chargeMode === "limit"
                  ? t.limitHint
                  : t.sailHint}
            </p>
            <div className="kp-section-heading">
              <span>{t.graph}</span>
              <strong>{watts(metrics.system)}</strong>
            </div>
            <Sparkline
              label={t.graph}
              values={[
                0.69, 0.73, 0.71, 0.81, 0.76, 0.88, 0.85, 0.9, 0.87, 1,
              ].map((value) => value * metrics.system)}
              max={55}
            />
            <div className="kp-chart-labels">
              <span>{t.ago}</span>
              <span>{t.now}</span>
            </div>
            <div className="kp-energy-flow" aria-label={t.flow}>
              <div>
                <PanelIcon name="plug" size={18} />
                <span>{t.adapter}</span>
                <strong>{watts(metrics.adapter)}</strong>
              </div>
              <PanelIcon name="arrow" size={16} />
              <div>
                <PanelIcon name="laptop" size={18} />
                <span>Mac</span>
                <strong>{watts(metrics.system)}</strong>
              </div>
              <span className="kp-flow-plus">+</span>
              <div>
                <PanelIcon name="battery" size={18} />
                <span>{t.battery}</span>
                <strong>{watts(metrics.battery)}</strong>
              </div>
            </div>
            {!compact && (
              <details className="kp-details">
                <summary>
                  {t.apps}
                  <span>↓</span>
                </summary>
                <div className="kp-segment" role="group" aria-label={t.apps}>
                  {(["impact", "cpu", "net"] as const).map((metric) => (
                    <button
                      type="button"
                      key={metric}
                      aria-pressed={sort === metric}
                      onClick={() => setSort(metric)}
                    >
                      {metric === "impact"
                        ? t.impact
                        : metric === "cpu"
                          ? "CPU"
                          : t.net}
                    </button>
                  ))}
                </div>
                {[...apps]
                  .sort((a, b) => b[sort] - a[sort])
                  .map((app) => (
                    <Row
                      key={app.name}
                      label={app.name}
                      value={app[sort] + (sort === "cpu" ? "%" : "")}
                      icon="laptop"
                    />
                  ))}
                <p className="kp-hint">
                  {sort === "impact"
                    ? t.impactHint
                    : sort === "net"
                      ? t.netHint
                      : t.cpuHint}
                </p>
              </details>
            )}
          </>
        )}

        {currentModule === "hardware" && (
          <>
            <div className="kp-section-heading">
              <span>{t.hardware}</span>
              <span className="kp-soft-label">Intel</span>
            </div>
            <div className="kp-sensor-grid">
              <Metric value={metrics.cpu + "°"} label="CPU" />
              <Metric value={metrics.gpu + "°"} label="GPU" />
              <Metric value={format(metrics.rpm)} label="RPM" />
            </div>
            <Toggle
              label={t.cooling}
              on={state.cooling}
              onChange={() => update({ cooling: !state.cooling })}
              icon="fan"
            />
            <p className="kp-hint">{t.coolingHint}</p>
            <Toggle
              label={t.automatic}
              on={state.automation}
              onChange={() => update({ automation: !state.automation })}
              icon="chip"
            />
            <p className="kp-hint">{t.automaticHint}</p>
            <div className="kp-section-heading kp-spaced">
              <span>{t.gpuLabel}</span>
            </div>
            <div className="kp-segment" role="group" aria-label={t.gpuLabel}>
              {(["auto", "integrated", "discrete"] as const).map(
                (mode, index) => (
                  <button
                    key={mode}
                    type="button"
                    aria-pressed={state.gpuMode === mode}
                    onClick={() => update({ gpuMode: mode })}
                  >
                    {t.gpuModes[index]}
                  </button>
                ),
              )}
            </div>
            <p className="kp-hint">{t.gpuHint}</p>
          </>
        )}

        {currentModule === "privacy" && (
          <>
            <div className="kp-section-heading">
              <span>{t.networkTitle}</span>
              <PanelIcon name="globe" size={18} />
            </div>
            <div className="kp-network-summary">
              <strong>
                43 <span>{t.connections}</span>
              </strong>
              <span>9 {t.destinations}</span>
            </div>
            <div className="kp-segment" role="group" aria-label={t.privacy}>
              {t.views.map((label, index) => (
                <button
                  key={label}
                  type="button"
                  aria-pressed={networkView === index}
                  onClick={() => setNetworkView(index)}
                >
                  {label}
                </button>
              ))}
            </div>
            <div className="kp-connections">
              {connections.map(([name, count]) => (
                <Row
                  key={String(name)}
                  label={String(name)}
                  value={String(count)}
                  icon={networkView === 0 ? "laptop" : "globe"}
                />
              ))}
            </div>
            <p className="kp-safe-note">
              <PanelIcon name="shield" size={16} />
              {t.camera}
            </p>
            <p className="kp-hint">{t.privacyHint}</p>
          </>
        )}

        {currentModule === "health" && (
          <>
            <div className="kp-health-title">
              <PanelIcon name="heart" size={23} />
              <h4>{t.healthTitle}</h4>
            </div>
            <div className="kp-sensor-grid">
              <Metric value="98%" label={t.capacity} />
              <Metric value="214" label={t.cycles} />
              <Metric value="32°" label={t.batteryTemp} />
            </div>
            <div className="kp-section-heading kp-spaced">
              <span>{t.history}</span>
              <strong>98%</strong>
            </div>
            <Sparkline
              label={t.history}
              values={[
                98.6, 98.5, 98.5, 98.4, 98.3, 98.3, 98.2, 98.2, 98.1, 98,
              ]}
              min={95}
              max={100}
            />
            <div className="kp-chart-labels">
              <span>{t.historyAgo}</span>
              <span>{t.now}</span>
            </div>
            <p className="kp-hint">{t.healthHint}</p>
          </>
        )}
      </div>
      <div className="kp-footer">
        <span className="kp-status-dot" />
        {t.footer}
      </div>
    </div>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className="kp-metric">
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}

function Row({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: PanelIconName;
}) {
  return (
    <div className="kp-row">
      <PanelIcon name={icon} size={17} />
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function Toggle({
  label,
  on,
  onChange,
  icon,
}: {
  label: string;
  on: boolean;
  onChange: () => void;
  icon: PanelIconName;
}) {
  return (
    <button
      type="button"
      className="kp-toggle"
      role="switch"
      aria-label={label}
      aria-checked={on}
      onClick={onChange}
    >
      <PanelIcon name={icon} size={19} />
      <span>{label}</span>
      <i aria-hidden="true">
        <b />
      </i>
    </button>
  );
}

function Sparkline({
  label,
  values,
  min = 0,
  max,
}: {
  label: string;
  values: number[];
  min?: number;
  max: number;
}) {
  const id = useId();
  const points = values
    .map(
      (value, index) =>
        `${(index * 300) / (values.length - 1)},${70 - ((value - min) / (max - min)) * 60}`,
    )
    .join(" ");
  return (
    <svg
      className="kp-sparkline"
      viewBox="0 0 300 80"
      preserveAspectRatio="none"
      role="img"
      aria-label={label}
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity=".2" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path className="kp-grid-line" d="M0 20H300M0 45H300M0 70H300" />
      <polygon points={`0,80 ${points} 300,80`} fill={`url(#${id})`} />
      <polyline
        points={points}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
