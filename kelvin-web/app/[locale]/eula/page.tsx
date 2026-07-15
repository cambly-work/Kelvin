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
  const t = await getTranslations({ locale, namespace: "Legal.eula" });
  return { title: `${t("title")} — Kelvin` };
}

export default async function EulaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Legal.eula");

  return (
    <LegalLayout>
      <h1 className="mb-1.5 text-[clamp(1.75rem,4vw,2.5rem)] tracking-[-0.02em]">
        {t("title")}
      </h1>
      <p className="mb-8 text-[14px] text-mut">{t("updated")}</p>
      {locale === "ru" ? <EulaRu /> : <EulaEn />}
    </LegalLayout>
  );
}

function EulaRu() {
  return (
    <>
      <p className="legal-p">
        Настоящее соглашение заключается между вами (далее «Пользователь») и
        правообладателем приложения Kelvin для macOS (далее «Приложение»).
        Устанавливая или используя Приложение, вы принимаете условия ниже.
      </p>

      <Entity />

      <h2 className="legal-h2">1. Лицензия</h2>
      <p className="legal-p">
        Правообладатель предоставляет Пользователю неисключительную,
        непередаваемую лицензию на установку и использование Приложения на
        принадлежащих ему компьютерах Mac в личных и коммерческих целях, в
        соответствии с приобретённым тарифом.
      </p>

      <h2 className="legal-h2">2. Ограничения</h2>
      <ul className="legal-ul">
        <li>не перепродавать, не распространять и не сдавать Приложение в аренду;</li>
        <li>не декомпилировать и не восстанавливать исходный код, кроме случаев, прямо разрешённых законом;</li>
        <li>не удалять уведомления об авторских правах.</li>
      </ul>

      <h2 className="legal-h2">3. Права на Приложение</h2>
      <p className="legal-p">
        Приложение лицензируется, а не продаётся. Все права на Приложение, его
        код и оформление принадлежат Правообладателю.
      </p>

      <h2 className="legal-h2">4. Системные действия</h2>
      <p className="legal-p">
        Приложение может выполнять действия в системе (управление
        вентиляторами, лимит заряда, тумблеры) с вашего согласия и при
        необходимости с правами администратора. Пользователь использует эти
        функции на свой риск.
      </p>

      <h2 className="legal-h2">5. Отказ от гарантий</h2>
      <p className="legal-p">
        Приложение предоставляется «как есть», без каких-либо явных или
        подразумеваемых гарантий, включая пригодность для конкретной цели.
        Правообладатель не гарантирует бесперебойную или безошибочную работу.
      </p>

      <h2 className="legal-h2">6. Ограничение ответственности</h2>
      <p className="legal-p">
        В максимально допустимой законом степени Правообладатель не несёт
        ответственности за косвенные или случайные убытки, связанные с
        использованием Приложения. Совокупная ответственность не превышает
        суммы, уплаченной за лицензию.
      </p>

      <h2 className="legal-h2">7. Срок и прекращение</h2>
      <p className="legal-p">
        Лицензия действует до её прекращения. Она автоматически прекращается
        при нарушении условий; в этом случае Пользователь обязан удалить
        Приложение.
      </p>

      <h2 className="legal-h2">8. Применимое право</h2>
      <p className="legal-p">
        К соглашению применяется законодательство Федеративной Республики
        Бразилия.
      </p>

      <h2 className="legal-h2">9. Контакт</h2>
      <p className="legal-p">
        Вопросы по лицензии — на{" "}
        <a href="mailto:cambly.studio@gmail.com" className="text-accent hover:underline">
          cambly.studio@gmail.com
        </a>
        .
      </p>

      <p className="mt-7 text-[13px] opacity-70">
        Это типовой шаблон, не являющийся юридической консультацией. Перед
        публичной продажей рекомендуется проверка юристом/бухгалтером
        (contador).
      </p>
    </>
  );
}

function EulaEn() {
  return (
    <>
      <p className="legal-p">
        This agreement is between you (the &quot;User&quot;) and the
        copyright holder of the Kelvin application for macOS (the
        &quot;Application&quot;). By installing or using the Application, you
        accept the terms below.
      </p>

      <Entity />

      <h2 className="legal-h2">1. License</h2>
      <p className="legal-p">
        The copyright holder grants the User a non-exclusive,
        non-transferable license to install and use the Application on Mac
        computers they own, for personal and commercial purposes, in
        accordance with the purchased tier.
      </p>

      <h2 className="legal-h2">2. Restrictions</h2>
      <ul className="legal-ul">
        <li>do not resell, distribute, or rent the Application;</li>
        <li>do not decompile or reverse-engineer the source code, except as expressly permitted by law;</li>
        <li>do not remove copyright notices.</li>
      </ul>

      <h2 className="legal-h2">3. Rights to the Application</h2>
      <p className="legal-p">
        The Application is licensed, not sold. All rights to the Application,
        its code and design belong to the copyright holder.
      </p>

      <h2 className="legal-h2">4. System actions</h2>
      <p className="legal-p">
        The Application may perform system actions (fan control, charge
        limit, toggles) with your consent and, where necessary, with
        administrator privileges. The User uses these features at their own
        risk.
      </p>

      <h2 className="legal-h2">5. Disclaimer of warranty</h2>
      <p className="legal-p">
        The Application is provided &quot;as is&quot;, without any express or
        implied warranties, including fitness for a particular purpose. The
        copyright holder does not guarantee uninterrupted or error-free
        operation.
      </p>

      <h2 className="legal-h2">6. Limitation of liability</h2>
      <p className="legal-p">
        To the maximum extent permitted by law, the copyright holder is not
        liable for indirect or incidental damages related to the use of the
        Application. Aggregate liability does not exceed the amount paid for
        the license.
      </p>

      <h2 className="legal-h2">7. Term &amp; termination</h2>
      <p className="legal-p">
        The license remains in effect until terminated. It terminates
        automatically upon breach of terms; in that case the User must
        delete the Application.
      </p>

      <h2 className="legal-h2">8. Governing law</h2>
      <p className="legal-p">
        This agreement is governed by the laws of the Federative Republic of
        Brazil.
      </p>

      <h2 className="legal-h2">9. Contact</h2>
      <p className="legal-p">
        License questions —{" "}
        <a href="mailto:cambly.studio@gmail.com" className="text-accent hover:underline">
          cambly.studio@gmail.com
        </a>
        .
      </p>

      <p className="mt-7 text-[13px] opacity-70">
        This is a standard template and does not constitute legal advice.
        Before public sale, review by a lawyer/accountant (contador) is
        recommended.
      </p>
    </>
  );
}
