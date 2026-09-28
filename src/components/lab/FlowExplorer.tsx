import { useEffect, useState, type ReactNode } from 'react';
import { Link } from 'react-router';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import type { Flow, FlowStage } from '../../types';
import { findCaseStudy } from '../../data/caseStudies';
import { cn } from '../../lib/cn';

const STEP_MS = 2400;

function IconButton({
  label,
  onClick,
  disabled,
  children,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className="grid size-10 place-items-center rounded-full border border-line-strong text-paper transition-colors hover:border-graphite hover:bg-white/[0.04] disabled:cursor-not-allowed disabled:opacity-35"
    >
      {children}
    </button>
  );
}

function positionLabel(flow: Flow, stage: FlowStage) {
  if (stage.kind === 'source') return 'Provider';
  const steps = flow.stages.filter((s) => s.kind !== 'source');
  return `Stage ${steps.indexOf(stage) + 1} of ${steps.length}`;
}

function StageDetail({ flow, stage }: { flow: Flow; stage: FlowStage }) {
  const reduced = useReducedMotion();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={stage.id}
        initial={reduced ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduced ? undefined : { opacity: 0, y: -6 }}
        transition={{ duration: 0.22 }}
      >
        <p className="font-mono text-[12.5px] text-graphite">{positionLabel(flow, stage)}</p>
        <h3 className="mt-3 text-2xl font-semibold tracking-[-0.025em]">{stage.title}</h3>
        <p className="mt-4 text-[17px] leading-relaxed text-paper/85">{stage.body}</p>
        <div className="mt-6 border-t border-line pt-5">
          <p className="text-sm font-medium text-paper">Why it matters</p>
          <p className="mt-1.5 leading-relaxed text-graphite">{stage.why}</p>
        </div>
        <div className="mt-6">
          <p className="text-sm font-medium text-paper">Where I’ve built this</p>
          <ul className="mt-2.5 flex flex-wrap gap-2">
            {stage.appliedIn.map((slug) => {
              const cs = findCaseStudy(slug);
              return cs ? (
                <li key={slug}>
                  <Link
                    to={`/work/${slug}`}
                    className="inline-block rounded-full border border-line px-3 py-1 text-sm text-paper/85 transition-colors hover:border-graphite hover:text-paper"
                  >
                    {cs.name}
                  </Link>
                </li>
              ) : null;
            })}
          </ul>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export function FlowExplorer({ flow }: { flow: Flow }) {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const total = flow.stages.length;
  const stage = flow.stages[active];

  // Autoplay steps forward, then stops at the last stage.
  useEffect(() => {
    if (!playing) return;
    if (active >= total - 1) {
      setPlaying(false);
      return;
    }
    const t = window.setTimeout(() => setActive((a) => a + 1), STEP_MS);
    return () => window.clearTimeout(t);
  }, [playing, active, total]);

  const select = (i: number) => {
    setPlaying(false);
    setActive(i);
  };
  const togglePlay = () => {
    if (!playing && active >= total - 1) setActive(0);
    setPlaying((p) => !p);
  };

  const indexed = flow.stages.map((s, i) => ({ s, i }));
  const sources = indexed.filter(({ s }) => s.kind === 'source');
  const steps = indexed.filter(({ s }) => s.kind !== 'source');
  const packetTransition = reduced ? { duration: 0 } : { type: 'spring' as const, stiffness: 380, damping: 34 };

  const packet = (
    <motion.span
      layoutId={`packet-${flow.id}`}
      transition={packetTransition}
      aria-hidden="true"
      className="ml-auto size-2.5 shrink-0 rounded-full bg-signal shadow-[0_0_14px_rgb(91_140_255/0.85)]"
    />
  );

  const stageClass = (i: number) =>
    cn(
      'relative flex w-full items-center gap-3 rounded-xl border px-3.5 py-3 text-left transition-colors duration-200',
      i === active
        ? 'border-signal/60 bg-[#0f1624]'
        : i < active
          ? 'border-line bg-panel hover:border-line-strong'
          : 'border-line bg-ink hover:border-line-strong',
    );

  return (
    <section aria-labelledby={`flow-${flow.id}`} className="border-b border-line py-16 sm:py-20">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-xl">
          <h2 id={`flow-${flow.id}`} className="text-[clamp(1.9rem,3.6vw,2.75rem)] font-medium leading-[1.05] tracking-[-0.045em]">
            {flow.title}
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-graphite">{flow.summary}</p>
        </div>
        <div className="flex items-center gap-2">
          <IconButton label="Previous stage" onClick={() => select(Math.max(0, active - 1))} disabled={active === 0}>
            <ChevronLeft aria-hidden="true" className="size-4" />
          </IconButton>
          <IconButton label={playing ? 'Pause walk-through' : 'Play walk-through'} onClick={togglePlay}>
            {playing ? <Pause aria-hidden="true" className="size-4" /> : <Play aria-hidden="true" className="size-4" />}
          </IconButton>
          <IconButton label="Next stage" onClick={() => select(Math.min(total - 1, active + 1))} disabled={active === total - 1}>
            <ChevronRight aria-hidden="true" className="size-4" />
          </IconButton>
          <span className="ml-2 font-mono text-xs tabular-nums text-graphite" aria-hidden="true">
            {active + 1} / {total}
          </span>
        </div>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-14">
        <div>
          {sources.length > 0 && (
            <div className="mb-3">
              <ul className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {sources.map(({ s, i }) => (
                  <li key={s.id}>
                    <button type="button" onClick={() => select(i)} aria-current={i === active ? 'step' : undefined} className={stageClass(i)}>
                      <span className="text-[15px] font-medium">{s.title}</span>
                      {i === active && packet}
                    </button>
                  </li>
                ))}
              </ul>
              {stage.kind === 'source' && (
                <div className="mt-4 rounded-xl border border-line bg-panel p-5 lg:hidden" aria-live="polite">
                  <StageDetail flow={flow} stage={stage} />
                </div>
              )}
              <p className="mt-3 flex items-center gap-2 pl-1 font-mono text-[12px] text-graphite">
                <span aria-hidden="true" className="h-4 w-px bg-line-strong" />
                All four converge into one integration layer
              </p>
            </div>
          )}

          <ol className="relative space-y-2 before:absolute before:bottom-6 before:left-[29px] before:top-6 before:w-px before:bg-line">
            {steps.map(({ s, i }, n) => (
              <li key={s.id}>
                <button type="button" onClick={() => select(i)} aria-current={i === active ? 'step' : undefined} className={stageClass(i)}>
                  <span
                    className={cn(
                      'grid size-7 shrink-0 place-items-center rounded-full border font-mono text-[11px] tabular-nums',
                      i === active ? 'border-signal text-signal' : i < active ? 'border-line-strong text-paper/80' : 'border-line text-graphite',
                    )}
                  >
                    {n + 1}
                  </span>
                  <span className="text-[15px] font-medium">{s.title}</span>
                  {i === active && packet}
                </button>
                {i === active && (
                  <div className="mt-2 rounded-xl border border-line bg-panel p-5 lg:hidden" aria-live="polite">
                    <StageDetail flow={flow} stage={stage} />
                  </div>
                )}
              </li>
            ))}
          </ol>
        </div>

        <aside
          aria-live="polite"
          aria-label={`${flow.title}: selected stage`}
          className="surface hidden self-start rounded-2xl p-8 lg:sticky lg:top-24 lg:block"
        >
          <StageDetail flow={flow} stage={stage} />
        </aside>
      </div>
    </section>
  );
}
