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
/* === Twenty Twenty-Five / Twenty Twenty-Four block theme chrome reset === */
/* Hide every header template part, every site-title/logo/nav block, and any
   pre-content chrome — even if the theme renders them with markup our :has()
   selector wouldn't catch. */
.wp-site-blocks > header,
.wp-site-blocks > .wp-block-template-part,
.wp-site-blocks > footer,
body > header,
body > footer,
header.wp-block-template-part,
footer.wp-block-template-part,
.wp-block-template-part[data-type*="header"],
.wp-block-template-part[data-type*="footer"],
.wp-block-template-part:has(.wp-block-site-title),
.wp-block-template-part:has(.wp-block-navigation),
.wp-block-template-part:has(.wp-block-site-logo),
.wp-block-site-title,
.wp-block-site-logo,
.wp-block-site-tagline,
.wp-block-navigation:not(.vg-header__nav .wp-block-navigation),
.wp-block-post-title,
.wp-block-post-date,
.wp-block-post-author,
.entry-header,
.entry-meta,
.entry-footer,
.post-navigation,
.posts-navigation,
.is-position-sticky,
.skip-link { display:none !important; }

/* And re-show OUR header even though it sits inside .vg-page. */
.vg-page .vg-header { display:block !important; }
.vg-page .vg-footer { display:block !important; }

/* Neutralize every wrapper that WP / Twenty Twenty-Five may put around our content,
   at every level of specificity. */
body.wp-singular,
body,
html body,
.wp-site-blocks,
body .wp-site-blocks,
.wp-site-blocks > main,
.wp-site-blocks > .wp-block-group,
.wp-block-post-content,
.wp-block-post-content > .vg-page,
.wp-block-group.is-layout-constrained,
.wp-block-group.is-layout-flow,
.entry-content,
.entry-content.is-layout-constrained,
.is-layout-constrained,
.is-layout-flow,
.is-layout-constrained > .vg-page,
main.wp-block-group,
main,
article,
.post,
.page {
  max-width: none !important;
  width: 100% !important;
  margin-left: 0 !important;
  margin-right: 0 !important;
  padding-left: 0 !important;
  padding-right: 0 !important;
  --wp--style--global--content-size: 100%;
  --wp--style--global--wide-size: 100%;
}

/* The :where() rules Twenty Twenty-Five injects for layout constraints — kill them. */
:where(.is-layout-constrained) > :where(:not(.alignleft):not(.alignright):not(.alignfull)) {
  max-width: 100% !important;
  margin-left: 0 !important;
  margin-right: 0 !important;
}

