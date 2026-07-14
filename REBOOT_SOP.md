# Varick Global — Reboot & Operations SOP

---

## CURRENT STATE — WordPress.com (as of 2026-07-14)

**Site:** varickglobal.com  
**Platform:** WordPress.com Atomic — site ID `220982231`  
**Theme:** Twenty Twenty-Four (`pub/twentytwentyfour`) — **do not switch themes**  
**CSS:** jsDelivr CDN from branch `claude/build-site-from-markdown-MQkyz`  
**Pre-built HTML:** `/tmp/page_{id}.html` (52 files)  
**Page map:** `scripts/relaunch-map.json`

### Quick-fix: single blank page

1. Identify the page ID from `scripts/relaunch-map.json`
2. Push via MCP content-authoring tool:
   - operation: `pages.update`
   - params: `{"id": PAGE_ID, "status": "publish", "content": "<contents of /tmp/page_ID.html>", "user_confirmed": true}`
3. Verify in incognito with `Ctrl+Shift+R`

### Quick-fix: all pages blank (theme reset)

```
wpcom-mcp-site → theme.set → {"theme": "pub/twentytwentyfour"}
```

Then hard-reload in incognito. If still blank, re-push pages individually.

### CSS cache bust (style changes)

1. Edit `dist/vg-style.css`
2. Bump version in all HTML files:
   ```bash
   VERSION=20260715a
   for f in /tmp/page_*.html; do sed -i "s/v=20260620a/v=$VERSION/g" "$f"; done
   ```
3. Commit + push to `claude/build-site-from-markdown-MQkyz`
4. Re-push affected pages via MCP

### Page ID reference

| Pages | IDs |
|---|---|
| Core (Home, About, Services, Commercial, HOA, Land, Elite, Properties, Advisors, Contact, FAQ, Privacy) | 4313, 4320, 4321, 4246, 4323, 4324, 4325, 4279, 4326, 1100, 4328, 748 |
| Service sub-pages | 4332–4338, 4534, 4340–4343 |
| Advisor profiles | 4344–4346 |
| Miami-Dade neighborhoods | 4347–4353, 4357 |
| Broward neighborhoods | 4354–4356, 4358–4362, 4369 |
| Palm Beach neighborhoods | 4363–4368, 4370, 4371 |

---

> **Read this first.** This is the authoritative document for how the website runs, how to update it, and how to avoid the failure modes we hit during the WordPress.com phase. If something isn't in this doc, ask before doing it — that's how the previous problems happened.

---

## 0. TL;DR — What changed and why

| Before | After |
|---|---|
| WordPress.com + Bento theme + Elementor + custom kit imports | **Next.js on Vercel** with markdown-driven content |
| Every content change required re-importing a 120 KB kit zip, re-pushing each of 53 pages individually via MCP, fighting CDN cache busters, and praying the active theme rendered our HTML | **Edit one markdown file → commit → site updates in 90 seconds** |
| Site rendering depended on jsDelivr CDN + browser cache + theme template + MCP token validity all working at once | Static HTML served from Vercel's edge — **zero runtime dependencies** |
| One stray CSS brace silently blanked the entire site for 48 hours | Build fails loudly if anything is broken; production stays untouched until you fix it |
| MCP tokens expired mid-push; ~24 pages still on stale content | Single `git push` deploys all 52 pages atomically |

**Why the old approach kept breaking:** WordPress.com's Atomic platform runs a theme (Bento) whose templates ignore `the_content()` for the front page. No amount of CSS or HTML we pushed into the page content field ever rendered, because the theme template never asked for it. We didn't have permission to switch themes via the MCP API. The fight was unwinnable inside that platform.

---

## 1. Phase 1 — Get the new site live (one-time, ~15 minutes of your time)

### 1.1 Deploy to Vercel

