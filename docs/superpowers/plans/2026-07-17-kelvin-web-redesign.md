# Kelvin Web Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the cold "Apple-black" landing site with a warm-confident Warp-style dark site — new design tokens, rebuilt components, both themes, social proof, giant glowing screenshots — while preserving all product infrastructure.

**Architecture:** Visual rebuild only. Keep Next.js 16 + App Router + `next-intl`, the `[locale]` routing, `appcast.json`, the version API, legal pages, assets, and the GitHub Actions deploy. Wipe the old design system (`globals.css`) and all 13 visual components; rebuild them. The theme system (`.light` class on `<html>` + inline FOUC script) is reused unchanged.

**Tech Stack:** Next.js 16.2.10, React 19, `next-intl` ^4.13, Tailwind CSS v4 (`@tailwindcss/postcss`), TypeScript 5. System font stack (no web fonts). No animation libraries — pure CSS + `IntersectionObserver`.

## Global Constraints

- **Locales:** `ru` (default) and `pt` only — defined in `kelvin-web/i18n/routing.ts`. No `en`.
- **Theme:** Dark is default. Light via `.light` class on `<html>`. No FOUC (inline script in `[locale]/layout.tsx` stays as-is). Both themes must look intentional, not afterthoughts.
- **Do not touch:** `appcast.json`, `app/api/latest-version/route.ts`, `i18n/*`, `middleware` (none exists), `next.config.ts`, `tsconfig.json`, `postcss.config.mjs`, `package.json`, legal page *content* in `app/[locale]/{eula,notes,privacy}/page.tsx`, the `app/[locale]/layout.tsx` FOUC script and metadata, all files under `public/` and `assets/`.
- **No invented data.** Social-proof copy must be truthful (facts about the app: macOS 11+, Apple Silicon, notarized, no subscription, no telemetry). Never fabricate download counts, user counts, or testimonials.
- **Accent color:** calm blue `#58A6FF` (dark) / `#0969DA` (light). No pure `#000000` backgrounds — use `#0D1117` slate.
- **Glow:** only behind product screenshots and a subtle radial in the hero background. Not on cards or buttons.
- **Verification gate:** the project has no test framework (no jest/playwright installed). The per-task test cycle is `npm run build` (catches type errors, broken imports, Next.js compile errors) from `kelvin-web/`. Visual correctness is confirmed by `npm run dev`. Run `npm run build` at the end of every task that changes code and confirm it succeeds before committing.
- **Commits:** one per task, conventional-commit style (`feat(web): ...` / `docs(web): ...`). Working directory is `kelvin-web/` for all `npm`/`npx` commands; repo root `/Users/timmorrison/Kelvin` for `git`.

## File Structure

**Delete entirely (rebuilt):**
- `kelvin-web/app/globals.css` → replaced
- `kelvin-web/app/[locale]/page.tsx` → replaced
- `kelvin-web/components/Nav.tsx` → replaced
- `kelvin-web/components/Hero.tsx` → replaced
- `kelvin-web/components/Features.tsx` → replaced
- `kelvin-web/components/Compare.tsx` → deleted (folded into new Pricing)
- `kelvin-web/components/Showcase.tsx` → deleted (duplicates Features)
- `kelvin-web/components/Pricing.tsx` → replaced
- `kelvin-web/components/Privacy.tsx` → deleted (folded into footer links)
- `kelvin-web/components/Faq.tsx` → replaced
- `kelvin-web/components/Download.tsx` → replaced
- `kelvin-web/components/Footer.tsx` → replaced
- `kelvin-web/components/CountUp.tsx` → deleted (unused in redesign)
- `kelvin-web/components/Reveal.tsx` → replaced
- `kelvin-web/components/icons.tsx` → replaced
- `kelvin-web/components/LegalLayout.tsx` → replaced (made self-contained)

**Keep unchanged:**
- `kelvin-web/components/ThemeToggle.tsx` (theme infra)
- `kelvin-web/components/LocaleSwitcher.tsx` (locale infra)
- `kelvin-web/components/legal-bits.tsx` (legal content)
- `kelvin-web/app/[locale]/layout.tsx`, `kelvin-web/app/layout.tsx`
- `kelvin-web/app/[locale]/{eula,notes,privacy}/page.tsx`
- `kelvin-web/app/api/latest-version/route.ts`
- `kelvin-web/i18n/{routing,request}.ts`
- `kelvin-web/messages/{ru,pt}.json` (extended with a `SocialProof` namespace in Task 6)
- `kelvin-web/public/**` (all assets)

**Create new:**
- `kelvin-web/components/SocialProof.tsx`
- `kelvin-web/README.md`

---

### Task 1: Wipe old front-end, scaffold new design tokens + minimal legal layout

**Goal:** Delete every old visual component, replace `globals.css` with the full new token system, and create a self-contained `LegalLayout` so the whole site still compiles. End state: site builds, home page is a placeholder, legal pages render with the new look.

**Files:**
- Delete: `kelvin-web/components/{Nav,Hero,Features,Compare,Showcase,Pricing,Privacy,Faq,Download,Footer,CountUp,Reveal,icons,LegalLayout}.tsx`
- Create (overwrite): `kelvin-web/app/globals.css`
- Create (overwrite): `kelvin-web/components/LegalLayout.tsx`
- Create (overwrite): `kelvin-web/app/[locale]/page.tsx`

**Interfaces:**
- Produces: `globals.css` exposes tokens `--color-{bg,surface,tx,mut,faint,line,accent,accent-blue,ink}`, utility classes `.btn-primary`, `.btn-secondary`, `.card`, `.text-gradient`, `.glow`, `.reveal`/`.reveal-visible`, `.legal-*`, `.skip-link`, and component-agnostic base styles. `LegalLayout` is a default export taking `{ children: ReactNode }`.

