"use client";

import { useId, useState } from "react";

export type KelvinModule = "power" | "hardware" | "privacy" | "health";

type PanelCopy = {
  charging: string;
  paused: string;
  sailing: string;
  watts: string;
  temperature: string;
  fan: string;
  battery: string;
  off: string;
  limit: string;
  sail: string;
  toggles: string;
  awake: string;
  limit80: string;
  sound: string;
  output: string;
  power: string;
  hardware: string;
  privacy: string;
  health: string;
  powerSystem: string;
  stable: string;
  stableLimit: string;
  stableSail: string;
  adapter: string;
  system: string;
  usage: string;
  memory: string;
  other: string;
  sensors: string;
  high: string;
  pinned: string;
  networkRadar: string;
  networkLead: string;
  cameraSafe: string;
  noVpn: string;
  countries: string;
  apps: string;
  ports: string;
  connections: string;
  directions: string;
  batteryHealth: string;
  capacity: string;
  cycles: string;
  condition: string;
  excellent: string;
  localHistory: string;
};

const COPY: Record<"ru" | "pt", PanelCopy> = {
  ru: {
    charging: "Зарядка", paused: "Пауза на 80%", sailing: "Парусный режим", watts: "Ватт", temperature: "Темп", fan: "Кулер", battery: "АКБ",
    off: "Выкл", limit: "Лимит", sail: "Парус", toggles: "Переключатели", awake: "Не засыпать",
    limit80: "Лимит 80%", sound: "Звук · вывод", output: "Встроенный выход", power: "Питание",
    hardware: "Железо", privacy: "Приватность", health: "Здоровье", powerSystem: "СИСТЕМА ПИТАНИЯ",
    stable: "Питание стабильно · батарея заряжается", stableLimit: "Заряд удерживается на уровне 80%", stableSail: "Питание от адаптера · батарея отдыхает", adapter: "Адаптер", system: "Система", usage: "НАГРУЗКА",
    memory: "Память", other: "Прочее", sensors: "ДАТЧИКИ", high: "Высокая: 81°", pinned: "Закреплённые",
    networkRadar: "Приватность · радар", networkLead: "Куда сейчас звонит ваш Mac — приложения, страны и порты.",
    cameraSafe: "Камера и микрофон не активны", noVpn: "Без VPN", countries: "Страны", apps: "Приложения",
    ports: "Порты", connections: "43 соединения", directions: "9 направлений", batteryHealth: "ЗДОРОВЬЕ БАТАРЕИ",
    capacity: "Ёмкость", cycles: "Циклы", condition: "Состояние", excellent: "Отличное",
    localHistory: "Пример локальной истории · 30 дней",
  },
  pt: {
    charging: "Carregando", paused: "Pausa em 80%", sailing: "Modo vela", watts: "Potência", temperature: "Temp", fan: "Ventoinha", battery: "Bateria",
    off: "Desat.", limit: "Limite", sail: "Vela", toggles: "Controles", awake: "Manter ativo",
    limit80: "Limite 80%", sound: "Som · saída", output: "Saída integrada", power: "Energia",
    hardware: "Hardware", privacy: "Privacidade", health: "Saúde", powerSystem: "SISTEMA DE ENERGIA",
    stable: "Energia estável · bateria carregando", stableLimit: "Carga mantida no limite de 80%", stableSail: "Energia do adaptador · bateria em repouso", adapter: "Adaptador", system: "Sistema", usage: "USO",
    memory: "Memória", other: "Outros", sensors: "SENSORES", high: "Alta: 81°", pinned: "Fixados",
    networkRadar: "Privacidade · radar", networkLead: "Para onde o Mac se conecta — apps, países e portas.",
    cameraSafe: "Câmera e microfone inativos", noVpn: "Sem VPN", countries: "Países", apps: "Apps",
    ports: "Portas", connections: "43 conexões", directions: "9 destinos", batteryHealth: "SAÚDE DA BATERIA",
    capacity: "Capacidade", cycles: "Ciclos", condition: "Condição", excellent: "Excelente",
    localHistory: "Exemplo de histórico local · 30 dias",
  },
};

