import { useEffect, useId, useRef, useState } from 'react';
import { motion, useReducedMotion, type Variants } from 'motion/react';
import type { DiagramNode, DiagramSpec } from '../../types';
import { cn } from '../../lib/cn';
import { easeOutExpo, heroSequence } from '../../animations/timing';

const DEFAULT_W = 150;
const DEFAULT_H = 46;

type Box = { x: number; y: number; w: number; h: number };
const toBox = (n: DiagramNode): Box => ({ x: n.x, y: n.y, w: n.w ?? DEFAULT_W, h: n.h ?? DEFAULT_H });

/** Route an edge between two boxes: an S-curve between rows, a horizontal curve within a row. */
function edgeGeometry(a: Box, b: Box) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  if (Math.abs(dy) > 30) {
    const dir = Math.sign(dy);
    const sy = a.y + (dir * a.h) / 2;
    const ty = b.y - (dir * b.h) / 2;
    const my = (sy + ty) / 2;
    return { d: `M ${a.x} ${sy} C ${a.x} ${my}, ${b.x} ${my}, ${b.x} ${ty}`, end: { x: b.x, y: ty } };
  }
  const dir = Math.sign(dx) || 1;
  const sx = a.x + (dir * a.w) / 2;
  const tx = b.x - (dir * b.w) / 2;
  const mx = (sx + tx) / 2;
  return { d: `M ${sx} ${a.y} C ${mx} ${a.y}, ${mx} ${b.y}, ${tx} ${b.y}`, end: { x: tx, y: b.y } };
}

/** Layer index of each node = rank of its row (distinct y) from the top. */
function layersOf(nodes: DiagramNode[]) {
  const rows = [...new Set(nodes.map((n) => n.y))].sort((p, q) => p - q);
  return new Map(nodes.map((n) => [n.id, rows.indexOf(n.y)]));
}

const EDGE = 'rgb(255 255 255 / 0.2)';
const EDGE_QUIET = 'rgb(255 255 255 / 0.12)';

type Mode = 'static' | 'reveal' | 'live';

type Props = {
  spec: DiagramSpec;
  /** static: no motion · reveal: draws once when scrolled into view · live: load sequence + request pulses (hero). */
  mode?: Mode;
  variant?: 'full' | 'thumb';
  className?: string;
};

