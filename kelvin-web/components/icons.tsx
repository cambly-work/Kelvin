import type { SVGProps } from "react";

type IconName =
  | "power"
  | "fans"
  | "toggles"
  | "layout"
  | "security"
  | "dev";

const paths: Record<IconName, React.ReactNode> = {
  power: (
    <path d="M13 2 4.5 13H11l-1 9 8.5-11H12l1-9Z" />
  ),
  fans: (
    <>
      <circle cx="12" cy="12" r="2" />
      <path d="M12 10c0-3-1-7-3-7-1.5 0-2 2-1.5 4 .5 1.8 2 2.6 4.5 3M14 12c3 0 7 1 7 3 0 1.5-2 2-4 1.5-1.8-.5-2.6-2-3-4.5M12 14c0 3 1 7 3 7 1.5 0 2-2 1.5-4-.5-1.8-2-2.6-4.5-3M10 12c-3 0-7-1-7-3 0-1.5 2-2 4-1.5 1.8.5 2.6 2 3 4.5" />
    </>
  ),
  toggles: (
    <>
      <line x1="4" y1="8" x2="20" y2="8" />
      <circle cx="9" cy="8" r="2.4" fill="none" />
      <line x1="4" y1="16" x2="20" y2="16" />
      <circle cx="15" cy="16" r="2.4" fill="none" />
    </>
  ),
  layout: (
    <>
      <rect x="2.5" y="6" width="19" height="12" rx="2" />
      <path d="M6 9.5h.01M9.5 9.5h.01M13 9.5h.01M16.5 9.5h.01M8 14h8" />
    </>
  ),
  security: (
    <>
      <path d="M12 3 5 6v5c0 4.4 3 8.4 7 10 4-1.6 7-5.6 7-10V6l-7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  dev: (
    <path d="m8 8-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14" />
  ),
};

export function Icon({
  name,
  ...props
}: { name: IconName } & Omit<SVGProps<SVGSVGElement>, "children">) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="24"
      height="24"
      aria-hidden
      {...props}
    >
      {paths[name]}
    </svg>
  );
}
