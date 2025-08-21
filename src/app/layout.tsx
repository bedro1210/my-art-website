// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";

// Production/Preview/Local 도메인 계산
const DOMAIN =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.NEXT_PUBLIC_VERCEL_URL ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` : "") ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export const metadata: Metadata = {
  title: "Choi Mijin — Korean Contemporary Artist",
  description:
    "Choi Mijin is a Korean contemporary artist specializing in oil on canvas, inspired by sunflowers and the flow of life. Exhibited in Korea & Russia.",
  keywords: [
    "Choi Mijin",
    "Korean contemporary artist",
    "oil painting",
    "sunflowers art",
    "modern art Korea",
    "exhibition",
    "collaboration",
  ],
  metadataBase: new URL(DOMAIN),
  alternates: { canonical: "/" },

  openGraph: {
    title: "Choi Mijin — Korean Contemporary Artist",
    description: "Oil on canvas. Sunflowers & contemporary works. Exhibited in Korea & Russia.",
    url: "/",
    siteName: "Choi Mijin",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/image/og-cover.jpg", // ← 새 경로
        width: 1200,
        height: 630,
        alt: "Choi Mijin Art — Golden Echoes in Blue",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Choi Mijin — Korean Contemporary Artist",
    description: "Oil on canvas. Sunflowers & contemporary works.",
    images: ["/image/og-cover.jpg"], // ← 새 경로
  },

  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
