import { heroSystem, heroSystemCompact } from '../../data/diagrams';
import { Diagram } from '../architecture/Diagram';
import { Container } from '../ui/Container';

/** The signature system map, given a stage of its own right after the hero. Pulses trace one request. */
export function SystemsShowcase() {
  return (
    <section aria-labelledby="systems-title" className="relative overflow-x-clip py-28 sm:py-40">
      <Container className="grid items-center gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
        <div>
          <h2 id="systems-title" className="text-[clamp(2.25rem,4.8vw,4rem)] font-medium leading-[1] tracking-[-0.045em]">
            The shape of what I build
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-graphite sm:text-xl">
            Clients reach an API. Payments, events and background workers do the heavy lifting, and everything lands in data that has to be
            right. Every project below is a variation on this shape.
          </p>
        </div>

        <figure className="relative">
          <div aria-hidden="true" className="dot-grid pointer-events-none absolute -inset-10 -z-10" />
          <div className="surface rounded-3xl p-4 sm:p-8">
            <Diagram spec={heroSystem} mode="live" className="hidden sm:block" />
            <Diagram spec={heroSystemCompact} mode="live" className="sm:hidden" />
          </div>
          <figcaption className="mt-4 text-[13px] leading-relaxed text-graphite">
            The pulses follow a single request from the client to the data layer.
          </figcaption>
        </figure>
      </Container>
    </section>
  );
}
