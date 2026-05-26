# Varick Global — WordPress (Elementor) Install Guide

This site can be deployed on WordPress.com (Business plan or higher) using the **Elementor Template Kit** generated from the Next.js source.

## What's in the package

After running `npm run build:wp`, the `dist/` folder contains two files you'll upload:

| File | Purpose |
|---|---|
| `varick-global-kit.zip` | Elementor Template Kit — global colors, fonts, custom CSS, and 52 page templates (home + 11 static pages + 12 services + 4 advisors + 24 neighborhoods) |
| `varick-global-content.xml` | WordPress WXR — creates the actual Pages and links each one to its Elementor template |

## Prerequisites

- WordPress.com **Business plan** or higher (required for Elementor and custom plugins)
- **Elementor Pro** installed and activated (you confirmed this)
- Recommended plugins (install via Plugins → Add New):
  - **Rank Math SEO** — for the per-page metadata and schema we baked into the Next.js build
  - **Custom Post Type UI** (optional, only if you later want Properties as a CPT)
  - An IDX plugin (later): **iHomeFinder**, **IDX Broker**, or **Showcase IDX**

## Install steps

### 1. Generate the kit

On your local machine, in the `varick_global_site` folder:

```powershell
npm run build:wp
```

This produces `dist/varick-global-kit.zip` and `dist/varick-global-content.xml`.

### 2. Import the Elementor Template Kit

1. Log into WordPress admin (`https://yoursite.wordpress.com/wp-admin`).
2. Go to **Elementor → Tools → Import / Export Kit → Import Kit**.
3. Upload `varick-global-kit.zip`.
4. On the import screen, **check every checkbox**: Site Settings, Global Colors, Global Fonts, Theme Style, Templates, Custom Code (CSS).
5. Click **Import**.

> If you see an "untrusted source" warning, click **Trust this source** — it's because the kit was built locally, not pulled from Elementor's library.

### 3. Import the page content

1. Go to **Tools → Import**.
2. If "WordPress" isn't listed yet, click **Install Now** under it, then **Run Importer**.
3. Upload `varick-global-content.xml`.
4. **Assign authors**: keep the default (your admin user).
5. **Leave "Download and import file attachments" UNCHECKED** (no attachments in the seed).
6. Click **Submit**.

You'll now have 52 new pages — Home, About, Services, Commercial, HOA, Land, Properties, VG Elite, Advisors, Valuation, Contact, FAQ, plus one page per service / advisor / neighborhood.

### 4. Set the homepage

1. **Settings → Reading**.
2. **Your homepage displays** → "A static page".
3. **Homepage**: select **Home**.
4. Click **Save Changes**.

### 5. Build the menu (Header)

The kit ships an Elementor header template, but WordPress doesn't know which pages to put in the nav. Set it up once:

1. **Appearance → Menus → Create a new menu** → name it `Main`.
2. Add these pages (in this order):
   - Services
   - Commercial
   - HOA Division
   - Properties
   - VG Elite
   - Advisors
   - About
3. Save the menu and assign location **Primary** (or whatever your theme calls the top-nav location).
4. Open **Elementor → Theme Builder → Header** and ensure the header references this menu.

### 6. Verify

Visit each page and check that:

- `/` — hero, IDX placeholder, featured properties (sample), stats, services, Elite teaser, testimonials, CTA
- `/elite` — the **violet/navy** palette appears (only here)
- `/services/hoa-advisory` — service-detail layout
- `/agents/chris-gallego` — advisor page
- `/neighborhoods/bal-harbour` — neighborhood stats + nearby links
- `/faq` — accordion expands on click
- `/contact` — contact form renders (it posts to `info@varickglobal.com` via `mailto:`)

Resize the browser to 375 / 768 / 1024 / 1440 to verify responsive.

### 7. Verify global tokens

Open **Elementor → Site Settings**:

