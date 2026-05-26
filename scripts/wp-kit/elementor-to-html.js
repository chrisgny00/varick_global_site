#!/usr/bin/env node
/**
 * Reads dist/varick-global-kit/templates/*.json (Elementor JSON) and converts
 * each one into a flat HTML string suitable for pasting into a Gutenberg
 * <!-- wp:html --> block. Writes dist/pages-html.json: an array of
 * { id, slug, title, html } entries ready to feed pages.create over MCP.
 */

const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..", "..");
const stagingDir = path.join(root, "dist", "varick-global-kit");
const manifest = JSON.parse(fs.readFileSync(path.join(stagingDir, "manifest.json"), "utf8"));

function styleFromSection(s) {
  const pad = s.padding || { top: 80, right: 24, bottom: 80, left: 24 };
  const styles = [
    `padding:${pad.top || 80}px ${pad.right || 24}px ${pad.bottom || 80}px ${pad.left || 24}px`,
  ];
  if (s.background_color) styles.push(`background-color:${s.background_color}`);
  if (s.background_background === "gradient") {
    const a = s.background_color || "#0a0a0a";
    const b = s.background_color_b || "#14060a";
    const angle = (s.background_gradient_angle && s.background_gradient_angle.size) || 135;
    styles.push(`background:linear-gradient(${angle}deg, ${a} 0%, ${b} 100%)`);
  }
  if (s.min_height && s.min_height.size) {
    styles.push(`min-height:${s.min_height.size}${s.min_height.unit || "px"}`);
  }
  return styles.join(";");
}

function renderWidget(w) {
  const s = w.settings || {};
  switch (w.widgetType) {
    case "heading": {
      const tag = s.header_size || "h2";
      const align = s.align || "left";
      const fontFamily = s.typography_font_family || "Cormorant Garamond";
      const fontWeight = s.typography_font_weight || "300";
      const fontSize = s.typography_font_size?.size || 40;
      const color = s.title_color || "#ffffff";
      const cls = s.css_classes || s._css_classes || "";
      const transform = s.typography_text_transform || "";
      const letter = s.typography_letter_spacing?.size;
      const italic = s.typography_font_style === "italic" ? "italic" : "normal";
      const style = [
        `font-family:'${fontFamily}',serif`,
        `font-weight:${fontWeight}`,
        `font-size:${fontSize}px`,
        `color:${color}`,
        `text-align:${align}`,
        `font-style:${italic}`,
        transform ? `text-transform:${transform}` : "",
        letter != null ? `letter-spacing:${letter}px` : "",
        "line-height:1.15",
        "margin:0",
      ].filter(Boolean).join(";");
      return `<${tag} class="${cls}" style="${style}">${s.title || ""}</${tag}>`;
    }
    case "text-editor": {
      const color = s.text_color || "#a6a6a6";
      const align = s.align || "left";
      const fontSize = s.typography_font_size?.size || 15;
      const lineHeight = s.typography_line_height?.size || 1.7;
      const style = `color:${color};text-align:${align};font-size:${fontSize}px;line-height:${lineHeight};font-family:'Raleway',sans-serif;font-weight:300;`;
      const editor = s.editor || "";
      return `<div style="${style}">${editor}</div>`;
    }
    case "button": {
      const link = s.link?.url || "#";
      const text = s.text || "Click";
      const cls = s.css_classes || s._css_classes || "vg-button-primary";
      return `<a href="${link}" class="${cls}">${text}</a>`;
    }
    case "html":
      return s.html || "";
    case "spacer":
      return `<div style="height:${s.space?.size || 40}px"></div>`;
    case "divider":
      return `<hr style="border:none;border-top:1px solid ${s.color || "rgba(255,255,255,0.08)"};margin:${s.gap?.size || 24}px 0;" />`;
    case "icon-box": {
      const title = s.title_text || "";
      const desc = s.description_text || "";
      const url = s.link?.url || "";
      const open = url ? `<a href="${url}" style="text-decoration:none;color:inherit;">` : "";
      const close = url ? `</a>` : "";
      return `${open}<div style="text-align:center;padding:20px;"><h3 style="font-family:'Cormorant Garamond',serif;font-size:24px;color:#fff;margin:0;">${title}</h3><p style="margin-top:12px;color:#a6a6a6;font-size:13px;line-height:1.6;">${desc}</p></div>${close}`;
    }
    case "image": {
      const src = s.image?.url || "";
      return src ? `<img src="${src}" alt="${s.alt || ""}" style="max-width:100%;height:auto;" />` : "";
    }
    default:
      return `<!-- unknown widget: ${w.widgetType} -->`;
  }
}

function renderColumn(col) {
  const inner = (col.elements || []).map(renderAny).join("\n");
  return `<div style="max-width:1280px;margin:0 auto;">\n${inner}\n</div>`;
}

function renderSection(sec) {
  const style = styleFromSection(sec.settings || {});
  const inner = (sec.elements || []).map(renderAny).join("\n");
  return `<section style="${style}">\n${inner}\n</section>`;
}

function renderAny(el) {
  if (el.elType === "section") return renderSection(el);
  if (el.elType === "column") return renderColumn(el);
  if (el.elType === "widget") return renderWidget(el);
  return "";
}

function renderTemplate(content) {
  return content.map(renderAny).join("\n");
}

