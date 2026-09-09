import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import Script from "next/script";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import SiteVisitReporter from "@/components/SiteVisitReporter";
import { routing } from "@/i18n/routing";
import { pageMetadata, requireLocale, languageTags } from "@/lib/seo";
import "../globals.css";
import "../product.css";
import "../preview.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const validLocale = requireLocale(locale);
  const t = await getTranslations({ locale: validLocale, namespace: "Meta" });
  return {
    ...pageMetadata(validLocale, "", t("title"), t("description")),
    applicationName: "Kelvin",
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
    icons: { icon: "/assets/icon.png", apple: "/assets/icon.png" },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbfbfd" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

const themeScript = `(function(){try{var t=localStorage.getItem('kelvin-theme');if(t==='light'){document.documentElement.classList.add('light')}else if(t==='dark'){document.documentElement.classList.remove('light')}else if(matchMedia('(prefers-color-scheme: light)').matches){document.documentElement.classList.add('light')}}catch(e){}})()`;
export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "A11y" });

  return (
    <html lang={languageTags[locale]} className="h-full antialiased" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className="min-h-dvh flex flex-col">
        <Script id="kelvin-theme" strategy="beforeInteractive">
          {themeScript}
        </Script>
        <a href="#main" className="skip-link">
          {t("skipToContent")}
        </a>
        <NextIntlClientProvider>
          <SiteVisitReporter />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
