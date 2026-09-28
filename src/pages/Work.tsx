import { caseStudies } from '../data/caseStudies';
import { experience } from '../data/experience';
import { pages } from '../data/routes';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { PageHeader } from '../components/layout/PageParts';
import { Container } from '../components/ui/Container';
import { TextLink } from '../components/ui/Actions';
import { WorkRow } from '../components/work/WorkRow';
import { ContactSection } from '../components/contact/ContactSection';

export default function Work() {
  useDocumentMeta(pages.work);
  const infosys = experience.find((r) => r.company.startsWith('Infosys'));

  return (
    <>
      <PageHeader
        title="Professional engineering"
        intro="Since August 2025 I have built enterprise modules across five platforms at Tecnostac, on .NET 9 and .NET 10. Each case study covers the context, my role, the architecture and what I built."
      >
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-graphite/90">
          Case studies describe my own contributions. Diagrams are simplified and representative — not production topology — and no
          proprietary code, customer data or screenshots are shown.
        </p>
      </PageHeader>

      <Container className="pt-10">
        <div className="border-b border-line">
          {caseStudies.map((cs) => (
            <WorkRow key={cs.slug} cs={cs} headingLevel={2} />
          ))}
        </div>

        {infosys && (
          <section aria-labelledby="earlier-title" className="grid gap-6 py-20 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-4">
              <h2 id="earlier-title" className="text-2xl font-semibold tracking-[-0.025em] sm:text-3xl">
                Before Tecnostac
              </h2>
              <p className="mt-2 font-mono text-[12.5px] text-graphite">
                {infosys.company} · {infosys.period}
              </p>
            </div>
            <div className="lg:col-span-8">
              <p className="text-[17px] leading-relaxed text-paper/85">{infosys.summary}</p>
              <ul className="mt-6 space-y-2.5 text-graphite">
                {infosys.points.map((pt) => (
                  <li key={pt} className="flex gap-3 leading-relaxed">
                    <span aria-hidden="true" className="mt-2.5 size-1 shrink-0 rounded-full bg-graphite" />
                    {pt}
                  </li>
                ))}
              </ul>
              <TextLink to="/about" className="mt-8">
                Full experience
              </TextLink>
            </div>
          </section>
        )}
      </Container>
      <ContactSection />
    </>
  );
}
