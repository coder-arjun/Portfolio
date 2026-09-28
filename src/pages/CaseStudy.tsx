import { useParams } from 'react-router';
import { caseStudies, findCaseStudy } from '../data/caseStudies';
import { caseStudyMeta, pages } from '../data/routes';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { BackLink, DetailSection, Pager, TechList } from '../components/layout/PageParts';
import { DiagramFigure, REPRESENTATIVE } from '../components/architecture/DiagramFigure';
import { Container } from '../components/ui/Container';
import { DotList } from '../components/ui/DotList';
import NotFound from './NotFound';

export default function CaseStudy() {
  const { slug } = useParams();
  const cs = findCaseStudy(slug);
  useDocumentMeta(cs ? caseStudyMeta(cs) : pages.notFound);
  if (!cs) return <NotFound />;

  const i = caseStudies.indexOf(cs);
  const prev = caseStudies[i - 1];
  const next = caseStudies[i + 1];

  return (
    <article>
      <Container className="pt-10 sm:pt-14">
        <BackLink to="/work">All work</BackLink>

        <header className="mt-10 grid gap-10 border-b border-line pb-14 lg:grid-cols-[1.45fr_1fr] lg:gap-16">
          <div>
            <h1 className="text-[clamp(2.25rem,9vw,6.75rem)] font-medium leading-[0.92] tracking-[-0.055em]">{cs.name}</h1>
            <p className="mt-5 text-xl text-graphite">{cs.domain}</p>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-paper/85">{cs.summary}</p>
          </div>
          <dl className="grid content-start gap-6 text-[15px] sm:grid-cols-2 lg:grid-cols-1 lg:pt-3">
            <div>
              <dt className="text-sm text-graphite">Company</dt>
              <dd className="mt-1">Tecnostac Pvt. Ltd. · 2025 – present</dd>
            </div>
            <div>
              <dt className="text-sm text-graphite">Role</dt>
              <dd className="mt-1">Software Engineer</dd>
            </div>
            <div className="sm:col-span-2 lg:col-span-1">
              <dt className="text-sm text-graphite">Focus</dt>
              <dd className="mt-1 font-mono text-[13px] leading-6 text-paper/85"><DotList items={cs.tags} /></dd>
            </div>
          </dl>
        </header>

        <DetailSection id="context" number={1} title="Context">
          <p className="max-w-2xl text-[17px] leading-relaxed text-paper/85">{cs.context}</p>
        </DetailSection>

        <DetailSection id="role" number={2} title="My role">
          <p className="max-w-2xl text-[17px] leading-relaxed text-paper/85">{cs.role}</p>
        </DetailSection>

        <DetailSection id="architecture" number={3} title="Architecture">
          <div className="space-y-6">
            {cs.architecture.map((spec) => (
              <DiagramFigure key={spec.title} spec={spec} caption={REPRESENTATIVE} />
            ))}
          </div>
        </DetailSection>

        <DetailSection id="challenges" number={4} title="Engineering challenges">
          <ul className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
            {cs.challenges.map((c) => (
              <li key={c} className="flex gap-3 text-[17px] leading-snug text-paper/85">
                <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-signal" />
                {c}
              </li>
            ))}
          </ul>
        </DetailSection>

        <DetailSection id="built" number={5} title="What I built">
          <ul className="divide-y divide-line border-y border-line">
            {cs.built.map((b) => (
              <li key={b.title} className="grid gap-2 py-6 sm:grid-cols-[12rem_1fr] sm:gap-8">
                <h3 className="font-semibold tracking-[-0.01em]">{b.title}</h3>
                <p className="leading-relaxed text-graphite">{b.body}</p>
              </li>
            ))}
          </ul>
        </DetailSection>

        <DetailSection id="technology" number={6} title="Technology">
          <TechList items={cs.technology} />
        </DetailSection>

        <DetailSection id="takeaway" number={7} title="Engineering takeaway">
          <p className="max-w-2xl text-[clamp(1.35rem,2.4vw,1.75rem)] leading-[1.35] tracking-[-0.02em] text-paper">{cs.takeaway}</p>
        </DetailSection>

        <Pager
          label="More case studies"
          prev={prev && { to: `/work/${prev.slug}`, label: prev.name }}
          next={next && { to: `/work/${next.slug}`, label: next.name }}
        />
      </Container>
    </article>
  );
}
