// Pulls services / agents / neighborhoods straight from the TS files.
// We strip TS type annotations and `import type` lines, then eval the array literal.

const fs = require("fs");
const path = require("path");

function loadArrayExport(filePath, exportName) {
  const src = fs.readFileSync(filePath, "utf8");
  // Match: export const NAME ...= [ ... ];
  const re = new RegExp(`export const ${exportName}\\s*[^=]*=\\s*(\\[[\\s\\S]*?\\n\\]);`, "m");
  const match = src.match(re);
  if (!match) throw new Error(`Could not locate export ${exportName} in ${filePath}`);
  const literal = match[1];
  // Eval as JS — values are plain string/number/array literals.
  // The `u` helper (used by neighborhoods.ts for Unsplash photo URLs) is
  // injected into scope so inline calls like `photo: u("abc-123")` resolve.
  // eslint-disable-next-line no-new-func
  return new Function(
    `const u = (id) => "https://images.unsplash.com/photo-" + id + "?auto=format&fit=crop&w=1200&q=70"; return ${literal};`,
  )();
}

const root = path.join(__dirname, "..", "..", "..");

const services = loadArrayExport(path.join(root, "src/lib/data/services.ts"), "services");
const agents = loadArrayExport(path.join(root, "src/lib/data/agents.ts"), "agents");
const neighborhoods = loadArrayExport(path.join(root, "src/lib/data/neighborhoods.ts"), "neighborhoods");
const properties = loadArrayExport(path.join(root, "src/lib/data/properties.ts"), "properties");

module.exports = { services, agents, neighborhoods, properties };
