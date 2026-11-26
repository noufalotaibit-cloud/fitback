"use client";
import { useEffect, useMemo, useState } from "react";
import { site } from "@/config/site";
import { categories, events, FAIR_ID, status, type Category, type EventItem } from "@/data/events";
import type { BookingStatus } from "../Experience";
import FairBanner from "./FairBanner";
import Photo from "./Photo";

const catLabel = (c: string) => categories.find((x) => x.id === c)?.label ?? "";

export default function Home({
  city,
  bookingStatus,
  onOpen,
  onBookFair,
  onCredits,
}: {
  city: string;
  bookingStatus: BookingStatus;
  onOpen: (id: string) => void;
  onBookFair: () => void;
  onCredits: () => void;
}) {
  const [cat, setCat] = useState<Category>("all");
  const [q, setQ] = useState("");
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => setNow(new Date()), []);

  const listed = events.filter((e) => e.id !== FAIR_ID && !e.radar && (!now || status(e, now) !== "past"));
  const radar = events.filter((e) => e.radar);
  const thisWeek = now ? listed.filter((e) => ["now", "soon"].includes(status(e, now) ?? "")) : [];

  const list = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return listed.filter(
      (e) =>
        (cat === "all" || e.category === cat) &&
        (city === "all" || e.city === city) &&
        (!needle || [e.title, e.subtitle, e.venue, e.city, e.country].some((s) => s.toLowerCase().includes(needle)))
    );
  }, [cat, q, city, listed]);

  const browsing = cat === "all" && !q && city === "all";

  return (
    <main className="mx-auto w-full max-w-6xl px-4 pb-32 pt-4 sm:px-6 sm:pt-8">
      <label className="relative mb-5 block">
        <span className="sr-only">ابحثي عن فعالية</span>
        <svg viewBox="0 0 20 20" className="pointer-events-none absolute start-4 top-1/2 size-[1.1rem] -translate-y-1/2 text-plum-soft/70" aria-hidden>
          <circle cx="8.5" cy="8.5" r="5.5" stroke="currentColor" strokeWidth="2" fill="none" />
          <path d="M13 13l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          type="search"
          placeholder="فنان، فعالية، أو مدينة"
          className="h-12 w-full rounded-2xl border border-lavender bg-white pe-4 ps-11 text-[0.95rem] outline-none placeholder:text-plum-soft/55 focus:border-lilac"
        />
      </label>

      <FairBanner status={bookingStatus} onBook={onBookFair} onDetails={() => onOpen(FAIR_ID)} />

      <nav aria-label="التصنيفات" className="no-scrollbar -mx-4 mt-8 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:px-0">
        {categories.map((c) => (
          <button
            key={c.id}
            aria-pressed={cat === c.id}
            onClick={() => setCat(c.id)}
            className={`shrink-0 rounded-full px-4 py-2 text-[0.95rem] font-medium transition-colors ${
              cat === c.id ? "bg-plum text-paper" : "bg-lavender text-plum hover:bg-lilac/60"
            }`}
          >
            {c.label}
          </button>
        ))}
      </nav>

      {browsing && thisWeek.length > 0 && (
        <section aria-labelledby="week" className="mt-9">
          <SectionTitle id="week" title="هذا الأسبوع" note="فعاليات جارية أو تبدأ قريباً" />
          <ul className="no-scrollbar -mx-4 flex snap-x gap-3 overflow-x-auto px-4 pb-1 sm:mx-0 sm:grid sm:grid-cols-2 sm:px-0 lg:grid-cols-4">
            {thisWeek.map((e) => (
              <li key={e.id} className="w-[82%] shrink-0 snap-start sm:w-auto">
                <WideCard event={e} now={now} onOpen={onOpen} />
              </li>
            ))}
          </ul>
        </section>
      )}

      {(cat === "all" || cat === "music") && !q && city === "all" &&
        radar.map((e) => <RadarCard key={e.id} event={e} onOpen={onOpen} />)}

      <section aria-labelledby="all" className="mt-10">
        <SectionTitle id="all" title={cat === "all" ? "اكتشفي حول العالم" : catLabel(cat)} note={`${list.length} فعالية`} />
        <ul className="grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-x-4 lg:grid-cols-4">
          {list.map((e) => (
            <li key={e.id}>
              <EventCard event={e} now={now} onOpen={onOpen} />
            </li>
          ))}
        </ul>
        {list.length === 0 && (
          <div className="rounded-3xl border border-dashed border-lilac p-10 text-center text-plum-soft">
            ما لقينا فعاليات بهذا البحث.{" "}
            <button className="font-semibold text-purple underline" onClick={() => { setQ(""); setCat("all"); }}>
              اعرضي كل الفعاليات
            </button>
          </div>
        )}
      </section>

      <footer className="mt-16 border-t border-lavender pt-6 text-xs leading-relaxed text-plum-soft/75">
        <p>{site.demoNote}</p>
        <button onClick={onCredits} className="mt-2 underline underline-offset-2 hover:text-plum">
          حقوق الصور
        </button>
      </footer>
    </main>
  );
}

