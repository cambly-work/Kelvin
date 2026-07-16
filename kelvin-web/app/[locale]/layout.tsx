import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { routing } from "@/i18n/routing";
import "../globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });

  return {
    title: t("title"),
    description: t("description"),
    metadataBase: new URL("https://trykelvin.com"),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        ru: "/ru",
        pt: "/pt",
        "x-default": "/ru",
      },
    },
    openGraph: {
      type: "website",
      title: t("title"),
      description: t("description"),
      siteName: "Kelvin",
      images: [{ url: "/assets/og.png" }],
    },
    twitter: {
      card: "summary_large_image",
    },
    icons: {
      icon: "/assets/icon.png",
      apple: "/assets/icon.png",
    },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbfbfd" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

/**
 * Runs synchronously before first paint to apply the saved/system theme.
 * Prevents FOUC (flash of wrong theme). Must stay inline in <head>.
 */
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
    <html lang={locale} className="h-full antialiased" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-dvh flex flex-col">
        <a href="#main" className="skip-link">
          {t("skipToContent")}
        </a>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
