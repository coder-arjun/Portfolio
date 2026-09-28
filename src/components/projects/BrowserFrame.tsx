import { cn } from '../../lib/cn';

type Props = { src: string; alt: string; url: string; className?: string; eager?: boolean };

/** A real screenshot of a live product, framed with its actual address. */
export function BrowserFrame({ src, alt, url, className, eager }: Props) {
  const host = url.replace(/^https?:\/\//, '').replace(/\/$/, '');
  return (
    <div className={cn('overflow-hidden rounded-xl border border-line bg-panel', className)}>
      <div className="flex h-8 items-center gap-1.5 border-b border-line px-3" aria-hidden="true">
        <span className="size-2 rounded-full bg-white/12" />
        <span className="size-2 rounded-full bg-white/12" />
        <span className="size-2 rounded-full bg-white/12" />
        <span className="ml-3 truncate font-mono text-[11px] text-graphite">{host}</span>
      </div>
      <img
        src={src}
        alt={alt}
        width={1440}
        height={900}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        className="block aspect-[16/10] w-full object-cover object-top"
      />
    </div>
  );
}
