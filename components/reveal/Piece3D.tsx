import { useId } from "react";
import { fitback } from "@/config/fitback";
import { piecePath, type Edges, type KnobAt } from "@/lib/piece";

const PAD = 32; // room for knobs + shadow around the 100×100 cell
export const PIECE_BOX = 100 + PAD * 2;

/**
 * A single glossy, puffy puzzle piece in the Fitback style:
 * soft gradient body, light rim top-left, dark rim bottom-right,
 * a specular gloss spot and a soft contact shadow.
 */
export default function Piece3D({
  tone,
  edges,
  at,
  size,
  shadow = true,
  className,
}: {
  tone: "green" | "purple";
  edges: Edges;
  at?: KnobAt;
  size: number; // rendered px for one 100-unit cell
  shadow?: boolean;
  className?: string;
}) {
  const uid = useId().replace(/:/g, "");
  const c = fitback.colors[tone];
  const d = piecePath(edges, at);
  const px = (size / 100) * PIECE_BOX;

  return (
    <svg
      width={px}
      height={px}
      viewBox={`${-PAD} ${-PAD} ${PIECE_BOX} ${PIECE_BOX}`}
      className={className}
      aria-hidden
      style={{ overflow: "visible", display: "block" }}
    >
      <defs>
        <linearGradient id={`body${uid}`} x1="0.1" y1="0" x2="0.85" y2="1">
          <stop offset="0" stopColor={c.light} />
          <stop offset="0.45" stopColor={c.base} />
          <stop offset="1" stopColor={c.deep} />
        </linearGradient>
        <radialGradient id={`gloss${uid}`} cx="0.3" cy="0.24" r="0.42">
          <stop offset="0" stopColor="#fff" stopOpacity="0.5" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0.12" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <filter id={`puff${uid}`} x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
          <feGaussianBlur in="SourceAlpha" stdDeviation="5.5" result="b" />
          <feOffset in="b" dx="-4.5" dy="-6" result="b1" />
          <feComposite in="SourceAlpha" in2="b1" operator="out" result="rimDark" />
          <feFlood floodColor={c.rim} floodOpacity="0.9" />
          <feComposite in2="rimDark" operator="in" result="shade" />
          <feOffset in="b" dx="4" dy="5" result="b2" />
          <feComposite in="SourceAlpha" in2="b2" operator="out" result="rimLight" />
          <feFlood floodColor="#ffffff" floodOpacity="0.85" />
          <feComposite in2="rimLight" operator="in" result="hi" />
          <feMerge>
            <feMergeNode in="SourceGraphic" />
            <feMergeNode in="shade" />
            <feMergeNode in="hi" />
          </feMerge>
          <feComposite in2="SourceAlpha" operator="in" />
        </filter>
        <filter id={`shadow${uid}`} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
      </defs>

      {shadow && <path d={d} transform="translate(2 7)" fill={fitback.colors.shadow} opacity="0.32" filter={`url(#shadow${uid})`} />}
      <path d={d} fill={`url(#body${uid})`} filter={`url(#puff${uid})`} />
      <path d={d} fill={`url(#gloss${uid})`} />
    </svg>
  );
}
