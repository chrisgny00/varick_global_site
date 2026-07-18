import type { Agent } from "@/types";
import { loadContent, extractSection } from "@/lib/content/loader";

export const agents: Agent[] = (
  loadContent<Agent & { _order?: number }>(
    "content/advisors",
    (d, body, slug) => ({
      slug,
      name: (d.name ?? d.title) as string,
      title: (d.role ?? (d.name && d.name !== d.title ? d.title : "")) as string,
      bio:
        extractSection(body, "About") ||
        (d.bio as string) ||
        body.replace(/^#+.*$/gm, "").trim().split("\n\n")[0] ||
        "",
      phone: (d.phone as string) ?? "",
      email: (d.email as string) ?? "",
      image: ((d.image ?? d.photo) as string) ?? "",
      specialties: (d.specialties as string[]) ?? [],
      _order: Number(d.order ?? 99),
    })
  ) as (Agent & { _order?: number })[]
)
  .sort((a, b) => (a._order ?? 99) - (b._order ?? 99))
  .map(({ _order: _, ...rest }) => rest as Agent);

export function getAgent(slug: string): Agent | undefined {
  return agents.find((a) => a.slug === slug);
}
