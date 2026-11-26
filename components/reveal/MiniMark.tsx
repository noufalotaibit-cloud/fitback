"use client";
import { m } from "framer-motion";
import { LOGO_PIECES, LAST_PIECE_POSE, PITCH } from "@/lib/piece";
import Piece3D, { PIECE_BOX } from "./Piece3D";

/**
 * Small 2×2 version of the mark. With `animateLast`, the fourth piece drops
 * into place when scrolled into view ("You're the missing piece").
 */
export default function MiniMark({ cell, animateLast = false }: { cell: number; animateLast?: boolean }) {
  const unit = cell / 100;
  const off = (PIECE_BOX - 100) / 2;
  const size = (PITCH + 100 + LAST_PIECE_POSE.dx + 14) * unit;
  return (
    <div dir="ltr" className="relative shrink-0" style={{ width: size, height: size }} aria-hidden>
      {LOGO_PIECES.map((p) => {
        const last = p.id === "br";
        const style = {
          left: (p.col * PITCH - off + (last ? LAST_PIECE_POSE.dx : 0)) * unit,
          top: (p.row * PITCH - off + (last ? LAST_PIECE_POSE.dy : 0)) * unit,
        };
        const piece = <Piece3D tone={p.tone} edges={p.edges} at={p.at} size={cell} />;
        if (!last) return <div key={p.id} className="absolute" style={style}>{piece}</div>;
        return animateLast ? (
          <m.div
            key={p.id}
            className="absolute"
            style={style}
            initial={{ x: cell * 0.9, y: -cell * 1.1, rotate: -40, opacity: 0 }}
            whileInView={{ x: 0, y: 0, rotate: LAST_PIECE_POSE.rotate, opacity: 1 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ type: "spring", damping: 12, stiffness: 170, delay: 0.3 }}
          >
            {piece}
          </m.div>
        ) : (
          <div key={p.id} className="absolute" style={{ ...style, transform: `rotate(${LAST_PIECE_POSE.rotate}deg)` }}>{piece}</div>
        );
      })}
    </div>
  );
}
