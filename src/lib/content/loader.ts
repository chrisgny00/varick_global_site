import fs from "fs";
import path from "path";
import matter from "gray-matter";

export function loadContent<T>(
  dir: string,
  transform: (frontmatter: Record<string, unknown>, body: string, slug: string) => T
): T[] {
  const contentPath = path.join(process.cwd(), dir);
  if (!fs.existsSync(contentPath)) return [];
  return fs
    .readdirSync(contentPath)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const raw = fs.readFileSync(path.join(contentPath, f), "utf8");
      const { data, content } = matter(raw);
      const slug = (data.slug as string) || path.basename(f, ".md");
      return transform(data as Record<string, unknown>, content, slug);
    });
}

export function extractSection(body: string, heading: string): string {
  const lines = body.split("\n");
  const start = lines.findIndex((l) =>
    l.match(new RegExp(`^#{1,3}\\s+${heading}`, "i"))
  );
  if (start === -1) return body.replace(/^#+\s.*/gm, "").trim();
  const end = lines.findIndex((l, i) => i > start && /^#{1,3}\s/.test(l));
  return lines
    .slice(start + 1, end === -1 ? undefined : end)
    .join("\n")
    .trim();
}
