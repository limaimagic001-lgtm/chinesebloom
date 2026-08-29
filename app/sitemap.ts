import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://chinesebloom.com/",
      lastModified: new Date("2026-08-29"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://chinesebloom.com/free-lesson",
      lastModified: new Date("2026-08-29"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];
}
