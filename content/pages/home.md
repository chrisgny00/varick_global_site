---
title: Home
eyebrow: South Florida's Premier Luxury Real Estate
heroHeadline: Where Luxury Meets Precision.
heroHeadlineItalic: Luxury
heroSubtitle: A discreet advisory for the South Florida luxury market — residential, commercial, HOA, and an invitation-only Sports & Entertainment division.
heroCtaPrimary: { label: Explore Listings, href: /properties }
heroCtaSecondary: { label: Schedule a Consultation, href: /contact }
stats:
  - { value: "247", label: Active Listings }
  - { value: "42", label: Avg Days on Market }
  - { value: "$2.4M", label: Median Sale Price }
  - { value: "31", label: Neighborhoods Served }
featured:
  - vg-001
  - vg-002
  - vg-003
  - vg-004
  - vg-007
  - vg-008
services:
  - tenant-representation
  - landlord-representation
  - buyer-seller-services
  - lease-renewal
  - valuation
  - foreclosures
  - investment-sales
  - new-development
matchmaker:
  eyebrow: AI Property Matchmaker
  headline: Describe your dream home
  headlineItalic: dream home
  subtitle: Tell us in your own words. Our AI will translate it into a curated set of South Florida properties.
  placeholder: A 5-bedroom waterfront estate in Miami Beach under $20M, with a dock and pool…
  ctaLabel: Find Matches
neighborhoodsIntro:
  eyebrow: Where We Work
  headline: Neighborhoods We Serve
  subtitle: From the Atlantic coastline to the Intracoastal — twenty-four communities across Miami-Dade, Broward and Palm Beach counties.
eliteTeaser:
  badges: [VG Elite, By Invitation Only]
  headline: Sports & Entertainment. Extraordinary Living.
  headlineItalic: Extraordinary Living.
  body: VG Elite is Varick Global's invitation-only division for professional athletes, entertainers, and high-net-worth executives — a discreet, NDA-protected advisory with access to off-market inventory and white-glove relocation services.
  cta: { label: Discover VG Elite, href: /elite }
testimonials:
  - { quote: "Chris and the Varick Global team handled our acquisition with extraordinary discretion. They sourced an off-market property that perfectly matched our brief.", name: "A. R.", role: "Private Family Office, New York" }
  - { quote: "Their HOA Division navigated a complicated receivership for our association. We had clarity at every step. Truly best-in-class advisory.", name: "Board President", role: "Aventura, FL" }
  - { quote: "From listing strategy through closing, Varick Global delivered. Our home sold at the top of the comp set in 28 days.", name: "M. & D. P.", role: "Coral Gables Sellers" }
finalCta:
  eyebrow: Begin
  headline: Ready to begin?
  headlineItalic: begin
  subtitle: Speak with a Varick Global advisor.
  primary: { label: Schedule a Consultation, href: /contact }
  secondary: { label: Browse Listings, href: /properties }
seo:
  title: Varick Global — Luxury Real Estate Advisory · South Florida
  description: Discreet luxury real estate advisory for South Florida. Residential, commercial, HOA, and invitation-only sports & entertainment division.
---

# Editing the homepage

Everything visible on the homepage is controlled by the frontmatter above.
Edit any value, commit, and the site updates within ~90 seconds of Vercel
detecting the change.

## What goes where

- `heroHeadline` / `heroHeadlineItalic` → the big rotating headline at the top.
  The italic substring within the headline is styled with the salmon accent color.
- `stats` → the 4 stat tiles below the search bar
- `featured` → property slugs to show in the curated grid. Each must exist as
  a markdown file under `content/properties/<slug>.md`.
- `services` → service slugs (must exist under `content/services/`)
- `matchmaker` → AI matchmaker section copy
- `eliteTeaser` → VG Elite invitation block
- `testimonials` → array of client quotes; add or remove items, no limit
- `finalCta` → the closing band at the bottom of the page
- `seo` → meta title and meta description for search engines and social shares

Body copy below the frontmatter (this section you're reading) is not currently
shown on the homepage — it's just notes for whoever is editing the file.
