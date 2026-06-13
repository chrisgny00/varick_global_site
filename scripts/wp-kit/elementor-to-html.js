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

// CSS is served from CDN — pages link to it rather than embedding 20KB inline.
// Source of truth: scripts/wp-kit/vg-style.css → copied to dist/ on build,
// served via jsDelivr from the GitHub repo.
// IMPORTANT: branch name `claude/build-site-from-markdown-MQkyz` contains a `/`,
// which jsDelivr would misparse as a path separator. URL-encode the `/` as %2F.
// Cache buster: append commit short hash so browser treats every CSS update as
// a new resource. Without this, browsers (especially incognito) hold onto the
// previous CSS file indefinitely even after Ctrl+Shift+R.
const CDN_CSS_VERSION = '20260613a';
const CDN_CSS_URL = `https://cdn.jsdelivr.net/gh/chrisgny00/varick_global_site@claude%2Fbuild-site-from-markdown-MQkyz/dist/vg-style.css?v=${CDN_CSS_VERSION}`;

// Copy the canonical CSS file into dist on each build so the CDN stays in sync.
const cssSrc = path.join(__dirname, "vg-style.css");
const cssDest = path.join(root, "dist", "vg-style.css");
if (fs.existsSync(cssSrc)) {
  fs.copyFileSync(cssSrc, cssDest);
}

// Stylesheet that mirrors the Elementor custom CSS — injected once per page.
const PAGE_CSS = `
<link rel="stylesheet" href="${CDN_CSS_URL}" />
`;


