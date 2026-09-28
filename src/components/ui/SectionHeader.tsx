import type { ReactNode } from 'react';
import { TextLink } from './Actions';

type Props = {
  id?: string;
  title: string;
  intro?: ReactNode;
  /** Optional link to the section's full page. */
  link?: { to: string; label: string };
};

export function SectionHeader({ id, title, intro, link }: Props) {
  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <div className="max-w-3xl">
        <h2 id={id} className="text-[clamp(2.25rem,4.8vw,4rem)] font-medium leading-[1] tracking-[-0.045em]">
          {title}
        </h2>
        {intro && <p className="mt-5 text-lg leading-relaxed text-graphite sm:text-xl">{intro}</p>}
      </div>
      {link && (
        <TextLink to={link.to} className="shrink-0">
          {link.label}
        </TextLink>
      )}
    </div>
  );
}
