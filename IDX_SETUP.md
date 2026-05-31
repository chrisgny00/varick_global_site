# Showcase IDX — Varick Global Setup Guide

## What you (Chris) need to do at Showcase IDX

### 1. Sign up
- Go to **showcaseidx.com** → "Get Started"
- Pick the **Business** plan (~$79/mo) — supports custom CSS, no per-listing fees
- You will need:
  - MIAMI Association of Realtors **MLS member ID**
  - Brokerage info (Varick Global Real Estate Advisors)
  - Office address: 19505 Biscayne Blvd, Suite 2350, Aventura, FL 33180
  - Phone: 786.352.7547

### 2. MLS feed approval
- Showcase IDX submits a feed request to MIAMI MLS on your behalf
- Approval is typically **24–48 hours**
- Once approved, your dashboard will show ✓ "MLS Connected"

### 3. Install the WordPress plugin
On varickglobal.com (WordPress.com Business plan):

1. **wp-admin → Plugins → Add New → Upload Plugin**
2. From your Showcase IDX dashboard, download "Showcase IDX WordPress Plugin" (.zip)
3. Upload the .zip → **Install Now** → **Activate**
4. **Showcase IDX → Settings → API Key** → paste your key from showcaseidx.com

### 4. Apply our custom skin CSS
1. **Showcase IDX → Customize → Custom CSS**
2. Open the file `scripts/wp-kit/idx-skin.css` in this repo
3. Paste the full contents into the Custom CSS field
4. Save

This styles the IDX widget to match VG palette (crimson buttons, dark cards, Cormorant/Raleway fonts).

## What I (Claude) will do via MCP once IDX is live

Once you confirm the plugin is installed and the API key is set, I will:

1. **Swap the home page search bar** — replace the placeholder form with a `[showcaseidx_omnibar]` shortcode block (via Gutenberg Shortcode block, not HTML block)
2. **Replace the home page "Featured Properties" grid** — swap the 6 hard-coded sample cards for `[showcaseidx_hotsheet]` pulling featured listings from your saved searches
3. **Repurpose the /properties/ page** — wipe the current content, drop in `[showcaseidx_search]` for the full search results grid
4. **Add property detail page handling** — Showcase IDX auto-creates `/properties/[mls-id]/` URLs via its own template; we don't need to touch our 12 sample property pages (they'll act as guides until IDX takes over the route)

## Showcase IDX shortcode reference

| Shortcode | What it shows |
|---|---|
| `[showcaseidx_omnibar]` | Compact single-line search bar with tabs |
| `[showcaseidx_search]` | Full search results grid with filters sidebar |
| `[showcaseidx_hotsheet]` | Featured listings carousel/grid |
| `[showcaseidx_quicksearch]` | "Quick search" widget with preset filters |
| `[showcaseidx_advanced]` | Advanced search form |

## VG-specific saved searches to create

Once IDX is connected, go to **Showcase IDX → Saved Searches** and create:

| Name | Filter |
|---|---|
| "VG Featured" | Price ≥ $4M, status=Active, sort by date listed |
| "Miami Beach Luxury" | Neighborhood=Miami Beach, Price ≥ $3M |
| "Brickell Condos" | Neighborhood=Brickell, type=Condo |
| "Palm Beach Estates" | Neighborhood=Palm Beach, type=SF Home, Price ≥ $10M |
| "Off-Market Coming Soon" | status=Coming Soon |

The home page's featured-listings section will pull from "VG Featured".

## Cost estimate

| Item | Monthly |
|---|---|
| Showcase IDX Business plan | ~$79 |
| MIAMI MLS membership (existing) | $0 |
| WordPress.com Business plan (existing) | $0 |
| **Total IDX-related new spend** | **~$79/mo** |

## Estimated timeline

| Step | Time |
|---|---|
| Sign up at Showcase IDX | 10 min |
| MLS feed approval | 1–2 business days |
| Plugin install + API key | 15 min |
| Custom CSS paste | 5 min |
| I push the shortcode updates via MCP | 30 min |
| **Total wall-clock** | **~2–3 business days** |
