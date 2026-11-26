"use client";
import { fitback } from "@/config/fitback";
import type { BookingStatus } from "../Experience";
import Piece3D from "../reveal/Piece3D";
import BookButton from "./BookButton";
import { Meta } from "./Meta";

const flat = { top: 0, right: 0, bottom: 0, left: 0 };

/** Glossy rounded tiles in the brand's green and purple — a quiet nod, not a reveal. */
export function BrandTiles({ size = 44, className = "" }: { size?: number; className?: string }) {
  return (
    <div dir="ltr" aria-hidden className={`pointer-events-none ${className || "relative"}`} style={{ width: size * 2.3, height: size * 2.3 }}>
      <div className="absolute left-0 top-0 rotate-[-8deg]"><Piece3D tone="green" edges={flat} size={size} /></div>
      <div className="absolute top-[4%] rotate-[6deg]" style={{ left: size * 1.08 }}><Piece3D tone="purple" edges={flat} size={size} /></div>
      <div className="absolute rotate-[4deg]" style={{ top: size * 1.1, left: size * 0.05 }}><Piece3D tone="purple" edges={flat} size={size} /></div>
    </div>
  );
}

export default function FairBanner({
  status,
  onBook,
  onDetails,
}: {
  status: BookingStatus;
  onBook: () => void;
  onDetails: () => void;
}) {
  const f = fitback.fair;
  return (
    <section aria-label="الفعالية المميزة" className="relative overflow-hidden rounded-[2rem] bg-plum text-paper">
      {/* soft colour fields */}
      <div aria-hidden className="absolute -left-24 -top-28 size-80 rounded-full bg-purple/45 blur-3xl" />
      <div aria-hidden className="absolute -bottom-32 right-[-6rem] size-80 rounded-full bg-mint/30 blur-3xl" />
      {/* fine grid, like a booth floor plan */}
      <svg aria-hidden className="absolute inset-0 h-full w-full opacity-[0.07]">
        <defs>
          <pattern id="fairgrid" width="28" height="28" patternUnits="userSpaceOnUse">
            <path d="M28 0H0V28" fill="none" stroke="#fff" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#fairgrid)" />
      </svg>

      <div className="relative grid gap-6 p-5 pb-6 sm:p-8 md:grid-cols-[1.1fr_1fr] md:items-end md:p-10">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-mint px-3 py-1 text-xs font-bold text-plum">الفعالية المميزة</span>
            <span className="rounded-full border border-paper/25 px-3 py-1 text-xs text-paper/85">جامعات · مجاناً</span>
          </div>

          <div dir="ltr" className="mt-6 text-right">
            <p className="latin-display text-[4.6rem] text-mint sm:text-[6rem]">
              {f.title.split(" ")[0]}
              <br />
              {f.title.split(" ").slice(1).join(" ")}
            </p>
            <p className="mt-2 font-[family-name:var(--font-scene)] text-[1.15rem] font-semibold tracking-tight text-lilac sm:text-[1.4rem]">
              Software Engineering Fair
            </p>
          </div>
          <p className="headline mt-1 text-[1.35rem] text-paper">{f.subtitle}</p>
        </div>

        <div className="relative">
          <BrandTiles size={40} className="absolute -top-2 left-0 hidden md:block" />
          <ul className="grid gap-2.5 text-[0.98rem] text-paper/90 md:pt-24">
            <Meta icon="cal">{f.date}</Meta>
            <Meta icon="clock">{f.time}</Meta>
            <Meta icon="pin">{f.location}</Meta>
          </ul>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <BookButton status={status} onClick={onBook} className="min-w-[11rem] flex-1 sm:flex-none" />
            <button onClick={onDetails} className="h-[3.25rem] rounded-full border border-paper/25 px-6 font-semibold text-paper hover:bg-paper/10">
              التفاصيل
            </button>
          </div>
        </div>
      </div>

      <BrandTiles size={30} className="absolute left-4 top-5 md:hidden" />
    </section>
  );
}
