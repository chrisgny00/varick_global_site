const { html, ctaBand, heading, spacer, eyebrow } = require("../lib/widgets");
const { pageHero, basicSection } = require("./common");

module.exports = function buildCommercial({ properties }) {
  const verticals = [
    { name: "Office", desc: "Class A office leasing, sub-leasing and tenant representation across South Florida's financial corridors." },
    { name: "Industrial", desc: "Distribution, last-mile, and flex industrial — sales and leasing in Doral, Medley, and emerging Broward submarkets." },
    { name: "Multi-Family", desc: "Stabilized and value-add multifamily — boutique, mid-market and institutional-grade." },
    { name: "Retail", desc: "High-street and anchored retail leasing, repositioning and investment sales." },
    { name: "Land", desc: "Development sites, infill parcels, and large-acreage transactions." },
  ];
  const commercial = properties.filter((p) => p.transactionType === "commercial").slice(0, 6);

  return [
    pageHero({
      eyebrowText: "Commercial Practice",
      title: "Commercial Real Estate",
      italicWord: "Real Estate",
      subtitle: "Underwriting, leasing and investment-sales advisory for owners, tenants and capital across Miami-Dade, Broward and Palm Beach.",
    }),
    basicSection({
      children: [
        eyebrow("Sectors We Cover"),
        spacer({ size: 16 }),
        heading({ title: 'Five <em style="color:#d2203a;font-style:italic;">disciplined</em> verticals', tag: "h2", size: 48, fontFamily: "Cormorant Garamond", fontWeight: 300 }),
        spacer({ size: 40 }),
        html({
          markup: `
<div style="display:grid;grid-template-columns:repeat(5,1fr);gap:20px;">
  ${verticals
    .map(
      (v) => `
  <a href="/properties?propertyType=${v.name}" class="vg-card" style="display:block;padding:28px;text-decoration:none;color:inherit;">
    <div style="width:44px;height:44px;border-radius:50%;background:rgba(166,25,46,0.1);border:1px solid rgba(166,25,46,0.3);display:flex;align-items:center;justify-content:center;margin-bottom:16px;color:#d2203a;">◆</div>
    <h3 style="font-family:'Cormorant Garamond',serif;font-size:22px;color:#fff;font-weight:400;margin:0;">${v.name}</h3>
    <p style="margin-top:12px;color:#a6a6a6;font-size:13px;line-height:1.6;">${v.desc}</p>
  </a>`,
    )
    .join("")}
</div>`,
        }),
      ],
    }),
    basicSection({
      children: [
        eyebrow("Available Now"),
        spacer({ size: 16 }),
        heading({ title: "Active commercial listings", tag: "h2", size: 40, fontFamily: "Cormorant Garamond", fontWeight: 300 }),
        spacer({ size: 32 }),
        html({
          markup: `
<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:24px;">
  ${commercial
    .map(
      (p) => `
  <a href="/properties/${p.id}" style="text-decoration:none;color:inherit;display:block;background:#0f0f0f;border:1px solid rgba(255,255,255,0.08);border-radius:4px;overflow:hidden;">
    <div style="aspect-ratio:4/3;background:linear-gradient(135deg,#1a0508,#0a0a0a 50%,#1a0a14);display:flex;align-items:center;justify-content:center;">
      <div style="font-family:'Cormorant Garamond',serif;font-size:64px;font-weight:300;color:rgba(255,255,255,0.04);letter-spacing:8px;">VG</div>
    </div>
    <div style="padding:24px;">
      <div style="font-family:'Cormorant Garamond',serif;font-size:24px;color:#d2203a;font-weight:300;">$${(p.price / 1_000_000).toFixed(2)}M</div>
      <div style="font-family:'Cormorant Garamond',serif;font-size:20px;color:#fff;margin-top:6px;">${p.title}</div>
      <div style="font-size:13px;color:#a6a6a6;margin-top:10px;">${p.city}, ${p.county}</div>
    </div>
  </a>`,
    )
    .join("")}
</div>`,
        }),
      ],
    }),
    ctaBand({ eyebrowText: "Discuss a Mandate", title: "A confidential conversation", italicWord: "conversation" }),
  ];
};
