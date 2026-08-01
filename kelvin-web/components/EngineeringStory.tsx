import Reveal from "./Reveal";

type Locale = "ru" | "pt";

const copy = {
  ru: {
    eyebrow: "Инженерия продукта",
    title: "Один контур. От сигнала до действия.",
    lead: "Kelvin не складывает случайные утилиты в папку. Он связывает датчики, локальную модель состояния и системные действия в один нативный контур.",
    stages: [
      { number: "01", label: "Сигнал", title: "Mac говорит", body: "SMC, IORegistry, powermetrics, lsof и открытые механизмы macOS дают живые показатели железа и системы." },
      { number: "02", label: "Модель", title: "Kelvin понимает", body: "Данные нормализуются по модели Mac, попадают в историю и превращаются в понятный статус без облака." },
      { number: "03", label: "Действие", title: "Вы управляете", body: "Профиль вентиляторов, лимит заряда, переключатель или защита применяются из того же интерфейса." },
    ],
    capabilityTitle: "Что уже внутри",
    capabilityLead: "Мониторинг остаётся бесплатным. Pro открывает управление и автоматизацию.",
    free: "FREE",
    pro: "PRO",
    cards: [
      { glyph: "⌁", title: "Энергия и батарея", body: "Ватты, заряд, ёмкость, циклы, температура, напряжение, баланс ячеек и 90‑секундный график.", tags: ["FREE"] },
      { glyph: "✣", title: "Охлаждение", body: "Температуры и обороты — бесплатно. Ручные RPM, кривые по сенсору и защита от перегрева — в Pro.", tags: ["FREE", "PRO"] },
      { glyph: "◫", title: "Быстрые действия", body: "Caffeine, звук, Night Shift, тема, Finder, экран и собственные кнопки-команды в настраиваемой панели.", tags: ["FREE", "PRO"] },
      { glyph: "⌨", title: "Ввод и исправления", body: "Локальная авто‑раскладка RU↔EN, ручное исправление, хоткеи и сниппеты — без отправки набранного текста.", tags: ["PRO"] },
      { glyph: "◇", title: "Сеть и защита", body: "Радар соединений, офлайн GeoIP, камера, микрофон и VPN. Входящий фаервол и блок доменов — в Pro.", tags: ["FREE", "PRO"] },
      { glyph: "＋", title: "Здоровье системы", body: "История, память, диск, uptime, приложения по энергии, локальные рекомендации и диагностический PDF.", tags: ["FREE"] },
    ],
  },
  pt: {
    eyebrow: "Engenharia do produto",
    title: "Um só circuito. Do sinal à ação.",
    lead: "O Kelvin não coloca utilitários aleatórios numa pasta. Ele liga sensores, um modelo local do sistema e ações nativas num único circuito.",
    stages: [
      { number: "01", label: "Sinal", title: "O Mac fala", body: "SMC, IORegistry, powermetrics, lsof e mecanismos abertos do macOS fornecem dados vivos do hardware e do sistema." },
      { number: "02", label: "Modelo", title: "O Kelvin entende", body: "Os dados são normalizados por modelo de Mac, entram no histórico e viram um estado claro — sem nuvem." },
      { number: "03", label: "Ação", title: "Você controla", body: "Perfil de ventoinhas, limite de carga, alternador ou proteção são aplicados a partir da mesma interface." },
    ],
    capabilityTitle: "O que já está dentro",
    capabilityLead: "O monitoramento é grátis para sempre. O Pro desbloqueia controlo e automação.",
    free: "GRÁTIS",
    pro: "PRO",
    cards: [
      { glyph: "⌁", title: "Energia e bateria", body: "Watts, carga, capacidade, ciclos, temperatura, tensão, equilíbrio das células e gráfico de 90 segundos.", tags: ["FREE"] },
      { glyph: "✣", title: "Resfriamento", body: "Temperaturas e RPM são grátis. RPM manual, curvas por sensor e proteção térmica estão no Pro.", tags: ["FREE", "PRO"] },
      { glyph: "◫", title: "Ações rápidas", body: "Caffeine, áudio, Night Shift, tema, Finder, ecrã e botões de comando num painel configurável.", tags: ["FREE", "PRO"] },
      { glyph: "⌨", title: "Entrada e correções", body: "Troca automática RU↔EN, correção manual, atalhos e snippets — sem enviar o texto digitado.", tags: ["PRO"] },
      { glyph: "◇", title: "Rede e proteção", body: "Radar de conexões, GeoIP offline, câmara, microfone e VPN. Firewall de entrada e domínios no Pro.", tags: ["FREE", "PRO"] },
      { glyph: "＋", title: "Saúde do sistema", body: "Histórico, memória, disco, uptime, apps por energia, recomendações locais e PDF de diagnóstico.", tags: ["FREE"] },
    ],
  },
} as const;

