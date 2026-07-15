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

function PrivacyRu() {
  return (
    <>
      <p className="legal-p">
        Kelvin создан как локальный инструмент. Мониторинг и системные
        показатели обрабатываются прямо на вашем Mac. Этот документ честно
        объясняет, что приложение делает с информацией и какие — ровно два —
        сетевых запроса оно совершает.
      </p>

      <h2 className="legal-h2">1. Аналитика и трекинг</h2>
      <p className="legal-p">
        <strong>Их нет.</strong> В Kelvin нет аналитики, рекламных SDK,
        трекеров и счётчиков. Мы не собираем статистику использования, не
        создаём профиль и ничего не отправляем на наши серверы для анализа.{" "}
        <strong>
          Бесплатные функции мониторинга не делают ни одного сетевого запроса
        </strong>{" "}
        — заряд, температуры, вентиляторы, сеть и диск читаются локально
        (IOKit / SMC / системные счётчики), публичный IP мы намеренно не
        запрашиваем.
      </p>

      <h2 className="legal-h2">2. Что покидает ваш Mac</h2>
      <p className="legal-p">
        Ровно два запроса, оба минимальные и необходимые:
      </p>
      <ul className="legal-ul">
        <li>
          <strong>Проверка обновлений.</strong> Не чаще раза в сутки
          приложение запрашивает <code>trykelvin.com/appcast.json</code>,
          чтобы узнать, вышла ли новая версия. Это обычный анонимный
          GET-запрос: без аккаунта, без идентификаторов, без персональных
          данных.
        </li>
        <li>
          <strong>Проверка лицензии (только Kelvin Pro).</strong> Когда вы
          активируете ключ лицензии и затем периодически для подтверждения,
          ключ и идентификатор устройства отправляются нашему платёжному
          провайдеру <strong>Lemon Squeezy</strong> для проверки. Это
          происходит только при использовании Pro; в бесплатном режиме
          лицензия не проверяется. Проверка работает офлайн в течение
          grace-периода.
        </li>
      </ul>

      <h2 className="legal-h2">
        3. Что обрабатывается локально и никуда не уходит
      </h2>
      <ul className="legal-ul">
        <li>состояние питания, батареи, мощность и токи (IOKit / SMC);</li>
        <li>
          загрузка CPU/GPU/памяти, температуры, обороты вентиляторов,
          скорость сети и диска;
        </li>
        <li>
          заряд Bluetooth-устройств (через системный отчёт macOS) — только
          отображается;
        </li>
        <li>
          история буфера обмена (если включена) — хранится только локально на
          вашем Mac и никогда не передаётся;
        </li>
        <li>
          настройки приложения и якорь пробного периода — в локальных user
          defaults и связке ключей (Keychain) вашего Mac.
        </li>
      </ul>

      <h2 className="legal-h2">4. Системные разрешения</h2>
      <p className="legal-p">
        Некоторые функции требуют разрешений macOS — они используются только
        для заявленного действия и ничего не передают:
      </p>
      <ul className="legal-ul">
        <li>
          <strong>Bluetooth</strong> — показать статус и включать/выключать
          из строки меню;
        </li>
        <li>
          <strong>Универсальный доступ</strong> — авто-переключение раскладки
          и сниппеты (обрабатываются локально);
        </li>
        <li>
          <strong>Системные события (Apple Events)</strong> — переключатели
          вроде тёмной темы и Night Shift;
        </li>
        <li>
          <strong>Пароль администратора</strong> — разовая установка
          системных демонов (вентиляторы, лимит заряда) через стандартный
          диалог macOS.
        </li>
      </ul>

      <h2 className="legal-h2">5. Оплата</h2>
      <p className="legal-p">
        Покупка лицензии обрабатывается сторонним платёжным сервисом Lemon
        Squeezy (merchant of record). Платёжные данные обрабатываются им
        согласно его политике; мы получаем только сведения, необходимые для
        выдачи и проверки лицензии (например, email заказа).
      </p>

      <h2 className="legal-h2">6. Хранение и передача данных</h2>
      <p className="legal-p">
        Системные показатели и настройки остаются на вашем устройстве. Мы не
        храним их у себя и не передаём третьим лицам. За пределы Mac уходят
        только два запроса из раздела 2.
      </p>

      <h2 className="legal-h2">7. Изменения</h2>
      <p className="legal-p">
        При изменении политики мы обновим эту страницу и дату вверху.
      </p>

      <h2 className="legal-h2">8. Контакт</h2>
      <p className="legal-p">
        Вопросы — на{" "}
        <a
          href="mailto:cambly.studio@gmail.com"
          className="text-accent hover:underline"
        >
          cambly.studio@gmail.com
        </a>
        .
      </p>
    </>
  );
}

