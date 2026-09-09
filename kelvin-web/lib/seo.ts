import type { Metadata } from "next";
import { notFound } from "next/navigation";

// Set this to the verified production domain before publishing.
const configuredOrigin = process.env.NEXT_PUBLIC_SITE_URL || "https://kelvin-iota.vercel.app";
const parsedOrigin = new URL(configuredOrigin);
if (!['http:', 'https:'].includes(parsedOrigin.protocol) || parsedOrigin.username || parsedOrigin.password || parsedOrigin.pathname !== '/' || parsedOrigin.search || parsedOrigin.hash) {
  throw new Error('NEXT_PUBLIC_SITE_URL must be an HTTP(S) origin without credentials, path, query or hash.');
}
export const siteOrigin = parsedOrigin.origin;
export const siteLocales = ['ru', 'pt'] as const;
export type SiteLocale = typeof siteLocales[number];
export const languageTags = { ru: 'ru', pt: 'pt-BR' } as const;
export const pagePaths = ['', '/privacy', '/eula', '/notes'] as const;

export function requireLocale(locale: string): SiteLocale {
  if (locale !== 'ru' && locale !== 'pt') notFound();
  return locale;
}

export function pageUrl(locale: SiteLocale, path = '') {
  return `${siteOrigin}/${locale}${path}`;
}

export function languageAlternates(path = '') {
  return { ru: pageUrl('ru', path), 'pt-BR': pageUrl('pt', path), 'x-default': pageUrl('ru', path) };
}

export function pageMetadata(locale: SiteLocale, path: string, title: string, description: string): Metadata {
  return {
    metadataBase: new URL(siteOrigin),
    title,
    description,
    alternates: { canonical: pageUrl(locale, path), languages: languageAlternates(path) },
    openGraph: {
      type: 'website', title, description, siteName: 'Kelvin', url: pageUrl(locale, path),
      locale: locale === 'pt' ? 'pt_BR' : 'ru_RU',
      alternateLocale: [locale === 'pt' ? 'ru_RU' : 'pt_BR'],
      images: [{ url: '/assets/icon.png', alt: 'Kelvin' }],
    },
    twitter: { card: 'summary', title, description, images: ['/assets/icon.png'] },
  };
}
