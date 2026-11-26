import type { Metadata, Viewport } from "next";
import { site } from "@/config/site";
import "./globals.css";

const base =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");

// Spoiler-free: the WhatsApp link preview must look like an ordinary events site.
export const metadata: Metadata = {
  metadataBase: new URL(base),
  title: `${site.name} | ${site.tagline}`,
  description: "حفلات، مهرجانات، سينما، فنون ورياضة حول العالم، في مكان واحد.",
  openGraph: {
    title: `${site.name} | ${site.tagline}`,
    description: "حفلات، مهرجانات، سينما، فنون ورياضة حول العالم.",
    type: "website",
    locale: "ar_SA",
    siteName: site.name,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: site.name }],
  },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
};

export const viewport: Viewport = {
  themeColor: site.colors.paper,
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const vars = Object.fromEntries(Object.entries(site.colors).map(([k, v]) => [`--c-${k}`, v])) as React.CSSProperties;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" style={vars}>
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
