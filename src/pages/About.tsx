import { Link } from 'react-router';
import { education, experience } from '../data/experience';
import { findCaseStudy } from '../data/caseStudies';
import { profile } from '../data/profile';
import { expertise } from '../data/technologies';
import { pages } from '../data/routes';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { DetailSection, PageHeader } from '../components/layout/PageParts';
import { Container } from '../components/ui/Container';
import { PrincipleList } from '../components/sections/PrincipleList';
import { ContactSection } from '../components/contact/ContactSection';
import { DotList } from '../components/ui/DotList';
import { Portrait } from '../components/hero/Portrait';

export default function About() {
  useDocumentMeta(pages.about);

  return (
    <>
      <PageHeader title="About" intro={profile.statement} />

      <Container className="pt-8">
        <DetailSection id="profile" title="Profile">
          <div className="grid gap-10 xl:grid-cols-[1.4fr_1fr]">
            <div className="space-y-5 text-[17px] leading-relaxed text-paper/85">
              {profile.bio.map((para) => (
                <p key={para.slice(0, 24)}>{para}</p>
              ))}
            </div>
            <div className="grid content-start gap-8">
              <div className="portrait-fade w-full max-w-[260px]">
                <Portrait sizes="260px" className="portrait-grade" />
              </div>
              <dl className="grid content-start gap-5 text-[15px]">
                <div>
                  <dt className="text-sm text-graphite">Based in</dt>
                  <dd className="mt-1">{profile.location}</dd>
                </div>
                <div>
                  <dt className="text-sm text-graphite">Email</dt>
                  <dd className="mt-1">
                    <a className="underline-offset-4 hover:underline" href={`mailto:${profile.email}`}>
                      {profile.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-graphite">Elsewhere</dt>
                  <dd className="mt-1 flex gap-4">
                    <a className="underline-offset-4 hover:underline" href={profile.linkedin} target="_blank" rel="noreferrer">
                      LinkedIn<span className="sr-only"> (opens in a new tab)</span>
                    </a>
                    <a className="underline-offset-4 hover:underline" href={profile.github} target="_blank" rel="noreferrer">
                      GitHub<span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </DetailSection>

        <DetailSection id="experience" title="Experience">
          <ol className="divide-y divide-line border-y border-line">
            {experience.map((role) => (
              <li key={role.company} className="grid gap-3 py-8 md:grid-cols-[13rem_1fr] md:gap-8">
                <div>
                  <p className="font-mono text-[12.5px] text-graphite">{role.period}</p>
                  <p className="mt-2 text-sm text-graphite">{role.location}</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold tracking-[-0.02em]">
                    {role.title}, {role.company}
                  </h3>
                  <p className="mt-3 leading-relaxed text-paper/85">{role.summary}</p>
                  {role.points.length > 0 && (
                    <ul className="mt-4 space-y-2 text-graphite">
                      {role.points.map((pt) => (
                        <li key={pt} className="flex gap-3 leading-relaxed">
                          <span aria-hidden="true" className="mt-2.5 size-1 shrink-0 rounded-full bg-graphite" />
                          {pt}
                        </li>
                      ))}
                    </ul>
                  )}
                  {role.work && (
                    <ul className="mt-5 flex flex-wrap gap-2" aria-label="Case studies from this role">
                      {role.work.map((slug) => {
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
                  )}
                </div>
              </li>
            ))}
            <li className="grid gap-3 py-8 md:grid-cols-[13rem_1fr] md:gap-8">
              <p className="font-mono text-[12.5px] text-graphite">{education.period}</p>
              <div>
                <h3 className="text-xl font-semibold tracking-[-0.02em]">{education.degree}</h3>
                <p className="mt-2 text-graphite">{education.school}</p>
              </div>
            </li>
          </ol>
        </DetailSection>

        <DetailSection id="expertise" title="Technical expertise">
          <dl className="grid gap-x-10 gap-y-7 sm:grid-cols-2">
            {expertise.map((g) => (
              <div key={g.group}>
                <dt className="font-semibold tracking-[-0.01em]">{g.group}</dt>
                <dd className="mt-2 font-mono text-[12.5px] leading-6 text-graphite"><DotList items={g.items} /></dd>
              </div>
            ))}
          </dl>
        </DetailSection>

        <section aria-labelledby="philosophy" className="py-14 sm:py-16">
          <h2 id="philosophy" className="text-2xl font-semibold tracking-[-0.025em] sm:text-3xl">
            Engineering philosophy
          </h2>
          <div className="mt-10">
            <PrincipleList />
          </div>
        </section>
      </Container>
      <ContactSection />
    </>
  );
}
