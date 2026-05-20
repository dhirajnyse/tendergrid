# Heavyster

Heavyster is a phase-one SaaS/listing platform for heavy equipment rental companies.

The first version is intentionally simple:

- Rental companies create accounts and list equipment.
- Each listing can include photos, machine specs, region, availability, documents, and direct contact routes.
- Customers send direct rental enquiries to the rental company.
- Heavyster does not collect rental payments or rental commission in phase one.
- Monetization is USD 9 per month or USD 99 per year per active equipment listing.
- Phase two can add an optional 1% confirmed-booking success fee only when Heavyster provides booking workflow value.

## Current Prototype

This folder contains a static product prototype with:

- Marketplace search and filtered equipment listings
- Marketplace Search Assist for one-click machine, category, supplier, and demand-gap routes while buyers type
- Marketplace Supply Lens that summarizes strongest regions, categories, availability, and verified supply for the current result set
- Marketplace Smart Views for one-click buyer shortcuts into useful fleet and demand views
- Active marketplace filter trail so buyers can see, remove, or reset filters without losing context
- Marketplace Result Intelligence that explains whether a search is supply-ready, supply-watch, or should become a demand signal
- Command Center with role workspaces for buyer, supplier, and founder workflows
- Workflow Dock that keeps buyer, supplier, and founder paths visible as a compact operating rail
- Guided workflow movement that shows the current room, step progress, and previous/next actions
- Demo Flight Deck that turns the full buyer, supplier, and founder product story into five clickable scenes and a copy-ready talk track
- Boardroom Snapshot that turns wedge, listing ARR, direct pipeline, trust debt, and the next founder move into an investable operating memo
- 30-Day Pilot Pack that converts the boardroom story into supplier calls, listing activation, controlled enquiries, pilot gates, and a copy-ready sprint memo
- Founder Workbench that connects demand, supplier success, page factory, launch, twin, flywheel, autopilot, exchange, proof, commitment, activation, and ledger into one scale-control path
- Founder Morning Brief that turns overnight supplier, trust, activation, launch, and market signals into one start-of-day operating read
- Founder Daily Moves that ranks the few actions to do today across supplier success, Market Twin verdict, autopilot, activation, ledger, and market matrix
- Founder Supplier Call Sheet that turns demand proof, supplier health, and package math into call-ready close scripts for paid listings
- Buyer Workbench that connects search, shortlist, Jobsite Planner, Trust Passport, RFQ, Award, Quote Guard, Mobilization, and Direct Deal Trail into one decision path
- Supplier Workbench that connects Studio, Storefront, Fleet Import, Proof Vault, Revenue Desk, Lead Desk, Account Health, and Yard Freshness into one supplier revenue path
- Universal Command Palette for finding equipment, suppliers, markets, and workflow modules from one search layer
- Compact searchable workflow launcher with role filters so buyer, supplier, and founder modules stay easy to reach without crowding the header
- Compact catalog row view for large inventory UX
- Smart Match Rescue on the hero search for zero-result buyer recovery
- Smart no-results recovery with nearby matches and one-click filter relaxation
- Buyer Fit Score on listing cards, compact rows, and the enquiry detail so renters can rank options faster
- Buyer shortlist and comparison tray with scored options, saved badges, and suggested machines to add
- Direct Enquiry Composer with quick, proof-first, and quote-ready messages that keep supplier payment direct
- Supplier Response Route that shows first contact channel, response target, backup route, and follow-up timing
- Direct Enquiry Response Tracker for copied, sent, replied, and follow-up states per selected machine
- Supplier Reply Quality Gate that scores supplier answers for availability, rate terms, operator, documents, validity, and direct-payment readiness before award
- Supplier Reply Clarifier that converts reply gaps into a copy-ready chase, clarification, or handoff message
- Buyer Decision Receipt that packages fit, proof, reply quality, quote clarity, risk, and the no-commission payment rule into a copy-ready buyer note
- Buyer Decision Action Router that sends the buyer to the next best move: chase, clarify, RFQ, quote guard, award, or mobilization
- Supplier Listing ROI Proof that turns buyer intent, reply proof, decision movement, lead value, and direct-payment discipline into a renewal-ready supplier note
- Supplier Renewal Close Pack that converts ROI proof into a renewal save, annual upgrade, or proof-first supplier close note
- Jobsite Planner that turns a project note into a package of matched machines and supply gaps
- Trust Passport with machine readiness score, proof stack, and buyer risk radar
- RFQ Command Room for shortlist readiness and copy-ready supplier quote packets
- Award Intelligence for supplier ranking and copy-ready buyer award memos
- Quote Guard for rental quote clarity, hidden cost detection, and copy-ready supplier clarification
- Mobilization Control Tower for pre-dispatch readiness and buyer-supplier handoff
- Direct Deal Trail for no-commission booking proof, direct-payment rules, and future success-fee eligibility discipline
- Yard Availability OS for supplier freshness scoring and copy-ready update queues
- Supplier Fleet Storefront for verified supplier mini-sites, fleet lanes, proof stack, and buyer-ready profile packets
- Fleet Import Console for bulk machine intake, validation gaps, and paid-listing revenue preview
- Proof Vault for document expiry, inspection proof, operator proof, and buyer-ready verification packets
- Listing Revenue Desk for paid listings, renewal risk, annual upsell, paused inventory, and copy-ready billing follow-up
- Supplier Lead Desk for direct enquiry scoring, response urgency, reply playbooks, and copy-ready supplier replies
- Supplier Account Health Radar for churn risk, expansion upside, health signals, and next-best save actions
- Supplier Success Daily Queue for ranking which supplier to call first, why, and what action saves or grows the account
- Demand request capture for unmet searches
- Founder demand radar for supplier acquisition signals
- Supplier hunt growth engine with revenue math and copy-ready outreach
- Market Maker Mode for region/category expansion scoring and launch briefs
- Market Page Factory for turning demand gaps into launch-ready SEO pages, proof gates, supplier targets, and copy-ready page packs
- Market Launch Room for seven-day founder launch sprints, supplier strike lists, proof gaps, and first-week listing ARR targets
- Market Twin for simulating launch intensity, paid listing density, trust risk, demand coverage, listing ARR, and founder go/no-go launch verdicts before scaling a category page
- Liquidity Flywheel for detecting whether demand, supply, trust, response, and listing revenue are compounding or blocked by a founder bottleneck
- Founder Autopilot for turning flywheel bottlenecks into owner-assigned weekly commands with ARR impact and copy-ready operating briefs
- Demand Exchange for turning unmet buyer searches into supplier-facing opportunity tickets, proof requests, and copy-ready listing invites
- Proof of Demand Room for packaging buyer demand, supply shortage, trust proof, ROI, and supplier objections into a copy-ready sales pack
- Supplier Commitment Room for converting proof into paid listing packages, go-live gates, and copy-ready close notes
- Listing Activation Room for turning paid listing commitments into activation queues, billing gates, publish readiness, and copy-ready go-live plans
- Trust & Revenue Ledger for showing listing ARR, direct enquiry pipeline, trust debt, renewal exposure, and scale gates in one founder view
- Market Signal Matrix for scanning region-by-category demand, visible supply, proof strength, supply gap, and modeled listing ARR before opening the next wedge
- Supplier Studio 2.0 with supplier-specific fleet, profile readiness, storefront publishing, document gaps, freshness, and listing revenue preview
- Supplier onboarding and listing builder preview
- Category directory and founder admin board
- Verification checklist for licenses, insurance, inspection, and lead routing
- Pricing calculator for the listing model
- Phase-two commission calculator for confirmed bookings
- 3D-style corporate SVG logo and social card

## Founder Docs

- `docs/PRODUCT_SPEC.md`
- `docs/MONETIZATION.md`
- `docs/DATA_MODEL.md`
- `docs/BUILD_BACKLOG.md`
- `docs/BRAND.md`
- `docs/ROADMAP.md`

## Run

Open `index.html` in a browser, or serve the folder with:

```bash
npm start
```

## Check

```bash
npm run check
```
