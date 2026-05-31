const { html, ctaBand } = require("../lib/widgets");
const { pageHero, basicSection } = require("./common");

module.exports = function buildServices({ services }) {
  return [
    pageHero({
      eyebrowText: "Our Practice",
      title: "A full-spectrum advisory",
      italicWord: "advisory",
      subtitle: "Eight integrated practice areas, one disciplined approach. Built for clients who expect precision.",
    }),
    basicSection({
      children: [
        html({
          markup: `
<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:20px;">
  ${services
    .map(
      (s) => `
  <a href="/${s.slug}" style="text-decoration:none;color:inherit;display:block;background:#0f0f0f;border:1px solid rgba(255,255,255,0.08);border-radius:4px;padding:28px;">
    <div style="width:44px;height:44px;border-radius:50%;background:rgba(166,25,46,0.1);border:1px solid rgba(166,25,46,0.3);display:flex;align-items:center;justify-content:center;margin-bottom:20px;color:#d2203a;font-size:18px;">◆</div>
    <h3 style="font-family:'Cormorant Garamond',serif;font-size:22px;color:#fff;font-weight:400;margin:0;">${s.title}</h3>
    <p style="margin-top:12px;color:#a6a6a6;font-size:13px;line-height:1.6;">${s.short}</p>
    <div style="margin-top:20px;font-family:Montserrat;font-weight:700;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#d2203a;">Learn More →</div>
  </a>`,
    )
    .join("")}
</div>`,
        }),
      ],
    }),
    ctaBand({ eyebrowText: "Engage Us", title: "Tell us your brief", italicWord: "brief" }),
  ];
};
