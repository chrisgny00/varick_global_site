const { html, ctaBand } = require("../lib/widgets");
const { pageHero, basicSection } = require("./common");

module.exports = function buildValuation() {
  return [
    pageHero({
      eyebrowText: "AI Valuation",
      title: "What is your home worth?",
      italicWord: "worth",
      subtitle: "An instant valuation drawn from current South Florida comps, followed by a verified CMA from a senior advisor.",
    }),
    basicSection({
      children: [
        html({
          markup: `
<div style="display:grid;grid-template-columns:5fr 7fr;gap:40px;align-items:start;">
  <form class="vg-card" style="padding:32px;display:flex;flex-direction:column;gap:16px;" action="mailto:info@varickglobal.com?subject=Valuation Request" method="post">
    <div class="eyebrow" style="margin-bottom:8px;">AI Valuation</div>
    <h3 style="font-family:'Cormorant Garamond',serif;font-size:24px;color:#fff;font-weight:400;margin:0 0 16px;">Your property details</h3>
    <label style="font-family:Montserrat;font-weight:700;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#a6a6a6;">Address
      <input required name="address" style="display:block;width:100%;margin-top:8px;background:rgba(0,0,0,0.4);border:1px solid rgba(255,255,255,0.1);padding:12px;color:#fff;border-radius:2px;" />
    </label>
    <label style="font-family:Montserrat;font-weight:700;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#a6a6a6;">City
      <input name="city" placeholder="Miami Beach" style="display:block;width:100%;margin-top:8px;background:rgba(0,0,0,0.4);border:1px solid rgba(255,255,255,0.1);padding:12px;color:#fff;border-radius:2px;" />
    </label>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;">
      <label style="font-family:Montserrat;font-weight:700;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#a6a6a6;">Beds
        <input type="number" name="beds" style="display:block;width:100%;margin-top:8px;background:rgba(0,0,0,0.4);border:1px solid rgba(255,255,255,0.1);padding:12px;color:#fff;border-radius:2px;" />
      </label>
      <label style="font-family:Montserrat;font-weight:700;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#a6a6a6;">Baths
        <input type="number" name="baths" style="display:block;width:100%;margin-top:8px;background:rgba(0,0,0,0.4);border:1px solid rgba(255,255,255,0.1);padding:12px;color:#fff;border-radius:2px;" />
      </label>
      <label style="font-family:Montserrat;font-weight:700;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#a6a6a6;">Sqft
        <input type="number" name="sqft" style="display:block;width:100%;margin-top:8px;background:rgba(0,0,0,0.4);border:1px solid rgba(255,255,255,0.1);padding:12px;color:#fff;border-radius:2px;" />
      </label>
    </div>
    <button type="submit" class="vg-button-primary" style="border:none;cursor:pointer;margin-top:16px;">Request Valuation</button>
  </form>
  <div class="vg-card accent-top" style="padding:32px;border-top:2px solid #a6192e;">
    <div class="eyebrow" style="margin-bottom:8px;">What you'll receive</div>
    <p style="color:#a6a6a6;line-height:1.7;">A senior advisor will follow up within one business day with a signed CMA — backed by recent comparable transactions across your submarket.</p>
    <p style="color:#a6a6a6;line-height:1.7;margin-top:16px;font-size:12px;font-style:italic;">AI auto-valuation is available in the headless Next.js version. To enable on WordPress, integrate an AI valuation widget or connect to the /api/valuation endpoint via fetch from a custom HTML widget.</p>
  </div>
</div>`,
        }),
      ],
    }),
    ctaBand({ eyebrowText: "Verified CMA", title: "Request a signed report", italicWord: "signed" }),
  ];
};