const SITE_HEADER = `
<header class="vg-header">
  <div class="vg-header__inner">
    <a href="/" class="vg-header__brand"><span>VARICK</span><span class="vg-mark">GLOBAL</span></a>
    <nav class="vg-header__nav">
      <a href="/services/">Services</a>
      <a href="/commercial/">Commercial</a>
      <a href="/new-development/">New Development</a>
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
        <li><a href="/services/">All Services</a></li>
        <li><a href="/services/buyer-seller-services/">Buyer &amp; Seller Services</a></li>
        <li><a href="/services/tenant-representation/">Tenant Representation</a></li>
        <li><a href="/services/landlord-representation/">Landlord Representation</a></li>
        <li><a href="/services/lease-renewal/">Lease Renewal</a></li>
        <li><a href="/services/valuation/">Valuation &amp; Advisory</a></li>
        <li><a href="/services/investment-sales/">Investment Sales</a></li>
        <li><a href="/services/foreclosures/">Foreclosures</a></li>
        <li><a href="/new-development/">New Development</a></li>
      </ul>
    </div>
    <div class="vg-footer__col">
      <h4>Commercial &amp; HOA</h4>
      <ul>
        <li><a href="/commercial/">Commercial</a></li>
        <li><a href="/land/">Land</a></li>
        <li><a href="/hoa/">HOA Division</a></li>
        <li><a href="/services/hoa-advisory/">HOA Advisory</a></li>
        <li><a href="/services/hoa-conversions/">HOA Conversions</a></li>
        <li><a href="/services/receivership/">Receivership</a></li>
        <li><a href="/services/hoa-sale/">HOA Sale &amp; Termination</a></li>
      </ul>
    </div>
    <div class="vg-footer__col">
      <h4>VG Elite &amp; Advisors</h4>
      <ul>
        <li><a href="/elite/">VG Elite</a></li>
        <li><a href="/elite/#athlete">Athlete Services</a></li>
        <li><a href="/elite/#entertainment">Entertainment Services</a></li>
        <li><a href="/elite/#investment">Investment Division</a></li>
        <li><a href="/advisors/">All Advisors</a></li>
        <li><a href="/advisors/chris-gallego/">Chris Gallego</a></li>
        <li><a href="/advisors/nina-vazquez/">Nina Vazquez</a></li>
        <li><a href="/advisors/alfredo-morejon/">Alfredo Morejon</a></li>
        <li><a href="/advisors/gloria-grullon/">Gloria Grullon</a></li>
      </ul>
    </div>
    <div class="vg-footer__col">
      <h4>Company</h4>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about/">About</a></li>
        <li><a href="/properties/">Properties</a></li>
        <li><a href="/services/valuation/">Valuation</a></li>
        <li><a href="/contact/">Contact</a></li>
        <li><a href="/faq/">FAQ</a></li>
        <li><a href="/privacy/">Privacy</a></li>
      </ul>
    </div>
  </div>

  <div class="vg-footer__sitemap">
    <h4>Neighborhoods We Serve</h4>
    <div class="vg-footer__neighborhoods">
      <a href="/neighborhoods/miami-beach/">Miami Beach</a>
      <a href="/neighborhoods/brickell/">Brickell</a>
      <a href="/neighborhoods/coconut-grove/">Coconut Grove</a>
      <a href="/neighborhoods/coral-gables/">Coral Gables</a>
      <a href="/neighborhoods/aventura/">Aventura</a>
      <a href="/neighborhoods/bal-harbour/">Bal Harbour</a>
      <a href="/neighborhoods/surfside/">Surfside</a>
      <a href="/neighborhoods/key-biscayne/">Key Biscayne</a>
      <a href="/neighborhoods/fort-lauderdale/">Fort Lauderdale</a>
      <a href="/neighborhoods/hollywood/">Hollywood</a>
      <a href="/neighborhoods/hallandale-beach/">Hallandale Beach</a>
      <a href="/neighborhoods/pompano-beach/">Pompano Beach</a>
      <a href="/neighborhoods/deerfield-beach/">Deerfield Beach</a>
      <a href="/neighborhoods/weston/">Weston</a>
      <a href="/neighborhoods/davie/">Davie</a>
      <a href="/neighborhoods/plantation/">Plantation</a>
      <a href="/neighborhoods/palm-beach/">Palm Beach</a>
      <a href="/neighborhoods/boca-raton/">Boca Raton</a>
      <a href="/neighborhoods/delray-beach/">Delray Beach</a>
      <a href="/neighborhoods/wellington/">Wellington</a>
      <a href="/neighborhoods/west-palm-beach/">West Palm Beach</a>
      <a href="/neighborhoods/jupiter/">Jupiter</a>
      <a href="/neighborhoods/palm-beach-gardens/">Palm Beach Gardens</a>
      <a href="/neighborhoods/boynton-beach/">Boynton Beach</a>
    </div>
  </div>

  <div class="vg-footer__bottom">
    <p>© ${new Date().getFullYear()} Varick Global Real Estate Advisors. All rights reserved.</p>
    <div class="vg-footer__social">
      <a href="https://www.facebook.com/VarickGlobal/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.77l-.44 2.89h-2.33v6.99A10 10 0 0 0 22 12z"/></svg>
      </a>
      <a href="https://x.com/varickglobal" target="_blank" rel="noopener noreferrer" aria-label="X">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
      </a>
      <a href="https://www.linkedin.com/company/varickglobal/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14zM8.34 18.34V9.67H5.67v8.67h2.67zm-1.34-9.84a1.55 1.55 0 1 0 0-3.1 1.55 1.55 0 0 0 0 3.1zm11.34 9.84v-4.74c0-2.47-1.32-3.62-3.08-3.62-1.43 0-2.07.79-2.42 1.34V9.67H10.17c.04.76 0 8.67 0 8.67h2.67v-4.85c0-.24.02-.48.09-.65.19-.48.63-.98 1.36-.98.96 0 1.35.74 1.35 1.81v4.67h2.67z"/></svg>
      </a>
      <a href="https://www.instagram.com/varickglobal" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
      </a>
      <a href="https://www.youtube.com/@VarickGlobal" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M23.5 6.51a3 3 0 0 0-2.11-2.12C19.51 4 12 4 12 4s-7.5 0-9.39.39A3 3 0 0 0 .5 6.51 31.5 31.5 0 0 0 .1 12a31.5 31.5 0 0 0 .39 5.49 3 3 0 0 0 2.12 2.12C4.5 20 12 20 12 20s7.5 0 9.39-.39a3 3 0 0 0 2.11-2.12A31.5 31.5 0 0 0 23.9 12a31.5 31.5 0 0 0-.4-5.49zM9.75 15.57V8.43L15.82 12z"/></svg>
      </a>
    </div>
    <p><a href="/privacy/">Privacy</a> · <a href="/contact/">Contact</a></p>
  </div>
</footer>
`;

