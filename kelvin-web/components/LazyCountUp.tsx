"use client";

import dynamic from "next/dynamic";

/**
 * Client wrapper so motion-based CountUp can be loaded with ssr:false,
 * keeping motion out of the initial JS bundle. Next.js 16 requires
 * ssr:false dynamic imports to live in a Client Component.
 */
const CountUp = dynamic(() => import("./CountUp"), {
  ssr: false,
  loading: () => <span>$19</span>,
});

export default LazyCountUp;
function LazyCountUp(props: {
  value: number;
  prefix?: string;
  duration?: number;
  className?: string;
}) {
  return <CountUp {...props} />;
}
