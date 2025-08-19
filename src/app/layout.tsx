import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";

const DOMAIN = "https://YOUR-DOMAIN.vercel.app"; // 배포 후 실제 도메인으로 교체

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
    description:
      "Oil on canvas. Sunflowers & contemporary works. Exhibited in Korea & Russia.",
    url: DOMAIN,
    siteName: "Choi Mijin",
    images: ["/images/og-cover.jpg"], // 1200x630 추천
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Choi Mijin — Korean Contemporary Artist",
    description: "Oil on canvas. Sunflowers & contemporary works.",
    images: ["/images/og-cover.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}

        {/* ✅ Google Analytics (GA4) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX"
          strategy="afterInteractive"
        />
        <Script id="ga" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];
            function gtag(){dataLayer.push(arguments);} 
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXX');`}
        </Script>
      </body>
    </html>
  );
}
