"use client";

import { useState } from "react";
import Image from "next/image";
import Reveal from "./Reveal";

type Locale = "ru" | "pt";
type ProductScene = {
  id: "flow" | "hardware" | "privacy" | "maintenance" | "health";
  index: string;
  tab: string;
  title: string;
  description: string;
  facts: string[];
  height: number;
};

const scenes: Record<Locale, ProductScene[]> = {
  ru: [
    {
      id: "flow",
      index: "01",
      tab: "Питание",
      title: "Куда уходят ватты — видно сразу",
      description: "Kelvin читает SMC напрямую и собирает адаптер, батарею, систему и потребителей в одну живую схему. Не просто цифры — понятное направление потока энергии.",
      facts: ["Ватты и ток по шинам", "Живой график расхода", "Заряд, температура и ресурс АКБ"],
      height: 2044,
    },
    {
      id: "hardware",
      index: "02",
      tab: "Железо",
      title: "Датчики без догадок",
      description: "Температуры, частоты, мощность и вентиляторы разрешаются по модели Mac. На неизвестном железе Kelvin показывает сырые данные, а не придумывает роли сенсоров.",
      facts: ["Apple Silicon и Intel", "Поиск и закрепление сенсоров", "Профили и кривые вентиляторов"],
      height: 2058,
    },
    {
      id: "privacy",
      index: "03",
      tab: "Приватность",
      title: "Сеть становится видимой",
      description: "Локальный радар показывает приложения, страны и порты через системный снимок соединений. Геолокация IP работает по офлайн-базе — без отправки адресов наружу.",
      facts: ["Приложения, страны и порты", "Офлайн GeoIP", "Камера, микрофон, VPN и входящая защита"],
      height: 2206,
    },
    {
      id: "maintenance",
      index: "04",
      tab: "Система",
      title: "Обслуживание без Терминала",
      description: "Uptime, память, диск, процессы, Finder и безопасные системные действия собраны в одном месте. Каждая операция объясняет, что именно изменится.",
      facts: ["Память и диск", "Системные службы и Finder", "Диагностический отчёт"],
      height: 1934,
    },
    {
      id: "health",
      index: "05",
      tab: "Здоровье",
      title: "Не графики ради графиков",
      description: "Kelvin связывает батарею, термику, память и состояние системы в локальную историю и подсказывает, на что действительно стоит обратить внимание.",
      facts: ["История батареи и температуры", "Локальный Advisor", "Экспорт отчёта для диагностики"],
      height: 1492,
    },
  ],
  pt: [
    {
      id: "flow", index: "01", tab: "Energia", title: "Veja para onde cada watt vai",
      description: "O Kelvin lê o SMC diretamente e reúne adaptador, bateria, sistema e consumidores num fluxo de energia vivo e compreensível.",
      facts: ["Watts e corrente por barramento", "Gráfico de consumo em tempo real", "Carga, temperatura e saúde da bateria"], height: 2044,
    },
    {
      id: "hardware", index: "02", tab: "Hardware", title: "Sensores, sem adivinhações",
      description: "Temperaturas, frequências, potência e ventoinhas são resolvidas por modelo. Em hardware desconhecido, o Kelvin mostra dados brutos em vez de inventar sensores.",
      facts: ["Apple Silicon e Intel", "Pesquisa e sensores fixados", "Perfis e curvas de ventoinhas"], height: 2058,
    },
    {
      id: "privacy", index: "03", tab: "Privacidade", title: "A rede fica visível",
      description: "O radar local mostra apps, países e portas a partir de um instantâneo do sistema. A geolocalização de IP usa uma base offline.",
      facts: ["Apps, países e portas", "GeoIP offline", "Câmara, microfone, VPN e proteção de entrada"], height: 2206,
    },
    {
      id: "maintenance", index: "04", tab: "Sistema", title: "Manutenção sem Terminal",
      description: "Uptime, memória, disco, processos, Finder e ações seguras do sistema vivem num só lugar, com explicações claras antes de cada mudança.",
      facts: ["Memória e disco", "Serviços do sistema e Finder", "Relatório de diagnóstico"], height: 1934,
    },
    {
      id: "health", index: "05", tab: "Saúde", title: "Mais do que gráficos",
      description: "O Kelvin liga bateria, temperatura, memória e estado do sistema a um histórico local e destaca o que realmente merece atenção.",
      facts: ["Histórico da bateria e temperatura", "Advisor local", "Exportação de relatório"], height: 1492,
    },
  ],
};

