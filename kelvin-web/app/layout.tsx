import type { ReactNode } from "react";

/**
 * Root layout — no <html> here. next-intl's [locale] segment owns the
 * document shell so we can set lang dynamically. This wrapper just passes
 * children through. Next.js still requires a root layout to exist.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
