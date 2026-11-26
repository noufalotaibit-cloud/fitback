"use client";
import { AnimatePresence, m } from "framer-motion";

const MESSAGES = [
  { title: "ما قدرنا نكمّل حجزك", body: "صار خلل مؤقت، حاولي مرة ثانية." },
  { title: "الحجز ما تم مرة ثانية", body: "فريق الدعم يقدر يكمّله عنك الحين." },
  { title: "الحجز ما زال متعثّر", body: "كلمي الدعم وبنكمّل حجزك على طول." },
];

type NoticeProps = { attempts: number; visible: boolean; onSupport: () => void; onDismiss: () => void };

/** Floating version, used on the home page. */
export default function Toast(props: NoticeProps) {
  return (
    <div aria-live="assertive" className="pointer-events-none fixed inset-x-0 top-[4.6rem] z-50 flex justify-center px-3">
      <BookingNotice {...props} />
    </div>
  );
}

/** The error itself — also shown inline inside the event sheet. */
export function BookingNotice({ attempts, visible, onSupport, onDismiss }: NoticeProps) {
  const msg = MESSAGES[Math.min(Math.max(attempts, 1), MESSAGES.length) - 1];
  return (
      <AnimatePresence>
        {visible && (
          <m.div
            key={attempts}
            role="alert"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ type: "spring", damping: 26, stiffness: 380 }}
            className="pointer-events-auto flex w-full max-w-md items-start gap-3 rounded-2xl border border-alert/20 bg-white px-4 py-3.5 shadow-[0_12px_32px_-12px_rgba(44,33,80,0.35)]"
          >
            <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-alert/10 text-alert">
              <svg viewBox="0 0 20 20" className="size-4" aria-hidden>
                <path d="M10 5.5v5.5M10 14v.1" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
              </svg>
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-semibold">{msg.title}</p>
              <p className="mt-0.5 text-sm text-plum-soft">{msg.body}</p>
              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2">
                {attempts >= 2 && (
                  <button onClick={onSupport} className="rounded-full bg-plum px-3.5 py-1.5 text-sm font-semibold text-paper">
                    كلمي الدعم
                  </button>
                )}
                <span className="text-xs text-plum-soft/70" dir="ltr">ERR-BK-{503 + attempts}</span>
              </div>
            </div>
            <button onClick={onDismiss} aria-label="إغلاق" className="-m-1 rounded-full p-1.5 text-plum-soft/60 hover:text-plum">
              <svg viewBox="0 0 16 16" className="size-3.5"><path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
            </button>
          </m.div>
        )}
      </AnimatePresence>
  );
}
