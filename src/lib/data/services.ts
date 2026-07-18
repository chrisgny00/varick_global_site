import type { Service } from "@/types";
import { loadContent } from "@/lib/content/loader";

export const services: Service[] = loadContent<Service>(
  "content/services",
  (d, _body, slug) => ({
    slug,
    title: (d.title as string) ?? "",
    short: (d.short as string) ?? "",
    description: (d.description as string) ?? "",
    icon: (d.icon as string) ?? "Briefcase",
    category: (d.category as Service["category"]) ?? undefined,
  })
);

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
