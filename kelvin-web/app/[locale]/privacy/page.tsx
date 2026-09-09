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
  const t = await getTranslations({ locale, namespace: "Legal.privacy" });
  return { title: `${t("title")} — Kelvin` };
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
    ["1. Локальный мониторинг в приложении", "В приложении Kelvin нет аналитики, рекламных SDK и трекеров. Показатели питания, датчиков, сети и диска читаются на Mac. История, настройки, буфер обмена и обработка текста остаются локально. Приложению не нужен аккаунт или ключ активации."],
    ["2. Посещение сайта", "Сайт без cookies отправляет владельцу два служебных уведомления через Cloudflare и Telegram: при открытии и при завершении посещения. В них могут быть время входа, общее и активное время, просмотренные страницы и разделы, глубина прокрутки, названия нажатых кнопок, переход к загрузке, тип устройства, размер окна, язык, домен-источник, метки utm_source, utm_medium, utm_campaign и utm_content, а также примерные город, регион и страна по данным Cloudflare. Мы не отправляем в Telegram IP-адрес, содержимое полей ввода, cookies, постоянный идентификатор или цифровой отпечаток устройства. Короткий номер посещения существует только в памяти открытой вкладки."],
    ["3. Сетевые обращения приложения", "Для проверки и получения обновлений приложение Kelvin обращается к настроенному серверу обновлений. Это отдельный процесс от локального мониторинга и статистики сайта. Серверы технически получают сведения, необходимые для сетевого соединения, включая IP-адрес. Мы не используем эти обращения для аналитики использования приложения."],
    ["4. Скачивание с Google Диска", "Установочный DMG размещён на Google Диске. При переходе по ссылке и скачивании действуют правила и политика конфиденциальности Google. Google Диск не используется для хранения ваших показателей Kelvin; аккаунт Google не нужен для работы приложения."],
    ["5. Отчёты о сбоях", "Отправка отчётов опциональна и по умолчанию выключена. Приложение предлагает просмотреть технический отчёт и дать согласие на отправку; автоматическую отправку можно включить в настройках. Отчёты очищаются от персональных данных и содержат техническую информацию для диагностики."],
    ["6. Системные разрешения", "Авто-раскладка и сниппеты требуют Универсального доступа. Часть переключателей использует Apple Events и другие разрешения macOS. Для управления вентиляторами, зарядом и GPU может потребоваться установка системного сервиса и разрешение администратора. Доступ используется для выбранной функции."],
    ["7. Бесплатное приложение", "Все функции Kelvin бесплатны. Нет покупок, подписки, платёжных данных или сетевой проверки ключа. Обращение в поддержку по email — отдельное добровольное действие: вы сами выбираете, какую информацию отправить автору."],
    ["8. Изменения и контакт", "При изменении политики мы обновляем эту страницу. Вопросы о конфиденциальности можно отправить на cambly.studio@gmail.com."]
  ],
  pt: [
    ["1. Monitoramento local no aplicativo", "O aplicativo Kelvin não contém análise de uso, SDKs de anúncios ou rastreadores. Métricas de energia, sensores, rede e disco são lidas no Mac. Histórico, ajustes, área de transferência e processamento de texto permanecem locais. O aplicativo não exige conta nem chave de ativação."],
    ["2. Visitas ao site", "Sem usar cookies, o site envia ao proprietário duas notificações operacionais pelo Cloudflare e Telegram: uma na abertura e outra ao fim da visita. Elas podem conter horário de entrada, tempo total e ativo, páginas e seções vistas, profundidade de rolagem, nomes dos botões acionados, acesso ao download, tipo de dispositivo, tamanho da janela, idioma, domínio de origem, parâmetros utm_source, utm_medium, utm_campaign e utm_content, além de cidade, região e país aproximados fornecidos pelo Cloudflare. Não enviamos ao Telegram endereço IP, conteúdo digitado, cookies, identificador persistente nem impressão digital do dispositivo. Um código curto da visita existe apenas na memória da aba aberta."],
    ["3. Acesso do aplicativo à rede", "Para verificar e obter atualizações, o aplicativo Kelvin acessa o servidor de atualizações configurado. Esse processo é separado do monitoramento local e das estatísticas do site. Os servidores recebem informações técnicas necessárias à conexão, incluindo o endereço IP. Não usamos essas solicitações para analisar o uso do aplicativo."],
    ["4. Download pelo Google Drive", "O instalador DMG fica no Google Drive. Ao abrir o link e baixar o arquivo, aplicam-se as regras e a política de privacidade do Google. O Drive não armazena suas métricas do Kelvin; não é necessária uma conta Google para usar o aplicativo."],
    ["5. Relatórios de falha", "O envio é opcional e vem desativado por padrão. O aplicativo permite revisar o relatório técnico e consentir com o envio; o envio automático pode ser ativado nos ajustes. Os relatórios passam por remoção de dados pessoais e contêm informações técnicas para diagnóstico."],
    ["6. Permissões do sistema", "A troca de layout e os snippets exigem Acessibilidade. Alguns controles usam Apple Events e outras permissões do macOS. Controlar ventoinhas, carga e GPU pode exigir um serviço do sistema e autorização de administrador. O acesso é usado para a função escolhida."],
    ["7. Aplicativo gratuito", "Todos os recursos do Kelvin são gratuitos. Sem compras, assinatura, dados de pagamento ou verificação de chave pela rede. Entrar em contato por email é uma ação voluntária separada: você escolhe quais informações enviar ao autor."],
    ["8. Alterações e contato", "Quando a política mudar, atualizaremos esta página. Envie dúvidas sobre privacidade para cambly.studio@gmail.com."]
  ]
};
function PrivacyRu() { return <PrivacySections locale="ru" />; }
function PrivacyPt() { return <PrivacySections locale="pt" />; }
function PrivacySections({ locale }: { locale: "ru" | "pt" }) {
  return <>{sections[locale].map(([title, body]) => <section key={title}><h2 className="legal-h2">{title}</h2><p className="legal-p">{body}</p></section>)}</>;
}
