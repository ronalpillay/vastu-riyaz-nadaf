# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static multi-page website for **Riyaz Nadaf**, a Vastu Shastra consultant with 40+ years of experience. No build step — pure HTML/CSS/JS served directly from the filesystem or any static host.

## Development

```bash
python3 -m http.server 8080   # local dev server at http://localhost:8080
```

Open any `.html` file directly in a browser — no server required, but a server avoids browser CORS quirks.

## Site Structure

| File | Purpose |
|------|---------|
| `index.html` | Home — hero, ticker, intro, services, stats, awards marquee |
| `about.html` | Biography and credentials |
| `awards.html` | Awards and recognition |
| `testimonials.html` | Client testimonials |
| `media.html` | Press/media coverage |
| `contact.html` | Consultation booking form |
| `shared.css` | All shared styles (design tokens, nav, buttons, footer, responsive) |
| `shared.js` | All shared interactive behaviour (see JS Patterns below) |

Each page imports `shared.css` + `shared.js` and adds its own `<style>` block for page-specific layout.

**Archive/draft files** — not linked from the nav, do not edit: `index-7.html`, `vastu-riyaz.html`, `vasturiyaznadaf.html`.

## Design System (shared.css)

Design direction: **Old Money / Antique Brass / Aged Parchment** — warm, luxury editorial aesthetic.

**CSS custom properties (defined on `:root`):**
- Colors: `--bg`, `--bg-warm`, `--bg-mid`, `--dark`, `--dark2`, `--brown`, `--muted`, `--lite`
- Antique brass palette: `--g` (base `#8B6914`), `--g2`, `--g3`, `--gp` (pale gold)
- Border/rule: `--rule` (semi-transparent brass)
- Fonts: `--serif` (Cormorant Garamond), `--cap` (Cinzel), `--sans` (Jost)
- Layout: `--nav` (76px fixed navbar height), `--pad` (fluid section padding via `clamp`)

**Shared component classes:**
- Typography: `.tag`, `.h-title`, `.h-lead`
- Buttons: `.btn-dk` (dark fill), `.btn-ol` (outline), `.btn-gol` (gold fill), `.btn-pale` (ghost on dark)
- Navigation: `#navbar` — fixed top bar; add class `home-pg` for transparent-over-hero variant; JS adds `.scrolled` when `scrollY > 60`
- Active nav link: `.act` class on the current page's `<a>`

## Navigation Pattern

Every page replicates the same `<nav id="navbar">` block. The active page's nav link gets class `act`. The home page uses `class="home-pg"` on `#navbar` for the transparent hero treatment; other pages do not.

Mobile nav: `#mBtn` toggles class `.on` on `#mMenu` (the mobile drawer). When open, `#mBtn` text becomes `✕`; when closed, `☰`.

## JS Patterns (shared.js)

All interactive behaviour is in `shared.js` (no framework, plain ES5-style IIFE).

| Pattern | How to use |
|---------|-----------|
| **Scroll reveal** | Add class `r`, `r-l`, or `r-r` to any element — JS adds `.in` via IntersectionObserver |
| **Animated counter** | Add `data-count="40"` (and optionally `data-suffix="+"`) — animates from 0 on scroll |
| **Awards marquee** | Element with `id="awdTrack"` — JS populates it with `Awards/awards1.jpg`–`awards15.jpg` |
| **Cursor glow** | Automatically applied to `.svc-sec`, `.test-sec`, `.feat-awd`, and a few other dark sections |
| **Magnetic buttons** | Automatically applied to `.btn-gol`, `.nav-cta`, `.btn-dk` |
| **Animated rule** | Class `manifesto-rule`, `ft-rule`, `pg-rule`, or `fd-rule` — width animates from 0 on scroll |
| **About parallax** | Applied automatically to `.about-img-col img` / `.about-photo-col img` |
| **Hero parallax** | Applied automatically to `#heroBg` (homepage only) |

## Images

Hero image: `hero Banner.png` (space in filename). Referenced in CSS as `"hero%20Banner.png"`. Other images are in subdirectories: `Archives/`, `Articles/`, `Awards/`, `Testimonials/`.

Awards marquee uses `Awards/awards1.jpg`–`Awards/awards15.jpg` (15 images, doubled in JS to create infinite scroll). `awards9_orig.jpg` is an uncompressed backup — do not add it to the marquee.

Design reference images in the root (`Hero banner design.png`, `Home page fesign.png`, `Sample design Vastu .png`) are client-supplied mockups for reference only — they are not served by the site.

## Contact Form

`contact.html` posts to **formsubmit.co** (action `https://formsubmit.co/rznadaf@gmail.com`). No server-side code. The form is static; submissions go directly to that email address.

## SEO / Static Assets

- `favicon.svg` — inline SVG favicon
- `robots.txt` — allows all crawlers
- `sitemap.xml` — lists all six public pages

## Conventions

- Page-specific styles go in a `<style>` block inside `<head>`, after the `shared.css` link.
- All animations use compositor-friendly properties (`transform`, `opacity`).
- `will-change` is used sparingly and only on animated elements.
- Responsive breakpoints are in `shared.css` via media queries; each page's `<style>` block adds its own mobile overrides at the bottom.
- Font stack: Cinzel (`var(--cap)`) for caps/headings, Cormorant Garamond (`var(--serif)`) for body, Jost (`var(--sans)`) for UI labels.
- Do not reference `vasturiyaznadaf.com` anywhere on the site.
