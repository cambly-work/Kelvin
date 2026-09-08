import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import ts from 'typescript';

const root = new URL('../', import.meta.url);
const json = path => JSON.parse(readFileSync(new URL(path, root), 'utf8'));
const config = json('public/release.json');
const source = readFileSync(new URL('lib/release.ts', root), 'utf8');
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true } }).outputText;
const exports = {};
runInNewContext(compiled, { exports, URL, require: name => {
  assert.equal(name, '@/public/release.json');
  return config;
} });
const validate = exports.googleDriveDownloadUrl;
assert.ok(validate(config.googleDriveUrl), 'Published release needs a valid Google Drive file link');
assert.equal(validate('https://drive.google.com/file/d/abc_123/view?usp=sharing'), 'https://drive.google.com/file/d/abc_123/view?usp=sharing');
assert.equal(validate('https://drive.google.com/open?id=abc_123'), 'https://drive.google.com/open?id=abc_123');
for (const value of ['', 'not a URL', 'javascript:alert(1)', 'https://drive.google.com.evil.test/file/d/id/view', 'https://drive.google.com/drive/folders/id', 'https://user:password@drive.google.com/file/d/id/view', 'https://drive.google.com/open']) {
  assert.equal(validate(value), null, `Reject invalid link: ${value}`);
}

const keys = (object, prefix = '') => Object.entries(object).flatMap(([key, value]) => {
  const path = prefix + key;
  return value && typeof value === 'object' ? keys(value, path + '.') : [path];
}).sort();
const ru = json('messages/ru.json');
const pt = json('messages/pt.json');
assert.deepEqual(keys(ru), keys(pt), 'RU and PT translation keys must match');
assert.doesNotMatch(JSON.stringify(pt), /[А-Яа-яЁё]/, 'No Russian text in Portuguese messages');
for (const messages of [ru, pt]) {
  assert.doesNotMatch(JSON.stringify(messages), /Kelvin Pro|Lemon Squeezy|\$19|14 дней|14 dias/);
}

if (process.argv[2]) {
  const origin = process.argv[2];
  for (const locale of ['ru', 'pt']) {
    for (const page of ['', '/privacy', '/eula', '/notes']) {
      const response = await fetch(`${origin}/${locale}${page}`);
      assert.equal(response.status, 200);
      const html = await response.text();
      assert.ok(html.includes(`lang="${locale}"`));
      // React Flight references such as "$19" are identifiers, not visible prices.
      const renderedHtml = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '');
      assert.doesNotMatch(renderedHtml, /Kelvin Pro|Lemon Squeezy|\$19/);
      if (!page) {
        const data = JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1]);
        assert.equal(data.downloadUrl, config.googleDriveUrl);
        assert.equal(data.isAccessibleForFree, true);
        assert.ok(data.offers.every(offer => offer.price === '0'));
        assert.ok(html.includes('id="download"'));
      }
    }
  }
  for (const page of ['privacy', 'eula', 'notes']) {
    const response = await fetch(`${origin}/${page}.html`, { redirect: 'manual' });
    assert.equal(response.status, 308);
    assert.equal(new URL(response.headers.get('location'), origin).pathname, `/ru/${page}`);
  }
}
console.log('Release links, translations, free edition metadata and requested routes: PASS');
