import { useTranslations } from "next-intl";
import Reveal from "./Reveal";

export default function Faq() {
  const t = useTranslations("Faq");
  const items = t.raw("items") as { q: string; a: string }[];

  return (
    <section id="faq" className="py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-[680px] px-5">
        <Reveal as="span" className="eyebrow mb-4 text-center">
          {t("eyebrow")}
        </Reveal>
        <Reveal
          as="h2"
          index={1}
          className="mb-10 text-center text-[clamp(2rem,5vw,3rem)] font-semibold tracking-[-0.025em] text-tx"
        >
          {t("title")}
        </Reveal>

        <Reveal index={2} className="space-y-3">
          {items.map((item) => (
            <details
              key={item.q}
              className="glass group rounded-[14px] px-6 transition-colors duration-200 open:border-accent/40 open:bg-white/[0.07]"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-[17px] font-medium text-tx">
                {item.q}
                <svg
                  className="h-5 w-5 shrink-0 text-accent transition-transform duration-300 group-open:rotate-45"
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
              <p className="pb-5 text-[15px] leading-relaxed text-mut">
                {item.a}
              </p>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
