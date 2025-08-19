import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";

const DOMAIN = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

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
    images: [`${DOMAIN}/images/og-cover.jpg`], // ← 절대 URL 권장
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Choi Mijin — Korean Contemporary Artist",
    description: "Oil on canvas. Sunflowers & contemporary works.",
    images: [`${DOMAIN}/images/og-cover.jpg`],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}

        {/* GA4는 ID 넣으면 활성화됩니다 */}
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
