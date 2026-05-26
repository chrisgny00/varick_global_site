const { heading, textEditor, html, spacer, eyebrow, ctaBand } = require("../lib/widgets");
const { pageHero, basicSection } = require("./common");

module.exports = function buildAbout() {
  const values = [
    { title: "Discretion", desc: "We hold every brief in confidence. Where appropriate, we work under NDA from first contact through closing." },
    { title: "Precision", desc: "Underwriting, comps, and market intelligence inform every recommendation — and every word we put on paper." },
    { title: "Senior Engagement", desc: "You speak with a principal. We do not delegate the work to a junior who's never met you." },
    { title: "Long Horizon", desc: "We optimize for the relationship, not the transaction. Most of our work comes from prior clients." },
  ];

  return [
    pageHero({
      eyebrowText: "About Varick Global",
      title: "A discreet, senior advisory",
      italicWord: "advisory",
      subtitle: "Headquartered in Aventura, Varick Global serves a private clientele across South Florida — and a broader network of family offices, executives and entertainers worldwide.",
    }),
    basicSection({
      padTop: 80,
      padBottom: 80,
      children: [
        html({
          markup: `
<div style="display:grid;grid-template-columns:7fr 5fr;gap:48px;align-items:start;">
  <div>
    <h2 style="font-family:'Cormorant Garamond',serif;font-weight:300;font-size:40px;color:#fff;margin:0;">Our mission</h2>
    <p style="margin-top:20px;color:#a6a6a6;line-height:1.7;">
      Varick Global was founded on a simple premise: luxury real estate should be advised, not sold. Our work spans the full spectrum of South Florida real estate — from single-family acquisitions and trophy estates to commercial investment, HOA restructuring and the discreet relocation needs of professional athletes and entertainers.
    </p>
    <p style="margin-top:16px;color:#a6a6a6;line-height:1.7;">
      We measure success not by transaction volume but by the longevity of the relationships we keep. Our clients return — and they refer.
    </p>
  </div>
  <div class="vg-card" style="padding:32px;">
    <div class="eyebrow" style="margin-bottom:16px;">Brand Promise</div>
    <div style="font-family:'Cormorant Garamond',serif;font-size:32px;font-weight:300;color:#fff;line-height:1.2;">
      Where <em style="color:#d2203a;font-style:italic;">Luxury</em> Meets Precision.
    </div>
  </div>
</div>`,
        }),
      ],
    }),
    basicSection({
      bg: "#0f0f0f",
      children: [
        html({
          markup: `
<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:24px;">
  ${[
    { v: "247", l: "Active Listings" },
    { v: "42", l: "Avg Days on Market" },
    { v: "$2.4M", l: "Median Sale Price" },
    { v: "31", l: "Neighborhoods Served" },
  ]
    .map(
      (s) => `
  <div>
    <div style="font-family:'Cormorant Garamond',serif;font-size:64px;font-weight:300;color:#fff;line-height:1;">${s.v}</div>
    <div style="margin-top:12px;font-family:Montserrat;font-weight:700;font-size:10px;letter-spacing:2.5px;text-transform:uppercase;color:#d2203a;">${s.l}</div>
  </div>`,
    )
    .join("")}
</div>`,
        }),
      ],
    }),
    basicSection({
      children: [
        eyebrow("What We Value"),
        spacer({ size: 16 }),
        heading({ title: 'Four <em style="color:#d2203a;font-style:italic;">operating</em> principles', tag: "h2", size: 48, fontFamily: "Cormorant Garamond", fontWeight: 300 }),
        spacer({ size: 40 }),
        html({
          markup: `
<div style="display:grid;grid-template-columns:repeat(2,1fr);gap:24px;">
  ${values
    .map(
      (v) => `
  <div class="vg-card" style="padding:32px;">
    <h3 style="font-family:'Cormorant Garamond',serif;font-size:24px;color:#fff;font-weight:400;margin:0;">${v.title}</h3>
    <p style="margin-top:12px;color:#a6a6a6;line-height:1.7;">${v.desc}</p>
  </div>`,
    )
    .join("")}
</div>`,
        }),
      ],
    }),
    ctaBand({ eyebrowText: "Meet the Team", title: "Speak with an advisor", italicWord: "advisor" }),
  ];
};
