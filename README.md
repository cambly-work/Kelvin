# Kelvin website

The current website is `kelvin-web/`: Next.js 16, React 19, Tailwind CSS 4 and next-intl (Russian / Brazilian Portuguese). Kelvin is completely free, with no subscription, activation key or trial.

## Develop and validate

```sh
cd kelvin-web
npm install
npm run dev
npm run check
```

With the server running, `node scripts/verify-release.mjs http://localhost:3000` additionally checks both languages, all legal routes, free-offer metadata and legacy redirects. `npm test` validates the Drive URL guard and translation consistency without a server.

## Release and Google Drive DMG

Edit `kelvin-web/public/release.json`:
- `version` and `minOS`: match the actual app bundle.
- `googleDriveUrl`: the public file-sharing link to the DMG, with viewer access for anyone with the link. Use the file's `/file/d/…/view` URL, not a folder or an edit URL.

The download section and search metadata share the validated link from `lib/release.ts`. Navigation and hero CTAs lead to the download section, which explains installation. The Drive link opens in a new tab; it is a file page, not a direct binary download. Empty or invalid links show an explicit pending state, never a fake download button. Rebuild/redeploy the website after changing this configuration.

Manual DMG distribution is separate from native updates. The current native app uses Sparkle and `https://trykelvin.com/appcast.xml`, which requires a real signed update archive and correctly generated feed. **Do not replace that archive URL with a Google Drive preview page.** This repository's legacy `appcast.json` files and `api/latest-version` compatibility endpoint are preserved; they do not drive the website download. Review the native release pipeline separately before publishing an update.

## Content and design

- `messages/{ru,pt}.json`: localized site copy, FAQ, free edition and download instructions.
- `components/EngineeringStory.tsx`, `ProductExplorer.tsx`: product capabilities and model-specific limits.
- `components/KelvinPanel.tsx`: interactive preview with **sample data**, not a live connection to the visitor's Mac. Energy impact is a relative metric, not watts.
- `app/{globals,product}.css`: design tokens, dark/light theme and component styling.
- `app/[locale]/{privacy,eula,notes}/page.tsx`: current legal pages and version notes.
- `app/[locale]/layout.tsx`: locale HTML shell, theme script and metadata.

Native changes were checked against `/Users/timmorrison/kelvin_app`: free feature access, GPU compatibility/service, panel and menu-bar settings, launch-at-login, and app energy presentation. The bundle still reports 0.9.0; no release number was invented. Apple notarization is not claimed without checking the actual distribution artifact.

Root-level HTML files are compatibility redirects to the Next.js routes, not a second website. The native app's legacy `/privacy.html`, `/eula.html` and `/notes.html` URLs also redirect through Next.js.

## Deployment

Build with `npm run build` and serve with `npm start`, using the existing hosting configuration. No deployment workflow or hosting credentials are configured in this checkout. Deploy `kelvin-web/`, not the legacy root HTML.
