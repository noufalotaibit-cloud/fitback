/**
 * ─────────────────────────────────────────────────────────────
 *  FITBACK CAMPAIGN CONFIG
 *  Everything about the reveal lives here: logo, colours, copy,
 *  fair details, sharing and timing. Nothing in this file is
 *  shown before the visitor taps customer support.
 * ─────────────────────────────────────────────────────────────
 */

export const fitback = {
  name: "Fitback",

  /** Official logo (transparent PNG in /public). */
  logo: {
    src: "/fitback-logo.png",
    width: 919,
    height: 485,
    /**
     * Where the 2×2 puzzle mark sits inside the logo image, in image pixels.
     * The animated pieces land exactly here before the real logo fades in.
     * Only change these if you swap in a different logo file.
     */
    mark: { x: 10, y: 11, cell: 212 },
  },

  /** Sampled from the official logo. */
  colors: {
    green: { light: "#CBF0D1", base: "#9ACEA0", deep: "#79AF80", rim: "#5E8D63" },
    purple: { light: "#CDB8EE", base: "#9C85C3", deep: "#8069AC", rim: "#5E4C86" },
    wordGreen: "#7FA582",
    wordPurple: "#76669D",
    ink: "#2C2150",
    shadow: "#3E3170",
    /** Reveal background (the logo's lavender) */
    paper: "#EFEDF7",
    paperDeep: "#E4E1F1",
  },

  /** The fair — also used for the featured event on the booking site. */
  fair: {
    title: "SWE 444",
    titleFull: "SWE 444 – Software Engineering Fair",
    subtitle: "معرض هندسة البرمجيات",
    venue: "جامعة الملك سعود",
    date: "الثلاثاء 1 ديسمبر 2026",
    dateShort: "1 ديسمبر",
    time: "11:00 ص – 1:00 م",
    location: "بهو كلية علوم الحاسب والمعلومات، جامعة الملك سعود",
    /** ISO dates, used for "happening soon" badges */
    start: "2026-12-01T11:00:00+03:00",
    end: "2026-12-01T13:00:00+03:00",
  },

  /** Reveal copy, shown in this order. */
  copy: {
    headline: "غثّيناك، صح؟",
    lines: [
      "كل اللي كنتِ تبينه إن الزر يشتغل!",
      "تخيّلي كم مستخدم يواجه نفس المشكلة ويطلع من الموقع بدون ما يوصل صوته.",
    ],
    pivot: "وهنا يجي دور Fitback.",
    insight: "لأن كل فيدباك قطعة تكمّل الصورة.",
    invite: "تعالي بوثنا واكتشفي كيف نكمّلها مع بعض!",
    signoff: "You're the missing piece.",
    labels: { date: "التاريخ", location: "المكان", time: "الوقت" },
  },

  share: {
    button: "شاركي التجربة",
    copied: "تم نسخ الرابط",
    /** Spoiler-free, so friends fall for it too. */
    text: "لقيت منصة فعاليات حلوة، شوفي SWE 444 👀",
    /** Your production URL once deployed (or null to share the current page). */
    url: null as string | null,
  },

  timing: {
    /** How long "احجزي الآن" spins before failing (ms). Keep it short. */
    bookingSpinner: 1100,
  },
} as const;
