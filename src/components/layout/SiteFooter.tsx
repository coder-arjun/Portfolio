import { Link } from 'react-router';
import { profile } from '../../data/profile';
import { Container } from '../ui/Container';

export function SiteFooter() {
  return (
    <footer className="border-t border-line py-10 text-sm text-graphite">
      <Container className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {profile.name}. Built with React, TypeScript, Tailwind CSS and Motion.
        </p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          <li>
            <a className="hover:text-paper" href={`mailto:${profile.email}`}>
              Email
            </a>
          </li>
          <li>
            <a className="hover:text-paper" href={profile.linkedin} target="_blank" rel="noreferrer">
              LinkedIn<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </li>
          <li>
            <a className="hover:text-paper" href={profile.github} target="_blank" rel="noreferrer">
              GitHub<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </li>
          <li>
            <Link className="hover:text-paper" to="/lab">
              Engineering lab
            </Link>
          </li>
        </ul>
      </Container>
    </footer>
  );
}
