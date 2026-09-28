import { impactMetrics } from '../../data/profile';
import { cn } from '../../lib/cn';
import { Container } from '../ui/Container';

/* Two columns on phones, four from md. Borders are placed per position so the grid reads as one ruled strip. */
const cell = [
  '',
  'border-l pl-5 sm:pl-8',
  'border-t md:border-t-0 md:border-l md:pl-8',
  'border-l border-t pl-5 sm:pl-8 md:border-t-0',
];

export function ImpactStrip() {
  return (
    <section aria-label="Engineering impact" className="border-y border-line">
      <Container>
        <dl className="grid grid-cols-2 md:grid-cols-4">
          {impactMetrics.map((m, i) => (
            <div key={m.label} className={cn('flex flex-col-reverse justify-end border-line py-10 md:py-14', cell[i])}>
              <dt className="mt-2 max-w-[20ch] text-sm leading-snug text-graphite">{m.label}</dt>
              <dd className="text-[clamp(3rem,6vw,4.75rem)] font-light leading-none tracking-[-0.055em] tabular-nums">
                {m.value}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