export default function KelvinPanel({
  locale,
  activeModule,
  onModuleChange,
  compact = false,
}: {
  locale: string;
  activeModule?: KelvinModule;
  onModuleChange?: (module: KelvinModule) => void;
  compact?: boolean;
}) {
  const language = locale === "pt" ? "pt" : "ru";
  const t = COPY[language];
  const panelId = useId();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [launchAtLogin, setLaunchAtLogin] = useState(false);
  const [internalModule, setInternalModule] = useState<KelvinModule>("power");
  const [awake, setAwake] = useState(true);
  const [chargeMode, setChargeMode] = useState<"off" | "limit" | "sail">("off");
  const currentModule = activeModule ?? internalModule;
  const chargeLimit = chargeMode === "limit";
  const chargeLabel = chargeMode === "limit" ? t.paused : chargeMode === "sail" ? t.sailing : t.charging;
  const chargePower = chargeMode === "off" ? "59 W" : "56 W";
  const batteryDelta = chargeMode === "off" ? "+3 W" : "0 W";

  const selectModule = (module: KelvinModule) => {
    setInternalModule(module);
    onModuleChange?.(module);
  };

  const modules: { id: KelvinModule; glyph: string; label: string }[] = [
    { id: "power", glyph: "ϟ", label: t.power },
    { id: "hardware", glyph: "▧", label: t.hardware },
    { id: "privacy", glyph: "◇", label: t.privacy },
    { id: "health", glyph: "♥", label: t.health },
  ];

  return (
    <div className={`kelvin-ui-panel ${compact ? "kelvin-ui-panel--compact" : ""}`}>
      <div className="kelvin-ui-aura" />
      <div className="kelvin-ui-header">
        <div className="kelvin-ui-ring" aria-label="80%"><strong>80%</strong><span>ϟ</span></div>
        <div className="kelvin-ui-charge"><strong>{chargeLabel}</strong><span>{chargePower}</span></div>
        <button type="button" className="kelvin-ui-settings" aria-expanded={settingsOpen} aria-controls={`${panelId}-settings`} aria-label={language === "ru" ? "Настройки превью" : "Ajustes da prévia"} onClick={() => setSettingsOpen(value => !value)}>⚙</button>
      </div>

      {settingsOpen && <div id={`${panelId}-settings`} className="kelvin-ui-settings-body">
        <strong>{language === "ru" ? "Настройки панели" : "Ajustes do painel"}</strong>
        <button type="button" role="switch" aria-checked={launchAtLogin} onClick={() => setLaunchAtLogin(value => !value)}>
          <span>{language === "ru" ? "Запуск при входе" : "Iniciar ao entrar"}</span><b>{launchAtLogin ? "✓" : "−"}</b>
        </button>
        <p>{language === "ru" ? "Пример настройки. На сайте автозапуск Mac не изменяется." : "Exemplo de ajuste. A prévia não altera a inicialização do Mac."}</p>
      </div>}

      <div className="kelvin-ui-metrics">
        <Metric value="56" label={t.watts} />
        <Metric value="81°" label={t.temperature} warn />
        <Metric value="4903" label={t.fan} />
        <Metric value={batteryDelta} label={t.battery} accent={chargeMode === "off"} />
      </div>

      <div className="kelvin-ui-segment" aria-label={language === "ru" ? "Режим зарядки" : "Modo de carga"}>
        <button type="button" aria-pressed={chargeMode === "off"} onClick={() => setChargeMode("off")} className={chargeMode === "off" ? "is-active" : ""}>{t.off}</button>
        <button type="button" aria-pressed={chargeMode === "limit"} onClick={() => setChargeMode("limit")} className={chargeMode === "limit" ? "is-active" : ""}>{t.limit}</button>
        <button type="button" aria-pressed={chargeMode === "sail"} onClick={() => setChargeMode("sail")} className={chargeMode === "sail" ? "is-active" : ""}>{t.sail}</button>
      </div>

      <p className="kelvin-ui-caption">{t.toggles}</p>
      <div className="kelvin-ui-toggles">
        <button type="button" aria-pressed={awake} onClick={() => setAwake((value) => !value)} className={awake ? "is-on" : ""}>
          <span>◉</span>{t.awake}
        </button>
        <button type="button" aria-pressed={chargeLimit} onClick={() => setChargeMode((value) => value === "limit" ? "off" : "limit")} className={chargeLimit ? "is-on" : ""}>
          <span>▱</span>{t.limit80}
        </button>
      </div>

      {!compact && (
        <div className="kelvin-ui-sound">
          <p>{t.sound}</p>
          <div><span>▣</span><strong>{t.output}</strong><b>✓</b></div>
        </div>
      )}

      <div className="kelvin-ui-tabs" role="tablist" aria-label={language === "ru" ? "Разделы Kelvin" : "Seções do Kelvin"}>
        {modules.map((module) => (
          <button
            key={module.id}
            type="button"
            role="tab"
            aria-selected={currentModule === module.id}
            id={`${panelId}-${module.id}`}
            aria-controls={`${panelId}-module`}
            aria-label={module.label}
            onClick={() => selectModule(module.id)}
            className={currentModule === module.id ? "is-active" : ""}
          >
            <span aria-hidden>{module.glyph}</span>
          </button>
        ))}
      </div>

      <div id={`${panelId}-module`} className="kelvin-ui-module" role="tabpanel" aria-labelledby={`${panelId}-${currentModule}`}>
        {currentModule === "power" && <PowerModule t={t} chargeMode={chargeMode} locale={language} compact={compact} />}
        {currentModule === "hardware" && <HardwareModule t={t} locale={language} />}
        {currentModule === "privacy" && <PrivacyModule t={t} />}
        {currentModule === "health" && <HealthModule t={t} />}
      </div>
    </div>
  );
}

