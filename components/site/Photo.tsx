"use client";
/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { photoFallbackUrl, photoUrl, type Photo as P } from "@/data/events";

/**
 * Licensed event photo with consistent cropping.
 * Tries the Wikimedia CDN thumbnail, then the Commons redirect, then a quiet branded tile.
 */
export default function Photo({
  photo,
  width = 960,
  className = "",
  priority = false,
  label,
}: {
  photo: P;
  width?: 500 | 960 | 1280;
  className?: string;
  priority?: boolean;
  label?: string;
}) {
  const [stage, setStage] = useState<0 | 1 | 2>(0);
  if (stage === 2) {
    return (
      <div className={`grid place-items-center bg-gradient-to-br from-plum to-plum-soft text-center ${className}`} role="img" aria-label={photo.alt}>
        <span className="px-4 text-sm text-lilac">{label ?? photo.alt}</span>
      </div>
    );
  }
  return (
    <img
      src={stage === 0 ? photoUrl(photo, width) : photoFallbackUrl(photo, width)}
      alt={photo.alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      referrerPolicy="no-referrer"
      onError={() => setStage((s) => (s === 0 ? 1 : 2))}
      className={`bg-lavender object-cover text-transparent ${className}`}
      style={{ objectPosition: photo.focus ?? "50% 50%" }}
    />
  );
}
