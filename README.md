# Arjun P K — Portfolio

Personal portfolio: a .NET / Azure software engineer's work, independent products and an interactive
engineering lab. React 19, TypeScript, Vite, Tailwind CSS v4, Motion and Lenis. No backend.

## Run

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # typecheck → vite build → per-route HTML (scripts/prerender-meta.mjs)
npm run preview    # serve dist/ at http://localhost:4173
```

Set the public address when building for production so pages get canonical URLs, absolute
social-preview links and a sitemap:

```bash
SITE_URL=https://your-domain.example npm run build          # bash
$env:SITE_URL="https://your-domain.example"; npm run build  # PowerShell
```

## Routes

| Path | Page |
|---|---|
| `/` | Hero, engineering impact, selected work, what I build, independent products, how I engineer, lab teaser, contact |
| `/work`, `/work/:slug` | Professional case studies (CobankPlusPro, Edustac, VoyStac, Churchyetu, PayStacGlobal) |
| `/projects`, `/projects/:slug` | Independent products (Finoma, Cinora, DayPilot, OPBT) |
| `/lab` | Engineering Lab: interactive transaction-processing and payment-integration walk-throughs |
| `/about` | Profile, experience, technical expertise, engineering philosophy |

## Editing content

All copy lives in typed data files — pages render from them, and the build reads the same files
for page titles and descriptions.

| File | What it holds |
|---|---|
| `src/data/profile.ts` | Name, headline, bio, contact links, the four impact metrics |
| `src/data/caseStudies.ts` | Professional case studies (7-part structure) |
| `src/data/products.ts` | Independent products |
| `src/data/diagrams.ts` | Every architecture diagram (nodes + edges, in SVG viewBox units) |
| `src/data/lab.ts` | Engineering Lab flows and stages |
| `src/data/experience.ts` | Roles and education |
| `src/data/technologies.ts` | "What I build" areas and the full expertise list |
| `src/data/principles.ts` | "How I engineer" steps |
| `src/data/routes.ts` | Page titles and meta descriptions |

Diagrams: a node's `x`/`y` is its centre; edges route themselves (S-curves between rows, horizontal
curves within a row). Set `minWidth` on wide diagrams so they scroll sideways on phones instead of
shrinking the text.

## Confidentiality

Professional case studies describe my own contributions and general outcomes only. Their diagrams are
simplified and representative (captioned as such), and the site shows no source code, customer data,
internal URLs, proprietary screenshots or security-finding details. Product screenshots in
`public/screens/` are of the public pages of my own live products. The portrait lives in `public/portrait/`
(regenerate the WebP sizes from the original if it is ever replaced; keep display width ≤ half the source width).

## Deploying

`dist/` is a static site. Every route has its own HTML file (`work.html`, `work/cobankpluspro.html`, …),
so deep links load directly without rewrite rules or trailing-slash redirects; `dist/404.html` serves
unknown paths. Node 24 is pinned in `.node-version`.

- **Cloudflare Pages (live host):** build command `npm run build`, output directory `dist`, environment
  variable `SITE_URL` = the site's public address. Every push to `main` deploys automatically.
- **Netlify / Vercel:** same build command and output directory.
- **GitHub Pages:** publish `dist/` (the 404 page is picked up automatically).
- **IIS (e.g. MonsterASP.NET):** upload `dist/`; add a `web.config` that maps 404 to `/404.html` if needed.

## Structure

```
src/
  components/  layout · navigation · hero · metrics · work · projects · architecture · lab · sections · contact · ui
  pages/       Home · Work · CaseStudy · Projects · Product · Lab · About · NotFound
  data/        typed content (see above)
  animations/  shared motion timing
  hooks/       useDocumentMeta · useScrolled
  styles/      Tailwind v4 theme tokens and base styles
scripts/       prerender-meta.mjs
```
