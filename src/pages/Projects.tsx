import { products } from '../data/products';
import { pages } from '../data/routes';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { PageHeader } from '../components/layout/PageParts';
import { Container } from '../components/ui/Container';
import { ProductCard } from '../components/projects/ProductCard';
import { ContactSection } from '../components/contact/ContactSection';

export default function Projects() {
  useDocumentMeta(pages.projects);
  const [featured, ...rest] = products;

  return (
    <>
      <PageHeader
        title="Independent products"
        intro="Products I designed, architected and built independently, with AI-assisted development. All four are live, and their source is public on GitHub."
      />
      <Container className="pb-24 pt-12 sm:pt-16">
        <div className="grid gap-6 lg:grid-cols-3">
          <ProductCard product={featured} featured />
          {rest.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </Container>
      <ContactSection />
    </>
  );
}
