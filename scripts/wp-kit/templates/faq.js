const { html, ctaBand } = require("../lib/widgets");
const { pageHero, basicSection } = require("./common");

const faqs = [
  { q: "What areas do you cover?", a: "Varick Global represents clients across Miami-Dade, Broward and Palm Beach counties — and globally through the VG Elite division." },
  { q: "Do you work with off-market properties?", a: "Yes. A significant portion of our luxury inventory is off-market and is shared only with vetted, NDA-bound clients." },
  { q: "How does VG Elite differ from the main practice?", a: "VG Elite is invitation-only and serves professional athletes, entertainers and high-net-worth executives with NDA-protected, identity-protected service." },
  { q: "Do you handle commercial transactions?", a: "Yes — office, industrial, retail, multifamily and land. We represent owners, tenants, and capital from family offices to institutional investors." },
  { q: "Can Varick Global serve as a court-appointed receiver?", a: "Yes. Our HOA Division serves as a receiver for distressed Florida HOAs and condominium associations." },
  { q: "What is your fee structure?", a: "Commission-based for transactions; advisory engagements are scoped on a fee or retainer basis depending on the work. We are transparent about both from day one." },
  { q: "How quickly will an advisor follow up?", a: "Within one business day. Urgent matters can be routed by phone to 786.352.7547." },
];

module.exports = function buildFAQ() {
  return [
    pageHero({
      eyebrowText: "FAQ",
      title: "Frequently asked",
      italicWord: "asked",
      subtitle: "Answers to common questions. Don't see what you need? An advisor is one call away.",
    }),
    basicSection({
      children: [
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
    ctaBand({}),
  ];
};