const RELOCATOR_JS = `
<script>
(function () {
  function vgScrubChrome() {
    // Kill the WordPress.com promo / upgrade / "gift the author" bar in every form.
    var promoSelectors = [
      /* WordPress.com promo / upgrade / gift author bars */
      '#wpadminbar',
      'a[href*="wordpress.com/plans"]',
      'a[href*="upgrade"][href*="wordpress"]',
      '.masterbar',
      '.wpcom-masterbar',
      '.wpcom-action-bar',
      '.wpcom-upgrade-nudge',
      '.upgrade-nudge',
      '.atavist-bar',
      /* Spectra One / AST theme chrome */
      '.site-header',
      '.site-footer',
      'header#masthead',
      'footer#colophon',
      '.ast-primary-header-bar',
      '.ast-above-header',
      '.ast-below-header',
      '.ast-footer-area',
      '.footer-widget-area',
      '[class*="spectra-top-bar"]',
      'iframe[src*="action-bar"]',
      'iframe[src*="public-api.wordpress.com"]',
      'iframe[name*="wpcom"]'
    ];
    promoSelectors.forEach(function (sel) {
      document.querySelectorAll(sel).forEach(function (el) { el.remove(); });
    });
    // Any direct child of <html> or <body> that contains the gift-promo text.
    Array.prototype.slice.call(document.body.children).forEach(function (n) {
      if (!n || !n.textContent) return;
      var t = n.textContent.trim();
      if (/(Enjoy this site|Gift the author|WordPress\\.com plan|Powered by WordPress)/i.test(t) && t.length < 400) {
        n.remove();
      }
    });
    // Walk one level deeper — wpcom sometimes nests the promo inside an outer wrapper.
    Array.prototype.slice.call(document.body.querySelectorAll('body > * > div, body > * > section, body > * > aside')).forEach(function (n) {
      if (!n || !n.textContent) return;
      var t = n.textContent.trim();
      if (/(Enjoy this site|Gift the author|WordPress\\.com plan)/i.test(t) && t.length < 400) {
        n.remove();
      }
    });
    // The promo can also live above <body> in the html root — null out top margins.
    document.documentElement.style.marginTop = '0';
    document.body.style.marginTop = '0';
    document.documentElement.style.paddingTop = '0';
    document.body.style.paddingTop = '0';
  }
  function vgRelocate() {
    var page = document.querySelector('.vg-page');
    if (!page) return;
    /* Remove every wp-block-template-part, site-header, page-banner, etc. */
    document.querySelectorAll([
      'header.wp-block-template-part', 'footer.wp-block-template-part', '.wp-block-template-part',
      '.site-header', 'header#masthead', '.site-footer', 'footer#colophon',
      '.ast-primary-header-bar', '.ast-footer-area',
      /* Bento page-title banner — any of these patterns */
      '.page-banner', '.page-header', 'header.entry-header', '.entry-header',
      '.page-title-section', 'section.page-title-section', '.banner-title',
      'h1.page-title', 'h1.entry-title', '.wp-block-post-title',
      /* WordPress.com promo bars (newer patterns) */
      '[class*="upgrade-nudge"]', '[class*="action-bar"]', '[id*="action-bar"]'
    ].join(',')).forEach(function (n) { n.remove(); });

    /* Move .vg-page directly under <body> so no theme wrapper can interfere */
    if (page.parentNode !== document.body) {
      document.body.insertBefore(page, document.body.firstChild);
    }

    /* Hide every direct body child that isn't ours */
    Array.prototype.slice.call(document.body.children).forEach(function (child) {
      if (child !== page && child.tagName !== 'SCRIPT' && child.tagName !== 'STYLE' && child.id !== 'wpadminbar') {
        child.style.display = 'none';
      }
    });

    /* Also walk one level deeper — Bento nests page-banners inside .entry-content.
       SAFETY: skip any wrapper that is OUR .vg-page or any descendant of it.
       Without this guard, our internal <main> matches and its children get hidden. */
    document.querySelectorAll('.entry-content, .wp-block-post-content, .post-content').forEach(function (wrap) {
      if (wrap === page || page.contains(wrap) || wrap.contains(page)) return;
      Array.prototype.slice.call(wrap.children).forEach(function (child) {
        if (child !== page && !child.contains(page) && child.tagName !== 'SCRIPT' && child.tagName !== 'STYLE') {
          child.style.display = 'none';
        }
      });
    });

    document.body.classList.add('vg-relocated');
    vgScrubChrome();
  }
  function vgInit() { vgScrubChrome(); vgRelocate(); }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', vgInit);
  } else {
    vgInit();
  }
  // Re-scrub on a short interval in case WordPress.com injects the promo bar after load.
  // 60 ticks × 250ms = 15s of vigilance, enough for late-loading scripts.
  var n = 0; var t = setInterval(function () { vgScrubChrome(); if (++n > 60) clearInterval(t); }, 250);
  // Belt-and-suspenders: MutationObserver removes any wpcom chrome injected later.
  if (typeof MutationObserver !== 'undefined') {
    new MutationObserver(function () { vgScrubChrome(); })
      .observe(document.documentElement, { childList: true, subtree: true });
  }
})();
</script>
`;

const CHAT_BUBBLE = `
<a href="/contact/" class="vg-chat-bubble" aria-label="Schedule a consultation">
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="22" height="22">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
  </svg>
</a>
`;

const pages = [];
for (const t of Object.values(manifest.templates)) {
  const tpl = JSON.parse(fs.readFileSync(path.join(stagingDir, "templates", `${t.id}.json`), "utf8"));
  const innerHtml = renderTemplate(tpl.content || []);
  const html = `<!-- wp:html -->\n${PAGE_CSS}\n<div class="vg-page">\n${SITE_HEADER}\n<main>\n${innerHtml}\n</main>\n${SITE_FOOTER}\n${CHAT_BUBBLE}\n</div>\n${RELOCATOR_JS}\n<!-- /wp:html -->`;
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
