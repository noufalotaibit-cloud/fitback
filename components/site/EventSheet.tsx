"use client";
import { useEffect, useRef, useState } from "react";
import { m } from "framer-motion";
import { site } from "@/config/site";
import { fitback } from "@/config/fitback";
import { events, FAIR_ID, photoPage, type EventItem } from "@/data/events";
import type { BookingStatus } from "../Experience";
import BookButton from "./BookButton";
import { Meta } from "./Meta";
import Photo from "./Photo";
import { BrandTiles } from "./FairBanner";
import { BookingNotice } from "./Toast";

export default function EventSheet({
  event: e,
  status,
  attempts,
  onBook,
  onClose,
  onOpenFair,
  onSupport,
  onDismissError,
}: {
  event: EventItem;
  status: BookingStatus;
  attempts: number;
  onBook: () => void;
  onClose: () => void;
  onOpenFair: () => void;
  onSupport: () => void;
  onDismissError: () => void;
}) {
  const [tier, setTier] = useState(e.tiers?.[0].id ?? "");
  const [qty, setQty] = useState(1);
  const panel = useRef<HTMLDivElement>(null);
  const isFair = e.id === FAIR_ID;

  useEffect(() => {
    panel.current?.focus();
    const esc = (k: KeyboardEvent) => k.key === "Escape" && onClose();
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [onClose]);

  return (
    <m.div className="fixed inset-0 z-40 flex items-end justify-center md:items-center md:p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <button aria-label="إغلاق" onClick={onClose} className="absolute inset-0 bg-plum/50 backdrop-blur-[3px]" />
      <m.div
        ref={panel}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={e.title}
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 32, stiffness: 330 }}
        className="relative flex max-h-[92dvh] w-full max-w-2xl flex-col overflow-hidden rounded-t-[2rem] bg-paper outline-none md:rounded-[2rem]"
      >
        <div className="overflow-y-auto">
          <div className="relative">
            {isFair ? (
              <div className="relative flex aspect-[16/8] items-end overflow-hidden bg-plum p-5">
                <div aria-hidden className="absolute -left-16 -top-20 size-64 rounded-full bg-purple/45 blur-3xl" />
                <BrandTiles size={34} className="absolute left-5 top-5" />
                <p dir="ltr" className="latin-display relative text-[3.6rem] text-mint">{fitback.fair.title}</p>
              </div>
            ) : (
              e.photo && <Photo photo={e.photo} width={960} priority className="aspect-[16/10] w-full" />
            )}
            <button onClick={onClose} aria-label="إغلاق" className="absolute end-4 top-4 grid size-10 place-items-center rounded-full bg-white/90 text-plum">
              <svg viewBox="0 0 16 16" className="size-4"><path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
            </button>
          </div>
          {e.photo && !isFair && (
            <p className="px-5 pt-2 text-[0.68rem] text-plum-soft/70" dir="ltr" style={{ textAlign: "right" }}>
              Photo: {e.photo.author} ·{" "}
              <a href={photoPage(e.photo)} target="_blank" rel="noopener noreferrer" className="underline">{e.photo.license}</a>, Wikimedia Commons
            </p>
          )}

          <div className="space-y-6 p-5 sm:p-7">
            <div>
              <h2 className="headline text-[1.9rem]" dir="auto">{e.title}</h2>
              <p className="mt-1 text-plum-soft">{e.subtitle}</p>
            </div>
            <ul className="grid gap-2.5 text-[0.95rem] text-plum">
              <Meta icon="pin">{e.radar || isFair ? e.venue : `${e.venue}، ${e.city}${e.country ? `، ${e.country}` : ""}`}</Meta>
              <Meta icon="cal">{e.date}</Meta>
              {e.time && <Meta icon="clock">{e.time}</Meta>}
            </ul>
            <p className="max-w-[60ch] leading-[1.9] text-plum-soft">{e.description}</p>

            {isFair && e.tiers ? (
              <>
                <fieldset>
                  <legend className="mb-2.5 font-semibold">نوع التذكرة</legend>
                  <div className="grid gap-2">
                    {e.tiers.map((t) => (
                      <label
                        key={t.id}
                        className={`flex cursor-pointer items-center justify-between gap-3 rounded-2xl border px-4 py-3 transition-colors ${
                          tier === t.id ? "border-purple bg-lavender" : "border-lavender bg-white hover:border-lilac"
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          <input type="radio" name="tier" checked={tier === t.id} onChange={() => setTier(t.id)} className="size-4 accent-[var(--c-purple)]" />
                          <span>
                            <span className="block font-medium">{t.name}</span>
                            <span className="block text-xs text-plum-soft">{t.note}</span>
                          </span>
                        </span>
                        <span className="font-semibold text-mint-deep">مجاناً</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
                <div className="flex items-center justify-between">
                  <span className="font-semibold">عدد التذاكر</span>
                  <div className="flex items-center gap-1 rounded-full bg-lavender p-1">
                    <Step label="تقليل" onClick={() => setQty((n) => Math.max(1, n - 1))} disabled={qty === 1}>−</Step>
                    <span className="w-8 text-center font-semibold tabular-nums" aria-live="polite">{qty}</span>
                    <Step label="زيادة" onClick={() => setQty((n) => Math.min(4, n + 1))} disabled={qty === 4}>+</Step>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="rounded-2xl bg-lavender p-4 text-sm leading-relaxed text-plum-soft">
                  {e.radar
                    ? "لا توجد مواعيد معلنة لهذا الفنان حالياً."
                    : "Scene تعرض هذه الفعالية للاكتشاف فقط. الحجز والأسعار عبر المنظّم الرسمي."}
                </div>
                <FairNudge onOpenFair={onOpenFair} />
              </>
            )}
            <p className="text-[0.7rem] leading-relaxed text-plum-soft/60">{site.demoNote}</p>
          </div>
        </div>

        {isFair && (
          <>
            <div aria-live="assertive" className="border-t border-lavender bg-paper px-4 empty:hidden [&>*]:my-3 [&>*]:max-w-none [&>*]:shadow-none">
              <BookingNotice attempts={attempts} visible={status === "error"} onSupport={onSupport} onDismiss={onDismissError} />
            </div>
            <div className="flex items-center gap-3 border-t border-lavender bg-white/90 p-4 pb-[calc(env(safe-area-inset-bottom)+1rem)] backdrop-blur">
              <div className="min-w-0 flex-1">
                <p className="text-xs text-plum-soft">الإجمالي · {qty} {qty === 1 ? "تذكرة" : "تذاكر"}</p>
                <p className="font-bold">مجاناً</p>
              </div>
              <BookButton status={status} onClick={onBook} className="min-w-[10.5rem]" />
            </div>
          </>
        )}
      </m.div>
    </m.div>
  );
}

function FairNudge({ onOpenFair }: { onOpenFair: () => void }) {
  const fair = events.find((x) => x.id === FAIR_ID)!;
  return (
    <button onClick={onOpenFair} className="flex w-full items-center gap-3 rounded-2xl bg-plum p-3 text-start text-paper">
      <span dir="ltr" className="latin-display grid h-14 w-20 shrink-0 place-items-center rounded-xl bg-plum-soft text-center text-[0.95rem] leading-none text-mint">SWE<br />444</span>
      <span className="min-w-0 flex-1">
        <span className="block text-xs text-mint">متاحة للحجز الآن · مجاناً</span>
        <span className="block truncate font-semibold">{fair.subtitle}، {fitback.fair.dateShort}</span>
      </span>
      <span className="text-sm text-lilac">احجزي</span>
    </button>
  );
}

function Step({ children, label, onClick, disabled }: { children: React.ReactNode; label: string; onClick: () => void; disabled: boolean }) {
  return (
    <button onClick={onClick} disabled={disabled} aria-label={label} className="grid size-9 place-items-center rounded-full bg-white text-lg font-semibold disabled:opacity-40">
      {children}
    </button>
  );
}
