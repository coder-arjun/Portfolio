/**
 * Post-build step: write one HTML file per route with that page's <title>, description and social tags,
 * so crawlers and link previews (LinkedIn, WhatsApp, Slack) see the right metadata without running JS.
 * Each route gets its own file named after the route (dist/work.html, dist/work/cobankpluspro.html, …).
 * Static hosts such as Cloudflare Pages serve /work.html at /work directly, whereas /work/index.html would
 * cost a redirect to /work/ and mismatch the canonical URL. dist/404.html is the fallback for unknown paths.
 *
 * Set SITE_URL (e.g. SITE_URL=https://arjunpk.dev npm run build) to also emit canonical URLs,
 * absolute og:image/og:url and sitemap.xml.
 */
import { createServer } from 'vite';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const dist = path.join(root, 'dist');
const site = (process.env.SITE_URL ?? '').replace(/\/$/, '');

// Load the route metadata straight from the TypeScript source, so pages and HTML never disagree.
const vite = await createServer({ root, logLevel: 'error', server: { middlewareMode: true }, appType: 'custom' });
const { allRoutes, pages } = await vite.ssrLoadModule('/src/data/routes.ts');
await vite.close();

const template = await readFile(path.join(dist, 'index.html'), 'utf8');
const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

function setTag(html, pattern, value) {
  if (!pattern.test(html)) throw new Error(`Template is missing a tag matching ${pattern}`);
  return html.replace(pattern, (_m, open, close) => `${open}${esc(value)}${close}`);
}

function render(meta, { indexable = true } = {}) {
  let html = template.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(meta.title)}</title>`);
  html = setTag(html, /(<meta name="description" content=")[^"]*(")/, meta.description);
  html = setTag(html, /(<meta property="og:title" content=")[^"]*(")/, meta.title);
  html = setTag(html, /(<meta property="og:description" content=")[^"]*(")/, meta.description);
  html = setTag(html, /(<meta name="twitter:title" content=")[^"]*(")/, meta.title);
  html = setTag(html, /(<meta name="twitter:description" content=")[^"]*(")/, meta.description);

  const extra = [];
  if (site) {
    const url = `${site}${meta.path === '/' ? '/' : meta.path}`;
    html = html.replace(/(<meta property="og:image" content=")\/([^"]*")/, `$1${site}/$2`);
    if (indexable) extra.push(`<link rel="canonical" href="${url}" />`, `<meta property="og:url" content="${url}" />`);
  }
  if (!indexable) extra.push('<meta name="robots" content="noindex" />');
  if (extra.length) html = html.replace('</head>', `    ${extra.join('\n    ')}\n  </head>`);
  return html;
}

for (const meta of allRoutes) {
  const file = meta.path === '/' ? path.join(dist, 'index.html') : path.join(dist, `${meta.path}.html`);
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, render(meta));
}
await writeFile(path.join(dist, '404.html'), render(pages.notFound, { indexable: false }));

if (site) {
  const urls = allRoutes.map((m) => `  <url><loc>${site}${m.path === '/' ? '/' : m.path}</loc></url>`).join('\n');
  await writeFile(
    path.join(dist, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
  );
  await writeFile(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${site}/sitemap.xml\n`);
  console.log(`prerender-meta: ${allRoutes.length} routes + 404, sitemap for ${site}`);
} else {
  console.log(`prerender-meta: ${allRoutes.length} routes + 404 (set SITE_URL to add canonical URLs and sitemap.xml)`);
}
