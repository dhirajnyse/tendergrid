import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { runInNewContext } from "node:vm";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const failures = [];

function projectPath(path) {
  return join(root, path);
}

function read(path) {
  return readFileSync(projectPath(path), "utf8");
}

function assert(condition, message) {
  if (!condition) failures.push(message);
}

function assertFile(path) {
  assert(existsSync(projectPath(path)), `${path} is missing.`);
}

[
  "index.html",
  "styles.css",
  "app.js",
  "data/sample-data.js",
  "site.webmanifest",
  "assets/favicon.svg",
  "assets/pursuitdesk-mark.svg",
  "assets/pursuitdesk-logo-3d.svg",
  "docs/PRODUCT_SPEC.md",
  "docs/DATA_MODEL.md",
  "docs/BUILD_BACKLOG.md",
  "docs/ROADMAP.md"
].forEach(assertFile);

assert(!existsSync(projectPath("sample-data.js")), "Root sample-data.js should not exist; the app loads data/sample-data.js.");

const index = read("index.html");
const css = read("styles.css");
const app = read("app.js");
const seedScript = read("data/sample-data.js");
const manifest = JSON.parse(read("site.webmanifest"));

try {
  new Function(app);
} catch (error) {
  failures.push(`app.js has a syntax error: ${error.message}`);
}

try {
  new Function(seedScript);
} catch (error) {
  failures.push(`data/sample-data.js has a syntax error: ${error.message}`);
}

const context = { window: {} };
try {
  runInNewContext(seedScript, context, { filename: "data/sample-data.js" });
} catch (error) {
  failures.push(`data/sample-data.js cannot initialize SEED_DATA: ${error.message}`);
}

const seed = context.window.SEED_DATA;

