"use client";
import { AnimatePresence, m } from "framer-motion";

/** Always visible. After two failed bookings it glows and asks if she needs help. */
const LIFT = {
  none: "calc(env(safe-area-inset-bottom) + 1.1rem)",
  low: "calc(env(safe-area-inset-bottom) + 6.6rem)", // above the sheet's booking bar
  high: "calc(env(safe-area-inset-bottom) + 15rem)", // above the inline error too
};

export default function SupportFab({ urgent, lift, onClick }: { urgent: boolean; lift: keyof typeof LIFT; onClick: () => void }) {
  return (
    <div
      className="fixed left-4 z-[60] flex items-center gap-2.5 transition-[bottom] duration-300 sm:left-6"
      style={{ bottom: LIFT[lift] }}
      dir="ltr"
    >
      <div className="relative">
        {urgent && (
          <>
            <m.span
              aria-hidden
              className="pointer-events-none absolute -inset-2 rounded-full"
              style={{ background: "radial-gradient(circle, rgba(154,206,160,.75) 0%, rgba(143,120,198,.35) 55%, transparent 72%)" }}
              animate={{ scale: [1, 1.35, 1], opacity: [0.9, 0.35, 0.9] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            />
            <m.span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-full border-2 border-mint"
              initial={{ scale: 1, opacity: 0.9 }}
              animate={{ scale: 1.8, opacity: 0 }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
            />
          </>
        )}
        <button
          onClick={onClick}
          aria-label="الدعم الفني"
          className={`relative grid size-14 place-items-center rounded-full text-paper shadow-[0_10px_28px_-8px_rgba(44,33,80,0.55)] transition-colors ${
            urgent ? "bg-gradient-to-br from-purple to-plum ring-2 ring-mint" : "bg-plum hover:bg-plum-soft"
          }`}
        >
          <svg viewBox="0 0 24 24" className="size-6" aria-hidden>
            <path d="M4.5 13v-1.5a7.5 7.5 0 0 1 15 0V13" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
            <rect x="3" y="12.5" width="4.2" height="6.5" rx="2" fill="currentColor" />
            <rect x="16.8" y="12.5" width="4.2" height="6.5" rx="2" fill="currentColor" />
            <path d="M19 19c0 1.6-1.8 2.5-4.5 2.5" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" />
            <circle cx="14" cy="21.5" r="1.4" fill="var(--c-mint)" />
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {urgent && (
          <m.button
            onClick={onClick}
            initial={{ opacity: 0, x: -8, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", damping: 18, stiffness: 300, delay: 0.25 }}
            className="relative rounded-2xl bg-white px-3.5 py-2 text-[0.95rem] font-semibold text-plum shadow-[0_8px_24px_-10px_rgba(44,33,80,0.45)]"
            dir="rtl"
          >
            <span aria-hidden className="absolute -left-1.5 top-1/2 size-3 -translate-y-1/2 rotate-45 rounded-[3px] bg-white" />
            <span className="relative">تحتاجين مساعدة؟</span>
          </m.button>
        )}
      </AnimatePresence>
    </div>
  );
}
