const { html } = require("../lib/widgets");
const { pageHero, basicSection } = require("./common");

module.exports = function buildContact() {
  return [
    pageHero({
      eyebrowText: "Contact",
      title: "Start the conversation",
      italicWord: "conversation",
      subtitle: "Tell us about your brief. A senior advisor will reach out within one business day.",
    }),
    basicSection({
      children: [
        html({
          markup: `
<div style="display:grid;grid-template-columns:7fr 5fr;gap:40px;">
  <form class="vg-card" style="padding:32px;display:flex;flex-direction:column;gap:16px;" action="mailto:info@varickglobal.com" method="post" enctype="text/plain">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
      <label style="font-family:Montserrat;font-weight:700;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#a6a6a6;">First Name
        <input required name="firstName" style="display:block;width:100%;margin-top:8px;background:rgba(0,0,0,0.4);border:1px solid rgba(255,255,255,0.1);padding:12px;color:#fff;border-radius:2px;" />
      </label>
      <label style="font-family:Montserrat;font-weight:700;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#a6a6a6;">Last Name
        <input required name="lastName" style="display:block;width:100%;margin-top:8px;background:rgba(0,0,0,0.4);border:1px solid rgba(255,255,255,0.1);padding:12px;color:#fff;border-radius:2px;" />
      </label>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
      <label style="font-family:Montserrat;font-weight:700;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#a6a6a6;">Email
        <input required type="email" name="email" style="display:block;width:100%;margin-top:8px;background:rgba(0,0,0,0.4);border:1px solid rgba(255,255,255,0.1);padding:12px;color:#fff;border-radius:2px;" />
      </label>
      <label style="font-family:Montserrat;font-weight:700;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#a6a6a6;">Phone
        <input name="phone" style="display:block;width:100%;margin-top:8px;background:rgba(0,0,0,0.4);border:1px solid rgba(255,255,255,0.1);padding:12px;color:#fff;border-radius:2px;" />
      </label>
    </div>
    <label style="font-family:Montserrat;font-weight:700;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#a6a6a6;">I am interested in
      <select name="interest" style="display:block;width:100%;margin-top:8px;background:rgba(0,0,0,0.4);border:1px solid rgba(255,255,255,0.1);padding:12px;color:#fff;border-radius:2px;">
        <option>Buying</option>
        <option>Selling</option>
        <option>Leasing</option>
        <option>Commercial</option>
        <option>HOA Advisory</option>
        <option>VG Elite</option>
        <option>Investment Sales</option>
        <option>Valuation</option>
      </select>
    </label>
    <label style="font-family:Montserrat;font-weight:700;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#a6a6a6;">How can we help?
      <textarea name="message" style="display:block;width:100%;margin-top:8px;background:rgba(0,0,0,0.4);border:1px solid rgba(255,255,255,0.1);padding:12px;color:#fff;min-height:120px;border-radius:2px;"></textarea>
    </label>
    <button type="submit" class="vg-button-primary" style="border:none;cursor:pointer;width:fit-content;">Send Message</button>
  </form>
  <div style="display:flex;flex-direction:column;gap:16px;">
    <div class="vg-card" style="padding:32px;">
      <div class="eyebrow" style="margin-bottom:20px;">Headquarters</div>
      <ul style="padding:0;margin:0;list-style:none;font-size:14px;color:#fff;">
        <li style="margin-bottom:16px;">19505 Biscayne Blvd, Suite 2350<br />Aventura, FL 33180</li>
        <li style="margin-bottom:16px;"><a href="tel:+17863527547" style="color:#fff;text-decoration:none;">786.352.7547</a></li>
        <li style="margin-bottom:16px;"><a href="mailto:info@varickglobal.com" style="color:#fff;text-decoration:none;">info@varickglobal.com</a></li>
        <li>Monday – Friday · 9:00 to 18:00<br /><span style="color:#a6a6a6;">Weekends by appointment</span></li>
      </ul>
    </div>
    <div class="vg-card" style="padding:32px;">
      <div class="eyebrow" style="margin-bottom:16px;">Service Area</div>
      <p style="color:#a6a6a6;font-size:14px;line-height:1.7;margin:0;">We serve clients across Miami-Dade, Broward and Palm Beach counties — and globally for the VG Elite division.</p>
    </div>
  </div>
</div>`,
        }),
      ],
    }),
  ];
};