function PrivacyPt() {
  return (
    <>
      <p className="legal-p">
        O Kelvin foi criado como uma ferramenta local. A monitorização e as
        métricas do sistema são processadas inteiramente no seu Mac. Este
        documento explica honestamente o que a aplicação faz com a
        informação e os exatamente dois pedidos de rede que faz.
      </p>

      <h2 className="legal-h2">1. Analítica e rastreio</h2>
      <p className="legal-p">
        <strong>Nenhum.</strong> O Kelvin não tem analítica, nem SDKs de
        anúncios, nem rastreadores, nem contadores. Não recolhemos
        estatísticas de uso, não criamos perfis nem enviamos nada para os
        nossos servidores para análise.{" "}
        <strong>
          As funções de monitorização gratuitas não fazem nenhum pedido de
          rede
        </strong>{" "}
        — bateria, temperaturas, ventoinhas, rede e disco são todas lidas
        localmente (IOKit / SMC / contadores do sistema); nunca consultamos
        intencionalmente o seu IP público.
      </p>

      <h2 className="legal-h2">2. O que sai do seu Mac</h2>
      <p className="legal-p">
        Exatamente dois pedidos, ambos mínimos e necessários:
      </p>
      <ul className="legal-ul">
        <li>
          <strong>Verificação de atualizações.</strong> No máximo uma vez por
          dia, a aplicação pede <code>trykelvin.com/appcast.json</code> para
          ver se há uma nova versão disponível. Este é um simples pedido GET
          anónimo: sem conta, sem identificadores, sem dados pessoais.
        </li>
        <li>
          <strong>Verificação de licença (apenas Kelvin Pro).</strong> Quando
          ativa uma chave de licença e depois periodicamente para confirmar,
          a chave e um identificador do dispositivo são enviados ao nosso
          provedor de pagamentos <strong>Lemon Squeezy</strong> para
          validação. Isto só acontece ao usar o Pro; no modo gratuito a
          licença nunca é verificada. A verificação funciona offline durante
          um período de tolerância.
        </li>
      </ul>

      <h2 className="legal-h2">
        3. O que fica local e nunca sai
      </h2>
      <ul className="legal-ul">
        <li>estado de energia, bateria, potência e corrente (IOKit / SMC);</li>
        <li>
          carga de CPU/GPU/memória, temperaturas, velocidade das ventoinhas,
          débito de rede e disco;
        </li>
        <li>
          bateria de dispositivos Bluetooth (via relatório do sistema macOS)
          — apenas exibição;
        </li>
        <li>
          histórico da área de transferência (se ativado) — armazenado apenas
          localmente no seu Mac e nunca transmitido;
        </li>
        <li>
          preferências da aplicação e a âncora do período de teste — nos
          user defaults locais e Keychain do seu Mac.
        </li>
      </ul>

      <h2 className="legal-h2">4. Permissões do sistema</h2>
      <p className="legal-p">
        Algumas funções exigem permissões do macOS — usadas apenas para o fim
        declarado e sem transmitir nada:
      </p>
      <ul className="legal-ul">
        <li>
          <strong>Bluetooth</strong> — mostrar o estado e alternar a partir
          da barra de menu;
        </li>
        <li>
          <strong>Acessibilidade</strong> — comutação automática da
          disposição do teclado e snippets (processados localmente);
        </li>
        <li>
          <strong>Apple Events</strong> — alternadores como modo escuro e
          Night Shift;
        </li>
        <li>
          <strong>Palavra-passe de administrador</strong> — instalação única
          de daemons do sistema (ventoinhas, limite de carga) via o diálogo
          padrão do macOS.
        </li>
      </ul>

      <h2 className="legal-h2">5. Pagamentos</h2>
      <p className="legal-p">
        As compras de licença são processadas pelo serviço de pagamentos
        terceiro Lemon Squeezy (merchant of record). Os dados de pagamento
        são tratados por eles conforme a sua política; recebemos apenas os
        detalhes necessários para emitir e validar a licença (por exemplo,
        email do pedido).
      </p>

      <h2 className="legal-h2">6. Armazenamento e transferência de dados</h2>
      <p className="legal-p">
        As métricas do sistema e as preferências ficam no seu dispositivo.
        Não as armazenamos nem as partilhamos com terceiros. Apenas os dois
        pedidos da secção 2 saem do seu Mac.
      </p>

      <h2 className="legal-h2">7. Alterações</h2>
      <p className="legal-p">
        Quando esta política mudar, atualizaremos esta página e a data acima.
      </p>

      <h2 className="legal-h2">8. Contacto</h2>
      <p className="legal-p">
        Questões —{" "}
        <a
          href="mailto:cambly.studio@gmail.com"
          className="text-accent hover:underline"
        >
          cambly.studio@gmail.com
        </a>
        .
      </p>
    </>
  );
}
