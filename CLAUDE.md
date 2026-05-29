# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static multi-page website for **Riyaz Nadaf**, a Vastu Shastra consultant with 40+ years of experience. No build step — pure HTML/CSS/JS served directly from the filesystem or any static host.

## Site Structure

| File | Purpose |
|------|---------|
| `index.html` | Home — hero, ticker, intro sections |
| `about.html` | Biography and credentials |
| `awards.html` | Awards and recognition |
| `testimonials.html` | Client testimonials |
| `media.html` | Press/media coverage |
| `contact.html` | Consultation booking form |
| `shared.css` | All shared styles (design tokens, nav, buttons, footer, responsive) |

Each page imports `shared.css` and adds its own `<style>` block for page-specific layout.

## Design System (shared.css)

Design direction: **Old Money / Antique Brass / Aged Parchment** — warm, luxury editorial aesthetic.

**CSS custom properties (defined on `:root`):**
- Colors: `--bg`, `--bg-warm`, `--bg-mid`, `--dark`, `--dark2`, `--brown`, `--muted`, `--lite`
- Antique brass palette: `--g` (base), `--g2`, `--g3`, `--gp` (pale gold)
- Border/rule: `--rule` (semi-transparent brass)
- Fonts: `--serif` (Cormorant Garamond), `--cap` (Cinzel), `--sans` (Jost)
- Layout: `--nav` (76px fixed navbar height), `--pad` (fluid section padding)

**Shared component classes:**
- Typography: `.tag`, `.h-title`, `.h-lead`
- Buttons: `.btn-dk` (dark fill), `.btn-ol` (outline), `.btn-gol` (gold fill), `.btn-pale` (ghost on dark)
- Navigation: `#navbar` — fixed top bar; add class `home-pg` for transparent-over-hero variant; JS adds `.scrolled` on scroll
- Active nav link: `.act` class on the current page's `<a>`

## Navigation Pattern

Every page replicates the same `<nav id="navbar">` block. The active page's nav link gets class `act`. The home page uses `class="home-pg"` on `#navbar` for the transparent hero treatment; other pages do not.

Mobile nav uses a hamburger `#mBtn` that toggles `.open` on `#mNav` (the mobile drawer).

## Images

Hero image: `hero Banner.png` (note the space in filename). Referenced in CSS as `"hero%20Banner.png"`. Other images are in subdirectories: `Archives/`, `Articles/`, `Awards/`, `Testimonials/`.

## Previewing

Open any `.html` file directly in a browser — no server required. For live-reload during development, use any static server (e.g., `python3 -m http.server 8080` or VS Code Live Server).

## Conventions

- Page-specific styles go in a `<style>` block inside `<head>`, after the `shared.css` link.
- All animations use compositor-friendly properties (`transform`, `opacity`).
- `will-change` is used sparingly and only on animated elements.
- Responsive breakpoints are handled in `shared.css` via media queries; each page's `<style>` block adds its own mobile overrides at the bottom.
- Font stack: Cinzel for caps/headings (`var(--cap)`), Cormorant Garamond for body text (`var(--serif)`), Jost for UI labels (`var(--sans)`).
