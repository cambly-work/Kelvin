"use client";

import dynamic from "next/dynamic";

/**
 * Client wrapper so motion-based HeroProduct can load with ssr:false,
 * keeping motion out of the initial JS bundle. The screenshot renders
 * server-side via a plain fallback until the client mounts parallax.
 */
const HeroProduct = dynamic(() => import("./HeroProduct"), {
  ssr: false,
  loading: () => null,
});

export default function LazyHeroProduct(props: {
  src: string;
  alt: string;
  width: number;
  height: number;
}) {
  return <HeroProduct {...props} />;
}
