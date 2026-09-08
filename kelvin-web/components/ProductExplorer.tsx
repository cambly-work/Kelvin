"use client";

import { useId, useState, type KeyboardEvent } from "react";
import Reveal from "./Reveal";
import KelvinPanel, { type KelvinModule } from "./KelvinPanel";

type Locale = "ru" | "pt";
type ProductScene = {
  id: KelvinModule;
  index: string;
  tab: string;
  title: string;
  description: string;
  facts: string[];
};

const scenes: Record<Locale, ProductScene[]> = {
  ru: [
    {
      id: "power",
      index: "01",
      tab: "Питание",
      title: "Куда уходят ватты — видно сразу",
      description:
        "Kelvin читает SMC напрямую и собирает адаптер, батарею, систему и потребителей в одну живую схему. Не просто цифры — понятное направление потока энергии.",
      facts: [
        "Ватты и ток по шинам",
        "Живой график расхода",
        "Заряд, температура и ресурс АКБ",
      ],
    },
    {
      id: "hardware",
      index: "02",
      tab: "Железо",
      title: "Датчики без догадок",
      description:
        "Температуры, частоты, мощность и вентиляторы разрешаются по модели Mac. На неизвестном железе Kelvin показывает сырые данные, а не придумывает роли сенсоров.",
      facts: [
        "Apple Silicon и Intel",
        "Поиск и закрепление сенсоров",
        "Профили и кривые вентиляторов",
      ],
    },
    {
      id: "privacy",
      index: "03",
      tab: "Приватность",
      title: "Сеть становится видимой",
      description:
        "Локальный радар показывает приложения, страны и порты через системный снимок соединений. Геолокация IP работает по офлайн-базе — без отправки адресов наружу.",
      facts: [
        "Приложения, страны и порты",
        "Офлайн GeoIP",
        "Камера, микрофон, VPN и входящая защита",
      ],
    },
    {
      id: "health",
      index: "04",
      tab: "Здоровье",
      title: "Не графики ради графиков",
      description:
        "Kelvin связывает батарею, термику, память и состояние системы в локальную историю и подсказывает, на что действительно стоит обратить внимание.",
      facts: [
        "История батареи и температуры",
        "Локальный Advisor",
        "Экспорт отчёта для диагностики",
      ],
    },
  ],
  pt: [
    {
      id: "power",
      index: "01",
      tab: "Energia",
      title: "Veja para onde cada watt vai",
      description:
        "O Kelvin lê o SMC diretamente e reúne adaptador, bateria, sistema e consumidores em um fluxo de energia vivo e compreensível.",
      facts: [
        "Potência e corrente por barramento",
        "Gráfico de consumo em tempo real",
        "Carga, temperatura e saúde da bateria",
      ],
    },
    {
      id: "hardware",
      index: "02",
      tab: "Hardware",
      title: "Sensores, sem adivinhações",
      description:
        "Temperaturas, frequências, potência e ventoinhas são resolvidas por modelo. Em hardware desconhecido, o Kelvin mostra dados brutos em vez de inventar sensores.",
      facts: [
        "Apple Silicon e Intel",
        "Pesquisa e sensores fixados",
        "Perfis e curvas de ventoinhas",
      ],
    },
    {
      id: "privacy",
      index: "03",
      tab: "Privacidade",
      title: "A rede fica visível",
      description:
        "O radar local mostra apps, países e portas a partir de um instantâneo do sistema. A geolocalização de IP usa uma base offline.",
      facts: [
        "Apps, países e portas",
        "GeoIP offline",
        "Câmara, microfone, VPN e proteção de entrada",
      ],
    },
    {
      id: "health",
      index: "04",
      tab: "Saúde",
      title: "Mais do que gráficos",
      description:
        "O Kelvin liga bateria, temperatura, memória e estado do sistema a um histórico local e destaca o que realmente merece atenção.",
      facts: [
        "Histórico da bateria e temperatura",
        "Advisor local",
        "Exportação de relatório",
      ],
    },
  ],
};

