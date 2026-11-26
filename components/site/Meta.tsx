export function Meta({ icon, children }: { icon: "pin" | "cal" | "clock"; children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2.5">
      <svg viewBox="0 0 20 20" className="mt-[0.2em] size-[1.05rem] shrink-0 opacity-80" aria-hidden>
        {icon === "pin" && (
          <>
            <path d="M10 18s6-5.4 6-10a6 6 0 0 0-12 0c0 4.6 6 10 6 10Z" fill="none" stroke="currentColor" strokeWidth="1.7" />
            <circle cx="10" cy="8" r="2" fill="currentColor" />
          </>
        )}
        {icon === "cal" && (
          <>
            <rect x="3" y="4.5" width="14" height="12.5" rx="3" fill="none" stroke="currentColor" strokeWidth="1.7" />
            <path d="M3 8.5h14M7 2.5v4M13 2.5v4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          </>
        )}
        {icon === "clock" && (
          <>
            <circle cx="10" cy="10" r="7" fill="none" stroke="currentColor" strokeWidth="1.7" />
            <path d="M10 6v4l2.5 2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" fill="none" />
          </>
        )}
      </svg>
      <span>{children}</span>
    </li>
  );
}
