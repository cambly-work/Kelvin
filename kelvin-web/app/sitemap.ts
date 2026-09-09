import { guideSlugs } from '@/lib/guides';
import type { MetadataRoute } from 'next';
import { siteLocales, pagePaths, pageUrl, languageAlternates } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  return [...pagePaths, ...guideSlugs.map(slug => `/guides/${slug}`)].flatMap(path => siteLocales.map(locale => ({
    url: pageUrl(locale, path),
    alternates: { languages: languageAlternates(path) },
  })));
}
