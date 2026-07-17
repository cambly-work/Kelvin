export type FeatureIcon =
  | "power"
  | "fans"
  | "toggles"
  | "layout"
  | "security"
  | "dev";

const PATHS: Record<FeatureIcon, React.ReactNode> = {
  power: (
    <>
      <path d="M11 3a1 1 0 1 1 2 0v8a1 1 0 1 1-2 0V3z" />
      <path d="M7.5 6.2a7 7 0 1 0 9 0" />
    </>
  ),
  fans: (
    <>
      <circle cx="12" cy="12" r="2.2" />
      <path d="M12 9.8c0-3-1-5.8-1-5.8s-3 .8-3 3.8 4 2 4 2z" />
      <path d="M14.2 12c3 0 5.8-1 5.8-1s-.8-3-3.8-3-2 4-2 4z" />
      <path d="M12 14.2c0 3 1 5.8 1 5.8s3-.8 3-3.8-4-2-4-2z" />
      <path d="M9.8 12c-3 0-5.8 1-5.8 1s.8 3 3.8 3 2-4 2-4z" />
    </>
  ),
  toggles: (
    <>
      <rect x="2" y="6" width="20" height="12" rx="3" />
      <circle cx="16" cy="12" r="2.5" fill="currentColor" stroke="none" />
    </>
  ),
  layout: (
    <>
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <path d="M7 10h2M7 14h6M15 10h2" />
      <path d="m17 6 4 4M17 18l4-4" />
    </>
  ),
  security: (
    <>
      <path d="M12 3 5 6v5c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6l-7-3z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  dev: (
    <>
      <path d="m8 9-3 3 3 3" />
      <path d="m16 9 3 3-3 3" />
      <path d="m13 7-2 10" />
    </>
  ),
};

export function Icon({
  name,
  width = 24,
  height = 24,
  className,
}: {
  name: FeatureIcon;
  width?: number;
  height?: number;
  className?: string;
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {PATHS[name]}
    </svg>
  );
}