- [ ] **Step 1: Delete the old visual components**

```bash
cd /Users/timmorrison/Kelvin/kelvin-web
rm -f components/Nav.tsx components/Hero.tsx components/Features.tsx components/Compare.tsx components/Showcase.tsx components/Pricing.tsx components/Privacy.tsx components/Faq.tsx components/Download.tsx components/Footer.tsx components/CountUp.tsx components/Reveal.tsx components/icons.tsx components/LegalLayout.tsx
```

- [ ] **Step 2: Write the new `app/globals.css`**

This is the foundation. Dark tokens are the default (`@theme`); light overrides live in `:root.light`.

```css
@import "tailwindcss";

/* =========================================================================
   Kelvin — Warp-style dark design system
   Deep slate canvas · calm blue accent · confident typography ·
   glow reserved for product screenshots only.
   ========================================================================= */

@theme {
  /* accent — calm developer blue */
  --color-accent: #58a6ff;
  --color-accent-blue: #58a6ff;
  --color-ink: #0d1117;

  /* canvas — deep slate, never pure black */
  --color-bg: #0d1117;
  --color-surface: #161b22;

  /* hairline */
  --color-line: rgba(255, 255, 255, 0.1);

  /* text */
  --color-tx: #e6edf3;
  --color-mut: #8b949e;
  --color-faint: #6e7681;

  /* font — system stack resolves to SF Pro on Mac */
  --font-sans: -apple-system, BlinkMacSystemFont, "SF Pro Display",
    "SF Pro Text", "Helvetica Neue", system-ui, sans-serif;

  /* motion */
  --ease-kelvin: cubic-bezier(0.22, 0.61, 0.36, 1);
  --ease-out-kelvin: cubic-bezier(0.16, 1, 0.3, 1);

  /* radii */
  --radius-pill: 980px;
  --radius-shot: 22px;
  --radius-card: 18px;
  --radius-control: 12px;

  /* shadows — product glow + soft card */
  --shadow-product: 0 40px 120px -30px rgba(88, 166, 255, 0.28);
  --shadow-card: 0 2px 8px rgba(0, 0, 0, 0.4);
}

/* ----------------------------------------------------------------------- */
@layer base {
  html {
    scroll-behavior: smooth;
    scroll-padding-top: 5rem;
  }

  /* LIGHT THEME — toggled by .light on <html> (set before paint, no FOUC).
     Only token values change; every component using tokens repaints. */
  :root.light {
    --color-bg: #fafaf7;
    --color-surface: #ffffff;
    --color-line: rgba(0, 0, 0, 0.1);
    --color-tx: #1a1a1a;
    --color-mut: #5c5c5c;
    --color-faint: #86868b;
    --color-accent: #0969da;
    --color-accent-blue: #0969da;
    --color-ink: #1a1a1a;
    --shadow-product: 0 30px 80px -25px rgba(9, 105, 218, 0.18);
    --shadow-card: 0 2px 12px rgba(0, 0, 0, 0.06);
  }

  body {
    font-family: var(--font-sans);
    background: var(--color-bg);
    color: var(--color-tx);
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    letter-spacing: -0.003em;
    overflow-x: hidden;
  }

  /* confident tight headlines */
  h1,
  h2,
  h3 {
    letter-spacing: -0.03em;
    line-height: 1.04;
  }

  /* focus visibility for keyboard users */
  :focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 2px;
    border-radius: 4px;
  }
}

/* ----------------------------------------------------------------------- */
@layer components {
  /* skip link — visible on focus */
  .skip-link {
    position: absolute;
    left: -9999px;
    top: 0;
    z-index: 100;
    background: var(--color-accent);
    color: #fff;
    padding: 0.6rem 1rem;
    border-radius: 0 0 8px 0;
    font-size: 14px;
  }
  .skip-link:focus {
    left: 0;
  }

  /* primary CTA — solid accent, confident */
  .btn-primary {
    display: inline-block;
    background: var(--color-accent);
    color: #fff;
    font-weight: 600;
    font-size: 15px;
    border-radius: var(--radius-pill);
    padding: 0.8rem 1.6rem;
    transition:
      transform 0.15s var(--ease-kelvin),
      filter 0.15s var(--ease-kelvin);
  }
  .btn-primary:hover {
    filter: brightness(1.08);
    transform: translateY(-1px);
  }

  /* secondary CTA — hairline outline */
  .btn-secondary {
    display: inline-block;
    background: transparent;
    color: var(--color-tx);
    border: 1px solid var(--color-line);
    font-weight: 500;
    font-size: 15px;
    border-radius: var(--radius-pill);
    padding: calc(0.8rem - 1px) 1.5rem;
    transition:
      border-color 0.15s var(--ease-kelvin),
      background 0.15s var(--ease-kelvin);
  }
  .btn-secondary:hover {
    border-color: var(--color-accent);
    background: color-mix(in srgb, var(--color-accent) 8%, transparent);
  }

  /* CARD — raised surface with hairline */
  .card {
    background: var(--color-surface);
    border: 1px solid var(--color-line);
    box-shadow: var(--shadow-card);
  }

  /* glow behind a screenshot — radial accent halo */
  .glow::before {
    content: "";
    position: absolute;
    inset: -10% -5% -20% -5%;
    z-index: -1;
    background: radial-gradient(
      60% 50% at 50% 60%,
      color-mix(in srgb, var(--color-accent) 28%, transparent),
      transparent 70%
    );
    pointer-events: none;
  }

  /* gradient text — reserved for the single price emphasis */
  .text-gradient {
    background: linear-gradient(
      135deg,
      var(--color-accent),
      color-mix(in srgb, var(--color-accent) 50%, #a371f7)
    );
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    -webkit-text-fill-color: transparent;
  }

  /* reveal-on-scroll — start hidden, JS adds .reveal-visible */
  .reveal {
    opacity: 0;
    transform: translateY(24px);
    transition:
      opacity 0.6s var(--ease-out-kelvin),
      transform 0.6s var(--ease-out-kelvin);
    will-change: opacity, transform;
  }
  .reveal.reveal-visible {
    opacity: 1;
    transform: none;
  }
  @media (prefers-reduced-motion: reduce) {
    .reveal {
      opacity: 1;
      transform: none;
      transition: none;
    }
  }

  /* legal page typography */
  .legal-p {
    margin: 0.75rem 0;
    font-size: 15px;
    line-height: 1.65;
    color: var(--color-mut);
  }
  .legal-h2 {
    margin: 1.75rem 0 0.5rem;
    font-size: 18px;
    font-weight: 600;
    color: var(--color-tx);
  }
  .legal-ul {
    margin: 0.5rem 0 1rem;
    padding-left: 1.25rem;
    list-style: disc;
    color: var(--color-mut);
    font-size: 15px;
    line-height: 1.7;
  }
  .legal-ul li {
    margin: 0.25rem 0;
  }
}
```