function pageSlug(t) {
  const s = t.slug;
  if (s.startsWith("service-")) return `services/${s.replace("service-", "")}`;
  if (s.startsWith("agent-")) return `agents/${s.replace("agent-", "")}`;
  if (s.startsWith("neighborhood-")) return `neighborhoods/${s.replace("neighborhood-", "")}`;
  if (s === "agents") return "advisors";
  if (s === "home") return "home";
  if (s === "hoa") return "hoa";
  return s;
}

function pageTitle(t) {
  if (t.slug.startsWith("neighborhood-")) return `${t.title} Real Estate`;
  if (t.slug === "agents") return "Advisors";
  if (t.slug === "home") return "Home";
  return t.title;
}

// Stylesheet that mirrors the Elementor custom CSS — injected once per page.
const PAGE_CSS = `
<style>
:root { --vg-hairline: rgba(255,255,255,0.08); }
body, .elementor-canvas, .page-template-elementor_canvas, .vg-page { background:#0a0a0a !important; color:#fff; font-family:'Raleway',sans-serif; font-weight:300; }
.vg-page { position:relative; width:100vw; margin-left:calc(50% - 50vw); margin-right:calc(50% - 50vw); }
.vg-page section { width:100%; }
.vg-page .container, .vg-page > * { box-sizing:border-box; }
.eyebrow { font-family:'Montserrat',sans-serif !important; font-weight:700 !important; font-size:11px !important; letter-spacing:3px !important; text-transform:uppercase !important; color:#d2203a !important; line-height:1 !important; }
.vg-card { background:#0f0f0f; border:1px solid rgba(255,255,255,0.08); border-radius:4px; }
.vg-card.accent-top { border-top:2px solid #a6192e; }
.vg-badge { display:inline-flex; align-items:center; font-family:'Montserrat',sans-serif; font-weight:700; font-size:10px; letter-spacing:1.8px; text-transform:uppercase; padding:6px 12px; border:1px solid rgba(166,25,46,0.3); background:rgba(166,25,46,0.1); color:#d2203a; border-radius:2px; }
.vg-badge.gold { color:#d4a93a; background:rgba(184,149,42,0.1); border-color:rgba(184,149,42,0.4); }
.vg-badge.elite { color:#a78bff; background:rgba(139,96,255,0.15); border-color:rgba(139,96,255,0.4); }
.vg-badge.neutral { color:#a6a6a6; background:rgba(255,255,255,0.05); border-color:rgba(255,255,255,0.1); }
.vg-button-primary { display:inline-block; background-color:#a6192e !important; color:#fff !important; font-family:'Montserrat',sans-serif !important; font-weight:700 !important; letter-spacing:2.5px !important; text-transform:uppercase !important; font-size:11px !important; border-radius:2px !important; padding:14px 28px !important; text-decoration:none; }
.vg-button-primary:hover { background-color:#d2203a !important; }
.vg-button-outline { display:inline-block; background-color:transparent !important; color:#fff !important; border:1px solid rgba(255,255,255,0.3) !important; font-family:'Montserrat',sans-serif !important; font-weight:700 !important; letter-spacing:2.5px !important; text-transform:uppercase !important; font-size:11px !important; border-radius:2px !important; padding:14px 28px !important; text-decoration:none; }
.vg-button-outline:hover { color:#d2203a !important; border-color:#d2203a !important; }
.vg-button-elite { display:inline-block; background-color:#8b60ff !important; color:#fff !important; font-family:'Montserrat',sans-serif !important; font-weight:700 !important; letter-spacing:2.5px !important; text-transform:uppercase !important; font-size:11px !important; border-radius:2px !important; padding:14px 28px !important; text-decoration:none; }
.vg-button-elite:hover { background-color:#a78bff !important; }
h1,h2,h3,h4,h5 { font-family:'Cormorant Garamond',serif !important; font-weight:300; color:#fff; }
@media (max-width:768px) {
  section { padding:48px 16px !important; }
  h1 { font-size:48px !important; }
  h2 { font-size:36px !important; }
  div[style*="grid-template-columns:repeat(3,1fr)"], div[style*="grid-template-columns:repeat(4,1fr)"], div[style*="grid-template-columns:repeat(5,1fr)"] { grid-template-columns:1fr !important; }
  div[style*="grid-template-columns:8fr 4fr"], div[style*="grid-template-columns:7fr 5fr"], div[style*="grid-template-columns:5fr 7fr"] { grid-template-columns:1fr !important; }
}
</style>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Raleway:wght@300;400;500;600;700&family=Montserrat:wght@600;700&display=swap" />
`;

const pages = [];
for (const t of Object.values(manifest.templates)) {
  const tpl = JSON.parse(fs.readFileSync(path.join(stagingDir, "templates", `${t.id}.json`), "utf8"));
  const innerHtml = renderTemplate(tpl.content || []);
  const html = `${PAGE_CSS}\n<div class="vg-page">\n${innerHtml}\n</div>`;
  pages.push({
    id: t.id,
    slug: pageSlug(t),
    title: pageTitle(t),
    html,
  });
}

const outPath = path.join(root, "dist", "pages-html.json");
fs.writeFileSync(outPath, JSON.stringify(pages, null, 2));
console.log(`✓ Wrote ${pages.length} pages to ${path.relative(root, outPath)}`);
console.log(`  Home HTML size: ${pages.find((p) => p.slug === "home").html.length} bytes`);