export default function ProductExplorer({ locale }: { locale: string }) {
  const language: Locale = locale === "pt" ? "pt" : "ru";
  const items = scenes[language];
  const [activeId, setActiveId] = useState<ProductScene["id"]>("power");
  const id = useId();
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
    setActiveId(items[next].id);
    document.getElementById(id + items[next].id)?.focus();
  };
  const active = items.find((item) => item.id === activeId) ?? items[0];

  return (
    <section
      id="showcase"
      className="relative border-t border-line px-5 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-[1240px]">
        <Reveal className="max-w-[800px]">
          <p className="section-eyebrow !text-left">
            {language === "ru" ? "Kelvin в разрезе" : "Kelvin por dentro"}
          </p>
          <h2 className="text-balance text-[clamp(2.5rem,5vw,4rem)] font-semibold leading-[1.06] tracking-[-0.055em] text-tx">
            {language === "ru"
              ? "Интерфейс, который можно потрогать."
              : "Uma interface para explorar."}
          </h2>
          <p className="mt-6 max-w-[690px] text-[18px] leading-relaxed text-mut">
            {language === "ru"
              ? "Исследуйте питание, датчики, сеть и здоровье Mac. Это интерактивное превью с демонстрационными данными: переключатели меняют модель, а не настройки вашего компьютера."
              : "Explore energia, sensores, rede e saúde do Mac. Esta prévia usa dados de demonstração: os controles alteram o modelo, não os ajustes do seu computador."}
          </p>
        </Reveal>

        <div
          className="mt-12 flex gap-2 overflow-x-auto pb-2"
          role="tablist"
          aria-label={language === "ru" ? "Модули Kelvin" : "Módulos Kelvin"}
        >
          {items.map((item, index) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              id={id + item.id}
              tabIndex={item.id === active.id ? 0 : -1}
              onKeyDown={(event) => tabKeys(event, index)}
              aria-selected={item.id === active.id}
              aria-controls="kelvin-product-panel"
              onClick={() => setActiveId(item.id)}
              className={`kelvin-product-tab ${item.id === active.id ? "kelvin-product-tab--active" : ""}`}
            >
              <span>{item.index}</span>
              {item.tab}
            </button>
          ))}
        </div>

        <div
          id="kelvin-product-panel"
          role="tabpanel"
          aria-labelledby={id + active.id}
          className="mt-6 grid rounded-[24px] border border-line bg-surface lg:grid-cols-2"
        >
          <div className="flex flex-col justify-between p-7 sm:p-10 lg:p-12">
            <div key={active.id} className="kelvin-copy-enter">
              <span className="text-[12px] tracking-[0.06em] text-accent">
                {active.tab} / {active.index}
              </span>
              <h3 className="mt-5 max-w-[500px] text-balance text-[clamp(1.8rem,3vw,2.5rem)] font-semibold leading-tight tracking-[-0.04em] text-tx">
                {active.title}
              </h3>
              <p className="mt-5 max-w-[520px] text-[17px] leading-[1.75] text-mut">
                {active.description}
              </p>
              <ul className="mt-8 space-y-3">
                {active.facts.map((fact) => (
                  <li
                    key={fact}
                    className="flex items-center gap-3 text-[14px] text-tx"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_12px_var(--color-accent)]" />
                    {fact}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-12 border-t border-line pt-6 text-[12px] leading-relaxed text-faint">
              {language === "ru"
                ? "Данные обрабатываются локально. Kelvin не отправляет телеметрию и не требует аккаунта."
                : "Os dados são processados localmente. O Kelvin não envia telemetria nem exige conta."}
            </div>
          </div>

          <div className="kp-explorer-stage">
            <KelvinPanel
              locale={language}
              activeModule={active.id}
              onModuleChange={setActiveId}
            />
            <p className="kp-stage-caption">
              {language === "ru"
                ? "Исследуйте вкладки и настройки в своём темпе"
                : "Explore as abas e os ajustes no seu ritmo"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
