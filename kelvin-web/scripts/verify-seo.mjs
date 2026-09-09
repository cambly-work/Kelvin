import assert from 'node:assert/strict';

const origin = process.argv[2];
assert.ok(origin, 'Usage: node scripts/verify-seo.mjs <server-origin> [canonical-origin]');
const canonicalOrigin = process.argv[3] || 'https://kelvin-iota.vercel.app';
const paths = ['', '/privacy', '/eula', '/notes', '/guides/mac-temperature', '/guides/mac-fan-control', '/guides/macbook-charge-limit'];
const attrs = tag => Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map(([, k, v]) => [k.toLowerCase(), v]));
const sitemapResponse = await fetch(`${origin}/sitemap.xml`);
assert.equal(sitemapResponse.status, 200);
assert.match(sitemapResponse.headers.get('content-type'), /xml/);
const sitemap = await sitemapResponse.text();
assert.equal([...sitemap.matchAll(/<loc>/g)].length, paths.length * 2);
const titles = new Set();
const descriptions = new Set();
for (const locale of ['ru', 'pt']) {
  for (const path of paths) {
    const response = await fetch(`${origin}/${locale}${path}`, { headers: { 'User-Agent': 'Googlebot' } });
    assert.equal(response.status, 200, `${locale}${path}`);
    assert.doesNotMatch(response.headers.get('x-robots-tag') || '', /noindex/);
    const html = await response.text();
    const head = html.match(/<head>([\s\S]*?)<\/head>/)[1];
    const links = [...head.matchAll(/<link\b[^>]*>/g)].map(([tag]) => attrs(tag));
    const metas = [...head.matchAll(/<meta\b[^>]*>/g)].map(([tag]) => attrs(tag));
    const canonical = links.filter(link => link.rel === 'canonical');
    assert.equal(canonical.length, 1);
    assert.equal(canonical[0].href, `${canonicalOrigin}/${locale}${path}`);
    for (const [lang, target] of [['ru', 'ru'], ['pt-BR', 'pt'], ['x-default', 'ru']]) {
      assert.equal(links.find(link => link.hreflang === lang)?.href, `${canonicalOrigin}/${target}${path}`);
    }
    assert.equal(metas.find(meta => meta.property === 'og:url')?.content, canonical[0].href);
    assert.equal(metas.find(meta => meta.property === 'og:locale')?.content, locale === 'pt' ? 'pt_BR' : 'ru_RU');
    assert.doesNotMatch(metas.find(meta => meta.name === 'robots')?.content || '', /noindex/);
    const title = head.match(/<title>(.*?)<\/title>/s)[1];
    const description = metas.find(meta => meta.name === 'description')?.content;
    assert.ok(description && description.length > 50);
    assert.ok(!titles.has(title), 'Unique title: ' + title); titles.add(title);
    assert.ok(!descriptions.has(description), 'Unique description: ' + description); descriptions.add(description);
    assert.ok(html.includes(`lang="${locale === 'pt' ? 'pt-BR' : 'ru'}"`));
    assert.equal([...html.matchAll(/<h1(?:\s|>)/g)].length, 1);
    assert.ok(html.includes('id="main"'));
    assert.ok(sitemap.includes(`<loc>${canonical[0].href}</loc>`));
    const structured = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map(([, data]) => JSON.parse(data));
    if (!path) {
      assert.equal(structured[0]['@type'], 'SoftwareApplication');
      assert.equal(structured[0].url, canonical[0].href);
      assert.equal(structured[0].isAccessibleForFree, true);
      for (const guide of paths.filter(item => item.startsWith('/guides/'))) assert.ok(html.includes(`href="/${locale}${guide}"`));
    } else {
      assert.ok(!structured.some(data => data['@type'] === 'SoftwareApplication'), 'No app schema on editorial/legal pages');
      if (path.startsWith('/guides/')) assert.equal(structured[0]['@type'], 'BreadcrumbList');
    }
  }
}
const robots = await fetch(`${origin}/robots.txt`);
assert.equal(robots.status, 200);
const rules = await robots.text();
assert.ok(rules.includes(`Sitemap: ${canonicalOrigin}/sitemap.xml`));
assert.match(rules, /Allow: \//);
assert.doesNotMatch(rules, /Disallow: \/\s*$/m);
for (const path of ['/ru/not-a-page', '/pt/guides/not-a-guide', '/fr']) {
  const response = await fetch(`${origin}${path}`);
  assert.equal(response.status, 404, path);
}
console.log(`SEO: ${paths.length * 2} pages, unique metadata, canonical URLs, languages, structured data, sitemap, robots and 404s PASS`);
