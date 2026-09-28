import { useParams } from 'react-router';
import { findProduct, products } from '../data/products';
import { pages, productMeta } from '../data/routes';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { BackLink, DetailSection, Pager, TechList } from '../components/layout/PageParts';
import { DiagramFigure } from '../components/architecture/DiagramFigure';
import { BrowserFrame } from '../components/projects/BrowserFrame';
import { ExternalButton } from '../components/ui/Actions';
import { Container } from '../components/ui/Container';
import NotFound from './NotFound';

export default function Product() {
  const { slug } = useParams();
  const p = findProduct(slug);
  useDocumentMeta(p ? productMeta(p) : pages.notFound);
  if (!p) return <NotFound />;

  const i = products.indexOf(p);
  const prev = products[i - 1];
  const next = products[i + 1];

  return (
    <article>
      <Container className="pt-10 sm:pt-14">
        <BackLink to="/projects">All products</BackLink>

        <header className="mt-10 grid gap-10 pb-12 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
          <div>
            <h1 className="text-[clamp(2.25rem,9vw,6.75rem)] font-medium leading-[0.92] tracking-[-0.055em]">{p.name}</h1>
            <p className="mt-5 text-xl text-graphite">{p.tagline}</p>
          </div>
          <div className="lg:pt-3">
            <p className="text-lg leading-relaxed text-paper/85">{p.summary}</p>
            <p className="mt-4 font-mono text-[12.5px] text-graphite">Built {p.period} · independent</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <ExternalButton href={p.live} variant="primary">
                Visit product
              </ExternalButton>
              <ExternalButton href={p.repo}>Source on GitHub</ExternalButton>
            </div>
          </div>
        </header>

        {p.note && (
          <p role="note" className="mb-10 max-w-3xl rounded-xl border border-line bg-panel/60 px-5 py-4 text-sm leading-relaxed text-graphite">
            {p.note}
          </p>
        )}

        <figure>
          <BrowserFrame src={p.screenshot.src} alt={p.screenshot.alt} url={p.live} eager />
          <figcaption className="mt-3 text-[13px] text-graphite">The live product at {p.live.replace(/^https?:\/\//, '').replace(/\/$/, '')}.</figcaption>
        </figure>

        <div className="mt-8 border-t border-line">
          <DetailSection id="features" title="What it does">
            <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {p.features.map((f) => (
                <li key={f} className="flex gap-3 text-[17px] leading-snug text-paper/85">
                  <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-signal" />
                  {f}
                </li>
              ))}
            </ul>
          </DetailSection>

          <DetailSection id="architecture" title="Architecture">
            <DiagramFigure spec={p.architecture} caption="Architecture of the live product." />
          </DetailSection>

          <DetailSection id="highlights" title="Engineering highlights">
            <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
              {p.highlights.map((h) => (
                <li key={h.title}>
                  <h3 className="font-semibold tracking-[-0.01em]">{h.title}</h3>
                  <p className="mt-2 leading-relaxed text-graphite">{h.body}</p>
                </li>
              ))}
            </ul>
          </DetailSection>

          <DetailSection id="stack" title="Technology">
            <TechList items={p.stack} />
          </DetailSection>
        </div>

        <Pager
          label="More products"
          prev={prev && { to: `/projects/${prev.slug}`, label: prev.name }}
          next={next && { to: `/projects/${next.slug}`, label: next.name }}
        />
      </Container>
    </article>
  );
}
