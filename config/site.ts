/**
 * Scene — the fictional event-discovery platform the visitor lands on first.
 * It borrows Fitback's palette but never shows the Fitback name or logo.
 */
export const site = {
  name: "Scene",
  tagline: "اكتشفي أهم الفعاليات حول العالم",
  /** Discreet demo notice (footer + event sheets). */
  demoNote: "Scene منصة تجريبية ضمن مشروع جامعي. لا تبيع تذاكر ولا تجمع أي بيانات، وليست تابعة لأي من الفعاليات المعروضة.",

  /**
   * Photos are licensed images from Wikimedia Commons, loaded from Wikimedia's CDN.
   * Run `npm run photos` to download them into /public/photos, then set this to "local"
   * to serve them from your own domain.
   */
  photos: "remote" as "remote" | "local",

  /** Palette — soft green, lavender, pastel purple, deep purple, off-white. */
  colors: {
    paper: "#F8F7FC",
    lavender: "#ECE8F7",
    lilac: "#CDBDEE",
    purple: "#8F78C6",
    plum: "#241A45",
    plumSoft: "#4A3D73",
    mint: "#9ACEA0",
    mintSoft: "#DCF1DF",
    mintDeep: "#3F7A4C",
    alert: "#C2456A",
  },
} as const;
