import type { Neighborhood } from "@/types";
import { loadContent } from "@/lib/content/loader";

export const neighborhoods: Neighborhood[] = loadContent<Neighborhood>(
  "content/neighborhoods",
  (d, _body, slug) => {
    const stats = (d.stats ?? {}) as Record<string, unknown>;
    return {
      slug,
      name: (d.name as string) ?? "",
      county: (d.county as Neighborhood["county"]) ?? "Miami-Dade",
      intro: (d.intro as string) ?? "",
      photo: (d.photo as string) ?? undefined,
      stats: {
        medianPrice: (stats.medianPrice as string) ?? "",
        daysOnMarket: Number(stats.daysOnMarket ?? 0),
        pricePerSqft: (stats.pricePerSqft as string) ?? "",
        activeListings: Number(stats.activeListings ?? 0),
      },
    };
  }
);

export function getNeighborhood(slug: string): Neighborhood | undefined {
  return neighborhoods.find((n) => n.slug === slug);
}
