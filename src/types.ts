/** A box (or data store) in an architecture diagram. Coordinates are the node's centre, in viewBox units. */
export type DiagramNode = {
  id: string;
  label: string;
  /** Optional second line, set in the monospace face. */
  sub?: string;
  x: number;
  y: number;
  w?: number;
  h?: number;
  tone?: 'default' | 'accent' | 'quiet';
  shape?: 'box' | 'store';
};

export type DiagramEdge = { from: string; to: string; quiet?: boolean };

export type DiagramSpec = {
  width: number;
  height: number;
  nodes: DiagramNode[];
  edges: DiagramEdge[];
  /** Accessible name. */
  title: string;
  /** Plain-language description of the flow, read by screen readers. */
  description: string;
  /** Below this rendered width (px) the figure scrolls horizontally instead of shrinking its text. */
  minWidth?: number;
};

export type CaseStudy = {
  slug: string;
  name: string;
  /** Short product category, e.g. "Core banking SaaS". */
  domain: string;
  tags: string[];
  summary: string;
  stack: string[];
  cardDiagram: DiagramSpec;
  context: string;
  role: string;
  architecture: DiagramSpec[];
  challenges: string[];
  built: { title: string; body: string }[];
  technology: string[];
  takeaway: string;
  seoTitle: string;
  seoDescription: string;
};

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  period: string;
  live: string;
  repo: string;
  /** What the home/projects card shows: a real screenshot, or the product's architecture. */
  cardVisual: 'screenshot' | 'diagram';
  /** Compact card-sized diagram, required when cardVisual is 'diagram'. */
  cardDiagram?: DiagramSpec;
  screenshot: { src: string; alt: string };
  cardFeatures: string[];
  cardStack: string[];
  features: string[];
  architecture: DiagramSpec;
  highlights: { title: string; body: string }[];
  stack: string[];
  /** Ledger-style module index (Finoma). */
  modules?: { name: string; note: string }[];
  /** Important caveat shown prominently (OPBT). */
  note?: string;
  seoTitle: string;
  seoDescription: string;
};

export type FlowStage = {
  id: string;
  title: string;
  body: string;
  why: string;
  /** Case-study slugs where this pattern was applied. */
  appliedIn: string[];
  /** Parallel inputs rendered side by side before the pipeline (e.g. payment providers). */
  kind?: 'source';
};

export type Flow = { id: string; title: string; summary: string; stages: FlowStage[] };
