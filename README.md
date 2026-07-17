# Kelvin Web

Landing site for Kelvin, a macOS menu-bar multitool. Built with Next.js 16, React 19, Tailwind CSS v4, and `next-intl`. Dark theme by default, light theme via toggle.

## Quick start

```bash
cd kelvin-web
npm install      # first time only
npm run dev      # http://localhost:3000  (redirects to /ru)
npm run build    # production build
npm start        # serve the production build
```

## Project structure

```
kelvin-web/
├── app/
│   ├── [locale]/            # locale-segmented routes (ru, pt)
│   │   ├── layout.tsx       # <html> shell, metadata, theme FOUC script — DO NOT remove the script
│   │   ├── page.tsx         # the landing page — assembles all sections
│   │   ├── privacy/         # privacy policy page
│   │   ├── eula/            # license agreement page
│   │   └── notes/           # release notes page
│   ├── api/latest-version/  # version-check endpoint (read by the app)
│   ├── globals.css          # ★ the whole design system lives here
│   └── layout.tsx           # root passthrough (next-intl owns <html>)
├── components/              # one file per page section
├── messages/                # i18n strings: ru.json, pt.json
├── i18n/                    # routing.ts (locales), request.ts
├── public/                  # static assets, screenshots, appcast.json
└── next.config.ts
```

## How to edit things

### Change text on the site
All copy lives in `messages/ru.json` and `messages/pt.json`, grouped by section (`Hero`, `Features`, `Compare`, `Faq`, `Download`, etc.). Edit the JSON, save, and the dev server hot-reloads.

### Change colors / theme
Open `app/globals.css`. The `@theme { ... }` block at the top defines the **dark** (default) tokens. The `:root.light { ... }` block overrides them for light mode. Change a value there and every component using that token updates. Key tokens:

| Token            | What it controls        |
| ---------------- | ----------------------- |
| `--color-bg`     | page background         |
| `--color-surface`| cards / raised surfaces |
| `--color-tx`     | primary text            |
| `--color-mut`    | secondary text          |
| `--color-accent` | the blue accent         |
| `--color-line`   | hairline borders        |

### Change a single section
Each section is one file in `components/`:

| Section      | File                    |
| ------------ | ----------------------- |
| Nav bar      | `components/Nav.tsx`     |
| Hero         | `components/Hero.tsx`    |
| Trust band   | `components/SocialProof.tsx` |
| Features     | `components/Features.tsx`|
| Pricing      | `components/Pricing.tsx` |
| FAQ          | `components/Faq.tsx`     |
| Download CTA | `components/Download.tsx`|
| Footer       | `components/Footer.tsx`  |

### Change screenshots
Drop replacements into `public/assets/`. The hero uses `panel-ru-1.png` / `panel-pt-1.png`. Feature crops (RU only) live in `public/assets/crops/`. Keep the same filenames, or update the paths in `Hero.tsx` / `Features.tsx`.

### Change the download link
The `.dmg` URL comes from `public/appcast.json` → `url`. The Download section reads it automatically. **Do not delete `appcast.json`** — installed copies of Kelvin also read it for auto-updates.

## Deploy
Push to `main`. The GitHub Actions workflow in `.github/workflows/` builds and deploys.
