import type { DiagramSpec } from '../../types';
import { Diagram } from './Diagram';

type Props = {
  spec: DiagramSpec;
  /** Caption under the figure; professional work uses the representative-topology disclaimer. */
  caption?: string;
};

export const REPRESENTATIVE = 'Simplified architecture — representative, not production topology.';

export function DiagramFigure({ spec, caption }: Props) {
  return (
    <figure className="surface rounded-2xl p-4 sm:p-6">
      <Diagram spec={spec} mode="reveal" />
      {(caption || spec.minWidth) && (
        <figcaption className="mt-4 text-[13px] leading-relaxed text-graphite">
          {caption}
          {spec.minWidth && <span className="block md:hidden">Swipe sideways to see the whole diagram.</span>}
        </figcaption>
      )}
    </figure>
  );
}
