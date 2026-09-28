/**
 * Inline list separated by middle dots. Items never break internally, lines only break after a separator,
 * and screen readers hear commas instead of dots.
 */
export function DotList({ items }: { items: readonly string[] }) {
  return (
    <>
      {items.map((item, i) => {
        const last = i === items.length - 1;
        return (
          <span key={item}>
            <span className="whitespace-nowrap">
              {item}
              {!last && (
                <>
                  <span aria-hidden="true"> ·</span>
                  <span className="sr-only">,</span>
                </>
              )}
            </span>
            {!last && ' '}
          </span>
        );
      })}
    </>
  );
}
