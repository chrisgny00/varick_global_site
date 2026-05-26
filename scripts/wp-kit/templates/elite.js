const { section, column, html, spacer } = require("../lib/widgets");

module.exports = function buildElite() {
  return [
    // Hero
    section(
      {
        padding: { unit: "px", top: 160, right: 24, bottom: 140, left: 24, isLinked: false },
        background_background: "gradient",
        background_color: "#050510",
        background_color_b: "#0d0308",
        background_gradient_angle: { unit: "deg", size: 135 },
      },
      [
        column({}, [
          html({
            markup: `
<div style="max-width:920px;position:relative;">
  <div style="display:flex;gap:12px;margin-bottom:24px;flex-wrap:wrap;">
    <span class="vg-badge elite">VG Elite — Sports & Entertainment Division</span>
    <span class="vg-badge gold">White Glove Service</span>
  </div>
  <h1 style="font-family:'Cormorant Garamond',serif;font-weight:300;font-size:72px;color:#fff;line-height:1.08;margin:0;">
    Exclusive Access. <em style="color:#a78bff;font-style:italic;">Extraordinary Living.</em>
  </h1>
  <p style="margin-top:28px;color:#a6a6a6;font-size:18px;line-height:1.7;max-width:680px;">
    An invitation-only luxury real estate division for professional athletes, entertainers and high-net-worth executives. Discreet. NDA-protected. Globally connected.
  </p>
  <div style="margin-top:40px;display:flex;gap:16px;flex-wrap:wrap;">
    <a href="#inquiry" class="vg-button-elite">Request Invitation</a>
    <a href="#access" class="vg-button-outline">Learn More</a>
  </div>
</div>`,
          }),
        ]),
      ],
    ),

    // Service Pillars
    section(
      {
        padding: { unit: "px", top: 100, right: 24, bottom: 100, left: 24, isLinked: false },
        background_color: "#050510",
      },
      [
        column({}, [
          html({
            markup: `
<div style="max-width:640px;margin-bottom:48px;">
  <div class="eyebrow" style="color:#a78bff !important;margin-bottom:20px;">Service Pillars</div>
  <h2 style="font-family:'Cormorant Garamond',serif;font-weight:300;font-size:48px;color:#fff;line-height:1.15;margin:0;">
    Three divisions. <em style="color:#a78bff;font-style:italic;">One standard.</em>
  </h2>
</div>
<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:24px;">
  ${[
    { eyebrow: "Athlete Services", title: "Private Acquisition", desc: "Off-market sourcing, relocation logistics and full discretion for active rosters. Pre-vetted properties surfaced before they hit the market." },
    { eyebrow: "Entertainment Services", title: "Celebrity Estates", desc: "Private acquisition and disposition of estate residences with full identity protection. NDA-bound transactions from end to end." },
    { eyebrow: "Investment Division", title: "Portfolio Building", desc: "Long-term wealth strategy through real estate — acquisition, hold, repositioning and disposition advisory for the Elite portfolio." },
  ]
    .map(
      (p) => `
  <div style="background:#0f0520;border:1px solid rgba(139,96,255,0.25);border-radius:4px;padding:32px;">
    <div style="width:48px;height:48px;border-radius:50%;background:rgba(139,96,255,0.15);border:1px solid rgba(139,96,255,0.4);display:flex;align-items:center;justify-content:center;color:#a78bff;margin-bottom:24px;">★</div>
    <div style="font-family:Montserrat;font-weight:700;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#a78bff;margin-bottom:8px;">${p.eyebrow}</div>
    <h3 style="font-family:'Cormorant Garamond',serif;font-size:24px;color:#fff;font-weight:400;margin:0;">${p.title}</h3>
    <p style="margin-top:16px;color:#a6a6a6;line-height:1.7;">${p.desc}</p>
  </div>`,
    )
    .join("")}
</div>`,
          }),
        ]),
      ],
    ),

    // Lockup band
    section(
      { padding: { unit: "px", top: 60, right: 24, bottom: 60, left: 24, isLinked: false }, background_color: "#050510" },
      [
        column({}, [
          html({
            markup: `
<div style="border:1px solid rgba(139,96,255,0.3);border-radius:4px;padding:56px;text-align:center;background:linear-gradient(135deg,rgba(139,96,255,0.05),rgba(184,149,42,0.04));">
  <div style="font-family:Montserrat;font-weight:700;font-size:10px;letter-spacing:6px;text-transform:uppercase;color:#a78bff;margin-bottom:16px;">Brand Lockup</div>
  <div style="font-family:'Cormorant Garamond',serif;font-weight:300;font-size:96px;color:#fff;letter-spacing:8px;">
    VG <em style="color:#a78bff;font-style:italic;">ELITE</em>
  </div>
  <div style="margin-top:32px;display:flex;justify-content:center;gap:16px;flex-wrap:wrap;">
    ${["#8b60ff Violet", "#a78bff Violet Light", "#b8952a Gold", "#050510 Navy"]
      .map((s) => {
        const [color, name] = s.split(" ");
        return `
    <div style="display:flex;flex-direction:column;align-items:center;gap:8px;">
      <div style="width:32px;height:32px;border-radius:50%;background:${color};border:1px solid rgba(255,255,255,0.1);"></div>
      <span style="font-family:Montserrat;font-weight:700;font-size:10px;letter-spacing:1.5px;text-transform:uppercase;color:#a6a6a6;">${name}</span>
    </div>`;
      })
      .join("")}
  </div>
</div>`,
          }),
        ]),
      ],
    ),

    // Access tiers
    section(
      { padding: { unit: "px", top: 100, right: 24, bottom: 100, left: 24, isLinked: false }, background_color: "#050510" },
      [
        column({}, [
          html({
            markup: `
<a id="access"></a>
<div style="max-width:640px;margin-bottom:48px;">
  <div class="eyebrow" style="color:#a78bff !important;margin-bottom:20px;">Access Tiers</div>
  <h2 style="font-family:'Cormorant Garamond',serif;font-weight:300;font-size:48px;color:#fff;line-height:1.15;margin:0;">
    What Elite <em style="color:#a78bff;font-style:italic;">access</em> looks like
  </h2>
</div>
<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:24px;">
  ${[
    { title: "Concierge Access", desc: "A dedicated advisor available 24/7. Coordination of private aviation, yacht, and ground transport." },
    { title: "Network Access", desc: "Direct relationships with developers, ultra-prime listing agents and a private buyer network for off-market opportunities." },
    { title: "Privacy Guarantee", desc: "Every Elite engagement is NDA-protected. Closings can be structured via LLC, trust, or other privacy vehicles." },
  ]
    .map(
      (t) => `
  <div style="background:#0f0520;border:1px solid rgba(139,96,255,0.25);border-radius:4px;padding:32px;">
    <div style="color:#b8952a;font-size:24px;margin-bottom:20px;">◆</div>
    <h3 style="font-family:'Cormorant Garamond',serif;font-size:24px;color:#fff;font-weight:400;margin:0;">${t.title}</h3>
    <p style="margin-top:12px;color:#a6a6a6;line-height:1.7;">${t.desc}</p>
  </div>`,
    )
    .join("")}
</div>`,
          }),
        ]),
      ],
    ),

    // Inquiry form
    section(
      {
        padding: { unit: "px", top: 120, right: 24, bottom: 120, left: 24, isLinked: false },
        background_background: "gradient",
        background_color: "#050510",
        background_color_b: "#0d0308",
        background_gradient_angle: { unit: "deg", size: 135 },
      },
      [
        column({}, [
          html({
            markup: `
<a id="inquiry"></a>
<div style="max-width:640px;margin:0 auto;text-align:center;">
  <span class="vg-badge elite">Private Inquiry</span>
  <h2 style="font-family:'Cormorant Garamond',serif;font-weight:300;font-size:48px;color:#fff;margin-top:20px;line-height:1.15;">
    By <em style="color:#a78bff;font-style:italic;">invitation</em> only
  </h2>
  <p style="margin-top:20px;color:#a6a6a6;line-height:1.7;">
    The VG Elite division operates by referral and invitation. Complete a brief private inquiry and an Elite advisor will reach out under NDA within 48 hours.
  </p>
</div>
<form style="margin-top:48px;max-width:560px;margin-left:auto;margin-right:auto;display:flex;flex-direction:column;gap:16px;" action="mailto:info@varickglobal.com?subject=VG Elite Inquiry" method="post">
  <input required placeholder="Full name" name="name" style="background:rgba(0,0,0,0.4);border:1px solid rgba(139,96,255,0.3);padding:16px;color:#fff;border-radius:2px;font-size:14px;" />
  <input required type="email" placeholder="Email" name="email" style="background:rgba(0,0,0,0.4);border:1px solid rgba(139,96,255,0.3);padding:16px;color:#fff;border-radius:2px;font-size:14px;" />
  <input placeholder="Referred by (optional)" name="referral" style="background:rgba(0,0,0,0.4);border:1px solid rgba(139,96,255,0.3);padding:16px;color:#fff;border-radius:2px;font-size:14px;" />
  <textarea required name="brief" placeholder="A brief, confidential description of how we can help" style="background:rgba(0,0,0,0.4);border:1px solid rgba(139,96,255,0.3);padding:16px;color:#fff;min-height:140px;border-radius:2px;font-size:14px;"></textarea>
  <button type="submit" class="vg-button-elite" style="border:none;cursor:pointer;">Submit Private Inquiry</button>
  <p style="font-size:11px;color:#a6a6a6;text-align:center;margin:0;">All inquiries are held in confidence. NDA available on request.</p>
</form>`,
          }),
        ]),
      ],
    ),
  ];
};
