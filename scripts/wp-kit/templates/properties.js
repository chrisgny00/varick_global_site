const { html, ctaBand, heading, spacer, eyebrow } = require("../lib/widgets");
const { pageHero, basicSection } = require("./common");

module.exports = function buildProperties({ properties }) {
  const sample = properties.slice(0, 6);
  return [
    pageHero({
      eyebrowText: "The Inventory",
      title: "South Florida Properties",
      italicWord: "Properties",
      subtitle: "A curated selection of active listings — refine by location, price, type and signature luxury features.",
    }),
    basicSection({
      children: [
        html({
          markup: `
<div class="vg-card" style="padding:24px;background:rgba(166,25,46,0.05);border-color:rgba(166,25,46,0.3);">
  <div class="eyebrow" style="margin-bottom:12px;">IDX Integration</div>
  <p style="color:#fff;margin:0;">Replace this section with your IDX plugin shortcode (iHomeFinder, IDX Broker, etc) once installed. Sample listings shown below.</p>
</div>`,
        }),
        spacer({ size: 32 }),
        eyebrow("Sample Listings"),
        spacer({ size: 16 }),
        heading({ title: "Featured inventory", tag: "h2", size: 40, fontFamily: "Cormorant Garamond", fontWeight: 300 }),
        spacer({ size: 32 }),
        html({
          markup: `
<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:24px;">
  ${sample
    .map(
      (p) => `
  <a href="/properties/${p.id}" style="text-decoration:none;color:inherit;display:block;background:#0f0f0f;border:1px solid rgba(255,255,255,0.08);border-radius:4px;overflow:hidden;">
    <div style="aspect-ratio:4/3;background:linear-gradient(135deg,#1a0508,#0a0a0a 50%,#1a0a14);display:flex;align-items:center;justify-content:center;position:relative;">
      <div style="font-family:'Cormorant Garamond',serif;font-size:64px;font-weight:300;color:rgba(255,255,255,0.04);letter-spacing:8px;">VG</div>
      ${p.badge ? `<span class="vg-badge" style="position:absolute;top:16px;left:16px;">${p.badge}</span>` : ""}
    </div>
    <div style="padding:24px;">
      <div style="font-family:'Cormorant Garamond',serif;font-size:24px;color:#d2203a;font-weight:300;">$${(p.price / 1_000_000).toFixed(2)}M</div>
      <div style="font-family:'Cormorant Garamond',serif;font-size:22px;color:#fff;margin-top:6px;">${p.title}</div>
      <div style="font-size:13px;color:#a6a6a6;margin-top:10px;">${p.city}, ${p.county}</div>
    </div>
  </a>`,
    )
    .join("")}
</div>`,
        }),
      ],
    }),
    ctaBand({}),
  ];
};
