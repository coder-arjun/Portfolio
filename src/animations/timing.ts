/** Shared motion timing. The hero load sequence is the site's one orchestrated moment. */
export const easeOutExpo = [0.16, 1, 0.3, 1] as const;

export const heroSequence = {
  /** Delay before the diagram starts drawing, after the headline has settled. */
  diagramStart: 0.35,
  /** Time between diagram layers appearing. */
  layerGap: 0.22,
  /** Request pulses: one full trip through all layers. */
  pulseCycle: 3.6,
} as const;
