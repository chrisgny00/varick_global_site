#!/usr/bin/env node
/**
 * Generates a slim Market Insights page — condensed CSS to keep payload under MCP limit.
 */
const fs = require("fs");
const path = require("path");
const root = path.join(__dirname, "..", "..");

const buildMarketInsights = require("./templates/market-insights");

function renderWidget(w) {
  const s = w.settings || {};
  switch (w.widgetType) {
    case "html": return s.html || "";
    case "spacer": return `<div style="height:${s.space?.size || 40}px"></div>`;
    default: return "";
  }
}
function renderColumn(col) {
  const inner = (col.elements || []).map(renderAny).join("\n");
  return `<div style="max-width:1280px;margin:0 auto;">${inner}</div>`;
}
function styleFromSection(s) {
  const pad = s.padding || { top: 80, right: 24, bottom: 80, left: 24 };
  const parts = [`padding:${pad.top||80}px ${pad.right||24}px ${pad.bottom||80}px ${pad.left||24}px`];
  if (s.background_color) parts.push(`background-color:${s.background_color}`);
  return parts.join(";");
}
function renderSection(sec) {
  const style = styleFromSection(sec.settings || {});
  const inner = (sec.elements || []).map(renderAny).join("\n");
  return `<section style="${style}">${inner}</section>`;
}
function renderAny(el) {
  if (el.elType === "section") return renderSection(el);
  if (el.elType === "column") return renderColumn(el);
  if (el.elType === "widget") return renderWidget(el);
  return "";
}

const content = buildMarketInsights();
const innerHtml = content.map(renderAny).join("\n");

