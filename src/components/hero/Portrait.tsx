import { cn } from '../../lib/cn';

type Props = {
  /** CSS sizes hint for picking the right resolution. */
  sizes: string;
  eager?: boolean;
  className?: string;
};

/**
 * Arjun's studio portrait. The source is 896 px wide, so it is never shown wider than ~450 CSS px
 * (sharp at 2× density). WebP at three widths, original JPEG as the fallback.
 */
export function Portrait({ sizes, eager, className }: Props) {
  return (
    <picture>
      <source
        type="image/webp"
        srcSet="/portrait/arjun-448.webp 448w, /portrait/arjun-672.webp 672w, /portrait/arjun-896.webp 896w"
        sizes={sizes}
      />
      <img
        src="/portrait/arjun-896.jpg"
        alt="Portrait of Arjun P K"
        width={896}
        height={1152}
        loading={eager ? 'eager' : 'lazy'}
        fetchPriority={eager ? 'high' : 'auto'}
        decoding="async"
        className={cn('block h-auto w-full', className)}
      />
    </picture>
  );
}