- [ ] **Step 3: Write the new self-contained `components/LegalLayout.tsx`**

The old one imported `Nav` and `Footer`. This version is self-contained — a minimal sticky top bar (wordmark + locale + theme) and a slim footer — so legal pages are independent of the landing-page component set.

```tsx
import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import LocaleSwitcher from "./LocaleSwitcher";
import ThemeToggle from "./ThemeToggle";

export default function LegalLayout({
  children,
}: {
  children: ReactNode;
}) {
  const t = useTranslations("Legal");
  const footer = useTranslations("Footer");

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-bg/85 backdrop-blur-md">
        <nav className="mx-auto flex h-12 max-w-[1024px] items-center justify-between px-5">
          <Link
            href="/"
            className="flex items-center gap-2 text-[14px] font-semibold text-tx"
          >
            <img
              src="/assets/icon.png"
              alt="Kelvin"
              width={18}
              height={18}
              className="rounded-[4px]"
            />
            Kelvin
          </Link>
          <div className="flex items-center gap-4">
            <LocaleSwitcher />
            <ThemeToggle />
          </div>
        </nav>
      </header>

      <main className="flex-1">
        <section className="mx-auto max-w-[47.5rem] px-5 pb-10 pt-24 sm:px-8 sm:pb-20 sm:pt-28 lg:px-8">
          <Link
            href="/"
            className="mb-7 inline-block text-[14px] text-mut transition-colors hover:text-tx"
          >
            {t("back")}
          </Link>
          {children}
        </section>
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto max-w-[1024px] px-5 py-8 text-[13px] text-faint">
          {footer("legal")}
        </div>
      </footer>
    </>
  );
}
```

- [ ] **Step 4: Write the minimal placeholder `app/[locale]/page.tsx`**

This lets the build pass before the real sections exist. Task 11 replaces it with the full assembly.

```tsx
import { setRequestLocale } from "next-intl/server";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main id="main" className="flex-1">
      <div className="mx-auto max-w-[980px] px-5 pt-40 text-center">
        <h1 className="text-[clamp(2.5rem,7vw,4.5rem)] font-bold tracking-[-0.03em] text-tx">
          Kelvin
        </h1>
        <p className="mx-auto mt-4 max-w-[520px] text-mut">
          Rebuild in progress.
        </p>
      </div>
    </main>
  );
}
```

- [ ] **Step 5: Build to verify it compiles**

Run: `cd /Users/timmorrison/Kelvin/kelvin-web && npm run build`
Expected: Build succeeds with no type errors. (Legal pages render via the new `LegalLayout`; home shows the placeholder.)

- [ ] **Step 6: Commit**

```bash
cd /Users/timmorrison/Kelvin
git add -A
git commit -m "feat(web): wipe old front-end, scaffold Warp-style design tokens"
```

---

### Task 2: Reveal + icons primitives

**Goal:** Create the two leaf components every section depends on — scroll reveal and the six feature icons.

**Files:**
- Create: `kelvin-web/components/Reveal.tsx`
- Create: `kelvin-web/components/icons.tsx`

**Interfaces:**
- Produces: `Reveal` — default export, props `{ as?: ElementType; index?: number; className?: string; children: ReactNode }`. Toggles `.reveal-visible` via `IntersectionObserver`. `Icon` — named export, props `{ name: FeatureIcon; width?: number; height?: number; className?: string }` where `FeatureIcon = "power" | "fans" | "toggles" | "layout" | "security" | "dev"`.

- [ ] **Step 1: Write `components/Reveal.tsx`**

```tsx
"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

/**
 * Scroll reveal wrapper. Starts hidden via the `.reveal` class (see
 * globals.css) and adds `.reveal-visible` when scrolled into view.
 * `index` staggers the transition delay.
 */
export default function Reveal({
  as,
  index = 0,
  className = "",
  children,
}: {
  as?: ElementType;
  index?: number;
  className?: string;
  children: ReactNode;
}) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? "reveal-visible" : ""} ${className}`}
      style={{ transitionDelay: `${index * 90}ms` }}
    >
      {children}
    </Tag>
  );
}
```

- [ ] **Step 2: Write `components/icons.tsx`**

```tsx
export type FeatureIcon =
  | "power"
  | "fans"
  | "toggles"
  | "layout"
  | "security"
  | "dev";

