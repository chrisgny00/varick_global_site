// Map of generated slug → live WordPress page ID, derived from pages.list response.
// The home page on the live site is slug 'varick-home' (link /); the 'agents/*'
// generated paths correspond to /advisors/* on the live site.
const fs = require('fs');
const pages = require('../dist/pages-html.json');

const liveByUrl = {
  '/': 4313,
  '/about/': 4320,
  '/services/': 4321,
  '/commercial/': 4246,
  '/hoa/': 4323,
  '/land/': 4324,
  '/elite/': 4325,
  '/properties/': 4279,
  '/advisors/': 4326,
  '/contact/': 1100,
  '/faq/': 4328,
  '/privacy/': 748,
  '/services/tenant-representation/': 4332,
  '/services/landlord-representation/': 4333,
  '/services/buyer-seller-services/': 4334,
  '/services/lease-renewal/': 4335,
  '/services/valuation/': 4336,
  '/services/foreclosures/': 4337,
  '/services/investment-sales/': 4338,
  '/services/new-development/': 4534,
  '/services/hoa-advisory/': 4340,
  '/services/hoa-conversions/': 4343,
  '/services/receivership/': 4341,
  '/services/hoa-sale/': 4342,
  '/advisors/chris-gallego/': 4344,
  '/advisors/nina-vazquez/': 4345,
  '/advisors/alfredo-morejon/': 4346,
  '/advisors/gloria-grullon/': 4347,
  '/neighborhoods/miami-beach/': 4348,
  '/neighborhoods/brickell/': 4349,
  '/neighborhoods/coconut-grove/': 4350,
  '/neighborhoods/aventura/': 4351,
  '/neighborhoods/bal-harbour/': 4352,
  '/neighborhoods/surfside/': 4353,
  '/neighborhoods/key-biscayne/': 4354,
  '/neighborhoods/fort-lauderdale/': 4355,
  '/neighborhoods/hollywood/': 4356,
  '/neighborhoods/coral-gables/': 4357,
  '/neighborhoods/hallandale-beach/': 4358,
  '/neighborhoods/pompano-beach/': 4359,
  '/neighborhoods/weston/': 4360,
  '/neighborhoods/davie/': 4361,
  '/neighborhoods/plantation/': 4362,
  '/neighborhoods/palm-beach/': 4363,
  '/neighborhoods/boca-raton/': 4364,
  '/neighborhoods/delray-beach/': 4365,
  '/neighborhoods/wellington/': 4366,
  '/neighborhoods/jupiter/': 4367,
  '/neighborhoods/boynton-beach/': 4368,
  '/neighborhoods/deerfield-beach/': 4369,
  '/neighborhoods/west-palm-beach/': 4370,
  '/neighborhoods/palm-beach-gardens/': 4371,
};

function slugToUrl(slug) {
  if (slug === 'home') return '/';
  // Agents → advisors path on live site
  const remapped = slug.replace(/^agents\//, 'advisors/');
  return '/' + remapped + '/';
}

const out = [];
const skipped = [];
for (const p of pages) {
  const url = slugToUrl(p.slug);
  const id = liveByUrl[url];
  if (!id) {
    skipped.push({ slug: p.slug, url });
    continue;
  }
  out.push({ generated_slug: p.slug, live_id: id, live_url: url, title: p.title });
}

fs.writeFileSync('scripts/push-map.json', JSON.stringify(out, null, 2));
console.log('Mapped:', out.length);
console.log('Skipped:', skipped.length, JSON.stringify(skipped));
