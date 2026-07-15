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

      {locale === "ru" ? <NotesRu /> : <NotesEn />}
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

function NotesEn() {
  const items = [
    "Power monitoring: charge ring, live drain graph, interactive SMC power-flow diagram.",
    "Hardware panel: temperatures, fans, load, per-component wattage.",
    "Fan control (Pro): profiles — fixed RPM, sensor curve, auto; thermal protection.",
    "Battery charge limit, firewall and domain blocking, RU↔EN layout switcher, snippets, custom command buttons (Pro).",
    "Quick toggles: Wi-Fi, Bluetooth, Night Shift, dark mode, Caffeine, screen resolution.",
    "Native Control Center-inspired design: light and dark themes, customizable panel.",
    "Accessibility: VoiceOver and keyboard navigation across main screens, Reduce Motion support.",
    "Fully local, no telemetry. Notarized by Apple.",
  ];

  return (
    <>
      <h2 className="legal-h2">1.0 — first release</h2>
      <ul className="legal-ul">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </>
  );
}