const PATHS: Record<FeatureIcon, React.ReactNode> = {
  power: (
    <>
      <path d="M11 3a1 1 0 1 1 2 0v8a1 1 0 1 1-2 0V3z" />
      <path d="M7.5 6.2a7 7 0 1 0 9 0" />
    </>
  ),
  fans: (
    <>
      <circle cx="12" cy="12" r="2.2" />
      <path d="M12 9.8c0-3-1-5.8-1-5.8s-3 .8-3 3.8 4 2 4 2z" />
      <path d="M14.2 12c3 0 5.8-1 5.8-1s-.8-3-3.8-3-2 4-2 4z" />
      <path d="M12 14.2c0 3 1 5.8 1 5.8s3-.8 3-3.8-4-2-4-2z" />
      <path d="M9.8 12c-3 0-5.8 1-5.8 1s.8 3 3.8 3 2-4 2-4z" />
    </>
  ),
  toggles: (
    <>
      <rect x="2" y="6" width="20" height="12" rx="3" />
      <circle cx="16" cy="12" r="2.5" fill="currentColor" stroke="none" />
    </>
  ),
  layout: (
    <>
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <path d="M7 10h2M7 14h6M15 10h2" />
      <path d="m17 6 4 4M17 18l4-4" />
    </>
  ),
  security: (
    <>
      <path d="M12 3 5 6v5c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6l-7-3z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  dev: (
    <>
      <path d="m8 9-3 3 3 3" />
      <path d="m16 9 3 3-3 3" />
      <path d="m13 7-2 10" />
    </>
  ),
};

export function Icon({
  name,
  width = 24,
  height = 24,
  className,
}: {
  name: FeatureIcon;
  width?: number;
  height?: number;
  className?: string;
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {PATHS[name]}
    </svg>
  );
}
```

- [ ] **Step 3: Build to verify**

Run: `cd /Users/timmorrison/Kelvin/kelvin-web && npm run build`
Expected: succeeds (components not yet imported, but typecheck must pass).

- [ ] **Step 4: Commit**

```bash
cd /Users/timmorrison/Kelvin
git add -A
git commit -m "feat(web): add Reveal + feature icon primitives"
```

---

### Task 3: Nav + Footer

**Goal:** The sticky navigation (blur-on-scroll, mobile menu, locale + theme toggles) and the footer (legal links, copyright).

**Files:**
- Create: `kelvin-web/components/Nav.tsx`
- Create: `kelvin-web/components/Footer.tsx`

**Interfaces:**
- Produces: `Nav` default export (no props). `Footer` default export (no props). Both use the `Nav`, `Footer`, `A11y` i18n namespaces already in `messages/{ru,pt}.json`.

- [ ] **Step 1: Write `components/Nav.tsx`**

```tsx
"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import LocaleSwitcher from "./LocaleSwitcher";
import ThemeToggle from "./ThemeToggle";

