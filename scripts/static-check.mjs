import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const failures = [];

function read(path) {
  return readFileSync(join(root, path), "utf8");
}

function assert(condition, message) {
  if (!condition) failures.push(message);
}

[
  "index.html",
  "styles.css",
  "app.js",
  "site.webmanifest",
  "assets/favicon.svg",
  "assets/heavyster-logo-3d.svg",
  "assets/heavyster-social-card.svg",
  "assets/heavyster-yard.svg",
  "docs/MONETIZATION.md",
  "docs/PRODUCT_SPEC.md",
  "docs/DATA_MODEL.md",
  "docs/BUILD_BACKLOG.md"
].forEach((path) => {
  assert(existsSync(join(root, path)), `${path} is missing.`);
});

const index = read("index.html");
const css = read("styles.css");
const app = read("app.js");
const manifest = read("site.webmanifest");

assert(index.includes("Content-Security-Policy"), "index.html is missing the CSP meta tag.");
assert(index.includes("Heavyster | Heavy Equipment Rental Listings"), "index.html has the wrong title.");
assert(index.includes("USD 9") && index.includes("USD 99"), "index.html is missing the listing pricing model.");
assert(index.includes("1% confirmed-booking success fee"), "index.html is missing the phase-two success fee model.");
assert(index.includes('id="listingGrid"'), "index.html is missing the marketplace listing grid.");
assert(index.includes('id="marketSearchAssist"'), "index.html is missing Marketplace Search Assist.");
assert(index.includes('id="marketSupplyLens"'), "index.html is missing Marketplace Supply Lens.");
assert(index.includes('id="marketSmartViews"'), "index.html is missing Marketplace Smart Views.");
assert(index.includes('id="marketFilterTrail"'), "index.html is missing the active marketplace filter trail.");
assert(index.includes('id="resultIntelligence"'), "index.html is missing Marketplace Result Intelligence.");
assert(index.includes('id="compactCatalog"'), "index.html is missing the compact catalog table.");
assert(index.includes('id="listingBuilder"'), "index.html is missing the supplier listing builder.");
assert(index.includes('id="categoryDirectory"'), "index.html is missing the category directory.");
assert(index.includes('id="adminSupplierQueue"'), "index.html is missing the founder admin queue.");
assert(index.includes('id="supplierTable"') && index.includes('id="studioHealth"') && index.includes('id="studioOps"'), "index.html is missing the Supplier Studio 2.0 workspace.");
assert(index.includes('id="trustChecklist"'), "index.html is missing the verification checklist.");
assert(index.includes('id="bookingFeeOutput"'), "index.html is missing the commission calculator.");
assert(index.includes('id="quickSearchButton"') && index.includes('id="scrollTopButton"'), "index.html is missing floating quick actions.");
assert(index.includes('id="commandPulse"') && index.includes('id="commandRoutes"') && index.includes('id="commandRoleTabs"') && index.includes('id="commandWorkspace"') && index.includes('id="commandModuleRail"'), "index.html is missing Command Center controls.");
assert(index.includes('id="workflowDock"') && index.includes('id="workflowDockTabs"') && index.includes('id="workflowDockPath"') && index.includes('id="workflowDockSearchButton"'), "index.html is missing Workflow Dock controls.");
assert(index.includes('id="workflowDockGuide"') && index.includes('id="workflowDockPrevButton"') && index.includes('id="workflowDockNextButton"'), "index.html is missing guided workflow movement controls.");
assert(index.includes('id="demoFlightScenes"') && index.includes('id="copyDemoFlightButton"'), "index.html is missing Demo Flight Deck controls.");
assert(index.includes('id="boardroomThesis"') && index.includes('id="boardroomGates"') && index.includes('id="copyBoardroomButton"'), "index.html is missing Boardroom Snapshot controls.");
assert(index.includes('id="pilotPackWeeks"') && index.includes('id="pilotPackGates"') && index.includes('id="copyPilotPackButton"'), "index.html is missing 30-Day Pilot Pack controls.");
assert(index.includes('id="founderWorkbenchFlow"') && index.includes('id="copyFounderWorkbenchButton"'), "index.html is missing Founder Workbench controls.");
assert(index.includes('id="founderMorningSignals"') && index.includes('id="copyFounderMorningButton"'), "index.html is missing Founder Morning Brief controls.");
assert(index.includes('id="founderDailyQueue"') && index.includes('id="copyFounderDailyButton"'), "index.html is missing Founder Daily Moves controls.");
assert(index.includes('id="founderCallSheetCards"') && index.includes('id="copyFounderCallSheetButton"'), "index.html is missing Founder Supplier Call Sheet controls.");
assert(index.includes('id="buyerWorkbenchFlow"') && index.includes('id="copyBuyerWorkbenchButton"'), "index.html is missing Buyer Workbench controls.");
assert(index.includes('id="supplierWorkbenchFlow"') && index.includes('id="copySupplierWorkbenchButton"'), "index.html is missing Supplier Workbench controls.");
assert(index.includes('id="shortlistToggleButton"') && index.includes('id="shortlistTray"'), "index.html is missing shortlist controls.");
assert(index.includes('id="searchRescue"'), "index.html is missing Smart Match Rescue.");
assert(index.includes('id="jobsitePackage"') && index.includes('id="copyJobsiteButton"'), "index.html is missing Jobsite Planner controls.");
assert(index.includes('id="passportScore"') && index.includes('id="copyPassportButton"'), "index.html is missing Trust Passport controls.");
assert(index.includes('id="rfqMetrics"') && index.includes('id="copyRfqButton"'), "index.html is missing RFQ Command Room controls.");
assert(index.includes('id="awardMatrix"') && index.includes('id="copyAwardButton"'), "index.html is missing Award Intelligence controls.");
assert(index.includes('id="quoteGuardBoard"') && index.includes('id="copyQuoteButton"'), "index.html is missing Quote Guard controls.");
assert(index.includes('id="mobilizeChecklist"') && index.includes('id="copyMobilizeButton"'), "index.html is missing Mobilization Control Tower controls.");
assert(index.includes('id="dealTrailSteps"') && index.includes('id="copyDealTrailButton"'), "index.html is missing Direct Deal Trail controls.");
assert(index.includes('id="yardBoard"') && index.includes('id="copyYardButton"'), "index.html is missing Yard Availability OS controls.");
assert(index.includes('id="storefrontFleet"') && index.includes('id="copyStorefrontButton"'), "index.html is missing Supplier Fleet Storefront controls.");
assert(index.includes('id="fleetImportQueue"') && index.includes('id="copyFleetImportButton"'), "index.html is missing Fleet Import Console controls.");
assert(index.includes('id="proofVaultQueue"') && index.includes('id="copyProofVaultButton"'), "index.html is missing Proof Vault controls.");
assert(index.includes('id="revenueDeskQueue"') && index.includes('id="copyRevenueDeskButton"'), "index.html is missing Listing Revenue Desk controls.");
assert(index.includes('id="leadDeskQueue"') && index.includes('id="copyLeadDeskButton"'), "index.html is missing Supplier Lead Desk controls.");
assert(index.includes('id="accountHealthSignals"') && index.includes('id="copyAccountHealthButton"'), "index.html is missing Supplier Account Health Radar controls.");
assert(index.includes('id="supplierSuccessQueue"') && index.includes('id="copySupplierSuccessButton"'), "index.html is missing Supplier Success Daily Queue controls.");
assert(index.includes('id="pageFactoryQueue"') && index.includes('id="copyPageFactoryButton"'), "index.html is missing Market Page Factory controls.");
assert(index.includes('id="launchRoomTimeline"') && index.includes('id="copyLaunchRoomButton"'), "index.html is missing Market Launch Room controls.");
assert(index.includes('id="marketTwinScenarios"') && index.includes('id="marketTwinVerdict"') && index.includes('id="copyMarketTwinButton"'), "index.html is missing Market Twin controls.");
assert(index.includes('id="liquidityFlywheelLoops"') && index.includes('id="copyLiquidityFlywheelButton"'), "index.html is missing Liquidity Flywheel controls.");
assert(index.includes('id="founderAutopilotQueue"') && index.includes('id="copyFounderAutopilotButton"'), "index.html is missing Founder Autopilot controls.");
assert(index.includes('id="demandExchangeTickets"') && index.includes('id="copyDemandExchangeButton"'), "index.html is missing Demand Exchange controls.");
assert(index.includes('id="proofDemandEvidence"') && index.includes('id="copyProofDemandButton"'), "index.html is missing Proof of Demand Room controls.");
assert(index.includes('id="supplierCommitmentPackages"') && index.includes('id="copySupplierCommitmentButton"'), "index.html is missing Supplier Commitment Room controls.");
assert(index.includes('id="listingActivationQueue"') && index.includes('id="copyListingActivationButton"'), "index.html is missing Listing Activation Room controls.");
assert(index.includes('id="trustLedgerRows"') && index.includes('id="copyTrustLedgerButton"'), "index.html is missing Trust & Revenue Ledger controls.");
assert(index.includes('id="marketSignalMatrix"') && index.includes('id="copyMarketMatrixButton"'), "index.html is missing Market Signal Matrix controls.");
assert(index.includes('id="commandPaletteInput"') && index.includes('id="commandPaletteResults"'), "index.html is missing Universal Command Palette controls.");
assert(index.includes('id="workflowMenu"') && index.includes('data-nav-target="#trust-revenue-ledger"'), "index.html is missing grouped workflow navigation.");
assert(index.includes('id="workflowMenuSearch"') && index.includes('id="workflowMenuFilters"') && index.includes('id="workflowMenuEmpty"'), "index.html is missing searchable workflow menu controls.");
assert(index.includes('data-workflow-role="Buyer"') && index.includes('data-workflow-role="Supplier"') && index.includes('data-workflow-role="Founder"'), "index.html is missing workflow role grouping metadata.");
assert(index.includes('id="demandRequest"') && index.includes('id="demandRadar"'), "index.html is missing demand capture or demand radar.");
assert(index.includes('id="huntSignalList"') && index.includes('id="outreachScript"'), "index.html is missing the supplier hunt growth engine.");
assert(index.includes('id="marketOpportunityList"') && index.includes('id="marketPageBrief"'), "index.html is missing market maker mode.");
assert(index.includes("assets/heavyster-logo-3d.svg"), "index.html is missing the 3D logo asset.");
assert(!/\son[a-z]+\s*=/i.test(index), "index.html contains an inline event handler.");
assert(!/https?:\/\//i.test(index + css + app), "Project files should not require remote assets.");
assert(index.includes("styles.css?v=20260520-renewal-close-pack"), "index.html is missing the CSS cache-bust token.");
assert(index.includes("app.js?v=20260520-renewal-close-pack"), "index.html is missing the JS cache-bust token.");
assert(index.includes('<option value="fit">Best buyer fit</option>'), "index.html is missing the buyer fit sort option.");
assert(index.includes('id="enquiryMode"') && index.includes('id="enquiryComposer"'), "index.html is missing Direct Enquiry Composer controls.");
assert(index.includes('id="responseRoute"'), "index.html is missing Supplier Response Route controls.");
assert(index.includes('id="responseTracker"'), "index.html is missing Direct Enquiry Response Tracker controls.");
assert(index.includes('id="replyQualityGate"'), "index.html is missing Supplier Reply Quality Gate controls.");
assert(index.includes('id="replyClarifier"'), "index.html is missing Supplier Reply Clarifier controls.");
assert(index.includes('id="decisionReceipt"'), "index.html is missing Buyer Decision Receipt controls.");
assert(index.includes('id="decisionRouter"'), "index.html is missing Buyer Decision Action Router controls.");
assert(index.includes('id="listingRoiProof"'), "index.html is missing Supplier Listing ROI Proof controls.");
assert(index.includes('id="supplierRenewalClosePack"'), "index.html is missing Supplier Renewal Close Pack controls.");
assert(app.includes('const DATA_VERSION = "20260520-heavyster-renewal-close-pack-v70";'), "app.js DATA_VERSION is missing or changed.");
assert(app.includes("localStorage"), "app.js should persist prototype state locally.");
assert(app.includes("renderListings") && app.includes("renderSupplierTable") && app.includes("getSupplierStudioModel") && app.includes("renderPricingCalculator"), "app.js is missing core renderers.");
assert(app.includes("renderMarketplaceSearchAssist") && app.includes("getMarketplaceSearchAssistItems") && app.includes("applyMarketplaceSearchAssist"), "app.js is missing Marketplace Search Assist logic.");
assert(app.includes("renderMarketplaceSupplyLens") && app.includes("getMarketplaceSupplyLensModel") && app.includes("applyMarketplaceSupplyLens"), "app.js is missing Marketplace Supply Lens logic.");
assert(app.includes("marketplaceSmartViews") && app.includes("renderMarketplaceSmartViews") && app.includes("applyMarketplaceSmartView"), "app.js is missing Marketplace Smart Views logic.");
assert(app.includes("renderMarketplaceFilterTrail") && app.includes("clearMarketplaceFilter") && app.includes("clearAllMarketplaceFilters"), "app.js is missing active filter trail logic.");
assert(app.includes("renderMarketplaceIntelligence") && app.includes("getMarketplaceIntelligenceModel") && app.includes("handleMarketplaceIntelligenceAction"), "app.js is missing Marketplace Result Intelligence logic.");
assert(app.includes("renderCompactCatalog") && app.includes("renderCategoryDirectory") && app.includes("renderAdminBoard"), "app.js is missing scalable UX renderers.");
assert(app.includes("renderCommandCenter") && app.includes("getCommandCenterModel") && app.includes("getCommandWorkspace"), "app.js is missing Command Center rendering or model logic.");
assert(app.includes("renderWorkflowDock") && app.includes("getWorkflowDockModel") && app.includes("getWorkflowDockSteps"), "app.js is missing Workflow Dock rendering or model logic.");
assert(app.includes("renderWorkflowGuide") && app.includes("getWorkflowGuideModel") && app.includes("openWorkflowGuideTarget"), "app.js is missing guided workflow movement logic.");
assert(app.includes("renderDemoFlightDeck") && app.includes("getDemoFlightDeckModel") && app.includes("buildDemoFlightDeckText"), "app.js is missing Demo Flight Deck rendering or copy text.");
assert(app.includes("renderBoardroomSnapshot") && app.includes("getBoardroomSnapshotModel") && app.includes("buildBoardroomSnapshotText"), "app.js is missing Boardroom Snapshot rendering or copy text.");
assert(app.includes("renderPilotPack") && app.includes("getPilotPackModel") && app.includes("buildPilotPackText"), "app.js is missing 30-Day Pilot Pack rendering or copy text.");
assert(app.includes("renderFounderWorkbench") && app.includes("getFounderWorkbenchModel") && app.includes("buildFounderWorkbenchText"), "app.js is missing Founder Workbench rendering or copy text.");
assert(app.includes("renderFounderMorningBrief") && app.includes("getFounderMorningBriefModel") && app.includes("buildFounderMorningBriefText"), "app.js is missing Founder Morning Brief rendering or copy text.");
assert(app.includes("renderFounderDailyMoves") && app.includes("getFounderDailyMovesModel") && app.includes("buildFounderDailyMovesText"), "app.js is missing Founder Daily Moves rendering or copy text.");
assert(app.includes("renderFounderCallSheet") && app.includes("getFounderCallSheetModel") && app.includes("buildFounderCallSheetText"), "app.js is missing Founder Supplier Call Sheet rendering or copy text.");
assert(app.includes("renderBuyerWorkbench") && app.includes("getBuyerWorkbenchModel") && app.includes("buildBuyerWorkbenchText"), "app.js is missing Buyer Workbench rendering or copy text.");
assert(app.includes("renderSupplierWorkbench") && app.includes("getSupplierWorkbenchModel") && app.includes("buildSupplierWorkbenchText"), "app.js is missing Supplier Workbench rendering or copy text.");
assert(app.includes("openCommandPalette") && app.includes("renderCommandPalette") && app.includes("getCommandPaletteItems"), "app.js is missing Universal Command Palette logic.");
assert(app.includes("syncNavigationState") && app.includes("closeWorkflowMenu") && app.includes("renderWorkflowMenu"), "app.js is missing workflow navigation state handling.");
assert(app.includes("workflowMenuQuery") && app.includes("workflowMenuRole"), "app.js is missing workflow menu search state.");
assert(app.includes("stabilizeHashScroll") && app.includes("hashchange"), "app.js is missing stable hash scrolling.");
assert(app.includes("renderNoResultsAdvisor") && app.includes("renderShortlistTray"), "app.js is missing buyer recovery or shortlist renderers.");
assert(app.includes("renderShortlistCompare") && app.includes("getShortlistCompareModel") && app.includes("getShortlistSuggestion"), "app.js is missing shortlist compare logic.");
assert(app.includes("getBuyerFitScore") && app.includes('sort === "fit"') && app.includes("fit-explainer"), "app.js is missing Buyer Fit Score logic.");
assert(app.includes("renderDirectEnquiryComposer") && app.includes("getDirectEnquiryModel") && app.includes("enquiryMode"), "app.js is missing Direct Enquiry Composer logic.");
assert(app.includes("renderSupplierResponseRoute") && app.includes("getSupplierResponseRouteModel") && app.includes("getPreferredSupplierChannel"), "app.js is missing Supplier Response Route logic.");
assert(app.includes("renderResponseTracker") && app.includes("getResponseTrackerModel") && app.includes("handleResponseTrackerAction"), "app.js is missing Direct Enquiry Response Tracker logic.");
assert(app.includes("renderReplyQualityGate") && app.includes("getReplyQualityGateModel") && app.includes("reply-quality-head"), "app.js is missing Supplier Reply Quality Gate logic.");
assert(app.includes("renderReplyClarifier") && app.includes("getReplyClarifierModel") && app.includes("buildReplyClarifierText"), "app.js is missing Supplier Reply Clarifier logic.");
assert(app.includes("renderDecisionReceipt") && app.includes("getDecisionReceiptModel") && app.includes("buildDecisionReceiptText"), "app.js is missing Buyer Decision Receipt logic.");
assert(app.includes("renderDecisionRouter") && app.includes("getDecisionRouterModel") && app.includes("buildDecisionRouterText"), "app.js is missing Buyer Decision Action Router logic.");
assert(app.includes("renderListingRoiProof") && app.includes("getListingRoiProofModel") && app.includes("buildListingRoiProofText"), "app.js is missing Supplier Listing ROI Proof logic.");
assert(app.includes("renderSupplierRenewalClosePack") && app.includes("getSupplierRenewalClosePackModel") && app.includes("buildSupplierRenewalCloseText"), "app.js is missing Supplier Renewal Close Pack logic.");
assert(app.includes("renderSearchRescue") && app.includes("getSearchRescueSuggestions"), "app.js is missing Smart Match Rescue rendering or suggestions.");
assert(app.includes("renderJobsitePlanner") && app.includes("buildJobsiteBriefText"), "app.js is missing Jobsite Planner rendering or copy text.");
assert(app.includes("renderTrustPassport") && app.includes("buildTrustPassportText"), "app.js is missing Trust Passport rendering or copy text.");
assert(app.includes("renderRfqRoom") && app.includes("buildRfqText"), "app.js is missing RFQ room rendering or copy text.");
assert(app.includes("renderAwardRoom") && app.includes("buildAwardMemoText"), "app.js is missing Award Intelligence rendering or copy text.");
assert(app.includes("renderQuoteGuard") && app.includes("buildQuoteGuardText"), "app.js is missing Quote Guard rendering or copy text.");
assert(app.includes("renderMobilizationTower") && app.includes("buildMobilizationText"), "app.js is missing Mobilization Control Tower rendering or copy text.");
assert(app.includes("renderDealTrail") && app.includes("getDealTrailModel") && app.includes("buildDealTrailText"), "app.js is missing Direct Deal Trail rendering, model, or copy text.");
assert(app.includes("renderYardAvailability") && app.includes("buildYardUpdateText"), "app.js is missing Yard Availability OS rendering or copy text.");
assert(app.includes("renderSupplierStorefront") && app.includes("buildSupplierStorefrontText"), "app.js is missing Supplier Fleet Storefront rendering or copy text.");
assert(app.includes("renderFleetImport") && app.includes("buildFleetImportText"), "app.js is missing Fleet Import Console rendering or copy text.");
assert(app.includes("renderProofVault") && app.includes("buildProofVaultText"), "app.js is missing Proof Vault rendering or copy text.");
assert(app.includes("renderRevenueDesk") && app.includes("buildRevenueDeskText"), "app.js is missing Listing Revenue Desk rendering or copy text.");
assert(app.includes("renderLeadDesk") && app.includes("buildLeadDeskText"), "app.js is missing Supplier Lead Desk rendering or copy text.");
assert(app.includes("renderAccountHealth") && app.includes("buildAccountHealthText"), "app.js is missing Supplier Account Health Radar rendering or copy text.");
assert(app.includes("renderSupplierSuccessQueue") && app.includes("buildSupplierSuccessText"), "app.js is missing Supplier Success Daily Queue rendering or copy text.");
assert(app.includes("renderPageFactory") && app.includes("buildPageFactoryText"), "app.js is missing Market Page Factory rendering or copy text.");
assert(app.includes("renderLaunchRoom") && app.includes("buildLaunchRoomText"), "app.js is missing Market Launch Room rendering or copy text.");
assert(app.includes("renderMarketTwin") && app.includes("getMarketTwinVerdict") && app.includes("buildMarketTwinText"), "app.js is missing Market Twin rendering, verdict, or copy text.");
assert(app.includes("renderLiquidityFlywheel") && app.includes("buildLiquidityFlywheelText"), "app.js is missing Liquidity Flywheel rendering or copy text.");
assert(app.includes("renderFounderAutopilot") && app.includes("buildFounderAutopilotText"), "app.js is missing Founder Autopilot rendering or copy text.");
assert(app.includes("renderDemandExchange") && app.includes("buildDemandExchangeText"), "app.js is missing Demand Exchange rendering or copy text.");
assert(app.includes("renderProofDemandRoom") && app.includes("buildProofDemandText"), "app.js is missing Proof of Demand Room rendering or copy text.");
assert(app.includes("renderSupplierCommitmentRoom") && app.includes("buildSupplierCommitmentText"), "app.js is missing Supplier Commitment Room rendering or copy text.");
assert(app.includes("renderListingActivationRoom") && app.includes("buildListingActivationText"), "app.js is missing Listing Activation Room rendering or copy text.");
assert(app.includes("renderTrustRevenueLedger") && app.includes("buildTrustLedgerText"), "app.js is missing Trust & Revenue Ledger rendering or copy text.");
assert(app.includes("renderMarketSignalMatrix") && app.includes("getMarketSignalMatrixModel") && app.includes("buildMarketSignalMatrixText"), "app.js is missing Market Signal Matrix rendering or copy text.");
assert(app.includes("saveDemandSignal") && app.includes("renderDemandRadar"), "app.js is missing demand signal capture or radar rendering.");
assert(app.includes("renderSupplierHunt") && app.includes("buildSupplierHuntText"), "app.js is missing supplier hunt rendering or copy text.");
assert(app.includes("renderMarketMaker") && app.includes("buildMarketBriefText"), "app.js is missing market maker rendering or launch brief text.");
assert(app.includes("renderCommissionCalculator"), "app.js is missing the phase-two commission calculator.");
assert(app.includes("quickSearchButton") && app.includes("scrollTopButton"), "app.js is missing floating quick action handlers.");
assert(app.includes("navigator.clipboard.writeText"), "app.js is missing direct enquiry copy support.");
assert(css.includes("letter-spacing: 0"), "styles.css should keep letter spacing neutral.");
assert(!/letter-spacing:\s*-/i.test(css), "styles.css contains negative letter spacing.");
assert(manifest.includes('"name": "Heavyster"'), "site.webmanifest has the wrong app name.");

if (failures.length) {
  console.error("Static check failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Heavyster static check passed.");
