#!/usr/bin/env node
/**
 * Generates the Market Insights page HTML and writes it to dist/market-insights.html
 * Uses the same rendering logic as elementor-to-html.js.
 */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..", "..");

// Inline the widget helpers needed for rendering (mirrors elementor-to-html.js)
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
      return `<div style="${style}">${s.editor || ""}</div>`;
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
    default:
      return `<!-- unknown widget: ${w.widgetType} -->`;
  }
}

function renderColumn(col) {
  const inner = (col.elements || []).map(renderAny).join("\n");
  return `<div style="max-width:1280px;margin:0 auto;">\n${inner}\n</div>`;
}

function styleFromSection(s) {
  const pad = s.padding || { top: 80, right: 24, bottom: 80, left: 24 };
  const styles = [
    `padding:${pad.top || 80}px ${pad.right || 24}px ${pad.bottom || 80}px ${pad.left || 24}px`,
  ];
  if (s.background_color) styles.push(`background-color:${s.background_color}`);
  return styles.join(";");
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

// Read the full CSS/JS from elementor-to-html.js by requiring it via eval trick
// Actually, just load and execute it to get the pieces we need — simpler to
// duplicate the SITE_HEADER/FOOTER/CSS/JS constants here since they're inlined.
// We'll require elementor-to-html only for its PAGE_CSS and related constants.
// Instead, build the page directly:

const buildMarketInsights = require("./templates/market-insights");
const content = buildMarketInsights();
const innerHtml = content.map(renderAny).join("\n");

// Read PAGE_CSS, SITE_HEADER, SITE_FOOTER, CHAT_BUBBLE, RELOCATOR_JS from
// the existing elementor-to-html.js by parsing it — actually, just run the
// original script in a sub-process and grab what we need.
// Easier: load elementor-to-html.js as a module (it runs as a script, so
// we snapshot the constants separately).

// Since elementor-to-html.js writes pages-html.json and doesn't export,
// we require the shared pieces by running the script and capturing its globals.
// The simplest approach: inline the outer wrapper here.

// Load the shared HTML shell from the already-generated pages-html.json and
// extract PAGE_CSS, SITE_HEADER, SITE_FOOTER, etc from any existing page.
const pagesHtml = JSON.parse(fs.readFileSync(path.join(root, "dist", "pages-html.json"), "utf8"));
const samplePage = pagesHtml[0];
// The full HTML is: <!-- wp:html -->\n{PAGE_CSS}\n<div class="vg-page">\n{HEADER}\n<main>\n{CONTENT}\n</main>\n{FOOTER}\n{CHAT}\n</div>\n{JS}\n<!-- /wp:html -->
// Extract the shell by splitting on the known markers.
const raw = samplePage.html;
const afterHtmlComment = raw.replace(/^<!-- wp:html -->\n/, "");
// Split out PAGE_CSS — everything before <div class="vg-page">
const vgPageIdx = afterHtmlComment.indexOf('\n<div class="vg-page">');
const PAGE_CSS = afterHtmlComment.slice(0, vgPageIdx);
const afterVgOpen = afterHtmlComment.slice(vgPageIdx + 1 + '<div class="vg-page">'.length + 1);
// SITE_HEADER — up to <main>
const mainIdx = afterVgOpen.indexOf("\n<main>\n");
const SITE_HEADER = afterVgOpen.slice(0, mainIdx);
// after </main>
const endMainIdx = afterVgOpen.indexOf("\n</main>\n");
const afterMain = afterVgOpen.slice(endMainIdx + "\n</main>\n".length);
// SITE_FOOTER — up to CHAT_BUBBLE
const chatIdx = afterMain.indexOf("\n<a href=\"/contact/\" class=\"vg-chat-bubble\"");
const SITE_FOOTER = afterMain.slice(0, chatIdx);
// CHAT_BUBBLE + RELOCATOR_JS — rest before <!-- /wp:html -->
const endHtmlIdx = afterMain.indexOf("\n<!-- /wp:html -->");
const afterFooter = afterMain.slice(chatIdx, endHtmlIdx);

const pageHtml = `<!-- wp:html -->\n${PAGE_CSS}\n<div class="vg-page">\n${SITE_HEADER}\n<main>\n${innerHtml}\n</main>\n${SITE_FOOTER}\n${afterFooter}\n</div>\n<!-- /wp:html -->`;

const outPath = path.join(root, "dist", "market-insights.html");
fs.writeFileSync(outPath, pageHtml);
console.log(`✓ Wrote Market Insights HTML: ${outPath} (${pageHtml.length} bytes)`);
