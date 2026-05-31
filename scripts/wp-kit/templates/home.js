const { section, column, heading, textEditor, html, spacer, eyebrow, ctaBand, iconBox } = require("../lib/widgets");

module.exports = function buildHome({ services, properties, neighborhoods }) {
  const featured = properties.filter((p) => p.transactionType === "buy" && p.price >= 4_000_000).slice(0, 6);

  return [
    // 1. Hero
    section(
      {
        background_background: "gradient",
        background_color: "#0a0a0a",
        background_color_b: "#1a0508",
        background_gradient_angle: { unit: "deg", size: 135 },
        padding: { unit: "px", top: 140, right: 24, bottom: 120, left: 24, isLinked: false },
        min_height: { unit: "vh", size: 90 },
        custom_height: { unit: "vh", size: 90 },
        content_position: "middle",
      },
      [
        column({}, [
          eyebrow("South Florida's Premier Luxury Real Estate"),
          spacer({ size: 24 }),
          heading({
            title: 'Where <em style="color:#d2203a;font-style:italic;">Luxury</em> Meets Precision.',
            tag: "h1",
            size: 72,
            fontFamily: "Cormorant Garamond",
            fontWeight: 300,
            color: "#ffffff",
          }),
          spacer({ size: 24 }),
          textEditor({
            text: "A discreet advisory for the South Florida luxury market — residential, commercial, HOA, and an invitation-only Sports & Entertainment division.",
            size: 18,
          }),
          spacer({ size: 32 }),
          html({
            markup: `
<div style="display:flex;gap:16px;flex-wrap:wrap;">
  <a href="/properties" class="vg-button-primary">Explore Listings</a>
  <a href="/contact" class="vg-button-outline">Schedule a Consultation</a>
</div>`,
          }),
        ]),
      ],
    ),

    // 2. Search Bar Placeholder
    section(
      {
        padding: { unit: "px", top: 0, right: 24, bottom: 60, left: 24, isLinked: false },
        background_background: "classic",
        background_color: "#0a0a0a",
      },
      [
        column({}, [
          html({
            markup: `
<div class="vg-card" style="background:#0f0f0f;padding:32px;margin-top:-60px;position:relative;z-index:5;">
  <div style="display:flex;gap:16px;border-bottom:1px solid rgba(255,255,255,0.08);padding-bottom:16px;margin-bottom:24px;">
    <span style="font-family:Montserrat;font-weight:700;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#fff;border-bottom:2px solid #d2203a;padding-bottom:8px;">Buy</span>
    <span style="font-family:Montserrat;font-weight:700;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#a6a6a6;">Rent</span>
    <span style="font-family:Montserrat;font-weight:700;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#a6a6a6;">Commercial</span>
  </div>
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px;">
    <input placeholder="Location" style="background:#000;border:1px solid rgba(255,255,255,0.1);padding:14px;color:#fff;border-radius:2px;" />
    <input placeholder="Price Range" style="background:#000;border:1px solid rgba(255,255,255,0.1);padding:14px;color:#fff;border-radius:2px;" />
    <input placeholder="Beds" style="background:#000;border:1px solid rgba(255,255,255,0.1);padding:14px;color:#fff;border-radius:2px;" />
    <a href="/properties" class="vg-button-primary" style="text-align:center;">Search</a>
  </div>
  <p style="margin-top:16px;font-size:11px;color:#a6a6a6;font-family:Montserrat;letter-spacing:2px;text-transform:uppercase;">
    Popular: Miami Beach · Aventura · Brickell · Fort Lauderdale · Palm Beach
  </p>
  <p style="margin-top:16px;font-size:11px;color:#d2203a;font-style:italic;">
    IDX feed coming soon — replace this block with your IDX plugin shortcode.
  </p>
</div>`,
          }),
        ]),
      ],
    ),

    // 3. Featured Properties
    section(
      {
        padding: { unit: "px", top: 100, right: 24, bottom: 100, left: 24, isLinked: false },
        background_color: "#0a0a0a",
      },
      [
        column({}, [
          eyebrow("Featured Properties"),
          spacer({ size: 16 }),
          heading({ title: "Curated Listings", tag: "h2", size: 48, fontFamily: "Cormorant Garamond", fontWeight: 300 }),
          spacer({ size: 12 }),
          textEditor({ text: "A selection of active and off-market opportunities across South Florida." }),
          spacer({ size: 48 }),
          html({
            markup: `
<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:24px;">
  ${featured
    .map(
      (p) => `
  <a href="/properties/${p.id}" style="text-decoration:none;color:inherit;display:block;background:#0f0f0f;border:1px solid rgba(255,255,255,0.08);border-radius:4px;overflow:hidden;">
    <div style="aspect-ratio:4/3;background:linear-gradient(135deg,#1a0508,#0a0a0a 50%,#1a0a14);display:flex;align-items:center;justify-content:center;position:relative;">
      <div style="font-family:'Cormorant Garamond',serif;font-size:64px;font-weight:300;color:rgba(255,255,255,0.04);letter-spacing:8px;">VG</div>
      ${p.badge ? `<span class="vg-badge" style="position:absolute;top:16px;left:16px;">${p.badge}</span>` : ""}
    </div>
    <div style="padding:28px;">
      <div style="font-family:'Cormorant Garamond',serif;font-size:28px;color:#d2203a;font-weight:300;">$${(p.price / 1_000_000).toFixed(p.price >= 10_000_000 ? 1 : 2).replace(/\.0$/, "")}M</div>
      <div style="font-family:'Cormorant Garamond',serif;font-size:22px;color:#fff;margin-top:8px;">${p.title}</div>
      <div style="font-size:13px;color:#a6a6a6;margin-top:12px;">${p.city}, ${p.county}</div>
      <div style="margin-top:20px;padding-top:20px;border-top:1px solid rgba(255,255,255,0.08);font-size:12px;color:#a6a6a6;">${p.beds} bd · ${p.baths} ba · ${p.sqft.toLocaleString()} sqft</div>
    </div>
  </a>`,
    )
    .join("")}
</div>
<div style="margin-top:48px;text-align:center;">
  <a href="/properties" class="vg-button-outline">View All Listings</a>
</div>`,
          }),
        ]),
      ],
    ),

    // 4. Stats strip
    section(
      {
        padding: { unit: "px", top: 80, right: 24, bottom: 80, left: 24, isLinked: false },
        background_color: "#0f0f0f",
      },
      [
        column({}, [
          html({
            markup: `
<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:24px;text-align:left;">
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
        ]),
      ],
    ),

    // 5. Services grid
    section(
      { padding: { unit: "px", top: 100, right: 24, bottom: 100, left: 24, isLinked: false }, background_color: "#0a0a0a" },
      [
        column({}, [
          eyebrow("What We Do"),
          spacer({ size: 16 }),
          heading({ title: "A full-spectrum advisory", tag: "h2", size: 48, fontFamily: "Cormorant Garamond", fontWeight: 300 }),
          spacer({ size: 12 }),
          textEditor({ text: "Eight integrated practice areas across residential, commercial, HOA and investment." }),
          spacer({ size: 48 }),
          html({
            markup: `
<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:20px;">
  ${services
    .slice(0, 8)
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
        ]),
      ],
    ),

    // 5b. AI Property Matchmaker
    section(
      {
        padding: { unit: "px", top: 80, right: 24, bottom: 100, left: 24, isLinked: false },
        background_background: "gradient",
        background_color: "#0a0a0a",
        background_color_b: "#0f0f0f",
        background_gradient_angle: { unit: "deg", size: 180 },
      },
      [
        column({}, [
          html({
            markup: `
<div style="max-width:880px;margin:0 auto;text-align:center;">
  <div style="display:inline-flex;align-items:center;gap:10px;padding:8px 18px;border-radius:999px;background:linear-gradient(135deg, rgba(210,32,58,0.18), rgba(139,96,255,0.18));border:1px solid rgba(209,209,209,0.25);">
    <span style="display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;border-radius:50%;background:linear-gradient(135deg,#d2203a,#a78bff);color:#fff;font-size:13px;">✦</span>
    <span style="font-family:'Montserrat',sans-serif;font-weight:700;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#d1d1d1;">AI Property Matchmaker</span>
  </div>
  <h2 style="font-family:'Cormorant Garamond',serif;font-weight:300;font-size:56px;color:#fff;line-height:1.1;margin:24px 0 16px;">
    Describe your <em style="color:#d2203a;font-style:italic;">dream home</em>
  </h2>
  <p style="color:#d1d1d1;font-size:16px;line-height:1.7;max-width:640px;margin:0 auto;">
    Tell us in your own words. Our AI will translate it into a curated set of South Florida properties.
  </p>
  <form action="/properties/" method="get" style="margin-top:40px;background:#0a0a0a;border:1px solid rgba(209,209,209,0.22);border-radius:8px;padding:8px;display:flex;gap:12px;align-items:center;max-width:760px;margin-left:auto;margin-right:auto;">
    <input
      type="text"
      name="q"
      placeholder="A 5-bedroom waterfront estate in Miami Beach under $20M, with a dock and pool…"
      style="flex:1;background:transparent;border:none;outline:none;color:#fff;padding:14px 18px;font-size:14px;font-family:'Raleway',sans-serif;"
    />
    <button type="submit" class="vg-button-primary" style="border:none;cursor:pointer;white-space:nowrap;">Find Matches →</button>
  </form>
  <p style="margin-top:16px;font-size:11px;color:#a6a6a6;font-family:'Montserrat',sans-serif;letter-spacing:2px;text-transform:uppercase;">
    Powered by Varick Global · Concierge follow-up within 24 hours
  </p>
</div>`,
          }),
        ]),
      ],
    ),

    // 5c. Neighborhoods We Serve
    section(
      { padding: { unit: "px", top: 100, right: 24, bottom: 100, left: 24, isLinked: false }, background_color: "#0a0a0a" },
      [
        column({}, [
          eyebrow("Where We Work"),
          spacer({ size: 16 }),
          heading({ title: "Neighborhoods We Serve", tag: "h2", size: 48, fontFamily: "Cormorant Garamond", fontWeight: 300 }),
          spacer({ size: 12 }),
          textEditor({ text: "From the Atlantic coastline to the Intracoastal — twenty-four communities across Miami-Dade, Broward and Palm Beach counties." }),
          spacer({ size: 48 }),
          html({
            markup: `
<div style="display:grid;grid-template-columns:repeat(6,1fr);gap:8px 16px;">
  ${neighborhoods.map((n) => `<a href="/${n.slug}/" style="font-family:'Cormorant Garamond',serif;font-size:17px;font-weight:400;color:#d1d1d1;text-decoration:none;padding:10px 0;border-bottom:1px solid rgba(209,209,209,0.10);display:block;transition:color .15s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='#d1d1d1'">${n.name}</a>`).join("")}
</div>
<p style="margin-top:36px;font-size:12px;color:#a6a6a6;text-align:center;letter-spacing:2px;text-transform:uppercase;font-family:Montserrat,sans-serif;">
  Don't see your market? <a href="/contact/" style="color:#d1d1d1;text-decoration:underline;text-underline-offset:3px;">Speak with an advisor</a>
</p>`,
          }),
        ]),
      ],
    ),

    // 6. VG Elite teaser
    section(
      {
        padding: { unit: "px", top: 100, right: 24, bottom: 100, left: 24, isLinked: false },
        background_background: "gradient",
        background_color: "#050510",
        background_color_b: "#0d0308",
        background_gradient_angle: { unit: "deg", size: 135 },
      },
      [
        column({}, [
          html({
            markup: `
<div style="max-width:780px;">
  <div style="display:flex;gap:12px;margin-bottom:24px;flex-wrap:wrap;">
    <span class="vg-badge elite">VG Elite</span>
    <span class="vg-badge gold">By Invitation Only</span>
  </div>
  <h2 style="font-family:'Cormorant Garamond',serif;font-weight:300;font-size:48px;color:#fff;line-height:1.15;">
    Sports & Entertainment. <em style="color:#a78bff;font-style:italic;">Extraordinary Living.</em>
  </h2>
  <p style="margin-top:20px;color:#a6a6a6;max-width:640px;line-height:1.7;">
    VG Elite is Varick Global's invitation-only division for professional athletes, entertainers, and high-net-worth executives — a discreet, NDA-protected advisory with access to off-market inventory and white-glove relocation services.
  </p>
  <div style="margin-top:32px;">
    <a href="/elite" style="font-family:Montserrat;font-weight:700;font-size:11px;letter-spacing:2.5px;text-transform:uppercase;color:#a78bff;border-bottom:1px solid rgba(139,96,255,0.4);padding-bottom:6px;text-decoration:none;">Discover VG Elite →</a>
  </div>
</div>`,
          }),
        ]),
      ],
    ),

    // 7. Testimonials
    section(
      { padding: { unit: "px", top: 100, right: 24, bottom: 100, left: 24, isLinked: false }, background_color: "#0a0a0a" },
      [
        column({}, [
          eyebrow("In Their Words", { center: true }),
          spacer({ size: 16 }),
          heading({ title: "A track record of trust", tag: "h2", align: "center", size: 48, fontFamily: "Cormorant Garamond", fontWeight: 300 }),
          spacer({ size: 48 }),
          html({
            markup: `
<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:28px;">
  ${[
    { q: "Chris and the Varick Global team handled our acquisition with extraordinary discretion. They sourced an off-market property that perfectly matched our brief.", n: "A. R.", t: "Private Family Office, New York" },
    { q: "Their HOA Division navigated a complicated receivership for our association. We had clarity at every step. Truly best-in-class advisory.", n: "Board President", t: "Aventura, FL" },
    { q: "From listing strategy through closing, Varick Global delivered. Our home sold at the top of the comp set in 28 days.", n: "M. & D. P.", t: "Coral Gables Sellers" },
  ]
    .map(
      (t) => `
  <figure style="background:rgba(15,15,15,0.5);border:1px solid rgba(255,255,255,0.08);border-radius:4px;padding:32px;margin:0;">
    <div style="font-family:'Cormorant Garamond',serif;font-size:60px;color:#d2203a;line-height:1;margin-bottom:16px;">"</div>
    <blockquote style="font-family:'Cormorant Garamond',serif;font-style:italic;font-size:18px;color:rgba(255,255,255,0.9);line-height:1.6;margin:0;">${t.q}</blockquote>
    <figcaption style="margin-top:24px;padding-top:20px;border-top:1px solid rgba(255,255,255,0.08);">
      <div style="font-family:Montserrat;font-weight:700;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#fff;">${t.n}</div>
      <div style="margin-top:4px;font-size:12px;color:#a6a6a6;">${t.t}</div>
    </figcaption>
  </figure>`,
    )
    .join("")}
</div>`,
          }),
        ]),
      ],
    ),

    // 8. CTA Band
    ctaBand({}),
  ];
};