function Metric({ value, label, warn, accent }: { value: string; label: string; warn?: boolean; accent?: boolean }) {
  return <div><strong className={warn ? "is-warn" : accent ? "is-accent" : ""}>{value}</strong><span>{label}</span></div>;
}

function PowerModule({ t, chargeMode, locale, compact }: { t: PanelCopy; chargeMode: "off" | "limit" | "sail"; locale: "ru" | "pt"; compact: boolean }) {
  const status = chargeMode === "limit" ? t.stableLimit : chargeMode === "sail" ? t.stableSail : t.stable;
  const adapterValue = chargeMode === "off" ? "59 / 85 W" : "56 / 85 W";
  const batteryValue = chargeMode === "off" ? "+3 W" : "0 W";
  return (
    <div className="kelvin-ui-module-enter">
      <div className="kelvin-ui-module-head"><span>{t.powerSystem}</span><strong>56 <small>W</small></strong></div>
      <p className="kelvin-ui-status"><i />{status}</p>
      <div className="kelvin-ui-flow">
        <Node icon="⚡" label={t.adapter} value={adapterValue} orange />
        <span className="kelvin-ui-flowline is-orange" />
        <Node icon="▰" label={t.system} value="56 W" />
        <span className="kelvin-ui-flowline" />
        <Node icon="▱" label={t.battery} value={batteryValue} accent={chargeMode === "off"} />
      </div>
      <p className="kelvin-ui-section-label">{t.usage}</p>
      <Bar label="CPU" value="28 W" progress={50} />
      <Bar label="GPU" value="14 W" progress={25} />
      <Bar label={t.memory} value="6 W" progress={11} />
      <Bar label={t.other} value="8 W" progress={14} />
      {!compact && <AppEnergyPreview locale={locale} />}
    </div>
  );
}

function HardwareModule({ t, locale }: { t: PanelCopy; locale: "ru" | "pt" }) {
  const [gpuMode, setGpuMode] = useState(2);
  const gpuLabels = locale === "ru" ? ["Встроенная", "Дискретная", "Авто"] : ["Integrada", "Dedicada", "Auto"];
  return (
    <div className="kelvin-ui-module-enter">
      <div className="kelvin-ui-module-head"><span>{t.sensors}</span><strong className="is-warn">{t.high}</strong></div>
      <div className="kelvin-ui-sensor-grid"><Metric value="81°" label="CPU" warn /><Metric value="69°" label="GPU" /><Metric value="3.09" label="CPU GHz" /><Metric value="4903" label="RPM" /></div>
      <p className="kelvin-ui-section-label">{t.pinned}</p>
      <SensorRow icon="▱" label={t.battery} value="32°" />
      <SensorRow icon="♨" label="CPU" value="81°" warn />
      <SensorRow icon="♨" label="GPU" value="69°" />
      <SensorRow icon="ϟ" label="CPU · V" value="1.10 V" />
      <p className="kelvin-ui-section-label">GPU · INTEL DUAL-GPU</p>
      <div className="kelvin-ui-segment" aria-label={locale === "ru" ? "Режим GPU в демо" : "Modo de GPU na demonstração"}>
        {gpuLabels.map((label, index) => <button key={label} type="button" aria-pressed={gpuMode === index} className={gpuMode === index ? "is-active" : ""} onClick={() => setGpuMode(index)}>{label}</button>)}
      </div>
      <p className="kelvin-ui-copy" role="status">{gpuLabels[gpuMode]} · {locale === "ru" ? "пример режима на совместимом Intel Mac; не для Apple Silicon" : "exemplo em Mac Intel compatível; não se aplica ao Apple Silicon"}</p>
    </div>
  );
}

