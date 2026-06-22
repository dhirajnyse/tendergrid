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
assert(index.includes("styles.css?v=520"), "index.html is missing the v520 CSS cache token.");
assert(index.includes("data/sample-data.js?v=520"), "index.html is missing the v520 data cache token.");
assert(index.includes("app.js?v=520"), "index.html is missing the v520 app cache token.");
assert(index.includes("assets/pursuitdesk-mark.svg?v=520"), "index.html is missing the v520 icon cache token.");
assert(!/\son[a-z]+\s*=/i.test(index), "index.html contains an inline event handler.");
assert(!/(?:src|href)\s*=\s*["'][^"']*https?:\/\//i.test(index), "index.html should not require remote assets.");
assert(!/url\(\s*["']?https?:\/\//i.test(css), "styles.css should not require remote assets.");

assert(manifest.name === "PursuitDesk", "site.webmanifest has the wrong app name.");
assert(manifest.short_name === "PursuitDesk", "site.webmanifest has the wrong short name.");

assert(app.includes('const BRAND_NAME = "PursuitDesk";'), "app.js has the wrong brand name.");
assert(app.includes('const BUILD_VERSION = "v520";'), "app.js has the wrong build version.");
assert(app.includes('const BUILD_LABEL = "Closeout Archive";'), "app.js has the wrong build label.");
assert(app.includes('assets/pursuitdesk-mark.svg?v=520'), "app.js is missing the v520 brand mark cache token.");
assert(app.includes('assets/pursuitdesk-logo-3d.svg?v=520'), "app.js is missing the v520 3D logo cache token.");
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
assert(app.includes("renderCommandPilotStoryFold"), "app.js is missing the Pilot Story Fold render path.");
assert(app.includes("renderCommandLearningLoopBoard"), "app.js is missing the Learning Loop Board render path.");
assert(app.includes("renderCommandOutcomeFeedbackEngine"), "app.js is missing the Outcome Feedback Engine render path.");
assert(app.includes("renderCommandAdaptivePolicySimulator"), "app.js is missing the Adaptive Policy Simulator render path.");
assert(app.includes("renderCommandTenantLearningFirewall"), "app.js is missing the Tenant Learning Firewall render path.");
assert(app.includes("renderCommandFederatedPatternTrustLedger"), "app.js is missing the Federated Pattern Trust Ledger render path.");
assert(app.includes("renderCommandNetworkInfluenceShadowReplay"), "app.js is missing the Network Influence Shadow Replay render path.");
assert(app.includes("renderCommandTenantInfluenceActivationSwitchboard"), "app.js is missing the Tenant Influence Activation Switchboard render path.");
assert(app.includes("renderCommandActivationOutcomeLearner"), "app.js is missing the Activation Outcome Learner render path.");
assert(app.includes("renderCommandNetworkBenefitRouter"), "app.js is missing the Network Benefit Router render path.");
assert(app.includes("renderCommandNetworkReciprocityLedger"), "app.js is missing the Network Reciprocity Ledger render path.");
assert(app.includes("renderCommandNetworkLearningDividendAllocator"), "app.js is missing the Network Learning Dividend Allocator render path.");
assert(app.includes("renderCommandNetworkOutcomeDividendVerifier"), "app.js is missing the Network Outcome Dividend Verifier render path.");
assert(app.includes("renderCommandNetworkReinforcementPolicyGovernor"), "app.js is missing the Network Reinforcement Policy Governor render path.");
assert(app.includes("renderCommandNetworkReinforcementDriftSentinel"), "app.js is missing the Network Reinforcement Drift Sentinel render path.");
assert(app.includes("renderCommandNetworkRetuneExperimentOrchestrator"), "app.js is missing the Network Retune Experiment Orchestrator render path.");
assert(app.includes("renderCommandNetworkRetuneOutcomeLearner"), "app.js is missing the Network Retune Outcome Learner render path.");
assert(app.includes("renderCommandNetworkLearningSafetyCouncil"), "app.js is missing the Network Learning Safety Council render path.");
assert(app.includes("renderCommandNetworkLearningLicenseGate"), "app.js is missing the Network Learning License Gate render path.");
assert(app.includes("renderCommandNetworkLearningRoyaltyLedger"), "app.js is missing the Network Learning Royalty Ledger render path.");
assert(app.includes("renderCommandNetworkLearningSettlementConsole"), "app.js is missing the Network Learning Settlement Console render path.");
assert(app.includes("renderCommandNetworkLearningClearinghouse"), "app.js is missing the Network Learning Clearinghouse render path.");
assert(app.includes("renderCommandNetworkLearningTrustMarket"), "app.js is missing the Network Learning Trust Market render path.");
assert(app.includes("renderCommandNetworkLearningDemandRouter"), "app.js is missing the Network Learning Demand Router render path.");
assert(app.includes("renderCommandNetworkOutcomeExchange"), "app.js is missing the Network Outcome Exchange render path.");
assert(app.includes("renderCommandNetworkValueGovernor"), "app.js is missing the Network Value Governor render path.");
assert(app.includes("renderCommandNetworkValueAuditTrail"), "app.js is missing the Network Value Audit Trail render path.");
assert(app.includes("renderCommandNetworkValueReviewBoard"), "app.js is missing the Network Value Review Board render path.");
assert(app.includes("renderCommandNetworkDecisionReleaseGate"), "app.js is missing the Network Decision Release Gate render path.");
assert(app.includes("renderCommandNetworkReleaseOutcomeMonitor"), "app.js is missing the Network Release Outcome Monitor render path.");
assert(app.includes("renderCommandNetworkOutcomeLearningGovernor"), "app.js is missing the Network Outcome Learning Governor render path.");
assert(app.includes("renderCommandClosedLoopLearningControlRoom"), "app.js is missing the Closed-Loop Learning Control Room render path.");
assert(app.includes("renderCommandLearningFlywheelEvidenceBoard"), "app.js is missing the Learning Flywheel Evidence Board render path.");
assert(app.includes("renderCommandSerenityExperimentPrioritizer"), "app.js is missing the Serenity Experiment Prioritizer render path.");
assert(app.includes("renderCommandGlobalLaunchSerenityConsole"), "app.js is missing the Global Launch Serenity Console render path.");
assert(app.includes("renderCommandLearningNetworkFold"), "app.js is missing the Serenity Network Fold render path.");
assert(app.includes("buildBuildLaunchRoadmap"), "app.js is missing the Build Phase Launch Roadmap model.");
assert(app.includes("renderBuildLaunchRoadmap"), "app.js is missing the Build Phase Launch Roadmap render path.");
assert(app.includes("renderBuildLaunchRoadmap(tracker)"), "Build Phase page is missing the Launch Roadmap section.");
assert(app.includes('href: "#build-phase"'), "Admin Tools is missing the Build Phase hash fallback.");
assert(app.includes("function isAdminUser"), "app.js is missing the safe admin role helper.");
assert(app.includes('String(user?.role || "").trim().toLowerCase() === "admin"'), "app.js should normalize admin role checks.");
assert(app.includes("function routeViewForUser"), "app.js is missing the route access guard.");
assert(app.includes("function hydrateRouteView"), "app.js is missing route hydration after session refresh.");
assert(app.includes("const routeView = routeViewForUser(window.location.hash, initialUser);"), "Initial session load should honor #build-phase.");
assert(app.includes("const routeView = routeViewForUser(window.location.hash, state.user);"), "Login should honor #build-phase after authentication.");
assert(app.includes("hydrateRouteView();"), "renderShell should re-apply the current hash route after refreshing the session.");
assert(app.includes("if (action === \"open-build-phase\")"), "Build badge is missing its Build Phase click action.");
assert(app.includes("v514 build phase route repair"), "Build Phase route repair history is missing.");
assert(app.includes("Closeout Archive"), "Closeout Archive release label is missing.");
assert(app.includes("Market Learning Reuse Gate"), "Market learning reuse gate release label is missing.");
assert(app.includes("Next-Market Action Receipt"), "Next-market action receipt release label is missing.");
assert(app.includes("Approval Closeout Receipt"), "Approval closeout receipt release label is missing.");
assert(app.includes("Approval Outcome Monitor"), "Approval outcome monitor release label is missing.");
assert(app.includes("Market Response Learning Receipt"), "Market response learning release label is missing.");
assert(app.includes("function buildGithubRepoOpeningPacketModel"), "Build Phase is missing the GitHub repo opening packet model.");
assert(app.includes("function renderPrivateRepoHandoffEmailPack"), "Build Phase is missing the private repo handoff email renderer.");
assert(app.includes("function renderReviewerDecisionEmailPack"), "Build Phase is missing the reviewer decision email renderer.");

const buildPhaseStart = app.indexOf("function renderBuildPhaseArtifactSections");
const buildPhaseEnd = app.indexOf("function renderCommandTodayMission", buildPhaseStart);
assert(buildPhaseStart >= 0, "Build Phase artifact section renderer is missing.");
assert(buildPhaseEnd > buildPhaseStart, "Build Phase artifact section scan boundary is missing.");

if (buildPhaseStart >= 0 && buildPhaseEnd > buildPhaseStart) {
  const buildPhaseBlock = app.slice(buildPhaseStart, buildPhaseEnd);
  const buildCalls = [...buildPhaseBlock.matchAll(/\b(build[A-Za-z0-9_]+Model)\s*\(/g)].map((match) => match[1]);
  const buildDefinitions = new Set([...app.matchAll(/\bfunction\s+(build[A-Za-z0-9_]+Model)\s*\(/g)].map((match) => match[1]));
  const missingBuildFunctions = [...new Set(buildCalls.filter((name) => !buildDefinitions.has(name)))];
  assert(!missingBuildFunctions.length, `Build Phase has missing model builders: ${missingBuildFunctions.join(", ")}`);

  const renderCalls = [...buildPhaseBlock.matchAll(/\b(render[A-Za-z0-9_]+)\s*\(/g)]
    .map((match) => match[1])
    .filter((name) => name !== "renderBuildPhaseArtifactSections");
  const renderDefinitions = new Set([...app.matchAll(/\bfunction\s+(render[A-Za-z0-9_]+)\s*\(/g)].map((match) => match[1]));
  const missingRenderFunctions = [...new Set(renderCalls.filter((name) => !renderDefinitions.has(name)))];
  assert(!missingRenderFunctions.length, `Build Phase has missing renderers: ${missingRenderFunctions.join(", ")}`);
}
assert(app.includes("renderCommandLaunchEvidencePacketPreview"), "app.js is missing the top-level Governance Launch Evidence Packet preview.");
assert(app.includes("renderCommandGovernanceReviewerConsolePreview(model, autopilot)"), "Command Center is missing the Governance Reviewer Console preview.");
assert(app.includes("renderCommandGovernanceReviewerConsolePreview"), "app.js is missing the top-level Governance Reviewer Console preview.");
assert(app.includes("renderCommandGovernanceLaunchGateScorePreview(model, autopilot)"), "Command Center is missing the Governance Launch Gate Score preview.");
assert(app.includes("renderCommandGovernanceLaunchGateScorePreview"), "app.js is missing the top-level Governance Launch Gate Score preview.");
assert(app.includes("renderCommandGovernancePilotHandoffBoardPreview(model, autopilot)"), "Command Center is missing the Governance Pilot Handoff Board preview.");
assert(app.includes("renderCommandGovernancePilotHandoffBoardPreview"), "app.js is missing the top-level Governance Pilot Handoff Board preview.");
assert(app.includes("renderCommandGovernanceLaunchRehearsalRoomPreview(model, autopilot)"), "Command Center is missing the Governance Launch Rehearsal Room preview.");
assert(app.includes("renderCommandGovernanceLaunchRehearsalRoomPreview"), "app.js is missing the top-level Governance Launch Rehearsal Room preview.");
assert(app.includes("renderCommandGovernanceFirstPilotReadinessRoomPreview(model, autopilot)"), "Command Center is missing the Governance First Pilot Readiness Room preview.");
assert(app.includes("renderCommandGovernanceFirstPilotReadinessRoomPreview"), "app.js is missing the top-level Governance First Pilot Readiness Room preview.");
assert(app.includes("renderCommandGovernancePilotAcceptanceReceiptPreview(model, autopilot)"), "Command Center is missing the Governance Pilot Acceptance Receipt preview.");
assert(app.includes("renderCommandGovernancePilotAcceptanceReceiptPreview"), "app.js is missing the top-level Governance Pilot Acceptance Receipt preview.");
assert(app.includes("renderCommandGovernanceLaunchProofBoardPreview(model, autopilot)"), "Command Center is missing the Governance Launch Proof Board preview.");
assert(app.includes("renderCommandGovernanceLaunchProofBoardPreview"), "app.js is missing the top-level Governance Launch Proof Board preview.");
assert(app.includes("renderCommandGovernanceFirstPilotOperatingRhythmPreview(model, autopilot)"), "Command Center is missing the Governance First Pilot Operating Rhythm preview.");
assert(app.includes("renderCommandGovernanceFirstPilotOperatingRhythmPreview"), "app.js is missing the top-level Governance First Pilot Operating Rhythm preview.");
assert(app.includes("renderCommandGovernancePilotSponsorUpdatePreview(model, autopilot)"), "Command Center is missing the Governance Pilot Sponsor Update preview.");
assert(app.includes("renderCommandGovernancePilotSponsorUpdatePreview"), "app.js is missing the top-level Governance Pilot Sponsor Update preview.");
assert(app.includes("renderCommandGovernanceLaunchSupportDeskPreview(model, autopilot)"), "Command Center is missing the Governance Launch Support Desk preview.");
assert(app.includes("renderCommandGovernanceLaunchSupportDeskPreview"), "app.js is missing the top-level Governance Launch Support Desk preview.");
assert(app.includes("renderCommandGovernancePilotOutcomeLedgerPreview(model, autopilot)"), "Command Center is missing the Governance Pilot Outcome Ledger preview.");
assert(app.includes("renderCommandGovernancePilotOutcomeLedgerPreview"), "app.js is missing the top-level Governance Pilot Outcome Ledger preview.");
assert(app.includes("renderCommandGovernanceSponsorDecisionReceiptPreview(model, autopilot)"), "Command Center is missing the Governance Sponsor Decision Receipt preview.");
assert(app.includes("renderCommandGovernanceSponsorDecisionReceiptPreview"), "app.js is missing the top-level Governance Sponsor Decision Receipt preview.");
assert(app.includes("renderCommandGovernancePilotSupportCloseoutPreview(model, autopilot)"), "Command Center is missing the Governance Pilot Support Closeout preview.");
assert(app.includes("renderCommandGovernancePilotSupportCloseoutPreview"), "app.js is missing the top-level Governance Pilot Support Closeout preview.");
assert(app.includes("renderCommandGovernancePilotLearningReleasePreview(model, autopilot)"), "Command Center is missing the Governance Pilot Learning Release preview.");
assert(app.includes("renderCommandGovernancePilotLearningReleasePreview"), "app.js is missing the top-level Governance Pilot Learning Release preview.");
assert(app.includes("renderCommandGovernanceSponsorExpansionGatePreview(model, autopilot)"), "Command Center is missing the Governance Sponsor Expansion Gate preview.");
assert(app.includes("renderCommandGovernanceSponsorExpansionGatePreview"), "app.js is missing the top-level Governance Sponsor Expansion Gate preview.");
assert(app.includes("renderCommandGovernanceLaunchExpansionReceiptPreview(model, autopilot)"), "Command Center is missing the Governance Launch Expansion Receipt preview.");
assert(app.includes("renderCommandGovernanceLaunchExpansionReceiptPreview"), "app.js is missing the top-level Governance Launch Expansion Receipt preview.");
assert(app.includes("renderCommandGovernanceScaledRolloutBoardPreview(model, autopilot)"), "Command Center is missing the Governance Scaled Rollout Board preview.");
assert(app.includes("renderCommandGovernanceScaledRolloutBoardPreview"), "app.js is missing the top-level Governance Scaled Rollout Board preview.");
assert(app.includes("renderCommandGovernanceExpansionSupportDeskPreview(model, autopilot)"), "Command Center is missing the Governance Expansion Support Desk preview.");
assert(app.includes("renderCommandGovernanceExpansionSupportDeskPreview"), "app.js is missing the top-level Governance Expansion Support Desk preview.");
assert(app.includes("renderCommandGovernanceScaledRolloutProofBoardPreview(model, autopilot)"), "Command Center is missing the Governance Scaled Rollout Proof Board preview.");
assert(app.includes("renderCommandGovernanceScaledRolloutProofBoardPreview"), "app.js is missing the top-level Governance Scaled Rollout Proof Board preview.");
assert(app.includes("renderCommandGovernanceRolloutSponsorUpdatePreview(model, autopilot)"), "Command Center is missing the Governance Rollout Sponsor Update preview.");
assert(app.includes("renderCommandGovernanceRolloutSponsorUpdatePreview"), "app.js is missing the top-level Governance Rollout Sponsor Update preview.");
assert(app.includes("renderCommandGovernanceRolloutOutcomeLedgerPreview(model, autopilot)"), "Command Center is missing the Governance Rollout Outcome Ledger preview.");
assert(app.includes("renderCommandGovernanceRolloutOutcomeLedgerPreview"), "app.js is missing the top-level Governance Rollout Outcome Ledger preview.");
assert(app.includes("renderCommandGovernanceRolloutLearningReceiptPreview(model, autopilot)"), "Command Center is missing the Governance Rollout Learning Receipt preview.");
assert(app.includes("renderCommandGovernanceRolloutLearningReceiptPreview"), "app.js is missing the top-level Governance Rollout Learning Receipt preview.");
assert(app.includes("renderCommandGovernanceRolloutSponsorDecisionReceiptPreview(model, autopilot)"), "Command Center is missing the Governance Rollout Sponsor Decision Receipt preview.");
assert(app.includes("renderCommandGovernanceRolloutSponsorDecisionReceiptPreview"), "app.js is missing the top-level Governance Rollout Sponsor Decision Receipt preview.");
assert(app.includes("renderCommandGovernanceRolloutReuseGatePreview(model, autopilot)"), "Command Center is missing the Governance Rollout Reuse Gate preview.");
assert(app.includes("renderCommandGovernanceRolloutReuseGatePreview"), "app.js is missing the top-level Governance Rollout Reuse Gate preview.");
assert(app.includes("renderCommandGovernanceRolloutLearningReviewRoomPreview(model, autopilot)"), "Command Center is missing the Governance Rollout Learning Review Room preview.");
assert(app.includes("renderCommandGovernanceRolloutLearningReviewRoomPreview"), "app.js is missing the top-level Governance Rollout Learning Review Room preview.");
assert(app.includes("renderCommandGovernanceRolloutDecisionAuditPackPreview(model, autopilot)"), "Command Center is missing the Governance Rollout Decision Audit Pack preview.");
assert(app.includes("renderCommandGovernanceRolloutDecisionAuditPackPreview"), "app.js is missing the top-level Governance Rollout Decision Audit Pack preview.");
assert(app.includes("renderCommandGovernanceRolloutReuseActivationReceiptPreview(model, autopilot)"), "Command Center is missing the Governance Rollout Reuse Activation Receipt preview.");
assert(app.includes("renderCommandGovernanceRolloutReuseActivationReceiptPreview"), "app.js is missing the top-level Governance Rollout Reuse Activation Receipt preview.");
assert(app.includes("renderCommandGovernanceRolloutActivationOutcomeWatchPreview(model, autopilot)"), "Command Center is missing the Governance Rollout Activation Outcome Watch preview.");
assert(app.includes("renderCommandGovernanceRolloutActivationOutcomeWatchPreview"), "app.js is missing the top-level Governance Rollout Activation Outcome Watch preview.");
assert(app.includes("renderCommandGovernanceRolloutAuditCloseoutReceiptPreview(model, autopilot)"), "Command Center is missing the Governance Rollout Audit Closeout Receipt preview.");
assert(app.includes("renderCommandGovernanceRolloutAuditCloseoutReceiptPreview"), "app.js is missing the top-level Governance Rollout Audit Closeout Receipt preview.");
assert(app.includes("renderCommandGovernanceRolloutLaunchReadinessSealPreview(model, autopilot)"), "Command Center is missing the Governance Rollout Launch Readiness Seal preview.");
assert(app.includes("renderCommandGovernanceRolloutLaunchReadinessSealPreview"), "app.js is missing the top-level Governance Rollout Launch Readiness Seal preview.");
assert(app.includes("renderCommandGovernanceFirstPilotProofBridgePreview(model, autopilot)"), "Command Center is missing the Governance First Pilot Proof Bridge preview.");
assert(app.includes("renderCommandGovernanceFirstPilotProofBridgePreview"), "app.js is missing the top-level Governance First Pilot Proof Bridge preview.");
assert(app.includes("renderCommandGovernanceFirstPilotCommandRoomPreview(model, autopilot)"), "Command Center is missing the Governance First Pilot Command Room preview.");
assert(app.includes("renderCommandGovernanceFirstPilotCommandRoomPreview"), "app.js is missing the top-level Governance First Pilot Command Room preview.");
assert(app.includes("renderCommandGovernanceFirstPilotOutcomeWatchPreview(model, autopilot)"), "Command Center is missing the Governance First Pilot Outcome Watch preview.");
assert(app.includes("renderCommandGovernanceFirstPilotOutcomeWatchPreview"), "app.js is missing the top-level Governance First Pilot Outcome Watch preview.");
assert(app.includes("renderCommandGovernanceFirstPilotSupportReceiptPreview(model, autopilot)"), "Command Center is missing the Governance First Pilot Support Receipt preview.");
assert(app.includes("renderCommandGovernanceFirstPilotSupportReceiptPreview"), "app.js is missing the top-level Governance First Pilot Support Receipt preview.");
assert(app.includes("renderCommandGovernanceFirstPilotLearningRoomPreview(model, autopilot)"), "Command Center is missing the Governance First Pilot Learning Room preview.");
assert(app.includes("renderCommandGovernanceFirstPilotLearningRoomPreview"), "app.js is missing the top-level Governance First Pilot Learning Room preview.");
assert(app.includes("renderCommandGovernanceFirstPilotExpansionDecisionPreview(model, autopilot)"), "Command Center is missing the Governance First Pilot Expansion Decision preview.");
assert(app.includes("renderCommandGovernanceFirstPilotExpansionDecisionPreview"), "app.js is missing the top-level Governance First Pilot Expansion Decision preview.");
assert(app.includes("renderCommandGovernanceSecondPilotReadinessPreview(model, autopilot)"), "Command Center is missing the Governance Second Pilot Readiness preview.");
assert(app.includes("renderCommandGovernanceSecondPilotReadinessPreview"), "app.js is missing the top-level Governance Second Pilot Readiness preview.");
assert(app.includes("renderCommandGovernanceSecondPilotLaunchRoomPreview(model, autopilot)"), "Command Center is missing the Governance Second Pilot Launch Room preview.");
assert(app.includes("renderCommandGovernanceSecondPilotLaunchRoomPreview"), "app.js is missing the top-level Governance Second Pilot Launch Room preview.");
assert(app.includes("renderCommandGovernanceSecondPilotOutcomeWatchPreview(model, autopilot)"), "Command Center is missing the Governance Second Pilot Outcome Watch preview.");
assert(app.includes("renderCommandGovernanceSecondPilotOutcomeWatchPreview"), "app.js is missing the top-level Governance Second Pilot Outcome Watch preview.");
assert(app.includes("renderCommandGovernanceSecondPilotSupportReceiptPreview(model, autopilot)"), "Command Center is missing the Governance Second Pilot Support Receipt preview.");
assert(app.includes("renderCommandGovernanceSecondPilotSupportReceiptPreview"), "app.js is missing the top-level Governance Second Pilot Support Receipt preview.");
assert(app.includes("renderCommandGovernanceSecondPilotLearningRoomPreview(model, autopilot)"), "Command Center is missing the Governance Second Pilot Learning Room preview.");
assert(app.includes("renderCommandGovernanceSecondPilotLearningRoomPreview"), "app.js is missing the top-level Governance Second Pilot Learning Room preview.");
assert(app.includes("renderCommandGovernanceSecondPilotExpansionGatePreview(model, autopilot)"), "Command Center is missing the Governance Second Pilot Expansion Gate preview.");
assert(app.includes("renderCommandGovernanceSecondPilotExpansionGatePreview"), "app.js is missing the top-level Governance Second Pilot Expansion Gate preview.");
assert(app.includes("renderCommandGovernanceSecondPilotDecisionAuditPackPreview(model, autopilot)"), "Command Center is missing the Governance Second Pilot Decision Audit Pack preview.");
assert(app.includes("renderCommandGovernanceSecondPilotDecisionAuditPackPreview"), "app.js is missing the top-level Governance Second Pilot Decision Audit Pack preview.");
assert(app.includes("renderCommandGovernanceSecondPilotReuseActivationPreview(model, autopilot)"), "Command Center is missing the Governance Second Pilot Reuse Activation preview.");
assert(app.includes("renderCommandGovernanceSecondPilotReuseActivationPreview"), "app.js is missing the top-level Governance Second Pilot Reuse Activation preview.");
assert(app.includes("renderCommandGovernanceSecondPilotActivationOutcomeWatchPreview(model, autopilot)"), "Command Center is missing the Governance Second Pilot Activation Outcome Watch preview.");
assert(app.includes("renderCommandGovernanceSecondPilotActivationOutcomeWatchPreview"), "app.js is missing the top-level Governance Second Pilot Activation Outcome Watch preview.");
assert(app.includes("renderCommandGovernanceSecondPilotAuditCloseoutReceiptPreview(model, autopilot)"), "Command Center is missing the Governance Second Pilot Audit Closeout Receipt preview.");
assert(app.includes("renderCommandGovernanceSecondPilotAuditCloseoutReceiptPreview"), "app.js is missing the top-level Governance Second Pilot Audit Closeout Receipt preview.");
assert(app.includes("renderCommandGovernanceSecondPilotLaunchReadinessSealPreview(model, autopilot)"), "Command Center is missing the Governance Second Pilot Launch Readiness Seal preview.");
assert(app.includes("renderCommandGovernanceSecondPilotLaunchReadinessSealPreview"), "app.js is missing the top-level Governance Second Pilot Launch Readiness Seal preview.");
assert(app.includes("renderCommandGovernanceSecondPilotSupportReadinessCloseoutPreview(model, autopilot)"), "Command Center is missing the Governance Second Pilot Support Readiness Closeout preview.");
assert(app.includes("renderCommandGovernanceSecondPilotSupportReadinessCloseoutPreview"), "app.js is missing the top-level Governance Second Pilot Support Readiness Closeout preview.");
assert(app.includes("renderCommandGovernanceSecondPilotLaunchHandoffPackPreview(model, autopilot)"), "Command Center is missing the Governance Second Pilot Launch Handoff Pack preview.");
assert(app.includes("renderCommandGovernanceSecondPilotLaunchHandoffPackPreview"), "app.js is missing the top-level Governance Second Pilot Launch Handoff Pack preview.");
assert(app.includes("renderCommandGovernanceSecondPilotFirstReviewBridgePreview(model, autopilot)"), "Command Center is missing the Governance Second Pilot First Review Bridge preview.");
assert(app.includes("renderCommandGovernanceSecondPilotFirstReviewBridgePreview"), "app.js is missing the top-level Governance Second Pilot First Review Bridge preview.");
assert(app.includes("renderCommandGovernanceSecondPilotFirstReviewOutcomeWatchPreview(model, autopilot)"), "Command Center is missing the Governance Second Pilot First Review Outcome Watch preview.");
assert(app.includes("renderCommandGovernanceSecondPilotFirstReviewOutcomeWatchPreview"), "app.js is missing the top-level Governance Second Pilot First Review Outcome Watch preview.");
assert(app.includes("renderCommandGovernanceSecondPilotReviewLearningReceiptPreview(model, autopilot)"), "Command Center is missing the Governance Second Pilot Review Learning Receipt preview.");
assert(app.includes("renderCommandGovernanceSecondPilotReviewLearningReceiptPreview"), "app.js is missing the top-level Governance Second Pilot Review Learning Receipt preview.");
assert(app.includes("renderCommandGovernanceSecondPilotExpansionDecisionReceiptPreview(model, autopilot)"), "Command Center is missing the Governance Second Pilot Expansion Decision Receipt preview.");
assert(app.includes("renderCommandGovernanceSecondPilotExpansionDecisionReceiptPreview"), "app.js is missing the top-level Governance Second Pilot Expansion Decision Receipt preview.");
assert(app.includes("renderCommandGovernanceSecondPilotExpansionReadinessRoomPreview(model, autopilot)"), "Command Center is missing the Governance Second Pilot Expansion Readiness Room preview.");
assert(app.includes("renderCommandGovernanceSecondPilotExpansionReadinessRoomPreview"), "app.js is missing the top-level Governance Second Pilot Expansion Readiness Room preview.");
assert(app.includes("renderCommandGovernanceSecondPilotExpansionLaunchHandoffPreview(model, autopilot)"), "Command Center is missing the Governance Second Pilot Expansion Launch Handoff preview.");
assert(app.includes("renderCommandGovernanceSecondPilotExpansionLaunchHandoffPreview"), "app.js is missing the top-level Governance Second Pilot Expansion Launch Handoff preview.");
assert(app.includes("renderCommandGovernanceSecondPilotExpansionOutcomeWatchPreview(model, autopilot)"), "Command Center is missing the Governance Second Pilot Expansion Outcome Watch preview.");
assert(app.includes("renderCommandGovernanceSecondPilotExpansionOutcomeWatchPreview"), "app.js is missing the top-level Governance Second Pilot Expansion Outcome Watch preview.");
assert(app.includes("renderCommandGovernanceSecondPilotExpansionLearningHandoffPreview(model, autopilot)"), "Command Center is missing the Governance Second Pilot Expansion Learning Handoff preview.");
assert(app.includes("renderCommandGovernanceSecondPilotExpansionLearningHandoffPreview"), "app.js is missing the top-level Governance Second Pilot Expansion Learning Handoff preview.");
assert(app.includes("renderCommandGovernanceSecondPilotExpansionSupportReceiptPreview(model, autopilot)"), "Command Center is missing the Governance Second Pilot Expansion Support Receipt preview.");
assert(app.includes("renderCommandGovernanceSecondPilotExpansionSupportReceiptPreview"), "app.js is missing the top-level Governance Second Pilot Expansion Support Receipt preview.");
assert(app.includes("renderCommandGovernanceSecondPilotExpansionWiderLaunchGatePreview(model, autopilot)"), "Command Center is missing the Governance Second Pilot Expansion Wider Launch Gate preview.");
assert(app.includes("renderCommandGovernanceSecondPilotExpansionWiderLaunchGatePreview"), "app.js is missing the top-level Governance Second Pilot Expansion Wider Launch Gate preview.");
assert(app.includes("renderCommandGovernanceSecondPilotExpansionWiderLaunchDecisionReceiptPreview(model, autopilot)"), "Command Center is missing the Governance Second Pilot Expansion Wider Launch Decision Receipt preview.");
assert(app.includes("renderCommandGovernanceSecondPilotExpansionWiderLaunchDecisionReceiptPreview"), "app.js is missing the top-level Governance Second Pilot Expansion Wider Launch Decision Receipt preview.");
assert(app.includes("renderCommandGovernanceSecondPilotExpansionWiderLaunchReleaseRoomPreview(model, autopilot)"), "Command Center is missing the Governance Second Pilot Expansion Wider Launch Release Room preview.");
assert(app.includes("renderCommandGovernanceSecondPilotExpansionWiderLaunchReleaseRoomPreview"), "app.js is missing the top-level Governance Second Pilot Expansion Wider Launch Release Room preview.");
assert(app.includes("renderCommandGovernanceSecondPilotExpansionWiderLaunchOutcomeWatchPreview(model, autopilot)"), "Command Center is missing the Governance Second Pilot Expansion Wider Launch Outcome Watch preview.");
assert(app.includes("renderCommandGovernanceSecondPilotExpansionWiderLaunchOutcomeWatchPreview"), "app.js is missing the top-level Governance Second Pilot Expansion Wider Launch Outcome Watch preview.");
assert(app.includes("renderCommandGovernanceSecondPilotExpansionWiderLaunchLearningReceiptPreview(model, autopilot)"), "Command Center is missing the Governance Second Pilot Expansion Wider Launch Learning Receipt preview.");
assert(app.includes("renderCommandGovernanceSecondPilotExpansionWiderLaunchLearningReceiptPreview"), "app.js is missing the top-level Governance Second Pilot Expansion Wider Launch Learning Receipt preview.");
assert(app.includes("renderCommandGovernanceSecondPilotExpansionWiderLaunchMarketReadinessGatePreview(model, autopilot)"), "Command Center is missing the Governance Second Pilot Expansion Wider Launch Market Readiness Gate preview.");
assert(app.includes("renderCommandGovernanceSecondPilotExpansionWiderLaunchMarketReadinessGatePreview"), "app.js is missing the top-level Governance Second Pilot Expansion Wider Launch Market Readiness Gate preview.");
assert(app.includes("renderCommandGovernanceSecondPilotExpansionWiderLaunchLaunchReadinessLedgerPreview(model, autopilot)"), "Command Center is missing the Governance Second Pilot Expansion Wider Launch Launch-Readiness Ledger preview.");
assert(app.includes("renderCommandGovernanceSecondPilotExpansionWiderLaunchLaunchReadinessLedgerPreview"), "app.js is missing the top-level Governance Second Pilot Expansion Wider Launch Launch-Readiness Ledger preview.");
assert(app.includes("renderCommandGovernanceSecondPilotExpansionWiderLaunchExpansionCouncilPreview(model, autopilot)"), "Command Center is missing the Governance Second Pilot Expansion Wider Launch Expansion Council preview.");
assert(app.includes("renderCommandGovernanceSecondPilotExpansionWiderLaunchExpansionCouncilPreview"), "app.js is missing the top-level Governance Second Pilot Expansion Wider Launch Expansion Council preview.");
assert(app.includes("renderCommandGovernanceSecondPilotExpansionWiderLaunchMarketLaunchRoomPreview(model, autopilot)"), "Command Center is missing the Governance Second Pilot Expansion Wider Launch Market Launch Room preview.");
assert(app.includes("renderCommandGovernanceSecondPilotExpansionWiderLaunchMarketLaunchRoomPreview"), "app.js is missing the top-level Governance Second Pilot Expansion Wider Launch Market Launch Room preview.");
assert(app.includes("renderCommandGovernanceSecondPilotExpansionWiderLaunchBuyerLaunchPackPreview(model, autopilot)"), "Command Center is missing the Governance Second Pilot Expansion Wider Launch Buyer Launch Pack preview.");
assert(app.includes("renderCommandGovernanceSecondPilotExpansionWiderLaunchBuyerLaunchPackPreview"), "app.js is missing the top-level Governance Second Pilot Expansion Wider Launch Buyer Launch Pack preview.");
assert(app.includes("renderCommandGovernanceSecondPilotExpansionWiderLaunchCouncilMinutesPreview(model, autopilot)"), "Command Center is missing the Governance Second Pilot Expansion Wider Launch Council Minutes preview.");
assert(app.includes("renderCommandGovernanceSecondPilotExpansionWiderLaunchCouncilMinutesPreview"), "app.js is missing the top-level Governance Second Pilot Expansion Wider Launch Council Minutes preview.");
assert(app.includes("renderCommandGovernanceSecondPilotExpansionWiderLaunchHandoffReceiptPreview(model, autopilot)"), "Command Center is missing the Governance Second Pilot Expansion Wider Launch Handoff Receipt preview.");
assert(app.includes("renderCommandGovernanceSecondPilotExpansionWiderLaunchHandoffReceiptPreview"), "app.js is missing the top-level Governance Second Pilot Expansion Wider Launch Handoff Receipt preview.");
assert(app.includes("renderCommandGovernanceSecondPilotExpansionWiderLaunchBuyerResponseWatchPreview(model, autopilot)"), "Command Center is missing the Governance Second Pilot Expansion Wider Launch Buyer Response Watch preview.");
assert(app.includes("renderCommandGovernanceSecondPilotExpansionWiderLaunchBuyerResponseWatchPreview"), "app.js is missing the top-level Governance Second Pilot Expansion Wider Launch Buyer Response Watch preview.");
assert(app.includes("renderCommandGovernanceSecondPilotExpansionWiderLaunchMinutesApprovalReceiptPreview(model, autopilot)"), "Command Center is missing the Governance Second Pilot Expansion Wider Launch Minutes Approval Receipt preview.");
assert(app.includes("renderCommandGovernanceSecondPilotExpansionWiderLaunchMinutesApprovalReceiptPreview"), "app.js is missing the top-level Governance Second Pilot Expansion Wider Launch Minutes Approval Receipt preview.");
assert(app.includes("renderCommandGovernanceSecondPilotExpansionWiderLaunchHandoffOutcomeReceiptPreview(model, autopilot)"), "Command Center is missing the Governance Second Pilot Expansion Wider Launch Handoff Outcome Receipt preview.");
assert(app.includes("renderCommandGovernanceSecondPilotExpansionWiderLaunchHandoffOutcomeReceiptPreview"), "app.js is missing the top-level Governance Second Pilot Expansion Wider Launch Handoff Outcome Receipt preview.");
assert(app.includes("renderCommandGovernanceSecondPilotExpansionWiderLaunchMarketResponseLearningReceiptPreview(model, autopilot)"), "Command Center is missing the Governance Second Pilot Expansion Wider Launch Market Response Learning Receipt preview.");
assert(app.includes("renderCommandGovernanceSecondPilotExpansionWiderLaunchMarketResponseLearningReceiptPreview"), "app.js is missing the top-level Governance Second Pilot Expansion Wider Launch Market Response Learning Receipt preview.");
assert(app.includes("renderCommandGovernanceSecondPilotExpansionWiderLaunchApprovalOutcomeMonitorPreview(model, autopilot)"), "Command Center is missing the Governance Second Pilot Expansion Wider Launch Approval Outcome Monitor preview.");
assert(app.includes("renderCommandGovernanceSecondPilotExpansionWiderLaunchApprovalOutcomeMonitorPreview"), "app.js is missing the top-level Governance Second Pilot Expansion Wider Launch Approval Outcome Monitor preview.");
assert(app.includes("renderCommandGovernanceSecondPilotExpansionWiderLaunchApprovalCloseoutReceiptPreview(model, autopilot)"), "Command Center is missing the Governance Second Pilot Expansion Wider Launch Approval Closeout Receipt preview.");
assert(app.includes("renderCommandGovernanceSecondPilotExpansionWiderLaunchApprovalCloseoutReceiptPreview"), "app.js is missing the top-level Governance Second Pilot Expansion Wider Launch Approval Closeout Receipt preview.");
assert(app.includes("renderCommandGovernanceSecondPilotExpansionWiderLaunchNextMarketActionReceiptPreview(model, autopilot)"), "Command Center is missing the Governance Second Pilot Expansion Wider Launch Next-Market Action Receipt preview.");
assert(app.includes("renderCommandGovernanceSecondPilotExpansionWiderLaunchNextMarketActionReceiptPreview"), "app.js is missing the top-level Governance Second Pilot Expansion Wider Launch Next-Market Action Receipt preview.");
assert(app.includes("renderCommandGovernanceSecondPilotExpansionWiderLaunchMarketLearningReuseGatePreview(model, autopilot)"), "Command Center is missing the Governance Second Pilot Expansion Wider Launch Market Learning Reuse Gate preview.");
assert(app.includes("renderCommandGovernanceSecondPilotExpansionWiderLaunchMarketLearningReuseGatePreview"), "app.js is missing the top-level Governance Second Pilot Expansion Wider Launch Market Learning Reuse Gate preview.");
assert(app.includes("renderCommandGovernanceSecondPilotExpansionWiderLaunchCloseoutArchivePreview(model, autopilot)"), "Command Center is missing the Governance Second Pilot Expansion Wider Launch Closeout Archive preview.");
assert(app.includes("renderCommandGovernanceSecondPilotExpansionWiderLaunchCloseoutArchivePreview"), "app.js is missing the top-level Governance Second Pilot Expansion Wider Launch Closeout Archive preview.");
assert(app.includes("buildCommandGuidanceSignoffLoopGovernance"), "app.js is missing the Signoff Loop Governance model.");
assert(app.includes("buildCommandGuidanceTrendLoopGovernance"), "app.js is missing the Trend Loop Governance model.");
assert(app.includes("buildCommandGuidanceAppealLoopGovernance"), "app.js is missing the Appeal Loop Governance model.");
assert(app.includes("buildCommandGuidanceGovernanceReleaseReceipt"), "app.js is missing the Governance Release Receipt model.");
assert(app.includes("buildCommandGuidanceGovernanceOutcomeMonitor"), "app.js is missing the Governance Outcome Monitor model.");
assert(app.includes("buildCommandGuidanceGovernanceRollbackLane"), "app.js is missing the Governance Rollback Lane model.");
assert(app.includes("buildCommandGuidanceGovernanceReleaseArchive"), "app.js is missing the Governance Release Archive model.");
assert(app.includes("buildCommandGuidanceGovernanceProofRepairQueue"), "app.js is missing the Governance Proof Repair Queue model.");
assert(app.includes("buildCommandGuidanceGovernanceCalmCloseout"), "app.js is missing the Governance Calm Closeout model.");
assert(app.includes("buildCommandGuidanceGovernanceAuditExport"), "app.js is missing the Governance Audit Export model.");
assert(app.includes("buildCommandGuidanceGovernanceProofSla"), "app.js is missing the Governance Proof SLA model.");
assert(app.includes("buildCommandGuidanceGovernanceLaunchEvidencePacket"), "app.js is missing the Governance Launch Evidence Packet model.");
assert(app.includes("buildCommandGuidanceGovernanceReviewerConsole"), "app.js is missing the Governance Reviewer Console model.");
assert(app.includes("buildCommandGuidanceGovernanceLaunchGateScore"), "app.js is missing the Governance Launch Gate Score model.");
assert(app.includes("buildCommandGuidanceGovernancePilotHandoffBoard"), "app.js is missing the Governance Pilot Handoff Board model.");
assert(app.includes("buildCommandGuidanceGovernanceLaunchRehearsalRoom"), "app.js is missing the Governance Launch Rehearsal Room model.");
assert(app.includes("buildCommandGuidanceGovernanceFirstPilotReadinessRoom"), "app.js is missing the Governance First Pilot Readiness Room model.");
assert(app.includes("buildCommandGuidanceGovernancePilotAcceptanceReceipt"), "app.js is missing the Governance Pilot Acceptance Receipt model.");
assert(app.includes("buildCommandGuidanceGovernanceLaunchProofBoard"), "app.js is missing the Governance Launch Proof Board model.");
assert(app.includes("buildCommandGuidanceGovernanceFirstPilotOperatingRhythm"), "app.js is missing the Governance First Pilot Operating Rhythm model.");
assert(app.includes("buildCommandGuidanceGovernancePilotSponsorUpdate"), "app.js is missing the Governance Pilot Sponsor Update model.");
assert(app.includes("buildCommandGuidanceGovernanceLaunchSupportDesk"), "app.js is missing the Governance Launch Support Desk model.");
assert(app.includes("buildCommandGuidanceGovernancePilotOutcomeLedger"), "app.js is missing the Governance Pilot Outcome Ledger model.");
assert(app.includes("buildCommandGuidanceGovernanceSponsorDecisionReceipt"), "app.js is missing the Governance Sponsor Decision Receipt model.");
assert(app.includes("buildCommandGuidanceGovernancePilotSupportCloseout"), "app.js is missing the Governance Pilot Support Closeout model.");
assert(app.includes("buildCommandGuidanceGovernancePilotLearningRelease"), "app.js is missing the Governance Pilot Learning Release model.");
assert(app.includes("buildCommandGuidanceGovernanceSponsorExpansionGate"), "app.js is missing the Governance Sponsor Expansion Gate model.");
assert(app.includes("buildCommandGuidanceGovernanceLaunchExpansionReceipt"), "app.js is missing the Governance Launch Expansion Receipt model.");
assert(app.includes("buildCommandGuidanceGovernanceScaledRolloutBoard"), "app.js is missing the Governance Scaled Rollout Board model.");
assert(app.includes("buildCommandGuidanceGovernanceExpansionSupportDesk"), "app.js is missing the Governance Expansion Support Desk model.");
assert(app.includes("buildCommandGuidanceGovernanceScaledRolloutProofBoard"), "app.js is missing the Governance Scaled Rollout Proof Board model.");
assert(app.includes("buildCommandGuidanceGovernanceRolloutSponsorUpdate"), "app.js is missing the Governance Rollout Sponsor Update model.");
assert(app.includes("buildCommandGuidanceGovernanceRolloutOutcomeLedger"), "app.js is missing the Governance Rollout Outcome Ledger model.");
assert(app.includes("buildCommandGuidanceGovernanceRolloutLearningReceipt"), "app.js is missing the Governance Rollout Learning Receipt model.");
assert(app.includes("buildCommandGuidanceGovernanceRolloutSponsorDecisionReceipt"), "app.js is missing the Governance Rollout Sponsor Decision Receipt model.");
assert(app.includes("buildCommandGuidanceGovernanceRolloutReuseGate"), "app.js is missing the Governance Rollout Reuse Gate model.");
assert(app.includes("buildCommandGuidanceGovernanceRolloutLearningReviewRoom"), "app.js is missing the Governance Rollout Learning Review Room model.");
assert(app.includes("buildCommandGuidanceGovernanceRolloutDecisionAuditPack"), "app.js is missing the Governance Rollout Decision Audit Pack model.");
assert(app.includes("buildCommandGuidanceGovernanceRolloutReuseActivationReceipt"), "app.js is missing the Governance Rollout Reuse Activation Receipt model.");
assert(app.includes("buildCommandGuidanceGovernanceRolloutActivationOutcomeWatch"), "app.js is missing the Governance Rollout Activation Outcome Watch model.");
assert(app.includes("buildCommandGuidanceGovernanceRolloutAuditCloseoutReceipt"), "app.js is missing the Governance Rollout Audit Closeout Receipt model.");
assert(app.includes("buildCommandGuidanceGovernanceRolloutLaunchReadinessSeal"), "app.js is missing the Governance Rollout Launch Readiness Seal model.");
assert(app.includes("buildCommandGuidanceGovernanceFirstPilotProofBridge"), "app.js is missing the Governance First Pilot Proof Bridge model.");
assert(app.includes("buildCommandGuidanceGovernanceFirstPilotCommandRoom"), "app.js is missing the Governance First Pilot Command Room model.");
assert(app.includes("buildCommandGuidanceGovernanceFirstPilotOutcomeWatch"), "app.js is missing the Governance First Pilot Outcome Watch model.");
assert(app.includes("buildCommandGuidanceGovernanceFirstPilotSupportReceipt"), "app.js is missing the Governance First Pilot Support Receipt model.");
assert(app.includes("buildCommandGuidanceGovernanceFirstPilotLearningRoom"), "app.js is missing the Governance First Pilot Learning Room model.");
assert(app.includes("buildCommandGuidanceGovernanceFirstPilotExpansionDecision"), "app.js is missing the Governance First Pilot Expansion Decision model.");
assert(app.includes("buildCommandGuidanceGovernanceSecondPilotReadiness"), "app.js is missing the Governance Second Pilot Readiness model.");
assert(app.includes("buildCommandGuidanceGovernanceSecondPilotLaunchRoom"), "app.js is missing the Governance Second Pilot Launch Room model.");
assert(app.includes("buildCommandGuidanceGovernanceSecondPilotOutcomeWatch"), "app.js is missing the Governance Second Pilot Outcome Watch model.");
assert(app.includes("buildCommandGuidanceGovernanceSecondPilotSupportReceipt"), "app.js is missing the Governance Second Pilot Support Receipt model.");
assert(app.includes("buildCommandGuidanceGovernanceSecondPilotLearningRoom"), "app.js is missing the Governance Second Pilot Learning Room model.");
assert(app.includes("buildCommandGuidanceGovernanceSecondPilotExpansionGate"), "app.js is missing the Governance Second Pilot Expansion Gate model.");
assert(app.includes("buildCommandGuidanceGovernanceSecondPilotDecisionAuditPack"), "app.js is missing the Governance Second Pilot Decision Audit Pack model.");
assert(app.includes("buildCommandGuidanceGovernanceSecondPilotReuseActivation"), "app.js is missing the Governance Second Pilot Reuse Activation model.");
assert(app.includes("buildCommandGuidanceGovernanceSecondPilotActivationOutcomeWatch"), "app.js is missing the Governance Second Pilot Activation Outcome Watch model.");
assert(app.includes("buildCommandGuidanceGovernanceSecondPilotAuditCloseoutReceipt"), "app.js is missing the Governance Second Pilot Audit Closeout Receipt model.");
assert(app.includes("buildCommandGuidanceGovernanceSecondPilotLaunchReadinessSeal"), "app.js is missing the Governance Second Pilot Launch Readiness Seal model.");
assert(app.includes("buildCommandGuidanceGovernanceSecondPilotSupportReadinessCloseout"), "app.js is missing the Governance Second Pilot Support Readiness Closeout model.");
assert(app.includes("buildCommandGuidanceGovernanceSecondPilotLaunchHandoffPack"), "app.js is missing the Governance Second Pilot Launch Handoff Pack model.");
assert(app.includes("buildCommandGuidanceGovernanceSecondPilotFirstReviewBridge"), "app.js is missing the Governance Second Pilot First Review Bridge model.");
assert(app.includes("buildCommandGuidanceGovernanceSecondPilotFirstReviewOutcomeWatch"), "app.js is missing the Governance Second Pilot First Review Outcome Watch model.");
assert(app.includes("buildCommandGuidanceGovernanceSecondPilotReviewLearningReceipt"), "app.js is missing the Governance Second Pilot Review Learning Receipt model.");
assert(app.includes("buildCommandGuidanceGovernanceSecondPilotExpansionDecisionReceipt"), "app.js is missing the Governance Second Pilot Expansion Decision Receipt model.");
assert(app.includes("buildCommandGuidanceGovernanceSecondPilotExpansionReadinessRoom"), "app.js is missing the Governance Second Pilot Expansion Readiness Room model.");
assert(app.includes("buildCommandGuidanceGovernanceSecondPilotExpansionLaunchHandoff"), "app.js is missing the Governance Second Pilot Expansion Launch Handoff model.");
assert(app.includes("buildCommandGuidanceGovernanceSecondPilotExpansionOutcomeWatch"), "app.js is missing the Governance Second Pilot Expansion Outcome Watch model.");
assert(app.includes("buildCommandGuidanceGovernanceSecondPilotExpansionLearningHandoff"), "app.js is missing the Governance Second Pilot Expansion Learning Handoff model.");
assert(app.includes("buildCommandGuidanceGovernanceSecondPilotExpansionSupportReceipt"), "app.js is missing the Governance Second Pilot Expansion Support Receipt model.");
assert(app.includes("buildCommandGuidanceGovernanceSecondPilotExpansionWiderLaunchGate"), "app.js is missing the Governance Second Pilot Expansion Wider Launch Gate model.");
assert(app.includes("buildCommandGuidanceGovernanceSecondPilotExpansionWiderLaunchDecisionReceipt"), "app.js is missing the Governance Second Pilot Expansion Wider Launch Decision Receipt model.");
assert(app.includes("buildCommandGuidanceGovernanceSecondPilotExpansionWiderLaunchReleaseRoom"), "app.js is missing the Governance Second Pilot Expansion Wider Launch Release Room model.");
assert(app.includes("buildCommandGuidanceGovernanceSecondPilotExpansionWiderLaunchOutcomeWatch"), "app.js is missing the Governance Second Pilot Expansion Wider Launch Outcome Watch model.");
assert(app.includes("buildCommandGuidanceGovernanceSecondPilotExpansionWiderLaunchLearningReceipt"), "app.js is missing the Governance Second Pilot Expansion Wider Launch Learning Receipt model.");
assert(app.includes("buildCommandGuidanceGovernanceSecondPilotExpansionWiderLaunchMarketReadinessGate"), "app.js is missing the Governance Second Pilot Expansion Wider Launch Market Readiness Gate model.");
assert(app.includes("buildCommandGuidanceGovernanceSecondPilotExpansionWiderLaunchLaunchReadinessLedger"), "app.js is missing the Governance Second Pilot Expansion Wider Launch Launch-Readiness Ledger model.");
assert(app.includes("buildCommandGuidanceGovernanceSecondPilotExpansionWiderLaunchExpansionCouncil"), "app.js is missing the Governance Second Pilot Expansion Wider Launch Expansion Council model.");
assert(app.includes("buildCommandGuidanceGovernanceSecondPilotExpansionWiderLaunchMarketLaunchRoom"), "app.js is missing the Governance Second Pilot Expansion Wider Launch Market Launch Room model.");
assert(app.includes("buildCommandGuidanceGovernanceSecondPilotExpansionWiderLaunchBuyerLaunchPack"), "app.js is missing the Governance Second Pilot Expansion Wider Launch Buyer Launch Pack model.");
assert(app.includes("buildCommandGuidanceGovernanceSecondPilotExpansionWiderLaunchCouncilMinutes"), "app.js is missing the Governance Second Pilot Expansion Wider Launch Council Minutes model.");
assert(app.includes("buildCommandGuidanceGovernanceSecondPilotExpansionWiderLaunchHandoffReceipt"), "app.js is missing the Governance Second Pilot Expansion Wider Launch Handoff Receipt model.");
assert(app.includes("buildCommandGuidanceGovernanceSecondPilotExpansionWiderLaunchBuyerResponseWatch"), "app.js is missing the Governance Second Pilot Expansion Wider Launch Buyer Response Watch model.");
assert(app.includes("buildCommandGuidanceGovernanceSecondPilotExpansionWiderLaunchMinutesApprovalReceipt"), "app.js is missing the Governance Second Pilot Expansion Wider Launch Minutes Approval Receipt model.");
assert(app.includes("buildCommandGuidanceGovernanceSecondPilotExpansionWiderLaunchHandoffOutcomeReceipt"), "app.js is missing the Governance Second Pilot Expansion Wider Launch Handoff Outcome Receipt model.");
assert(app.includes("buildCommandGuidanceGovernanceSecondPilotExpansionWiderLaunchMarketResponseLearningReceipt"), "app.js is missing the Governance Second Pilot Expansion Wider Launch Market Response Learning Receipt model.");
assert(app.includes("buildCommandGuidanceGovernanceSecondPilotExpansionWiderLaunchApprovalOutcomeMonitor"), "app.js is missing the Governance Second Pilot Expansion Wider Launch Approval Outcome Monitor model.");
assert(app.includes("buildCommandGuidanceGovernanceSecondPilotExpansionWiderLaunchApprovalCloseoutReceipt"), "app.js is missing the Governance Second Pilot Expansion Wider Launch Approval Closeout Receipt model.");
assert(app.includes("buildCommandGuidanceGovernanceSecondPilotExpansionWiderLaunchNextMarketActionReceipt"), "app.js is missing the Governance Second Pilot Expansion Wider Launch Next-Market Action Receipt model.");
assert(app.includes("buildCommandGuidanceGovernanceSecondPilotExpansionWiderLaunchMarketLearningReuseGate"), "app.js is missing the Governance Second Pilot Expansion Wider Launch Market Learning Reuse Gate model.");
assert(app.includes("buildCommandGuidanceGovernanceSecondPilotExpansionWiderLaunchCloseoutArchive"), "app.js is missing the Governance Second Pilot Expansion Wider Launch Closeout Archive model.");
assert(app.includes("Proof acceptance"), "Buyer Response Watch should track proof acceptance.");
assert(app.includes("Support asks"), "Buyer Response Watch should track support asks.");
assert(app.includes("Rollback concerns"), "Buyer Response Watch should track rollback concerns.");
assert(app.includes("Sponsor movement"), "Buyer Response Watch should track sponsor movement.");
assert(app.includes("Country narrative"), "Buyer Response Watch should track country narrative.");
assert(app.includes("Signoff owner"), "Minutes Approval Receipt should track the signoff owner.");
assert(app.includes("Accepted gaps"), "Minutes Approval Receipt should track accepted gaps.");
assert(app.includes("Buyer-safe archive"), "Minutes Approval Receipt should track buyer-safe archive.");
assert(app.includes("Rollback memory"), "Minutes Approval Receipt should track rollback memory.");
assert(app.includes("Next-market approval window"), "Minutes Approval Receipt should track next-market approval window.");
assert(app.includes("Buyer response"), "Handoff Outcome Receipt should track buyer response.");
assert(app.includes("Proof acceptance"), "Handoff Outcome Receipt should track proof acceptance.");
assert(app.includes("Support asks"), "Handoff Outcome Receipt should track support asks.");
assert(app.includes("Rollback signal"), "Handoff Outcome Receipt should track rollback signal.");
assert(app.includes("Sponsor movement"), "Handoff Outcome Receipt should track sponsor movement.");
assert(app.includes("Next-market action"), "Handoff Outcome Receipt should track next-market action.");
assert(app.includes("Proof accepted"), "Market Response Learning Receipt should track accepted proof.");
assert(app.includes("Support routed"), "Market Response Learning Receipt should track routed support.");
assert(app.includes("Rollback closed"), "Market Response Learning Receipt should track rollback closure.");
assert(app.includes("Country narrative repair"), "Market Response Learning Receipt should track country narrative repair.");
assert(app.includes("Next-market guidance"), "Market Response Learning Receipt should track next-market guidance.");
assert(app.includes("Signoff movement"), "Approval Outcome Monitor should track signoff movement.");
assert(app.includes("Accepted-gap closure"), "Approval Outcome Monitor should track accepted-gap closure.");
assert(app.includes("Archive safety"), "Approval Outcome Monitor should track archive safety.");
assert(app.includes("Rollback quiet"), "Approval Outcome Monitor should track rollback quiet.");
assert(app.includes("Next-market decision"), "Approval Outcome Monitor should track the next-market decision.");
assert(app.includes("Buyer-response learning"), "Approval Outcome Monitor should track buyer-response learning.");
assert(app.includes("Final owner acceptance"), "Approval Closeout Receipt should track final owner acceptance.");
assert(app.includes("Buyer-safe archive"), "Approval Closeout Receipt should track the buyer-safe archive.");
assert(app.includes("Rollback note"), "Approval Closeout Receipt should track the rollback note.");
assert(app.includes("Learning lock"), "Approval Closeout Receipt should track the learning lock.");
assert(app.includes("Next review date"), "Approval Closeout Receipt should track the next review date.");
assert(app.includes("Launch handoff"), "Approval Closeout Receipt should track the launch handoff.");
assert(app.includes("Action owner"), "Next-Market Action Receipt should track the action owner.");
assert(app.includes("Action date"), "Next-Market Action Receipt should track the action date.");
assert(app.includes("Proof promise"), "Next-Market Action Receipt should track the proof promise.");
assert(app.includes("Support path"), "Next-Market Action Receipt should track the support path.");
assert(app.includes("Rollback option"), "Next-Market Action Receipt should track the rollback option.");
assert(app.includes("Sponsor line"), "Next-Market Action Receipt should track the sponsor line.");
assert(app.includes("Learning handoff"), "Next-Market Action Receipt should track the learning handoff.");
assert(app.includes("Reusable lesson"), "Market Learning Reuse Gate should track the reusable lesson.");
assert(app.includes("Tenant-only memory"), "Market Learning Reuse Gate should track tenant-only memory.");
assert(app.includes("Proof repair"), "Market Learning Reuse Gate should track proof repair.");
assert(app.includes("Sponsor approval"), "Market Learning Reuse Gate should track sponsor approval.");
assert(app.includes("Boundary reason"), "Market Learning Reuse Gate should track the boundary reason.");
assert(app.includes("Reuse surface"), "Market Learning Reuse Gate should track the reuse surface.");
assert(app.includes("Review lock"), "Market Learning Reuse Gate should track the review lock.");
assert(app.includes("Owner acceptance"), "Closeout Archive should track owner acceptance.");
assert(app.includes("Buyer-safe evidence"), "Closeout Archive should track buyer-safe evidence.");
assert(app.includes("Rollback note"), "Closeout Archive should track rollback note.");
assert(app.includes("Learning lock"), "Closeout Archive should track the learning lock.");
assert(app.includes("Next review date"), "Closeout Archive should track the next review date.");
assert(app.includes("Handoff receiver"), "Closeout Archive should track the handoff receiver.");
assert(app.includes("Archive index"), "Closeout Archive should track the archive index.");
assert(app.includes("buildCommandOutcomeMemorySeed"), "app.js is missing the Outcome Memory Seed model.");
assert(app.includes("buildCommandLearningApprovalLane"), "app.js is missing the Learning Approval Lane model.");
assert(app.includes("buildCommandLearningReleaseReceipt"), "app.js is missing the Learning Release Receipt model.");
assert(app.includes("buildCommandLearningReviewCue"), "app.js is missing the Learning Review Cue model.");
assert(app.includes("buildCommandEvidenceConfidenceLens"), "app.js is missing the Evidence Confidence Lens model.");
assert(app.includes("buildCommandConfidenceHistoryRibbon"), "app.js is missing the Confidence History Ribbon model.");
assert(app.includes("buildCommandObservationOutcomeSlot"), "app.js is missing the Observation Outcome Slot model.");
assert(app.includes("buildCommandOutcomeProofAttachmentCue"), "app.js is missing the Outcome Proof Attachment Cue model.");
assert(app.includes("buildCommandProofReviewDecisionGate"), "app.js is missing the Proof Review Decision Gate model.");
assert(app.includes("buildCommandLearningReuseReadinessLock"), "app.js is missing the Learning Reuse Readiness Lock model.");
assert(app.includes("buildCommandLocalGuidanceInfluencePreview"), "app.js is missing the Local Guidance Influence Preview model.");
assert(app.includes("buildCommandLocalInfluenceFeedbackPulse"), "app.js is missing the Local Influence Feedback Pulse model.");
assert(app.includes("buildCommandLocalGuidanceActivationGate"), "app.js is missing the Local Guidance Activation Gate model.");
assert(app.includes("buildCommandLocalGuidanceCanaryMonitor"), "app.js is missing the Local Guidance Canary Monitor model.");
assert(app.includes("buildCommandLocalCanaryGraduationGate"), "app.js is missing the Local Canary Graduation Gate model.");
assert(app.includes("buildCommandLearningLedger"), "app.js is missing the Learning Ledger model.");
assert(app.includes("buildCommandLearningSafetyReceipt"), "app.js is missing the Learning Safety Receipt model.");
assert(app.includes("buildCommandGlobalLearningPassport"), "app.js is missing the Global Learning Passport model.");
assert(app.includes("buildCommandMarketFitGate"), "app.js is missing the Market Fit Gate model.");
assert(app.includes("buildCommandCountryLaunchReceipt"), "app.js is missing the Country Launch Receipt model.");
assert(app.includes("buildCommandSecondCountryExpansionGate"), "app.js is missing the Second Country Expansion Gate model.");
assert(app.includes("buildCommandCountryTransferDeltaMap"), "app.js is missing the Country Transfer Delta Map model.");
assert(app.includes("buildCommandTransferReadinessScore"), "app.js is missing the Transfer Readiness Score model.");
assert(app.includes("buildCommandTransferActionPacket"), "app.js is missing the Transfer Action Packet model.");
assert(app.includes("buildCommandTransferLaunchReceipt"), "app.js is missing the Transfer Launch Receipt model.");
assert(app.includes("buildCommandTransferOutcomeMonitor"), "app.js is missing the Transfer Outcome Monitor model.");
assert(app.includes("buildCommandTransferLearningTrustGate"), "app.js is missing the Transfer Learning Trust Gate model.");
assert(app.includes("buildCommandTenantLearningPolicyStudio"), "app.js is missing the Tenant Learning Policy Studio model.");
assert(app.includes("buildCommandTenantPolicyImpactPreview"), "app.js is missing the Tenant Policy Impact Preview model.");
assert(app.includes("buildCommandTenantOutcomeLearningLoop"), "app.js is missing the Tenant Outcome Learning Loop model.");
assert(app.includes("buildCommandTenantReinforcementRewardGate"), "app.js is missing the Tenant Reinforcement Reward Gate model.");
assert(app.includes("buildCommandTenantReinforcementCanaryPlan"), "app.js is missing the Tenant Reinforcement Canary Plan model.");
assert(app.includes("buildCommandTenantReinforcementCanaryWatch"), "app.js is missing the Tenant Reinforcement Canary Watch model.");
assert(app.includes("buildCommandTenantReinforcementGraduationGate"), "app.js is missing the Tenant Reinforcement Graduation Gate model.");
assert(app.includes("buildCommandTenantReinforcementReusePassport"), "app.js is missing the Tenant Reinforcement Reuse Passport model.");
assert(app.includes("buildCommandTenantReinforcementReuseFitPreview"), "app.js is missing the Tenant Reinforcement Reuse Fit Preview model.");
assert(app.includes("buildCommandTenantReinforcementReuseActivationReceipt"), "app.js is missing the Tenant Reinforcement Reuse Activation Receipt model.");
assert(app.includes("buildCommandGuidanceFlightDeck"), "app.js is missing the Guidance Flight Deck model.");
assert(app.includes("buildCommandGuidanceFlightRecorder"), "app.js is missing the Guidance Flight Recorder model.");
assert(app.includes("buildCommandGuidanceReviewRadar"), "app.js is missing the Guidance Review Radar model.");
assert(app.includes("buildCommandGuidanceDecisionBrief"), "app.js is missing the Guidance Decision Brief model.");
assert(app.includes("buildCommandGuidanceCommitmentReceipt"), "app.js is missing the Guidance Commitment Receipt model.");
assert(app.includes("buildCommandGuidanceOutcomeWatch"), "app.js is missing the Guidance Outcome Watch model.");
assert(app.includes("buildCommandGuidanceLearningCapture"), "app.js is missing the Guidance Learning Capture model.");
assert(app.includes("buildCommandGuidanceReleaseQueue"), "app.js is missing the Guidance Release Queue model.");
assert(app.includes("buildCommandGuidanceCouncilIntake"), "app.js is missing the Guidance Council Intake model.");
assert(app.includes("buildCommandGuidanceCouncilDecisionGate"), "app.js is missing the Guidance Council Decision Gate model.");
assert(app.includes("buildCommandGuidanceLicenseReceipt"), "app.js is missing the Guidance License Receipt model.");
assert(app.includes("buildCommandGuidanceLicenseExpiryWatch"), "app.js is missing the License Expiry Watch model.");
assert(app.includes("buildCommandGuidanceConsentRenewalLane"), "app.js is missing the Consent Renewal Lane model.");
assert(app.includes("buildCommandGuidanceReceiptOutcomeReview"), "app.js is missing the Receipt Outcome Review model.");
assert(app.includes("buildCommandGuidanceLicenseRetirementReceipt"), "app.js is missing the License Retirement Receipt model.");
assert(app.includes("buildCommandGuidanceRenewalAuditPack"), "app.js is missing the Renewal Audit Pack model.");
assert(app.includes("buildCommandGuidanceOutcomeRenewalLedger"), "app.js is missing the Outcome Renewal Ledger model.");
assert(app.includes("buildCommandGuidanceRetirementAppealLane"), "app.js is missing the Retirement Appeal Lane model.");
assert(app.includes("buildCommandGuidanceAuditSignoffTrail"), "app.js is missing the Audit Signoff Trail model.");
assert(app.includes("buildCommandGuidanceLedgerTrendWatch"), "app.js is missing the Ledger Trend Watch model.");
assert(app.includes("buildCommandGuidanceAppealDecisionReceipt"), "app.js is missing the Appeal Decision Receipt model.");
assert(app.includes("buildCommandGuidanceSignoffOutcomeReceipt"), "app.js is missing the Signoff Outcome Receipt model.");
assert(app.includes("buildCommandGuidanceTrendOutcomeReceipt"), "app.js is missing the Trend Outcome Receipt model.");
assert(app.includes("buildCommandGuidanceAppealDecisionOutcomeWatch"), "app.js is missing the Appeal Decision Outcome Watch model.");
assert(app.includes("buildCommandGuidanceSignoffLearningLoop"), "app.js is missing the Signoff Learning Loop model.");
assert(app.includes("buildCommandGuidanceTrendLearningLoop"), "app.js is missing the Trend Learning Loop model.");
assert(app.includes("buildCommandGuidanceAppealLearningLoop"), "app.js is missing the Appeal Learning Loop model.");
assert(app.includes("buildCommandMemoryLearningChain"), "app.js is missing the Command Memory Learning Chain helper.");
assert(app.includes('action === "copy-command-seed"'), "app.js is missing the Outcome Memory Seed copy action.");
assert(app.includes('action === "set-command-learning-approval"'), "app.js is missing the Learning Approval Lane decision action.");
assert(app.includes('action === "copy-command-learning-approval"'), "app.js is missing the Learning Approval Lane copy action.");
assert(app.includes('action === "copy-command-learning-release"'), "app.js is missing the Learning Release Receipt copy action.");
assert(app.includes('action === "copy-command-learning-review"'), "app.js is missing the Learning Review Cue copy action.");
assert(app.includes('action === "copy-command-evidence-confidence"'), "app.js is missing the Evidence Confidence Lens copy action.");
assert(app.includes('action === "copy-command-confidence-history"'), "app.js is missing the Confidence History Ribbon copy action.");
assert(app.includes('action === "set-command-observation-outcome"'), "app.js is missing the Observation Outcome Slot decision action.");
assert(app.includes('action === "copy-command-observation-outcome"'), "app.js is missing the Observation Outcome Slot copy action.");
assert(app.includes('action === "set-command-outcome-proof-cue"'), "app.js is missing the Outcome Proof Attachment Cue status action.");
assert(app.includes('action === "copy-command-outcome-proof"'), "app.js is missing the Outcome Proof Attachment Cue copy action.");
assert(app.includes('action === "set-command-proof-review-gate"'), "app.js is missing the Proof Review Decision Gate decision action.");
assert(app.includes('action === "copy-command-proof-review"'), "app.js is missing the Proof Review Decision Gate copy action.");
assert(app.includes('action === "set-command-reuse-readiness-lock"'), "app.js is missing the Learning Reuse Readiness Lock decision action.");
assert(app.includes('action === "copy-command-reuse-lock"'), "app.js is missing the Learning Reuse Readiness Lock copy action.");
assert(app.includes('action === "set-command-guidance-influence-preview"'), "app.js is missing the Local Guidance Influence Preview decision action.");
assert(app.includes('action === "copy-command-influence-preview"'), "app.js is missing the Local Guidance Influence Preview copy action.");
assert(app.includes('action === "set-command-influence-feedback-pulse"'), "app.js is missing the Local Influence Feedback Pulse decision action.");
assert(app.includes('action === "copy-command-influence-feedback"'), "app.js is missing the Local Influence Feedback Pulse copy action.");
assert(app.includes('action === "set-command-guidance-activation-gate"'), "app.js is missing the Local Guidance Activation Gate decision action.");
assert(app.includes('action === "copy-command-guidance-activation"'), "app.js is missing the Local Guidance Activation Gate copy action.");
assert(app.includes('action === "set-command-guidance-canary-monitor"'), "app.js is missing the Local Guidance Canary Monitor decision action.");
assert(app.includes('action === "copy-command-guidance-canary"'), "app.js is missing the Local Guidance Canary Monitor copy action.");
assert(app.includes('action === "set-command-canary-graduation-gate"'), "app.js is missing the Local Canary Graduation Gate decision action.");
assert(app.includes('action === "copy-command-canary-graduation"'), "app.js is missing the Local Canary Graduation Gate copy action.");
assert(app.includes('action === "set-command-learning-ledger"'), "app.js is missing the Learning Ledger decision action.");
assert(app.includes('action === "copy-command-learning-ledger"'), "app.js is missing the Learning Ledger copy action.");
assert(app.includes('action === "set-command-learning-safety-receipt"'), "app.js is missing the Learning Safety Receipt decision action.");
assert(app.includes('action === "copy-command-learning-safety"'), "app.js is missing the Learning Safety Receipt copy action.");
assert(app.includes('action === "set-command-global-learning-passport"'), "app.js is missing the Global Learning Passport decision action.");
assert(app.includes('action === "copy-command-global-passport"'), "app.js is missing the Global Learning Passport copy action.");
assert(app.includes('action === "set-command-market-fit-gate"'), "app.js is missing the Market Fit Gate decision action.");
assert(app.includes('action === "copy-command-market-fit"'), "app.js is missing the Market Fit Gate copy action.");
assert(app.includes('action === "set-command-country-launch-receipt"'), "app.js is missing the Country Launch Receipt decision action.");
assert(app.includes('action === "copy-command-country-launch"'), "app.js is missing the Country Launch Receipt copy action.");
assert(app.includes('action === "set-command-second-country-expansion-gate"'), "app.js is missing the Second Country Expansion Gate decision action.");
assert(app.includes('action === "copy-command-second-country"'), "app.js is missing the Second Country Expansion Gate copy action.");
assert(app.includes('action === "set-command-transfer-delta-map"'), "app.js is missing the Country Transfer Delta Map decision action.");
assert(app.includes('action === "copy-command-transfer-delta"'), "app.js is missing the Country Transfer Delta Map copy action.");
assert(app.includes('action === "set-command-transfer-readiness-score"'), "app.js is missing the Transfer Readiness Score decision action.");
assert(app.includes('action === "copy-command-transfer-readiness"'), "app.js is missing the Transfer Readiness Score copy action.");
assert(app.includes('action === "set-command-transfer-action-packet"'), "app.js is missing the Transfer Action Packet decision action.");
assert(app.includes('action === "copy-command-transfer-action"'), "app.js is missing the Transfer Action Packet copy action.");
assert(app.includes('action === "set-command-transfer-launch-receipt"'), "app.js is missing the Transfer Launch Receipt decision action.");
assert(app.includes('action === "copy-command-transfer-launch"'), "app.js is missing the Transfer Launch Receipt copy action.");
assert(app.includes('action === "set-command-transfer-outcome-monitor"'), "app.js is missing the Transfer Outcome Monitor decision action.");
assert(app.includes('action === "copy-command-transfer-outcome"'), "app.js is missing the Transfer Outcome Monitor copy action.");
assert(app.includes('action === "set-command-transfer-learning-trust"'), "app.js is missing the Transfer Learning Trust Gate decision action.");
assert(app.includes('action === "copy-command-transfer-trust"'), "app.js is missing the Transfer Learning Trust Gate copy action.");
assert(app.includes('action === "set-command-tenant-learning-policy"'), "app.js is missing the Tenant Learning Policy Studio decision action.");
assert(app.includes('action === "copy-command-tenant-policy"'), "app.js is missing the Tenant Learning Policy Studio copy action.");
assert(app.includes('action === "set-command-tenant-policy-impact"'), "app.js is missing the Tenant Policy Impact Preview decision action.");
assert(app.includes('action === "copy-command-tenant-impact"'), "app.js is missing the Tenant Policy Impact Preview copy action.");
assert(app.includes('action === "set-command-tenant-outcome-loop"'), "app.js is missing the Tenant Outcome Learning Loop decision action.");
assert(app.includes('action === "copy-command-tenant-outcome-loop"'), "app.js is missing the Tenant Outcome Learning Loop copy action.");
assert(app.includes('action === "set-command-tenant-reward-gate"'), "app.js is missing the Tenant Reinforcement Reward Gate decision action.");
assert(app.includes('action === "copy-command-tenant-reward-gate"'), "app.js is missing the Tenant Reinforcement Reward Gate copy action.");
assert(app.includes('action === "set-command-tenant-canary-plan"'), "app.js is missing the Tenant Reinforcement Canary Plan decision action.");
assert(app.includes('action === "copy-command-tenant-canary-plan"'), "app.js is missing the Tenant Reinforcement Canary Plan copy action.");
assert(app.includes('action === "set-command-tenant-canary-watch"'), "app.js is missing the Tenant Reinforcement Canary Watch decision action.");
assert(app.includes('action === "copy-command-tenant-canary-watch"'), "app.js is missing the Tenant Reinforcement Canary Watch copy action.");
assert(app.includes('action === "set-command-tenant-graduation-gate"'), "app.js is missing the Tenant Reinforcement Graduation Gate decision action.");
assert(app.includes('action === "copy-command-tenant-graduation-gate"'), "app.js is missing the Tenant Reinforcement Graduation Gate copy action.");
assert(app.includes('action === "set-command-tenant-reuse-passport"'), "app.js is missing the Tenant Reinforcement Reuse Passport decision action.");
assert(app.includes('action === "copy-command-tenant-reuse-passport"'), "app.js is missing the Tenant Reinforcement Reuse Passport copy action.");
assert(app.includes('action === "set-command-tenant-reuse-fit-preview"'), "app.js is missing the Tenant Reinforcement Reuse Fit Preview decision action.");
assert(app.includes('action === "copy-command-tenant-reuse-fit"'), "app.js is missing the Tenant Reinforcement Reuse Fit Preview copy action.");
assert(app.includes('action === "set-command-tenant-reuse-activation"'), "app.js is missing the Tenant Reinforcement Reuse Activation Receipt decision action.");
assert(app.includes('action === "copy-command-tenant-reuse-activation"'), "app.js is missing the Tenant Reinforcement Reuse Activation Receipt copy action.");
assert(app.includes('action === "copy-command-guidance-flight-deck"'), "app.js is missing the Guidance Flight Deck copy action.");
assert(app.includes('action === "copy-command-guidance-flight-recorder"'), "app.js is missing the Guidance Flight Recorder copy action.");
assert(app.includes('action === "copy-command-guidance-review-radar"'), "app.js is missing the Guidance Review Radar copy action.");
assert(app.includes('action === "copy-command-guidance-decision-brief"'), "app.js is missing the Guidance Decision Brief copy action.");
assert(app.includes('action === "copy-command-guidance-commitment-receipt"'), "app.js is missing the Guidance Commitment Receipt copy action.");
assert(app.includes('action === "copy-command-guidance-outcome-watch"'), "app.js is missing the Guidance Outcome Watch copy action.");
assert(app.includes('action === "copy-command-guidance-learning-capture"'), "app.js is missing the Guidance Learning Capture copy action.");
assert(app.includes('action === "copy-command-guidance-release-queue"'), "app.js is missing the Guidance Release Queue copy action.");
assert(app.includes('action === "copy-command-guidance-council-intake"'), "app.js is missing the Guidance Council Intake copy action.");
assert(app.includes('action === "copy-command-guidance-council-decision"'), "app.js is missing the Guidance Council Decision Gate copy action.");
assert(app.includes('action === "copy-command-guidance-license-receipt"'), "app.js is missing the Guidance License Receipt copy action.");
assert(app.includes('action === "copy-command-guidance-expiry-watch"'), "app.js is missing the License Expiry Watch copy action.");
assert(app.includes('action === "copy-command-guidance-consent-renewal"'), "app.js is missing the Consent Renewal Lane copy action.");
assert(app.includes('action === "copy-command-guidance-outcome-review"'), "app.js is missing the Receipt Outcome Review copy action.");
assert(app.includes('action === "copy-command-guidance-retirement-receipt"'), "app.js is missing the License Retirement Receipt copy action.");
assert(app.includes('action === "copy-command-guidance-renewal-audit"'), "app.js is missing the Renewal Audit Pack copy action.");
assert(app.includes('action === "copy-command-guidance-renewal-ledger"'), "app.js is missing the Outcome Renewal Ledger copy action.");
assert(app.includes('action === "copy-command-guidance-appeal-lane"'), "app.js is missing the Retirement Appeal Lane copy action.");
assert(app.includes('action === "copy-command-guidance-signoff-trail"'), "app.js is missing the Audit Signoff Trail copy action.");
assert(app.includes('action === "copy-command-guidance-ledger-trend"'), "app.js is missing the Ledger Trend Watch copy action.");
assert(app.includes('action === "copy-command-guidance-appeal-decision"'), "app.js is missing the Appeal Decision Receipt copy action.");
assert(app.includes('action === "copy-command-guidance-signoff-outcome"'), "app.js is missing the Signoff Outcome Receipt copy action.");
assert(app.includes('action === "copy-command-guidance-trend-outcome"'), "app.js is missing the Trend Outcome Receipt copy action.");
assert(app.includes('action === "copy-command-guidance-appeal-watch"'), "app.js is missing the Appeal Decision Outcome Watch copy action.");
assert(app.includes('action === "copy-command-guidance-signoff-loop"'), "app.js is missing the Signoff Learning Loop copy action.");
assert(app.includes('action === "copy-command-guidance-trend-loop"'), "app.js is missing the Trend Learning Loop copy action.");
assert(app.includes('action === "copy-command-guidance-appeal-loop"'), "app.js is missing the Appeal Learning Loop copy action.");
assert(app.includes('action === "copy-command-guidance-signoff-governance"'), "app.js is missing the Signoff Loop Governance copy action.");
assert(app.includes('action === "copy-command-guidance-trend-governance"'), "app.js is missing the Trend Loop Governance copy action.");
assert(app.includes('action === "copy-command-guidance-appeal-governance"'), "app.js is missing the Appeal Loop Governance copy action.");
assert(app.includes('action === "copy-command-guidance-release-receipt"'), "app.js is missing the Governance Release Receipt copy action.");
assert(app.includes('action === "copy-command-guidance-outcome-monitor"'), "app.js is missing the Governance Outcome Monitor copy action.");
assert(app.includes('action === "copy-command-guidance-rollback-lane"'), "app.js is missing the Governance Rollback Lane copy action.");
assert(app.includes('action === "copy-command-guidance-release-archive"'), "app.js is missing the Governance Release Archive copy action.");
assert(app.includes('action === "copy-command-guidance-proof-repair-queue"'), "app.js is missing the Governance Proof Repair Queue copy action.");
assert(app.includes('action === "copy-command-guidance-calm-closeout"'), "app.js is missing the Governance Calm Closeout copy action.");
assert(app.includes('action === "copy-command-guidance-audit-export"'), "app.js is missing the Governance Audit Export copy action.");
assert(app.includes('action === "copy-command-guidance-proof-sla"'), "app.js is missing the Governance Proof SLA copy action.");
assert(app.includes('action === "copy-command-guidance-launch-evidence-packet"'), "app.js is missing the Governance Launch Evidence Packet copy action.");
assert(app.includes('action === "copy-command-guidance-reviewer-console"'), "app.js is missing the Governance Reviewer Console copy action.");
assert(app.includes('action === "copy-command-guidance-launch-gate-score"'), "app.js is missing the Governance Launch Gate Score copy action.");
assert(app.includes('action === "copy-command-guidance-pilot-handoff-board"'), "app.js is missing the Governance Pilot Handoff Board copy action.");
assert(app.includes('action === "copy-command-guidance-launch-rehearsal-room"'), "app.js is missing the Governance Launch Rehearsal Room copy action.");
assert(app.includes('action === "copy-command-guidance-first-pilot-readiness-room"'), "app.js is missing the Governance First Pilot Readiness Room copy action.");
assert(app.includes('action === "copy-command-guidance-pilot-acceptance-receipt"'), "app.js is missing the Governance Pilot Acceptance Receipt copy action.");
assert(app.includes('action === "copy-command-guidance-launch-proof-board"'), "app.js is missing the Governance Launch Proof Board copy action.");
assert(app.includes('action === "copy-command-guidance-first-pilot-operating-rhythm"'), "app.js is missing the Governance First Pilot Operating Rhythm copy action.");
assert(app.includes('action === "copy-command-guidance-pilot-sponsor-update"'), "app.js is missing the Governance Pilot Sponsor Update copy action.");
assert(app.includes('action === "copy-command-guidance-launch-support-desk"'), "app.js is missing the Governance Launch Support Desk copy action.");
assert(app.includes('action === "copy-command-guidance-pilot-outcome-ledger"'), "app.js is missing the Governance Pilot Outcome Ledger copy action.");
assert(app.includes('action === "copy-command-guidance-sponsor-decision-receipt"'), "app.js is missing the Governance Sponsor Decision Receipt copy action.");
assert(app.includes('action === "copy-command-guidance-pilot-support-closeout"'), "app.js is missing the Governance Pilot Support Closeout copy action.");
assert(app.includes('action === "copy-command-guidance-pilot-learning-release"'), "app.js is missing the Governance Pilot Learning Release copy action.");
assert(app.includes('action === "copy-command-guidance-sponsor-expansion-gate"'), "app.js is missing the Governance Sponsor Expansion Gate copy action.");
assert(app.includes('action === "copy-command-guidance-launch-expansion-receipt"'), "app.js is missing the Governance Launch Expansion Receipt copy action.");
assert(app.includes('action === "copy-command-guidance-scaled-rollout-board"'), "app.js is missing the Governance Scaled Rollout Board copy action.");
assert(app.includes('action === "copy-command-guidance-expansion-support-desk"'), "app.js is missing the Governance Expansion Support Desk copy action.");
assert(app.includes('action === "copy-command-guidance-scaled-rollout-proof-board"'), "app.js is missing the Governance Scaled Rollout Proof Board copy action.");
assert(app.includes('action === "copy-command-guidance-rollout-sponsor-update"'), "app.js is missing the Governance Rollout Sponsor Update copy action.");
assert(app.includes('action === "copy-command-guidance-rollout-outcome-ledger"'), "app.js is missing the Governance Rollout Outcome Ledger copy action.");
assert(app.includes('action === "copy-command-guidance-rollout-learning-receipt"'), "app.js is missing the Governance Rollout Learning Receipt copy action.");
assert(app.includes('action === "copy-command-guidance-rollout-sponsor-decision-receipt"'), "app.js is missing the Governance Rollout Sponsor Decision Receipt copy action.");
assert(app.includes('action === "copy-command-guidance-rollout-reuse-gate"'), "app.js is missing the Governance Rollout Reuse Gate copy action.");
assert(app.includes('action === "copy-command-guidance-rollout-learning-review-room"'), "app.js is missing the Governance Rollout Learning Review Room copy action.");
assert(app.includes('action === "copy-command-guidance-rollout-decision-audit-pack"'), "app.js is missing the Governance Rollout Decision Audit Pack copy action.");
assert(app.includes('action === "copy-command-guidance-rollout-reuse-activation-receipt"'), "app.js is missing the Governance Rollout Reuse Activation Receipt copy action.");
assert(app.includes('action === "copy-command-guidance-rollout-activation-outcome-watch"'), "app.js is missing the Governance Rollout Activation Outcome Watch copy action.");
assert(app.includes('action === "copy-command-guidance-rollout-audit-closeout-receipt"'), "app.js is missing the Governance Rollout Audit Closeout Receipt copy action.");
assert(app.includes('action === "copy-command-guidance-rollout-launch-readiness-seal"'), "app.js is missing the Governance Rollout Launch Readiness Seal copy action.");
assert(app.includes('action === "copy-command-guidance-first-pilot-proof-bridge"'), "app.js is missing the Governance First Pilot Proof Bridge copy action.");
assert(app.includes('action === "copy-command-guidance-first-pilot-command-room"'), "app.js is missing the Governance First Pilot Command Room copy action.");
assert(app.includes('action === "copy-command-guidance-first-pilot-outcome-watch"'), "app.js is missing the Governance First Pilot Outcome Watch copy action.");
assert(app.includes('action === "copy-command-guidance-first-pilot-support-receipt"'), "app.js is missing the Governance First Pilot Support Receipt copy action.");
assert(app.includes('action === "copy-command-guidance-first-pilot-learning-room"'), "app.js is missing the Governance First Pilot Learning Room copy action.");
assert(app.includes('action === "copy-command-guidance-first-pilot-expansion-decision"'), "app.js is missing the Governance First Pilot Expansion Decision copy action.");
assert(app.includes('action === "copy-command-guidance-second-pilot-readiness"'), "app.js is missing the Governance Second Pilot Readiness copy action.");
assert(app.includes('action === "copy-command-guidance-second-pilot-launch-room"'), "app.js is missing the Governance Second Pilot Launch Room copy action.");
assert(app.includes('action === "copy-command-guidance-second-pilot-outcome-watch"'), "app.js is missing the Governance Second Pilot Outcome Watch copy action.");
assert(app.includes('action === "copy-command-guidance-second-pilot-support-receipt"'), "app.js is missing the Governance Second Pilot Support Receipt copy action.");
assert(app.includes('action === "copy-command-guidance-second-pilot-learning-room"'), "app.js is missing the Governance Second Pilot Learning Room copy action.");
assert(app.includes('action === "copy-command-guidance-second-pilot-expansion-gate"'), "app.js is missing the Governance Second Pilot Expansion Gate copy action.");
assert(app.includes('action === "copy-command-guidance-second-pilot-decision-audit-pack"'), "app.js is missing the Governance Second Pilot Decision Audit Pack copy action.");
assert(app.includes('action === "copy-command-guidance-second-pilot-reuse-activation"'), "app.js is missing the Governance Second Pilot Reuse Activation copy action.");
assert(app.includes('action === "copy-command-guidance-second-pilot-activation-outcome-watch"'), "app.js is missing the Governance Second Pilot Activation Outcome Watch copy action.");
assert(app.includes('action === "copy-command-guidance-second-pilot-audit-closeout-receipt"'), "app.js is missing the Governance Second Pilot Audit Closeout Receipt copy action.");
assert(app.includes('action === "copy-command-guidance-second-pilot-launch-readiness-seal"'), "app.js is missing the Governance Second Pilot Launch Readiness Seal copy action.");
assert(app.includes('action === "copy-command-guidance-second-pilot-support-readiness-closeout"'), "app.js is missing the Governance Second Pilot Support Readiness Closeout copy action.");
assert(app.includes('action === "copy-command-guidance-second-pilot-launch-handoff-pack"'), "app.js is missing the Governance Second Pilot Launch Handoff Pack copy action.");
assert(app.includes('action === "copy-command-guidance-second-pilot-first-review-bridge"'), "app.js is missing the Governance Second Pilot First Review Bridge copy action.");
assert(app.includes('action === "copy-command-guidance-second-pilot-first-review-outcome-watch"'), "app.js is missing the Governance Second Pilot First Review Outcome Watch copy action.");
assert(app.includes('action === "copy-command-guidance-second-pilot-review-learning-receipt"'), "app.js is missing the Governance Second Pilot Review Learning Receipt copy action.");
assert(app.includes('action === "copy-command-guidance-second-pilot-expansion-decision-receipt"'), "app.js is missing the Governance Second Pilot Expansion Decision Receipt copy action.");
assert(app.includes('action === "copy-command-guidance-second-pilot-expansion-readiness-room"'), "app.js is missing the Governance Second Pilot Expansion Readiness Room copy action.");
assert(app.includes('action === "copy-command-guidance-second-pilot-expansion-launch-handoff"'), "app.js is missing the Governance Second Pilot Expansion Launch Handoff copy action.");
assert(app.includes('action === "copy-command-guidance-second-pilot-expansion-outcome-watch"'), "app.js is missing the Governance Second Pilot Expansion Outcome Watch copy action.");
assert(app.includes('action === "copy-command-guidance-second-pilot-expansion-learning-handoff"'), "app.js is missing the Governance Second Pilot Expansion Learning Handoff copy action.");
assert(app.includes('action === "copy-command-guidance-second-pilot-expansion-support-receipt"'), "app.js is missing the Governance Second Pilot Expansion Support Receipt copy action.");
assert(app.includes('action === "copy-command-guidance-second-pilot-expansion-wider-launch-gate"'), "app.js is missing the Governance Second Pilot Expansion Wider Launch Gate copy action.");
assert(app.includes('action === "copy-command-guidance-second-pilot-expansion-wider-launch-decision-receipt"'), "app.js is missing the Governance Second Pilot Expansion Wider Launch Decision Receipt copy action.");
assert(app.includes('action === "copy-command-guidance-second-pilot-expansion-wider-launch-release-room"'), "app.js is missing the Governance Second Pilot Expansion Wider Launch Release Room copy action.");
assert(app.includes('action === "copy-command-guidance-second-pilot-expansion-wider-launch-outcome-watch"'), "app.js is missing the Governance Second Pilot Expansion Wider Launch Outcome Watch copy action.");
assert(app.includes('action === "copy-command-guidance-second-pilot-expansion-wider-launch-learning-receipt"'), "app.js is missing the Governance Second Pilot Expansion Wider Launch Learning Receipt copy action.");
assert(app.includes('action === "copy-command-guidance-second-pilot-expansion-wider-launch-market-readiness-gate"'), "app.js is missing the Governance Second Pilot Expansion Wider Launch Market Readiness Gate copy action.");
assert(app.includes('action === "copy-command-guidance-second-pilot-expansion-wider-launch-launch-readiness-ledger"'), "app.js is missing the Governance Second Pilot Expansion Wider Launch Launch-Readiness Ledger copy action.");
assert(app.includes('action === "copy-command-guidance-second-pilot-expansion-wider-launch-expansion-council"'), "app.js is missing the Governance Second Pilot Expansion Wider Launch Expansion Council copy action.");
assert(app.includes('action === "copy-command-guidance-second-pilot-expansion-wider-launch-market-launch-room"'), "app.js is missing the Governance Second Pilot Expansion Wider Launch Market Launch Room copy action.");
assert(app.includes('action === "copy-command-guidance-second-pilot-expansion-wider-launch-buyer-launch-pack"'), "app.js is missing the Governance Second Pilot Expansion Wider Launch Buyer Launch Pack copy action.");
assert(app.includes('action === "copy-command-guidance-second-pilot-expansion-wider-launch-council-minutes"'), "app.js is missing the Governance Second Pilot Expansion Wider Launch Council Minutes copy action.");
assert(app.includes('action === "copy-command-guidance-second-pilot-expansion-wider-launch-handoff-receipt"'), "app.js is missing the Governance Second Pilot Expansion Wider Launch Handoff Receipt copy action.");
assert(app.includes('action === "copy-command-guidance-second-pilot-expansion-wider-launch-buyer-response-watch"'), "app.js is missing the Governance Second Pilot Expansion Wider Launch Buyer Response Watch copy action.");
assert(app.includes('action === "copy-command-guidance-second-pilot-expansion-wider-launch-minutes-approval-receipt"'), "app.js is missing the Governance Second Pilot Expansion Wider Launch Minutes Approval Receipt copy action.");
assert(app.includes('action === "copy-command-guidance-second-pilot-expansion-wider-launch-handoff-outcome-receipt"'), "app.js is missing the Governance Second Pilot Expansion Wider Launch Handoff Outcome Receipt copy action.");
assert(app.includes('action === "copy-command-guidance-second-pilot-expansion-wider-launch-market-response-learning-receipt"'), "app.js is missing the Governance Second Pilot Expansion Wider Launch Market Response Learning Receipt copy action.");
assert(app.includes('action === "copy-command-guidance-second-pilot-expansion-wider-launch-approval-outcome-monitor"'), "app.js is missing the Governance Second Pilot Expansion Wider Launch Approval Outcome Monitor copy action.");
assert(app.includes('action === "copy-command-guidance-second-pilot-expansion-wider-launch-approval-closeout-receipt"'), "app.js is missing the Governance Second Pilot Expansion Wider Launch Approval Closeout Receipt copy action.");
assert(app.includes('action === "copy-command-guidance-second-pilot-expansion-wider-launch-next-market-action-receipt"'), "app.js is missing the Governance Second Pilot Expansion Wider Launch Next-Market Action Receipt copy action.");
assert(app.includes('action === "copy-command-guidance-second-pilot-expansion-wider-launch-market-learning-reuse-gate"'), "app.js is missing the Governance Second Pilot Expansion Wider Launch Market Learning Reuse Gate copy action.");
assert(app.includes('action === "copy-command-guidance-second-pilot-expansion-wider-launch-closeout-archive"'), "app.js is missing the Governance Second Pilot Expansion Wider Launch Closeout Archive copy action.");
assert(app.includes("document.addEventListener(\"submit\""), "app.js is missing form event handling.");
assert(app.includes("window.addEventListener(\"hashchange\""), "app.js is missing route synchronization.");

const pilotCloseStart = app.indexOf("function renderCommandPilotClosePacket");
const pilotCloseEnd = app.indexOf("function renderCommandPilotLaunchBoard", pilotCloseStart);
const pilotCloseBlock = pilotCloseStart >= 0 && pilotCloseEnd > pilotCloseStart ? app.slice(pilotCloseStart, pilotCloseEnd) : "";
assert(
  pilotCloseBlock.includes("const roi = pitch.roiPack || {};"),
  "Pilot Close Packet is missing its ROI pack runtime guard.",
);

const commandCopyStart = app.indexOf('if (action === "copy-command-brief")');
const commandCopyEnd = app.indexOf('if (action === "copy-command-seed")', commandCopyStart);
const commandCopyBlock = commandCopyStart >= 0 && commandCopyEnd > commandCopyStart ? app.slice(commandCopyStart, commandCopyEnd) : "";
assert(
  commandCopyBlock.includes("seed: buildCommandOutcomeMemorySeed"),
  "Copy Command Brief should persist an Outcome Memory Seed.",
);
assert(
  commandCopyBlock.includes("approval: null"),
  "Copy Command Brief should reset the Learning Approval Lane for a new seed.",
);
assert(
  commandCopyBlock.includes("render();"),
  "Copy Command Brief should redraw the Command Center after saving the seed.",
);

const approvalStart = app.indexOf('if (action === "set-command-learning-approval")');
const approvalEnd = app.indexOf('if (action === "copy-command-memory")', approvalStart);
const approvalBlock = approvalStart >= 0 && approvalEnd > approvalStart ? app.slice(approvalStart, approvalEnd) : "";
assert(
  approvalBlock.includes("persistCommandMemory(state.commandMemory)"),
  "Learning Approval Lane should persist the selected decision.",
);
assert(
  approvalBlock.includes("releaseReceipt"),
  "Learning Approval Lane should persist the Learning Release Receipt.",
);
assert(
  approvalBlock.includes("reviewCue"),
  "Learning Approval Lane should persist the Learning Review Cue.",
);
assert(
  approvalBlock.includes("evidenceLens"),
  "Learning Approval Lane should persist the Evidence Confidence Lens.",
);
assert(
  approvalBlock.includes("confidenceRibbon"),
  "Learning Approval Lane should persist the Confidence History Ribbon.",
);
assert(
  approvalBlock.includes("observationOutcome"),
  "Learning Approval Lane should persist the Observation Outcome Slot.",
);
assert(
  approvalBlock.includes("proofAttachmentCue"),
  "Learning Approval Lane should persist the Outcome Proof Attachment Cue.",
);
assert(
  approvalBlock.includes("proofReviewGate"),
  "Learning Approval Lane should persist the Proof Review Decision Gate.",
);
assert(
  approvalBlock.includes("reuseReadinessLock"),
  "Learning Approval Lane should persist the Learning Reuse Readiness Lock.",
);
assert(
  approvalBlock.includes("guidanceInfluencePreview"),
  "Learning Approval Lane should persist the Local Guidance Influence Preview.",
);
assert(
  approvalBlock.includes("localInfluenceFeedbackPulse"),
  "Learning Approval Lane should persist the Local Influence Feedback Pulse.",
);
assert(
  approvalBlock.includes("localGuidanceActivationGate"),
  "Learning Approval Lane should persist the Local Guidance Activation Gate.",
);
assert(
  approvalBlock.includes("localGuidanceCanaryMonitor"),
  "Learning Approval Lane should persist the Local Guidance Canary Monitor.",
);
assert(
  approvalBlock.includes("localCanaryGraduationGate"),
  "Learning Approval Lane should persist the Local Canary Graduation Gate.",
);
assert(
  approvalBlock.includes("learningLedger"),
  "Learning Approval Lane should persist the Learning Ledger.",
);
assert(
  approvalBlock.includes("learningSafetyReceipt"),
  "Learning Approval Lane should persist the Learning Safety Receipt.",
);
assert(
  approvalBlock.includes("globalLearningPassport"),
  "Learning Approval Lane should persist the Global Learning Passport.",
);
assert(
  approvalBlock.includes("marketFitGate"),
  "Learning Approval Lane should persist the Market Fit Gate.",
);
assert(
  approvalBlock.includes("countryLaunchReceipt"),
  "Learning Approval Lane should persist the Country Launch Receipt.",
);
assert(
  approvalBlock.includes("secondCountryExpansionGate"),
  "Learning Approval Lane should persist the Second Country Expansion Gate.",
);
assert(
  approvalBlock.includes("countryTransferDeltaMap"),
  "Learning Approval Lane should persist the Country Transfer Delta Map.",
);
assert(
  approvalBlock.includes("transferReadinessScore"),
  "Learning Approval Lane should persist the Transfer Readiness Score.",
);
assert(
  approvalBlock.includes("transferActionPacket"),
  "Learning Approval Lane should persist the Transfer Action Packet.",
);
assert(
  approvalBlock.includes("transferLaunchReceipt"),
  "Learning Approval Lane should persist the Transfer Launch Receipt.",
);
assert(
  approvalBlock.includes("transferOutcomeMonitor"),
  "Learning Approval Lane should persist the Transfer Outcome Monitor.",
);
assert(
  approvalBlock.includes("transferLearningTrustGate"),
  "Learning Approval Lane should persist the Transfer Learning Trust Gate.",
);
assert(
  approvalBlock.includes("tenantLearningPolicyStudio"),
  "Learning Approval Lane should persist the Tenant Learning Policy Studio.",
);
assert(
  approvalBlock.includes("tenantPolicyImpactPreview"),
  "Learning Approval Lane should persist the Tenant Policy Impact Preview.",
);
assert(
  approvalBlock.includes("tenantOutcomeLearningLoop"),
  "Learning Approval Lane should persist the Tenant Outcome Learning Loop.",
);
assert(
  approvalBlock.includes("tenantReinforcementRewardGate"),
  "Learning Approval Lane should persist the Tenant Reinforcement Reward Gate.",
);
assert(
  approvalBlock.includes("tenantReinforcementCanaryPlan"),
  "Learning Approval Lane should persist the Tenant Reinforcement Canary Plan.",
);
assert(
  approvalBlock.includes("tenantReinforcementCanaryWatch"),
  "Learning Approval Lane should persist the Tenant Reinforcement Canary Watch.",
);
assert(
  approvalBlock.includes("tenantReinforcementGraduationGate"),
  "Learning Approval Lane should persist the Tenant Reinforcement Graduation Gate.",
);
assert(
  approvalBlock.includes("tenantReinforcementReusePassport"),
  "Learning Approval Lane should persist the Tenant Reinforcement Reuse Passport.",
);
assert(
  approvalBlock.includes("tenantReinforcementReuseFitPreview"),
  "Learning Approval Lane should persist the Tenant Reinforcement Reuse Fit Preview.",
);
assert(
  approvalBlock.includes("tenantReinforcementReuseActivationReceipt"),
  "Learning Approval Lane should persist the Tenant Reinforcement Reuse Activation Receipt.",
);

assert(css.includes(".command-reuse-readiness-lock"), "styles.css is missing the Learning Reuse Readiness Lock panel.");
assert(css.includes(".command-reuse-readiness-grid"), "styles.css is missing the Learning Reuse Readiness Lock grid.");
assert(css.includes(".command-influence-preview"), "styles.css is missing the Local Guidance Influence Preview panel.");
assert(css.includes(".command-influence-preview-grid"), "styles.css is missing the Local Guidance Influence Preview grid.");
assert(css.includes(".command-influence-feedback-pulse"), "styles.css is missing the Local Influence Feedback Pulse panel.");
assert(css.includes(".command-influence-feedback-grid"), "styles.css is missing the Local Influence Feedback Pulse grid.");
assert(css.includes(".command-guidance-activation-gate"), "styles.css is missing the Local Guidance Activation Gate panel.");
assert(css.includes(".command-guidance-activation-grid"), "styles.css is missing the Local Guidance Activation Gate grid.");
assert(css.includes(".command-guidance-canary-monitor"), "styles.css is missing the Local Guidance Canary Monitor panel.");
assert(css.includes(".command-guidance-canary-grid"), "styles.css is missing the Local Guidance Canary Monitor grid.");
assert(css.includes(".command-canary-graduation-gate"), "styles.css is missing the Local Canary Graduation Gate panel.");
assert(css.includes(".command-canary-graduation-grid"), "styles.css is missing the Local Canary Graduation Gate grid.");
assert(css.includes(".command-learning-ledger"), "styles.css is missing the Learning Ledger panel.");
assert(css.includes(".command-learning-ledger-grid"), "styles.css is missing the Learning Ledger grid.");
assert(css.includes(".command-learning-safety-receipt"), "styles.css is missing the Learning Safety Receipt panel.");
assert(css.includes(".command-learning-safety-grid"), "styles.css is missing the Learning Safety Receipt grid.");
assert(css.includes(".command-global-learning-passport"), "styles.css is missing the Global Learning Passport panel.");
assert(css.includes(".command-global-passport-grid"), "styles.css is missing the Global Learning Passport grid.");
assert(css.includes(".command-market-fit-gate"), "styles.css is missing the Market Fit Gate panel.");
assert(css.includes(".command-market-fit-grid"), "styles.css is missing the Market Fit Gate grid.");
assert(css.includes(".command-country-launch-receipt"), "styles.css is missing the Country Launch Receipt panel.");
assert(css.includes(".command-country-launch-grid"), "styles.css is missing the Country Launch Receipt grid.");
assert(css.includes(".command-second-country-expansion-gate"), "styles.css is missing the Second Country Expansion Gate panel.");
assert(css.includes(".command-second-country-grid"), "styles.css is missing the Second Country Expansion Gate grid.");
assert(css.includes(".command-transfer-delta-map"), "styles.css is missing the Country Transfer Delta Map panel.");
assert(css.includes(".command-transfer-delta-grid"), "styles.css is missing the Country Transfer Delta Map grid.");
assert(css.includes(".command-transfer-readiness-score"), "styles.css is missing the Transfer Readiness Score panel.");
assert(css.includes(".command-transfer-readiness-grid"), "styles.css is missing the Transfer Readiness Score grid.");
assert(css.includes(".command-transfer-action-packet"), "styles.css is missing the Transfer Action Packet panel.");
assert(css.includes(".command-transfer-action-grid"), "styles.css is missing the Transfer Action Packet grid.");
assert(css.includes(".command-transfer-launch-receipt"), "styles.css is missing the Transfer Launch Receipt panel.");
assert(css.includes(".command-transfer-launch-grid"), "styles.css is missing the Transfer Launch Receipt grid.");
assert(css.includes(".command-transfer-outcome-monitor"), "styles.css is missing the Transfer Outcome Monitor panel.");
assert(css.includes(".command-transfer-outcome-grid"), "styles.css is missing the Transfer Outcome Monitor grid.");
assert(css.includes(".command-transfer-trust-gate"), "styles.css is missing the Transfer Learning Trust Gate panel.");
assert(css.includes(".command-transfer-trust-grid"), "styles.css is missing the Transfer Learning Trust Gate grid.");
assert(css.includes(".command-tenant-policy-studio"), "styles.css is missing the Tenant Learning Policy Studio panel.");
assert(css.includes(".command-tenant-policy-grid"), "styles.css is missing the Tenant Learning Policy Studio grid.");
assert(css.includes(".command-tenant-impact-preview"), "styles.css is missing the Tenant Policy Impact Preview panel.");
assert(css.includes(".command-tenant-impact-grid"), "styles.css is missing the Tenant Policy Impact Preview grid.");
assert(css.includes(".command-tenant-outcome-loop"), "styles.css is missing the Tenant Outcome Learning Loop panel.");
assert(css.includes(".command-tenant-outcome-grid"), "styles.css is missing the Tenant Outcome Learning Loop grid.");
assert(css.includes(".command-tenant-reward-gate"), "styles.css is missing the Tenant Reinforcement Reward Gate panel.");
assert(css.includes(".command-tenant-reward-grid"), "styles.css is missing the Tenant Reinforcement Reward Gate grid.");
assert(css.includes(".command-tenant-canary-plan"), "styles.css is missing the Tenant Reinforcement Canary Plan panel.");
assert(css.includes(".command-tenant-canary-grid"), "styles.css is missing the Tenant Reinforcement Canary Plan grid.");
assert(css.includes(".command-tenant-canary-watch"), "styles.css is missing the Tenant Reinforcement Canary Watch panel.");
assert(css.includes(".command-tenant-watch-grid"), "styles.css is missing the Tenant Reinforcement Canary Watch grid.");
assert(css.includes(".command-tenant-graduation-gate"), "styles.css is missing the Tenant Reinforcement Graduation Gate panel.");
assert(css.includes(".command-tenant-graduation-grid"), "styles.css is missing the Tenant Reinforcement Graduation Gate grid.");
assert(css.includes(".command-tenant-reuse-passport"), "styles.css is missing the Tenant Reinforcement Reuse Passport panel.");
assert(css.includes(".command-tenant-reuse-grid"), "styles.css is missing the Tenant Reinforcement Reuse Passport grid.");
assert(css.includes(".command-tenant-fit-preview"), "styles.css is missing the Tenant Reinforcement Reuse Fit Preview panel.");
assert(css.includes(".command-tenant-fit-grid"), "styles.css is missing the Tenant Reinforcement Reuse Fit Preview grid.");
assert(css.includes(".command-tenant-activation-receipt"), "styles.css is missing the Tenant Reinforcement Reuse Activation Receipt panel.");
assert(css.includes(".command-tenant-activation-grid"), "styles.css is missing the Tenant Reinforcement Reuse Activation Receipt grid.");
assert(css.includes(".command-guidance-flight-deck"), "styles.css is missing the Guidance Flight Deck panel.");
assert(css.includes(".command-guidance-flight-lanes"), "styles.css is missing the Guidance Flight Deck lanes.");
assert(css.includes(".command-guidance-flight-guardrails"), "styles.css is missing the Guidance Flight Deck guardrails.");
assert(css.includes(".command-guidance-flight-recorder"), "styles.css is missing the Guidance Flight Recorder panel.");
assert(css.includes(".command-guidance-recorder-chapters"), "styles.css is missing the Guidance Flight Recorder chapters.");
assert(css.includes(".command-guidance-recorder-timeline"), "styles.css is missing the Guidance Flight Recorder timeline.");
assert(css.includes(".command-guidance-review-radar"), "styles.css is missing the Guidance Review Radar panel.");
assert(css.includes(".command-guidance-radar-signals"), "styles.css is missing the Guidance Review Radar signals.");
assert(css.includes(".command-guidance-radar-focus"), "styles.css is missing the Guidance Review Radar focus grid.");
assert(css.includes(".command-guidance-decision-brief"), "styles.css is missing the Guidance Decision Brief panel.");
assert(css.includes(".command-guidance-decision-grid"), "styles.css is missing the Guidance Decision Brief grid.");
assert(css.includes(".command-guidance-decision-signoff"), "styles.css is missing the Guidance Decision Brief signoff grid.");
assert(css.includes(".command-guidance-commitment-receipt"), "styles.css is missing the Guidance Commitment Receipt panel.");
assert(css.includes(".command-guidance-commitment-grid"), "styles.css is missing the Guidance Commitment Receipt grid.");
assert(css.includes(".command-guidance-commitment-checkpoints"), "styles.css is missing the Guidance Commitment Receipt checkpoints.");
assert(css.includes(".command-guidance-outcome-watch"), "styles.css is missing the Guidance Outcome Watch panel.");
assert(css.includes(".command-guidance-outcome-grid"), "styles.css is missing the Guidance Outcome Watch grid.");
assert(css.includes(".command-guidance-outcome-checkpoints"), "styles.css is missing the Guidance Outcome Watch checkpoints.");
assert(css.includes(".command-guidance-learning-capture"), "styles.css is missing the Guidance Learning Capture panel.");
assert(css.includes(".command-guidance-learning-grid"), "styles.css is missing the Guidance Learning Capture grid.");
assert(css.includes(".command-guidance-learning-controls"), "styles.css is missing the Guidance Learning Capture controls.");
assert(css.includes(".command-guidance-release-queue"), "styles.css is missing the Guidance Release Queue panel.");
assert(css.includes(".command-guidance-release-grid"), "styles.css is missing the Guidance Release Queue grid.");
assert(css.includes(".command-guidance-release-controls"), "styles.css is missing the Guidance Release Queue controls.");
assert(css.includes(".command-guidance-council-intake"), "styles.css is missing the Guidance Council Intake panel.");
assert(css.includes(".command-guidance-council-grid"), "styles.css is missing the Guidance Council Intake grid.");
assert(css.includes(".command-guidance-council-controls"), "styles.css is missing the Guidance Council Intake controls.");
assert(css.includes(".command-guidance-council-decision-gate"), "styles.css is missing the Guidance Council Decision Gate panel.");
assert(css.includes(".command-guidance-council-decision-grid"), "styles.css is missing the Guidance Council Decision Gate grid.");
assert(css.includes(".command-guidance-council-decision-controls"), "styles.css is missing the Guidance Council Decision Gate controls.");
assert(css.includes(".command-guidance-license-receipt"), "styles.css is missing the Guidance License Receipt panel.");
assert(css.includes(".command-guidance-license-grid"), "styles.css is missing the Guidance License Receipt grid.");
assert(css.includes(".command-guidance-license-controls"), "styles.css is missing the Guidance License Receipt controls.");
assert(css.includes(".command-guidance-expiry-watch"), "styles.css is missing the License Expiry Watch panel.");
assert(css.includes(".command-guidance-expiry-grid"), "styles.css is missing the License Expiry Watch grid.");
assert(css.includes(".command-guidance-expiry-controls"), "styles.css is missing the License Expiry Watch controls.");
assert(css.includes(".command-guidance-consent-renewal"), "styles.css is missing the Consent Renewal Lane panel.");
assert(css.includes(".command-guidance-consent-grid"), "styles.css is missing the Consent Renewal Lane grid.");
assert(css.includes(".command-guidance-consent-controls"), "styles.css is missing the Consent Renewal Lane controls.");
assert(css.includes(".command-guidance-outcome-review"), "styles.css is missing the Receipt Outcome Review panel.");
assert(css.includes(".command-guidance-outcome-review-grid"), "styles.css is missing the Receipt Outcome Review grid.");
assert(css.includes(".command-guidance-outcome-review-controls"), "styles.css is missing the Receipt Outcome Review controls.");
assert(css.includes(".command-guidance-retirement-receipt"), "styles.css is missing the License Retirement Receipt panel.");
assert(css.includes(".command-guidance-retirement-grid"), "styles.css is missing the License Retirement Receipt grid.");
assert(css.includes(".command-guidance-retirement-controls"), "styles.css is missing the License Retirement Receipt controls.");
assert(css.includes(".command-guidance-renewal-audit"), "styles.css is missing the Renewal Audit Pack panel.");
assert(css.includes(".command-guidance-audit-grid"), "styles.css is missing the Renewal Audit Pack grid.");
assert(css.includes(".command-guidance-audit-controls"), "styles.css is missing the Renewal Audit Pack controls.");
assert(css.includes(".command-guidance-renewal-ledger"), "styles.css is missing the Outcome Renewal Ledger panel.");
assert(css.includes(".command-guidance-ledger-grid"), "styles.css is missing the Outcome Renewal Ledger grid.");
assert(css.includes(".command-guidance-ledger-controls"), "styles.css is missing the Outcome Renewal Ledger controls.");
assert(css.includes(".command-guidance-appeal-lane"), "styles.css is missing the Retirement Appeal Lane panel.");
assert(css.includes(".command-guidance-appeal-grid"), "styles.css is missing the Retirement Appeal Lane grid.");
assert(css.includes(".command-guidance-appeal-controls"), "styles.css is missing the Retirement Appeal Lane controls.");
assert(css.includes(".command-guidance-signoff-trail"), "styles.css is missing the Audit Signoff Trail panel.");
assert(css.includes(".command-guidance-signoff-grid"), "styles.css is missing the Audit Signoff Trail grid.");
assert(css.includes(".command-guidance-signoff-controls"), "styles.css is missing the Audit Signoff Trail controls.");
assert(css.includes(".command-guidance-ledger-trend"), "styles.css is missing the Ledger Trend Watch panel.");
assert(css.includes(".command-guidance-trend-grid"), "styles.css is missing the Ledger Trend Watch grid.");
assert(css.includes(".command-guidance-trend-controls"), "styles.css is missing the Ledger Trend Watch controls.");
assert(css.includes(".command-guidance-appeal-decision"), "styles.css is missing the Appeal Decision Receipt panel.");
assert(css.includes(".command-guidance-appeal-decision-grid"), "styles.css is missing the Appeal Decision Receipt grid.");
assert(css.includes(".command-guidance-appeal-decision-controls"), "styles.css is missing the Appeal Decision Receipt controls.");
assert(css.includes(".command-guidance-signoff-outcome"), "styles.css is missing the Signoff Outcome Receipt panel.");
assert(css.includes(".command-guidance-signoff-outcome-grid"), "styles.css is missing the Signoff Outcome Receipt grid.");
assert(css.includes(".command-guidance-signoff-outcome-controls"), "styles.css is missing the Signoff Outcome Receipt controls.");
assert(css.includes(".command-guidance-trend-outcome"), "styles.css is missing the Trend Outcome Receipt panel.");
assert(css.includes(".command-guidance-trend-outcome-grid"), "styles.css is missing the Trend Outcome Receipt grid.");
assert(css.includes(".command-guidance-trend-outcome-controls"), "styles.css is missing the Trend Outcome Receipt controls.");
assert(css.includes(".command-guidance-appeal-watch"), "styles.css is missing the Appeal Decision Outcome Watch panel.");
assert(css.includes(".command-guidance-appeal-watch-grid"), "styles.css is missing the Appeal Decision Outcome Watch grid.");
assert(css.includes(".command-guidance-appeal-watch-controls"), "styles.css is missing the Appeal Decision Outcome Watch controls.");
assert(css.includes(".command-guidance-signoff-loop"), "styles.css is missing the Signoff Learning Loop panel.");
assert(css.includes(".command-guidance-signoff-loop-grid"), "styles.css is missing the Signoff Learning Loop grid.");
assert(css.includes(".command-guidance-signoff-loop-controls"), "styles.css is missing the Signoff Learning Loop controls.");
assert(css.includes(".command-guidance-trend-loop"), "styles.css is missing the Trend Learning Loop panel.");
assert(css.includes(".command-guidance-trend-loop-grid"), "styles.css is missing the Trend Learning Loop grid.");
assert(css.includes(".command-guidance-trend-loop-controls"), "styles.css is missing the Trend Learning Loop controls.");
assert(css.includes(".command-guidance-appeal-loop"), "styles.css is missing the Appeal Learning Loop panel.");
assert(css.includes(".command-guidance-appeal-loop-grid"), "styles.css is missing the Appeal Learning Loop grid.");
assert(css.includes(".command-guidance-appeal-loop-controls"), "styles.css is missing the Appeal Learning Loop controls.");
assert(css.includes(".command-guidance-signoff-governance"), "styles.css is missing the Signoff Loop Governance panel.");
assert(css.includes(".command-guidance-signoff-governance-grid"), "styles.css is missing the Signoff Loop Governance grid.");
assert(css.includes(".command-guidance-signoff-governance-controls"), "styles.css is missing the Signoff Loop Governance controls.");
assert(css.includes(".command-guidance-trend-governance"), "styles.css is missing the Trend Loop Governance panel.");
assert(css.includes(".command-guidance-trend-governance-grid"), "styles.css is missing the Trend Loop Governance grid.");
assert(css.includes(".command-guidance-trend-governance-controls"), "styles.css is missing the Trend Loop Governance controls.");
assert(css.includes(".command-guidance-appeal-governance"), "styles.css is missing the Appeal Loop Governance panel.");
assert(css.includes(".command-guidance-appeal-governance-grid"), "styles.css is missing the Appeal Loop Governance grid.");
assert(css.includes(".command-guidance-appeal-governance-controls"), "styles.css is missing the Appeal Loop Governance controls.");
assert(css.includes(".command-guidance-release-receipt"), "styles.css is missing the Governance Release Receipt panel.");
assert(css.includes(".command-guidance-release-receipt-grid"), "styles.css is missing the Governance Release Receipt grid.");
assert(css.includes(".command-guidance-release-receipt-controls"), "styles.css is missing the Governance Release Receipt controls.");
assert(css.includes(".command-guidance-outcome-monitor"), "styles.css is missing the Governance Outcome Monitor panel.");
assert(css.includes(".command-guidance-outcome-monitor-grid"), "styles.css is missing the Governance Outcome Monitor grid.");
assert(css.includes(".command-guidance-outcome-monitor-controls"), "styles.css is missing the Governance Outcome Monitor controls.");
assert(css.includes(".command-guidance-rollback-lane"), "styles.css is missing the Governance Rollback Lane panel.");
assert(css.includes(".command-guidance-rollback-lane-grid"), "styles.css is missing the Governance Rollback Lane grid.");
assert(css.includes(".command-guidance-rollback-lane-controls"), "styles.css is missing the Governance Rollback Lane controls.");
assert(css.includes(".command-guidance-release-archive"), "styles.css is missing the Governance Release Archive panel.");
assert(css.includes(".command-guidance-release-archive-grid"), "styles.css is missing the Governance Release Archive grid.");
assert(css.includes(".command-guidance-release-archive-controls"), "styles.css is missing the Governance Release Archive controls.");
assert(css.includes(".command-guidance-proof-repair-queue"), "styles.css is missing the Governance Proof Repair Queue panel.");
assert(css.includes(".command-guidance-proof-repair-queue-grid"), "styles.css is missing the Governance Proof Repair Queue grid.");
assert(css.includes(".command-guidance-proof-repair-queue-controls"), "styles.css is missing the Governance Proof Repair Queue controls.");
assert(css.includes(".command-guidance-calm-closeout"), "styles.css is missing the Governance Calm Closeout panel.");
assert(css.includes(".command-guidance-calm-closeout-grid"), "styles.css is missing the Governance Calm Closeout grid.");
assert(css.includes(".command-guidance-calm-closeout-controls"), "styles.css is missing the Governance Calm Closeout controls.");
assert(css.includes(".command-guidance-audit-export"), "styles.css is missing the Governance Audit Export panel.");
assert(css.includes(".command-guidance-audit-export-grid"), "styles.css is missing the Governance Audit Export grid.");
assert(css.includes(".command-guidance-audit-export-controls"), "styles.css is missing the Governance Audit Export controls.");
assert(css.includes(".command-guidance-proof-sla"), "styles.css is missing the Governance Proof SLA panel.");
assert(css.includes(".command-guidance-proof-sla-grid"), "styles.css is missing the Governance Proof SLA grid.");
assert(css.includes(".command-guidance-proof-sla-controls"), "styles.css is missing the Governance Proof SLA controls.");
assert(css.includes(".command-guidance-launch-evidence-packet"), "styles.css is missing the Governance Launch Evidence Packet panel.");
assert(css.includes(".command-launch-evidence-preview"), "styles.css is missing the top-level Governance Launch Evidence Packet preview.");
assert(css.includes(".command-guidance-launch-evidence-packet-grid"), "styles.css is missing the Governance Launch Evidence Packet grid.");
assert(css.includes(".command-guidance-launch-evidence-packet-controls"), "styles.css is missing the Governance Launch Evidence Packet controls.");
assert(css.includes(".command-governance-reviewer-console"), "styles.css is missing the Governance Reviewer Console panel.");
assert(css.includes(".command-reviewer-console-preview"), "styles.css is missing the top-level Governance Reviewer Console preview.");
assert(css.includes(".command-governance-reviewer-console-grid"), "styles.css is missing the Governance Reviewer Console grid.");
assert(css.includes(".command-governance-reviewer-console-lanes"), "styles.css is missing the Governance Reviewer Console lanes.");
assert(css.includes(".command-governance-reviewer-console-controls"), "styles.css is missing the Governance Reviewer Console controls.");
assert(css.includes(".command-governance-launch-gate-score"), "styles.css is missing the Governance Launch Gate Score panel.");
assert(css.includes(".command-launch-gate-score-preview"), "styles.css is missing the top-level Governance Launch Gate Score preview.");
assert(css.includes(".command-governance-launch-gate-score-grid"), "styles.css is missing the Governance Launch Gate Score grid.");
assert(css.includes(".command-governance-launch-gate-score-checks"), "styles.css is missing the Governance Launch Gate Score checks.");
assert(css.includes(".command-governance-launch-gate-score-controls"), "styles.css is missing the Governance Launch Gate Score controls.");
assert(css.includes(".command-governance-pilot-handoff-board"), "styles.css is missing the Governance Pilot Handoff Board panel.");
assert(css.includes(".command-pilot-handoff-board-preview"), "styles.css is missing the top-level Governance Pilot Handoff Board preview.");
assert(css.includes(".command-governance-pilot-handoff-board-grid"), "styles.css is missing the Governance Pilot Handoff Board grid.");
assert(css.includes(".command-governance-pilot-handoff-board-lanes"), "styles.css is missing the Governance Pilot Handoff Board lanes.");
assert(css.includes(".command-governance-pilot-handoff-board-controls"), "styles.css is missing the Governance Pilot Handoff Board controls.");
assert(css.includes(".command-governance-launch-rehearsal-room"), "styles.css is missing the Governance Launch Rehearsal Room panel.");
assert(css.includes(".command-launch-rehearsal-room-preview"), "styles.css is missing the top-level Governance Launch Rehearsal Room preview.");
assert(css.includes(".command-governance-launch-rehearsal-room-grid"), "styles.css is missing the Governance Launch Rehearsal Room grid.");
assert(css.includes(".command-governance-launch-rehearsal-room-scripts"), "styles.css is missing the Governance Launch Rehearsal Room scripts.");
assert(css.includes(".command-governance-launch-rehearsal-room-controls"), "styles.css is missing the Governance Launch Rehearsal Room controls.");
assert(css.includes(".command-governance-first-pilot-readiness-room"), "styles.css is missing the Governance First Pilot Readiness Room panel.");
assert(css.includes(".command-first-pilot-readiness-room-preview"), "styles.css is missing the top-level Governance First Pilot Readiness Room preview.");
assert(css.includes(".command-governance-first-pilot-readiness-room-grid"), "styles.css is missing the Governance First Pilot Readiness Room grid.");
assert(css.includes(".command-governance-first-pilot-readiness-room-gates"), "styles.css is missing the Governance First Pilot Readiness Room gates.");
assert(css.includes(".command-governance-first-pilot-readiness-room-controls"), "styles.css is missing the Governance First Pilot Readiness Room controls.");
assert(css.includes(".command-governance-pilot-acceptance-receipt"), "styles.css is missing the Governance Pilot Acceptance Receipt panel.");
assert(css.includes(".command-pilot-acceptance-receipt-preview"), "styles.css is missing the top-level Governance Pilot Acceptance Receipt preview.");
assert(css.includes(".command-governance-pilot-acceptance-receipt-grid"), "styles.css is missing the Governance Pilot Acceptance Receipt grid.");
assert(css.includes(".command-governance-pilot-acceptance-receipt-terms"), "styles.css is missing the Governance Pilot Acceptance Receipt terms.");
assert(css.includes(".command-governance-pilot-acceptance-receipt-controls"), "styles.css is missing the Governance Pilot Acceptance Receipt controls.");
assert(css.includes(".command-governance-launch-proof-board"), "styles.css is missing the Governance Launch Proof Board panel.");
assert(css.includes(".command-launch-proof-board-preview"), "styles.css is missing the top-level Governance Launch Proof Board preview.");
assert(css.includes(".command-governance-launch-proof-board-grid"), "styles.css is missing the Governance Launch Proof Board grid.");
assert(css.includes(".command-governance-launch-proof-board-evidence"), "styles.css is missing the Governance Launch Proof Board evidence.");
assert(css.includes(".command-governance-launch-proof-board-controls"), "styles.css is missing the Governance Launch Proof Board controls.");
assert(css.includes(".command-governance-first-pilot-operating-rhythm"), "styles.css is missing the Governance First Pilot Operating Rhythm panel.");
assert(css.includes(".command-first-pilot-operating-rhythm-preview"), "styles.css is missing the top-level Governance First Pilot Operating Rhythm preview.");
assert(css.includes(".command-governance-first-pilot-operating-rhythm-grid"), "styles.css is missing the Governance First Pilot Operating Rhythm grid.");
assert(css.includes(".command-governance-first-pilot-operating-rhythm-agenda"), "styles.css is missing the Governance First Pilot Operating Rhythm agenda.");
assert(css.includes(".command-governance-first-pilot-operating-rhythm-controls"), "styles.css is missing the Governance First Pilot Operating Rhythm controls.");
assert(css.includes(".command-governance-pilot-sponsor-update"), "styles.css is missing the Governance Pilot Sponsor Update panel.");
assert(css.includes(".command-pilot-sponsor-update-preview"), "styles.css is missing the top-level Governance Pilot Sponsor Update preview.");
assert(css.includes(".command-governance-pilot-sponsor-update-grid"), "styles.css is missing the Governance Pilot Sponsor Update grid.");
assert(css.includes(".command-governance-pilot-sponsor-update-message"), "styles.css is missing the Governance Pilot Sponsor Update message lane.");
assert(css.includes(".command-governance-pilot-sponsor-update-controls"), "styles.css is missing the Governance Pilot Sponsor Update controls.");
assert(css.includes(".command-governance-launch-support-desk"), "styles.css is missing the Governance Launch Support Desk panel.");
assert(css.includes(".command-launch-support-desk-preview"), "styles.css is missing the top-level Governance Launch Support Desk preview.");
assert(css.includes(".command-governance-launch-support-desk-grid"), "styles.css is missing the Governance Launch Support Desk grid.");
assert(css.includes(".command-governance-launch-support-desk-queue"), "styles.css is missing the Governance Launch Support Desk queue.");
assert(css.includes(".command-governance-launch-support-desk-controls"), "styles.css is missing the Governance Launch Support Desk controls.");
assert(css.includes(".command-governance-pilot-outcome-ledger"), "styles.css is missing the Governance Pilot Outcome Ledger panel.");
assert(css.includes(".command-pilot-outcome-ledger-preview"), "styles.css is missing the top-level Governance Pilot Outcome Ledger preview.");
assert(css.includes(".command-governance-pilot-outcome-ledger-grid"), "styles.css is missing the Governance Pilot Outcome Ledger grid.");
assert(css.includes(".command-governance-pilot-outcome-ledger-entries"), "styles.css is missing the Governance Pilot Outcome Ledger entries.");
assert(css.includes(".command-governance-pilot-outcome-ledger-controls"), "styles.css is missing the Governance Pilot Outcome Ledger controls.");
assert(css.includes(".command-governance-sponsor-decision-receipt"), "styles.css is missing the Governance Sponsor Decision Receipt panel.");
assert(css.includes(".command-sponsor-decision-receipt-preview"), "styles.css is missing the top-level Governance Sponsor Decision Receipt preview.");
assert(css.includes(".command-governance-sponsor-decision-receipt-grid"), "styles.css is missing the Governance Sponsor Decision Receipt grid.");
assert(css.includes(".command-governance-sponsor-decision-receipt-commitments"), "styles.css is missing the Governance Sponsor Decision Receipt commitments.");
assert(css.includes(".command-governance-sponsor-decision-receipt-controls"), "styles.css is missing the Governance Sponsor Decision Receipt controls.");
assert(css.includes(".command-governance-pilot-support-closeout"), "styles.css is missing the Governance Pilot Support Closeout panel.");
assert(css.includes(".command-pilot-support-closeout-preview"), "styles.css is missing the top-level Governance Pilot Support Closeout preview.");
assert(css.includes(".command-governance-pilot-support-closeout-grid"), "styles.css is missing the Governance Pilot Support Closeout grid.");
assert(css.includes(".command-governance-pilot-support-closeout-closeout"), "styles.css is missing the Governance Pilot Support Closeout closeout list.");
assert(css.includes(".command-governance-pilot-support-closeout-controls"), "styles.css is missing the Governance Pilot Support Closeout controls.");
assert(css.includes(".command-governance-pilot-learning-release"), "styles.css is missing the Governance Pilot Learning Release panel.");
assert(css.includes(".command-pilot-learning-release-preview"), "styles.css is missing the top-level Governance Pilot Learning Release preview.");
assert(css.includes(".command-governance-pilot-learning-release-grid"), "styles.css is missing the Governance Pilot Learning Release grid.");
assert(css.includes(".command-governance-pilot-learning-release-lanes"), "styles.css is missing the Governance Pilot Learning Release lanes.");
assert(css.includes(".command-governance-pilot-learning-release-controls"), "styles.css is missing the Governance Pilot Learning Release controls.");
assert(css.includes(".command-governance-sponsor-expansion-gate"), "styles.css is missing the Governance Sponsor Expansion Gate panel.");
assert(css.includes(".command-sponsor-expansion-gate-preview"), "styles.css is missing the top-level Governance Sponsor Expansion Gate preview.");
assert(css.includes(".command-governance-sponsor-expansion-gate-grid"), "styles.css is missing the Governance Sponsor Expansion Gate grid.");
assert(css.includes(".command-governance-sponsor-expansion-gate-lanes"), "styles.css is missing the Governance Sponsor Expansion Gate lanes.");
assert(css.includes(".command-governance-sponsor-expansion-gate-controls"), "styles.css is missing the Governance Sponsor Expansion Gate controls.");
assert(css.includes(".command-governance-launch-expansion-receipt"), "styles.css is missing the Governance Launch Expansion Receipt panel.");
assert(css.includes(".command-launch-expansion-receipt-preview"), "styles.css is missing the top-level Governance Launch Expansion Receipt preview.");
assert(css.includes(".command-governance-launch-expansion-receipt-grid"), "styles.css is missing the Governance Launch Expansion Receipt grid.");
assert(css.includes(".command-governance-launch-expansion-receipt-receipt"), "styles.css is missing the Governance Launch Expansion Receipt receipt list.");
assert(css.includes(".command-governance-launch-expansion-receipt-controls"), "styles.css is missing the Governance Launch Expansion Receipt controls.");
assert(css.includes(".command-governance-scaled-rollout-board"), "styles.css is missing the Governance Scaled Rollout Board panel.");
assert(css.includes(".command-scaled-rollout-board-preview"), "styles.css is missing the top-level Governance Scaled Rollout Board preview.");
assert(css.includes(".command-governance-scaled-rollout-board-grid"), "styles.css is missing the Governance Scaled Rollout Board grid.");
assert(css.includes(".command-governance-scaled-rollout-board-lanes"), "styles.css is missing the Governance Scaled Rollout Board lanes.");
assert(css.includes(".command-governance-scaled-rollout-board-controls"), "styles.css is missing the Governance Scaled Rollout Board controls.");
assert(css.includes(".command-governance-expansion-support-desk"), "styles.css is missing the Governance Expansion Support Desk panel.");
assert(css.includes(".command-expansion-support-desk-preview"), "styles.css is missing the top-level Governance Expansion Support Desk preview.");
assert(css.includes(".command-governance-expansion-support-desk-grid"), "styles.css is missing the Governance Expansion Support Desk grid.");
assert(css.includes(".command-governance-expansion-support-desk-queue"), "styles.css is missing the Governance Expansion Support Desk queue.");
assert(css.includes(".command-governance-expansion-support-desk-controls"), "styles.css is missing the Governance Expansion Support Desk controls.");
assert(css.includes(".command-governance-scaled-rollout-proof-board"), "styles.css is missing the Governance Scaled Rollout Proof Board panel.");
assert(css.includes(".command-scaled-rollout-proof-board-preview"), "styles.css is missing the top-level Governance Scaled Rollout Proof Board preview.");
assert(css.includes(".command-governance-scaled-rollout-proof-board-grid"), "styles.css is missing the Governance Scaled Rollout Proof Board grid.");
assert(css.includes(".command-governance-scaled-rollout-proof-board-evidence"), "styles.css is missing the Governance Scaled Rollout Proof Board evidence lanes.");
assert(css.includes(".command-governance-scaled-rollout-proof-board-controls"), "styles.css is missing the Governance Scaled Rollout Proof Board controls.");
assert(css.includes(".command-governance-rollout-sponsor-update"), "styles.css is missing the Governance Rollout Sponsor Update panel.");
assert(css.includes(".command-rollout-sponsor-update-preview"), "styles.css is missing the top-level Governance Rollout Sponsor Update preview.");
assert(css.includes(".command-governance-rollout-sponsor-update-grid"), "styles.css is missing the Governance Rollout Sponsor Update grid.");
assert(css.includes(".command-governance-rollout-sponsor-update-message"), "styles.css is missing the Governance Rollout Sponsor Update message lanes.");
assert(css.includes(".command-governance-rollout-sponsor-update-controls"), "styles.css is missing the Governance Rollout Sponsor Update controls.");
assert(css.includes(".command-governance-rollout-outcome-ledger"), "styles.css is missing the Governance Rollout Outcome Ledger panel.");
assert(css.includes(".command-rollout-outcome-ledger-preview"), "styles.css is missing the top-level Governance Rollout Outcome Ledger preview.");
assert(css.includes(".command-governance-rollout-outcome-ledger-grid"), "styles.css is missing the Governance Rollout Outcome Ledger grid.");
assert(css.includes(".command-governance-rollout-outcome-ledger-entries"), "styles.css is missing the Governance Rollout Outcome Ledger entries.");
assert(css.includes(".command-governance-rollout-outcome-ledger-controls"), "styles.css is missing the Governance Rollout Outcome Ledger controls.");
assert(css.includes(".command-governance-rollout-learning-receipt"), "styles.css is missing the Governance Rollout Learning Receipt panel.");
assert(css.includes(".command-rollout-learning-receipt-preview"), "styles.css is missing the top-level Governance Rollout Learning Receipt preview.");
assert(css.includes(".command-governance-rollout-learning-receipt-grid"), "styles.css is missing the Governance Rollout Learning Receipt grid.");
assert(css.includes(".command-governance-rollout-learning-receipt-lanes"), "styles.css is missing the Governance Rollout Learning Receipt lanes.");
assert(css.includes(".command-governance-rollout-learning-receipt-controls"), "styles.css is missing the Governance Rollout Learning Receipt controls.");
assert(css.includes(".command-governance-rollout-sponsor-decision-receipt"), "styles.css is missing the Governance Rollout Sponsor Decision Receipt panel.");
assert(css.includes(".command-rollout-sponsor-decision-receipt-preview"), "styles.css is missing the top-level Governance Rollout Sponsor Decision Receipt preview.");
assert(css.includes(".command-governance-rollout-sponsor-decision-receipt-grid"), "styles.css is missing the Governance Rollout Sponsor Decision Receipt grid.");
assert(css.includes(".command-governance-rollout-sponsor-decision-receipt-decisions"), "styles.css is missing the Governance Rollout Sponsor Decision Receipt decisions.");
assert(css.includes(".command-governance-rollout-sponsor-decision-receipt-controls"), "styles.css is missing the Governance Rollout Sponsor Decision Receipt controls.");
assert(css.includes(".command-governance-rollout-reuse-gate"), "styles.css is missing the Governance Rollout Reuse Gate panel.");
assert(css.includes(".command-rollout-reuse-gate-preview"), "styles.css is missing the top-level Governance Rollout Reuse Gate preview.");
assert(css.includes(".command-governance-rollout-reuse-gate-grid"), "styles.css is missing the Governance Rollout Reuse Gate grid.");
assert(css.includes(".command-governance-rollout-reuse-gate-lanes"), "styles.css is missing the Governance Rollout Reuse Gate lanes.");
assert(css.includes(".command-governance-rollout-reuse-gate-controls"), "styles.css is missing the Governance Rollout Reuse Gate controls.");
assert(css.includes(".command-governance-rollout-learning-review-room"), "styles.css is missing the Governance Rollout Learning Review Room panel.");
assert(css.includes(".command-rollout-learning-review-room-preview"), "styles.css is missing the top-level Governance Rollout Learning Review Room preview.");
assert(css.includes(".command-governance-rollout-learning-review-room-grid"), "styles.css is missing the Governance Rollout Learning Review Room grid.");
assert(css.includes(".command-governance-rollout-learning-review-room-checks"), "styles.css is missing the Governance Rollout Learning Review Room checks.");
assert(css.includes(".command-governance-rollout-learning-review-room-actions-list"), "styles.css is missing the Governance Rollout Learning Review Room action lanes.");
assert(css.includes(".command-governance-rollout-decision-audit-pack"), "styles.css is missing the Governance Rollout Decision Audit Pack panel.");
assert(css.includes(".command-rollout-decision-audit-pack-preview"), "styles.css is missing the top-level Governance Rollout Decision Audit Pack preview.");
assert(css.includes(".command-governance-rollout-decision-audit-pack-grid"), "styles.css is missing the Governance Rollout Decision Audit Pack grid.");
assert(css.includes(".command-governance-rollout-decision-audit-pack-evidence"), "styles.css is missing the Governance Rollout Decision Audit Pack evidence lanes.");
assert(css.includes(".command-governance-rollout-decision-audit-pack-handoff"), "styles.css is missing the Governance Rollout Decision Audit Pack handoff lanes.");
assert(css.includes(".command-governance-rollout-reuse-activation-receipt"), "styles.css is missing the Governance Rollout Reuse Activation Receipt panel.");
assert(css.includes(".command-rollout-reuse-activation-receipt-preview"), "styles.css is missing the top-level Governance Rollout Reuse Activation Receipt preview.");
assert(css.includes(".command-governance-rollout-reuse-activation-receipt-grid"), "styles.css is missing the Governance Rollout Reuse Activation Receipt grid.");
assert(css.includes(".command-governance-rollout-reuse-activation-receipt-surfaces"), "styles.css is missing the Governance Rollout Reuse Activation Receipt surface lanes.");
assert(css.includes(".command-governance-rollout-reuse-activation-receipt-controls"), "styles.css is missing the Governance Rollout Reuse Activation Receipt controls.");
assert(css.includes(".command-governance-rollout-activation-outcome-watch"), "styles.css is missing the Governance Rollout Activation Outcome Watch panel.");
assert(css.includes(".command-rollout-activation-outcome-watch-preview"), "styles.css is missing the top-level Governance Rollout Activation Outcome Watch preview.");
assert(css.includes(".command-governance-rollout-activation-outcome-watch-grid"), "styles.css is missing the Governance Rollout Activation Outcome Watch grid.");
assert(css.includes(".command-governance-rollout-activation-outcome-watch-signals"), "styles.css is missing the Governance Rollout Activation Outcome Watch signal lanes.");
assert(css.includes(".command-governance-rollout-activation-outcome-watch-controls"), "styles.css is missing the Governance Rollout Activation Outcome Watch controls.");
assert(css.includes(".command-governance-rollout-audit-closeout-receipt"), "styles.css is missing the Governance Rollout Audit Closeout Receipt panel.");
assert(css.includes(".command-rollout-audit-closeout-receipt-preview"), "styles.css is missing the top-level Governance Rollout Audit Closeout Receipt preview.");
assert(css.includes(".command-governance-rollout-audit-closeout-receipt-grid"), "styles.css is missing the Governance Rollout Audit Closeout Receipt grid.");
assert(css.includes(".command-governance-rollout-audit-closeout-receipt-audit"), "styles.css is missing the Governance Rollout Audit Closeout Receipt audit lanes.");
assert(css.includes(".command-governance-rollout-audit-closeout-receipt-controls"), "styles.css is missing the Governance Rollout Audit Closeout Receipt controls.");
assert(css.includes(".command-governance-rollout-launch-readiness-seal"), "styles.css is missing the Governance Rollout Launch Readiness Seal panel.");
assert(css.includes(".command-rollout-launch-readiness-seal-preview"), "styles.css is missing the top-level Governance Rollout Launch Readiness Seal preview.");
assert(css.includes(".command-governance-rollout-launch-readiness-seal-grid"), "styles.css is missing the Governance Rollout Launch Readiness Seal grid.");
assert(css.includes(".command-governance-rollout-launch-readiness-seal-readiness"), "styles.css is missing the Governance Rollout Launch Readiness Seal readiness lanes.");
assert(css.includes(".command-governance-rollout-launch-readiness-seal-controls"), "styles.css is missing the Governance Rollout Launch Readiness Seal controls.");
assert(css.includes(".command-governance-first-pilot-proof-bridge"), "styles.css is missing the Governance First Pilot Proof Bridge panel.");
assert(css.includes(".command-first-pilot-proof-bridge-preview"), "styles.css is missing the top-level Governance First Pilot Proof Bridge preview.");
assert(css.includes(".command-governance-first-pilot-proof-bridge-grid"), "styles.css is missing the Governance First Pilot Proof Bridge grid.");
assert(css.includes(".command-governance-first-pilot-proof-bridge-proof"), "styles.css is missing the Governance First Pilot Proof Bridge proof lanes.");
assert(css.includes(".command-governance-first-pilot-proof-bridge-controls"), "styles.css is missing the Governance First Pilot Proof Bridge controls.");
assert(css.includes(".command-governance-first-pilot-command-room"), "styles.css is missing the Governance First Pilot Command Room panel.");
assert(css.includes(".command-first-pilot-command-room-preview"), "styles.css is missing the top-level Governance First Pilot Command Room preview.");
assert(css.includes(".command-governance-first-pilot-command-room-grid"), "styles.css is missing the Governance First Pilot Command Room grid.");
assert(css.includes(".command-governance-first-pilot-command-room-lanes"), "styles.css is missing the Governance First Pilot Command Room day-one lanes.");
assert(css.includes(".command-governance-first-pilot-command-room-controls"), "styles.css is missing the Governance First Pilot Command Room controls.");
assert(css.includes(".command-governance-first-pilot-outcome-watch"), "styles.css is missing the Governance First Pilot Outcome Watch panel.");
assert(css.includes(".command-first-pilot-outcome-watch-preview"), "styles.css is missing the top-level Governance First Pilot Outcome Watch preview.");
assert(css.includes(".command-governance-first-pilot-outcome-watch-grid"), "styles.css is missing the Governance First Pilot Outcome Watch grid.");
assert(css.includes(".command-governance-first-pilot-outcome-watch-signals"), "styles.css is missing the Governance First Pilot Outcome Watch signals.");
assert(css.includes(".command-governance-first-pilot-outcome-watch-controls"), "styles.css is missing the Governance First Pilot Outcome Watch controls.");
assert(css.includes(".command-governance-first-pilot-support-receipt"), "styles.css is missing the Governance First Pilot Support Receipt panel.");
assert(css.includes(".command-first-pilot-support-receipt-preview"), "styles.css is missing the top-level Governance First Pilot Support Receipt preview.");
assert(css.includes(".command-governance-first-pilot-support-receipt-grid"), "styles.css is missing the Governance First Pilot Support Receipt grid.");
assert(css.includes(".command-governance-first-pilot-support-receipt-blockers"), "styles.css is missing the Governance First Pilot Support Receipt blockers.");
assert(css.includes(".command-governance-first-pilot-support-receipt-controls"), "styles.css is missing the Governance First Pilot Support Receipt controls.");
assert(css.includes(".command-governance-first-pilot-learning-room"), "styles.css is missing the Governance First Pilot Learning Room panel.");
assert(css.includes(".command-first-pilot-learning-room-preview"), "styles.css is missing the top-level Governance First Pilot Learning Room preview.");
assert(css.includes(".command-governance-first-pilot-learning-room-grid"), "styles.css is missing the Governance First Pilot Learning Room grid.");
assert(css.includes(".command-governance-first-pilot-learning-room-lanes"), "styles.css is missing the Governance First Pilot Learning Room lanes.");
assert(css.includes(".command-governance-first-pilot-learning-room-controls"), "styles.css is missing the Governance First Pilot Learning Room controls.");
assert(css.includes(".command-governance-first-pilot-expansion-decision"), "styles.css is missing the Governance First Pilot Expansion Decision panel.");
assert(css.includes(".command-first-pilot-expansion-decision-preview"), "styles.css is missing the top-level Governance First Pilot Expansion Decision preview.");
assert(css.includes(".command-governance-first-pilot-expansion-decision-grid"), "styles.css is missing the Governance First Pilot Expansion Decision grid.");
assert(css.includes(".command-governance-first-pilot-expansion-decision-options"), "styles.css is missing the Governance First Pilot Expansion Decision options.");
assert(css.includes(".command-governance-first-pilot-expansion-decision-controls"), "styles.css is missing the Governance First Pilot Expansion Decision controls.");
assert(css.includes(".command-governance-second-pilot-readiness"), "styles.css is missing the Governance Second Pilot Readiness panel.");
assert(css.includes(".command-second-pilot-readiness-preview"), "styles.css is missing the top-level Governance Second Pilot Readiness preview.");
assert(css.includes(".command-governance-second-pilot-readiness-grid"), "styles.css is missing the Governance Second Pilot Readiness grid.");
assert(css.includes(".command-governance-second-pilot-readiness-gates"), "styles.css is missing the Governance Second Pilot Readiness gates.");
assert(css.includes(".command-governance-second-pilot-readiness-controls"), "styles.css is missing the Governance Second Pilot Readiness controls.");
assert(css.includes(".command-governance-second-pilot-launch-room"), "styles.css is missing the Governance Second Pilot Launch Room panel.");
assert(css.includes(".command-second-pilot-launch-room-preview"), "styles.css is missing the top-level Governance Second Pilot Launch Room preview.");
assert(css.includes(".command-governance-second-pilot-launch-room-grid"), "styles.css is missing the Governance Second Pilot Launch Room grid.");
assert(css.includes(".command-governance-second-pilot-launch-room-brief"), "styles.css is missing the Governance Second Pilot Launch Room brief.");
assert(css.includes(".command-governance-second-pilot-launch-room-controls"), "styles.css is missing the Governance Second Pilot Launch Room controls.");
assert(css.includes(".command-governance-second-pilot-outcome-watch"), "styles.css is missing the Governance Second Pilot Outcome Watch panel.");
assert(css.includes(".command-second-pilot-outcome-watch-preview"), "styles.css is missing the top-level Governance Second Pilot Outcome Watch preview.");
assert(css.includes(".command-governance-second-pilot-outcome-watch-grid"), "styles.css is missing the Governance Second Pilot Outcome Watch grid.");
assert(css.includes(".command-governance-second-pilot-outcome-watch-signals"), "styles.css is missing the Governance Second Pilot Outcome Watch signals.");
assert(css.includes(".command-governance-second-pilot-outcome-watch-controls"), "styles.css is missing the Governance Second Pilot Outcome Watch controls.");
assert(css.includes(".command-governance-second-pilot-support-receipt"), "styles.css is missing the Governance Second Pilot Support Receipt panel.");
assert(css.includes(".command-second-pilot-support-receipt-preview"), "styles.css is missing the top-level Governance Second Pilot Support Receipt preview.");
assert(css.includes(".command-governance-second-pilot-support-receipt-grid"), "styles.css is missing the Governance Second Pilot Support Receipt grid.");
assert(css.includes(".command-governance-second-pilot-support-receipt-lines"), "styles.css is missing the Governance Second Pilot Support Receipt lines.");
assert(css.includes(".command-governance-second-pilot-support-receipt-controls"), "styles.css is missing the Governance Second Pilot Support Receipt controls.");
assert(css.includes(".command-governance-second-pilot-learning-room"), "styles.css is missing the Governance Second Pilot Learning Room panel.");
assert(css.includes(".command-second-pilot-learning-room-preview"), "styles.css is missing the top-level Governance Second Pilot Learning Room preview.");
assert(css.includes(".command-governance-second-pilot-learning-room-grid"), "styles.css is missing the Governance Second Pilot Learning Room grid.");
assert(css.includes(".command-governance-second-pilot-learning-room-lanes"), "styles.css is missing the Governance Second Pilot Learning Room lanes.");
assert(css.includes(".command-governance-second-pilot-learning-room-controls"), "styles.css is missing the Governance Second Pilot Learning Room controls.");
assert(css.includes(".command-governance-second-pilot-expansion-gate"), "styles.css is missing the Governance Second Pilot Expansion Gate panel.");
assert(css.includes(".command-second-pilot-expansion-gate-preview"), "styles.css is missing the top-level Governance Second Pilot Expansion Gate preview.");
assert(css.includes(".command-governance-second-pilot-expansion-gate-grid"), "styles.css is missing the Governance Second Pilot Expansion Gate grid.");
assert(css.includes(".command-governance-second-pilot-expansion-gate-options"), "styles.css is missing the Governance Second Pilot Expansion Gate options.");
assert(css.includes(".command-governance-second-pilot-expansion-gate-controls"), "styles.css is missing the Governance Second Pilot Expansion Gate controls.");
assert(css.includes(".command-governance-second-pilot-decision-audit-pack"), "styles.css is missing the Governance Second Pilot Decision Audit Pack panel.");
assert(css.includes(".command-second-pilot-decision-audit-pack-preview"), "styles.css is missing the top-level Governance Second Pilot Decision Audit Pack preview.");
assert(css.includes(".command-governance-second-pilot-decision-audit-pack-grid"), "styles.css is missing the Governance Second Pilot Decision Audit Pack grid.");
assert(css.includes(".command-governance-second-pilot-decision-audit-pack-evidence"), "styles.css is missing the Governance Second Pilot Decision Audit Pack evidence.");
assert(css.includes(".command-governance-second-pilot-decision-audit-pack-handoff"), "styles.css is missing the Governance Second Pilot Decision Audit Pack handoff.");
assert(css.includes(".command-governance-second-pilot-reuse-activation"), "styles.css is missing the Governance Second Pilot Reuse Activation panel.");
assert(css.includes(".command-second-pilot-reuse-activation-preview"), "styles.css is missing the top-level Governance Second Pilot Reuse Activation preview.");
assert(css.includes(".command-governance-second-pilot-reuse-activation-grid"), "styles.css is missing the Governance Second Pilot Reuse Activation grid.");
assert(css.includes(".command-governance-second-pilot-reuse-activation-surfaces"), "styles.css is missing the Governance Second Pilot Reuse Activation surfaces.");
assert(css.includes(".command-governance-second-pilot-reuse-activation-controls"), "styles.css is missing the Governance Second Pilot Reuse Activation controls.");
assert(css.includes(".command-governance-second-pilot-activation-outcome-watch"), "styles.css is missing the Governance Second Pilot Activation Outcome Watch panel.");
assert(css.includes(".command-second-pilot-activation-outcome-watch-preview"), "styles.css is missing the top-level Governance Second Pilot Activation Outcome Watch preview.");
assert(css.includes(".command-governance-second-pilot-activation-outcome-watch-grid"), "styles.css is missing the Governance Second Pilot Activation Outcome Watch grid.");
assert(css.includes(".command-governance-second-pilot-activation-outcome-watch-signals"), "styles.css is missing the Governance Second Pilot Activation Outcome Watch signals.");
assert(css.includes(".command-governance-second-pilot-activation-outcome-watch-controls"), "styles.css is missing the Governance Second Pilot Activation Outcome Watch controls.");
assert(css.includes(".command-governance-second-pilot-audit-closeout-receipt"), "styles.css is missing the Governance Second Pilot Audit Closeout Receipt panel.");
assert(css.includes(".command-second-pilot-audit-closeout-receipt-preview"), "styles.css is missing the top-level Governance Second Pilot Audit Closeout Receipt preview.");
assert(css.includes(".command-governance-second-pilot-audit-closeout-receipt-grid"), "styles.css is missing the Governance Second Pilot Audit Closeout Receipt grid.");
assert(css.includes(".command-governance-second-pilot-audit-closeout-receipt-audit"), "styles.css is missing the Governance Second Pilot Audit Closeout Receipt audit lanes.");
assert(css.includes(".command-governance-second-pilot-audit-closeout-receipt-controls"), "styles.css is missing the Governance Second Pilot Audit Closeout Receipt controls.");
assert(css.includes(".command-governance-second-pilot-launch-readiness-seal"), "styles.css is missing the Governance Second Pilot Launch Readiness Seal panel.");
assert(css.includes(".command-second-pilot-launch-readiness-seal-preview"), "styles.css is missing the top-level Governance Second Pilot Launch Readiness Seal preview.");
assert(css.includes(".command-governance-second-pilot-launch-readiness-seal-grid"), "styles.css is missing the Governance Second Pilot Launch Readiness Seal grid.");
assert(css.includes(".command-governance-second-pilot-launch-readiness-seal-readiness"), "styles.css is missing the Governance Second Pilot Launch Readiness Seal readiness lanes.");
assert(css.includes(".command-governance-second-pilot-launch-readiness-seal-controls"), "styles.css is missing the Governance Second Pilot Launch Readiness Seal controls.");
assert(css.includes(".command-governance-second-pilot-support-readiness-closeout"), "styles.css is missing the Governance Second Pilot Support Readiness Closeout panel.");
assert(css.includes(".command-second-pilot-support-readiness-closeout-preview"), "styles.css is missing the top-level Governance Second Pilot Support Readiness Closeout preview.");
assert(css.includes(".command-governance-second-pilot-support-readiness-closeout-grid"), "styles.css is missing the Governance Second Pilot Support Readiness Closeout grid.");
assert(css.includes(".command-governance-second-pilot-support-readiness-closeout-support"), "styles.css is missing the Governance Second Pilot Support Readiness Closeout support lanes.");
assert(css.includes(".command-governance-second-pilot-support-readiness-closeout-controls"), "styles.css is missing the Governance Second Pilot Support Readiness Closeout controls.");
assert(css.includes(".command-governance-second-pilot-launch-handoff-pack"), "styles.css is missing the Governance Second Pilot Launch Handoff Pack panel.");
assert(css.includes(".command-second-pilot-launch-handoff-pack-preview"), "styles.css is missing the top-level Governance Second Pilot Launch Handoff Pack preview.");
assert(css.includes(".command-governance-second-pilot-launch-handoff-pack-grid"), "styles.css is missing the Governance Second Pilot Launch Handoff Pack grid.");
assert(css.includes(".command-governance-second-pilot-launch-handoff-pack-lanes"), "styles.css is missing the Governance Second Pilot Launch Handoff Pack lanes.");
assert(css.includes(".command-governance-second-pilot-launch-handoff-pack-controls"), "styles.css is missing the Governance Second Pilot Launch Handoff Pack controls.");
assert(css.includes(".command-governance-second-pilot-first-review-bridge"), "styles.css is missing the Governance Second Pilot First Review Bridge panel.");
assert(css.includes(".command-second-pilot-first-review-bridge-preview"), "styles.css is missing the top-level Governance Second Pilot First Review Bridge preview.");
assert(css.includes(".command-governance-second-pilot-first-review-bridge-grid"), "styles.css is missing the Governance Second Pilot First Review Bridge grid.");
assert(css.includes(".command-governance-second-pilot-first-review-bridge-lanes"), "styles.css is missing the Governance Second Pilot First Review Bridge lanes.");
assert(css.includes(".command-governance-second-pilot-first-review-bridge-controls"), "styles.css is missing the Governance Second Pilot First Review Bridge controls.");
assert(css.includes(".command-governance-second-pilot-first-review-outcome-watch"), "styles.css is missing the Governance Second Pilot First Review Outcome Watch panel.");
assert(css.includes(".command-second-pilot-first-review-outcome-watch-preview"), "styles.css is missing the top-level Governance Second Pilot First Review Outcome Watch preview.");
assert(css.includes(".command-governance-second-pilot-first-review-outcome-watch-grid"), "styles.css is missing the Governance Second Pilot First Review Outcome Watch grid.");
assert(css.includes(".command-governance-second-pilot-first-review-outcome-watch-signals"), "styles.css is missing the Governance Second Pilot First Review Outcome Watch signals.");
assert(css.includes(".command-governance-second-pilot-first-review-outcome-watch-controls"), "styles.css is missing the Governance Second Pilot First Review Outcome Watch controls.");
assert(css.includes(".command-governance-second-pilot-review-learning-receipt"), "styles.css is missing the Governance Second Pilot Review Learning Receipt panel.");
assert(css.includes(".command-second-pilot-review-learning-receipt-preview"), "styles.css is missing the top-level Governance Second Pilot Review Learning Receipt preview.");
assert(css.includes(".command-governance-second-pilot-review-learning-receipt-grid"), "styles.css is missing the Governance Second Pilot Review Learning Receipt grid.");
assert(css.includes(".command-governance-second-pilot-review-learning-receipt-lanes"), "styles.css is missing the Governance Second Pilot Review Learning Receipt lanes.");
assert(css.includes(".command-governance-second-pilot-review-learning-receipt-controls"), "styles.css is missing the Governance Second Pilot Review Learning Receipt controls.");
assert(css.includes(".command-governance-second-pilot-expansion-decision-receipt"), "styles.css is missing the Governance Second Pilot Expansion Decision Receipt panel.");
assert(css.includes(".command-second-pilot-expansion-decision-receipt-preview"), "styles.css is missing the top-level Governance Second Pilot Expansion Decision Receipt preview.");
assert(css.includes(".command-governance-second-pilot-expansion-decision-receipt-grid"), "styles.css is missing the Governance Second Pilot Expansion Decision Receipt grid.");
assert(css.includes(".command-governance-second-pilot-expansion-decision-receipt-options"), "styles.css is missing the Governance Second Pilot Expansion Decision Receipt options.");
assert(css.includes(".command-governance-second-pilot-expansion-decision-receipt-controls"), "styles.css is missing the Governance Second Pilot Expansion Decision Receipt controls.");
assert(css.includes(".command-governance-second-pilot-expansion-readiness-room"), "styles.css is missing the Governance Second Pilot Expansion Readiness Room panel.");
assert(css.includes(".command-second-pilot-expansion-readiness-room-preview"), "styles.css is missing the top-level Governance Second Pilot Expansion Readiness Room preview.");
assert(css.includes(".command-governance-second-pilot-expansion-readiness-room-grid"), "styles.css is missing the Governance Second Pilot Expansion Readiness Room grid.");
assert(css.includes(".command-governance-second-pilot-expansion-readiness-room-gates"), "styles.css is missing the Governance Second Pilot Expansion Readiness Room gates.");
assert(css.includes(".command-governance-second-pilot-expansion-readiness-room-controls"), "styles.css is missing the Governance Second Pilot Expansion Readiness Room controls.");
assert(css.includes(".command-governance-second-pilot-expansion-launch-handoff"), "styles.css is missing the Governance Second Pilot Expansion Launch Handoff panel.");
assert(css.includes(".command-second-pilot-expansion-launch-handoff-preview"), "styles.css is missing the top-level Governance Second Pilot Expansion Launch Handoff preview.");
assert(css.includes(".command-governance-second-pilot-expansion-launch-handoff-grid"), "styles.css is missing the Governance Second Pilot Expansion Launch Handoff grid.");
assert(css.includes(".command-governance-second-pilot-expansion-launch-handoff-lanes"), "styles.css is missing the Governance Second Pilot Expansion Launch Handoff lanes.");
assert(css.includes(".command-governance-second-pilot-expansion-launch-handoff-controls"), "styles.css is missing the Governance Second Pilot Expansion Launch Handoff controls.");
assert(css.includes(".command-governance-second-pilot-expansion-outcome-watch"), "styles.css is missing the Governance Second Pilot Expansion Outcome Watch panel.");
assert(css.includes(".command-second-pilot-expansion-outcome-watch-preview"), "styles.css is missing the top-level Governance Second Pilot Expansion Outcome Watch preview.");
assert(css.includes(".command-governance-second-pilot-expansion-outcome-watch-grid"), "styles.css is missing the Governance Second Pilot Expansion Outcome Watch grid.");
assert(css.includes(".command-governance-second-pilot-expansion-outcome-watch-signals"), "styles.css is missing the Governance Second Pilot Expansion Outcome Watch signals.");
assert(css.includes(".command-governance-second-pilot-expansion-outcome-watch-controls"), "styles.css is missing the Governance Second Pilot Expansion Outcome Watch controls.");
assert(css.includes(".command-governance-second-pilot-expansion-learning-handoff"), "styles.css is missing the Governance Second Pilot Expansion Learning Handoff panel.");
assert(css.includes(".command-second-pilot-expansion-learning-handoff-preview"), "styles.css is missing the top-level Governance Second Pilot Expansion Learning Handoff preview.");
assert(css.includes(".command-governance-second-pilot-expansion-learning-handoff-grid"), "styles.css is missing the Governance Second Pilot Expansion Learning Handoff grid.");
assert(css.includes(".command-governance-second-pilot-expansion-learning-handoff-lanes"), "styles.css is missing the Governance Second Pilot Expansion Learning Handoff lanes.");
assert(css.includes(".command-governance-second-pilot-expansion-learning-handoff-controls"), "styles.css is missing the Governance Second Pilot Expansion Learning Handoff controls.");
assert(css.includes(".command-governance-second-pilot-expansion-support-receipt"), "styles.css is missing the Governance Second Pilot Expansion Support Receipt panel.");
assert(css.includes(".command-second-pilot-expansion-support-receipt-preview"), "styles.css is missing the top-level Governance Second Pilot Expansion Support Receipt preview.");
assert(css.includes(".command-governance-second-pilot-expansion-support-receipt-grid"), "styles.css is missing the Governance Second Pilot Expansion Support Receipt grid.");
assert(css.includes(".command-governance-second-pilot-expansion-support-receipt-lanes"), "styles.css is missing the Governance Second Pilot Expansion Support Receipt lanes.");
assert(css.includes(".command-governance-second-pilot-expansion-support-receipt-controls"), "styles.css is missing the Governance Second Pilot Expansion Support Receipt controls.");
assert(css.includes(".command-governance-second-pilot-expansion-wider-launch-gate"), "styles.css is missing the Governance Second Pilot Expansion Wider Launch Gate panel.");
assert(css.includes(".command-second-pilot-expansion-wider-launch-gate-preview"), "styles.css is missing the top-level Governance Second Pilot Expansion Wider Launch Gate preview.");
assert(css.includes(".command-governance-second-pilot-expansion-wider-launch-gate-grid"), "styles.css is missing the Governance Second Pilot Expansion Wider Launch Gate grid.");
assert(css.includes(".command-governance-second-pilot-expansion-wider-launch-gate-checks"), "styles.css is missing the Governance Second Pilot Expansion Wider Launch Gate checks.");
assert(css.includes(".command-governance-second-pilot-expansion-wider-launch-gate-controls"), "styles.css is missing the Governance Second Pilot Expansion Wider Launch Gate controls.");
assert(css.includes(".command-governance-second-pilot-expansion-wider-launch-decision-receipt"), "styles.css is missing the Governance Second Pilot Expansion Wider Launch Decision Receipt panel.");
assert(css.includes(".command-second-pilot-expansion-wider-launch-decision-receipt-preview"), "styles.css is missing the top-level Governance Second Pilot Expansion Wider Launch Decision Receipt preview.");
assert(css.includes(".command-governance-second-pilot-expansion-wider-launch-decision-receipt-grid"), "styles.css is missing the Governance Second Pilot Expansion Wider Launch Decision Receipt grid.");
assert(css.includes(".command-governance-second-pilot-expansion-wider-launch-decision-receipt-evidence"), "styles.css is missing the Governance Second Pilot Expansion Wider Launch Decision Receipt evidence.");
assert(css.includes(".command-governance-second-pilot-expansion-wider-launch-decision-receipt-controls"), "styles.css is missing the Governance Second Pilot Expansion Wider Launch Decision Receipt controls.");
assert(css.includes(".command-governance-second-pilot-expansion-wider-launch-release-room"), "styles.css is missing the Governance Second Pilot Expansion Wider Launch Release Room panel.");
assert(css.includes(".command-second-pilot-expansion-wider-launch-release-room-preview"), "styles.css is missing the top-level Governance Second Pilot Expansion Wider Launch Release Room preview.");
assert(css.includes(".command-governance-second-pilot-expansion-wider-launch-release-room-grid"), "styles.css is missing the Governance Second Pilot Expansion Wider Launch Release Room grid.");
assert(css.includes(".command-governance-second-pilot-expansion-wider-launch-release-room-lanes"), "styles.css is missing the Governance Second Pilot Expansion Wider Launch Release Room lanes.");
assert(css.includes(".command-governance-second-pilot-expansion-wider-launch-release-room-controls"), "styles.css is missing the Governance Second Pilot Expansion Wider Launch Release Room controls.");
assert(css.includes(".command-governance-second-pilot-expansion-wider-launch-outcome-watch"), "styles.css is missing the Governance Second Pilot Expansion Wider Launch Outcome Watch panel.");
assert(css.includes(".command-second-pilot-expansion-wider-launch-outcome-watch-preview"), "styles.css is missing the top-level Governance Second Pilot Expansion Wider Launch Outcome Watch preview.");
assert(css.includes(".command-governance-second-pilot-expansion-wider-launch-outcome-watch-grid"), "styles.css is missing the Governance Second Pilot Expansion Wider Launch Outcome Watch grid.");
assert(css.includes(".command-governance-second-pilot-expansion-wider-launch-outcome-watch-signals"), "styles.css is missing the Governance Second Pilot Expansion Wider Launch Outcome Watch signals.");
assert(css.includes(".command-governance-second-pilot-expansion-wider-launch-outcome-watch-controls"), "styles.css is missing the Governance Second Pilot Expansion Wider Launch Outcome Watch controls.");
assert(css.includes(".command-governance-second-pilot-expansion-wider-launch-learning-receipt"), "styles.css is missing the Governance Second Pilot Expansion Wider Launch Learning Receipt panel.");
assert(css.includes(".command-second-pilot-expansion-wider-launch-learning-receipt-preview"), "styles.css is missing the top-level Governance Second Pilot Expansion Wider Launch Learning Receipt preview.");
assert(css.includes(".command-governance-second-pilot-expansion-wider-launch-learning-receipt-grid"), "styles.css is missing the Governance Second Pilot Expansion Wider Launch Learning Receipt grid.");
assert(css.includes(".command-governance-second-pilot-expansion-wider-launch-learning-receipt-learning"), "styles.css is missing the Governance Second Pilot Expansion Wider Launch Learning Receipt learning lanes.");
assert(css.includes(".command-governance-second-pilot-expansion-wider-launch-learning-receipt-controls"), "styles.css is missing the Governance Second Pilot Expansion Wider Launch Learning Receipt controls.");
assert(css.includes(".command-governance-second-pilot-expansion-wider-launch-market-readiness-gate"), "styles.css is missing the Governance Second Pilot Expansion Wider Launch Market Readiness Gate panel.");
assert(css.includes(".command-second-pilot-expansion-wider-launch-market-readiness-gate-preview"), "styles.css is missing the top-level Governance Second Pilot Expansion Wider Launch Market Readiness Gate preview.");
assert(css.includes(".command-governance-second-pilot-expansion-wider-launch-market-readiness-gate-grid"), "styles.css is missing the Governance Second Pilot Expansion Wider Launch Market Readiness Gate grid.");
assert(css.includes(".command-governance-second-pilot-expansion-wider-launch-market-readiness-gate-readiness"), "styles.css is missing the Governance Second Pilot Expansion Wider Launch Market Readiness Gate readiness lanes.");
assert(css.includes(".command-governance-second-pilot-expansion-wider-launch-market-readiness-gate-controls"), "styles.css is missing the Governance Second Pilot Expansion Wider Launch Market Readiness Gate controls.");
assert(css.includes(".command-governance-second-pilot-expansion-wider-launch-launch-readiness-ledger"), "styles.css is missing the Governance Second Pilot Expansion Wider Launch Launch-Readiness Ledger panel.");
assert(css.includes(".command-second-pilot-expansion-wider-launch-launch-readiness-ledger-preview"), "styles.css is missing the top-level Governance Second Pilot Expansion Wider Launch Launch-Readiness Ledger preview.");
assert(css.includes(".command-governance-second-pilot-expansion-wider-launch-launch-readiness-ledger-grid"), "styles.css is missing the Governance Second Pilot Expansion Wider Launch Launch-Readiness Ledger grid.");
assert(css.includes(".command-governance-second-pilot-expansion-wider-launch-launch-readiness-ledger-proof"), "styles.css is missing the Governance Second Pilot Expansion Wider Launch Launch-Readiness Ledger proof lanes.");
assert(css.includes(".command-governance-second-pilot-expansion-wider-launch-launch-readiness-ledger-controls"), "styles.css is missing the Governance Second Pilot Expansion Wider Launch Launch-Readiness Ledger controls.");
assert(css.includes(".command-governance-second-pilot-expansion-wider-launch-expansion-council"), "styles.css is missing the Governance Second Pilot Expansion Wider Launch Expansion Council panel.");
assert(css.includes(".command-second-pilot-expansion-wider-launch-expansion-council-preview"), "styles.css is missing the top-level Governance Second Pilot Expansion Wider Launch Expansion Council preview.");
assert(css.includes(".command-governance-second-pilot-expansion-wider-launch-expansion-council-grid"), "styles.css is missing the Governance Second Pilot Expansion Wider Launch Expansion Council grid.");
assert(css.includes(".command-governance-second-pilot-expansion-wider-launch-expansion-council-readiness"), "styles.css is missing the Governance Second Pilot Expansion Wider Launch Expansion Council readiness lanes.");
assert(css.includes(".command-governance-second-pilot-expansion-wider-launch-expansion-council-controls"), "styles.css is missing the Governance Second Pilot Expansion Wider Launch Expansion Council controls.");
assert(css.includes(".command-governance-second-pilot-expansion-wider-launch-market-launch-room"), "styles.css is missing the Governance Second Pilot Expansion Wider Launch Market Launch Room panel.");
assert(css.includes(".command-second-pilot-expansion-wider-launch-market-launch-room-preview"), "styles.css is missing the top-level Governance Second Pilot Expansion Wider Launch Market Launch Room preview.");
assert(css.includes(".command-governance-second-pilot-expansion-wider-launch-market-launch-room-grid"), "styles.css is missing the Governance Second Pilot Expansion Wider Launch Market Launch Room grid.");
assert(css.includes(".command-governance-second-pilot-expansion-wider-launch-market-launch-room-launch"), "styles.css is missing the Governance Second Pilot Expansion Wider Launch Market Launch Room launch lanes.");
assert(css.includes(".command-governance-second-pilot-expansion-wider-launch-market-launch-room-controls"), "styles.css is missing the Governance Second Pilot Expansion Wider Launch Market Launch Room controls.");
assert(css.includes(".command-governance-second-pilot-expansion-wider-launch-buyer-launch-pack"), "styles.css is missing the Governance Second Pilot Expansion Wider Launch Buyer Launch Pack panel.");
assert(css.includes(".command-second-pilot-expansion-wider-launch-buyer-launch-pack-preview"), "styles.css is missing the top-level Governance Second Pilot Expansion Wider Launch Buyer Launch Pack preview.");
assert(css.includes(".command-governance-second-pilot-expansion-wider-launch-buyer-launch-pack-grid"), "styles.css is missing the Governance Second Pilot Expansion Wider Launch Buyer Launch Pack grid.");
assert(css.includes(".command-governance-second-pilot-expansion-wider-launch-buyer-launch-pack-pack"), "styles.css is missing the Governance Second Pilot Expansion Wider Launch Buyer Launch Pack lanes.");
assert(css.includes(".command-governance-second-pilot-expansion-wider-launch-buyer-launch-pack-controls"), "styles.css is missing the Governance Second Pilot Expansion Wider Launch Buyer Launch Pack controls.");
assert(css.includes(".command-governance-second-pilot-expansion-wider-launch-council-minutes"), "styles.css is missing the Governance Second Pilot Expansion Wider Launch Council Minutes panel.");
assert(css.includes(".command-second-pilot-expansion-wider-launch-council-minutes-preview"), "styles.css is missing the top-level Governance Second Pilot Expansion Wider Launch Council Minutes preview.");
assert(css.includes(".command-governance-second-pilot-expansion-wider-launch-council-minutes-grid"), "styles.css is missing the Governance Second Pilot Expansion Wider Launch Council Minutes grid.");
assert(css.includes(".command-governance-second-pilot-expansion-wider-launch-council-minutes-minutes"), "styles.css is missing the Governance Second Pilot Expansion Wider Launch Council Minutes lanes.");
assert(css.includes(".command-governance-second-pilot-expansion-wider-launch-council-minutes-controls"), "styles.css is missing the Governance Second Pilot Expansion Wider Launch Council Minutes controls.");
assert(css.includes(".command-governance-second-pilot-expansion-wider-launch-handoff-receipt"), "styles.css is missing the Governance Second Pilot Expansion Wider Launch Handoff Receipt panel.");
assert(css.includes(".command-second-pilot-expansion-wider-launch-handoff-receipt-preview"), "styles.css is missing the top-level Governance Second Pilot Expansion Wider Launch Handoff Receipt preview.");
assert(css.includes(".command-governance-second-pilot-expansion-wider-launch-handoff-receipt-grid"), "styles.css is missing the Governance Second Pilot Expansion Wider Launch Handoff Receipt grid.");
assert(css.includes(".command-governance-second-pilot-expansion-wider-launch-handoff-receipt-receipt"), "styles.css is missing the Governance Second Pilot Expansion Wider Launch Handoff Receipt lanes.");
assert(css.includes(".command-governance-second-pilot-expansion-wider-launch-handoff-receipt-controls"), "styles.css is missing the Governance Second Pilot Expansion Wider Launch Handoff Receipt controls.");
assert(css.includes(".command-governance-second-pilot-expansion-wider-launch-buyer-response-watch"), "styles.css is missing the Governance Second Pilot Expansion Wider Launch Buyer Response Watch panel.");
assert(css.includes(".command-second-pilot-expansion-wider-launch-buyer-response-watch-preview"), "styles.css is missing the top-level Governance Second Pilot Expansion Wider Launch Buyer Response Watch preview.");
assert(css.includes(".command-governance-second-pilot-expansion-wider-launch-buyer-response-watch-grid"), "styles.css is missing the Governance Second Pilot Expansion Wider Launch Buyer Response Watch grid.");
assert(css.includes(".command-governance-second-pilot-expansion-wider-launch-buyer-response-watch-watch"), "styles.css is missing the Governance Second Pilot Expansion Wider Launch Buyer Response Watch lanes.");
assert(css.includes(".command-governance-second-pilot-expansion-wider-launch-buyer-response-watch-controls"), "styles.css is missing the Governance Second Pilot Expansion Wider Launch Buyer Response Watch controls.");
assert(css.includes(".command-governance-second-pilot-expansion-wider-launch-minutes-approval-receipt"), "styles.css is missing the Governance Second Pilot Expansion Wider Launch Minutes Approval Receipt panel.");
assert(css.includes(".command-second-pilot-expansion-wider-launch-minutes-approval-receipt-preview"), "styles.css is missing the top-level Governance Second Pilot Expansion Wider Launch Minutes Approval Receipt preview.");
assert(css.includes(".command-governance-second-pilot-expansion-wider-launch-minutes-approval-receipt-grid"), "styles.css is missing the Governance Second Pilot Expansion Wider Launch Minutes Approval Receipt grid.");
assert(css.includes(".command-governance-second-pilot-expansion-wider-launch-minutes-approval-receipt-receipt"), "styles.css is missing the Governance Second Pilot Expansion Wider Launch Minutes Approval Receipt lanes.");
assert(css.includes(".command-governance-second-pilot-expansion-wider-launch-minutes-approval-receipt-controls"), "styles.css is missing the Governance Second Pilot Expansion Wider Launch Minutes Approval Receipt controls.");
assert(css.includes(".command-governance-second-pilot-expansion-wider-launch-handoff-outcome-receipt"), "styles.css is missing the Governance Second Pilot Expansion Wider Launch Handoff Outcome Receipt panel.");
assert(css.includes(".command-second-pilot-expansion-wider-launch-handoff-outcome-receipt-preview"), "styles.css is missing the top-level Governance Second Pilot Expansion Wider Launch Handoff Outcome Receipt preview.");
assert(css.includes(".command-governance-second-pilot-expansion-wider-launch-handoff-outcome-receipt-grid"), "styles.css is missing the Governance Second Pilot Expansion Wider Launch Handoff Outcome Receipt grid.");
assert(css.includes(".command-governance-second-pilot-expansion-wider-launch-handoff-outcome-receipt-receipt"), "styles.css is missing the Governance Second Pilot Expansion Wider Launch Handoff Outcome Receipt lanes.");
assert(css.includes(".command-governance-second-pilot-expansion-wider-launch-handoff-outcome-receipt-controls"), "styles.css is missing the Governance Second Pilot Expansion Wider Launch Handoff Outcome Receipt controls.");
assert(css.includes(".command-governance-second-pilot-expansion-wider-launch-market-response-learning-receipt"), "styles.css is missing the Governance Second Pilot Expansion Wider Launch Market Response Learning Receipt panel.");
assert(css.includes(".command-second-pilot-expansion-wider-launch-market-response-learning-receipt-preview"), "styles.css is missing the top-level Governance Second Pilot Expansion Wider Launch Market Response Learning Receipt preview.");
assert(css.includes(".command-governance-second-pilot-expansion-wider-launch-market-response-learning-receipt-grid"), "styles.css is missing the Governance Second Pilot Expansion Wider Launch Market Response Learning Receipt grid.");
assert(css.includes(".command-governance-second-pilot-expansion-wider-launch-market-response-learning-receipt-learning"), "styles.css is missing the Governance Second Pilot Expansion Wider Launch Market Response Learning Receipt lanes.");
assert(css.includes(".command-governance-second-pilot-expansion-wider-launch-market-response-learning-receipt-controls"), "styles.css is missing the Governance Second Pilot Expansion Wider Launch Market Response Learning Receipt controls.");
assert(css.includes(".command-governance-second-pilot-expansion-wider-launch-approval-outcome-monitor"), "styles.css is missing the Governance Second Pilot Expansion Wider Launch Approval Outcome Monitor panel.");
assert(css.includes(".command-second-pilot-expansion-wider-launch-approval-outcome-monitor-preview"), "styles.css is missing the top-level Governance Second Pilot Expansion Wider Launch Approval Outcome Monitor preview.");
assert(css.includes(".command-governance-second-pilot-expansion-wider-launch-approval-outcome-monitor-grid"), "styles.css is missing the Governance Second Pilot Expansion Wider Launch Approval Outcome Monitor grid.");
assert(css.includes(".command-governance-second-pilot-expansion-wider-launch-approval-outcome-monitor-signals"), "styles.css is missing the Governance Second Pilot Expansion Wider Launch Approval Outcome Monitor signal lanes.");
assert(css.includes(".command-governance-second-pilot-expansion-wider-launch-approval-outcome-monitor-controls"), "styles.css is missing the Governance Second Pilot Expansion Wider Launch Approval Outcome Monitor controls.");
assert(css.includes(".command-governance-second-pilot-expansion-wider-launch-approval-closeout-receipt"), "styles.css is missing the Governance Second Pilot Expansion Wider Launch Approval Closeout Receipt panel.");
assert(css.includes(".command-second-pilot-expansion-wider-launch-approval-closeout-receipt-preview"), "styles.css is missing the top-level Governance Second Pilot Expansion Wider Launch Approval Closeout Receipt preview.");
assert(css.includes(".command-governance-second-pilot-expansion-wider-launch-approval-closeout-receipt-grid"), "styles.css is missing the Governance Second Pilot Expansion Wider Launch Approval Closeout Receipt grid.");
assert(css.includes(".command-governance-second-pilot-expansion-wider-launch-approval-closeout-receipt-receipt"), "styles.css is missing the Governance Second Pilot Expansion Wider Launch Approval Closeout Receipt lanes.");
assert(css.includes(".command-governance-second-pilot-expansion-wider-launch-approval-closeout-receipt-controls"), "styles.css is missing the Governance Second Pilot Expansion Wider Launch Approval Closeout Receipt controls.");
assert(css.includes(".command-governance-second-pilot-expansion-wider-launch-next-market-action-receipt"), "styles.css is missing the Governance Second Pilot Expansion Wider Launch Next-Market Action Receipt panel.");
assert(css.includes(".command-second-pilot-expansion-wider-launch-next-market-action-receipt-preview"), "styles.css is missing the top-level Governance Second Pilot Expansion Wider Launch Next-Market Action Receipt preview.");
assert(css.includes(".command-governance-second-pilot-expansion-wider-launch-next-market-action-receipt-grid"), "styles.css is missing the Governance Second Pilot Expansion Wider Launch Next-Market Action Receipt grid.");
assert(css.includes(".command-governance-second-pilot-expansion-wider-launch-next-market-action-receipt-receipt"), "styles.css is missing the Governance Second Pilot Expansion Wider Launch Next-Market Action Receipt lanes.");
assert(css.includes(".command-governance-second-pilot-expansion-wider-launch-next-market-action-receipt-controls"), "styles.css is missing the Governance Second Pilot Expansion Wider Launch Next-Market Action Receipt controls.");
assert(css.includes(".command-governance-second-pilot-expansion-wider-launch-market-learning-reuse-gate"), "styles.css is missing the Governance Second Pilot Expansion Wider Launch Market Learning Reuse Gate panel.");
assert(css.includes(".command-second-pilot-expansion-wider-launch-market-learning-reuse-gate-preview"), "styles.css is missing the top-level Governance Second Pilot Expansion Wider Launch Market Learning Reuse Gate preview.");
assert(css.includes(".command-governance-second-pilot-expansion-wider-launch-market-learning-reuse-gate-grid"), "styles.css is missing the Governance Second Pilot Expansion Wider Launch Market Learning Reuse Gate grid.");
assert(css.includes(".command-governance-second-pilot-expansion-wider-launch-market-learning-reuse-gate-gate"), "styles.css is missing the Governance Second Pilot Expansion Wider Launch Market Learning Reuse Gate gate rows.");
assert(css.includes(".command-governance-second-pilot-expansion-wider-launch-market-learning-reuse-gate-controls"), "styles.css is missing the Governance Second Pilot Expansion Wider Launch Market Learning Reuse Gate controls.");
assert(css.includes(".command-governance-second-pilot-expansion-wider-launch-closeout-archive"), "styles.css is missing the Governance Second Pilot Expansion Wider Launch Closeout Archive panel.");
assert(css.includes(".command-second-pilot-expansion-wider-launch-closeout-archive-preview"), "styles.css is missing the top-level Governance Second Pilot Expansion Wider Launch Closeout Archive preview.");
assert(css.includes(".command-governance-second-pilot-expansion-wider-launch-closeout-archive-grid"), "styles.css is missing the Governance Second Pilot Expansion Wider Launch Closeout Archive grid.");
assert(css.includes(".command-governance-second-pilot-expansion-wider-launch-closeout-archive-archive"), "styles.css is missing the Governance Second Pilot Expansion Wider Launch Closeout Archive archive rows.");
assert(css.includes(".command-governance-second-pilot-expansion-wider-launch-closeout-archive-controls"), "styles.css is missing the Governance Second Pilot Expansion Wider Launch Closeout Archive controls.");
assert(css.includes(".build-launch-roadmap"), "styles.css is missing the Build Phase Launch Roadmap panel.");
assert(css.includes(".build-launch-stage-grid"), "styles.css is missing the Build Phase Launch Roadmap stage grid.");
assert(css.includes(".build-launch-gate-list"), "styles.css is missing the Build Phase Launch Roadmap gate list.");

const closedLoopStart = app.indexOf("function renderCommandClosedLoopLearningControlRoom");
const closedLoopEnd = app.indexOf("function renderCommandLearningFlywheelEvidenceBoard", closedLoopStart);
const closedLoopBlock = closedLoopStart >= 0 && closedLoopEnd > closedLoopStart ? app.slice(closedLoopStart, closedLoopEnd) : "";
assert(
  closedLoopBlock.includes("const highValueSignals = signals.filter((item) => item.highValue).length;"),
  "Closed-Loop Learning Control Room is missing its high-value signal guard.",
);

const flywheelStart = app.indexOf("function renderCommandLearningFlywheelEvidenceBoard");
const flywheelEnd = app.indexOf("function renderCommandSerenityExperimentPrioritizer", flywheelStart);
const flywheelBlock = flywheelStart >= 0 && flywheelEnd > flywheelStart ? app.slice(flywheelStart, flywheelEnd) : "";
assert(
  flywheelBlock.includes("const highValueSignals = signals.filter((item) => item.highValue).length;"),
  "Learning Flywheel Evidence Board is missing its high-value signal guard.",
);

assert(css.includes(".command-serenity-handrail"), "styles.css is missing Serenity Handrail styles.");
assert(css.includes(".command-continuity-guard"), "styles.css is missing Continuity Guard styles.");
assert(css.includes(".command-world-demo-script"), "styles.css is missing World Demo Script styles.");
assert(css.includes(".command-pilot-close-packet"), "styles.css is missing Pilot Close Packet styles.");
assert(css.includes(".command-pilot-launch-board"), "styles.css is missing Pilot Launch Board styles.");
assert(css.includes(".command-pilot-story-fold"), "styles.css is missing Pilot Story Fold styles.");
assert(css.includes(".command-memory-seed"), "styles.css is missing Outcome Memory Seed styles.");
assert(css.includes(".command-learning-approval-lane"), "styles.css is missing Learning Approval Lane styles.");
assert(css.includes(".command-learning-release-receipt"), "styles.css is missing Learning Release Receipt styles.");
assert(css.includes(".command-learning-review-cue"), "styles.css is missing Learning Review Cue styles.");
assert(css.includes(".command-evidence-confidence-lens"), "styles.css is missing Evidence Confidence Lens styles.");
assert(css.includes(".command-confidence-history-ribbon"), "styles.css is missing Confidence History Ribbon styles.");
assert(css.includes(".command-observation-outcome-slot"), "styles.css is missing Observation Outcome Slot styles.");
assert(css.includes(".command-outcome-proof-cue"), "styles.css is missing Outcome Proof Attachment Cue styles.");
assert(css.includes(".command-proof-review-gate"), "styles.css is missing Proof Review Decision Gate styles.");
assert(css.includes(".command-learning-loop-board"), "styles.css is missing Learning Loop Board styles.");
assert(css.includes(".command-outcome-feedback-engine"), "styles.css is missing Outcome Feedback Engine styles.");
assert(css.includes(".command-adaptive-policy-simulator"), "styles.css is missing Adaptive Policy Simulator styles.");
assert(css.includes(".command-tenant-learning-firewall"), "styles.css is missing Tenant Learning Firewall styles.");
assert(css.includes(".command-federated-trust-ledger"), "styles.css is missing Federated Pattern Trust Ledger styles.");
assert(css.includes(".command-network-shadow-replay"), "styles.css is missing Network Influence Shadow Replay styles.");
assert(css.includes(".command-tenant-influence-switchboard"), "styles.css is missing Tenant Influence Activation Switchboard styles.");
assert(css.includes(".command-activation-outcome-learner"), "styles.css is missing Activation Outcome Learner styles.");
assert(css.includes(".command-network-benefit-router"), "styles.css is missing Network Benefit Router styles.");
assert(css.includes(".command-network-reciprocity-ledger"), "styles.css is missing Network Reciprocity Ledger styles.");
assert(css.includes(".command-network-dividend-allocator"), "styles.css is missing Network Learning Dividend Allocator styles.");
assert(css.includes(".command-network-outcome-verifier"), "styles.css is missing Network Outcome Dividend Verifier styles.");
assert(css.includes(".command-network-policy-governor"), "styles.css is missing Network Reinforcement Policy Governor styles.");
assert(css.includes(".command-network-drift-sentinel"), "styles.css is missing Network Reinforcement Drift Sentinel styles.");
assert(css.includes(".command-network-retune-orchestrator"), "styles.css is missing Network Retune Experiment Orchestrator styles.");
assert(css.includes(".command-network-retune-outcome-learner"), "styles.css is missing Network Retune Outcome Learner styles.");
assert(css.includes(".command-network-safety-council"), "styles.css is missing Network Learning Safety Council styles.");
assert(css.includes(".command-network-license-gate"), "styles.css is missing Network Learning License Gate styles.");
assert(css.includes(".command-network-royalty-ledger"), "styles.css is missing Network Learning Royalty Ledger styles.");
assert(css.includes(".command-network-settlement-console"), "styles.css is missing Network Learning Settlement Console styles.");
assert(css.includes(".command-network-clearinghouse"), "styles.css is missing Network Learning Clearinghouse styles.");
assert(css.includes(".command-network-trust-market"), "styles.css is missing Network Learning Trust Market styles.");
assert(css.includes(".command-network-demand-router"), "styles.css is missing Network Learning Demand Router styles.");
assert(css.includes(".command-network-outcome-exchange"), "styles.css is missing Network Outcome Exchange styles.");
assert(css.includes(".command-network-value-governor"), "styles.css is missing Network Value Governor styles.");
assert(css.includes(".command-network-value-audit-trail"), "styles.css is missing Network Value Audit Trail styles.");
assert(css.includes(".command-network-value-review-board"), "styles.css is missing Network Value Review Board styles.");
assert(css.includes(".command-network-decision-release-gate"), "styles.css is missing Network Decision Release Gate styles.");
assert(css.includes(".command-network-release-outcome-monitor"), "styles.css is missing Network Release Outcome Monitor styles.");
assert(css.includes(".command-network-outcome-learning-governor"), "styles.css is missing Network Outcome Learning Governor styles.");
assert(css.includes(".command-closed-loop-learning-control-room"), "styles.css is missing Closed-Loop Learning Control Room styles.");
assert(css.includes(".command-learning-flywheel-evidence-board"), "styles.css is missing Learning Flywheel Evidence Board styles.");
assert(css.includes(".command-serenity-experiment-prioritizer"), "styles.css is missing Serenity Experiment Prioritizer styles.");
assert(css.includes(".command-global-launch-serenity-console"), "styles.css is missing Global Launch Serenity Console styles.");
assert(css.includes(".command-learning-network-fold"), "styles.css is missing Serenity Network Fold styles.");
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
