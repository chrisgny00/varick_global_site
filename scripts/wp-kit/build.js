#!/usr/bin/env node
/**
 * Builds an Elementor Template Kit (.zip) from the Next.js codebase.
 *
 * Output: dist/varick-global-kit.zip
 *
 * After running, the zip can be imported into Elementor via:
 *   WP Admin → Elementor → Tools → Kit Library → Import Kit
 *
 * The accompanying WXR (content seed) is dist/varick-global-content.xml —
 * import via WP Admin → Tools → Import → WordPress.
 */

const fs = require("fs");
const path = require("path");
const archiver = require("archiver");

const { colors, fonts, customCss } = require("./lib/tokens");
const { services, agents, neighborhoods, properties } = require("./lib/data");
const { emitWxr, pageItem } = require("./lib/wxr");

const buildHome = require("./templates/home");
const buildAbout = require("./templates/about");
const buildServices = require("./templates/services");
const buildServiceSingle = require("./templates/service-single");
const buildCommercial = require("./templates/commercial");
const buildHOA = require("./templates/hoa");
const buildLand = require("./templates/land");
const buildElite = require("./templates/elite");
const buildProperties = require("./templates/properties");
const buildAgents = require("./templates/agents");
const buildAgentSingle = require("./templates/agent-single");
const buildNeighborhoodSingle = require("./templates/neighborhood-single");
const buildValuation = require("./templates/valuation");
const buildContact = require("./templates/contact");
const buildFAQ = require("./templates/faq");
const buildPrivacy = require("./templates/privacy");

const root = path.join(__dirname, "..", "..");
const distDir = path.join(root, "dist");
const stagingDir = path.join(distDir, "varick-global-kit");

function rmrf(dir) {
  if (fs.existsSync(dir)) fs.rmSync(dir, { recursive: true, force: true });
}