body { padding:0 !important; margin:0 !important; overflow-x:hidden; background:#0a0a0a !important; }
html { background:#0a0a0a !important; }

/* === Houzez selector reset (kept in case theme switches back) === */
header#header, header.site-header, footer#footer, footer.site-footer,
.header_top, .header_top_section, .copy-section, .footer-section,
.sidebar, aside, .breadcrumbs, .page-header, .houzez-search-banner { display:none !important; }

/* === Varick page styles === */
:root {
  --vg-hairline: rgba(255,255,255,0.08);
  --vg-deep: #0a0a0a;
  --vg-card: #0f0f0f;
  --vg-crimson: #a6192e;
  --vg-vivid: #d2203a;
  --vg-silver: #d1d1d1;
  --vg-pewter: #a6a6a6;
}
html, body, .elementor-canvas, .page-template-elementor_canvas, .vg-page { background:#0a0a0a !important; color:#fff; font-family:'Raleway',sans-serif; font-weight:300; }

/* The single most important rule: break out of any container WordPress puts around us. */
body > .vg-page,
.vg-page {
  position: relative;
  width: 100vw !important;
  max-width: 100vw !important;
  left: 50%;
  right: 50%;
  margin-left: -50vw !important;
  margin-right: -50vw !important;
  box-sizing: border-box;
}
/* When the relocator JS runs, .vg-page becomes a body child — neutralize the
   viewport hack since it no longer needs to break out. */
body > .vg-page {
  position: static;
  width: 100% !important;
  max-width: 100% !important;
  left: auto;
  right: auto;
  margin-left: 0 !important;
  margin-right: 0 !important;
}
.vg-page section { width:100%; max-width:100%; box-sizing:border-box; }
.vg-page .container, .vg-page > * { box-sizing:border-box; }
.vg-page main { display:block; width:100%; max-width:100%; padding:0; margin:0; }

/* Section padding scales with viewport. */
.vg-page main > section {
  padding-left: clamp(16px, 4vw, 48px) !important;
  padding-right: clamp(16px, 4vw, 48px) !important;
}

.eyebrow { font-family:'Montserrat',sans-serif !important; font-weight:700 !important; font-size:11px !important; letter-spacing:3px !important; text-transform:uppercase !important; color:#d2203a !important; line-height:1 !important; }
.vg-card { background:#0f0f0f; border:1px solid rgba(255,255,255,0.08); border-radius:4px; }
.vg-card.accent-top { border-top:2px solid #a6192e; }
.vg-badge { display:inline-flex; align-items:center; font-family:'Montserrat',sans-serif; font-weight:700; font-size:10px; letter-spacing:1.8px; text-transform:uppercase; padding:6px 12px; border:1px solid rgba(166,25,46,0.3); background:rgba(166,25,46,0.1); color:#d2203a; border-radius:2px; }
.vg-badge.gold { color:#d4a93a; background:rgba(184,149,42,0.1); border-color:rgba(184,149,42,0.4); }
.vg-badge.elite { color:#a78bff; background:rgba(139,96,255,0.15); border-color:rgba(139,96,255,0.4); }
.vg-badge.silver { color:#d1d1d1; background:rgba(209,209,209,0.08); border-color:rgba(209,209,209,0.25); }
.vg-badge.neutral { color:#a6a6a6; background:rgba(255,255,255,0.05); border-color:rgba(255,255,255,0.1); }
.vg-text-silver { color:#d1d1d1 !important; }
.vg-divider-silver { border-top:1px solid rgba(209,209,209,0.18) !important; }
.vg-button-primary { display:inline-block; background-color:#a6192e !important; color:#fff !important; font-family:'Montserrat',sans-serif !important; font-weight:700 !important; letter-spacing:2.5px !important; text-transform:uppercase !important; font-size:11px !important; border-radius:2px !important; padding:14px 28px !important; text-decoration:none; }
.vg-button-primary:hover { background-color:#d2203a !important; }
.vg-button-outline { display:inline-block; background-color:transparent !important; color:#d1d1d1 !important; border:1px solid rgba(209,209,209,0.35) !important; font-family:'Montserrat',sans-serif !important; font-weight:700 !important; letter-spacing:2.5px !important; text-transform:uppercase !important; font-size:11px !important; border-radius:2px !important; padding:14px 28px !important; text-decoration:none; }
.vg-button-outline:hover { color:#fff !important; border-color:#d2203a !important; background-color:rgba(210,32,58,0.08) !important; }
.vg-button-elite { display:inline-block; background-color:#8b60ff !important; color:#fff !important; font-family:'Montserrat',sans-serif !important; font-weight:700 !important; letter-spacing:2.5px !important; text-transform:uppercase !important; font-size:11px !important; border-radius:2px !important; padding:14px 28px !important; text-decoration:none; }
.vg-button-elite:hover { background-color:#a78bff !important; }
h1,h2,h3,h4,h5 { font-family:'Cormorant Garamond',serif !important; font-weight:300; color:#fff; }

/* === Silver remap & accents: weave #d1d1d1 throughout the body === */
.vg-page [style*="color:#a6a6a6"],
.vg-page [style*="color: #a6a6a6"],
.vg-page [style*="color:rgba(255,255,255,0.9)"] { color: #d1d1d1 !important; }
.vg-page p, .vg-page main p { color: #d1d1d1 !important; }
.vg-page main li, .vg-page main figcaption, .vg-page main blockquote { color: #d1d1d1 !important; }

/* Silver hairlines on common hairline borders */
.vg-page [style*="border:1px solid rgba(255,255,255,0.08)"],
.vg-page [style*="border-top:1px solid rgba(255,255,255,0.08)"],
.vg-page [style*="border-bottom:1px solid rgba(255,255,255,0.08)"] {
  border-color: rgba(209,209,209,0.22) !important;
}
.vg-page .vg-card { border-color: rgba(209,209,209,0.22) !important; }

/* Section heading accent line (crimson → silver gradient) under every h2 inside main */
.vg-page main h2::after {
  content:"";
  display:block;
  width:64px;
  height:2px;
  margin-top:18px;
  background:linear-gradient(90deg, #d2203a 0%, #d1d1d1 100%);
}
.vg-page main [style*="text-align:center"] h2::after,
.vg-page main h2[style*="text-align:center"]::after { margin-left:auto; margin-right:auto; }

/* Eyebrow / small caps labels — silver on even cards for visual rhythm */
.vg-page div[style*="display:grid"] > *:nth-child(even) [style*="color:#d2203a"]:not(em):not(.vg-button-primary):not(.vg-button-outline):not(.vg-button-elite) {
  color: #d1d1d1 !important;
}

/* Top hairline on every section divides them with a subtle silver line */
.vg-page main > section + section { border-top: 1px solid rgba(209,209,209,0.10); }

/* Force silver on the property-card location and meta lines */
.vg-page a[href^="/properties/"] > div:last-child > div:nth-child(3),
.vg-page a[href^="/properties/"] > div:last-child > div:last-child { color: #d1d1d1 !important; }

/* === VG site header (injected at top of every page) === */
.vg-header { position:sticky; top:0; z-index:50; background:rgba(10,10,10,0.95); backdrop-filter:blur(8px); -webkit-backdrop-filter:blur(8px); border-bottom:1px solid rgba(209,209,209,0.18); }
.vg-header__inner { max-width:1440px; margin:0 auto; height:72px; padding:0 clamp(16px, 3vw, 32px); display:flex; align-items:center; justify-content:space-between; gap:24px; }
.vg-header__brand { font-family:'Cormorant Garamond',serif; font-weight:600; font-size:22px; letter-spacing:3px; color:#fff; text-decoration:none; display:inline-flex; gap:8px; align-items:baseline; white-space:nowrap; }
.vg-header__brand .vg-mark { color:#d2203a; }
.vg-header__nav { display:none; gap:clamp(14px, 1.8vw, 28px); align-items:center; }
.vg-header__nav a { font-family:'Montserrat',sans-serif; font-weight:700; font-size:11px; letter-spacing:1.6px; text-transform:uppercase; color:#d1d1d1; text-decoration:none; transition:color .15s; white-space:nowrap; }
.vg-header__nav a:hover { color:#fff; }
.vg-header__cta { display:none; align-items:center; gap:16px; }
.vg-header__phone { font-family:'Montserrat',sans-serif; font-weight:700; font-size:11px; letter-spacing:2px; text-transform:uppercase; color:#d1d1d1; text-decoration:none; display:inline-flex; align-items:center; gap:6px; white-space:nowrap; }
.vg-header__phone:hover { color:#fff; }
.vg-header__cta .vg-button-primary { padding:10px 20px !important; font-size:10px !important; }
.vg-header__menu-toggle { display:inline-flex; align-items:center; justify-content:center; width:40px; height:40px; background:transparent; border:1px solid rgba(209,209,209,0.3); color:#d1d1d1; cursor:pointer; border-radius:2px; }
.vg-header__menu-toggle svg { width:20px; height:20px; }
@media (min-width:900px) {
  .vg-header__nav, .vg-header__cta { display:inline-flex; }
  .vg-header__menu-toggle { display:none; }
}

/* === VG site footer === */
.vg-footer { margin-top:96px; background:#050505; border-top:1px solid rgba(209,209,209,0.18); padding:64px clamp(16px, 4vw, 48px) 32px; }
.vg-footer__grid { max-width:1440px; margin:0 auto; display:grid; gap:48px; grid-template-columns:1fr; }
@media (min-width:640px) { .vg-footer__grid { grid-template-columns:repeat(2,1fr); } }
@media (min-width:1024px) { .vg-footer__grid { grid-template-columns:repeat(4,1fr); } }
.vg-footer h4 { font-family:'Montserrat',sans-serif !important; font-weight:700; font-size:11px; letter-spacing:2.5px; text-transform:uppercase; color:#fff; margin:0 0 20px; }
.vg-footer a { color:#d1d1d1; text-decoration:none; font-size:13px; line-height:1.9; }
.vg-footer a:hover { color:#fff; }
.vg-footer__col ul { list-style:none; padding:0; margin:0; }
.vg-footer__contact p { color:#d1d1d1; font-size:13px; line-height:1.7; margin:8px 0; }
.vg-footer__contact .vg-mark { color:#d2203a; }
.vg-footer__bottom { max-width:1440px; margin:56px auto 0; padding-top:24px; border-top:1px solid rgba(209,209,209,0.18); display:flex; flex-direction:column; gap:16px; align-items:center; justify-content:space-between; font-size:12px; color:#a6a6a6; }
@media (min-width:768px) { .vg-footer__bottom { flex-direction:row; } }

/* === Responsive breakpoints === */
/* Mobile: < 640px */
@media (max-width:639px) {
  .vg-page main > section { padding-top:56px !important; padding-bottom:56px !important; }
  .vg-page h1 { font-size:clamp(36px, 9vw, 56px) !important; line-height:1.1 !important; }
  .vg-page h2 { font-size:clamp(28px, 7vw, 40px) !important; line-height:1.15 !important; }
  .vg-page h3 { font-size:clamp(20px, 5vw, 26px) !important; }
  .vg-page div[style*="font-size:64px"] { font-size:44px !important; }
  .vg-page div[style*="font-size:96px"] { font-size:48px !important; letter-spacing:4px !important; }
  .vg-page div[style*="font-size:72px"] { font-size:42px !important; }
  .vg-page div[style*="grid-template-columns:repeat(2,1fr)"],
  .vg-page div[style*="grid-template-columns:repeat(3,1fr)"],
  .vg-page div[style*="grid-template-columns:repeat(4,1fr)"],
  .vg-page div[style*="grid-template-columns:repeat(5,1fr)"] { grid-template-columns:1fr !important; }
  .vg-page div[style*="grid-template-columns:8fr 4fr"],
  .vg-page div[style*="grid-template-columns:7fr 5fr"],
  .vg-page div[style*="grid-template-columns:5fr 7fr"] { grid-template-columns:1fr !important; }
  .vg-header__inner { padding:0 16px; height:60px; }
  .vg-header__brand { font-size:18px; letter-spacing:2px; }
}

/* Tablet: 640–1023px */
@media (min-width:640px) and (max-width:1023px) {
  .vg-page main > section { padding-top:80px !important; padding-bottom:80px !important; }
  .vg-page h1 { font-size:clamp(48px, 7vw, 64px) !important; }
  .vg-page h2 { font-size:clamp(36px, 5.5vw, 44px) !important; }
  .vg-page div[style*="grid-template-columns:repeat(3,1fr)"],
  .vg-page div[style*="grid-template-columns:repeat(4,1fr)"],
  .vg-page div[style*="grid-template-columns:repeat(5,1fr)"] { grid-template-columns:repeat(2, 1fr) !important; }
  .vg-page div[style*="grid-template-columns:8fr 4fr"],
  .vg-page div[style*="grid-template-columns:7fr 5fr"],
  .vg-page div[style*="grid-template-columns:5fr 7fr"] { grid-template-columns:1fr !important; }
}

/* Desktop: 1024px+ — fluid type & sane caps */
@media (min-width:1024px) {
  .vg-page h1 { font-size:clamp(56px, 5.5vw, 84px) !important; line-height:1.05 !important; }
  .vg-page h2 { font-size:clamp(42px, 4vw, 56px) !important; line-height:1.1 !important; }
  .vg-page main > section > div[style*="max-width:1280px"] { max-width:min(1280px, 92vw) !important; }
}

/* Inner content max-width safety on all sizes */
.vg-page main > section > div { width:100%; max-width:1280px; margin-left:auto !important; margin-right:auto !important; }
</style>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Raleway:wght@300;400;500;600;700&family=Montserrat:wght@600;700&display=swap" />
`;

const SITE_HEADER = `
<header class="vg-header">
  <div class="vg-header__inner">
    <a href="/home/" class="vg-header__brand"><span>VARICK</span><span class="vg-mark">GLOBAL</span></a>
    <nav class="vg-header__nav">
      <a href="/services/">Services</a>
      <a href="/commercial/">Commercial</a>
      <a href="/hoa/">HOA</a>
      <a href="/properties/">Properties</a>
      <a href="/elite/">VG Elite</a>
      <a href="/advisors/">Advisors</a>
      <a href="/about/">About</a>
    </nav>
    <div class="vg-header__cta">
      <a href="tel:+17863527547" class="vg-header__phone">786.352.7547</a>
      <a href="/contact/" class="vg-button-primary">Schedule</a>
    </div>
    <a href="/contact/" class="vg-header__menu-toggle" aria-label="Contact"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg></a>
  </div>
</header>
`;

const SITE_FOOTER = `
<footer class="vg-footer">
  <div class="vg-footer__grid">
    <div class="vg-footer__contact">
      <div class="vg-header__brand" style="margin-bottom:18px;"><span>VARICK</span><span class="vg-mark">GLOBAL</span></div>
      <p>19505 Biscayne Blvd, Suite 2350<br/>Aventura, FL 33180</p>
      <p><a href="tel:+17863527547">786.352.7547</a></p>
      <p><a href="mailto:contact@varickglobal.com">contact@varickglobal.com</a></p>
    </div>
    <div class="vg-footer__col">
      <h4>Services</h4>
      <ul>
        <li><a href="/services/buyer-seller-services/">Buyer &amp; Seller Services</a></li>
        <li><a href="/services/tenant-representation/">Tenant Representation</a></li>
        <li><a href="/services/landlord-representation/">Landlord Representation</a></li>
        <li><a href="/services/valuation/">Valuation &amp; Advisory</a></li>
        <li><a href="/services/investment-sales/">Investment Sales</a></li>
        <li><a href="/services/new-development/">New Development</a></li>
      </ul>
    </div>
    <div class="vg-footer__col">
      <h4>HOA Division</h4>
      <ul>
        <li><a href="/services/hoa-advisory/">HOA Advisory</a></li>
        <li><a href="/services/hoa-conversions/">HOA Conversions</a></li>
        <li><a href="/services/receivership/">Receivership</a></li>
        <li><a href="/services/hoa-sale/">HOA Sale &amp; Termination</a></li>
        <li><a href="/hoa/">HOA Division</a></li>
      </ul>
    </div>
    <div class="vg-footer__col">
      <h4>VG Elite</h4>
      <ul>
        <li><a href="/elite/#athlete">Athlete Services</a></li>
        <li><a href="/elite/#entertainment">Entertainment Services</a></li>
        <li><a href="/elite/#investment">Investment Division</a></li>
        <li><a href="/elite/#inquiry">Private Inquiry</a></li>
      </ul>
    </div>
  </div>
  <div class="vg-footer__bottom">
    <p>© ${new Date().getFullYear()} Varick Global Real Estate Advisors. All rights reserved.</p>
    <p><a href="/privacy/">Privacy</a></p>
  </div>
</footer>
`;

const RELOCATOR_JS = `
<script>
(function () {
  function vgRelocate() {
    var page = document.querySelector('.vg-page');
    if (!page || page.parentNode === document.body) return;
    // Remove every WordPress template part (header/footer) so nothing renders above us.
    document.querySelectorAll('header.wp-block-template-part, footer.wp-block-template-part, .wp-block-template-part').forEach(function (n) { n.remove(); });
    // Move the page to be the first child of <body>, escaping all theme wrappers.
    document.body.insertBefore(page, document.body.firstChild);
    // Hide any sibling left over (the now-empty .wp-site-blocks etc.)
    Array.prototype.slice.call(document.body.children).forEach(function (child) {
      if (child !== page && child.tagName !== 'SCRIPT' && child.tagName !== 'STYLE' && child.id !== 'wpadminbar') {
        child.style.display = 'none';
      }
    });
    document.body.classList.add('vg-relocated');
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', vgRelocate);
  } else {
    vgRelocate();
  }
})();
</script>
`;

const pages = [];
for (const t of Object.values(manifest.templates)) {
  const tpl = JSON.parse(fs.readFileSync(path.join(stagingDir, "templates", `${t.id}.json`), "utf8"));
  const innerHtml = renderTemplate(tpl.content || []);
  const html = `${PAGE_CSS}\n<div class="vg-page">\n${SITE_HEADER}\n<main>\n${innerHtml}\n</main>\n${SITE_FOOTER}\n</div>\n${RELOCATOR_JS}`;
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
