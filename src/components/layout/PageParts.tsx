import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Container } from '../ui/Container';

export function PageHeader({ title, intro, children }: { title: string; intro?: ReactNode; children?: ReactNode }) {
  return (
    <Container className="pb-6 pt-14 sm:pt-24">
      <h1 className="max-w-4xl text-[clamp(3rem,7.5vw,6.25rem)] font-medium leading-[0.92] tracking-[-0.055em]">{title}</h1>
      {intro && <p className="mt-7 max-w-2xl text-lg leading-relaxed text-graphite sm:text-xl">{intro}</p>}
      {children}
    </Container>
  );
}

export function BackLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link to={to} className="group inline-flex items-center gap-2 text-sm text-graphite transition-colors hover:text-paper">
      <ArrowLeft aria-hidden="true" className="size-4 transition-transform group-hover:-translate-x-0.5" />
      {children}
    </Link>
  );
}

/** A titled block on a detail page. `number` is only passed where the sections are a real sequence. */
export function DetailSection({
  id,
  title,
  number,
  children,
}: {
  id: string;
  title: string;
  number?: number;
  children: ReactNode;
}) {
  return (
    <section aria-labelledby={id} className="grid gap-6 border-b border-line py-16 sm:py-20 lg:grid-cols-12 lg:gap-10">
      <div className="lg:col-span-4">
        {number !== undefined && <span className="font-mono text-sm text-signal">{String(number).padStart(2, '0')}</span>}
        <h2 id={id} className="mt-3 text-2xl font-medium tracking-[-0.03em] sm:text-[2rem]">
          {title}
        </h2>
      </div>
      <div className="min-w-0 lg:col-span-8">{children}</div>
    </section>
  );
}

export function TechList({ items }: { items: readonly string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((t) => (
        <li key={t} className="rounded-full border border-line px-3 py-1.5 font-mono text-[12.5px] text-paper/85">
          {t}
        </li>
      ))}
    </ul>
  );
}

type PagerLink = { to: string; label: string };

export function Pager({ label, prev, next }: { label: string; prev?: PagerLink; next?: PagerLink }) {
  return (
    <nav aria-label={label} className="grid gap-4 py-14 sm:grid-cols-2">
      {prev && (
        <Link to={prev.to} className="group surface rounded-2xl p-6 transition-colors hover:border-line-strong">
          <span className="text-sm text-graphite">Previous</span>
          <span className="mt-2 flex items-center gap-2 text-xl font-medium tracking-[-0.025em]">
            <ArrowLeft aria-hidden="true" className="size-4 text-graphite transition-transform group-hover:-translate-x-0.5" />
            {prev.label}
          </span>
        </Link>
      )}
      {next && (
        <Link
          to={next.to}
          className="group surface rounded-2xl p-6 text-right transition-colors hover:border-line-strong sm:col-start-2"
        >
          <span className="text-sm text-graphite">Next</span>
          <span className="mt-2 flex items-center justify-end gap-2 text-xl font-medium tracking-[-0.025em]">
            {next.label}
            <ArrowRight aria-hidden="true" className="size-4 text-graphite transition-transform group-hover:translate-x-0.5" />
          </span>
        </Link>
      )}
    </nav>
  );
}
