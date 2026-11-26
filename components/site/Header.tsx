import { site } from "@/config/site";

/** Scene wordmark: two overlapping spotlights + a tight lowercase logotype. */
export function SceneMark({ className = "", size = 30 }: { className?: string; size?: number }) {
  return (
    <span dir="ltr" className={`inline-flex items-center gap-[0.32em] ${className}`} style={{ fontSize: size }}>
      <svg viewBox="0 0 34 22" className="h-[0.78em] w-auto" aria-hidden>
        <circle cx="11" cy="11" r="10" fill="var(--c-mint)" />
        <circle cx="23" cy="11" r="10" fill="var(--c-purple)" style={{ mixBlendMode: "multiply" }} />
      </svg>
      <span className="scene-logo leading-none text-plum">scene</span>
    </span>
  );
}

export default function Header({
  city,
  cities,
  onCity,
  onHome,
}: {
  city: string;
  cities: string[];
  onCity: (c: string) => void;
  onHome: () => void;
}) {
  return (
    <header className="sticky top-0 z-30 border-b border-lavender/80 bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <button onClick={onHome} aria-label={`${site.name}، الرئيسية`}>
          <SceneMark />
        </button>

        <nav aria-label="الرئيسية" className="hidden items-center gap-7 text-[0.95rem] md:flex">
          <button onClick={onHome} className="font-semibold text-plum">اكتشفي</button>
          <span className="cursor-default text-plum-soft/60" title="قريباً">المدن</span>
          <span className="cursor-default text-plum-soft/60" title="قريباً">تذاكري</span>
        </nav>

        <label className="relative flex items-center gap-1.5 rounded-full bg-lavender py-2 pe-8 ps-3 text-sm font-medium">
          <svg viewBox="0 0 16 16" className="size-3.5 text-purple" aria-hidden>
            <circle cx="8" cy="8" r="6.3" fill="none" stroke="currentColor" strokeWidth="1.6" />
            <path d="M1.8 8h12.4M8 1.7c2 2 2 10.6 0 12.6M8 1.7c-2 2-2 10.6 0 12.6" fill="none" stroke="currentColor" strokeWidth="1.3" />
          </svg>
          <span className="sr-only">المدينة</span>
          <select value={city} onChange={(e) => onCity(e.target.value)} className="max-w-[7.5rem] appearance-none bg-transparent outline-none">
            <option value="all">كل المدن</option>
            {cities.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <svg viewBox="0 0 10 6" className="pointer-events-none absolute end-3 w-2.5 text-plum-soft" aria-hidden>
            <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.6" fill="none" />
          </svg>
        </label>
      </div>
    </header>
  );
}
