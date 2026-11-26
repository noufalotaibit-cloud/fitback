import type { BookingStatus } from "../Experience";

export default function BookButton({
  status,
  onClick,
  className = "",
  label = "احجزي الآن",
}: {
  status: BookingStatus;
  onClick: () => void;
  className?: string;
  label?: string;
}) {
  const loading = status === "loading";
  return (
    <button
      onClick={onClick}
      aria-busy={loading}
      disabled={loading}
      className={`relative flex h-13 items-center justify-center gap-2 rounded-full bg-mint px-7 text-[1.05rem] font-bold text-plum shadow-[inset_0_-3px_0_rgba(44,33,80,0.12)] transition-[transform,background-color] hover:bg-[#8cc593] active:scale-[0.98] disabled:cursor-progress ${className}`}
      style={{ height: "3.25rem" }}
    >
      {loading ? (
        <>
          <span className="size-4.5 animate-spin rounded-full border-[2.5px] border-plum/25 border-t-plum" style={{ width: 18, height: 18 }} />
          جاري الحجز…
        </>
      ) : (
        label
      )}
    </button>
  );
}
