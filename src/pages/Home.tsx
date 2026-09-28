import { pages } from '../data/routes';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { Hero } from '../components/hero/Hero';
import { ImpactStrip } from '../components/metrics/ImpactStrip';
import { SystemsShowcase } from '../components/sections/SystemsShowcase';
import {
  HowIEngineer,
  IndependentProducts,
  LabTeaser,
  SelectedWork,
  WhatIBuild,
} from '../components/sections/HomeSections';
import { ContactSection } from '../components/contact/ContactSection';

/* Who → what → how it fits together → proof → what else → contact. */
export default function Home() {
  useDocumentMeta(pages.home);
  return (
    <>
      <Hero />
      <ImpactStrip />
      <SystemsShowcase />
      <SelectedWork />
      <WhatIBuild />
      <IndependentProducts />
      <HowIEngineer />
      <LabTeaser />
      <ContactSection />
    </>
  );
}
