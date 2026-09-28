import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { cn } from '../../lib/cn';

const base =
  'inline-flex items-center rounded-full font-medium transition-[background-color,border-color,box-shadow] duration-300';
const variants = {
  primary:
    'bg-paper text-ink shadow-[inset_0_-1px_0_rgb(0_0_0/0.12)] hover:bg-white hover:shadow-[0_14px_44px_-14px_rgb(91_140_255/0.8)]',
  secondary: 'border border-line-strong bg-white/[0.02] text-paper backdrop-blur-sm hover:border-graphite hover:bg-white/[0.05]',
} as const;
/* Sizes are a prop, not className overrides: two utilities for the same property would fight in the cascade. */
const sizes = {
  md: 'h-11 gap-2 px-5 text-[15px]',
  sm: 'h-10 gap-2 px-4 text-sm',
  xs: 'h-9 gap-1.5 px-3.5 text-[13px]',
} as const;

type Common = {
  children: ReactNode;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  /** Layout only (margins, visibility) — never size or colour. */
  className?: string;
};

/** Internal navigation, styled as a button. */
export function ButtonLink({ to, children, variant = 'primary', size = 'md', className }: Common & { to: string }) {
  return (
    <Link to={to} className={cn(base, variants[variant], sizes[size], className)}>
      {children}
      <ArrowRight aria-hidden="true" className="size-4" />
    </Link>
  );
}

/** External destination, styled as a button; opens in a new tab and says so. */
export function ExternalButton({ href, children, variant = 'secondary', size = 'md', className }: Common & { href: string }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className={cn(base, variants[variant], sizes[size], className)}>
      {children}
      <ArrowUpRight aria-hidden="true" className="size-4" />
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}

/** Quiet inline text link with a direction arrow. */
export function TextLink({ to, href, children, className }: { to?: string; href?: string; children: ReactNode; className?: string }) {
  const cls = cn(
    'group/link inline-flex items-center gap-1.5 text-[15px] text-paper underline-offset-4 hover:underline',
    className,
  );
  if (href) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={cls}>
        {children}
        <ArrowUpRight aria-hidden="true" className="size-4 text-graphite transition-colors group-hover/link:text-paper" />
        <span className="sr-only">(opens in a new tab)</span>
      </a>
    );
  }
  return (
    <Link to={to ?? '/'} className={cls}>
      {children}
      <ArrowRight aria-hidden="true" className="size-4 text-graphite transition-transform group-hover/link:translate-x-0.5" />
    </Link>
  );
}
