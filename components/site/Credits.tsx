"use client";
import { m } from "framer-motion";
import { events, photoPage } from "@/data/events";

/** Photo credits — every image is from Wikimedia Commons under a free licence. */
export default function Credits({ onClose }: { onClose: () => void }) {
  const used = events.filter((e) => e.photo);
  return (
    <m.div className="fixed inset-0 z-40 flex items-end justify-center md:items-center md:p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <button aria-label="إغلاق" onClick={onClose} className="absolute inset-0 bg-plum/50" />
      <m.div
        role="dialog"
        aria-modal="true"
        aria-label="حقوق الصور"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        className="relative max-h-[80dvh] w-full max-w-lg overflow-y-auto rounded-t-[2rem] bg-paper p-6 pb-[calc(env(safe-area-inset-bottom)+1.5rem)] md:rounded-[2rem]"
      >
        <div className="flex items-center justify-between">
          <h2 className="headline text-xl">حقوق الصور</h2>
          <button onClick={onClose} className="rounded-full px-3 py-1 text-sm text-plum-soft hover:text-plum">إغلاق</button>
        </div>
        <p className="mt-2 text-sm text-plum-soft">كل الصور من Wikimedia Commons وبرخص حرّة. الضغط على الرخصة يفتح صفحة الصورة الأصلية.</p>
        <ul className="mt-4 divide-y divide-lavender text-sm" dir="ltr">
          {used.map((e) => (
            <li key={e.id} className="flex items-baseline justify-between gap-3 py-2.5">
              <span className="min-w-0">
                <span className="block truncate font-medium text-plum">{e.title}</span>
                <span className="block truncate text-xs text-plum-soft">Photo: {e.photo!.author}</span>
              </span>
              <a href={photoPage(e.photo!)} target="_blank" rel="noopener noreferrer" className="shrink-0 text-xs text-purple underline">
                {e.photo!.license}
              </a>
            </li>
          ))}
        </ul>
      </m.div>
    </m.div>
  );
}
