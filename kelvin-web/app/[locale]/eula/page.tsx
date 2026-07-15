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
      {locale === "ru" ? <EulaRu /> : <EulaPt />}
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

function EulaPt() {
  return (
    <>
      <p className="legal-p">
        Este contrato é celebrado entre si (o &quot;Utilizador&quot;) e o
        detentor dos direitos de autor da aplicação Kelvin para macOS (a
        &quot;Aplicação&quot;). Ao instalar ou usar a Aplicação, aceita os
        termos abaixo.
      </p>

      <Entity />

      <h2 className="legal-h2">1. Licença</h2>
      <p className="legal-p">
        O detentor dos direitos concede ao Utilizador uma licença não
        exclusiva e intransmissível para instalar e usar a Aplicação em
        computadores Mac que possua, para fins pessoais e comerciais, de
        acordo com o nível adquirido.
      </p>

      <h2 className="legal-h2">2. Restrições</h2>
      <ul className="legal-ul">
        <li>não revender, distribuir ou arrendar a Aplicação;</li>
        <li>não descompilar nem fazer engenharia reversa do código-fonte, exceto conforme expressamente permitido por lei;</li>
        <li>não remover avisos de direitos de autor.</li>
      </ul>

      <h2 className="legal-h2">3. Direitos sobre a Aplicação</h2>
      <p className="legal-p">
        A Aplicação é licenciada, não vendida. Todos os direitos sobre a
        Aplicação, o seu código e design pertencem ao detentor dos direitos.
      </p>

      <h2 className="legal-h2">4. Ações do sistema</h2>
      <p className="legal-p">
        A Aplicação pode executar ações no sistema (controlo de ventoinhas,
        limite de carga, alternadores) com o seu consentimento e, quando
        necessário, com privilégios de administrador. O Utilizador usa estas
        funções por sua conta e risco.
      </p>

      <h2 className="legal-h2">5. Isenção de garantia</h2>
      <p className="legal-p">
        A Aplicação é fornecida &quot;tal como está&quot;, sem quaisquer
        garantias expressas ou implícitas, incluindo adequação a um fim
        específico. O detentor dos direitos não garante operação ininterrupta
        ou livre de erros.
      </p>

      <h2 className="legal-h2">6. Limitação de responsabilidade</h2>
      <p className="legal-p">
        Na medida máxima permitida por lei, o detentor dos direitos não é
        responsável por danos indiretos ou incidentais relacionados com o uso
        da Aplicação. A responsabilidade agregada não excede o montante pago
        pela licença.
      </p>

      <h2 className="legal-h2">7. Prazo e rescisão</h2>
      <p className="legal-p">
        A licença mantém-se em vigor até ser rescindida. Rescindide-se
        automaticamente em caso de violação dos termos; nesse caso, o
        Utilizador deve eliminar a Aplicação.
      </p>

      <h2 className="legal-h2">8. Lei aplicável</h2>
      <p className="legal-p">
        Este contrato é regido pelas leis da República Federativa do Brasil.
      </p>

      <h2 className="legal-h2">9. Contacto</h2>
      <p className="legal-p">
        Questões sobre a licença —{" "}
        <a href="mailto:cambly.studio@gmail.com" className="text-accent hover:underline">
          cambly.studio@gmail.com
        </a>
        .
      </p>

      <p className="mt-7 text-[13px] opacity-70">
        Este é um modelo padrão e não constitui aconselhamento jurídico.
        Antes da venda pública, recomenda-se a revisão por um
        advogado/contador (contador).
      </p>
    </>
  );
}
