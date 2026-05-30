const { html, ctaBand } = require("../lib/widgets");
const { pageHero, basicSection } = require("./common");

const articles = [
  {
    slug: "south-florida-luxury-market-2025",
    category: "Market Report",
    date: "May 2025",
    title: "South Florida Luxury Market: Mid-Year 2025 Outlook",
    excerpt: "Inventory tightens in the $3M+ segment as international capital continues to flow into Miami-Dade and Broward. Here is what buyers and sellers need to know.",
    img: "https://images.unsplash.com/photo-1580063708357-43d682a59e47?auto=format&fit=crop&w=800&q=70",
  },
  {
    slug: "brickell-condo-pipeline-2025",
    category: "New Development",
    date: "April 2025",
    title: "Brickell's Condo Pipeline: 12 Projects Reshaping the Skyline",
    excerpt: "From ultra-luxury residences to branded hotel-condos, Brickell is adding over 6,000 units through 2027. We break down what is under construction and what is worth watching.",
    img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=800&q=70",
  },
  {
    slug: "interest-rates-luxury-buyers",
    category: "Finance",
    date: "April 2025",
    title: "How Interest Rates Are — and Aren't — Affecting Luxury Buyers",
    excerpt: "Cash transactions remain dominant above $5M, but the $1M–$3M segment has seen financing strategies shift significantly. A data-driven look at deal structures.",
    img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=70",
  },
  {
    slug: "bal-harbour-vs-surfside",
    category: "Neighborhood Analysis",
    date: "March 2025",
    title: "Bal Harbour vs. Surfside: Comparing Two Barrier Island Markets",
    excerpt: "Two adjacent municipalities with distinctly different price trajectories and buyer profiles. Which market offers better relative value heading into 2026?",
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=70",
  },
  {
    slug: "hoa-distress-receivership-guide",
    category: "HOA Division",
    date: "March 2025",
    title: "Recognizing HOA Financial Distress Before It Becomes a Crisis",
    excerpt: "Florida's Surfside-era legislation has expanded reserve requirements and reporting obligations. Our HOA Division outlines the early warning signs and legal remedies.",
    img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=70",
  },
  {
    slug: "commercial-net-lease-miami",
    category: "Commercial",
    date: "February 2025",
    title: "Net-Lease Commercial: Miami's Evolving Cap Rate Environment",
    excerpt: "Retail cap rates compressed further in Q4 2024 while industrial softened. We share where institutional capital is repositioning and what private investors can exploit.",
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=70",
  },
];

const categories = [
  { name: "Market Reports", count: 14 },
  { name: "New Development", count: 9 },
  { name: "Neighborhood Analysis", count: 18 },
  { name: "Finance & Strategy", count: 11 },
  { name: "HOA Division", count: 7 },
  { name: "Commercial", count: 8 },
  { name: "VG Elite", count: 5 },
];

module.exports = function buildMarketInsights() {
  return [
    pageHero({
      eyebrowText: "Market Insights",
      title: "Intelligence for the discerning investor",
      italicWord: "discerning",
      subtitle: "Data-driven analysis, neighborhood deep-dives, and expert commentary from South Florida's premier real estate advisory.",
    }),

    basicSection({
      children: [
        html({
          markup: `
<div style="display:grid;grid-template-columns:1fr 320px;gap:64px;align-items:start;">

  <!-- Article grid -->
  <div>
    <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:32px;">
      ${articles.map((a) => `
      <article class="vg-card" style="overflow:hidden;border-radius:4px;">
        <a href="/blog/${a.slug}/" style="text-decoration:none;color:inherit;display:block;">
          <div style="aspect-ratio:16/9;overflow:hidden;">
            <img src="${a.img}" alt="${a.title}" onerror="this.src='https://picsum.photos/seed/${a.slug}/800/450'" style="width:100%;height:100%;object-fit:cover;transition:transform .4s ease;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'" loading="lazy"/>
          </div>
          <div style="padding:24px;">
            <div style="display:flex;align-items:center;gap:12px;margin-bottom:14px;">
              <span class="vg-badge">${a.category}</span>
              <span style="font-family:'Montserrat',sans-serif;font-size:11px;letter-spacing:1.5px;color:#a6a6a6;text-transform:uppercase;">${a.date}</span>
            </div>
            <h3 style="font-family:'Cormorant Garamond',serif;font-size:22px;font-weight:400;color:#fff;line-height:1.25;margin:0 0 12px;">${a.title}</h3>
            <p style="color:#a6a6a6;font-size:14px;line-height:1.65;margin:0;">${a.excerpt}</p>
            <div style="margin-top:20px;">
              <span style="font-family:'Montserrat',sans-serif;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#d2203a;">Read More →</span>
            </div>
          </div>
        </a>
      </article>`).join("")}
    </div>
  </div>

  <!-- Sidebar -->
  <aside style="position:sticky;top:88px;">

    <!-- Search -->
    <div class="vg-card" style="padding:28px;margin-bottom:28px;">
      <h4 style="font-family:'Montserrat',sans-serif;font-size:11px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:#fff;margin:0 0 16px;">Search Articles</h4>
      <div style="display:flex;gap:8px;">
        <input type="search" placeholder="Keywords..." style="flex:1;background:rgba(0,0,0,0.4);border:1px solid rgba(209,209,209,0.3);color:#fff;padding:10px 14px;border-radius:2px;font-family:'Raleway',sans-serif;font-size:14px;"/>
        <button style="background:#a6192e;color:#fff;border:none;padding:10px 16px;border-radius:2px;cursor:pointer;font-family:'Montserrat',sans-serif;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;">Go</button>
      </div>
    </div>

    <!-- Categories -->
    <div class="vg-card" style="padding:28px;margin-bottom:28px;">
      <h4 style="font-family:'Montserrat',sans-serif;font-size:11px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:#fff;margin:0 0 20px;">Categories</h4>
      <ul style="list-style:none;padding:0;margin:0;">
        ${categories.map((c) => `
        <li style="border-bottom:1px solid rgba(209,209,209,0.10);padding:10px 0;display:flex;justify-content:space-between;align-items:center;">
          <a href="/blog/category/${c.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}/" style="color:#d1d1d1;text-decoration:none;font-size:14px;transition:color .15s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='#d1d1d1'">${c.name}</a>
          <span style="font-family:'Montserrat',sans-serif;font-size:10px;letter-spacing:1px;color:#a6a6a6;">${c.count}</span>
        </li>`).join("")}
      </ul>
    </div>

    <!-- Newsletter signup -->
    <div class="vg-card accent-top" style="padding:28px;background:linear-gradient(135deg, #0f0505 0%, #0f0f0f 100%);">
      <div class="eyebrow" style="margin-bottom:12px;">Weekly Briefing</div>
      <h4 style="font-family:'Cormorant Garamond',serif;font-size:24px;font-weight:300;color:#fff;line-height:1.2;margin:0 0 12px;">South Florida market intel — every Friday.</h4>
      <p style="color:#a6a6a6;font-size:13px;line-height:1.6;margin:0 0 20px;">No spam. Unsubscribe anytime.</p>
      <input type="email" placeholder="your@email.com" style="width:100%;box-sizing:border-box;background:rgba(0,0,0,0.4);border:1px solid rgba(209,209,209,0.3);color:#fff;padding:11px 14px;border-radius:2px;font-family:'Raleway',sans-serif;font-size:14px;margin-bottom:12px;"/>
      <a href="/contact/" class="vg-button-primary" style="display:block;text-align:center;">Subscribe</a>
    </div>

  </aside>
</div>`,
        }),
      ],
    }),

    ctaBand({}),
  ];
};
