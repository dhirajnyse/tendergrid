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
assert(index.includes("styles.css?v=381"), "index.html is missing the v381 CSS cache token.");
assert(index.includes("data/sample-data.js?v=381"), "index.html is missing the v381 data cache token.");
assert(index.includes("app.js?v=381"), "index.html is missing the v381 app cache token.");
assert(index.includes("assets/pursuitdesk-mark.svg?v=381"), "index.html is missing the v381 icon cache token.");
assert(!/\son[a-z]+\s*=/i.test(index), "index.html contains an inline event handler.");
assert(!/(?:src|href)\s*=\s*["'][^"']*https?:\/\//i.test(index), "index.html should not require remote assets.");
assert(!/url\(\s*["']?https?:\/\//i.test(css), "styles.css should not require remote assets.");

assert(manifest.name === "PursuitDesk", "site.webmanifest has the wrong app name.");
assert(manifest.short_name === "PursuitDesk", "site.webmanifest has the wrong short name.");

assert(app.includes('const BRAND_NAME = "PursuitDesk";'), "app.js has the wrong brand name.");
assert(app.includes('const BUILD_VERSION = "v381";'), "app.js has the wrong build version.");
assert(app.includes('const BUILD_LABEL = "Market Fit Gate";'), "app.js has the wrong build label.");
assert(app.includes('assets/pursuitdesk-mark.svg?v=381'), "app.js is missing the v381 brand mark cache token.");
assert(app.includes('assets/pursuitdesk-logo-3d.svg?v=381'), "app.js is missing the v381 3D logo cache token.");
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
