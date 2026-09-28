import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router';
import { motion, useReducedMotion } from 'motion/react';
import { SiteHeader } from './SiteHeader';
import { SiteFooter } from './SiteFooter';
import { jumpToTop, scrollToElement, startSmoothScroll, stopSmoothScroll } from '../../lib/smoothScroll';

/** Scroll to the top on route change, or to the hash target when there is one. */
function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    startSmoothScroll();
    return stopSmoothScroll;
  }, []);

  useEffect(() => {
    const target = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null;
    if (target) scrollToElement(target);
    else jumpToTop();
  }, [pathname, hash]);

  return null;
}

export function SiteLayout() {
  const { pathname } = useLocation();
  const reduced = useReducedMotion();

  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-paper focus:px-4 focus:py-2 focus:text-ink"
      >
        Skip to content
      </a>
      <ScrollManager />
      <SiteHeader />
      <motion.main
        key={pathname}
        id="main"
        className="flex-1"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
      >
        <Outlet />
      </motion.main>
      <SiteFooter />
      <div aria-hidden="true" className="grain pointer-events-none fixed inset-0 z-[60]" />
    </div>
  );
}
