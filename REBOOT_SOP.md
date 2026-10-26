# Varick Global — Operations SOP

---

## CURRENT STATE

**Site:** varickglobal.com  
**Platform:** WordPress.com — site ID `220982231`  
**Theme:** Twenty Twenty-Four (`pub/twentytwentyfour`)  
**Live property data:** Repliers MLS API (Miami MLS) — `csr-api.repliers.io`  
**Source code:** `github.com/chrisgny00/varick_global_site` — branch `claude/build-site-from-markdown-MQkyz`

### Page ID reference

| Pages | IDs |
|---|---|
| Core (Home, About, Services, Commercial, HOA, Land, Elite, Properties, Advisors, Contact, FAQ, Privacy) | 4313, 4320, 4321, 4246, 4323, 4324, 4325, 4279, 4326, 1100, 4328, 748 |
| Service sub-pages | 4332–4338, 4534, 4340–4343 |
| Advisor profiles | 4344–4346 |
| Miami-Dade neighborhoods | 4347–4353, 4357 |
| Broward neighborhoods | 4354–4356, 4358–4362, 4369 |
| Palm Beach neighborhoods | 4363–4368, 4370, 4371 |

### Quick-fix: single blank page

1. Identify the page ID from the table above
2. Push via the WordPress MCP (`wpcom-mcp-content-authoring`):
   - operation: `pages.update`
   - params: `{"id": PAGE_ID, "status": "publish", "content": "<page HTML>", "user_confirmed": true}`
3. Verify in incognito with `Ctrl+Shift+R`

### Quick-fix: all pages blank (theme reset)

```
wpcom-mcp-site → theme.set → {"theme": "pub/twentytwentyfour"}
```

Then hard-reload in incognito.

---

## 1. Content workflow

### 1.1 What lives in markdown

Every editable piece of copy lives in `content/` in the repo. Edit the file, commit, then sync to WordPress via the MCP or WP REST API.

```
content/
├── site.md              # Phone, email, address, social links, hours
├── pages/
│   ├── home.md          # Homepage hero copy, headline, CTAs
│   ├── about.md
│   ├── services.md
│   ├── elite.md
│   └── contact.md
├── services/            # One .md per service offering
├── advisors/            # One .md per advisor
├── neighborhoods/       # One .md per neighborhood
└── properties/          # Static listings (live data comes from Repliers)
```

### 1.2 Publishing to WordPress

**Method A — Claude AI (fastest)**

Open a Claude Code session in this repo and say, e.g.:
> "Update the homepage hero headline to 'Where Vision Meets Value' and publish it to WordPress"

Claude uses the WordPress MCP to push the change as a Gutenberg page update automatically.

**Method B — GitHub web editor**

1. Go to `github.com/chrisgny00/varick_global_site`
2. Navigate to the file (e.g. `content/pages/home.md`)
3. Click the pencil icon, edit, commit
4. Open a Claude session and say "push the updated home page to WordPress"

**Method C — Local editor**

```bash
git clone https://github.com/chrisgny00/varick_global_site.git
cd varick_global_site
npm install
npm run dev    # preview at http://localhost:3000
# Edit content/ files. When happy:
git add content/
git commit -m "Update homepage hero copy"
git push
# Then sync to WordPress via MCP
```

### 1.3 What does NOT live in markdown

Keep these to a developer:

- Page layouts and React components (`src/components/`)
- Color palette / typography (`src/app/globals.css`)
- New page routes (`src/app/`)
- AI search and concierge logic
- Repliers MLS integration
- Form handler endpoints

---

## 2. Live property data — Repliers MLS

Property listings come from the **Repliers MLS API** connected to **Miami MLS**.

- API base: `https://csr-api.repliers.io` (client-side key)
- Server-side client: `src/lib/repliers.ts`
- AI search endpoint: `POST /api/ai-search` (natural language → structured filters → Repliers)

### Environment variables required

```
REPLIERS_API_KEY=<your key from repliers.io dashboard>
ANTHROPIC_API_KEY=<your key from console.anthropic.com>
```

Set these in the WordPress hosting environment or in your local `.env.local` for the Next.js dev server.

### Syncing listings to WordPress

Use the `mcp__Repliers__Search_Listings` MCP tool to fetch live listings, then
push them to WordPress as property custom posts via `wpcom-mcp-content-authoring`.

---

## 3. Lead capture

### 3.1 Always-on capture

- Sticky header with phone (click-to-call) + "Schedule" button on every page
- AI Concierge chat bubble (bottom-right) — powered by `POST /api/concierge`
- AI Property Search modal (⌘K / Ctrl+K) — powered by `POST /api/ai-search`

### 3.2 HubSpot integration

The HubSpot MCP is connected. To route every form submission into HubSpot:
1. Wire `/api/lead` to `mcp__HubSpot__manage_crm_objects` (create Contact + Deal)
2. Trigger HubSpot workflows for follow-up email sequences

Say "wire up the contact form to HubSpot" in a Claude session to do this automatically.

---

## 4. Safe change checklist

Before pushing any change:

1. **Read your diff**: `git diff` — confirm you only changed what you meant to
2. **Build check**: `npm run build` — must pass before pushing
3. **Preview locally**: `npm run dev` — verify the change renders correctly
4. **WordPress sync**: use the MCP to update the affected page(s) after pushing

### The "never break it" red flags

If you're about to do any of these, test on a local dev build first:

- Edit any file outside `/content/`
- Change anything in `src/`
- Edit `package.json`, `next.config.ts`, `tsconfig.json`
- Change the palette in `src/app/globals.css`
- Delete a markdown file (breaks links)
- Rename a slug (the URL changes; existing links 404)

---

## 5. Recovery

If varickglobal.com is broken:

1. The source code is in git: `git clone https://github.com/chrisgny00/varick_global_site.git`
2. Run locally: `npm install && npm run dev` — visit `localhost:3000`
3. Re-push any broken WordPress page using the MCP (`pages.update` with the page's ID)
4. The full page ID map is in §0 above

---

## 6. Improvement roadmap

In priority order:

1. **Wire `/api/lead` to HubSpot** — every form submission becomes a tracked deal
2. **Sync Repliers live listings to WordPress** as property posts (auto-updated nightly)
3. **Add a blog at `/blog`** — markdown-driven, weekly market updates → SEO
4. **Schema.org markup** for properties (Google rich snippets)
5. **Exit-intent email capture popup** → newsletter list
6. **Core Web Vitals audit** — target 95+ Lighthouse on all metrics

### Adding new advisors / services / neighborhoods

1. Create `content/advisors/sarah-lopez.md` (copy another advisor file as template)
2. Fill in frontmatter (name, title, bio, photo path, specialties)
3. Drop photo in `public/images/advisors/sarah-lopez.jpg`
4. Commit + push
5. Sync the updated Advisors page to WordPress via MCP
