import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import Script from "next/script";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { routing } from "@/i18n/routing";
import { KelvinExperienceProvider } from "@/components/KelvinExperience";
import "../globals.css";
import "../product.css";

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
      images: [
        {
          url: "/assets/og-v2.png",
          width: 1200,
          height: 630,
          alt: "Kelvin — command center for macOS",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      images: ["/assets/og-v2.png"],
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

const themeScript = `(function(){try{var t=localStorage.getItem('kelvin-theme');if(t==='light'){document.documentElement.classList.add('light')}else if(t==='dark'){document.documentElement.classList.remove('light')}else if(matchMedia('(prefers-color-scheme: light)').matches){document.documentElement.classList.add('light')}}catch(e){}})()`;
const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Kelvin",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "macOS 11 or later",
  url: "https://trykelvin.com",
  downloadUrl: "https://trykelvin.com/Kelvin-0.9.0.dmg",
  image: "https://trykelvin.com/assets/og-v2.png",
  offers: [
    { "@type": "Offer", price: "0", priceCurrency: "USD", name: "Kelvin Free" },
    { "@type": "Offer", price: "19", priceCurrency: "USD", name: "Kelvin Pro" },
  ],
};

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
    <html lang={locale} className="h-full antialiased" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className="min-h-dvh flex flex-col">
        <Script id="kelvin-theme" strategy="beforeInteractive">
          {themeScript}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
        <a href="#main" className="skip-link">
          {t("skipToContent")}
        </a>
        <NextIntlClientProvider>
          <KelvinExperienceProvider>{children}</KelvinExperienceProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
