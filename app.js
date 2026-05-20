const DATA_VERSION = "20260520-heavyster-renewal-close-pack-v70";
const STORAGE_KEY = "heavyster.marketplace.v1";

const listings = [
  {
    id: "HY-EX-001",
    name: "Cat 320 Excavator",
    category: "Earthmoving",
    supplier: "Al Noor Heavy Rentals",
    region: "UAE",
    city: "Dubai",
    rate: "Quote direct",
    availability: "available",
    verified: true,
    documents: ["Trade license", "Insurance", "Inspection"],
    specs: "22 ton, bucket set, optional breaker, operator on request"
  },
  {
    id: "HY-CR-014",
    name: "Liebherr 130T Mobile Crane",
    category: "Lifting",
    supplier: "Gulf Lift Services",
    region: "UAE",
    city: "Abu Dhabi",
    rate: "Quote direct",
    availability: "soon",
    verified: true,
    documents: ["Trade license", "Load test", "Operator license"],
    specs: "130 ton class, certified operator, city permit support"
  },
  {
    id: "HY-LD-022",
    name: "Komatsu WA380 Wheel Loader",
    category: "Earthmoving",
    supplier: "Desertline Equipment",
    region: "USA",
    city: "Houston",
    rate: "Quote direct",
    availability: "available",
    verified: false,
    documents: ["Insurance pending", "Inspection"],
    specs: "3.5 cubic yard bucket, quarry and yard work ready"
  },
  {
    id: "HY-TL-030",
    name: "JCB Telehandler 540-170",
    category: "Lifting",
    supplier: "Metro Plant Hire",
    region: "UK",
    city: "Birmingham",
    rate: "Quote direct",
    availability: "available",
    verified: true,
    documents: ["Company registry", "Insurance", "Service record"],
    specs: "17 m reach, forks and bucket, weekly hire available"
  },
  {
    id: "HY-RD-042",
    name: "Dynapac CA250 Roller",
    category: "Roadwork",
    supplier: "Prime Road Rentals",
    region: "India",
    city: "Pune",
    rate: "Quote direct",
    availability: "soon",
    verified: true,
    documents: ["GST", "Insurance", "Maintenance log"],
    specs: "10 ton soil compactor, fuel and operator terms direct"
  },
  {
    id: "HY-DZ-055",
    name: "D6 Dozer",
    category: "Earthmoving",
    supplier: "Frontier Civil Rentals",
    region: "USA",
    city: "Phoenix",
    rate: "Quote direct",
    availability: "available",
    verified: true,
    documents: ["Business license", "Insurance", "Inspection"],
    specs: "LGP track option, GPS-ready blade control"
  }
];

const categoryDirectory = [
  { name: "Excavators", group: "Earthmoving", count: 248, regions: "UAE, USA, India", intent: "High-intent contractor search" },
  { name: "Mobile cranes", group: "Lifting", count: 116, regions: "UAE, UK, USA", intent: "Permit and capacity driven" },
  { name: "Wheel loaders", group: "Earthmoving", count: 184, regions: "USA, India, UAE", intent: "Quarry, yard, and bulk handling" },
  { name: "Telehandlers", group: "Lifting", count: 139, regions: "UK, UAE, USA", intent: "Site logistics and material handling" },
  { name: "Dozers", group: "Earthmoving", count: 91, regions: "USA, India", intent: "Civil and earthworks demand" },
  { name: "Rollers", group: "Roadwork", count: 132, regions: "India, UAE, USA", intent: "Roadwork and compaction" },
  { name: "Generators", group: "Power", count: 205, regions: "UAE, USA, UK", intent: "Event, backup, and site power" },
  { name: "Lowbed trailers", group: "Transport", count: 77, regions: "UAE, India, USA", intent: "Equipment transport support" }
];

const marketplaceSmartViews = [
  {
    id: "uae-supply",
    label: "UAE supply",
    search: "",
    region: "UAE",
    availability: "all",
    category: "all",
    sort: "verified",
    cue: "Verified local options"
  },
  {
    id: "available-now",
    label: "Available now",
    search: "",
    region: "all",
    availability: "available",
    category: "all",
    sort: "available",
    cue: "Fastest direct enquiry path"
  },
  {
    id: "verified-lifting",
    label: "Verified lifting",
    search: "",
    region: "all",
    availability: "all",
    category: "Lifting",
    sort: "verified",
    cue: "Crane and reach proof"
  },
  {
    id: "earthmoving-ready",
    label: "Earthmoving ready",
    search: "",
    region: "all",
    availability: "available",
    category: "Earthmoving",
    sort: "available",
    cue: "Excavators, loaders, dozers"
  },
  {
    id: "uae-crane-gap",
    label: "UAE crane gap",
    search: "crane",
    region: "UAE",
    availability: "available",
    category: "all",
    sort: "verified",
    cue: "Demand signal if supply is short"
  }
];

const supplierProfiles = [
  {
    supplier: "Al Noor Heavy Rentals",
    slug: "al-noor-heavy-rentals",
    headline: "Dubai earthmoving fleet with operator support and attachment-ready excavators.",
    branch: "Dubai, UAE",
    serviceArea: "Dubai, Sharjah, Abu Dhabi, and northern UAE sites",
    response: "Under 2 hours",
    since: "2016",
    fleet: [
      { label: "Excavators", count: 14, status: "Ready" },
      { label: "Breakers and buckets", count: 9, status: "On request" },
      { label: "Site support", count: 6, status: "Confirm" }
    ],
    services: ["Operator on request", "Attachment list", "Insurance certificate", "Site delivery coordination"],
    proof: ["Trade license", "Insurance", "Inspection", "Fleet photos"]
  },
  {
    supplier: "Gulf Lift Services",
    slug: "gulf-lift-services",
    headline: "Certified UAE lifting supplier for crane pads, city permits, and operator-led lifts.",
    branch: "Abu Dhabi, UAE",
    serviceArea: "Abu Dhabi, Dubai, industrial zones, and oilfield support areas",
    response: "Same day",
    since: "2012",
    fleet: [
      { label: "Mobile cranes", count: 18, status: "Certified" },
      { label: "Lift supervisors", count: 7, status: "On request" },
      { label: "Permit support", count: 5, status: "Confirm" }
    ],
    services: ["Certified operator", "Load chart review", "City permit support", "Lift plan notes"],
    proof: ["Trade license", "Load test", "Operator license", "Insurance cover"]
  },
  {
    supplier: "Desertline Equipment",
    slug: "desertline-equipment",
    headline: "Houston loaders and yard machines for quarry, bulk handling, and civil jobs.",
    branch: "Houston, USA",
    serviceArea: "Houston metro, yards, quarries, and Gulf Coast contractor sites",
    response: "Next business hour",
    since: "2019",
    fleet: [
      { label: "Wheel loaders", count: 11, status: "Ready" },
      { label: "Buckets", count: 8, status: "Included" },
      { label: "Document refresh", count: 2, status: "Pending" }
    ],
    services: ["Yard loading", "Bulk handling", "Quarry specs", "Insurance refresh"],
    proof: ["Insurance pending", "Inspection", "Machine photos", "Service notes"]
  },
  {
    supplier: "Metro Plant Hire",
    slug: "metro-plant-hire",
    headline: "UK telehandler and site logistics partner for weekly hire and material reach.",
    branch: "Birmingham, UK",
    serviceArea: "West Midlands, construction sites, warehouses, and infrastructure works",
    response: "Under 3 hours",
    since: "2014",
    fleet: [
      { label: "Telehandlers", count: 9, status: "Ready" },
      { label: "Forks and buckets", count: 12, status: "Included" },
      { label: "Weekly hire", count: 6, status: "Ready" }
    ],
    services: ["Weekly hire", "Fork and bucket options", "Service record", "Site logistics"],
    proof: ["Company registry", "Insurance", "Service record", "Fleet photos"]
  },
  {
    supplier: "Prime Road Rentals",
    slug: "prime-road-rentals",
    headline: "Pune roadwork fleet for compaction, civil contractors, and operator-led jobs.",
    branch: "Pune, India",
    serviceArea: "Pune, Mumbai corridor, industrial roads, and civil sites",
    response: "Same day",
    since: "2018",
    fleet: [
      { label: "Rollers", count: 17, status: "Ready soon" },
      { label: "Operators", count: 10, status: "Direct" },
      { label: "Maintenance logs", count: 17, status: "Ready" }
    ],
    services: ["Operator terms", "Fuel terms", "Compaction support", "Maintenance log"],
    proof: ["GST", "Insurance", "Maintenance log", "Operator terms"]
  },
  {
    supplier: "Frontier Civil Rentals",
    slug: "frontier-civil-rentals",
    headline: "Phoenix civil rental yard for dozers, GPS-ready blades, and earthworks support.",
    branch: "Phoenix, USA",
    serviceArea: "Arizona civil jobs, earthworks, utility corridors, and site prep",
    response: "Under 2 hours",
    since: "2015",
    fleet: [
      { label: "Dozers", count: 22, status: "Ready" },
      { label: "GPS-ready blades", count: 8, status: "On request" },
      { label: "LGP tracks", count: 5, status: "Confirm" }
    ],
    services: ["GPS-ready blade control", "LGP option", "Site prep support", "Inspection packet"],
    proof: ["Business license", "Insurance", "Inspection", "Service photos"]
  }
];

const supplierLeadSeeds = [
  {
    id: "LD-001",
    supplier: "Al Noor Heavy Rentals",
    listingId: "HY-EX-001",
    buyer: "Delta Civil Works",
    equipment: "Cat 320 Excavator",
    project: "Trenching and backfill near Jebel Ali",
    location: "Dubai Industrial City",
    start: "Next week",
    duration: "6 days",
    budget: 8500,
    channel: "WhatsApp",
    ageMinutes: 18,
    terms: ["Operator", "Breaker", "Delivery"],
    note: "Need operator, breaker option, and delivery timing."
  },
  {
    id: "LD-002",
    supplier: "Gulf Lift Services",
    listingId: "HY-CR-014",
    buyer: "Quay B Logistics",
    equipment: "Liebherr 130T Mobile Crane",
    project: "Crane pad lift and permit support",
    location: "Abu Dhabi port zone",
    start: "This week",
    duration: "2 days",
    budget: 18500,
    channel: "Email",
    ageMinutes: 42,
    terms: ["Operator", "Permit", "Lift plan"],
    note: "Buyer asked for capacity chart and city permit guidance."
  },
  {
    id: "LD-003",
    supplier: "Desertline Equipment",
    listingId: "HY-LD-022",
    buyer: "Gulf Coast Aggregates",
    equipment: "Komatsu WA380 Wheel Loader",
    project: "Yard loading and stockpile movement",
    location: "Houston east yard",
    start: "This month",
    duration: "3 weeks",
    budget: 12600,
    channel: "Phone",
    ageMinutes: 210,
    terms: ["Bucket", "Insurance", "Fuel"],
    note: "Buyer needs insurance proof before confirming."
  },
  {
    id: "LD-004",
    supplier: "Metro Plant Hire",
    listingId: "HY-TL-030",
    buyer: "Midlands BuildCo",
    equipment: "JCB Telehandler 540-170",
    project: "Material reach for warehouse fit-out",
    location: "Birmingham logistics park",
    start: "Next week",
    duration: "10 days",
    budget: 7200,
    channel: "Web",
    ageMinutes: 76,
    terms: ["Forks", "Weekly hire", "Delivery"],
    note: "Buyer wants forks, bucket option, and delivery window."
  },
  {
    id: "LD-005",
    supplier: "Prime Road Rentals",
    listingId: "HY-RD-042",
    buyer: "Pune Infra Works",
    equipment: "Dynapac CA250 Roller",
    project: "Industrial road compaction",
    location: "Chakan industrial belt",
    start: "This week",
    duration: "8 days",
    budget: 5100,
    channel: "WhatsApp",
    ageMinutes: 33,
    terms: ["Operator", "Fuel terms", "Maintenance log"],
    note: "Buyer needs operator terms and current maintenance log."
  },
  {
    id: "LD-006",
    supplier: "Frontier Civil Rentals",
    listingId: "HY-DZ-055",
    buyer: "Sonoran Site Prep",
    equipment: "D6 Dozer",
    project: "Site prep and grading support",
    location: "Phoenix north corridor",
    start: "Planning stage",
    duration: "1 month",
    budget: 24000,
    channel: "Email",
    ageMinutes: 160,
    terms: ["GPS blade", "LGP track", "Inspection"],
    note: "Buyer wants GPS-ready blade availability and inspection proof."
  }
];

const trustItems = [
  ["Company profile", "Legal name, service regions, contact desk, and fleet categories."],
  ["Equipment proof", "Photos, serial-friendly internal ID, make, model, specs, and attachments."],
  ["Documents", "License, insurance, inspection, operator certificate, and optional permit notes."],
  ["Availability", "Available now, available soon, or call-to-confirm status for each listing."],
  ["Lead routing", "Phone, WhatsApp, email, and enquiry packet copied to supplier CRM."],
  ["Billing", "USD 9 monthly or USD 99 yearly per active listing, no rental commission."]
];

const onboardingSteps = [
  ["Company", "Create supplier account and branch profile."],
  ["Fleet", "Add equipment listings with photos and specs."],
  ["Verify", "Attach license, insurance, inspection, and operator documents."],
  ["Publish", "Choose monthly or annual listing plan and go live."]
];

const adminQueue = [
  { supplier: "Al Noor Heavy Rentals", region: "UAE", listings: 14, status: "Ready to verify" },
  { supplier: "Frontier Civil Rentals", region: "USA", listings: 22, status: "Docs pending" },
  { supplier: "Metro Plant Hire", region: "UK", listings: 9, status: "Billing setup" },
  { supplier: "Prime Road Rentals", region: "India", listings: 17, status: "Review photos" }
];

const seedDemandSignals = [
  { equipment: "Crawler crane", region: "UAE", urgency: "This week", duration: "7 days", source: "Buyer search", count: 4 },
  { equipment: "Motor grader", region: "India", urgency: "This month", duration: "12 days", source: "Category gap", count: 3 },
  { equipment: "250 kVA generator", region: "USA", urgency: "Next week", duration: "Weekend", source: "Project note", count: 2 }
];

const huntBlueprints = [
  {
    keywords: ["crane", "lifting", "telehandler"],
    persona: "Crane and lifting fleet owners",
    category: "Lifting",
    starterListings: 18,
    proof: ["Load test certificate", "Operator license", "Lift capacity chart", "Insurance cover"],
    hook: "buyers are searching for certified lifting capacity, not casual equipment photos"
  },
  {
    keywords: ["grader", "roller", "road", "compactor"],
    persona: "Roadwork and civil plant suppliers",
    category: "Roadwork",
    starterListings: 14,
    proof: ["Recent service log", "Site-ready photos", "Compaction or blade specs", "Operator option"],
    hook: "contractors need roadwork machines with availability and service proof"
  },
  {
    keywords: ["generator", "power", "kva"],
    persona: "Temporary power rental companies",
    category: "Power",
    starterListings: 22,
    proof: ["Load bank test", "Fuel terms", "Cable and distribution notes", "Delivery area"],
    hook: "event and site teams need fast power availability by region"
  },
  {
    keywords: ["trailer", "lowbed", "transport"],
    persona: "Equipment transport and lowbed operators",
    category: "Transport",
    starterListings: 10,
    proof: ["Trailer capacity", "Permit support", "Driver coverage", "Service radius"],
    hook: "equipment movement demand follows every heavy rental search"
  },
  {
    keywords: ["excavator", "loader", "dozer", "earth"],
    persona: "Earthmoving rental yards",
    category: "Earthmoving",
    starterListings: 20,
    proof: ["Machine photos", "Attachment list", "Service record", "Operator availability"],
    hook: "earthmoving buyers compare availability, attachments, and local support first"
  }
];

const jobsiteBlueprints = [
  {
    key: "earthworks",
    label: "Earthworks package",
    keywords: ["earth", "excavat", "foundation", "trench", "backfill", "site prep", "dozer", "loader"],
    outcome: "Move soil, open trenches, shape the site, and finish with compaction.",
    roles: [
      { role: "Primary excavation", category: "Earthmoving", keywords: ["excavator", "bucket", "breaker"], target: "Excavator with attachments" },
      { role: "Bulk loading", category: "Earthmoving", keywords: ["loader", "wheel"], target: "Wheel loader" },
      { role: "Cut and push", category: "Earthmoving", keywords: ["dozer", "blade", "track"], target: "Dozer" },
      { role: "Final compaction", category: "Roadwork", keywords: ["roller", "compactor", "soil"], target: "Soil compactor" }
    ]
  },
  {
    key: "lifting",
    label: "Lifting package",
    keywords: ["lift", "crane", "telehandler", "steel", "permit", "operator", "height"],
    outcome: "Lift heavy materials with certified capacity, operator proof, and site logistics support.",
    roles: [
      { role: "Heavy lift", category: "Lifting", keywords: ["crane", "mobile", "load"], target: "Mobile crane" },
      { role: "Material reach", category: "Lifting", keywords: ["telehandler", "reach", "fork"], target: "Telehandler" },
      { role: "Site loading", category: "Earthmoving", keywords: ["loader", "bucket"], target: "Loader for staging" },
      { role: "Transport support", category: "Transport", keywords: ["lowbed", "trailer", "transport"], target: "Lowbed trailer" }
    ]
  },
  {
    key: "roadwork",
    label: "Roadwork package",
    keywords: ["road", "asphalt", "roller", "compaction", "grader", "pavement", "civil"],
    outcome: "Prepare, place, compact, and support roadwork execution.",
    roles: [
      { role: "Compaction", category: "Roadwork", keywords: ["roller", "compactor"], target: "Road roller" },
      { role: "Earth shaping", category: "Earthmoving", keywords: ["dozer", "blade"], target: "Dozer or grader" },
      { role: "Material loading", category: "Earthmoving", keywords: ["loader", "wheel"], target: "Wheel loader" },
      { role: "Site excavation", category: "Earthmoving", keywords: ["excavator"], target: "Excavator" }
    ]
  },
  {
    key: "site-power",
    label: "Site power package",
    keywords: ["power", "generator", "kva", "temporary", "event", "backup", "cable"],
    outcome: "Keep the site powered while material handling and backup equipment stay ready.",
    roles: [
      { role: "Temporary power", category: "Power", keywords: ["generator", "kva", "power"], target: "Generator set" },
      { role: "Material handling", category: "Lifting", keywords: ["telehandler", "fork"], target: "Telehandler" },
      { role: "Backup lift", category: "Lifting", keywords: ["crane", "lift"], target: "Crane on call" },
      { role: "Delivery support", category: "Transport", keywords: ["lowbed", "transport", "trailer"], target: "Transport partner" }
    ]
  }
];

const commandRoles = ["Buyer", "Supplier", "Founder"];

const commandRoutes = [
  {
    role: "Buyer",
    label: "Buyer decision flow",
    anchor: "#buyer-workbench",
    detail: "Move from equipment search to a controlled buyer workbench, RFQ, award, quote clarity, mobilization, and a direct deal trail without losing control.",
    steps: [
      { label: "Search", anchor: "#marketplace" },
      { label: "Desk", anchor: "#buyer-workbench" },
      { label: "Jobsite", anchor: "#jobsite" },
      { label: "Passport", anchor: "#passport" },
      { label: "RFQ", anchor: "#rfq" },
      { label: "Award", anchor: "#award" },
      { label: "Quote Guard", anchor: "#quote-guard" },
      { label: "Mobilize", anchor: "#mobilize" },
      { label: "Deal Trail", anchor: "#deal-trail" }
    ]
  },
  {
    role: "Supplier",
    label: "Supplier revenue flow",
    anchor: "#supplier-workbench",
    detail: "Turn a rental yard into a verified storefront, fresh fleet board, direct lead response desk, and paid listing revenue path.",
    steps: [
      { label: "Desk", anchor: "#supplier-workbench" },
      { label: "Storefront", anchor: "#storefront" },
      { label: "Import", anchor: "#fleet-import" },
      { label: "Proof", anchor: "#proof-vault" },
      { label: "Revenue", anchor: "#revenue-desk" },
      { label: "Health", anchor: "#account-health" },
      { label: "Studio", anchor: "#studio" },
      { label: "Lead Desk", anchor: "#lead-desk" },
      { label: "Yard", anchor: "#yard" }
    ]
  },
  {
    role: "Founder",
    label: "Founder growth flow",
    anchor: "#founder-workbench",
    detail: "Run one founder workbench that decides where to capture demand, repair trust, activate paid listings, and scale without touching rental payment.",
    steps: [
      { label: "Desk", anchor: "#founder-workbench" },
      { label: "Morning", anchor: "#founder-morning" },
      { label: "Daily", anchor: "#founder-daily" },
      { label: "Call Sheet", anchor: "#founder-call-sheet" },
      { label: "Demand", anchor: "#admin" },
      { label: "Success", anchor: "#supplier-success" },
      { label: "Pages", anchor: "#page-factory" },
      { label: "Launch", anchor: "#launch-room" },
      { label: "Twin", anchor: "#market-twin" },
      { label: "Flywheel", anchor: "#liquidity-flywheel" },
      { label: "Autopilot", anchor: "#founder-autopilot" },
      { label: "Exchange", anchor: "#demand-exchange" },
      { label: "Proof Room", anchor: "#proof-demand" },
      { label: "Commit", anchor: "#supplier-commitment" },
      { label: "Activate", anchor: "#listing-activation" },
      { label: "Ledger", anchor: "#trust-revenue-ledger" },
      { label: "Matrix", anchor: "#market-signal-matrix" },
      { label: "Hunt", anchor: "#growth" },
      { label: "Market Map", anchor: "#market-maker" },
      { label: "Categories", anchor: "#categories" },
      { label: "Roadmap", anchor: "#roadmap" }
    ]
  }
];

const commandModules = [
  { role: "Buyer", label: "Marketplace", anchor: "#marketplace", signal: "Find equipment" },
  { role: "Buyer", label: "Buyer Desk", anchor: "#buyer-workbench", signal: "Control path" },
  { role: "Buyer", label: "Jobsite", anchor: "#jobsite", signal: "Build package" },
  { role: "Buyer", label: "Trust Passport", anchor: "#passport", signal: "Check proof" },
  { role: "Buyer", label: "RFQ Room", anchor: "#rfq", signal: "Ask suppliers" },
  { role: "Buyer", label: "Award Room", anchor: "#award", signal: "Choose supplier" },
  { role: "Buyer", label: "Quote Guard", anchor: "#quote-guard", signal: "Clean terms" },
  { role: "Buyer", label: "Mobilize", anchor: "#mobilize", signal: "Dispatch gate" },
  { role: "Buyer", label: "Deal Trail", anchor: "#deal-trail", signal: "Prove workflow" },
  { role: "Supplier", label: "Supplier Desk", anchor: "#supplier-workbench", signal: "Control revenue" },
  { role: "Supplier", label: "Storefront", anchor: "#storefront", signal: "Public profile" },
  { role: "Supplier", label: "Fleet Import", anchor: "#fleet-import", signal: "Bulk upload" },
  { role: "Supplier", label: "Proof Vault", anchor: "#proof-vault", signal: "Verify docs" },
  { role: "Supplier", label: "Revenue Desk", anchor: "#revenue-desk", signal: "Renew listings" },
  { role: "Supplier", label: "Account Health", anchor: "#account-health", signal: "Save account" },
  { role: "Supplier", label: "Supplier Studio", anchor: "#studio", signal: "Manage fleet" },
  { role: "Supplier", label: "Lead Desk", anchor: "#lead-desk", signal: "Reply faster" },
  { role: "Supplier", label: "Yard Board", anchor: "#yard", signal: "Fresh stock" },
  { role: "Supplier", label: "Pricing", anchor: "#pricing", signal: "Listing revenue" },
  { role: "Founder", label: "Founder Desk", anchor: "#founder-workbench", signal: "Scale control" },
  { role: "Founder", label: "Morning Brief", anchor: "#founder-morning", signal: "Start day" },
  { role: "Founder", label: "Daily Moves", anchor: "#founder-daily", signal: "Work today" },
  { role: "Founder", label: "Supplier Call Sheet", anchor: "#founder-call-sheet", signal: "Close supply" },
  { role: "Founder", label: "Admin", anchor: "#admin", signal: "Verify supply" },
  { role: "Founder", label: "Success Queue", anchor: "#supplier-success", signal: "Call first" },
  { role: "Founder", label: "Page Factory", anchor: "#page-factory", signal: "Publish pages" },
  { role: "Founder", label: "Launch Room", anchor: "#launch-room", signal: "Run sprint" },
  { role: "Founder", label: "Market Twin", anchor: "#market-twin", signal: "Simulate launch" },
  { role: "Founder", label: "Liquidity Flywheel", anchor: "#liquidity-flywheel", signal: "Find bottleneck" },
  { role: "Founder", label: "Founder Autopilot", anchor: "#founder-autopilot", signal: "Dispatch work" },
  { role: "Founder", label: "Demand Exchange", anchor: "#demand-exchange", signal: "Pull suppliers" },
  { role: "Founder", label: "Proof of Demand", anchor: "#proof-demand", signal: "Prove ROI" },
  { role: "Founder", label: "Supplier Commitment", anchor: "#supplier-commitment", signal: "Close listing" },
  { role: "Founder", label: "Listing Activation", anchor: "#listing-activation", signal: "Go live" },
  { role: "Founder", label: "Trust Ledger", anchor: "#trust-revenue-ledger", signal: "Protect revenue" },
  { role: "Founder", label: "Market Matrix", anchor: "#market-signal-matrix", signal: "Scan wedges" },
  { role: "Founder", label: "Growth", anchor: "#growth", signal: "Recruit supply" },
  { role: "Founder", label: "Market Map", anchor: "#market-maker", signal: "Launch pages" },
  { role: "Founder", label: "Categories", anchor: "#categories", signal: "Plan inventory" },
  { role: "Founder", label: "Roadmap", anchor: "#roadmap", signal: "Build sequence" }
];

const fleetImportRows = [
  {
    id: "FI-001",
    supplier: "Al Noor Heavy Rentals",
    source: "yard-sheet-dubai.csv",
    equipment: "Cat 320 Excavator",
    category: "Earthmoving",
    region: "UAE",
    count: 6,
    photos: true,
    documents: true,
    availability: true,
    rateTerms: false,
    contact: true
  },
  {
    id: "FI-002",
    supplier: "Al Noor Heavy Rentals",
    source: "yard-sheet-dubai.csv",
    equipment: "Cat 330 Excavator",
    category: "Earthmoving",
    region: "UAE",
    count: 4,
    photos: true,
    documents: false,
    availability: true,
    rateTerms: false,
    contact: true
  },
  {
    id: "FI-003",
    supplier: "Al Noor Heavy Rentals",
    source: "attachment-list.xlsx",
    equipment: "Hydraulic breaker set",
    category: "Earthmoving",
    region: "UAE",
    count: 9,
    photos: false,
    documents: true,
    availability: true,
    rateTerms: true,
    contact: true
  },
  {
    id: "FI-004",
    supplier: "Gulf Lift Services",
    source: "crane-fleet.csv",
    equipment: "Liebherr 130T Mobile Crane",
    category: "Lifting",
    region: "UAE",
    count: 3,
    photos: true,
    documents: true,
    availability: false,
    rateTerms: true,
    contact: true
  },
  {
    id: "FI-005",
    supplier: "Gulf Lift Services",
    source: "operator-certificates.xlsx",
    equipment: "Lift supervisor crew",
    category: "Lifting",
    region: "UAE",
    count: 7,
    photos: false,
    documents: true,
    availability: true,
    rateTerms: true,
    contact: true
  },
  {
    id: "FI-006",
    supplier: "Desertline Equipment",
    source: "houston-yard.csv",
    equipment: "Komatsu WA380 Wheel Loader",
    category: "Earthmoving",
    region: "USA",
    count: 5,
    photos: true,
    documents: false,
    availability: false,
    rateTerms: true,
    contact: true
  }
];

const proofVaultRows = [
  {
    id: "PV-001",
    supplier: "Al Noor Heavy Rentals",
    listingId: "HY-EX-001",
    type: "Trade license",
    target: "Company profile",
    status: "ready",
    expiresInDays: 210,
    holder: "Operations desk",
    action: "Keep live"
  },
  {
    id: "PV-002",
    supplier: "Al Noor Heavy Rentals",
    listingId: "HY-EX-001",
    type: "Insurance",
    target: "Cat 320 Excavator",
    status: "expiring",
    expiresInDays: 26,
    holder: "Broker",
    action: "Renew before routing major enquiries"
  },
  {
    id: "PV-003",
    supplier: "Al Noor Heavy Rentals",
    listingId: "HY-EX-001",
    type: "Inspection",
    target: "Cat 320 Excavator",
    status: "ready",
    expiresInDays: 92,
    holder: "Workshop",
    action: "Attach to listing"
  },
  {
    id: "PV-004",
    supplier: "Gulf Lift Services",
    listingId: "HY-CR-014",
    type: "Trade license",
    target: "Company profile",
    status: "ready",
    expiresInDays: 180,
    holder: "Admin",
    action: "Keep live"
  },
  {
    id: "PV-005",
    supplier: "Gulf Lift Services",
    listingId: "HY-CR-014",
    type: "Load test",
    target: "Liebherr 130T Mobile Crane",
    status: "ready",
    expiresInDays: 58,
    holder: "Lifting engineer",
    action: "Send with quote"
  },
  {
    id: "PV-006",
    supplier: "Gulf Lift Services",
    listingId: "HY-CR-014",
    type: "Operator license",
    target: "Lift supervisor crew",
    status: "expiring",
    expiresInDays: 19,
    holder: "Crew coordinator",
    action: "Renew before mobilization"
  },
  {
    id: "PV-007",
    supplier: "Gulf Lift Services",
    listingId: "HY-CR-014",
    type: "City permit note",
    target: "Abu Dhabi lifts",
    status: "missing",
    expiresInDays: null,
    holder: "Permit desk",
    action: "Add permit workflow note"
  },
  {
    id: "PV-008",
    supplier: "Desertline Equipment",
    listingId: "HY-LD-022",
    type: "Insurance",
    target: "Komatsu WA380 Wheel Loader",
    status: "missing",
    expiresInDays: null,
    holder: "Owner",
    action: "Upload insurance before verified badge"
  },
  {
    id: "PV-009",
    supplier: "Metro Plant Hire",
    listingId: "HY-TL-030",
    type: "Service record",
    target: "JCB Telehandler 540-170",
    status: "ready",
    expiresInDays: 74,
    holder: "Workshop",
    action: "Keep live"
  },
  {
    id: "PV-010",
    supplier: "Prime Road Rentals",
    listingId: "HY-RD-042",
    type: "Maintenance log",
    target: "Dynapac CA250 Roller",
    status: "ready",
    expiresInDays: 45,
    holder: "Yard admin",
    action: "Attach to listing"
  },
  {
    id: "PV-011",
    supplier: "Frontier Civil Rentals",
    listingId: "HY-DZ-055",
    type: "Inspection",
    target: "D6 Dozer",
    status: "expiring",
    expiresInDays: 22,
    holder: "Service manager",
    action: "Book inspection refresh"
  }
];

const listingRevenueRows = [
  {
    id: "RD-001",
    supplier: "Al Noor Heavy Rentals",
    listingId: "HY-EX-001",
    package: "Cat 320 Excavator fleet",
    plan: "annual",
    status: "active",
    listings: 6,
    renewalDays: 74,
    signal: "High-intent earthmoving page",
    action: "Keep annual plan live"
  },
  {
    id: "RD-002",
    supplier: "Al Noor Heavy Rentals",
    listingId: "HY-EX-001",
    package: "Cat 330 Excavator imports",
    plan: "monthly",
    status: "renewal-risk",
    listings: 4,
    renewalDays: 12,
    signal: "Imported rows ready for annual upsell",
    action: "Move to annual before expiry"
  },
  {
    id: "RD-003",
    supplier: "Al Noor Heavy Rentals",
    listingId: "HY-EX-001",
    package: "Hydraulic breaker set",
    plan: "monthly",
    status: "draft",
    listings: 9,
    renewalDays: null,
    signal: "Attachment demand, photos missing",
    action: "Publish after photos"
  },
  {
    id: "RD-004",
    supplier: "Gulf Lift Services",
    listingId: "HY-CR-014",
    package: "Liebherr 130T crane listing",
    plan: "annual",
    status: "active",
    listings: 3,
    renewalDays: 48,
    signal: "Crane demand from UAE searches",
    action: "Keep proof attached"
  },
  {
    id: "RD-005",
    supplier: "Gulf Lift Services",
    listingId: "HY-CR-014",
    package: "Lift supervisor crew",
    plan: "monthly",
    status: "paused",
    listings: 7,
    renewalDays: null,
    signal: "Crew availability not confirmed",
    action: "Confirm availability then activate"
  },
  {
    id: "RD-006",
    supplier: "Desertline Equipment",
    listingId: "HY-LD-022",
    package: "Komatsu loader yard set",
    plan: "monthly",
    status: "renewal-risk",
    listings: 5,
    renewalDays: 9,
    signal: "Insurance gap blocks verified badge",
    action: "Renew billing after proof upload"
  },
  {
    id: "RD-007",
    supplier: "Metro Plant Hire",
    listingId: "HY-TL-030",
    package: "Telehandler weekly hire fleet",
    plan: "annual",
    status: "active",
    listings: 9,
    renewalDays: 96,
    signal: "Stable UK site logistics demand",
    action: "Invite branch expansion"
  },
  {
    id: "RD-008",
    supplier: "Prime Road Rentals",
    listingId: "HY-RD-042",
    package: "Compaction fleet",
    plan: "annual",
    status: "active",
    listings: 17,
    renewalDays: 33,
    signal: "Roadwork category supply gap",
    action: "Reconfirm soon status"
  },
  {
    id: "RD-009",
    supplier: "Frontier Civil Rentals",
    listingId: "HY-DZ-055",
    package: "Dozer civil fleet",
    plan: "annual",
    status: "active",
    listings: 22,
    renewalDays: 88,
    signal: "US earthmoving page anchor",
    action: "Keep annual renewal warm"
  }
];

let state = loadState();
let toastTimer = 0;
let commandPaletteQuery = "";
let workflowMenuQuery = "";
let workflowMenuRole = "all";

document.addEventListener("DOMContentLoaded", () => {
  bindControls();
  render();
  stabilizeHashScroll();
  syncNavigationState();
  window.addEventListener("hashchange", () => {
    stabilizeHashScroll();
    syncNavigationState();
    renderWorkflowDock();
    renderWorkflowGuide();
    renderDemoFlightDeck();
    renderBoardroomSnapshot();
    renderPilotPack();
    closeWorkflowMenu();
  });
});

function defaultState() {
  return {
    search: "",
    region: "all",
    availability: "all",
    category: "all",
    sort: "available",
    compactView: false,
    selectedListingId: "HY-EX-001",
    shortlistIds: ["HY-EX-001"],
    shortlistCompareOpen: false,
    enquiryMode: "proof",
    responseTracker: {
      listingId: "",
      status: "draft",
      copiedAt: "",
      sentAt: "",
      followUpAt: "",
      replyAt: ""
    },
    projectNote: "Need equipment for next week. Please confirm rental terms, operator option, delivery, and documents.",
    listingCount: 12,
    bookingValue: 8500,
    confirmedBookings: 6,
    quoteAmount: 8500,
    quoteDays: 5,
    quoteIncludes: {
      operator: true,
      transport: false,
      fuel: false,
      permit: false,
      overtime: false,
      validity: true
    },
    builderCategory: "Earthmoving",
    builderModel: "Cat 320 Excavator",
    builderRegion: "UAE",
    builderAvailability: "available",
    jobsiteType: "smart",
    jobsiteRegion: "selected",
    jobsiteUrgency: "This week",
    demandEquipment: "Crawler crane",
    demandRegion: "UAE",
    demandUrgency: "This week",
    demandDuration: "5 days",
    demandSignals: seedDemandSignals.map((signal) => ({ ...signal })),
    activeDemandKey: "",
    activeMarketKey: "",
    activeMatrixKey: "",
    marketTwinScenario: "balanced",
    commandRole: "Buyer",
    supplierView: false,
    trustChecked: [true, true, true, false, false, false]
  };
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    const base = defaultState();
    const merged = { ...base, ...(saved || {}) };
    merged.quoteIncludes = { ...base.quoteIncludes, ...(merged.quoteIncludes || {}) };
    merged.responseTracker = { ...base.responseTracker, ...(merged.responseTracker || {}) };
    if (!Array.isArray(merged.demandSignals)) merged.demandSignals = base.demandSignals;
    if (!commandRoles.includes(merged.commandRole)) merged.commandRole = base.commandRole;
    if (!merged.activeDemandKey && merged.demandSignals.length) merged.activeDemandKey = getDemandKey(merged.demandSignals[0]);
    if (!merged.activeMarketKey) merged.activeMarketKey = getMarketKeyFromSignal(merged.demandSignals[0]);
    if (!merged.activeMatrixKey) merged.activeMatrixKey = merged.activeMarketKey;
    return merged;
  } catch {
    return defaultState();
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function bindControls() {
  const search = document.querySelector("#equipmentSearch");
  const region = document.querySelector("#regionFilter");
  const availability = document.querySelector("#availabilityFilter");
  const note = document.querySelector("#projectNote");
  const listingCount = document.querySelector("#listingCount");
  const bookingValue = document.querySelector("#bookingValue");
  const confirmedBookings = document.querySelector("#confirmedBookings");
  const quoteAmount = document.querySelector("#quoteAmount");
  const quoteDays = document.querySelector("#quoteDays");
  const quoteIncludes = [...document.querySelectorAll("[data-quote-include]")];
  const sort = document.querySelector("#sortFilter");
  const builderCategory = document.querySelector("#builderCategory");
  const builderModel = document.querySelector("#builderModel");
  const builderRegion = document.querySelector("#builderRegion");
  const builderAvailability = document.querySelector("#builderAvailability");
  const commandPaletteInput = document.querySelector("#commandPaletteInput");
  const workflowMenuSearch = document.querySelector("#workflowMenuSearch");
  const workflowMenuFilters = document.querySelector("#workflowMenuFilters");
  const jobsiteType = document.querySelector("#jobsiteType");
  const jobsiteRegion = document.querySelector("#jobsiteRegion");
  const jobsiteUrgency = document.querySelector("#jobsiteUrgency");
  const demandEquipment = document.querySelector("#demandEquipment");
  const demandRegion = document.querySelector("#demandRegion");
  const demandUrgency = document.querySelector("#demandUrgency");
  const demandDuration = document.querySelector("#demandDuration");
  const enquiryMode = document.querySelector("#enquiryMode");

  search.value = state.search;
  region.value = state.region;
  availability.value = state.availability;
  note.value = state.projectNote;
  listingCount.value = String(state.listingCount);
  bookingValue.value = String(state.bookingValue);
  confirmedBookings.value = String(state.confirmedBookings);
  quoteAmount.value = String(state.quoteAmount);
  quoteDays.value = String(state.quoteDays);
  quoteIncludes.forEach((input) => {
    input.checked = Boolean(state.quoteIncludes[input.dataset.quoteInclude]);
  });
  sort.value = state.sort;
  builderCategory.value = state.builderCategory;
  builderModel.value = state.builderModel;
  builderRegion.value = state.builderRegion;
  builderAvailability.value = state.builderAvailability;
  jobsiteType.value = state.jobsiteType;
  jobsiteRegion.value = state.jobsiteRegion;
  jobsiteUrgency.value = state.jobsiteUrgency;
  demandEquipment.value = state.demandEquipment;
  demandRegion.value = state.demandRegion;
  demandUrgency.value = state.demandUrgency;
  demandDuration.value = state.demandDuration;
  enquiryMode.value = state.enquiryMode;

  search.addEventListener("input", (event) => {
    state.search = event.target.value.trim();
    saveState();
    render();
  });

  region.addEventListener("change", (event) => {
    state.region = event.target.value;
    saveState();
    render();
  });

  availability.addEventListener("change", (event) => {
    state.availability = event.target.value;
    saveState();
    render();
  });

  note.addEventListener("input", (event) => {
    state.projectNote = event.target.value;
    saveState();
    renderLeadPacket();
    renderJobsitePlanner();
    renderRfqRoom();
    renderAwardRoom();
    renderQuoteGuard();
    renderMobilizationTower();
    renderDealTrail();
    renderBuyerWorkbench();
    renderDirectEnquiryComposer();
    renderSupplierResponseRoute();
  });

  enquiryMode.addEventListener("change", (event) => {
    state.enquiryMode = event.target.value;
    saveState();
    renderDirectEnquiryComposer();
    renderSupplierResponseRoute();
  });

  listingCount.addEventListener("input", (event) => {
    state.listingCount = Number(event.target.value);
    saveState();
    renderPricingCalculator();
  });

  bookingValue.addEventListener("input", (event) => {
    state.bookingValue = Number(event.target.value);
    saveState();
    renderCommissionCalculator();
  });

  confirmedBookings.addEventListener("input", (event) => {
    state.confirmedBookings = Number(event.target.value);
    saveState();
    renderCommissionCalculator();
  });

  [quoteAmount, quoteDays].forEach((input) => {
    input.addEventListener("input", updateQuoteGuardState);
  });

  quoteIncludes.forEach((input) => {
    input.addEventListener("change", updateQuoteGuardState);
  });

  sort.addEventListener("change", (event) => {
    state.sort = event.target.value;
    saveState();
    render();
  });

  document.querySelector("#viewToggleButton").addEventListener("click", () => {
    state.compactView = !state.compactView;
    saveState();
    renderCatalog();
    showToast(state.compactView ? "Compact catalog rows enabled." : "Equipment cards enabled.");
  });

  [builderCategory, builderModel, builderRegion, builderAvailability].forEach((input) => {
    input.addEventListener("input", updateBuilderState);
    input.addEventListener("change", updateBuilderState);
  });

  [jobsiteType, jobsiteRegion, jobsiteUrgency].forEach((input) => {
    input.addEventListener("input", updateJobsiteState);
    input.addEventListener("change", updateJobsiteState);
  });

  [demandEquipment, demandRegion, demandUrgency, demandDuration].forEach((input) => {
    input.addEventListener("input", updateDemandState);
    input.addEventListener("change", updateDemandState);
  });

  document.querySelector("#saveDemandButton").addEventListener("click", () => {
    saveDemandSignal("Buyer request");
  });

  document.querySelectorAll(".category-button").forEach((button) => {
    button.addEventListener("click", () => {
      state.category = button.dataset.category;
      saveState();
      render();
    });
  });

  document.querySelector("#copyLeadButton").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(buildLeadText());
      markEnquiryCopied();
      showToast("Direct enquiry packet copied.");
    } catch {
      showToast("Copy is blocked here, but the enquiry packet is visible.");
    }
  });

  document.querySelector("#copyPassportButton").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(buildTrustPassportText());
      showToast("Trust Passport copied.");
    } catch {
      showToast("Copy is blocked here, but the Trust Passport is visible.");
    }
  });

  document.querySelector("#copyRfqButton").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(buildRfqText());
      showToast("RFQ packet copied.");
    } catch {
      showToast("Copy is blocked here, but the RFQ packet is visible.");
    }
  });

  document.querySelector("#copyAwardButton").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(buildAwardMemoText());
      showToast("Award memo copied.");
    } catch {
      showToast("Copy is blocked here, but the award memo is visible.");
    }
  });

  document.querySelector("#copyQuoteButton").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(buildQuoteGuardText());
      showToast("Quote Guard check copied.");
    } catch {
      showToast("Copy is blocked here, but the quote check is visible.");
    }
  });

  document.querySelector("#copyJobsiteButton").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(buildJobsiteBriefText());
      showToast("Jobsite project brief copied.");
    } catch {
      showToast("Copy is blocked here, but the jobsite brief is visible.");
    }
  });

  document.querySelector("#copyBuyerWorkbenchButton").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(buildBuyerWorkbenchText());
      showToast("Buyer workbench brief copied.");
    } catch {
      showToast("Copy is blocked here, but the buyer brief is visible.");
    }
  });

  document.querySelector("#copyMobilizeButton").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(buildMobilizationText());
      showToast("Mobilization handoff copied.");
    } catch {
      showToast("Copy is blocked here, but the mobilization handoff is visible.");
    }
  });

  document.querySelector("#copyDealTrailButton").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(buildDealTrailText());
      showToast("Direct deal trail copied.");
    } catch {
      showToast("Copy is blocked here, but the direct deal trail is visible.");
    }
  });

  document.querySelector("#copyYardButton").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(buildYardUpdateText());
      showToast("Yard availability update copied.");
    } catch {
      showToast("Copy is blocked here, but the yard update is visible.");
    }
  });

  document.querySelector("#copyStorefrontButton").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(buildSupplierStorefrontText());
      showToast("Supplier storefront packet copied.");
    } catch {
      showToast("Copy is blocked here, but the storefront packet is visible.");
    }
  });

  document.querySelector("#copySupplierWorkbenchButton").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(buildSupplierWorkbenchText());
      showToast("Supplier workbench brief copied.");
    } catch {
      showToast("Copy is blocked here, but the supplier brief is visible.");
    }
  });

  document.querySelector("#copyFounderWorkbenchButton").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(buildFounderWorkbenchText());
      showToast("Founder workbench brief copied.");
    } catch {
      showToast("Copy is blocked here, but the founder brief is visible.");
    }
  });

  document.querySelector("#copyFounderMorningButton").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(buildFounderMorningBriefText());
      showToast("Founder morning brief copied.");
    } catch {
      showToast("Copy is blocked here, but the morning brief is visible.");
    }
  });

  document.querySelector("#copyFounderDailyButton").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(buildFounderDailyMovesText());
      showToast("Founder daily moves copied.");
    } catch {
      showToast("Copy is blocked here, but the daily moves are visible.");
    }
  });

  document.querySelector("#copyFounderCallSheetButton").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(buildFounderCallSheetText());
      showToast("Founder supplier call sheet copied.");
    } catch {
      showToast("Copy is blocked here, but the supplier call sheet is visible.");
    }
  });

  document.querySelector("#copyDemoFlightButton").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(buildDemoFlightDeckText());
      showToast("Demo flight script copied.");
    } catch {
      showToast("Copy is blocked here, but the demo script is visible.");
    }
  });

  document.querySelector("#copyBoardroomButton").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(buildBoardroomSnapshotText());
      showToast("Boardroom memo copied.");
    } catch {
      showToast("Copy is blocked here, but the boardroom memo is visible.");
    }
  });

  document.querySelector("#copyPilotPackButton").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(buildPilotPackText());
      showToast("30-day pilot pack copied.");
    } catch {
      showToast("Copy is blocked here, but the pilot pack is visible.");
    }
  });

  document.querySelector("#copyFleetImportButton").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(buildFleetImportText());
      showToast("Fleet import plan copied.");
    } catch {
      showToast("Copy is blocked here, but the fleet import plan is visible.");
    }
  });

  document.querySelector("#copyProofVaultButton").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(buildProofVaultText());
      showToast("Proof packet copied.");
    } catch {
      showToast("Copy is blocked here, but the proof packet is visible.");
    }
  });

  document.querySelector("#copyRevenueDeskButton").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(buildRevenueDeskText());
      showToast("Listing revenue packet copied.");
    } catch {
      showToast("Copy is blocked here, but the revenue packet is visible.");
    }
  });

  document.querySelector("#openStorefrontButton").addEventListener("click", () => {
    renderSupplierStorefront();
    document.querySelector("#storefront").scrollIntoView({ behavior: "smooth", block: "start" });
    showToast("Opening buyer-facing supplier storefront.");
  });

  document.querySelector("#copyLeadDeskButton").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(buildLeadDeskText());
      showToast("Lead reply packet copied.");
    } catch {
      showToast("Copy is blocked here, but the lead reply is visible.");
    }
  });

  document.querySelector("#copyAccountHealthButton").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(buildAccountHealthText());
      showToast("Supplier health plan copied.");
    } catch {
      showToast("Copy is blocked here, but the health plan is visible.");
    }
  });

  document.querySelector("#copySupplierSuccessButton").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(buildSupplierSuccessText());
      showToast("Supplier success queue copied.");
    } catch {
      showToast("Copy is blocked here, but the success queue is visible.");
    }
  });

  document.querySelector("#copyPageFactoryButton").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(buildPageFactoryText());
      showToast("Market page pack copied.");
    } catch {
      showToast("Copy is blocked here, but the page pack is visible.");
    }
  });

  document.querySelector("#copyLaunchRoomButton").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(buildLaunchRoomText());
      showToast("Market launch sprint copied.");
    } catch {
      showToast("Copy is blocked here, but the launch sprint is visible.");
    }
  });

  document.querySelector("#copyMarketTwinButton").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(buildMarketTwinText());
      showToast("Market twin memo copied.");
    } catch {
      showToast("Copy is blocked here, but the twin memo is visible.");
    }
  });

  document.querySelector("#copyLiquidityFlywheelButton").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(buildLiquidityFlywheelText());
      showToast("Liquidity flywheel memo copied.");
    } catch {
      showToast("Copy is blocked here, but the flywheel memo is visible.");
    }
  });

  document.querySelector("#copyFounderAutopilotButton").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(buildFounderAutopilotText());
      showToast("Founder autopilot brief copied.");
    } catch {
      showToast("Copy is blocked here, but the autopilot brief is visible.");
    }
  });

  document.querySelector("#copyDemandExchangeButton").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(buildDemandExchangeText());
      showToast("Demand Exchange supplier invite copied.");
    } catch {
      showToast("Copy is blocked here, but the supplier invite is visible.");
    }
  });

  document.querySelector("#copyProofDemandButton").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(buildProofDemandText());
      showToast("Proof of Demand pack copied.");
    } catch {
      showToast("Copy is blocked here, but the proof pack is visible.");
    }
  });

  document.querySelector("#copySupplierCommitmentButton").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(buildSupplierCommitmentText());
      showToast("Supplier commitment note copied.");
    } catch {
      showToast("Copy is blocked here, but the commitment note is visible.");
    }
  });

  document.querySelector("#copyListingActivationButton").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(buildListingActivationText());
      showToast("Listing activation plan copied.");
    } catch {
      showToast("Copy is blocked here, but the activation plan is visible.");
    }
  });

  document.querySelector("#copyTrustLedgerButton").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(buildTrustLedgerText());
      showToast("Trust and revenue ledger brief copied.");
    } catch {
      showToast("Copy is blocked here, but the ledger brief is visible.");
    }
  });

  document.querySelector("#applyJobsiteButton").addEventListener("click", () => {
    renderJobsitePlanner();
    renderMobilizationTower();
    renderDealTrail();
    document.querySelector("#jobsite").scrollIntoView({ behavior: "smooth", block: "start" });
    showToast("Jobsite package refreshed.");
  });

  document.querySelector("#applyPackageButton").addEventListener("click", () => {
    const packageListings = getJobsiteModel().matches.map((match) => match.listing).filter(Boolean);
    if (!packageListings.length) {
      showToast("No matched machines yet. Capture the supply gap first.");
      return;
    }
    state.shortlistIds = Array.from(new Set([...state.shortlistIds, ...packageListings.map((listing) => listing.id)]));
    state.selectedListingId = packageListings[0].id;
    saveState();
    render();
    document.querySelector("#rfq").scrollIntoView({ behavior: "smooth", block: "start" });
    showToast(`${packageListings.length} jobsite machines sent to RFQ shortlist.`);
  });

  document.querySelector("#copyHuntButton").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(buildSupplierHuntText());
      showToast("Supplier hunt pitch copied.");
    } catch {
      showToast("Copy is blocked here, but the supplier pitch is visible.");
    }
  });

  document.querySelector("#copyMarketButton").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(buildMarketBriefText());
      showToast("Market launch brief copied.");
    } catch {
      showToast("Copy is blocked here, but the market brief is visible.");
    }
  });

  document.querySelector("#copyMarketMatrixButton").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(buildMarketSignalMatrixText());
      showToast("Market matrix brief copied.");
    } catch {
      showToast("Copy is blocked here, but the matrix brief is visible.");
    }
  });

  document.querySelector("#shortlistToggleButton").addEventListener("click", () => {
    toggleShortlist(getSelectedListing().id);
  });

  document.querySelector("#compareShortlistButton").addEventListener("click", () => {
    state.shortlistCompareOpen = !state.shortlistCompareOpen;
    saveState();
    renderShortlistTray();
    scrollToPageTarget(document.querySelector("#shortlistTray"), 120);
    showToast(state.shortlistCompareOpen ? "Shortlist compare opened." : "Shortlist compare hidden.");
  });

  document.querySelector("#quickSearchButton").addEventListener("click", () => openCommandPalette());
  document.querySelector("#workflowDockSearchButton").addEventListener("click", () => openCommandPalette());
  document.querySelector("#workflowDockPrevButton").addEventListener("click", () => openWorkflowGuideTarget("previous"));
  document.querySelector("#workflowDockNextButton").addEventListener("click", () => openWorkflowGuideTarget("next"));
  document.querySelector("#commandPaletteCloseButton").addEventListener("click", () => closeCommandPalette());
  document.querySelector("#commandPaletteBackdrop").addEventListener("click", () => closeCommandPalette());
  const workflowMenu = document.querySelector("#workflowMenu");
  if (workflowMenu) {
    workflowMenu.addEventListener("toggle", () => {
      if (!workflowMenu.open) {
        resetWorkflowMenu();
        return;
      }
      renderWorkflowMenu();
      window.setTimeout(() => workflowMenuSearch?.focus(), 20);
    });
    workflowMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => closeWorkflowMenu());
    });
    document.addEventListener("click", (event) => {
      if (workflowMenu.open && !workflowMenu.contains(event.target)) closeWorkflowMenu();
    });
  }
  if (workflowMenuSearch) {
    workflowMenuSearch.addEventListener("input", (event) => {
      workflowMenuQuery = event.target.value;
      renderWorkflowMenu();
    });
  }
  if (workflowMenuFilters) {
    workflowMenuFilters.querySelectorAll("[data-workflow-filter]").forEach((button) => {
      button.addEventListener("click", () => {
        workflowMenuRole = button.dataset.workflowFilter || "all";
        renderWorkflowMenu();
      });
    });
  }
  commandPaletteInput.addEventListener("input", (event) => renderCommandPalette(event.target.value));
  commandPaletteInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      const first = document.querySelector("[data-command-index]");
      if (first) activateCommandPaletteItem(first.dataset.commandIndex);
    }
    if (event.key === "Escape") closeCommandPalette();
  });
  document.addEventListener("keydown", (event) => {
    const target = event.target;
    const isTyping = target && ["INPUT", "SELECT", "TEXTAREA"].includes(target.tagName);
    if (event.key === "Escape") {
      closeCommandPalette();
      closeWorkflowMenu();
      return;
    }
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      openCommandPalette();
      return;
    }
    if (event.key === "/" && !isTyping) {
      event.preventDefault();
      openCommandPalette();
    }
  });

  document.querySelector("#scrollTopButton").addEventListener("click", () => {
    const root = document.documentElement;
    const previousBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    window.setTimeout(() => {
      root.style.scrollBehavior = previousBehavior;
    }, 0);
  });

  document.querySelector("#supplierModeButton").addEventListener("click", () => {
    state.supplierView = !state.supplierView;
    saveState();
    document.body.classList.toggle("supplier-view", state.supplierView);
    showToast(state.supplierView ? "Supplier view active." : "Marketplace view active.");
  });

  document.querySelector("#addListingButton").addEventListener("click", () => {
    state.listingCount = Math.min(80, state.listingCount + 1);
    saveState();
    renderPricingCalculator();
    showToast("Draft listing added to the supplier calculator.");
  });
}

function updateBuilderState() {
  state.builderCategory = document.querySelector("#builderCategory").value;
  state.builderModel = document.querySelector("#builderModel").value.trim();
  state.builderRegion = document.querySelector("#builderRegion").value;
  state.builderAvailability = document.querySelector("#builderAvailability").value;
  saveState();
  renderBuilderSummary();
}

function updateJobsiteState() {
  state.jobsiteType = document.querySelector("#jobsiteType").value;
  state.jobsiteRegion = document.querySelector("#jobsiteRegion").value;
  state.jobsiteUrgency = document.querySelector("#jobsiteUrgency").value;
  saveState();
  renderJobsitePlanner();
  renderQuoteGuard();
  renderMobilizationTower();
  renderDealTrail();
  renderDecisionReceipt();
  renderDecisionRouter();
  renderListingRoiProof();
  renderSupplierRenewalClosePack();
  renderBuyerWorkbench();
}

function updateQuoteGuardState() {
  state.quoteAmount = Number(document.querySelector("#quoteAmount").value);
  state.quoteDays = Number(document.querySelector("#quoteDays").value);
  document.querySelectorAll("[data-quote-include]").forEach((input) => {
    state.quoteIncludes[input.dataset.quoteInclude] = input.checked;
  });
  saveState();
  renderQuoteGuard();
  renderMobilizationTower();
  renderDealTrail();
  renderDecisionReceipt();
  renderDecisionRouter();
  renderListingRoiProof();
  renderSupplierRenewalClosePack();
  renderBuyerWorkbench();
}

function updateDemandState() {
  state.demandEquipment = document.querySelector("#demandEquipment").value.trim();
  state.demandRegion = document.querySelector("#demandRegion").value;
  state.demandUrgency = document.querySelector("#demandUrgency").value;
  state.demandDuration = document.querySelector("#demandDuration").value.trim();
  saveState();
}

function render() {
  reconcileSelectedListing();
  reconcileShortlist();
  renderCommandCenter();
  renderWorkflowDock();
  renderWorkflowGuide();
  renderDemoFlightDeck();
  renderBoardroomSnapshot();
  renderPilotPack();
  renderFounderWorkbench();
  renderFounderMorningBrief();
  renderFounderDailyMoves();
  renderFounderCallSheet();
  renderCategoryButtons();
  renderMarketplaceSearchAssist();
  renderMarketplaceSmartViews();
  renderMarketplaceFilterTrail();
  renderMarketplaceStats();
  renderMarketplaceSupplyLens();
  renderMarketplaceIntelligence();
  renderCatalog();
  renderLeadPacket();
  renderEquipmentDetail();
  renderSupplierResponseRoute();
  renderResponseTracker();
  renderReplyQualityGate();
  renderReplyClarifier();
  renderDecisionReceipt();
  renderDecisionRouter();
  renderListingRoiProof();
  renderSupplierRenewalClosePack();
  renderDirectEnquiryComposer();
  renderCommandPalette(commandPaletteQuery);
  renderJobsitePlanner();
  renderTrustPassport();
  renderShortlistTray();
  renderRfqRoom();
  renderAwardRoom();
  renderQuoteGuard();
  renderMobilizationTower();
  renderDealTrail();
  renderBuyerWorkbench();
  renderYardAvailability();
  renderSupplierStorefront();
  renderSupplierWorkbench();
  renderFleetImport();
  renderProofVault();
  renderRevenueDesk();
  renderLeadDesk();
  renderAccountHealth();
  renderSupplierSuccessQueue();
  renderPageFactory();
  renderLaunchRoom();
  renderMarketTwin();
  renderLiquidityFlywheel();
  renderFounderAutopilot();
  renderDemandExchange();
  renderProofDemandRoom();
  renderSupplierCommitmentRoom();
  renderListingActivationRoom();
  renderTrustRevenueLedger();
  renderDemandCapture();
  renderSupplierTable();
  renderTrustChecklist();
  renderOnboardingFlow();
  renderBuilderSummary();
  renderCategoryDirectory();
  renderAdminBoard();
  renderSupplierHunt();
  renderMarketSignalMatrix();
  renderMarketMaker();
  renderPricingCalculator();
  renderCommissionCalculator();
  renderWorkflowMenu();
  document.body.classList.toggle("supplier-view", state.supplierView);
  syncNavigationState();
}

function stabilizeHashScroll() {
  const id = decodeURIComponent((window.location.hash || "").slice(1));
  if (!id) return;
  const target = document.getElementById(id);
  if (!target) return;

  window.requestAnimationFrame(() => {
    target.scrollIntoView({ behavior: "auto", block: "start" });
    window.setTimeout(() => {
      target.scrollIntoView({ behavior: "auto", block: "start" });
    }, 80);
  });
}

function scrollToPageTarget(target, offset = 86) {
  if (!target) return;
  const top = target.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
}

function closeWorkflowMenu() {
  const menu = document.querySelector("#workflowMenu");
  if (menu) menu.open = false;
  resetWorkflowMenu();
}

function resetWorkflowMenu() {
  workflowMenuQuery = "";
  workflowMenuRole = "all";
  const search = document.querySelector("#workflowMenuSearch");
  if (search) search.value = "";
  renderWorkflowMenu();
}

function renderWorkflowMenu() {
  const menu = document.querySelector("#workflowMenu");
  if (!menu) return;

  const normalizedQuery = workflowMenuQuery.trim().toLowerCase();
  const queryParts = normalizedQuery.split(/\s+/).filter(Boolean);
  let visibleCount = 0;

  menu.querySelectorAll(".workflow-menu-group").forEach((group) => {
    const role = group.dataset.workflowRole || "";
    let groupVisible = false;

    group.querySelectorAll("a[data-nav-target]").forEach((link) => {
      const searchableText = [
        link.textContent || "",
        role,
        link.dataset.navTarget || "",
        link.getAttribute("href") || ""
      ].join(" ").toLowerCase();
      const matchesRole = workflowMenuRole === "all" || workflowMenuRole === role;
      const matchesQuery = !queryParts.length || queryParts.every((part) => searchableText.includes(part));
      const isVisible = matchesRole && matchesQuery;
      link.hidden = !isVisible;
      link.classList.toggle("is-filtered", isVisible && queryParts.length > 0);
      if (isVisible) {
        visibleCount += 1;
        groupVisible = true;
      }
    });

    group.hidden = !groupVisible;
    const count = group.querySelector("[data-workflow-count]");
    if (count) count.textContent = String(group.querySelectorAll("a[data-nav-target]:not([hidden])").length);
  });

  menu.querySelectorAll("[data-workflow-filter]").forEach((button) => {
    button.classList.toggle("is-active", (button.dataset.workflowFilter || "all") === workflowMenuRole);
  });

  const empty = document.querySelector("#workflowMenuEmpty");
  if (empty) empty.hidden = visibleCount > 0;
}

function syncNavigationState() {
  const activeAnchor = window.location.hash || "#marketplace";
  const links = [...document.querySelectorAll("[data-nav-target]")];
  links.forEach((link) => {
    const target = link.dataset.navTarget || link.getAttribute("href");
    link.classList.toggle("is-active", target === activeAnchor);
  });

  const workflowMenu = document.querySelector("#workflowMenu");
  if (workflowMenu) {
    const hasActive = [...workflowMenu.querySelectorAll("[data-nav-target]")]
      .some((link) => link.classList.contains("is-active"));
    workflowMenu.classList.toggle("has-active", hasActive);
  }
}

function renderWorkflowDock() {
  const root = document.querySelector("#workflowDock");
  const tabsRoot = document.querySelector("#workflowDockTabs");
  const pathRoot = document.querySelector("#workflowDockPath");
  if (!root || !tabsRoot || !pathRoot) return;

  const model = getWorkflowDockModel();
  root.dataset.activeRole = model.activeRole.toLowerCase();
  setText("#workflowDockSignal", model.signal);

  tabsRoot.innerHTML = model.roles.map((role) => `
    <button type="button" class="${role.isActive ? "is-active" : ""}" data-workflow-role="${escapeHtml(role.role)}" aria-pressed="${role.isActive ? "true" : "false"}">
      <span>${escapeHtml(role.role)}</span>
      <b>${escapeHtml(role.score)}</b>
    </button>
  `).join("");

  pathRoot.innerHTML = model.steps.map((step) => `
    <button type="button" class="workflow-dock-step ${step.isActive ? "is-active" : ""}" data-workflow-anchor="${escapeHtml(step.anchor)}" data-workflow-label="${escapeHtml(step.label)}">
      <em>${String(step.index + 1).padStart(2, "0")}</em>
      <strong>${escapeHtml(step.label)}</strong>
    </button>
  `).join("");

  tabsRoot.querySelectorAll("[data-workflow-role]").forEach((button) => {
    button.addEventListener("click", () => {
      state.commandRole = button.dataset.workflowRole;
      saveState();
      renderCommandCenter();
      renderWorkflowDock();
      showToast(`${state.commandRole} workflow dock active.`);
    });
  });

  pathRoot.querySelectorAll("[data-workflow-anchor]").forEach((button) => {
    button.addEventListener("click", () => {
      openWorkflowStep(button.dataset.workflowAnchor, button.dataset.workflowLabel, model.activeRole);
    });
  });
}

function renderWorkflowGuide() {
  const guide = document.querySelector("#workflowDockGuide");
  if (!guide) return;

  const model = getWorkflowGuideModel();
  const previousButton = document.querySelector("#workflowDockPrevButton");
  const nextButton = document.querySelector("#workflowDockNextButton");
  setText("#workflowDockCurrentRoom", `${model.role} path`);
  setText("#workflowDockNextMove", model.moveText);
  setText("#workflowDockProgress", model.progressText);

  if (previousButton) {
    previousButton.disabled = !model.previous;
    previousButton.dataset.workflowGuideAnchor = model.previous?.anchor || "";
    previousButton.dataset.workflowGuideLabel = model.previous?.label || "";
    previousButton.dataset.workflowGuideRole = model.role;
  }
  if (nextButton) {
    nextButton.disabled = !model.next;
    nextButton.dataset.workflowGuideAnchor = model.next?.anchor || "";
    nextButton.dataset.workflowGuideLabel = model.next?.label || "";
    nextButton.dataset.workflowGuideRole = model.role;
  }
}

function openWorkflowGuideTarget(direction) {
  const button = document.querySelector(direction === "previous" ? "#workflowDockPrevButton" : "#workflowDockNextButton");
  if (!button || button.disabled) return;
  openWorkflowStep(button.dataset.workflowGuideAnchor, button.dataset.workflowGuideLabel, button.dataset.workflowGuideRole);
}

function openWorkflowStep(anchor, label, role) {
  if (!anchor) return;
  const target = document.querySelector(anchor);
  if (!target) return;
  if (role && commandRoles.includes(role)) state.commandRole = role;
  saveState();
  renderCommandCenter();
  renderWorkflowDock();
  renderWorkflowGuide();
  closeWorkflowMenu();
  target.scrollIntoView({ behavior: "smooth", block: "start" });
  window.location.hash = anchor;
  showToast(`${label || "Workflow step"} opened.`);
}

function getWorkflowDockModel() {
  const command = getCommandCenterModel();
  const activeRole = command.activeRole;
  const activeHash = window.location.hash || "#marketplace";
  const route = commandRoutes.find((item) => item.role === activeRole) || commandRoutes[0];
  const steps = getWorkflowDockSteps(route, activeHash).map((step, index) => ({
    ...step,
    index,
    isActive: step.anchor === activeHash
  }));
  const activeStep = steps.find((step) => step.isActive);

  return {
    activeRole,
    roles: command.routes.map((routeItem) => ({
      role: routeItem.role,
      score: routeItem.score,
      isActive: routeItem.role === activeRole
    })),
    steps,
    signal: activeStep
      ? `${activeRole} path: ${activeStep.label} is open. ${command.workspace.next}`
      : `${activeRole} path: ${command.workspace.title} - ${command.workspace.score}`
  };
}

function getWorkflowDockSteps(route, activeHash) {
  if (!route) return [];

  const priorityByRole = {
    Buyer: ["Search", "Desk", "Jobsite", "Passport", "RFQ", "Award", "Quote Guard", "Mobilize", "Deal Trail"],
    Supplier: ["Desk", "Storefront", "Import", "Proof", "Revenue", "Health", "Studio", "Lead Desk", "Yard"],
    Founder: ["Desk", "Morning", "Daily", "Call Sheet", "Success", "Launch", "Twin", "Flywheel", "Autopilot", "Exchange", "Proof Room", "Commit", "Activate", "Ledger", "Matrix", "Growth"]
  };
  const priority = priorityByRole[route.role] || route.steps.map((step) => step.label);
  const chosen = route.steps.filter((step) => priority.includes(step.label));
  const active = route.steps.find((step) => step.anchor === activeHash);

  if (active && !chosen.some((step) => step.anchor === active.anchor)) {
    return [...chosen.slice(0, 3), active, ...chosen.slice(3)];
  }

  return chosen;
}

function getWorkflowGuideModel() {
  const activeHash = window.location.hash || "#marketplace";
  const route = getWorkflowRouteForHash(activeHash)
    || commandRoutes.find((item) => item.role === state.commandRole)
    || commandRoutes[0];
  const steps = route.steps;
  const activeIndex = steps.findIndex((step) => step.anchor === activeHash);
  const currentIndex = activeIndex >= 0 ? activeIndex : 0;
  const current = steps[currentIndex] || route.steps[0];
  const previous = currentIndex > 0 ? steps[currentIndex - 1] : null;
  const next = currentIndex < steps.length - 1 ? steps[currentIndex + 1] : null;
  const progressText = `Step ${Math.min(currentIndex + 1, steps.length)} of ${steps.length}`;
  const moveText = next
    ? `${current.label} to ${next.label}`
    : `${current.label} completes this path`;

  return {
    role: route.role,
    current,
    previous,
    next,
    progressText,
    moveText
  };
}

function getWorkflowRouteForHash(activeHash) {
  return commandRoutes.find((route) => route.steps.some((step) => step.anchor === activeHash));
}

function renderDemoFlightDeck() {
  const root = document.querySelector("#demoFlightScenes");
  if (!root) return;

  const model = getDemoFlightDeckModel();
  setText("#demoFlightTitle", model.title);
  setText("#demoFlightBadge", model.badge);

  document.querySelector("#demoFlightScore").innerHTML = `
    <strong>${model.score}/100</strong>
    <span>${escapeHtml(model.summary)}</span>
  `;

  document.querySelector("#demoFlightMetrics").innerHTML = model.metrics.map((metric) => `
    <span>
      <strong>${escapeHtml(metric.value)}</strong>
      ${escapeHtml(metric.label)}
    </span>
  `).join("");

  root.innerHTML = model.scenes.map((scene, index) => `
    <button type="button" class="demo-flight-scene ${scene.isActive ? "is-active" : ""}" data-demo-scene="${index}">
      <em>${String(index + 1).padStart(2, "0")}</em>
      <span>
        <strong>${escapeHtml(scene.label)}</strong>
        ${escapeHtml(scene.signal)}
        <small>${escapeHtml(scene.outcome)}</small>
      </span>
      <b>${escapeHtml(scene.role)}</b>
    </button>
  `).join("");

  document.querySelector("#demoFlightScript").innerHTML = model.script.map((line, index) => `
    <div class="demo-flight-script-line">
      <strong>${index + 1}</strong>
      <span>${escapeHtml(line)}</span>
    </div>
  `).join("");

  root.querySelectorAll("[data-demo-scene]").forEach((button) => {
    button.addEventListener("click", () => {
      const scene = model.scenes[Number(button.dataset.demoScene)];
      if (!scene) return;
      applyDemoFlightScene(scene);
    });
  });
}

function getDemoFlightDeckModel() {
  const selected = getSelectedListing();
  const filtered = getFilteredListings();
  const rfq = getRfqModel();
  const leadDesk = getLeadDeskModel();
  const callSheet = getFounderCallSheetModel();
  const ledger = getTrustRevenueLedgerModel();
  const demandCount = getDemandSignals().reduce((total, signal) => total + Number(signal.count || 1), 0);
  const activeHash = window.location.hash || "#marketplace";
  const directPipeline = ledger.directPipeline || leadDesk.totalBudget || 0;
  const score = Math.max(0, Math.min(100, Math.round(
    72
    + Math.min(10, demandCount)
    + Math.min(8, rfq.listings.length * 2)
    + Math.min(6, callSheet.cards.length)
  )));
  const scenes = getDemoFlightScenes({ selected, filtered, rfq, leadDesk, callSheet, ledger, activeHash });
  const activeScene = scenes.find((scene) => scene.isActive) || scenes[0];
  const badge = score >= 88 ? "Boardroom ready" : score >= 78 ? "Demo ready" : "Tighten story";

  return {
    title: "Five-move Heavyster demo",
    badge,
    score,
    summary: `${activeScene.label} is the current proof point. The story stays simple: search demand, verified supply, direct enquiry, paid listing ARR, then disciplined scale.`,
    metrics: [
      { label: "guided scenes", value: String(scenes.length) },
      { label: "roles covered", value: "3" },
      { label: "direct pipeline", value: `USD ${directPipeline.toLocaleString()}` },
      { label: "rental take", value: "0%" }
    ],
    scenes,
    script: [
      "Start with the marketplace: a buyer searches by machine, region, and availability.",
      "When exact supply is missing, Heavyster captures demand instead of losing the buyer.",
      "The buyer path turns the search into RFQ, proof, award, quote clarity, and mobilization.",
      "The supplier path turns rental yards into verified storefronts and paid listings.",
      "The founder path uses demand proof, call scripts, trust gates, and listing ARR to scale one market at a time."
    ]
  };
}

function getDemoFlightScenes(context) {
  const callSupplier = context.callSheet.cards[0]?.supplier || "the first qualified supplier";
  const marketLabel = context.ledger.marketLabel || "UAE Lifting";

  return [
    {
      role: "Buyer",
      label: "Marketplace rescue",
      anchor: "#marketplace",
      listingId: "HY-CR-014",
      state: { search: "crane", region: "UAE", availability: "available", category: "all" },
      signal: "Show a real buyer search and convert the zero-result moment into recoverable demand.",
      outcome: "Buyer stays inside Heavyster instead of disappearing.",
      isActive: context.activeHash === "#marketplace"
    },
    {
      role: "Buyer",
      label: "Buyer decision desk",
      anchor: "#buyer-workbench",
      listingId: context.rfq.listings[0]?.id || context.selected.id,
      state: { search: "", region: "all", availability: "all", category: "all" },
      signal: `${context.rfq.listings.length} machine${context.rfq.listings.length === 1 ? "" : "s"} can move through RFQ, award, quote, and mobilization.`,
      outcome: "Rental payment remains direct while workflow proof is captured.",
      isActive: context.activeHash === "#buyer-workbench"
    },
    {
      role: "Supplier",
      label: "Supplier revenue path",
      anchor: "#supplier-workbench",
      listingId: "HY-EX-001",
      state: { search: "", region: "all", availability: "all", category: "all" },
      signal: `${context.leadDesk.profile.supplier} sees leads, proof gaps, revenue, and freshness in one workspace.`,
      outcome: "The supplier understands why a USD 99 annual listing is worth it.",
      isActive: context.activeHash === "#supplier-workbench"
    },
    {
      role: "Founder",
      label: "Supplier close script",
      anchor: "#founder-call-sheet",
      listingId: context.callSheet.cards[0]?.listingId || "HY-CR-014",
      state: { search: "", region: "all", availability: "all", category: "all" },
      signal: `${callSupplier} is converted into a call-ready listing conversation.`,
      outcome: "Demand proof becomes paid listing outreach without touching rental money.",
      isActive: context.activeHash === "#founder-call-sheet"
    },
    {
      role: "Founder",
      label: "Scale gate",
      anchor: "#trust-revenue-ledger",
      listingId: "HY-CR-014",
      state: { search: "", region: "all", availability: "all", category: "all" },
      signal: `${marketLabel} is checked for ARR, trust debt, renewal exposure, and direct pipeline before scaling.`,
      outcome: "The founder grows only where trust and listing revenue can support it.",
      isActive: context.activeHash === "#trust-revenue-ledger"
    }
  ];
}

function applyDemoFlightScene(scene) {
  state.commandRole = scene.role;
  if (scene.listingId) state.selectedListingId = scene.listingId;
  if (scene.state) Object.assign(state, scene.state);
  if (scene.anchor === "#trust-revenue-ledger") {
    state.activeMarketKey = state.activeMarketKey || getMarketKeyFromSignal(getDemandSignals()[0]);
    state.activeMatrixKey = state.activeMarketKey;
  }
  window.location.hash = scene.anchor;
  saveState();
  render();
  const target = document.querySelector(scene.anchor);
  if (!target) return;
  target.scrollIntoView({ behavior: "smooth", block: "start" });
  showToast(`${scene.label} opened.`);
}

function renderBoardroomSnapshot() {
  const root = document.querySelector("#boardroomThesis");
  if (!root) return;

  const model = getBoardroomSnapshotModel();
  setText("#boardroomTitle", model.title);
  setText("#boardroomBadge", model.badge);

  document.querySelector("#boardroomScore").innerHTML = `
    <strong>${model.score}/100</strong>
    <span>${escapeHtml(model.summary)}</span>
  `;

  document.querySelector("#boardroomMetrics").innerHTML = model.metrics.map((metric) => `
    <span>
      <strong>${escapeHtml(metric.value)}</strong>
      ${escapeHtml(metric.label)}
    </span>
  `).join("");

  root.innerHTML = model.thesis.map((item, index) => `
    <div class="boardroom-thesis-row">
      <strong>${index + 1}</strong>
      <span>
        ${escapeHtml(item.label)}
        <small>${escapeHtml(item.detail)}</small>
      </span>
      <b>${escapeHtml(item.status)}</b>
    </div>
  `).join("");

  document.querySelector("#boardroomGates").innerHTML = model.gates.map((gate, index) => `
    <div class="boardroom-gate ${escapeHtml(gate.statusClass)}">
      <strong>${index + 1}</strong>
      <span>
        ${escapeHtml(gate.label)}
        <small>${escapeHtml(gate.detail)}</small>
      </span>
      <b>${escapeHtml(gate.status)}</b>
    </div>
  `).join("");

  document.querySelector("#boardroomMemo").innerHTML = buildBoardroomSnapshotText(model)
    .split("\n")
    .filter(Boolean)
    .map((line) => `<p>${escapeHtml(line)}</p>`)
    .join("");
}

function getBoardroomSnapshotModel() {
  const demo = getDemoFlightDeckModel();
  const market = getActiveMarketOpportunity();
  const founder = getFounderWorkbenchModel();
  const ledger = getTrustRevenueLedgerModel();
  const callSheet = getFounderCallSheetModel();
  const revenue = getRevenueDeskModel();
  const success = getSupplierSuccessModel();
  const demandCount = getDemandSignals().reduce((total, signal) => total + Number(signal.count || 1), 0);
  const activeArr = ledger.activeListingArr || revenue.annualRevenue || 0;
  const directPipeline = ledger.directPipeline || 0;
  const nextPackageArr = ledger.nextPackageArr || callSheet.recommendedPackage.annualRevenue || 0;
  const trustDebt = Number(ledger.trustDebt || 0);
  const score = Math.max(0, Math.min(100, Math.round(
    demo.score * 0.28
    + founder.score * 0.28
    + ledger.score * 0.24
    + Math.min(12, demandCount)
    + Math.min(8, callSheet.cards.length * 2)
    - Math.min(10, trustDebt)
  )));
  const badge = score >= 84 ? "Investor ready" : score >= 68 ? "Proof story" : "Tighten proof";
  const marketLabel = ledger.marketLabel || market.title || `${market.region} ${market.category}`;
  const firstSupplier = callSheet.cards[0]?.supplier || success.callFirst?.profile?.supplier || "first anchor supplier";
  const firstAsk = callSheet.cards[0]?.ask || "close the first paid listing package";
  const summary = `${marketLabel} has USD ${activeArr.toLocaleString()} active listing ARR, USD ${directPipeline.toLocaleString()} direct enquiry pipeline, ${demandCount} demand signal${demandCount === 1 ? "" : "s"}, and ${trustDebt} trust gap${trustDebt === 1 ? "" : "s"} before scale.`;

  return {
    title: `${marketLabel} boardroom snapshot`,
    badge,
    score,
    summary,
    marketLabel,
    firstSupplier,
    firstAsk,
    activeArr,
    directPipeline,
    nextPackageArr,
    demandCount,
    trustDebt,
    metrics: [
      { label: "active listing ARR", value: `USD ${activeArr.toLocaleString()}` },
      { label: "direct pipeline", value: `USD ${directPipeline.toLocaleString()}` },
      { label: "next package ARR", value: `USD ${nextPackageArr.toLocaleString()}` },
      { label: "rental take", value: "0%" }
    ],
    thesis: [
      {
        label: "Wedge",
        detail: `Start with ${marketLabel}, one narrow category page, and supplier listings that buyers can trust.`,
        status: "Focused"
      },
      {
        label: "Monetization",
        detail: "Phase one charges USD 9 monthly or USD 99 yearly per active equipment listing, with rental payment kept direct.",
        status: "Clean"
      },
      {
        label: "Moat",
        detail: "Verified inventory, documents, availability, response history, demand gaps, and supplier trust proof compound into a category ledger.",
        status: "Data"
      },
      {
        label: "Scale rule",
        detail: "Open more supply only when trust, response, renewal protection, and paid listing activation can support the buyer demand.",
        status: "Disciplined"
      }
    ],
    gates: getBoardroomGates({ demo, founder, ledger, callSheet, success, demandCount, activeArr, directPipeline, nextPackageArr, trustDebt }),
    nextMove: `Call ${firstSupplier}: ${firstAsk}`
  };
}

function getBoardroomGates(context) {
  return [
    {
      label: "Demo clarity",
      detail: `${context.demo.scenes.length} guided scenes cover buyer, supplier, and founder workflows with a copy-ready story.`,
      status: context.demo.score >= 84 ? "Ready" : "Tighten",
      statusClass: context.demo.score >= 84 ? "ready" : "watch"
    },
    {
      label: "Demand proof",
      detail: `${context.demandCount} demand signal${context.demandCount === 1 ? "" : "s"} support the selected category wedge.`,
      status: context.demandCount >= 6 ? "Strong" : "Build",
      statusClass: context.demandCount >= 6 ? "ready" : "watch"
    },
    {
      label: "Revenue proof",
      detail: `USD ${context.activeArr.toLocaleString()} active listing ARR and USD ${context.nextPackageArr.toLocaleString()} next package ARR are modeled before any rental commission.`,
      status: context.activeArr ? "Live" : "Model",
      statusClass: context.activeArr ? "ready" : "watch"
    },
    {
      label: "Trust debt",
      detail: `${context.trustDebt} proof gap${context.trustDebt === 1 ? "" : "s"} should be reduced before pushing more buyer traffic.`,
      status: context.trustDebt <= 4 ? "Manage" : "Fix",
      statusClass: context.trustDebt <= 4 ? "ready" : "risk"
    },
    {
      label: "Supplier close",
      detail: `${context.callSheet.cards.length} supplier call card${context.callSheet.cards.length === 1 ? "" : "s"} are ready for demand-backed listing outreach.`,
      status: context.callSheet.score >= 80 ? "Call" : "Prepare",
      statusClass: context.callSheet.score >= 80 ? "ready" : "watch"
    },
    {
      label: "Founder control",
      detail: `Founder workbench score is ${context.founder.score}/100, keeping demand, trust, activation, and listing ARR in one operating loop.`,
      status: context.founder.score >= 80 ? "Controlled" : "Watch",
      statusClass: context.founder.score >= 80 ? "ready" : "watch"
    }
  ];
}

function renderPilotPack() {
  const root = document.querySelector("#pilotPackWeeks");
  if (!root) return;

  const model = getPilotPackModel();
  setText("#pilotPackTitle", model.title);
  setText("#pilotPackBadge", model.badge);

  document.querySelector("#pilotPackScore").innerHTML = `
    <strong>${model.score}/100</strong>
    <span>${escapeHtml(model.summary)}</span>
  `;

  document.querySelector("#pilotPackMetrics").innerHTML = model.metrics.map((metric) => `
    <span>
      <strong>${escapeHtml(metric.value)}</strong>
      ${escapeHtml(metric.label)}
    </span>
  `).join("");

  root.innerHTML = model.weeks.map((week) => `
    <div class="pilot-pack-week ${escapeHtml(week.statusClass)}">
      <strong>${escapeHtml(week.window)}</strong>
      <span>
        ${escapeHtml(week.label)}
        <small>${escapeHtml(week.detail)}</small>
      </span>
      <em>${escapeHtml(week.owner)}</em>
      <b>${escapeHtml(week.status)}</b>
    </div>
  `).join("");

  document.querySelector("#pilotPackGates").innerHTML = model.gates.map((gate, index) => `
    <div class="pilot-pack-gate ${escapeHtml(gate.statusClass)}">
      <strong>${index + 1}</strong>
      <span>
        ${escapeHtml(gate.label)}
        <small>${escapeHtml(gate.detail)}</small>
      </span>
      <b>${escapeHtml(gate.status)}</b>
    </div>
  `).join("");

  document.querySelector("#pilotPackMemo").innerHTML = buildPilotPackText(model)
    .split("\n")
    .filter(Boolean)
    .map((line) => `<p>${escapeHtml(line)}</p>`)
    .join("");
}

function getPilotPackModel() {
  const boardroom = getBoardroomSnapshotModel();
  const launch = getLaunchRoomModel();
  const twin = getMarketTwinModel();
  const activation = getListingActivationModel();
  const callSheet = getFounderCallSheetModel();
  const success = getSupplierSuccessModel();
  const market = getActiveMarketOpportunity();
  const active = activation.active || launch.active || twin.active || market;
  const marketLabel = boardroom.marketLabel || active.title || `${active.region} ${active.category}`;
  const firstSupplier = boardroom.firstSupplier || callSheet.cards[0]?.supplier || success.callFirst?.profile?.supplier || "first anchor supplier";
  const recommendedPackage = activation.recommendedPackage || callSheet.recommendedPackage || { label: "Starter proof package", listings: 3, monthlyRevenue: 27, annualRevenue: 297 };
  const pilotArr = Math.max(boardroom.nextPackageArr, recommendedPackage.annualRevenue || 0, launch.firstWeekArr || 0);
  const pilotListings = Math.max(recommendedPackage.listings || 0, twin.totalListings || 0, active.launchListings || 0);
  const trustDebt = boardroom.trustDebt;
  const readyGateCount = activation.readyGateCount || 0;
  const launchScore = launch.score || 0;
  const twinScore = twin.score || 0;
  const activationScore = activation.activationScore || 0;
  const score = Math.max(0, Math.min(100, Math.round(
    boardroom.score * 0.3
    + launchScore * 0.22
    + twinScore * 0.2
    + activationScore * 0.18
    + Math.min(10, callSheet.cards.length * 2)
  )));
  const badge = score >= 84 ? "Pilot ready" : score >= 68 ? "30-day sprint" : "Prepare pilot";
  const weeks = getPilotPackWeeks({
    marketLabel,
    firstSupplier,
    recommendedPackage,
    boardroom,
    launch,
    twin,
    activation,
    callSheet,
    pilotArr,
    pilotListings,
    readyGateCount,
    trustDebt
  });
  const gates = getPilotPackGates({
    boardroom,
    launch,
    twin,
    activation,
    callSheet,
    recommendedPackage,
    trustDebt,
    pilotArr,
    pilotListings
  });
  const summary = `${marketLabel} pilot focuses on ${firstSupplier}, ${recommendedPackage.listings} paid listing${recommendedPackage.listings === 1 ? "" : "s"}, USD ${pilotArr.toLocaleString()} modeled listing ARR, and ${trustDebt} trust gap${trustDebt === 1 ? "" : "s"} to fix before heavier traffic.`;

  return {
    title: `${marketLabel} 30-day pilot`,
    badge,
    score,
    summary,
    marketLabel,
    firstSupplier,
    recommendedPackage,
    pilotArr,
    pilotListings,
    trustDebt,
    readyGateCount,
    metrics: [
      { label: "pilot listing ARR", value: `USD ${pilotArr.toLocaleString()}` },
      { label: "target listings", value: String(pilotListings || recommendedPackage.listings) },
      { label: "first supplier", value: firstSupplier },
      { label: "rental take", value: "0%" }
    ],
    weeks,
    gates,
    nextMove: weeks.find((week) => week.statusClass !== "ready")?.label || weeks[0]?.label || "Start pilot"
  };
}

function getPilotPackWeeks(context) {
  const launchReady = context.launch.score >= 68;
  const activationReady = context.activation.activationScore >= 68;
  const twinVerdict = context.twin.verdict?.label || "Build proof first";
  const callCount = context.callSheet.cards.length;

  return [
    {
      window: "Days 1-7",
      label: "Close the anchor supplier",
      detail: `Call ${context.firstSupplier}, show demand proof, and offer ${context.recommendedPackage.label} for ${context.recommendedPackage.listings} listing${context.recommendedPackage.listings === 1 ? "" : "s"}.`,
      owner: "Founder",
      status: callCount ? "Call" : "Prep",
      statusClass: callCount ? "ready" : "watch"
    },
    {
      window: "Days 8-14",
      label: "Publish verified listing shells",
      detail: `${context.marketLabel} needs photos, specs, availability, and direct lead routes before buyer traffic is trusted.`,
      owner: "Supplier",
      status: activationReady ? "Publish" : "Sprint",
      statusClass: activationReady ? "ready" : "watch"
    },
    {
      window: "Days 15-21",
      label: "Open controlled direct enquiries",
      detail: `${twinVerdict}. Route only proof-backed enquiries while measuring supplier response and buyer clarity.`,
      owner: "Success",
      status: launchReady ? "Route" : "Control",
      statusClass: launchReady ? "ready" : "watch"
    },
    {
      window: "Days 22-30",
      label: "Review ARR, proof, and renewal story",
      detail: `Compare USD ${context.pilotArr.toLocaleString()} modeled ARR against trust debt, supplier response, proof completion, and direct-payment discipline.`,
      owner: "Founder",
      status: context.trustDebt <= 4 ? "Review" : "Fix",
      statusClass: context.trustDebt <= 4 ? "ready" : "risk"
    }
  ];
}

function getPilotPackGates(context) {
  const readyActivation = context.activation.readyGateCount || 0;
  const readyCallCards = context.callSheet.cards.length;
  const proofGap = context.trustDebt;
  const twinRiskGaps = context.twin.verdict?.riskGaps || 0;

  return [
    {
      label: "Supplier call gate",
      detail: `${readyCallCards} supplier call card${readyCallCards === 1 ? "" : "s"} are available for demand-backed outreach.`,
      status: readyCallCards ? "Ready" : "Build",
      statusClass: readyCallCards ? "ready" : "watch"
    },
    {
      label: "Activation gate",
      detail: `${readyActivation}/${context.activation.gates?.length || 0} activation gate${(context.activation.gates?.length || 0) === 1 ? "" : "s"} are ready for paid listing go-live.`,
      status: readyActivation >= 3 ? "Sprint" : "Prepare",
      statusClass: readyActivation >= 3 ? "ready" : "watch"
    },
    {
      label: "Trust gate",
      detail: `${proofGap} trust gap${proofGap === 1 ? "" : "s"} must be visible in the pilot review before traffic scales.`,
      status: proofGap <= 4 ? "Manage" : "Fix",
      statusClass: proofGap <= 4 ? "ready" : "risk"
    },
    {
      label: "Twin gate",
      detail: `${twinRiskGaps} market twin risk gap${twinRiskGaps === 1 ? "" : "s"} remain before aggressive page growth.`,
      status: twinRiskGaps <= 1 ? "Controlled" : "Hold",
      statusClass: twinRiskGaps <= 1 ? "ready" : "watch"
    },
    {
      label: "Revenue gate",
      detail: `Pilot target is USD ${context.pilotArr.toLocaleString()} listing ARR without touching rental payments.`,
      status: context.pilotArr >= 500 ? "Visible" : "Model",
      statusClass: context.pilotArr >= 500 ? "ready" : "watch"
    },
    {
      label: "Payment gate",
      detail: "Buyer pays the rental company directly. Heavyster proves workflow value before any future booking fee.",
      status: "Locked",
      statusClass: "ready"
    }
  ];
}

function renderCommandCenter() {
  const model = getCommandCenterModel();
  setText("#commandBadge", model.badge);

  document.querySelector("#commandPulse").innerHTML = model.pulse.map((item) => `
    <span>
      <strong>${escapeHtml(item.value)}</strong>
      <em>${escapeHtml(item.label)}</em>
      <small>${escapeHtml(item.detail)}</small>
    </span>
  `).join("");

  document.querySelector("#commandRoutes").innerHTML = model.routes.map((route) => `
    <button type="button" class="command-route ${route.isActive ? "is-active" : ""}" data-command-anchor="${escapeHtml(route.anchor)}" data-command-label="${escapeHtml(route.label)}" data-command-role="${escapeHtml(route.role)}">
      <span>
        <em>${escapeHtml(route.role)}</em>
        <strong>${escapeHtml(route.label)}</strong>
        <small>${escapeHtml(route.detail)}</small>
      </span>
      <b>${escapeHtml(route.score)}</b>
      <i>${route.steps.map((step) => escapeHtml(step.label)).join(" / ")}</i>
    </button>
  `).join("");

  document.querySelector("#commandRoleTabs").innerHTML = model.roles.map((role) => `
    <button type="button" class="${role === model.activeRole ? "is-active" : ""}" data-command-role-filter="${escapeHtml(role)}">
      ${escapeHtml(role)}
    </button>
  `).join("");

  document.querySelector("#commandWorkspace").innerHTML = `
    <strong>${escapeHtml(model.workspace.title)}</strong>
    <span>${escapeHtml(model.workspace.score)}</span>
    <p>${escapeHtml(model.workspace.detail)}</p>
    <small>${escapeHtml(model.workspace.next)}</small>
  `;

  document.querySelector("#commandModuleRail").innerHTML = model.modules.map((module) => `
    <button type="button" class="command-module ${module.isActive ? "is-active" : ""}" data-command-anchor="${escapeHtml(module.anchor)}" data-command-label="${escapeHtml(module.label)}">
      <span>${escapeHtml(module.role)}</span>
      <strong>${escapeHtml(module.label)}</strong>
      <small>${escapeHtml(module.signal)}</small>
    </button>
  `).join("");

  document.querySelectorAll("[data-command-anchor]").forEach((button) => {
    button.addEventListener("click", () => {
      const target = document.querySelector(button.dataset.commandAnchor);
      if (!target) return;
      if (button.dataset.commandRole) {
        state.commandRole = button.dataset.commandRole;
        saveState();
        renderCommandCenter();
        renderWorkflowDock();
      }
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      showToast(`${button.dataset.commandLabel || "Module"} opened.`);
    });
  });

  document.querySelectorAll("[data-command-role-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      state.commandRole = button.dataset.commandRoleFilter;
      saveState();
      renderCommandCenter();
      renderWorkflowDock();
      showToast(`${state.commandRole} workspace active.`);
    });
  });
}

function openCommandPalette(query = "") {
  const palette = document.querySelector("#commandPalette");
  const input = document.querySelector("#commandPaletteInput");
  commandPaletteQuery = query;
  palette.classList.add("is-open");
  palette.setAttribute("aria-hidden", "false");
  document.body.classList.add("command-palette-open");
  input.value = query;
  renderCommandPalette(query);
  window.setTimeout(() => {
    input.focus();
    input.select();
  }, 20);
}

function closeCommandPalette() {
  const palette = document.querySelector("#commandPalette");
  if (!palette) return;
  palette.classList.remove("is-open");
  palette.setAttribute("aria-hidden", "true");
  document.body.classList.remove("command-palette-open");
}

function renderCommandPalette(query = commandPaletteQuery) {
  const root = document.querySelector("#commandPaletteResults");
  if (!root) return;

  commandPaletteQuery = query;
  const results = getCommandPaletteResults(query);
  root.innerHTML = results.length ? results.map((item, index) => `
    <button type="button" class="command-palette-item ${escapeHtml(item.typeClass)}" data-command-index="${index}">
      <em>${escapeHtml(item.kind)}</em>
      <span>
        <strong>${escapeHtml(item.label)}</strong>
        <small>${escapeHtml(item.detail)}</small>
      </span>
      <b>${escapeHtml(item.action)}</b>
    </button>
  `).join("") : `
    <div class="command-palette-empty">
      <strong>No exact command found</strong>
      <span>Use the marketplace search or capture the missing demand signal.</span>
    </div>
  `;

  document.querySelectorAll("[data-command-index]").forEach((button) => {
    button.addEventListener("click", () => activateCommandPaletteItem(button.dataset.commandIndex));
  });
}

function getCommandPaletteResults(query = "") {
  const normalized = query.trim().toLowerCase();
  const items = getCommandPaletteItems();
  if (!normalized) {
    return items
      .filter((item) => item.default)
      .slice(0, 12);
  }

  return items
    .map((item) => ({ ...item, rank: getCommandPaletteRank(item, normalized) }))
    .filter((item) => item.rank > 0)
    .sort((a, b) => b.rank - a.rank || a.label.localeCompare(b.label))
    .slice(0, 12);
}

function getCommandPaletteRank(item, query) {
  const haystack = [item.kind, item.label, item.detail, item.keywords].join(" ").toLowerCase();
  const label = String(item.label || "").toLowerCase();
  if (label === query) return 100;
  if (label.startsWith(query)) return 86;
  if (haystack.includes(query)) return 64;
  return query.split(/\s+/).filter((part) => haystack.includes(part)).length * 18;
}

function getCommandPaletteItems() {
  const supplierMap = new Map();
  listings.forEach((listing) => {
    const existing = supplierMap.get(listing.supplier) || {
      supplier: listing.supplier,
      regions: new Set(),
      categories: new Set(),
      listingIds: []
    };
    existing.regions.add(listing.region);
    existing.categories.add(listing.category);
    existing.listingIds.push(listing.id);
    supplierMap.set(listing.supplier, existing);
  });

  const moduleItems = commandModules.map((module) => ({
    kind: module.role,
    typeClass: module.role.toLowerCase(),
    label: module.label,
    detail: `${module.signal} - ${module.role} workflow`,
    keywords: `${module.role} ${module.signal} ${module.anchor}`,
    anchor: module.anchor,
    role: module.role,
    action: "Open",
    default: ["Marketplace", "Command", "Founder Desk", "Market Matrix", "Supplier Studio", "Revenue Desk", "Proof of Demand", "Supplier Commitment", "Listing Activation", "Trust Ledger", "Pricing"].includes(module.label)
  }));

  const listingItems = listings.map((listing) => ({
    kind: "Equipment",
    typeClass: "equipment",
    label: listing.name,
    detail: `${listing.supplier} - ${listing.city}, ${listing.region} - ${getAvailabilityLabel(listing.availability)}`,
    keywords: `${listing.category} ${listing.specs} ${listing.documents.join(" ")}`,
    anchor: "#marketplace",
    listingId: listing.id,
    action: "View",
    default: listing.id === state.selectedListingId
  }));

  const supplierItems = [...supplierMap.values()].map((supplier) => ({
    kind: "Supplier",
    typeClass: "supplier",
    label: supplier.supplier,
    detail: `${supplier.listingIds.length} listing${supplier.listingIds.length === 1 ? "" : "s"} - ${[...supplier.categories].join(", ")} - ${[...supplier.regions].join(", ")}`,
    keywords: `${[...supplier.categories].join(" ")} ${[...supplier.regions].join(" ")}`,
    anchor: "#storefront",
    supplier: supplier.supplier,
    listingId: supplier.listingIds[0],
    action: "Open",
    default: supplier.listingIds.includes(state.selectedListingId)
  }));

  const marketItems = getMarketOpportunities().slice(0, 8).map((market) => ({
    kind: "Market",
    typeClass: "market",
    label: market.title || `${market.region} ${market.category}`,
    detail: `${market.demandCount} demand signal${market.demandCount === 1 ? "" : "s"} - ${market.visibleSupply} live supply - USD ${market.annualRevenue.toLocaleString()} ARR`,
    keywords: `${market.region} ${market.category} ${market.persona} ${market.proof.join(" ")}`,
    anchor: "#market-maker",
    marketKey: market.key,
    demandKey: market.signalKey,
    action: "Focus",
    default: market.key === state.activeMarketKey
  }));

  const actionItems = [
    {
      kind: "Action",
      typeClass: "action",
      label: "Run the demo flight deck",
      detail: "Open the five-scene guided story for buyer, supplier, and founder workflows.",
      keywords: "demo story investor boardroom walkthrough flight deck workflow",
      anchor: "#demo-flight-deck",
      action: "Open",
      default: true
    },
    {
      kind: "Action",
      typeClass: "action",
      label: "Open the boardroom snapshot",
      detail: "Review wedge, ARR, direct pipeline, trust debt, and next founder move.",
      keywords: "investor boardroom memo fundraising thesis arr pipeline risk",
      anchor: "#boardroom-snapshot",
      action: "Open",
      default: true
    },
    {
      kind: "Action",
      typeClass: "action",
      label: "Open the 30-day pilot pack",
      detail: "Turn the boardroom read into supplier calls, activation gates, controlled enquiries, and pilot ARR review.",
      keywords: "pilot 30 day sprint launch execution supplier calls activation arr",
      anchor: "#pilot-pack",
      action: "Open",
      default: true
    },
    {
      kind: "Action",
      typeClass: "action",
      label: "Create a demand signal",
      detail: "Capture missing equipment demand and turn it into supplier acquisition.",
      keywords: "missing search demand capture supplier hunt",
      anchor: "#admin",
      action: "Capture",
      default: true
    },
    {
      kind: "Action",
      typeClass: "action",
      label: "Review phase-one monetization",
      detail: "Open listing pricing, annual revenue, and future 1% booking fee model.",
      keywords: "pricing monetization billing commission revenue",
      anchor: "#pricing",
      action: "Open",
      default: true
    }
  ];

  return [...actionItems, ...listingItems, ...supplierItems, ...marketItems, ...moduleItems];
}

function activateCommandPaletteItem(index) {
  const item = getCommandPaletteResults(commandPaletteQuery)[Number(index)];
  if (!item) return;

  if (item.listingId) {
    state.selectedListingId = item.listingId;
    state.search = item.supplier || "";
    state.region = "all";
    state.availability = "all";
    state.category = "all";
  }

  if (item.marketKey) {
    state.activeMarketKey = item.marketKey;
    if (item.demandKey) state.activeDemandKey = item.demandKey;
  }

  if (item.role) {
    state.commandRole = item.role;
  }

  saveState();
  closeCommandPalette();
  render();
  const target = document.querySelector(item.anchor);
  if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  showToast(`${item.label} opened.`);
}

function getAvailabilityLabel(value) {
  if (value === "available") return "available now";
  if (value === "soon") return "available soon";
  return "call to confirm";
}

function getCommandCenterModel() {
  const selected = getSelectedListing();
  const passport = getTrustPassport(selected);
  const rfq = getRfqModel();
  const award = getAwardModel();
  const quote = getQuoteGuardModel();
  const mobilize = getMobilizationModel();
  const yard = getYardModel();
  const storefront = getSupplierStorefrontModel(selected);
  const fleetImport = getFleetImportModel(selected);
  const proofVault = getProofVaultModel(selected);
  const revenueDesk = getRevenueDeskModel(selected);
  const leadDesk = getLeadDeskModel();
  const accountHealth = getAccountHealthModel(selected);
  const market = getActiveMarketOpportunity();
  const supplierSuccess = getSupplierSuccessModel();
  const demandCount = getDemandSignals().reduce((total, signal) => total + Number(signal.count || 1), 0);
  const buyerScore = Math.round((passport.score + rfq.averageScore + award.winner.total + quote.score + mobilize.score) / 5);
  const supplierScore = Math.round((storefront.score + yard.score + leadDesk.active.score + proofVault.score + revenueDesk.score + accountHealth.score) / 6);
  const founderScore = getFounderWorkbenchModel().score;
  const badge = buyerScore >= 82 && supplierScore >= 82 ? "Ready to demo" : "Focused build";
  const activeRole = commandRoles.includes(state.commandRole) ? state.commandRole : "Buyer";
  const workspace = getCommandWorkspace(activeRole, {
    selected,
    passport,
    rfq,
    award,
    quote,
    mobilize,
    yard,
    storefront,
    fleetImport,
    proofVault,
    revenueDesk,
    leadDesk,
    accountHealth,
    market,
    supplierSuccess,
    demandCount,
    buyerScore,
    supplierScore,
    founderScore
  });

  return {
    badge,
    activeRole,
    roles: commandRoles,
    workspace,
    pulse: [
      {
        label: "Buyer readiness",
        value: `${buyerScore}/100`,
        detail: `${selected.name} has ${passport.verdict.toLowerCase()} proof and ${quote.badge.toLowerCase()} quote status.`
      },
      {
        label: "Supplier pipeline",
        value: `USD ${leadDesk.totalBudget.toLocaleString()}`,
        detail: `${leadDesk.hotCount} hot lead${leadDesk.hotCount === 1 ? "" : "s"} and ${accountHealth.riskCount} risk signal${accountHealth.riskCount === 1 ? "" : "s"} for ${leadDesk.profile.supplier}.`
      },
      {
        label: "Founder demand",
        value: `${demandCount} signals`,
        detail: `${market.region} ${market.category} is the current expansion page.`
      },
      {
        label: "Phase-one money",
        value: `USD ${revenueDesk.monthlyRevenue.toLocaleString()}/mo`,
        detail: `${revenueDesk.paidListings} paid listing${revenueDesk.paidListings === 1 ? "" : "s"}, ${revenueDesk.renewalRiskCount} at renewal risk, 0% rental take.`
      }
    ],
    routes: commandRoutes.map((route) => ({
      ...route,
      isActive: route.role === activeRole,
      score: route.role === "Buyer"
        ? `${buyerScore}/100`
        : route.role === "Supplier"
          ? `${supplierScore}/100`
          : `${founderScore}/100`
    })),
    modules: commandModules.filter((module) => module.role === activeRole).map((module, index) => ({
      ...module,
      isActive: index === 0
    }))
  };
}

function getCommandWorkspace(role, context) {
  if (role === "Supplier") {
    return {
      title: `${context.leadDesk.profile.supplier} workspace`,
      score: `${context.supplierScore}/100 supplier readiness`,
      detail: `${context.fleetImport.totalRows} import row${context.fleetImport.totalRows === 1 ? "" : "s"}, ${context.accountHealth.riskCount} health risk signal${context.accountHealth.riskCount === 1 ? "" : "s"}, ${context.revenueDesk.paidListings} paid listing${context.revenueDesk.paidListings === 1 ? "" : "s"}, USD ${context.revenueDesk.annualRevenue.toLocaleString()} listing ARR, ${context.yard.reviewCount} listing${context.yard.reviewCount === 1 ? "" : "s"} need freshness review.`,
      next: "Use Account Health to choose the save action, then protect renewals, proof, leads, and yard freshness in that order."
    };
  }

  if (role === "Founder") {
    return {
      title: `${context.market.region} ${context.market.category} growth workspace`,
      score: `${context.founderScore}/100 launch score`,
      detail: `${context.demandCount} demand signals are active. ${context.supplierSuccess.atRiskCount} supplier account${context.supplierSuccess.atRiskCount === 1 ? "" : "s"} need attention today. Current page target is ${context.market.slug}.`,
      next: "Start with Supplier Success Queue, save weak accounts, then use Growth and Market Map to recruit the next demand-led supply."
    };
  }

  return {
    title: `${context.selected.name} buyer workspace`,
    score: `${context.buyerScore}/100 buyer readiness`,
    detail: `${context.rfq.listings.length} machine${context.rfq.listings.length === 1 ? "" : "s"} in RFQ flow, ${context.quote.missingCount} quote term${context.quote.missingCount === 1 ? "" : "s"} unclear, award status ${context.award.badge.toLowerCase()}.`,
    next: "Start with Jobsite, confirm Trust Passport, then move through RFQ, Award, Quote Guard, and Mobilize."
  };
}

function renderFounderWorkbench() {
  const root = document.querySelector("#founderWorkbenchFlow");
  if (!root) return;

  const model = getFounderWorkbenchModel();
  setText("#founderWorkbenchTitle", model.title);
  setText("#founderWorkbenchBadge", model.badge);

  document.querySelector("#founderWorkbenchScore").innerHTML = `
    <strong>${model.score}/100</strong>
    <span>${escapeHtml(model.summary)}</span>
  `;

  document.querySelector("#founderWorkbenchNext").innerHTML = `
    <span>Next best move</span>
    <strong>${escapeHtml(model.nextStage.label)}</strong>
    <p>${escapeHtml(model.nextStage.detail)}</p>
    <button type="button" class="solid-button" data-founder-target="${escapeHtml(model.nextStage.anchor)}" data-founder-label="${escapeHtml(model.nextStage.label)}">${escapeHtml(model.nextStage.action)}</button>
  `;

  root.innerHTML = model.stages.map((stage, index) => `
    <button type="button" class="founder-workbench-step ${escapeHtml(stage.statusClass)}" data-founder-target="${escapeHtml(stage.anchor)}" data-founder-label="${escapeHtml(stage.label)}">
      <em>${index + 1}</em>
      <span>
        <strong>${escapeHtml(stage.label)}</strong>
        ${escapeHtml(stage.detail)}
      </span>
      <b>${stage.score}/100</b>
      <small>${escapeHtml(stage.status)}</small>
    </button>
  `).join("");

  document.querySelector("#founderWorkbenchPacket").innerHTML = model.packet.map((item) => `
    <div>
      <span>${escapeHtml(item.label)}</span>
      <strong>${escapeHtml(item.value)}</strong>
    </div>
  `).join("");

  document.querySelectorAll("[data-founder-target]").forEach((button) => {
    button.addEventListener("click", () => {
      const target = document.querySelector(button.dataset.founderTarget);
      if (!target) return;
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      window.location.hash = button.dataset.founderTarget;
      showToast(`${button.dataset.founderLabel || "Founder step"} opened.`);
    });
  });
}

function getFounderWorkbenchModel() {
  const market = getActiveMarketOpportunity();
  const success = getSupplierSuccessModel();
  const pageFactory = getPageFactoryModel();
  const launch = getLaunchRoomModel();
  const twin = getMarketTwinModel();
  const flywheel = getLiquidityFlywheelModel();
  const autopilot = getFounderAutopilotModel();
  const exchange = getDemandExchangeModel();
  const proof = getProofDemandRoomModel();
  const commitment = getSupplierCommitmentModel();
  const activation = getListingActivationModel();
  const ledger = getTrustRevenueLedgerModel();
  const marketLabel = ledger.marketLabel || market.title || `${market.region} ${market.category}`;
  const demandScore = Math.max(0, Math.min(100, Math.round(
    market.score * 0.45
    + Math.min(30, market.demandCount * 7)
    + Math.min(16, market.urgencyHits * 8)
  )));
  const stages = [
    makeFounderStage({
      label: "Demand proof",
      anchor: "#admin",
      score: demandScore,
      detail: `${market.demandCount} buyer signal${market.demandCount === 1 ? "" : "s"} and ${market.urgencyHits} urgent signal${market.urgencyHits === 1 ? "" : "s"} support ${market.region} ${market.category}.`,
      action: demandScore >= 84 ? "Use demand" : "Capture demand"
    }),
    makeFounderStage({
      label: "Supplier success",
      anchor: "#supplier-success",
      score: success.averageHealth,
      detail: `${success.atRiskCount} at-risk account${success.atRiskCount === 1 ? "" : "s"}, ${success.hotLeadCount} hot lead${success.hotLeadCount === 1 ? "" : "s"}, USD ${success.expansionArr.toLocaleString()} expansion ARR.`,
      action: success.atRiskCount ? "Call first supplier" : "Grow accounts"
    }),
    makeFounderStage({
      label: "Page Factory",
      anchor: "#page-factory",
      score: pageFactory.active?.readiness || 0,
      detail: `${pageFactory.readyCount} launch-ready page${pageFactory.readyCount === 1 ? "" : "s"}, ${pageFactory.prepareCount} prepare page${pageFactory.prepareCount === 1 ? "" : "s"}, USD ${pageFactory.totalArr.toLocaleString()} modeled ARR.`,
      action: pageFactory.readyCount ? "Open page queue" : "Prepare page"
    }),
    makeFounderStage({
      label: "Launch Room",
      anchor: "#launch-room",
      score: launch.score,
      detail: `${launch.targetSuppliers} supplier invite${launch.targetSuppliers === 1 ? "" : "s"} and USD ${launch.firstWeekArr.toLocaleString()} first-week ARR target.`,
      action: launch.score >= 84 ? "Run sprint" : "Prep sprint"
    }),
    makeFounderStage({
      label: "Market Twin",
      anchor: "#market-twin",
      score: twin.score,
      detail: `${twin.scenario?.label || "Scenario"} models ${twin.totalListings || 0} paid listing${twin.totalListings === 1 ? "" : "s"} and ${twin.demandCoverage || 0}% demand coverage.`,
      action: twin.score >= 84 ? "Use scenario" : "Tune scenario"
    }),
    makeFounderStage({
      label: "Flywheel",
      anchor: "#liquidity-flywheel",
      score: flywheel.score,
      detail: `${flywheel.bottleneck?.label || "Marketplace loop"} is the current bottleneck; strongest loop is ${flywheel.strongest?.label || "still forming"}.`,
      action: flywheel.score >= 84 ? "Protect loop" : "Fix bottleneck"
    }),
    makeFounderStage({
      label: "Autopilot",
      anchor: "#founder-autopilot",
      score: autopilot.score,
      detail: `${autopilot.primary?.owner || "Founder"} owns ${autopilot.primary?.label || "the next command"} with USD ${autopilot.totalImpactArr.toLocaleString()} ARR impact modeled.`,
      action: autopilot.openCommandCount ? "Dispatch command" : "Review commands"
    }),
    makeFounderStage({
      label: "Demand Exchange",
      anchor: "#demand-exchange",
      score: exchange.score,
      detail: `Supplier pull is ${exchange.badge.toLowerCase()} with USD ${exchange.exchangeArr.toLocaleString()} exchange ARR across demand tickets.`,
      action: exchange.score >= 82 ? "Invite supplier" : "Warm market"
    }),
    makeFounderStage({
      label: "Proof of Demand",
      anchor: "#proof-demand",
      score: proof.score,
      detail: `${proof.badge} sales proof with USD ${proof.proofValue.toLocaleString()} proof value and ${proof.primaryObjection?.label || "supplier objection"} answered.`,
      action: proof.score >= 84 ? "Use proof pack" : "Build proof"
    }),
    makeFounderStage({
      label: "Commitment",
      anchor: "#supplier-commitment",
      score: commitment.score,
      detail: `${commitment.recommendedPackage?.label || "Starter package"} models ${commitment.recommendedPackage?.listings || 0} paid listing${commitment.recommendedPackage?.listings === 1 ? "" : "s"} and ${commitment.readyGateCount}/${commitment.gates.length} ready gates.`,
      action: commitment.score >= 84 ? "Close package" : "Clear gates"
    }),
    makeFounderStage({
      label: "Activation",
      anchor: "#listing-activation",
      score: activation.activationScore,
      detail: `${activation.readyQueueCount}/${activation.queue.length} activation items and ${activation.readyGateCount}/${activation.gates.length} launch gates are ready.`,
      action: activation.activationScore >= 84 ? "Publish listings" : "Run activation"
    }),
    makeFounderStage({
      label: "Trust Ledger",
      anchor: "#trust-revenue-ledger",
      score: ledger.score,
      detail: `USD ${ledger.activeListingArr.toLocaleString()} active listing ARR, USD ${ledger.directPipeline.toLocaleString()} direct pipeline, ${ledger.trustDebt} trust gap${ledger.trustDebt === 1 ? "" : "s"}.`,
      action: ledger.score >= 84 ? "Scale carefully" : "Protect ledger"
    })
  ];
  const score = Math.round(stages.reduce((total, stage) => total + stage.score, 0) / stages.length);
  const nextStage = [...stages]
    .filter((stage) => stage.status !== "Ready")
    .sort((a, b) => a.score - b.score)[0] || stages[stages.length - 1];
  const badge = score >= 84 && ledger.trustDebt <= 2 ? "Scale-ready" : score >= 70 ? "Founder control" : "Fix first";
  const summary = `${marketLabel} has ${market.demandCount} demand signal${market.demandCount === 1 ? "" : "s"}, USD ${ledger.activeListingArr.toLocaleString()} active listing ARR, ${ledger.trustDebt} trust gap${ledger.trustDebt === 1 ? "" : "s"}, and ${flywheel.bottleneck?.label || "market proof"} as the current control point.`;

  return {
    market,
    success,
    pageFactory,
    launch,
    twin,
    flywheel,
    autopilot,
    exchange,
    proof,
    commitment,
    activation,
    ledger,
    marketLabel,
    score,
    badge,
    title: `${marketLabel} founder desk`,
    summary,
    stages,
    nextStage,
    packet: [
      { label: "Market", value: marketLabel },
      { label: "Scale verdict", value: `${badge} - ${score}/100` },
      { label: "Active listing ARR", value: `USD ${ledger.activeListingArr.toLocaleString()}` },
      { label: "Direct enquiry pipeline", value: `USD ${ledger.directPipeline.toLocaleString()}` },
      { label: "Current bottleneck", value: flywheel.bottleneck?.label || "Collect market proof" },
      { label: "Next move", value: `${nextStage.label}: ${nextStage.action}` },
      { label: "Phase-one rule", value: "Scale paid listings and verified direct enquiries before any rental payment or commission workflow" }
    ]
  };
}

function makeFounderStage(stage) {
  const status = stage.score >= 84 ? "Ready" : stage.score >= 68 ? "Review" : "Gap";
  return {
    ...stage,
    status,
    statusClass: status.toLowerCase()
  };
}

function renderFounderMorningBrief() {
  const root = document.querySelector("#founderMorningSignals");
  if (!root) return;

  const model = getFounderMorningBriefModel();

  setText("#founderMorningTitle", model.title);
  setText("#founderMorningBadge", model.badge);

  document.querySelector("#founderMorningScore").innerHTML = `
    <strong>${model.score}/100</strong>
    <span>${escapeHtml(model.summary)}</span>
  `;

  document.querySelector("#founderMorningMetrics").innerHTML = model.metrics.map((metric) => `
    <span><strong>${escapeHtml(metric.value)}</strong>${escapeHtml(metric.label)}</span>
  `).join("");

  root.innerHTML = model.signals.map((signal) => `
    <button type="button" class="founder-morning-signal ${escapeHtml(signal.statusClass)}" data-morning-target="${escapeHtml(signal.anchor)}">
      <strong>${escapeHtml(signal.value)}</strong>
      <span>
        ${escapeHtml(signal.label)}
        <small>${escapeHtml(signal.detail)}</small>
      </span>
      <b>${escapeHtml(signal.status)}</b>
    </button>
  `).join("");

  document.querySelector("#founderMorningScript").innerHTML = model.script.map((line, index) => `
    <div class="founder-morning-script-line ${escapeHtml(line.statusClass)}">
      <strong>${index + 1}</strong>
      <span>
        ${escapeHtml(line.label)}
        <small>${escapeHtml(line.detail)}</small>
      </span>
    </div>
  `).join("");

  document.querySelector("#founderMorningLanes").innerHTML = model.lanes.map((lane) => `
    <button type="button" class="founder-morning-lane ${escapeHtml(lane.statusClass)}" data-morning-target="${escapeHtml(lane.anchor)}">
      <span>${escapeHtml(lane.label)}<small>${escapeHtml(lane.detail)}</small></span>
      <b>${escapeHtml(lane.status)}</b>
    </button>
  `).join("");

  document.querySelector("#founderMorningBrief").innerHTML = buildFounderMorningBriefText(model)
    .split("\n")
    .filter(Boolean)
    .map((line) => `<p>${escapeHtml(line)}</p>`)
    .join("");

  document.querySelectorAll("[data-morning-target]").forEach((button) => {
    button.addEventListener("click", () => {
      const target = document.querySelector(button.dataset.morningTarget);
      if (!target) return;
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      window.location.hash = button.dataset.morningTarget;
      showToast("Founder morning lane opened.");
    });
  });
}

function getFounderMorningBriefModel() {
  const daily = getFounderDailyMovesModel();
  const founder = daily.founder;
  const success = daily.success;
  const twin = daily.twin;
  const activation = daily.activation;
  const ledger = daily.ledger;
  const matrix = daily.matrix;
  const firstMove = daily.moves[0];
  const firstGuardrail = daily.guardrails.find((guardrail) => guardrail.statusClass !== "ready") || daily.guardrails[0];
  const matrixCell = matrix.topCells[0] || matrix.activeCell;
  const launchStatus = twin.verdict?.statusClass || (twin.score >= 84 ? "ready" : twin.score >= 68 ? "review" : "gap");
  const trustStatus = ledger.trustDebt <= 2 && ledger.score >= 74 ? "ready" : ledger.trustDebt <= 5 ? "review" : "gap";
  const supplierStatus = success.callFirst.priorityClass === "hot" ? "gap" : success.callFirst.priorityClass === "grow" ? "ready" : "review";
  const activationStatus = activation.activationScore >= 84 ? "ready" : activation.activationScore >= 68 ? "review" : "gap";
  const matrixStatus = matrixCell?.statusClass || "review";
  const signals = [
    makeFounderMorningSignal({
      label: "Daily pressure",
      value: `${daily.openMoveCount} open`,
      detail: `First command is ${firstMove.label}.`,
      anchor: "#founder-daily",
      statusClass: daily.openMoveCount >= 3 ? "gap" : daily.openMoveCount ? "review" : "ready"
    }),
    makeFounderMorningSignal({
      label: "Supplier call",
      value: success.callFirst.profile.supplier,
      detail: `${success.callFirst.reason}. ${success.callFirst.primaryAction.detail}`,
      anchor: "#supplier-success",
      statusClass: supplierStatus
    }),
    makeFounderMorningSignal({
      label: "Trust gate",
      value: `${ledger.score}/100`,
      detail: `${ledger.trustDebt} trust gap${ledger.trustDebt === 1 ? "" : "s"} before heavier traffic.`,
      anchor: "#trust-revenue-ledger",
      statusClass: trustStatus
    }),
    makeFounderMorningSignal({
      label: "Launch verdict",
      value: twin.verdict?.label || "Run twin",
      detail: twin.verdict?.rule || "Check supply, proof, response, revenue, and payment gates before scaling.",
      anchor: "#market-twin",
      statusClass: launchStatus
    }),
    makeFounderMorningSignal({
      label: "Activation gate",
      value: `${activation.readyGateCount}/${activation.gates.length}`,
      detail: `${activation.recommendedPackage?.label || "Recommended package"} must clear publish and billing gates.`,
      anchor: "#listing-activation",
      statusClass: activationStatus
    }),
    makeFounderMorningSignal({
      label: "Next wedge",
      value: matrixCell ? `${matrixCell.region} ${matrixCell.category}` : "Matrix",
      detail: matrixCell ? matrixCell.summary : "Open the matrix to choose a demand-led wedge.",
      anchor: "#market-signal-matrix",
      statusClass: matrixStatus
    })
  ];
  const gapCount = signals.filter((signal) => signal.statusClass === "gap").length;
  const reviewCount = signals.filter((signal) => signal.statusClass === "review").length;
  const score = Math.max(0, Math.min(100, Math.round(
    daily.score * 0.55
    + founder.score * 0.2
    + ledger.score * 0.15
    + Math.max(0, 100 - gapCount * 14 - reviewCount * 6) * 0.1
  )));
  const badge = gapCount ? "Open carefully" : reviewCount ? "Tight day" : "Ready day";
  const summary = `${daily.marketLabel}: ${firstMove.label} comes first; protect ${firstGuardrail.label.toLowerCase()} while keeping rental payment direct.`;
  const lanes = [
    {
      label: "Call",
      detail: `${success.callFirst.profile.supplier}: ${success.callFirst.primaryAction.label}.`,
      anchor: "#supplier-success",
      status: supplierStatus === "gap" ? "Now" : "Today",
      statusClass: supplierStatus
    },
    {
      label: "Protect",
      detail: `${firstGuardrail.label}: ${firstGuardrail.detail}`,
      anchor: getFounderMorningGuardrailAnchor(firstGuardrail),
      status: firstGuardrail.status,
      statusClass: firstGuardrail.statusClass
    },
    {
      label: "Push",
      detail: matrixCell ? `${matrixCell.region} ${matrixCell.category}: ${matrixCell.action}.` : "Choose the next expansion wedge.",
      anchor: "#market-signal-matrix",
      status: matrixCell?.status || "Scan",
      statusClass: matrixStatus
    },
    {
      label: "Copy",
      detail: "Send the morning brief before opening more market work.",
      anchor: "#founder-morning",
      status: "Brief",
      statusClass: "ready"
    }
  ];
  const script = [
    {
      label: "Start with the highest-friction move",
      detail: `${firstMove.label}: ${firstMove.detail}`,
      statusClass: firstMove.statusClass
    },
    {
      label: "Say the phase-one rule out loud",
      detail: "Listings are SaaS revenue. Buyer and rental company keep rental payment direct.",
      statusClass: "ready"
    },
    {
      label: "Repair the strongest blocker",
      detail: `${firstGuardrail.label}: ${firstGuardrail.detail}`,
      statusClass: firstGuardrail.statusClass
    },
    {
      label: "Only then open growth",
      detail: matrixCell ? `${matrixCell.region} ${matrixCell.category} is the next wedge to review.` : "Use the market matrix before pushing a new wedge.",
      statusClass: matrixStatus
    }
  ];

  return {
    daily,
    founder,
    success,
    twin,
    activation,
    ledger,
    matrix,
    matrixCell,
    firstMove,
    firstGuardrail,
    title: `${daily.marketLabel} morning brief`,
    badge,
    score,
    summary,
    gapCount,
    reviewCount,
    signals,
    script,
    lanes,
    metrics: [
      { label: "ARR in focus", value: `USD ${daily.arrAtStake.toLocaleString()}` },
      { label: "First owner", value: firstMove.owner },
      { label: "Risk signals", value: String(gapCount + reviewCount) },
      { label: "Rental take", value: "0%" }
    ]
  };
}

function makeFounderMorningSignal(signal) {
  const status = signal.statusClass === "ready" ? "Ready" : signal.statusClass === "review" ? "Watch" : "Fix";
  return {
    ...signal,
    status
  };
}

function getFounderMorningGuardrailAnchor(guardrail) {
  const label = `${guardrail.label} ${guardrail.owner}`.toLowerCase();
  if (label.includes("traffic") || label.includes("growth")) return "#market-twin";
  if (label.includes("trust")) return "#trust-revenue-ledger";
  if (label.includes("supplier") || label.includes("success")) return "#supplier-success";
  if (label.includes("activation") || label.includes("revenue")) return "#listing-activation";
  return "#founder-daily";
}

function renderFounderDailyMoves() {
  const root = document.querySelector("#founderDailyQueue");
  if (!root) return;

  const model = getFounderDailyMovesModel();

  setText("#founderDailyTitle", model.title);
  setText("#founderDailyBadge", model.badge);

  document.querySelector("#founderDailyScore").innerHTML = `
    <strong>${model.score}/100</strong>
    <span>${escapeHtml(model.summary)}</span>
  `;

  document.querySelector("#founderDailyMetrics").innerHTML = model.metrics.map((metric) => `
    <span><strong>${escapeHtml(metric.value)}</strong>${escapeHtml(metric.label)}</span>
  `).join("");

  root.innerHTML = model.moves.map((move, index) => `
    <button type="button" class="founder-daily-move ${escapeHtml(move.statusClass)} ${index === 0 ? "is-primary" : ""}" data-daily-target="${escapeHtml(move.anchor)}">
      <strong>${index + 1}</strong>
      <span>
        ${escapeHtml(move.label)}
        <small>${escapeHtml(move.detail)}</small>
      </span>
      <em>${escapeHtml(move.owner)} - ${escapeHtml(move.due)}</em>
      <b>${escapeHtml(move.status)}</b>
    </button>
  `).join("");

  document.querySelector("#founderDailyGuardrails").innerHTML = model.guardrails.map((guardrail, index) => `
    <div class="founder-daily-guardrail ${escapeHtml(guardrail.statusClass)}">
      <strong>${index + 1}</strong>
      <span>
        ${escapeHtml(guardrail.label)}
        <small>${escapeHtml(guardrail.detail)}</small>
      </span>
      <em>${escapeHtml(guardrail.owner)}</em>
      <b>${escapeHtml(guardrail.status)}</b>
    </div>
  `).join("");

  document.querySelector("#founderDailyBrief").innerHTML = buildFounderDailyMovesText(model)
    .split("\n")
    .filter(Boolean)
    .map((line) => `<p>${escapeHtml(line)}</p>`)
    .join("");

  document.querySelectorAll("[data-daily-target]").forEach((button) => {
    button.addEventListener("click", () => {
      const target = document.querySelector(button.dataset.dailyTarget);
      if (!target) return;
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      window.location.hash = button.dataset.dailyTarget;
      showToast("Founder daily move opened.");
    });
  });
}

function getFounderDailyMovesModel() {
  const founder = getFounderWorkbenchModel();
  const matrix = getMarketSignalMatrixModel();
  const success = founder.success;
  const twin = founder.twin;
  const autopilot = founder.autopilot;
  const activation = founder.activation;
  const ledger = founder.ledger;
  const marketLabel = founder.marketLabel;
  const activationGap = [...activation.queue, ...activation.gates].find((item) => item.statusClass !== "ready") || activation.queue[0];
  const ledgerControl = ledger.controls.find((control) => control.statusClass !== "ready") || ledger.controls[0];
  const matrixCell = matrix.topCells[0] || matrix.activeCell;
  const twinGapCount = twin.verdict?.riskGaps || twin.risks.filter((risk) => risk.statusClass === "gap").length;
  const moves = [
    makeFounderDailyMove({
      label: `Call ${success.callFirst.profile.supplier}`,
      detail: `${success.callFirst.reason}. Primary action: ${success.callFirst.primaryAction.label}.`,
      owner: "Success",
      due: "Today",
      anchor: "#supplier-success",
      priority: success.callFirst.urgency,
      impact: success.callFirst.health.revenueDesk.annualRevenue,
      statusClass: success.callFirst.priorityClass === "hot" ? "gap" : success.callFirst.priorityClass === "grow" ? "ready" : "review"
    }),
    makeFounderDailyMove({
      label: twin.verdict?.label || "Tune market twin",
      detail: `${twin.scenario?.label || "Scenario"} verdict for ${twin.active?.title || marketLabel}: ${twin.verdict?.rule || "Protect supply, proof, response, and revenue gates."}`,
      owner: "Founder",
      due: twinGapCount ? "Today" : "48h",
      anchor: "#market-twin",
      priority: Math.max(42, 100 - (twin.verdict?.score || twin.score) + twinGapCount * 12),
      impact: twin.annualArr || 0,
      statusClass: twin.verdict?.statusClass || (twin.score >= 84 ? "ready" : twin.score >= 68 ? "review" : "gap")
    }),
    makeFounderDailyMove({
      label: autopilot.primary?.label || "Dispatch founder command",
      detail: autopilot.primary?.detail || "Turn the weakest market loop into owned work.",
      owner: autopilot.primary?.owner || "Founder",
      due: autopilot.primary?.due || "Today",
      anchor: autopilot.primary?.anchor || "#founder-autopilot",
      priority: autopilot.primary?.urgency || Math.max(35, 100 - autopilot.score),
      impact: autopilot.primary?.impactArr || autopilot.totalImpactArr,
      statusClass: autopilot.primary?.statusClass || (autopilot.score >= 84 ? "ready" : autopilot.score >= 68 ? "review" : "gap")
    }),
    makeFounderDailyMove({
      label: activationGap?.label || "Prepare activation",
      detail: activationGap?.detail || activation.summary,
      owner: activationGap?.owner || "Founder",
      due: activation.activationScore >= 84 ? "This week" : "Today",
      anchor: "#listing-activation",
      priority: Math.max(30, 100 - activation.activationScore + (activation.gates.length - activation.readyGateCount) * 5),
      impact: activation.recommendedPackage?.annualRevenue || 0,
      statusClass: activationGap?.statusClass || (activation.activationScore >= 84 ? "ready" : activation.activationScore >= 68 ? "review" : "gap")
    }),
    makeFounderDailyMove({
      label: ledgerControl?.label || "Protect trust ledger",
      detail: ledgerControl?.detail || ledger.summary,
      owner: ledgerControl?.owner || "Founder",
      due: ledger.trustDebt ? "Today" : "This week",
      anchor: "#trust-revenue-ledger",
      priority: Math.max(28, 100 - ledger.score + ledger.trustDebt * 6),
      impact: ledger.activeListingArr + ledger.nextPackageArr,
      statusClass: ledgerControl?.statusClass || (ledger.score >= 84 ? "ready" : ledger.score >= 68 ? "review" : "gap")
    }),
    makeFounderDailyMove({
      label: matrixCell ? `${matrixCell.region} ${matrixCell.category}: ${matrixCell.action}` : "Read market matrix",
      detail: matrixCell ? matrixCell.summary : "Use the matrix to choose the next demand-led wedge.",
      owner: "Growth",
      due: "48h",
      anchor: "#market-signal-matrix",
      priority: matrixCell?.priorityScore || 40,
      impact: matrixCell?.annualRevenue || 0,
      statusClass: matrixCell?.statusClass || "review"
    })
  ].sort((a, b) => b.priority - a.priority || b.impact - a.impact).slice(0, 6);
  const guardrails = getFounderDailyGuardrails({ founder, success, twin, activation, ledger });
  const openMoveCount = moves.filter((move) => move.statusClass !== "ready").length;
  const blockedGuardrails = guardrails.filter((guardrail) => guardrail.statusClass === "gap").length;
  const score = Math.max(0, Math.min(100, Math.round(
    founder.score * 0.42
    + success.averageHealth * 0.18
    + ledger.score * 0.16
    + activation.activationScore * 0.14
    + Math.max(0, 100 - openMoveCount * 9 - blockedGuardrails * 12) * 0.1
  )));
  const badge = openMoveCount >= 3 || blockedGuardrails ? "Work today" : score >= 84 ? "Clean day" : "Tighten";
  const summary = `${marketLabel}: ${moves[0].label} is first, with ${openMoveCount} open move${openMoveCount === 1 ? "" : "s"} and ${blockedGuardrails} blocked guardrail${blockedGuardrails === 1 ? "" : "s"}.`;
  const arrAtStake = moves.reduce((total, move) => total + Number(move.impact || 0), 0);

  return {
    founder,
    matrix,
    success,
    twin,
    autopilot,
    activation,
    ledger,
    marketLabel,
    title: `${marketLabel} daily moves`,
    badge,
    score,
    summary,
    moves,
    guardrails,
    openMoveCount,
    blockedGuardrails,
    arrAtStake,
    metrics: [
      { label: "First move", value: moves[0].owner },
      { label: "Open moves", value: String(openMoveCount) },
      { label: "ARR at stake", value: `USD ${arrAtStake.toLocaleString()}` },
      { label: "Payment take", value: "0%" }
    ]
  };
}

function makeFounderDailyMove(move) {
  const status = move.statusClass === "ready" ? "Protect" : move.statusClass === "review" ? "Tighten" : "Dispatch";
  return {
    ...move,
    priority: Math.max(0, Math.min(100, Math.round(move.priority || 0))),
    status
  };
}

function getFounderDailyGuardrails({ founder, success, twin, activation, ledger }) {
  return [
    {
      label: "Rental payment stays direct",
      detail: "No rental payment collection and no rental commission in phase one.",
      owner: "Founder",
      status: "Locked",
      statusClass: "ready"
    },
    {
      label: "Traffic follows launch verdict",
      detail: twin.verdict?.rule || "Use Market Twin before opening heavier category traffic.",
      owner: "Growth",
      status: twin.verdict?.statusClass === "ready" ? "Open" : twin.verdict?.statusClass === "review" ? "Capped" : "Hold",
      statusClass: twin.verdict?.statusClass || "review"
    },
    {
      label: "Trust before scale",
      detail: `${ledger.trustDebt} trust gap${ledger.trustDebt === 1 ? "" : "s"} and ledger score ${ledger.score}/100.`,
      owner: "Trust",
      status: ledger.trustDebt <= 2 && ledger.score >= 74 ? "Ready" : ledger.trustDebt <= 5 ? "Tighten" : "Fix",
      statusClass: ledger.trustDebt <= 2 && ledger.score >= 74 ? "ready" : ledger.trustDebt <= 5 ? "review" : "gap"
    },
    {
      label: "Supplier saves before expansion",
      detail: `${success.atRiskCount} at-risk account${success.atRiskCount === 1 ? "" : "s"} and ${success.hotLeadCount} hot lead${success.hotLeadCount === 1 ? "" : "s"} in the book.`,
      owner: "Success",
      status: success.atRiskCount ? "Call" : "Grow",
      statusClass: success.atRiskCount ? "gap" : "ready"
    },
    {
      label: "Activation before promotion",
      detail: `${activation.readyGateCount}/${activation.gates.length} activation gates ready for ${activation.active?.title || founder.marketLabel}.`,
      owner: "Revenue",
      status: activation.activationScore >= 84 ? "Publish" : activation.activationScore >= 68 ? "Sprint" : "Prep",
      statusClass: activation.activationScore >= 84 ? "ready" : activation.activationScore >= 68 ? "review" : "gap"
    }
  ];
}

function renderFounderCallSheet() {
  const root = document.querySelector("#founderCallSheetCards");
  if (!root) return;

  const model = getFounderCallSheetModel();

  setText("#founderCallSheetTitle", model.title);
  setText("#founderCallSheetBadge", model.badge);

  document.querySelector("#founderCallSheetScore").innerHTML = `
    <strong>${model.score}/100</strong>
    <span>${escapeHtml(model.summary)}</span>
  `;

  document.querySelector("#founderCallSheetMetrics").innerHTML = model.metrics.map((metric) => `
    <span><strong>${escapeHtml(metric.value)}</strong>${escapeHtml(metric.label)}</span>
  `).join("");

  root.innerHTML = model.cards.map((card, index) => `
    <button type="button" class="founder-call-row ${escapeHtml(card.statusClass)} ${index === 0 ? "is-primary" : ""}" data-call-listing="${escapeHtml(card.listingId)}" data-call-anchor="${escapeHtml(card.anchor)}">
      <strong>${index + 1}</strong>
      <span>
        ${escapeHtml(card.supplier)}
        <small>${escapeHtml(card.hook)}</small>
      </span>
      <em>USD ${card.value.toLocaleString()}</em>
      <b>${escapeHtml(card.status)}</b>
    </button>
  `).join("");

  document.querySelector("#founderCallSheetScript").innerHTML = model.script.map((line, index) => `
    <div class="founder-call-script-line ${escapeHtml(line.statusClass)}">
      <strong>${index + 1}</strong>
      <span>
        ${escapeHtml(line.label)}
        <small>${escapeHtml(line.detail)}</small>
      </span>
    </div>
  `).join("");

  document.querySelector("#founderCallSheetProof").innerHTML = model.proofAsks.map((ask, index) => `
    <div class="founder-call-proof-row ${escapeHtml(ask.statusClass)}">
      <strong>${index + 1}</strong>
      <span>
        ${escapeHtml(ask.label)}
        <small>${escapeHtml(ask.detail)}</small>
      </span>
      <b>${escapeHtml(ask.status)}</b>
    </div>
  `).join("");

  document.querySelector("#founderCallSheetBrief").innerHTML = buildFounderCallSheetText(model)
    .split("\n")
    .filter(Boolean)
    .map((line) => `<p>${escapeHtml(line)}</p>`)
    .join("");

  document.querySelectorAll("[data-call-anchor]").forEach((button) => {
    button.addEventListener("click", () => {
      const listing = listings.find((item) => item.id === button.dataset.callListing);
      if (listing) state.selectedListingId = listing.id;
      state.commandRole = "Founder";
      saveState();
      render();
      const target = document.querySelector(button.dataset.callAnchor);
      if (!target) return;
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      window.location.hash = button.dataset.callAnchor;
      showToast("Supplier call path opened.");
    });
  });
}

function getFounderCallSheetModel() {
  const morning = getFounderMorningBriefModel();
  const daily = morning.daily;
  const success = getSupplierSuccessModel();
  const exchange = getDemandExchangeModel();
  const proof = getProofDemandRoomModel();
  const commitment = getSupplierCommitmentModel();
  const active = commitment.active || proof.active || exchange.active;
  const recommendedPackage = commitment.recommendedPackage || { label: "Starter proof package", listings: 3, annualRevenue: 297, monthlyRevenue: 27 };
  const marketLabel = active ? `${active.region} ${active.category}` : daily.marketLabel;
  const cards = success.rows.slice(0, 5).map((row) => getFounderCallCard(row, {
    active,
    exchange,
    proof,
    commitment,
    recommendedPackage,
    marketLabel
  }));
  const proofAsks = getFounderCallProofAsks({ active, proof, commitment, recommendedPackage });
  const hotCount = cards.filter((card) => card.statusClass === "hot").length;
  const closeReadyCount = cards.filter((card) => card.statusClass === "grow").length;
  const proofGapCount = proofAsks.filter((ask) => ask.statusClass === "gap").length;
  const score = Math.max(0, Math.min(100, Math.round(
    success.averageHealth * 0.3
    + commitment.score * 0.25
    + proof.score * 0.18
    + exchange.score * 0.14
    + Math.max(0, 100 - hotCount * 9 - proofGapCount * 12) * 0.13
  )));
  const badge = commitment.score >= 84 && closeReadyCount ? "Close today" : hotCount ? "Call first" : "Build proof";
  const summary = `${marketLabel}: call ${cards[0].supplier} first, offer ${recommendedPackage.label.toLowerCase()}, and keep rental payment direct.`;
  const script = [
    {
      label: "Open with demand",
      detail: active ? `${active.demandCount} buyer signal${active.demandCount === 1 ? "" : "s"} show demand for ${marketLabel}.` : `${marketLabel} has active buyer and supplier signals.`,
      statusClass: active?.demandCount >= 3 ? "grow" : "watch"
    },
    {
      label: "Show the supplier value",
      detail: `${recommendedPackage.label}: ${recommendedPackage.listings} paid listing${recommendedPackage.listings === 1 ? "" : "s"} for USD ${recommendedPackage.monthlyRevenue.toLocaleString()}/month or USD ${recommendedPackage.annualRevenue.toLocaleString()}/year.`,
      statusClass: recommendedPackage.statusClass === "ready" ? "grow" : recommendedPackage.statusClass === "gap" ? "hot" : "watch"
    },
    {
      label: "Ask for proof before verified visibility",
      detail: proofAsks.slice(0, 3).map((ask) => ask.label).join(", ") || "Collect machine, company, and availability proof.",
      statusClass: proofGapCount ? "hot" : "grow"
    },
    {
      label: "Protect the phase-one promise",
      detail: "Heavyster sells listing SaaS and routes direct enquiries. Buyer and supplier keep rental payment direct.",
      statusClass: "grow"
    }
  ];

  return {
    morning,
    daily,
    success,
    exchange,
    proof,
    commitment,
    active,
    recommendedPackage,
    marketLabel,
    title: `${marketLabel} supplier call sheet`,
    badge,
    score,
    summary,
    cards,
    proofAsks,
    script,
    hotCount,
    closeReadyCount,
    proofGapCount,
    metrics: [
      { label: "First call", value: cards[0].supplier },
      { label: "Package", value: `${recommendedPackage.listings} listings` },
      { label: "Offer ARR", value: `USD ${recommendedPackage.annualRevenue.toLocaleString()}` },
      { label: "Rental take", value: "0%" }
    ]
  };
}

function getFounderCallCard(row, context) {
  const active = context.active;
  const packageValue = context.recommendedPackage.annualRevenue || 0;
  const expansionValue = row.health.expansionArr || 0;
  const renewalValue = row.health.revenueDesk.annualRevenue || 0;
  const value = Math.max(packageValue, expansionValue, Math.round(renewalValue * 0.35));
  const proofAsk = active?.proof?.slice(0, 2).join(" and ") || row.profile.proof.slice(0, 2).join(" and ");
  const categoryHook = active ? `${active.region} ${active.category}` : row.profile.fleet[0]?.label || "heavy equipment";
  const statusClass = row.priorityClass;
  const status = statusClass === "hot" ? "Call now" : statusClass === "grow" ? "Pitch" : "Warm";
  const anchor = statusClass === "hot" ? "#account-health" : context.commitment.score >= 68 ? "#supplier-commitment" : "#proof-demand";

  return {
    supplier: row.profile.supplier,
    listingId: row.listing.id,
    branch: row.profile.branch,
    response: row.profile.response,
    hook: `${categoryHook}: ${row.reason}. Ask for ${proofAsk.toLowerCase()} and route renters direct.`,
    ask: `${context.recommendedPackage.label}: ${context.recommendedPackage.listings} active listing${context.recommendedPackage.listings === 1 ? "" : "s"}.`,
    value,
    status,
    statusClass,
    anchor
  };
}

function getFounderCallProofAsks({ active, proof, commitment, recommendedPackage }) {
  const activeProof = active?.proof || [];
  const proofRows = proof.evidence.length ? proof.evidence : [];
  const gates = commitment.gates.length ? commitment.gates : [];
  const asks = [
    ...activeProof.slice(0, 3).map((item) => ({
      label: item,
      detail: "Attach this proof before using verified supplier language.",
      status: "Ask",
      statusClass: "watch"
    })),
    ...gates.filter((gate) => gate.statusClass !== "ready").slice(0, 2).map((gate) => ({
      label: gate.label,
      detail: gate.detail,
      status: gate.status,
      statusClass: gate.statusClass === "gap" ? "hot" : "watch"
    })),
    ...proofRows.filter((row) => row.statusClass === "gap").slice(0, 1).map((row) => ({
      label: row.label,
      detail: row.detail,
      status: row.status,
      statusClass: "hot"
    }))
  ];

  asks.push({
    label: "Direct enquiry route",
    detail: `${recommendedPackage.label} stays phase-one clean: phone, WhatsApp, email, or web enquiry goes directly to the supplier.`,
    status: "Locked",
    statusClass: "grow"
  });

  return asks.slice(0, 6);
}

function renderBuyerWorkbench() {
  const model = getBuyerWorkbenchModel();
  setText("#buyerWorkbenchTitle", model.title);
  setText("#buyerWorkbenchBadge", model.badge);

  document.querySelector("#buyerWorkbenchScore").innerHTML = `
    <strong>${model.score}/100</strong>
    <span>${escapeHtml(model.summary)}</span>
  `;

  document.querySelector("#buyerWorkbenchNext").innerHTML = `
    <span>Next best move</span>
    <strong>${escapeHtml(model.nextStage.label)}</strong>
    <p>${escapeHtml(model.nextStage.detail)}</p>
    <button type="button" class="solid-button" data-buyer-target="${escapeHtml(model.nextStage.anchor)}" data-buyer-label="${escapeHtml(model.nextStage.label)}">${escapeHtml(model.nextStage.action)}</button>
  `;

  document.querySelector("#buyerWorkbenchFlow").innerHTML = model.stages.map((stage, index) => `
    <button type="button" class="buyer-workbench-step ${escapeHtml(stage.statusClass)}" data-buyer-target="${escapeHtml(stage.anchor)}" data-buyer-label="${escapeHtml(stage.label)}">
      <em>${index + 1}</em>
      <span>
        <strong>${escapeHtml(stage.label)}</strong>
        ${escapeHtml(stage.detail)}
      </span>
      <b>${stage.score}/100</b>
      <small>${escapeHtml(stage.status)}</small>
    </button>
  `).join("");

  document.querySelector("#buyerWorkbenchPacket").innerHTML = model.packet.map((item) => `
    <div>
      <span>${escapeHtml(item.label)}</span>
      <strong>${escapeHtml(item.value)}</strong>
    </div>
  `).join("");

  document.querySelectorAll("[data-buyer-target]").forEach((button) => {
    button.addEventListener("click", () => {
      const target = document.querySelector(button.dataset.buyerTarget);
      if (!target) return;
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      window.location.hash = button.dataset.buyerTarget;
      showToast(`${button.dataset.buyerLabel || "Buyer step"} opened.`);
    });
  });
}

function getBuyerWorkbenchModel() {
  const selected = getSelectedListing();
  const filtered = getFilteredListings();
  const nearby = getNearbyListings();
  const jobsite = getJobsiteModel();
  const passport = getTrustPassport(selected);
  const rfq = getRfqModel();
  const award = getAwardModel();
  const quote = getQuoteGuardModel();
  const mobilize = getMobilizationModel();
  const marketplaceScore = filtered.length
    ? Math.min(96, 68 + Math.min(filtered.length, 7) * 4 + (selected.verified ? 4 : 0))
    : nearby.length
      ? 56
      : 38;
  const rfqCoverageScore = Math.min(100, Math.round(
    rfq.averageScore * 0.72
    + Math.min(rfq.listings.length, 3) * 7
    + rfq.verifiedCount * 3
    + rfq.availableCount * 2
  ));
  const stages = [
    makeBuyerStage({
      label: "Search signal",
      anchor: "#marketplace",
      score: marketplaceScore,
      detail: filtered.length
        ? `${filtered.length} listing${filtered.length === 1 ? "" : "s"} visible for the current search.`
        : `${nearby.length} nearby option${nearby.length === 1 ? "" : "s"} found; capture missing demand if buyer needs exact supply.`,
      action: filtered.length ? "Review listings" : "Capture demand"
    }),
    makeBuyerStage({
      label: "Jobsite package",
      anchor: "#jobsite",
      score: jobsite.packageScore,
      detail: `${jobsite.matchedCount}/${jobsite.roles.length} machine role${jobsite.roles.length === 1 ? "" : "s"} covered for ${jobsite.region}.`,
      action: jobsite.gaps.length ? "Fill package gaps" : "Send package"
    }),
    makeBuyerStage({
      label: "Trust Passport",
      anchor: "#passport",
      score: passport.score,
      detail: `${selected.name} is ${passport.verdict.toLowerCase()} with ${passport.proofItems.filter((item) => !item.ready).length} proof gap${passport.proofItems.filter((item) => !item.ready).length === 1 ? "" : "s"}.`,
      action: passport.score >= 84 ? "Use proof" : "Close proof"
    }),
    makeBuyerStage({
      label: "RFQ coverage",
      anchor: "#rfq",
      score: rfqCoverageScore,
      detail: `${rfq.listings.length} supplier option${rfq.listings.length === 1 ? "" : "s"}, ${rfq.verifiedCount} verified, ${rfq.availableCount} available now.`,
      action: rfq.listings.length >= 2 ? "Review RFQ" : "Add supplier option"
    }),
    makeBuyerStage({
      label: "Award clarity",
      anchor: "#award",
      score: award.winner.total,
      detail: `${award.winner.listing.supplier} leads with ${award.badge.toLowerCase()} status.`,
      action: award.winner.total >= 84 ? "Review winner" : "Clarify award"
    }),
    makeBuyerStage({
      label: "Quote terms",
      anchor: "#quote-guard",
      score: quote.score,
      detail: `${quote.missingCount} quote term${quote.missingCount === 1 ? "" : "s"} still need clearer wording.`,
      action: quote.missingCount ? "Clarify quote" : "Use quote"
    }),
    makeBuyerStage({
      label: "Mobilization",
      anchor: "#mobilize",
      score: mobilize.score,
      detail: `${mobilize.checks.filter((check) => check.status === "Ready").length}/${mobilize.checks.length} dispatch gate${mobilize.checks.length === 1 ? "" : "s"} ready.`,
      action: mobilize.score >= 84 ? "Copy handoff" : "Lock dispatch"
    })
  ];
  const score = Math.round(stages.reduce((total, stage) => total + stage.score, 0) / stages.length);
  const nextStage = [...stages]
    .filter((stage) => stage.status !== "Ready")
    .sort((a, b) => a.score - b.score)[0] || stages[stages.length - 1];
  const badge = score >= 84 ? "Buyer-ready" : score >= 68 ? "Control path" : "Rescue path";
  const summary = `${selected.name} for ${getJobsiteRegion()} with ${state.jobsiteUrgency.toLowerCase()} start window and ${state.shortlistIds.length} saved option${state.shortlistIds.length === 1 ? "" : "s"}.`;

  return {
    selected,
    badge,
    score,
    title: `${selected.name} buyer desk`,
    summary,
    stages,
    nextStage,
    packet: [
      { label: "Selected machine", value: `${selected.name} - ${selected.supplier}` },
      { label: "Project", value: `${jobsite.blueprint.label} in ${jobsite.region}` },
      { label: "Shortlist", value: `${rfq.listings.length} option${rfq.listings.length === 1 ? "" : "s"} / ${rfq.verifiedCount} verified` },
      { label: "Recommended award", value: `${award.winner.listing.supplier} - ${award.winner.total}/100` },
      { label: "Quote control", value: `${quote.badge}, ${quote.missingCount} missing term${quote.missingCount === 1 ? "" : "s"}` },
      { label: "Payment rule", value: "Buyer pays supplier direct; Heavyster does not collect rental payment" }
    ]
  };
}

function makeBuyerStage(stage) {
  const status = stage.score >= 84 ? "Ready" : stage.score >= 64 ? "Review" : "Gap";
  return {
    ...stage,
    status,
    statusClass: status.toLowerCase()
  };
}

function reconcileShortlist() {
  state.shortlistIds = (state.shortlistIds || []).filter((id) => listings.some((listing) => listing.id === id));
}

function getFilteredListings() {
  return getListingsForFilters(state);
}

function getListingsForFilters(filters) {
  const query = String(filters.search || "").toLowerCase();
  const region = filters.region || "all";
  const availability = filters.availability || "all";
  const category = filters.category || "all";
  const sort = filters.sort || "available";
  const filtered = listings.filter((listing) => {
    const searchable = [
      listing.name,
      listing.category,
      listing.supplier,
      listing.region,
      listing.city,
      listing.specs
    ].join(" ").toLowerCase();

    return (!query || searchable.includes(query))
      && (region === "all" || listing.region === region)
      && (availability === "all" || listing.availability === availability)
      && (category === "all" || listing.category === category);
  });
  return filtered.sort((a, b) => {
    if (sort === "available") return availabilityScore(a) - availabilityScore(b) || a.name.localeCompare(b.name);
    if (sort === "fit") return getBuyerFitScore(b, filters).score - getBuyerFitScore(a, filters).score || a.name.localeCompare(b.name);
    if (sort === "verified") return Number(b.verified) - Number(a.verified) || a.name.localeCompare(b.name);
    if (sort === "region") return a.region.localeCompare(b.region) || a.city.localeCompare(b.city);
    return a.name.localeCompare(b.name);
  });
}

function availabilityScore(listing) {
  if (listing.availability === "available") return 0;
  if (listing.availability === "soon") return 1;
  return 2;
}

function getBuyerFitScore(listing, filters = state) {
  const query = String(filters.search || "").trim().toLowerCase();
  const searchable = [listing.name, listing.category, listing.supplier, listing.region, listing.city, listing.specs].join(" ").toLowerCase();
  const reasons = [];
  let score = 26;

  if (!query) {
    score += 8;
    reasons.push("broad marketplace fit");
  } else if (listing.name.toLowerCase().includes(query)) {
    score += 24;
    reasons.push("machine name match");
  } else if (listing.category.toLowerCase().includes(query)) {
    score += 18;
    reasons.push("category match");
  } else if (listing.specs.toLowerCase().includes(query)) {
    score += 14;
    reasons.push("spec match");
  } else if (searchable.includes(query)) {
    score += 9;
    reasons.push("related supplier or location match");
  } else {
    score -= 10;
    reasons.push("weaker keyword fit");
  }

  if (filters.region === "all") {
    score += 6;
  } else if (listing.region === filters.region) {
    score += 14;
    reasons.push(`${listing.region} region match`);
  } else {
    score -= 8;
  }

  if (filters.category === "all") {
    score += 5;
  } else if (listing.category === filters.category) {
    score += 12;
    reasons.push(`${listing.category.toLowerCase()} category match`);
  } else {
    score -= 6;
  }

  if (filters.availability === "all") {
    score += listing.availability === "available" ? 8 : 4;
  } else if (listing.availability === filters.availability) {
    score += 14;
    reasons.push(listing.availability === "available" ? "available now" : "available soon");
  } else {
    score -= 7;
  }

  if (listing.verified) {
    score += 10;
    reasons.push("verified supplier");
  } else {
    score -= 4;
    reasons.push("verification review needed");
  }

  const passport = getTrustPassport(listing);
  score += Math.round(passport.score * 0.16);

  if ((state.shortlistIds || []).includes(listing.id)) {
    score += 5;
    reasons.push("already shortlisted");
  }

  const uniqueReasons = Array.from(new Set(reasons)).slice(0, 3);
  const safeScore = Math.max(0, Math.min(100, Math.round(score)));
  const status = safeScore >= 84 ? "Strong fit" : safeScore >= 68 ? "Good fit" : safeScore >= 52 ? "Review fit" : "Weak fit";

  return {
    score: safeScore,
    status,
    reasons: uniqueReasons,
    summary: uniqueReasons.join("; ")
  };
}

function reconcileSelectedListing() {
  const filtered = getFilteredListings();
  if (!listings.some((listing) => listing.id === state.selectedListingId)) {
    state.selectedListingId = listings[0].id;
  }
  if (filtered.length && !filtered.some((listing) => listing.id === state.selectedListingId)) {
    state.selectedListingId = filtered[0].id;
  }
  if (!filtered.length) {
    const nearby = getNearbyListings();
    if (nearby.length && !nearby.some((listing) => listing.id === state.selectedListingId)) {
      state.selectedListingId = nearby[0].id;
    }
  }
}

function getSelectedListing() {
  return listings.find((listing) => listing.id === state.selectedListingId) || listings[0];
}

function renderMarketplaceSearchAssist() {
  const root = document.querySelector("#marketSearchAssist");
  if (!root) return;

  const items = getMarketplaceSearchAssistItems();
  root.innerHTML = `
    <div class="search-assist-head">
      <span>Search assist</span>
      <strong>${state.search ? `Matching "${escapeHtml(state.search)}"` : "Fast routes"}</strong>
    </div>
    <div class="search-assist-list">
      ${items.map((item) => `
        <button
          type="button"
          data-search-assist="${escapeHtml(item.kind)}"
          data-assist-id="${escapeHtml(item.id)}"
          data-assist-value="${escapeHtml(item.value)}"
        >
          <span>${escapeHtml(item.type)}</span>
          <strong>${escapeHtml(item.label)}</strong>
          <small>${escapeHtml(item.detail)}</small>
        </button>
      `).join("")}
    </div>
  `;

  root.querySelectorAll("[data-search-assist]").forEach((button) => {
    button.addEventListener("click", () => applyMarketplaceSearchAssist(button));
  });
}

function getMarketplaceSearchAssistItems() {
  const query = state.search.toLowerCase();
  const items = [];
  const seen = new Set();
  const add = (item) => {
    const key = `${item.kind}:${item.id}:${item.value}`;
    if (seen.has(key) || items.length >= 4) return;
    seen.add(key);
    items.push(item);
  };

  if (query) {
    listings
      .map((listing) => {
        const searchable = [listing.name, listing.category, listing.supplier, listing.region, listing.city, listing.specs].join(" ").toLowerCase();
        let score = 0;
        if (listing.name.toLowerCase().includes(query)) score += 8;
        if (listing.category.toLowerCase().includes(query)) score += 5;
        if (listing.supplier.toLowerCase().includes(query)) score += 4;
        if (searchable.includes(query)) score += 2;
        if (state.region !== "all" && listing.region === state.region) score += 1;
        return { listing, score };
      })
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score || a.listing.name.localeCompare(b.listing.name))
      .slice(0, 2)
      .forEach(({ listing }) => add({
        kind: "listing",
        id: listing.id,
        value: listing.name,
        type: "Machine",
        label: listing.name,
        detail: `${listing.supplier} - ${listing.city}, ${listing.region}`
      }));

    categoryDirectory
      .filter((category) => [category.name, category.group, category.intent].join(" ").toLowerCase().includes(query))
      .slice(0, 1)
      .forEach((category) => add({
        kind: "category",
        id: category.group,
        value: category.name,
        type: "Category",
        label: category.name,
        detail: `${category.count.toLocaleString()} modeled listings - ${category.regions}`
      }));

    supplierProfiles
      .filter((profile) => [profile.supplier, profile.headline, profile.branch, profile.serviceArea].join(" ").toLowerCase().includes(query))
      .slice(0, 1)
      .forEach((profile) => add({
        kind: "supplier",
        id: profile.supplier,
        value: profile.supplier,
        type: "Supplier",
        label: profile.supplier,
        detail: `${profile.branch} - response ${profile.response}`
      }));

    state.demandSignals
      .filter((signal) => [signal.equipment, signal.region, signal.source].join(" ").toLowerCase().includes(query))
      .slice(0, 1)
      .forEach((signal) => add({
        kind: "gap",
        id: getDemandKey(signal),
        value: signal.equipment,
        type: "Demand gap",
        label: `${signal.equipment} in ${signal.region}`,
        detail: `${signal.count} demand signal${signal.count === 1 ? "" : "s"} - capture supplier pull`
      }));
  }

  [
    { kind: "view", id: "available-now", value: "available", type: "View", label: "Available now", detail: "Fastest route to direct enquiries" },
    { kind: "category", id: "Earthmoving", value: "Excavators", type: "Category", label: "Excavators", detail: "High-volume earthmoving lane" },
    { kind: "supplier", id: "Gulf Lift Services", value: "Gulf Lift Services", type: "Supplier", label: "Gulf Lift Services", detail: "Certified UAE lifting supplier" },
    { kind: "gap", id: "Crawler crane|UAE", value: "Crawler crane", type: "Demand gap", label: "Crawler crane in UAE", detail: "Open supplier recruitment signal" }
  ].forEach(add);

  return items;
}

function applyMarketplaceSearchAssist(button) {
  const kind = button.dataset.searchAssist;
  const id = button.dataset.assistId;
  const value = button.dataset.assistValue;

  if (kind === "view") {
    applyMarketplaceSmartView(id);
    return;
  }

  if (kind === "listing") {
    const listing = listings.find((item) => item.id === id);
    if (!listing) return;
    state.search = listing.name;
    state.region = listing.region;
    state.availability = "all";
    state.category = "all";
    state.sort = "verified";
    state.selectedListingId = listing.id;
  }

  if (kind === "category") {
    state.search = "";
    state.category = id;
    state.availability = "all";
    state.sort = "available";
  }

  if (kind === "supplier") {
    state.search = id;
    state.region = "all";
    state.availability = "all";
    state.category = "all";
    state.sort = "verified";
  }

  if (kind === "gap") {
    const signal = state.demandSignals.find((item) => getDemandKey(item) === id)
      || { equipment: value || "Crawler crane", region: "UAE" };
    state.search = signal.equipment;
    state.region = signal.region;
    state.availability = "available";
    state.category = "all";
    state.sort = "verified";
  }

  const matches = getListingsForFilters(state);
  if (matches.length) state.selectedListingId = matches[0].id;
  saveState();
  syncFilterInputs();
  render();
  scrollToPageTarget(document.querySelector("#resultIntelligence"), 160);
  showToast(`${toTitleCase(kind)} search route opened.`);
}

function renderCategoryButtons() {
  document.querySelectorAll(".category-button").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.category === state.category);
  });
}

function renderMarketplaceSmartViews() {
  const root = document.querySelector("#marketSmartViews");
  if (!root) return;

  const activeId = getActiveSmartViewId();
  root.innerHTML = marketplaceSmartViews.map((view) => {
    const matches = getListingsForFilters(view);
    const verifiedCount = new Set(matches.filter((listing) => listing.verified).map((listing) => listing.supplier)).size;
    const gapLabel = matches.length ? `${matches.length} listing${matches.length === 1 ? "" : "s"}` : "Gap";
    return `
      <button type="button" class="smart-view-card ${activeId === view.id ? "is-active" : ""}" data-smart-view="${escapeHtml(view.id)}">
        <span>${escapeHtml(view.label)}</span>
        <strong>${escapeHtml(gapLabel)}</strong>
        <small>${escapeHtml(view.cue)} - ${verifiedCount} verified</small>
      </button>
    `;
  }).join("");

  root.querySelectorAll("[data-smart-view]").forEach((button) => {
    button.addEventListener("click", () => applyMarketplaceSmartView(button.dataset.smartView));
  });
}

function getActiveSmartViewId() {
  const normalize = (value) => String(value || "");
  const active = marketplaceSmartViews.find((view) =>
    normalize(state.search) === normalize(view.search)
    && state.region === view.region
    && state.availability === view.availability
    && state.category === view.category
    && state.sort === view.sort
  );
  return active?.id || "";
}

function applyMarketplaceSmartView(viewId) {
  const view = marketplaceSmartViews.find((item) => item.id === viewId);
  if (!view) return;

  state.search = view.search;
  state.region = view.region;
  state.availability = view.availability;
  state.category = view.category;
  state.sort = view.sort;
  const matches = getListingsForFilters(state);
  if (matches.length) state.selectedListingId = matches[0].id;
  saveState();
  syncFilterInputs();
  render();
  const target = document.querySelector(matches.length ? "#catalogTitle" : "#resultIntelligence");
  scrollToPageTarget(target, matches.length ? 86 : 160);
  showToast(`${view.label} Smart View opened.`);
}

function renderMarketplaceFilterTrail() {
  const root = document.querySelector("#marketFilterTrail");
  if (!root) return;

  const chips = getMarketplaceFilterChips();
  const activeView = marketplaceSmartViews.find((view) => view.id === getActiveSmartViewId());
  const viewLabel = activeView ? activeView.label : chips.length ? "Custom view" : "All marketplace";
  const summary = chips.length
    ? chips.map((chip) => chip.label).join(" / ")
    : "No filters active";

  root.innerHTML = `
    <div class="filter-trail-head">
      <span>Active view</span>
      <strong>${escapeHtml(viewLabel)}</strong>
      <small>${escapeHtml(summary)}</small>
    </div>
    <div class="filter-chip-row">
      ${chips.length ? chips.map((chip) => `
        <button type="button" class="filter-chip" data-filter-clear="${escapeHtml(chip.key)}" title="Remove ${escapeHtml(chip.label)}">
          <span>${escapeHtml(chip.label)}</span>
          <b aria-hidden="true">x</b>
        </button>
      `).join("") : `<span class="filter-chip is-empty">All regions, categories, and availability</span>`}
      <button type="button" class="filter-reset" data-filter-clear-all ${chips.length ? "" : "disabled"}>Reset</button>
    </div>
  `;

  root.querySelectorAll("[data-filter-clear]").forEach((button) => {
    button.addEventListener("click", () => clearMarketplaceFilter(button.dataset.filterClear));
  });
  const reset = root.querySelector("[data-filter-clear-all]");
  if (reset) reset.addEventListener("click", clearAllMarketplaceFilters);
}

function getMarketplaceFilterChips() {
  const chips = [];
  if (state.search) chips.push({ key: "search", label: `Search: ${state.search}` });
  if (state.region !== "all") chips.push({ key: "region", label: `Region: ${state.region}` });
  if (state.availability !== "all") {
    chips.push({
      key: "availability",
      label: state.availability === "available" ? "Availability: now" : "Availability: soon"
    });
  }
  if (state.category !== "all") chips.push({ key: "category", label: `Category: ${state.category}` });
  if (state.sort !== "available") chips.push({ key: "sort", label: `Sort: ${getSortLabel(state.sort)}` });
  return chips;
}

function getSortLabel(sort) {
  if (sort === "fit") return "buyer fit";
  if (sort === "verified") return "verified first";
  if (sort === "region") return "region A-Z";
  if (sort === "name") return "equipment A-Z";
  return "available first";
}

function clearMarketplaceFilter(key) {
  if (key === "search") state.search = "";
  if (key === "region") state.region = "all";
  if (key === "availability") state.availability = "all";
  if (key === "category") state.category = "all";
  if (key === "sort") state.sort = "available";
  saveState();
  syncFilterInputs();
  render();
  showToast("Marketplace filter removed.");
}

function clearAllMarketplaceFilters() {
  state.search = "";
  state.region = "all";
  state.availability = "all";
  state.category = "all";
  state.sort = "available";
  saveState();
  syncFilterInputs();
  render();
  showToast("Marketplace filters reset.");
}

function renderMarketplaceStats() {
  const filtered = getFilteredListings();
  const verifiedSuppliers = new Set(filtered.filter((listing) => listing.verified).map((listing) => listing.supplier));
  setText("#resultCount", String(filtered.length));
  setText("#verifiedCount", String(verifiedSuppliers.size));
  renderSearchRescue(filtered);
}

function renderMarketplaceSupplyLens() {
  const root = document.querySelector("#marketSupplyLens");
  if (!root) return;

  const model = getMarketplaceSupplyLensModel();
  root.innerHTML = `
    <div class="supply-lens-head">
      <span>Supply lens</span>
      <strong>${escapeHtml(model.title)}</strong>
      <small>${escapeHtml(model.detail)}</small>
    </div>
    <div class="supply-lens-groups">
      ${model.groups.map((group) => `
        <div class="supply-lens-group">
          <span>${escapeHtml(group.label)}</span>
          ${group.items.map((item) => `
            <button
              type="button"
              class="${item.active ? "is-active" : ""}"
              data-supply-lens="${escapeHtml(item.kind)}"
              data-lens-value="${escapeHtml(item.value)}"
            >
              <strong>${escapeHtml(item.label)}</strong>
              <small>${escapeHtml(item.detail)}</small>
              <b>${escapeHtml(item.count)}</b>
            </button>
          `).join("")}
        </div>
      `).join("")}
    </div>
  `;

  root.querySelectorAll("[data-supply-lens]").forEach((button) => {
    button.addEventListener("click", () => applyMarketplaceSupplyLens(button));
  });
}

function getMarketplaceSupplyLensModel() {
  const exact = getFilteredListings();
  const source = exact.length ? exact : getNearbyListings();
  const sourceLabel = exact.length ? "matching supply" : "nearby recovery supply";
  const regionItems = getSupplyLensCountItems(source, "region")
    .map((item) => ({
      ...item,
      kind: "region",
      active: state.region === item.value
    }));
  const categoryItems = getSupplyLensCountItems(source, "category")
    .map((item) => ({
      ...item,
      kind: "category",
      active: state.category === item.value
    }));
  const availableCount = source.filter((listing) => listing.availability === "available").length;
  const verifiedSupplierCount = new Set(source.filter((listing) => listing.verified).map((listing) => listing.supplier)).size;
  const proofItems = [
    {
      kind: "proof",
      value: "available",
      label: "Available now",
      count: String(availableCount),
      detail: "ready to enquire",
      active: state.availability === "available"
    },
    {
      kind: "proof",
      value: "verified",
      label: "Verified",
      count: String(verifiedSupplierCount),
      detail: "supplier proof",
      active: state.sort === "verified"
    },
    {
      kind: "proof",
      value: "gap",
      label: "Demand gaps",
      count: String(state.demandSignals.length),
      detail: "recruit supply",
      active: !exact.length
    }
  ];

  return {
    title: `${source.length} ${sourceLabel}`,
    detail: exact.length ? "Strongest visible supply paths for this result set." : "No exact match, so the lens shows nearby rescue paths.",
    groups: [
      { label: "Regions", items: regionItems },
      { label: "Categories", items: categoryItems },
      { label: "Trust", items: proofItems }
    ]
  };
}

function getSupplyLensCountItems(source, key) {
  const counts = source.reduce((map, listing) => {
    const value = listing[key];
    if (!value) return map;
    map.set(value, (map.get(value) || 0) + 1);
    return map;
  }, new Map());

  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 3)
    .map(([value, count]) => ({
      value,
      label: value,
      count: String(count),
      detail: count === 1 ? "1 listing" : `${count} listings`
    }));
}

function applyMarketplaceSupplyLens(button) {
  const kind = button.dataset.supplyLens;
  const value = button.dataset.lensValue;

  if (kind === "region") {
    state.region = value;
  }

  if (kind === "category") {
    state.category = value;
  }

  if (kind === "proof" && value === "available") {
    state.availability = "available";
    state.sort = "available";
  }

  if (kind === "proof" && value === "verified") {
    state.sort = "verified";
  }

  if (kind === "proof" && value === "gap") {
    const signal = getActiveDemandSignal();
    state.search = signal.equipment;
    state.region = signal.region;
    state.availability = "available";
    state.category = "all";
    state.sort = "verified";
  }

  const matches = getListingsForFilters(state);
  if (matches.length) state.selectedListingId = matches[0].id;
  saveState();
  syncFilterInputs();
  render();
  scrollToPageTarget(document.querySelector("#resultIntelligence"), 160);
  showToast("Supply lens applied.");
}

function renderMarketplaceIntelligence() {
  const root = document.querySelector("#resultIntelligence");
  if (!root) return;

  const model = getMarketplaceIntelligenceModel();
  root.innerHTML = `
    <div class="result-intelligence-card ${escapeHtml(model.statusClass)}">
      <div class="result-intelligence-copy">
        <span>${escapeHtml(model.status)}</span>
        <strong>${escapeHtml(model.headline)}</strong>
        <small>${escapeHtml(model.detail)}</small>
      </div>
      <div class="result-intelligence-metrics">
        ${model.metrics.map((metric) => `
          <b>
            <strong>${escapeHtml(metric.value)}</strong>
            <small>${escapeHtml(metric.label)}</small>
          </b>
        `).join("")}
      </div>
      <button type="button" class="result-intelligence-action" data-result-action="${escapeHtml(model.actionKind)}">
        ${escapeHtml(model.action)}
      </button>
    </div>
  `;

  const action = root.querySelector("[data-result-action]");
  if (action) action.addEventListener("click", () => handleMarketplaceIntelligenceAction(model));
}

function getMarketplaceIntelligenceModel() {
  const filtered = getFilteredListings();
  const nearby = filtered.length ? [] : getNearbyListings();
  const activeView = marketplaceSmartViews.find((view) => view.id === getActiveSmartViewId());
  const availableCount = filtered.filter((listing) => listing.availability === "available").length;
  const verifiedSupplierCount = new Set(filtered.filter((listing) => listing.verified).map((listing) => listing.supplier)).size;
  const supplierCount = new Set(filtered.map((listing) => listing.supplier)).size;
  const nearbyVerifiedCount = new Set(nearby.filter((listing) => listing.verified).map((listing) => listing.supplier)).size;
  const selected = filtered[0] || nearby[0] || getSelectedListing();
  const equipment = getDemandEquipmentFromSearch();
  const region = state.region === "all" ? "all regions" : state.region;
  const viewLabel = activeView?.label || (getMarketplaceFilterChips().length ? "Custom view" : "All marketplace");

  if (!filtered.length) {
    return {
      status: "Demand signal",
      statusClass: "is-gap",
      headline: `No exact ${equipment.toLowerCase()} supply in ${region}.`,
      detail: `${viewLabel} should become a supplier recruitment signal before the buyer leaves the marketplace.`,
      action: "Capture demand",
      actionKind: "demand",
      selectedListingId: selected?.id || "",
      metrics: [
        { value: "0", label: "exact listings" },
        { value: String(nearby.length), label: "nearby options" },
        { value: String(nearbyVerifiedCount), label: "verified nearby" }
      ]
    };
  }

  if (availableCount) {
    return {
      status: "Supply ready",
      statusClass: "is-ready",
      headline: `${filtered.length} listing${filtered.length === 1 ? "" : "s"} found across ${supplierCount} supplier${supplierCount === 1 ? "" : "s"}.`,
      detail: `${viewLabel} has live inventory. Keep the buyer moving toward the direct enquiry packet.`,
      action: "Open best match",
      actionKind: "listing",
      selectedListingId: selected?.id || "",
      metrics: [
        { value: String(availableCount), label: "available now" },
        { value: String(verifiedSupplierCount), label: "verified suppliers" },
        { value: "0%", label: "commission" }
      ]
    };
  }

  return {
    status: "Supply watch",
    statusClass: "is-watch",
    headline: `${filtered.length} matching listing${filtered.length === 1 ? "" : "s"}, but none marked available now.`,
    detail: `${viewLabel} is still useful. Show the closest supplier and ask for confirmed availability.`,
    action: "Open closest match",
    actionKind: "listing",
    selectedListingId: selected?.id || "",
    metrics: [
      { value: String(filtered.length), label: "matching listings" },
      { value: String(verifiedSupplierCount), label: "verified suppliers" },
      { value: "Call", label: "availability check" }
    ]
  };
}

function handleMarketplaceIntelligenceAction(model) {
  if (model.actionKind === "demand") {
    prepareDemandFromSearch();
    const target = document.querySelector("#demandRequest");
    if (target) {
      if (window.location.hash !== "#demandRequest") window.location.hash = "#demandRequest";
      scrollToPageTarget(target);
    }
    window.setTimeout(() => {
      const field = document.querySelector("#demandEquipment");
      if (field) field.focus();
    }, 260);
    showToast("Demand capture opened from Result Intelligence.");
    return;
  }

  if (model.selectedListingId) {
    state.selectedListingId = model.selectedListingId;
    saveState();
    render();
  }

  const target = document.querySelector("#leadTitle");
  if (target) target.scrollIntoView({ behavior: "smooth", block: "center" });
  showToast("Best matching supplier packet opened.");
}

function getNearbyListings() {
  const query = state.search.toLowerCase();
  return listings
    .map((listing) => {
      const searchable = [listing.name, listing.category, listing.supplier, listing.region, listing.city, listing.specs].join(" ").toLowerCase();
      let score = 0;
      if (query && searchable.includes(query)) score += 6;
      if (state.region !== "all" && listing.region === state.region) score += 4;
      if (state.category !== "all" && listing.category === state.category) score += 3;
      if (state.availability !== "all" && listing.availability === state.availability) score += 2;
      if (listing.verified) score += 1;
      return { listing, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.listing.name.localeCompare(b.listing.name))
    .slice(0, 3)
    .map((item) => item.listing);
}

function renderSearchRescue(filtered = getFilteredListings()) {
  const container = document.querySelector("#searchRescue");
  if (filtered.length) {
    container.innerHTML = "";
    return;
  }

  const suggestions = getSearchRescueSuggestions();
  const equipment = getDemandEquipmentFromSearch();
  const region = state.region === "all" ? "any region" : state.region;
  const availability = state.availability === "available" ? "available now" : state.availability === "soon" ? "available soon" : "any availability";

  container.innerHTML = `
    <div class="rescue-head">
      <span>Smart Match Rescue</span>
      <strong>No exact ${escapeHtml(equipment.toLowerCase())} match in ${escapeHtml(region)} for ${escapeHtml(availability)}.</strong>
      <p>Heavyster can recover the search, show closest options, or convert this into a supplier recruitment signal.</p>
    </div>
    <div class="rescue-actions">
      <button type="button" data-rescue-action="availability">Show any availability</button>
      <button type="button" data-rescue-action="request">Capture demand</button>
      <button type="button" data-rescue-action="hunt">Open supplier hunt</button>
    </div>
    <div class="rescue-suggestions">
      ${suggestions.length ? suggestions.map((item) => `
        <button type="button" data-rescue-id="${escapeHtml(item.listing.id)}">
          <strong>${escapeHtml(item.listing.name)}</strong>
          <span>${escapeHtml(item.reason)}</span>
        </button>
      `).join("") : `<span>Add supplier inventory to improve rescue suggestions.</span>`}
    </div>
  `;

  bindSearchRescue(container);
}

function getSearchRescueSuggestions() {
  const query = state.search.toLowerCase();
  return listings
    .map((listing) => {
      const searchable = [listing.name, listing.category, listing.supplier, listing.region, listing.city, listing.specs].join(" ").toLowerCase();
      const queryMatch = Boolean(query && searchable.includes(query));
      let score = 0;
      if (queryMatch) score += 8;
      if (state.region !== "all" && listing.region === state.region) score += 5;
      if (state.availability !== "all" && listing.availability === state.availability) score += 3;
      if (listing.verified) score += 2;
      if (listing.availability === "soon") score += 1;
      const reasons = [];
      if (queryMatch) reasons.push("equipment match");
      if (state.region !== "all") reasons.push(listing.region === state.region ? `${listing.region} market` : `${listing.region} alternative`);
      if (state.availability !== "all") reasons.push(listing.availability === state.availability ? "available now" : listing.availability === "soon" ? "available soon" : "different availability");
      if (listing.verified) reasons.push("verified supplier");
      return {
        listing,
        queryMatch,
        score,
        reason: `${listing.supplier} - ${listing.city}, ${listing.region}; ${reasons.join(", ")}`
      };
    })
    .filter((item) => item.score > 0 && (!query || item.queryMatch))
    .sort((a, b) => b.score - a.score || a.listing.name.localeCompare(b.listing.name))
    .slice(0, 3);
}

function bindSearchRescue(container) {
  container.querySelectorAll("[data-rescue-action]").forEach((button) => {
    button.addEventListener("click", () => {
      if (button.dataset.rescueAction === "availability") {
        state.availability = "all";
        saveState();
        syncFilterInputs();
        render();
        showToast("Showing any availability for this search.");
        return;
      }
      prepareDemandFromSearch();
      saveDemandSignal(button.dataset.rescueAction === "hunt" ? "Smart rescue supplier hunt" : "Smart rescue demand", false);
      const target = button.dataset.rescueAction === "hunt" ? "#growth" : "#demandRequest";
      document.querySelector(target).scrollIntoView({ behavior: "smooth", block: "start" });
      showToast(button.dataset.rescueAction === "hunt" ? "Demand signal added to supplier hunt." : "Demand signal captured.");
    });
  });

  container.querySelectorAll("[data-rescue-id]").forEach((button) => {
    button.addEventListener("click", () => {
      const listing = listings.find((item) => item.id === button.dataset.rescueId);
      if (!listing) return;
      state.selectedListingId = listing.id;
      state.availability = "all";
      if (state.region !== "all" && listing.region !== state.region) state.region = listing.region;
      saveState();
      syncFilterInputs();
      render();
      document.querySelector("#leadTitle").scrollIntoView({ behavior: "smooth", block: "center" });
      showToast("Closest match opened.");
    });
  });
}

function renderNoResultsAdvisor() {
  const nearby = getNearbyListings();
  const searchLabel = state.search ? ` for "${escapeHtml(state.search)}"` : "";
  return `
    <div class="empty-advisor">
      <div>
        <p class="eyebrow">No exact match</p>
        <h3>No listings match${searchLabel} with the current filters.</h3>
        <p>Heavyster should help buyers recover instead of ending the search. Try nearby matches or relax one filter.</p>
      </div>
      <div class="empty-actions">
        <button type="button" data-empty-action="request">Save this demand</button>
        <button type="button" data-empty-action="availability">Show any availability</button>
        <button type="button" data-empty-action="region">Show all regions</button>
        <button type="button" data-empty-action="clear">Clear search</button>
      </div>
      <div class="nearby-list">
        ${nearby.length ? nearby.map((listing) => `
          <button type="button" data-nearby-id="${escapeHtml(listing.id)}">
            <strong>${escapeHtml(listing.name)}</strong>
            <span>${escapeHtml(listing.city)}, ${escapeHtml(listing.region)} - ${listing.availability === "available" ? "Available" : "Available soon"}</span>
          </button>
        `).join("") : "<span>No nearby demo listings yet. Add more supplier inventory to improve recovery.</span>"}
      </div>
    </div>
  `;
}

function bindNoResultsAdvisor(container) {
  container.querySelectorAll("[data-empty-action]").forEach((button) => {
    button.addEventListener("click", () => {
      if (button.dataset.emptyAction === "request") {
        prepareDemandFromSearch();
        saveDemandSignal("No-result search", false);
        document.querySelector("#demandRequest").scrollIntoView({ behavior: "smooth", block: "center" });
        window.setTimeout(() => document.querySelector("#demandEquipment").focus(), 260);
        return;
      }
      if (button.dataset.emptyAction === "availability") state.availability = "all";
      if (button.dataset.emptyAction === "region") state.region = "all";
      if (button.dataset.emptyAction === "clear") state.search = "";
      saveState();
      syncFilterInputs();
      render();
    });
  });

  container.querySelectorAll("[data-nearby-id]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedListingId = button.dataset.nearbyId;
      state.availability = "all";
      saveState();
      syncFilterInputs();
      render();
    });
  });
}

function syncFilterInputs() {
  document.querySelector("#equipmentSearch").value = state.search;
  document.querySelector("#regionFilter").value = state.region;
  document.querySelector("#availabilityFilter").value = state.availability;
  const sortFilter = document.querySelector("#sortFilter");
  if (sortFilter) sortFilter.value = state.sort;
}

function renderCatalog() {
  renderListings();
  renderCompactCatalog();
  setText("#catalogSummary", `${getFilteredListings().length} listings loaded - ready for paged catalog growth`);
  document.querySelector("#viewToggleButton").textContent = state.compactView ? "Card view" : "Compact rows";
  document.querySelector(".catalog-panel").classList.toggle("is-compact", state.compactView);
}

function renderListings() {
  const filtered = getFilteredListings();
  const grid = document.querySelector("#listingGrid");

  if (!filtered.length) {
    grid.innerHTML = renderNoResultsAdvisor();
    bindNoResultsAdvisor(grid);
    return;
  }

  grid.innerHTML = filtered.map((listing) => {
    const pillClass = listing.availability === "available" ? "good" : "wait";
    const isSaved = state.shortlistIds.includes(listing.id);
    const fit = getBuyerFitScore(listing);
    return `
      <button type="button" class="listing-card ${listing.id === state.selectedListingId ? "is-selected" : ""}" data-listing-id="${escapeHtml(listing.id)}">
        <span class="machine-art" aria-hidden="true"></span>
        <span class="listing-top">
          <span>
            <strong>${escapeHtml(listing.name)}</strong>
            <p>${escapeHtml(listing.supplier)} - ${escapeHtml(listing.city)}, ${escapeHtml(listing.region)}</p>
          </span>
          <span class="listing-pills">
            <span class="pill ${pillClass}">${listing.availability === "available" ? "Available" : "Soon"}</span>
            ${isSaved ? `<span class="pill good">Saved</span>` : ""}
          </span>
        </span>
        <p>${escapeHtml(listing.specs)}</p>
        <span class="listing-fit ${fit.score >= 84 ? "is-strong" : fit.score >= 68 ? "is-good" : "is-watch"}">
          <strong>${fit.score}/100 fit</strong>
          <small>${escapeHtml(fit.summary || fit.status)}</small>
        </span>
        <span class="pill">${escapeHtml(listing.category)} - ${escapeHtml(listing.rate)}</span>
      </button>
    `;
  }).join("");

  grid.querySelectorAll(".listing-card").forEach((card) => {
    card.addEventListener("click", () => {
      state.selectedListingId = card.dataset.listingId;
      saveState();
      render();
    });
  });
}

function renderCompactCatalog() {
  const filtered = getFilteredListings();
  const rows = document.querySelector("#compactCatalog");
  if (!filtered.length) {
    rows.innerHTML = renderNoResultsAdvisor();
    bindNoResultsAdvisor(rows);
    return;
  }

  rows.innerHTML = `
    <div class="compact-row compact-head">
      <span>Equipment</span>
      <span>Supplier</span>
      <span>Region</span>
      <span>Fit</span>
      <span>Status</span>
      <span>Action</span>
    </div>
    ${filtered.map((listing) => {
      const fit = getBuyerFitScore(listing);
      return `
        <button type="button" class="compact-row ${listing.id === state.selectedListingId ? "is-selected" : ""}" data-listing-id="${escapeHtml(listing.id)}">
          <span><strong>${escapeHtml(listing.name)}</strong><small>${escapeHtml(listing.category)}</small></span>
          <span>${escapeHtml(listing.supplier)}</span>
          <span>${escapeHtml(listing.city)}, ${escapeHtml(listing.region)}</span>
          <span><strong>${fit.score}/100</strong><small>${escapeHtml(fit.status)}</small></span>
          <span>${state.shortlistIds.includes(listing.id) ? "Saved" : listing.verified ? "Verified" : "Review"}</span>
          <span>${listing.availability === "available" ? "Enquire" : "Watch"}</span>
        </button>
      `;
    }).join("")}
  `;

  rows.querySelectorAll("button.compact-row").forEach((row) => {
    row.addEventListener("click", () => {
      state.selectedListingId = row.dataset.listingId;
      saveState();
      render();
    });
  });
}

function renderLeadPacket() {
  const listing = getSelectedListing();
  const fit = getBuyerFitScore(listing);
  const status = listing.verified ? "Verified supplier" : "Needs verification";
  setText("#selectedListingStatus", status);
  document.querySelector("#selectedListingStatus").classList.toggle("good", listing.verified);
  document.querySelector("#selectedListingStatus").classList.toggle("wait", !listing.verified);

  document.querySelector("#leadPacket").innerHTML = `
    <div>
      <span>Buyer fit</span>
      <strong>${fit.score}/100 - ${escapeHtml(fit.status)}</strong>
    </div>
    <div>
      <span>Equipment</span>
      <strong>${escapeHtml(listing.name)}</strong>
    </div>
    <div>
      <span>Supplier</span>
      <strong>${escapeHtml(listing.supplier)}</strong>
    </div>
    <div>
      <span>Location</span>
      <strong>${escapeHtml(listing.city)}, ${escapeHtml(listing.region)}</strong>
    </div>
    <div>
      <span>Documents shown</span>
      <strong>${escapeHtml(listing.documents.join(", "))}</strong>
    </div>
  `;
}

function renderEquipmentDetail() {
  const listing = getSelectedListing();
  const fit = getBuyerFitScore(listing);
  document.querySelector("#equipmentDetail").innerHTML = `
    <div class="detail-title">
      <strong>${escapeHtml(listing.id)}</strong>
      <span>${escapeHtml(listing.category)}</span>
    </div>
    <div class="detail-spec-grid">
      <span><strong>Specs</strong>${escapeHtml(listing.specs)}</span>
      <span><strong>Commercial</strong>${escapeHtml(listing.rate)} - renter pays supplier direct</span>
      <span><strong>Availability</strong>${listing.availability === "available" ? "Available now" : "Available soon"}</span>
      <span><strong>Verification</strong>${listing.verified ? "Supplier verified" : "Founder review needed"}</span>
    </div>
    <div class="fit-explainer">
      <strong>${fit.score}/100 buyer fit</strong>
      <span>${escapeHtml(fit.summary || "Useful match for the current marketplace context.")}</span>
    </div>
  `;
}

function renderSupplierResponseRoute() {
  const root = document.querySelector("#responseRoute");
  if (!root) return;

  const model = getSupplierResponseRouteModel();
  root.innerHTML = `
    <div class="response-route-head">
      <span>Supplier response route</span>
      <strong>${model.score}/100 - ${escapeHtml(model.status)}</strong>
      <small>${escapeHtml(model.summary)}</small>
    </div>
    <div class="response-route-metrics">
      <span><strong>${escapeHtml(model.primaryChannel)}</strong>first route</span>
      <span><strong>${escapeHtml(model.responseTarget)}</strong>response target</span>
      <span><strong>${escapeHtml(model.followUp)}</strong>follow-up</span>
    </div>
    <div class="response-route-steps">
      ${model.steps.map((step, index) => `
        <span class="${step.ready ? "is-ready" : "is-watch"}">
          <b>${index + 1}</b>
          <strong>${escapeHtml(step.label)}</strong>
          <small>${escapeHtml(step.detail)}</small>
        </span>
      `).join("")}
    </div>
  `;
}

function getSupplierResponseRouteModel() {
  const listing = getSelectedListing();
  const profile = getSupplierProfile(listing.supplier);
  const composer = getDirectEnquiryModel();
  const responseHours = getResponseTargetHours(profile.response);
  const channel = getPreferredSupplierChannel(listing, composer.mode);
  const backupChannel = channel === "WhatsApp" ? "Email" : "WhatsApp";
  const followUp = responseHours <= 2
    ? "2 hours"
    : responseHours <= 4
      ? "4 hours"
      : responseHours <= 8
        ? "same day"
        : "next business day";
  const responseScore = Math.max(20, 100 - Math.max(0, responseHours - 1) * 6);
  const score = Math.min(100, Math.round(
    composer.score * 0.44
    + responseScore * 0.28
    + (listing.verified ? 12 : 4)
    + (listing.availability === "available" ? 10 : 5)
    + (profile.proof.length >= 3 ? 6 : 2)
  ));
  const status = score >= 86 ? "Fast response path" : score >= 70 ? "Managed response path" : "Needs founder chase";
  const summary = `${profile.supplier} targets ${profile.response.toLowerCase()} replies via ${channel.toLowerCase()} first.`;
  const steps = [
    {
      label: `Send by ${channel}`,
      ready: composer.score >= 70,
      detail: `${composer.status}; include project note and selected listing.`
    },
    {
      label: `Backup by ${backupChannel}`,
      ready: profile.proof.length >= 3,
      detail: `Attach proof request and direct contact route if ${channel.toLowerCase()} is quiet.`
    },
    {
      label: `Chase after ${followUp}`,
      ready: score >= 70,
      detail: "Ask for availability, rate, operator, documents, and quote validity before dispatch."
    }
  ];

  return {
    listing,
    profile,
    composer,
    primaryChannel: channel,
    backupChannel,
    responseTarget: profile.response,
    responseHours,
    followUp,
    score,
    status,
    summary,
    steps
  };
}

function getPreferredSupplierChannel(listing, mode) {
  if (mode === "quote") return "Email";
  if (listing.region === "UAE" || listing.region === "India") return "WhatsApp";
  if (listing.availability === "available") return "Phone";
  return "Email";
}

function getResponseTargetHours(responseText) {
  const text = String(responseText || "").toLowerCase();
  const underMatch = text.match(/under\s+(\d+)/);
  if (underMatch) return Number(underMatch[1]);
  if (text.includes("next business hour")) return 1;
  if (text.includes("same day")) return 8;
  if (text.includes("confirm")) return 24;
  return 12;
}

function renderResponseTracker() {
  const root = document.querySelector("#responseTracker");
  if (!root) return;

  const model = getResponseTrackerModel();
  root.innerHTML = `
    <div class="response-tracker-head">
      <span>Response tracker</span>
      <strong>${escapeHtml(model.statusLabel)}</strong>
      <small>${escapeHtml(model.summary)}</small>
    </div>
    <div class="response-tracker-metrics">
      ${model.metrics.map((metric) => `
        <span>
          <strong>${escapeHtml(metric.value)}</strong>
          ${escapeHtml(metric.label)}
        </span>
      `).join("")}
    </div>
    <div class="response-tracker-actions">
      ${model.actions.map((action) => `
        <button type="button" class="${action.kind === "primary" ? "solid-button" : "ghost-button"}" data-response-action="${escapeHtml(action.action)}">
          ${escapeHtml(action.label)}
        </button>
      `).join("")}
    </div>
  `;

  root.querySelectorAll("[data-response-action]").forEach((button) => {
    button.addEventListener("click", () => handleResponseTrackerAction(button.dataset.responseAction));
  });
}

function getResponseTrackerModel(now = new Date()) {
  const listing = getSelectedListing();
  const route = getSupplierResponseRouteModel();
  const record = getResponseTrackerRecord(listing.id);
  const status = record.status || "draft";
  const dueLabel = getTrackerDueLabel(record.followUpAt, now);
  const routeLabel = `${route.primaryChannel} / ${route.backupChannel}`;
  const sentLabel = record.sentAt ? formatTrackerTime(record.sentAt) : record.copiedAt ? "Copied only" : "Not sent";
  const replyLabel = record.replyAt ? formatTrackerTime(record.replyAt) : "No reply yet";
  let statusLabel = "Draft enquiry";
  let summary = `Copy the enquiry, then send through ${route.primaryChannel.toLowerCase()} first.`;
  const actions = [];

  if (status === "copied") {
    statusLabel = "Copied, ready to send";
    summary = `Send by ${route.primaryChannel.toLowerCase()}, then chase after ${route.followUp}.`;
    actions.push({ action: "sent", label: "Mark sent", kind: "primary" });
  } else if (status === "sent") {
    const isDue = record.followUpAt && new Date(record.followUpAt).getTime() <= now.getTime();
    statusLabel = isDue ? "Follow up now" : "Waiting for supplier";
    summary = isDue
      ? `Follow up by ${route.backupChannel.toLowerCase()} and ask for availability, rate, and quote validity.`
      : `Waiting on ${route.profile.supplier}; next chase ${dueLabel}.`;
    actions.push({ action: "replied", label: "Mark replied", kind: "primary" });
    actions.push({ action: "followup", label: "Log follow-up", kind: "secondary" });
  } else if (status === "replied") {
    statusLabel = "Supplier replied";
    summary = "Move the reply into RFQ, Quote Guard, or Mobilization before dispatch.";
    actions.push({ action: "sent", label: "Reopen chase", kind: "secondary" });
  } else {
    actions.push({ action: "sent", label: "Mark sent", kind: "primary" });
  }

  actions.push({ action: "reset", label: "Reset", kind: "secondary" });

  return {
    listing,
    route,
    record,
    status,
    statusLabel,
    summary,
    metrics: [
      { label: "route", value: routeLabel },
      { label: "sent", value: sentLabel },
      { label: "next chase", value: status === "sent" ? dueLabel : route.followUp },
      { label: "reply", value: replyLabel }
    ],
    actions
  };
}

function getResponseTrackerRecord(listingId) {
  const record = state.responseTracker || {};
  if (record.listingId === listingId) return { ...defaultState().responseTracker, ...record };
  return { ...defaultState().responseTracker, listingId, status: "draft" };
}

function markEnquiryCopied() {
  const listing = getSelectedListing();
  const current = getResponseTrackerRecord(listing.id);
  const protectedStatus = current.status === "sent" || current.status === "replied";
  state.responseTracker = {
    ...current,
    listingId: listing.id,
    status: protectedStatus ? current.status : "copied",
    copiedAt: new Date().toISOString()
  };
  saveState();
  renderResponseTracker();
  renderReplyQualityGate();
  renderReplyClarifier();
  renderDecisionReceipt();
  renderDecisionRouter();
  renderListingRoiProof();
  renderSupplierRenewalClosePack();
}

function handleResponseTrackerAction(action) {
  const listing = getSelectedListing();
  const route = getSupplierResponseRouteModel();
  const current = getResponseTrackerRecord(listing.id);
  const now = new Date();

  if (action === "reset") {
    state.responseTracker = { ...defaultState().responseTracker, listingId: listing.id };
    saveState();
    renderResponseTracker();
    renderReplyQualityGate();
    renderReplyClarifier();
    renderDecisionReceipt();
    renderDecisionRouter();
    renderListingRoiProof();
    renderSupplierRenewalClosePack();
    showToast("Response tracker reset.");
    return;
  }

  if (action === "sent") {
    const followUpAt = addHours(now, Math.max(1, route.responseHours)).toISOString();
    state.responseTracker = {
      ...current,
      listingId: listing.id,
      status: "sent",
      sentAt: current.sentAt || now.toISOString(),
      followUpAt,
      replyAt: ""
    };
    saveState();
    renderResponseTracker();
    renderReplyQualityGate();
    renderReplyClarifier();
    renderDecisionReceipt();
    renderDecisionRouter();
    renderListingRoiProof();
    renderSupplierRenewalClosePack();
    showToast(`Supplier chase set for ${route.followUp}.`);
    return;
  }

  if (action === "followup") {
    state.responseTracker = {
      ...current,
      listingId: listing.id,
      status: "sent",
      followUpAt: addHours(now, Math.max(1, route.responseHours)).toISOString()
    };
    saveState();
    renderResponseTracker();
    renderReplyQualityGate();
    renderReplyClarifier();
    renderDecisionReceipt();
    renderDecisionRouter();
    renderListingRoiProof();
    renderSupplierRenewalClosePack();
    showToast("Follow-up logged and next chase reset.");
    return;
  }

  if (action === "replied") {
    state.responseTracker = {
      ...current,
      listingId: listing.id,
      status: "replied",
      replyAt: now.toISOString()
    };
    saveState();
    renderResponseTracker();
    renderReplyQualityGate();
    renderReplyClarifier();
    renderDecisionReceipt();
    renderDecisionRouter();
    renderListingRoiProof();
    renderSupplierRenewalClosePack();
    showToast("Supplier reply recorded.");
  }
}

function addHours(date, hours) {
  return new Date(date.getTime() + hours * 60 * 60 * 1000);
}

function formatTrackerTime(value) {
  if (!value) return "Not set";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Not set";
  return `${date.toLocaleDateString(undefined, { month: "short", day: "numeric" })} ${date.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })}`;
}

function getTrackerDueLabel(value, now = new Date()) {
  if (!value) return "Not set";
  const due = new Date(value);
  if (Number.isNaN(due.getTime())) return "Not set";
  const delta = due.getTime() - now.getTime();
  if (delta <= 0) return "due now";
  const minutes = Math.ceil(delta / 60000);
  if (minutes < 60) return `in ${minutes} min`;
  const hours = Math.ceil(minutes / 60);
  if (hours < 24) return `in ${hours} hr`;
  const days = Math.ceil(hours / 24);
  return `in ${days} day${days === 1 ? "" : "s"}`;
}

function renderReplyQualityGate() {
  const root = document.querySelector("#replyQualityGate");
  if (!root) return;

  const model = getReplyQualityGateModel();
  root.innerHTML = `
    <div class="reply-quality-head">
      <span>Reply quality gate</span>
      <strong>${model.score}/100 - ${escapeHtml(model.status)}</strong>
      <small>${escapeHtml(model.summary)}</small>
    </div>
    <div class="reply-quality-gates">
      ${model.gates.map((gate) => `
        <span class="${gate.ready ? "is-ready" : "is-gap"}">
          <strong>${escapeHtml(gate.label)}</strong>
          <small>${escapeHtml(gate.detail)}</small>
        </span>
      `).join("")}
    </div>
    <div class="reply-quality-next">
      <strong>${escapeHtml(model.nextAction)}</strong>
      <span>${escapeHtml(model.nextDetail)}</span>
    </div>
  `;
}

function getReplyQualityGateModel() {
  const listing = getSelectedListing();
  const tracker = getResponseTrackerModel();
  const quote = getQuoteGuardModel();
  const passport = getTrustPassport(listing);
  const route = getSupplierResponseRouteModel();
  const hasReply = tracker.status === "replied";
  const availabilityReady = hasReply && listing.availability === "available";
  const quoteReady = hasReply && quote.score >= 74;
  const operatorReady = hasReply && (state.quoteIncludes.operator || /operator|crew|supervisor/i.test(listing.specs));
  const documentReady = hasReply && passport.score >= 74;
  const validityReady = hasReply && state.quoteIncludes.validity;
  const routeReady = hasReply && route.score >= 70;
  const gates = [
    {
      label: "Availability",
      ready: availabilityReady,
      detail: availabilityReady ? "Supplier reply can support a live rental path." : "Confirm current machine availability."
    },
    {
      label: "Rate terms",
      ready: quoteReady,
      detail: quoteReady ? `${quote.score}/100 quote clarity.` : "Clarify rate, inclusions, and exclusions."
    },
    {
      label: "Operator",
      ready: operatorReady,
      detail: operatorReady ? "Operator or crew path is visible." : "Ask whether operator, crew, or supervisor is included."
    },
    {
      label: "Documents",
      ready: documentReady,
      detail: documentReady ? `${passport.score}/100 trust proof.` : "Confirm insurance, inspection, license, or load proof."
    },
    {
      label: "Validity",
      ready: validityReady,
      detail: validityReady ? "Quote validity is requested." : "Ask how long the quote is valid."
    },
    {
      label: "Direct payment",
      ready: routeReady,
      detail: routeReady ? "Contact route and direct payment rule are clear." : "Confirm best direct payment/contact route."
    }
  ];
  const readyCount = gates.filter((gate) => gate.ready).length;
  const baseScore = Math.round((readyCount / gates.length) * 100);
  const score = hasReply ? Math.round(baseScore * 0.7 + quote.score * 0.18 + passport.score * 0.12) : Math.min(48, tracker.status === "sent" ? 44 : tracker.status === "copied" ? 36 : 24);
  const status = !hasReply
    ? "Awaiting supplier reply"
    : score >= 86
      ? "Move forward"
      : score >= 68
        ? "Clarify before award"
        : "Hold and chase";
  const summary = hasReply
    ? `${readyCount}/${gates.length} reply gates are ready for ${listing.supplier}.`
    : `${tracker.statusLabel}; reply quality can be scored after the supplier answers.`;
  const nextAction = !hasReply
    ? "Wait for reply or chase on schedule"
    : score >= 86
      ? "Move into Quote Guard and Mobilization"
      : score >= 68
        ? "Send clarification before award"
        : "Hold dispatch until supplier closes gaps";
  const nextDetail = !hasReply
    ? `Use ${route.primaryChannel} first and ${route.backupChannel} if the supplier misses the ${route.followUp} follow-up window.`
    : gates.filter((gate) => !gate.ready).slice(0, 2).map((gate) => gate.label).join(" and ") || "Reply is clean enough for the buyer workbench.";

  return {
    listing,
    tracker,
    quote,
    passport,
    route,
    hasReply,
    gates,
    readyCount,
    score,
    status,
    summary,
    nextAction,
    nextDetail
  };
}

function renderReplyClarifier() {
  const root = document.querySelector("#replyClarifier");
  if (!root) return;

  const model = getReplyClarifierModel();
  root.innerHTML = `
    <div class="reply-clarifier-head">
      <span>Reply clarifier</span>
      <strong>${escapeHtml(model.title)}</strong>
      <small>${escapeHtml(model.summary)}</small>
    </div>
    <div class="reply-clarifier-metrics">
      <span><strong>${escapeHtml(model.channel)}</strong>channel</span>
      <span><strong>${escapeHtml(model.urgency)}</strong>timing</span>
      <span><strong>${escapeHtml(model.focus)}</strong>focus</span>
    </div>
    <div class="reply-clarifier-message">
      ${buildReplyClarifierText(model)
        .split("\n")
        .filter(Boolean)
        .map((line) => `<p>${escapeHtml(line)}</p>`)
        .join("")}
    </div>
    <button type="button" class="ghost-button" data-reply-clarifier-copy>Copy supplier follow-up</button>
  `;

  root.querySelector("[data-reply-clarifier-copy]").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(buildReplyClarifierText());
      showToast("Supplier follow-up copied.");
    } catch {
      showToast("Copy is blocked here, but the supplier follow-up is visible.");
    }
  });
}

function getReplyClarifierModel() {
  const quality = getReplyQualityGateModel();
  const missingGates = quality.gates.filter((gate) => !gate.ready);
  const missingLabels = missingGates.map((gate) => gate.label);
  const mode = !quality.hasReply
    ? "chase"
    : missingGates.length
      ? "clarify"
      : "handoff";
  const channel = mode === "chase"
    ? `${quality.route.primaryChannel} then ${quality.route.backupChannel}`
    : quality.route.primaryChannel === "Phone"
      ? "Phone + written note"
      : quality.route.primaryChannel;
  const title = mode === "chase"
    ? "Chase before the buyer cools"
    : mode === "clarify"
      ? "Clean the reply before award"
      : "Reply is handoff-ready";
  const summary = mode === "chase"
    ? `${quality.listing.supplier} has not replied yet; send a tight chase that asks for the missing commercial proof.`
    : mode === "clarify"
      ? `${missingLabels.join(", ")} still need confirmation before the buyer should rely on the reply.`
      : `${quality.listing.supplier} has enough reply clarity for the next buyer workflow.`;
  const focus = mode === "handoff"
    ? "ready"
    : missingLabels.slice(0, 2).join(" + ") || "reply";
  const urgency = mode === "chase"
    ? quality.route.followUp
    : mode === "clarify"
      ? "before award"
      : "same day";

  return {
    ...quality,
    mode,
    missingGates,
    missingLabels,
    channel,
    title,
    summary,
    focus,
    urgency
  };
}

function renderDecisionReceipt() {
  const root = document.querySelector("#decisionReceipt");
  if (!root) return;

  const model = getDecisionReceiptModel();
  root.innerHTML = `
    <div class="decision-receipt-head">
      <span>Decision receipt</span>
      <strong>${model.score}/100 - ${escapeHtml(model.status)}</strong>
      <small>${escapeHtml(model.summary)}</small>
    </div>
    <div class="decision-receipt-metrics">
      <span><strong>${model.fit.score}/100</strong>buyer fit</span>
      <span><strong>${model.quality.readyCount}/${model.quality.gates.length}</strong>reply gates</span>
      <span><strong>${escapeHtml(model.paymentRuleShort)}</strong>payment</span>
    </div>
    <div class="decision-receipt-evidence">
      ${model.evidence.map((item) => `
        <span class="${item.ready ? "is-ready" : "is-watch"}">
          <strong>${escapeHtml(item.label)}</strong>
          <small>${escapeHtml(item.detail)}</small>
        </span>
      `).join("")}
    </div>
    <div class="decision-receipt-next">
      <strong>${escapeHtml(model.nextAction)}</strong>
      <span>${escapeHtml(model.nextDetail)}</span>
    </div>
    <button type="button" class="ghost-button" data-decision-receipt-copy>Copy decision receipt</button>
  `;

  root.querySelector("[data-decision-receipt-copy]").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(buildDecisionReceiptText());
      showToast("Buyer decision receipt copied.");
    } catch {
      showToast("Copy is blocked here, but the decision receipt is visible.");
    }
  });
}

function getDecisionReceiptModel() {
  const listing = getSelectedListing();
  const fit = getBuyerFitScore(listing);
  const passport = getTrustPassport(listing);
  const quote = getQuoteGuardModel();
  const quality = getReplyQualityGateModel();
  const clarifier = getReplyClarifierModel();
  const route = getSupplierResponseRouteModel();
  const missingLabels = quality.gates.filter((gate) => !gate.ready).map((gate) => gate.label);
  const availabilityBonus = listing.availability === "available" ? 6 : 2;
  const replyBonus = quality.hasReply ? 6 : 0;
  const score = Math.max(0, Math.min(100, Math.round(
    fit.score * 0.18
    + passport.score * 0.2
    + quote.score * 0.2
    + quality.score * 0.24
    + route.score * 0.12
    + availabilityBonus
    + replyBonus
  )));
  const status = !quality.hasReply
    ? "Waiting on supplier"
    : score >= 86 && missingLabels.length === 0
      ? "Decision-ready"
      : score >= 70
        ? "Proceed with controls"
        : "Hold decision";
  const paymentRule = "Buyer pays rental company directly; Heavyster provides listing, proof, reply, and decision workflow only.";
  const evidence = [
    {
      label: "Equipment fit",
      ready: fit.score >= 70,
      detail: `${fit.score}/100 buyer fit for the current search and selected machine.`
    },
    {
      label: "Supplier proof",
      ready: passport.score >= 74,
      detail: `${passport.score}/100 Trust Passport; ${passport.verdict}.`
    },
    {
      label: "Reply completeness",
      ready: quality.hasReply && missingLabels.length <= 1,
      detail: quality.hasReply ? `${quality.readyCount}/${quality.gates.length} reply gates ready.` : "Supplier reply has not been recorded yet."
    },
    {
      label: "Commercial clarity",
      ready: quote.score >= 74,
      detail: `${quote.score}/100 Quote Guard; ${quote.missingCount} unclear term${quote.missingCount === 1 ? "" : "s"}.`
    },
    {
      label: "Direct payment",
      ready: true,
      detail: "Rental payment remains directly between renter and rental company."
    }
  ];
  const risks = [
    !quality.hasReply ? "supplier reply not recorded" : "",
    ...missingLabels.map((label) => `${label.toLowerCase()} missing`),
    quote.missingCount ? `${quote.missingCount} quote term${quote.missingCount === 1 ? "" : "s"} unclear` : "",
    listing.availability !== "available" ? "availability is soon, not now" : ""
  ].filter(Boolean);
  const summary = risks.length
    ? `${listing.supplier} has ${risks.length} decision risk${risks.length === 1 ? "" : "s"} to close before the buyer relies on the machine.`
    : `${listing.supplier} is ready for buyer decision work while payment stays direct.`;
  const nextAction = !quality.hasReply
    ? "Copy the chase before deciding"
    : missingLabels.length
      ? "Close missing reply terms"
      : score >= 86
        ? "Move to award or mobilization"
        : "Use Quote Guard before award";
  const nextDetail = !quality.hasReply
    ? `Use the ${clarifier.channel.toLowerCase()} path and chase after ${route.followUp}.`
    : missingLabels.length
      ? `Ask for ${missingLabels.slice(0, 3).join(", ")} before dispatch or award.`
      : "Receipt is clean enough to support RFQ, award, quote guard, or mobilization handoff.";

  return {
    listing,
    fit,
    passport,
    quote,
    quality,
    clarifier,
    route,
    score,
    status,
    paymentRule,
    paymentRuleShort: "direct",
    evidence,
    risks,
    summary,
    nextAction,
    nextDetail
  };
}

function renderDecisionRouter() {
  const root = document.querySelector("#decisionRouter");
  if (!root) return;

  const model = getDecisionRouterModel();
  root.innerHTML = `
    <div class="decision-router-head">
      <span>Decision router</span>
      <strong>${escapeHtml(model.title)}</strong>
      <small>${escapeHtml(model.summary)}</small>
    </div>
    <div class="decision-router-metrics">
      <span><strong>${model.receipt.score}/100</strong>receipt</span>
      <span><strong>${escapeHtml(model.destination)}</strong>destination</span>
      <span><strong>${model.routes.length}</strong>moves</span>
    </div>
    <div class="decision-router-actions">
      ${model.routes.map((route) => `
        <button
          type="button"
          class="${route.kind === "primary" ? "solid-button" : "ghost-button"}"
          data-decision-route-action="${escapeHtml(route.action)}"
          data-decision-route-target="${escapeHtml(route.anchor)}"
        >
          <strong>${escapeHtml(route.label)}</strong>
          <span>${escapeHtml(route.detail)}</span>
        </button>
      `).join("")}
    </div>
  `;

  root.querySelectorAll("[data-decision-route-action]").forEach((button) => {
    button.addEventListener("click", async () => {
      const action = button.dataset.decisionRouteAction;

      if (action === "copy-clarifier" || action === "copy-receipt" || action === "copy-router") {
        try {
          const text = action === "copy-clarifier"
            ? buildReplyClarifierText()
            : action === "copy-receipt"
              ? buildDecisionReceiptText()
              : buildDecisionRouterText();
          await navigator.clipboard.writeText(text);
          showToast(action === "copy-clarifier" ? "Supplier clarification copied." : action === "copy-receipt" ? "Decision receipt copied." : "Decision route copied.");
        } catch {
          showToast("Copy is blocked here, but the route is visible.");
        }
        return;
      }

      const target = document.querySelector(button.dataset.decisionRouteTarget);
      if (!target) return;
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      window.location.hash = button.dataset.decisionRouteTarget;
      showToast(`${button.textContent.trim().split(/\s+/).slice(0, 3).join(" ")} opened.`);
    });
  });
}

function getDecisionRouterModel() {
  const receipt = getDecisionReceiptModel();
  const missingReplyCount = receipt.quality.gates.filter((gate) => !gate.ready).length;
  const title = receipt.status === "Waiting on supplier"
    ? "Chase supplier first"
    : receipt.status === "Decision-ready"
      ? "Move buyer forward"
      : receipt.status === "Proceed with controls"
        ? "Control gaps, then decide"
        : "Hold until proof improves";
  const destination = receipt.status === "Decision-ready"
    ? "award"
    : receipt.status === "Waiting on supplier"
      ? "reply"
      : receipt.quote.missingCount || missingReplyCount
        ? "quote guard"
        : "RFQ";
  const summary = receipt.risks.length
    ? `${receipt.risks.length} risk${receipt.risks.length === 1 ? "" : "s"} shape the next route for ${receipt.listing.supplier}.`
    : `${receipt.listing.supplier} can move into award or mobilization without payment collection.`;

  let routes;
  if (receipt.status === "Waiting on supplier") {
    routes = [
      {
        label: "Copy supplier chase",
        detail: "Ask for availability, rate, proof, validity, and direct contact.",
        action: "copy-clarifier",
        anchor: "#marketplace",
        kind: "primary"
      },
      {
        label: "Open RFQ",
        detail: "Prepare alternatives while the supplier responds.",
        action: "open",
        anchor: "#rfq",
        kind: "secondary"
      },
      {
        label: "Copy route plan",
        detail: "Share the next-best action note internally.",
        action: "copy-router",
        anchor: "#marketplace",
        kind: "secondary"
      }
    ];
  } else if (receipt.status === "Decision-ready") {
    routes = [
      {
        label: "Open Award",
        detail: "Move the clean machine into decision comparison.",
        action: "open",
        anchor: "#award",
        kind: "primary"
      },
      {
        label: "Open Mobilize",
        detail: "Prepare dispatch, proof, site access, and direct handoff.",
        action: "open",
        anchor: "#mobilize",
        kind: "secondary"
      },
      {
        label: "Copy receipt",
        detail: "Send the buyer a decision proof note.",
        action: "copy-receipt",
        anchor: "#marketplace",
        kind: "secondary"
      }
    ];
  } else {
    routes = [
      {
        label: missingReplyCount ? "Copy clarification" : "Open Quote Guard",
        detail: missingReplyCount ? "Close the supplier reply gaps first." : "Clean quote terms before award.",
        action: missingReplyCount ? "copy-clarifier" : "open",
        anchor: missingReplyCount ? "#marketplace" : "#quote-guard",
        kind: "primary"
      },
      {
        label: "Open Quote Guard",
        detail: "Check operator, transport, fuel, permit, overtime, and validity.",
        action: "open",
        anchor: "#quote-guard",
        kind: "secondary"
      },
      {
        label: "Open RFQ",
        detail: "Keep backup suppliers warm while gaps close.",
        action: "open",
        anchor: "#rfq",
        kind: "secondary"
      }
    ];
  }

  return {
    receipt,
    title,
    destination,
    summary,
    routes
  };
}

function renderListingRoiProof() {
  const root = document.querySelector("#listingRoiProof");
  if (!root) return;

  const model = getListingRoiProofModel();
  root.innerHTML = `
    <div class="listing-roi-proof-head">
      <span>Listing ROI proof</span>
      <strong>${model.score}/100 - ${escapeHtml(model.status)}</strong>
      <small>${escapeHtml(model.summary)}</small>
    </div>
    <div class="listing-roi-proof-metrics">
      <span><strong>USD ${model.listingAnnualValue.toLocaleString()}</strong>listing ARR</span>
      <span><strong>USD ${model.leadBudget.toLocaleString()}</strong>lead value</span>
      <span><strong>${model.renewalSignal}</strong>renewal proof</span>
    </div>
    <div class="listing-roi-proof-evidence">
      ${model.evidence.map((item) => `
        <span class="${item.ready ? "is-ready" : "is-watch"}">
          <strong>${escapeHtml(item.label)}</strong>
          <small>${escapeHtml(item.detail)}</small>
        </span>
      `).join("")}
    </div>
    <div class="listing-roi-proof-actions">
      <button type="button" class="solid-button" data-listing-roi-action="copy">Copy ROI proof</button>
      <button type="button" class="ghost-button" data-listing-roi-action="lead">Open Lead Desk</button>
      <button type="button" class="ghost-button" data-listing-roi-action="revenue">Open Revenue Desk</button>
    </div>
  `;

  root.querySelectorAll("[data-listing-roi-action]").forEach((button) => {
    button.addEventListener("click", async () => {
      const action = button.dataset.listingRoiAction;
      if (action === "copy") {
        try {
          await navigator.clipboard.writeText(buildListingRoiProofText());
          showToast("Listing ROI proof copied.");
        } catch {
          showToast("Copy is blocked here, but the ROI proof is visible.");
        }
        return;
      }

      const target = document.querySelector(action === "lead" ? "#lead-desk" : "#revenue-desk");
      if (!target) return;
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      window.location.hash = action === "lead" ? "#lead-desk" : "#revenue-desk";
      showToast(action === "lead" ? "Lead Desk opened." : "Revenue Desk opened.");
    });
  });
}

function getListingRoiProofModel() {
  const listing = getSelectedListing();
  const receipt = getDecisionReceiptModel();
  const router = getDecisionRouterModel();
  const tracker = getResponseTrackerModel();
  const revenue = getRevenueDeskModel(listing);
  const leadDesk = getLeadDeskModel(listing);
  const activeLead = leadDesk.active;
  const listingAnnualValue = 99;
  const leadBudget = activeLead?.lead?.budget || 0;
  const trackerProof = tracker.status === "replied" ? 100 : tracker.status === "sent" ? 72 : tracker.status === "copied" ? 58 : 35;
  const routeProof = router.destination === "award" || router.destination === "mobilization" ? 100 : router.destination === "quote guard" ? 78 : router.destination === "RFQ" ? 72 : 58;
  const score = Math.max(0, Math.min(100, Math.round(
    receipt.score * 0.34
    + activeLead.score * 0.18
    + revenue.score * 0.18
    + trackerProof * 0.15
    + routeProof * 0.15
  )));
  const status = score >= 86
    ? "Renewal-grade proof"
    : score >= 70
      ? "Useful proof"
      : "Build more proof";
  const renewalSignal = score >= 86 ? "strong" : score >= 70 ? "warm" : "weak";
  const evidence = [
    {
      label: "Buyer intent",
      ready: receipt.fit.score >= 70,
      detail: `${receipt.fit.score}/100 buyer fit for ${listing.name}.`
    },
    {
      label: "Direct enquiry proof",
      ready: tracker.status === "sent" || tracker.status === "replied",
      detail: `${tracker.statusLabel}; ${tracker.summary}`
    },
    {
      label: "Decision movement",
      ready: receipt.status !== "Waiting on supplier",
      detail: `${router.title}; routed toward ${router.destination}.`
    },
    {
      label: "Supplier lead value",
      ready: activeLead.score >= 70,
      detail: `${activeLead.score}/100 lead, USD ${leadBudget.toLocaleString()} modeled budget.`
    },
    {
      label: "Renewal economics",
      ready: revenue.score >= 62 || revenue.paidListings > 0,
      detail: `Paid listing ARR stays simple at USD ${listingAnnualValue}/year per active machine.`
    }
  ];
  const proofGaps = evidence.filter((item) => !item.ready).map((item) => item.label);
  const summary = proofGaps.length
    ? `${listing.supplier} needs ${proofGaps.length} proof gap${proofGaps.length === 1 ? "" : "s"} closed before this becomes renewal-grade.`
    : `${listing.supplier} has a clean paid-listing proof story without Heavyster touching rental payment.`;
  const nextAction = proofGaps.length
    ? `Close ${proofGaps.slice(0, 2).join(" and ")}`
    : "Use this in renewal or annual plan conversation";

  return {
    listing,
    receipt,
    router,
    tracker,
    revenue,
    leadDesk,
    activeLead,
    listingAnnualValue,
    leadBudget,
    score,
    status,
    renewalSignal,
    evidence,
    proofGaps,
    summary,
    nextAction
  };
}

function renderSupplierRenewalClosePack() {
  const root = document.querySelector("#supplierRenewalClosePack");
  if (!root) return;

  const model = getSupplierRenewalClosePackModel();
  root.innerHTML = `
    <div class="supplier-renewal-close-head">
      <span>Renewal close pack</span>
      <strong>${model.score}/100 - ${escapeHtml(model.status)}</strong>
      <small>${escapeHtml(model.summary)}</small>
    </div>
    <div class="supplier-renewal-close-metrics">
      <span><strong>${model.revenue.paidListings}</strong>paid listings</span>
      <span><strong>USD ${model.closeValue.toLocaleString()}</strong>${escapeHtml(model.valueLabel)}</span>
      <span><strong>${escapeHtml(model.closeType)}</strong>close type</span>
    </div>
    <div class="supplier-renewal-close-offer">
      <strong>${escapeHtml(model.offerTitle)}</strong>
      <span>${escapeHtml(model.offerDetail)}</span>
    </div>
    <div class="supplier-renewal-close-proof">
      ${model.proof.map((item) => `
        <span class="${item.ready ? "is-ready" : "is-watch"}">
          <strong>${escapeHtml(item.label)}</strong>
          <small>${escapeHtml(item.detail)}</small>
        </span>
      `).join("")}
    </div>
    <div class="supplier-renewal-close-actions">
      <button type="button" class="solid-button" data-renewal-close-action="copy">Copy close pack</button>
      <button type="button" class="ghost-button" data-renewal-close-action="pricing">Open Pricing</button>
      <button type="button" class="ghost-button" data-renewal-close-action="revenue">Open Revenue Desk</button>
    </div>
  `;

  root.querySelectorAll("[data-renewal-close-action]").forEach((button) => {
    button.addEventListener("click", async () => {
      const action = button.dataset.renewalCloseAction;
      if (action === "copy") {
        try {
          await navigator.clipboard.writeText(buildSupplierRenewalCloseText());
          showToast("Supplier renewal close pack copied.");
        } catch {
          showToast("Copy is blocked here, but the renewal close pack is visible.");
        }
        return;
      }

      const target = document.querySelector(action === "pricing" ? "#pricing" : "#revenue-desk");
      if (!target) return;
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      window.location.hash = action === "pricing" ? "#pricing" : "#revenue-desk";
      showToast(action === "pricing" ? "Pricing opened." : "Revenue Desk opened.");
    });
  });
}

function getSupplierRenewalClosePackModel() {
  const roi = getListingRoiProofModel();
  const listing = roi.listing;
  const revenue = roi.revenue;
  const monthlyListings = revenue.rows
    .filter((row) => row.isPaid && row.plan === "monthly")
    .reduce((total, row) => total + row.listings, 0);
  const renewalRiskValue = revenue.rows
    .filter((row) => row.statusClass === "renewal-risk")
    .reduce((total, row) => total + row.annualRevenue, 0);
  const closeListings = Math.max(1, monthlyListings || revenue.renewalRiskCount || revenue.paidListings || 1);
  const annualPlanValue = closeListings * 99;
  const monthlyEquivalentValue = closeListings * 108;
  const annualSavings = Math.max(0, monthlyEquivalentValue - annualPlanValue);
  const closeValue = renewalRiskValue || annualPlanValue;
  const valueLabel = renewalRiskValue ? "ARR to save" : "annual plan";
  const closeType = renewalRiskValue
    ? "renewal save"
    : monthlyListings
      ? "annual upgrade"
      : roi.score >= 86
        ? "proof close"
        : "proof nurture";
  const score = Math.max(0, Math.min(100, Math.round(
    roi.score * 0.46
    + revenue.score * 0.24
    + (monthlyListings ? 10 : 4)
    + (revenue.renewalRiskCount ? 8 : 4)
    + (roi.renewalSignal === "strong" ? 12 : roi.renewalSignal === "warm" ? 7 : 2)
  )));
  const status = score >= 86
    ? "Close now"
    : score >= 70
      ? "Warm close"
      : "Build proof first";
  const offerTitle = closeType === "renewal save"
    ? "Save the active listing package"
    : closeType === "annual upgrade"
      ? "Move monthly listings to annual"
      : closeType === "proof close"
        ? "Use ROI proof to close annual"
        : "Send proof before asking for renewal";
  const offerDetail = closeType === "renewal save"
    ? `Protect USD ${closeValue.toLocaleString()} modeled listing ARR before visibility drops.`
    : closeType === "annual upgrade"
      ? `Convert ${closeListings} monthly listing${closeListings === 1 ? "" : "s"} to USD 99/year and show USD ${annualSavings.toLocaleString()} annual savings versus monthly.`
      : closeType === "proof close"
        ? `Use the buyer decision receipt and ROI proof to ask for an annual listing commitment.`
        : `Close ${roi.proofGaps.slice(0, 2).join(" and ") || "buyer proof"} before asking for an annual plan.`;
  const proof = [
    {
      label: "ROI proof",
      ready: roi.score >= 70,
      detail: `${roi.score}/100 ${roi.status.toLowerCase()} for ${listing.name}.`
    },
    {
      label: "Lead value",
      ready: roi.leadBudget > 0,
      detail: `Modeled buyer lead value is USD ${roi.leadBudget.toLocaleString()}.`
    },
    {
      label: "Renewal economics",
      ready: closeValue > 0,
      detail: `Close value is USD ${closeValue.toLocaleString()} with no rental commission.`
    },
    {
      label: "Annual logic",
      ready: closeType !== "proof nurture",
      detail: monthlyListings ? `Annual plan saves USD ${annualSavings.toLocaleString()} versus monthly for this modeled package.` : "Annual plan reduces renewal friction once proof is visible."
    },
    {
      label: "Payment discipline",
      ready: true,
      detail: "Heavyster sells listing SaaS; rental payment remains direct."
    }
  ];
  const summary = `${listing.supplier} can be approached with a ${closeType} using buyer proof, listing ARR, and direct-payment discipline.`;

  return {
    roi,
    listing,
    revenue,
    monthlyListings,
    renewalRiskValue,
    closeListings,
    annualPlanValue,
    annualSavings,
    closeValue,
    valueLabel,
    closeType,
    score,
    status,
    offerTitle,
    offerDetail,
    proof,
    summary
  };
}

function renderDirectEnquiryComposer() {
  const root = document.querySelector("#enquiryComposer");
  if (!root) return;

  const model = getDirectEnquiryModel();
  root.innerHTML = `
    <div class="enquiry-composer-head">
      <span>Message readiness</span>
      <strong>${model.score}/100 - ${escapeHtml(model.status)}</strong>
      <small>${escapeHtml(model.subject)}</small>
    </div>
    <div class="enquiry-gates">
      ${model.gates.map((gate) => `
        <span class="${gate.ready ? "is-ready" : "is-gap"}">
          <strong>${escapeHtml(gate.label)}</strong>
          <small>${escapeHtml(gate.detail)}</small>
        </span>
      `).join("")}
    </div>
    <div class="enquiry-preview">
      ${model.message.map((line) => line ? `<p>${escapeHtml(line)}</p>` : `<br />`).join("")}
    </div>
  `;
}

function getDirectEnquiryModel() {
  const listing = getSelectedListing();
  const fit = getBuyerFitScore(listing);
  const passport = getTrustPassport(listing);
  const quote = getQuoteGuardModel();
  const mode = state.enquiryMode || "proof";
  const hasProjectNote = Boolean(String(state.projectNote || "").trim());
  const readyProof = passport.score >= 74;
  const quoteReady = quote.score >= 70;
  const availableNow = listing.availability === "available";
  const gates = [
    {
      label: "Machine",
      ready: fit.score >= 68,
      detail: `${fit.score}/100 buyer fit`
    },
    {
      label: "Project",
      ready: hasProjectNote,
      detail: hasProjectNote ? "Buyer context attached" : "Add scope, dates, and location"
    },
    {
      label: "Proof",
      ready: readyProof,
      detail: `${passport.score}/100 ${passport.verdict.toLowerCase()}`
    },
    {
      label: "Quote",
      ready: quoteReady,
      detail: `${quote.score}/100 quote clarity`
    },
    {
      label: "Payment",
      ready: true,
      detail: "Buyer pays supplier direct"
    }
  ];
  const score = Math.min(100, Math.round(
    28
    + fit.score * 0.18
    + passport.score * 0.18
    + (hasProjectNote ? 14 : 4)
    + (availableNow ? 9 : 4)
    + (quoteReady ? 9 : 3)
    + (listing.verified ? 8 : 2)
  ));
  const status = score >= 86 ? "Ready to send" : score >= 70 ? "Send after quick check" : "Needs buyer context";
  const subject = `${listing.name} rental enquiry - ${listing.city}, ${listing.region}`;
  const base = [
    `Hi ${listing.supplier},`,
    "",
    `I found your ${listing.name} on Heavyster for ${listing.city}, ${listing.region}.`
  ];
  const proofLines = [
    `The listing shows ${listing.documents.join(", ")} and ${passport.verdict.toLowerCase()} proof status.`,
    `Please confirm current availability, rate, operator option, delivery terms, document freshness, and best direct contact route.`
  ];
  const quickLines = [
    `Please confirm if it is ${availableNow ? "still available now" : "available soon"} and who should be contacted for the rental quote.`,
    "Please also share the fastest phone, WhatsApp, or email route for direct coordination."
  ];
  const quoteLines = [
    `Please quote for USD ${state.quoteAmount.toLocaleString()} / ${state.quoteDays} day${state.quoteDays === 1 ? "" : "s"} reference scope, or send your direct rental terms if different.`,
    "Please separate machine hire, operator, transport, fuel, permit, overtime, validity, deposit, and cancellation terms."
  ];
  const modeLines = mode === "quick" ? quickLines : mode === "quote" ? quoteLines : proofLines;
  const message = [
    ...base,
    hasProjectNote ? `Project note: ${state.projectNote}` : "Project note: buyer will share exact scope, dates, and site access details.",
    ...modeLines,
    "",
    "Payment will be arranged directly between buyer and rental company. Heavyster is only routing the enquiry."
  ];

  return {
    listing,
    fit,
    passport,
    quote,
    mode,
    subject,
    score,
    status,
    gates,
    message
  };
}

function renderJobsitePlanner() {
  const model = getJobsiteModel();
  setText("#jobsiteTitle", `${model.blueprint.label} - ${model.region}`);
  setText("#jobsiteBadge", model.badge);

  document.querySelector("#jobsiteScore").innerHTML = [
    ["Readiness", `${model.packageScore}/100`],
    ["Matched", `${model.matchedCount}/${model.roles.length}`],
    ["Available now", String(model.availableCount)],
    ["Gaps", String(model.gaps.length)]
  ].map(([label, value]) => `
    <span><strong>${escapeHtml(value)}</strong>${escapeHtml(label)}</span>
  `).join("");

  document.querySelector("#jobsitePackage").innerHTML = model.matches.map((match) => `
    <div class="jobsite-role ${match.listing ? "is-ready" : "is-gap"}">
      <span>
        <strong>${escapeHtml(match.role.role)}</strong>
        ${escapeHtml(match.role.target)}
      </span>
      <em>${match.listing ? `${escapeHtml(match.listing.name)} (${match.readiness}/100)` : "Supply gap"}</em>
      <small>${match.listing ? `${escapeHtml(match.listing.supplier)} - ${escapeHtml(match.listing.city)}, ${escapeHtml(match.listing.region)}` : `Recruit ${escapeHtml(match.role.target.toLowerCase())} suppliers for ${escapeHtml(model.region)}.`}</small>
    </div>
  `).join("");

  document.querySelector("#jobsiteGaps").innerHTML = model.gaps.length ? model.gaps.map((gap) => `
    <div class="jobsite-gap">
      <strong>${escapeHtml(gap.role)}</strong>
      <span>${escapeHtml(gap.message)}</span>
    </div>
  `).join("") : `
    <div class="jobsite-gap is-clear">
      <strong>Package covered</strong>
      <span>Every planned role has a visible supplier match. Move the package to RFQ, then let Award Intelligence choose the safest winner.</span>
    </div>
  `;
}

function getJobsiteModel() {
  const blueprint = getJobsiteBlueprint();
  const region = getJobsiteRegion();
  const usedIds = new Set();
  const matches = blueprint.roles.map((role) => {
    const listing = matchListingForJobsiteRole(role, region, usedIds);
    if (listing) usedIds.add(listing.id);
    return {
      role,
      listing,
      readiness: listing ? getTrustPassport(listing).score : 0
    };
  });
  const matched = matches.filter((match) => match.listing);
  const gaps = matches
    .filter((match) => !match.listing)
    .map((match) => ({
      role: match.role.role,
      message: `${match.role.target} is missing in ${region}. Save this as a demand signal and recruit suppliers before promising full coverage.`
    }));
  const averageReadiness = matched.length
    ? Math.round(matched.reduce((total, match) => total + match.readiness, 0) / matched.length)
    : 0;
  const coverageScore = Math.round((matched.length / matches.length) * 100);
  const packageScore = Math.round((coverageScore * 0.56) + (averageReadiness * 0.44));
  const availableCount = matched.filter((match) => match.listing.availability === "available").length;
  const badge = packageScore >= 86
    ? "Site-ready"
    : packageScore >= 62
      ? "Partial package"
      : "Supply gap";

  return {
    blueprint,
    region,
    roles: blueprint.roles,
    matches,
    matchedCount: matched.length,
    availableCount,
    gaps,
    averageReadiness,
    coverageScore,
    packageScore,
    badge
  };
}

function getJobsiteBlueprint() {
  if (state.jobsiteType && state.jobsiteType !== "smart") {
    return jobsiteBlueprints.find((blueprint) => blueprint.key === state.jobsiteType) || jobsiteBlueprints[0];
  }
  const text = [
    state.projectNote,
    state.search,
    state.demandEquipment,
    getSelectedListing().name,
    getSelectedListing().category,
    getSelectedListing().specs
  ].join(" ").toLowerCase();
  return jobsiteBlueprints
    .map((blueprint) => ({
      blueprint,
      score: blueprint.keywords.reduce((total, keyword) => total + (text.includes(keyword) ? 1 : 0), 0)
    }))
    .sort((a, b) => b.score - a.score)[0].blueprint;
}

function getJobsiteRegion() {
  if (state.jobsiteRegion && state.jobsiteRegion !== "selected") return state.jobsiteRegion;
  if (state.region && state.region !== "all") return state.region;
  return getSelectedListing().region;
}

function matchListingForJobsiteRole(role, region, usedIds) {
  const candidates = listings
    .filter((listing) => !usedIds.has(listing.id) && listing.region === region)
    .map((listing) => {
      const text = [listing.name, listing.category, listing.specs, listing.supplier].join(" ").toLowerCase();
      const hasRoleMatch = listing.category === role.category || role.keywords.some((keyword) => text.includes(keyword));
      let score = 0;
      if (listing.category === role.category) score += 12;
      score += role.keywords.reduce((total, keyword) => total + (text.includes(keyword) ? 8 : 0), 0);
      if (listing.region === region) score += 7;
      if (listing.availability === "available") score += 4;
      if (listing.availability === "soon") score += 2;
      if (listing.verified) score += 3;
      score += Math.round(getTrustPassport(listing).score / 25);
      return { listing, score: hasRoleMatch ? score : 0 };
    })
    .filter((candidate) => candidate.score >= 16)
    .sort((a, b) => b.score - a.score || a.listing.name.localeCompare(b.listing.name));

  return candidates[0]?.listing || null;
}

function renderTrustPassport() {
  const listing = getSelectedListing();
  const passport = getTrustPassport(listing);
  setText("#passportMachine", listing.name);
  setText("#passportScore", `${passport.score}/100`);
  setText("#passportVerdict", passport.verdict);
  document.querySelector(".passport-score-card").classList.toggle("is-strong", passport.score >= 80);
  document.querySelector(".passport-score-card").classList.toggle("is-watch", passport.score < 65);

  document.querySelector("#passportProof").innerHTML = passport.proofItems.map((item) => `
    <div class="passport-proof-row ${item.ready ? "is-ready" : "is-missing"}">
      <span><strong>${escapeHtml(item.label)}</strong>${escapeHtml(item.detail)}</span>
      <em>${item.ready ? "Ready" : "Need"}</em>
    </div>
  `).join("");

  document.querySelector("#passportRisk").innerHTML = passport.risks.map((risk) => `
    <div class="passport-risk-row ${risk.level}">
      <strong>${escapeHtml(risk.label)}</strong>
      <span>${escapeHtml(risk.detail)}</span>
    </div>
  `).join("");

  document.querySelector("#passportActions").innerHTML = passport.actions.map((action, index) => `
    <div>
      <strong>${index + 1}</strong>
      <span>${escapeHtml(action)}</span>
    </div>
  `).join("");
}

function getTrustPassport(listing) {
  const docs = listing.documents.map((document) => document.toLowerCase());
  const hasPending = docs.some((document) => document.includes("pending"));
  const verifiedScore = listing.verified ? 30 : 8;
  const availabilityScore = listing.availability === "available" ? 20 : listing.availability === "soon" ? 12 : 6;
  const cleanDocCount = docs.filter((document) => !document.includes("pending")).length;
  const documentScore = Math.min(24, cleanDocCount * 8);
  const categoryProof = getCategoryProof(listing);
  const proofScore = Math.round((categoryProof.filter((item) => item.ready).length / categoryProof.length) * 18);
  const directEnquiryScore = 8;
  const score = Math.min(100, verifiedScore + availabilityScore + documentScore + proofScore + directEnquiryScore);
  const missingProof = categoryProof.filter((item) => !item.ready).map((item) => item.label.toLowerCase());
  const verdict = score >= 84 ? "Enquiry-ready" : score >= 68 ? "Verify one gap" : "Founder review";

  return {
    score,
    verdict,
    proofItems: categoryProof,
    risks: [
      {
        level: listing.verified ? "low" : "medium",
        label: "Supplier identity",
        detail: listing.verified ? "Verified supplier profile is visible." : "Supplier should be reviewed before badge."
      },
      {
        level: hasPending ? "medium" : "low",
        label: "Document freshness",
        detail: hasPending ? "One or more documents are pending." : "Visible documents look clean in this prototype."
      },
      {
        level: listing.availability === "available" ? "low" : "medium",
        label: "Availability certainty",
        detail: listing.availability === "available" ? "Machine is marked available now." : "Availability should be reconfirmed before enquiry."
      }
    ],
    actions: missingProof.length ? [
      `Request ${missingProof.slice(0, 2).join(" and ")} from the supplier.`,
      "Confirm photos, serial-friendly internal ID, and current location.",
      "Copy the passport into the direct enquiry packet before contacting supplier."
    ] : [
      "Keep document expiry tracking fresh.",
      "Ask supplier to confirm current availability before dispatch.",
      "Use this passport as the buyer confidence block on the listing page."
    ]
  };
}

function getCategoryProof(listing) {
  const cleanDocuments = listing.documents.filter((document) => !document.toLowerCase().includes("pending"));
  const text = [listing.category, listing.specs, ...cleanDocuments].join(" ").toLowerCase();
  const base = [
    { label: "Company document", terms: ["trade license", "business license", "company registry", "gst"] },
    { label: "Insurance proof", terms: ["insurance"] },
    { label: "Inspection or service proof", terms: ["inspection", "service", "maintenance", "load test"] },
    { label: "Availability status", terms: ["available", "soon"] }
  ];
  const specialist = {
    Lifting: { label: "Operator or load proof", terms: ["operator", "load test", "capacity"] },
    Earthmoving: { label: "Attachment and job proof", terms: ["bucket", "breaker", "blade", "track", "inspection"] },
    Roadwork: { label: "Roadwork service proof", terms: ["maintenance", "compactor", "soil", "service"] },
    Power: { label: "Load bank proof", terms: ["load bank", "fuel", "power", "kva"] },
    Transport: { label: "Permit or capacity proof", terms: ["permit", "capacity", "trailer", "driver"] }
  };
  const checks = [...base, specialist[listing.category] || specialist.Earthmoving];
  return checks.map((check) => {
    const ready = check.terms.some((term) => text.includes(term)) || (check.label === "Availability status" && listing.availability);
    return {
      label: check.label,
      ready,
      detail: ready ? "Evidence visible on the listing." : `Add ${check.label.toLowerCase()} before full confidence.`
    };
  });
}

function toggleShortlist(id) {
  const exists = state.shortlistIds.includes(id);
  state.shortlistIds = exists ? state.shortlistIds.filter((listingId) => listingId !== id) : [...state.shortlistIds, id];
  saveState();
  renderCatalog();
  renderShortlistTray();
  renderLeadPacket();
  renderRfqRoom();
  renderAwardRoom();
  renderQuoteGuard();
  renderMobilizationTower();
  renderDealTrail();
  renderBuyerWorkbench();
  showToast(exists ? "Removed from shortlist." : "Saved to shortlist.");
}

function renderShortlistTray() {
  const selected = getSelectedListing();
  const shortlisted = state.shortlistIds
    .map((id) => listings.find((listing) => listing.id === id))
    .filter(Boolean);
  const isSaved = state.shortlistIds.includes(selected.id);
  const toggle = document.querySelector("#shortlistToggleButton");
  toggle.textContent = isSaved ? "Remove from shortlist" : "Save to shortlist";
  const compareButton = document.querySelector("#compareShortlistButton");
  if (compareButton) compareButton.textContent = state.shortlistCompareOpen ? "Hide compare" : "Compare shortlist";

  document.querySelector("#shortlistTray").innerHTML = `
    <div class="shortlist-head">
      <strong>${shortlisted.length} shortlisted</strong>
      <span>${state.shortlistCompareOpen ? "Decision matrix" : "Buyer memory"}</span>
    </div>
    ${shortlisted.length ? shortlisted.map((listing) => `
      <button type="button" class="shortlist-item ${listing.id === selected.id ? "is-selected" : ""}" data-shortlist-id="${escapeHtml(listing.id)}">
        <span><strong>${escapeHtml(listing.name)}</strong>${escapeHtml(listing.city)}, ${escapeHtml(listing.region)}</span>
        <em>${listing.availability === "available" ? "Now" : "Soon"}</em>
      </button>
    `).join("") : `<p>No saved machines yet. Select a listing and save it for comparison.</p>`}
    ${state.shortlistCompareOpen ? renderShortlistCompare() : ""}
  `;

  document.querySelectorAll("[data-shortlist-id]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedListingId = button.dataset.shortlistId;
      saveState();
      render();
    });
  });
  document.querySelectorAll("[data-compare-select]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedListingId = button.dataset.compareSelect;
      saveState();
      render();
    });
  });
  document.querySelectorAll("[data-shortlist-add]").forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.dataset.shortlistAdd;
      if (!id || state.shortlistIds.includes(id)) return;
      state.shortlistIds = [...state.shortlistIds, id];
      state.selectedListingId = id;
      state.shortlistCompareOpen = true;
      saveState();
      render();
      showToast("Suggested machine added to compare.");
    });
  });
}

function renderShortlistCompare() {
  const model = getShortlistCompareModel();
  return `
    <div class="shortlist-compare">
      <div class="shortlist-compare-head">
        <span>Compare matrix</span>
        <strong>${escapeHtml(model.verdict)}</strong>
        <small>${escapeHtml(model.summary)}</small>
      </div>
      <div class="shortlist-compare-list">
        ${model.rows.map((row) => `
          <button type="button" class="shortlist-compare-row ${row.listing.id === state.selectedListingId ? "is-selected" : ""}" data-compare-select="${escapeHtml(row.listing.id)}">
            <span>
              <strong>${escapeHtml(row.listing.name)}</strong>
              <small>${escapeHtml(row.listing.supplier)} - ${escapeHtml(row.listing.city)}, ${escapeHtml(row.listing.region)}</small>
            </span>
            <b>${row.award.total}/100</b>
            <em>${escapeHtml(row.action)}</em>
            <small>${escapeHtml(row.detail)}</small>
          </button>
        `).join("")}
      </div>
      ${model.suggestion ? `
        <button type="button" class="shortlist-suggestion" data-shortlist-add="${escapeHtml(model.suggestion.id)}">
          <span>Add stronger comparison option</span>
          <strong>${escapeHtml(model.suggestion.name)}</strong>
          <small>${escapeHtml(model.suggestion.supplier)} - ${escapeHtml(model.suggestion.city)}, ${escapeHtml(model.suggestion.region)}</small>
        </button>
      ` : ""}
    </div>
  `;
}

function getShortlistCompareModel() {
  const selected = getSelectedListing();
  const shortlisted = state.shortlistIds
    .map((id) => listings.find((listing) => listing.id === id))
    .filter(Boolean);
  const base = shortlisted.length ? shortlisted : [selected];
  const rows = base
    .map((listing) => {
      const award = getAwardScore(listing);
      const passport = getTrustPassport(listing);
      const documents = listing.documents.filter((document) => !document.toLowerCase().includes("pending")).length;
      const action = award.total >= 86 ? "Best" : award.total >= 74 ? "Good" : award.total >= 62 ? "Backup" : "Hold";
      const detail = `${passport.verdict}; ${listing.availability === "available" ? "available now" : "confirm availability"}; ${documents} clean document${documents === 1 ? "" : "s"}.`;
      return { listing, award, passport, documents, action, detail };
    })
    .sort((a, b) => b.award.total - a.award.total || a.listing.name.localeCompare(b.listing.name));
  const best = rows[0];
  const suggestion = getShortlistSuggestion(base.map((listing) => listing.id));
  const readyCount = rows.filter((row) => row.award.total >= 74).length;
  const verdict = rows.length >= 2
    ? `${best.listing.supplier} leads`
    : "Add one more option";
  const summary = rows.length >= 2
    ? `${readyCount}/${rows.length} option${rows.length === 1 ? "" : "s"} are good enough to keep in RFQ.`
    : "Save or add one more comparable machine before sending a serious RFQ.";

  return {
    rows,
    best,
    suggestion,
    readyCount,
    verdict,
    summary
  };
}

function getShortlistSuggestion(existingIds) {
  const selected = getSelectedListing();
  const existing = new Set(existingIds);
  return listings
    .filter((listing) => !existing.has(listing.id))
    .map((listing) => {
      let score = getAwardScore(listing).total;
      if (listing.region === selected.region) score += 8;
      if (listing.category === selected.category) score += 6;
      if (listing.availability === "available") score += 4;
      if (listing.verified) score += 3;
      return { listing, score };
    })
    .sort((a, b) => b.score - a.score || a.listing.name.localeCompare(b.listing.name))[0]?.listing || null;
}

function renderRfqRoom() {
  const rfq = getRfqModel();
  setText("#rfqTitle", rfq.title);
  setText("#rfqBadge", rfq.badge);

  document.querySelector("#rfqMetrics").innerHTML = [
    ["Machines", String(rfq.listings.length)],
    ["Avg readiness", `${rfq.averageScore}/100`],
    ["Verified suppliers", String(rfq.verifiedCount)],
    ["Available now", String(rfq.availableCount)]
  ].map(([label, value]) => `
    <span><strong>${escapeHtml(value)}</strong>${escapeHtml(label)}</span>
  `).join("");

  document.querySelector("#rfqBrief").innerHTML = `
    <p><strong>Project note</strong>${escapeHtml(state.projectNote || "No project note yet.")}</p>
    <p><strong>Payment stance</strong>Buyer pays rental company directly. Heavyster routes the enquiry only.</p>
    <p><strong>Control rule</strong>Attach Trust Passport details and request availability, operator, delivery, documents, and quote validity.</p>
  `;

  document.querySelector("#rfqRouteBoard").innerHTML = rfq.routes.map((route) => `
    <div class="rfq-route ${route.ready ? "is-ready" : "needs-work"}">
      <span><strong>${escapeHtml(route.listing.name)}</strong>${escapeHtml(route.listing.supplier)} - ${escapeHtml(route.listing.city)}, ${escapeHtml(route.listing.region)}</span>
      <em>${route.score}/100</em>
    </div>
  `).join("");

  document.querySelector("#rfqChecklist").innerHTML = rfq.checklist.map((item, index) => `
    <div>
      <strong>${index + 1}</strong>
      <span>${escapeHtml(item)}</span>
    </div>
  `).join("");
}

function getRfqModel() {
  const listingsForRfq = getRfqListings();
  const routes = listingsForRfq.map((listing) => {
    const passport = getTrustPassport(listing);
    return {
      listing,
      score: passport.score,
      ready: passport.score >= 68 && listing.verified
    };
  });
  const averageScore = Math.round(routes.reduce((total, route) => total + route.score, 0) / routes.length);
  const verifiedCount = routes.filter((route) => route.listing.verified).length;
  const availableCount = routes.filter((route) => route.listing.availability === "available").length;
  const needsWork = routes.filter((route) => !route.ready).length;
  const badge = routes.length >= 2 && needsWork === 0 ? "Send now" : routes.length >= 2 ? "Verify gaps" : "Add options";

  return {
    title: routes.length > 1 ? `${routes.length} supplier RFQ` : "Single supplier RFQ",
    listings: listingsForRfq,
    routes,
    averageScore,
    verifiedCount,
    availableCount,
    badge,
    checklist: [
      "Send the same project scope to every shortlisted supplier.",
      "Ask each supplier to confirm availability, quote validity, operator option, delivery, and documents.",
      "Compare replies by readiness score, response time, and document completeness.",
      "Keep rental payment direct between buyer and supplier in phase one."
    ]
  };
}

function getRfqListings() {
  const shortlisted = (state.shortlistIds || [])
    .map((id) => listings.find((listing) => listing.id === id))
    .filter(Boolean);
  return shortlisted.length ? shortlisted : [getSelectedListing()];
}

function renderAwardRoom() {
  const award = getAwardModel();
  const winner = award.winner;

  setText("#awardWinner", `${winner.listing.supplier}`);
  setText("#awardBadge", award.badge);

  document.querySelector("#awardScore").innerHTML = `
    <strong>${winner.total}/100</strong>
    <span>${escapeHtml(winner.listing.name)} - ${escapeHtml(winner.listing.city)}, ${escapeHtml(winner.listing.region)}</span>
  `;

  document.querySelector("#awardReason").innerHTML = winner.reasons.map((reason) => `
    <div>${escapeHtml(reason)}</div>
  `).join("");

  document.querySelector("#awardMatrix").innerHTML = award.candidates.map((candidate, index) => `
    <div class="award-row ${index === 0 ? "is-winner" : ""}">
      <span>
        <strong>${escapeHtml(candidate.listing.supplier)}</strong>
        ${escapeHtml(candidate.listing.name)} - ${escapeHtml(candidate.listing.city)}, ${escapeHtml(candidate.listing.region)}
      </span>
      <em>${candidate.total}/100</em>
      <small>${escapeHtml(candidate.signal)}</small>
      <b>${escapeHtml(candidate.action)}</b>
    </div>
  `).join("");

  document.querySelector("#awardMemo").innerHTML = buildAwardMemoText(award)
    .split("\n")
    .filter(Boolean)
    .map((line) => `<p>${escapeHtml(line)}</p>`)
    .join("");
}

function getAwardModel() {
  const ranked = getAwardCandidates()
    .map((listing) => getAwardScore(listing))
    .sort((a, b) => b.total - a.total || a.listing.supplier.localeCompare(b.listing.supplier));
  const candidates = ranked.map((candidate, index) => {
    if (index === 0) {
      return {
        ...candidate,
        action: candidate.total >= 74 ? "Award" : "Clarify"
      };
    }
    if (candidate.total >= 74) {
      return {
        ...candidate,
        signal: candidate.total >= 86 ? "Qualified backup" : candidate.signal,
        action: "Backup"
      };
    }
    return candidate;
  });
  const winner = candidates[0];
  const hasMultipleOptions = candidates.length > 1;
  const hasWinnerDocumentGaps = winner.documentGaps > 0;
  const badge = !hasMultipleOptions
    ? "Single option"
    : winner.total >= 86 && !hasWinnerDocumentGaps
      ? "Award-ready"
      : winner.total >= 74
        ? "Clarify terms"
        : "Hold award";

  return {
    badge,
    winner,
    candidates,
    shortlistMode: (state.shortlistIds || []).length >= 2
  };
}

function getAwardCandidates() {
  const shortlisted = getRfqListings();
  if (shortlisted.length >= 2) return shortlisted;

  const selected = getSelectedListing();
  const alternatives = listings
    .filter((listing) => listing.id !== selected.id)
    .map((listing) => {
      let score = 0;
      if (listing.region === selected.region) score += 5;
      if (listing.category === selected.category) score += 4;
      if (listing.availability === "available") score += 2;
      if (listing.verified) score += 1;
      return { listing, score };
    })
    .sort((a, b) => b.score - a.score || a.listing.name.localeCompare(b.listing.name))
    .slice(0, 2)
    .map((item) => item.listing);

  return [selected, ...alternatives];
}

function getAwardScore(listing) {
  const passport = getTrustPassport(listing);
  const proof = getCategoryProof(listing);
  const pendingDocs = listing.documents.filter((document) => document.toLowerCase().includes("pending")).length;
  const missingProof = proof.filter((item) => !item.ready).length;
  const documentGaps = pendingDocs + missingProof;
  const selected = getSelectedListing();
  const availabilityBonus = listing.availability === "available" ? 12 : listing.availability === "soon" ? 6 : 0;
  const verificationBonus = listing.verified ? 8 : -6;
  const documentBonus = documentGaps === 0 ? 8 : documentGaps === 1 ? 3 : -7;
  const locationBonus = listing.region === selected.region ? 5 : 0;
  const shortlistBonus = (state.shortlistIds || []).includes(listing.id) ? 4 : 0;
  const total = Math.max(0, Math.min(100, Math.round(passport.score * 0.72 + availabilityBonus + verificationBonus + documentBonus + locationBonus + shortlistBonus)));
  const reasons = [
    `Trust Passport ${passport.score}/100 with ${passport.verdict.toLowerCase()} status.`,
    listing.availability === "available" ? "Marked available now for faster award." : "Availability should be reconfirmed before award.",
    listing.verified ? "Supplier identity is verified." : "Supplier identity still needs founder review.",
    documentGaps ? `${documentGaps} proof gap${documentGaps === 1 ? "" : "s"} should be closed before dispatch.` : "No visible document gaps in this prototype.",
    listing.region === selected.region ? "Region aligns with the selected project market." : "Cross-region option; confirm service radius and delivery."
  ];
  const signal = total >= 86
    ? "Cleanest award path"
    : total >= 74
      ? "Good option, clarify terms"
      : total >= 62
        ? "Backup only"
        : "Hold for verification";
  const action = total >= 86 ? "Award" : total >= 74 ? "Clarify" : total >= 62 ? "Backup" : "Hold";

  return {
    listing,
    total,
    reasons,
    signal,
    action,
    documentGaps
  };
}

function renderQuoteGuard() {
  const model = getQuoteGuardModel();

  setText("#quoteGuardTitle", model.target.supplier);
  setText("#quoteGuardBadge", model.badge);

  document.querySelector("#quoteAmount").value = String(model.quoteAmount);
  document.querySelector("#quoteDays").value = String(model.quoteDays);
  document.querySelectorAll("[data-quote-include]").forEach((input) => {
    input.checked = Boolean(model.includes[input.dataset.quoteInclude]);
  });

  document.querySelector("#quoteGuardScore").innerHTML = `
    <strong>${model.score}/100</strong>
    <span>${escapeHtml(model.target.name)} - ${escapeHtml(model.rateSignal)} daily quote view</span>
  `;

  document.querySelector("#quoteGuardMetrics").innerHTML = [
    ["Quote", `USD ${model.quoteAmount.toLocaleString()}`],
    ["Daily view", `USD ${model.dailyRate.toLocaleString()}`],
    ["Missing terms", String(model.missingCount)],
    ["Supplier keeps", "100%"]
  ].map(([label, value]) => `
    <span><strong>${escapeHtml(value)}</strong>${escapeHtml(label)}</span>
  `).join("");

  document.querySelector("#quoteGuardBoard").innerHTML = model.board.map((item) => `
    <div class="quote-row ${item.statusClass}">
      <span>
        <strong>${escapeHtml(item.label)}</strong>
        ${escapeHtml(item.detail)}
      </span>
      <em>${escapeHtml(item.status)}</em>
      <b>${escapeHtml(item.action)}</b>
    </div>
  `).join("");

  document.querySelector("#quoteGuardMemo").innerHTML = buildQuoteGuardText(model)
    .split("\n")
    .filter(Boolean)
    .map((line) => `<p>${escapeHtml(line)}</p>`)
    .join("");
}

function getQuoteGuardModel() {
  const award = getAwardModel();
  const target = award.winner.listing;
  const passport = getTrustPassport(target);
  const includes = {
    operator: Boolean(state.quoteIncludes.operator),
    transport: Boolean(state.quoteIncludes.transport),
    fuel: Boolean(state.quoteIncludes.fuel),
    permit: Boolean(state.quoteIncludes.permit),
    overtime: Boolean(state.quoteIncludes.overtime),
    validity: Boolean(state.quoteIncludes.validity)
  };
  const quoteAmount = Math.max(500, Number(state.quoteAmount || 8500));
  const quoteDays = Math.max(1, Number(state.quoteDays || 5));
  const dailyRate = Math.round(quoteAmount / quoteDays);
  const band = getQuoteBand(target);
  const text = [
    target.name,
    target.category,
    target.specs,
    target.documents.join(" "),
    state.projectNote
  ].join(" ").toLowerCase();
  const rateSignal = dailyRate < band.low
    ? "Below prototype band"
    : dailyRate > band.high
      ? "Above prototype band"
      : "Inside prototype band";
  const rateStatus = rateSignal === "Inside prototype band" ? "Ready" : "Confirm";
  const rateDetail = `Modeled ${target.category.toLowerCase()} band for ${target.region}: USD ${band.low.toLocaleString()}-${band.high.toLocaleString()} per day.`;
  const terms = [
    {
      key: "operator",
      label: "Operator or crew",
      weight: 14,
      fallback: text.includes("operator") || text.includes("driver"),
      severity: "gap",
      detail: "Confirm whether certified operator, helper crew, and shift hours are included."
    },
    {
      key: "transport",
      label: "Transport and mobilization",
      weight: 14,
      fallback: text.includes("delivery") || text.includes("transport") || text.includes("lowbed"),
      severity: "gap",
      detail: "Lock pickup, delivery, demobilization, route, site access, and who pays the move."
    },
    {
      key: "fuel",
      label: "Fuel and consumables",
      weight: 9,
      fallback: text.includes("fuel"),
      severity: "confirm",
      detail: "Clarify fuel, grease, wear items, and refill responsibility."
    },
    {
      key: "permit",
      label: "Permit and site access",
      weight: target.category === "Lifting" ? 12 : 7,
      fallback: text.includes("permit") || text.includes("city"),
      severity: target.category === "Lifting" ? "gap" : "confirm",
      detail: "Confirm lift permit, road permit, gate passes, access timing, and document holder."
    },
    {
      key: "overtime",
      label: "Overtime and standby",
      weight: 10,
      fallback: text.includes("weekly") || text.includes("shift"),
      severity: "confirm",
      detail: "State overtime, weekend, night shift, idle day, and standby rules before award."
    },
    {
      key: "validity",
      label: "Quote validity window",
      weight: 8,
      fallback: text.includes("quote") || text.includes("terms"),
      severity: "confirm",
      detail: "Set validity date, deposit terms, cancellation rule, and direct payment contact."
    }
  ];
  const boardTerms = terms.map((term) => getQuoteTermStatus(term, includes[term.key]));
  const coverageScore = boardTerms.reduce((total, item) => total + item.points, 0);
  const rateScore = rateStatus === "Ready" ? 20 : 10;
  const gapCount = boardTerms.filter((item) => item.status === "Gap").length;
  const missingCount = boardTerms.filter((item) => item.status !== "Ready").length + (rateStatus === "Ready" ? 0 : 1);
  const score = Math.max(0, Math.min(100, Math.round(
    coverageScore
    + rateScore
    + passport.score * 0.12
    + award.winner.total * 0.05
    - gapCount * 4
  )));
  const badge = score >= 86 && gapCount === 0
    ? "Quote-clean"
    : score >= 62
      ? "Clarify terms"
      : "Hold quote";
  const board = [
    {
      label: "Daily rate sense",
      status: rateStatus,
      statusClass: rateStatus.toLowerCase(),
      detail: rateDetail,
      action: rateStatus === "Ready" ? "Keep" : "Break up"
    },
    ...boardTerms,
    {
      label: "Phase one payment",
      status: "Direct",
      statusClass: "direct",
      detail: "Buyer and supplier settle payment directly; Heavyster only cleans the quote path.",
      action: "No take"
    }
  ];

  return {
    award,
    target,
    passport,
    includes,
    quoteAmount,
    quoteDays,
    dailyRate,
    band,
    rateSignal,
    score,
    badge,
    board,
    missingCount,
    gapCount
  };
}

function getQuoteTermStatus(term, included) {
  const status = included ? "Ready" : term.fallback ? "Confirm" : term.severity === "gap" ? "Gap" : "Confirm";
  const statusClass = status.toLowerCase();
  const points = included ? term.weight : term.fallback ? Math.round(term.weight * 0.45) : 0;
  const action = included ? "Keep" : term.fallback ? "Name it" : term.severity === "gap" ? "Add line" : "Clarify";
  const detail = included ? `${term.label} is marked inside the quote.` : term.detail;

  return {
    label: term.label,
    status,
    statusClass,
    detail,
    action,
    points
  };
}

function getQuoteBand(listing) {
  const bands = {
    Earthmoving: [650, 1700],
    Lifting: [1200, 4800],
    Roadwork: [400, 1200],
    Power: [150, 750],
    Transport: [550, 1500]
  };
  const multipliers = {
    UAE: 1.05,
    USA: 1.15,
    UK: 1.2,
    India: 0.65
  };
  const [low, high] = bands[listing.category] || [500, 1800];
  const multiplier = multipliers[listing.region] || 1;
  return {
    low: Math.round(low * multiplier),
    high: Math.round(high * multiplier)
  };
}

function renderMobilizationTower() {
  const model = getMobilizationModel();

  setText("#mobilizeTitle", model.title);
  setText("#mobilizeBadge", model.badge);

  document.querySelector("#mobilizeScore").innerHTML = `
    <strong>${model.score}/100</strong>
    <span>${escapeHtml(model.target.name)} - ${escapeHtml(model.target.city)}, ${escapeHtml(model.target.region)}</span>
  `;

  document.querySelector("#mobilizeSummary").innerHTML = model.summary.map((item) => `
    <div>
      <strong>${escapeHtml(item.label)}</strong>
      <span>${escapeHtml(item.value)}</span>
    </div>
  `).join("");

  document.querySelector("#mobilizeChecklist").innerHTML = model.checks.map((check) => `
    <div class="mobilize-check ${check.status.toLowerCase()}">
      <span>
        <strong>${escapeHtml(check.label)}</strong>
        ${escapeHtml(check.detail)}
      </span>
      <em>${escapeHtml(check.status)}</em>
    </div>
  `).join("");

  document.querySelector("#mobilizeHandoff").innerHTML = model.handoff.map((line) => `
    <p>${escapeHtml(line)}</p>
  `).join("");
}

function getMobilizationModel() {
  const award = getAwardModel();
  const jobsite = getJobsiteModel();
  const target = award.winner.listing;
  const passport = getTrustPassport(target);
  const quote = getQuoteGuardModel();
  const pendingDocs = target.documents.filter((document) => document.toLowerCase().includes("pending")).length;
  const text = [target.name, target.category, target.specs, target.documents.join(" ")].join(" ").toLowerCase();
  const hasOperatorEvidence = text.includes("operator") || text.includes("driver");
  const hasTransportEvidence = text.includes("delivery") || text.includes("permit") || text.includes("transport") || text.includes("lowbed");
  const packageGapCount = jobsite.gaps.length;
  const checks = [
    {
      label: "Availability lock",
      status: target.availability === "available" ? "Ready" : "Confirm",
      detail: target.availability === "available" ? "Machine is marked available now." : "Supplier must reconfirm the start window before dispatch."
    },
    {
      label: "Supplier and document proof",
      status: target.verified && pendingDocs === 0 ? "Ready" : pendingDocs ? "Gap" : "Confirm",
      detail: target.verified && pendingDocs === 0 ? "Verified supplier with visible clean documents." : "Close supplier verification or pending document gaps."
    },
    {
      label: "Operator or crew path",
      status: hasOperatorEvidence ? "Ready" : "Confirm",
      detail: hasOperatorEvidence ? "Operator or crew support is visible in the listing proof." : "Confirm whether rental includes operator, helper crew, or buyer-provided operator."
    },
    {
      label: "Transport, access, and permits",
      status: hasTransportEvidence ? "Ready" : "Confirm",
      detail: hasTransportEvidence ? "Transport, permit, or site movement support is visible." : "Confirm site access, delivery route, lifting permits, and mobilization cost."
    },
    {
      label: "Quote validity and payment",
      status: "Confirm",
      detail: "Supplier should lock rate, quote validity, deposit terms, and direct buyer-supplier payment route."
    },
    {
      label: "Quote Guard clarity",
      status: quote.score >= 82 ? "Ready" : quote.score >= 58 ? "Confirm" : "Gap",
      detail: `${quote.missingCount} quote term${quote.missingCount === 1 ? "" : "s"} need clearer wording before dispatch.`
    },
    {
      label: "Package support coverage",
      status: packageGapCount === 0 ? "Ready" : packageGapCount <= 2 ? "Confirm" : "Gap",
      detail: packageGapCount === 0 ? "Jobsite package has visible matched support equipment." : `${packageGapCount} jobsite package gap${packageGapCount === 1 ? "" : "s"} should be filled or excluded before promise.`
    }
  ];
  const readyCount = checks.filter((check) => check.status === "Ready").length;
  const gapCount = checks.filter((check) => check.status === "Gap").length;
  const gateScore = Math.round((readyCount / checks.length) * 100);
  const packageScore = packageGapCount === 0 ? 12 : packageGapCount === 1 ? 7 : packageGapCount === 2 ? 3 : 0;
  const score = Math.max(0, Math.min(100, Math.round(passport.score * 0.5 + gateScore * 0.38 + packageScore - gapCount * 4)));
  const badge = score >= 86 && gapCount === 0
    ? "Mobilize-ready"
    : score >= 66
      ? "Control gaps"
      : "Hold dispatch";
  const risks = [
    target.availability === "available" ? "Availability is strong; still lock the exact start time." : "Availability is not fully locked for the start window.",
    packageGapCount ? `${packageGapCount} package support gap${packageGapCount === 1 ? "" : "s"} remain from Jobsite Planner.` : "Jobsite support package is covered in the planner.",
    hasTransportEvidence ? "Transport or permit support is visible." : "Mobilization route, delivery cost, and site access need confirmation."
  ];

  return {
    title: `${target.supplier}`,
    badge,
    target,
    passport,
    score,
    checks,
    summary: [
      { label: "Award signal", value: `${award.badge} - ${award.winner.total}/100` },
      { label: "Quote Guard", value: `${quote.score}/100 - ${quote.badge}` },
      { label: "Trust Passport", value: `${passport.score}/100 - ${passport.verdict}` },
      { label: "Jobsite package", value: `${jobsite.matchedCount}/${jobsite.roles.length} matched, ${packageGapCount} gap${packageGapCount === 1 ? "" : "s"}` },
      { label: "Dispatch risk", value: risks.join(" ") }
    ],
    handoff: [
      `Mobilization target: ${target.supplier} for ${target.name} in ${target.city}, ${target.region}.`,
      `Project note: ${state.projectNote || "No project note provided"}`,
      `Start window: ${state.jobsiteUrgency}. Availability: ${target.availability === "available" ? "available now" : "available soon"}.`,
      `Quote Guard: ${quote.score}/100, ${quote.badge}, ${quote.missingCount} unclear quote term${quote.missingCount === 1 ? "" : "s"}.`,
      `Before dispatch: confirm operator, delivery route, site access, quote validity, insurance, inspection, and any permit requirement.`,
      "Payment remains direct between buyer and rental company. Heavyster provides listing, RFQ, decision, and mobilization handoff support only."
    ]
  };
}

function renderDealTrail() {
  const model = getDealTrailModel();

  setText("#dealTrailTitle", model.title);
  setText("#dealTrailBadge", model.badge);

  document.querySelector("#dealTrailScore").innerHTML = `
    <strong>${model.score}/100</strong>
    <span>${escapeHtml(model.summary)}</span>
  `;

  document.querySelector("#dealTrailMetrics").innerHTML = model.metrics.map((metric) => `
    <span><strong>${escapeHtml(metric.value)}</strong>${escapeHtml(metric.label)}</span>
  `).join("");

  document.querySelector("#dealTrailSteps").innerHTML = model.steps.map((step, index) => `
    <button type="button" class="deal-trail-step ${escapeHtml(step.statusClass)}" data-deal-target="${escapeHtml(step.anchor)}">
      <em>${index + 1}</em>
      <span>
        <strong>${escapeHtml(step.label)}</strong>
        ${escapeHtml(step.detail)}
      </span>
      <b>${step.score}/100</b>
      <small>${escapeHtml(step.status)}</small>
    </button>
  `).join("");

  document.querySelector("#dealTrailGates").innerHTML = model.gates.map((gate, index) => `
    <div class="deal-trail-gate ${escapeHtml(gate.statusClass)}">
      <em>${index + 1}</em>
      <span>
        <strong>${escapeHtml(gate.label)}</strong>
        ${escapeHtml(gate.detail)}
      </span>
      <b>${escapeHtml(gate.owner)}</b>
      <small>${escapeHtml(gate.status)}</small>
    </div>
  `).join("");

  document.querySelector("#dealTrailPacket").innerHTML = buildDealTrailText(model)
    .split("\n")
    .filter(Boolean)
    .map((line) => `<p>${escapeHtml(line)}</p>`)
    .join("");

  document.querySelectorAll("[data-deal-target]").forEach((button) => {
    button.addEventListener("click", () => {
      const target = document.querySelector(button.dataset.dealTarget);
      if (!target) return;
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      window.location.hash = button.dataset.dealTarget;
      showToast("Deal proof step opened.");
    });
  });
}

function getDealTrailModel() {
  const selected = getSelectedListing();
  const passport = getTrustPassport(selected);
  const rfq = getRfqModel();
  const award = getAwardModel();
  const quote = getQuoteGuardModel();
  const mobilize = getMobilizationModel();
  const leadDesk = getLeadDeskModel(award.winner.listing);
  const activeLead = leadDesk.active;
  const readyMobilize = mobilize.checks.filter((check) => check.status === "Ready").length;
  const clearQuoteTerms = quote.board.filter((item) => item.status === "Ready" || item.status === "Direct").length;
  const paymentRule = "Buyer pays rental company directly; Heavyster records workflow proof, clarity, and handoff only.";
  const enquiryScore = Math.min(100, Math.round(55 + passport.score * 0.18 + (state.projectNote ? 18 : 6) + (selected.availability === "available" ? 8 : 2)));
  const futureFeeReady = quote.gapCount === 0 && quote.score >= 86 && award.winner.total >= 86 && mobilize.score >= 86 && activeLead.score >= 84;
  const steps = [
    getDealTrailStep({
      label: "Enquiry captured",
      anchor: "#marketplace",
      score: enquiryScore,
      detail: `Selected ${selected.name} from ${selected.supplier}; ${state.projectNote ? "project note is attached" : "project note still needs buyer context"}.`,
      action: "Open listing"
    }),
    getDealTrailStep({
      label: "Trust proof",
      anchor: "#passport",
      score: passport.score,
      detail: `${passport.verdict}; ${passport.proofItems.filter((item) => item.ready).length}/${passport.proofItems.length} proof items ready.`,
      action: "Check proof"
    }),
    getDealTrailStep({
      label: "RFQ packet",
      anchor: "#rfq",
      score: rfq.averageScore,
      detail: `${rfq.listings.length} machine${rfq.listings.length === 1 ? "" : "s"}, ${rfq.verifiedCount} verified supplier${rfq.verifiedCount === 1 ? "" : "s"}, ${rfq.availableCount} available now.`,
      action: "Review RFQ"
    }),
    getDealTrailStep({
      label: "Award intent",
      anchor: "#award",
      score: award.winner.total,
      detail: `${award.winner.listing.supplier} leads the decision board with ${award.badge.toLowerCase()} status.`,
      action: "Review award"
    }),
    getDealTrailStep({
      label: "Quote clarity",
      anchor: "#quote-guard",
      score: quote.score,
      detail: `${clearQuoteTerms}/${quote.board.length} quote controls are ready or direct; ${quote.missingCount} term${quote.missingCount === 1 ? "" : "s"} unclear.`,
      action: "Clean quote"
    }),
    getDealTrailStep({
      label: "Supplier response",
      anchor: "#lead-desk",
      score: activeLead.score,
      detail: `${leadDesk.profile.supplier} has ${leadDesk.hotCount} hot lead${leadDesk.hotCount === 1 ? "" : "s"}; active route is ${activeLead.lead.channel}.`,
      action: "Open lead"
    }),
    getDealTrailStep({
      label: "Mobilization",
      anchor: "#mobilize",
      score: mobilize.score,
      detail: `${readyMobilize}/${mobilize.checks.length} dispatch gates ready before the buyer depends on the machine.`,
      action: "Lock dispatch"
    })
  ];
  const gates = [
    getDealTrailGate({
      label: "No payment collection",
      owner: "Founder",
      status: "Locked",
      detail: paymentRule,
      statusClass: "ready"
    }),
    getDealTrailGate({
      label: "Supplier contact route",
      owner: "Supplier",
      status: activeLead.lead.channel ? "Ready" : "Review",
      detail: `Reply channel: ${activeLead.lead.channel || "not set"}. Buyer can still settle directly with the rental company.`,
      statusClass: activeLead.lead.channel ? "ready" : "review"
    }),
    getDealTrailGate({
      label: "Quote trail",
      owner: "Buyer",
      status: quote.gapCount ? "Fix" : "Ready",
      detail: quote.gapCount ? `${quote.gapCount} quote gap${quote.gapCount === 1 ? "" : "s"} before a clean booking trail.` : "Quote terms are clear enough to attach to the trail.",
      statusClass: quote.gapCount ? "gap" : "ready"
    }),
    getDealTrailGate({
      label: "Award decision",
      owner: "Buyer",
      status: award.winner.total >= 86 ? "Ready" : award.winner.total >= 74 ? "Review" : "Hold",
      detail: `${award.winner.listing.supplier} score is ${award.winner.total}/100 with ${award.badge.toLowerCase()} status.`,
      statusClass: award.winner.total >= 86 ? "ready" : award.winner.total >= 74 ? "review" : "gap"
    }),
    getDealTrailGate({
      label: "Dispatch proof",
      owner: "Ops",
      status: mobilize.score >= 86 ? "Ready" : mobilize.score >= 66 ? "Review" : "Hold",
      detail: `${readyMobilize}/${mobilize.checks.length} mobilization gates ready; use this before promising the start window.`,
      statusClass: mobilize.score >= 86 ? "ready" : mobilize.score >= 66 ? "review" : "gap"
    }),
    getDealTrailGate({
      label: "Future 1% eligibility",
      owner: "Founder",
      status: futureFeeReady ? "Earned" : "Not yet",
      detail: futureFeeReady ? "The workflow has enough proof to later justify a success-fee conversation." : "Keep phase one clean until quote, award, supplier response, and mobilization proof are stronger.",
      statusClass: futureFeeReady ? "ready" : "review"
    })
  ];
  const stepAverage = Math.round(steps.reduce((total, step) => total + step.score, 0) / steps.length);
  const readyGateShare = Math.round((gates.filter((gate) => gate.statusClass === "ready").length / gates.length) * 100);
  const score = Math.max(0, Math.min(100, Math.round(stepAverage * 0.72 + readyGateShare * 0.28)));
  const badge = score >= 86 && futureFeeReady
    ? "Workflow earned"
    : score >= 72
      ? "Proof trail"
      : "Gaps remain";
  const summary = `${award.winner.listing.name} has a ${badge.toLowerCase()} path: ${steps.filter((step) => step.status === "Ready").length}/${steps.length} workflow steps ready, with rental payment still direct.`;

  return {
    title: `${award.winner.listing.name} deal trail`,
    badge,
    score,
    summary,
    selected,
    passport,
    rfq,
    award,
    quote,
    mobilize,
    leadDesk,
    activeLead,
    steps,
    gates,
    paymentRule,
    futureFeeReady,
    metrics: [
      { label: "Supplier response", value: `${activeLead.score}/100` },
      { label: "Quote clarity", value: `${quote.score}/100` },
      { label: "Mobilization", value: `${mobilize.score}/100` },
      { label: "Payment take", value: "0%" }
    ]
  };
}

function getDealTrailStep({ label, anchor, score, detail, action }) {
  const status = score >= 84 ? "Ready" : score >= 62 ? "Review" : "Gap";
  return {
    label,
    anchor,
    score,
    detail,
    action,
    status,
    statusClass: status.toLowerCase()
  };
}

function getDealTrailGate({ label, owner, status, detail, statusClass }) {
  return {
    label,
    owner,
    status,
    detail,
    statusClass
  };
}

function renderYardAvailability() {
  const model = getYardModel();
  setText("#yardTitle", model.title);
  setText("#yardBadge", model.badge);

  document.querySelector("#yardScore").innerHTML = `
    <strong>${model.score}/100</strong>
    <span>${model.readyCount} fresh listings, ${model.reviewCount} need supplier confirmation.</span>
  `;

  document.querySelector("#yardMetrics").innerHTML = [
    ["Available now", String(model.availableCount)],
    ["Available soon", String(model.soonCount)],
    ["Reconfirm", String(model.reviewCount)],
    ["Demand pressure", `${model.demandCount} signals`]
  ].map(([label, value]) => `
    <span><strong>${escapeHtml(value)}</strong>${escapeHtml(label)}</span>
  `).join("");

  document.querySelector("#yardBoard").innerHTML = model.rows.map((row) => `
    <div class="yard-row ${row.statusClass}">
      <span>
        <strong>${escapeHtml(row.listing.name)}</strong>
        ${escapeHtml(row.listing.supplier)} - ${escapeHtml(row.listing.city)}, ${escapeHtml(row.listing.region)}
      </span>
      <em>${escapeHtml(row.availabilityLabel)}</em>
      <small>${escapeHtml(row.freshnessLabel)}</small>
      <b>${escapeHtml(row.action)}</b>
    </div>
  `).join("");

  document.querySelector("#yardRefreshQueue").innerHTML = model.refreshQueue.map((item, index) => `
    <div class="yard-refresh-item">
      <strong>${index + 1}</strong>
      <span>${escapeHtml(item)}</span>
    </div>
  `).join("");
}

function getYardModel() {
  const rows = listings.map((listing, index) => getYardRow(listing, index));
  const readyCount = rows.filter((row) => row.status === "fresh").length;
  const reviewCount = rows.filter((row) => row.status !== "fresh").length;
  const availableCount = rows.filter((row) => row.listing.availability === "available").length;
  const soonCount = rows.filter((row) => row.listing.availability === "soon").length;
  const demandCount = getDemandSignals().reduce((total, signal) => total + Number(signal.count || 1), 0);
  const averageFreshness = Math.round(rows.reduce((total, row) => total + row.score, 0) / rows.length);
  const demandPenalty = Math.min(10, Math.floor(demandCount / 2));
  const score = Math.max(0, Math.min(100, averageFreshness - demandPenalty + Math.min(8, availableCount)));
  const badge = score >= 82 ? "Fresh yard" : score >= 64 ? "Refresh needed" : "Trust risk";
  const refreshQueue = rows
    .filter((row) => row.status !== "fresh")
    .slice(0, 4)
    .map((row) => `${row.listing.supplier}: confirm ${row.listing.name} availability, documents, photos, operator option, and direct enquiry contact.`);

  if (!refreshQueue.length) {
    refreshQueue.push("All visible demo listings are fresh. Ask suppliers to confirm again before high-value enquiries.");
  }

  return {
    title: "Supplier yard freshness",
    badge,
    rows,
    readyCount,
    reviewCount,
    availableCount,
    soonCount,
    demandCount,
    score,
    refreshQueue
  };
}

function getYardRow(listing, index) {
  const passport = getTrustPassport(listing);
  const baseAge = [2, 6, 14, 4, 18, 8][index % 6];
  const ageDays = listing.availability === "available" ? baseAge : baseAge + 4;
  const pendingDocs = listing.documents.some((document) => document.toLowerCase().includes("pending"));
  const demandPressure = getDemandSignals().some((signal) => {
    const demandText = `${signal.equipment} ${getHuntPlan(signal).category}`.toLowerCase();
    return demandText.includes(listing.category.toLowerCase()) || demandText.includes(listing.name.split(" ")[0].toLowerCase());
  });
  const score = Math.max(0, Math.min(100,
    passport.score
    - Math.max(0, ageDays - 5) * 3
    - (pendingDocs ? 14 : 0)
    + (listing.availability === "available" ? 8 : 0)
    - (demandPressure ? 4 : 0)
  ));
  const status = score >= 78 ? "fresh" : score >= 58 ? "watch" : "stale";
  const availabilityLabel = listing.availability === "available" ? "Now" : listing.availability === "soon" ? "Soon" : "Call";
  const freshnessLabel = `${ageDays}d since supplier check`;
  const action = status === "fresh" ? "Keep live" : status === "watch" ? "Reconfirm" : "Pause risk";

  return {
    listing,
    score,
    status,
    statusClass: `is-${status}`,
    availabilityLabel,
    freshnessLabel,
    action
  };
}

function renderSupplierStorefront() {
  const model = getSupplierStorefrontModel();
  setText("#storefrontName", model.profile.supplier);
  setText("#storefrontSlug", `/suppliers/${model.profile.slug}/`);
  setText("#storefrontIntro", model.profile.headline);

  document.querySelector("#storefrontScore").innerHTML = `
    <strong>${model.score}/100</strong>
    <span>${escapeHtml(model.badge)} - ${escapeHtml(model.profile.branch)}</span>
  `;

  document.querySelector("#storefrontMetrics").innerHTML = [
    ["Public URL", `/suppliers/${model.profile.slug}/`],
    ["Visible fleet", `${model.visibleFleetCount} listing${model.visibleFleetCount === 1 ? "" : "s"}`],
    ["Response", model.profile.response],
    ["Supplier keeps", "100%"]
  ].map(([label, value]) => `
    <span><strong>${escapeHtml(value)}</strong>${escapeHtml(label)}</span>
  `).join("");

  document.querySelector("#storefrontFleet").innerHTML = model.profile.fleet.map((lane) => `
    <div class="storefront-fleet-row ${lane.status.toLowerCase().replace(/\s+/g, "-")}">
      <span>
        <strong>${escapeHtml(lane.label)}</strong>
        ${lane.count} modeled fleet item${lane.count === 1 ? "" : "s"}
      </span>
      <em>${escapeHtml(lane.status)}</em>
    </div>
  `).join("");

  document.querySelector("#storefrontProof").innerHTML = [
    ...model.profile.services.map((service) => ({ label: service, type: "Service" })),
    ...model.profile.proof.map((proof) => ({ label: proof, type: "Proof" }))
  ].map((item) => `
    <div>
      <strong>${escapeHtml(item.type)}</strong>
      <span>${escapeHtml(item.label)}</span>
    </div>
  `).join("");

  document.querySelector("#storefrontPacket").innerHTML = buildSupplierStorefrontText(model)
    .split("\n")
    .filter(Boolean)
    .map((line) => `<p>${escapeHtml(line)}</p>`)
    .join("");
}

function getSupplierStorefrontModel(listing = getSelectedListing()) {
  const profile = getSupplierProfile(listing.supplier);
  const supplierListings = listings.filter((item) => item.supplier === profile.supplier);
  const visibleListings = supplierListings.length ? supplierListings : [listing];
  const passportScores = visibleListings.map((item) => getTrustPassport(item).score);
  const averagePassport = Math.round(passportScores.reduce((total, score) => total + score, 0) / passportScores.length);
  const yardRows = getYardModel().rows.filter((row) => row.listing.supplier === profile.supplier);
  const yardScore = yardRows.length
    ? Math.round(yardRows.reduce((total, row) => total + row.score, 0) / yardRows.length)
    : 70;
  const verifiedBonus = visibleListings.every((item) => item.verified) ? 8 : -6;
  const serviceDepth = Math.min(10, profile.services.length * 2);
  const proofDepth = Math.min(10, profile.proof.length * 2);
  const score = Math.max(0, Math.min(100, Math.round(
    averagePassport * 0.42
    + yardScore * 0.28
    + serviceDepth
    + proofDepth
    + verifiedBonus
  )));
  const badge = score >= 86 ? "Storefront ready" : score >= 66 ? "Strong profile" : "Needs proof";

  return {
    profile,
    listing,
    visibleListings,
    visibleFleetCount: visibleListings.length,
    averagePassport,
    yardScore,
    score,
    badge
  };
}

function renderSupplierWorkbench() {
  const model = getSupplierWorkbenchModel();
  setText("#supplierWorkbenchTitle", model.title);
  setText("#supplierWorkbenchBadge", model.badge);

  document.querySelector("#supplierWorkbenchScore").innerHTML = `
    <strong>${model.score}/100</strong>
    <span>${escapeHtml(model.summary)}</span>
  `;

  document.querySelector("#supplierWorkbenchNext").innerHTML = `
    <span>Next best move</span>
    <strong>${escapeHtml(model.nextStage.label)}</strong>
    <p>${escapeHtml(model.nextStage.detail)}</p>
    <button type="button" class="solid-button" data-supplier-target="${escapeHtml(model.nextStage.anchor)}" data-supplier-label="${escapeHtml(model.nextStage.label)}">${escapeHtml(model.nextStage.action)}</button>
  `;

  document.querySelector("#supplierWorkbenchFlow").innerHTML = model.stages.map((stage, index) => `
    <button type="button" class="supplier-workbench-step ${escapeHtml(stage.statusClass)}" data-supplier-target="${escapeHtml(stage.anchor)}" data-supplier-label="${escapeHtml(stage.label)}">
      <em>${index + 1}</em>
      <span>
        <strong>${escapeHtml(stage.label)}</strong>
        ${escapeHtml(stage.detail)}
      </span>
      <b>${stage.score}/100</b>
      <small>${escapeHtml(stage.status)}</small>
    </button>
  `).join("");

  document.querySelector("#supplierWorkbenchPacket").innerHTML = model.packet.map((item) => `
    <div>
      <span>${escapeHtml(item.label)}</span>
      <strong>${escapeHtml(item.value)}</strong>
    </div>
  `).join("");

  document.querySelectorAll("[data-supplier-target]").forEach((button) => {
    button.addEventListener("click", () => {
      const target = document.querySelector(button.dataset.supplierTarget);
      if (!target) return;
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      window.location.hash = button.dataset.supplierTarget;
      showToast(`${button.dataset.supplierLabel || "Supplier step"} opened.`);
    });
  });
}

function getSupplierWorkbenchModel() {
  const selected = getSelectedListing();
  const profile = getSupplierProfile(selected.supplier);
  const studio = getSupplierStudioModel(selected);
  const storefront = getSupplierStorefrontModel(selected);
  const fleetImport = getFleetImportModel(selected);
  const proofVault = getProofVaultModel(selected);
  const revenueDesk = getRevenueDeskModel(selected);
  const leadDesk = getLeadDeskModel(selected);
  const accountHealth = getAccountHealthModel(selected);
  const stages = [
    makeSupplierStage({
      label: "Studio profile",
      anchor: "#studio",
      score: studio.profileCompletion,
      detail: `${studio.listings.length} visible listing${studio.listings.length === 1 ? "" : "s"}, ${studio.docGaps} proof gap${studio.docGaps === 1 ? "" : "s"}, ${studio.availabilityGaps} availability item${studio.availabilityGaps === 1 ? "" : "s"} to confirm.`,
      action: studio.profileCompletion >= 84 ? "Review studio" : "Complete profile"
    }),
    makeSupplierStage({
      label: "Storefront",
      anchor: "#storefront",
      score: storefront.score,
      detail: `/suppliers/${profile.slug}/ with ${storefront.visibleFleetCount} public listing${storefront.visibleFleetCount === 1 ? "" : "s"} and Trust Passport average ${storefront.averagePassport}/100.`,
      action: storefront.score >= 84 ? "Use storefront" : "Improve storefront"
    }),
    makeSupplierStage({
      label: "Fleet import",
      anchor: "#fleet-import",
      score: fleetImport.score,
      detail: `${fleetImport.readyListings} import-ready paid listing${fleetImport.readyListings === 1 ? "" : "s"} can add USD ${fleetImport.annualRevenue.toLocaleString()} ARR.`,
      action: fleetImport.readyListings ? "Publish rows" : "Clean import"
    }),
    makeSupplierStage({
      label: "Proof Vault",
      anchor: "#proof-vault",
      score: proofVault.score,
      detail: `${proofVault.readyCount} buyer-ready proof item${proofVault.readyCount === 1 ? "" : "s"}, ${proofVault.expiringCount} expiring, ${proofVault.missingCount} missing.`,
      action: proofVault.expiringCount || proofVault.missingCount ? "Clean proof" : "Use proof"
    }),
    makeSupplierStage({
      label: "Revenue Desk",
      anchor: "#revenue-desk",
      score: revenueDesk.score,
      detail: `${revenueDesk.paidListings} paid listing${revenueDesk.paidListings === 1 ? "" : "s"}, USD ${revenueDesk.annualRevenue.toLocaleString()} ARR, ${revenueDesk.renewalRiskCount} renewal risk.`,
      action: revenueDesk.renewalRiskCount ? "Save renewals" : "Grow listings"
    }),
    makeSupplierStage({
      label: "Lead Desk",
      anchor: "#lead-desk",
      score: leadDesk.active.score,
      detail: `${leadDesk.hotCount} hot lead${leadDesk.hotCount === 1 ? "" : "s"}, USD ${leadDesk.totalBudget.toLocaleString()} direct enquiry pipeline.`,
      action: leadDesk.hotCount ? "Reply now" : "Review leads"
    }),
    makeSupplierStage({
      label: "Account Health",
      anchor: "#account-health",
      score: accountHealth.score,
      detail: `${accountHealth.riskCount} risk signal${accountHealth.riskCount === 1 ? "" : "s"} before renewal, with USD ${accountHealth.expansionArr.toLocaleString()} expansion ARR visible.`,
      action: accountHealth.riskCount ? "Fix account" : "Expand account"
    }),
    makeSupplierStage({
      label: "Yard freshness",
      anchor: "#yard",
      score: studio.yardScore,
      detail: `${studio.freshnessLabel}. Reconfirm availability before routing serious buyer enquiries.`,
      action: studio.yardScore >= 84 ? "Keep fresh" : "Refresh yard"
    })
  ];
  const score = Math.round(stages.reduce((total, stage) => total + stage.score, 0) / stages.length);
  const nextStage = [...stages]
    .filter((stage) => stage.status !== "Ready")
    .sort((a, b) => a.score - b.score)[0] || stages[stages.length - 1];
  const badge = score >= 84 ? "Supplier-ready" : score >= 68 ? "Revenue path" : "Repair desk";
  const proofGaps = proofVault.expiringCount + proofVault.missingCount;
  const summary = `${profile.supplier} has USD ${revenueDesk.annualRevenue.toLocaleString()} listing ARR, USD ${leadDesk.totalBudget.toLocaleString()} direct pipeline, ${proofGaps} proof risk${proofGaps === 1 ? "" : "s"}, and ${fleetImport.readyListings} import-ready listing${fleetImport.readyListings === 1 ? "" : "s"}.`;

  return {
    selected,
    profile,
    studio,
    storefront,
    fleetImport,
    proofVault,
    revenueDesk,
    leadDesk,
    accountHealth,
    score,
    badge,
    title: `${profile.supplier} supplier desk`,
    summary,
    stages,
    nextStage,
    packet: [
      { label: "Supplier", value: `${profile.supplier} - ${profile.branch}` },
      { label: "Public profile", value: `/suppliers/${profile.slug}/` },
      { label: "Current listing ARR", value: `USD ${revenueDesk.annualRevenue.toLocaleString()}` },
      { label: "Direct enquiry pipeline", value: `USD ${leadDesk.totalBudget.toLocaleString()} / ${leadDesk.hotCount} hot lead${leadDesk.hotCount === 1 ? "" : "s"}` },
      { label: "Import upside", value: `USD ${fleetImport.annualRevenue.toLocaleString()} ARR from ${fleetImport.readyListings} ready listing${fleetImport.readyListings === 1 ? "" : "s"}` },
      { label: "Next action", value: `${nextStage.label}: ${nextStage.action}` },
      { label: "Payment rule", value: "Supplier keeps rental payment direct; Heavyster earns listing SaaS revenue" }
    ]
  };
}

function makeSupplierStage(stage) {
  const status = stage.score >= 84 ? "Ready" : stage.score >= 64 ? "Review" : "Gap";
  return {
    ...stage,
    status,
    statusClass: status.toLowerCase()
  };
}

function renderFleetImport() {
  const model = getFleetImportModel();
  setText("#fleetImportTitle", model.profile.supplier);
  setText("#fleetImportBadge", model.badge);

  document.querySelector("#fleetImportScore").innerHTML = `
    <strong>${model.score}/100</strong>
    <span>${model.readyRows} clean row${model.readyRows === 1 ? "" : "s"} can become ${model.readyListings} paid listing${model.readyListings === 1 ? "" : "s"}.</span>
  `;

  document.querySelector("#fleetImportMetrics").innerHTML = [
    ["Import rows", String(model.totalRows)],
    ["Machine count", String(model.totalListings)],
    ["Ready listings", String(model.readyListings)],
    ["Annual ARR", `USD ${model.annualRevenue.toLocaleString()}`]
  ].map(([label, value]) => `
    <span><strong>${escapeHtml(value)}</strong>${escapeHtml(label)}</span>
  `).join("");

  document.querySelector("#fleetImportQueue").innerHTML = model.rows.map((row) => `
    <button type="button" class="fleet-import-row ${row.statusClass}" data-import-listing="${escapeHtml(row.matchingListingId)}">
      <span>
        <strong>${escapeHtml(row.source.equipment)}</strong>
        ${escapeHtml(row.source.count)} item${row.source.count === 1 ? "" : "s"} - ${escapeHtml(row.source.category)} - ${escapeHtml(row.source.region)}
      </span>
      <em>${row.score}/100</em>
      <small>${escapeHtml(row.status)}</small>
      <b>${escapeHtml(row.action)}</b>
    </button>
  `).join("");

  document.querySelector("#fleetImportGates").innerHTML = model.gates.map((gate, index) => `
    <div class="fleet-import-gate ${gate.statusClass}">
      <strong>${index + 1}</strong>
      <span>${escapeHtml(gate.label)}<small>${escapeHtml(gate.detail)}</small></span>
      <em>${escapeHtml(gate.status)}</em>
    </div>
  `).join("");

  document.querySelector("#fleetImportPlan").innerHTML = buildFleetImportText(model)
    .split("\n")
    .filter(Boolean)
    .map((line) => `<p>${escapeHtml(line)}</p>`)
    .join("");

  document.querySelectorAll("[data-import-listing]").forEach((button) => {
    button.addEventListener("click", () => {
      const listing = listings.find((item) => item.id === button.dataset.importListing);
      if (!listing) return;
      state.selectedListingId = listing.id;
      state.commandRole = "Supplier";
      saveState();
      render();
      document.querySelector("#fleet-import").scrollIntoView({ behavior: "smooth", block: "start" });
      showToast("Import row matched to supplier listing.");
    });
  });
}

function getFleetImportModel(listing = getSelectedListing()) {
  const profile = getSupplierProfile(listing.supplier);
  const supplierListings = listings.filter((item) => item.supplier === profile.supplier);
  const sourceRows = fleetImportRows.filter((row) => row.supplier === profile.supplier);
  const fallbackRows = sourceRows.length ? sourceRows : [{
    id: `FI-${listing.id}`,
    supplier: profile.supplier,
    source: "starter-import.csv",
    equipment: listing.name,
    category: listing.category,
    region: listing.region,
    count: 1,
    photos: true,
    documents: listing.documents.length > 1,
    availability: listing.availability === "available",
    rateTerms: Boolean(listing.rate),
    contact: true
  }];
  const rows = fallbackRows.map((row) => getFleetImportRow(row, supplierListings, listing));
  const totalRows = rows.length;
  const totalListings = rows.reduce((total, row) => total + row.source.count, 0);
  const readyRows = rows.filter((row) => row.status === "Ready").length;
  const readyListings = rows.filter((row) => row.score >= 78).reduce((total, row) => total + row.source.count, 0);
  const gapRows = rows.filter((row) => row.status === "Gap").length;
  const averageScore = Math.round(rows.reduce((total, row) => total + row.score, 0) / rows.length);
  const score = Math.max(0, Math.min(100, Math.round(averageScore + Math.min(8, readyRows * 2) - gapRows * 4)));
  const badge = score >= 84 ? "Import-ready" : score >= 64 ? "Clean gaps" : "Hold import";
  const annualRevenue = readyListings * 99;
  const gates = getFleetImportGates(rows, profile);

  return {
    profile,
    rows,
    totalRows,
    totalListings,
    readyRows,
    readyListings,
    gapRows,
    score,
    badge,
    annualRevenue,
    gates
  };
}

function getFleetImportRow(row, supplierListings, selected) {
  const matching = supplierListings.find((listing) =>
    listing.name.toLowerCase().includes(row.equipment.toLowerCase().split(" ")[0])
    || row.equipment.toLowerCase().includes(listing.name.toLowerCase().split(" ")[0])
  ) || selected;
  const checks = [
    row.photos,
    row.documents,
    row.availability,
    row.rateTerms,
    row.contact
  ];
  const complete = checks.filter(Boolean).length;
  const score = Math.round((complete / checks.length) * 100);
  const missing = [
    !row.photos ? "photos" : "",
    !row.documents ? "documents" : "",
    !row.availability ? "availability" : "",
    !row.rateTerms ? "rate terms" : "",
    !row.contact ? "contact route" : ""
  ].filter(Boolean);
  const status = score >= 80 ? "Ready" : score >= 60 ? "Review" : "Gap";
  const action = status === "Ready" ? "Publish" : missing.length ? `Add ${missing[0]}` : "Review";

  return {
    source: row,
    matchingListingId: matching.id,
    score,
    status,
    statusClass: status.toLowerCase(),
    missing,
    action
  };
}

function getFleetImportGates(rows, profile) {
  const total = rows.length || 1;
  const photoReady = rows.filter((row) => row.source.photos).length;
  const documentReady = rows.filter((row) => row.source.documents).length;
  const availabilityReady = rows.filter((row) => row.source.availability).length;
  const termsReady = rows.filter((row) => row.source.rateTerms).length;
  const contactReady = rows.filter((row) => row.source.contact).length;
  const gates = [
    ["Photos", photoReady, "Each machine needs at least one clear yard or site photo."],
    ["Documents", documentReady, "License, insurance, inspection, load test, or operator proof should be linked where relevant."],
    ["Availability", availabilityReady, "Rows need available now, available soon, or call-to-confirm status before publish."],
    ["Rate terms", termsReady, "Direct quote is fine, but operator, transport, fuel, permit, and validity notes should be visible."],
    ["Lead route", contactReady, "Phone, email, WhatsApp, or web enquiry route must be attached to the supplier profile."]
  ];

  return gates.map(([label, count, detail]) => {
    const status = count === total ? "Ready" : count >= Math.ceil(total * 0.6) ? "Review" : "Gap";
    return {
      label,
      detail: `${count}/${total} ${profile.supplier} row${total === 1 ? "" : "s"} pass. ${detail}`,
      status,
      statusClass: status.toLowerCase()
    };
  });
}

function renderProofVault() {
  const model = getProofVaultModel();
  setText("#proofVaultTitle", model.profile.supplier);
  setText("#proofVaultBadge", model.badge);

  document.querySelector("#proofVaultScore").innerHTML = `
    <strong>${model.score}/100</strong>
    <span>${model.readyCount} buyer-ready proof item${model.readyCount === 1 ? "" : "s"}, ${model.expiringCount} expiring soon, ${model.missingCount} missing.</span>
  `;

  document.querySelector("#proofVaultMetrics").innerHTML = [
    ["Proof items", String(model.rows.length)],
    ["Buyer-ready", String(model.readyCount)],
    ["Expiring", String(model.expiringCount)],
    ["Blocked", String(model.missingCount)]
  ].map(([label, value]) => `
    <span><strong>${escapeHtml(value)}</strong>${escapeHtml(label)}</span>
  `).join("");

  document.querySelector("#proofVaultQueue").innerHTML = model.rows.map((row) => `
    <button type="button" class="proof-vault-row ${row.statusClass}" data-proof-listing="${escapeHtml(row.listingId)}">
      <span>
        <strong>${escapeHtml(row.type)}</strong>
        ${escapeHtml(row.target)} - ${escapeHtml(row.holder)}
      </span>
      <em>${row.score}/100</em>
      <small>${escapeHtml(row.expiryLabel)}</small>
      <b>${escapeHtml(row.action)}</b>
    </button>
  `).join("");

  document.querySelector("#proofVaultGates").innerHTML = model.gates.map((gate, index) => `
    <div class="proof-vault-gate ${gate.statusClass}">
      <strong>${index + 1}</strong>
      <span>${escapeHtml(gate.label)}<small>${escapeHtml(gate.detail)}</small></span>
      <em>${escapeHtml(gate.status)}</em>
    </div>
  `).join("");

  document.querySelector("#proofVaultPacket").innerHTML = buildProofVaultText(model)
    .split("\n")
    .filter(Boolean)
    .map((line) => `<p>${escapeHtml(line)}</p>`)
    .join("");

  document.querySelectorAll("[data-proof-listing]").forEach((button) => {
    button.addEventListener("click", () => {
      const listing = listings.find((item) => item.id === button.dataset.proofListing);
      if (!listing) return;
      state.selectedListingId = listing.id;
      state.commandRole = "Supplier";
      saveState();
      render();
      document.querySelector("#proof-vault").scrollIntoView({ behavior: "smooth", block: "start" });
      showToast("Proof item matched to supplier listing.");
    });
  });
}

function getProofVaultModel(listing = getSelectedListing()) {
  const profile = getSupplierProfile(listing.supplier);
  const supplierListings = listings.filter((item) => item.supplier === profile.supplier);
  const sourceRows = proofVaultRows.filter((row) => row.supplier === profile.supplier);
  const fallbackRows = sourceRows.length ? sourceRows : listing.documents.map((document, index) => ({
    id: `PV-${listing.id}-${index}`,
    supplier: profile.supplier,
    listingId: listing.id,
    type: document,
    target: listing.name,
    status: document.toLowerCase().includes("pending") ? "missing" : "ready",
    expiresInDays: document.toLowerCase().includes("pending") ? null : 75 + index * 18,
    holder: "Supplier admin",
    action: document.toLowerCase().includes("pending") ? "Upload before verified badge" : "Attach to listing"
  }));
  const rows = sourceRows.length ? sourceRows.map((row) => enrichProofVaultRow(row, supplierListings, listing)) : fallbackRows.map((row) => enrichProofVaultRow(row, supplierListings, listing));
  const readyCount = rows.filter((row) => row.status === "Ready").length;
  const expiringCount = rows.filter((row) => row.status === "Expiring").length;
  const missingCount = rows.filter((row) => row.status === "Missing").length;
  const averageScore = Math.round(rows.reduce((total, row) => total + row.score, 0) / rows.length);
  const score = Math.max(0, Math.min(100, Math.round(averageScore + Math.min(8, readyCount) - expiringCount * 3 - missingCount * 8)));
  const badge = score >= 86 && missingCount === 0 ? "Buyer-ready" : score >= 66 ? "Refresh proof" : "Hold badge";
  const gates = getProofVaultGates(rows, profile);

  return {
    profile,
    rows,
    readyCount,
    expiringCount,
    missingCount,
    score,
    badge,
    gates
  };
}

function enrichProofVaultRow(row, supplierListings, selected) {
  const listing = listings.find((item) => item.id === row.listingId)
    || supplierListings.find((item) => item.name.toLowerCase().includes(row.target.toLowerCase().split(" ")[0]))
    || selected;
  const normalized = row.status === "ready" && row.expiresInDays !== null && row.expiresInDays <= 30 ? "expiring" : row.status;
  const status = normalized === "ready" ? "Ready" : normalized === "expiring" ? "Expiring" : "Missing";
  const score = status === "Ready" ? Math.min(100, 82 + Math.min(16, Math.floor((row.expiresInDays || 0) / 18))) : status === "Expiring" ? 58 : 24;
  const expiryLabel = status === "Missing"
    ? "Not uploaded"
    : row.expiresInDays <= 0
      ? "Expired"
      : `${row.expiresInDays}d to expiry`;

  return {
    ...row,
    listingId: listing.id,
    status,
    statusClass: status.toLowerCase(),
    score,
    expiryLabel,
    action: row.action || (status === "Ready" ? "Attach" : status === "Expiring" ? "Renew" : "Upload")
  };
}

function getProofVaultGates(rows, profile) {
  const hasCompany = rows.some((row) => row.status !== "Missing" && /license|registry|gst|business/i.test(row.type));
  const hasInsurance = rows.some((row) => row.status !== "Missing" && /insurance/i.test(row.type));
  const hasInspection = rows.some((row) => row.status !== "Missing" && /inspection|load test|service|maintenance/i.test(row.type));
  const hasOperator = rows.some((row) => row.status !== "Missing" && /operator|crew|permit/i.test(row.type));
  const noUrgentExpiry = rows.every((row) => row.status !== "Expiring");
  const gates = [
    ["Company proof", hasCompany, `${profile.supplier} needs current legal or trade proof attached to the public profile.`],
    ["Insurance proof", hasInsurance, "Insurance should be visible before buyers route serious enquiries."],
    ["Machine proof", hasInspection, "Inspection, load test, service record, or maintenance evidence should support equipment pages."],
    ["Operator or permit proof", hasOperator, "Operator license, crew proof, city permit note, or site access note should be visible when relevant."],
    ["Expiry control", noUrgentExpiry, "No proof item should be inside a 30-day expiry window before high-value enquiries are routed."]
  ];

  return gates.map(([label, ready, detail]) => ({
    label,
    detail,
    status: ready ? "Ready" : "Gap",
    statusClass: ready ? "ready" : "gap"
  }));
}

function renderRevenueDesk() {
  const model = getRevenueDeskModel();
  setText("#revenueDeskTitle", model.profile.supplier);
  setText("#revenueDeskBadge", model.badge);

  document.querySelector("#revenueDeskScore").innerHTML = `
    <strong>${model.score}/100</strong>
    <span>${model.paidListings} paid listing${model.paidListings === 1 ? "" : "s"}, USD ${model.monthlyRevenue.toLocaleString()} monthly SaaS revenue, USD ${model.annualRevenue.toLocaleString()} annualized listing revenue.</span>
  `;

  document.querySelector("#revenueDeskMetrics").innerHTML = [
    ["Paid listings", String(model.paidListings)],
    ["Monthly SaaS", `USD ${model.monthlyRevenue.toLocaleString()}`],
    ["Annualized ARR", `USD ${model.annualRevenue.toLocaleString()}`],
    ["Renewal risk", String(model.renewalRiskCount)]
  ].map(([label, value]) => `
    <span><strong>${escapeHtml(value)}</strong>${escapeHtml(label)}</span>
  `).join("");

  document.querySelector("#revenueDeskQueue").innerHTML = model.rows.map((row) => `
    <button type="button" class="revenue-desk-row ${row.statusClass}" data-revenue-listing="${escapeHtml(row.listingId)}">
      <span>
        <strong>${escapeHtml(row.package)}</strong>
        ${row.listings} listing${row.listings === 1 ? "" : "s"} - ${escapeHtml(row.planLabel)}
        <small>${escapeHtml(row.signal)} - ${escapeHtml(row.action)}</small>
      </span>
      <em>USD ${row.monthlyRevenue.toLocaleString()}/mo</em>
      <small>${escapeHtml(row.renewalLabel)}</small>
      <b>${escapeHtml(row.status)}</b>
    </button>
  `).join("");

  document.querySelector("#revenueDeskPlaybook").innerHTML = model.playbook.map((step, index) => `
    <div class="revenue-desk-step ${step.statusClass}">
      <strong>${index + 1}</strong>
      <span>${escapeHtml(step.label)}<small>${escapeHtml(step.detail)}</small></span>
      <em>${escapeHtml(step.status)}</em>
    </div>
  `).join("");

  document.querySelector("#revenueDeskPacket").innerHTML = buildRevenueDeskText(model)
    .split("\n")
    .filter(Boolean)
    .map((line) => `<p>${escapeHtml(line)}</p>`)
    .join("");

  document.querySelectorAll("[data-revenue-listing]").forEach((button) => {
    button.addEventListener("click", () => {
      const listing = listings.find((item) => item.id === button.dataset.revenueListing);
      if (!listing) return;
      state.selectedListingId = listing.id;
      state.commandRole = "Supplier";
      saveState();
      render();
      document.querySelector("#revenue-desk").scrollIntoView({ behavior: "smooth", block: "start" });
      showToast("Revenue row matched to supplier listing.");
    });
  });
}

function getRevenueDeskModel(listing = getSelectedListing()) {
  const profile = getSupplierProfile(listing.supplier);
  const supplierListings = listings.filter((item) => item.supplier === profile.supplier);
  const sourceRows = listingRevenueRows.filter((row) => row.supplier === profile.supplier);
  const fallbackListings = supplierListings.length ? supplierListings : [listing];
  const fallbackRows = fallbackListings.map((item, index) => ({
    id: `RD-${item.id}-${index}`,
    supplier: profile.supplier,
    listingId: item.id,
    package: item.name,
    plan: index % 2 === 0 ? "annual" : "monthly",
    status: item.availability === "available" ? "active" : "paused",
    listings: 1,
    renewalDays: item.availability === "available" ? 45 + index * 14 : null,
    signal: `${item.category} listing in ${item.region}`,
    action: "Confirm billing status"
  }));
  const rows = (sourceRows.length ? sourceRows : fallbackRows).map((row) => enrichRevenueDeskRow(row, supplierListings, listing));
  const paidRows = rows.filter((row) => row.isPaid);
  const paidListings = paidRows.reduce((total, row) => total + row.listings, 0);
  const pendingListings = rows.filter((row) => !row.isPaid).reduce((total, row) => total + row.listings, 0);
  const monthlyRevenue = paidRows.reduce((total, row) => total + row.monthlyRevenue, 0);
  const annualRevenue = paidRows.reduce((total, row) => total + row.annualRevenue, 0);
  const renewalRiskCount = rows.filter((row) => row.statusClass === "renewal-risk").reduce((total, row) => total + row.listings, 0);
  const pausedCount = rows.filter((row) => row.statusClass === "paused").reduce((total, row) => total + row.listings, 0);
  const draftCount = rows.filter((row) => row.statusClass === "draft").reduce((total, row) => total + row.listings, 0);
  const annualListings = paidRows.filter((row) => row.plan === "annual").reduce((total, row) => total + row.listings, 0);
  const annualShare = paidListings ? Math.round((annualListings / paidListings) * 100) : 0;
  const score = Math.max(0, Math.min(100, Math.round(58 + Math.min(18, paidListings) + annualShare * 0.12 - renewalRiskCount * 3 - pausedCount * 4 - draftCount * 2)));
  const badge = score >= 86 && renewalRiskCount === 0 ? "Revenue clean" : score >= 70 ? "Renewal focus" : "Activate listings";
  const proofVault = getProofVaultModel(listing);
  const playbook = getRevenueDeskPlaybook(rows, profile, proofVault);

  return {
    profile,
    rows,
    paidRows,
    paidListings,
    pendingListings,
    monthlyRevenue,
    annualRevenue,
    renewalRiskCount,
    pausedCount,
    draftCount,
    annualShare,
    score,
    badge,
    playbook
  };
}

function enrichRevenueDeskRow(row, supplierListings, selected) {
  const listing = listings.find((item) => item.id === row.listingId)
    || supplierListings.find((item) => String(row.package || "").toLowerCase().includes(item.name.toLowerCase().split(" ")[0]))
    || selected;
  const statusClass = ["active", "renewal-risk", "paused", "draft"].includes(row.status) ? row.status : "active";
  const status = statusClass === "renewal-risk"
    ? "Renewal risk"
    : statusClass.charAt(0).toUpperCase() + statusClass.slice(1);
  const plan = row.plan === "annual" ? "annual" : "monthly";
  const listingsCount = Math.max(1, Number(row.listings || 1));
  const isPaid = statusClass === "active" || statusClass === "renewal-risk";
  const monthlyRevenue = isPaid ? plan === "annual" ? Math.round((listingsCount * 99) / 12) : listingsCount * 9 : 0;
  const annualRevenue = isPaid ? plan === "annual" ? listingsCount * 99 : listingsCount * 108 : 0;
  const renewalDays = row.renewalDays === null ? null : Number(row.renewalDays || 0);
  const renewalLabel = statusClass === "draft"
    ? "Not live"
    : statusClass === "paused"
      ? "Paused"
      : renewalDays <= 14
        ? `Renew in ${renewalDays}d`
        : `${renewalDays}d renewal`;
  const planLabel = plan === "annual" ? "Annual USD 99" : "Monthly USD 9";
  const score = statusClass === "active"
    ? Math.min(100, (plan === "annual" ? 86 : 76) + Math.min(12, Math.floor((renewalDays || 45) / 10)))
    : statusClass === "renewal-risk"
      ? Math.max(42, 66 - Math.max(0, 14 - (renewalDays || 0)))
      : statusClass === "draft"
        ? 48
        : 34;

  return {
    ...row,
    listingId: listing.id,
    plan,
    listings: listingsCount,
    status,
    statusClass,
    isPaid,
    monthlyRevenue,
    annualRevenue,
    renewalLabel,
    planLabel,
    score,
    action: row.action || (statusClass === "active" ? "Keep live" : statusClass === "renewal-risk" ? "Renew now" : statusClass === "draft" ? "Publish" : "Reactivate")
  };
}

function getRevenueDeskPlaybook(rows, profile, proofVault) {
  const renewalRisk = rows.filter((row) => row.statusClass === "renewal-risk").reduce((total, row) => total + row.listings, 0);
  const monthlyPaid = rows.filter((row) => row.isPaid && row.plan === "monthly").reduce((total, row) => total + row.listings, 0);
  const dormant = rows.filter((row) => row.statusClass === "paused" || row.statusClass === "draft").reduce((total, row) => total + row.listings, 0);
  const proofRisk = proofVault.expiringCount + proofVault.missingCount;

  return [
    {
      label: "Save renewals",
      detail: renewalRisk ? `${renewalRisk} ${profile.supplier} paid listing${renewalRisk === 1 ? "" : "s"} need renewal attention before visibility drops.` : "No urgent renewal risk in this supplier workspace.",
      status: renewalRisk ? "Action" : "Ready",
      statusClass: renewalRisk ? "review" : "ready"
    },
    {
      label: "Shift monthly to annual",
      detail: monthlyPaid ? `${monthlyPaid} monthly listing${monthlyPaid === 1 ? "" : "s"} can move from USD 9 monthly to USD 99 yearly and reduce churn.` : "Paid listings are already mostly annual or clean.",
      status: monthlyPaid ? "Upsell" : "Ready",
      statusClass: monthlyPaid ? "review" : "ready"
    },
    {
      label: "Activate dormant inventory",
      detail: dormant ? `${dormant} paused or draft listing${dormant === 1 ? "" : "s"} can become new listing revenue after photos, proof, or availability are clean.` : "No dormant supplier rows are blocking paid-listing revenue.",
      status: dormant ? "Open" : "Ready",
      statusClass: dormant ? "gap" : "ready"
    },
    {
      label: "Protect trust before billing",
      detail: proofRisk ? `${proofRisk} proof item${proofRisk === 1 ? "" : "s"} should be refreshed so renewal feels tied to buyer trust, not only a bill.` : "Proof Vault is clean enough to support renewal and annual-plan conversations.",
      status: proofRisk ? "Review" : "Ready",
      statusClass: proofRisk ? "review" : "ready"
    },
    {
      label: "Keep rental payment direct",
      detail: "Revenue Desk tracks Heavyster listing subscription value only. Buyer and supplier still settle rental payment directly in phase one.",
      status: "Clean",
      statusClass: "ready"
    }
  ];
}

function getSupplierProfile(supplierName) {
  return supplierProfiles.find((profile) => profile.supplier === supplierName)
    || {
      supplier: supplierName,
      slug: supplierName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
      headline: "Verified equipment rental supplier with direct enquiry routing.",
      branch: getSelectedListing().city + ", " + getSelectedListing().region,
      serviceArea: "Local and regional project sites",
      response: "Confirm",
      since: "Founder review",
      fleet: [{ label: getSelectedListing().category, count: 1, status: "Confirm" }],
      services: ["Direct enquiry routing", "Document checklist", "Availability update"],
      proof: getSelectedListing().documents
    };
}

function prepareDemandFromSearch() {
  state.demandEquipment = getDemandEquipmentFromSearch();
  state.demandRegion = state.region === "all" ? getSelectedListing().region : state.region;
  state.demandUrgency = state.availability === "soon" ? "Next week" : "This week";
  state.demandDuration = state.demandDuration || "5 days";
}

function getDemandEquipmentFromSearch() {
  const query = state.search.trim();
  if (query) return toTitleCase(query);
  if (state.category !== "all") return `${state.category} equipment`;
  return getSelectedListing().name;
}

function renderDemandCapture() {
  const totalDemand = getDemandSignals().reduce((total, signal) => total + Number(signal.count || 1), 0);
  document.querySelector("#demandEquipment").value = state.demandEquipment || "";
  document.querySelector("#demandRegion").value = state.demandRegion || "UAE";
  document.querySelector("#demandUrgency").value = state.demandUrgency || "This week";
  document.querySelector("#demandDuration").value = state.demandDuration || "";
  setText("#demandSignalCount", `${totalDemand} signals`);
}

function saveDemandSignal(source = "Buyer request", readInputs = true) {
  if (readInputs) updateDemandState();

  const equipment = normalizeDemandEquipment(state.demandEquipment || getDemandEquipmentFromSearch());
  const region = state.demandRegion || "UAE";
  const urgency = state.demandUrgency || "This week";
  const duration = state.demandDuration || "5 days";
  const signals = getDemandSignals();
  const existing = signals.find((signal) =>
    signal.equipment.toLowerCase() === equipment.toLowerCase()
    && signal.region === region
    && signal.urgency === urgency
  );

  if (existing) {
    existing.count = Number(existing.count || 1) + 1;
    existing.duration = duration;
    existing.source = source;
  } else {
    signals.unshift({ equipment, region, urgency, duration, source, count: 1 });
  }

  state.demandEquipment = equipment;
  state.demandRegion = region;
  state.demandUrgency = urgency;
  state.demandDuration = duration;
  state.demandSignals = signals.slice(0, 8);
  state.activeDemandKey = getDemandKey({ equipment, region, urgency });
  state.activeMarketKey = getMarketKeyFromSignal({ equipment, region, urgency });
  saveState();
  renderDemandCapture();
  renderDemandRadar();
  renderSupplierHunt();
  renderMarketSignalMatrix();
  renderMarketMaker();
  renderPageFactory();
  renderLaunchRoom();
  renderMarketTwin();
  renderLiquidityFlywheel();
  renderFounderAutopilot();
  renderDemandExchange();
  renderProofDemandRoom();
  renderSupplierCommitmentRoom();
  renderListingActivationRoom();
  renderTrustRevenueLedger();
  renderFounderWorkbench();
  renderFounderMorningBrief();
  renderFounderDailyMoves();
  renderFounderCallSheet();
  showToast(`${equipment} demand saved for ${region}.`);
}

function getDemandSignals() {
  if (!Array.isArray(state.demandSignals)) {
    state.demandSignals = seedDemandSignals.map((signal) => ({ ...signal }));
  }
  return state.demandSignals;
}

function normalizeDemandEquipment(value) {
  const cleaned = String(value || "").trim().replace(/\s+/g, " ");
  return cleaned ? toTitleCase(cleaned) : "Heavy equipment";
}

function renderSupplierTable() {
  const model = getSupplierStudioModel();
  setText("#studioSupplierName", model.profile.supplier);

  document.querySelector("#studioHealth").innerHTML = [
    ["Profile", `${model.profileCompletion}/100`, model.profileCompletion >= 82 ? "Ready" : "Improve"],
    ["Storefront", `${model.storefront.score}/100`, model.storefront.badge],
    ["Listing revenue", `USD ${model.monthlyRevenue.toLocaleString()}/mo`, `USD ${model.annualRevenue.toLocaleString()}/yr`],
    ["Freshness", `${model.yardScore}/100`, model.freshnessLabel]
  ].map(([label, value, detail]) => `
    <span>
      <strong>${escapeHtml(value)}</strong>
      ${escapeHtml(label)}
      <small>${escapeHtml(detail)}</small>
    </span>
  `).join("");

  document.querySelector("#studioOps").innerHTML = model.ops.map((item) => `
    <div class="studio-op ${item.statusClass}">
      <span>
        <strong>${escapeHtml(item.label)}</strong>
        ${escapeHtml(item.detail)}
      </span>
      <em>${escapeHtml(item.status)}</em>
    </div>
  `).join("");

  document.querySelector("#supplierTable").innerHTML = model.listings.map((listing) => {
    const passport = getTrustPassport(listing);
    const yardRow = getYardRow(listing, listings.findIndex((item) => item.id === listing.id));
    return `
    <button type="button" class="supplier-row ${listing.id === state.selectedListingId ? "is-active" : ""}" data-studio-listing-id="${escapeHtml(listing.id)}">
      <div>
        <strong>${escapeHtml(listing.name)}</strong>
        <span>${escapeHtml(listing.category)} - ${escapeHtml(listing.city)} - Trust ${passport.score}/100</span>
      </div>
      <span>${listing.availability === "available" ? "Available" : "Soon"} - ${yardRow.action}</span>
      <em>${listing.verified ? "Paid" : "Draft"}</em>
    </button>
  `;
  }).join("");

  document.querySelectorAll("[data-studio-listing-id]").forEach((row) => {
    row.addEventListener("click", () => {
      state.selectedListingId = row.dataset.studioListingId;
      saveState();
      render();
      showToast("Supplier listing selected.");
    });
  });
}

function getSupplierStudioModel(listing = getSelectedListing()) {
  const selected = listing;
  const storefront = getSupplierStorefrontModel(selected);
  const profile = storefront.profile;
  const supplierListings = listings.filter((listing) => listing.supplier === profile.supplier);
  const visibleListings = supplierListings.length ? supplierListings : [selected];
  const yardRows = visibleListings.map((listing) => getYardRow(listing, listings.findIndex((item) => item.id === listing.id)));
  const docGaps = visibleListings.reduce((total, listing) => (
    total
    + (listing.verified ? 0 : 1)
    + listing.documents.filter((document) => document.toLowerCase().includes("pending")).length
  ), 0);
  const availabilityGaps = visibleListings.filter((listing) => listing.availability !== "available").length;
  const completedSignals = [
    Boolean(profile.headline),
    Boolean(profile.branch),
    Boolean(profile.serviceArea),
    profile.services.length >= 3,
    profile.proof.length >= 3,
    visibleListings.length > 0,
    docGaps === 0,
    availabilityGaps === 0
  ].filter(Boolean).length;
  const profileCompletion = Math.round((completedSignals / 8) * 100);
  const yardScore = yardRows.length
    ? Math.round(yardRows.reduce((total, row) => total + row.score, 0) / yardRows.length)
    : storefront.yardScore;
  const revenueDesk = getRevenueDeskModel(selected);
  const monthlyRevenue = revenueDesk.monthlyRevenue;
  const annualRevenue = revenueDesk.annualRevenue;
  const modeledListings = profile.fleet.reduce((total, lane) => total + lane.count, 0);
  const modeledAnnualRevenue = modeledListings * 99;
  const freshnessLabel = yardScore >= 82 ? "Fresh yard" : yardScore >= 64 ? "Refresh needed" : "Trust risk";
  const publishReady = profileCompletion >= 82 && storefront.score >= 72 && docGaps === 0;

  return {
    profile,
    storefront,
    revenueDesk,
    listings: visibleListings,
    profileCompletion,
    yardScore,
    freshnessLabel,
    monthlyRevenue,
    annualRevenue,
    modeledListings,
    modeledAnnualRevenue,
    docGaps,
    availabilityGaps,
    ops: [
      {
        label: "Publish storefront",
        status: publishReady ? "Ready" : "Improve",
        statusClass: publishReady ? "ready" : "confirm",
        detail: publishReady
          ? `/suppliers/${profile.slug}/ can be shown to buyers.`
          : "Close profile, document, or freshness gaps before pushing hard."
      },
      {
        label: "Document gaps",
        status: docGaps ? "Gap" : "Ready",
        statusClass: docGaps ? "gap" : "ready",
        detail: docGaps ? `${docGaps} supplier or listing proof gap${docGaps === 1 ? "" : "s"} need review.` : "Visible supplier documents are clean for this prototype."
      },
      {
        label: "Availability freshness",
        status: yardScore >= 82 ? "Ready" : yardScore >= 64 ? "Confirm" : "Gap",
        statusClass: yardScore >= 82 ? "ready" : yardScore >= 64 ? "confirm" : "gap",
        detail: `${freshnessLabel}. Reconfirm machines before serious enquiries.`
      },
      {
        label: "Revenue preview",
        status: revenueDesk.renewalRiskCount ? "Renew" : "Track",
        statusClass: revenueDesk.renewalRiskCount ? "confirm" : "direct",
        detail: `${revenueDesk.paidListings} paid listing${revenueDesk.paidListings === 1 ? "" : "s"} = USD ${annualRevenue.toLocaleString()}/yr. Modeled fleet upside: ${modeledListings} listings = USD ${modeledAnnualRevenue.toLocaleString()}/yr.`
      }
    ]
  };
}

function renderLeadDesk() {
  const model = getLeadDeskModel();
  setText("#leadDeskTitle", model.profile.supplier);
  setText("#leadDeskBadge", model.badge);

  document.querySelector("#leadDeskScore").innerHTML = `
    <strong>${model.active.score}/100</strong>
    <span>${escapeHtml(model.active.lead.buyer)} - ${escapeHtml(model.active.lead.equipment)}</span>
  `;

  document.querySelector("#leadDeskMetrics").innerHTML = [
    ["Open leads", String(model.leads.length)],
    ["Pipeline", `USD ${model.totalBudget.toLocaleString()}`],
    ["Hot leads", String(model.hotCount)],
    ["Payment", "Direct"]
  ].map(([label, value]) => `
    <span><strong>${escapeHtml(value)}</strong>${escapeHtml(label)}</span>
  `).join("");

  document.querySelector("#leadDeskQueue").innerHTML = model.leads.map((item) => `
    <button type="button" class="lead-desk-row ${item.lead.id === model.active.lead.id ? "is-active" : ""}" data-lead-id="${escapeHtml(item.lead.id)}">
      <span>
        <strong>${escapeHtml(item.lead.buyer)}</strong>
        ${escapeHtml(item.lead.equipment)} - ${escapeHtml(item.lead.location)}
      </span>
      <em>${item.score}/100</em>
      <small>${escapeHtml(item.ageLabel)}</small>
      <b>${escapeHtml(item.priority)}</b>
    </button>
  `).join("");

  document.querySelector("#leadDeskPlaybook").innerHTML = model.playbook.map((item, index) => `
    <div class="lead-playbook-item ${item.statusClass}">
      <strong>${index + 1}</strong>
      <span>${escapeHtml(item.text)}</span>
      <em>${escapeHtml(item.status)}</em>
    </div>
  `).join("");

  document.querySelector("#leadDeskReply").innerHTML = buildLeadDeskText(model)
    .split("\n")
    .filter(Boolean)
    .map((line) => `<p>${escapeHtml(line)}</p>`)
    .join("");

  document.querySelectorAll("[data-lead-id]").forEach((button) => {
    button.addEventListener("click", () => {
      const item = model.leads.find((leadItem) => leadItem.lead.id === button.dataset.leadId);
      if (!item) return;
      state.selectedListingId = item.listing.id;
      saveState();
      render();
      document.querySelector("#lead-desk").scrollIntoView({ behavior: "smooth", block: "start" });
      showToast("Lead opened for supplier follow-up.");
    });
  });
}

function getLeadDeskModel(listing = getSelectedListing()) {
  const selected = listing;
  const studio = getSupplierStudioModel(selected);
  const profile = studio.profile;
  const supplierListings = listings.filter((listing) => listing.supplier === profile.supplier);
  const rawLeads = supplierLeadSeeds.filter((lead) => lead.supplier === profile.supplier);
  const leads = (rawLeads.length ? rawLeads : [buildFallbackLead(profile, selected)])
    .map((lead) => enrichLead(lead, supplierListings, selected))
    .sort((a, b) => b.score - a.score || a.lead.ageMinutes - b.lead.ageMinutes);
  const active = leads.find((item) => item.listing.id === selected.id) || leads[0];
  const totalBudget = leads.reduce((total, item) => total + item.lead.budget, 0);
  const hotCount = leads.filter((item) => item.priority === "Hot").length;
  const badge = active.priority === "Hot" ? "Reply now" : active.priority === "Warm" ? "Reply today" : "Nurture";
  const playbook = getLeadPlaybook(active, studio);

  return {
    profile,
    studio,
    leads,
    active,
    totalBudget,
    hotCount,
    badge,
    playbook
  };
}

function buildFallbackLead(profile, listing) {
  return {
    id: `LD-${listing.id}`,
    supplier: profile.supplier,
    listingId: listing.id,
    buyer: "Qualified buyer",
    equipment: listing.name,
    project: `${listing.category} rental enquiry`,
    location: `${listing.city}, ${listing.region}`,
    start: "Next week",
    duration: "5 days",
    budget: 6500,
    channel: "Web",
    ageMinutes: 55,
    terms: ["Availability", "Documents", "Quote validity"],
    note: "Buyer needs direct supplier confirmation."
  };
}

function enrichLead(lead, supplierListings, selected) {
  const listing = listings.find((item) => item.id === lead.listingId)
    || supplierListings.find((item) => item.name.toLowerCase().includes(lead.equipment.toLowerCase().split(" ")[0]))
    || selected;
  const passport = getTrustPassport(listing);
  const rowIndex = Math.max(0, listings.findIndex((item) => item.id === listing.id));
  const yard = getYardRow(listing, rowIndex);
  const durationDays = parseDurationDays(lead.duration);
  const dailyValue = Math.round(lead.budget / durationDays);
  const band = getQuoteBand(listing);
  const rateFit = dailyValue >= band.low && dailyValue <= band.high ? 12 : 6;
  const ageScore = lead.ageMinutes <= 30 ? 18 : lead.ageMinutes <= 90 ? 14 : lead.ageMinutes <= 180 ? 9 : 4;
  const startScore = lead.start === "This week" ? 12 : lead.start === "Next week" ? 8 : lead.start === "This month" ? 5 : 2;
  const budgetScore = Math.min(18, Math.round(lead.budget / 1200));
  const termsScore = Math.min(10, lead.terms.length * 3);
  const score = Math.max(0, Math.min(100, Math.round(
    passport.score * 0.32
    + yard.score * 0.18
    + ageScore
    + startScore
    + budgetScore
    + termsScore
    + rateFit
  )));
  const priority = score >= 84 ? "Hot" : score >= 68 ? "Warm" : "Nurture";

  return {
    lead,
    listing,
    passport,
    yard,
    durationDays,
    dailyValue,
    band,
    score,
    priority,
    ageLabel: formatLeadAge(lead.ageMinutes)
  };
}

function getLeadPlaybook(item, studio) {
  const needsRefresh = item.yard.status !== "fresh";
  const needsDocs = studio.docGaps > 0 || !item.listing.verified;
  const quoteStatus = item.dailyValue >= item.band.low && item.dailyValue <= item.band.high ? "Ready" : "Confirm";

  return [
    {
      text: `Reply by ${item.lead.channel} with availability, direct contact, and the next confirmation step.`,
      status: item.lead.ageMinutes <= 60 ? "Now" : "Today",
      statusClass: item.lead.ageMinutes <= 60 ? "hot" : "warm"
    },
    {
      text: needsRefresh ? `Reconfirm ${item.listing.name} before promising the start window.` : `${item.listing.name} freshness is strong enough for routing.`,
      status: needsRefresh ? "Confirm" : "Ready",
      statusClass: needsRefresh ? "warm" : "ready"
    },
    {
      text: needsDocs ? "Attach or refresh proof before sending the buyer a verified answer." : "Document stack is clean for this prototype.",
      status: needsDocs ? "Gap" : "Ready",
      statusClass: needsDocs ? "gap" : "ready"
    },
    {
      text: `Normalize quote view: USD ${item.dailyValue.toLocaleString()} per day against modeled band USD ${item.band.low.toLocaleString()}-${item.band.high.toLocaleString()}.`,
      status: quoteStatus,
      statusClass: quoteStatus === "Ready" ? "ready" : "warm"
    },
    {
      text: "Keep payment direct between buyer and rental company. Heavyster only supports lead clarity and response workflow.",
      status: "Direct",
      statusClass: "direct"
    }
  ];
}

function parseDurationDays(value) {
  const match = String(value || "").match(/\d+/);
  if (!match) return 5;
  const number = Number(match[0]);
  return String(value).toLowerCase().includes("month") ? Math.max(20, number * 20) : Math.max(1, number);
}

function formatLeadAge(minutes) {
  if (minutes < 60) return `${minutes}m old`;
  const hours = Math.round(minutes / 60);
  return `${hours}h old`;
}

function renderAccountHealth() {
  const model = getAccountHealthModel();
  setText("#accountHealthTitle", model.profile.supplier);
  setText("#accountHealthBadge", model.badge);

  document.querySelector("#accountHealthScore").innerHTML = `
    <strong>${model.score}/100</strong>
    <span>${model.summary}</span>
  `;

  document.querySelector("#accountHealthMetrics").innerHTML = [
    ["Risk signals", String(model.riskCount)],
    ["Listing ARR", `USD ${model.revenueDesk.annualRevenue.toLocaleString()}`],
    ["Lead pipeline", `USD ${model.leadDesk.totalBudget.toLocaleString()}`],
    ["Expansion ARR", `USD ${model.expansionArr.toLocaleString()}`]
  ].map(([label, value]) => `
    <span><strong>${escapeHtml(value)}</strong>${escapeHtml(label)}</span>
  `).join("");

  document.querySelector("#accountHealthSignals").innerHTML = model.signals.map((signal) => `
    <div class="account-health-signal ${signal.statusClass}">
      <span>
        <strong>${escapeHtml(signal.label)}</strong>
        ${escapeHtml(signal.detail)}
      </span>
      <em>${signal.score}/100</em>
      <b>${escapeHtml(signal.status)}</b>
    </div>
  `).join("");

  document.querySelector("#accountHealthActions").innerHTML = model.actions.map((action, index) => `
    <button type="button" class="account-health-action ${action.priorityClass}" data-health-anchor="${escapeHtml(action.anchor)}" data-health-label="${escapeHtml(action.label)}">
      <strong>${index + 1}</strong>
      <span>${escapeHtml(action.label)}<small>${escapeHtml(action.detail)}</small></span>
      <em>${escapeHtml(action.status)}</em>
    </button>
  `).join("");

  document.querySelector("#accountHealthPlan").innerHTML = buildAccountHealthText(model)
    .split("\n")
    .filter(Boolean)
    .map((line) => `<p>${escapeHtml(line)}</p>`)
    .join("");

  document.querySelectorAll("[data-health-anchor]").forEach((button) => {
    button.addEventListener("click", () => {
      const target = document.querySelector(button.dataset.healthAnchor);
      if (!target) return;
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      showToast(`${button.dataset.healthLabel} opened.`);
    });
  });
}

function getAccountHealthModel(listing = getSelectedListing()) {
  const profile = getSupplierProfile(listing.supplier);
  const storefront = getSupplierStorefrontModel(listing);
  const fleetImport = getFleetImportModel(listing);
  const proofVault = getProofVaultModel(listing);
  const revenueDesk = getRevenueDeskModel(listing);
  const leadDesk = getLeadDeskModel(listing);
  const supplierYardRows = getYardModel().rows.filter((row) => row.listing.supplier === profile.supplier);
  const yardScore = supplierYardRows.length
    ? Math.round(supplierYardRows.reduce((total, row) => total + row.score, 0) / supplierYardRows.length)
    : storefront.yardScore;
  const supplierReviewRows = supplierYardRows.filter((row) => row.status !== "fresh");
  const expansionArr = revenueDesk.pendingListings * 99 + fleetImport.annualRevenue;
  const signals = [
    getAccountHealthSignal("Listing retention", revenueDesk.score, `${revenueDesk.paidListings} paid listing${revenueDesk.paidListings === 1 ? "" : "s"}, ${revenueDesk.renewalRiskCount} renewal risk, ${revenueDesk.annualShare}% annual share.`),
    getAccountHealthSignal("Proof confidence", proofVault.score, `${proofVault.readyCount} ready proof item${proofVault.readyCount === 1 ? "" : "s"}, ${proofVault.expiringCount} expiring, ${proofVault.missingCount} missing.`),
    getAccountHealthSignal("Lead response", leadDesk.active.score, `${leadDesk.hotCount} hot lead${leadDesk.hotCount === 1 ? "" : "s"}, USD ${leadDesk.totalBudget.toLocaleString()} direct enquiry pipeline.`),
    getAccountHealthSignal("Yard freshness", yardScore, `${supplierReviewRows.length} supplier listing${supplierReviewRows.length === 1 ? "" : "s"} need reconfirmation before serious routing.`),
    getAccountHealthSignal("Storefront strength", storefront.score, `${storefront.visibleFleetCount} public listing${storefront.visibleFleetCount === 1 ? "" : "s"}, Trust Passport average ${storefront.averagePassport}/100.`),
    getAccountHealthSignal("Import upside", fleetImport.score, `${fleetImport.readyListings} import-ready paid listing${fleetImport.readyListings === 1 ? "" : "s"}, USD ${fleetImport.annualRevenue.toLocaleString()} potential ARR.`)
  ];
  const score = Math.max(0, Math.min(100, Math.round(
    revenueDesk.score * 0.26
    + proofVault.score * 0.18
    + leadDesk.active.score * 0.2
    + yardScore * 0.14
    + storefront.score * 0.12
    + fleetImport.score * 0.1
  )));
  const riskCount = signals.filter((signal) => signal.statusClass !== "ready").length;
  const badge = score >= 86 && riskCount <= 1 ? "Grow account" : score >= 70 ? "Save and grow" : "Retention risk";
  const summary = riskCount
    ? `${riskCount} risk signal${riskCount === 1 ? "" : "s"} need attention before renewal or expansion.`
    : "Account is healthy enough for annual expansion and category growth.";
  const actions = getAccountHealthActions({
    profile,
    proofVault,
    revenueDesk,
    leadDesk,
    fleetImport,
    supplierReviewRows,
    expansionArr
  });

  return {
    profile,
    storefront,
    fleetImport,
    proofVault,
    revenueDesk,
    leadDesk,
    yardScore,
    supplierReviewRows,
    expansionArr,
    signals,
    score,
    riskCount,
    badge,
    summary,
    actions
  };
}

function getAccountHealthSignal(label, score, detail) {
  const statusClass = score >= 80 ? "ready" : score >= 65 ? "watch" : "risk";
  return {
    label,
    score,
    detail,
    status: statusClass === "ready" ? "Ready" : statusClass === "watch" ? "Watch" : "Risk",
    statusClass
  };
}

function getAccountHealthActions(context) {
  const actions = [];
  const proofGaps = context.proofVault.expiringCount + context.proofVault.missingCount;
  const dormantListings = context.revenueDesk.pausedCount + context.revenueDesk.draftCount;

  if (context.revenueDesk.renewalRiskCount) {
    actions.push({
      label: "Save renewal risk",
      detail: `${context.revenueDesk.renewalRiskCount} paid listing${context.revenueDesk.renewalRiskCount === 1 ? "" : "s"} need renewal attention before visibility drops.`,
      status: "Save",
      priorityClass: "hot",
      anchor: "#revenue-desk"
    });
  }

  if (proofGaps) {
    actions.push({
      label: "Clean proof before renewal",
      detail: `${proofGaps} proof item${proofGaps === 1 ? "" : "s"} could weaken trust, renewal confidence, or high-value lead routing.`,
      status: "Trust",
      priorityClass: proofGaps > 2 ? "hot" : "warm",
      anchor: "#proof-vault"
    });
  }

  if (context.leadDesk.hotCount) {
    actions.push({
      label: "Answer hot direct leads",
      detail: `${context.leadDesk.hotCount} hot lead${context.leadDesk.hotCount === 1 ? "" : "s"} can prove listing ROI before the supplier questions renewal.`,
      status: "Reply",
      priorityClass: "hot",
      anchor: "#lead-desk"
    });
  }

  if (context.supplierReviewRows.length) {
    actions.push({
      label: "Refresh yard freshness",
      detail: `${context.supplierReviewRows.length} listing${context.supplierReviewRows.length === 1 ? "" : "s"} need availability, documents, photos, or contact reconfirmation.`,
      status: "Refresh",
      priorityClass: "warm",
      anchor: "#yard"
    });
  }

  if (context.fleetImport.readyListings) {
    actions.push({
      label: "Publish import-ready rows",
      detail: `${context.fleetImport.readyListings} clean import listing${context.fleetImport.readyListings === 1 ? "" : "s"} can add USD ${context.fleetImport.annualRevenue.toLocaleString()} ARR.`,
      status: "Grow",
      priorityClass: "grow",
      anchor: "#fleet-import"
    });
  }

  if (dormantListings) {
    actions.push({
      label: "Reactivate dormant inventory",
      detail: `${dormantListings} paused or draft listing${dormantListings === 1 ? "" : "s"} can become paid inventory once proof and availability are clean.`,
      status: "Grow",
      priorityClass: "grow",
      anchor: "#revenue-desk"
    });
  }

  if (!actions.length) {
    actions.push({
      label: "Prepare annual expansion",
      detail: `${context.profile.supplier} is healthy enough to pitch annual renewal, branch pages, or more category coverage.`,
      status: "Expand",
      priorityClass: "grow",
      anchor: "#pricing"
    });
  }

  return actions.slice(0, 5);
}

function renderSupplierSuccessQueue() {
  const model = getSupplierSuccessModel();
  setText("#supplierSuccessBadge", model.badge);

  document.querySelector("#supplierSuccessScore").innerHTML = `
    <strong>${model.averageHealth}/100</strong>
    <span>${model.summary}</span>
  `;

  document.querySelector("#supplierSuccessMetrics").innerHTML = [
    ["Call first", model.callFirst.profile.supplier],
    ["At-risk accounts", String(model.atRiskCount)],
    ["Hot leads", String(model.hotLeadCount)],
    ["Expansion ARR", `USD ${model.expansionArr.toLocaleString()}`]
  ].map(([label, value]) => `
    <span><strong>${escapeHtml(value)}</strong>${escapeHtml(label)}</span>
  `).join("");

  document.querySelector("#supplierSuccessQueue").innerHTML = model.rows.map((row) => `
    <button type="button" class="supplier-success-row ${row.priorityClass}" data-success-listing="${escapeHtml(row.listing.id)}">
      <span>
        <strong>${escapeHtml(row.profile.supplier)}</strong>
        ${escapeHtml(row.primaryAction.label)}
        <small>${escapeHtml(row.reason)}</small>
      </span>
      <em>${row.urgency}/100</em>
      <small>Health ${row.health.score}/100</small>
      <b>${escapeHtml(row.primaryAction.status)}</b>
    </button>
  `).join("");

  document.querySelector("#supplierSuccessActions").innerHTML = model.rhythm.map((item, index) => `
    <div class="supplier-success-action ${item.statusClass}">
      <strong>${index + 1}</strong>
      <span>${escapeHtml(item.label)}<small>${escapeHtml(item.detail)}</small></span>
      <em>${escapeHtml(item.status)}</em>
    </div>
  `).join("");

  document.querySelector("#supplierSuccessPlan").innerHTML = buildSupplierSuccessText(model)
    .split("\n")
    .filter(Boolean)
    .map((line) => `<p>${escapeHtml(line)}</p>`)
    .join("");

  document.querySelectorAll("[data-success-listing]").forEach((button) => {
    button.addEventListener("click", () => {
      const listing = listings.find((item) => item.id === button.dataset.successListing);
      if (!listing) return;
      state.selectedListingId = listing.id;
      state.commandRole = "Founder";
      saveState();
      render();
      document.querySelector("#account-health").scrollIntoView({ behavior: "smooth", block: "start" });
      showToast(`${listing.supplier} health opened.`);
    });
  });
}

function getSupplierSuccessModel() {
  const rows = supplierProfiles
    .map((profile) => getSupplierSuccessRow(profile))
    .sort((a, b) => b.urgency - a.urgency || a.profile.supplier.localeCompare(b.profile.supplier));
  const averageHealth = Math.round(rows.reduce((total, row) => total + row.health.score, 0) / rows.length);
  const atRiskCount = rows.filter((row) => row.health.score < 74 || row.health.riskCount >= 3).length;
  const hotLeadCount = rows.reduce((total, row) => total + row.health.leadDesk.hotCount, 0);
  const renewalRiskCount = rows.reduce((total, row) => total + row.health.revenueDesk.renewalRiskCount, 0);
  const proofGapCount = rows.reduce((total, row) => total + row.health.proofVault.expiringCount + row.health.proofVault.missingCount, 0);
  const expansionArr = rows.reduce((total, row) => total + row.health.expansionArr, 0);
  const callFirst = rows[0];
  const badge = atRiskCount ? "Work today" : expansionArr ? "Grow accounts" : "Healthy book";
  const summary = atRiskCount
    ? `${atRiskCount} supplier account${atRiskCount === 1 ? "" : "s"} need founder attention today. Start with ${callFirst.profile.supplier}.`
    : `Supplier book is stable. Use the queue to convert USD ${expansionArr.toLocaleString()} visible expansion ARR.`;
  const rhythm = getSupplierSuccessRhythm({
    rows,
    callFirst,
    atRiskCount,
    hotLeadCount,
    renewalRiskCount,
    proofGapCount,
    expansionArr
  });

  return {
    rows,
    averageHealth,
    atRiskCount,
    hotLeadCount,
    renewalRiskCount,
    proofGapCount,
    expansionArr,
    callFirst,
    badge,
    summary,
    rhythm
  };
}

function getSupplierSuccessRow(profile) {
  const listing = getSupplierRepresentativeListing(profile);
  const health = getAccountHealthModel(listing);
  const primaryAction = health.actions[0];
  const urgency = Math.max(0, Math.min(100, Math.round(
    100 - health.score
    + health.riskCount * 7
    + health.revenueDesk.renewalRiskCount * 3
    + health.leadDesk.hotCount * 4
    + health.proofVault.expiringCount * 2
    + health.proofVault.missingCount * 4
  )));
  const priorityClass = urgency >= 56 ? "hot" : health.expansionArr >= 600 ? "grow" : "watch";
  const reasonParts = [
    `${health.riskCount} risk signal${health.riskCount === 1 ? "" : "s"}`,
    `USD ${health.revenueDesk.annualRevenue.toLocaleString()} ARR`,
    `USD ${health.leadDesk.totalBudget.toLocaleString()} pipeline`
  ];

  if (health.expansionArr) {
    reasonParts.push(`USD ${health.expansionArr.toLocaleString()} expansion ARR`);
  }

  return {
    profile,
    listing,
    health,
    primaryAction,
    urgency,
    priorityClass,
    reason: reasonParts.join(" - ")
  };
}

function getSupplierRepresentativeListing(profile) {
  return listings.find((listing) => listing.supplier === profile.supplier)
    || {
      id: `HY-${profile.slug}`,
      name: profile.fleet[0] ? profile.fleet[0].label : "Starter equipment",
      category: profile.fleet[0] ? profile.fleet[0].label : "Equipment",
      supplier: profile.supplier,
      region: profile.branch.split(", ").pop() || "Global",
      city: profile.branch.split(", ")[0] || "Branch",
      rate: "Quote direct",
      availability: "call",
      verified: false,
      documents: profile.proof,
      specs: profile.headline
    };
}

function getSupplierSuccessRhythm(context) {
  const rhythm = [
    {
      label: `Call ${context.callFirst.profile.supplier}`,
      detail: `${context.callFirst.primaryAction.label}: ${context.callFirst.primaryAction.detail}`,
      status: "First",
      statusClass: "hot"
    },
    {
      label: "Save renewal and proof risks",
      detail: `${context.renewalRiskCount} renewal-risk listing${context.renewalRiskCount === 1 ? "" : "s"} and ${context.proofGapCount} proof gap${context.proofGapCount === 1 ? "" : "s"} need action before supplier confidence drops.`,
      status: context.renewalRiskCount || context.proofGapCount ? "Save" : "Clean",
      statusClass: context.renewalRiskCount || context.proofGapCount ? "hot" : "grow"
    },
    {
      label: "Prove listing ROI",
      detail: `${context.hotLeadCount} hot lead${context.hotLeadCount === 1 ? "" : "s"} should be answered fast so suppliers see direct enquiry value.`,
      status: context.hotLeadCount ? "Reply" : "Monitor",
      statusClass: context.hotLeadCount ? "watch" : "grow"
    },
    {
      label: "Grow ready suppliers",
      detail: `The queue shows USD ${context.expansionArr.toLocaleString()} visible expansion ARR from import-ready and dormant listings.`,
      status: context.expansionArr ? "Grow" : "Later",
      statusClass: "grow"
    }
  ];

  if (context.atRiskCount > 2) {
    rhythm.push({
      label: "Hold new expansion until saves are done",
      detail: "More than two suppliers need attention, so protect trust and renewal before pushing new paid listings.",
      status: "Focus",
      statusClass: "hot"
    });
  }

  return rhythm.slice(0, 5);
}

function renderTrustChecklist() {
  document.querySelector("#trustChecklist").innerHTML = trustItems.map(([title, detail], index) => `
    <label class="check-item">
      <input type="checkbox" data-check-index="${index}" ${state.trustChecked[index] ? "checked" : ""} />
      <span><strong>${escapeHtml(title)}</strong><br />${escapeHtml(detail)}</span>
    </label>
  `).join("");

  document.querySelectorAll("[data-check-index]").forEach((box) => {
    box.addEventListener("change", () => {
      state.trustChecked[Number(box.dataset.checkIndex)] = box.checked;
      saveState();
    });
  });
}

function renderOnboardingFlow() {
  document.querySelector("#onboardingFlow").innerHTML = onboardingSteps.map(([title, detail], index) => `
    <div class="flow-step">
      <span>${index + 1}</span>
      <strong>${escapeHtml(title)}</strong>
      <small>${escapeHtml(detail)}</small>
    </div>
  `).join("");
}

function renderBuilderSummary() {
  const status = state.builderAvailability === "available" ? "can publish now" : state.builderAvailability === "soon" ? "can publish with soon badge" : "needs call-to-confirm badge";
  document.querySelector("#builderSummary").innerHTML = `
    <span><strong>${escapeHtml(state.builderModel || "New equipment")}</strong>${escapeHtml(state.builderCategory)} - ${escapeHtml(state.builderRegion)}</span>
    <span><strong>Listing plan</strong>USD 9/month or USD 99/year once active</span>
    <span><strong>Status</strong>${escapeHtml(status)}</span>
  `;
}

function renderCategoryDirectory() {
  document.querySelector("#categoryDirectory").innerHTML = categoryDirectory.map((category) => `
    <article class="category-card">
      <span>${escapeHtml(category.group)}</span>
      <strong>${escapeHtml(category.name)}</strong>
      <p>${escapeHtml(category.intent)}</p>
      <small>${category.count.toLocaleString()} modeled listings - ${escapeHtml(category.regions)}</small>
    </article>
  `).join("");
}

function renderAdminBoard() {
  const totalModeledListings = categoryDirectory.reduce((total, category) => total + category.count, 0);
  const verified = listings.filter((listing) => listing.verified).length;
  document.querySelector("#adminSupplierQueue").innerHTML = adminQueue.map((supplier) => `
    <div class="admin-row">
      <span><strong>${escapeHtml(supplier.supplier)}</strong>${escapeHtml(supplier.region)} - ${supplier.listings} listings</span>
      <em>${escapeHtml(supplier.status)}</em>
    </div>
  `).join("");

  document.querySelector("#verificationBoard").innerHTML = [
    ["Verified demo listings", `${verified}/${listings.length}`],
    ["Document checks", "License, insurance, inspection"],
    ["Founder review rule", "No badge without documents"],
    ["Risk control", "Hide expired docs later"]
  ].map(([label, value]) => `
    <div class="admin-row">
      <span><strong>${escapeHtml(label)}</strong>${escapeHtml(value)}</span>
      <em>Track</em>
    </div>
  `).join("");

  document.querySelector("#launchMetrics").innerHTML = [
    ["Modeled category inventory", totalModeledListings.toLocaleString()],
    ["Launch target", "25 suppliers"],
    ["First revenue target", "250 paid listings"],
    ["Phase-two trigger", "100 confirmed enquiries"]
  ].map(([label, value]) => `
    <div class="metric-line">
      <span>${escapeHtml(label)}</span>
      <strong>${escapeHtml(value)}</strong>
    </div>
  `).join("");

  renderDemandRadar();
}

function renderDemandRadar() {
  const signals = [...getDemandSignals()]
    .sort((a, b) => Number(b.count || 1) - Number(a.count || 1) || a.equipment.localeCompare(b.equipment))
    .slice(0, 4);

  document.querySelector("#demandRadar").innerHTML = signals.length ? signals.map((signal) => `
    <button type="button" class="admin-row demand-row ${getDemandKey(signal) === state.activeDemandKey ? "is-active" : ""}" data-demand-key="${escapeHtml(getDemandKey(signal))}">
      <span><strong>${escapeHtml(signal.equipment)}</strong>${escapeHtml(signal.region)} - ${escapeHtml(signal.duration)} - ${escapeHtml(signal.source)}</span>
      <em>${Number(signal.count || 1)}x ${escapeHtml(signal.urgency)}</em>
    </button>
  `).join("") : `
    <div class="admin-row">
      <span><strong>No demand saved</strong>Buyer requests will appear here.</span>
      <em>Listen</em>
    </div>
  `;

  document.querySelectorAll("[data-demand-key]").forEach((button) => {
    button.addEventListener("click", () => {
      state.activeDemandKey = button.dataset.demandKey;
      state.activeMarketKey = getMarketKeyFromSignal(getActiveDemandSignal());
      saveState();
      renderDemandRadar();
      renderSupplierHunt();
      renderMarketSignalMatrix();
      renderMarketMaker();
      renderPageFactory();
      renderLaunchRoom();
      renderMarketTwin();
      renderLiquidityFlywheel();
      renderFounderAutopilot();
      renderDemandExchange();
      renderProofDemandRoom();
      renderSupplierCommitmentRoom();
      renderListingActivationRoom();
      renderTrustRevenueLedger();
      renderFounderWorkbench();
      renderFounderMorningBrief();
      renderFounderDailyMoves();
      renderFounderCallSheet();
      document.querySelector("#growth").scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function renderSupplierHunt() {
  const signals = getDemandSignals();
  if (!signals.length) return;

  const active = getActiveDemandSignal();
  const plan = getHuntPlan(active);
  setText("#huntPriority", plan.priority);
  setText("#huntPersona", plan.persona);

  document.querySelector("#huntSignalList").innerHTML = signals
    .slice(0, 6)
    .map((signal) => `
      <button type="button" class="hunt-signal ${getDemandKey(signal) === state.activeDemandKey ? "is-active" : ""}" data-hunt-key="${escapeHtml(getDemandKey(signal))}">
        <span><strong>${escapeHtml(signal.equipment)}</strong>${escapeHtml(signal.region)} - ${Number(signal.count || 1)} signals</span>
        <em>${escapeHtml(signal.urgency)}</em>
      </button>
    `).join("");

  document.querySelector("#huntMetrics").innerHTML = [
    ["Demand pressure", `${plan.score}/100`],
    ["Visible supply gap", getVisibleSupplyLabel(plan.visibleSupply)],
    ["Recruit target", `${plan.starterListings} paid listings`],
    ["Listing ARR", `USD ${plan.annualRevenue.toLocaleString()}`]
  ].map(([label, value]) => `
    <span><strong>${escapeHtml(value)}</strong>${escapeHtml(label)}</span>
  `).join("");

  document.querySelector("#huntProof").innerHTML = `
    <strong>Trust proof to request</strong>
    <div>
      ${plan.proof.map((item) => `<span>${escapeHtml(item)}</span>`).join("")}
    </div>
  `;

  document.querySelector("#outreachScript").innerHTML = buildSupplierHuntText(plan)
    .split("\n")
    .map((line) => `<p>${escapeHtml(line)}</p>`)
    .join("");

  document.querySelectorAll("[data-hunt-key]").forEach((button) => {
    button.addEventListener("click", () => {
      state.activeDemandKey = button.dataset.huntKey;
      state.activeMarketKey = getMarketKeyFromSignal(getActiveDemandSignal());
      saveState();
      renderDemandRadar();
      renderSupplierHunt();
      renderMarketSignalMatrix();
      renderMarketMaker();
      renderPageFactory();
      renderLaunchRoom();
      renderMarketTwin();
      renderLiquidityFlywheel();
      renderFounderAutopilot();
      renderDemandExchange();
      renderProofDemandRoom();
      renderSupplierCommitmentRoom();
      renderListingActivationRoom();
      renderTrustRevenueLedger();
      renderFounderWorkbench();
      renderFounderMorningBrief();
      renderFounderDailyMoves();
      renderFounderCallSheet();
    });
  });
}

function getActiveDemandSignal() {
  const signals = getDemandSignals();
  const active = signals.find((signal) => getDemandKey(signal) === state.activeDemandKey) || signals[0];
  state.activeDemandKey = getDemandKey(active);
  return active;
}

function getDemandKey(signal) {
  return [signal.equipment, signal.region, signal.urgency].join("::");
}

function getVisibleSupplyLabel(count) {
  return count === 1 ? "1 matching listing" : `${count} matching listings`;
}

function getHuntPlan(signal) {
  const equipment = signal.equipment.toLowerCase();
  const blueprint = huntBlueprints.find((item) =>
    item.keywords.some((keyword) => equipment.includes(keyword))
  ) || huntBlueprints[huntBlueprints.length - 1];
  const visibleSupply = listings.filter((listing) => {
    const haystack = [listing.name, listing.category, listing.specs].join(" ").toLowerCase();
    return listing.region === signal.region && (haystack.includes(equipment) || listing.category === blueprint.category);
  }).length;
  const urgencyScore = signal.urgency === "This week" ? 28 : signal.urgency === "Next week" ? 20 : signal.urgency === "This month" ? 12 : 6;
  const gapScore = visibleSupply === 0 ? 28 : visibleSupply < 2 ? 16 : 8;
  const countScore = Math.min(34, Number(signal.count || 1) * 8);
  const score = Math.min(100, urgencyScore + gapScore + countScore);
  const starterListings = blueprint.starterListings + Math.min(6, Number(signal.count || 1));
  const priority = score >= 72 ? "Attack now" : score >= 45 ? "Warm lead" : "Watch";

  return {
    signal,
    persona: blueprint.persona,
    category: blueprint.category,
    proof: blueprint.proof,
    hook: blueprint.hook,
    visibleSupply,
    score,
    starterListings,
    monthlyRevenue: starterListings * 9,
    annualRevenue: starterListings * 99,
    priority
  };
}

function renderMarketSignalMatrix() {
  const root = document.querySelector("#marketSignalMatrix");
  if (!root) return;

  const model = getMarketSignalMatrixModel();
  const active = model.activeCell;
  if (!active) return;

  setText("#marketSignalTitle", `${active.region} ${active.category}`);
  setText("#marketSignalBadge", active.status);

  document.querySelector("#marketSignalMetrics").innerHTML = [
    ["Demand", `${model.totalDemand} signals`],
    ["Live supply", `${model.totalSupply} listings`],
    ["Verified", `${model.totalVerified} listings`],
    ["Matrix ARR", `USD ${model.totalArr.toLocaleString()}`]
  ].map(([label, value]) => `
    <span><strong>${escapeHtml(value)}</strong>${escapeHtml(label)}</span>
  `).join("");

  document.querySelector("#marketSignalFocus").innerHTML = `
    <strong>${active.score}/100</strong>
    <span>${escapeHtml(active.summary)}</span>
    <button type="button" class="solid-button" data-matrix-key="${escapeHtml(active.key)}">${escapeHtml(active.action)}</button>
  `;

  root.innerHTML = [
    `<div class="market-signal-head">Region</div>`,
    ...model.categories.map((category) => `<div class="market-signal-head">${escapeHtml(category)}</div>`),
    ...model.rows.flatMap((row) => [
      `<div class="market-signal-region">${escapeHtml(row.region)}</div>`,
      ...row.cells.map((cell) => `
        <button type="button" class="market-signal-cell ${cell.statusClass} ${cell.key === active.key ? "is-active" : ""}" data-matrix-key="${escapeHtml(cell.key)}">
          <strong>${cell.score}/100</strong>
          <span>${cell.demandCount} demand / ${cell.visibleSupply} supply</span>
          <small>${escapeHtml(cell.action)}</small>
        </button>
      `)
    ])
  ].join("");

  document.querySelector("#marketSignalMoves").innerHTML = model.topCells.map((cell, index) => `
    <button type="button" class="market-signal-move ${cell.statusClass} ${cell.key === active.key ? "is-active" : ""}" data-matrix-key="${escapeHtml(cell.key)}">
      <strong>${index + 1}</strong>
      <span>
        ${escapeHtml(cell.region)} ${escapeHtml(cell.category)}
        <small>${escapeHtml(cell.summary)}</small>
      </span>
      <em>USD ${cell.annualRevenue.toLocaleString()}</em>
      <b>${escapeHtml(cell.status)}</b>
    </button>
  `).join("");

  document.querySelector("#marketSignalBrief").innerHTML = buildMarketSignalMatrixText(model)
    .split("\n")
    .filter(Boolean)
    .map((line) => `<p>${escapeHtml(line)}</p>`)
    .join("");

  document.querySelectorAll("[data-matrix-key]").forEach((button) => {
    button.addEventListener("click", () => {
      const key = button.dataset.matrixKey;
      const cell = getMarketSignalMatrixModel().cells.find((item) => item.key === key);
      if (!cell) return;
      state.activeMatrixKey = key;
      if (cell.opportunity) {
        state.activeMarketKey = key;
        if (cell.signalKey) state.activeDemandKey = cell.signalKey;
      }
      saveState();
      renderDemandRadar();
      renderSupplierHunt();
      renderMarketSignalMatrix();
      renderMarketMaker();
      renderPageFactory();
      renderLaunchRoom();
      renderMarketTwin();
      renderLiquidityFlywheel();
      renderFounderAutopilot();
      renderDemandExchange();
      renderProofDemandRoom();
      renderSupplierCommitmentRoom();
      renderListingActivationRoom();
      renderTrustRevenueLedger();
      renderFounderWorkbench();
      renderFounderMorningBrief();
      renderFounderDailyMoves();
      renderFounderCallSheet();
      showToast(cell.opportunity ? `${cell.region} ${cell.category} market focused.` : `${cell.region} ${cell.category} needs demand capture first.`);
    });
  });
}

function getMarketSignalMatrixModel() {
  const opportunities = getMarketOpportunities();
  const opportunityMap = new Map(opportunities.map((opportunity) => [opportunity.key, opportunity]));
  const demandSignals = getDemandSignals();
  const categories = getMarketSignalCategories(demandSignals);
  const regions = getMarketSignalRegions(demandSignals);
  const cells = [];
  const rows = regions.map((region) => {
    const rowCells = categories.map((category) => {
      const cell = getMarketSignalCell(region, category, opportunityMap, demandSignals);
      cells.push(cell);
      return cell;
    });
    return { region, cells: rowCells };
  });
  const topCells = [...cells]
    .sort((a, b) => b.priorityScore - a.priorityScore || b.annualRevenue - a.annualRevenue || a.key.localeCompare(b.key))
    .slice(0, 5);
  const activeCell = cells.find((cell) => cell.key === state.activeMatrixKey)
    || cells.find((cell) => cell.key === state.activeMarketKey)
    || topCells[0]
    || cells[0];

  if (activeCell) state.activeMatrixKey = activeCell.key;

  return {
    categories,
    regions,
    rows,
    cells,
    topCells,
    activeCell,
    totalDemand: cells.reduce((total, cell) => total + cell.demandCount, 0),
    totalSupply: cells.reduce((total, cell) => total + cell.visibleSupply, 0),
    totalVerified: cells.reduce((total, cell) => total + cell.verifiedSupply, 0),
    totalArr: cells.reduce((total, cell) => total + (cell.demandCount || cell.visibleSupply ? cell.annualRevenue : 0), 0)
  };
}

function getMarketSignalCategories(demandSignals) {
  const categories = new Set([
    ...categoryDirectory.map((category) => category.group),
    ...listings.map((listing) => listing.category),
    ...demandSignals.map((signal) => getHuntPlan(signal).category)
  ]);
  return [...categories].sort((a, b) => {
    const order = ["Earthmoving", "Lifting", "Roadwork", "Power", "Transport"];
    const diff = order.indexOf(a) - order.indexOf(b);
    return diff || a.localeCompare(b);
  });
}

function getMarketSignalRegions(demandSignals) {
  const regions = new Set([
    ...listings.map((listing) => listing.region),
    ...demandSignals.map((signal) => signal.region)
  ]);
  categoryDirectory.forEach((category) => {
    category.regions.split(",").map((region) => region.trim()).filter(Boolean).forEach((region) => regions.add(region));
  });
  return [...regions].sort();
}

function getMarketSignalCell(region, category, opportunityMap, demandSignals) {
  const key = `${region}::${category}`;
  const opportunity = opportunityMap.get(key);
  const signals = demandSignals.filter((signal) => signal.region === region && getHuntPlan(signal).category === category);
  const demandCount = signals.reduce((total, signal) => total + Number(signal.count || 1), 0);
  const urgentCount = signals.filter((signal) => signal.urgency === "This week" || signal.urgency === "Next week").length;
  const visibleListings = listings.filter((listing) => listing.region === region && listing.category === category);
  const visibleSupply = visibleListings.length;
  const verifiedSupply = visibleListings.filter((listing) => listing.verified).length;
  const pendingProof = visibleListings.reduce((total, listing) =>
    total + listing.documents.filter((document) => document.toLowerCase().includes("pending")).length, 0
  );
  const directoryMatches = categoryDirectory.filter((item) =>
    item.group === category && item.regions.split(",").map((regionName) => regionName.trim()).includes(region)
  );
  const modeledInventory = directoryMatches.reduce((total, item) =>
    total + Math.max(1, Math.round(item.count / Math.max(1, item.regions.split(",").length))), 0
  );
  const launchTarget = opportunity?.launchListings
    || Math.max(visibleSupply, demandCount ? demandCount * 4 : Math.ceil(modeledInventory / 20));
  const supplyGap = Math.max(0, launchTarget - visibleSupply);
  const annualRevenue = opportunity?.annualRevenue || Math.max(1, launchTarget) * 99;
  const proofScore = visibleSupply
    ? Math.max(0, Math.min(100, Math.round((verifiedSupply / visibleSupply) * 100 - pendingProof * 14)))
    : 0;
  const demandScore = Math.min(42, demandCount * 8 + urgentCount * 6);
  const supplyScore = visibleSupply ? Math.min(22, visibleSupply * 7) : 0;
  const revenueScore = Math.min(18, Math.round(annualRevenue / 90));
  const gapPenalty = Math.min(20, supplyGap * 2);
  const score = Math.max(0, Math.min(100, Math.round(18 + demandScore + supplyScore + proofScore * 0.18 + revenueScore - gapPenalty)));
  const statusClass = score >= 76 && demandCount ? "ready" : score >= 52 || demandCount || visibleSupply ? "review" : "gap";
  const action = demandCount && !visibleSupply ? "Recruit supply"
    : demandCount && supplyGap > 0 ? "Fill gap"
      : visibleSupply && proofScore < 70 ? "Clean proof"
        : demandCount ? "Launch page"
          : visibleSupply ? "Protect supply"
            : "Capture demand";
  const status = statusClass === "ready" ? "Launch" : statusClass === "review" ? "Work" : "Listen";
  const summary = demandCount
    ? `${demandCount} demand signal${demandCount === 1 ? "" : "s"}, ${visibleSupply} visible listing${visibleSupply === 1 ? "" : "s"}, ${supplyGap} supply gap${supplyGap === 1 ? "" : "s"}, proof ${proofScore}/100.`
    : visibleSupply
      ? `${visibleSupply} visible listing${visibleSupply === 1 ? "" : "s"} with proof ${proofScore}/100; capture demand before heavier growth.`
      : `No active signal yet; monitor modeled ${category.toLowerCase()} inventory in ${region}.`;

  return {
    key,
    region,
    category,
    opportunity: Boolean(opportunity),
    signalKey: opportunity?.signalKey || (signals[0] ? getDemandKey(signals[0]) : ""),
    demandCount,
    urgentCount,
    visibleSupply,
    verifiedSupply,
    pendingProof,
    modeledInventory,
    launchTarget,
    supplyGap,
    annualRevenue,
    proofScore,
    score,
    priorityScore: score + demandCount * 5 + (demandCount && supplyGap ? 10 : 0) + (statusClass === "ready" ? 8 : 0),
    status,
    statusClass,
    action,
    summary
  };
}

function renderMarketMaker() {
  const opportunities = getMarketOpportunities();
  if (!opportunities.length) return;

  const active = getActiveMarketOpportunity(opportunities);
  setText("#marketLaunchTitle", `${active.region} ${active.category} launch`);
  setText("#marketLaunchBadge", active.score >= 78 ? "Open now" : active.score >= 58 ? "Prepare" : "Watch");

  document.querySelector("#marketOpportunityList").innerHTML = opportunities.map((opportunity) => `
    <button type="button" class="market-opportunity ${opportunity.key === active.key ? "is-active" : ""}" data-market-key="${escapeHtml(opportunity.key)}">
      <span><strong>${escapeHtml(opportunity.region)} ${escapeHtml(opportunity.category)}</strong>${opportunity.demandCount} demand signals - ${opportunity.visibleSupply} live supply</span>
      <em>${opportunity.score}/100</em>
    </button>
  `).join("");

  document.querySelector("#marketMetrics").innerHTML = [
    ["Launch score", `${active.score}/100`],
    ["Demand captured", `${active.demandCount} signals`],
    ["Supply gap", `${active.supplyGap} listings`],
    ["First-year ARR", `USD ${active.annualRevenue.toLocaleString()}`]
  ].map(([label, value]) => `
    <span><strong>${escapeHtml(value)}</strong>${escapeHtml(label)}</span>
  `).join("");

  document.querySelector("#marketSteps").innerHTML = active.steps.map((step, index) => `
    <div>
      <strong>${index + 1}</strong>
      <span>${escapeHtml(step)}</span>
    </div>
  `).join("");

  document.querySelector("#marketPageBrief").innerHTML = buildMarketBriefText(active)
    .split("\n")
    .map((line) => `<p>${escapeHtml(line)}</p>`)
    .join("");

  document.querySelectorAll("[data-market-key]").forEach((button) => {
    button.addEventListener("click", () => {
      state.activeMarketKey = button.dataset.marketKey;
      const selected = getMarketOpportunities().find((item) => item.key === state.activeMarketKey);
      if (selected?.signalKey) state.activeDemandKey = selected.signalKey;
      saveState();
      renderDemandRadar();
      renderSupplierHunt();
      renderMarketSignalMatrix();
      renderMarketMaker();
      renderPageFactory();
      renderLaunchRoom();
      renderMarketTwin();
      renderLiquidityFlywheel();
      renderFounderAutopilot();
      renderDemandExchange();
      renderProofDemandRoom();
      renderSupplierCommitmentRoom();
      renderListingActivationRoom();
      renderTrustRevenueLedger();
      renderFounderWorkbench();
      renderFounderMorningBrief();
      renderFounderDailyMoves();
      renderFounderCallSheet();
    });
  });
}

function getMarketOpportunities() {
  const grouped = new Map();
  getDemandSignals().forEach((signal) => {
    const plan = getHuntPlan(signal);
    const key = `${signal.region}::${plan.category}`;
    const existing = grouped.get(key) || {
      key,
      region: signal.region,
      category: plan.category,
      persona: plan.persona,
      proof: plan.proof,
      hook: plan.hook,
      demandCount: 0,
      urgencyHits: 0,
      starterListings: 0,
      signalKey: getDemandKey(signal)
    };
    existing.demandCount += Number(signal.count || 1);
    existing.urgencyHits += signal.urgency === "This week" || signal.urgency === "Next week" ? 1 : 0;
    existing.starterListings = Math.max(existing.starterListings, plan.starterListings);
    grouped.set(key, existing);
  });

  return [...grouped.values()].map((item) => {
    const visibleSupply = listings.filter((listing) => listing.region === item.region && listing.category === item.category).length;
    const supplyGap = Math.max(0, item.starterListings - visibleSupply);
    const score = Math.min(100, 34 + Math.min(30, item.demandCount * 6) + Math.min(24, supplyGap * 2) + item.urgencyHits * 6);
    const launchListings = Math.max(item.starterListings, visibleSupply + supplyGap);
    return {
      ...item,
      visibleSupply,
      supplyGap,
      score,
      launchListings,
      annualRevenue: launchListings * 99,
      slug: `${item.region}-${item.category}-equipment-rental`.toLowerCase().replace(/\s+/g, "-"),
      steps: [
        `Publish a ${item.category.toLowerCase()} rental page for ${item.region} with demand proof.`,
        `Recruit ${supplyGap || item.starterListings} verified listings from ${item.persona.toLowerCase()}.`,
        `Ask for ${item.proof.slice(0, 3).join(", ").toLowerCase()} before showing a verified badge.`,
        "Route enquiries direct to suppliers and measure response speed before adding booking rails."
      ]
    };
  }).sort((a, b) => b.score - a.score || b.demandCount - a.demandCount);
}

function getActiveMarketOpportunity(opportunities = getMarketOpportunities()) {
  const active = opportunities.find((opportunity) => opportunity.key === state.activeMarketKey) || opportunities[0];
  state.activeMarketKey = active.key;
  return active;
}

function getMarketKeyFromSignal(signal) {
  if (!signal) return "";
  return `${signal.region}::${getHuntPlan(signal).category}`;
}

function renderPageFactory() {
  const queue = document.querySelector("#pageFactoryQueue");
  if (!queue) return;

  const model = getPageFactoryModel();
  if (!model.active) return;

  setText("#pageFactoryTitle", model.active.title);
  setText("#pageFactoryBadge", model.badge);

  document.querySelector("#pageFactoryScore").innerHTML = `
    <strong>${model.active.readiness}/100</strong>
    <span>${escapeHtml(model.active.summary)}</span>
  `;

  document.querySelector("#pageFactoryMetrics").innerHTML = [
    ["Ready pages", String(model.readyCount)],
    ["Supplier targets", String(model.supplierTargets)],
    ["Page ARR", `USD ${model.totalArr.toLocaleString()}`],
    ["Demand signals", String(model.demandSignals)]
  ].map(([label, value]) => `
    <span><strong>${escapeHtml(value)}</strong>${escapeHtml(label)}</span>
  `).join("");

  queue.innerHTML = model.pages.map((page) => `
    <button type="button" class="page-factory-row ${page.statusClass} ${page.key === model.active.key ? "is-active" : ""}" data-page-key="${escapeHtml(page.key)}">
      <span>
        <strong>${escapeHtml(page.title)}</strong>
        ${escapeHtml(page.slug)}
        <small>${escapeHtml(page.summary)}</small>
      </span>
      <em>${page.readiness}/100</em>
      <small>${page.demandCount} demand / ${page.visibleSupply} supply</small>
      <b>${escapeHtml(page.status)}</b>
    </button>
  `).join("");

  document.querySelector("#pageFactoryGates").innerHTML = model.gates.map((gate, index) => `
    <div class="page-factory-gate ${gate.statusClass}">
      <strong>${index + 1}</strong>
      <span>${escapeHtml(gate.label)}<small>${escapeHtml(gate.detail)}</small></span>
      <em>${escapeHtml(gate.status)}</em>
    </div>
  `).join("");

  document.querySelector("#pageFactoryPack").innerHTML = buildPageFactoryText(model)
    .split("\n")
    .filter(Boolean)
    .map((line) => `<p>${escapeHtml(line)}</p>`)
    .join("");

  document.querySelectorAll("[data-page-key]").forEach((button) => {
    button.addEventListener("click", () => {
      state.activeMarketKey = button.dataset.pageKey;
      const selected = getMarketOpportunities().find((item) => item.key === state.activeMarketKey);
      if (selected?.signalKey) state.activeDemandKey = selected.signalKey;
      saveState();
      renderDemandRadar();
      renderSupplierHunt();
      renderMarketSignalMatrix();
      renderMarketMaker();
      renderPageFactory();
      renderLaunchRoom();
      renderMarketTwin();
      renderLiquidityFlywheel();
      renderFounderAutopilot();
      renderDemandExchange();
      renderProofDemandRoom();
      renderSupplierCommitmentRoom();
      renderListingActivationRoom();
      renderTrustRevenueLedger();
      renderFounderWorkbench();
      renderFounderMorningBrief();
      renderFounderDailyMoves();
      renderFounderCallSheet();
      document.querySelector("#page-factory").scrollIntoView({ behavior: "smooth", block: "start" });
      showToast("Market page factory focused.");
    });
  });
}

function getPageFactoryModel() {
  const opportunities = getMarketOpportunities();
  const pages = opportunities
    .map((opportunity) => getPageFactoryPage(opportunity))
    .sort((a, b) => b.readiness - a.readiness || b.demandCount - a.demandCount || a.title.localeCompare(b.title));
  const active = pages.find((page) => page.key === state.activeMarketKey) || pages[0];

  if (active) state.activeMarketKey = active.key;

  const readyCount = pages.filter((page) => page.statusClass === "launch").length;
  const prepareCount = pages.filter((page) => page.statusClass === "prepare").length;
  const supplierTargets = pages.reduce((total, page) => total + page.supplierTarget, 0);
  const totalArr = pages.reduce((total, page) => total + page.annualRevenue, 0);
  const demandSignals = pages.reduce((total, page) => total + page.demandCount, 0);
  const badge = readyCount ? "Ready to publish" : prepareCount ? "Supply work" : "Listen first";

  return {
    pages,
    active,
    gates: active ? getPageFactoryGates(active) : [],
    readyCount,
    prepareCount,
    supplierTargets,
    totalArr,
    demandSignals,
    badge
  };
}

function getPageFactoryPage(opportunity) {
  const matchedListings = listings.filter((listing) =>
    listing.region === opportunity.region && listing.category === opportunity.category
  );
  const verifiedSupply = matchedListings.filter((listing) => listing.verified).length;
  const pendingProof = matchedListings.reduce((total, listing) =>
    total + listing.documents.filter((document) => document.toLowerCase().includes("pending")).length, 0
  );
  const proofGap = Math.max(0, Math.min(3, opportunity.proof.length - verifiedSupply)) + pendingProof;
  const supplyGap = Math.max(0, opportunity.supplyGap);
  const readiness = Math.max(0, Math.min(100, Math.round(
    opportunity.score
    + Math.min(16, verifiedSupply * 7)
    + Math.min(10, opportunity.visibleSupply * 3)
    - Math.min(18, proofGap * 5)
    - Math.min(16, supplyGap * 2)
  )));
  const statusClass = readiness >= 78 ? "launch" : readiness >= 58 ? "prepare" : "watch";
  const status = statusClass === "launch" ? "Launch" : statusClass === "prepare" ? "Prepare" : "Watch";
  const supplierTarget = Math.max(0, opportunity.launchListings - opportunity.visibleSupply);
  const title = `${opportunity.category} equipment rental in ${opportunity.region}`;
  const slug = `/${opportunity.slug}/`;
  const summary = statusClass === "launch"
    ? `${verifiedSupply} verified supplier${verifiedSupply === 1 ? "" : "s"} and ${opportunity.demandCount} demand signal${opportunity.demandCount === 1 ? "" : "s"} make this page publishable.`
    : statusClass === "prepare"
      ? `Recruit ${supplierTarget || 1} more verified listing${supplierTarget === 1 ? "" : "s"} before pushing this page hard.`
      : "Keep collecting buyer demand until supply and proof are stronger.";

  return {
    ...opportunity,
    title,
    slug,
    matchedListings,
    verifiedSupply,
    proofGap,
    readiness,
    status,
    statusClass,
    supplierTarget,
    summary
  };
}

function getPageFactoryGates(active) {
  const supplyStatus = active.visibleSupply >= 2 ? "ready" : active.visibleSupply ? "review" : "gap";
  const proofStatus = active.verifiedSupply >= 1 && active.proofGap <= 1 ? "ready" : active.verifiedSupply ? "review" : "gap";
  const gapStatus = active.supplierTarget <= 2 ? "ready" : active.supplierTarget <= 6 ? "review" : "gap";
  const revenueStatus = active.annualRevenue >= 1200 ? "ready" : active.annualRevenue >= 700 ? "review" : "gap";

  return [
    {
      label: "Demand proof",
      detail: `${active.demandCount} buyer signal${active.demandCount === 1 ? "" : "s"} for ${active.category.toLowerCase()} in ${active.region}.`,
      status: active.demandCount >= 3 ? "Ready" : active.demandCount >= 1 ? "Review" : "Gap",
      statusClass: active.demandCount >= 3 ? "ready" : active.demandCount >= 1 ? "review" : "gap"
    },
    {
      label: "Live supply",
      detail: `${active.visibleSupply} visible listing${active.visibleSupply === 1 ? "" : "s"} on the marketplace.`,
      status: supplyStatus === "ready" ? "Ready" : supplyStatus === "review" ? "Review" : "Gap",
      statusClass: supplyStatus
    },
    {
      label: "Verified proof",
      detail: `${active.verifiedSupply} verified supplier listing${active.verifiedSupply === 1 ? "" : "s"}, ${active.proofGap} proof gap${active.proofGap === 1 ? "" : "s"}.`,
      status: proofStatus === "ready" ? "Ready" : proofStatus === "review" ? "Review" : "Gap",
      statusClass: proofStatus
    },
    {
      label: "Supplier target",
      detail: `${active.supplierTarget} additional paid listing${active.supplierTarget === 1 ? "" : "s"} needed for strong launch coverage.`,
      status: gapStatus === "ready" ? "Ready" : gapStatus === "review" ? "Review" : "Gap",
      statusClass: gapStatus
    },
    {
      label: "Listing revenue",
      detail: `Page can model USD ${active.annualRevenue.toLocaleString()} first-year listing ARR without touching rental payment.`,
      status: revenueStatus === "ready" ? "Ready" : revenueStatus === "review" ? "Review" : "Gap",
      statusClass: revenueStatus
    }
  ];
}

function renderLaunchRoom() {
  const root = document.querySelector("#launchRoomTimeline");
  if (!root) return;

  const model = getLaunchRoomModel();
  if (!model.active) return;

  setText("#launchRoomTitle", `${model.active.region} ${model.active.category} launch sprint`);
  setText("#launchRoomBadge", model.badge);

  document.querySelector("#launchRoomScore").innerHTML = `
    <strong>${model.score}/100</strong>
    <span>${escapeHtml(model.summary)}</span>
  `;

  document.querySelector("#launchRoomMetrics").innerHTML = [
    ["Sprint status", model.badge],
    ["Supplier target", `${model.targetSuppliers} invites`],
    ["First-week ARR", `USD ${model.firstWeekArr.toLocaleString()}`],
    ["Proof gaps", String(model.active.proofGap)]
  ].map(([label, value]) => `
    <span><strong>${escapeHtml(value)}</strong>${escapeHtml(label)}</span>
  `).join("");

  root.innerHTML = model.steps.map((step) => `
    <div class="launch-room-step ${step.statusClass}">
      <strong>${escapeHtml(step.day)}</strong>
      <span>${escapeHtml(step.label)}<small>${escapeHtml(step.detail)}</small></span>
      <em>${escapeHtml(step.owner)}</em>
      <b>${escapeHtml(step.status)}</b>
    </div>
  `).join("");

  document.querySelector("#launchRoomSuppliers").innerHTML = model.suppliers.map((supplier) => `
    <button type="button" class="launch-room-supplier ${supplier.statusClass} ${supplier.listingId === state.selectedListingId ? "is-active" : ""}" data-launch-supplier="${escapeHtml(supplier.listingId)}">
      <strong>${supplier.rank}</strong>
      <span>${escapeHtml(supplier.name)}<small>${escapeHtml(supplier.reason)}</small></span>
      <em>${supplier.score}/100</em>
      <b>${escapeHtml(supplier.status)}</b>
    </button>
  `).join("");

  document.querySelector("#launchRoomPacket").innerHTML = buildLaunchRoomText(model)
    .split("\n")
    .filter(Boolean)
    .map((line) => `<p>${escapeHtml(line)}</p>`)
    .join("");

  document.querySelectorAll("[data-launch-supplier]").forEach((button) => {
    button.addEventListener("click", () => {
      const listing = listings.find((item) => item.id === button.dataset.launchSupplier);
      if (!listing) return;
      state.selectedListingId = listing.id;
      state.commandRole = "Founder";
      saveState();
      render();
      document.querySelector("#account-health").scrollIntoView({ behavior: "smooth", block: "start" });
      showToast(`${listing.supplier} opened for launch follow-up.`);
    });
  });
}

function getLaunchRoomModel() {
  const pageModel = getPageFactoryModel();
  const active = pageModel.active;
  if (!active) {
    return { active: null, score: 0, badge: "Listen first", summary: "", targetSuppliers: 0, firstWeekArr: 0, steps: [], suppliers: [] };
  }

  const suppliers = getLaunchSupplierProspects(active);
  const steps = getLaunchRoomSteps(active, suppliers);
  const bestSupplierScore = suppliers[0]?.score || 0;
  const score = Math.max(0, Math.min(100, Math.round(
    active.readiness * 0.5
    + bestSupplierScore * 0.22
    + Math.min(100, active.demandCount * 12) * 0.16
    + (active.annualRevenue >= 1200 ? 12 : 6)
  )));
  const badge = score >= 84 ? "Run sprint" : score >= 68 ? "Prep sprint" : "Recruit first";
  const targetSuppliers = Math.max(3, Math.min(8, active.supplierTarget || active.launchListings || 3));
  const firstWeekArr = Math.min(active.annualRevenue, targetSuppliers * 99);
  const openActions = steps.filter((step) => step.statusClass !== "ready").length;
  const summary = score >= 84
    ? `${active.title} is strong enough for a seven-day founder sprint. Start with ${suppliers[0]?.name || active.persona}.`
    : `${active.title} needs ${openActions} sprint action${openActions === 1 ? "" : "s"} before the founder pushes it hard.`;

  return {
    active,
    pageModel,
    score,
    badge,
    targetSuppliers,
    firstWeekArr,
    openActions,
    steps,
    suppliers,
    summary
  };
}

function getLaunchSupplierProspects(active) {
  return supplierProfiles.map((profile) => {
    const supplierListings = listings.filter((listing) => listing.supplier === profile.supplier);
    const firstListing = supplierListings[0] || listings[0];
    const categoryMatches = supplierListings.filter((listing) => listing.category === active.category).length;
    const regionMatches = supplierListings.filter((listing) => listing.region === active.region).length;
    const proofHits = active.proof.filter((required) => {
      const requiredNeedle = required.toLowerCase().split(" ")[0];
      return profile.proof.some((proof) => proof.toLowerCase().includes(requiredNeedle));
    }).length;
    const fastResponse = profile.response.includes("Under") || profile.response.includes("Same day") || profile.response.includes("Next");
    const score = Math.max(0, Math.min(100,
      42
      + categoryMatches * 16
      + regionMatches * 14
      + proofHits * 5
      + (fastResponse ? 8 : 0)
      - (categoryMatches ? 0 : 12)
      - (regionMatches ? 0 : 6)
    ));
    const statusClass = score >= 78 ? "ready" : score >= 62 ? "review" : "gap";
    const status = statusClass === "ready" ? "Invite" : statusClass === "review" ? "Verify" : "Warm";
    const reason = categoryMatches && regionMatches
      ? `${categoryMatches} matching listing${categoryMatches === 1 ? "" : "s"} in ${active.region}, proof overlap ${proofHits}/${active.proof.length}.`
      : categoryMatches
        ? `${categoryMatches} category match${categoryMatches === 1 ? "" : "es"}; ask for ${active.region} coverage or partner route.`
        : `${profile.branch} can be warmed for ${active.category.toLowerCase()} supply if fleet proof is available.`;

    return {
      name: profile.supplier,
      listingId: firstListing.id,
      score,
      status,
      statusClass,
      reason
    };
  }).sort((a, b) => b.score - a.score || a.name.localeCompare(b.name))
    .slice(0, 5)
    .map((supplier, index) => ({ ...supplier, rank: index + 1 }));
}

function getLaunchRoomSteps(active, suppliers) {
  const demandReady = active.demandCount >= 3;
  const supplyReady = active.visibleSupply >= 2;
  const proofReady = active.proofGap <= 1 && active.verifiedSupply >= 1;
  const supplierReady = suppliers.some((supplier) => supplier.statusClass === "ready");
  const revenueReady = active.annualRevenue >= 1200;

  return [
    {
      day: "D1",
      label: "Publish page shell",
      detail: `${active.slug} with demand proof, direct enquiry rule, and supplier trust placeholders.`,
      owner: "Founder",
      status: active.readiness >= 78 ? "Ready" : "Prep",
      statusClass: active.readiness >= 78 ? "ready" : "review"
    },
    {
      day: "D2",
      label: "Invite supplier anchors",
      detail: `Start with ${suppliers[0]?.name || active.persona}; target ${Math.max(3, active.supplierTarget || 3)} paid listings.`,
      owner: "Growth",
      status: supplierReady ? "Ready" : "Gap",
      statusClass: supplierReady ? "ready" : "gap"
    },
    {
      day: "D3",
      label: "Collect launch proof",
      detail: `${active.proof.join(", ")} before verified badges or serious routing.`,
      owner: "Trust",
      status: proofReady ? "Ready" : "Review",
      statusClass: proofReady ? "ready" : "review"
    },
    {
      day: "D4",
      label: "Open first supply block",
      detail: `${active.visibleSupply} visible listing${active.visibleSupply === 1 ? "" : "s"} now; ${active.supplierTarget} additional listing${active.supplierTarget === 1 ? "" : "s"} still targeted.`,
      owner: "Studio",
      status: supplyReady ? "Ready" : "Gap",
      statusClass: supplyReady ? "ready" : "gap"
    },
    {
      day: "D5",
      label: "Route demand safely",
      detail: `${active.demandCount} demand signal${active.demandCount === 1 ? "" : "s"} can be converted into direct supplier enquiries once proof is clean.`,
      owner: "Desk",
      status: demandReady ? "Ready" : "Review",
      statusClass: demandReady ? "ready" : "review"
    },
    {
      day: "D7",
      label: "Review listing ARR",
      detail: `Target USD ${active.annualRevenue.toLocaleString()} first-year listing ARR without touching rental payment.`,
      owner: "Founder",
      status: revenueReady ? "Ready" : "Review",
      statusClass: revenueReady ? "ready" : "review"
    }
  ];
}

function renderMarketTwin() {
  const root = document.querySelector("#marketTwinScenarios");
  if (!root) return;

  const model = getMarketTwinModel();
  if (!model.active) return;

  setText("#marketTwinTitle", `${model.active.region} ${model.active.category} market twin`);
  setText("#marketTwinBadge", model.badge);

  document.querySelector("#marketTwinScore").innerHTML = `
    <strong>${model.score}/100</strong>
    <span>${escapeHtml(model.summary)}</span>
  `;

  document.querySelector("#marketTwinMetrics").innerHTML = [
    ["Paid listings", `${model.totalListings} after sprint`],
    ["Listing ARR", `USD ${model.annualArr.toLocaleString()}`],
    ["Demand coverage", `${model.demandCoverage}%`],
    ["Trust score", `${model.trustScore}/100`]
  ].map(([label, value]) => `
    <span><strong>${escapeHtml(value)}</strong>${escapeHtml(label)}</span>
  `).join("");

  root.innerHTML = model.scenarios.map((scenario) => `
    <button type="button" class="market-twin-scenario ${scenario.key === model.scenario.key ? "is-active" : ""}" data-twin-scenario="${escapeHtml(scenario.key)}">
      <span>
        <strong>${escapeHtml(scenario.label)}</strong>
        ${escapeHtml(scenario.detail)}
        <small>${escapeHtml(scenario.rule)}</small>
      </span>
      <em>${scenario.predictedListings} listings</em>
      <b>${escapeHtml(scenario.posture)}</b>
    </button>
  `).join("");

  document.querySelector("#marketTwinRisks").innerHTML = model.risks.map((risk) => `
    <div class="market-twin-risk ${risk.statusClass}">
      <span>
        <strong>${escapeHtml(risk.label)}</strong>
        ${escapeHtml(risk.detail)}
        <small>${escapeHtml(risk.action)}</small>
      </span>
      <em>${risk.score}/100</em>
      <b>${escapeHtml(risk.status)}</b>
    </div>
  `).join("");

  document.querySelector("#marketTwinVerdict").innerHTML = `
    <div class="market-twin-verdict-head ${escapeHtml(model.verdict.statusClass)}">
      <span>
        <strong>${escapeHtml(model.verdict.label)}</strong>
        ${escapeHtml(model.verdict.detail)}
        <small>${escapeHtml(model.verdict.rule)}</small>
      </span>
      <b>${model.verdict.score}/100</b>
    </div>
    <div class="market-twin-verdict-grid">
      ${model.verdict.controls.map((control) => `
        <div class="market-twin-verdict-control ${escapeHtml(control.statusClass)}">
          <span>
            <strong>${escapeHtml(control.label)}</strong>
            ${escapeHtml(control.detail)}
          </span>
          <em>${escapeHtml(control.status)}</em>
        </div>
      `).join("")}
    </div>
    <div class="market-twin-verdict-actions">
      ${model.verdict.actions.map((action, index) => `
        <div>
          <strong>${index + 1}</strong>
          <span>${escapeHtml(action)}</span>
        </div>
      `).join("")}
    </div>
  `;

  document.querySelector("#marketTwinPacket").innerHTML = buildMarketTwinText(model)
    .split("\n")
    .filter(Boolean)
    .map((line) => `<p>${escapeHtml(line)}</p>`)
    .join("");

  document.querySelectorAll("[data-twin-scenario]").forEach((button) => {
    button.addEventListener("click", () => {
      state.marketTwinScenario = button.dataset.twinScenario;
      saveState();
      renderMarketTwin();
      renderLiquidityFlywheel();
      renderFounderAutopilot();
      renderDemandExchange();
      renderProofDemandRoom();
      renderSupplierCommitmentRoom();
      renderListingActivationRoom();
      renderTrustRevenueLedger();
      renderFounderWorkbench();
      renderFounderMorningBrief();
      renderFounderDailyMoves();
      renderFounderCallSheet();
      showToast(`${button.textContent.trim().split(/\s+/)[0]} twin selected.`);
    });
  });
}

function getMarketTwinModel() {
  const launch = getLaunchRoomModel();
  const active = launch.active;
  if (!active) {
    return { active: null, score: 0, badge: "Listen first", summary: "", scenarios: [], risks: [] };
  }

  const scenarios = getMarketTwinScenarios(active, launch);
  const scenario = scenarios.find((item) => item.key === state.marketTwinScenario) || scenarios[1];
  state.marketTwinScenario = scenario.key;

  const totalListings = Math.max(active.visibleSupply, scenario.predictedListings);
  const annualArr = totalListings * 99;
  const monthlyRevenue = totalListings * 9;
  const demandCoverage = Math.min(100, Math.round((totalListings / Math.max(1, active.launchListings)) * 100));
  const trustScore = Math.max(0, Math.min(100, Math.round(active.readiness + scenario.proofLift - active.proofGap * 3)));
  const responseScore = Math.max(0, Math.min(100, Math.round(launch.score + scenario.responseLift - Math.max(0, active.supplierTarget - scenario.convertedSuppliers) * 2)));
  const score = Math.max(0, Math.min(100, Math.round(
    demandCoverage * 0.28
    + trustScore * 0.28
    + responseScore * 0.22
    + Math.min(100, annualArr / 18) * 0.22
  )));
  const badge = score >= 86 ? "Dominate wedge" : score >= 72 ? "Open wedge" : "Build proof";
  const risks = getMarketTwinRisks({
    active,
    scenario,
    totalListings,
    demandCoverage,
    trustScore,
    responseScore,
    annualArr
  });
  const verdict = getMarketTwinVerdict({
    active,
    scenario,
    risks,
    totalListings,
    demandCoverage,
    trustScore,
    responseScore,
    annualArr,
    monthlyRevenue,
    score
  });
  const summary = score >= 86
    ? `${scenario.label} can turn ${active.title} into a defensible page-led market wedge.`
    : score >= 72
      ? `${scenario.label} can open ${active.title}, but the founder must protect trust and supply density.`
      : `${scenario.label} is still fragile for ${active.title}; proof and supplier density should come first.`;

  return {
    active,
    launch,
    scenarios,
    scenario,
    totalListings,
    annualArr,
    monthlyRevenue,
    demandCoverage,
    trustScore,
    responseScore,
    score,
    badge,
    risks,
    verdict,
    summary
  };
}

function getMarketTwinScenarios(active, launch) {
  const base = [
    {
      key: "lean",
      label: "Lean launch",
      invites: 3,
      conversionRate: 0.45,
      proofLift: 5,
      responseLift: 4,
      posture: "Careful",
      detail: "Use a narrow page, one anchor supplier, and proof-first routing.",
      rule: "Best when trust is still thin and founder time is limited."
    },
    {
      key: "balanced",
      label: "Balanced launch",
      invites: 6,
      conversionRate: 0.5,
      proofLift: 11,
      responseLift: 10,
      posture: "Operate",
      detail: "Recruit several suppliers, publish a useful page, and open direct enquiry routing.",
      rule: "Best default for phase-one listing revenue without over-promising supply."
    },
    {
      key: "aggressive",
      label: "Aggressive launch",
      invites: 10,
      conversionRate: 0.58,
      proofLift: 16,
      responseLift: 15,
      posture: "Attack",
      detail: "Push the page, recruit hard, and turn demand into supplier urgency quickly.",
      rule: "Best when proof is strong and the category can support fast supplier onboarding."
    }
  ];

  return base.map((scenario) => {
    const convertedSuppliers = Math.max(1, Math.round(scenario.invites * scenario.conversionRate));
    const predictedListings = Math.max(active.visibleSupply + convertedSuppliers, Math.min(active.launchListings + convertedSuppliers, active.visibleSupply + scenario.invites));
    return {
      ...scenario,
      convertedSuppliers,
      predictedListings,
      score: Math.min(100, launch.score + scenario.proofLift + scenario.responseLift)
    };
  });
}

function getMarketTwinRisks(context) {
  const supplyScore = Math.min(100, Math.round(context.demandCoverage));
  const trustScore = context.trustScore;
  const responseScore = context.responseScore;
  const revenueScore = Math.min(100, Math.round(context.annualArr / 18));

  return [
    getMarketTwinRisk(
      "Supply density",
      supplyScore,
      `${context.totalListings} modeled paid listing${context.totalListings === 1 ? "" : "s"} against ${context.active.launchListings} launch target.`,
      context.totalListings >= context.active.launchListings ? "Keep page live and recruit depth." : "Recruit more verified listings before scaling traffic."
    ),
    getMarketTwinRisk(
      "Trust burden",
      trustScore,
      `${context.active.proofGap} proof gap${context.active.proofGap === 1 ? "" : "s"} after ${context.scenario.label.toLowerCase()}.`,
      trustScore >= 80 ? "Use verified badges carefully." : "Collect missing documents before routing serious enquiries."
    ),
    getMarketTwinRisk(
      "Lead response",
      responseScore,
      `${context.scenario.invites} supplier invite${context.scenario.invites === 1 ? "" : "s"} with ${context.scenario.convertedSuppliers} modeled conversion${context.scenario.convertedSuppliers === 1 ? "" : "s"}.`,
      responseScore >= 80 ? "Open direct routing and measure reply speed." : "Keep founder follow-up tight until supplier response is proven."
    ),
    getMarketTwinRisk(
      "Revenue pull",
      revenueScore,
      `USD ${context.annualArr.toLocaleString()} modeled listing ARR and USD ${(context.totalListings * 9).toLocaleString()} monthly subscription revenue.`,
      revenueScore >= 80 ? "Protect annual-plan upsell after proof is stable." : "Keep price simple until suppliers see demand."
    )
  ];
}

function getMarketTwinRisk(label, score, detail, action) {
  const statusClass = score >= 80 ? "ready" : score >= 62 ? "review" : "gap";
  return {
    label,
    score,
    detail,
    action,
    statusClass,
    status: statusClass === "ready" ? "Ready" : statusClass === "review" ? "Watch" : "Gap"
  };
}

function getMarketTwinVerdict(context) {
  const riskGaps = context.risks.filter((risk) => risk.statusClass === "gap").length;
  const readyRisks = context.risks.filter((risk) => risk.statusClass === "ready").length;
  const supplyShortfall = Math.max(0, context.active.launchListings - context.totalListings);
  const proofGap = Math.max(0, context.active.proofGap);
  const responseShortfall = Math.max(0, 72 - context.responseScore);
  const annualTarget = Math.max(990, context.active.launchListings * 99);
  const revenueShortfall = Math.max(0, annualTarget - context.annualArr);
  const statusClass = context.score >= 86 && riskGaps === 0
    ? "ready"
    : context.score >= 72 && riskGaps <= 1
      ? "review"
      : "gap";
  const label = statusClass === "ready"
    ? "Scale the wedge"
    : statusClass === "review"
      ? "Open carefully"
      : "Build proof first";
  const detail = statusClass === "ready"
    ? `${context.scenario.label} can open traffic while the founder protects annual listing conversion.`
    : statusClass === "review"
      ? `${context.scenario.label} can start, but only with controlled enquiry routing and active supplier follow-up.`
      : `${context.scenario.label} should stay in proof mode until supply, trust, response, and revenue pull improve.`;
  const rule = statusClass === "ready"
    ? "Route verified enquiries, measure replies, and push annual listing plans after proof is visible."
    : statusClass === "review"
      ? "Open the page, cap traffic, recruit suppliers, and route only proof-backed direct enquiries."
      : "Hold heavy traffic; recruit verified listings and close proof gaps before scaling.";
  const controls = [
    getMarketTwinVerdictControl({
      label: "Traffic gate",
      status: context.demandCoverage >= 70 && riskGaps <= 1 ? "Open" : "Hold",
      statusClass: context.demandCoverage >= 70 && riskGaps <= 1 ? "ready" : "gap",
      detail: `${context.demandCoverage}% demand coverage with ${riskGaps} gap${riskGaps === 1 ? "" : "s"} on the twin.`
    }),
    getMarketTwinVerdictControl({
      label: "Supplier gate",
      status: supplyShortfall ? "Recruit" : "Ready",
      statusClass: supplyShortfall ? "gap" : "ready",
      detail: supplyShortfall ? `${supplyShortfall} more verified paid listing${supplyShortfall === 1 ? "" : "s"} needed.` : "Launch target is covered by modeled listings."
    }),
    getMarketTwinVerdictControl({
      label: "Proof gate",
      status: proofGap ? "Fix" : "Ready",
      statusClass: proofGap ? "review" : "ready",
      detail: proofGap ? `${proofGap} document or proof gap${proofGap === 1 ? "" : "s"} still affects trust.` : "Proof burden is clean for this twin."
    }),
    getMarketTwinVerdictControl({
      label: "Response gate",
      status: responseShortfall ? "Chase" : "Ready",
      statusClass: responseShortfall ? "gap" : "ready",
      detail: responseShortfall ? `Supplier response needs ${responseShortfall} more point${responseShortfall === 1 ? "" : "s"}.` : "Response score can support direct enquiries."
    }),
    getMarketTwinVerdictControl({
      label: "Revenue gate",
      status: revenueShortfall ? "Build" : "Ready",
      statusClass: revenueShortfall ? "review" : "ready",
      detail: revenueShortfall ? `USD ${revenueShortfall.toLocaleString()} ARR short of the first credible wedge.` : `USD ${context.annualArr.toLocaleString()} modeled annual listing revenue.`
    }),
    getMarketTwinVerdictControl({
      label: "Payment gate",
      status: "Locked",
      statusClass: "ready",
      detail: "0% rental take; buyer pays the rental company directly."
    })
  ];
  const actions = [
    supplyShortfall ? `Recruit ${supplyShortfall} more verified paid listing${supplyShortfall === 1 ? "" : "s"} before opening serious traffic.` : "Keep supplier density fresh and ask each anchor supplier for annual listing commitment.",
    proofGap ? `Close ${proofGap} proof gap${proofGap === 1 ? "" : "s"} before routing high-value buyers.` : "Use proof strength in the supplier pitch and buyer page.",
    responseShortfall ? "Keep founder follow-up tight until supplier replies can support buyer expectations." : "Route direct enquiries and measure supplier reply speed.",
    revenueShortfall ? "Keep USD 9/99 pricing simple and sell demand proof before upsell." : "Convert the strongest suppliers to annual listing plans after first proof.",
    "Do not introduce rental commission until the direct deal trail proves quote, award, response, and mobilization value."
  ];

  return {
    label,
    detail,
    rule,
    score: context.score,
    statusClass,
    readyRisks,
    riskGaps,
    controls,
    actions
  };
}

function getMarketTwinVerdictControl({ label, status, statusClass, detail }) {
  return {
    label,
    status,
    statusClass,
    detail
  };
}

function renderLiquidityFlywheel() {
  const root = document.querySelector("#liquidityFlywheelLoops");
  if (!root) return;

  const model = getLiquidityFlywheelModel();
  if (!model.active) return;

  setText("#liquidityFlywheelTitle", `${model.active.region} ${model.active.category} flywheel`);
  setText("#liquidityFlywheelBadge", model.badge);

  document.querySelector("#liquidityFlywheelScore").innerHTML = `
    <strong>${model.score}/100</strong>
    <span>${escapeHtml(model.summary)}</span>
  `;

  document.querySelector("#liquidityFlywheelMetrics").innerHTML = [
    ["Bottleneck", model.bottleneck.label],
    ["Compounding loop", model.strongest.label],
    ["Revenue pull", `USD ${model.twin.annualArr.toLocaleString()}`],
    ["Next action", model.bottleneck.status]
  ].map(([label, value]) => `
    <span><strong>${escapeHtml(value)}</strong>${escapeHtml(label)}</span>
  `).join("");

  root.innerHTML = model.loops.map((loop, index) => `
    <div class="liquidity-flywheel-loop ${loop.statusClass}">
      <strong>${index + 1}</strong>
      <span>
        ${escapeHtml(loop.label)}
        <small>${escapeHtml(loop.detail)}</small>
      </span>
      <em>${loop.score}/100</em>
      <b>${escapeHtml(loop.status)}</b>
    </div>
  `).join("");

  document.querySelector("#liquidityFlywheelBottlenecks").innerHTML = model.fixes.map((fix, index) => `
    <div class="liquidity-flywheel-fix ${fix.statusClass}">
      <strong>${index + 1}</strong>
      <span>
        ${escapeHtml(fix.label)}
        <small>${escapeHtml(fix.detail)}</small>
      </span>
      <em>${escapeHtml(fix.owner)}</em>
      <b>${escapeHtml(fix.status)}</b>
    </div>
  `).join("");

  document.querySelector("#liquidityFlywheelPacket").innerHTML = buildLiquidityFlywheelText(model)
    .split("\n")
    .filter(Boolean)
    .map((line) => `<p>${escapeHtml(line)}</p>`)
    .join("");
}

function getLiquidityFlywheelModel() {
  const twin = getMarketTwinModel();
  const active = twin.active;
  if (!active) {
    return { active: null, score: 0, badge: "Listen first", summary: "", loops: [], fixes: [] };
  }

  const demandScore = Math.min(100, Math.round(active.demandCount * 13 + active.urgencyHits * 9 + twin.demandCoverage * 0.25));
  const supplyScore = Math.min(100, Math.round(twin.demandCoverage + Math.min(18, twin.totalListings * 2)));
  const trustScore = twin.trustScore;
  const responseScore = twin.responseScore;
  const revenueScore = Math.min(100, Math.round(twin.annualArr / 18));

  const loops = [
    getLiquidityLoop(
      "Demand to page",
      demandScore,
      `${active.demandCount} demand signal${active.demandCount === 1 ? "" : "s"} make ${active.title} worth a focused page.`,
      "Capture more unmet searches and keep the page tied to real buyer language."
    ),
    getLiquidityLoop(
      "Page to supply",
      supplyScore,
      `${twin.totalListings} modeled paid listing${twin.totalListings === 1 ? "" : "s"} cover ${twin.demandCoverage}% of launch target.`,
      "Recruit anchor suppliers until the page has enough visible supply to feel real."
    ),
    getLiquidityLoop(
      "Supply to trust",
      trustScore,
      `${active.verifiedSupply} verified listing${active.verifiedSupply === 1 ? "" : "s"} and ${active.proofGap} proof gap${active.proofGap === 1 ? "" : "s"}.`,
      "Close license, insurance, inspection, operator, or photo proof before pushing traffic."
    ),
    getLiquidityLoop(
      "Trust to response",
      responseScore,
      `${twin.scenario.convertedSuppliers} modeled supplier conversion${twin.scenario.convertedSuppliers === 1 ? "" : "s"} under the ${twin.scenario.label.toLowerCase()} scenario.`,
      "Measure supplier response speed before adding booking rails or heavier buyer promises."
    ),
    getLiquidityLoop(
      "Response to revenue",
      revenueScore,
      `USD ${twin.annualArr.toLocaleString()} modeled listing ARR while rental payment stays direct.`,
      "Use direct enquiry proof to convert monthly listings into annual supplier plans."
    )
  ];

  const sorted = [...loops].sort((a, b) => a.score - b.score);
  const bottleneck = sorted[0];
  const strongest = sorted[sorted.length - 1];
  const score = Math.round(loops.reduce((total, loop) => total + loop.score, 0) / loops.length);
  const badge = score >= 84 && bottleneck.score >= 70 ? "Compounding" : score >= 70 ? "Turning" : "Founder push";
  const summary = badge === "Compounding"
    ? `${active.title} is close to a self-reinforcing supplier and buyer loop. Protect ${bottleneck.label.toLowerCase()}.`
    : badge === "Turning"
      ? `${active.title} has a working flywheel, but ${bottleneck.label.toLowerCase()} still slows compounding.`
      : `${active.title} still needs founder force. Fix ${bottleneck.label.toLowerCase()} before scaling traffic.`;
  const fixes = getLiquidityFixes(loops, active, twin);

  return {
    active,
    twin,
    loops,
    fixes,
    bottleneck,
    strongest,
    score,
    badge,
    summary
  };
}

function getLiquidityLoop(label, score, detail, action) {
  const statusClass = score >= 80 ? "ready" : score >= 62 ? "review" : "gap";
  return {
    label,
    score,
    detail,
    action,
    statusClass,
    status: statusClass === "ready" ? "Ready" : statusClass === "review" ? "Watch" : "Gap"
  };
}

function getLiquidityFixes(loops, active, twin) {
  return [...loops]
    .sort((a, b) => a.score - b.score)
    .slice(0, 3)
    .map((loop) => {
      const owner = loop.label.includes("Demand") ? "Growth"
        : loop.label.includes("Page") ? "Founder"
          : loop.label.includes("Trust") ? "Trust"
            : loop.label.includes("Response") ? "Success"
              : "Revenue";
      const detail = loop.label.includes("Revenue")
        ? `${twin.totalListings} paid listing${twin.totalListings === 1 ? "" : "s"} can become USD ${twin.annualArr.toLocaleString()} ARR if supplier ROI is visible.`
        : loop.action;
      return {
        label: `Fix ${loop.label.toLowerCase()}`,
        detail,
        owner,
        status: loop.status,
        statusClass: loop.statusClass,
        market: active.title
      };
    });
}

function renderFounderAutopilot() {
  const queueRoot = document.querySelector("#founderAutopilotQueue");
  if (!queueRoot) return;

  const model = getFounderAutopilotModel();
  if (!model.active) return;

  setText("#founderAutopilotTitle", `${model.active.region} ${model.active.category} founder autopilot`);
  setText("#founderAutopilotBadge", model.badge);

  document.querySelector("#founderAutopilotScore").innerHTML = `
    <strong>${model.score}/100</strong>
    <span>${escapeHtml(model.summary)}</span>
  `;

  document.querySelector("#founderAutopilotMetrics").innerHTML = [
    ["First command", model.primary.owner],
    ["Bottleneck", model.flywheel.bottleneck.label],
    ["ARR unlocked", `USD ${model.totalImpactArr.toLocaleString()}`],
    ["Open commands", String(model.openCommandCount)]
  ].map(([label, value]) => `
    <span><strong>${escapeHtml(value)}</strong>${escapeHtml(label)}</span>
  `).join("");

  queueRoot.innerHTML = model.commands.map((command, index) => `
    <button type="button" class="founder-autopilot-command ${command.statusClass} ${index === 0 ? "is-primary" : ""}" data-autopilot-anchor="${escapeHtml(command.anchor)}">
      <strong>${index + 1}</strong>
      <span>
        ${escapeHtml(command.label)}
        <small>${escapeHtml(command.detail)}</small>
      </span>
      <em>${escapeHtml(command.owner)} - ${escapeHtml(command.due)}</em>
      <b>${escapeHtml(command.status)}</b>
    </button>
  `).join("");

  document.querySelector("#founderAutopilotImpact").innerHTML = model.impactRows.map((row, index) => `
    <div class="founder-autopilot-impact-row ${row.statusClass}">
      <strong>${index + 1}</strong>
      <span>
        ${escapeHtml(row.label)}
        <small>${escapeHtml(row.detail)}</small>
      </span>
      <em>USD ${row.impactArr.toLocaleString()}</em>
      <b>${escapeHtml(row.status)}</b>
    </div>
  `).join("");

  document.querySelector("#founderAutopilotPacket").innerHTML = buildFounderAutopilotText(model)
    .split("\n")
    .filter(Boolean)
    .map((line) => `<p>${escapeHtml(line)}</p>`)
    .join("");

  document.querySelectorAll("[data-autopilot-anchor]").forEach((button) => {
    button.addEventListener("click", () => {
      const target = document.querySelector(button.dataset.autopilotAnchor);
      if (!target) return;
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      showToast("Autopilot command opened.");
    });
  });
}

function getFounderAutopilotModel() {
  const flywheel = getLiquidityFlywheelModel();
  const active = flywheel.active;
  if (!active) {
    return {
      active: null,
      flywheel,
      score: 0,
      badge: "Listen first",
      summary: "",
      primary: null,
      commands: [],
      impactRows: [],
      totalImpactArr: 0,
      openCommandCount: 0
    };
  }

  const commands = getFounderAutopilotCommands(flywheel);
  const primary = commands[0];
  const totalImpactArr = commands.reduce((total, command) => total + command.impactArr, 0);
  const openCommandCount = commands.filter((command) => command.statusClass !== "ready").length;
  const actionLift = Math.min(14, Math.round((totalImpactArr / Math.max(99, flywheel.twin.annualArr)) * 14));
  const score = Math.max(0, Math.min(100, Math.round(flywheel.score + actionLift - openCommandCount * 4)));
  const badge = getFounderAutopilotStatus(score, openCommandCount);
  const summary = `Start with ${primary.owner}: ${primary.label}. This turns ${flywheel.bottleneck.label.toLowerCase()} into owned weekly work for ${active.title}.`;
  const impactRows = commands.map((command) => ({
    label: command.label,
    detail: `${command.owner} owns ${command.due.toLowerCase()} execution through ${command.anchor.replace("#", "")}.`,
    status: command.status,
    statusClass: command.statusClass,
    impactArr: command.impactArr
  }));

  return {
    active,
    flywheel,
    score,
    badge,
    summary,
    primary,
    commands,
    impactRows,
    totalImpactArr,
    openCommandCount
  };
}

function getFounderAutopilotCommands(flywheel) {
  const impactWeights = [0.36, 0.22, 0.14];
  const dueWindows = ["Today", "48h", "This week"];
  const commands = flywheel.fixes.map((fix, index) => {
    const loop = flywheel.loops.find((item) => fix.label.toLowerCase().includes(item.label.toLowerCase())) || flywheel.bottleneck;
    const status = fix.statusClass === "ready" ? "Protect" : fix.statusClass === "review" ? "Tighten" : "Dispatch";
    const urgency = Math.max(18, Math.min(99, 100 - loop.score + index * 5));
    const impactArr = Math.max(99, Math.round(flywheel.twin.annualArr * impactWeights[index]));

    return {
      label: `Repair ${loop.label.toLowerCase()}`,
      detail: fix.detail,
      owner: fix.owner,
      due: dueWindows[index],
      status,
      statusClass: fix.statusClass,
      urgency,
      impactArr,
      anchor: getAutopilotOwnerAnchor(fix.owner)
    };
  });

  const protectOwner = getAutopilotOwnerForLoop(flywheel.strongest.label);
  commands.push({
    label: `Protect ${flywheel.strongest.label.toLowerCase()}`,
    detail: flywheel.strongest.action,
    owner: protectOwner,
    due: "This week",
    status: "Protect",
    statusClass: "ready",
    urgency: Math.max(12, 100 - flywheel.strongest.score),
    impactArr: Math.max(99, Math.round(flywheel.twin.annualArr * 0.1)),
    anchor: getAutopilotOwnerAnchor(protectOwner)
  });

  return commands.sort((a, b) => b.urgency - a.urgency || b.impactArr - a.impactArr);
}

function getFounderAutopilotStatus(score, openCommandCount) {
  if (score >= 84 && openCommandCount <= 1) return "Autopilot ready";
  if (score >= 70) return "Run this week";
  return "Founder push";
}

function getAutopilotOwnerForLoop(label) {
  return label.includes("Demand") ? "Growth"
    : label.includes("Page") ? "Founder"
      : label.includes("Trust") ? "Trust"
        : label.includes("Response") ? "Success"
          : "Revenue";
}

function getAutopilotOwnerAnchor(owner) {
  return owner === "Growth" ? "#growth"
    : owner === "Trust" ? "#proof-vault"
      : owner === "Success" ? "#supplier-success"
        : owner === "Revenue" ? "#revenue-desk"
          : "#launch-room";
}

function renderDemandExchange() {
  const ticketRoot = document.querySelector("#demandExchangeTickets");
  if (!ticketRoot) return;

  const model = getDemandExchangeModel();
  if (!model.active) return;

  setText("#demandExchangeTitle", `${model.active.region} ${model.active.category} demand exchange`);
  setText("#demandExchangeBadge", model.badge);

  document.querySelector("#demandExchangeScore").innerHTML = `
    <strong>${model.score}/100</strong>
    <span>${escapeHtml(model.summary)}</span>
  `;

  document.querySelector("#demandExchangeMetrics").innerHTML = [
    ["Buyer signals", String(model.active.demandCount)],
    ["Supply gap", `${model.active.supplyGap} listings`],
    ["Supplier pull", model.badge],
    ["Exchange ARR", `USD ${model.exchangeArr.toLocaleString()}`]
  ].map(([label, value]) => `
    <span><strong>${escapeHtml(value)}</strong>${escapeHtml(label)}</span>
  `).join("");

  ticketRoot.innerHTML = model.tickets.map((ticket, index) => `
    <button type="button" class="demand-exchange-ticket ${ticket.statusClass} ${ticket.key === model.active.key ? "is-active" : ""}" data-exchange-key="${escapeHtml(ticket.key)}">
      <strong>${index + 1}</strong>
      <span>
        ${escapeHtml(ticket.title)}
        <small>${escapeHtml(ticket.detail)}</small>
      </span>
      <em>${ticket.pullScore}/100</em>
      <b>${escapeHtml(ticket.status)}</b>
    </button>
  `).join("");

  document.querySelector("#demandExchangeLanes").innerHTML = model.lanes.map((lane, index) => `
    <div class="demand-exchange-lane ${lane.statusClass}">
      <strong>${index + 1}</strong>
      <span>
        ${escapeHtml(lane.label)}
        <small>${escapeHtml(lane.detail)}</small>
      </span>
      <em>${escapeHtml(lane.value)}</em>
      <b>${escapeHtml(lane.status)}</b>
    </div>
  `).join("");

  document.querySelector("#demandExchangePacket").innerHTML = buildDemandExchangeText(model)
    .split("\n")
    .filter(Boolean)
    .map((line) => `<p>${escapeHtml(line)}</p>`)
    .join("");

  document.querySelectorAll("[data-exchange-key]").forEach((button) => {
    button.addEventListener("click", () => {
      state.activeMarketKey = button.dataset.exchangeKey;
      const selected = getMarketOpportunities().find((item) => item.key === state.activeMarketKey);
      if (selected?.signalKey) state.activeDemandKey = selected.signalKey;
      saveState();
      renderDemandRadar();
      renderSupplierHunt();
      renderMarketSignalMatrix();
      renderMarketMaker();
      renderPageFactory();
      renderLaunchRoom();
      renderMarketTwin();
      renderLiquidityFlywheel();
      renderFounderAutopilot();
      renderDemandExchange();
      renderProofDemandRoom();
      renderSupplierCommitmentRoom();
      renderListingActivationRoom();
      renderTrustRevenueLedger();
      renderFounderWorkbench();
      renderFounderMorningBrief();
      renderFounderDailyMoves();
      renderFounderCallSheet();
      showToast("Demand Exchange market selected.");
    });
  });
}

function getDemandExchangeModel() {
  const opportunities = getMarketOpportunities();
  const active = opportunities.length ? getActiveMarketOpportunity(opportunities) : null;
  if (!active) {
    return {
      active: null,
      tickets: [],
      lanes: [],
      score: 0,
      badge: "Listen first",
      summary: "",
      exchangeArr: 0
    };
  }

  const tickets = opportunities.map((opportunity) => getDemandExchangeTicket(opportunity));
  const activeTicket = tickets.find((ticket) => ticket.key === active.key) || tickets[0];
  const lanes = getDemandExchangeLanes(active, activeTicket);
  const exchangeArr = tickets.reduce((total, ticket) => total + ticket.annualRevenue, 0);
  const score = activeTicket.pullScore;
  const badge = score >= 82 ? "Supplier pull" : score >= 62 ? "Recruit now" : "Seed demand";
  const summary = score >= 82
    ? `${active.title || `${active.region} ${active.category}`} has enough visible demand to invite suppliers with confidence.`
    : score >= 62
      ? `${active.region} ${active.category} has a useful gap. Recruit anchor suppliers and prove response before scaling.`
      : `${active.region} ${active.category} needs more demand capture before it becomes a strong supplier magnet.`;

  return {
    active,
    activeTicket,
    tickets,
    lanes,
    score,
    badge,
    summary,
    exchangeArr
  };
}

function getDemandExchangeTicket(opportunity) {
  const zeroSupplyLift = opportunity.visibleSupply === 0 ? 10 : 0;
  const gapLift = Math.min(24, opportunity.supplyGap * 3);
  const urgencyLift = Math.min(18, opportunity.urgencyHits * 6);
  const pullScore = Math.max(0, Math.min(100, Math.round(opportunity.score * 0.52 + gapLift + urgencyLift + zeroSupplyLift)));
  const statusClass = pullScore >= 82 ? "ready" : pullScore >= 62 ? "review" : "gap";
  const needed = opportunity.supplyGap || Math.max(1, Math.ceil(opportunity.launchListings * 0.35));

  return {
    key: opportunity.key,
    title: `${opportunity.region} ${opportunity.category}`,
    detail: `${opportunity.demandCount} buyer signal${opportunity.demandCount === 1 ? "" : "s"}, ${needed} listing${needed === 1 ? "" : "s"} to recruit, USD ${opportunity.annualRevenue.toLocaleString()} first-year listing ARR.`,
    pullScore,
    statusClass,
    status: statusClass === "ready" ? "Invite" : statusClass === "review" ? "Warm" : "Capture",
    demandCount: opportunity.demandCount,
    supplyGap: opportunity.supplyGap,
    annualRevenue: opportunity.annualRevenue,
    persona: opportunity.persona,
    proof: opportunity.proof
  };
}

function getDemandExchangeLanes(active, ticket) {
  const proofReady = active.proof.length >= 3;
  const supplierNeed = active.supplyGap || Math.max(1, Math.ceil(active.launchListings * 0.35));

  return [
    {
      label: "Prove buyer demand",
      detail: `${active.demandCount} captured search signal${active.demandCount === 1 ? "" : "s"} can become the supplier hook.`,
      value: `${active.demandCount} signals`,
      status: active.demandCount >= 3 ? "Ready" : "Collect",
      statusClass: active.demandCount >= 3 ? "ready" : "review"
    },
    {
      label: "Show the supply gap",
      detail: `${active.visibleSupply} live listing${active.visibleSupply === 1 ? "" : "s"} are visible against a ${active.launchListings} listing launch target.`,
      value: `${supplierNeed} needed`,
      status: active.supplyGap > 0 ? "Gap" : "Covered",
      statusClass: active.supplyGap > 0 ? "gap" : "ready"
    },
    {
      label: "Ask for proof",
      detail: `Request ${active.proof.slice(0, 3).join(", ").toLowerCase()} before a verified badge appears.`,
      value: proofReady ? "Proof list" : "Define proof",
      status: proofReady ? "Ready" : "Review",
      statusClass: proofReady ? "ready" : "review"
    },
    {
      label: "Convert to listing SaaS",
      detail: `Position the opportunity as USD ${active.annualRevenue.toLocaleString()} first-year listing visibility, no rental commission.`,
      value: `USD ${active.annualRevenue.toLocaleString()}`,
      status: ticket.status,
      statusClass: ticket.statusClass
    }
  ];
}

function renderProofDemandRoom() {
  const evidenceRoot = document.querySelector("#proofDemandEvidence");
  if (!evidenceRoot) return;

  const model = getProofDemandRoomModel();
  if (!model.active) return;

  setText("#proofDemandTitle", `${model.active.region} ${model.active.category} proof room`);
  setText("#proofDemandBadge", model.badge);

  document.querySelector("#proofDemandScore").innerHTML = `
    <strong>${model.score}/100</strong>
    <span>${escapeHtml(model.summary)}</span>
  `;

  document.querySelector("#proofDemandMetrics").innerHTML = [
    ["Supplier answer", model.primaryObjection.label],
    ["Demand proof", `${model.active.demandCount} signals`],
    ["Trust proof", `${model.active.proof.length} asks`],
    ["Listing ROI", `USD ${model.proofValue.toLocaleString()}`]
  ].map(([label, value]) => `
    <span><strong>${escapeHtml(value)}</strong>${escapeHtml(label)}</span>
  `).join("");

  evidenceRoot.innerHTML = model.evidence.map((item, index) => `
    <div class="proof-demand-evidence-row ${item.statusClass}">
      <strong>${index + 1}</strong>
      <span>
        ${escapeHtml(item.label)}
        <small>${escapeHtml(item.detail)}</small>
      </span>
      <em>${escapeHtml(item.value)}</em>
      <b>${escapeHtml(item.status)}</b>
    </div>
  `).join("");

  document.querySelector("#proofDemandObjections").innerHTML = model.objections.map((item, index) => `
    <div class="proof-demand-objection ${item.statusClass}">
      <strong>${index + 1}</strong>
      <span>
        ${escapeHtml(item.label)}
        <small>${escapeHtml(item.answer)}</small>
      </span>
      <em>${escapeHtml(item.owner)}</em>
      <b>${escapeHtml(item.status)}</b>
    </div>
  `).join("");

  document.querySelector("#proofDemandPacket").innerHTML = buildProofDemandText(model)
    .split("\n")
    .filter(Boolean)
    .map((line) => `<p>${escapeHtml(line)}</p>`)
    .join("");
}

function getProofDemandRoomModel() {
  const exchange = getDemandExchangeModel();
  const active = exchange.active;
  if (!active) {
    return {
      active: null,
      exchange,
      score: 0,
      badge: "Listen first",
      summary: "",
      evidence: [],
      objections: [],
      primaryObjection: null,
      proofValue: 0
    };
  }

  const evidence = getProofDemandEvidence(active, exchange.activeTicket);
  const objections = getProofDemandObjections(active, exchange);
  const readyEvidence = evidence.filter((item) => item.statusClass === "ready").length;
  const objectionScore = objections.filter((item) => item.statusClass !== "gap").length * 7;
  const proofValue = Math.max(active.annualRevenue, Math.round(exchange.exchangeArr * 0.32));
  const score = Math.max(0, Math.min(100, Math.round(exchange.score * 0.52 + readyEvidence * 8 + objectionScore)));
  const badge = score >= 84 ? "Proof ready" : score >= 68 ? "Sales ready" : "Collect proof";
  const primaryObjection = objections[0];
  const summary = score >= 84
    ? `${active.region} ${active.category} has enough proof to invite suppliers with a demand-backed listing offer.`
    : score >= 68
      ? `${active.region} ${active.category} can be sold now, but the proof pack should stay honest about the open gap.`
      : `${active.region} ${active.category} needs stronger evidence before supplier outreach feels undeniable.`;

  return {
    active,
    exchange,
    score,
    badge,
    summary,
    evidence,
    objections,
    primaryObjection,
    proofValue
  };
}

function getProofDemandEvidence(active, ticket) {
  const supplierNeed = active.supplyGap || Math.max(1, Math.ceil(active.launchListings * 0.35));
  const demandReady = active.demandCount >= 3;
  const gapReady = supplierNeed > 0;
  const proofReady = active.proof.length >= 3;
  const roiReady = active.annualRevenue >= 900;

  return [
    {
      label: "Buyer demand captured",
      detail: `${active.demandCount} buyer signal${active.demandCount === 1 ? "" : "s"} are already tied to this market page.`,
      value: `${active.demandCount} signals`,
      status: demandReady ? "Ready" : "Build",
      statusClass: demandReady ? "ready" : "review"
    },
    {
      label: "Supply shortage visible",
      detail: `${active.visibleSupply} live listing${active.visibleSupply === 1 ? "" : "s"} against ${active.launchListings} launch listing target.`,
      value: `${supplierNeed} needed`,
      status: gapReady ? "Open" : "Covered",
      statusClass: gapReady ? "ready" : "review"
    },
    {
      label: "Verification proof defined",
      detail: `Ask for ${active.proof.slice(0, 3).join(", ").toLowerCase()} before promising a verified supplier badge.`,
      value: `${active.proof.length} checks`,
      status: proofReady ? "Ready" : "Define",
      statusClass: proofReady ? "ready" : "gap"
    },
    {
      label: "Listing ROI visible",
      detail: `A ${active.launchListings} listing wedge models USD ${active.annualRevenue.toLocaleString()} first-year listing ARR.`,
      value: `USD ${active.annualRevenue.toLocaleString()}`,
      status: roiReady ? "Clear" : "Small",
      statusClass: roiReady ? "ready" : "review"
    },
    {
      label: "Direct payment promise",
      detail: "The supplier keeps the rental relationship and payment. Heavyster earns only from active listings in phase one.",
      value: "0% take",
      status: ticket.status,
      statusClass: "ready"
    }
  ];
}

function getProofDemandObjections(active, exchange) {
  const supplyGap = active.supplyGap || Math.max(1, Math.ceil(active.launchListings * 0.35));
  const urgent = active.urgencyHits > 0;

  return [
    {
      label: "We already get rental enquiries.",
      answer: `Good. Heavyster adds searchable demand proof for ${active.region} ${active.category} and routes direct enquiries without taking rental payment.`,
      owner: "Founder",
      status: "Answer",
      statusClass: "ready"
    },
    {
      label: "We do not want marketplace commission.",
      answer: "Phase one is listing SaaS only: USD 9 monthly or USD 99 yearly per active listing, and customer payment stays direct.",
      owner: "Revenue",
      status: "Answer",
      statusClass: "ready"
    },
    {
      label: "Will serious buyers trust the listing?",
      answer: `Trust comes from ${active.proof.slice(0, 3).join(", ").toLowerCase()}, fresh availability, and a verified supplier profile before high-value enquiries are routed.`,
      owner: "Trust",
      status: active.proof.length >= 3 ? "Ready" : "Tighten",
      statusClass: active.proof.length >= 3 ? "ready" : "review"
    },
    {
      label: "Is this urgent enough for our team?",
      answer: urgent
        ? `${active.urgencyHits} urgent signal${active.urgencyHits === 1 ? "" : "s"} and ${supplyGap} open listing slot${supplyGap === 1 ? "" : "s"} make this a near-term supplier pull.`
        : `${exchange.score}/100 supplier pull means start with a small fleet lane, then expand after response proof.`,
      owner: "Growth",
      status: urgent ? "Now" : "Warm",
      statusClass: urgent ? "ready" : "review"
    }
  ];
}

function renderSupplierCommitmentRoom() {
  const packageRoot = document.querySelector("#supplierCommitmentPackages");
  if (!packageRoot) return;

  const model = getSupplierCommitmentModel();
  if (!model.active) return;

  setText("#supplierCommitmentTitle", `${model.active.region} ${model.active.category} commitment`);
  setText("#supplierCommitmentBadge", model.badge);

  document.querySelector("#supplierCommitmentScore").innerHTML = `
    <strong>${model.score}/100</strong>
    <span>${escapeHtml(model.summary)}</span>
  `;

  document.querySelector("#supplierCommitmentMetrics").innerHTML = [
    ["Recommended package", model.recommendedPackage.label],
    ["Paid listings", `${model.recommendedPackage.listings} machines`],
    ["Annual close", `USD ${model.recommendedPackage.annualRevenue.toLocaleString()}`],
    ["Go-live gates", `${model.readyGateCount}/${model.gates.length} ready`]
  ].map(([label, value]) => `
    <span><strong>${escapeHtml(value)}</strong>${escapeHtml(label)}</span>
  `).join("");

  packageRoot.innerHTML = model.packages.map((item, index) => `
    <button type="button" class="supplier-commitment-package ${item.statusClass} ${item.id === model.recommendedPackage.id ? "is-recommended" : ""}" data-commitment-anchor="#pricing">
      <strong>${index + 1}</strong>
      <span>
        ${escapeHtml(item.label)}
        <small>${escapeHtml(item.detail)}</small>
      </span>
      <em>USD ${item.annualRevenue.toLocaleString()}/yr</em>
      <b>${escapeHtml(item.status)}</b>
    </button>
  `).join("");

  document.querySelector("#supplierCommitmentGates").innerHTML = model.gates.map((gate, index) => `
    <div class="supplier-commitment-gate ${gate.statusClass}">
      <strong>${index + 1}</strong>
      <span>
        ${escapeHtml(gate.label)}
        <small>${escapeHtml(gate.detail)}</small>
      </span>
      <em>${escapeHtml(gate.owner)}</em>
      <b>${escapeHtml(gate.status)}</b>
    </div>
  `).join("");

  document.querySelector("#supplierCommitmentPacket").innerHTML = buildSupplierCommitmentText(model)
    .split("\n")
    .filter(Boolean)
    .map((line) => `<p>${escapeHtml(line)}</p>`)
    .join("");

  document.querySelectorAll("[data-commitment-anchor]").forEach((button) => {
    button.addEventListener("click", () => {
      const target = document.querySelector(button.dataset.commitmentAnchor);
      if (!target) return;
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      showToast("Listing pricing opened.");
    });
  });
}

function getSupplierCommitmentModel() {
  const proof = getProofDemandRoomModel();
  const active = proof.active;
  if (!active) {
    return {
      active: null,
      proof,
      score: 0,
      badge: "Listen first",
      summary: "",
      packages: [],
      gates: [],
      recommendedPackage: null,
      readyGateCount: 0
    };
  }

  const packages = getSupplierCommitmentPackages(active, proof);
  const recommendedPackage = packages.find((item) => item.recommended) || packages[0];
  const gates = getSupplierCommitmentGates(active, proof, recommendedPackage);
  const readyGateCount = gates.filter((gate) => gate.statusClass === "ready").length;
  const score = Math.max(0, Math.min(100, Math.round(proof.score * 0.5 + recommendedPackage.closeScore * 0.32 + readyGateCount * 5)));
  const badge = score >= 84 ? "Close now" : score >= 68 ? "Close with proof" : "Nurture";
  const summary = score >= 84
    ? `${active.region} ${active.category} is ready for a paid listing close without touching rental payment.`
    : score >= 68
      ? `${active.region} ${active.category} can close with a focused starter package and honest proof gates.`
      : `${active.region} ${active.category} needs more proof before asking for a paid listing commitment.`;

  return {
    active,
    proof,
    score,
    badge,
    summary,
    packages,
    gates,
    recommendedPackage,
    readyGateCount
  };
}

function getSupplierCommitmentPackages(active, proof) {
  const baseNeed = active.supplyGap || Math.max(3, Math.ceil(active.launchListings * 0.35));
  const starter = Math.max(3, Math.min(8, baseNeed));
  const anchor = Math.max(starter + 2, Math.min(16, active.launchListings));
  const annual = Math.max(anchor, Math.min(24, active.launchListings + Math.ceil(active.demandCount / 2)));

  return [
    getCommitmentPackage(
      "starter",
      "Starter proof package",
      starter,
      `Start with the machines that match current ${active.region} buyer demand and clear the minimum proof gates.`,
      proof.score >= 62,
      proof.score
    ),
    getCommitmentPackage(
      "anchor",
      "Market anchor package",
      anchor,
      `Own the visible ${active.category.toLowerCase()} lane with enough active listings to make the page feel real.`,
      proof.score >= 76,
      proof.score + 6
    ),
    getCommitmentPackage(
      "annual",
      "Annual visibility package",
      annual,
      "Convert the supplier into an annual listing account after proof, availability, and direct enquiry routing are clear.",
      proof.score >= 84,
      proof.score + 10
    )
  ];
}

function getCommitmentPackage(id, label, listings, detail, recommended, closeScore) {
  const annualRevenue = listings * 99;
  const monthlyRevenue = listings * 9;
  const statusClass = recommended ? "ready" : closeScore >= 70 ? "review" : "gap";
  return {
    id,
    label,
    listings,
    detail,
    recommended,
    monthlyRevenue,
    annualRevenue,
    closeScore: Math.max(0, Math.min(100, Math.round(closeScore))),
    statusClass,
    status: recommended ? "Recommend" : statusClass === "review" ? "Option" : "Later"
  };
}

function getSupplierCommitmentGates(active, proof, recommendedPackage) {
  const proofReady = active.proof.length >= 3;
  const demandReady = active.demandCount >= 3;
  const roiReady = recommendedPackage.annualRevenue >= 300;
  const availabilityReady = proof.evidence.some((item) => item.label.includes("Supply") && item.statusClass !== "gap");

  return [
    {
      label: "Package accepted",
      detail: `${recommendedPackage.label}: ${recommendedPackage.listings} active listing${recommendedPackage.listings === 1 ? "" : "s"} at USD ${recommendedPackage.monthlyRevenue.toLocaleString()}/month or USD ${recommendedPackage.annualRevenue.toLocaleString()}/year.`,
      owner: "Revenue",
      status: roiReady ? "Ready" : "Review",
      statusClass: roiReady ? "ready" : "review"
    },
    {
      label: "Demand proof attached",
      detail: `${active.demandCount} buyer signal${active.demandCount === 1 ? "" : "s"} and ${active.urgencyHits} urgent signal${active.urgencyHits === 1 ? "" : "s"} support the close.`,
      owner: "Growth",
      status: demandReady ? "Ready" : "Collect",
      statusClass: demandReady ? "ready" : "review"
    },
    {
      label: "Verification proof ready",
      detail: `Attach ${active.proof.slice(0, 3).join(", ").toLowerCase()} before using verified supplier language.`,
      owner: "Trust",
      status: proofReady ? "Ready" : "Gap",
      statusClass: proofReady ? "ready" : "gap"
    },
    {
      label: "Availability lane clear",
      detail: "Each listing needs available now, available soon, or call-to-confirm status before go-live.",
      owner: "Success",
      status: availabilityReady ? "Ready" : "Review",
      statusClass: availabilityReady ? "ready" : "review"
    },
    {
      label: "Direct enquiry route set",
      detail: "Phone, WhatsApp, email, or web route must send the renter directly to the supplier in phase one.",
      owner: "Founder",
      status: "Ready",
      statusClass: "ready"
    }
  ];
}

function renderListingActivationRoom() {
  const queueRoot = document.querySelector("#listingActivationQueue");
  if (!queueRoot) return;

  const model = getListingActivationModel();
  if (!model.active) return;

  setText("#listingActivationTitle", `${model.active.region} ${model.active.category} activation`);
  setText("#listingActivationBadge", model.badge);

  document.querySelector("#listingActivationScore").innerHTML = `
    <strong>${model.activationScore}/100</strong>
    <span>${escapeHtml(model.summary)}</span>
  `;

  document.querySelector("#listingActivationMetrics").innerHTML = [
    ["Listing package", `${model.recommendedPackage.listings} machines`],
    ["First invoice", `USD ${model.recommendedPackage.monthlyRevenue.toLocaleString()}/mo`],
    ["Annual value", `USD ${model.recommendedPackage.annualRevenue.toLocaleString()}`],
    ["Launch gates", `${model.readyGateCount}/${model.gates.length} ready`]
  ].map(([label, value]) => `
    <span><strong>${escapeHtml(value)}</strong>${escapeHtml(label)}</span>
  `).join("");

  queueRoot.innerHTML = model.queue.map((item, index) => `
    <div class="listing-activation-item ${item.statusClass}">
      <strong>${index + 1}</strong>
      <span>
        ${escapeHtml(item.label)}
        <small>${escapeHtml(item.detail)}</small>
      </span>
      <em>${escapeHtml(item.owner)}</em>
      <b>${escapeHtml(item.status)}</b>
    </div>
  `).join("");

  document.querySelector("#listingActivationGates").innerHTML = model.gates.map((gate, index) => `
    <div class="listing-activation-gate ${gate.statusClass}">
      <strong>${index + 1}</strong>
      <span>
        ${escapeHtml(gate.label)}
        <small>${escapeHtml(gate.detail)}</small>
      </span>
      <em>${escapeHtml(gate.owner)}</em>
      <b>${escapeHtml(gate.status)}</b>
    </div>
  `).join("");

  document.querySelector("#listingActivationPacket").innerHTML = buildListingActivationText(model)
    .split("\n")
    .filter(Boolean)
    .map((line) => `<p>${escapeHtml(line)}</p>`)
    .join("");
}

function getListingActivationModel() {
  const commitment = getSupplierCommitmentModel();
  const active = commitment.active;
  if (!active) {
    return {
      active: null,
      commitment,
      activationScore: 0,
      badge: "Prep first",
      summary: "",
      queue: [],
      gates: [],
      recommendedPackage: null,
      readyQueueCount: 0,
      readyGateCount: 0
    };
  }

  const recommendedPackage = commitment.recommendedPackage;
  const queue = getListingActivationQueue(active, commitment);
  const gates = getListingActivationGates(active, commitment, queue);
  const readyQueueCount = queue.filter((item) => item.statusClass === "ready").length;
  const readyGateCount = gates.filter((gate) => gate.statusClass === "ready").length;
  const activationScore = Math.max(0, Math.min(100, Math.round(commitment.score * 0.5 + readyQueueCount * 7 + readyGateCount * 6)));
  const badge = activationScore >= 84 ? "Ready to publish" : activationScore >= 68 ? "Activation sprint" : "Prep first";
  const summary = activationScore >= 84
    ? `${active.region} ${active.category} can move from commitment to live paid listings now.`
    : activationScore >= 68
      ? `${active.region} ${active.category} has enough momentum for a focused activation sprint.`
      : `${active.region} ${active.category} needs billing, proof, and availability tightened before go-live.`;

  return {
    active,
    commitment,
    activationScore,
    badge,
    summary,
    queue,
    gates,
    recommendedPackage,
    readyQueueCount,
    readyGateCount
  };
}

function getListingActivationQueue(active, commitment) {
  const recommendedPackage = commitment.recommendedPackage;
  const proofGate = commitment.gates.find((gate) => gate.label.includes("Verification")) || commitment.gates[2];
  const availabilityGate = commitment.gates.find((gate) => gate.label.includes("Availability")) || commitment.gates[3];
  const hasEnoughVisibleSupply = active.visibleSupply >= recommendedPackage.listings;
  const launchReady = commitment.score >= 68 && commitment.readyGateCount >= 3;

  return [
    {
      label: "Create paid listing shells",
      detail: `${recommendedPackage.label}: ${recommendedPackage.listings} active listing${recommendedPackage.listings === 1 ? "" : "s"} at USD ${recommendedPackage.monthlyRevenue.toLocaleString()}/month or USD ${recommendedPackage.annualRevenue.toLocaleString()}/year.`,
      owner: "Revenue",
      status: "Ready",
      statusClass: "ready"
    },
    {
      label: "Attach photos and specs",
      detail: hasEnoughVisibleSupply
        ? `${active.visibleSupply} visible listing${active.visibleSupply === 1 ? "" : "s"} can seed the supplier storefront.`
        : `Collect clean photos, model specs, and simple rate notes for ${recommendedPackage.listings} machine${recommendedPackage.listings === 1 ? "" : "s"}.`,
      owner: "Supplier",
      status: hasEnoughVisibleSupply ? "Ready" : "Review",
      statusClass: hasEnoughVisibleSupply ? "ready" : "review"
    },
    {
      label: "Link verification proof",
      detail: proofGate.detail,
      owner: "Trust",
      status: proofGate.status,
      statusClass: proofGate.statusClass
    },
    {
      label: "Set availability and lead route",
      detail: `${availabilityGate.detail} Direct enquiry routes stay with the supplier in phase one.`,
      owner: "Success",
      status: availabilityGate.statusClass === "ready" ? "Ready" : "Review",
      statusClass: availabilityGate.statusClass === "gap" ? "review" : availabilityGate.statusClass
    },
    {
      label: "Publish market page",
      detail: `${active.region} ${active.category.toLowerCase()} page opens with verified inventory, proof notes, and no rental payment collection.`,
      owner: "Founder",
      status: launchReady ? "Publish" : "Sprint",
      statusClass: launchReady ? "ready" : "review"
    }
  ];
}

function getListingActivationGates(active, commitment, queue) {
  const recommendedPackage = commitment.recommendedPackage;
  const proofGate = commitment.gates.find((gate) => gate.label.includes("Verification")) || commitment.gates[2];
  const availabilityGate = commitment.gates.find((gate) => gate.label.includes("Availability")) || commitment.gates[3];
  const billingMode = recommendedPackage.id === "annual" || commitment.score >= 84 ? "Annual" : "Monthly";
  const readyQueueCount = queue.filter((item) => item.statusClass === "ready").length;
  const launchReady = readyQueueCount >= 3 && commitment.readyGateCount >= 3;

  return [
    {
      label: "Billing plan selected",
      detail: `${billingMode} listing plan for ${recommendedPackage.listings} machine${recommendedPackage.listings === 1 ? "" : "s"}: USD ${recommendedPackage.monthlyRevenue.toLocaleString()}/month or USD ${recommendedPackage.annualRevenue.toLocaleString()}/year.`,
      owner: "Revenue",
      status: "Ready",
      statusClass: "ready"
    },
    {
      label: "Proof gate",
      detail: proofGate.detail,
      owner: "Trust",
      status: proofGate.status,
      statusClass: proofGate.statusClass
    },
    {
      label: "Availability gate",
      detail: availabilityGate.detail,
      owner: "Success",
      status: availabilityGate.status,
      statusClass: availabilityGate.statusClass === "gap" ? "review" : availabilityGate.statusClass
    },
    {
      label: "Direct enquiry route",
      detail: "Phone, WhatsApp, email, or web enquiry path is visible before the page is promoted.",
      owner: "Supplier",
      status: "Ready",
      statusClass: "ready"
    },
    {
      label: "Launch review",
      detail: `${active.region} ${active.category} can publish when at least three activation queue items and three commitment gates are ready.`,
      owner: "Founder",
      status: launchReady ? "Ready" : "Sprint",
      statusClass: launchReady ? "ready" : "review"
    }
  ];
}

function renderTrustRevenueLedger() {
  const rowRoot = document.querySelector("#trustLedgerRows");
  if (!rowRoot) return;

  const model = getTrustRevenueLedgerModel();
  if (!model.active) return;

  setText("#trustLedgerTitle", `${model.marketLabel} ledger`);
  setText("#trustLedgerBadge", model.badge);

  document.querySelector("#trustLedgerScore").innerHTML = `
    <strong>${model.score}/100</strong>
    <span>${escapeHtml(model.summary)}</span>
  `;

  document.querySelector("#trustLedgerMetrics").innerHTML = [
    ["Active listing ARR", `USD ${model.activeListingArr.toLocaleString()}`],
    ["Next package ARR", `USD ${model.nextPackageArr.toLocaleString()}`],
    ["Lead pipeline", `USD ${model.directPipeline.toLocaleString()}`],
    ["Trust debt", `${model.trustDebt} gap${model.trustDebt === 1 ? "" : "s"}`]
  ].map(([label, value]) => `
    <span><strong>${escapeHtml(value)}</strong>${escapeHtml(label)}</span>
  `).join("");

  rowRoot.innerHTML = model.rows.map((row, index) => `
    <div class="trust-ledger-row ${row.statusClass}">
      <strong>${index + 1}</strong>
      <span>
        ${escapeHtml(row.label)}
        <small>${escapeHtml(row.detail)}</small>
      </span>
      <em>${escapeHtml(row.value)}</em>
      <b>${escapeHtml(row.status)}</b>
    </div>
  `).join("");

  document.querySelector("#trustLedgerControls").innerHTML = model.controls.map((control, index) => `
    <div class="trust-ledger-control ${control.statusClass}">
      <strong>${index + 1}</strong>
      <span>
        ${escapeHtml(control.label)}
        <small>${escapeHtml(control.detail)}</small>
      </span>
      <em>${escapeHtml(control.owner)}</em>
      <b>${escapeHtml(control.status)}</b>
    </div>
  `).join("");

  document.querySelector("#trustLedgerPacket").innerHTML = buildTrustLedgerText(model)
    .split("\n")
    .filter(Boolean)
    .map((line) => `<p>${escapeHtml(line)}</p>`)
    .join("");
}

function getTrustRevenueLedgerModel() {
  const activation = getListingActivationModel();
  const flywheel = getLiquidityFlywheelModel();
  const success = getSupplierSuccessModel();
  const market = flywheel.active || activation.active || getActiveMarketOpportunity();
  const active = activation.active || market;
  if (!active) {
    return {
      active: null,
      marketLabel: "Market",
      score: 0,
      badge: "Listen first",
      summary: "",
      rows: [],
      controls: [],
      activeListingArr: 0,
      nextPackageArr: 0,
      directPipeline: 0,
      trustDebt: 0
    };
  }

  const marketLabel = getTrustLedgerMarketLabel(market);
  const activeListingArr = success.rows.reduce((total, row) => total + row.health.revenueDesk.annualRevenue, 0);
  const directPipeline = success.rows.reduce((total, row) => total + row.health.leadDesk.totalBudget, 0);
  const trustDebt = success.proofGapCount + Number(market?.proofGap || 0);
  const nextPackageArr = activation.recommendedPackage?.annualRevenue || active.annualRevenue || 0;
  const renewalRiskArr = success.renewalRiskCount * 99;
  const rows = getTrustLedgerRows({ activation, flywheel, success, market, marketLabel, activeListingArr, directPipeline, trustDebt, nextPackageArr, renewalRiskArr });
  const controls = getTrustLedgerControls({ activation, flywheel, success, market, trustDebt, renewalRiskArr });
  const readyControls = controls.filter((control) => control.statusClass === "ready").length;
  const score = Math.max(0, Math.min(100, Math.round(
    (flywheel.score || 0) * 0.28
    + (activation.activationScore || 0) * 0.28
    + success.averageHealth * 0.24
    + readyControls * 4
    + Math.min(12, activeListingArr / 1200)
    - Math.min(10, trustDebt * 1.5)
  )));
  const badge = score >= 84 && trustDebt <= 2 ? "Scale-ready" : score >= 70 ? "Protect growth" : "Fix trust debt";
  const summary = badge === "Scale-ready"
    ? `${marketLabel} has enough listing revenue, proof, and response quality to scale carefully.`
    : badge === "Protect growth"
      ? `${marketLabel} is monetizing, but trust or renewal debt should be cleared before heavier growth.`
      : `${marketLabel} needs proof, renewal, or response fixes before Heavyster pushes more buyer demand.`;

  return {
    active,
    activation,
    flywheel,
    success,
    market,
    marketLabel,
    score,
    badge,
    summary,
    rows,
    controls,
    readyControls,
    activeListingArr,
    nextPackageArr,
    directPipeline,
    trustDebt,
    renewalRiskArr
  };
}

function getTrustLedgerRows(context) {
  const { activation, flywheel, success, marketLabel, activeListingArr, directPipeline, trustDebt, nextPackageArr, renewalRiskArr } = context;
  return [
    {
      label: "Active listing revenue",
      detail: `${success.rows.length} supplier account${success.rows.length === 1 ? "" : "s"} currently model paid listing ARR without touching rental payments.`,
      value: `USD ${activeListingArr.toLocaleString()}`,
      status: activeListingArr >= 3000 ? "Strong" : activeListingArr >= 1000 ? "Building" : "Seed",
      statusClass: activeListingArr >= 3000 ? "ready" : activeListingArr >= 1000 ? "review" : "gap"
    },
    {
      label: "Next paid package",
      detail: `${marketLabel} can move through activation with ${activation.recommendedPackage?.listings || 0} paid listing${activation.recommendedPackage?.listings === 1 ? "" : "s"}.`,
      value: `USD ${nextPackageArr.toLocaleString()}`,
      status: activation.activationScore >= 84 ? "Publish" : activation.activationScore >= 68 ? "Sprint" : "Prep",
      statusClass: activation.activationScore >= 84 ? "ready" : activation.activationScore >= 68 ? "review" : "gap"
    },
    {
      label: "Direct enquiry pipeline",
      detail: `${success.hotLeadCount} hot lead${success.hotLeadCount === 1 ? "" : "s"} show buyer intent while customer payment stays direct to suppliers.`,
      value: `USD ${directPipeline.toLocaleString()}`,
      status: success.hotLeadCount ? "Live" : "Quiet",
      statusClass: success.hotLeadCount ? "ready" : "review"
    },
    {
      label: "Trust debt",
      detail: "Proof gaps, expiring documents, and verified-supply weakness reduce how hard Heavyster should push traffic.",
      value: `${trustDebt} gap${trustDebt === 1 ? "" : "s"}`,
      status: trustDebt <= 2 ? "Controlled" : trustDebt <= 6 ? "Review" : "Blocker",
      statusClass: trustDebt <= 2 ? "ready" : trustDebt <= 6 ? "review" : "gap"
    },
    {
      label: "Renewal exposure",
      detail: `${success.renewalRiskCount} paid listing${success.renewalRiskCount === 1 ? "" : "s"} at renewal risk should be saved before selling more inventory.`,
      value: `USD ${renewalRiskArr.toLocaleString()}`,
      status: success.renewalRiskCount ? "Save" : "Clean",
      statusClass: success.renewalRiskCount ? "review" : "ready"
    },
    {
      label: "Compounding signal",
      detail: flywheel.bottleneck ? `${flywheel.bottleneck.label} is the current bottleneck in the marketplace loop.` : "Flywheel signal is still forming.",
      value: `${flywheel.score || 0}/100`,
      status: flywheel.score >= 84 ? "Compound" : flywheel.score >= 70 ? "Turn" : "Push",
      statusClass: flywheel.score >= 84 ? "ready" : flywheel.score >= 70 ? "review" : "gap"
    }
  ];
}

function getTrustLedgerControls(context) {
  const { activation, flywheel, success, market, trustDebt, renewalRiskArr } = context;
  const listingReady = activation.activationScore >= 84;
  const trustReady = trustDebt <= 2;
  const renewalReady = success.renewalRiskCount === 0;
  const responseReady = success.hotLeadCount > 0 && success.averageHealth >= 72;
  const scaleReady = listingReady && trustReady && renewalReady && flywheel.score >= 70;

  return [
    {
      label: "Scale gate",
      detail: scaleReady ? "Market can accept more buyer traffic without overpromising trust." : "Hold aggressive growth until activation, trust, renewal, and flywheel gates improve.",
      owner: "Founder",
      status: scaleReady ? "Ready" : "Hold",
      statusClass: scaleReady ? "ready" : "review"
    },
    {
      label: "Trust gate",
      detail: trustReady ? "Proof debt is controlled enough for verified marketplace language." : `${trustDebt} trust gap${trustDebt === 1 ? "" : "s"} should be cleared before scaling category traffic.`,
      owner: "Trust",
      status: trustReady ? "Ready" : "Fix",
      statusClass: trustReady ? "ready" : "gap"
    },
    {
      label: "Revenue gate",
      detail: renewalReady ? "No modeled renewal leakage is blocking new listing sales." : `Protect USD ${renewalRiskArr.toLocaleString()} modeled renewal exposure before pushing expansion.`,
      owner: "Revenue",
      status: renewalReady ? "Ready" : "Save",
      statusClass: renewalReady ? "ready" : "review"
    },
    {
      label: "Response gate",
      detail: responseReady ? "Supplier response and lead quality are good enough for direct routing." : "Supplier response proof should improve before Heavyster promises faster buyer outcomes.",
      owner: "Success",
      status: responseReady ? "Ready" : "Watch",
      statusClass: responseReady ? "ready" : "review"
    },
    {
      label: "No-commission gate",
      detail: "Phase one remains clean: listing SaaS revenue first, rental payment direct, booking fee only after workflow proof.",
      owner: "Founder",
      status: "Locked",
      statusClass: "ready"
    },
    {
      label: "Market proof gate",
      detail: market?.demandCount ? `${market.demandCount} demand signal${market.demandCount === 1 ? "" : "s"} support this ledger.` : "Keep capturing demand until the market ledger has enough buyer language.",
      owner: "Growth",
      status: market?.demandCount >= 3 ? "Ready" : "Collect",
      statusClass: market?.demandCount >= 3 ? "ready" : "review"
    }
  ];
}

function getTrustLedgerMarketLabel(market) {
  if (!market) return "Selected market";
  return market.title || `${market.region} ${market.category}`;
}


function renderPricingCalculator() {
  const monthly = state.listingCount * 9;
  const annual = state.listingCount * 99;
  setText("#listingCountOutput", String(state.listingCount));
  setText("#monthlyRevenueOutput", `USD ${monthly.toLocaleString()}`);
  setText("#annualRevenueOutput", `USD ${annual.toLocaleString()}`);
  document.querySelector("#listingCount").value = String(state.listingCount);
}

function renderCommissionCalculator() {
  const grossBookingValue = state.bookingValue * state.confirmedBookings;
  const successFee = Math.round(grossBookingValue * 0.01);
  const supplierKeeps = grossBookingValue - successFee;
  setText("#bookingValueOutput", `USD ${state.bookingValue.toLocaleString()}`);
  setText("#bookingFeeOutput", `USD ${successFee.toLocaleString()}`);
  setText("#supplierKeepOutput", `USD ${supplierKeeps.toLocaleString()}`);
  document.querySelector("#bookingValue").value = String(state.bookingValue);
  document.querySelector("#confirmedBookings").value = String(state.confirmedBookings);
}

function buildLeadText() {
  const model = getDirectEnquiryModel();
  const route = getSupplierResponseRouteModel();
  const tracker = getResponseTrackerModel();
  const listing = model.listing;
  return [
    "Heavyster direct rental enquiry",
    `Subject: ${model.subject}`,
    `Readiness: ${model.score}/100 - ${model.status}`,
    `Equipment: ${listing.name}`,
    `Supplier: ${listing.supplier}`,
    `Location: ${listing.city}, ${listing.region}`,
    `Availability: ${listing.availability}`,
    `Buyer fit: ${model.fit.score}/100 - ${model.fit.status}`,
    `Trust: ${model.passport.score}/100 - ${model.passport.verdict}`,
    `Quote clarity: ${model.quote.score}/100 - ${model.quote.badge}`,
    `Response route: ${route.primaryChannel} first, backup ${route.backupChannel}, follow up after ${route.followUp}`,
    `Supplier response target: ${route.responseTarget}`,
    `Tracker: ${tracker.statusLabel} - ${tracker.summary}`,
    `Documents: ${listing.documents.join(", ")}`,
    `Project note: ${state.projectNote || "No note provided"}`,
    "",
    "Message:",
    ...model.message,
    "",
    "Payment: customer and rental company arrange directly"
  ].join("\n");
}

function buildReplyClarifierText(model = getReplyClarifierModel()) {
  const listing = model.listing;
  const supplier = listing.supplier;
  const missingQuestions = {
    "Availability": `- Confirm current availability for ${listing.name} in ${listing.city}, ${listing.region}.`,
    "Rate terms": "- Confirm rental rate, billing period, inclusions, exclusions, mobilization, fuel, permit, overtime, and standby terms.",
    "Operator": "- Confirm whether operator, crew, supervisor, or banksman support is included, optional, or not available.",
    "Documents": "- Share current license, insurance, inspection, load test, operator certificate, or permit proof where relevant.",
    "Validity": "- Confirm how long the quote and availability can be held.",
    "Direct payment": "- Confirm the best direct payment and contact route between renter and supplier."
  };

  if (model.mode === "chase") {
    return [
      `Hello ${supplier},`,
      `Following up on the enquiry for ${listing.name} (${listing.id}) in ${listing.city}, ${listing.region}.`,
      "Please confirm availability, rate terms, operator or crew option, relevant documents, quote validity, and best direct contact route.",
      "Heavyster is only routing the enquiry. The rental payment stays directly between renter and supplier.",
      "Once confirmed, the buyer can move to RFQ, quote check, award, or mobilization with less back-and-forth."
    ].join("\n");
  }

  if (model.mode === "handoff") {
    return [
      `Hello ${supplier},`,
      `Thank you for confirming the reply details for ${listing.name} (${listing.id}).`,
      "The buyer now has enough availability, commercial, proof, validity, and direct-payment clarity to continue the decision workflow.",
      "Next step: keep the direct contact route open and be ready for RFQ, quote guard, award, or mobilization questions.",
      "Heavyster will keep the rental payment direct between renter and supplier."
    ].join("\n");
  }

  return [
    `Hello ${supplier},`,
    `Thank you for the reply on ${listing.name} (${listing.id}). Before the buyer moves toward award or dispatch, please confirm:`,
    ...model.missingLabels.map((label) => missingQuestions[label] || `- Confirm ${label.toLowerCase()}.`),
    "Once these points are clear, the buyer can compare the quote with confidence and continue directly with your team.",
    "Heavyster is not collecting rental payment in phase one; this is only to make the direct enquiry cleaner."
  ].join("\n");
}

function buildDecisionReceiptText(model = getDecisionReceiptModel()) {
  return [
    "Heavyster Buyer Decision Receipt",
    `Receipt status: ${model.status} - ${model.score}/100`,
    `Equipment: ${model.listing.name} (${model.listing.id})`,
    `Supplier: ${model.listing.supplier}`,
    `Location: ${model.listing.city}, ${model.listing.region}`,
    `Buyer fit: ${model.fit.score}/100 - ${model.fit.status}`,
    `Trust Passport: ${model.passport.score}/100 - ${model.passport.verdict}`,
    `Reply quality: ${model.quality.score}/100 - ${model.quality.status}`,
    `Quote Guard: ${model.quote.score}/100, ${model.quote.missingCount} unclear term${model.quote.missingCount === 1 ? "" : "s"}`,
    `Response route: ${model.route.primaryChannel} first, backup ${model.route.backupChannel}`,
    `Payment rule: ${model.paymentRule}`,
    "Decision evidence:",
    ...model.evidence.map((item) => `- ${item.ready ? "Ready" : "Watch"}: ${item.label} - ${item.detail}`),
    "Open risks:",
    ...(model.risks.length ? model.risks.map((risk) => `- ${risk}`) : ["- No major decision risks in this prototype receipt."]),
    "Next move:",
    `${model.nextAction}: ${model.nextDetail}`
  ].join("\n");
}

function buildDecisionRouterText(model = getDecisionRouterModel()) {
  return [
    "Heavyster Decision Action Router",
    `Router status: ${model.title}`,
    `Destination: ${model.destination}`,
    `Receipt: ${model.receipt.status} - ${model.receipt.score}/100`,
    `Equipment: ${model.receipt.listing.name} (${model.receipt.listing.id})`,
    `Supplier: ${model.receipt.listing.supplier}`,
    `Open risks: ${model.receipt.risks.length ? model.receipt.risks.join(", ") : "none"}`,
    "Recommended moves:",
    ...model.routes.map((route, index) => `${index + 1}. ${route.label} - ${route.detail}`),
    `Payment rule: ${model.receipt.paymentRule}`
  ].join("\n");
}

function buildListingRoiProofText(model = getListingRoiProofModel()) {
  return [
    "Heavyster Listing ROI Proof",
    `Proof status: ${model.status} - ${model.score}/100`,
    `Supplier: ${model.listing.supplier}`,
    `Equipment: ${model.listing.name} (${model.listing.id})`,
    `Location: ${model.listing.city}, ${model.listing.region}`,
    `Modeled listing ARR: USD ${model.listingAnnualValue.toLocaleString()} per active machine`,
    `Modeled lead value: USD ${model.leadBudget.toLocaleString()}`,
    `Buyer receipt: ${model.receipt.status} - ${model.receipt.score}/100`,
    `Decision route: ${model.router.title}, destination ${model.router.destination}`,
    `Response tracker: ${model.tracker.statusLabel}`,
    `Supplier lead score: ${model.activeLead.score}/100`,
    `Revenue Desk: ${model.revenue.badge} - ${model.revenue.score}/100`,
    "Renewal evidence:",
    ...model.evidence.map((item) => `- ${item.ready ? "Ready" : "Watch"}: ${item.label} - ${item.detail}`),
    "Next supplier conversation:",
    model.nextAction,
    "Phase one rule: supplier pays for active listings; buyer pays the rental company directly; Heavyster does not collect rental payment."
  ].join("\n");
}

function buildSupplierRenewalCloseText(model = getSupplierRenewalClosePackModel()) {
  return [
    "Heavyster Supplier Renewal Close Pack",
    `Close status: ${model.status} - ${model.score}/100`,
    `Supplier: ${model.listing.supplier}`,
    `Equipment: ${model.listing.name} (${model.listing.id})`,
    `Close type: ${model.closeType}`,
    `Close value: USD ${model.closeValue.toLocaleString()} (${model.valueLabel})`,
    `Paid listings: ${model.revenue.paidListings}`,
    `Current listing ARR: USD ${model.revenue.annualRevenue.toLocaleString()}`,
    `ROI proof: ${model.roi.status} - ${model.roi.score}/100`,
    `Lead value: USD ${model.roi.leadBudget.toLocaleString()}`,
    `Offer: ${model.offerTitle}`,
    model.offerDetail,
    "Proof to mention:",
    ...model.proof.map((item) => `- ${item.ready ? "Ready" : "Watch"}: ${item.label} - ${item.detail}`),
    "Supplier ask:",
    model.closeType === "annual upgrade"
      ? `Move ${model.closeListings} active listing${model.closeListings === 1 ? "" : "s"} to the annual USD 99 plan.`
      : model.closeType === "renewal save"
        ? "Keep the active listing package live so buyer visibility and direct enquiries continue."
        : model.closeType === "proof close"
          ? "Approve the annual listing commitment now that buyer proof is visible."
          : "Let us close the remaining proof gaps, then revisit the annual listing plan.",
    "Phase one rule: Heavyster charges only for active listings. Buyer and rental company handle rental payment directly."
  ].join("\n");
}

function buildBuyerWorkbenchText(model = getBuyerWorkbenchModel()) {
  return [
    "Heavyster Buyer Workbench",
    `Buyer desk status: ${model.badge} - ${model.score}/100`,
    `Selected machine: ${model.selected.name}`,
    `Supplier: ${model.selected.supplier}`,
    `Location: ${model.selected.city}, ${model.selected.region}`,
    `Project note: ${state.projectNote || "No project note provided"}`,
    `Next best move: ${model.nextStage.label} - ${model.nextStage.action}`,
    "Decision path:",
    ...model.stages.map((stage) => `- ${stage.status}: ${stage.label}, ${stage.score}/100. ${stage.detail}`),
    "Control brief:",
    ...model.packet.map((item) => `- ${item.label}: ${item.value}`),
    "Operating rule: keep the buyer-supplier rental payment direct in phase one. Heavyster supports search, proof, RFQ, award, quote clarity, and mobilization control."
  ].join("\n");
}

function buildTrustPassportText() {
  const listing = getSelectedListing();
  const passport = getTrustPassport(listing);
  return [
    "Heavyster Trust Passport",
    `Equipment: ${listing.name}`,
    `Supplier: ${listing.supplier}`,
    `Location: ${listing.city}, ${listing.region}`,
    `Readiness: ${passport.score}/100 - ${passport.verdict}`,
    `Documents: ${listing.documents.join(", ")}`,
    `Proof stack: ${passport.proofItems.map((item) => `${item.label}: ${item.ready ? "ready" : "needed"}`).join("; ")}`,
    `Risk radar: ${passport.risks.map((risk) => `${risk.label}: ${risk.detail}`).join(" | ")}`,
    `Next actions: ${passport.actions.join(" | ")}`,
    "Payment: buyer and rental company arrange directly in phase one"
  ].join("\n");
}

function buildRfqText() {
  const rfq = getRfqModel();
  return [
    "Heavyster RFQ Command Room",
    `RFQ status: ${rfq.badge}`,
    `Project note: ${state.projectNote || "No project note provided"}`,
    `Shortlisted machines: ${rfq.listings.map((listing) => listing.name).join(", ")}`,
    `Average readiness: ${rfq.averageScore}/100`,
    `Verified suppliers: ${rfq.verifiedCount}/${rfq.listings.length}`,
    `Available now: ${rfq.availableCount}/${rfq.listings.length}`,
    "Supplier routing:",
    ...rfq.routes.map((route) => `- ${route.listing.supplier}: ${route.listing.name}, ${route.listing.city}, ${route.listing.region}, Trust Passport ${route.score}/100`),
    "Quote request:",
    "Please confirm availability, rental rate, operator option, delivery terms, quote validity, required documents, and best contact route.",
    "Payment: buyer and rental company arrange directly in phase one. Heavyster is only routing the RFQ."
  ].join("\n");
}

function buildAwardMemoText(model = getAwardModel()) {
  const winner = model.winner;
  return [
    "Heavyster Award Intelligence",
    `Decision status: ${model.badge}`,
    `Recommended award: ${winner.listing.supplier} - ${winner.listing.name}`,
    `Location: ${winner.listing.city}, ${winner.listing.region}`,
    `Award score: ${winner.total}/100`,
    `Project note: ${state.projectNote || "No project note provided"}`,
    "Why this supplier:",
    ...winner.reasons.map((reason) => `- ${reason}`),
    "Decision matrix:",
    ...model.candidates.map((candidate) => `- ${candidate.listing.supplier}: ${candidate.listing.name}, ${candidate.total}/100, ${candidate.signal}, action ${candidate.action}`),
    "Award conditions:",
    "- Run Quote Guard before dispatch so operator, transport, fuel, permit, overtime, and validity terms are visible.",
    "- Confirm rental rate, quote validity, operator option, delivery terms, insurance, and document freshness before dispatch.",
    "- Keep rental payment direct between buyer and rental company in phase one.",
    "- Use Heavyster as the listing, Trust Passport, RFQ, and decision-support layer."
  ].join("\n");
}

function buildQuoteGuardText(model = getQuoteGuardModel()) {
  return [
    "Heavyster Quote Guard",
    `Quote status: ${model.badge}`,
    `Supplier: ${model.target.supplier}`,
    `Equipment: ${model.target.name}`,
    `Location: ${model.target.city}, ${model.target.region}`,
    `Quote amount: USD ${model.quoteAmount.toLocaleString()} for ${model.quoteDays} day${model.quoteDays === 1 ? "" : "s"}`,
    `Daily view: USD ${model.dailyRate.toLocaleString()} - ${model.rateSignal}`,
    `Quote clarity: ${model.score}/100`,
    `Unclear terms: ${model.missingCount}`,
    "Clarification board:",
    ...model.board.map((item) => `- ${item.status}: ${item.label} - ${item.detail} Action: ${item.action}`),
    "Supplier request:",
    "Please send one clean quote that separates machine hire, operator, transport, fuel, permit, overtime, standby, validity, deposit, and cancellation terms.",
    "Payment rule: buyer and rental company arrange payment directly in phase one. Heavyster does not collect rental payment."
  ].join("\n");
}

function buildMobilizationText(model = getMobilizationModel()) {
  return [
    "Heavyster Mobilization Control Tower",
    `Mobilization status: ${model.badge}`,
    `Target supplier: ${model.target.supplier}`,
    `Equipment: ${model.target.name}`,
    `Location: ${model.target.city}, ${model.target.region}`,
    `Mobilization readiness: ${model.score}/100`,
    `Trust Passport: ${model.passport.score}/100 - ${model.passport.verdict}`,
    `Project note: ${state.projectNote || "No project note provided"}`,
    "Dispatch gate checklist:",
    ...model.checks.map((check) => `- ${check.status}: ${check.label} - ${check.detail}`),
    "Buyer-supplier handoff:",
    ...model.handoff.map((line) => `- ${line}`),
    "Phase one payment rule: buyer and rental company arrange payment directly. Heavyster does not collect rental payment."
  ].join("\n");
}

function buildDealTrailText(model = getDealTrailModel()) {
  return [
    "Heavyster Direct Deal Trail",
    `Trail status: ${model.badge} - ${model.score}/100`,
    `Equipment: ${model.award.winner.listing.name}`,
    `Supplier: ${model.award.winner.listing.supplier}`,
    `Location: ${model.award.winner.listing.city}, ${model.award.winner.listing.region}`,
    `Project note: ${state.projectNote || "No project note provided"}`,
    `Award signal: ${model.award.badge} - ${model.award.winner.total}/100`,
    `Quote Guard: ${model.quote.score}/100, ${model.quote.missingCount} unclear term${model.quote.missingCount === 1 ? "" : "s"}`,
    `Supplier response: ${model.activeLead.score}/100 by ${model.activeLead.lead.channel}`,
    `Mobilization: ${model.mobilize.score}/100`,
    `Payment rule: ${model.paymentRule}`,
    `Future success fee: ${model.futureFeeReady ? "eligible to discuss later after workflow proof" : "not active; keep paid listings first"}`,
    "Workflow steps:",
    ...model.steps.map((step) => `- ${step.status}: ${step.label}, ${step.score}/100. ${step.detail} Action: ${step.action}`),
    "Control gates:",
    ...model.gates.map((gate) => `- ${gate.status}: ${gate.label} (${gate.owner}) - ${gate.detail}`)
  ].join("\n");
}

function buildYardUpdateText(model = getYardModel()) {
  return [
    "Heavyster Yard Availability OS",
    `Yard freshness: ${model.score}/100 - ${model.badge}`,
    `Available now: ${model.availableCount}`,
    `Available soon: ${model.soonCount}`,
    `Needs reconfirmation: ${model.reviewCount}`,
    `Demand pressure: ${model.demandCount} saved demand signals`,
    "Supplier refresh queue:",
    ...model.refreshQueue.map((item) => `- ${item}`),
    "Availability board:",
    ...model.rows.map((row) => `- ${row.listing.supplier}: ${row.listing.name}, ${row.availabilityLabel}, ${row.freshnessLabel}, action ${row.action}, freshness ${row.score}/100`),
    "Operating rule: pause or reconfirm stale listings before routing serious enquiries. Buyer payment stays direct with the rental company."
  ].join("\n");
}

function buildSupplierStorefrontText(model = getSupplierStorefrontModel()) {
  return [
    "Heavyster Supplier Fleet Storefront",
    `Supplier: ${model.profile.supplier}`,
    `Public profile: /suppliers/${model.profile.slug}/`,
    `Branch: ${model.profile.branch}`,
    `Service area: ${model.profile.serviceArea}`,
    `Storefront score: ${model.score}/100 - ${model.badge}`,
    `Average Trust Passport: ${model.averagePassport}/100`,
    `Yard freshness: ${model.yardScore}/100`,
    `Response target: ${model.profile.response}`,
    `Supplier since: ${model.profile.since}`,
    "Fleet lanes:",
    ...model.profile.fleet.map((lane) => `- ${lane.label}: ${lane.count} modeled item${lane.count === 1 ? "" : "s"}, ${lane.status}`),
    "Visible marketplace listings:",
    ...model.visibleListings.map((listing) => `- ${listing.name}: ${listing.city}, ${listing.region}, ${listing.availability}, ${listing.documents.join(", ")}`),
    "Services:",
    ...model.profile.services.map((service) => `- ${service}`),
    "Proof stack:",
    ...model.profile.proof.map((proof) => `- ${proof}`),
    "Phase one rule: buyers contact the supplier directly and payment stays between buyer and rental company. Heavyster sells verified listing visibility and supplier storefront tools."
  ].join("\n");
}

function buildSupplierWorkbenchText(model = getSupplierWorkbenchModel()) {
  return [
    "Heavyster Supplier Workbench",
    `Supplier desk status: ${model.badge} - ${model.score}/100`,
    `Supplier: ${model.profile.supplier}`,
    `Branch: ${model.profile.branch}`,
    `Public profile: /suppliers/${model.profile.slug}/`,
    `Current listing ARR: USD ${model.revenueDesk.annualRevenue.toLocaleString()}`,
    `Direct enquiry pipeline: USD ${model.leadDesk.totalBudget.toLocaleString()}`,
    `Import upside: USD ${model.fleetImport.annualRevenue.toLocaleString()} ARR from ${model.fleetImport.readyListings} ready listing${model.fleetImport.readyListings === 1 ? "" : "s"}`,
    `Next best move: ${model.nextStage.label} - ${model.nextStage.action}`,
    "Supplier revenue path:",
    ...model.stages.map((stage) => `- ${stage.status}: ${stage.label}, ${stage.score}/100. ${stage.detail}`),
    "Operating brief:",
    ...model.packet.map((item) => `- ${item.label}: ${item.value}`),
    "Operating rule: supplier keeps the rental relationship and rental payment direct. Heavyster earns phase-one SaaS listing revenue from clean, verified, active inventory."
  ].join("\n");
}

function buildFounderWorkbenchText(model = getFounderWorkbenchModel()) {
  return [
    "Heavyster Founder Workbench",
    `Founder desk status: ${model.badge} - ${model.score}/100`,
    `Market: ${model.marketLabel}`,
    `Demand signals: ${model.market.demandCount}`,
    `Active listing ARR: USD ${model.ledger.activeListingArr.toLocaleString()}`,
    `Direct enquiry pipeline: USD ${model.ledger.directPipeline.toLocaleString()}`,
    `Trust debt: ${model.ledger.trustDebt} gap${model.ledger.trustDebt === 1 ? "" : "s"}`,
    `Current bottleneck: ${model.flywheel.bottleneck?.label || "Collect market proof"}`,
    `Next best move: ${model.nextStage.label} - ${model.nextStage.action}`,
    "Scale path:",
    ...model.stages.map((stage) => `- ${stage.status}: ${stage.label}, ${stage.score}/100. ${stage.detail}`),
    "Founder operating brief:",
    ...model.packet.map((item) => `- ${item.label}: ${item.value}`),
    "Operating rule: scale paid listing revenue only as fast as supply, trust, response, and activation can support. Rental payment stays direct between buyer and rental company in phase one."
  ].join("\n");
}

function buildFounderMorningBriefText(model = getFounderMorningBriefModel()) {
  return [
    "Heavyster Founder Morning Brief",
    `Morning status: ${model.badge} - ${model.score}/100`,
    `Market: ${model.daily.marketLabel}`,
    `First move: ${model.firstMove.label} - ${model.firstMove.detail}`,
    `Guardrail to protect: ${model.firstGuardrail.label} - ${model.firstGuardrail.detail}`,
    `ARR in focus: USD ${model.daily.arrAtStake.toLocaleString()}`,
    `Risk signals: ${model.gapCount + model.reviewCount}`,
    "Overnight signals:",
    ...model.signals.map((signal) => `- ${signal.status}: ${signal.label}, ${signal.value}. ${signal.detail}`),
    "Today script:",
    ...model.script.map((line) => `- ${line.label}: ${line.detail}`),
    "Action lanes:",
    ...model.lanes.map((lane) => `- ${lane.status}: ${lane.label}. ${lane.detail}`),
    "Founder rule:",
    "Move supplier, trust, activation, and market proof forward before opening more traffic. Phase one remains listing SaaS: buyer and rental company keep rental payment direct and Heavyster takes 0% rental commission."
  ].join("\n");
}

function buildFounderDailyMovesText(model = getFounderDailyMovesModel()) {
  return [
    "Heavyster Founder Daily Moves",
    `Daily status: ${model.badge} - ${model.score}/100`,
    `Market: ${model.marketLabel}`,
    `Open moves: ${model.openMoveCount}`,
    `Blocked guardrails: ${model.blockedGuardrails}`,
    `ARR at stake: USD ${model.arrAtStake.toLocaleString()}`,
    "Move queue:",
    ...model.moves.map((move) => `- ${move.status}: ${move.label}. Owner ${move.owner}, due ${move.due}, priority ${move.priority}/100, impact USD ${Number(move.impact || 0).toLocaleString()}. ${move.detail}`),
    "Guardrails:",
    ...model.guardrails.map((guardrail) => `- ${guardrail.status}: ${guardrail.label} (${guardrail.owner}) - ${guardrail.detail}`),
    "Today instruction:",
    `Start with ${model.moves[0].label}. Then protect the 0% payment-take rule while fixing the highest trust, supplier, launch, or activation gap.`,
    "Phase-one rule: Heavyster earns listing SaaS revenue first. Buyer and rental company keep rental payment direct."
  ].join("\n");
}

function buildFounderCallSheetText(model = getFounderCallSheetModel()) {
  return [
    "Heavyster Founder Supplier Call Sheet",
    `Call sheet status: ${model.badge} - ${model.score}/100`,
    `Market: ${model.marketLabel}`,
    `Recommended package: ${model.recommendedPackage.label}, ${model.recommendedPackage.listings} listings, USD ${model.recommendedPackage.monthlyRevenue.toLocaleString()}/month or USD ${model.recommendedPackage.annualRevenue.toLocaleString()}/year`,
    `First call: ${model.cards[0].supplier}`,
    "Supplier call queue:",
    ...model.cards.map((card, index) => `${index + 1}. ${card.status}: ${card.supplier}, value USD ${card.value.toLocaleString()}. ${card.hook} Ask: ${card.ask}`),
    "Close script:",
    ...model.script.map((line) => `- ${line.label}: ${line.detail}`),
    "Proof asks:",
    ...model.proofAsks.map((ask) => `- ${ask.status}: ${ask.label} - ${ask.detail}`),
    "Phase-one rule:",
    "Charge for active listings only. Buyer and rental company keep rental payment direct. Heavyster takes 0% rental commission until a later confirmed-booking workflow is proven."
  ].join("\n");
}

function buildDemoFlightDeckText(model = getDemoFlightDeckModel()) {
  return [
    "Heavyster Demo Flight Deck",
    `Demo status: ${model.badge} - ${model.score}/100`,
    `Current story: ${model.summary}`,
    "Guided scenes:",
    ...model.scenes.map((scene, index) => `${index + 1}. ${scene.role}: ${scene.label} - ${scene.signal} Outcome: ${scene.outcome}`),
    "Talk track:",
    ...model.script.map((line) => `- ${line}`),
    "Close:",
    "Heavyster is a paid-listing SaaS first. It helps buyers find verified rental supply, helps suppliers publish and respond, and helps founders scale markets from demand proof while keeping rental payment direct."
  ].join("\n");
}

function buildBoardroomSnapshotText(model = getBoardroomSnapshotModel()) {
  return [
    "Heavyster Boardroom Snapshot",
    `Market: ${model.marketLabel}`,
    `Status: ${model.badge} - ${model.score}/100`,
    `Summary: ${model.summary}`,
    "Metrics:",
    ...model.metrics.map((metric) => `- ${metric.label}: ${metric.value}`),
    "Founder thesis:",
    ...model.thesis.map((item) => `- ${item.status}: ${item.label}. ${item.detail}`),
    "Diligence gates:",
    ...model.gates.map((gate) => `- ${gate.status}: ${gate.label}. ${gate.detail}`),
    "Next move:",
    model.nextMove,
    "Phase-one rule:",
    "Heavyster earns from active equipment listings first. Buyer and rental company keep rental payment direct; commission stays at 0% until booking workflow proof is earned."
  ].join("\n");
}

function buildPilotPackText(model = getPilotPackModel()) {
  return [
    "Heavyster 30-Day Pilot Pack",
    `Market: ${model.marketLabel}`,
    `Pilot status: ${model.badge} - ${model.score}/100`,
    `Summary: ${model.summary}`,
    `First supplier: ${model.firstSupplier}`,
    `Pilot package: ${model.recommendedPackage.label}, ${model.recommendedPackage.listings} listing${model.recommendedPackage.listings === 1 ? "" : "s"}, USD ${model.recommendedPackage.monthlyRevenue.toLocaleString()}/month or USD ${model.recommendedPackage.annualRevenue.toLocaleString()}/year`,
    "Metrics:",
    ...model.metrics.map((metric) => `- ${metric.label}: ${metric.value}`),
    "30-day sprint:",
    ...model.weeks.map((week) => `- ${week.window}: ${week.status} - ${week.label}. Owner ${week.owner}. ${week.detail}`),
    "Pilot gates:",
    ...model.gates.map((gate) => `- ${gate.status}: ${gate.label}. ${gate.detail}`),
    "Next move:",
    model.nextMove,
    "Phase-one rule:",
    "Keep the pilot as listing SaaS. Buyer and rental company keep rental payment direct; Heavyster takes 0% rental commission."
  ].join("\n");
}

function buildFleetImportText(model = getFleetImportModel()) {
  return [
    "Heavyster Fleet Import Console",
    `Supplier: ${model.profile.supplier}`,
    `Import status: ${model.badge} - ${model.score}/100`,
    `Import rows: ${model.totalRows}`,
    `Modeled machine count: ${model.totalListings}`,
    `Ready paid listings: ${model.readyListings}`,
    `Annual listing ARR if published: USD ${model.annualRevenue.toLocaleString()}`,
    "Import queue:",
    ...model.rows.map((row) => `- ${row.source.equipment}: ${row.source.count} item${row.source.count === 1 ? "" : "s"}, ${row.status}, score ${row.score}/100, action ${row.action}, source ${row.source.source}`),
    "Validation gates:",
    ...model.gates.map((gate) => `- ${gate.status}: ${gate.label} - ${gate.detail}`),
    "Supplier instruction:",
    "Clean photos, documents, availability, rate-term notes, and contact routes before publishing rows as paid listings.",
    "Phase one rule: Heavyster charges for active listings only. Rental payment stays direct between buyer and rental company."
  ].join("\n");
}

function buildProofVaultText(model = getProofVaultModel()) {
  return [
    "Heavyster Proof Vault",
    `Supplier: ${model.profile.supplier}`,
    `Vault status: ${model.badge} - ${model.score}/100`,
    `Buyer-ready proof items: ${model.readyCount}`,
    `Expiring soon: ${model.expiringCount}`,
    `Missing proof items: ${model.missingCount}`,
    "Proof register:",
    ...model.rows.map((row) => `- ${row.status}: ${row.type} for ${row.target}, ${row.expiryLabel}, holder ${row.holder}, action ${row.action}`),
    "Buyer trust gates:",
    ...model.gates.map((gate) => `- ${gate.status}: ${gate.label} - ${gate.detail}`),
    "Supplier instruction:",
    "Refresh expiring documents, upload missing proof, and attach buyer-safe proof to public listings before routing high-value enquiries.",
    "Phase one rule: proof improves listing trust and conversion. Rental payment still stays direct between buyer and rental company."
  ].join("\n");
}

function buildRevenueDeskText(model = getRevenueDeskModel()) {
  return [
    "Heavyster Listing Revenue Desk",
    `Supplier: ${model.profile.supplier}`,
    `Revenue status: ${model.badge} - ${model.score}/100`,
    `Paid listings: ${model.paidListings}`,
    `Pending paused or draft listings: ${model.pendingListings}`,
    `Monthly listing SaaS revenue: USD ${model.monthlyRevenue.toLocaleString()}`,
    `Annualized listing revenue: USD ${model.annualRevenue.toLocaleString()}`,
    `Annual-plan share: ${model.annualShare}%`,
    `Renewal-risk listings: ${model.renewalRiskCount}`,
    "Paid listing queue:",
    ...model.rows.map((row) => `- ${row.status}: ${row.package}, ${row.listings} listing${row.listings === 1 ? "" : "s"}, ${row.planLabel}, USD ${row.monthlyRevenue.toLocaleString()}/mo, USD ${row.annualRevenue.toLocaleString()} ARR, ${row.renewalLabel}, action ${row.action}`),
    "Renewal playbook:",
    ...model.playbook.map((step) => `- ${step.status}: ${step.label} - ${step.detail}`),
    "Supplier instruction:",
    "Renew at-risk paid listings first, move monthly listings to annual where trust is proven, then activate paused or draft inventory only after photos, proof, and availability are clean.",
    "Phase one rule: Heavyster charges for active listings only. Buyer-supplier rental payment stays direct and Heavyster takes 0% rental commission."
  ].join("\n");
}

function buildLeadDeskText(model = getLeadDeskModel()) {
  const item = model.active;
  return [
    "Heavyster Lead Desk",
    `Supplier: ${model.profile.supplier}`,
    `Lead priority: ${item.priority} - ${item.score}/100`,
    `Buyer: ${item.lead.buyer}`,
    `Equipment: ${item.lead.equipment}`,
    `Project: ${item.lead.project}`,
    `Location: ${item.lead.location}`,
    `Start: ${item.lead.start}`,
    `Duration: ${item.lead.duration}`,
    `Budget signal: USD ${item.lead.budget.toLocaleString()} total, about USD ${item.dailyValue.toLocaleString()} per day`,
    `Channel: ${item.lead.channel}, received ${item.ageLabel}`,
    `Buyer note: ${item.lead.note}`,
    "Reply checklist:",
    ...model.playbook.map((step) => `- ${step.status}: ${step.text}`),
    "Suggested supplier reply:",
    `Hi ${item.lead.buyer}, thanks for the ${item.lead.equipment} enquiry for ${item.lead.location}.`,
    `We can confirm availability, operator/crew terms, delivery, documents, and quote validity for ${item.lead.start}.`,
    `Please confirm site access, exact start date, working hours, and whether ${item.lead.terms.join(", ").toLowerCase()} should be included in the quote.`,
    "Payment will be arranged directly between buyer and rental company. Heavyster is only supporting the listing and lead workflow."
  ].join("\n");
}

function buildAccountHealthText(model = getAccountHealthModel()) {
  return [
    "Heavyster Supplier Account Health Radar",
    `Supplier: ${model.profile.supplier}`,
    `Health status: ${model.badge} - ${model.score}/100`,
    `Risk signals: ${model.riskCount}`,
    `Listing ARR: USD ${model.revenueDesk.annualRevenue.toLocaleString()}`,
    `Direct enquiry pipeline: USD ${model.leadDesk.totalBudget.toLocaleString()}`,
    `Expansion ARR visible: USD ${model.expansionArr.toLocaleString()}`,
    "Health signals:",
    ...model.signals.map((signal) => `- ${signal.status}: ${signal.label}, ${signal.score}/100, ${signal.detail}`),
    "Next best actions:",
    ...model.actions.map((action) => `- ${action.status}: ${action.label} - ${action.detail}`),
    "Founder instruction:",
    "Use this account health view before renewal calls. Save renewal-risk listings first, prove lead ROI, clean proof gaps, refresh stale yard data, then pitch annual expansion or more active listings.",
    "Phase one rule: account health is about supplier retention and listing SaaS growth. Rental payment still stays direct between buyer and rental company."
  ].join("\n");
}

function buildSupplierSuccessText(model = getSupplierSuccessModel()) {
  return [
    "Heavyster Supplier Success Daily Queue",
    `Book health: ${model.averageHealth}/100 - ${model.badge}`,
    `Call first: ${model.callFirst.profile.supplier}`,
    `At-risk accounts: ${model.atRiskCount}`,
    `Hot leads to protect ROI: ${model.hotLeadCount}`,
    `Renewal-risk listings: ${model.renewalRiskCount}`,
    `Proof gaps: ${model.proofGapCount}`,
    `Visible expansion ARR: USD ${model.expansionArr.toLocaleString()}`,
    "Priority suppliers:",
    ...model.rows.map((row) => `- ${row.urgency}/100 urgency: ${row.profile.supplier}, health ${row.health.score}/100, action ${row.primaryAction.label}, reason ${row.reason}`),
    "Daily operating rhythm:",
    ...model.rhythm.map((item) => `- ${item.status}: ${item.label} - ${item.detail}`),
    "Founder instruction:",
    "Open the first supplier, execute the save action, prove lead ROI, clean proof or freshness gaps, then move to expansion only after the renewal risk is controlled.",
    "Phase one rule: success work protects listing SaaS revenue and supplier trust. Heavyster still takes 0% rental commission."
  ].join("\n");
}

function buildJobsiteBriefText(model = getJobsiteModel()) {
  return [
    "Heavyster Jobsite Planner",
    `Project package: ${model.blueprint.label}`,
    `Region: ${model.region}`,
    `Start window: ${state.jobsiteUrgency}`,
    `Package readiness: ${model.packageScore}/100 - ${model.badge}`,
    `Project note: ${state.projectNote || "No project note provided"}`,
    `Planner thesis: ${model.blueprint.outcome}`,
    "Recommended machine mix:",
    ...model.matches.map((match) => match.listing
      ? `- ${match.role.role}: ${match.listing.name}, ${match.listing.supplier}, ${match.listing.city}, ${match.listing.region}, Trust Passport ${match.readiness}/100`
      : `- ${match.role.role}: supply gap for ${match.role.target} in ${model.region}`),
    "Supply gaps:",
    ...(model.gaps.length ? model.gaps.map((gap) => `- ${gap.role}: ${gap.message}`) : ["- No visible package gaps in this prototype."]),
    "Next action: send matched machines to shortlist, issue the RFQ, then use Award Intelligence for the final supplier decision.",
    "Payment: buyer and rental company arrange directly in phase one."
  ].join("\n");
}

function buildSupplierHuntText(plan = getHuntPlan(getActiveDemandSignal())) {
  const signal = plan.signal;
  const supplyLabel = plan.visibleSupply === 1 ? "1 matching listing is" : `${plan.visibleSupply} matching listings are`;
  return [
    `Hi, we are opening verified ${plan.category.toLowerCase()} listings for ${signal.region} on Heavyster.`,
    `Buyers are already asking for ${signal.equipment} with ${signal.urgency.toLowerCase()} urgency and ${signal.duration} duration.`,
    `The gap is clear: ${supplyLabel} visible in this prototype, and ${plan.hook}.`,
    `We want to onboard ${plan.starterListings} paid listings from a strong supplier at USD 9 monthly or USD 99 yearly per active listing.`,
    `If your fleet can provide ${plan.proof.join(", ").toLowerCase()}, we can build your supplier page and route direct enquiries to you without touching the rental payment.`
  ].join("\n");
}

function buildMarketBriefText(opportunity = getActiveMarketOpportunity()) {
  return [
    `Page title: ${opportunity.category} equipment rental in ${opportunity.region}`,
    `Slug: /${opportunity.slug}/`,
    `Opening thesis: Heavyster is seeing ${opportunity.demandCount} demand signals for ${opportunity.category.toLowerCase()} equipment in ${opportunity.region}, with only ${opportunity.visibleSupply} matching supply visible in the current marketplace.`,
    `Supplier target: recruit ${opportunity.launchListings} paid listings from ${opportunity.persona.toLowerCase()} for first-year listing ARR of USD ${opportunity.annualRevenue.toLocaleString()}.`,
    `Trust proof: ${opportunity.proof.join(", ")}.`,
    `Founder action: launch the page, invite suppliers, verify documents, then route direct enquiries without touching rental payments.`
  ].join("\n");
}

function buildMarketSignalMatrixText(model = getMarketSignalMatrixModel()) {
  const active = model.activeCell;
  if (!active) return "Heavyster Market Signal Matrix\nNo market signals are ready yet.";

  return [
    "Heavyster Market Signal Matrix",
    `Selected wedge: ${active.region} ${active.category}`,
    `Matrix status: ${active.status} - ${active.score}/100`,
    `Demand: ${active.demandCount} signal${active.demandCount === 1 ? "" : "s"}`,
    `Visible supply: ${active.visibleSupply} listing${active.visibleSupply === 1 ? "" : "s"}`,
    `Verified supply: ${active.verifiedSupply} listing${active.verifiedSupply === 1 ? "" : "s"}`,
    `Supply gap: ${active.supplyGap} listing${active.supplyGap === 1 ? "" : "s"}`,
    `Proof score: ${active.proofScore}/100`,
    `Modeled listing ARR: USD ${active.annualRevenue.toLocaleString()}`,
    `Recommended action: ${active.action}`,
    "Top market moves:",
    ...model.topCells.map((cell, index) => `${index + 1}. ${cell.region} ${cell.category}: ${cell.status}, ${cell.score}/100, ${cell.demandCount} demand, ${cell.visibleSupply} supply, USD ${cell.annualRevenue.toLocaleString()} ARR. ${cell.action}.`),
    "Matrix totals:",
    `- Demand signals: ${model.totalDemand}`,
    `- Live supply: ${model.totalSupply}`,
    `- Verified listings: ${model.totalVerified}`,
    `- Modeled matrix ARR: USD ${model.totalArr.toLocaleString()}`,
    "Operating rule: choose markets from demand, supply, proof, and listing ARR together. Scale paid listings and verified direct enquiries before any rental payment or commission workflow."
  ].join("\n");
}

function buildPageFactoryText(model = getPageFactoryModel()) {
  const active = model.active;
  if (!active) return "Heavyster Market Page Factory\nNo market pages are ready yet.";

  return [
    "Heavyster Market Page Factory",
    `Page title: ${active.title}`,
    `Slug: ${active.slug}`,
    `Status: ${active.status} - ${active.readiness}/100 readiness`,
    `Demand: ${active.demandCount} buyer signal${active.demandCount === 1 ? "" : "s"} and ${active.urgencyHits} urgent hit${active.urgencyHits === 1 ? "" : "s"}`,
    `Supply: ${active.visibleSupply} visible listing${active.visibleSupply === 1 ? "" : "s"}, ${active.verifiedSupply} verified listing${active.verifiedSupply === 1 ? "" : "s"}, ${active.supplierTarget} supplier target${active.supplierTarget === 1 ? "" : "s"}`,
    `Listing ARR target: USD ${active.annualRevenue.toLocaleString()} in phase-one paid listing revenue`,
    `Opening copy: Contractors searching for ${active.category.toLowerCase()} equipment rental in ${active.region} need verified machines, document clarity, availability, and a direct supplier route.`,
    `Trust proof: ${active.proof.join(", ")}.`,
    "Launch gates:",
    ...model.gates.map((gate) => `- ${gate.status}: ${gate.label} - ${gate.detail}`),
    "Founder instruction:",
    "Publish only when demand, live supply, verified proof, supplier target, and listing revenue are good enough to protect buyer trust.",
    "Phase one rule: Heavyster monetizes supplier listing visibility. Buyer and rental company still arrange rental payment directly."
  ].join("\n");
}

function buildLaunchRoomText(model = getLaunchRoomModel()) {
  const active = model.active;
  if (!active) return "Heavyster Market Launch Room\nNo launch sprint is ready yet.";

  return [
    "Heavyster Market Launch Room",
    `Launch page: ${active.title}`,
    `Slug: ${active.slug}`,
    `Sprint status: ${model.badge} - ${model.score}/100`,
    `First-week target: invite ${model.targetSuppliers} suppliers and create USD ${model.firstWeekArr.toLocaleString()} first-week listing ARR capacity`,
    `Demand signal: ${active.demandCount} buyer signal${active.demandCount === 1 ? "" : "s"}, ${active.urgencyHits} urgent hit${active.urgencyHits === 1 ? "" : "s"}`,
    `Supply signal: ${active.visibleSupply} live listing${active.visibleSupply === 1 ? "" : "s"}, ${active.verifiedSupply} verified listing${active.verifiedSupply === 1 ? "" : "s"}, ${active.supplierTarget} listing target${active.supplierTarget === 1 ? "" : "s"}`,
    "Seven-day sprint:",
    ...model.steps.map((step) => `- ${step.day}: ${step.status} - ${step.label}. ${step.detail}`),
    "Supplier strike list:",
    ...model.suppliers.map((supplier) => `- ${supplier.status}: ${supplier.name}, ${supplier.score}/100. ${supplier.reason}`),
    "Founder instruction:",
    "Run the page only as far as trust allows. Publish the shell, recruit anchor suppliers, collect proof, open direct enquiries, and review listing ARR before adding any rental payment workflow.",
    "Phase one rule: Heavyster sells listing visibility and operating tools. Rental payment stays direct between buyer and rental company."
  ].join("\n");
}

function buildMarketTwinText(model = getMarketTwinModel()) {
  const active = model.active;
  if (!active) return "Heavyster Market Twin\nNo market twin is ready yet.";

  return [
    "Heavyster Market Twin",
    `Market: ${active.title}`,
    `Scenario: ${model.scenario.label}`,
    `Twin score: ${model.score}/100 - ${model.badge}`,
    `Modeled paid listings: ${model.totalListings}`,
    `Modeled listing revenue: USD ${model.monthlyRevenue.toLocaleString()}/month, USD ${model.annualArr.toLocaleString()}/year`,
    `Demand coverage: ${model.demandCoverage}% of the launch target`,
    `Trust score: ${model.trustScore}/100`,
    `Lead response score: ${model.responseScore}/100`,
    "Launch verdict:",
    `- Founder move: ${model.verdict.label}, ${model.verdict.score}/100. ${model.verdict.detail}`,
    `- Traffic rule: ${model.verdict.rule}`,
    "Verdict gates:",
    ...model.verdict.controls.map((control) => `- ${control.status}: ${control.label} - ${control.detail}`),
    "Next 72 hours:",
    ...model.verdict.actions.map((action) => `- ${action}`),
    "Risk map:",
    ...model.risks.map((risk) => `- ${risk.status}: ${risk.label}, ${risk.score}/100. ${risk.detail} Action: ${risk.action}`),
    "Founder decision:",
    model.score >= 86
      ? "Run the wedge now: publish, recruit, verify, and convert the first suppliers into annual listing proof."
      : model.score >= 72
        ? "Open the wedge carefully: recruit suppliers and route only the enquiries the proof stack can support."
        : "Hold heavy promotion: build verified supply and proof first, then reopen the market twin.",
    "Phase one rule: the twin models listing SaaS revenue and trust readiness only. Heavyster still does not collect rental payment."
  ].join("\n");
}

function buildLiquidityFlywheelText(model = getLiquidityFlywheelModel()) {
  const active = model.active;
  if (!active) return "Heavyster Liquidity Flywheel\nNo liquidity flywheel is ready yet.";

  return [
    "Heavyster Liquidity Flywheel",
    `Market: ${active.title}`,
    `Flywheel score: ${model.score}/100 - ${model.badge}`,
    `Active scenario: ${model.twin.scenario.label}`,
    `Main bottleneck: ${model.bottleneck.label} - ${model.bottleneck.score}/100`,
    `Strongest loop: ${model.strongest.label} - ${model.strongest.score}/100`,
    `Modeled listing ARR: USD ${model.twin.annualArr.toLocaleString()}`,
    "Loop health:",
    ...model.loops.map((loop) => `- ${loop.status}: ${loop.label}, ${loop.score}/100. ${loop.detail} Action: ${loop.action}`),
    "Founder fixes:",
    ...model.fixes.map((fix) => `- ${fix.status}: ${fix.owner} owns ${fix.label}. ${fix.detail}`),
    "Founder decision:",
    model.score >= 84 && model.bottleneck.score >= 70
      ? "Keep the loop turning: add suppliers, protect proof, measure response, and convert visible ROI into annual listing plans."
      : model.score >= 70
        ? "Push carefully: fix the bottleneck first, then scale supplier invites and page traffic."
        : "Do not force traffic yet: repair the bottleneck and rebuild trust before asking the market to compound.",
    "Phase one rule: liquidity means more verified listings and direct enquiries. Heavyster still earns from listing SaaS and keeps rental payment direct."
  ].join("\n");
}

function buildFounderAutopilotText(model = getFounderAutopilotModel()) {
  const active = model.active;
  if (!active) return "Heavyster Founder Autopilot\nNo founder autopilot is ready yet.";

  return [
    "Heavyster Founder Autopilot",
    `Market: ${active.title}`,
    `Autopilot status: ${model.badge} - ${model.score}/100`,
    `Flywheel bottleneck: ${model.flywheel.bottleneck.label} - ${model.flywheel.bottleneck.score}/100`,
    `Primary command: ${model.primary.owner} - ${model.primary.label}`,
    `ARR unlocked: USD ${model.totalImpactArr.toLocaleString()}`,
    `Open commands: ${model.openCommandCount}`,
    "Command queue:",
    ...model.commands.map((command, index) => `${index + 1}. ${command.due} - ${command.owner}: ${command.label} (${command.status}). ${command.detail} Impact: USD ${command.impactArr.toLocaleString()} ARR.`),
    "Operating rule:",
    "Run the smallest command that repairs the market bottleneck first. Keep phase one monetization clean: paid listings, verified supplier pages, direct enquiries, and no rental payment collection."
  ].join("\n");
}

function buildDemandExchangeText(model = getDemandExchangeModel()) {
  const active = model.active;
  if (!active) return "Heavyster Demand Exchange\nNo supplier demand exchange is ready yet.";

  return [
    "Heavyster Demand Exchange",
    `Market: ${active.region} ${active.category}`,
    `Supplier pull score: ${model.score}/100 - ${model.badge}`,
    `Captured buyer demand: ${active.demandCount} signal${active.demandCount === 1 ? "" : "s"}`,
    `Visible supply: ${active.visibleSupply} listing${active.visibleSupply === 1 ? "" : "s"}`,
    `Open supply gap: ${active.supplyGap} listing${active.supplyGap === 1 ? "" : "s"}`,
    `Modeled listing ARR: USD ${active.annualRevenue.toLocaleString()}`,
    `Best-fit supplier: ${active.persona}`,
    "Supplier invite:",
    `Buyers are already searching for ${active.category.toLowerCase()} equipment in ${active.region}. Heavyster can give your fleet a verified page, direct enquiry route, and demand-backed category visibility.`,
    "Proof requested:",
    ...active.proof.map((item) => `- ${item}`),
    "Conversion path:",
    ...model.lanes.map((lane) => `- ${lane.status}: ${lane.label}. ${lane.detail}`),
    "Phase one rule:",
    "The supplier pays only for active equipment listings. The customer still pays the rental company directly, and Heavyster does not collect rental payment."
  ].join("\n");
}

function buildProofDemandText(model = getProofDemandRoomModel()) {
  const active = model.active;
  if (!active) return "Heavyster Proof of Demand Room\nNo proof room is ready yet.";

  return [
    "Heavyster Proof of Demand Room",
    `Market: ${active.region} ${active.category}`,
    `Proof score: ${model.score}/100 - ${model.badge}`,
    `Buyer demand: ${active.demandCount} signal${active.demandCount === 1 ? "" : "s"}`,
    `Supply gap: ${active.supplyGap} listing${active.supplyGap === 1 ? "" : "s"}`,
    `Proof value: USD ${model.proofValue.toLocaleString()}`,
    `Best-fit supplier: ${active.persona}`,
    "Evidence chain:",
    ...model.evidence.map((item) => `- ${item.status}: ${item.label}. ${item.detail}`),
    "Supplier objections answered:",
    ...model.objections.map((item) => `- ${item.label} ${item.answer}`),
    "Supplier pitch:",
    `We are seeing buyer demand for ${active.category.toLowerCase()} equipment in ${active.region}, but visible verified supply is still thin. Heavyster can publish your machines as paid active listings, add proof, route enquiries directly to your team, and keep rental payment between you and the customer.`,
    "Phase one rule:",
    "Use this proof pack to sell active listing subscriptions, not rental commission."
  ].join("\n");
}

function buildSupplierCommitmentText(model = getSupplierCommitmentModel()) {
  const active = model.active;
  if (!active) return "Heavyster Supplier Commitment Room\nNo supplier commitment is ready yet.";

  return [
    "Heavyster Supplier Commitment Room",
    `Market: ${active.region} ${active.category}`,
    `Commitment status: ${model.badge} - ${model.score}/100`,
    `Recommended package: ${model.recommendedPackage.label}`,
    `Active listings: ${model.recommendedPackage.listings}`,
    `Monthly listing revenue: USD ${model.recommendedPackage.monthlyRevenue.toLocaleString()}`,
    `Annual listing revenue: USD ${model.recommendedPackage.annualRevenue.toLocaleString()}`,
    `Proof score: ${model.proof.score}/100 - ${model.proof.badge}`,
    "Package options:",
    ...model.packages.map((item) => `- ${item.status}: ${item.label}, ${item.listings} listings, USD ${item.monthlyRevenue.toLocaleString()}/month or USD ${item.annualRevenue.toLocaleString()}/year. ${item.detail}`),
    "Go-live gates:",
    ...model.gates.map((gate) => `- ${gate.status}: ${gate.owner} owns ${gate.label}. ${gate.detail}`),
    "Commitment note:",
    `We recommend starting with ${model.recommendedPackage.listings} active ${active.category.toLowerCase()} listings for ${active.region}. The market already has buyer demand proof, a visible supply gap, and a clean no-commission model. Heavyster routes enquiries directly to your team while the rental payment stays between you and the customer.`,
    "Phase one rule:",
    "Close the listing subscription first. Do not introduce rental commission until Heavyster earns the booking workflow."
  ].join("\n");
}

function buildListingActivationText(model = getListingActivationModel()) {
  const active = model.active;
  if (!active) return "Heavyster Listing Activation Room\nNo listing activation plan is ready yet.";

  return [
    "Heavyster Listing Activation Room",
    `Market: ${active.region} ${active.category}`,
    `Activation status: ${model.badge} - ${model.activationScore}/100`,
    `Supplier package: ${model.recommendedPackage.label}`,
    `Active paid listings: ${model.recommendedPackage.listings}`,
    `First invoice: USD ${model.recommendedPackage.monthlyRevenue.toLocaleString()}/month or USD ${model.recommendedPackage.annualRevenue.toLocaleString()}/year`,
    `Commitment score: ${model.commitment.score}/100 - ${model.commitment.badge}`,
    "Activation queue:",
    ...model.queue.map((item) => `- ${item.status}: ${item.owner} owns ${item.label}. ${item.detail}`),
    "Billing and launch gates:",
    ...model.gates.map((gate) => `- ${gate.status}: ${gate.owner} owns ${gate.label}. ${gate.detail}`),
    "Go-live note:",
    `${active.region} ${active.category.toLowerCase()} can start with ${model.recommendedPackage.listings} active paid listings, verified proof, availability, and direct enquiry routing. Customers still pay the rental company directly, and Heavyster does not collect rental payment in phase one.`,
    "Phase one rule:",
    "Activate paid listings before booking rails."
  ].join("\n");
}

function buildTrustLedgerText(model = getTrustRevenueLedgerModel()) {
  if (!model.active) return "Heavyster Trust & Revenue Ledger\nNo trust ledger is ready yet.";

  return [
    "Heavyster Trust & Revenue Ledger",
    `Market: ${model.marketLabel}`,
    `Ledger status: ${model.badge} - ${model.score}/100`,
    `Active listing ARR: USD ${model.activeListingArr.toLocaleString()}`,
    `Next package ARR: USD ${model.nextPackageArr.toLocaleString()}`,
    `Direct enquiry pipeline: USD ${model.directPipeline.toLocaleString()}`,
    `Trust debt: ${model.trustDebt} gap${model.trustDebt === 1 ? "" : "s"}`,
    "Market ledger:",
    ...model.rows.map((row) => `- ${row.status}: ${row.label}, ${row.value}. ${row.detail}`),
    "Control gates:",
    ...model.controls.map((control) => `- ${control.status}: ${control.owner} owns ${control.label}. ${control.detail}`),
    "Founder decision:",
    `${model.marketLabel} should scale only when paid listing activation, trust proof, supplier response, and renewal protection are clean. Heavyster keeps rental payment direct in phase one and uses the ledger to protect listing SaaS revenue before any booking rails.`,
    "Phase one rule:",
    "Grow listing ARR only as fast as trust can support."
  ].join("\n");
}

function setText(selector, value) {
  document.querySelector(selector).textContent = value;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function toTitleCase(value) {
  return String(value).replace(/\w\S*/g, (word) =>
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  );
}

function showToast(message) {
  const toast = document.querySelector("#toast");
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 2400);
}
