import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import type { CaseStudy } from '../../types';
import { Diagram } from '../architecture/Diagram';
import { DotList } from '../ui/DotList';

/** An editorial row for one case study; the whole row is the link target. */
export function WorkRow({ cs, headingLevel = 3 }: { cs: CaseStudy; headingLevel?: 2 | 3 }) {
  const Heading = headingLevel === 2 ? 'h2' : 'h3';
  return (
    <article className="group relative grid gap-8 border-t border-line py-10 has-[a:focus-visible]:outline has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-4 has-[a:focus-visible]:outline-signal sm:py-12 lg:grid-cols-12 lg:gap-10">
      <div className="lg:col-span-4">
        <Heading className="text-[clamp(2rem,3.6vw,2.9rem)] font-medium leading-none tracking-[-0.045em]">
          <Link to={`/work/${cs.slug}`} className="after:absolute after:inset-0 focus-visible:outline-none">
            {cs.name}
          </Link>
        </Heading>
        <p className="mt-4 font-mono text-[12.5px] leading-6 text-graphite"><DotList items={cs.tags} /></p>
      </div>

      <div className="lg:col-span-5">
        <p className="text-[17px] leading-relaxed text-paper/85">{cs.summary}</p>
        <p className="mt-5 font-mono text-[12.5px] leading-6 text-graphite"><DotList items={cs.stack} /></p>
        <span className="mt-6 inline-flex items-center gap-2 text-[15px] text-paper">
          Read the case study
          <ArrowRight aria-hidden="true" className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>

      <div className="lg:col-span-3">
        <div className="max-w-sm surface rounded-xl p-3 transition-colors duration-300 group-hover:border-line-strong">
          <Diagram spec={cs.cardDiagram} mode="static" variant="thumb" />
        </div>
      </div>
    </article>
  );
}
