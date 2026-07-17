# Kelvin Web Redesign — Design Spec

**Date:** 2026-07-17
**Status:** Approved (pending spec review)
**Reference aesthetic:** [makeitfable.com](https://makeitfable.com) — warm, editorial, spacious, calm.

## Context

The current Kelvin landing site (`kelvin-web/`) was built in an "Apple product page" aesthetic —
pure black `#000000` canvas, cold cyan accent `#33c7d1`, glow gradients, and nine back-to-back
sections. The owner is unhappy with the result: it reads as cold and noisy rather than premium.

This spec covers a **visual and structural rebuild** of the landing page. The product content
(what Kelvin is, its features, pricing) is unchanged — only how it's presented.

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
- i18n messages (`ru.json`, `pt.json`) + add missing `en.json`
- `appcast.json` (feeds the in-app updater for installed copies — do not touch)
- `kelvin-web/app/api/latest-version` (version-check endpoint)
- Legal pages: `privacy.html`, `eula.html`, `notes.html` + their routes
- Product assets/screenshots/crops in `public/assets/` and `assets/`
- GitHub Actions deploy workflow in `.github/workflows/`
- Routing and locale structure (`[locale]/`)

## Visual System

Warm editorial aesthetic. Calm, spacious, human — opposite of the cold black/cyan look.

### Color tokens

| Token            | Light (default)        | Dark                   |
| ---------------- | ---------------------- | ---------------------- |
| `--color-bg`     | `#FAFAF7` warm off-white | `#14171C` warm slate   |
| `--color-surface`| `#F2F0EA` warm card     | `#1C2026` raised card  |
| `--color-tx`     | `#1A1A1A`               | `#E8E6E1`              |
| `--color-mut`    | `#5C5C5C`               | `#A8A6A0`              |
| `--color-line`   | `rgba(0,0,0,0.10)` warm | `rgba(255,255,255,0.10)`|
| `--color-accent` | `#2D5F4E` deep green    | `#3A8068` (lighter for contrast) |

Accent is green — deliberately distant from the old cold blue/cyan, and reads as "calm utility".

### Typography
- System font stack (resolves to SF Pro on Mac) — no web-font payload.
- Large, calm headings. Tight letter-spacing on display sizes.
- Generous line-height on body copy.

### Texture rules
- **No pure black, no glow, no grain.**
- One soft shadow on product screenshots only (`--shadow-product`).
- Hairline borders, warm-toned.
- No decorative gradients. A single subtle accent treatment may appear on the price.

### Light theme is default; dark theme via toggle (existing `ThemeToggle` concept reused, restyled).

## Page Structure

**9 sections → 6 sections.** The old Showcase, standalone Download, and standalone Privacy
sections are removed (they duplicated content or belong elsewhere).

1. **Nav** — wordmark "Kelvin" + anchors: Features / Pricing / FAQ / Download. Locale + theme toggle. Minimal.
2. **Hero** — centered. Large calm headline, short lead, two CTAs (Download free / Pro $19), product panel screenshot below, full width. (Layout chosen by owner.)
3. **Features** — 6 features in one clean rhythm:
   - 4 "big" features (Power, Fans, Toggles, Privacy) as alternating text/screenshot-crop rows. Crops only exist for RU layout; other locales fall back to text+icon (preserve current behavior).
   - 2 "quiet" features (Layout, Dev) as a compact two-column text row below.
4. **Pricing** — Free vs Pro, two clean columns. Free = monitoring forever; Pro = $19 one-time control.
5. **FAQ** — retained, restyled.
6. **Download + Footer (combined)** — download CTA at top, then footer with Privacy / EULA / Notes links to their dedicated pages, locale switch, copyright.

### Removed as standalone sections
- **Showcase** — duplicated Features.
- **Download** — folded into Hero CTA + combined footer section.
- **Privacy** — folded into footer links to the existing `/privacy` page.

## Content & i18n

- Preserve all existing copy in `ru.json` and `pt.json`.
- Add `en.json` (currently missing despite being referenced).
- Locale-specific screenshot behavior preserved: RU uses crop images, PT/EN fall back to text+icon.

## Non-Goals

- No change to `appcast.json`, the version API, or legal page content.
- No new framework — staying on Next.js 16 + App Router + `next-intl`.
- No web fonts, no animation libraries. Pure CSS + minimal rAF for reveal-on-scroll (existing pattern).

## Open Questions

None remaining. Owner approved: warm editorial aesthetic, green accent, centered hero with screenshot, 6-section structure, delete-all-visuals / keep-infrastructure scope.
