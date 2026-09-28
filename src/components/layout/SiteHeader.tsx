import { Link, NavLink } from 'react-router';
import { ArrowUpRight } from 'lucide-react';
import { navItems } from '../navigation/navItems';
import { profile } from '../../data/profile';
import { useScrolled } from '../../hooks/useScrolled';
import { cn } from '../../lib/cn';
import { Container } from '../ui/Container';

export function SiteHeader() {
  const scrolled = useScrolled(12);

  return (
    <header
      className={cn(
        'sticky top-0 z-40 border-b transition-[background-color,border-color] duration-300',
        scrolled ? 'border-line bg-ink/80 backdrop-blur-md' : 'border-transparent bg-transparent',
      )}
    >
      <Container
        className={cn('flex items-center justify-between transition-[height] duration-300', scrolled ? 'h-14' : 'h-16 sm:h-20')}
      >
        <Link to="/" className="text-[15px] font-semibold tracking-[-0.01em] text-paper">
          {profile.name}
        </Link>

        <nav aria-label="Primary">
          <ul className="flex items-center gap-3.5 text-[13.5px] sm:gap-7 sm:text-sm">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    cn(
                      'relative py-2 transition-colors',
                      isActive
                        ? 'text-paper after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:bg-signal'
                        : 'text-graphite hover:text-paper',
                    )
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
            <li className="hidden sm:block">
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 py-2 text-graphite transition-colors hover:text-paper"
              >
                GitHub
                <ArrowUpRight aria-hidden="true" className="size-3.5" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  );
}