function mkdirp(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

function templateDoc(title, elementorData) {
  return {
    version: "0.4",
    title,
    type: "page",
    content: elementorData,
    page_settings: [],
  };
}

// --- Build kit --------------------------------------------------------------

console.log("→ Cleaning dist...");
rmrf(distDir);
mkdirp(stagingDir);
mkdirp(path.join(stagingDir, "templates"));

// Build all templates and remember their content + assigned IDs for the manifest.
const templates = {};
let nextId = 1;

function addTemplate(slug, title, docType, content) {
  const id = nextId++;
  templates[id] = { id, title, doc_type: docType, thumbnail: "", source: "local", type: docType, slug };
  writeJson(path.join(stagingDir, "templates", `${id}.json`), templateDoc(title, content));
  return id;
}

// Static pages
const homeId = addTemplate("home", "Home", "wp-page", buildHome({ services, properties, neighborhoods }));
const aboutId = addTemplate("about", "About", "wp-page", buildAbout());
const servicesId = addTemplate("services", "Services", "wp-page", buildServices({ services }));
const commercialId = addTemplate("commercial", "Commercial", "wp-page", buildCommercial({ properties }));
const hoaId = addTemplate("hoa", "HOA Division", "wp-page", buildHOA());
const landId = addTemplate("land", "Land", "wp-page", buildLand({ properties }));
const eliteId = addTemplate("elite", "VG Elite", "wp-page", buildElite());
const propertiesId = addTemplate("properties", "Properties", "wp-page", buildProperties({ properties }));
const agentsId = addTemplate("agents", "Advisors", "wp-page", buildAgents({ agents }));
const valuationId = addTemplate("valuation", "Valuation", "wp-page", buildValuation());
const contactId = addTemplate("contact", "Contact", "wp-page", buildContact());
const faqId = addTemplate("faq", "FAQ", "wp-page", buildFAQ());
const privacyId = addTemplate("privacy", "Privacy", "wp-page", buildPrivacy());

// Dynamic: 12 services
const serviceIds = {};
for (const s of services) {
  const related = services.filter((x) => x.slug !== s.slug && x.category === s.category).slice(0, 3);
  serviceIds[s.slug] = addTemplate(`service-${s.slug}`, s.title, "wp-page", buildServiceSingle(s, { related }));
}

// Dynamic: 4 agents
const agentIds = {};
for (const a of agents) {
  agentIds[a.slug] = addTemplate(`agent-${a.slug}`, a.name, "wp-page", buildAgentSingle(a));
}

// Dynamic: 24 neighborhoods
const neighborhoodIds = {};
for (const n of neighborhoods) {
  const related = neighborhoods.filter((x) => x.county === n.county && x.slug !== n.slug).slice(0, 4);
  neighborhoodIds[n.slug] = addTemplate(`neighborhood-${n.slug}`, n.name, "wp-page", buildNeighborhoodSingle(n, { related }));
}

console.log(`→ Built ${Object.keys(templates).length} templates.`);

// Site settings (global colors + fonts + custom CSS)
writeJson(path.join(stagingDir, "site-settings.json"), {
  settings: {
    system_colors: [
      { _id: "primary", title: "Primary", color: "#a6192e" },
      { _id: "secondary", title: "Accent", color: "#d2203a" },
      { _id: "text", title: "Text", color: "#ffffff" },
      { _id: "accent", title: "Pewter", color: "#a6a6a6" },
    ],
    custom_colors: colors.filter((c) => !["primary", "secondary", "text", "accent"].includes(c._id)),
    system_typography: [
      { _id: "primary", title: "Primary Heading", typography_typography: "custom", typography_font_family: "Cormorant Garamond", typography_font_weight: "300" },
      { _id: "secondary", title: "Secondary Heading", typography_typography: "custom", typography_font_family: "Cormorant Garamond", typography_font_weight: "400" },
      { _id: "text", title: "Body", typography_typography: "custom", typography_font_family: "Raleway", typography_font_weight: "300" },
      { _id: "accent", title: "Accent", typography_typography: "custom", typography_font_family: "Montserrat", typography_font_weight: "700" },
    ],
    custom_typography: [],
    container_padding: { unit: "px", top: 0, right: 24, bottom: 0, left: 24, isLinked: false },
    space_between_widgets: { unit: "px", size: 20 },
    custom_css: customCss,
    site_name: "Varick Global Real Estate Advisors",
    site_description: "South Florida's premier luxury real estate advisory.",
  },
});

// Manifest
writeJson(path.join(stagingDir, "manifest.json"), {
  name: "varick-global",
  title: "Varick Global Real Estate Advisors",
  description: "Luxury real estate site — main brand + VG Elite sub-brand. Generated from Next.js source.",
  author: "Varick Global",
  version: "1.0.0",
  elementor_version: "3.18.0",
  created: new Date().toISOString(),
  thumbnail: "",
  "site-settings": {
    "global-colors": true,
    "global-fonts": true,
    "theme-style": true,
    settings: true,
    "custom-colors": true,
    "custom-fonts": true,
  },
  templates,
  content: { page: {} },
});

// --- Build WXR (content seed) ----------------------------------------------

const wxrItems = [];
let postId = 1000;

function loadElementorData(templateId) {
  // We re-read the JSON we just wrote and grab the content array — the WXR
  // _elementor_data postmeta wants the same JSON shape Elementor's editor uses.
  const doc = JSON.parse(fs.readFileSync(path.join(stagingDir, "templates", `${templateId}.json`), "utf8"));
  return doc.content;
}

function staticPage(slug, title, templateId, menuOrder = 0) {
  wxrItems.push(
    pageItem({
      id: postId++,
      title,
      slug,
      menuOrder,
      elementorData: loadElementorData(templateId),
    }),
  );
}

// Static pages
staticPage("home", "Home", homeId, 1);
staticPage("about", "About", aboutId, 2);
staticPage("services", "Services", servicesId, 3);
staticPage("commercial", "Commercial", commercialId, 4);
staticPage("hoa", "HOA Division", hoaId, 5);
staticPage("land", "Land", landId, 6);
staticPage("properties", "Properties", propertiesId, 7);
staticPage("elite", "VG Elite", eliteId, 8);
staticPage("agents", "Advisors", agentsId, 9);
staticPage("valuation", "Valuation", valuationId, 10);
staticPage("contact", "Contact", contactId, 11);
staticPage("faq", "FAQ", faqId, 12);
staticPage("privacy", "Privacy", privacyId, 13);

// Service detail pages, parented to /services
const servicesParentId = postId - 10; // approximate — they import as siblings; URL slug carries the path
for (const s of services) {
  wxrItems.push(
    pageItem({
      id: postId++,
      title: s.title,
      slug: `services/${s.slug}`,
      elementorData: loadElementorData(serviceIds[s.slug]),
    }),
  );
}

// Agent detail pages
for (const a of agents) {
  wxrItems.push(
    pageItem({
      id: postId++,
      title: a.name,
      slug: `agents/${a.slug}`,
      elementorData: loadElementorData(agentIds[a.slug]),
    }),
  );
}

// Neighborhood detail pages
for (const n of neighborhoods) {
  wxrItems.push(
    pageItem({
      id: postId++,
      title: `${n.name} Real Estate`,
      slug: `neighborhoods/${n.slug}`,
      elementorData: loadElementorData(neighborhoodIds[n.slug]),
    }),
  );
}

fs.writeFileSync(path.join(distDir, "varick-global-content.xml"), emitWxr(wxrItems));
console.log(`→ Wrote WXR content with ${wxrItems.length} pages.`);

// --- Zip the kit ------------------------------------------------------------

const zipPath = path.join(distDir, "varick-global-kit.zip");
const output = fs.createWriteStream(zipPath);
const archive = new archiver.ZipArchive({ zlib: { level: 9 } });

output.on("close", () => {
  const sizeKb = (archive.pointer() / 1024).toFixed(1);
  console.log(`✓ ${path.relative(root, zipPath)}  (${sizeKb} KB)`);
  console.log(`✓ ${path.relative(root, path.join(distDir, "varick-global-content.xml"))}`);
  console.log("");
  console.log("Import order:");
  console.log("  1. WP Admin → Elementor → Tools → Kit Library → Import Kit  → upload varick-global-kit.zip");
  console.log("  2. WP Admin → Tools → Import → WordPress         → upload varick-global-content.xml");
  console.log("  3. Settings → Reading → Homepage displays a static page → choose 'Home'");
});

archive.on("error", (err) => {
  throw err;
});

archive.pipe(output);
archive.directory(stagingDir, false);
archive.finalize();
