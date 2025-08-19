// src/app/contact/metadata.ts
import type { Metadata } from "next";

const DOMAIN = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  title: "Contact — Choi Mijin",
  description:
    "Get in touch with the studio for artwork inquiries, acquisitions, commissions, or exhibition invitations & collaborations.",
  alternates: { canonical: `${DOMAIN}/contact` },
  robots: { index: true, follow: true },
};