function SectionTitle({ id, title, note }: { id: string; title: string; note?: string }) {
  return (
    <div className="mb-4 flex items-end justify-between gap-4">
      <h2 id={id} className="headline text-[1.6rem] sm:text-[1.9rem]">{title}</h2>
      {note && <span className="pb-1 text-sm text-plum-soft">{note}</span>}
    </div>
  );
}

export function StatusBadge({ event, now, className = "" }: { event: EventItem; now: Date | null; className?: string }) {
  const s = now ? status(event, now) : null;
  if (s !== "now" && s !== "soon") return null;
  return (
    <span className={`rounded-full px-2.5 py-1 text-[0.7rem] font-bold ${s === "now" ? "bg-mint text-plum" : "bg-white text-plum"} ${className}`}>
      {s === "now" ? "جارية الآن" : "قريباً جداً"}
    </span>
  );
}

function WideCard({ event: e, now, onOpen }: { event: EventItem; now: Date | null; onOpen: (id: string) => void }) {
  return (
    <button onClick={() => onOpen(e.id)} className="group relative block w-full overflow-hidden rounded-3xl text-start">
      {e.photo && <Photo photo={e.photo} width={960} className="aspect-[16/11] w-full transition-transform duration-700 group-hover:scale-[1.03]" />}
      <div className="absolute inset-0 bg-gradient-to-t from-plum/90 via-plum/20 to-transparent" />
      <StatusBadge event={e} now={now} className="absolute end-3 top-3" />
      <div className="absolute inset-x-0 bottom-0 p-4 text-paper">
        <p className="headline truncate text-[1.25rem]" dir="auto">{e.title}</p>
        <p className="mt-0.5 truncate text-sm text-paper/80">{e.date} · {e.city}</p>
      </div>
    </button>
  );
}

function EventCard({ event: e, now, onOpen }: { event: EventItem; now: Date | null; onOpen: (id: string) => void }) {
  return (
    <button onClick={() => onOpen(e.id)} className="group block w-full text-start">
      <div className="relative overflow-hidden rounded-[1.4rem]">
        {e.photo && <Photo photo={e.photo} width={500} className="aspect-[4/5] w-full transition-transform duration-700 group-hover:scale-[1.04]" />}
        <span className="absolute start-2.5 top-2.5 rounded-full bg-white/90 px-2.5 py-1 text-[0.7rem] font-semibold text-plum backdrop-blur">
          {catLabel(e.category)}
        </span>
        <StatusBadge event={e} now={now} className="absolute end-2.5 top-2.5" />
      </div>
      <p className="headline mt-2.5 line-clamp-2 text-[1.02rem] leading-snug sm:text-[1.1rem]" dir="auto">{e.title}</p>
      <p className="mt-1 truncate text-[0.82rem] text-plum-soft">{e.date}</p>
      <p className="truncate text-[0.82rem] text-plum-soft/75">{e.city}، {e.country}</p>
    </button>
  );
}

function RadarCard({ event: e, onOpen }: { event: EventItem; onOpen: (id: string) => void }) {
  const [following, setFollowing] = useState(false);
  return (
    <section aria-label="على الرادار" className="mt-10 overflow-hidden rounded-[2rem] bg-lavender">
      <div className="grid sm:grid-cols-[1fr_1.2fr]">
        {e.photo && <Photo photo={e.photo} width={960} className="aspect-[16/9] h-full w-full sm:aspect-auto" />}
        <div className="p-5 sm:p-7">
          <p className="text-sm font-semibold text-purple">على الرادار</p>
          <h2 className="latin-display mt-2 text-[2.6rem] text-plum" dir="ltr" style={{ textAlign: "right" }}>{e.title}</h2>
          <p className="mt-3 max-w-[48ch] text-[0.95rem] leading-relaxed text-plum-soft">{e.description}</p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setFollowing((f) => !f)}
              aria-pressed={following}
              className={`h-11 rounded-full px-5 text-sm font-semibold transition-colors ${following ? "bg-plum text-paper" : "bg-white text-plum hover:bg-white/70"}`}
            >
              {following ? "تتابعينها ✓" : "تابعيها"}
            </button>
            <button onClick={() => onOpen(e.id)} className="text-sm font-semibold text-plum underline underline-offset-4">
              التفاصيل
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
