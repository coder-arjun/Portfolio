import type { Product } from '../../types';
import { cn } from '../../lib/cn';
import { Diagram } from '../architecture/Diagram';
import { ButtonLink, ExternalButton } from '../ui/Actions';
import { BrowserFrame } from './BrowserFrame';
import { ModuleLedger } from './ModuleLedger';
import { DotList } from '../ui/DotList';

function Visual({ product: p }: { product: Product }) {
  if (p.cardVisual === 'diagram' && p.cardDiagram) {
    return (
      <div className="grid aspect-[16/10] place-items-center rounded-xl border border-line bg-panel/60 p-4">
        <div className="w-full max-w-[300px]">
          <Diagram spec={p.cardDiagram} mode="static" variant="thumb" />
        </div>
      </div>
    );
  }
  return <BrowserFrame src={p.screenshot.src} alt={p.screenshot.alt} url={p.live} />;
}

/** Compact buttons in the narrow cards so both fit on one row. */
function Actions({ product: p, compact }: { product: Product; compact?: boolean }) {
  const size = compact ? 'xs' : 'sm';
  return (
    <div className={cn('flex flex-wrap', compact ? 'gap-2' : 'gap-3')}>
      <ExternalButton href={p.live} variant="primary" size={size}>
        Visit product
      </ExternalButton>
      <ButtonLink to={`/projects/${p.slug}`} variant="secondary" size={size}>
        Case study
      </ButtonLink>
    </div>
  );
}

function Title({ product: p, large }: { product: Product; large?: boolean }) {
  return (
    <>
      <div className="flex items-baseline justify-between gap-4">
        <h3 className={cn('font-medium tracking-[-0.04em]', large ? 'text-4xl sm:text-5xl' : 'text-2xl')}>{p.name}</h3>
        <span className="shrink-0 font-mono text-xs text-graphite">{p.period}</span>
      </div>
      <p className={cn('mt-1.5 text-graphite', large && 'text-lg')}>{p.tagline}</p>
    </>
  );
}

/** Finoma gets the featured, full-width treatment: real screenshot beside a ledger of its modules. */
function FeaturedCard({ product: p }: { product: Product }) {
  return (
    <article className="surface grid gap-x-12 gap-y-7 rounded-3xl p-5 sm:p-8 lg:col-span-3 lg:grid-cols-[1.2fr_1fr]">
      <div className="lg:col-start-1 lg:row-start-1">
        <Visual product={p} />
      </div>
      <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
        <Title product={p} large />
        <p className="mt-5 leading-relaxed text-paper/85">{p.summary}</p>
        {p.modules && (
          <div className="mt-6">
            <ModuleLedger modules={p.modules} />
          </div>
        )}
      </div>
      <div className="flex flex-col gap-6 lg:col-start-1 lg:row-start-2">
        <p className="font-mono text-[12px] leading-5 text-graphite">
          <DotList items={p.cardStack} />
        </p>
        <Actions product={p} />
      </div>
    </article>
  );
}

export function ProductCard({ product: p, featured }: { product: Product; featured?: boolean }) {
  if (featured) return <FeaturedCard product={p} />;
  return (
    <article className="surface flex flex-col rounded-3xl p-5 sm:p-6">
      <Visual product={p} />
      <div className="mt-6">
        <Title product={p} />
      </div>
      <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-paper/85">
        {p.cardFeatures.map((f) => (
          <li key={f} className="flex items-center gap-2 whitespace-nowrap">
            <span aria-hidden="true" className="size-1 shrink-0 rounded-full bg-graphite" />
            {f}
          </li>
        ))}
      </ul>
      <p className="mt-5 font-mono text-[12px] leading-5 text-graphite">
        <DotList items={p.cardStack} />
      </p>
      <div className="mt-auto pt-7">
        <Actions product={p} compact />
      </div>
    </article>
  );
}
