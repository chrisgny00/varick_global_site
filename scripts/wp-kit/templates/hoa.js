const { html, ctaBand, heading, spacer, eyebrow } = require("../lib/widgets");
const { pageHero, basicSection } = require("./common");

module.exports = function buildHOA() {
  const offerings = [
    { slug: "hoa-advisory", title: "HOA Advisory", desc: "Strategic governance, financial restructuring, capital-project planning and board-level advisory for associations facing change." },
    { slug: "hoa-conversions", title: "HOA Conversions", desc: "Rental-to-condo and condo-to-rental conversion feasibility, regulatory navigation and execution." },
    { slug: "receivership", title: "Receivership", desc: "Court-appointed receivership for distressed associations — restoring financial health, governance and asset value." },
    { slug: "hoa-sale", title: "HOA Sale & Termination", desc: "Bulk-buyer transactions, termination votes and discreet disposition of association-owned assets." },
  ];
  const faqs = [
    { q: "What qualifies an HOA as distressed?", a: "Sustained operating deficits, deferred reserves, deferred maintenance, litigation exposure, or governance failure can each qualify an association as distressed." },
    { q: "Do you act as a receiver?", a: "Yes. Varick Global serves as a court-appointed receiver for Florida HOAs and condominium associations in distress." },
    { q: "Can you handle a condo termination?", a: "We advise on Section 718 terminations, bulk sales and unit-buyout strategies, supporting the legal team and the board through the vote and execution." },
  ];

  return [
    pageHero({
      eyebrowText: "HOA Division",
      title: "Distressed HOA Advisory",
      italicWord: "Advisory",
      subtitle: "Independent, senior advisory for Florida HOAs and condominium associations navigating distress, change, or major capital decisions.",
    }),
    basicSection({
      children: [
        eyebrow("Practice Areas"),
        spacer({ size: 16 }),
        heading({ title: 'Four <em style="color:#d2203a;font-style:italic;">integrated</em> services', tag: "h2", size: 48, fontFamily: "Cormorant Garamond", fontWeight: 300 }),
        spacer({ size: 40 }),
        html({
          markup: `
<div style="display:grid;grid-template-columns:repeat(2,1fr);gap:24px;">
  ${offerings
    .map(
      (o) => `
  <a href="/services/${o.slug}" class="vg-card" style="display:block;padding:32px;text-decoration:none;color:inherit;">
    <div style="width:48px;height:48px;border-radius:50%;background:rgba(166,25,46,0.1);border:1px solid rgba(166,25,46,0.3);display:flex;align-items:center;justify-content:center;margin-bottom:20px;color:#d2203a;">◆</div>
    <h3 style="font-family:'Cormorant Garamond',serif;font-size:24px;color:#fff;font-weight:400;margin:0;">${o.title}</h3>
    <p style="margin-top:12px;color:#a6a6a6;line-height:1.7;">${o.desc}</p>
  </a>`,
    )
    .join("")}
</div>`,
        }),
      ],
    }),
    basicSection({
      children: [
        eyebrow("FAQ"),
        spacer({ size: 16 }),
        heading({ title: "Frequently asked", tag: "h2", size: 40, fontFamily: "Cormorant Garamond", fontWeight: 300 }),
        spacer({ size: 32 }),
        html({
          markup: `
<div style="max-width:780px;">
  ${faqs
    .map(
      (f) => `
  <details class="vg-card" style="padding:24px;margin-bottom:16px;">
    <summary style="cursor:pointer;color:#fff;font-weight:500;list-style:none;display:flex;justify-content:space-between;align-items:center;">
      <span>${f.q}</span>
      <span style="color:#d2203a;font-size:20px;">+</span>
    </summary>
    <p style="margin-top:16px;color:#a6a6a6;line-height:1.7;">${f.a}</p>
  </details>`,
    )
    .join("")}
</div>`,
        }),
      ],
    }),
    ctaBand({ eyebrowText: "Board Members & Counsel", title: "A confidential briefing", italicWord: "briefing" }),
  ];
};