const SLIM_CSS = `<style>
.wp-site-blocks>header,.wp-site-blocks>.wp-block-template-part,.wp-site-blocks>footer,body>header,body>footer,header.wp-block-template-part,footer.wp-block-template-part,.wp-block-post-title,.entry-header,.entry-footer,.skip-link,#wpadminbar,.masterbar,.wpcom-masterbar,.wpcom-action-bar,.wpcom-upgrade-nudge{display:none!important}
html,body{margin:0!important;padding:0!important;background:#0a0a0a!important}
body,.wp-site-blocks,.wp-block-post-content,.entry-content,.is-layout-constrained,main,article,.page{max-width:none!important;width:100%!important;margin-left:0!important;margin-right:0!important;padding-left:0!important;padding-right:0!important}
:root{--vg-crimson:#a6192e;--vg-vivid:#d2203a;--vg-silver:#d1d1d1;--vg-pewter:#a6a6a6}
body,html,.vg-page{background:#0a0a0a!important;color:#fff;font-family:'Raleway',sans-serif;font-weight:300}
.vg-page{position:relative;width:100vw!important;max-width:100vw!important;left:50%;right:50%;margin-left:-50vw!important;margin-right:-50vw!important;box-sizing:border-box}
body>.vg-page{position:static;width:100%!important;max-width:100%!important;left:auto;right:auto;margin-left:0!important;margin-right:0!important}
.vg-page section{width:100%;max-width:100%;box-sizing:border-box}
.eyebrow{font-family:'Montserrat',sans-serif!important;font-weight:700!important;font-size:11px!important;letter-spacing:3px!important;text-transform:uppercase!important;color:#d2203a!important}
.vg-card{background:#0f0f0f;border:1px solid rgba(209,209,209,0.22);border-radius:4px}
.vg-card.accent-top{border-top:2px solid #a6192e}
.vg-badge{display:inline-flex;align-items:center;font-family:'Montserrat',sans-serif;font-weight:700;font-size:10px;letter-spacing:1.8px;text-transform:uppercase;padding:6px 12px;border:1px solid rgba(166,25,46,0.3);background:rgba(166,25,46,0.1);color:#d2203a;border-radius:2px}
.vg-button-primary{display:inline-block;background-color:#a6192e!important;color:#fff!important;font-family:'Montserrat',sans-serif!important;font-weight:700!important;letter-spacing:2.5px!important;text-transform:uppercase!important;font-size:11px!important;border-radius:2px!important;padding:14px 28px!important;text-decoration:none}
.vg-button-primary:hover{background-color:#d2203a!important}
.vg-button-outline{display:inline-block;background-color:transparent!important;color:#d1d1d1!important;border:1px solid rgba(209,209,209,0.35)!important;font-family:'Montserrat',sans-serif!important;font-weight:700!important;letter-spacing:2.5px!important;text-transform:uppercase!important;font-size:11px!important;border-radius:2px!important;padding:14px 28px!important;text-decoration:none}
h1,h2,h3,h4,h5{font-family:'Cormorant Garamond',serif!important;font-weight:300;color:#fff}
.vg-page main>section+section{border-top:1px solid rgba(209,209,209,0.10)}
.vg-page p,.vg-page main p{color:#d1d1d1!important}
.vg-header{position:sticky;top:0;z-index:50;background:rgba(10,10,10,0.95);backdrop-filter:blur(8px);border-bottom:1px solid rgba(209,209,209,0.18)}
.vg-header__inner{max-width:1440px;margin:0 auto;height:72px;padding:0 clamp(16px,3vw,32px);display:flex;align-items:center;justify-content:space-between;gap:24px}
.vg-header__brand{font-family:'Cormorant Garamond',serif;font-weight:600;font-size:22px;letter-spacing:3px;color:#fff;text-decoration:none;display:inline-flex;gap:8px;align-items:baseline;white-space:nowrap}
.vg-header__brand .vg-mark{color:#d2203a}
.vg-header__nav{display:none;gap:clamp(14px,1.8vw,28px);align-items:center}
.vg-header__nav a{font-family:'Montserrat',sans-serif;font-weight:700;font-size:11px;letter-spacing:1.6px;text-transform:uppercase;color:#d1d1d1;text-decoration:none}
.vg-header__cta{display:none;align-items:center;gap:16px}
.vg-header__phone{font-family:'Montserrat',sans-serif;font-weight:700;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#d1d1d1;text-decoration:none}
.vg-header__cta .vg-button-primary{padding:10px 20px!important;font-size:10px!important}
.vg-header__menu-toggle{display:inline-flex;align-items:center;justify-content:center;width:40px;height:40px;background:transparent;border:1px solid rgba(209,209,209,0.3);color:#d1d1d1;cursor:pointer;border-radius:2px}
@media(min-width:900px){.vg-header__nav,.vg-header__cta{display:inline-flex}.vg-header__menu-toggle{display:none}}
.vg-footer{margin-top:96px;background:#050505;border-top:1px solid rgba(209,209,209,0.18);padding:64px clamp(16px,4vw,48px) 32px}
.vg-footer__grid{max-width:1440px;margin:0 auto;display:grid;gap:48px;grid-template-columns:1fr}
@media(min-width:900px){.vg-footer__grid{grid-template-columns:repeat(3,1fr)}}
@media(min-width:1200px){.vg-footer__grid{grid-template-columns:1.2fr 1fr 1fr 1fr 1fr}}
.vg-footer h4{font-family:'Montserrat',sans-serif!important;font-weight:700;font-size:11px;letter-spacing:2.5px;text-transform:uppercase;color:#fff;margin:0 0 20px}
.vg-footer a{color:#d1d1d1;text-decoration:none;font-size:13px;line-height:1.9}
.vg-footer a:hover{color:#fff}
.vg-footer__col ul{list-style:none;padding:0;margin:0}
.vg-footer__contact p{color:#d1d1d1;font-size:13px;line-height:1.7;margin:8px 0}
.vg-footer__sitemap{max-width:1440px;margin:56px auto 0;padding-top:32px;border-top:1px solid rgba(209,209,209,0.18)}
.vg-footer__neighborhoods{display:grid;gap:6px 24px;grid-template-columns:repeat(2,1fr)}
@media(min-width:900px){.vg-footer__neighborhoods{grid-template-columns:repeat(4,1fr)}}
@media(min-width:1200px){.vg-footer__neighborhoods{grid-template-columns:repeat(6,1fr)}}
.vg-footer__neighborhoods a{color:#a6a6a6;text-decoration:none;font-size:12px;line-height:1.8}
.vg-footer__neighborhoods a:hover{color:#d1d1d1}
.vg-footer__bottom{max-width:1440px;margin:40px auto 0;padding-top:24px;border-top:1px solid rgba(209,209,209,0.18);display:flex;flex-direction:column;gap:20px;align-items:center;justify-content:space-between;font-size:12px;color:#a6a6a6}
@media(min-width:768px){.vg-footer__bottom{flex-direction:row}}
.vg-footer__social{display:inline-flex;gap:10px;align-items:center}
.vg-footer__social a{display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;border:1px solid rgba(209,209,209,0.25);color:#a6a6a6;text-decoration:none}
.vg-footer__social a:hover{color:#fff;border-color:#d2203a}
.vg-chat-bubble{position:fixed;right:clamp(16px,3vw,28px);bottom:clamp(16px,3vw,28px);z-index:90;width:56px;height:56px;border-radius:50%;background:#d2203a;color:#fff;display:inline-flex;align-items:center;justify-content:center;box-shadow:0 8px 24px rgba(210,32,58,0.45);border:2px solid rgba(209,209,209,0.25);text-decoration:none}
@media(max-width:639px){.vg-page div[style*="grid-template-columns:repeat(2,1fr)"]{grid-template-columns:1fr!important}.vg-page div[style*="grid-template-columns:1fr 320px"]{grid-template-columns:1fr!important}.vg-page h1{font-size:clamp(36px,9vw,56px)!important}}
</style>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Raleway:wght@300;400;500;600;700&family=Montserrat:wght@600;700&display=swap"/>`;

const HEADER = `<header class="vg-header"><div class="vg-header__inner"><a href="/home/" class="vg-header__brand"><span>VARICK</span><span class="vg-mark">GLOBAL</span></a><nav class="vg-header__nav"><a href="/services/">Services</a><a href="/commercial/">Commercial</a><a href="/new-development/">New Development</a><a href="/hoa/">HOA</a><a href="/properties/">Properties</a><a href="/elite/">VG Elite</a><a href="/advisors/">Advisors</a><a href="/about/">About</a></nav><div class="vg-header__cta"><a href="tel:+17863527547" class="vg-header__phone">786.352.7547</a><a href="/contact/" class="vg-button-primary">Schedule</a></div><a href="/contact/" class="vg-header__menu-toggle" aria-label="Contact"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg></a></div></header>`;

