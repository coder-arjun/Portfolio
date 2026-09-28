import { pages } from '../data/routes';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { PageHeader } from '../components/layout/PageParts';
import { ButtonLink } from '../components/ui/Actions';

export default function NotFound() {
  useDocumentMeta(pages.notFound);
  return (
    <div className="pb-32">
      <PageHeader title="This page doesn’t exist." intro="The link may be out of date. The work, products and lab are all a click away.">
        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink to="/">Go to the home page</ButtonLink>
          <ButtonLink to="/work" variant="secondary">
            See the work
          </ButtonLink>
        </div>
      </PageHeader>
    </div>
  );
}
