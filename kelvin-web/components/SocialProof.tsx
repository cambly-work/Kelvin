import { useTranslations } from "next-intl";
import Reveal from "./Reveal";

export default function SocialProof() {
  const t = useTranslations("SocialProof");
  const pills = t.raw("pills") as string[];

  return (
    <section className="relative border-y border-line bg-surface/35">
      <Reveal className="mx-auto grid max-w-[1120px] grid-cols-2 px-5 py-2 md:grid-cols-4">
        {pills.map((pill, index) => (
          <span
            key={pill}
            className={`flex min-h-20 items-center justify-center gap-2 px-3 text-center text-[12px] font-semibold uppercase tracking-[0.08em] text-mut ${
              index > 0 ? "border-l border-line" : ""
            }`}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-accent"
              aria-hidden
            >
              <path d="m5 12 5 5 9-9" />
            </svg>
            {pill}
          </span>
        ))}
      </Reveal>
    </section>
  );
}
