const { html, ctaBand } = require("../lib/widgets");
const { basicSection } = require("./common");

module.exports = function buildAgentSingle(agent) {
  return [
    {
      id: require("../lib/widgets").id(),
      elType: "section",
      settings: {
        padding: { unit: "px", top: 140, right: 24, bottom: 80, left: 24, isLinked: false },
        background_background: "gradient",
        background_color: "#0a0a0a",
        background_color_b: "#14060a",
        background_gradient_angle: { unit: "deg", size: 135 },
      },
      elements: [
        {
          id: require("../lib/widgets").id(),
          elType: "column",
          settings: { _column_size: 100 },
          elements: [
            html({
              markup: `
<div style="display:grid;grid-template-columns:5fr 7fr;gap:48px;align-items:start;">
  <div style="aspect-ratio:4/5;background:#0f0f0f;border:1px solid rgba(255,255,255,0.08);border-radius:4px;display:flex;align-items:center;justify-content:center;">
    <div style="font-family:'Cormorant Garamond',serif;font-size:140px;font-weight:300;color:rgba(255,255,255,0.06);letter-spacing:12px;">${agent.name.split(" ").map((w) => w[0]).join("")}</div>
  </div>
  <div>
    <div class="eyebrow" style="margin-bottom:20px;">${agent.title}</div>
    <h1 style="font-family:'Cormorant Garamond',serif;font-weight:300;font-size:72px;color:#fff;line-height:1.08;margin:0;">${agent.name}</h1>
    <p style="margin-top:32px;color:#a6a6a6;line-height:1.7;">${agent.bio}</p>
    <div style="margin-top:40px;">
      <div class="eyebrow" style="margin-bottom:16px;">Specialties</div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;">
        ${agent.specialties
          .map(
            (s) => `<span class="vg-badge neutral">${s}</span>`,
          )
          .join("")}
      </div>
    </div>
    <div style="margin-top:40px;display:flex;gap:16px;flex-wrap:wrap;">
      <a href="mailto:${agent.email}" class="vg-button-primary">Email</a>
      <a href="tel:+17863527547" class="vg-button-outline">786.352.7547</a>
    </div>
  </div>
</div>`,
            }),
          ],
        },
      ],
    },
    ctaBand({ eyebrowText: `Work with ${agent.name.split(" ")[0]}`, title: "Schedule a private call", italicWord: "private" }),
  ];
};
