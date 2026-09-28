import { useEffect } from 'react';
import type { PageMeta } from '../data/routes';

const SITE_URL = (import.meta.env.SITE_URL as string | undefined)?.replace(/\/$/, '');

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.rel = 'canonical';
    document.head.appendChild(el);
  }
  el.href = href;
}

/** Keep title, description and social tags in sync with the current page (client-side navigation). */
export function useDocumentMeta({ path, title, description }: PageMeta) {
  useEffect(() => {
    document.title = title;
    setMeta('name', 'description', description);
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
    if (SITE_URL) {
      const url = `${SITE_URL}${path === '/' ? '/' : path}`;
      setMeta('property', 'og:url', url);
      setCanonical(url);
    }
  }, [path, title, description]);
}
