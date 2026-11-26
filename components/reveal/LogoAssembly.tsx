"use client";
/* eslint-disable @next/next/no-img-element */
import { useEffect, useMemo, useRef } from "react";
import { m } from "framer-motion";
import { fitback } from "@/config/fitback";
import { LOGO_PIECES, LAST_PIECE_POSE, PITCH } from "@/lib/piece";
import Piece3D, { PIECE_BOX } from "./Piece3D";

/**
 * Timeline (seconds). Four pieces pop in scattered, then fly in one by one,
 * each landing with a small squash and a soft flash. The last one settles at
 * the exact tilt it has in the logo, then the real logo takes over.
 */
export const T = {
  appear: 0.32,
  firstMove: 0.42,
  gap: 0.3,
  move: 0.5,
  get assembled() { return this.firstMove + this.gap * 3 + this.move; }, // ≈1.82
  get logo() { return this.assembled + 0.18; }, // ≈2.0
  logoDur: 0.5, // → ≈2.5s total
};

type Props = {
  width: number;
  viewport: { w: number; h: number };
  reduce: boolean;
  showLogo: boolean;
};

export default function LogoAssembly({ width, viewport, reduce, showLogo }: Props) {
  const { logo } = fitback;
  const k = width / logo.width;
  const unit = (logo.mark.cell * k) / 100;
  const height = logo.height * k;
  const off = (PIECE_BOX - 100) / 2;
  const buzzed = useRef(false);

  // Scatter targets: four corners of the screen, measured from each piece's resting place.
  const flights = useMemo(() => {
    const logoLeft = (viewport.w - width) / 2;
    const logoTop = (viewport.h - height) / 2;
    const spots = [
      { x: 0.24, y: 0.2, r: -34 },
      { x: 0.78, y: 0.25, r: 30 },
      { x: 0.2, y: 0.78, r: 26 },
      { x: 0.8, y: 0.8, r: -42 },
    ];
    return LOGO_PIECES.map((p, i) => {
      const last = p.id === "br";
      const restX = logo.mark.x * k + (p.col * PITCH + 50 + (last ? LAST_PIECE_POSE.dx : 0)) * unit;
      const restY = logo.mark.y * k + (p.row * PITCH + 50 + (last ? LAST_PIECE_POSE.dy : 0)) * unit;
      const s = spots[i];
      const moveStart = T.firstMove + T.gap * i;
      return {
        ...p,
        last,
        left: (p.col * PITCH - off + (last ? LAST_PIECE_POSE.dx : 0)) * unit,
        top: (p.row * PITCH - off + (last ? LAST_PIECE_POSE.dy : 0)) * unit,
        sx: s.x * viewport.w - (logoLeft + restX),
        sy: s.y * viewport.h - (logoTop + restY),
        r: s.r,
        finalR: last ? LAST_PIECE_POSE.rotate : 0,
        moveStart,
        land: moveStart + T.move,
      };
    });
  }, [viewport, width, height, k, unit, off, logo]);

  // Tiny haptic tick on each snap (Android only; silently ignored elsewhere).
  useEffect(() => {
    if (reduce || buzzed.current || typeof navigator === "undefined" || !("vibrate" in navigator)) return;
    buzzed.current = true;
    const ids = flights.map((f) => window.setTimeout(() => navigator.vibrate?.(f.last ? 18 : 8), f.land * 1000));
    return () => ids.forEach(clearTimeout);
  }, [flights, reduce]);

  return (
    <div dir="ltr" className="relative" style={{ width, height }} role="img" aria-label="Fitback">
      {/* the official logo, revealed once the puzzle is complete */}
      <m.img
        src={logo.src}
        alt=""
        width={width}
        height={height}
        draggable={false}
        className="absolute inset-0 h-full w-full select-none"
        initial={{ opacity: 0, clipPath: "inset(0% 56% 0% 0%)" }}
        animate={showLogo ? { opacity: 1, clipPath: "inset(0% 0% 0% 0%)" } : undefined}
        transition={{
          opacity: { duration: reduce ? 0.3 : 0.22 },
          clipPath: { duration: reduce ? 0 : T.logoDur, ease: [0.65, 0, 0.35, 1] },
        }}
      />

      {/* the animated 3D pieces */}
      <m.div
        className="absolute"
        style={{ left: 0, top: 0, width, height }}
        animate={{ opacity: showLogo ? 0 : 1 }}
        transition={{ duration: 0.28, delay: showLogo ? 0.12 : 0 }}
      >
        {flights.map((f, i) => {
          const total = f.land;
          const t = (s: number) => Math.min(1, s / total);
          return (
            <m.div
              key={f.id}
              className="absolute will-change-transform"
              style={{ left: f.left, top: f.top, zIndex: f.last ? 4 : i }}
              initial={
                reduce
                  ? { opacity: 0, x: 0, y: 0, rotate: f.finalR, scale: 1 }
                  : { opacity: 0, x: f.sx, y: f.sy, rotate: f.r - 14, scale: 0.5 }
              }
              animate={
                reduce
                  ? { opacity: 1 }
                  : {
                      opacity: [0, 1, 1, 1],
                      x: [f.sx, f.sx, f.sx * 0.94, 0],
                      y: [f.sy, f.sy - 6, f.sy * 0.94 - 4, 0],
                      rotate: [f.r - 14, f.r, f.r * 1.08, f.finalR],
                      scale: [0.5, 1.1, 1.1, 1],
                    }
              }
              transition={
                reduce
                  ? { duration: 0.3, delay: i * 0.05 }
                  : {
                      duration: total,
                      times: [0, t(T.appear + i * 0.05), t(f.moveStart), 1],
                      ease: ["backOut", "easeInOut", [0.3, 1.32, 0.55, 1]],
                    }
              }
            >
              {/* landing squash */}
              <m.div
                animate={reduce ? undefined : { scale: [1, 1.07, 0.97, 1] }}
                transition={{ duration: 0.3, delay: f.land - 0.02, times: [0, 0.35, 0.7, 1] }}
              >
                <Piece3D tone={f.tone} edges={f.edges} at={f.at} size={unit * 100} />
              </m.div>
              {/* landing flash */}
              {!reduce && (
                <m.span
                  aria-hidden
                  className="pointer-events-none absolute rounded-full"
                  style={{
                    left: "50%",
                    top: "50%",
                    width: unit * 150,
                    height: unit * 150,
                    marginLeft: -unit * 75,
                    marginTop: -unit * 75,
                    background: "radial-gradient(circle, rgba(255,255,255,.9) 0%, rgba(255,255,255,.35) 35%, transparent 65%)",
                  }}
                  initial={{ opacity: 0, scale: 0.4 }}
                  animate={{ opacity: [0, 0.9, 0], scale: [0.4, 1.1, 1.5] }}
                  transition={{ duration: 0.45, delay: f.land - 0.04 }}
                />
              )}
            </m.div>
          );
        })}
      </m.div>
    </div>
  );
}