export default function Nav() {
  const t = useTranslations("Nav");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "/#features", label: t("features") },
    { href: "/#pricing", label: t("pricing") },
    { href: "/#faq", label: t("faq") },
  ] as const;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? "border-b border-line bg-bg/85 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-12 max-w-[1024px] items-center justify-between px-5">
        {/* brand */}
        <Link
          href="/"
          className="flex items-center gap-2 text-[14px] font-semibold text-tx"
        >
          <img
            src="/assets/icon.png"
            alt="Kelvin"
            width={18}
            height={18}
            className="rounded-[4px]"
          />
          <span>Kelvin</span>
        </Link>

        {/* center links — desktop */}
        <div className="hidden items-center gap-7 text-[13px] text-mut md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="transition-colors hover:text-tx"
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* right cluster */}
        <div className="flex items-center gap-4">
          <Link
            href="/#download"
            className="btn-primary hidden !px-4 !py-2 !text-[13px] sm:inline-block"
          >
            {t("download")}
          </Link>
          <span className="hidden md:block">
            <LocaleSwitcher />
          </span>
          <ThemeToggle />
          {/* mobile toggle */}
          <button
            className="text-tx md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={open}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            >
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <>
                  <path d="M3 7h18" />
                  <path d="M3 12h18" />
                  <path d="M3 17h18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* mobile dropdown */}
      {open && (
        <div className="border-t border-line bg-bg/95 px-5 py-2 backdrop-blur-md md:hidden">
          <div className="flex flex-col">
            {[...links, { href: "/#download", label: t("download") }].map(
              (l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-2 py-2.5 text-[14px] text-mut hover:text-tx"
                >
                  {l.label}
                </Link>
              )
            )}
            <div className="px-2 py-2.5">
              <LocaleSwitcher />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
```

- [ ] **Step 2: Write `components/Footer.tsx`**

```tsx
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export default function Footer() {
  const t = useTranslations("Footer");
  const legal = useTranslations("Legal");

  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-[1024px] flex-col gap-4 px-5 py-8 text-[13px] text-faint sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <img
            src="/assets/icon.png"
            alt="Kelvin"
            width={16}
            height={16}
            className="rounded-[3px]"
          />
          <span className="font-medium text-mut">Kelvin</span>
        </div>
        <nav className="flex flex-wrap gap-x-5 gap-y-2">
          <Link href="/privacy" className="transition-colors hover:text-tx">
            {t("privacy")}
          </Link>
          <Link href="/eula" className="transition-colors hover:text-tx">
            {t("eula")}
          </Link>
          <Link href="/notes" className="transition-colors hover:text-tx">
            {legal.notes.title}
          </Link>
          <a
            href="mailto:cambly.studio@gmail.com"
            className="transition-colors hover:text-tx"
          >
            {t("support")}
          </a>
        </nav>
        <p className="sm:text-right">{t("legal")}</p>
      </div>
    </footer>
  );
}
```

- [ ] **Step 3: Build to verify**

Run: `cd /Users/timmorrison/Kelvin/kelvin-web && npm run build`
Expected: succeeds.

- [ ] **Step 4: Commit**

```bash
cd /Users/timmorrison/Kelvin
git add -A
git commit -m "feat(web): add Nav (blur-on-scroll) + Footer"
```

---

### Task 4: Hero

**Goal:** Centered hero with bold headline, lead, two CTAs, and the giant product screenshot with a soft glow over a subtle radial background.

**Files:**
- Create: `kelvin-web/components/Hero.tsx`

**Interfaces:**
- Consumes: `Reveal` (Task 2), `Link` from `@/i18n/routing`. Uses `Hero` i18n namespace. Reads `useLocale()` to pick `panel-ru-1.png` vs `panel-pt-1.png` (existing convention).
- Produces: `Hero` default export (no props).

- [ ] **Step 1: Write `components/Hero.tsx`**

```tsx
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import Reveal from "./Reveal";

export default function Hero() {
  const t = useTranslations("Hero");
  const locale = useLocale();
  const panelSrc = locale === "pt" ? "/assets/panel-pt-1.png" : "/assets/panel-ru-1.png";
  const panelW = locale === "pt" ? 808 : 652;
  const panelH = locale === "pt" ? 2252 : 2072;

  return (
    <section className="relative overflow-hidden px-5 pb-10 pt-32 text-center sm:pt-40">
      {/* subtle radial accent in the background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[600px]"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 0%, color-mix(in srgb, var(--color-accent) 14%, transparent), transparent 70%)",
        }}
      />

      <div className="mx-auto max-w-[980px]">
        <Reveal
          as="p"
          className="mb-5 text-[13px] font-medium uppercase tracking-[0.14em] text-accent"
        >
          {t("eyebrow")}
        </Reveal>

        <Reveal
          as="h1"
          index={1}
          className="text-balance text-[clamp(2.75rem,8vw,5.5rem)] font-bold leading-[1.02] tracking-[-0.035em] text-tx"
        >
          {t("title")}
        </Reveal>

        <Reveal
          as="p"
          index={2}
          className="mx-auto mt-6 max-w-[640px] text-pretty text-[clamp(1.125rem,2.2vw,1.375rem)] leading-snug text-mut"
        >
          {t("lead")}
        </Reveal>

        <Reveal index={3} className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/#download" className="btn-primary">
            {t("ctaPrimary")}
          </Link>
          <Link href="/#pricing" className="btn-secondary">
            {t("ctaSecondary")}
          </Link>
        </Reveal>

        <Reveal index={4} as="p" className="mt-6 text-[13px] text-faint">
          {t("micro")}
        </Reveal>
      </div>

      {/* giant product screenshot with glow */}
      <Reveal index={5} className="relative mx-auto mt-16 w-fit lg:mt-20">
        <div className="glow relative">
          <Image
            src={panelSrc}
            alt={t("title")}
            width={panelW}
            height={panelH}
            priority
            fetchPriority="high"
            quality={80}
            sizes="(max-width: 768px) 88vw, 480px"
            className="mx-auto h-auto w-auto max-h-[72vh] rounded-[22px] border border-line"
            style={{
              aspectRatio: `${panelW} / ${panelH}`,
              boxShadow: "var(--shadow-product)",
            }}
          />
        </div>
      </Reveal>
    </section>
  );
}
```

- [ ] **Step 2: Build to verify**

Run: `cd /Users/timmorrison/Kelvin/kelvin-web && npm run build`
Expected: succeeds.

- [ ] **Step 3: Commit**

```bash
cd /Users/timmorrison/Kelvin
git add -A
git commit -m "feat(web): add centered Hero with glowing screenshot"
```

---

### Task 5: Add SocialProof i18n keys

**Goal:** Add a `SocialProof` namespace to both message files with truthful pills. This is its own task because it's the prerequisite for the component and keeps the diff reviewable.

**Files:**
- Modify: `kelvin-web/messages/ru.json`
- Modify: `kelvin-web/messages/pt.json`

**Interfaces:**
- Produces: `SocialProof` namespace with key `pills` = array of 4 strings, in each locale.

- [ ] **Step 1: Add `SocialProof` to `messages/ru.json`**

Insert this object as a new top-level key (e.g. after the `Hero` block), keeping valid JSON:

```json
  "SocialProof": {
    "pills": [
      "macOS 11+",
      "Intel и Apple Silicon",
      "Нотаризовано Apple",
      "Без подписки"
    ]
  },
```

- [ ] **Step 2: Add `SocialProof` to `messages/pt.json`**

```json
  "SocialProof": {
    "pills": [
      "macOS 11+",
      "Intel e Apple Silicon",
      "Notarizado pela Apple",
      "Sem subscrição"
    ]
  },
```

- [ ] **Step 3: Validate both files are valid JSON**

Run: `cd /Users/timmorrison/Kelvin/kelvin-web && node -e "JSON.parse(require('fs').readFileSync('messages/ru.json','utf8')); JSON.parse(require('fs').readFileSync('messages/pt.json','utf8')); console.log('OK')"`
Expected: prints `OK`.

- [ ] **Step 4: Commit**

```bash
cd /Users/timmorrison/Kelvin
git add -A
git commit -m "feat(web): add SocialProof i18n keys (ru, pt)"
```

---

### Task 6: SocialProof band

**Goal:** A centered band of honest trust pills below the hero — no fabricated stats.

**Files:**
- Create: `kelvin-web/components/SocialProof.tsx`

**Interfaces:**
- Consumes: `SocialProof` i18n namespace (Task 5).
- Produces: `SocialProof` default export (no props).

- [ ] **Step 1: Write `components/SocialProof.tsx`**

```tsx
import { useTranslations } from "next-intl";
import Reveal from "./Reveal";

export default function SocialProof() {
  const t = useTranslations("SocialProof");
  const pills = t.raw("pills") as string[];

  return (
    <section className="border-y border-line bg-surface/40">
      <Reveal className="mx-auto flex max-w-[980px] flex-wrap items-center justify-center gap-x-8 gap-y-3 px-5 py-7">
        {pills.map((pill) => (
          <span
            key={pill}
            className="flex items-center gap-2 text-[14px] font-medium text-mut"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-accent"
              aria-hidden
            >
              <path d="m5 12 5 5 9-9" />
            </svg>
            {pill}
          </span>
        ))}
      </Reveal>
    </section>
  );
}
```

- [ ] **Step 2: Build to verify**

Run: `cd /Users/timmorrison/Kelvin/kelvin-web && npm run build`
Expected: succeeds.

- [ ] **Step 3: Commit**

```bash
cd /Users/timmorrison/Kelvin
git add -A
git commit -m "feat(web): add SocialProof trust band"
```

---

### Task 7: Features

**Goal:** Six features in one clean rhythm — four big alternating text/screenshot rows (Power, Fans, Toggles, Security) and two quiet text rows (Layout, Dev). Preserves the locale behavior: RU shows crop screenshots, PT falls back to text+icon.

**Files:**
- Create: `kelvin-web/components/Features.tsx`

**Interfaces:**
- Consumes: `Reveal` (Task 2), `Icon` from `icons.tsx` (Task 2), `Features` i18n namespace. Receives `{ locale: string }` prop from `page.tsx` to decide crops. Crop assets at `/assets/crops/ru-{power,fans,toggles,settings}.png`.
- Produces: `Features` default export, props `{ locale: string }`.

- [ ] **Step 1: Write `components/Features.tsx`**

```tsx
import { useTranslations } from "next-intl";
import Image from "next/image";
import Reveal from "./Reveal";
import { Icon, type FeatureIcon } from "./icons";

export default function Features({ locale }: { locale: string }) {
  const t = useTranslations("Features");
  // Crop screenshots only exist for the RU panel layout.
  // On other locales, fall back to text+icon for all features so visitors
  // never see screenshots with foreign-language labels.
  const hasCrops = locale === "ru";

  const big: {
    key: "power" | "fans" | "toggles" | "security";
    crop: string;
    cropW: number;
    cropH: number;
    flip?: boolean;
  }[] = [
    { key: "power", crop: "/assets/crops/ru-power.png", cropW: 652, cropH: 207 },
    { key: "fans", crop: "/assets/crops/ru-fans.png", cropW: 652, cropH: 210, flip: true },
    { key: "toggles", crop: "/assets/crops/ru-toggles.png", cropW: 652, cropH: 214 },
    { key: "security", crop: "/assets/crops/ru-settings.png", cropW: 652, cropH: 267, flip: true },
  ];

  const quiet: ("layout" | "dev")[] = ["layout", "dev"];

  return (
    <section id="features" className="border-t border-line">
      {/* heading */}
      <div className="mx-auto max-w-[980px] px-5 pt-24 pb-6 text-center sm:pt-32">
        <Reveal as="p" className="mb-4 text-[13px] font-medium uppercase tracking-[0.14em] text-accent">
          {t("eyebrow")}
        </Reveal>
        <Reveal as="h2" index={1} className="text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-[-0.03em] text-tx">
          {t("title")}
        </Reveal>
      </div>

      {hasCrops ? (
        <div>
          {big.map((f) => (
            <BigFeature
              key={f.key}
              icon={f.key}
              title={t(`${f.key}.title`)}
              desc={t(`${f.key}.desc`)}
              crop={f.crop}
              cropW={f.cropW}
              cropH={f.cropH}
              flip={f.flip}
            />
          ))}
        </div>
      ) : (
        <div className="mx-auto max-w-[980px] px-5">
          <div className="grid gap-12 sm:grid-cols-2 sm:gap-x-16 sm:gap-y-16">
            {[...big.map((b) => b.key), ...quiet].map((k) => (
              <TextFeature key={k} icon={k} title={t(`${k}.title`)} desc={t(`${k}.desc`)} />
            ))}
          </div>
        </div>
      )}

      {/* RU: two quieter text-only features below the crops */}
      {hasCrops && (
        <div className="mx-auto max-w-[980px] px-5 py-24 sm:py-32">
          <div className="grid gap-12 sm:grid-cols-2 sm:gap-16">
            {quiet.map((k) => (
              <TextFeature key={k} icon={k} title={t(`${k}.title`)} desc={t(`${k}.desc`)} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

function BigFeature({
  icon,
  title,
  desc,
  crop,
  cropW,
  cropH,
  flip,
}: {
  icon: FeatureIcon;
  title: string;
  desc: string;
  crop: string;
  cropW: number;
  cropH: number;
  flip?: boolean;
}) {
  return (
    <div className="border-t border-line">
      <div className="mx-auto grid max-w-[980px] items-center gap-10 px-5 py-20 sm:py-28 lg:grid-cols-2 lg:gap-16">
        <Reveal className={flip ? "lg:order-2 lg:text-left" : "lg:order-1"}>
          <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-[14px] border border-line bg-surface text-accent">
            <Icon name={icon} width={24} height={24} />
          </span>
          <h3 className="text-[clamp(1.75rem,4vw,2.5rem)] font-bold tracking-[-0.025em] text-tx">
            {title}
          </h3>
          <p className="mt-4 max-w-md text-[clamp(1.0625rem,1.8vw,1.25rem)] leading-relaxed text-mut">
            {desc}
          </p>
        </Reveal>
        <Reveal index={1} className={flip ? "lg:order-1" : "lg:order-2"}>
          <div className="glow relative">
            <Image
              src={crop}
              alt={title}
              width={cropW}
              height={cropH}
              quality={80}
              sizes="(max-width: 768px) 90vw, 460px"
              className="h-auto w-full rounded-[18px] border border-line"
              style={{
                aspectRatio: `${cropW} / ${cropH}`,
                boxShadow: "var(--shadow-product)",
              }}
            />
          </div>
        </Reveal>
      </div>
    </div>
  );
}

function TextFeature({
  icon,
  title,
  desc,
}: {
  icon: FeatureIcon;
  title: string;
  desc: string;
}) {
  return (
    <Reveal>
      <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-[12px] border border-line bg-surface text-accent">
        <Icon name={icon} width={22} height={22} />
      </span>
      <h3 className="text-[24px] font-bold tracking-[-0.02em] text-tx">{title}</h3>
      <p className="mt-3 text-[17px] leading-relaxed text-mut">{desc}</p>
    </Reveal>
  );
}
```

- [ ] **Step 2: Build to verify**

Run: `cd /Users/timmorrison/Kelvin/kelvin-web && npm run build`
Expected: succeeds.

- [ ] **Step 3: Commit**

```bash
cd /Users/timmorrison/Kelvin
git add -A
git commit -m "feat(web): add Features (big rows + quiet rows, locale crops)"
```

---

### Task 8: Pricing (Free vs Pro)

**Goal:** Two clean columns comparing Free and Pro, using the existing `Compare` i18n namespace.

**Files:**
- Create: `kelvin-web/components/Pricing.tsx`

**Interfaces:**
- Consumes: `Reveal` (Task 2), `Link` from `@/i18n/routing`, `Compare` i18n namespace. The namespace has `free.{name,price,period,features[]}` and `pro.{badge,name,price,period,features[],cta}`.
- Produces: `Pricing` default export (no props).

- [ ] **Step 1: Write `components/Pricing.tsx`**

```tsx
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import Reveal from "./Reveal";

export default function Pricing() {
  const t = useTranslations("Compare");
  const freeFeatures = t.raw("free.features") as string[];
  const proFeatures = t.raw("pro.features") as string[];

  return (
    <section id="pricing" className="border-t border-line">
      <div className="mx-auto max-w-[980px] px-5 py-24 sm:py-32">
        <Reveal as="p" className="mb-4 text-center text-[13px] font-medium uppercase tracking-[0.14em] text-accent">
          {t("eyebrow")}
        </Reveal>
        <Reveal as="h2" index={1} className="mx-auto max-w-[680px] text-balance text-center text-[clamp(2rem,5vw,3.25rem)] font-bold tracking-[-0.03em] text-tx">
          {t("title")}
        </Reveal>
        <Reveal as="p" index={2} className="mx-auto mt-4 max-w-[560px] text-center text-mut">
          {t("sub")}
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {/* Free */}
          <Reveal className="card rounded-[18px] p-8">
            <h3 className="text-[20px] font-bold text-tx">{t("free.name")}</h3>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-[42px] font-bold tracking-[-0.02em] text-tx">
                {t("free.price")}
              </span>
              <span className="text-[14px] text-faint">{t("free.period")}</span>
            </div>
            <ul className="mt-6 space-y-3">
              {freeFeatures.map((f) => (
                <li key={f} className="flex gap-3 text-[15px] text-mut">
                  <Check />
                  {f}
                </li>
              ))}
            </ul>
            <Link href="/#download" className="btn-secondary mt-8 w-full text-center">
              {t("free.name")}
            </Link>
          </Reveal>

          {/* Pro — emphasized */}
          <Reveal
            index={1}
            className="card relative overflow-hidden rounded-[18px] p-8 ring-1 ring-accent/40"
          >
            <span className="absolute right-5 top-5 rounded-full bg-accent px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
              {t("pro.badge")}
            </span>
            <h3 className="text-[20px] font-bold text-tx">{t("pro.name")}</h3>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-gradient text-[48px] font-bold tracking-[-0.02em]">
                {t("pro.price")}
              </span>
              <span className="text-[14px] text-faint">{t("pro.period")}</span>
            </div>
            <ul className="mt-6 space-y-3">
              {proFeatures.map((f) => (
                <li key={f} className="flex gap-3 text-[15px] text-tx">
                  <Check />
                  {f}
                </li>
              ))}
            </ul>
            <Link href="/#download" className="btn-primary mt-8 w-full text-center">
              {t("pro.cta")}
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Check() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mt-0.5 shrink-0 text-accent"
      aria-hidden
    >
      <path d="m5 12 5 5 9-9" />
    </svg>
  );
}
```

- [ ] **Step 2: Build to verify**

Run: `cd /Users/timmorrison/Kelvin/kelvin-web && npm run build`
Expected: succeeds.

- [ ] **Step 3: Commit**

```bash
cd /Users/timmorrison/Kelvin
git add -A
git commit -m "feat(web): add Pricing (Free vs Pro two-column)"
```

---

### Task 9: FAQ

**Goal:** Accessible disclosure list using the existing `Faq` i18m namespace.

**Files:**
- Create: `kelvin-web/components/Faq.tsx`

**Interfaces:**
- Consumes: `Reveal` (Task 2), `Faq` i18n namespace with `title` and `items[]` (`{ q, a }`).
- Produces: `Faq` default export (no props).

- [ ] **Step 1: Write `components/Faq.tsx`**

```tsx
"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Reveal from "./Reveal";

type FaqItem = { q: string; a: string };

export default function Faq() {
  const t = useTranslations("Faq");
  const items = t.raw("items") as FaqItem[];
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="border-t border-line">
      <div className="mx-auto max-w-[760px] px-5 py-24 sm:py-32">
        <Reveal as="h2" className="mb-10 text-center text-[clamp(2rem,5vw,3rem)] font-bold tracking-[-0.03em] text-tx">
          {t("title")}
        </Reveal>

        <div className="divide-y divide-line border-y border-line">
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={item.q} index={i % 3}>
                <h3>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  >
                    <span className="text-[17px] font-medium text-tx">
                      {item.q}
                    </span>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      className={`shrink-0 text-mut transition-transform duration-200 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                      aria-hidden
                    >
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </button>
                </h3>
                <div
                  className={`grid transition-all duration-200 ${
                    isOpen
                      ? "grid-rows-[1fr] pb-5 opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <p className="overflow-hidden text-[15px] leading-relaxed text-mut">
                    {item.a}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Build to verify**

Run: `cd /Users/timmorrison/Kelvin/kelvin-web && npm run build`
Expected: succeeds.

- [ ] **Step 3: Commit**

```bash
cd /Users/timmorrison/Kelvin
git add -A
git commit -m "feat(web): add accessible FAQ disclosure list"
```

---

### Task 10: Download CTA section

**Goal:** Final download call-to-action before the footer, using the `Download` namespace and linking to the DMG URL from `appcast.json`.

**Files:**
- Create: `kelvin-web/components/Download.tsx`

**Interfaces:**
- Consumes: `Reveal` (Task 2), `Link` from `@/i18n/routing`, `Download` i18n namespace. Reads the DMG URL from `public/appcast.json` via `resolveJsonModule` (already enabled in `tsconfig.json`).
- Produces: `Download` default export (no props).

- [ ] **Step 1: Write `components/Download.tsx`**

```tsx
import { useTranslations } from "next-intl";
import Reveal from "./Reveal";
import appcast from "@/public/appcast.json";

export default function Download() {
  const t = useTranslations("Download");

  return (
    <section id="download" className="border-t border-line">
      <Reveal className="mx-auto max-w-[980px] px-5 py-24 text-center sm:py-32">
        <h2 className="text-[clamp(2rem,5vw,3.25rem)] font-bold tracking-[-0.03em] text-tx">
          {t("title")}
        </h2>
        <p className="mx-auto mt-4 max-w-[520px] text-mut">{t("lead")}</p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a href={appcast.url} className="btn-primary">
            {t("ctaPrimary")}
          </a>
          <a
            href="https://trykelvin.lemonsqueezy.com/checkout/buy/9f0f7e7c-7be9-4def-94e2-99b8e2c6b801"
            className="btn-secondary"
          >
            {t("ctaSecondary")}
          </a>
        </div>

        <p className="mx-auto mt-6 max-w-[560px] text-[13px] leading-relaxed text-faint">
          {t("micro")}
        </p>
      </Reveal>
    </section>
  );
}
```

Note: the Lemon Squeezy checkout URL is a placeholder in this step. The implementer should confirm the real URL with the owner before deploy; if unknown, link to `/#pricing` instead.

- [ ] **Step 2: Build to verify**

Run: `cd /Users/timmorrison/Kelvin/kelvin-web && npm run build`
Expected: succeeds.

- [ ] **Step 3: Commit**

```bash
cd /Users/timmorrison/Kelvin
git add -A
git commit -m "feat(web): add Download CTA section"
```

---

### Task 11: Assemble the landing page

**Goal:** Wire all sections together in the final order: Nav → Hero → SocialProof → Features → Pricing → Faq → Download → Footer.

**Files:**
- Create (overwrite): `kelvin-web/app/[locale]/page.tsx`

**Interfaces:**
- Consumes: all section components from Tasks 3,4,6,7,8,9,10.

- [ ] **Step 1: Write `app/[locale]/page.tsx`**

```tsx
import { setRequestLocale } from "next-intl/server";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import SocialProof from "@/components/SocialProof";
import Features from "@/components/Features";
import Pricing from "@/components/Pricing";
import Faq from "@/components/Faq";
import Download from "@/components/Download";
import Footer from "@/components/Footer";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Nav />
      <main id="main" className="flex-1">
        <Hero />
        <SocialProof />
        <Features locale={locale} />
        <Pricing />
        <Faq />
        <Download />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Build the whole site**

Run: `cd /Users/timmorrison/Kelvin/kelvin-web && npm run build`
Expected: succeeds; all routes (`/ru`, `/pt`, `/ru/privacy`, `/ru/eula`, `/ru/notes`, `/pt/...`) render.

- [ ] **Step 3: Smoke-test both locales in dev**

Run: `cd /Users/timmorrison/Kelvin/kelvin-web && npm run dev`
Then open `http://localhost:3000/ru` and `http://localhost:3000/pt`. Confirm: dark theme loads by default, theme toggle switches to light, hero screenshot shows with glow, RU shows crop screenshots in Features while PT shows text+icon, FAQ expands/collapses, download buttons link out. Stop the dev server when done.

- [ ] **Step 4: Commit**

```bash
cd /Users/timmorrison/Kelvin
git add -A
git commit -m "feat(web): assemble landing page — all sections wired"
```

---

### Task 12: README for owner editing

**Goal:** A `kelvin-web/README.md` that lets the owner run, edit, and maintain the site themselves.

**Files:**
- Create: `kelvin-web/README.md`

- [ ] **Step 1: Write `kelvin-web/README.md`**

````markdown
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
````

- [ ] **Step 2: Commit**

```bash
cd /Users/timmorrison/Kelvin
git add -A
git commit -m "docs(web): add README for owner editing"
```

---

## Done criteria

- `npm run build` succeeds with zero errors from `kelvin-web/`.
- Both `/ru` and `/pt` render correctly; dark is default, light toggle works.
- RU locale shows crop screenshots in Features; PT shows text+icon.
- Legal pages (`/privacy`, `/eula`, `/notes`) render with the new look via the self-contained `LegalLayout`.
- `appcast.json`, the version API, and the GitHub Actions workflow are untouched.
- `kelvin-web/README.md` exists and documents how to run and edit the site.
```