- **Global Colors** → you should see Primary `#a6192e`, Accent `#d2203a`, Text `#ffffff`, Pewter `#a6a6a6`, plus 8 custom (Onyx, Deep, Card, Gold, Gold Light, Elite Violet, Elite Violet Light, Elite Navy).
- **Global Fonts** → Primary heading = Cormorant Garamond 300, Body = Raleway 300, Accent = Montserrat 700.
- **Custom CSS** → should contain the `.eyebrow`, `.vg-card`, `.vg-badge`, and `.vg-button-*` rules.

## After import — what to do next

### IDX integration

The `/properties` page and the home-page search bar contain a **placeholder block** marked "IDX feed coming soon". When your IDX plugin is installed:

1. Edit the Properties page in Elementor.
2. Delete the placeholder **HTML widget**.
3. Drop in the IDX plugin's widget (or paste its shortcode into a new HTML widget).
4. Repeat on the home page for the search-bar block.

For the **neighborhood pages**, configure your IDX plugin to filter by city — most plugins allow embedding a city-filtered grid via shortcode like `[idx-listings city="Bal Harbour" limit="9"]`.

### AI features (Concierge chat, AI matcher, AI valuation)

These rely on Next.js API routes that aren't included in the WordPress export. Options:

- **Embed via iframe**: keep `npm run dev` (or deploy the Next.js app to Vercel) and embed the AI components as iframes inside Elementor HTML widgets.
- **Use a WordPress chat plugin**: Tidio, Crisp, or Tawk.to — connect to Claude or OpenAI via Zapier / their API integrations.
- **Custom widget**: a developer can rebuild the matcher/valuation as a WP plugin calling the same Anthropic/OpenAI endpoints.

The kit's Valuation page has a form that posts to `mailto:` for now — replace with a proper integration when ready.

### SEO

In the Next.js version we ship per-page meta, JSON-LD schemas, sitemap, and robots. After installing **Rank Math**:

1. **Rank Math → Titles & Meta → Pages** — set the default title format to `%title% — Varick Global`.
2. Per page, open the page editor's **Rank Math sidebar** and paste the meta title/description (use the values in `src/lib/seo.ts` and each page's `pageMeta()` call for reference).
3. **Rank Math → Schema** — apply `RealEstateAgent` + `LocalBusiness` to the homepage; `Person` to each advisor; `FAQPage` to `/faq` and `/hoa`.
4. **Rank Math → Sitemap Settings** — enable; auto-generated.

### Custom domain

If you want `varickglobal.com` to point at your WordPress.com site:

1. **Upgrades → Domains → Add a domain** → either transfer/connect the existing domain or buy a new one.
2. Update DNS at the current registrar to WordPress.com's nameservers, or set CNAME/A records per WordPress.com's instructions.

## Re-running the build

Any time you tweak `src/lib/data/*.ts` (services, agents, neighborhoods) or `src/lib/design-tokens.ts`:

```powershell
npm run build:wp
```

Re-import the new `varick-global-kit.zip` (Elementor → Tools → Import Kit) — Elementor will offer to **update** existing templates rather than duplicate.

## Caveats

- **Visual fidelity ~90–95%**. A few details (custom diagonal-line backgrounds, gradient orbs, exact framer-motion stagger animations) are approximated by Elementor's built-in animations and custom CSS.
- **No header & footer in this kit yet** — the kit's templates are page bodies. WordPress's theme will render its own header/footer. To customize them, use **Elementor → Theme Builder → Header / Footer** and replicate the design from `src/components/layout/Header.tsx` and `Footer.tsx`. The brand colors are already in global colors, so it's mostly drag-and-drop.
- **No images shipped** — every property/agent uses a CSS-rendered initials placeholder. Upload real photography to the WordPress Media Library and replace the placeholder HTML blocks as you go.
- **Forms post via `mailto:`** — works without a plugin, but for production-grade forms use Elementor Pro Forms (already included with your license) and re-wire each form widget.
