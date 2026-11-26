"use client";
import { useEffect, useRef, useState } from "react";
import { m, useReducedMotion, type Variants } from "framer-motion";
import { fitback } from "@/config/fitback";
import { site } from "@/config/site";
import LogoAssembly, { T } from "./LogoAssembly";
import MiniMark from "./MiniMark";
import ShareButtons from "./ShareButtons";

// Start fetching the logo as soon as this chunk loads (after the first failed booking).
if (typeof window !== "undefined") {
  const img = new Image();
  img.src = fitback.logo.src;
}

const { copy, fair, colors } = fitback;

const list: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } } };
const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.2, 0.8, 0.2, 1] } },
};

export default function Reveal({ onReplay }: { onReplay: () => void }) {
  const reduce = !!useReducedMotion();
  const [vp, setVp] = useState<{ w: number; h: number } | null>(null);
  const [stage, setStage] = useState<"puzzle" | "logo" | "content">("puzzle");
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setVp({ w: window.innerWidth, h: window.innerHeight });
    document.title = `${fitback.name} | ${copy.signoff}`;
    root.current?.focus({ preventScroll: true });
    const at = (s: number) => s * 1000;
    const ids = reduce
      ? [window.setTimeout(() => setStage("logo"), 350), window.setTimeout(() => setStage("content"), 800)]
      : [
          window.setTimeout(() => setStage("logo"), at(T.logo)),
          window.setTimeout(() => setStage("content"), at(T.logo + T.logoDur + 0.25)),
        ];
    return () => {
      ids.forEach(clearTimeout);
      document.title = `${site.name} | ${site.tagline}`;
    };
  }, [reduce]);

  const logoWidth = vp ? Math.min(vp.w * 0.8, 380) : 0;
  const showContent = stage === "content";

  return (
    <m.div
      ref={root}
      tabIndex={-1}
      dir="rtl"
      lang="ar"
      className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden outline-none"
      style={{ background: `linear-gradient(180deg, ${colors.paper} 0%, ${colors.paperDeep} 100%)`, color: colors.ink }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
    >
      {/* soft colour fields from the logo */}
      <div aria-hidden className="pointer-events-none fixed inset-0">
        <div className="absolute -right-24 -top-24 size-80 rounded-full opacity-50 blur-3xl" style={{ background: colors.green.base }} />
        <div className="absolute -bottom-28 -left-24 size-96 rounded-full opacity-40 blur-3xl" style={{ background: colors.purple.base }} />
      </div>

      <div className={`relative mx-auto flex w-full max-w-xl flex-col px-6 ${showContent ? "pb-[calc(env(safe-area-inset-bottom)+2.5rem)] pt-10" : "min-h-dvh justify-center"}`}>
        {vp && (
          <m.div layout="position" transition={{ duration: 0.65, ease: [0.65, 0, 0.35, 1] }} className="flex justify-center">
            <LogoAssembly width={logoWidth} viewport={vp} reduce={reduce} showLogo={stage !== "puzzle"} />
          </m.div>
        )}

        {showContent && (
          <m.div variants={list} initial="hidden" animate="show" className="mt-10">
            <m.h1 variants={item} className="display text-[3.1rem] leading-[1.15] sm:text-[3.9rem]">
              {copy.headline}
            </m.h1>

            <div className="mt-5 space-y-3 text-[1.15rem] leading-[1.9] text-[#4A3D73] sm:text-[1.25rem]">
              {copy.lines.map((l) => (
                <m.p key={l} variants={item}>{l}</m.p>
              ))}
            </div>

            <m.p variants={item} className="display mt-8 text-[1.9rem] leading-snug">
              <Pivot text={copy.pivot} />
            </m.p>

            <m.div variants={item} className="mt-5 flex items-center gap-4 rounded-[1.75rem] bg-white/70 p-4 pe-5 shadow-[0_12px_30px_-20px_rgba(44,33,80,.5)] ring-1 ring-white">
              <MiniMark cell={24} />
              <p className="text-[1.2rem] font-semibold leading-[1.7]">{copy.insight}</p>
            </m.div>

            <m.p variants={item} className="mt-6 text-[1.15rem] leading-[1.9] text-[#4A3D73] sm:text-[1.25rem]">
              {copy.invite}
            </m.p>

            <m.ul variants={item} className="mt-6 grid gap-2.5" aria-label="تفاصيل البوث">
              {[
                { e: "📅", l: copy.labels.date, v: fair.date },
                { e: "📍", l: copy.labels.location, v: fair.location },
                { e: "⏰", l: copy.labels.time, v: fair.time },
              ].map((d) => (
                <li key={d.l} className="flex items-center gap-3 rounded-2xl bg-white/80 px-4 py-3 ring-1 ring-white">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full text-lg" style={{ background: colors.paperDeep }} aria-hidden>
                    {d.e}
                  </span>
                  <span>
                    <span className="block text-xs text-[#4A3D73]/80">{d.l}</span>
                    <span className="block font-bold leading-snug">{d.v}</span>
                  </span>
                </li>
              ))}
            </m.ul>

            <m.div variants={item} className="mt-10">
              <MissingPiece />
            </m.div>

            <m.div variants={item} className="mt-8">
              <ShareButtons />
            </m.div>

            <m.button variants={item} onClick={onReplay} className="mx-auto mt-6 block text-sm text-[#4A3D73] underline underline-offset-4">
              رجوع إلى {site.name}
            </m.button>
          </m.div>
        )}
      </div>
    </m.div>
  );
}

/** Colours "Fitback" the way the logo does: Fit in green, Back in purple. */
function Pivot({ text }: { text: string }) {
  const [before, after] = text.split(fitback.name);
  if (after === undefined) return <>{text}</>;
  return (
    <>
      {before}
      <bdi dir="ltr">
        <span style={{ color: colors.wordGreen }}>Fit</span>
        <span style={{ color: colors.wordPurple }}>back</span>
      </bdi>
      {after}
    </>
  );
}

/** "You're the missing piece." — the last piece drops in to complete the mark. */
function MissingPiece() {
  return (
    <div dir="ltr" className="flex items-center gap-4">
      <MiniMark cell={38} animateLast />
      <p className="display text-[2.1rem] leading-[1.05] sm:text-[2.5rem]" lang="en">
        {copy.signoff}
      </p>
    </div>
  );
}