export default function EngineeringStory({ locale }: { locale: string }) {
  const language: Locale = locale === "pt" ? "pt" : "ru";
  const t = copy[language];

  return (
    <section id="features" className="relative overflow-hidden border-t border-line px-5 py-24 sm:py-32">
      <div className="engineering-glow pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-[1240px]">
        <Reveal className="max-w-[820px]">
          <p className="section-eyebrow !text-left">{t.eyebrow}</p>
          <h2 className="text-balance text-[clamp(2.8rem,6vw,5.5rem)] font-bold leading-[0.94] tracking-[-0.06em] text-tx">{t.title}</h2>
          <p className="mt-6 max-w-[720px] text-[18px] leading-relaxed text-mut">{t.lead}</p>
        </Reveal>

        <div className="kelvin-signal-line mt-14 grid gap-px overflow-hidden rounded-[26px] border border-line bg-line lg:grid-cols-3">
          {t.stages.map((stage, index) => (
            <Reveal key={stage.number} index={index} className="relative bg-bg p-7 sm:p-9">
              <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.13em] text-faint">
                <span>{stage.number} / {stage.label}</span>
                <span className="kelvin-stage-pulse" />
              </div>
              <h3 className="mt-10 text-[28px] font-semibold tracking-[-0.04em] text-tx">{stage.title}</h3>
              <p className="mt-4 text-[15px] leading-[1.75] text-mut">{stage.body}</p>
              {index < t.stages.length - 1 && <span className="kelvin-stage-arrow" aria-hidden>→</span>}
            </Reveal>
          ))}
        </div>

        <div className="mt-24 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <Reveal>
            <p className="section-eyebrow !text-left">SYSTEM MAP</p>
            <h3 className="text-[clamp(2.2rem,5vw,4rem)] font-bold tracking-[-0.05em] text-tx">{t.capabilityTitle}</h3>
            <p className="mt-4 max-w-[620px] text-[17px] leading-relaxed text-mut">{t.capabilityLead}</p>
          </Reveal>
          <div className="flex gap-2 text-[10px] font-semibold tracking-[0.12em]">
            <span className="kelvin-plan-tag kelvin-plan-tag--free">{t.free}</span>
            <span className="kelvin-plan-tag kelvin-plan-tag--pro">{t.pro}</span>
          </div>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {t.cards.map((card, index) => (
            <Reveal key={card.title} index={index % 3} className="kelvin-capability-card group">
              <div className="flex items-start justify-between gap-4">
                <span className="kelvin-capability-glyph" aria-hidden>{card.glyph}</span>
                <div className="flex gap-1.5">
                  {card.tags.map((tag) => (
                    <span key={tag} className={`kelvin-plan-tag ${tag === "PRO" ? "kelvin-plan-tag--pro" : "kelvin-plan-tag--free"}`}>
                      {tag === "FREE" ? t.free : t.pro}
                    </span>
                  ))}
                </div>
              </div>
              <h4 className="mt-10 text-[24px] font-semibold tracking-[-0.035em] text-tx">{card.title}</h4>
              <p className="mt-4 text-[15px] leading-[1.75] text-mut">{card.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
