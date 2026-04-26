# mahirahmed.dev

Personal portfolio. Next.js 14+ App Router, TypeScript, Tailwind, MDX-backed
case studies, deployed on Vercel. Terminal-themed (monospace, charcoal/ink
palette, blinking cursor — tasteful, not chaotic).

## Local dev

```bash
npm install
npm run dev
```

App runs on `http://localhost:3000`.

## Adding a project case study

Drop one MDX file per project into `content/projects/`. The filename becomes
the URL slug — `ashhadu.mdx` is served at `/work/ashhadu`.

```yaml
---
title: Ashhadu
summary: One-line pitch shown under the title.
year: 2025
role: Founding CTO
links:
  - label: live
    href: https://example.com
  - label: github
    href: https://github.com/...
---

# Section heading

Body MDX. Headings, lists, code, blockquotes, and links inherit the site
palette automatically.
```

`title` and `summary` are required, everything else is optional. Slugs are
pre-rendered at build via `generateStaticParams`, so adding a new project
needs a redeploy.

## Project layout

```
app/
  layout.tsx            metadata, font, body shell
  page.tsx              terminal-session home
  work/[slug]/page.tsx  MDX case-study route
components/terminal/    Prompt, Cursor, Divider, Shell, TypedSession
content/projects/       *.mdx case studies live here
lib/
  site.ts               name, one-liner, about, links
  projects.ts           reads + parses content/projects
```

## Deploy on Vercel

1. Push this repo to GitHub.
2. In Vercel: **Add New > Project**, import the repo. Framework is auto-detected
   as Next.js, no overrides needed.
3. Deploy. The first build will succeed even with no project files.
4. Connect the domain: Vercel project → **Settings > Domains** → add
   `mahirahmed.dev` and `www.mahirahmed.dev`. Update DNS at the registrar
   (`A` record for apex to `76.76.21.21`, `CNAME` `www` to
   `cname.vercel-dns.com` — Vercel will show exact values).

That's it. Pushing to `main` redeploys automatically.

## Notes

- The home-page typing animation runs once on load and respects
  `prefers-reduced-motion`. SSR renders the full session, so SEO / no-JS
  visitors see all the content immediately.
- No analytics, no tracking, no cookies. Add them when there's a reason to.
