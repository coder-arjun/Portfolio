import { caseStudies } from './caseStudies';
import { products } from './products';
import type { CaseStudy, Product } from '../types';

/*
 * Single source of truth for page titles and descriptions. Pages read it at runtime (useDocumentMeta),
 * and scripts/prerender-meta.mjs reads it at build time to write per-route HTML for crawlers and link previews.
 * Keep this module free of React and browser APIs.
 */
export type PageMeta = { path: string; title: string; description: string };

export const pages = {
  home: {
    path: '/',
    title: 'Arjun P K — Software Engineer | .NET & Azure',
    description:
      'Software Engineer specializing in ASP.NET Core, .NET, Azure integration, SQL Server, SaaS platforms, payment integrations and enterprise systems.',
  },
  work: {
    path: '/work',
    title: 'Selected Engineering Work | Arjun P K',
    description:
      'Case studies from five enterprise platforms: core banking, education, a vacation-rental marketplace, church finance with mobile money, and HR and payroll SaaS.',
  },
  projects: {
    path: '/projects',
    title: 'Independent Products | Arjun P K',
    description:
      'Four live products designed, architected and built independently: Finoma, Cinora, DayPilot and OPBT.',
  },
  about: {
    path: '/about',
    title: 'About | Arjun P K',
    description:
      'Software engineer in Kerala, India — experience at Tecnostac and Infosys, technical expertise across .NET, Azure and SQL Server, and how I approach engineering.',
  },
  lab: {
    path: '/lab',
    title: 'Engineering Lab | Arjun P K',
    description:
      'Interactive walk-throughs of transaction processing and payment integration patterns: idempotency, double entry, signature validation and more.',
  },
  notFound: {
    path: '/404',
    title: 'Page not found | Arjun P K',
    description: 'This page doesn’t exist. Explore the work, products and engineering lab instead.',
  },
} satisfies Record<string, PageMeta>;

export const caseStudyMeta = (c: CaseStudy): PageMeta => ({
  path: `/work/${c.slug}`,
  title: c.seoTitle,
  description: c.seoDescription,
});

export const productMeta = (p: Product): PageMeta => ({
  path: `/projects/${p.slug}`,
  title: p.seoTitle,
  description: p.seoDescription,
});

/** Every indexable route, in sitemap order. */
export const allRoutes: PageMeta[] = [
  pages.home,
  pages.work,
  ...caseStudies.map(caseStudyMeta),
  pages.projects,
  ...products.map(productMeta),
  pages.lab,
  pages.about,
];
