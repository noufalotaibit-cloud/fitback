/**
 * Events shown on Scene.
 *
 * Real events: dates checked against official announcements / major outlets on
 * 27 Nov 2026 (see README "Sources"). Re-check before you publish. Scene does
 * not sell tickets for them; prices are deliberately not shown.
 *
 * Photos: Wikimedia Commons, each under a free licence (credited in the app).
 */
import { fitback } from "@/config/fitback";
import { site } from "@/config/site";

export type Category = "all" | "music" | "cinema" | "art" | "sports" | "fun" | "uni";

export const categories: { id: Category; label: string }[] = [
  { id: "all", label: "الكل" },
  { id: "music", label: "موسيقى" },
  { id: "cinema", label: "سينما" },
  { id: "art", label: "فنون" },
  { id: "sports", label: "رياضة" },
  { id: "fun", label: "ترفيه" },
  { id: "uni", label: "جامعات" },
];

export type Photo = {
  id: string;
  file: string; // Commons file name (underscored)
  hash: string; // md5 prefix path, e.g. "7/73"
  alt: string;
  author: string;
  license: "CC0" | "CC BY 2.0" | "CC BY-SA 2.0" | "CC BY-SA 4.0";
  /** CSS object-position for consistent crops */
  focus?: string;
};

export type Tier = { id: string; name: string; note: string; price: number };

export type EventItem = {
  id: string;
  title: string;
  subtitle: string;
  category: Exclude<Category, "all">;
  city: string;
  country: string;
  venue: string;
  start: string; // ISO
  end: string; // ISO
  date: string; // display
  time?: string;
  description: string;
  photo?: Photo;
  /** Only the fair can be "booked". */
  bookable?: boolean;
  tiers?: Tier[];
  /** Artists with no announced dates ("on the radar"), never listed as upcoming. */
  radar?: boolean;
  note?: string;
};

export const FAIR_ID = "swe-444";

const P = {
  abudhabi: { id: "abudhabi", file: "Yas_Marina_circuit_by_night.jpg", hash: "9/9d", alt: "حلبة مرسى ياس ليلاً", author: "JiteshJagadish", license: "CC BY 2.0", focus: "50% 60%" },
  coachella: { id: "coachella", file: "Coachella_2015_ferris_wheel_from_field.jpg", hash: "7/73", alt: "ساحة مهرجان كوتشيلا والعجلة الدوّارة", author: "David Jones", license: "CC BY 2.0", focus: "50% 40%" },
  artbasel: { id: "artbasel", file: "Art_Basel_Miami_Beach_2021_02.jpg", hash: "0/0d", alt: "آرت بازل ميامي بيتش داخل مركز المؤتمرات", author: "Jennifer 8.", license: "CC BY-SA 4.0" },
  riyadhseason: { id: "riyadhseason", file: "Boulevard_Riyadh_City.jpg", hash: "a/af", alt: "بوليفارد رياض سيتي ضمن موسم الرياض", author: "Humanized", license: "CC0" },
  boulevard: { id: "boulevard", file: "Boulevard_World_in_Riyadh_(2023).jpg", hash: "c/c1", alt: "بوليفارد وورلد في الرياض", author: "Saudi Press Agency (SPA)", license: "CC BY-SA 4.0" },
  cannes: { id: "cannes", file: "Palais_des_Festivals_et_des_Congrès_(50518103518).jpg", hash: "6/64", alt: "قصر المهرجانات في كان", author: "Jorge Láscar", license: "CC BY 2.0" },
  jeddah: { id: "jeddah", file: "Jeddah_Corniche_22.jpg", hash: "2/2b", alt: "كورنيش جدة", author: "Tahir mq", license: "CC BY-SA 4.0" },
  oasis: { id: "oasis", file: "Celtic_park_paradise.jpg", hash: "a/a8", alt: "ملعب سلتيك بارك في غلاسكو", author: "Guillaume Gogo", license: "CC BY 2.0" },
  stadium: { id: "stadium", file: "Millennium_stadium_concert.jpg", hash: "4/49", alt: "جمهور حفل في ملعب", author: "Andrew King", license: "CC BY-SA 2.0", focus: "50% 70%" },
} satisfies Record<string, Photo>;

