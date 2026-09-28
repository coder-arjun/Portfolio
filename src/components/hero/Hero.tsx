import { motion, useReducedMotion } from 'motion/react';
import { profile } from '../../data/profile';
import { easeOutExpo } from '../../animations/timing';
import { ButtonLink, ExternalButton } from '../ui/Actions';
import { Container } from '../ui/Container';
import { Portrait } from './Portrait';
import { LocalTime } from './LocalTime';

export function Hero() {
  const reduced = useReducedMotion();
  // The site's one orchestrated moment: the words rise while the portrait slowly comes up out of the dark.
  const rise = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 1.1, delay, ease: easeOutExpo },
        };
  const lightUp = reduced
    ? {}
    : {
        initial: { opacity: 0, scale: 1.045, filter: 'brightness(0.35)' },
        animate: { opacity: 1, scale: 1, filter: 'brightness(1)' },
        transition: { duration: 2.4, ease: easeOutExpo },
      };

  return (
    <section aria-labelledby="hero-title" className="relative overflow-x-clip">
      {/* Stage light: a cool bloom behind the portrait and a faint neutral wash top-left. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -right-[18%] -top-[28%] h-[1000px] w-[1000px] rounded-full bg-[radial-gradient(closest-side,rgb(91_140_255/0.13),transparent)]" />
        <div className="absolute -left-[25%] -top-[35%] h-[760px] w-[1000px] rounded-full bg-[radial-gradient(closest-side,rgb(255_255_255/0.035),transparent)]" />
      </div>

      <Container className="grid items-center gap-14 pb-20 pt-6 sm:pt-10 lg:min-h-[calc(100svh-5rem)] lg:grid-cols-[1.15fr_1fr] lg:gap-6 lg:pb-14 lg:pt-2">
        <div className="relative z-10 lg:pb-8">
          <motion.h1
            id="hero-title"
            className="text-[clamp(3.75rem,10.5vw,8rem)] font-medium leading-[0.86] tracking-[-0.06em]"
            {...rise(0.05)}
          >
            {profile.name}
          </motion.h1>

          <motion.p className="mt-8 flex flex-col gap-1 font-mono text-[13px] text-graphite sm:flex-row sm:gap-0 sm:text-sm" {...rise(0.15)}>
            <span className="text-paper/90">{profile.role}</span>
            <span aria-hidden="true" className="mx-3 hidden text-line-strong sm:inline">
              /
            </span>
            <span>{profile.focus.join(' · ')}</span>
          </motion.p>

          <motion.p
            className="mt-9 max-w-[23ch] text-[clamp(1.55rem,2.7vw,2.15rem)] font-light leading-[1.2] tracking-[-0.025em] text-paper/90"
            {...rise(0.25)}
          >
            <span className="sm:hidden">Building production-grade software systems.</span>
            <span className="hidden sm:inline">{profile.headline}</span>
          </motion.p>

          <motion.div className="mt-11 flex flex-wrap gap-3" {...rise(0.35)}>
            <ButtonLink to="/work">Explore my work</ButtonLink>
            <ExternalButton href={profile.github}>GitHub</ExternalButton>
          </motion.div>
        </div>

        <div className="relative mx-auto w-full max-w-[340px] sm:max-w-[420px] lg:mx-0 lg:ml-auto lg:max-w-[460px]">
          <motion.div className="relative" {...lightUp}>
            {/* Backlight: a cool glow behind the portrait, visible only where its edges dissolve. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-[14%] -z-10 bg-[radial-gradient(closest-side_at_58%_36%,rgb(91_140_255/0.2),transparent)]"
            />
            <div className="portrait-fade">
              <Portrait
                eager
                sizes="(min-width: 1024px) 460px, (min-width: 640px) 420px, 340px"
                className="portrait-grade"
              />
            </div>
          </motion.div>
          <motion.p
            className="relative -mt-6 flex items-center justify-between gap-4 font-mono text-[12px] text-graphite sm:-mt-10"
            {...rise(0.9)}
          >
            <span>Based in {profile.location}</span>
            <LocalTime />
          </motion.p>
        </div>
      </Container>
    </section>
  );
}
