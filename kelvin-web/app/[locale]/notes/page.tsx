import { pageMetadata, requireLocale } from "@/lib/seo";
import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { release } from "@/lib/release";
import LegalLayout from "@/components/LegalLayout";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  requireLocale(locale);
  const t = await getTranslations({ locale, namespace: "Legal.notes" });
  return pageMetadata(requireLocale(locale), "/notes", `${t("title")} — Kelvin`, t("description"));
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
    "Обновлённые настройки панели, значка в строке меню и запуска при входе.",
    "Переключение GPU через системный сервис с проверкой поддержки на Intel Mac с двумя внутренними GPU.",
    "Обновлённое отображение энергии приложений: сортировка по влиянию, CPU и сетевым направлениям.",
    "Мониторинг питания: кольцо заряда, живой график расхода, интерактивная схема энергопотоков из SMC.",
    "Панель «Железо»: температуры, вентиляторы, нагрузка, ватты по компонентам.",
    "Управление вентиляторами: профили — постоянные обороты, кривая по сенсору, авто; защита по перегреву.",
    "Лимит заряда батареи, фаервол и блокировка доменов, переключатель раскладки RU↔EN, сниппеты, свои кнопки-команды.",
    "Быстрые переключатели: Wi-Fi, Bluetooth, Night Shift, тёмная тема, Caffeine, разрешение экрана.",
    "Нативный дизайн в духе Control Center: светлая и тёмная темы, настраиваемая панель.",
    "Доступность: VoiceOver и навигация с клавиатуры по основным экранам, поддержка «Уменьшить движение».",
    "Все функции бесплатны навсегда: без подписки, ключа и пробного периода.",
  ];

  return (
    <>
      <h2 className="legal-h2">{release.version} — текущая версия</h2>
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
    "Ajustes atualizados do painel, ícone na barra de menus e início ao entrar na sessão.",
    "Troca de GPU por serviço do sistema com verificação de compatibilidade em Macs Intel com duas GPUs internas.",
    "Apresentação atualizada da energia dos apps: ordenação por impacto, CPU e destinos de rede.",
    "Monitorização de energia: anel de carga, gráfico de consumo em tempo real, diagrama interativo de fluxo de energia do SMC.",
    "Painel de hardware: temperaturas, ventoinhas, carga, potência por componente.",
    "Controlo de ventoinhas: perfis — RPM fixo, curva de sensor, auto; proteção térmica.",
    "Limite de carga da bateria, firewall e bloqueio de domínios, comutador de disposição RU↔EN, snippets, botões de comando personalizados.",
    "Alternadores rápidos: Wi-Fi, Bluetooth, Night Shift, modo escuro, Caffeine, resolução de ecrã.",
    "Design nativo inspirado no Control Center: temas claro e escuro, painel personalizável.",
    "Acessibilidade: VoiceOver e navegação por teclado nos ecrãs principais, suporte a Reduzir Movimento.",
    "Todos os recursos grátis para sempre: sem assinatura, chave ou período de teste.",
  ];

  return (
    <>
      <h2 className="legal-h2">{release.version} — versão atual</h2>
      <ul className="legal-ul">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </>
  );
}
