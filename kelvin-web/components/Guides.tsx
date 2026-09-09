import { Link } from '@/i18n/routing';
import { guides, guideSlugs } from '@/lib/guides';
import type { SiteLocale } from '@/lib/seo';

export default function Guides({ locale }: { locale: SiteLocale }) {
  return <section className="border-t border-line">
    <div className="mx-auto max-w-[1100px] px-5 py-20">
      <h2 className="text-3xl font-bold tracking-tight">{locale === 'ru' ? 'Как управлять Mac с Kelvin' : 'Como usar o Kelvin no Mac'}</h2>
      <div className="mt-8 grid gap-6 md:grid-cols-3">{guideSlugs.map(slug => <article key={slug} className="rounded-2xl border border-line p-6">
        <h3 className="text-xl font-semibold"><Link href={`/guides/${slug}`} className="hover:text-accent">{guides[locale][slug].title}</Link></h3>
        <p className="mt-4 text-base leading-relaxed text-mut">{guides[locale][slug].description}</p>
      </article>)}</div>
    </div>
  </section>;
}
