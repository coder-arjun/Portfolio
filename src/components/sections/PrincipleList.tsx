import { principles } from '../../data/principles';

/** The engineering sequence, numbered because it is a sequence. */
export function PrincipleList() {
  return (
    <ol className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
      {principles.map((p, i) => (
        <li key={p.title} className="border-t border-line pt-6">
          <span className="font-mono text-sm text-signal">{String(i + 1).padStart(2, '0')}</span>
          <h3 className="mt-4 text-xl font-semibold tracking-[-0.02em]">{p.title}</h3>
          <p className="mt-3 leading-relaxed text-graphite">{p.body}</p>
          <p className="mt-4 font-mono text-[12.5px] leading-5 text-paper/70">In practice: {p.evidence}</p>
        </li>
      ))}
    </ol>
  );
}