export function Diagram({ spec, mode = 'reveal', variant = 'full', className }: Props) {
  const uid = useId();
  const reduced = useReducedMotion();
  const scroller = useRef<HTMLDivElement>(null);
  const pulseTimer = useRef<number | undefined>(undefined);
  const [pulsing, setPulsing] = useState(false);
  useEffect(() => () => window.clearTimeout(pulseTimer.current), []);

  // When the figure is wider than its container (phones), open it centred on the main spine.
  useEffect(() => {
    const el = scroller.current;
    if (el && el.scrollWidth > el.clientWidth) el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2;
  }, []);
  const effective: Mode = reduced ? 'static' : mode;
  const layers = layersOf(spec.nodes);
  const byId = new Map(spec.nodes.map((n) => [n.id, n]));
  const layerCount = Math.max(...layers.values()) + 1;
  const thumb = variant === 'thumb';

  const gap = effective === 'live' ? heroSequence.layerGap : 0.14;
  const start = effective === 'live' ? heroSequence.diagramStart : 0.05;

  const nodeVariants: Variants = {
    hidden: { opacity: 0, y: 6 },
    show: (layer: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: start + layer * gap, duration: 0.6, ease: easeOutExpo },
    }),
  };
  const edgeVariants: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    show: (layer: number) => ({
      pathLength: 1,
      opacity: 1,
      transition: { delay: start + (layer + 0.5) * gap, duration: 0.7, ease: easeOutExpo },
    }),
  };
  const fadeVariants: Variants = {
    hidden: { opacity: 0 },
    show: (layer: number) => ({ opacity: 1, transition: { delay: start + (layer + 0.8) * gap, duration: 0.5 } }),
  };


  const edges = spec.edges.map((e, i) => {
    const a = byId.get(e.from);
    const b = byId.get(e.to);
    if (!a || !b) throw new Error(`Diagram "${spec.title}": unknown edge ${e.from} → ${e.to}`);
    return { ...e, key: `${e.from}-${e.to}-${i}`, layer: layers.get(a.id) ?? 0, ...edgeGeometry(toBox(a), toBox(b)) };
  });

  // Request pulses (hero only): one pulse per edge, offset by layer so a request appears to travel top to bottom.
  const edgeLayers = [...new Set(edges.map((e) => e.layer))].sort((p, q) => p - q);
  const cycle = heroSequence.pulseCycle;
  const frac = 1 / Math.max(edgeLayers.length, 1);
  const pulseStart = start + layerCount * gap + 0.5;

  // live: draws itself when scrolled into view, then request pulses start once the drawing is complete.
  const svgMotion =
    effective === 'live'
      ? {
          initial: 'hidden',
          whileInView: 'show',
          viewport: { once: true, amount: 0.4 },
          onViewportEnter: () => {
            pulseTimer.current ??= window.setTimeout(() => setPulsing(true), pulseStart * 1000);
          },
        }
      : effective === 'reveal'
        ? { initial: 'hidden', whileInView: 'show', viewport: { once: true, amount: 0.3 } }
        : {};
  const animated = effective !== 'static';

  return (
    <div
      ref={scroller}
      className={cn(spec.minWidth !== undefined && 'scroll-x', className)}
      tabIndex={spec.minWidth ? 0 : undefined}
      role={spec.minWidth ? 'region' : undefined}
      aria-label={spec.minWidth ? `${spec.title} — scroll horizontally on small screens` : undefined}
    >
      <motion.svg
        viewBox={`0 0 ${spec.width} ${spec.height}`}
        width="100%"
        role="img"
        aria-labelledby={`${uid}-t ${uid}-d`}
        className={cn('diagram block h-auto', thumb && 'diagram-thumb')}
        style={spec.minWidth ? { minWidth: spec.minWidth } : undefined}
        {...svgMotion}
      >
        <title id={`${uid}-t`}>{spec.title}</title>
        <desc id={`${uid}-d`}>{spec.description}</desc>

        <g fill="none" strokeLinecap="round">
          {edges.map((e) => {
            const stroke = e.quiet ? EDGE_QUIET : EDGE;
            const common = {
              d: e.d,
              className: 'edge',
              stroke,
              strokeWidth: 1.2,
              vectorEffect: 'non-scaling-stroke' as const,
              strokeDasharray: e.quiet ? '3 4' : undefined,
            };
            return (
              <g key={e.key}>
                {animated ? (
                  <motion.path {...common} custom={e.layer} variants={e.quiet ? fadeVariants : edgeVariants} />
                ) : (
                  <path {...common} />
                )}
                {!thumb &&
                  (animated ? (
                    <motion.circle cx={e.end.x} cy={e.end.y} r={2.2} fill={stroke} custom={e.layer} variants={fadeVariants} />
                  ) : (
                    <circle cx={e.end.x} cy={e.end.y} r={2.2} fill={stroke} />
                  ))}
              </g>
            );
          })}
        </g>

        {spec.nodes.map((n) => {
          const node = <NodeShape key={n.id} node={n} thumb={thumb} />;
          return animated ? (
            <motion.g key={n.id} custom={layers.get(n.id) ?? 0} variants={nodeVariants}>
              {node}
            </motion.g>
          ) : (
            node
          );
        })}

        {effective === 'live' &&
          pulsing &&
          edges.map((e) => {
            // Offsets are relative to each other, so the chain stays in phase whenever the pulses mount.
            const begin = `${(edgeLayers.indexOf(e.layer) * cycle * frac).toFixed(2)}s`;
            const travel = frac.toFixed(4);
            return (
              <g key={`pulse-${e.key}`} opacity={0} aria-hidden="true">
                <circle r={7} fill="rgb(91 140 255 / 0.18)" />
                <circle r={2.6} fill="var(--color-signal)" />
                <animateMotion
                  path={e.d}
                  dur={`${cycle}s`}
                  begin={begin}
                  repeatCount="indefinite"
                  keyPoints="0;1;1"
                  keyTimes={`0;${travel};1`}
                  calcMode="linear"
                />
                <animate
                  attributeName="opacity"
                  values="0;1;1;0;0"
                  keyTimes={`0;0.03;${(frac - 0.03).toFixed(4)};${travel};1`}
                  dur={`${cycle}s`}
                  begin={begin}
                  repeatCount="indefinite"
                />
              </g>
            );
          })}
      </motion.svg>
    </div>
  );
}

function NodeShape({ node: n, thumb }: { node: DiagramNode; thumb: boolean }) {
  const { w, h } = toBox(n);
  const accent = n.tone === 'accent';
  const quiet = n.tone === 'quiet';
  const stroke = accent ? 'rgb(91 140 255 / 0.65)' : quiet ? 'rgb(255 255 255 / 0.1)' : 'rgb(255 255 255 / 0.17)';
  const fill = accent ? 'rgb(91 140 255 / 0.09)' : 'var(--color-panel)';
  // Thumbnails drop second lines unless the node was sized to hold one.
  const hasSub = Boolean(n.sub) && (!thumb || h >= 40);

  return (
    <g transform={`translate(${n.x - w / 2} ${n.y - h / 2})`}>
      <rect width={w} height={h} rx={thumb ? 7 : 10} fill={fill} stroke={stroke} strokeWidth={1} vectorEffect="non-scaling-stroke" />
      {n.shape === 'store' && (
        <line x1={8} x2={w - 8} y1={6} y2={6} stroke={stroke} strokeWidth={1} vectorEffect="non-scaling-stroke" />
      )}
      <text
        x={w / 2}
        y={hasSub ? h / 2 - 7 : h / 2 + (n.shape === 'store' ? 2 : 0)}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={thumb ? 12 : 13.5}
        fontWeight={500}
        fill={quiet ? 'var(--color-graphite)' : 'var(--color-paper)'}
      >
        {n.label}
      </text>
      {hasSub && (
        <text
          className="node-sub"
          x={w / 2}
          y={h / 2 + 10}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={10.5}
          fill="var(--color-graphite)"
        >
          {n.sub}
        </text>
      )}
    </g>
  );
}
