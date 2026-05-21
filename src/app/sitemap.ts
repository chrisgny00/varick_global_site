import type { MetadataRoute } from "next";
import { properties } from "@/lib/data/properties";
import { services } from "@/lib/data/services";
import { agents } from "@/lib/data/agents";
import { neighborhoods } from "@/lib/data/neighborhoods";
import { siteConfig } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();
  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/commercial",
    "/hoa",
    "/land",
    "/properties",
    "/elite",
    "/agents",
    "/valuation",
    "/contact",
    "/faq",
  ].map((p) => ({ url: `${base}${p || "/"}`, lastModified: now, changeFrequency: "weekly" as const, priority: p === "" ? 1 : 0.8 }));

  return [
    ...staticRoutes,
    ...services.map((s) => ({
      url: `${base}/services/${s.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...properties.map((p) => ({
      url: `${base}/properties/${p.id}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...agents.map((a) => ({
      url: `${base}/agents/${a.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...neighborhoods.map((n) => ({
      url: `${base}/neighborhoods/${n.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];
}
