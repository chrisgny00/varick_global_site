# Varick Global Real Estate Advisors — Website

> **If you're here to edit the site, read [`REBOOT_SOP.md`](./REBOOT_SOP.md) first.**
> It explains the workflow, the failure modes to avoid, and how to make changes safely.

## Quickstart

```bash
npm install
npm run dev   # http://localhost:3000
```

## Editing content

All site copy lives in [`content/`](./content/) as markdown files. Edit a file,
commit, push — Vercel auto-deploys within ~90 seconds. See `REBOOT_SOP.md` §2.

- `content/site.md` — phone, email, address, social links, nav
- `content/pages/*.md` — page-level copy (home, about, contact, etc.)
- `content/services/*.md` — one file per service offering
- `content/advisors/*.md` — one file per advisor
- `content/neighborhoods/*.md` — one file per neighborhood
- `content/properties/*.md` — one file per listing (will be replaced by IDX feed)

## Deployment

The site is deployed to **Vercel** from the `main` branch. Every commit to
`main` triggers a production deploy. Pull requests get their own preview URL
automatically.

See `REBOOT_SOP.md` §1 for the initial deployment procedure.

## Original spec

The original build specification is at
`/root/.claude/uploads/.../67ecf5fe-VARICK_GLOBAL_BUILD_SPEC.md`.

## Tech stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4
- Framer Motion (animations)
- Lucide React (icons)

## Project structure

```
src/
├── app/             Next.js routes (one folder per page)
├── components/      React components (layout, ui, sections, idx, ai)
├── lib/             design tokens, helpers, content loaders
└── types/           shared TypeScript types
content/             Markdown-driven editable content (see above)
public/              Static assets (images, favicons)
scripts/             Build scripts (WP kit export — deprecated)
```
