# Projects

Drop one MDX file per project into this directory. The filename becomes the
URL slug — `ashhadu.mdx` is served at `/work/ashhadu`.

## Frontmatter

```yaml
---
title: Ashhadu
summary: One-line pitch. Renders under the title.
year: 2025
role: Founding CTO
links:
  - label: live
    href: https://example.com
  - label: github
    href: https://github.com/...
---
```

`title` and `summary` are required. Everything else is optional.

## Body

Anything below the frontmatter is rendered as MDX with the terminal-themed
components defined in `components/terminal/mdx-components.tsx`. Headings,
lists, code, blockquotes, and links all inherit the site palette.
