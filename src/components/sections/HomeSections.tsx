import { CreditCard, Cloud, Database, Layers, Server, ShieldCheck, type LucideIcon } from 'lucide-react';
import { caseStudies } from '../../data/caseStudies';
import { products } from '../../data/products';
import { capabilities } from '../../data/technologies';
import { flows } from '../../data/lab';
import { Container } from '../ui/Container';
import { SectionHeader } from '../ui/SectionHeader';
import { ButtonLink } from '../ui/Actions';
import { WorkRow } from '../work/WorkRow';
import { ProductCard } from '../projects/ProductCard';
import { PrincipleList } from './PrincipleList';
import { DotList } from '../ui/DotList';

export function SelectedWork() {
  return (
    <section aria-labelledby="work-title" className="py-28 sm:py-40">
      <Container>
        <SectionHeader
          id="work-title"
          title="Selected engineering work"
          intro="Five enterprise platforms I build modules for at Tecnostac. Architecture is simplified and representative."
          link={{ to: '/work', label: 'All case studies' }}
        />
        <div className="mt-12 border-b border-line sm:mt-16">
          {caseStudies.map((cs) => (
            <WorkRow key={cs.slug} cs={cs} />
          ))}
        </div>
      </Container>
    </section>
  );
}

const capabilityIcons: Record<(typeof capabilities)[number]['id'], LucideIcon> = {
  backend: Server,
  cloud: Cloud,
  data: Database,
  architecture: Layers,
  security: ShieldCheck,
  payments: CreditCard,
};

export function WhatIBuild() {
  return (
    <section aria-labelledby="build-title" className="border-t border-line py-28 sm:py-40">
      <Container>
        <SectionHeader id="build-title" title="What I build" intro="Six areas I work in, each grounded in production systems." />
        <ul className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((c) => {
            const Icon = capabilityIcons[c.id];
            return (
              <li key={c.id} className="bg-ink p-7 sm:p-8">
                <Icon aria-hidden="true" className="size-5 text-graphite" strokeWidth={1.6} />
                <h3 className="mt-6 text-xl font-semibold tracking-[-0.02em]">{c.title}</h3>
                <p className="mt-2 leading-relaxed text-graphite">{c.body}</p>
                <p className="mt-6 font-mono text-[12.5px] leading-6 text-paper/80"><DotList items={c.items} /></p>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}

export function IndependentProducts() {
  const [featured, ...rest] = products;
  return (
    <section aria-labelledby="products-title" className="border-t border-line py-28 sm:py-40">
      <Container>
        <SectionHeader
          id="products-title"
          title="Independent products"
          intro="Products I designed, architected and built independently."
          link={{ to: '/projects', label: 'All products' }}
        />
        <div className="mt-12 grid gap-6 sm:mt-16 lg:grid-cols-3">
          <ProductCard product={featured} featured />
          {rest.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </Container>
    </section>
  );
}

export function HowIEngineer() {
  return (
    <section aria-labelledby="how-title" className="border-t border-line py-28 sm:py-40">
      <Container>
        <SectionHeader id="how-title" title="How I engineer" intro="Six steps that show up in every system on this site." />
        <div className="mt-12 sm:mt-16">
          <PrincipleList />
        </div>
      </Container>
    </section>
  );
}

export function LabTeaser() {
  const payments = flows.find((f) => f.id === 'payments');
  const pipeline = payments?.stages.filter((s) => s.kind !== 'source') ?? [];
  const sources = payments?.stages.filter((s) => s.kind === 'source') ?? [];

  return (
    <section aria-labelledby="lab-title" className="border-t border-line py-28 sm:py-40">
      <Container>
        <div className="surface grid gap-12 rounded-3xl p-7 sm:p-12 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <h2 id="lab-title" className="text-[clamp(2.25rem,4.8vw,4rem)] font-medium leading-[1] tracking-[-0.045em]">
              Engineering lab
            </h2>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-graphite">
              Follow a payment from a provider callback to the ledger, one stage at a time, and see why each stage exists.
            </p>
            <ButtonLink to="/lab" className="mt-8">
              Open the lab
            </ButtonLink>
          </div>

          <div aria-hidden="true" className="font-mono text-[13px]">
            <div className="flex flex-wrap gap-2">
              {sources.map((s) => (
                <span key={s.id} className="rounded-lg border border-line bg-ink px-3 py-2 text-graphite">
                  {s.title}
                </span>
              ))}
            </div>
            <ol className="relative mt-4 space-y-2 before:absolute before:bottom-5 before:left-[15px] before:top-5 before:w-px before:bg-line">
              {pipeline.map((s, i) => (
                <li
                  key={s.id}
                  className="relative flex items-center gap-3 rounded-lg border border-line bg-ink px-2.5 py-2 text-paper/85"
                >
                  <span className="grid size-[18px] place-items-center rounded-full border border-line-strong text-[10px] text-graphite">
                    {i + 1}
                  </span>
                  {s.title}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </section>
  );
}
