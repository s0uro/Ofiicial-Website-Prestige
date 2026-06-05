# Handover — S.Prestige Services Website

This document is for the person taking over technical ownership of the
**s-prestige.com.cy** website. It covers what you are receiving, what still needs
to be transferred into your accounts, and a short list of open items.

Read [`README.md`](README.md) first for how the codebase is structured and how to
run, build, and deploy it. This file is about **ownership and transfer**, not code.

---

## 1. What you are receiving

A complete, self-contained copy of the production website:

- The full source code, content, and images that build **https://s-prestige.com.cy**.
- A committed `package-lock.json` so dependencies install to exact versions.
- No database, no backend service, and **no secret keys or environment variables**
  are needed to build or run the site. `.env.example` lists optional variables that
  are only relevant if you later add analytics or a form backend — none are active.

The deployed site you see today builds from exactly this code.

---

## 2. Ownership map

| Asset | Where it is now | Action needed |
|---|---|---|
| **Domain** `s-prestige.com.cy` | **Already on your account** at the registrar | None to transfer. You control DNS. |
| **Source repository** | Delivered to you as this clean repo | Push it to your own GitHub/GitLab organization (§3) |
| **Hosting (Vercel)** | On the outgoing owner's Vercel account | Re-host under your own Vercel account, then re-point DNS (§4) |
| **Runtime secrets / API keys** | None | None — the site runs with zero secrets |

The only live infrastructure still outside your control is the **Vercel hosting**.
Everything else is either already yours (domain) or self-contained (this repo).

---

## 3. Repository setup

This delivery is already a git repository with a single clean initial commit on the
`main` branch — you do not need to `git init`.

1. Create a new **private** repository under your organization
   (e.g. `s-prestige/sprestige-website`), with no auto-generated README.
2. From the root of this delivered folder, add your remote and push:

   ```bash
   git remote add origin <your-new-repo-URL>
   git push -u origin main
   ```

3. Confirm it builds for you locally before going further:

   ```bash
   npm ci
   npm run build
   npm run preview     # open the served URL and click through the site
   ```

---

## 4. Hosting cutover (Vercel)

The site is currently hosted on the outgoing owner's Vercel account, and the domain's
DNS points there. The goal is to move hosting onto **your** Vercel account with no
visible downtime. Recommended sequence:

1. **Create a Vercel account / team** for S.Prestige (or use an existing one).
2. **Import** the repository from §3 into Vercel as a new project. Vercel auto-detects
   Astro. Build command `npm run build`, output directory `dist/`.
3. **Verify the preview.** Vercel gives the project a temporary `*.vercel.app` URL.
   Open it and confirm the whole site renders correctly before touching DNS.
4. **Add the domain** `s-prestige.com.cy` (and `www.s-prestige.com.cy`) to this new
   Vercel project. Vercel will display the exact DNS records it needs.
5. **Update DNS** at your registrar to the records Vercel shows. (For Vercel apex
   domains this is typically an `A` record to `76.76.21.21` and a `CNAME` for `www`
   to `cname.vercel-dns.com`, but **use whatever Vercel displays** — it is authoritative.)
   SSL is issued automatically a few minutes after the records propagate.
6. **Verify production** now serves from your project (check that an edit you push to
   `main` deploys and appears on the live domain).
7. Once confirmed, the **old Vercel project can be deleted** by the previous owner.

> The code already points at the production domain (`s-prestige.com.cy` is set in
> `astro.config.mjs` and `src/lib/seo.ts`), so **no code change is needed** for the
> domain to work — only the DNS and Vercel steps above.

**Alternative:** Vercel also supports transferring a project between teams directly.
That is faster but leaves the project tied to the previous owner's connected Git
repository, so you would still need to reconnect it to your repo from §3. The
rebuild-and-repoint sequence above gives a cleaner break.

---

## 5. Final-exit checklist (for the outgoing owner)

After §3 and §4 are confirmed working on your side, the previous owner should:

- [ ] Delete the old Vercel project (after you confirm the new one serves production).
- [ ] Remove any local copies of the personal repository.
- [ ] Confirm no personal account remains attached to the domain or DNS.

After this, no third-party account is in the critical path of the live site.

---

## 6. Where the content lives

Full detail is in [`README.md`](README.md). In short:

- **Cars (sale & rental):** `src/content/fleet/*.mdx`
- **Testimonials:** `src/content/testimonials/*.mdx`
- **Excursions:** `src/content/excursions/*.mdx`
- **Detailing services + prices:** authored directly in `src/pages/detailing/*.astro`
- **WhatsApp numbers & message templates:** `src/lib/wa.ts` (single source — never
  hard-code a number elsewhere)
- **Site metadata, address, SEO:** `src/lib/seo.ts`
- **Content schemas (validation rules):** `src/content/config.ts`

---

## 7. Open items

These are known, currently-unfinished points. None block the site from running.

### Content / data
- **Tesla Model 3 mileage is a placeholder.** `src/content/fleet/tesla-model-3-sale.mdx`
  has `mileageKm: 5000` — replace with the real odometer reading before relying on it.

### Legal
- The Privacy and Terms pages (`src/pages/legal/`) state that the business is
  VAT-registered in Cyprus but **do not print a VAT number or company registration
  number.** Decide with the business whether to display these, and consider a lawyer
  review of the rentals/insurance wording.

### SEO & marketing setup (verify status, complete what is missing)
The technical SEO foundation is in place (canonical URLs, sitemap, structured data,
Open Graph images, optimized imagery). The following are account-level tasks the new
owner should confirm or set up:

- **Google Search Console** — verify the domain and submit the sitemap
  (Astro generates a sitemap index — confirm the URL, typically
  `https://s-prestige.com.cy/sitemap-index.xml`).
- **Bing Webmaster Tools** — same idea for Bing/DuckDuckGo coverage.
- **Google Business Profile** — high impact for local "near me" searches in Pafos.
  Make sure the listing's name, address, hours, and website match the site.
- **Analytics** — none is wired in. A lightweight, cookieless option (e.g. Plausible
  or Umami) plus Microsoft Clarity covers most needs without a cookie banner.
- **Business email** (`info@s-prestige.com.cy`) — set up MX records at the registrar
  if you want mail on the domain (e.g. Google Workspace or Zoho Mail).

---

## 8. Quick reference

| Thing | Value |
|---|---|
| Production URL | https://s-prestige.com.cy |
| Framework | Astro 4 (static) + React islands |
| Node version | 20+ |
| Install | `npm ci` |
| Local dev | `npm run dev` → http://localhost:4321 |
| Build | `npm run build` → `dist/` |
| Deploy | Push to `main` (Vercel auto-deploys) |
| Runtime secrets | None |
