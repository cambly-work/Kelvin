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
    capabilityLead: "Все модули доступны бесплатно — от показателей до системных действий.",
    systemMap: "КАРТА СИСТЕМЫ",
    free: "FREE",
    cards: [
      { glyph: "⌁", title: "Энергия и батарея", body: "Ватты, заряд, ёмкость, циклы, температура, напряжение, баланс ячеек и 90‑секундный график." },
      { glyph: "✣", title: "Охлаждение", body: "Ручные RPM, кривые по сенсору и автоматический режим на Mac с поддерживаемыми вентиляторами." },
      { glyph: "◫", title: "Быстрые действия", body: "Caffeine, звук, Night Shift, тема, Finder, экран и собственные кнопки-команды в настраиваемой панели." },
      { glyph: "⌨", title: "Ввод и исправления", body: "Локальная авто‑раскладка RU↔EN, ручное исправление, хоткеи и сниппеты — без отправки набранного текста." },
      { glyph: "◇", title: "Сеть и защита", body: "Радар соединений, офлайн GeoIP, камера, микрофон и VPN. Входящий фаервол и блокировка доменов." },
      { glyph: "▧", title: "Графика под контролем", body: "Авто, встроенная или дискретная GPU на совместимых Intel Mac. Системный сервис подтверждает применение режима; на Apple Silicon доступен мониторинг." },
      { glyph: "⚙", title: "Панель под вас", body: "Обновлённые настройки панели и значка в строке меню, запуск при входе и единый статус системного сервиса." },
      { glyph: "＋", title: "Здоровье системы", body: "Локальный Advisor, память, диск и диагностический PDF. Приложения можно сортировать по энергопотреблению, CPU и сетевым направлениям." },
    ],
  },
  pt: {
    eyebrow: "Engenharia do produto",
    title: "Um só circuito. Do sinal à ação.",
    lead: "O Kelvin não reúne utilitários aleatórios numa pasta. Ele conecta sensores, um modelo local do sistema e ações nativas em um único circuito.",
    stages: [
      { number: "01", label: "Sinal", title: "O Mac fala", body: "SMC, IORegistry, powermetrics, lsof e mecanismos abertos do macOS fornecem dados vivos do hardware e do sistema." },
      { number: "02", label: "Modelo", title: "O Kelvin entende", body: "Os dados são normalizados por modelo de Mac, entram no histórico e viram um estado claro — sem nuvem." },
      { number: "03", label: "Ação", title: "Você controla", body: "Perfil de ventoinhas, limite de carga, alternador ou proteção são aplicados na mesma interface." },
    ],
    capabilityTitle: "O que já está dentro",
    capabilityLead: "Todos os módulos são gratuitos — das métricas às ações do sistema.",
    systemMap: "MAPA DO SISTEMA",
    free: "GRÁTIS",
    cards: [
      { glyph: "⌁", title: "Energia e bateria", body: "Potência, carga, capacidade, ciclos, temperatura, tensão, equilíbrio das células e gráfico de 90 segundos." },
      { glyph: "✣", title: "Resfriamento", body: "RPM manual, curvas por sensor e modo automático em Macs com ventoinhas compatíveis." },
      { glyph: "◫", title: "Ações rápidas", body: "Caffeine, áudio, Night Shift, tema, Finder, tela e botões de comando em um painel configurável." },
      { glyph: "⌨", title: "Entrada e correções", body: "Troca automática RU↔EN, correção manual, atalhos e snippets — sem enviar o texto digitado." },
      { glyph: "◇", title: "Rede e proteção", body: "Radar de conexões, GeoIP offline, câmara, microfone e VPN. Firewall de entrada e bloqueio de domínios." },
      { glyph: "▧", title: "Controle da GPU", body: "Modo automático, integrado ou dedicado em Macs Intel compatíveis. O serviço confirma a aplicação do modo; no Apple Silicon, há monitoramento." },
      { glyph: "⚙", title: "Um painel seu", body: "Ajustes atualizados do painel e do ícone na barra de menus, início ao entrar na sessão e status do serviço do sistema." },
      { glyph: "＋", title: "Saúde do sistema", body: "Advisor local, memória, disco e PDF de diagnóstico. Ordene apps por impacto energético, CPU e destinos de rede." },
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
            <p className="section-eyebrow !text-left">{t.systemMap}</p>
            <h3 className="text-[clamp(2.2rem,5vw,4rem)] font-bold tracking-[-0.05em] text-tx">{t.capabilityTitle}</h3>
            <p className="mt-4 max-w-[620px] text-[17px] leading-relaxed text-mut">{t.capabilityLead}</p>
          </Reveal>
          <div className="flex gap-2 text-[10px] font-semibold tracking-[0.12em]">
            <span className="kelvin-plan-tag kelvin-plan-tag--free">{t.free}</span>
          </div>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {t.cards.map((card, index) => (
            <Reveal key={card.title} index={index % 3} className="kelvin-capability-card group">
              <div className="flex items-start justify-between gap-4">
                <span className="kelvin-capability-glyph" aria-hidden>{card.glyph}</span>
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
