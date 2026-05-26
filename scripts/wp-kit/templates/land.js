const { html, ctaBand, heading, spacer, eyebrow } = require("../lib/widgets");
const { pageHero, basicSection } = require("./common");

module.exports = function buildLand({ properties }) {
  const land = properties.filter((p) => p.propertyType === "Land");
  return [
    pageHero({
      eyebrowText: "Land Practice",
      title: "Land for Sale South Florida",
      italicWord: "South Florida",
      subtitle: "Development sites, agricultural acreage, infill parcels and assemblage opportunities — represented by Varick Global.",
    }),
    basicSection({
      children: [
        eyebrow("Active Inventory"),
        spacer({ size: 16 }),
        heading({ title: "Available parcels", tag: "h2", size: 40, fontFamily: "Cormorant Garamond", fontWeight: 300 }),
        spacer({ size: 32 }),
        html({
          markup: land.length === 0
            ? `<p style="color:#a6a6a6;">Off-market land opportunities are available on request — please contact our team.</p>`
            : `
<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:24px;">
  ${land
    .map(
      (p) => `
  <a href="/properties/${p.id}" style="text-decoration:none;color:inherit;display:block;background:#0f0f0f;border:1px solid rgba(255,255,255,0.08);border-radius:4px;padding:24px;">
    <div style="font-family:'Cormorant Garamond',serif;font-size:24px;color:#d2203a;font-weight:300;">$${(p.price / 1_000_000).toFixed(2)}M</div>
    <h3 style="font-family:'Cormorant Garamond',serif;font-size:22px;color:#fff;font-weight:400;margin-top:8px;">${p.title}</h3>
    <p style="margin-top:12px;color:#a6a6a6;font-size:13px;">${p.city}, ${p.county}</p>
  </a>`,
    )
    .join("")}
</div>`,
        }),
      ],
    }),
    ctaBand({ eyebrowText: "Acquisition or Disposition", title: "Discuss your site", italicWord: "site" }),
  ];
};
