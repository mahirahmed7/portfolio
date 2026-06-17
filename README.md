# mahirahmed.dev

Personal portfolio for [mahirahmed.dev](https://mahirahmed.dev) — a terminal-themed site
built with Next.js, TypeScript, and Tailwind CSS.

The home page is a scripted shell session (`whoami`, `cat about.txt`, `ls links/`,
`ls work/`). Project folders open into MDX-backed case-study pages at `/work/[slug]`.

## Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Content:** MDX case studies via `gray-matter` + `next-mdx-remote`
- **Deploy:** Vercel

## Features

- Terminal-inspired UI with a typed-on-load session animation
- Full static render on first paint for SEO and no-JS visitors
- Respects `prefers-reduced-motion` (animation skipped when enabled)
- MDX project pages with optional frontmatter links
- Resume and contact links on the home page
- No analytics, cookies, or tracking

## Local development

Requires Node.js 20+.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm run lint    # ESLint
```

## Project structure

```
app/
  layout.tsx            Site metadata, font, shell
  page.tsx              Home terminal session
  work/[slug]/page.tsx  MDX case-study route
components/terminal/    Prompt, Cursor, Shell, TypedSession, etc.
content/projects/       One .mdx file per project
lib/
  site.ts               Name, bio, and home-page links
  projects.ts           Loads and parses project MDX
public/                 Static assets (e.g. resume PDF)
```

## Site content

**Home page** — edit `lib/site.ts` for name, about text, and links (email,
LinkedIn, GitHub, resume).

**Projects** — add a `.mdx` file to `content/projects/`. The filename becomes
the URL slug (`ashhadu.mdx` → `/work/ashhadu`). Projects listed on the home
page are loaded automatically.

```yaml
---
title: Project Name
summary: One-line description shown under the title.
year: 2025
role: Your role
links:
  - label: live
    href: https://example.com
---

## Section heading

Body content in MDX.
```

`title` and `summary` are required. Slugs are pre-rendered at build time via
`generateStaticParams`, so new projects need a redeploy.

## Deployment

Push to `main` on GitHub — Vercel picks up the repo and deploys automatically.
Custom domain (`mahirahmed.dev`) is configured in the Vercel project settings.

## License

See [LICENSE](LICENSE).
