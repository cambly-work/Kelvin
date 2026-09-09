import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import LegalLayout from '@/components/LegalLayout';
import { guides, guideSlugs, type GuideSlug } from '@/lib/guides';
import { pageMetadata, pageUrl, requireLocale } from '@/lib/seo';

type Props = { params: Promise<{ locale: string; slug: string }> };
function getGuide(locale: string, slug: string) {
  const language = requireLocale(locale);
  if (!guideSlugs.includes(slug as GuideSlug)) notFound();
  return { language, guide: guides[language][slug as GuideSlug] };
}
export function generateStaticParams() {
  return guideSlugs.map(slug => ({ slug }));
}
export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const { language, guide } = getGuide(locale, slug);
  return pageMetadata(language, `/guides/${slug}`, guide.title, guide.description);
}
export default async function GuidePage({ params }: Props) {
  const { locale, slug } = await params;
  const { language, guide } = getGuide(locale, slug);
  setRequestLocale(language);
  const breadcrumbs = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Kelvin', item: pageUrl(language) },
      { '@type': 'ListItem', position: 2, name: guide.title, item: pageUrl(language, `/guides/${slug}`) },
    ],
  };
  return (
    <LegalLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs).replace(/</g, '\\u003c') }} />
      <article>
        <h1 className="text-balance text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight tracking-tight">{guide.title}</h1>
        <p className="mt-6 text-lg leading-relaxed text-mut">{guide.description}</p>
        {guide.sections.map(section => <section key={section.title} className="mt-10">
          <h2 className="text-2xl font-semibold tracking-tight">{section.title}</h2>
          <p className="mt-4 text-base leading-relaxed text-mut">{section.body}</p>
        </section>)}
        <Link href="/#download" className="btn-primary mt-10 inline-block">{language === 'ru' ? 'Скачать Kelvin бесплатно' : 'Baixar o Kelvin grátis'}</Link>
      </article>
      <nav aria-label={language === 'ru' ? 'Другие руководства' : 'Outros guias'} className="mt-12 border-t border-line pt-6">
        <h2 className="mb-4 text-lg font-semibold">{language === 'ru' ? 'Другие руководства' : 'Outros guias'}</h2>
        <ul className="space-y-3">{guideSlugs.filter(item => item !== slug).map(item => <li key={item}><Link href={`/guides/${item}`} className="text-accent underline underline-offset-4">{guides[language][item].title}</Link></li>)}</ul>
      </nav>
    </LegalLayout>
  );
}
