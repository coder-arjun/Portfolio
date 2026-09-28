import { flows } from '../data/lab';
import { pages } from '../data/routes';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { PageHeader } from '../components/layout/PageParts';
import { Container } from '../components/ui/Container';
import { FlowExplorer } from '../components/lab/FlowExplorer';

export default function Lab() {
  useDocumentMeta(pages.lab);
  return (
    <>
      <PageHeader
        title="Engineering lab"
        intro="Interactive walk-throughs of patterns I have built into production systems. Select a stage, or press play, to see what happens and why it matters."
      >
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-graphite/90">
          Simplified for illustration: general patterns, not any employer’s implementation.
        </p>
      </PageHeader>
      <Container className="pb-24 pt-6">
        {flows.map((f) => (
          <FlowExplorer key={f.id} flow={f} />
        ))}
      </Container>
    </>
  );
}