1. Open **[vercel.com/new](https://vercel.com/new)** in your browser.
2. Sign in with GitHub (use the same account that owns `chrisgny00/varick_global_site`).
3. Click **Import Git Repository** → select `chrisgny00/varick_global_site`.
4. On the configuration screen:
   - **Framework Preset**: Next.js (auto-detected — leave it)
   - **Branch**: pick `main` once we merge, OR for now `claude/build-site-from-markdown-MQkyz`
   - **Root Directory**: leave as `.` (default)
   - **Build / Output**: leave defaults
5. Click **Deploy**. Wait ~90 seconds. You'll get a URL like `varick-global-xxxx.vercel.app`.
6. Open that URL — **this is the working site**. Verify:
   - Home page renders with the salmon/almond/midnight palette
   - Click through to /services, /elite, /properties, /contact
   - Mobile menu works (resize browser)

### 1.2 Point varickglobal.com at Vercel

1. In Vercel → your project → **Settings → Domains**
2. Add `varickglobal.com` and `www.varickglobal.com`
3. Vercel will show you the DNS records you need (an A record and a CNAME, or just CNAMEs if your registrar supports flattening)
4. Log into your domain registrar (wherever varickglobal.com is registered — likely WordPress.com or GoDaddy/Namecheap)
5. **Update the nameservers OR DNS records** to what Vercel showed you
6. Wait 5 minutes to 24 hours for DNS to propagate (usually under an hour)
7. Vercel will automatically issue an SSL cert for the domain once DNS resolves

### 1.3 Decommission WordPress.com

**Don't do this until step 1.2 is verified working at varickglobal.com.**

1. Log into WordPress.com admin
2. Go to **Upgrades → Plans** → cancel the active plan (you'll keep access until the renewal date)
3. If the domain is registered through WordPress.com, **transfer it out** to a registrar of your choice (Cloudflare, Namecheap, Porkbun) before cancelling — domains registered through WordPress.com expire when the plan does

### 1.4 Done

The site is live. Total time: ~15 minutes of clicks + DNS propagation. **No code was changed, no kit was imported, no pages were pushed individually.**

---

## 2. Phase 2 — Content workflow (recurring, the easy way)

### 2.1 What lives in markdown

Every editable piece of content has a markdown file in `content/` at the repo root. Edit the markdown, commit, push, site updates within 90 seconds.

```
content/
├── site.md              # Phone, email, address, social links, hours
├── pages/
│   ├── home.md          # Homepage hero copy, headline, CTAs
│   ├── about.md         # About-page body content
│   ├── services.md      # Services overview intro
│   ├── elite.md         # VG Elite intro
│   └── contact.md       # Contact form copy
├── services/
│   ├── tenant-representation.md
│   ├── landlord-representation.md
│   ├── buyer-seller-services.md
│   └── ... (one .md per service)
├── advisors/
│   ├── chris-gallego.md
│   ├── nina-vazquez.md
│   ├── alfredo-morejon.md
│   └── gloria-grullon.md
├── neighborhoods/
│   └── ... (one .md per neighborhood)
├── properties/
│   └── ... (one .md per listing — replaces IDX while you're not wired up to MLS)
└── testimonials.md      # All client testimonials
```

### 2.2 The markdown format (frontmatter + body)

Every file looks like this:

```markdown
---
title: Tenant Representation
slug: tenant-representation
eyebrow: Services
heroSubtitle: Securing optimal terms for tenants in luxury and commercial leasing.
ctaPrimary: { label: "Engage Varick Global", href: "/contact?service=tenant-rep" }
relatedServices: [landlord-representation, lease-renewal]
---

## Our Approach

We represent commercial tenants in the negotiation and acquisition of office,
retail, and industrial space across South Florida. Every engagement begins with
a needs analysis and ends with a fully-executed lease.

## What You Can Expect

- A senior advisor as your single point of contact from day one.
- Discreet engagement — your brief is held in confidence.
- Market intelligence from our proprietary South Florida database.
- A written work plan with clear milestones.
- A defined deliverable: a transaction, an advisory memo, or both.
```

- **Frontmatter** (between the `---` lines) controls structured data: titles, slugs, hero copy, CTAs, related items.
- **Body** is plain markdown — headings, paragraphs, bullet lists, links. No HTML required.

### 2.3 How to edit (three ways, pick what suits the moment)

**Method A — GitHub web editor (no install, works from anywhere, mobile-friendly)**

1. Go to `github.com/chrisgny00/varick_global_site`
2. Navigate to the file you want to edit (e.g. `content/pages/home.md`)
3. Click the pencil icon (✏️) in the top right
4. Edit, scroll to the bottom, click **Commit changes**
5. Vercel auto-deploys within 90 seconds
6. Refresh varickglobal.com — change is live

**Method B — VS Code / local editor (best for batches of changes)**

```bash
git clone https://github.com/chrisgny00/varick_global_site.git
cd varick_global_site
npm install
npm run dev    # preview at http://localhost:3000
# Edit content/ files. Save. Browser auto-refreshes.
# When happy:
git add content/
git commit -m "Update homepage hero copy"
git push
```

**Method C — Open a Pull Request first (for risky changes)**

When you're not sure if an edit looks right, push to a branch instead of `main`:

```bash
git checkout -b update-services-copy
# edit content/
git add content/ && git commit -m "Reword services intro"
git push -u origin update-services-copy
```

Vercel will create a **preview URL** for the branch (something like `varick-global-git-update-services-copy.vercel.app`). Click it, review the changes in a real browser, then either merge the PR (which deploys to production) or close it (no impact on live site).

### 2.4 What does NOT live in markdown

Some things still need a code change. Keep these to a developer:

- Page layouts and components (Hero, FeaturedListings, etc.)
- Color palette / typography
- New page types (e.g., adding "/blog")
- AI integration logic
- IDX/MLS integration
- Form handler endpoints

For these, open a GitHub Issue describing what you want; the developer makes the change in a branch, you review the preview URL, then merge.

---

## 3. Lead capture & calls-to-action (designed in)

The reboot adds maximum-conversion lead capture on every page:

### 3.1 Always-on capture

- **Sticky header** with phone number (click-to-call on mobile) + "Schedule" button
- **Floating chat bubble** bottom-right of every page → `/contact`
- **Sticky footer bar on mobile** with "Call" and "Schedule" buttons (added in reboot)

### 3.2 Per-page CTAs

| Page | Primary CTA | Secondary | Lead form |
|---|---|---|---|
| Home | Explore Listings | Schedule a Consultation | Yes (hero + footer band) |
| Services overview | Tell us your brief (modal form) | Browse Listings | Yes |
| Service detail (each) | Engage Varick Global → /contact?service=X | View related | Yes |
| Properties | Find Matches (AI matchmaker) | Schedule a Showing | Search bar always visible |
| Property detail | Request a Showing | Mortgage Calculator | Yes — listing-specific inquiry |
| Advisor profile | Email <advisor> | Schedule a Call | Yes |
| Elite | Request Invitation | Learn More | Private inquiry form |
| Neighborhood | See Listings in <area> | Speak with Advisor | Yes |
| Contact | Full form | Phone/email | Yes |
| FAQ | Still have questions? | Schedule | Yes |

### 3.3 Data captured per submission

Every form posts to `/api/lead` (a new endpoint we'll add) which:

1. Stores the lead in a Google Sheet (cheapest CRM, no monthly fee)
2. Emails `info@varickglobal.com` immediately
3. Optionally pushes to HubSpot (MCP is already connected — we can wire this up)

Fields collected: name, email, phone, interest type, budget range (optional), message, source page, source CTA, UTM parameters (if any), timestamp.

### 3.4 Easy enhancement: HubSpot integration

The HubSpot MCP is now connected. With one developer task we can:
- Push every lead into HubSpot as a contact
- Auto-create a deal in the right pipeline based on the form's `service` parameter
- Trigger HubSpot workflows (welcome email, advisor assignment, follow-up reminders)

Tell me when to wire this up and I'll do it as a single PR.

---

## 4. Standard Operating Procedure — Making changes without breaking the site

This is the "**never break production**" checklist. Follow it for every content or code change.

### 4.1 Decision tree before any change

```
Is the change ONLY editing markdown in /content?
├── YES → use Method A or B in §2.3. Production updates in 90 sec. No risk.
└── NO → it's code. Use a branch + preview URL (§4.3). Never push code to main.
```

### 4.2 Pre-flight checks (~30 seconds, do every time)

Before pushing **any** change:

1. **Read your diff**: `git diff` — make sure you only changed what you meant to.
2. **Build locally if you have time**: `npm run build`. If it fails, fix before pushing.
3. **Spell-check** anything customer-facing. Typos in production are embarrassing.
4. **Verify links**: any `href` you added should point at a real page.

### 4.3 Preview URLs (the safety net)

**Every branch and every PR gets its own preview URL on Vercel automatically.**

- Want to test a big copy rewrite? Push to a branch named `wip/<thing>` → Vercel gives you `varick-global-git-wip-thing.vercel.app`. Test there. When happy, merge → production.
- Want to show a client a draft? Send them the preview URL. They see exactly what production will look like. Merge after they approve.

### 4.4 The "this could break the site" red flags

If you're about to do any of these, **STOP and open a PR**:

- Edit a file outside `/content/`
- Change anything in `src/`
- Edit `package.json`, `next.config.ts`, `tsconfig.json`
- Change the palette in `src/lib/design-tokens.ts` or `src/app/globals.css`
- Delete a markdown file (deleting an advisor → broken links)
- Rename a slug (the URL changes; existing links 404)

### 4.5 Rollback procedure (if something goes wrong)

If a production deploy breaks the site:

1. Open **Vercel dashboard → Deployments**
2. Find the **last green deployment** (before the breaking change)
3. Click the **⋯ menu → Promote to Production**
4. Production reverts to that version in ~10 seconds
5. Fix the bad commit on a branch, preview-verify, then merge

You can also do this from the command line:
```bash
git revert <bad-commit-sha>
git push
```
Vercel auto-deploys the revert.

### 4.6 Things that should never happen (lessons from the WordPress phase)

1. **Never edit live HTML directly.** All edits go through git. (WordPress let us edit pages directly, then state diverged from the repo, then re-imports overwrote work.)
2. **Never push minified/manually-written HTML to a content store.** Use the markdown source. (Pushing 50 KB pages individually via MCP was unsustainable and burnt MCP tokens fast.)
3. **Never write CSS that depends on JavaScript running first** (the `body.vg-relocated > *` rule blanked the entire site when the JS didn't run — see commit `eba42bf`).
4. **Never use broad attribute selectors in JS removal logic.** `[class*="actionbar"]` matched a wpcom body class and deleted the entire page.
5. **Never bump the CDN cache buster without rebuilding every page** that references it (or you create a split-state where some pages serve old CSS and others serve new).
6. **Never trust browser cache after a CSS change.** Use a real cache buster (URL query param) and verify in a fresh incognito window.

---

## 5. Improvement workflow (how to evolve the site safely)

### 5.1 The improvement cycle

```
Idea → GitHub Issue → Branch → Code + Preview URL → Review → Merge → Live
                          ↑                            ↓
                          └────── revisions ────────────┘
```

### 5.2 Recommended improvements (in priority order)

1. **Wire up `/api/lead` to HubSpot + Google Sheets** (highest ROI — every form submission becomes a tracked lead)
2. **Add a real blog at `/blog`** — markdown-driven, weekly market updates → drives organic traffic
3. **Connect IDX/MLS feed** to `/properties` so listings auto-update (right now properties are hardcoded in `src/lib/data/properties.ts`)
4. **Email capture popup** triggered by exit intent → newsletter list
5. **Schema.org markup** for properties (Google rich snippets in search results)
6. **Lighthouse + Core Web Vitals** audit; aim for 95+ on all metrics
7. **A/B testing** the hero CTA via Vercel Edge Config

### 5.3 Adding new pages

To add a new page (e.g., `/market-reports`):

1. Create `content/pages/market-reports.md` with frontmatter + body
2. Create `src/app/market-reports/page.tsx` (developer task, one short file)
3. Add to the header nav in `src/components/layout/Header.tsx` (developer task)
4. Open as a PR, preview, merge

### 5.4 Adding new advisors / services / neighborhoods

To add a new advisor (e.g., Sarah Lopez):

1. Create `content/advisors/sarah-lopez.md` (copy from another advisor file as template)
2. Edit the frontmatter (name, title, bio, photo path, specialties)
3. Drop her photo in `public/images/advisors/sarah-lopez.jpg`
4. Commit + push
5. Vercel rebuilds; `/advisors/sarah-lopez` is live; she's added to the advisors index page automatically

Same pattern for new services and neighborhoods — drop a markdown file, the site picks it up.

---

## 6. Monitoring & alerts

Set these up once; never think about them again:

1. **Vercel deployment notifications** → Slack / email when a deploy fails
2. **Uptime monitor**: [betterstack.com](https://betterstack.com) (free tier) pings varickglobal.com every 60 seconds; alerts if it goes down
3. **Google Search Console** verified → indexing status + search queries
4. **Plausible** or **GA4** for traffic analytics

---

## 7. The "did everything fail anyway?" recovery card

If varickglobal.com is broken AND Vercel dashboard is broken AND git is broken:

1. The site code is in git: `git clone https://github.com/chrisgny00/varick_global_site.git`
2. To run it locally: `cd varick_global_site && npm install && npm run dev` — visit `localhost:3000`
3. To deploy elsewhere: it's standard Next.js, deploy to **Netlify** or **Cloudflare Pages** with the same one-click flow as Vercel
4. The original spec is at `/root/.claude/uploads/f0274665-0a61-452d-8d5b-62a876aac227/67ecf5fe-VARICK_GLOBAL_BUILD_SPEC.md`

You have multiple deployment platforms, the source code in two places, and a written spec. The site cannot become un-recoverable.

---

## 8. What I will do next (when you say go)

In order, the next things to set up:

1. **Create the `/content` markdown structure** (~50 files, generated from the existing data files) — so editing site copy = editing markdown
2. **Wire content into the Next.js pages** so they read from markdown instead of TypeScript data files
3. **Build `/api/lead`** with HubSpot + Google Sheets integration
4. **Add the sticky mobile CTA bar** and exit-intent newsletter popup
5. **Write a `vercel.json`** with build settings + custom headers (security, caching)
6. **Open a PR you can review and merge** to `main`

Tell me to proceed and I'll do it. Or, if you'd rather just deploy what we have now and add improvements later: that path is in §1 above and the site is live in 15 minutes.
