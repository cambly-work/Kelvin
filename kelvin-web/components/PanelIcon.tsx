import type { ReactNode } from "react";

const shapes = {
  battery: (
    <>
      <rect x="3" y="7" width="16" height="10" rx="2" />
      <path d="M22 10v4M6 10v4m3-4v4m3-4v4" />
    </>
  ),
  bolt: <path d="m13 2-8 12h6l-1 8 9-13h-6l1-7Z" />,
  chip: (
    <>
      <rect x="6" y="6" width="12" height="12" rx="2" />
      <path d="M9 1v5m6-5v5M9 18v5m6-5v5M1 9h5m-5 6h5m12-6h5m-5 6h5" />
    </>
  ),
  shield: (
    <>
      <path d="m12 3 8 3v5c0 5-5 8-8 10-3-2-8-5-8-10V6l8-3Z" />
      <path d="m8 12 3 3 5-6" />
    </>
  ),
  heart: (
    <path d="M20 5c-3-3-6-1-8 1-2-2-5-4-8-1-4 4 0 8 8 15 8-7 12-11 8-15Z" />
  ),
  moon: <path d="M20 15A9 9 0 0 1 9 4a9 9 0 1 0 11 11Z" />,
  coffee: (
    <>
      <path d="M4 8h13v7a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8Zm13 1h2a3 3 0 0 1 0 6h-2M3 22h15M7 2v2m5-2v2" />
    </>
  ),
  settings: (
    <>
      <path d="M4 6h16M4 12h16M4 18h16" />
      <circle cx="9" cy="6" r="2" />
      <circle cx="16" cy="12" r="2" />
      <circle cx="8" cy="18" r="2" />
    </>
  ),
  check: <path d="m5 12 4 4L19 6" />,
  arrow: <path d="M4 12h16m-6-6 6 6-6 6" />,
  reset: (
    <>
      <path d="M4 10a8 8 0 1 1 1 8M4 4v6h6" />
    </>
  ),
  fan: (
    <>
      <circle cx="12" cy="12" r="2" />
      <path d="M12 10C5 6 9 0 13 3c2 2 0 5-1 7Zm2 2c4-7 10-3 7 1-2 2-5 0-7-1Zm-2 2c7 4 3 10-1 7-2-2 0-5 1-7Zm-2-2C6 19 0 15 3 11c2-2 5 0 7 1Z" />
    </>
  ),
  laptop: (
    <>
      <rect x="4" y="4" width="16" height="12" rx="2" />
      <path d="m4 16-2 4h20l-2-4M9 20h6" />
    </>
  ),
  plug: (
    <>
      <path d="M8 2v5m8-5v5M6 7h12v4a6 6 0 0 1-12 0V7Zm6 10v5" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <ellipse cx="12" cy="12" rx="4" ry="9" />
      <path d="M3 12h18" />
    </>
  ),
  folder: (
    <path d="M3 7V5a2 2 0 0 1 2-2h5l2 3h7a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" />
  ),
} satisfies Record<string, ReactNode>;

export type PanelIconName = keyof typeof shapes;
export default function PanelIcon({
  name,
  size = 20,
}: {
  name: PanelIconName;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.65"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {shapes[name]}
    </svg>
  );
}
