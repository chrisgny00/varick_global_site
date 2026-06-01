const { html, ctaBand, spacer } = require("../lib/widgets");
const { pageHero, basicSection } = require("./common");

module.exports = function buildNeighborhoodSingle(n, { related = [] } = {}) {
  return [
    pageHero({
      eyebrowText: `${n.county} County`,
      title: `Luxury Real Estate in ${n.name}`,
      italicWord: n.name,
      subtitle: n.intro,
    }),
    basicSection({
      padTop: 48,
      padBottom: 48,
      children: [
        html({
          markup: `
<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:24px;">
  ${[
    { v: n.stats.medianPrice, l: "Median Price" },
    { v: n.stats.daysOnMarket.toString(), l: "Days on Market" },
    { v: n.stats.pricePerSqft, l: "Price / Sqft" },
    { v: n.stats.activeListings.toString(), l: "Active Listings" },
  ]
    .map(
      (s) => `
  <div class="vg-card" style="padding:24px;">
    <div style="font-family:'Cormorant Garamond',serif;font-size:32px;font-weight:300;color:#fff;line-height:1;">${s.v}</div>
    <div style="margin-top:10px;font-family:Montserrat;font-weight:700;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#d2203a;">${s.l}</div>
  </div>`,
    )
    .join("")}
</div>`,
        }),
      ],
    }),
    basicSection({
      children: [
        html({
          markup: `
<h2 style="font-family:'Cormorant Garamond',serif;font-weight:300;font-size:40px;color:#fff;margin:0 0 32px;">${n.name} Listings</h2>
<p style="color:#a6a6a6;">Off-market opportunities are available on request. Replace this section with your IDX plugin filtered to ${n.name}.</p>`,
        }),
      ],
    }),
    related.length
      ? basicSection({
          bg: "#0a0a0a",
          children: [
            html({
              markup: `
<h2 style="font-family:'Cormorant Garamond',serif;font-weight:300;font-size:40px;color:#fff;margin:0 0 32px;">Nearby in ${n.county}</h2>
<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px;">
  ${related
    .map(
      (r) => `
  <a href="/neighborhoods/${r.slug}" class="vg-card" style="display:block;padding:20px;text-decoration:none;color:inherit;">
    <h3 style="font-family:'Cormorant Garamond',serif;font-size:22px;color:#fff;font-weight:400;margin:0;">${r.name}</h3>
    <div style="font-size:12px;color:#a6a6a6;margin-top:6px;">${r.stats.medianPrice} median</div>
  </a>`,
    )
    .join("")}
</div>`,
            }),
          ],
        })
      : null,
    ctaBand({ eyebrowText: `${n.name} Advisor`, title: "Local expertise", italicWord: "expertise", subtitle: `Speak with a Varick Global advisor specializing in ${n.name}.` }),
  ].filter(Boolean);
};
