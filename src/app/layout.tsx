// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";

// 1) 도메인 계산: Production/Preview/Local 모두 커버
const DOMAIN =
  process.env.NEXT_PUBLIC_SITE_URL // ex) https://choimijinstudio.com  ← (Vercel 환경변수에 설정 추천)
  || (process.env.NEXT_PUBLIC_VERCEL_URL ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` : "")
  || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

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

  // 절대 URL의 기준점 (여기 기준으로 상대 경로가 절대 경로로 변환됨)
  metadataBase: new URL(DOMAIN),
  alternates: { canonical: "/" },

  openGraph: {
    title: "Choi Mijin — Korean Contemporary Artist",
    description: "Oil on canvas. Sunflowers & contemporary works. Exhibited in Korea & Russia.",
    url: "/",                // ← metadataBase 기준으로 https://.../ 로 변환
    siteName: "Choi Mijin",
    type: "website",
    locale: "en_US",
    images: [
    {
      url: "/wm/IMGL9647%20copy%20-%20청파의%20해바라기%20%28Golden%20Echoes%20in%20Blue%29.jpg",
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
  images: [
    "/wm/IMGL9647%20copy%20-%20청파의%20해바라기%20%28Golden%20Echoes%20in%20Blue%29.jpg",
  ],
},

  robots: { index: true, follow: true },
};