function PrivacyModule({ t }: { t: PanelCopy }) {
  const [view, setView] = useState(0);
  return (
    <div className="kelvin-ui-module-enter">
      <h4>{t.networkRadar}</h4><p className="kelvin-ui-copy">{t.networkLead}</p>
      <p className="kelvin-ui-privacy-state">▱ {t.cameraSafe}</p><p className="kelvin-ui-privacy-state is-warn">◇ {t.noVpn}</p>
      <div className="kelvin-ui-privacy-tabs">{[t.countries, t.apps, t.ports].map((label, index) => <button key={label} type="button" className={view === index ? "is-active" : ""} aria-pressed={view === index} onClick={() => setView(index)}>{label}</button>)}</div>
      {view === 0 ? <div className="kelvin-ui-radar"><span>🇧🇷</span><span>🇺🇸</span><span>🇨🇦</span><span>🇩🇪</span><i>▣</i></div> : <div className="kelvin-ui-network-list">{(view === 1 ? [["Safari", "26"], ["Xcode", "12"], ["Mail", "5"]] : [["HTTPS · 443", "35"], ["DNS · 53", "5"], ["IMAPS · 993", "3"]]).map(([label, value]) => <SensorRow key={label} icon="↗" label={label} value={value} />)}</div>}
      <div className="kelvin-ui-radar-stats"><strong>{t.connections}</strong><span>·</span><strong>{t.directions}</strong></div>
    </div>
  );
}

function HealthModule({ t }: { t: PanelCopy }) {
  return (
    <div className="kelvin-ui-module-enter">
      <div className="kelvin-ui-module-head"><span>{t.batteryHealth}</span><strong className="is-good">98%</strong></div>
      <div className="kelvin-ui-health-grid"><Metric value="98%" label={t.capacity} /><Metric value="214" label={t.cycles} /><Metric value={t.excellent} label={t.condition} /></div>
      <div className="kelvin-ui-chart"><span /><span /><span /><span /><span /><span /><span /></div>
      <p className="kelvin-ui-history-label">{t.localHistory}</p>
    </div>
  );
}

function AppEnergyPreview({ locale }: { locale: "ru" | "pt" }) {
  const [sort, setSort] = useState<"impact" | "cpu" | "net">("impact");
  const apps = [{ name: "Xcode", impact: 42, cpu: 76, net: 2 }, { name: "Safari", impact: 18, cpu: 24, net: 7 }, { name: "Mail", impact: 3, cpu: 1, net: 1 }];
  const labels = { impact: locale === "ru" ? "Влияние" : "Impacto", cpu: "CPU", net: locale === "ru" ? "Сеть" : "Rede" };
  return <div className="kelvin-ui-app-energy">
    <p className="kelvin-ui-section-label">{locale === "ru" ? "ЭНЕРГИЯ ПРИЛОЖЕНИЙ" : "ENERGIA DOS APPS"}</p>
    <div className="kelvin-ui-segment">{(["impact", "cpu", "net"] as const).map(metric => <button type="button" key={metric} aria-pressed={sort === metric} className={sort === metric ? "is-active" : ""} onClick={() => setSort(metric)}>{labels[metric]}</button>)}</div>
    {[...apps].sort((a, b) => b[sort] - a[sort]).map(app => <SensorRow key={app.name} icon="◫" label={app.name} value={`${app[sort]}${sort === "cpu" ? "%" : ""}`} />)}
    <p className="kelvin-ui-copy">{locale === "ru" ? "Влияние — относительный показатель, не ватты. Сеть — число направлений." : "Impacto é um índice relativo, não watts. Rede indica o número de destinos."}</p>
  </div>;
}

function Node({ icon, label, value, orange, accent }: { icon: string; label: string; value: string; orange?: boolean; accent?: boolean }) {
  return <div className={`kelvin-ui-node ${orange ? "is-orange" : ""} ${accent ? "is-accent" : ""}`}><span>{icon}</span><small>{label}</small><strong>{value}</strong></div>;
}

function Bar({ label, value, progress }: { label: string; value: string; progress: number }) {
  return <div className="kelvin-ui-bar"><span>{label}</span><i><b style={{ width: `${progress}%` }} /></i><strong>{value}</strong></div>;
}

function SensorRow({ icon, label, value, warn }: { icon: string; label: string; value: string; warn?: boolean }) {
  return <div className="kelvin-ui-sensor-row"><span>{icon}</span><strong>{label}</strong><b className={warn ? "is-warn" : ""}>{value}</b></div>;
}
