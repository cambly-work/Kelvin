import { pageMetadata, requireLocale } from "@/lib/seo";
import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";
import { Entity } from "@/components/legal-bits";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  requireLocale(locale);
  const t = await getTranslations({ locale, namespace: "Legal.privacy" });
  return pageMetadata(requireLocale(locale), "/privacy", `${t("title")} — Kelvin`, t("description"));
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Legal.privacy");

  return (
    <LegalLayout>
      <h1 className="mb-1.5 text-[clamp(1.75rem,4vw,2.5rem)] tracking-[-0.02em]">
        {t("title")}
      </h1>
      <p className="mb-8 text-[14px] text-mut">{t("updated")}</p>

      <Entity />
      {locale === "ru" ? <PrivacyRu /> : <PrivacyPt />}
    </LegalLayout>
  );
}


const sections = {
  ru: [
    ["1. Локальный мониторинг", "В Kelvin нет аналитики, рекламных SDK и трекеров. Показатели питания, датчиков, сети и диска читаются на Mac. История, настройки, буфер обмена и обработка текста остаются локально. Приложению не нужен аккаунт или ключ активации."],
    ["2. Сетевые обращения", "Для проверки и получения обновлений Kelvin обращается к серверу обновлений, включая trykelvin.com/appcast.xml. Это отдельный процесс от локального мониторинга. Серверы технически получают сведения, необходимые для сетевого соединения, включая IP-адрес. Мы не используем эти обращения для аналитики использования."],
    ["3. Скачивание с Google Диска", "Установочный DMG размещён на Google Диске. При переходе по ссылке и скачивании действуют правила и политика конфиденциальности Google. Google Диск не используется для хранения ваших показателей Kelvin; аккаунт Google не нужен для работы приложения."],
    ["4. Отчёты о сбоях", "Отправка отчётов опциональна и по умолчанию выключена. Приложение предлагает просмотреть технический отчёт и дать согласие на отправку; автоматическую отправку можно включить в настройках. Отчёты очищаются от персональных данных и содержат техническую информацию для диагностики."],
    ["5. Системные разрешения", "Авто-раскладка и сниппеты требуют Универсального доступа. Часть переключателей использует Apple Events и другие разрешения macOS. Для управления вентиляторами, зарядом и GPU может потребоваться установка системного сервиса и разрешение администратора. Доступ используется для выбранной функции."],
    ["6. Бесплатное приложение", "Все функции Kelvin бесплатны. Нет покупок, подписки, платёжных данных или сетевой проверки ключа. Обращение в поддержку по email — отдельное добровольное действие: вы сами выбираете, какую информацию отправить автору."],
    ["7. Изменения и контакт", "При изменении политики мы обновляем эту страницу. Вопросы о конфиденциальности можно отправить на cambly.studio@gmail.com."]
  ],
  pt: [
    ["1. Monitoramento local", "O Kelvin não contém análise de uso, SDKs de anúncios ou rastreadores. Métricas de energia, sensores, rede e disco são lidas no Mac. Histórico, ajustes, área de transferência e processamento de texto permanecem locais. O aplicativo não exige conta nem chave de ativação."],
    ["2. Acesso à rede", "Para verificar e obter atualizações, o Kelvin acessa o servidor de atualizações, incluindo trykelvin.com/appcast.xml. Esse processo é separado do monitoramento local. Os servidores recebem informações técnicas necessárias à conexão, incluindo o endereço IP. Não usamos essas solicitações para análise de uso."],
    ["3. Download pelo Google Drive", "O instalador DMG fica no Google Drive. Ao abrir o link e baixar o arquivo, aplicam-se as regras e a política de privacidade do Google. O Drive não armazena suas métricas do Kelvin; não é necessária uma conta Google para usar o aplicativo."],
    ["4. Relatórios de falha", "O envio é opcional e vem desativado por padrão. O aplicativo permite revisar o relatório técnico e consentir com o envio; o envio automático pode ser ativado nos ajustes. Os relatórios passam por remoção de dados pessoais e contêm informações técnicas para diagnóstico."],
    ["5. Permissões do sistema", "A troca de layout e os snippets exigem Acessibilidade. Alguns controles usam Apple Events e outras permissões do macOS. Controlar ventoinhas, carga e GPU pode exigir um serviço do sistema e autorização de administrador. O acesso é usado para a função escolhida."],
    ["6. Aplicativo gratuito", "Todos os recursos do Kelvin são gratuitos. Sem compras, assinatura, dados de pagamento ou verificação de chave pela rede. Entrar em contato por email é uma ação voluntária separada: você escolhe quais informações enviar ao autor."],
    ["7. Alterações e contato", "Quando a política mudar, atualizaremos esta página. Envie dúvidas sobre privacidade para cambly.studio@gmail.com."]
  ]
};
function PrivacyRu() { return <PrivacySections locale="ru" />; }
function PrivacyPt() { return <PrivacySections locale="pt" />; }
function PrivacySections({ locale }: { locale: "ru" | "pt" }) {
  return <>{sections[locale].map(([title, body]) => <section key={title}><h2 className="legal-h2">{title}</h2><p className="legal-p">{body}</p></section>)}</>;
}