const FOOTER = `<footer class="vg-footer"><div class="vg-footer__grid"><div class="vg-footer__contact"><div class="vg-header__brand" style="margin-bottom:18px;"><span>VARICK</span><span class="vg-mark">GLOBAL</span></div><p>19505 Biscayne Blvd, Suite 2350<br/>Aventura, FL 33180</p><p><a href="tel:+17863527547">786.352.7547</a></p><p><a href="mailto:contact@varickglobal.com">contact@varickglobal.com</a></p></div><div class="vg-footer__col"><h4>Services</h4><ul><li><a href="/services/">All Services</a></li><li><a href="/services/buyer-seller-services/">Buyer &amp; Seller Services</a></li><li><a href="/commercial/">Commercial</a></li><li><a href="/hoa/">HOA Division</a></li><li><a href="/elite/">VG Elite</a></li><li><a href="/contact/">Contact</a></li></ul></div><div class="vg-footer__col"><h4>Company</h4><ul><li><a href="/about/">About</a></li><li><a href="/advisors/">Advisors</a></li><li><a href="/valuation/">Valuation</a></li><li><a href="/faq/">FAQ</a></li><li><a href="/privacy/">Privacy</a></li></ul></div></div><div class="vg-footer__sitemap"><h4>Neighborhoods We Serve</h4><div class="vg-footer__neighborhoods"><a href="/neighborhoods/miami-beach/">Miami Beach</a><a href="/neighborhoods/brickell/">Brickell</a><a href="/neighborhoods/coconut-grove/">Coconut Grove</a><a href="/neighborhoods/coral-gables/">Coral Gables</a><a href="/neighborhoods/aventura/">Aventura</a><a href="/neighborhoods/bal-harbour/">Bal Harbour</a><a href="/neighborhoods/surfside/">Surfside</a><a href="/neighborhoods/key-biscayne/">Key Biscayne</a><a href="/neighborhoods/fort-lauderdale/">Fort Lauderdale</a><a href="/neighborhoods/hollywood/">Hollywood</a><a href="/neighborhoods/palm-beach/">Palm Beach</a><a href="/neighborhoods/boca-raton/">Boca Raton</a></div></div><div class="vg-footer__bottom"><p>© 2026 Varick Global Real Estate Advisors. All rights reserved.</p><div class="vg-footer__social"><a href="https://www.instagram.com/varickglobal" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg></a><a href="https://www.linkedin.com/company/varickglobal/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14zM8.34 18.34V9.67H5.67v8.67h2.67zm-1.34-9.84a1.55 1.55 0 1 0 0-3.1 1.55 1.55 0 0 0 0 3.1zm11.34 9.84v-4.74c0-2.47-1.32-3.62-3.08-3.62-1.43 0-2.07.79-2.42 1.34V9.67H10.17c.04.76 0 8.67 0 8.67h2.67v-4.85c0-.24.02-.48.09-.65.19-.48.63-.98 1.36-.98.96 0 1.35.74 1.35 1.81v4.67h2.67z"/></svg></a></div><p><a href="/privacy/">Privacy</a> · <a href="/contact/">Contact</a></p></div></footer>`;

const CHAT = `<a href="/contact/" class="vg-chat-bubble" aria-label="Schedule a consultation"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="22" height="22"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg></a>`;

const JS = `<script>(function(){function s(){['#wpadminbar','.masterbar','.wpcom-masterbar','.wpcom-action-bar'].forEach(function(sel){document.querySelectorAll(sel).forEach(function(el){el.remove();})});document.documentElement.style.marginTop='0';document.body.style.marginTop='0';}function r(){var p=document.querySelector('.vg-page');if(!p)return;document.querySelectorAll('header.wp-block-template-part,footer.wp-block-template-part,.wp-block-template-part').forEach(function(n){n.remove();});if(p.parentNode!==document.body)document.body.insertBefore(p,document.body.firstChild);Array.prototype.slice.call(document.body.children).forEach(function(c){if(c!==p&&c.tagName!=='SCRIPT'&&c.tagName!=='STYLE'&&c.id!=='wpadminbar')c.style.display='none';});s();}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){s();r();});else{s();r();}var n=0;var t=setInterval(function(){s();if(++n>20)clearInterval(t);},250);})();</script>`;

const pageHtml = `<!-- wp:html -->\n${SLIM_CSS}\n<div class="vg-page">\n${HEADER}\n<main>\n${innerHtml}\n</main>\n${FOOTER}\n${CHAT}\n</div>\n${JS}\n<!-- /wp:html -->`;

const outPath = path.join(root, "dist", "market-insights-slim.html");
fs.writeFileSync(outPath, pageHtml);
console.log(`✓ Slim HTML: ${outPath} (${pageHtml.length} bytes)`);
