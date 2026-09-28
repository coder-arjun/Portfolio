import { ArrowUpRight } from 'lucide-react';
import { profile } from '../../data/profile';
import { Container } from '../ui/Container';

const channels = [
  { label: 'Email me', value: profile.email, href: `mailto:${profile.email}`, external: false },
  { label: 'LinkedIn', value: profile.linkedinLabel, href: profile.linkedin, external: true },
  { label: 'GitHub', value: profile.githubLabel, href: profile.github, external: true },
];

export function ContactSection() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="border-t border-line py-28 sm:py-40">
      <Container className="grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:items-end">
        <div className="min-w-0">
          <h2 id="contact-title" className="max-w-[12ch] text-[clamp(2.8rem,7vw,6rem)] font-medium leading-[0.92] tracking-[-0.055em]">
            Let’s build something meaningful.
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-graphite">
            Interested in .NET, Azure, SaaS, integrations or complex backend systems?
          </p>
        </div>

        <ul className="min-w-0 border-b border-line">
          {channels.map((c) => (
            <li key={c.label}>
              <a
                href={c.href}
                {...(c.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                className="group flex items-center justify-between gap-6 border-t border-line py-5 transition-colors hover:border-line-strong"
              >
                <span className="text-xl font-medium tracking-[-0.01em]">{c.label}</span>
                <span className="flex min-w-0 items-center gap-3 font-mono text-[12.5px] text-graphite group-hover:text-paper">
                  <span className="truncate">{c.value}</span>
                  <ArrowUpRight aria-hidden="true" className="size-4 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
                {c.external && <span className="sr-only">(opens in a new tab)</span>}
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