export default function ProductExplorer({ locale }: { locale: string }) {
  const language: Locale = locale === "pt" ? "pt" : "ru";
  const items = scenes[language];
  const [activeId, setActiveId] = useState<ProductScene["id"]>("flow");
  const active = items.find((item) => item.id === activeId) ?? items[0];

  return (
    <section id="demo" className="relative border-t border-line px-5 py-24 sm:py-32">
      <div className="mx-auto max-w-[1240px]">
        <Reveal className="max-w-[800px]">
          <p className="section-eyebrow !text-left">
            {language === "ru" ? "Kelvin в разрезе" : "Kelvin por dentro"}
          </p>
          <h2 className="text-balance text-[clamp(2.8rem,6vw,5.6rem)] font-bold leading-[0.93] tracking-[-0.06em] text-tx">
            {language === "ru" ? "Это не мокап. Это работает." : "Não é um mockup. Funciona de verdade."}
          </h2>
          <p className="mt-6 max-w-[690px] text-[18px] leading-relaxed text-mut">
            {language === "ru"
              ? "Все кадры ниже сняты напрямую из актуальной сборки Kelvin на реальном Mac. Выберите модуль и исследуйте интерфейс."
              : "Todos os quadros abaixo foram capturados diretamente da versão atual do Kelvin num Mac real. Escolha um módulo e explore."}
          </p>
        </Reveal>

        <div className="mt-12 flex gap-2 overflow-x-auto pb-2" role="tablist" aria-label={language === "ru" ? "Модули Kelvin" : "Módulos Kelvin"}>
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={item.id === active.id}
              aria-controls="kelvin-product-panel"
              onClick={() => setActiveId(item.id)}
              className={`kelvin-product-tab ${item.id === active.id ? "kelvin-product-tab--active" : ""}`}
            >
              <span>{item.index}</span>{item.tab}
            </button>
          ))}
        </div>

        <div id="kelvin-product-panel" role="tabpanel" className="mt-6 grid overflow-hidden rounded-[30px] border border-line bg-surface lg:grid-cols-[0.78fr_1.22fr]">
          <div className="flex flex-col justify-between p-7 sm:p-10 lg:min-h-[720px] lg:p-12">
            <div key={active.id} className="kelvin-copy-enter">
              <span className="font-mono text-[12px] tracking-[0.16em] text-accent">MODULE / {active.index}</span>
              <h3 className="mt-6 max-w-[500px] text-balance text-[clamp(2rem,4vw,3.6rem)] font-bold tracking-[-0.05em] text-tx">
                {active.title}
              </h3>
              <p className="mt-5 max-w-[520px] text-[17px] leading-[1.75] text-mut">{active.description}</p>
              <ul className="mt-8 space-y-3">
                {active.facts.map((fact) => (
                  <li key={fact} className="flex items-center gap-3 text-[14px] text-tx">
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

          <div className="kelvin-product-canvas relative min-h-[720px] overflow-hidden border-t border-line lg:border-l lg:border-t-0">
            <div className="kelvin-product-canvas-grid absolute inset-0" />
            <div
              key={`${language}-${active.id}`}
              className="kelvin-panel-enter absolute left-1/2 top-10 w-[min(82%,390px)] -translate-x-1/2 overflow-hidden rounded-[23px] border border-white/10 bg-[#3f4042] shadow-[0_45px_120px_rgba(0,0,0,.58)]"
              style={{ top: -420 }}
            >
              <Image
                src={`/assets/product-real/${language}-${active.id}.png`}
                alt={active.title}
                width={664}
                height={active.height}
                quality={80}
                sizes="(max-width: 1024px) 76vw, 390px"
                className="h-auto w-full"
              />
            </div>
            <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-surface via-surface/95 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between rounded-full border border-white/10 bg-black/35 px-4 py-2 font-mono text-[10px] tracking-[0.1em] text-white/55 backdrop-blur-xl">
              <span>LIVE CAPTURE</span><span>KELVIN 0.9.0</span><span>LOCAL / SMC</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
