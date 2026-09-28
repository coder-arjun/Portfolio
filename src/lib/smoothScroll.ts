import Lenis from 'lenis';

/*
 * Inertial smooth scrolling. Lenis drives the page's native scroll position (sticky elements keep working)
 * and turns smoothing off by itself for visitors who prefer reduced motion.
 */
let lenis: Lenis | null = null;

export function startSmoothScroll() {
  lenis ??= new Lenis({ autoRaf: true, lerp: 0.09, smoothWheel: true, stopInertiaOnNavigate: true });
}

export function stopSmoothScroll() {
  lenis?.destroy();
  lenis = null;
}

/** Jump to the top without animation — used on route changes. */
export function jumpToTop() {
  if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
  else window.scrollTo({ top: 0, behavior: 'instant' });
}

/** Scroll to an in-page anchor, clearing the sticky header. */
export function scrollToElement(el: HTMLElement) {
  if (lenis) lenis.scrollTo(el, { offset: -72 });
  else el.scrollIntoView();
}
