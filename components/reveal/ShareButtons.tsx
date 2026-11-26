"use client";
import { useState } from "react";
import { fitback } from "@/config/fitback";

export default function ShareButtons() {
  const { share, colors } = fitback;
  const [copied, setCopied] = useState(false);
  const url = () => share.url ?? window.location.origin + window.location.pathname;
  const message = () => `${share.text}\n${url()}`;

  const onShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ text: share.text, url: url() });
        return;
      }
    } catch (e) {
      if ((e as DOMException)?.name === "AbortError") return;
    }
    try {
      await navigator.clipboard.writeText(message());
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      window.open(`https://wa.me/?text=${encodeURIComponent(message())}`, "_blank", "noopener");
    }
  };

  return (
    <div className="flex items-center gap-2.5">
      <button
        onClick={onShare}
        className="flex flex-1 items-center justify-center gap-2 rounded-full text-[1.08rem] font-bold text-white shadow-[0_12px_28px_-12px_rgba(44,33,80,.6)] transition-transform active:scale-[0.98]"
        style={{ height: "3.4rem", background: `linear-gradient(135deg, ${colors.purple.base}, ${colors.purple.rim})` }}
      >
        <svg viewBox="0 0 24 24" className="size-5" aria-hidden>
          <path d="M12 15V3.5M7.5 8 12 3.5 16.5 8M5 13v5.5A2.5 2.5 0 0 0 7.5 21h9a2.5 2.5 0 0 0 2.5-2.5V13" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span aria-live="polite">{copied ? share.copied : share.button}</span>
      </button>
      <a
        href="https://wa.me/"
        onClick={(e) => { e.currentTarget.href = `https://wa.me/?text=${encodeURIComponent(message())}`; }}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="شاركي عبر واتساب"
        className="grid shrink-0 place-items-center rounded-full text-white shadow-[0_12px_28px_-12px_rgba(44,33,80,.6)]"
        style={{ width: "3.4rem", height: "3.4rem", background: `linear-gradient(135deg, ${colors.green.base}, ${colors.green.rim})` }}
      >
        <svg viewBox="0 0 24 24" className="size-6" aria-hidden>
          <path fill="currentColor" d="M12 2.2A9.7 9.7 0 0 0 3.6 16.8L2.3 21.7l5-1.3A9.7 9.7 0 1 0 12 2.2Zm0 17.7a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 19.9Zm4.4-6c-.2-.1-1.4-.7-1.7-.8-.2-.1-.4-.1-.5.1l-.8 1c-.1.2-.3.2-.5.1a6.6 6.6 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5a.9.9 0 0 0-.7.3 2.8 2.8 0 0 0-.9 2.1 4.9 4.9 0 0 0 1 2.6 11.2 11.2 0 0 0 4.3 3.8c1.6.7 2.2.7 3 .6a2.6 2.6 0 0 0 1.7-1.2 2.1 2.1 0 0 0 .2-1.2c-.1-.1-.3-.2-.5-.3Z" />
        </svg>
      </a>
    </div>
  );
}
