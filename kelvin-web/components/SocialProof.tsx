import { useTranslations } from "next-intl";
import Reveal from "./Reveal";

export default function SocialProof() {
  const t = useTranslations("SocialProof");
  const pills = t.raw("pills") as string[];

  return (
    <section className="border-y border-line bg-surface/40">
      <Reveal className="mx-auto flex max-w-[980px] flex-wrap items-center justify-center gap-x-8 gap-y-3 px-5 py-7">
        {pills.map((pill) => (
          <span
            key={pill}
            className="flex items-center gap-2 text-[14px] font-medium text-mut"
          >
            <svg
              width="16"
              height="16"
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