export const events: EventItem[] = [
  {
    id: FAIR_ID,
    title: fitback.fair.titleFull,
    subtitle: fitback.fair.subtitle,
    category: "uni",
    city: "الرياض",
    country: "السعودية",
    venue: fitback.fair.location,
    start: fitback.fair.start,
    end: fitback.fair.end,
    date: fitback.fair.date,
    time: fitback.fair.time,
    description:
      "طالبات هندسة البرمجيات يعرضن مشاريعهن: تطبيقات ومنصات وتجارب جديدة تقدرين تجربينها بنفسك. جولة بين البوثات، عروض حيّة، ومساحة تسألين فيها الفرق عن كل شي.",
    bookable: true,
    tiers: [
      { id: "visit", name: "دخول الزوار", note: "تجولي بين كل البوثات", price: 0 },
      { id: "tour", name: "جولة مع الفريق", note: "جولة قصيرة مع عضوة من الفريق", price: 0 },
    ],
  },
  {
    id: "abu-dhabi-gp",
    title: "Abu Dhabi Grand Prix",
    subtitle: "ختام موسم الفورمولا 1 لعام 2026",
    category: "sports",
    city: "أبوظبي",
    country: "الإمارات",
    venue: "حلبة مرسى ياس",
    start: "2026-12-03",
    end: "2026-12-06",
    date: "3 – 6 ديسمبر 2026",
    time: "السباق: الأحد 6 ديسمبر",
    description: "الجولة الأخيرة من بطولة العالم للفورمولا 1 لموسم 2026 على حلبة مرسى ياس، مع برنامج حفلات وفعاليات على جزيرة ياس طوال عطلة السباق.",
    photo: P.abudhabi,
  },
  {
    id: "art-basel-miami",
    title: "Art Basel Miami Beach",
    subtitle: "معرض الفن الحديث والمعاصر",
    category: "art",
    city: "ميامي بيتش",
    country: "الولايات المتحدة",
    venue: "مركز مؤتمرات ميامي بيتش",
    start: "2026-12-04",
    end: "2026-12-06",
    date: "4 – 6 ديسمبر 2026",
    time: "الأيام العامة · 11 ص – 6 م",
    description: "أكثر من مئتي صالة عرض من حول العالم تحت سقف واحد، ضمن أسبوع ميامي للفن.",
    photo: P.artbasel,
  },
  {
    id: "riyadh-season",
    title: "Riyadh Season 2026",
    subtitle: "موسم الرياض · Big Time",
    category: "fun",
    city: "الرياض",
    country: "السعودية",
    venue: "مناطق متعددة في الرياض",
    start: "2026-10-21",
    end: "2026-12-30",
    date: "من 21 أكتوبر 2026 · 10 أسابيع",
    description: "النسخة السابعة من موسم الرياض: بطولات عالمية، حفلات، عروض مسرحية وكوميدية، ومناطق ترفيه في أنحاء العاصمة.",
    photo: P.riyadhseason,
  },
  {
    id: "boulevard-world",
    title: "Boulevard World",
    subtitle: "ثقافات العالم في مكان واحد",
    category: "fun",
    city: "الرياض",
    country: "السعودية",
    venue: "بوليفارد وورلد",
    start: "2026-10-21",
    end: "2026-12-30",
    date: "مفتوحة ضمن موسم الرياض 2026",
    description: "إحدى أبرز مناطق موسم الرياض، وتضم هذا الموسم أجنحة جديدة لهولندا والبرتغال واليمن، وبحيرة بتجارب مائية.",
    photo: P.boulevard,
  },
  {
    id: "saudi-gp-2027",
    title: "Saudi Arabian Grand Prix",
    subtitle: "الفورمولا 1 · روزنامة 2027",
    category: "sports",
    city: "جدة",
    country: "السعودية",
    venue: "حلبة كورنيش جدة",
    start: "2027-03-19",
    end: "2027-03-21",
    date: "19 – 21 مارس 2027",
    description: "الجولة الثانية في روزنامة الفورمولا 1 المعتمدة لموسم 2027، على حلبة الكورنيش السريعة في جدة.",
    photo: P.jeddah,
  },
  {
    id: "coachella-2027",
    title: "Coachella 2027",
    subtitle: "Dua Lipa · Tame Impala · SZA",
    category: "music",
    city: "إنديو، كاليفورنيا",
    country: "الولايات المتحدة",
    venue: "Empire Polo Club",
    start: "2027-04-09",
    end: "2027-04-18",
    date: "9 – 11 و 16 – 18 أبريل 2027",
    description: "عطلتان بنفس التشكيلة، بقيادة Dua Lipa وTame Impala وSZA، ومعهم Madonna وDaddy Yankee وغيرهم.",
    photo: P.coachella,
  },
  {
    id: "cannes-2027",
    title: "Festival de Cannes",
    subtitle: "الدورة الثمانون",
    category: "cinema",
    city: "كان",
    country: "فرنسا",
    venue: "Palais des Festivals",
    start: "2027-05-11",
    end: "2027-05-22",
    date: "11 – 22 مايو 2027",
    description: "دورة الذكرى الثمانين لأعرق مهرجانات السينما. الحضور الرسمي بالدعوات وللمهنيين.",
    photo: P.cannes,
  },
  {
    id: "oasis-live-27",
    title: "Oasis Live '27",
    subtitle: "جولة عالمية · 38 حفلة",
    category: "music",
    city: "غلاسكو",
    country: "المملكة المتحدة",
    venue: "Celtic Park",
    start: "2027-05-21",
    end: "2027-09-30",
    date: "تبدأ 21 مايو 2027",
    description: "الجولة تنطلق من غلاسكو، ثم مانشستر وأوروبا والولايات المتحدة، وتختتم في Knebworth في سبتمبر.",
    photo: P.oasis,
  },
  {
    id: "taylor-swift",
    title: "Taylor Swift",
    subtitle: "على الرادار",
    category: "music",
    city: "—",
    country: "",
    venue: "لا توجد جولة معلنة",
    start: "2099-01-01",
    end: "2099-01-01",
    date: "لا توجد مواعيد معلنة",
    description:
      "انتهت جولة The Eras Tour في ديسمبر 2024، ولم تُعلن Taylor Swift أي جولة جديدة حتى الآن. تابعيها هنا وأول ما تنزل المواعيد بتظهر في Scene.",
    photo: P.stadium,
    radar: true,
  },
];

export const photos = Object.values(P) as Photo[];

/** Wikimedia thumbnail (fast CDN) — or the local copy if you ran `npm run photos`. */
export function photoUrl(p: Photo, width: 500 | 960 | 1280 = 960) {
  if (site.photos === "local") return `/photos/${p.id}.jpg`;
  const name = encodeURIComponent(p.file).replace(/%28/g, "(").replace(/%29/g, ")");
  return `https://upload.wikimedia.org/wikipedia/commons/thumb/${p.hash}/${name}/${width}px-${name}`;
}
/** Fallback that always resolves (Commons redirect). */
export function photoFallbackUrl(p: Photo, width = 960) {
  return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(p.file)}?width=${width}`;
}
export function photoPage(p: Photo) {
  return `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(p.file)}`;
}

/** "now" / "soon" / null — used for small status badges. */
export function status(e: EventItem, now = new Date()): "now" | "soon" | "past" | null {
  if (e.radar) return null;
  const s = new Date(e.start).getTime();
  const end = new Date(e.end).getTime() + 24 * 3600 * 1000;
  const t = now.getTime();
  if (t > end) return "past";
  if (t >= s) return "now";
  if (s - t < 14 * 24 * 3600 * 1000) return "soon";
  return null;
}
