# S.Prestige Services — Website

Marketing and lead-generation website for **S.Prestige Services**, Kissonerga, Pafos.
Production: **https://s-prestige.com.cy**

The site is a static, content-driven build. There is no database and no backend
server — every page is pre-rendered to HTML at build time and served as static
files. Customer conversion happens through WhatsApp deep links, not forms.

---

## Stack

| Layer | Technology |
|---|---|
| Framework | [Astro 4](https://astro.build) (static output) |
| Interactive islands | React 18 (hydrated only where needed) |
| Content | MDX collections, validated with [Zod](https://zod.dev) |
| Styling | Tailwind CSS 3 (dark-mode only) |
| Animation | Framer Motion (respects `prefers-reduced-motion`) |
| Icons | lucide-react |
| Fonts | Fraunces (display) + Inter (body), self-hosted via Fontsource |
| Hosting | Vercel (auto-deploy from `main`) |

No runtime environment variables are required to build or serve the site.

---

## Requirements

- **Node.js 20+** (or 18.20.8+ / 22+)
- npm (a `package-lock.json` is committed — use `npm ci` for reproducible installs)

---

## Quick start

```bash
npm ci            # install exact pinned dependencies
npm run dev       # local dev server at http://localhost:4321
```

### Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the dev server with hot reload |
| `npm run build` | Production build to `dist/` (then prunes orphan raster files) |
| `npm run preview` | Serve the built `dist/` locally to verify a production build |
| `npm run check` | Type-check and validate Astro components and content schemas |

---

## Project structure

```
src/
├─ assets/            Images processed by Astro's image pipeline (optimized at build)
│  └─ fleet/          Per-vehicle photo folders for sale/rental listings
├─ components/        Astro + React UI components
│  ├─ cta/            WhatsApp call-to-action buttons
│  ├─ fx/             Motion / visual-effect components
│  ├─ nav/            Header and navigation
│  └─ primitives/     Low-level building blocks
├─ content/           MDX content collections (see "Content model" below)
│  └─ config.ts       Zod schemas — the single source of truth for content shape
├─ layouts/           Page shells
├─ lib/
│  ├─ wa.ts           WhatsApp numbers + message templates (see below)
│  ├─ seo.ts          Site metadata, address, canonical/JSON-LD helpers
│  └─ motion.ts       Shared Framer Motion variants
├─ pages/             Routes (file-based routing)
│  ├─ detailing/      Detailing service pages (copy + prices live here)
│  ├─ buy-sell/       Buy & sell listing pages
│  ├─ legal/          Privacy / Terms
│  └─ tourism/        Rentals (and legacy excursions)
└─ styles/            Global CSS + design tokens

public/                Served as-is, NOT optimized — keep files web-ready
├─ imagery/            Pre-optimized WebP imagery
├─ og/                 Open Graph social-share images (1200×630)
├─ logo-mark.png       Raster logo (used in JSON-LD / Knowledge Panel)
├─ favicon.svg
└─ robots.txt
```

---

## Content model

Structured content lives in `src/content/` as MDX files, with shape enforced by
Zod schemas in [`src/content/config.ts`](src/content/config.ts). To add or change
a listing, edit the MDX file — the schema will reject invalid data at build time.

| Collection | Location | Holds |
|---|---|---|
| `fleet` | `src/content/fleet/*.mdx` | Cars for **sale** and for **rental**, discriminated by `listingType` |
| `excursions` | `src/content/excursions/*.mdx` | Day trips / safaris (retained from earlier scope) |
| `testimonials` | `src/content/testimonials/*.mdx` | Customer reviews |
| `services` | `src/content/services/` | Collection is defined but currently empty — **detailing service copy and prices are authored directly in `src/pages/detailing/*.astro`** |

### Adding a car listing (sale)

1. Drop the vehicle's photos into a new folder
   `src/assets/fleet/<make>-<model>-<year>-sale/` and name them in display order
   (e.g. `01-front-hero.jpg`, `02-front-3q.jpg`, `03-rear-left.jpg`, …).
2. Create `src/content/fleet/<slug>-sale.mdx` and fill the frontmatter to match the
   `fleet` schema in `config.ts` (`listingType: sale`, `priceEUR`, `mileageKm`,
   `make`, `model`, `year`, `images`, etc.).
3. Set `order` to the next number after the last sale listing.
4. Run `npm run check` to validate, then `npm run dev` to preview.

Rental listings follow the same shape with `listingType: rental` and rate fields.

---

## Conventions worth knowing before you edit

These are deliberate product decisions, not accidents. Keep them intact unless the
business asks otherwise.

- **Two lanes.** Every page below the homepage belongs to exactly one lane:
  **Auto** (detailing, mechanical, recovery, buy & sell, transfers) or **Rentals**
  (car rentals only). A lane page never shows the other lane's contact. In code the
  rentals lane is still named `tourism` for routing stability — it surfaces as
  "Rentals" in the UI.
- **WhatsApp-first conversion.** Primary calls-to-action build a `wa.me` link via
  [`src/lib/wa.ts`](src/lib/wa.ts). Numbers and message templates are centralized
  there — **never hard-code a WhatsApp number elsewhere.** Three lines exist:
  two Auto-desk lines and one Rentals-desk line.
- **Prices are published.** Every service and listing shows a real starting price.
  "Contact for quote" is intentionally avoided.
- **Dark mode only.** There is no light theme. Palette: black canvas `#0A0A0A`
  + gold `#F5C518`. Tokens live in `src/styles/` and `tailwind.config.mjs`.
- **Motion is optional.** All animations route through `src/lib/motion.ts` and
  must honour `prefers-reduced-motion`.

---

## Deployment

The site is hosted on **Vercel** and auto-deploys on every push to **`main`**.
A push typically goes live in 30–90 seconds. There is no staging branch; Vercel's
per-commit Preview Deployments serve that role — open the preview URL Vercel posts
on a branch/commit before merging anything risky.

Build command: `npm run build` · Output directory: `dist/` · Framework preset: Astro.

> **Ownership transfer of the Vercel project, domain DNS, and repository is covered
> separately in [`HANDOVER.md`](HANDOVER.md). Read it first.**
