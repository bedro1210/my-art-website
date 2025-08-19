import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://YOUR-DOMAIN.vercel.app";
  const routes = ["/"]; // 페이지 늘어나면 추가: "/contact" 등
  return routes.map((p) => ({
    url: `${base}${p}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: p === "/" ? 1 : 0.6,
  }));
}