assert(index.includes("<title>PursuitDesk</title>"), "index.html has the wrong title.");
assert(index.includes('<div id="app"></div>'), "index.html is missing the app mount.");
assert(index.includes("styles.css?v=328"), "index.html is missing the v328 CSS cache token.");
assert(index.includes("data/sample-data.js?v=328"), "index.html is missing the v328 data cache token.");
assert(index.includes("app.js?v=328"), "index.html is missing the v328 app cache token.");
assert(index.includes("assets/pursuitdesk-mark.svg?v=328"), "index.html is missing the v328 icon cache token.");
assert(!/\son[a-z]+\s*=/i.test(index), "index.html contains an inline event handler.");
assert(!/(?:src|href)\s*=\s*["'][^"']*https?:\/\//i.test(index), "index.html should not require remote assets.");
assert(!/url\(\s*["']?https?:\/\//i.test(css), "styles.css should not require remote assets.");

assert(manifest.name === "PursuitDesk", "site.webmanifest has the wrong app name.");
assert(manifest.short_name === "PursuitDesk", "site.webmanifest has the wrong short name.");

assert(app.includes('const BRAND_NAME = "PursuitDesk";'), "app.js has the wrong brand name.");
assert(app.includes('const BUILD_VERSION = "v328";'), "app.js has the wrong build version.");
assert(app.includes('const BUILD_LABEL = "Federated Pattern Trust Ledger";'), "app.js has the wrong build label.");
assert(app.includes("RECOVERY_BASELINE_SHA"), "app.js is missing the recovery baseline guard.");
assert(app.includes('const STORE_KEY = "pursuitDesk:data:v1";'), "app.js is missing the PursuitDesk storage key.");
assert(app.includes("localStorage"), "app.js should persist prototype state locally.");
assert(app.includes("navigator.clipboard"), "app.js is missing copy support.");
assert(app.includes("function renderLogin"), "app.js is missing login rendering.");
assert(app.includes("function renderShell"), "app.js is missing shell rendering.");
assert(app.includes("function renderCommandCenterPage"), "app.js is missing Command Center rendering.");
assert(app.includes("function renderPursuitAdvisorPage"), "app.js is missing Pursuit Advisor rendering.");
assert(app.includes("function renderPursuitAutopilotPage"), "app.js is missing Pursuit Autopilot rendering.");
assert(app.includes("function renderPursuitTimeMachinePage"), "app.js is missing Pursuit Time Machine rendering.");
assert(app.includes("function renderPursuitWinLabPage"), "app.js is missing Pursuit Win Lab rendering.");
assert(app.includes("function renderPursuitDecisionTwinPage"), "app.js is missing Pursuit Decision Twin rendering.");
assert(app.includes("renderCommandSerenityCompass"), "app.js is missing the Serenity Handrail render path.");
assert(app.includes("renderCommandContinuityGuard"), "app.js is missing the Continuity Guard render path.");
assert(app.includes("renderCommandWorldDemoScript"), "app.js is missing the World Demo Script render path.");
assert(app.includes("renderCommandPilotClosePacket"), "app.js is missing the Pilot Close Packet render path.");
assert(app.includes("renderCommandPilotLaunchBoard"), "app.js is missing the Pilot Launch Board render path.");
assert(app.includes("renderCommandLearningLoopBoard"), "app.js is missing the Learning Loop Board render path.");
assert(app.includes("renderCommandOutcomeFeedbackEngine"), "app.js is missing the Outcome Feedback Engine render path.");
assert(app.includes("renderCommandAdaptivePolicySimulator"), "app.js is missing the Adaptive Policy Simulator render path.");
assert(app.includes("renderCommandTenantLearningFirewall"), "app.js is missing the Tenant Learning Firewall render path.");
assert(app.includes("renderCommandFederatedPatternTrustLedger"), "app.js is missing the Federated Pattern Trust Ledger render path.");
assert(app.includes("document.addEventListener(\"submit\""), "app.js is missing form event handling.");
assert(app.includes("window.addEventListener(\"hashchange\""), "app.js is missing route synchronization.");

assert(css.includes(".command-serenity-handrail"), "styles.css is missing Serenity Handrail styles.");
assert(css.includes(".command-continuity-guard"), "styles.css is missing Continuity Guard styles.");
assert(css.includes(".command-world-demo-script"), "styles.css is missing World Demo Script styles.");
assert(css.includes(".command-pilot-close-packet"), "styles.css is missing Pilot Close Packet styles.");
assert(css.includes(".command-pilot-launch-board"), "styles.css is missing Pilot Launch Board styles.");
assert(css.includes(".command-learning-loop-board"), "styles.css is missing Learning Loop Board styles.");
assert(css.includes(".command-outcome-feedback-engine"), "styles.css is missing Outcome Feedback Engine styles.");
assert(css.includes(".command-adaptive-policy-simulator"), "styles.css is missing Adaptive Policy Simulator styles.");
assert(css.includes(".command-tenant-learning-firewall"), "styles.css is missing Tenant Learning Firewall styles.");
assert(css.includes(".command-federated-trust-ledger"), "styles.css is missing Federated Pattern Trust Ledger styles.");
assert(css.includes("letter-spacing: 0"), "styles.css should keep letter spacing neutral.");
assert(!/letter-spacing:\s*-/i.test(css), "styles.css contains negative letter spacing.");

assert(seed?.company?.name === "Capsa Engineering & Contracting LLC", "SEED_DATA has the wrong company.");
assert(Array.isArray(seed?.users) && seed.users.length >= 3, "SEED_DATA is missing demo users.");
assert(seed.users.some((user) => user.email === "admin@pursuitdesk.app" && user.password === "demo123"), "SEED_DATA is missing the admin demo login.");
assert(Array.isArray(seed?.records) && seed.records.length > 0, "SEED_DATA is missing records.");
assert(seed.records.some((record) => record.type === "Tender"), "SEED_DATA is missing tender records.");
assert(seed.records.some((record) => record.type === "Project"), "SEED_DATA is missing project records.");

if (failures.length) {
  console.error("Static check failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("PursuitDesk static check passed.");
