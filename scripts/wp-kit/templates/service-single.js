const { html, ctaBand } = require("../lib/widgets");
const { pageHero, basicSection } = require("./common");

module.exports = function buildServiceSingle(service, { related = [] } = {}) {
  return [
    pageHero({
      eyebrowText: service.category ? service.category.toUpperCase() : "Our Services",
      title: service.title,
      subtitle: service.short,
    }),
    basicSection({
      children: [
        html({
          markup: `
<div style="display:grid;grid-template-columns:8fr 4fr;gap:48px;align-items:start;">
  <div>
    <div style="width:56px;height:56px;border-radius:50%;background:rgba(166,25,46,0.1);border:1px solid rgba(166,25,46,0.3);display:flex;align-items:center;justify-content:center;color:#d2203a;font-size:22px;margin-bottom:32px;">◆</div>
    <h2 style="font-family:'Cormorant Garamond',serif;font-weight:300;font-size:40px;color:#fff;margin:0;">Our Approach</h2>
    <p style="margin-top:20px;color:#a6a6a6;line-height:1.7;">${service.description}</p>
    <h3 style="font-family:'Cormorant Garamond',serif;font-weight:400;font-size:24px;color:#fff;margin-top:48px;">What you can expect</h3>
    <ul style="margin-top:20px;padding:0;list-style:none;color:#a6a6a6;">
      ${[
        "A senior advisor as your single point of contact from day one.",
        "Discreet engagement — your brief is held in confidence.",
        "Market intelligence drawn from our proprietary South Florida database.",
        "A disciplined, written work plan and clear milestones.",
        "A defined deliverable: a transaction, an advisory memo, or both.",
      ]
        .map((t) => `<li style="padding:8px 0;display:flex;gap:12px;line-height:1.7;"><span style="color:#d2203a;flex-shrink:0;">✓</span><span>${t}</span></li>`)
        .join("")}
    </ul>
    <div style="margin-top:40px;">
      <a href="/contact?service=${service.slug}" class="vg-button-primary">Engage Varick Global</a>
    </div>
  </div>
  <aside class="vg-card" style="padding:28px;">
    <div class="eyebrow" style="margin-bottom:16px;">Related Services</div>
    <ul style="padding:0;margin:0;list-style:none;">
      ${(related.length ? related : [{ title: "Engage an advisor", slug: "", short: "Call 786.352.7547" }])
        .map(
          (r) => `
      <li style="margin-bottom:16px;">
        <a href="${r.slug ? `/services/${r.slug}` : "/contact"}" style="color:#fff;text-decoration:none;">${r.title}</a>
        ${r.short ? `<p style="margin:6px 0 0;color:#a6a6a6;font-size:12px;">${r.short}</p>` : ""}
      </li>`,
        )
        .join("")}
    </ul>
  </aside>
</div>`,
        }),
      ],
    }),
    ctaBand({}),
  ];
};
