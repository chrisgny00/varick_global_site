# Varick Global Real Estate Advisors — Website

The marketing and IDX-style website for **Varick Global Real Estate Advisors** (varickglobal.com) — a South Florida luxury real estate firm. Built from the canonical brief in `VARICK_GLOBAL_BUILD_SPEC.md`.

- **Stack:** Next.js (App Router) + TypeScript + Tailwind CSS v4
- **Type:** Static-first with API routes for AI features
- **Brand:** Luxury, dark-themed, crimson + onyx (main) / violet + navy (VG Elite sub-brand)

## Run locally

```bash
npm install
cp .env.example .env.local   # optional — site runs fine with zero keys
npm run dev                  # http://localhost:3000
```

Build for production:

```bash
npm run build
npm start
```

## Environment variables

| Variable | What it enables |
|---|---|
| `ANTHROPIC_API_KEY` *or* `OPENAI_API_KEY` | AI concierge chat, property matcher narrative, valuation narrative. Without a key, the AI features still render and degrade gracefully. |
| `IDX_PROVIDER` / `IDX_API_KEY` | Reserved for real MLS integration. The build ships with a 24-listing typed mock layer in `src/lib/data/properties.ts`. |
| `NEXT_PUBLIC_MAPS_API_KEY` | Optional — for the property map view. |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL used for SEO + JSON-LD. Defaults to `http://localhost:3000`. |

The site **builds and runs with zero keys set**. AI features show a friendly degraded state; IDX uses mock data.

## Project layout

```
src/
  app/                     # Next.js App Router pages + API routes
    api/                   # /concierge, /property-match, /valuation
    properties/, services/, agents/, neighborhoods/, elite/, ...
  components/
    ai/                    # ConciergeChat, PropertyMatcher, ValuationTool
    idx/                   # SearchBar, FilterPanel, PropertyCard
    layout/                # Header, Footer, Logo
    sections/              # Hero, Stats, Featured, EliteTeaser, Testimonials, CTABand
    ui/                    # Button, Badge, Card, Input, SectionHeader, PageHero, ...
  lib/
    data/                  # Typed mock data (properties, services, agents, neighborhoods)
    ai/                    # Prompts + LLM client (Anthropic or OpenAI)
    seo.ts                 # Metadata helpers + JSON-LD generators
    design-tokens.ts       # Single-source token reference (also mirrored in globals.css)
    cn.ts                  # tailwind-merge + clsx helper
  types/                   # Shared TypeScript types
```

## Design system

All tokens live in `src/app/globals.css` (`@theme` block) and are mirrored in `src/lib/design-tokens.ts`. Colors are accessed via Tailwind classes (e.g. `bg-vg-crimson`, `text-elite-violet-light`). Typography is loaded via `next/font/google` in `src/app/layout.tsx`:

- **Cormorant Garamond** — display
- **Raleway** — body & sub-headings
- **Montserrat** — accent (eyebrows, buttons, labels) — always uppercase + letter-spacing

## Swapping mock IDX data for a real provider

`src/lib/data/properties.ts` exports a typed `Property[]` plus `filterProperties()`. To wire a real provider (iHomeFinder, IDX Broker, Showcase IDX):

1. Implement an adapter in `src/lib/idx/provider.ts` that returns the same `Property` shape (and a query interface compatible with `PropertyFilters`).
2. Swap the imports in `src/app/properties/page.tsx`, `src/app/properties/[id]/page.tsx`, and `src/components/sections/FeaturedProperties.tsx`.
3. Set `IDX_PROVIDER` + `IDX_API_KEY` in `.env.local`.

## SEO

- Per-page `metadata` exports with unique titles + descriptions.
- `Organization` / `RealEstateAgent` JSON-LD site-wide (`src/app/layout.tsx`).
- `Product` + `Offer` schema on listings, `Person` on advisor pages, `FAQPage` on `/faq` and `/hoa`, `BreadcrumbList` on sub-pages.
- `sitemap.xml` generated at `/sitemap.xml` (`src/app/sitemap.ts`) — includes static pages, every listing, every service, every neighborhood, every advisor.
- `robots.txt` at `/robots.txt`.

## Accessibility

- Visible focus rings (`outline-vg-vivid`).
- `prefers-reduced-motion` respected — animations disabled.
- All icons are `lucide-react` (never emoji).
- Color contrast targeted at WCAG AA on the dark theme.
