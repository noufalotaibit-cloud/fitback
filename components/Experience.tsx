"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, LazyMotion, MotionConfig, domAnimation, m } from "framer-motion";
import { fitback } from "@/config/fitback";
import { events, FAIR_ID } from "@/data/events";
import Header from "./site/Header";
import Home from "./site/Home";
import EventSheet from "./site/EventSheet";
import SupportFab from "./site/SupportFab";
import Toast from "./site/Toast";
import Credits from "./site/Credits";

// The campaign is code-split: first load only ships the booking site.
const loadReveal = () => import("./reveal/Reveal");
const Reveal = dynamic(loadReveal, { ssr: false });

export type BookingStatus = "idle" | "loading" | "error";

export default function Experience() {
  const [phase, setPhase] = useState<"site" | "reveal">("site");
  const [city, setCity] = useState<string>("all");
  const [credits, setCredits] = useState(false);
  const cities = Array.from(new Set(events.filter((e) => !e.radar).map((e) => e.city)));
  const [openId, setOpenId] = useState<string | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [status, setStatus] = useState<BookingStatus>("idle");
  const timer = useRef<number | null>(null);

  useEffect(() => () => { if (timer.current) window.clearTimeout(timer.current); }, []);
  useEffect(() => {
    document.body.style.overflow = openId || credits || phase === "reveal" ? "hidden" : "";
  }, [openId, credits, phase]);

  /** The one action that is built to fail. */
  const book = useCallback(() => {
    if (status === "loading") return;
    setStatus("loading");
    loadReveal(); // warm the reveal while she waits
    timer.current = window.setTimeout(() => {
      setAttempts((a) => a + 1);
      setStatus("error");
    }, fitback.timing.bookingSpinner);
  }, [status]);

  const openSupport = useCallback(() => {
    loadReveal();
    if (timer.current) window.clearTimeout(timer.current);
    setOpenId(null);
    setPhase("reveal");
  }, []);

  const restart = useCallback(() => {
    setPhase("site");
    setAttempts(0);
    setStatus("idle");
    window.scrollTo({ top: 0 });
  }, []);

  const openEvent = events.find((e) => e.id === openId) ?? null;

  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <AnimatePresence>
          {phase === "site" ? (
            <m.div
              key="site"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="min-h-dvh"
            >
              <Header city={city} cities={cities} onCity={setCity} onHome={() => setOpenId(null)} />
              <Home
                city={city}
                bookingStatus={status}
                onOpen={setOpenId}
                onBookFair={book}
                onCredits={() => setCredits(true)}
              />
              <AnimatePresence>
                {openEvent && (
                  <EventSheet
                    key={openEvent.id}
                    event={openEvent}
                    status={openEvent.id === FAIR_ID ? status : "idle"}
                    attempts={attempts}
                    onBook={book}
                    onSupport={openSupport}
                    onDismissError={() => setStatus("idle")}
                    onClose={() => { setOpenId(null); setStatus((st) => (st === "error" ? "idle" : st)); }}
                    onOpenFair={() => setOpenId(FAIR_ID)}
                  />
                )}
                {credits && <Credits key="credits" onClose={() => setCredits(false)} />}
              </AnimatePresence>
              <Toast attempts={attempts} visible={status === "error" && !openEvent} onSupport={openSupport} onDismiss={() => setStatus("idle")} />
              <SupportFab urgent={attempts >= 2} lift={openEvent ? (openEvent.id === FAIR_ID && status === "error" ? "high" : "low") : "none"} onClick={openSupport} />
            </m.div>
          ) : (
            <Reveal key="reveal" onReplay={restart} />
          )}
        </AnimatePresence>
      </MotionConfig>
    </LazyMotion>
  );
}
