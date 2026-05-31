const { html } = require("../lib/widgets");
const { pageHero, basicSection } = require("./common");

module.exports = function buildAgents({ agents }) {
  return [
    pageHero({
      eyebrowText: "Our Advisors",
      title: "Senior, named advisors",
      italicWord: "named",
      subtitle: "You work with principals, not associates. Every Varick Global advisor brings decades of South Florida expertise.",
    }),
    basicSection({
      children: [
        html({
          markup: `
<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:24px;">
  ${agents
    .map(
      (a) => `
  <a href="/advisors/${a.slug}" style="text-decoration:none;color:inherit;display:block;background:#0f0f0f;border:1px solid rgba(255,255,255,0.08);border-radius:4px;overflow:hidden;">
    <div style="aspect-ratio:4/5;background:linear-gradient(135deg,#14060a,#0a0a0a 50%,#1a0a14);display:flex;align-items:center;justify-content:center;">
      <div style="font-family:'Cormorant Garamond',serif;font-size:64px;font-weight:300;color:rgba(255,255,255,0.06);letter-spacing:6px;">${a.name.split(" ").map((w) => w[0]).join("")}</div>
    </div>
    <div style="padding:24px;">
      <h3 style="font-family:'Cormorant Garamond',serif;font-size:22px;color:#fff;font-weight:400;margin:0;">${a.name}</h3>
      <div style="font-family:Montserrat;font-weight:700;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#a6a6a6;margin-top:6px;">${a.title}</div>
      <div style="margin-top:16px;display:flex;gap:6px;flex-wrap:wrap;">
        ${a.specialties
          .slice(0, 2)
          .map(
            (s) => `<span style="font-family:Montserrat;font-weight:700;font-size:10px;letter-spacing:1.5px;text-transform:uppercase;color:#a6a6a6;border:1px solid rgba(255,255,255,0.1);padding:4px 8px;border-radius:2px;">${s}</span>`,
          )
          .join("")}
      </div>
    </div>
  </a>`,
    )
    .join("")}
</div>`,
        }),
      ],
    }),
  ];
};
