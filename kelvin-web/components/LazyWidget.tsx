"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";

/**
 * Lazy-load a feature widget so its JS is only fetched when the user
 * scrolls near the Features section, not on initial page load.
 * A glass placeholder reserves space (no CLS) until the real widget mounts.
 */

const placeholder = (
  <div className="glass h-64 w-full animate-pulse rounded-[18px]" />
);

export const LazyPower = make(() =>
  import("./FeatureWidgets").then((m) => ({ default: m.PowerWidget }))
);
export const LazyFans = make(() =>
  import("./FeatureWidgets").then((m) => ({ default: m.FansWidget }))
);
export const LazyToggles = make(() =>
  import("./FeatureWidgets").then((m) => ({ default: m.TogglesWidget }))
);
export const LazyLayout = make(() =>
  import("./FeatureWidgets").then((m) => ({ default: m.LayoutWidget }))
);
export const LazySecurity = make(() =>
  import("./FeatureWidgets").then((m) => ({ default: m.SecurityWidget }))
);
export const LazyDev = make(() =>
  import("./FeatureWidgets").then((m) => ({ default: m.DevWidget }))
);

function make(loader: () => Promise<{ default: ComponentType }>) {
  return dynamic(loader, {
    ssr: false,
    loading: () => placeholder,
  });
}
