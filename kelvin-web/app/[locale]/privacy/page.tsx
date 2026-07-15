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
      {locale === "ru" ? <PrivacyRu /> : <PrivacyEn />}
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

function PrivacyEn() {
  return (
    <>
      <p className="legal-p">
        Kelvin is built as a local tool. Monitoring and system metrics are
        processed entirely on your Mac. This document honestly explains what
        the app does with information and the exactly two network requests
        it makes.
      </p>

      <Entity />

      <h2 className="legal-h2">1. Analytics &amp; tracking</h2>
      <p className="legal-p">
        <strong>None.</strong> Kelvin has no analytics, no ad SDKs, no
        trackers and no counters. We don&apos;t collect usage statistics,
        build a profile, or send anything to our servers for analysis.{" "}
        <strong>
          The free monitoring features make zero network requests
        </strong>{" "}
        — battery, temperatures, fans, network and disk are all read locally
        (IOKit / SMC / system counters); we intentionally never query your
        public IP.
      </p>

      <h2 className="legal-h2">2. What leaves your Mac</h2>
      <p className="legal-p">
        Exactly two requests, both minimal and necessary:
      </p>
      <ul className="legal-ul">
        <li>
          <strong>Update check.</strong> No more than once a day the app
          requests <code>trykelvin.com/appcast.json</code> to see if a new
          version is available. This is a plain anonymous GET request: no
          account, no identifiers, no personal data.
        </li>
        <li>
          <strong>License check (Kelvin Pro only).</strong> When you activate
          a license key and then periodically to confirm it, the key and a
          device identifier are sent to our payment provider{" "}
          <strong>Lemon Squeezy</strong> for validation. This only happens
          when using Pro; in free mode the license is never checked. The
          check works offline during a grace period.
        </li>
      </ul>

      <h2 className="legal-h2">3. What stays local and never leaves</h2>
      <ul className="legal-ul">
        <li>power state, battery, wattage and current (IOKit / SMC);</li>
        <li>
          CPU/GPU/memory load, temperatures, fan speeds, network and disk
          throughput;
        </li>
        <li>
          Bluetooth device battery (via the macOS system report) — display
          only;
        </li>
        <li>
          clipboard history (if enabled) — stored only locally on your Mac
          and never transmitted;
        </li>
        <li>
          app preferences and the trial anchor — in your Mac&apos;s local
          user defaults and Keychain.
        </li>
      </ul>

      <h2 className="legal-h2">4. System permissions</h2>
      <p className="legal-p">
        Some features require macOS permissions — used solely for their
        stated purpose and transmitting nothing:
      </p>
      <ul className="legal-ul">
        <li>
          <strong>Bluetooth</strong> — show status and toggle from the menu
          bar;
        </li>
        <li>
          <strong>Accessibility</strong> — auto keyboard layout switching and
          snippets (processed locally);
        </li>
        <li>
          <strong>Apple Events</strong> — toggles like dark mode and Night
          Shift;
        </li>
        <li>
          <strong>Administrator password</strong> — one-time installation of
          system daemons (fans, charge limit) via the standard macOS dialog.
        </li>
      </ul>

      <h2 className="legal-h2">5. Payments</h2>
      <p className="legal-p">
        License purchases are processed by the third-party payment service
        Lemon Squeezy (merchant of record). Payment details are handled by
        them per their policy; we receive only the details needed to issue
        and validate the license (e.g. order email).
      </p>

      <h2 className="legal-h2">6. Data storage &amp; transfer</h2>
      <p className="legal-p">
        System metrics and preferences stay on your device. We don&apos;t
        store them and don&apos;t share them with third parties. Only the two
        requests from section 2 ever leave your Mac.
      </p>

      <h2 className="legal-h2">7. Changes</h2>
      <p className="legal-p">
        When this policy changes we&apos;ll update this page and the date
        above.
      </p>

      <h2 className="legal-h2">8. Contact</h2>
      <p className="legal-p">
        Questions —{" "}
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
