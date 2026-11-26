/**
 * Rounded, chunky jigsaw outlines modelled on the Fitback logo.
 * One cell = 100 units. Edges: +1 knob out, -1 socket in, 0 flat.
 */

export type Edges = { top: number; right: number; bottom: number; left: number };
/** Where the knob sits along each edge (0..1), read in the edge's clockwise direction. */
export type KnobAt = { top?: number; right?: number; bottom?: number; left?: number };

const R = 24; // corner radius
const HEAD = 17; // knob head radius
const NECK = 11; // half neck width
const REACH = 19; // head centre distance from edge

type V = [number, number];

function edge(a: V, d: V, n: V, len: number, tab: number, at: number): string {
  // corners eat R from both ends
  const P = (u: number, v: number) => {
    const x = a[0] + d[0] * u + n[0] * v * tab;
    const y = a[1] + d[1] * u + n[1] * v * tab;
    return `${x.toFixed(2)} ${y.toFixed(2)}`;
  };
  const end = `L${P(len - R, 0)}`;
  if (tab === 0) return end;
  const c = R + (len - 2 * R) * at;
  // neck meets the head circle at height h
  const h = REACH - Math.sqrt(HEAD * HEAD - NECK * NECK);
  const sweep = tab > 0 ? 1 : 0;
  return [
    `L${P(c - NECK - 7, 0)}`,
    `C${P(c - NECK - 1, 0)} ${P(c - NECK + 1.5, h * 0.35)} ${P(c - NECK, h)}`,
    `A${HEAD} ${HEAD} 0 1 ${sweep} ${P(c + NECK, h)}`,
    `C${P(c + NECK - 1.5, h * 0.35)} ${P(c + NECK + 1, 0)} ${P(c + NECK + 7, 0)}`,
    end,
  ].join(" ");
}

export function piecePath(e: Edges, at: KnobAt = {}): string {
  const L = 100;
  return [
    `M${R} 0`,
    edge([0, 0], [1, 0], [0, -1], L, e.top, at.top ?? 0.5),
    `A${R} ${R} 0 0 1 ${L} ${R}`,
    edge([L, 0], [0, 1], [1, 0], L, e.right, at.right ?? 0.5),
    `A${R} ${R} 0 0 1 ${L - R} ${L}`,
    edge([L, L], [-1, 0], [0, 1], L, e.bottom, at.bottom ?? 0.5),
    `A${R} ${R} 0 0 1 0 ${L - R}`,
    edge([0, L], [0, -1], [-1, 0], L, e.left, at.left ?? 0.5),
    `A${R} ${R} 0 0 1 ${R} 0`,
    "Z",
  ].join(" ");
}

/** The four logo pieces. Knob positions follow the official mark. */
export const LOGO_PIECES = [
  // top-left, green
  { id: "tl", tone: "green" as const, col: 0, row: 0, edges: { top: 0, right: -1, bottom: 1, left: 0 }, at: { right: 0.42, bottom: 0.55 } },
  // top-right, purple
  { id: "tr", tone: "purple" as const, col: 1, row: 0, edges: { top: 0, right: 0, bottom: -1, left: 1 }, at: { left: 0.58, bottom: 0.55 } },
  // bottom-left, purple
  { id: "bl", tone: "purple" as const, col: 0, row: 1, edges: { top: -1, right: 1, bottom: 0, left: 0 }, at: { top: 0.45, right: 0.42 } },
  // bottom-right, green — the one that arrives last
  { id: "br", tone: "green" as const, col: 1, row: 1, edges: { top: 1, right: 0, bottom: 0, left: -1 }, at: { top: 0.45, left: 0.58 } },
];

/** Grid pitch in units (cell + seam), matched to the logo artwork. */
export const PITCH = 104;
/** Final resting tilt/offset of the last piece, as drawn in the logo. */
export const LAST_PIECE_POSE = { dx: 5, dy: 5, rotate: 21 };
