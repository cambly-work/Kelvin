import { useTranslations } from "next-intl";
import Reveal from "./Reveal";

export default function Faq() {
  const t = useTranslations("Faq");
  const items = t.raw("items") as { q: string; a: string }[];

  return (
    <section id="faq" className="bg-bg2 py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-[680px] px-5">
        <Reveal
          as="h2"
          className="mb-10 text-center text-[clamp(2rem,5vw,3rem)] font-semibold tracking-[-0.025em] text-tx"
        >
          {t("title")}
        </Reveal>

        <Reveal index={1} className="divide-y divide-white/10">
          {items.map((item) => (
            <details
              key={item.q}
              className="group py-5"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[17px] font-normal text-tx">
                {item.q}
                <svg
                  className="h-5 w-5 shrink-0 text-mut transition-transform duration-300 group-open:rotate-45"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  aria-hidden
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </summary>
              <p className="mt-3 text-[15px] leading-relaxed text-mut">
                {item.a}
              </p>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
