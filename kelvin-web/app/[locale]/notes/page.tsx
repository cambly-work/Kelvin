import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Legal.notes" });
  return { title: `${t("title")} — Kelvin` };
}

export default async function NotesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Legal.notes");

  return (
    <LegalLayout>
      <h1 className="mb-1.5 text-[clamp(1.75rem,4vw,2.5rem)] tracking-[-0.02em]">
        {t("title")}
      </h1>
      <p className="mb-8 text-[14px] text-mut">{t("updated")}</p>

      {locale === "ru" ? <NotesRu /> : <NotesPt />}
    </LegalLayout>
  );
}

function NotesRu() {
  const items = [
    "Мониторинг питания: кольцо заряда, живой график расхода, интерактивная схема энергопотоков из SMC.",
    "Панель «Железо»: температуры, вентиляторы, нагрузка, ватты по компонентам.",
    "Управление вентиляторами (Pro): профили — постоянные обороты, кривая по сенсору, авто; защита по перегреву.",
    "Лимит заряда батареи, фаервол и блокировка доменов, переключатель раскладки RU↔EN, сниппеты, свои кнопки-команды (Pro).",
    "Быстрые переключатели: Wi-Fi, Bluetooth, Night Shift, тёмная тема, Caffeine, разрешение экрана.",
    "Нативный дизайн в духе Control Center: светлая и тёмная темы, настраиваемая панель.",
    "Доступность: VoiceOver и навигация с клавиатуры по основным экранам, поддержка «Уменьшить движение».",
    "Полностью локально, без телеметрии. Нотаризовано Apple.",
  ];

  return (
    <>
      <h2 className="legal-h2">1.0 — первый релиз</h2>
      <ul className="legal-ul">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </>
  );
}

function NotesPt() {
  const items = [
    "Monitorização de energia: anel de carga, gráfico de consumo em tempo real, diagrama interativo de fluxo de energia do SMC.",
    "Painel de hardware: temperaturas, ventoinhas, carga, potência por componente.",
    "Controlo de ventoinhas (Pro): perfis — RPM fixo, curva de sensor, auto; proteção térmica.",
    "Limite de carga da bateria, firewall e bloqueio de domínios, comutador de disposição RU↔EN, snippets, botões de comando personalizados (Pro).",
    "Alternadores rápidos: Wi-Fi, Bluetooth, Night Shift, modo escuro, Caffeine, resolução de ecrã.",
    "Design nativo inspirado no Control Center: temas claro e escuro, painel personalizável.",
    "Acessibilidade: VoiceOver e navegação por teclado nos ecrãs principais, suporte a Reduzir Movimento.",
    "Totalmente local, sem telemetria. Notarizado pela Apple.",
  ];

  return (
    <>
      <h2 className="legal-h2">1.0 — primeiro lançamento</h2>
      <ul className="legal-ul">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </>
  );
}
