# Kelvin Web Redesign — Design Spec

**Date:** 2026-07-17
**Status:** Approved (v2 — Warp direction)
**Primary reference:** [warp.dev](https://www.warp.dev) — dark, confident, dev-premium, giant product screenshots.
**Secondary:** both light and dark themes implemented (dark default).

## Context

The current Kelvin landing site (`kelvin-web/`) was built in an "Apple product page" aesthetic —
pure black `#000000` canvas, cold cyan accent `#33c7d1`, glow gradients, and nine back-to-back
sections. The owner is unhappy: it reads as cold and noisy rather than premium.

The owner's chosen direction is **Warp-style**: a dark, confident dev-premium aesthetic that fits
Kelvin's audience (Mac power users, developers) — the same audience Warp targets. This spec covers
a visual and structural rebuild. Product content is unchanged.

## Product (unchanged)

Kelvin is a native macOS menu-bar multitool. Free forever for monitoring; **Kelvin Pro is a
one-time $19** purchase for control features. Supports macOS 11+, Intel and Apple Silicon.
Locally processed, no telemetry.

### Features (6)
1. **Power** — charge ring, live usage graph, interactive SMC energy-flow diagram
2. **Fans** — profiles: constant RPM, sensor curve, auto; overheat protection; one-click daemon
3. **Toggles** — Wi-Fi, Bluetooth, Night Shift, dark mode, keyboard backlight + custom command tiles
4. **Layout RU↔EN** — local Punto Switcher replacement: layout fix + hotkey switch, no cloud
5. **Privacy/Firewall** — built-in ALF, incoming panic block, domain blocking, quarantine, Gatekeeper
6. **Dev tools** — Homebrew/IDEs/libs from menu, resolution switch, Finder toggles, CPU/RAM menu meters

## Scope

### Delete (rebuild from scratch)
- All 17 components in `kelvin-web/components/`
- The entire design system in `kelvin-web/app/globals.css`
- The 9-section page structure in `kelvin-web/app/[locale]/page.tsx`

### Keep (infrastructure, not visual)
- Next.js 16 skeleton, App Router, `next-intl`
- i18n messages (`ru.json`, `pt.json`) — locales are `ru` (default) and `pt` only
- `appcast.json` (feeds the in-app updater — do not touch)
- `kelvin-web/app/api/latest-version` (version-check endpoint)
- Legal pages: `privacy.html`, `eula.html`, `notes.html` + their routes
- Product assets/screenshots/crops in `public/assets/` and `assets/`
- GitHub Actions deploy workflow in `.github/workflows/`
- Routing and locale structure (`[locale]/`)

## Visual System

Dark, confident, dev-premium. Like Warp.

### Color tokens

| Token            | Dark (default)            | Light                   |
| ---------------- | ------------------------- | ----------------------- |
| `--color-bg`     | `#0D1117` (GitHub-slate)  | `#FAFAF7` warm off-white|
| `--color-surface`| `#161B22` raised card     | `#FFFFFF` clean card    |
| `--color-tx`     | `#E6EDF3`                 | `#1A1A1A`               |
| `--color-mut`    | `#8B949E`                 | `#5C5C5C`               |
| `--color-line`   | `rgba(255,255,255,0.10)`  | `rgba(0,0,0,0.10)`      |
| `--color-accent` | `#58A6FF` (GitHub blue)   | `#0969DA`               |

Accent is a calm blue — reads as "developer tool," consistent with Warp/Linear/GitHub dark UIs.

### Typography
- System font stack (resolves to SF Pro on Mac) — no web-font payload.
- **Bold, confident display headings** — large sizes, tight tracking, high contrast weight.
- Generous line-height on body copy.

### Texture rules
- **Glow is back** — but purposeful: a soft radial glow behind product screenshots only, not on every surface.
- Subtle radial accent gradients in hero background (dark, subtle — like Warp's).
- Hairline borders.
- No pure `#000000`; use `#0D1117` slate for depth without flatness.

### Theme system
- **Dark is default.**
- Light theme fully implemented via toggle (existing `ThemeToggle` concept reused, restyled).
- No FOUC: theme class set before paint (existing pattern with `.light` on `<html>`).

## Page Structure

**9 sections → 7 sections.** The old Showcase and standalone Download are removed (they
duplicated content). A new social-proof section is added.

1. **Nav** — wordmark "Kelvin" + anchors: Features / Pricing / FAQ / Download. Locale + theme toggle. Sticky, subtle blur on scroll.

2. **Hero** — centered. Bold headline, short lead, two CTAs (Download free / Pro $19). **Giant product panel screenshot below, full width, with soft glow.** Subtle radial accent in background. (Layout approved by owner.)

3. **Social proof (NEW)** — a band of trust signals below the hero. Content to be supplied by owner (download count, user quotes, or logos). Falls back gracefully to a single strong stat if no data yet.

4. **Features** — 6 features in one clean rhythm:
   - 4 "big" features (Power, Fans, Toggles, Privacy) as alternating text/**large screenshot** rows with glow. Crops only exist for RU layout; PT falls back to text+icon (preserve current behavior).
   - 2 "quiet" features (Layout, Dev) as a compact two-column text row below.

5. **Pricing** — Free vs Pro, two clean columns. Free = monitoring forever; Pro = $19 one-time control.

6. **FAQ** — retained, restyled.

7. **Download + Footer (combined)** — download CTA at top, then footer with Privacy / EULA / Notes links, locale switch, copyright.

### Removed as standalone sections
- **Showcase** — duplicated Features.
- **Download** — folded into Hero CTA + combined footer section.
- **Privacy** — folded into footer links to the existing `/privacy` page.

## Content & i18n

- Locales are `ru` (default) and `pt` only — configured in `i18n/routing.ts`.
- Preserve all existing copy in `ru.json` and `pt.json`.
- Locale-specific screenshot behavior preserved: RU uses crop images, PT falls back to text+icon.

## README for owner editing

A `kelvin-web/README.md` will be created so the owner can edit and maintain the code themselves.
It will document:
- How to run the dev server (`npm run dev`) and build (`npm run build`)
- Project structure overview (where components, pages, styles, i18n live)
- How to edit each section (file paths + what to change)
- How to add/modify i18n strings
- How to change colors and theme tokens (the single `globals.css` token block)
- How to change screenshots/assets
- How to deploy

## Non-Goals

- No change to `appcast.json`, the version API, or legal page content.
- No new framework — staying on Next.js 16 + App Router + `next-intl`.
- No web fonts, no animation libraries. Pure CSS + minimal rAF for reveal-on-scroll (existing pattern).

## Open Questions

None remaining. Owner approved (v2): Warp-style dark primary, both themes implemented, giant screenshots with glow, social proof section, bold typography, README for self-editing.
