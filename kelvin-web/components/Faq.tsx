"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Reveal from "./Reveal";

type FaqItem = { q: string; a: string };

export default function Faq() {
  const t = useTranslations("Faq");
  const items = t.raw("items") as FaqItem[];
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="border-t border-line">
      <div className="mx-auto max-w-[860px] px-5 py-24 sm:py-32">
        <Reveal as="p" className="section-eyebrow text-center">{t("eyebrow")}</Reveal>
        <Reveal as="h2" index={1} className="mx-auto mb-12 max-w-[720px] text-balance text-center text-[clamp(2.8rem,6vw,4.8rem)] font-bold leading-[0.96] tracking-[-0.055em] text-tx">
          {t("title")}
        </Reveal>

        <div className="kelvin-faq-list">
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={item.q} index={i % 3}>
                <h3>
                  <button
                    id={`faq-question-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${i}`}
                    className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6"
                  >
                    <span className="text-[17px] font-medium text-tx">
                      {item.q}
                    </span>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      className={`shrink-0 text-mut transition-transform duration-200 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                      aria-hidden
                    >
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </button>
                </h3>
                <div
                  id={`faq-answer-${i}`}
                  role="region"
                  aria-labelledby={`faq-question-${i}`}
                  aria-hidden={!isOpen}
                  className={`grid transition-all duration-200 ${
                    isOpen
                      ? "grid-rows-[1fr] pb-5 opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <p className="overflow-hidden px-5 text-[15px] leading-relaxed text-mut sm:px-6">
                    {item.a}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
