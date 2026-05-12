(function () {
  const BRAND_NAME = "PursuitDesk";
  const BRAND_DOMAIN = "pursuitdesk.app";
  const BRAND_MARK = "assets/pursuitdesk-mark.svg?v=59";
  const BRAND_LOGO_3D = "assets/pursuitdesk-logo-3d.svg?v=59";
  const STORE_KEY = "pursuitDesk:data:v1";
  const SESSION_KEY = "pursuitDesk:session:v1";
  const TYPE_OPTIONS = ["EOI", "Tender", "Project"];
  const STATUS_OPTIONS = [
    "Active",
    "Ongoing",
    "Submitted",
    "Pending",
    "Awarded",
    "Completed",
    "Cancelled",
    "Regret",
  ];
  const LANE_OPTIONS = [
    "All lanes",
    "Needs decision",
    "Past due",
    "No due date",
    "Missing owner",
    "Missing category",
    "Missing reference",
  ];
  const BILLING_CURRENCY = "USD";
  const BILLING_PRICE_PER_USER = 5;
  const BUSINESS_PLUS_BASE = 49;
  const ANNUAL_BILLABLE_MONTHS = 10;
  const ACCESS_MODEL_VERSION = 55;
  const BILLING_TERMS = ["Monthly", "Annual"];
  const IMPORT_COLUMNS = ["type", "reference", "client", "title", "category", "status", "startDate", "endDate", "valueText", "owner", "sourceSheet"];
  const ADMIN_ONLY_SECTION_KEYS = ["membership"];
  const PRIMARY_NAV_KEYS = ["command", "advisor", "review", "tenders", "projects", "reports"];
  const ACCESS_SECTIONS = [
    { key: "command", label: "Command", view: "Command" },
    { key: "advisor", label: "Advisor", view: "Advisor" },
    { key: "review", label: "Weekly Review", view: "Weekly Review" },
    { key: "intake", label: "Intake", view: "Intake" },
    { key: "import", label: "Import", view: "Import" },
    { key: "governance", label: "Governance", view: "Governance" },
    { key: "bidDesk", label: "Bid Desk", view: "Bid Desk" },
    { key: "calendar", label: "Calendar", view: "Calendar" },
    { key: "risk", label: "Risk", view: "Risk" },
    { key: "tenders", label: "Tenders", view: "Tenders" },
    { key: "tenderInsights", label: "Tenders Insights", view: "Tenders Insights" },
    { key: "projects", label: "Projects", view: "Projects" },
    { key: "projectInsights", label: "Project Insights", view: "Project Insights" },
    { key: "forecast", label: "Forecast", view: "Forecast" },
    { key: "clients", label: "Clients", view: "Clients" },
    { key: "contracts", label: "Contracts", view: "Contracts" },
    { key: "documents", label: "Documents", view: "Documents" },
    { key: "reminders", label: "Reminders", view: "Reminders" },
    { key: "reports", label: "Reports", view: "Reports" },
    { key: "membership", label: "Membership Model", view: "Membership" },
  ];
  const DEFAULT_OPERATION_ACCESS_KEYS = ["tenders", "projects"];
  const COMMERCIAL_ACCESS_KEYS = ["tenderInsights", "projectInsights", "forecast", "clients", "contracts", "reports", "advisor", "command"];
  const GRANTABLE_ACCESS_SECTIONS = ACCESS_SECTIONS.filter((section) => !ADMIN_ONLY_SECTION_KEYS.includes(section.key));
  const GOVERNANCE_ACCESS_KEYS = ["governance", "import", "documents"];
  const DATA_ARCHITECTURE_LAYERS = [
    {
      key: "operations",
      label: "Operational tracker",
      owner: "Frontline team",
      tone: "teal",
      sections: ["Tenders", "Projects"],
      fields: ["Reference", "Client", "Title", "Status", "Category", "Owner", "Start date", "Due / last date"],
      rule: "Daily users work the record without value, pricing, agreement, or negotiation money.",
    },
    {
      key: "commercial",
      label: "Commercial intelligence",
      owner: "Managers",
      tone: "amber",
      sections: ["Tenders Insights", "Project Insights", "Forecast", "Contracts", "Reports"],
      fields: ["Value", "Currency", "Negotiation amounts", "Agreement no", "LOA", "Forecast weight", "Commercial gaps"],
      rule: "Commercial fields stay in controlled analysis and review rooms.",
    },
    {
      key: "governance",
      label: "Governance evidence",
      owner: "Admin / control",
      tone: "blue",
      sections: ["Governance", "Import", "Documents"],
      fields: ["Source workbook", "Source sheet", "Audit trail", "Access rights", "Review status", "Evidence gaps"],
      rule: "Trust fields explain where the data came from, who can see it, and what changed.",
    },
  ];
  const ACCESS_BLUEPRINTS = [
    {
      key: "operations",
      label: "Operations user",
      access: ["tenders", "projects"],
      sections: ["Tenders", "Projects"],
      commercial: "No commercial access",
      note: "Best for coordinators who update status, owner, dates, and notes.",
    },
    {
      key: "manager",
      label: "Pursuit manager",
      access: ["command", "advisor", "review", "tenders", "tenderInsights", "projects", "projectInsights", "forecast", "clients", "contracts", "reminders", "reports"],
      sections: ["Tenders", "Tenders Insights", "Projects", "Project Insights", "Reports"],
      commercial: "Commercial dashboards",
      note: "Best for managers who review value, forecast, and pipeline decisions.",
    },
    {
      key: "control",
      label: "Control admin",
      access: ["command", "governance", "import", "documents", "reports"],
      sections: ["Governance", "Import", "Documents", "Reports"],
      commercial: "Access and trust control",
      note: "Best for admins who manage users, imports, audit trail, and evidence.",
    },
  ];
  const PLATFORM_MODULES = [
    {
      name: "Command",
      code: "CM",
      stage: "Live control center",
      summary: "Morning operating cockpit for health score, priorities, module signals, and management actions.",
      signal: "Operating layer",
    },
    {
      name: "Advisor",
      code: "AD",
      stage: "Live pursuit advisor",
      summary: "Next-best actions, management brief, decision prompts, and operating recommendations from live PursuitDesk signals.",
      signal: "Decision layer",
    },
    {
      name: "Weekly Review",
      code: "WR",
      stage: "Live review room",
      summary: "Meeting agenda, owner workload, decision log, action register, and closeout rhythm for weekly management reviews.",
      signal: "Operating cadence",
    },
    {
      name: "Intake",
      code: "IN",
      stage: "Live intake desk",
      summary: "Controlled request form, validation queue, routing, and conversion into live tender or project records.",
      signal: "Front door",
    },
    {
      name: "Import",
      code: "IM",
      stage: "Live import studio",
      summary: "CSV onboarding, source workbook health, field coverage, duplicate checks, and controlled row import.",
      signal: "Data intake",
    },
    {
      name: "Governance",
      code: "GV",
      stage: "Live governance desk",
      summary: "Audit trail, high-value review queue, access health, and policy controls for trusted operations.",
      signal: "Trust layer",
    },
    {
      name: "Bid Desk",
      code: "BD",
      stage: "Live bid desk",
      summary: "Submission readiness, bid/no-bid decisions, pack control, deadline pressure, and tender war-room actions.",
      signal: "Bid execution",
    },
    {
      name: "Calendar",
      code: "CA",
      stage: "Live review calendar",
      summary: "Rolling review calendar for overdue work, upcoming submissions, project milestones, and unscheduled records.",
      signal: "Time control",
    },
    {
      name: "Risk",
      code: "RK",
      stage: "Live risk control",
      summary: "Risk register, severity lanes, exposure, heatmap, mitigation rhythm, and owner/client pressure.",
      signal: "Management control",
    },
    {
      name: "Tenders",
      code: "TD",
      stage: "Live foundation",
      summary: "EOI, tender, negotiation, due-date, owner, and bid status control.",
      signal: "Core workspace",
    },
    {
      name: "Projects",
      code: "PR",
      stage: "Live foundation",
      summary: "Ongoing project movement, delivery status, client handover, and completion health.",
      signal: "Core workspace",
    },
    {
      name: "Forecast",
      code: "FC",
      stage: "Live forecast room",
      summary: "Weighted pipeline, scenario values, date windows, client forecast, and conversion assumptions.",
      signal: "Forward view",
    },
    {
      name: "Contracts",
      code: "CT",
      stage: "Live contract room",
      summary: "Agreement numbers, award handover, contract value, renewal watch, and commercial gaps.",
      signal: "Commercial control",
    },
    {
      name: "Clients",
      code: "CL",
      stage: "Next module",
      summary: "Client profiles, contact owners, relationship notes, and opportunity history.",
      signal: "Relationship memory",
    },
    {
      name: "Documents",
      code: "DC",
      stage: "Live evidence room",
      summary: "Source workbooks, sheet coverage, agreement proof, LOA evidence, and document gaps.",
      signal: "Evidence locker",
    },
    {
      name: "Reminders",
      code: "RM",
      stage: "Live follow-up",
      summary: "Generated follow-ups for overdue work, near dates, negotiation tasks, missing data, and high-value reviews.",
      signal: "Action engine",
    },
    {
      name: "Reports",
      code: "RP",
      stage: "Live report room",
      summary: "Management report room with executive summary, operating split, client heat, and follow-up actions.",
      signal: "Decision layer",
    },
  ];

  const app = document.getElementById("app");
  const state = {
    data: loadData(),
    user: loadSession(),
    view: "Command",
    filters: {
      search: "",
      type: "All",
      status: "All",
      category: "All",
      lane: "All lanes",
    },
    selectedId: null,
    message: "",
    pricingSeats: 10,
    insightLens: "Tendering",
    membershipPlan: "Team Workspace",
    billingTerm: "Monthly",
    quickSearchOpen: false,
    quickSearch: "",
    roomsOpen: false,
    tableDensity: "Comfortable",
    trackerMode: "Sheet",
    detailCollapsed: false,
    importText: "",
    importPreview: null,
    importMessage: "",
    previewAdmin: null,
  };

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function seedAuditFromRecords(records = []) {
    const base = Date.now();
    return records.slice(0, 36).map((record, index) => ({
      id: `AUD-SEED-${index + 1}`,
      companyId: record.companyId,
      ts: new Date(base - index * 3600000).toISOString(),
      actorId: "system",
      actor: "PursuitDesk Import",
      role: "System",
      action: "Source row loaded",
      target: record.reference || record.title || "Imported record",
      detail: `${record.type || "Record"} from ${record.sourceSheet || record.sourceWorkbook || "source workbook"}`,
      recordId: record.id,
      tone: record.type === "Project" ? "blue" : "teal",
    }));
  }

  function seedIntakeRequestsFromRecords(records = []) {
    const candidates = [
      ...records.filter((record) => record.type !== "Project").slice(0, 4),
      ...records.filter((record) => record.type === "Project").slice(0, 3),
    ];
    const statuses = ["Pending", "Pending", "Approved", "Rework", "Pending", "Approved", "Pending"];
    const channels = ["Email request", "Client portal", "Management review", "Sales lead", "Excel backlog", "Operations call", "Procurement notice"];
    return candidates.slice(0, 7).map((record, index) => ({
      id: `REQ-SEED-${index + 1}`,
      companyId: record.companyId,
      createdAt: new Date(Date.now() - (index + 1) * 86400000).toISOString(),
      createdBy: index % 2 ? `${BRAND_NAME} Editor` : `${BRAND_NAME} Admin`,
      status: statuses[index] || "Pending",
      type: record.type || "Tender",
      reference: record.reference || "",
      client: record.client || "",
      title: record.title || "",
      category: record.category || "",
      endDate: record.endDate || "",
      valueText: record.valueText || "",
      owner: record.owner || "Commercial",
      channel: channels[index] || "Manual request",
      notes: index === 3 ? "Needs clearer client scope before conversion." : "Seeded from current Excel workspace for intake demo.",
      convertedRecordId: statuses[index] === "Approved" ? record.id : "",
      approvedBy: statuses[index] === "Approved" ? `${BRAND_NAME} Admin` : "",
      approvedAt: statuses[index] === "Approved" ? new Date(Date.now() - index * 7200000).toISOString() : "",
    }));
  }

  function seedBidDecisions(records = []) {
    const decisions = {};
    records
      .filter((record) => record.type === "Tender" || record.type === "EOI")
      .slice(0, 18)
      .forEach((record, index) => {
        decisions[record.id] = {
          decision: index % 5 === 0 ? "No-bid" : index % 3 === 0 ? "Bid" : "Watch",
          by: `${BRAND_NAME} Admin`,
          at: new Date(Date.now() - index * 5400000).toISOString(),
        };
      });
    return decisions;
  }

  function loadData() {
    const saved = localStorage.getItem(STORE_KEY);
    if (saved) {
      try {
        return normalizeData(JSON.parse(saved));
      } catch (error) {
        localStorage.removeItem(STORE_KEY);
      }
    }
    return normalizeData(clone(window.SEED_DATA));
  }

  function normalizeData(data) {
    const demoUsers = {
      "u-admin": [`${BRAND_NAME} Admin`, `admin@${BRAND_DOMAIN}`],
      "u-editor": [`${BRAND_NAME} Editor`, `editor@${BRAND_DOMAIN}`],
      "u-viewer": [`${BRAND_NAME} Viewer`, `viewer@${BRAND_DOMAIN}`],
    };
    const shouldMigrateAccess = Number(data.accessModelVersion || 0) < ACCESS_MODEL_VERSION;
    data.company = {
      ...data.company,
      billingCurrency: BILLING_CURRENCY,
      pricePerUser: BILLING_PRICE_PER_USER,
      billingCycle: "monthly",
    };
    data.users = data.users.map((user) => {
      const demo = demoUsers[user.id];
      const migratedAccess =
        shouldMigrateAccess && user.id === "u-editor"
          ? DEFAULT_OPERATION_ACCESS_KEYS
          : shouldMigrateAccess && user.id === "u-viewer"
            ? DEFAULT_OPERATION_ACCESS_KEYS
            : user.access;
      const normalized = demo ? { ...user, name: demo[0], email: demo[1], access: migratedAccess } : { ...user, access: migratedAccess };
      return { ...normalized, access: normalizeUserAccess(normalized) };
    });
    data.accessModelVersion = ACCESS_MODEL_VERSION;
    data.audit = Array.isArray(data.audit) && data.audit.length ? data.audit : seedAuditFromRecords(data.records);
    data.governanceReviews = data.governanceReviews && typeof data.governanceReviews === "object" ? data.governanceReviews : {};
    data.intakeRequests = Array.isArray(data.intakeRequests) ? data.intakeRequests : seedIntakeRequestsFromRecords(data.records);
    data.bidDecisions = data.bidDecisions && typeof data.bidDecisions === "object" ? data.bidDecisions : seedBidDecisions(data.records);
    data.submissionReady = data.submissionReady && typeof data.submissionReady === "object" ? data.submissionReady : {};
    return data;
  }

  function defaultAccessForRole(role) {
    if (role === "Admin") return ACCESS_SECTIONS.map((section) => section.key);
    if (role === "Editor") return DEFAULT_OPERATION_ACCESS_KEYS;
    return DEFAULT_OPERATION_ACCESS_KEYS;
  }

  function normalizeUserAccess(user) {
    const valid = new Set(ACCESS_SECTIONS.map((section) => section.key));
    if (user.role === "Admin") return ACCESS_SECTIONS.map((section) => section.key);
    const legacyMap = {
      control: ["tenders", "projects"],
      insights: ["tenderInsights", "projectInsights"],
      membership: [],
    };
    const requested = Array.isArray(user.access)
      ? user.access
          .flatMap((key) => legacyMap[key] || key)
          .filter((key) => valid.has(key) && !ADMIN_ONLY_SECTION_KEYS.includes(key))
      : [];
    const unique = Array.from(new Set(requested));
    return unique.length ? unique : defaultAccessForRole(user.role);
  }

  function persistData() {
    localStorage.setItem(STORE_KEY, JSON.stringify(state.data));
  }

  function loadSession() {
    const saved = localStorage.getItem(SESSION_KEY);
    if (!saved) return null;
    try {
      return JSON.parse(saved);
    } catch (error) {
      localStorage.removeItem(SESSION_KEY);
      return null;
    }
  }

  function persistSession(user) {
    if (!user) {
      localStorage.removeItem(SESSION_KEY);
      return;
    }
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  }

  function companyRecords() {
    if (!state.user) return [];
    return state.data.records.filter((record) => record.companyId === state.user.companyId);
  }

  function canEdit() {
    return state.user && state.user.role !== "Viewer";
  }

  function canAdmin() {
    return state.user && state.user.role === "Admin";
  }

  function isAccessPreviewing() {
    return Boolean(state.previewAdmin);
  }

  function accessHasAny(access, keys) {
    return keys.some((key) => access.includes(key));
  }

  function userHasCommercialAccess(user) {
    return accessHasAny(normalizeUserAccess(user), COMMERCIAL_ACCESS_KEYS);
  }

  function userHasGovernanceAccess(user) {
    return accessHasAny(normalizeUserAccess(user), GOVERNANCE_ACCESS_KEYS);
  }

  function accessBlueprintByKey(key) {
    return ACCESS_BLUEPRINTS.find((blueprint) => blueprint.key === key) || ACCESS_BLUEPRINTS[0];
  }

  function accessLabelForKeys(keys) {
    return keys
      .map((key) => ACCESS_SECTIONS.find((section) => section.key === key)?.label)
      .filter(Boolean)
      .join(", ");
  }

  function billingCurrency(company = state.data.company) {
    return company.billingCurrency || BILLING_CURRENCY;
  }

  function formatBilling(amount, company = state.data.company) {
    return `${billingCurrency(company)} ${Number(amount || 0).toLocaleString("en-US")}`;
  }

  function isOperationalTrackerSection(view = state.view) {
    return view === "Tenders" || view === "Projects";
  }

  function isTenderSection(view = state.view) {
    return view === "Tenders" || view === "Tender Insights" || view === "Tenders Insights";
  }

  function isCommandSection(view = state.view) {
    return view === "Command";
  }

  function isAdvisorSection(view = state.view) {
    return view === "Advisor";
  }

  function isWeeklyReviewSection(view = state.view) {
    return view === "Weekly Review";
  }

  function isIntakeSection(view = state.view) {
    return view === "Intake";
  }

  function isImportSection(view = state.view) {
    return view === "Import";
  }

  function isGovernanceSection(view = state.view) {
    return view === "Governance";
  }

  function isBidDeskSection(view = state.view) {
    return view === "Bid Desk";
  }

  function isCalendarSection(view = state.view) {
    return view === "Calendar";
  }

  function isRiskSection(view = state.view) {
    return view === "Risk";
  }

  function isProjectSection(view = state.view) {
    return view === "Projects" || view === "Project Insights";
  }

  function isForecastSection(view = state.view) {
    return view === "Forecast";
  }

  function isClientSection(view = state.view) {
    return view === "Clients";
  }

  function isContractSection(view = state.view) {
    return view === "Contracts";
  }

  function isDocumentSection(view = state.view) {
    return view === "Documents";
  }

  function isReminderSection(view = state.view) {
    return view === "Reminders";
  }

  function isReportSection(view = state.view) {
    return view === "Reports";
  }

  function isInsightSection(view = state.view) {
    return view === "Tender Insights" || view === "Tenders Insights" || view === "Project Insights";
  }

  function sectionForView(view) {
    if (view === "Command") return "command";
    if (view === "Advisor") return "advisor";
    if (view === "Weekly Review") return "review";
    if (view === "Intake") return "intake";
    if (view === "Import") return "import";
    if (view === "Governance") return "governance";
    if (view === "Bid Desk") return "bidDesk";
    if (view === "Calendar") return "calendar";
    if (view === "Risk") return "risk";
    if (view === "Tender Insights" || view === "Tenders Insights") return "tenderInsights";
    if (view === "Project Insights") return "projectInsights";
    if (view === "Projects") return "projects";
    if (view === "Tenders") return "tenders";
    if (view === "Forecast") return "forecast";
    if (view === "Clients") return "clients";
    if (view === "Contracts") return "contracts";
    if (view === "Documents") return "documents";
    if (view === "Reminders") return "reminders";
    if (view === "Reports") return "reports";
    if (view === "Membership") return "membership";
    return "tenders";
  }

  function userAccess(user = state.user) {
    if (!user) return [];
    if (user.role === "Admin") return ACCESS_SECTIONS.map((section) => section.key);
    return normalizeUserAccess(user);
  }

  function hasSectionAccess(key, user = state.user) {
    if (ADMIN_ONLY_SECTION_KEYS.includes(key)) return user?.role === "Admin";
    return userAccess(user).includes(key);
  }

  function canAccessView(view, user = state.user) {
    return hasSectionAccess(sectionForView(view), user);
  }

  function defaultViewForUser(user = state.user) {
    const access = userAccess(user);
    const section = ACCESS_SECTIONS.find((item) => access.includes(item.key));
    return section ? section.view : null;
  }

  function refreshSessionUser() {
    if (!state.user) return;
    const current = state.data.users.find((user) => user.id === state.user.id);
    if (!current) {
      state.user = null;
      if (!isAccessPreviewing()) persistSession(null);
      return;
    }
    state.user = {
      id: current.id,
      companyId: current.companyId,
      name: current.name,
      email: current.email,
      role: current.role,
      access: normalizeUserAccess(current),
    };
    if (!isAccessPreviewing()) persistSession(state.user);
  }

  function ensureAccessibleView() {
    refreshSessionUser();
    if (!state.user) return;
    if (state.view === "All") state.view = "Tenders";
    if (state.view === "Insights" || state.view === "Tender Insights") state.view = "Tenders Insights";
    if (!canAccessView(state.view)) state.view = defaultViewForUser() || "No Access";
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function normalize(value) {
    return String(value ?? "").trim().toLowerCase();
  }

  function formatDate(value) {
    if (!value) return "";
    const date = new Date(`${value}T00:00:00`);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  function statusClass(status) {
    const key = normalize(status).replaceAll(" ", "-");
    if (["active", "ongoing", "submitted", "pending"].includes(key)) return `status-${key}`;
    if (["awarded", "completed"].includes(key)) return `status-${key}`;
    if (["cancelled", "regret"].includes(key)) return `status-${key}`;
    return "status-default";
  }

  function uniqueOptions(field) {
    const values = companyRecords()
      .map((record) => record[field])
      .filter(Boolean)
      .map(String);
    return Array.from(new Set(values)).sort((a, b) => a.localeCompare(b));
  }

  function filterRecords() {
    let records = companyRecords();
    if (isTenderSection()) {
      records = records.filter((record) => record.type === "Tender" || record.type === "EOI");
    }
    if (isProjectSection()) {
      records = records.filter((record) => record.type === "Project");
    }
    if (state.filters.type !== "All") {
      records = records.filter((record) => record.type === state.filters.type);
    }
    if (state.filters.status !== "All") {
      records = records.filter((record) => record.status === state.filters.status);
    }
    if (state.filters.category !== "All") {
      records = records.filter((record) => record.category === state.filters.category);
    }
    const lane = state.filters.lane || "All lanes";
    if (lane !== "All lanes") {
      records = records.filter((record) => recordMatchesLane(record, lane));
    }
    const search = normalize(state.filters.search);
    if (search) {
      records = records.filter((record) =>
        [
          record.reference,
          record.client,
          record.clientGroup,
          record.title,
          record.category,
          record.status,
          record.owner,
          record.latestActivity,
          record.sourceSheet,
        ]
          .map(normalize)
          .join(" ")
          .includes(search),
      );
    }
    return records;
  }

  function recordMatchesLane(record, lane) {
    const date = parseRecordDate(record.endDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (lane === "Needs decision") {
      return !isClosedRecord(record) && ["Active", "Pending", "Submitted"].includes(record.status);
    }
    if (lane === "Past due") {
      return !isClosedRecord(record) && date && date < today;
    }
    if (lane === "No due date") {
      return !isClosedRecord(record) && !record.endDate;
    }
    if (lane === "Missing owner") {
      return !isClosedRecord(record) && !record.owner;
    }
    if (lane === "Missing category") {
      return !isClosedRecord(record) && !record.category;
    }
    if (lane === "Missing reference") {
      return !isClosedRecord(record) && !record.reference;
    }
    return true;
  }

  function metrics() {
    const records = companyRecords();
    const activeTenders = records.filter(
      (record) =>
        (record.type === "Tender" || record.type === "EOI") &&
        !["Awarded", "Completed", "Cancelled", "Regret"].includes(record.status),
    ).length;
    const ongoingProjects = records.filter(
      (record) => record.type === "Project" && normalize(record.status) === "ongoing",
    ).length;
    const awarded = records.filter((record) => record.status === "Awarded").length;
    const completed = records.filter((record) => record.status === "Completed").length;
    const tenders = records.filter((record) => record.type === "Tender").length;
    const eois = records.filter((record) => record.type === "EOI").length;
    const projects = records.filter((record) => record.type === "Project").length;
    const pending = records.filter((record) => record.status === "Pending").length;
    const submitted = records.filter((record) => record.status === "Submitted").length;
    const risk = records.filter((record) => ["Cancelled", "Regret"].includes(record.status)).length;
    const users = state.data.users.filter((user) => user.companyId === state.user.companyId);
    return {
      activeTenders,
      ongoingProjects,
      awarded,
      completed,
      tenders,
      eois,
      projects,
      pending,
      submitted,
      risk,
      seats: users.length,
      bill: users.length * state.data.company.pricePerUser,
      totalRecords: records.length,
      winProgress: records.length ? Math.round(((awarded + completed) / records.length) * 100) : 0,
    };
  }

  function pricingProjection(company = state.data.company) {
    const seats = Math.min(100, Math.max(1, Number(state.pricingSeats) || 10));
    const monthly = seats * company.pricePerUser;
    const annualRunRate = monthly * 12;
    const annualPrepay = monthly * ANNUAL_BILLABLE_MONTHS;
    const annualSavings = annualRunRate - annualPrepay;
    const billingTerm = BILLING_TERMS.includes(state.billingTerm) ? state.billingTerm : "Monthly";
    return {
      seats,
      monthly,
      annual: annualRunRate,
      annualPrepay,
      annualSavings,
      perUser: company.pricePerUser,
      billingTerm,
      dueNow: billingTerm === "Annual" ? annualPrepay : monthly,
    };
  }

  function getSelected(records) {
    if (!records.length) return null;
    const current = records.find((record) => record.id === state.selectedId);
    if (current) return current;
    state.selectedId = records[0].id;
    return records[0];
  }

  function renderLogin() {
    const totalRecords = window.SEED_DATA.records.length;
    const tenders = window.SEED_DATA.records.filter((record) => record.type === "Tender").length;
    const projects = window.SEED_DATA.records.filter((record) => record.type === "Project").length;
    app.innerHTML = `
      <main class="login-page">
        <section class="login-panel">
          <div class="login-copy">
            <div class="login-kicker">${BRAND_NAME} / Opportunity workspace</div>
            <div class="brand-row">
              <div class="brand-mark"><img src="${BRAND_MARK}" alt=""></div>
              <div>
                <div class="brand-name">${BRAND_NAME}</div>
                <div class="company-pill">From opportunity to delivery</div>
              </div>
            </div>
            <h1>The operating desk for pursuits, tenders, and active projects.</h1>
            <p>Turn the current Excel trackers into a governed company workspace with clean editing, role access, fast filters, focused insights, and controlled membership management.</p>
            <div class="login-signal-strip">
              <span class="status-pill is-live">Excel-ready MVP</span>
              <span class="status-pill">Role access</span>
              <span class="status-pill">Tender + project desk</span>
            </div>
            <div class="login-stats">
              <div class="login-stat"><strong>${totalRecords}</strong><span>Sample records</span></div>
              <div class="login-stat"><strong>${tenders}</strong><span>Tender records</span></div>
              <div class="login-stat"><strong>${projects}</strong><span>Project records</span></div>
            </div>
          </div>
          <div class="login-form-wrap">
            <div class="logo-showcase">
              <img src="${BRAND_LOGO_3D}" alt="${BRAND_NAME} 3D logo">
            </div>
            <span class="panel-label">Secure workspace</span>
            <h2>Sign in</h2>
            <form id="loginForm">
              <div class="field">
                <label for="email">Email</label>
                <input id="email" name="email" type="email" value="admin@${BRAND_DOMAIN}" autocomplete="username" required>
              </div>
              <div class="field">
                <label for="password">Password</label>
                <input id="password" name="password" type="password" value="demo123" autocomplete="current-password" required>
              </div>
              <button class="primary-btn" type="submit">Sign in</button>
              <p class="message">${escapeHtml(state.message)}</p>
            </form>
            <div class="demo-users">
              <strong>Demo users</strong><br>
              <code>admin@${BRAND_DOMAIN}</code>, <code>editor@${BRAND_DOMAIN}</code>, <code>viewer@${BRAND_DOMAIN}</code><br>
              Password: <code>demo123</code>
            </div>
          </div>
        </section>
      </main>
    `;
  }

  function renderModeButtons() {
    const visibleSections = ACCESS_SECTIONS.filter((section) => !ADMIN_ONLY_SECTION_KEYS.includes(section.key) && hasSectionAccess(section.key));
    const primarySections = visibleSections.filter((section) => PRIMARY_NAV_KEYS.includes(section.key));
    const roomSections = visibleSections.filter((section) => !PRIMARY_NAV_KEYS.includes(section.key));
    const roomsActive = roomSections.some((section) => section.view === state.view);
    return `
      <div class="nav-shell">
        <nav class="mode-nav" aria-label="${BRAND_NAME} primary sections">
          ${primarySections.map((section) => {
          const active = state.view === section.view;
          return `
            <button class="mode-btn ${active ? "active" : ""}" type="button" data-view="${section.view}">
              ${escapeHtml(section.label)}
            </button>
          `;
        }).join("")}
        </nav>
        ${
          roomSections.length
            ? `
              <div class="rooms-launcher">
                <button class="mode-btn rooms-btn ${roomsActive || state.roomsOpen ? "active" : ""}" type="button" data-action="toggle-rooms" aria-expanded="${state.roomsOpen ? "true" : "false"}">
                  Rooms
                </button>
                ${
                  state.roomsOpen
                    ? `
                      <div class="rooms-menu" role="menu" aria-label="${BRAND_NAME} specialist rooms">
                        <div class="rooms-menu-head">
                          <span>Specialist rooms</span>
                          <button class="mini-btn" type="button" data-action="close-rooms">Close</button>
                        </div>
                        <div class="rooms-menu-grid">
                          ${roomSections
                            .map((section) => {
                              const active = state.view === section.view;
                              return `
                                <button class="rooms-menu-card tone-${escapeHtml(roomNavTone(section.view))} ${active ? "active" : ""}" type="button" data-view="${escapeHtml(section.view)}" role="menuitem">
                                  <span>${escapeHtml(section.label)}</span>
                                  <small>${escapeHtml(roomNavNote(section.view))}</small>
                                </button>
                              `;
                            })
                            .join("")}
                        </div>
                      </div>
                    `
                    : ""
                }
              </div>
            `
            : ""
        }
      </div>
    `;
  }

  function roomNavTone(view) {
    return {
      Intake: "teal",
      Import: "amber",
      Governance: "green",
      "Bid Desk": "blue",
      Calendar: "amber",
      Risk: "red",
      "Tenders Insights": "teal",
      "Project Insights": "blue",
      Forecast: "green",
      Clients: "green",
      Contracts: "amber",
      Documents: "blue",
      Reminders: "red",
    }[view] || "teal";
  }

  function roomNavNote(view) {
    return {
      Intake: "Request front door",
      Import: "Excel import control",
      Governance: "Audit and access",
      "Bid Desk": "Bid/no-bid execution",
      Calendar: "Dates and pressure",
      Risk: "Risk register",
      "Tenders Insights": "Tender analytics",
      "Project Insights": "Project analytics",
      Forecast: "Weighted pipeline",
      Clients: "Relationship heat",
      Contracts: "Commercial proof",
      Documents: "Evidence packs",
      Reminders: "Follow-up queue",
    }[view] || "Operating room";
  }

  function sectionRecords(view = state.view) {
    const records = companyRecords();
    if (isTenderSection(view)) return records.filter((record) => record.type === "Tender" || record.type === "EOI");
    if (isProjectSection(view)) return records.filter((record) => record.type === "Project");
    return records;
  }

  function sectionMetrics(records) {
    const due = buildDueBuckets(records);
    const dueWatch = due.find((bucket) => bucket.label === "Past due").value + due.find((bucket) => bucket.label === "Next 30 days").value;
    const closed = records.filter(isClosedRecord).length;
    return {
      total: records.length,
      active: records.filter((record) => record.status === "Active").length,
      ongoing: records.filter((record) => record.status === "Ongoing").length,
      pending: records.filter((record) => record.status === "Pending").length,
      submitted: records.filter((record) => record.status === "Submitted").length,
      awarded: records.filter((record) => record.status === "Awarded").length,
      completed: records.filter((record) => record.status === "Completed").length,
      closed,
      dueWatch,
      open: records.filter((record) => !isClosedRecord(record)).length,
      value: sumAmounts(records),
    };
  }

  function renderHeaderSummaryForView(view, metrics) {
    if (isInsightSection(view) || view === "Membership") return "";
    if (isCommandSection(view)) {
      const command = buildCommandCenterModel();
      const boxes = [
        ["Health", `${command.healthScore}%`],
        ["Actions", command.reminders.tasks.length],
        ["Gaps", command.documents.totalGaps],
      ];
      return `
        <div class="header-summary">
          ${boxes.map(([label, value]) => `<div><span>${escapeHtml(label)}</span><strong>${value}</strong></div>`).join("")}
        </div>
      `;
    }
    if (isAdvisorSection(view)) {
      const advisor = buildPursuitAdvisorModel();
      const boxes = [
        ["Score", `${advisor.advisorScore}%`],
        ["Actions", advisor.recommendations.length],
        ["Now", advisor.doNow.length],
      ];
      return `
        <div class="header-summary">
          ${boxes.map(([label, value]) => `<div><span>${escapeHtml(label)}</span><strong>${value}</strong></div>`).join("")}
        </div>
      `;
    }
    if (isWeeklyReviewSection(view)) {
      const review = buildWeeklyReviewModel();
      const boxes = [
        ["Ready", `${review.reviewScore}%`],
        ["Agenda", review.agenda.length],
        ["Actions", review.actionRegister.length],
      ];
      return `
        <div class="header-summary">
          ${boxes.map(([label, value]) => `<div><span>${escapeHtml(label)}</span><strong>${value}</strong></div>`).join("")}
        </div>
      `;
    }
    if (isIntakeSection(view)) {
      const intake = buildIntakeModel();
      const boxes = [
        ["Pending", intake.pending.length],
        ["Ready", intake.cleanPending.length],
        ["Score", `${intake.score}%`],
      ];
      return `
        <div class="header-summary">
          ${boxes.map(([label, value]) => `<div><span>${escapeHtml(label)}</span><strong>${value}</strong></div>`).join("")}
        </div>
      `;
    }
    if (isImportSection(view)) {
      const importStudio = buildImportStudioModel();
      const boxes = [
        ["Sources", importStudio.sourceWorkbooks],
        ["Coverage", `${importStudio.fieldCoverage}%`],
        ["Issues", importStudio.issueCount],
      ];
      return `
        <div class="header-summary">
          ${boxes.map(([label, value]) => `<div><span>${escapeHtml(label)}</span><strong>${value}</strong></div>`).join("")}
        </div>
      `;
    }
    if (isGovernanceSection(view)) {
      const governance = buildGovernanceModel();
      const boxes = [
        ["Score", `${governance.governanceScore}%`],
        ["Reviews", governance.pendingReviews.length],
        ["Audit", governance.auditRows.length],
      ];
      return `
        <div class="header-summary">
          ${boxes.map(([label, value]) => `<div><span>${escapeHtml(label)}</span><strong>${value}</strong></div>`).join("")}
        </div>
      `;
    }
    if (isBidDeskSection(view)) {
      const bidDesk = buildBidDeskModel();
      const boxes = [
        ["Active", bidDesk.activeRows.length],
        ["Ready", bidDesk.readyRows.length],
        ["Due 14", bidDesk.due14],
      ];
      return `
        <div class="header-summary">
          ${boxes.map(([label, value]) => `<div><span>${escapeHtml(label)}</span><strong>${value}</strong></div>`).join("")}
        </div>
      `;
    }
    if (isCalendarSection(view)) {
      const calendar = buildReviewCalendarModel();
      const boxes = [
        ["Events", calendar.events.length],
        ["Overdue", calendar.overdue.length],
        ["Next 30", calendar.next30.length],
      ];
      return `
        <div class="header-summary">
          ${boxes.map(([label, value]) => `<div><span>${escapeHtml(label)}</span><strong>${value}</strong></div>`).join("")}
        </div>
      `;
    }
    if (isRiskSection(view)) {
      const risk = buildRiskControlModel();
      const boxes = [
        ["Risks", risk.risks.length],
        ["Critical", risk.critical.length],
        ["Score", `${risk.controlScore}%`],
      ];
      return `
        <div class="header-summary">
          ${boxes.map(([label, value]) => `<div><span>${escapeHtml(label)}</span><strong>${value}</strong></div>`).join("")}
        </div>
      `;
    }
    if (isForecastSection(view)) {
      const forecast = buildForecastModel();
      const boxes = [
        ["Weighted", formatCompactMoney(forecast.weightedValue)],
        ["Next 90", formatCompactMoney(forecast.next90Weighted)],
        ["Confidence", `${forecast.confidence}%`],
      ];
      return `
        <div class="header-summary">
          ${boxes.map(([label, value]) => `<div><span>${escapeHtml(label)}</span><strong>${value}</strong></div>`).join("")}
        </div>
      `;
    }
    if (isClientSection(view)) {
      const portfolio = buildClientPortfolioModel();
      const boxes = [
        ["Accounts", portfolio.accounts.length],
        ["Active", portfolio.activeAccounts],
        ["Due Watch", portfolio.dueWatch],
      ];
      return `
        <div class="header-summary">
          ${boxes.map(([label, value]) => `<div><span>${escapeHtml(label)}</span><strong>${value}</strong></div>`).join("")}
        </div>
      `;
    }
    if (isContractSection(view)) {
      const contracts = buildContractsModel();
      const boxes = [
        ["Contracts", contracts.records.length],
        ["Agreements", contracts.withAgreement],
        ["Gaps", contracts.gapCount],
      ];
      return `
        <div class="header-summary">
          ${boxes.map(([label, value]) => `<div><span>${escapeHtml(label)}</span><strong>${value}</strong></div>`).join("")}
        </div>
      `;
    }
    if (isDocumentSection(view)) {
      const documents = buildDocumentsModel();
      const boxes = [
        ["Packs", documents.packs.length],
        ["Coverage", `${documents.sourceCoverage}%`],
        ["Gaps", documents.totalGaps],
      ];
      return `
        <div class="header-summary">
          ${boxes.map(([label, value]) => `<div><span>${escapeHtml(label)}</span><strong>${value}</strong></div>`).join("")}
        </div>
      `;
    }
    if (isReminderSection(view)) {
      const reminders = buildReminderModel();
      const boxes = [
        ["Open", reminders.tasks.length],
        ["Overdue", reminders.overdue],
        ["High Value", reminders.highValue],
      ];
      return `
        <div class="header-summary">
          ${boxes.map(([label, value]) => `<div><span>${escapeHtml(label)}</span><strong>${value}</strong></div>`).join("")}
        </div>
      `;
    }
    if (isReportSection(view)) {
      const report = buildReportModel();
      const boxes = [
        ["Records", report.totalRecords],
        ["Open", report.openRecords],
        ["Actions", report.reminders.tasks.length],
      ];
      return `
        <div class="header-summary">
          ${boxes.map(([label, value]) => `<div><span>${escapeHtml(label)}</span><strong>${value}</strong></div>`).join("")}
        </div>
      `;
    }
    const boxes = isProjectSection(view)
      ? [
          ["Ongoing", metrics.ongoing],
          ["Completed", metrics.completed],
          ["Due Watch", metrics.dueWatch],
        ]
      : [
          ["Active", metrics.active],
          ["Submitted", metrics.submitted],
          ["Awarded", metrics.awarded],
        ];
    return `
      <div class="header-summary">
        ${boxes.map(([label, value]) => `<div><span>${escapeHtml(label)}</span><strong>${value}</strong></div>`).join("")}
      </div>
    `;
  }

  function renderMetricsForView(view, metrics) {
    if (isInsightSection(view) || view === "Membership" || isCommandSection(view) || isAdvisorSection(view) || isWeeklyReviewSection(view) || isIntakeSection(view) || isImportSection(view) || isGovernanceSection(view) || isBidDeskSection(view) || isCalendarSection(view) || isRiskSection(view) || isForecastSection(view) || isClientSection(view) || isContractSection(view) || isDocumentSection(view) || isReminderSection(view) || isReportSection(view)) return "";
    const cards = isProjectSection(view)
      ? [
          ["Ongoing projects", metrics.ongoing, `${metrics.total} project records`, "teal"],
          ["Completed projects", metrics.completed, "Closed delivery records", "green"],
          ["Due watch", metrics.dueWatch, "Past due and next 30 days", "amber"],
          ["Stopped records", metrics.closed, "Cancelled or regret records", "red"],
        ]
      : [
          ["Active tenders", metrics.active, `${metrics.total} tender and EOI records`, "teal"],
          ["Submitted", metrics.submitted, "Submitted tender records", "blue"],
          ["Awarded tenders", metrics.awarded, "LOA or award status", "green"],
          ["Due watch", metrics.dueWatch, "Past due and next 30 days", "amber"],
        ];
    return `
      <section class="analytics">
        ${cards
          .map(
            ([label, value, note, tone]) => `
              <div class="metric tone-${escapeHtml(tone)}"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong><small>${escapeHtml(note)}</small></div>
            `,
          )
          .join("")}
      </section>
    `;
  }

  function renderShell() {
    ensureAccessibleView();
    const company = state.data.company;
    const records = filterRecords();
    const selected = getSelected(records);
    const stats = metrics();
    const scopedMetrics = sectionMetrics(sectionRecords());
    const viewTitle =
      state.view === "Command"
        ? "Command center"
        : state.view === "Advisor"
        ? "Pursuit advisor"
        : state.view === "Weekly Review"
        ? "Weekly review room"
        : state.view === "Intake"
        ? "Intake desk"
        : state.view === "Import"
        ? "Import studio"
        : state.view === "Governance"
        ? "Governance desk"
        : state.view === "Bid Desk"
        ? "Bid desk"
        : state.view === "Calendar"
        ? "Review calendar"
        : state.view === "Risk"
        ? "Risk control"
        : state.view === "Tenders"
        ? "Tenders workspace"
        : state.view === "Projects"
          ? "Project workspace"
        : state.view === "Tenders Insights"
          ? "Tenders insights"
        : state.view === "Project Insights"
          ? "Project insights"
        : state.view === "Forecast"
          ? "Forecast room"
        : state.view === "Clients"
          ? "Clients portfolio"
        : state.view === "Contracts"
          ? "Contracts room"
        : state.view === "Documents"
          ? "Documents room"
        : state.view === "Reminders"
          ? "Follow-up desk"
        : state.view === "Reports"
          ? "Reports room"
        : state.view === "Membership"
          ? "Membership model"
          : state.view;
    const viewCopy =
      state.view === "Command"
        ? "One morning screen for operating priorities, pursuit health, evidence gaps, client heat, contract movement, and management-ready actions."
        : state.view === "Advisor"
        ? "Recommended next actions, decision prompts, and management talking points generated from the live PursuitDesk rooms."
        : state.view === "Weekly Review"
        ? "A meeting-ready operating room for weekly agenda, owner workload, decisions, follow-ups, and closeout discipline."
        : state.view === "Intake"
        ? "Capture new tender and project requests through a controlled front door, validate required fields, and convert clean requests into live workspace rows."
        : state.view === "Import"
        ? "Bring Excel exports into PursuitDesk with CSV paste, source health checks, duplicate detection, preview, and controlled import."
        : state.view === "Governance"
        ? "Audit user actions, review high-value records, monitor section access, and keep trusted operating control before management reporting."
        : state.view === "Bid Desk"
        ? "Run bid/no-bid decisions, submission readiness, pack status, and deadline pressure for active tenders and EOIs."
        : state.view === "Calendar"
        ? "Plan tender submissions, project dates, overdue work, and management follow-ups from one rolling review calendar."
        : state.view === "Risk"
        ? "Surface schedule, commercial, bid, delivery, value, and data risks as a management-ready control register."
        : state.view === "Tenders Insights"
        ? "Tender-only management signals for follow-up risk, submission readiness, value exposure, and bid decisions."
        : state.view === "Project Insights"
          ? "Project-only management signals for delivery movement, due-date pressure, owner load, and completion health."
        : state.view === "Forecast"
          ? "Forward-looking pipeline view for weighted value, expected conversion, date windows, client forecast, and upside scenarios."
        : state.view === "Clients"
          ? "Relationship intelligence across client accounts, business units, active work, value exposure, and follow-up pressure."
        : state.view === "Contracts"
          ? "Commercial control for agreement numbers, awards, handovers, missing documents, contract value, and renewal watch."
        : state.view === "Documents"
          ? "Evidence control for source workbooks, sheet coverage, agreement and LOA proof, tender packs, project files, and missing document signals."
        : state.view === "Reminders"
          ? "Generated follow-up priorities for overdue records, near dates, missing information, high-value work, and negotiation movement."
        : state.view === "Reports"
          ? "A printable management pack for weekly reviews, executive updates, tender/project status, client concentration, and action follow-through."
        : state.view === "Membership"
          ? "Manage launch pricing, seats, subscription packaging, and the upgrade path from demo workspace to paid company plan."
        : `${records.length} records in view. Track references, clients, owners, dates, categories, and status without losing the spreadsheet speed.`;
    app.innerHTML = `
      <div class="shell">
        <header class="topbar">
          <div class="brand-row topbar-brand">
            <div class="brand-mark"><img src="${BRAND_MARK}" alt=""></div>
            <div>
              <div class="brand-name">${BRAND_NAME}</div>
              <div class="company-pill">${escapeHtml(company.name)}</div>
            </div>
          </div>
          <div class="status-strip">
            <span class="status-pill is-live">Live demo</span>
          </div>
          <div class="topbar-actions">
            ${renderModeButtons()}
            <div class="account-actions">
              ${renderAccountActions()}
            </div>
          </div>
        </header>

        <main class="main">
          ${renderPreviewBanner()}
          <section class="workspace-header">
            <div class="workspace-title">
              <h1>${escapeHtml(viewTitle)}</h1>
              <p>${escapeHtml(viewCopy)}</p>
            </div>
            ${renderHeaderSummaryForView(state.view, scopedMetrics)}
          </section>

          ${renderMetricsForView(state.view, scopedMetrics)}

          ${
            state.view === "Command"
              ? renderCommandCenterPage()
            : state.view === "Advisor"
              ? renderPursuitAdvisorPage()
            : state.view === "Weekly Review"
              ? renderWeeklyReviewPage()
            : state.view === "Intake"
              ? renderIntakeDeskPage()
            : state.view === "Import"
              ? renderImportStudioPage()
            : state.view === "Governance"
              ? renderGovernancePage()
            : state.view === "Bid Desk"
              ? renderBidDeskPage()
            : state.view === "Calendar"
              ? renderReviewCalendarPage()
            : state.view === "Risk"
              ? renderRiskControlPage()
            : state.view === "Forecast"
              ? renderForecastPage()
              : isInsightSection(state.view)
              ? renderInsights()
              : state.view === "Clients"
                ? renderClientPortfolioPage()
              : state.view === "Contracts"
                ? renderContractsPage()
              : state.view === "Documents"
                ? renderDocumentsPage()
              : state.view === "Reminders"
                ? renderRemindersPage()
              : state.view === "Reports"
                ? renderReportsPage()
              : state.view === "Membership"
                ? renderMembershipPage(stats, company)
                : renderTracker(records, selected, stats)
          }
        </main>
        ${renderFloatingTools()}
        ${renderQuickSearchOverlay()}
      </div>
    `;
    focusQuickSearch();
  }

  function renderAccountActions() {
    if (isAccessPreviewing()) {
      return `
        <div class="user-pill preview-pill">Previewing ${escapeHtml(state.user.name)} / ${escapeHtml(state.user.role)}</div>
        <button class="secondary-btn preview-exit-btn" type="button" data-action="exit-preview">Exit preview</button>
      `;
    }
    return `
      ${
        canAdmin()
          ? `<button class="ghost-btn admin-membership-btn ${state.view === "Membership" ? "active" : ""}" type="button" data-view="Membership">Membership Model</button>`
          : ""
      }
      <div class="user-pill">${escapeHtml(state.user.name)} / ${escapeHtml(state.user.role)}</div>
      <button class="ghost-btn" type="button" data-action="reset">Reset demo</button>
      <button class="secondary-btn" type="button" data-action="logout">Logout</button>
    `;
  }

  function renderPreviewBanner() {
    if (!isAccessPreviewing()) return "";
    return `
      <section class="preview-banner" aria-label="Access preview mode">
        <div>
          <span>Access preview</span>
          <strong>${escapeHtml(state.previewAdmin.name)} is viewing ${escapeHtml(state.user.name)}'s workspace.</strong>
        </div>
        <p>Navigation, edit rights, and enabled rooms are shown through this user's access profile. Exit preview to return to admin control.</p>
        <button class="mini-btn primary-mini" type="button" data-action="exit-preview">Exit preview</button>
      </section>
    `;
  }

  function renderControlAreaCards(stats) {
    const records = companyRecords();
    const tendering = records.filter((record) => record.type === "Tender" || record.type === "EOI");
    const projects = records.filter((record) => record.type === "Project");
    const cards = [
      {
        view: "Tenders",
        label: "Tendering",
        eyebrow: "EOI and tender control",
        records: tendering.length,
        open: stats.activeTenders,
        note: "Active tendering items",
        value: sumAmounts(tendering),
      },
      {
        view: "Projects",
        label: "Projects",
        eyebrow: "Ongoing project control",
        records: projects.length,
        open: stats.ongoingProjects,
        note: "Ongoing project items",
        value: sumAmounts(projects),
      },
    ];
    return `
      <div class="insight-focus-grid control-focus-grid" aria-label="Tender control room areas">
        ${cards
          .map(
            (card) => `
              <button class="insight-focus-card ${state.view === card.view ? "active" : ""}" type="button" data-view="${escapeHtml(card.view)}">
                <span>${escapeHtml(card.eyebrow)}</span>
                <strong>${escapeHtml(card.label)}</strong>
                <small>${card.records} records / ${card.open} active / ${escapeHtml(formatCompactMoney(card.value))}</small>
                <em>${escapeHtml(card.note)}</em>
              </button>
            `,
          )
          .join("")}
      </div>
    `;
  }

  function isClosedRecord(record) {
    return ["Awarded", "Completed", "Cancelled", "Regret"].includes(record.status);
  }

  function parseRecordDate(value) {
    if (!value) return null;
    const date = new Date(`${value}T00:00:00`);
    return Number.isNaN(date.getTime()) ? null : date;
  }

  function sumAmounts(records) {
    return records.reduce((total, record) => total + (Number(record.valueAmount) || 0), 0);
  }

  function highValueThreshold(records) {
    const values = records
      .map((record) => Number(record.valueAmount) || 0)
      .filter((value) => value > 0)
      .sort((a, b) => b - a);
    if (!values.length) return Number.POSITIVE_INFINITY;
    return values[Math.min(values.length - 1, Math.max(0, Math.floor(values.length * 0.25)))];
  }

  function formatCompactMoney(value) {
    const currency = state.data.company.currency || "AED";
    const amount = Number(value) || 0;
    const abs = Math.abs(amount);
    if (abs >= 1000000000) return `${currency} ${(amount / 1000000000).toFixed(1)}B`;
    if (abs >= 1000000) return `${currency} ${(amount / 1000000).toFixed(1)}M`;
    if (abs >= 1000) return `${currency} ${Math.round(amount / 1000)}K`;
    return `${currency} ${Math.round(amount).toLocaleString("en-US")}`;
  }

  function topBreakdown(records, field, limit = 5, fallback = "Unassigned") {
    const counts = new Map();
    records.forEach((record) => {
      const label = String(record[field] || fallback).trim() || fallback;
      counts.set(label, (counts.get(label) || 0) + 1);
    });
    return Array.from(counts, ([label, value]) => ({ label, value }))
      .sort((a, b) => b.value - a.value || a.label.localeCompare(b.label))
      .slice(0, limit);
  }

  function buildStatusRows(records) {
    const extras = topBreakdown(records, "status", records.length)
      .map((row) => row.label)
      .filter((status) => !STATUS_OPTIONS.includes(status));
    return [...STATUS_OPTIONS, ...extras]
      .map((status) => ({
        label: status,
        value: records.filter((record) => record.status === status).length,
      }))
      .filter((row) => row.value > 0);
  }

  function buildDueBuckets(records) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const buckets = {
      overdue: 0,
      next30: 0,
      next90: 0,
      later: 0,
      noDate: 0,
    };
    records
      .filter((record) => !isClosedRecord(record))
      .forEach((record) => {
        const date = parseRecordDate(record.endDate);
        if (!date) {
          buckets.noDate += 1;
          return;
        }
        const days = Math.ceil((date.getTime() - today.getTime()) / 86400000);
        if (days < 0) buckets.overdue += 1;
        else if (days <= 30) buckets.next30 += 1;
        else if (days <= 90) buckets.next90 += 1;
        else buckets.later += 1;
      });
    return [
      { label: "Past due", value: buckets.overdue, tone: "red" },
      { label: "Next 30 days", value: buckets.next30, tone: "amber" },
      { label: "Next 90 days", value: buckets.next90, tone: "blue" },
      { label: "Later", value: buckets.later, tone: "green" },
      { label: "No date", value: buckets.noDate, tone: "muted" },
    ];
  }

  function intakeRequests() {
    if (!Array.isArray(state.data.intakeRequests)) state.data.intakeRequests = [];
    return state.data.intakeRequests.filter((request) => request.companyId === state.user.companyId);
  }

  function intakeMissingFields(request) {
    const missing = [];
    if (!String(request.reference || "").trim()) missing.push("reference");
    if (!String(request.client || "").trim()) missing.push("client");
    if (!String(request.title || "").trim()) missing.push("title");
    if (!String(request.category || "").trim()) missing.push("category");
    if (!String(request.endDate || "").trim()) missing.push("due date");
    if (!String(request.owner || "").trim()) missing.push("owner");
    return missing;
  }

  function intakeAgeDays(request) {
    const date = new Date(request.createdAt || Date.now());
    if (Number.isNaN(date.getTime())) return 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);
    return Math.max(0, Math.round((today.getTime() - date.getTime()) / 86400000));
  }

  function intakePriority(request) {
    const amount = parseAmount(request.valueText);
    const due = parseRecordDate(request.endDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    let score = 40 + intakeAgeDays(request) * 4;
    if (amount && amount >= highValueThreshold(companyRecords())) score += 25;
    if (due) {
      const days = Math.ceil((due.getTime() - today.getTime()) / 86400000);
      if (days < 0) score += 25;
      else if (days <= 14) score += 16;
      else if (days <= 30) score += 8;
    } else {
      score += 10;
    }
    score -= intakeMissingFields(request).length * 9;
    return Math.max(5, Math.min(99, Math.round(score)));
  }

  function buildIntakeModel() {
    const requests = intakeRequests().sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
    const pending = requests.filter((request) => request.status === "Pending");
    const approved = requests.filter((request) => request.status === "Approved");
    const rework = requests.filter((request) => request.status === "Rework");
    const cleanPending = pending.filter((request) => !intakeMissingFields(request).length);
    const blocked = pending.filter((request) => intakeMissingFields(request).length);
    const convertedValue = approved.reduce((sum, request) => sum + (parseAmount(request.valueText) || 0), 0);
    const pendingValue = pending.reduce((sum, request) => sum + (parseAmount(request.valueText) || 0), 0);
    const oldestPending = pending.reduce((max, request) => Math.max(max, intakeAgeDays(request)), 0);
    const dueSoon = pending.filter((request) => {
      const date = parseRecordDate(request.endDate);
      if (!date) return false;
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const days = Math.ceil((date.getTime() - today.getTime()) / 86400000);
      return days <= 30;
    }).length;
    const readiness = pending.length ? Math.round((cleanPending.length / pending.length) * 100) : 100;
    const score = Math.max(0, Math.min(100, Math.round(readiness * 0.55 + Math.max(0, 100 - oldestPending * 8) * 0.25 + Math.max(0, 100 - rework.length * 15) * 0.2)));
    return {
      requests,
      pending,
      approved,
      rework,
      cleanPending,
      blocked,
      pendingValue,
      convertedValue,
      oldestPending,
      dueSoon,
      readiness,
      score,
      channelRows: topRequestBreakdown(requests, "channel", 6, "Manual request"),
      typeRows: topRequestBreakdown(requests, "type", 4, "Tender"),
      statusRows: topRequestBreakdown(requests, "status", 5, "Pending"),
      ownerRows: topRequestBreakdown(requests, "owner", 6, "Unassigned"),
      priorityRows: pending
        .map((request) => ({ request, score: intakePriority(request), missing: intakeMissingFields(request) }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 8),
    };
  }

  function topRequestBreakdown(requests, field, limit = 5, fallback = "Unassigned") {
    const counts = new Map();
    requests.forEach((request) => {
      const label = String(request[field] || fallback).trim() || fallback;
      counts.set(label, (counts.get(label) || 0) + 1);
    });
    return Array.from(counts, ([label, value]) => ({ label, value }))
      .sort((a, b) => b.value - a.value || a.label.localeCompare(b.label))
      .slice(0, limit);
  }

  function ensureBidStores() {
    if (!state.data.bidDecisions || typeof state.data.bidDecisions !== "object") state.data.bidDecisions = {};
    if (!state.data.submissionReady || typeof state.data.submissionReady !== "object") state.data.submissionReady = {};
  }

  function bidDecisionFor(record) {
    ensureBidStores();
    return state.data.bidDecisions[record.id] || { decision: "Watch", by: "", at: "" };
  }

  function bidChecklistFor(record) {
    const amount = Number(record.valueAmount) || 0;
    const decision = bidDecisionFor(record).decision;
    return [
      { label: "Reference", passed: Boolean(record.reference), note: record.reference || "Missing reference" },
      { label: "Client", passed: Boolean(record.client), note: record.client || "Missing client" },
      { label: "Scope title", passed: Boolean(record.title), note: record.title || "Missing scope title" },
      { label: "Category", passed: Boolean(record.category), note: record.category || "Missing category" },
      { label: "Due date", passed: Boolean(record.endDate), note: record.endDate ? formatDate(record.endDate) : "No due date" },
      { label: "Value", passed: amount > 0, note: amount > 0 ? formatCompactMoney(amount) : "No value" },
      { label: "Owner", passed: Boolean(record.owner), note: record.owner || "No owner" },
      { label: "Source proof", passed: Boolean(record.sourceSheet || record.sourceWorkbook), note: record.sourceSheet || record.sourceWorkbook || "No source" },
      { label: "Decision", passed: decision === "Bid" || decision === "No-bid", note: decision },
    ];
  }

  function bidReadinessFor(record) {
    const checks = bidChecklistFor(record);
    return Math.round((checks.filter((item) => item.passed).length / checks.length) * 100);
  }

  function buildBidDeskModel() {
    ensureBidStores();
    const tenderRecords = sectionRecords("Tenders").filter((record) => !isClosedRecord(record));
    const rows = tenderRecords
      .map((record) => {
        const decision = bidDecisionFor(record);
        const readiness = bidReadinessFor(record);
        const date = parseRecordDate(record.endDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const dueDays = date ? Math.ceil((date.getTime() - today.getTime()) / 86400000) : null;
        const ready = Boolean(state.data.submissionReady[record.id]);
        const amount = Number(record.valueAmount) || 0;
        const checklist = bidChecklistFor(record);
        const pressure =
          dueDays === null ? 18 : dueDays < 0 ? 45 : dueDays <= 7 ? 38 : dueDays <= 14 ? 28 : dueDays <= 30 ? 16 : 8;
        const priority = Math.max(1, Math.min(100, Math.round(pressure + (100 - readiness) * 0.45 + (amount > 0 ? 8 : 0))));
        return { record, decision, readiness, dueDays, ready, amount, checklist, priority };
      })
      .sort((a, b) => {
        const aDue = a.dueDays === null ? 9999 : a.dueDays;
        const bDue = b.dueDays === null ? 9999 : b.dueDays;
        return b.priority - a.priority || aDue - bDue;
      });
    const readyRows = rows.filter((row) => row.ready);
    const bidRows = rows.filter((row) => row.decision.decision === "Bid");
    const watchRows = rows.filter((row) => row.decision.decision === "Watch");
    const noBidRows = rows.filter((row) => row.decision.decision === "No-bid");
    const due14 = rows.filter((row) => row.dueDays !== null && row.dueDays <= 14).length;
    const missingRows = rows.filter((row) => row.readiness < 78);
    const totalReadiness = rows.length ? Math.round(rows.reduce((sum, row) => sum + row.readiness, 0) / rows.length) : 100;
    return {
      activeRows: rows,
      readyRows,
      bidRows,
      watchRows,
      noBidRows,
      due14,
      missingRows,
      totalReadiness,
      bidValue: sumAmounts(bidRows.map((row) => row.record)),
      readyValue: sumAmounts(readyRows.map((row) => row.record)),
      dueRows: rows.filter((row) => row.dueDays !== null && row.dueDays <= 30).slice(0, 8),
      packRows: rows.slice(0, 10),
      categoryRows: topBreakdown(rows.map((row) => row.record), "category", 6, "Uncategorized"),
      clientRows: topBreakdown(rows.map((row) => row.record), "client", 6, "No client"),
      decisionRows: [
        { label: "Bid", value: bidRows.length },
        { label: "Watch", value: watchRows.length },
        { label: "No-bid", value: noBidRows.length },
        { label: "Pack ready", value: readyRows.length },
      ],
    };
  }

  function setBidDecision(id, decision) {
    if (!canEdit()) return;
    ensureBidStores();
    const record = state.data.records.find((item) => item.id === id && item.companyId === state.user.companyId);
    if (!record || !["Bid", "Watch", "No-bid"].includes(decision)) return;
    state.data.bidDecisions[id] = {
      decision,
      by: state.user.name,
      at: new Date().toISOString(),
    };
    writeAudit("Bid decision", record.reference || record.title || "Tender", `Decision set to ${decision}.`, id, decision === "No-bid" ? "red" : decision === "Bid" ? "green" : "amber");
    persistData();
    render();
  }

  function toggleSubmissionReady(id) {
    if (!canEdit()) return;
    ensureBidStores();
    const record = state.data.records.find((item) => item.id === id && item.companyId === state.user.companyId);
    if (!record) return;
    const next = !state.data.submissionReady[id];
    if (next) state.data.submissionReady[id] = { by: state.user.name, at: new Date().toISOString() };
    else delete state.data.submissionReady[id];
    writeAudit("Submission pack", record.reference || record.title || "Tender", next ? "Marked submission pack ready." : "Cleared submission pack ready flag.", id, next ? "green" : "amber");
    persistData();
    render();
  }

  function buildImportStudioModel() {
    const records = companyRecords();
    const coverageFields = [
      ["reference", "Reference"],
      ["client", "Client"],
      ["title", "Title"],
      ["category", "Category"],
      ["status", "Status"],
      ["endDate", "Due / last date"],
      ["valueAmount", "Value"],
      ["owner", "Owner"],
      ["sourceWorkbook", "Source workbook"],
      ["sourceSheet", "Source sheet"],
    ];
    const coverageRows = coverageFields.map(([field, label]) => {
      const filled = records.filter((record) => {
        if (field === "valueAmount") return Number(record.valueAmount) > 0;
        return Boolean(String(record[field] || "").trim());
      }).length;
      return {
        field,
        label,
        filled,
        total: records.length,
        rate: records.length ? Math.round((filled / records.length) * 100) : 100,
      };
    });
    const totalSlots = coverageRows.reduce((sum, row) => sum + row.total, 0);
    const filledSlots = coverageRows.reduce((sum, row) => sum + row.filled, 0);
    const sourceRows = topBreakdown(records, "sourceWorkbook", 6, "Manual entry");
    const sheetRows = topBreakdown(records, "sourceSheet", 8, "Manual entry");
    const sourceWorkbooks = new Set(
      records
        .map((record) => String(record.sourceWorkbook || "").trim())
        .filter((label) => label && label !== "Manual entry"),
    ).size;
    const manualEntries = records.filter(
      (record) => !record.sourceWorkbook || record.sourceWorkbook === "Manual entry" || !record.sourceSheet,
    ).length;
    const duplicateMap = new Map();
    records.forEach((record) => {
      const key = normalize(record.reference);
      if (!key) return;
      if (!duplicateMap.has(key)) duplicateMap.set(key, []);
      duplicateMap.get(key).push(record);
    });
    const duplicateGroups = Array.from(duplicateMap.values())
      .filter((group) => group.length > 1)
      .map((group) => ({
        reference: group[0].reference || "No reference",
        count: group.length,
        clients: Array.from(new Set(group.map((record) => record.client).filter(Boolean))).slice(0, 3),
      }))
      .slice(0, 8);
    const missingRecords = records
      .map((record) => {
        const gaps = [];
        if (!record.reference) gaps.push("reference");
        if (!record.client) gaps.push("client");
        if (!record.title) gaps.push("title");
        if (!record.status) gaps.push("status");
        if (!record.endDate) gaps.push("date");
        if (!Number(record.valueAmount)) gaps.push("value");
        if (!record.sourceSheet) gaps.push("source");
        return { record, gaps };
      })
      .filter((item) => item.gaps.length);
    return {
      records,
      coverageRows,
      fieldCoverage: totalSlots ? Math.round((filledSlots / totalSlots) * 100) : 100,
      sourceRows,
      sheetRows,
      sourceWorkbooks,
      manualEntries,
      duplicateGroups,
      duplicateCount: duplicateGroups.reduce((sum, group) => sum + group.count, 0),
      missingRecords: missingRecords.slice(0, 8),
      missingCount: missingRecords.length,
      issueCount: duplicateGroups.length + missingRecords.length + manualEntries,
      preview: state.importPreview,
    };
  }

  function sampleImportCsv() {
    return [
      IMPORT_COLUMNS.join(","),
      [
        "Tender",
        "CSV-TDR-001",
        "ADNOC Gas",
        "Imported tender demo row",
        "Digital & Telecom",
        "Active",
        "2026-05-12",
        "2026-06-30",
        "AED 1250000",
        "Commercial",
        "CSV Pilot",
      ].map(csvCell).join(","),
      [
        "Project",
        "CSV-PRJ-001",
        "ADNOC HQ",
        "Imported project demo row",
        "Software",
        "Ongoing",
        "2026-05-12",
        "2026-12-31",
        "AED 450000",
        "Operations",
        "CSV Pilot",
      ].map(csvCell).join(","),
    ].join("\n");
  }

  function csvCell(value) {
    return `"${String(value ?? "").replaceAll('"', '""')}"`;
  }

  function parseDelimitedRows(text) {
    const firstLine = String(text || "").split(/\r?\n/).find((line) => line.trim()) || "";
    const delimiter = firstLine.includes("\t") && !firstLine.includes(",") ? "\t" : ",";
    const rows = [];
    let row = [];
    let cell = "";
    let inQuotes = false;
    const source = String(text || "");
    for (let index = 0; index < source.length; index += 1) {
      const char = source[index];
      const next = source[index + 1];
      if (char === '"') {
        if (inQuotes && next === '"') {
          cell += '"';
          index += 1;
        } else {
          inQuotes = !inQuotes;
        }
        continue;
      }
      if (char === delimiter && !inQuotes) {
        row.push(cell);
        cell = "";
        continue;
      }
      if ((char === "\n" || char === "\r") && !inQuotes) {
        if (char === "\r" && next === "\n") index += 1;
        row.push(cell);
        rows.push(row);
        row = [];
        cell = "";
        continue;
      }
      cell += char;
    }
    row.push(cell);
    rows.push(row);
    return rows.filter((item) => item.some((value) => String(value || "").trim()));
  }

  function normalizeImportHeader(header) {
    const key = normalize(header).replace(/[^a-z0-9]/g, "");
    const aliases = {
      type: "type",
      recordtype: "type",
      module: "type",
      reference: "reference",
      ref: "reference",
      refno: "reference",
      tenderno: "reference",
      opportunityno: "reference",
      agreementno: "agreementNo",
      contractno: "agreementNo",
      client: "client",
      customer: "client",
      account: "client",
      clientgroup: "clientGroup",
      group: "clientGroup",
      title: "title",
      description: "title",
      projectname: "title",
      tendername: "title",
      scope: "title",
      category: "category",
      discipline: "category",
      department: "department",
      status: "status",
      stage: "status",
      startdate: "startDate",
      start: "startDate",
      receiveddate: "startDate",
      enddate: "endDate",
      duedate: "endDate",
      due: "endDate",
      lastdate: "endDate",
      closingdate: "endDate",
      valuetext: "valueText",
      value: "valueText",
      amount: "valueText",
      tenderamount: "valueText",
      projectvalue: "valueText",
      currency: "currency",
      owner: "owner",
      responsible: "owner",
      assignee: "owner",
      latestactivity: "latestActivity",
      activity: "latestActivity",
      notes: "notes",
      sourcesheet: "sourceSheet",
      sheet: "sourceSheet",
      sourceworkbook: "sourceWorkbook",
      workbook: "sourceWorkbook",
      file: "sourceWorkbook",
    };
    return aliases[key] || "";
  }

  function normalizeImportType(value) {
    const key = normalize(value).replace(/[^a-z0-9]/g, "");
    if (key === "eoi" || key === "expressionofinterest") return "EOI";
    if (key === "project" || key === "projects") return "Project";
    if (key === "tender" || key === "bid" || key === "opportunity") return "Tender";
    return "Tender";
  }

  function normalizeImportStatus(value, type) {
    const raw = normalize(value);
    const exact = STATUS_OPTIONS.find((status) => normalize(status) === raw);
    if (exact) return exact;
    const key = raw.replace(/[^a-z0-9]/g, "");
    if (["won", "award", "awarded", "loa", "loareceived"].includes(key)) return "Awarded";
    if (["closed", "complete", "completed", "done", "delivered"].includes(key)) return "Completed";
    if (["cancel", "cancelled", "canceled"].includes(key)) return "Cancelled";
    if (["lost", "regret", "declined"].includes(key)) return "Regret";
    if (["submitted", "sent"].includes(key)) return "Submitted";
    if (["pending", "hold", "onhold"].includes(key)) return "Pending";
    if (["ongoing", "inprogress", "live"].includes(key)) return "Ongoing";
    return type === "Project" ? "Ongoing" : "Active";
  }

  function coerceImportDate(value) {
    const text = String(value || "").trim();
    if (!text) return "";
    if (/^\d{4}-\d{2}-\d{2}$/.test(text)) return text;
    const numeric = text.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{2,4})$/);
    if (numeric) {
      const day = Number(numeric[1]);
      const month = Number(numeric[2]);
      const year = Number(numeric[3].length === 2 ? `20${numeric[3]}` : numeric[3]);
      const date = new Date(year, month - 1, day);
      if (!Number.isNaN(date.getTime())) return formatDateForInput(date);
    }
    const parsed = new Date(text);
    return Number.isNaN(parsed.getTime()) ? "" : formatDateForInput(parsed);
  }

  function formatDateForInput(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function buildImportPreview(text) {
    const source = String(text || "").trim();
    if (!source) {
      return {
        rows: [],
        headers: [],
        rawCount: 0,
        validCount: 0,
        issueCount: 0,
        errors: ["Paste CSV or Excel-copied rows first."],
      };
    }
    const parsedRows = parseDelimitedRows(source);
    if (parsedRows.length < 2) {
      return {
        rows: [],
        headers: parsedRows[0] || [],
        rawCount: 0,
        validCount: 0,
        issueCount: 0,
        errors: ["At least one header row and one data row are required."],
      };
    }
    const headers = parsedRows[0].map(normalizeImportHeader);
    if (!headers.some(Boolean)) {
      return {
        rows: [],
        headers: parsedRows[0],
        rawCount: parsedRows.length - 1,
        validCount: 0,
        issueCount: 0,
        errors: ["No recognized column headers found. Download the template and match its headings."],
      };
    }
    const existingReferences = new Set(companyRecords().map((record) => normalize(record.reference)).filter(Boolean));
    const importedReferences = new Set();
    const previewRows = parsedRows.slice(1).map((values, index) => {
      const raw = {};
      headers.forEach((header, columnIndex) => {
        if (header) raw[header] = String(values[columnIndex] || "").trim();
      });
      const type = normalizeImportType(raw.type);
      const status = normalizeImportStatus(raw.status, type);
      const reference = raw.reference || raw.agreementNo || "";
      const duplicateKey = normalize(reference);
      const issues = [];
      if (!reference) issues.push("Missing reference");
      if (!raw.client) issues.push("Missing client");
      if (!raw.title) issues.push("Missing title");
      if (duplicateKey && existingReferences.has(duplicateKey)) issues.push("Duplicate existing reference");
      if (duplicateKey && importedReferences.has(duplicateKey)) issues.push("Duplicate in import");
      if (duplicateKey) importedReferences.add(duplicateKey);
      const valueText = raw.valueText || "";
      const valueAmount = parseAmount(valueText);
      const record = {
        id: `PREVIEW-${index + 1}`,
        companyId: state.user.companyId,
        type,
        category: raw.category || (type === "Project" ? "Software" : "Digital & Telecom"),
        department: raw.department || raw.category || "",
        reference,
        clientGroup: raw.clientGroup || raw.client || "",
        client: raw.client || "",
        title: raw.title || "",
        status,
        startDate: coerceImportDate(raw.startDate),
        endDate: coerceImportDate(raw.endDate),
        valueText,
        valueAmount,
        currency: raw.currency || state.data.company.currency || "AED",
        owner: raw.owner || state.user.name,
        latestActivity: raw.latestActivity || "Imported through Import Studio",
        notes: raw.notes || "",
        agreementNo: raw.agreementNo || (type === "Project" ? reference : ""),
        loaReceived: "",
        agreementReceived: "",
        sourceWorkbook: raw.sourceWorkbook || "CSV Import Studio",
        sourceSheet: raw.sourceSheet || "CSV import",
        rounds: [],
      };
      return { rowNumber: index + 2, record, issues };
    }).filter((item) => item.record.reference || item.record.client || item.record.title);
    const issueCount = previewRows.reduce((sum, row) => sum + row.issues.length, 0);
    return {
      rows: previewRows,
      headers,
      rawCount: parsedRows.length - 1,
      validCount: previewRows.filter((row) => !row.issues.length).length,
      issueCount,
      errors: [],
    };
  }

  function previewImportText() {
    const input = document.getElementById("importCsvText");
    state.importText = input ? input.value : state.importText;
    state.importPreview = buildImportPreview(state.importText);
    const preview = state.importPreview;
    state.importMessage = preview.errors.length
      ? preview.errors[0]
      : `${preview.validCount} clean rows ready, ${preview.issueCount} issue${preview.issueCount === 1 ? "" : "s"} flagged.`;
    render();
  }

  function loadImportSample() {
    state.importText = sampleImportCsv();
    state.importPreview = null;
    state.importMessage = "Sample import rows loaded. Preview them before committing.";
    render();
  }

  function clearImportStudio() {
    state.importText = "";
    state.importPreview = null;
    state.importMessage = "";
    render();
  }

  function commitImportRows() {
    if (!canEdit()) return;
    const preview = state.importPreview || buildImportPreview(state.importText);
    const cleanRows = preview.rows.filter((row) => !row.issues.length);
    if (!cleanRows.length) {
      window.alert("No clean rows are ready to import.");
      return;
    }
    const stamp = Date.now();
    const records = cleanRows.map((row, index) => ({
      ...row.record,
      id: `IMP-${stamp}-${String(index + 1).padStart(3, "0")}`,
    }));
    state.data.records = [...records, ...state.data.records];
    state.selectedId = records[0].id;
    state.importText = "";
    state.importPreview = null;
    state.importMessage = `${records.length} row${records.length === 1 ? "" : "s"} imported into the live workspace.`;
    writeAudit("Import committed", `${records.length} CSV rows`, `${records.length} clean rows imported through Import Studio.`, records[0].id, "green");
    persistData();
    render();
  }

  function downloadImportTemplate() {
    const blob = new Blob([`${IMPORT_COLUMNS.join(",")}\n`], { type: "text/csv;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "pursuitdesk-import-template.csv";
    link.click();
    URL.revokeObjectURL(link.href);
  }

  function readImportFile(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      state.importText = String(reader.result || "");
      state.importPreview = null;
      state.importMessage = `${file.name} loaded. Preview it before committing.`;
      render();
    };
    reader.readAsText(file);
  }

  function ensureGovernanceStores() {
    if (!Array.isArray(state.data.audit)) state.data.audit = [];
    if (!state.data.governanceReviews || typeof state.data.governanceReviews !== "object") {
      state.data.governanceReviews = {};
    }
  }

  function writeAudit(action, target, detail, recordId = "", tone = "teal") {
    if (!state.user) return;
    ensureGovernanceStores();
    state.data.audit.unshift({
      id: `AUD-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
      companyId: state.user.companyId,
      ts: new Date().toISOString(),
      actorId: state.user.id,
      actor: state.user.name,
      role: state.user.role,
      action,
      target,
      detail,
      recordId,
      tone,
    });
    state.data.audit = state.data.audit.slice(0, 300);
  }

  function auditFieldLabel(field) {
    const labels = {
      type: "Type",
      reference: "Reference",
      client: "Client",
      title: "Title",
      category: "Category",
      status: "Status",
      startDate: "Start date",
      endDate: "End date",
      valueText: "Value",
      owner: "Owner",
      agreementNo: "Agreement no",
      sourceSheet: "Source sheet",
    };
    return labels[field] || field;
  }

  function shortAuditValue(value) {
    const text = String(value ?? "").trim();
    if (!text) return "blank";
    return text.length > 42 ? `${text.slice(0, 39)}...` : text;
  }

  function reviewSignalsForRecord(record, floor = highValueThreshold(companyRecords())) {
    const amount = Number(record.valueAmount) || 0;
    const reasons = [];
    if (amount >= floor && amount > 0) reasons.push("High value");
    if (["Awarded", "Completed"].includes(record.status) && !record.agreementNo) reasons.push("Agreement gap");
    if (record.status === "Submitted" && (record.rounds || []).length > 0) reasons.push("Negotiated submission");
    if (!record.sourceSheet || !record.sourceWorkbook) reasons.push("Source gap");
    return reasons;
  }

  function buildDataArchitectureModel(records, users) {
    const total = Math.max(records.length, 1);
    const operationalReady = records.filter((record) =>
      Boolean(record.reference && record.client && record.title && record.status && record.category && record.owner && record.endDate),
    ).length;
    const commercialReady = records.filter((record) =>
      Boolean(Number(record.valueAmount) > 0 || record.valueText || record.agreementNo || record.loaReceived || record.agreementReceived || (record.rounds || []).length),
    ).length;
    const evidenceReady = records.filter((record) => record.sourceWorkbook && record.sourceSheet).length;
    const commercialUsers = users.filter(userHasCommercialAccess).length;
    const governanceUsers = users.filter(userHasGovernanceAccess).length;
    const operationUsers = users.filter((user) => {
      const access = normalizeUserAccess(user);
      return access.includes("tenders") || access.includes("projects");
    }).length;
    const layerCounts = {
      operations: {
        readiness: Math.round((operationalReady / total) * 100),
        count: operationalReady,
        users: operationUsers,
      },
      commercial: {
        readiness: Math.round((commercialReady / total) * 100),
        count: commercialReady,
        users: commercialUsers,
      },
      governance: {
        readiness: Math.round((evidenceReady / total) * 100),
        count: evidenceReady,
        users: governanceUsers,
      },
    };
    const guardRows = [
      {
        label: "Tracker separation",
        value: 100,
        tone: "green",
        note: "Tenders and Projects keep commercial values out of the worklist.",
      },
      {
        label: "Operational readiness",
        value: layerCounts.operations.readiness,
        tone: layerCounts.operations.readiness >= 80 ? "green" : "amber",
        note: `${records.length - operationalReady} records still need core tracker cleanup`,
      },
      {
        label: "Commercial vault coverage",
        value: layerCounts.commercial.readiness,
        tone: layerCounts.commercial.readiness >= 60 ? "teal" : "amber",
        note: `${commercialReady} records carry commercial intelligence fields`,
      },
      {
        label: "Evidence trace",
        value: layerCounts.governance.readiness,
        tone: layerCounts.governance.readiness >= 80 ? "green" : "amber",
        note: `${records.length - evidenceReady} records need source traceability`,
      },
    ];
    const layers = DATA_ARCHITECTURE_LAYERS.map((layer) => ({
      ...layer,
      ...(layerCounts[layer.key] || { readiness: 0, count: 0, users: 0 }),
    }));
    return {
      layers,
      guardRows,
      commercialUsers,
      governanceUsers,
      operationUsers,
    };
  }

  function buildGovernanceModel() {
    ensureGovernanceStores();
    const records = companyRecords();
    const users = state.data.users.filter((user) => user.companyId === state.user.companyId);
    const auditRows = state.data.audit
      .filter((entry) => entry.companyId === state.user.companyId)
      .sort((a, b) => new Date(b.ts).getTime() - new Date(a.ts).getTime())
      .slice(0, 60);
    const floor = highValueThreshold(records);
    const dataArchitecture = buildDataArchitectureModel(records, users);
    const reviewRows = records
      .map((record) => {
        const reasons = reviewSignalsForRecord(record, floor);
        const reviewed = state.data.governanceReviews[record.id] || null;
        return { record, reasons, reviewed };
      })
      .filter((item) => item.reasons.length)
      .sort((a, b) => {
        const aReviewed = a.reviewed ? 1 : 0;
        const bReviewed = b.reviewed ? 1 : 0;
        return aReviewed - bReviewed || (Number(b.record.valueAmount) || 0) - (Number(a.record.valueAmount) || 0);
      });
    const pendingReviews = reviewRows.filter((item) => !item.reviewed);
    const accessRows = users.map((user) => {
      const access = normalizeUserAccess(user);
      return {
        user,
        access,
        auditCount: auditRows.filter((entry) => entry.actorId === user.id).length,
        commercial: userHasCommercialAccess(user),
        governance: userHasGovernanceAccess(user),
      };
    });
    const recordsWithSource = records.filter((record) => record.sourceSheet && record.sourceWorkbook).length;
    const recordsWithOwner = records.filter((record) => record.owner).length;
    const reviewedCount = reviewRows.filter((item) => item.reviewed).length;
    const policyRows = [
      {
        label: "High-value review",
        value: reviewRows.length ? Math.round((reviewedCount / reviewRows.length) * 100) : 100,
        note: `${pendingReviews.length} records awaiting review`,
        tone: pendingReviews.length ? "amber" : "green",
      },
      {
        label: "Source traceability",
        value: records.length ? Math.round((recordsWithSource / records.length) * 100) : 100,
        note: `${records.length - recordsWithSource} records without full source`,
        tone: records.length - recordsWithSource ? "amber" : "green",
      },
      {
        label: "Owner coverage",
        value: records.length ? Math.round((recordsWithOwner / records.length) * 100) : 100,
        note: `${records.length - recordsWithOwner} records without owner`,
        tone: records.length - recordsWithOwner ? "red" : "green",
      },
      {
        label: "Access control",
        value: accessRows.length ? Math.round((accessRows.filter((row) => row.access.length).length / accessRows.length) * 100) : 100,
        note: `${accessRows.filter((row) => row.governance).length} users can open Governance`,
        tone: "teal",
      },
    ];
    const governanceScore = Math.round(policyRows.reduce((sum, row) => sum + row.value, 0) / Math.max(policyRows.length, 1));
    return {
      records,
      users,
      auditRows,
      reviewRows,
      pendingReviews,
      accessRows,
      policyRows,
      governanceScore,
      reviewedCount,
      sourceCoverage: records.length ? Math.round((recordsWithSource / records.length) * 100) : 100,
      ownerCoverage: records.length ? Math.round((recordsWithOwner / records.length) * 100) : 100,
      actorRows: topAuditActors(auditRows, users),
      actionRows: topAuditActions(auditRows),
      dataArchitecture,
    };
  }

  function topAuditActors(auditRows, users) {
    const counts = new Map(users.map((user) => [user.name, 0]));
    auditRows.forEach((entry) => counts.set(entry.actor, (counts.get(entry.actor) || 0) + 1));
    return Array.from(counts, ([label, value]) => ({ label, value }))
      .filter((row) => row.value > 0)
      .sort((a, b) => b.value - a.value || a.label.localeCompare(b.label))
      .slice(0, 6);
  }

  function topAuditActions(auditRows) {
    const counts = new Map();
    auditRows.forEach((entry) => counts.set(entry.action, (counts.get(entry.action) || 0) + 1));
    return Array.from(counts, ([label, value]) => ({ label, value }))
      .sort((a, b) => b.value - a.value || a.label.localeCompare(b.label))
      .slice(0, 6);
  }

  function markGovernanceReviewed(id) {
    if (!canEdit()) return;
    ensureGovernanceStores();
    const record = state.data.records.find((item) => item.id === id);
    if (!record) return;
    state.data.governanceReviews[id] = {
      by: state.user.name,
      at: new Date().toISOString(),
    };
    writeAudit(
      "Governance review",
      record.reference || record.title || "Record reviewed",
      "Marked high-value or policy-sensitive record as reviewed.",
      id,
      "green",
    );
    persistData();
    render();
  }

  function insightRecords() {
    const records = companyRecords();
    const lens = state.insightLens || "Tendering";
    if (lens === "All") return records;
    if (lens === "Open") return records.filter((record) => !isClosedRecord(record));
    if (lens === "Tendering" || lens === "Tenders") {
      return records.filter((record) => record.type === "Tender" || record.type === "EOI");
    }
    if (lens === "Projects") return records.filter((record) => record.type === "Project");
    if (lens === "High value") {
      const floor = highValueThreshold(records);
      return records.filter((record) => (Number(record.valueAmount) || 0) >= floor);
    }
    return records;
  }

  function recordDueDays(record) {
    const date = parseRecordDate(record.endDate);
    if (!date) return null;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return Math.ceil((date.getTime() - today.getTime()) / 86400000);
  }

  function scoreRecord(record, valueFloor) {
    const amount = Number(record.valueAmount) || 0;
    const days = recordDueDays(record);
    const hasCore = [
      record.reference,
      record.client,
      record.title,
      record.category,
      record.owner,
      record.endDate,
      amount > 0 ? "value" : "",
    ].filter(Boolean).length;
    let score = 42 + hasCore * 5;
    const reasons = [];
    if (amount >= valueFloor && amount > 0) {
      score += 12;
      reasons.push("High value");
    }
    if ((record.rounds || []).length > 0) {
      score += 8;
      reasons.push("Negotiated");
    }
    if (["Submitted", "Awarded"].includes(record.status)) score += 8;
    if (record.status === "Pending") {
      score -= 5;
      reasons.push("Pending");
    }
    if (days === null) {
      score -= 12;
      reasons.push("No due date");
    } else if (days < 0) {
      score -= 20;
      reasons.push("Past due");
    } else if (days <= 14) {
      score += 3;
      reasons.push("Urgent");
    }
    if (!amount) {
      score -= 7;
      reasons.push("No value");
    }
    if (!record.owner) {
      score -= 8;
      reasons.push("No owner");
    }
    const finalScore = Math.max(5, Math.min(98, Math.round(score)));
    return {
      score: finalScore,
      recommendation: finalScore >= 72 ? "Bid focus" : finalScore >= 52 ? "Watch" : "No-bid review",
      tone: finalScore >= 72 ? "green" : finalScore >= 52 ? "amber" : "red",
      reasons: reasons.slice(0, 3),
      days,
    };
  }

  function buildDecisionRows(records) {
    const floor = highValueThreshold(companyRecords());
    return records
      .filter((record) => !isClosedRecord(record))
      .map((record) => ({ record, ...scoreRecord(record, floor) }))
      .sort((a, b) => {
        const aUrgency = a.days === null ? 9999 : a.days;
        const bUrgency = b.days === null ? 9999 : b.days;
        return a.score - b.score || aUrgency - bUrgency;
      })
      .slice(0, 6);
  }

  function buildComplianceRows(records) {
    const checks = [
      ["Reference", (record) => record.reference],
      ["Client", (record) => record.client],
      ["Tender title", (record) => record.title],
      ["Owner", (record) => record.owner],
      ["Due date", (record) => record.endDate],
      ["Value", (record) => Number(record.valueAmount) > 0],
      ["Status", (record) => record.status],
      ["Category", (record) => record.category],
    ];
    const total = Math.max(records.length, 1);
    return checks.map(([label, getter]) => {
      const ready = records.filter((record) => Boolean(getter(record))).length;
      return { label, value: Math.round((ready / total) * 100), ready };
    });
  }

  function buildRiskMatrix(records) {
    const openRecords = records.filter((record) => !isClosedRecord(record));
    const floor = highValueThreshold(companyRecords());
    const cells = [
      { label: "Urgent value", note: "High value with past or near due date", tone: "red", count: 0 },
      { label: "Clean pursuits", note: "High score and clear ownership", tone: "green", count: 0 },
      { label: "Decision gaps", note: "Missing value, date, or owner", tone: "amber", count: 0 },
      { label: "Monitor", note: "Lower pressure open records", tone: "blue", count: 0 },
    ];
    openRecords.forEach((record) => {
      const amount = Number(record.valueAmount) || 0;
      const days = recordDueDays(record);
      const scored = scoreRecord(record, floor);
      const missing = !record.endDate || !record.owner || !amount;
      if (amount >= floor && (days === null || days <= 30)) cells[0].count += 1;
      else if (scored.score >= 72 && !missing) cells[1].count += 1;
      else if (missing || scored.score < 52) cells[2].count += 1;
      else cells[3].count += 1;
    });
    return cells;
  }

  function buildPlaybookRows() {
    return [
      ["Qualify", "Go/no-go queue", "Live"],
      ["Analyze", "Risk and due-date radar", "Live"],
      ["Compare", "Offer comparison workspace", "Next"],
      ["Clarify", "Supplier/client Q&A log", "Next"],
      ["Submit", "Compliance pack checklist", "Next"],
    ];
  }

  function insightModel(records) {
    const stats = metrics();
    const lens = state.insightLens || "Tendering";
    const openRecords = records.filter((record) => !isClosedRecord(record));
    const tenderRecords = records.filter((record) => record.type === "Tender" || record.type === "EOI");
    const dueBuckets = buildDueBuckets(records);
    const overdue = dueBuckets.find((bucket) => bucket.label === "Past due").value;
    const noDate = dueBuckets.find((bucket) => bucket.label === "No date").value;
    const totalValue = sumAmounts(records);
    const openValue = sumAmounts(openRecords);
    const awardedValue = sumAmounts(records.filter((record) => ["Awarded", "Completed"].includes(record.status)));
    const negotiationRecords = records.filter((record) => (record.rounds || []).length > 0);
    const totalRounds = negotiationRecords.reduce((total, record) => total + (record.rounds || []).length, 0);
    const highValueOpen = openRecords
      .filter((record) => Number(record.valueAmount) > 0)
      .sort((a, b) => Number(b.valueAmount) - Number(a.valueAmount))
      .slice(0, 4);
    const ownerRows = topBreakdown(openRecords, "owner", 5, "Unassigned");
    const topOwner = ownerRows[0] || { label: "No owner", value: 0 };
    const openCount = Math.max(openRecords.length, 1);
    const totalCount = Math.max(records.length, 1);
    const healthScore = Math.max(
      38,
      Math.min(
        94,
        Math.round(
          78 +
            Math.min(10, stats.winProgress / 3) -
            Math.min(28, (overdue / openCount) * 34) -
            Math.min(14, (noDate / openCount) * 16) -
            Math.min(12, (stats.risk / totalCount) * 24),
        ),
      ),
    );
    const funnel =
      lens === "Projects"
        ? [
            { label: "Project universe", value: records.length },
            { label: "Ongoing delivery", value: records.filter((record) => !isClosedRecord(record)).length },
            { label: "Due-date watch", value: overdue + dueBuckets.find((bucket) => bucket.label === "Next 30 days").value },
            {
              label: "Completed or awarded",
              value: records.filter((record) => ["Awarded", "Completed"].includes(record.status)).length,
            },
            {
              label: "Cancelled or regret",
              value: records.filter((record) => ["Regret", "Cancelled"].includes(record.status)).length,
            },
          ]
        : [
            { label: "Tender and EOI universe", value: tenderRecords.length },
            {
              label: "Active attention",
              value: tenderRecords.filter((record) => !isClosedRecord(record)).length,
            },
            { label: "Submitted", value: tenderRecords.filter((record) => record.status === "Submitted").length },
            {
              label: "Awarded or completed",
              value: records.filter((record) => ["Awarded", "Completed"].includes(record.status)).length,
            },
            {
              label: "Regret or cancelled",
              value: records.filter((record) => ["Regret", "Cancelled"].includes(record.status)).length,
            },
          ];
    return {
      stats,
      lens,
      scopedRecords: records.length,
      openRecords: openRecords.length,
      healthScore,
      totalValue,
      openValue,
      awardedValue,
      recordsWithValue: records.filter((record) => Number(record.valueAmount) > 0).length,
      negotiationRecords: negotiationRecords.length,
      averageRounds: negotiationRecords.length ? (totalRounds / negotiationRecords.length).toFixed(1) : "0",
      dueBuckets,
      statusRows: buildStatusRows(records),
      categoryRows: topBreakdown(records, "category", 6, "Uncategorized"),
      clientRows: topBreakdown(records, "client", 6, "No client"),
      ownerRows,
      highValueOpen,
      topOwner,
      funnel,
      decisionRows: buildDecisionRows(records),
      complianceRows: buildComplianceRows(records),
      riskMatrix: buildRiskMatrix(records),
      playbookRows: buildPlaybookRows(),
      actionCards: [
        {
          label: "Date hygiene",
          value: `${overdue + noDate} records`,
          note: "Open items with old or missing end dates should be refreshed before the weekly review.",
        },
        {
          label: "High-value focus",
          value: highValueOpen.length ? formatCompactMoney(highValueOpen[0].valueAmount) : "AED 0",
          note: highValueOpen.length
            ? `${highValueOpen[0].client || "Top client"} is the largest active value in the current data.`
            : "No active record has a captured value yet.",
        },
        {
          label: "Workload owner",
          value: topOwner.label,
          note: `${topOwner.value} open records sit with this owner in the sample workspace.`,
        },
      ],
    };
  }

  function insightAreaSummaries() {
    const records = companyRecords();
    const dueWatchCount = (items) => {
      const due = buildDueBuckets(items);
      return due.find((bucket) => bucket.label === "Past due").value + due.find((bucket) => bucket.label === "Next 30 days").value;
    };
    const tendering = records.filter((record) => record.type === "Tender" || record.type === "EOI");
    const projects = records.filter((record) => record.type === "Project");
    return [
      {
        lens: "Tendering",
        label: "Tendering",
        eyebrow: "EOI and tender pipeline",
        records: tendering.length,
        open: tendering.filter((record) => !isClosedRecord(record)).length,
        value: sumAmounts(tendering),
        dueWatch: dueWatchCount(tendering),
      },
      {
        lens: "Projects",
        label: "Projects",
        eyebrow: "Ongoing delivery control",
        records: projects.length,
        open: projects.filter((record) => !isClosedRecord(record)).length,
        value: sumAmounts(projects),
        dueWatch: dueWatchCount(projects),
      },
    ];
  }

  function renderInsightAreaCards(activeLens) {
    return `
      <div class="insight-focus-grid" aria-label="Insight areas">
        ${insightAreaSummaries()
          .map(
            (area) => `
              <button class="insight-focus-card ${activeLens === area.lens ? "active" : ""}" type="button" data-insight-lens="${escapeHtml(area.lens)}">
                <span>${escapeHtml(area.eyebrow)}</span>
                <strong>${escapeHtml(area.label)}</strong>
                <small>${area.records} records / ${area.open} open / ${escapeHtml(formatCompactMoney(area.value))}</small>
                <em>${area.dueWatch} due-watch items</em>
              </button>
            `,
          )
          .join("")}
      </div>
    `;
  }

  function renderInsights() {
    const activeLens = state.view === "Project Insights" ? "Projects" : "Tendering";
    if (state.insightLens !== activeLens) state.insightLens = activeLens;
    const model = insightModel(insightRecords());
    const isProjectLens = activeLens === "Projects";
    const areaTitle = isProjectLens ? "Project insight" : "Tenders insight";
    const trackerView = isProjectLens ? "Projects" : "Tenders";
    return `
      <section class="insights-layout insights-clean">
        <div class="insight-kpis">
          ${renderInsightKpi("Insight score", `${model.healthScore}/100`, `${areaTitle} readiness`)}
          ${renderInsightKpi("Captured value", formatCompactMoney(model.totalValue), `${model.recordsWithValue} records with value`)}
          ${renderInsightKpi("Open records", `${model.openRecords}`, `${model.scopedRecords} records in ${activeLens.toLowerCase()}`)}
          ${renderInsightKpi("Negotiation depth", `${model.averageRounds} rounds`, `${model.negotiationRecords} records with rounds`)}
        </div>

        <div class="cockpit-grid">
          <article class="info-panel decision-panel">
            <div class="info-head">
              <div>
                <span class="metric-label">${isProjectLens ? "Delivery queue" : "Go / no-go queue"}</span>
                <h3>${isProjectLens ? "Project attention list" : "Decision-ready pursuits"}</h3>
              </div>
              <span>${model.scopedRecords} in view</span>
            </div>
            ${renderDecisionBoard(model.decisionRows)}
          </article>

          <article class="info-panel">
            <div class="info-head">
              <div>
                <span class="metric-label">Risk map</span>
                <h3>Management attention</h3>
              </div>
            </div>
            ${renderRiskMatrix(model.riskMatrix)}
          </article>

          <article class="info-panel">
            <div class="info-head">
              <div>
                <span class="metric-label">${isProjectLens ? "Project hygiene" : "Submission readiness"}</span>
                <h3>Record completeness</h3>
              </div>
            </div>
            ${renderComplianceRows(model.complianceRows)}
          </article>
        </div>

        <div class="infographic-grid">
          <article class="info-panel info-panel-wide">
            <div class="info-head">
              <div>
                <span class="metric-label">${isProjectLens ? "Project flow" : "Opportunity funnel"}</span>
                <h3>${isProjectLens ? "Delivery movement at a glance" : "Bid movement at a glance"}</h3>
              </div>
              <span>${model.scopedRecords} records</span>
            </div>
            ${renderFunnel(model.funnel)}
          </article>

          <article class="info-panel">
            <div class="info-head">
              <div>
                <span class="metric-label">Status mix</span>
                <h3>Where records stand</h3>
              </div>
            </div>
            ${renderRankBars(model.statusRows, "teal")}
          </article>

          <article class="info-panel">
            <div class="info-head">
              <div>
                <span class="metric-label">Due-date radar</span>
                <h3>Follow-up pressure</h3>
              </div>
            </div>
            ${renderDueCards(model.dueBuckets)}
          </article>

          <article class="info-panel">
            <div class="info-head">
              <div>
                <span class="metric-label">Category mix</span>
                <h3>Business concentration</h3>
              </div>
            </div>
            ${renderRankBars(model.categoryRows, "amber")}
          </article>

          <article class="info-panel">
            <div class="info-head">
              <div>
                <span class="metric-label">Client heat</span>
                <h3>Most active clients</h3>
              </div>
            </div>
            ${renderRankBars(model.clientRows, "blue")}
          </article>

          <article class="info-panel">
            <div class="info-head">
              <div>
                <span class="metric-label">Owner load</span>
                <h3>Open work distribution</h3>
              </div>
            </div>
            ${renderRankBars(model.ownerRows, "green")}
          </article>

          <article class="info-panel">
            <div class="info-head">
              <div>
                <span class="metric-label">Value exposure</span>
                <h3>Largest open records</h3>
              </div>
            </div>
            ${renderValueList(model.highValueOpen)}
          </article>
        </div>

        <div class="action-grid">
          ${model.actionCards
            .map(
              (card) => `
                <article class="action-card">
                  <span class="metric-label">${escapeHtml(card.label)}</span>
                  <strong>${escapeHtml(card.value)}</strong>
                  <p>${escapeHtml(card.note)}</p>
                </article>
              `,
            )
            .join("")}
          <article class="action-card action-card-buttons">
            <span class="metric-label">Board output</span>
            <strong>${escapeHtml(areaTitle)}</strong>
            <div class="action-buttons">
              <button class="secondary-btn" type="button" data-action="export-insights">Export pack</button>
              <button class="ghost-btn" type="button" data-view="${trackerView}">Open tracker</button>
            </div>
          </article>
        </div>
      </section>
    `;
  }

  function buildCommandCenterModel() {
    const records = companyRecords();
    const tenderRecords = sectionRecords("Tenders");
    const projectRecords = sectionRecords("Projects");
    const tenderMetrics = sectionMetrics(tenderRecords);
    const projectMetrics = sectionMetrics(projectRecords);
    const reminders = buildReminderModel();
    const documents = buildDocumentsModel();
    const contracts = buildContractsModel();
    const portfolio = buildClientPortfolioModel();
    const intake = buildIntakeModel();
    const importStudio = buildImportStudioModel();
    const governance = buildGovernanceModel();
    const bidDesk = buildBidDeskModel();
    const calendar = buildReviewCalendarModel();
    const risk = buildRiskControlModel();
    const advisor = buildPursuitAdvisorModel();
    const weeklyReview = buildWeeklyReviewModel();
    const openRecords = records.filter((record) => !isClosedRecord(record));
    const closedGood = records.filter((record) => ["Awarded", "Completed"].includes(record.status)).length;
    const closedBad = records.filter((record) => ["Cancelled", "Regret"].includes(record.status)).length;
    const closedTotal = closedGood + closedBad;
    const winRate = closedTotal ? Math.round((closedGood / closedTotal) * 100) : 0;
    const actionScore = Math.max(0, 100 - Math.min(75, reminders.overdue * 8 + reminders.next30 * 2 + reminders.missingData));
    const evidencePenalty = Math.round((documents.totalGaps / Math.max(documents.packs.length, 1)) * 35);
    const evidenceScore = Math.max(0, Math.min(100, documents.sourceCoverage - evidencePenalty));
    const contractScore = contracts.records.length
      ? Math.max(0, Math.round(((contracts.records.length - contracts.gapCount) / contracts.records.length) * 100))
      : 100;
    const outcomeScore = winRate || (openRecords.length ? 62 : 100);
    const healthScore = Math.round(actionScore * 0.3 + evidenceScore * 0.25 + contractScore * 0.25 + outcomeScore * 0.2);
    const topOpenValues = openRecords
      .filter((record) => Number(record.valueAmount) > 0)
      .sort((a, b) => Number(b.valueAmount) - Number(a.valueAmount))
      .slice(0, 6);
    const moduleCards = [
      {
        label: "Advisor",
        view: "Advisor",
        value: `${advisor.advisorScore}%`,
        note: `${advisor.doNow.length} do-now / ${advisor.recommendations.length} recommendations`,
        signal: `${formatCompactMoney(advisor.recommendationValue)} touched`,
        tone: "green",
      },
      {
        label: "Weekly Review",
        view: "Weekly Review",
        value: `${weeklyReview.reviewScore}%`,
        note: `${weeklyReview.actionRegister.length} actions / ${weeklyReview.agenda.length} agenda blocks`,
        signal: `${formatCompactMoney(weeklyReview.reviewValue)} in review`,
        tone: "teal",
      },
      {
        label: "Bid Desk",
        view: "Bid Desk",
        value: bidDesk.activeRows.length,
        note: `${bidDesk.readyRows.length} ready / ${bidDesk.due14} due soon`,
        signal: `${bidDesk.bidRows.length} bid decisions`,
        tone: "blue",
      },
      {
        label: "Calendar",
        view: "Calendar",
        value: calendar.next30.length,
        note: `${calendar.overdue.length} overdue / ${calendar.noDate.length} no-date`,
        signal: `${calendar.focusScore}% focus score`,
        tone: "amber",
      },
      {
        label: "Risk",
        view: "Risk",
        value: `${risk.controlScore}%`,
        note: `${risk.critical.length} critical / ${risk.high.length} high`,
        signal: `${formatCompactMoney(risk.riskExposure)} exposure`,
        tone: "red",
      },
      {
        label: "Intake",
        view: "Intake",
        value: intake.pending.length,
        note: `${intake.cleanPending.length} ready / ${formatCompactMoney(intake.pendingValue)} pending`,
        signal: `${intake.rework.length} rework items`,
        tone: "teal",
      },
      {
        label: "Import",
        view: "Import",
        value: `${importStudio.fieldCoverage}%`,
        note: `${importStudio.sourceWorkbooks} source workbooks / ${importStudio.manualEntries} manual rows`,
        signal: `${importStudio.issueCount} import issues`,
        tone: "amber",
      },
      {
        label: "Governance",
        view: "Governance",
        value: `${governance.governanceScore}%`,
        note: `${governance.pendingReviews.length} pending reviews`,
        signal: `${governance.auditRows.length} audit entries`,
        tone: "green",
      },
      {
        label: "Tenders",
        view: "Tenders",
        value: tenderMetrics.total,
        note: `${tenderMetrics.open} open / ${formatCompactMoney(tenderMetrics.value)}`,
        signal: `${tenderMetrics.awarded} awarded`,
        tone: "teal",
      },
      {
        label: "Projects",
        view: "Projects",
        value: projectMetrics.total,
        note: `${projectMetrics.open} open / ${formatCompactMoney(projectMetrics.value)}`,
        signal: `${projectMetrics.dueWatch} due-watch`,
        tone: "blue",
      },
      {
        label: "Forecast",
        view: "Forecast",
        value: formatCompactMoney(buildForecastModel().weightedValue),
        note: "Weighted forward pipeline",
        signal: "Scenario view",
        tone: "green",
      },
      {
        label: "Clients",
        view: "Clients",
        value: portfolio.accounts.length,
        note: `${portfolio.activeAccounts} active accounts`,
        signal: `${portfolio.dueWatch} relationship moves`,
        tone: "green",
      },
      {
        label: "Contracts",
        view: "Contracts",
        value: contracts.records.length,
        note: `${contracts.withAgreement} agreement nos`,
        signal: `${contracts.gapCount} commercial gaps`,
        tone: "amber",
      },
      {
        label: "Documents",
        view: "Documents",
        value: documents.packs.length,
        note: `${documents.sourceCoverage}% source coverage`,
        signal: `${documents.totalGaps} evidence gaps`,
        tone: "blue",
      },
      {
        label: "Reminders",
        view: "Reminders",
        value: reminders.tasks.length,
        note: `${reminders.overdue} overdue / ${reminders.next30} near date`,
        signal: `${reminders.highValue} high-value reviews`,
        tone: "red",
      },
      {
        label: "Reports",
        view: "Reports",
        value: winRate ? `${winRate}%` : "Ready",
        note: "Weekly management pack",
        signal: `${topOpenValues.length} open value items`,
        tone: "teal",
      },
    ];
    return {
      records,
      openRecords,
      tenderMetrics,
      projectMetrics,
      reminders,
      documents,
      contracts,
      portfolio,
      calendar,
      risk,
      advisor,
      weeklyReview,
      winRate,
      healthScore,
      actionScore,
      evidenceScore,
      contractScore,
      totalValue: sumAmounts(records),
      topOpenValues,
      priorityTasks: reminders.tasks.slice(0, 6),
      evidenceGaps: documents.gapPacks.slice(0, 6),
      contractGaps: contracts.gaps.slice(0, 6),
      topClients: portfolio.accounts.slice(0, 6),
      moduleCards,
      brief: [
        `${openRecords.length} active records need regular movement across tenders and projects.`,
        `${reminders.tasks.length} generated actions are waiting, led by ${reminders.overdue} overdue and ${reminders.missingData} missing-data items.`,
        `${documents.totalGaps} evidence gaps and ${contracts.gapCount} commercial gaps are visible before management review.`,
        portfolio.accounts[0]
          ? `${portfolio.accounts[0].label} is the hottest account with ${portfolio.accounts[0].openCount} open items.`
          : "Client heat will appear once relationship records exist.",
      ],
    };
  }

  function renderCommandCenterPage() {
    const model = buildCommandCenterModel();
    return `
      <section class="command-center">
        <section class="command-console">
          <div>
            <span class="panel-label">Executive command</span>
            <h2>Run the pursuit business from one morning screen.</h2>
            <p>Start here, clear the pressure, then jump into the room that needs movement. The command center reads from the same records, so every signal stays tied to the actual tender or project.</p>
            <div class="command-actions">
              <button class="secondary-btn" type="button" data-view="Advisor">Open advisor</button>
              <button class="ghost-btn" type="button" data-view="Weekly Review">Open weekly review</button>
              <button class="ghost-btn" type="button" data-view="Documents">Review evidence gaps</button>
            </div>
          </div>
          <div class="score-ring command-score" style="--score: ${model.healthScore}">
            <div>
              <strong>${model.healthScore}</strong>
              <span>Health</span>
            </div>
          </div>
        </section>

        <div class="command-kpis">
          ${renderInsightKpi("Open work", `${model.openRecords.length}`, `${model.records.length} total pursuit and project records`)}
          ${renderInsightKpi("Captured value", formatCompactMoney(model.totalValue), "Tender and project value currently captured")}
          ${renderInsightKpi("Priority actions", `${model.reminders.tasks.length}`, `${model.reminders.overdue} overdue follow-ups`)}
          ${renderInsightKpi("Evidence health", `${model.evidenceScore}%`, `${model.documents.sourceCoverage}% source coverage after gap penalty`)}
        </div>

        <div class="command-layout">
          <section class="command-main">
            <div class="info-head command-main-head">
              <div>
                <span class="metric-label">Operating rooms</span>
                <h3>Module cockpit</h3>
              </div>
              <span>${model.moduleCards.length} rooms</span>
            </div>
            <div class="command-module-grid">
              ${model.moduleCards.map(renderCommandModuleCard).join("")}
            </div>
            ${renderCommandPulse(model)}

            <div class="command-analytics-grid">
              <article class="info-panel">
                <div class="info-head">
                  <div>
                    <span class="metric-label">Evidence control</span>
                    <h3>Document gaps</h3>
                  </div>
                </div>
                ${renderCommandEvidenceList(model.evidenceGaps)}
              </article>

              <article class="info-panel">
                <div class="info-head">
                  <div>
                    <span class="metric-label">Commercial movement</span>
                    <h3>Contract gaps</h3>
                  </div>
                </div>
                ${renderCommandContractList(model.contractGaps)}
              </article>

              <article class="info-panel">
                <div class="info-head">
                  <div>
                    <span class="metric-label">Client heat</span>
                    <h3>Relationship pressure</h3>
                  </div>
                </div>
                ${renderCommandClientList(model.topClients)}
              </article>

              <article class="info-panel">
                <div class="info-head">
                  <div>
                    <span class="metric-label">Value exposure</span>
                    <h3>Largest open values</h3>
                  </div>
                </div>
                ${renderCommandValueList(model.topOpenValues)}
              </article>

              <article class="info-panel command-rhythm-panel">
                <div class="info-head">
                  <div>
                    <span class="metric-label">Operating rhythm</span>
                    <h3>Daily control loop</h3>
                  </div>
                </div>
                ${renderCommandRhythm()}
              </article>
            </div>
          </section>

          <aside class="command-side">
            <article class="info-panel">
              <div class="info-head">
                <div>
                  <span class="metric-label">Today first</span>
                  <h3>Priority queue</h3>
                </div>
                <span>${model.priorityTasks.length} shown</span>
              </div>
              ${renderCommandTaskList(model.priorityTasks)}
            </article>

            <article class="info-panel">
              <div class="info-head">
                <div>
                  <span class="metric-label">Management brief</span>
                  <h3>What to say in review</h3>
                </div>
              </div>
              ${renderCommandBrief(model.brief)}
            </article>

            <article class="info-panel">
              <div class="info-head">
                <div>
                  <span class="metric-label">Visual standard</span>
                  <h3>Signal legend</h3>
                </div>
              </div>
              ${renderSignalLegend()}
            </article>
          </aside>
        </div>
      </section>
    `;
  }

  function renderCommandModuleCard(card) {
    const enabled = canAccessView(card.view);
    return `
      <button class="command-module-card tone-${escapeHtml(card.tone)}" type="button" data-view="${escapeHtml(card.view)}" ${enabled ? "" : "disabled"}>
        <span>${escapeHtml(card.label)}</span>
        <strong>${escapeHtml(card.value)}</strong>
        <small>${escapeHtml(card.note)}</small>
        <em>${escapeHtml(card.signal)}</em>
      </button>
    `;
  }

  function renderCommandPulse(model) {
    const rows = [
      ["Action pulse", `${model.actionScore}%`, `${model.reminders.overdue} overdue / ${model.reminders.next30} near-date`],
      ["Evidence pulse", `${model.evidenceScore}%`, `${model.documents.totalGaps} document gaps`],
      ["Contract pulse", `${model.contractScore}%`, `${model.contracts.gapCount} commercial gaps`],
      ["Outcome pulse", model.winRate ? `${model.winRate}%` : "Live", "Closed success signal"],
    ];
    return `
      <div class="command-pulse-grid">
        ${rows
          .map(
            ([label, value, note]) => `
              <div>
                <span>${escapeHtml(label)}</span>
                <strong>${escapeHtml(value)}</strong>
                <small>${escapeHtml(note)}</small>
              </div>
            `,
          )
          .join("")}
      </div>
    `;
  }

  function renderCommandTaskList(tasks) {
    if (!tasks.length) return `<div class="empty-state compact">No priority actions generated.</div>`;
    return `
      <div class="command-list">
        ${tasks
          .map((task) => {
            const dueText =
              task.days === null
                ? "No date"
                : task.days < 0
                  ? `${Math.abs(task.days)}d late`
                  : task.days === 0
                    ? "Due today"
                    : `${task.days}d left`;
            return `
              <button class="command-row tone-${escapeHtml(task.tone)}" type="button" data-action="open-related-record" data-id="${escapeHtml(task.record.id)}">
                <span>${escapeHtml(task.lane)}</span>
                <strong>${escapeHtml(task.record.title || "Untitled record")}</strong>
                <em>${escapeHtml([task.record.client, task.record.type, task.record.status, dueText].filter(Boolean).join(" / "))}</em>
              </button>
            `;
          })
          .join("")}
      </div>
    `;
  }

  function renderCommandBrief(rows) {
    return `
      <div class="command-brief-list">
        ${rows.map((row) => `<p>${escapeHtml(row)}</p>`).join("")}
      </div>
    `;
  }

  function renderSignalLegend() {
    const rows = [
      ["red", "Critical / overdue", "Clear first before review"],
      ["amber", "Needs decision", "Manager or owner movement"],
      ["blue", "Evidence / data", "Proof, source, or document signal"],
      ["green", "Healthy / ready", "Good to progress"],
      ["teal", "Active / default", "Normal operating movement"],
    ];
    return `
      <div class="signal-legend">
        ${rows
          .map(
            ([tone, label, note]) => `
              <div class="signal-legend-row tone-${escapeHtml(tone)}">
                <i aria-hidden="true"></i>
                <strong>${escapeHtml(label)}</strong>
                <span>${escapeHtml(note)}</span>
              </div>
            `,
          )
          .join("")}
      </div>
    `;
  }

  function renderCommandEvidenceList(packs) {
    if (!packs.length) return `<div class="empty-state compact">No evidence gaps found.</div>`;
    return `
      <div class="command-list">
        ${packs
          .map(
            (pack) => `
              <button class="command-row tone-blue" type="button" data-action="open-related-record" data-id="${escapeHtml(pack.record.id)}">
                <span>${pack.gaps.length} gaps</span>
                <strong>${escapeHtml(pack.record.title || "Untitled record")}</strong>
                <em>${escapeHtml(pack.gaps.slice(0, 4).join(" / "))}</em>
              </button>
            `,
          )
          .join("")}
      </div>
    `;
  }

  function renderCommandContractList(items) {
    if (!items.length) return `<div class="empty-state compact">No contract gaps found.</div>`;
    return `
      <div class="command-list">
        ${items
          .map(
            (item) => `
              <button class="command-row tone-amber" type="button" data-action="open-related-record" data-id="${escapeHtml(item.record.id)}">
                <span>${escapeHtml(item.risk)}</span>
                <strong>${escapeHtml(item.record.title || "Untitled record")}</strong>
                <em>${escapeHtml([item.record.client, item.stage, item.record.agreementNo || "No agreement"].filter(Boolean).join(" / "))}</em>
              </button>
            `,
          )
          .join("")}
      </div>
    `;
  }

  function renderCommandClientList(accounts) {
    if (!accounts.length) return `<div class="empty-state compact">No client heat available.</div>`;
    return `
      <div class="command-list">
        ${accounts
          .map(
            (account) => `
              <button class="command-row tone-green" type="button" data-action="open-related-record" data-id="${escapeHtml(account.latest?.id || "")}" ${account.latest ? "" : "disabled"}>
                <span>${escapeHtml(account.pulse)}</span>
                <strong>${escapeHtml(account.label)}</strong>
                <em>${account.records.length} records / ${account.openCount} open / ${escapeHtml(formatCompactMoney(account.totalValue))}</em>
              </button>
            `,
          )
          .join("")}
      </div>
    `;
  }

  function renderCommandValueList(records) {
    if (!records.length) return `<div class="empty-state compact">No open value captured yet.</div>`;
    return `
      <div class="command-list">
        ${records
          .map(
            (record) => `
              <button class="command-row tone-teal" type="button" data-action="open-related-record" data-id="${escapeHtml(record.id)}">
                <span>${escapeHtml(formatCompactMoney(record.valueAmount))}</span>
                <strong>${escapeHtml(record.client || record.reference || "Open record")}</strong>
                <em>${escapeHtml(record.title || "Untitled record")}</em>
              </button>
            `,
          )
          .join("")}
      </div>
    `;
  }

  function renderCommandRhythm() {
    const rows = [
      ["1", "Clear red actions", "Open Reminders and update overdue or near-date records first.", "Reminders"],
      ["2", "Fix evidence", "Review Documents so source sheets, LOA, and agreement proof are visible.", "Documents"],
      ["3", "Move commercial gaps", "Open Contracts and close agreement, handover, and value gaps.", "Contracts"],
      ["4", "Share the pack", "Open Reports when the operating story is ready for management.", "Reports"],
    ];
    return `
      <div class="command-rhythm">
        ${rows
          .map(
            ([step, title, note, view]) => `
              <button type="button" data-view="${escapeHtml(view)}" ${canAccessView(view) ? "" : "disabled"}>
                <span>${escapeHtml(step)}</span>
                <strong>${escapeHtml(title)}</strong>
                <em>${escapeHtml(note)}</em>
              </button>
            `,
          )
          .join("")}
      </div>
    `;
  }

  function renderBidDeskPage() {
    const model = buildBidDeskModel();
    return `
      <section class="bid-desk">
        <section class="bid-console">
          <div>
            <span class="panel-label">Submission war room</span>
            <h2>Move from opportunity tracking to bid execution.</h2>
            <p>Bid Desk turns open tenders and EOIs into a controlled submission floor: readiness checks, bid/no-bid decisions, deadline pressure, pack-ready status, and audit-backed movement.</p>
            <div class="bid-actions">
              <button class="secondary-btn" type="button" data-view="Tenders">Open tenders</button>
              <button class="ghost-btn" type="button" data-view="Tenders Insights">Open tender insights</button>
              <button class="ghost-btn" type="button" data-view="Documents">Review evidence</button>
            </div>
          </div>
          <div class="bid-score-card">
            <span>Submission readiness</span>
            <strong>${model.totalReadiness}%</strong>
            <small>${model.readyRows.length} packs ready / ${model.due14} due in 14 days</small>
          </div>
        </section>

        <div class="bid-kpis">
          ${renderInsightKpi("Active bid floor", `${model.activeRows.length}`, "Open tender and EOI records")}
          ${renderInsightKpi("Bid value", formatCompactMoney(model.bidValue), `${model.bidRows.length} records marked Bid`)}
          ${renderInsightKpi("Pack ready", `${model.readyRows.length}`, `${formatCompactMoney(model.readyValue)} ready value`)}
          ${renderInsightKpi("Due pressure", `${model.due14}`, "Past due or due in 14 days")}
        </div>

        <div class="bid-layout">
          <section class="bid-main">
            <article class="info-panel bid-board-panel">
              <div class="info-head">
                <div>
                  <span class="metric-label">Bid board</span>
                  <h3>Decision and readiness queue</h3>
                </div>
                <span>${model.packRows.length} shown</span>
              </div>
              ${renderBidBoard(model.packRows)}
            </article>
          </section>

          <aside class="bid-side">
            <article class="info-panel">
              <div class="info-head">
                <div>
                  <span class="metric-label">Deadline pressure</span>
                  <h3>Next submission moves</h3>
                </div>
                <span>${model.dueRows.length} shown</span>
              </div>
              ${renderBidDueList(model.dueRows)}
            </article>

            <article class="info-panel">
              <div class="info-head">
                <div>
                  <span class="metric-label">Pack gaps</span>
                  <h3>Low readiness records</h3>
                </div>
                <span>${model.missingRows.length} total</span>
              </div>
              ${renderBidGapList(model.missingRows.slice(0, 8))}
            </article>
          </aside>
        </div>

        <div class="bid-analytics-grid">
          <article class="info-panel">
            <div class="info-head">
              <div>
                <span class="metric-label">Decision mix</span>
                <h3>Bid / watch / no-bid</h3>
              </div>
            </div>
            ${renderRankBars(model.decisionRows, "teal")}
          </article>

          <article class="info-panel">
            <div class="info-head">
              <div>
                <span class="metric-label">Category spread</span>
                <h3>Submission concentration</h3>
              </div>
            </div>
            ${renderRankBars(model.categoryRows, "amber")}
          </article>

          <article class="info-panel">
            <div class="info-head">
              <div>
                <span class="metric-label">Client heat</span>
                <h3>Bid demand by client</h3>
              </div>
            </div>
            ${renderRankBars(model.clientRows, "blue")}
          </article>

          <article class="info-panel bid-playbook-panel">
            <div class="info-head">
              <div>
                <span class="metric-label">Submission rhythm</span>
                <h3>Bid control loop</h3>
              </div>
            </div>
            ${renderBidPlaybook()}
          </article>
        </div>
      </section>
    `;
  }

  function renderBidBoard(rows) {
    if (!rows.length) return `<div class="empty-state compact">No active tenders or EOIs found.</div>`;
    return `
      <div class="bid-board-list">
        ${rows.map((row) => {
          const { record, decision, readiness, dueDays, ready, checklist } = row;
          return `
            <div class="bid-row tone-${escapeHtml(bidDecisionTone(decision.decision))} ${ready ? "is-ready" : ""}">
              <div class="bid-row-main">
                <span>${escapeHtml(decision.decision)}</span>
                <strong>${escapeHtml(record.title || record.reference || "Untitled bid")}</strong>
                <em>${escapeHtml([record.reference, record.client, record.category, dueLabel(dueDays), formatCompactMoney(record.valueAmount)].filter(Boolean).join(" / "))}</em>
                <div class="bid-readiness">
                  <i style="--width: ${Math.max(4, readiness)}%"></i>
                  <small>${readiness}% ready / ${checklist.filter((item) => !item.passed).map((item) => item.label).slice(0, 3).join(", ") || "core pack complete"}</small>
                </div>
              </div>
              <div class="bid-row-actions">
                ${["Bid", "Watch", "No-bid"].map((option) => `
                  <button class="mini-btn ${decision.decision === option ? "primary-mini" : ""}" type="button" data-action="set-bid-decision" data-id="${escapeHtml(record.id)}" data-decision="${escapeHtml(option)}" ${canEdit() ? "" : "disabled"}>${escapeHtml(option)}</button>
                `).join("")}
                <button class="mini-btn ${ready ? "primary-mini" : ""}" type="button" data-action="toggle-submission-ready" data-id="${escapeHtml(record.id)}" ${canEdit() ? "" : "disabled"}>${ready ? "Ready" : "Pack"}</button>
                <button class="mini-btn" type="button" data-action="open-related-record" data-id="${escapeHtml(record.id)}">Open</button>
              </div>
            </div>
          `;
        }).join("")}
      </div>
    `;
  }

  function renderBidDueList(rows) {
    if (!rows.length) return `<div class="empty-state compact">No bid deadlines in the next 30 days.</div>`;
    return `
      <div class="command-list">
        ${rows.map((row) => `
          <button class="command-row tone-${row.dueDays !== null && row.dueDays < 0 ? "red" : "amber"}" type="button" data-action="open-related-record" data-id="${escapeHtml(row.record.id)}">
            <span>${escapeHtml(dueLabel(row.dueDays))}</span>
            <strong>${escapeHtml(row.record.title || row.record.reference || "Untitled bid")}</strong>
            <em>${escapeHtml([row.record.client, row.decision.decision, `${row.readiness}% ready`].join(" / "))}</em>
          </button>
        `).join("")}
      </div>
    `;
  }

  function renderBidGapList(rows) {
    if (!rows.length) return `<div class="empty-state compact">No low-readiness packs in the active bid floor.</div>`;
    return `
      <div class="command-list">
        ${rows.map((row) => {
          const gaps = row.checklist.filter((item) => !item.passed).map((item) => item.label).slice(0, 4);
          return `
            <button class="command-row tone-blue" type="button" data-action="open-related-record" data-id="${escapeHtml(row.record.id)}">
              <span>${row.readiness}%</span>
              <strong>${escapeHtml(row.record.title || row.record.reference || "Untitled bid")}</strong>
              <em>${escapeHtml(gaps.join(" / ") || "No major gaps")}</em>
            </button>
          `;
        }).join("")}
      </div>
    `;
  }

  function renderBidPlaybook() {
    const rows = [
      ["1", "Decide", "Set Bid, Watch, or No-bid before effort is spent."],
      ["2", "Complete pack", "Close missing reference, client, due date, value, owner, and source gaps."],
      ["3", "Mark ready", "Flag the submission pack when the team can proceed."],
      ["4", "Audit movement", "Bid decisions and pack status are logged in Governance."],
    ];
    return `
      <div class="command-rhythm bid-playbook">
        ${rows.map(([step, title, note]) => `
          <div>
            <span>${escapeHtml(step)}</span>
            <strong>${escapeHtml(title)}</strong>
            <em>${escapeHtml(note)}</em>
          </div>
        `).join("")}
      </div>
    `;
  }

  function bidDecisionTone(decision) {
    if (decision === "Bid") return "green";
    if (decision === "No-bid") return "red";
    return "amber";
  }

  function dueLabel(days) {
    if (days === null) return "No date";
    if (days < 0) return `${Math.abs(days)}d late`;
    if (days === 0) return "Due today";
    return `${days}d left`;
  }

  function calendarLaneFor(days) {
    if (days === null) return "No date";
    if (days < 0) return "Overdue";
    if (days <= 7) return "This week";
    if (days <= 30) return "Next 30";
    if (days <= 90) return "Next 90";
    return "Later";
  }

  function calendarToneFor(days) {
    if (days === null) return "blue";
    if (days < 0) return "red";
    if (days <= 14) return "amber";
    if (days <= 90) return "blue";
    return "green";
  }

  function startOfWeek(date) {
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);
    const day = start.getDay();
    const diff = day === 0 ? -6 : 1 - day;
    start.setDate(start.getDate() + diff);
    return start;
  }

  function formatCalendarDay(date) {
    if (!date) return "No date";
    return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short" });
  }

  function formatCalendarWeek(start) {
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    return `${formatCalendarDay(start)} - ${formatCalendarDay(end)}`;
  }

  function calendarBreakdown(events, getter, limit = 6) {
    const rows = new Map();
    events.forEach((event) => {
      const label = String(getter(event) || "Unassigned").trim() || "Unassigned";
      rows.set(label, (rows.get(label) || 0) + 1);
    });
    return Array.from(rows, ([label, value]) => ({ label, value }))
      .sort((a, b) => b.value - a.value || a.label.localeCompare(b.label))
      .slice(0, limit);
  }

  function buildReviewCalendarModel() {
    const records = companyRecords().filter((record) => !isClosedRecord(record));
    const floor = highValueThreshold(companyRecords());
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const currentWeek = startOfWeek(today);
    const events = records
      .map((record) => {
        const date = parseRecordDate(record.endDate);
        const days = recordDueDays(record);
        const amount = Number(record.valueAmount) || 0;
        const isTender = record.type === "Tender" || record.type === "EOI";
        const kind = isTender ? "Tender submission" : "Project milestone";
        const lane = calendarLaneFor(days);
        const tone = calendarToneFor(days);
        const priority =
          (days === null ? 54 : days < 0 ? 120 + Math.min(35, Math.abs(days)) : days <= 7 ? 105 - days : days <= 30 ? 82 - Math.round(days / 2) : 45) +
          (amount >= floor && amount > 0 ? 14 : 0) +
          ((record.rounds || []).length ? 7 : 0);
        return {
          record,
          date,
          days,
          amount,
          isTender,
          isHighValue: amount >= floor && amount > 0,
          kind,
          lane,
          tone,
          priority,
        };
      })
      .sort((a, b) => {
        const aDays = a.days === null ? 9999 : a.days;
        const bDays = b.days === null ? 9999 : b.days;
        return b.priority - a.priority || aDays - bDays || a.record.client.localeCompare(b.record.client);
      });
    const scheduled = events.filter((event) => event.date);
    const overdue = events.filter((event) => event.days !== null && event.days < 0);
    const next30 = events.filter((event) => event.days !== null && event.days >= 0 && event.days <= 30);
    const noDate = events.filter((event) => event.days === null);
    const activeWeekStarts = Array.from(new Set(scheduled.map((event) => startOfWeek(event.date).getTime()))).sort((a, b) => a - b);
    const futureWeekStarts = activeWeekStarts.filter((stamp) => stamp >= currentWeek.getTime());
    const selectedWeekStarts = (futureWeekStarts.length ? futureWeekStarts : activeWeekStarts.slice(-8)).slice(0, 8);
    const weeks = selectedWeekStarts.map((stamp) => {
      const start = new Date(stamp);
      const end = new Date(start);
      end.setDate(start.getDate() + 6);
      const weekEvents = scheduled
        .filter((event) => event.date >= start && event.date <= end)
        .sort((a, b) => (a.days ?? 9999) - (b.days ?? 9999) || b.priority - a.priority);
      return {
        label: start.getTime() === currentWeek.getTime() ? "This week" : formatCalendarWeek(start),
        dateRange: formatCalendarWeek(start),
        start,
        end,
        events: weekEvents,
        tenderCount: weekEvents.filter((event) => event.isTender).length,
        projectCount: weekEvents.filter((event) => !event.isTender).length,
        value: sumAmounts(weekEvents.map((event) => event.record)),
      };
    });
    const laneNames = ["Overdue", "This week", "Next 30", "Next 90", "Later", "No date"];
    const lanes = laneNames.map((name) => ({
      name,
      events: events.filter((event) => event.lane === name).slice(0, 8),
      count: events.filter((event) => event.lane === name).length,
    }));
    const dateCoverage = records.length ? Math.round((scheduled.length / records.length) * 100) : 100;
    const onTimeRate = scheduled.length ? Math.round(((scheduled.length - overdue.length) / scheduled.length) * 100) : 100;
    const focusScore = Math.max(0, Math.min(100, Math.round(dateCoverage * 0.45 + onTimeRate * 0.35 + Math.max(0, 100 - noDate.length * 4) * 0.2)));
    return {
      records,
      events,
      scheduled,
      overdue,
      next30,
      noDate,
      weeks,
      lanes,
      focusScore,
      dateCoverage,
      onTimeRate,
      highValueRows: events.filter((event) => event.isHighValue).slice(0, 8),
      ownerRows: calendarBreakdown(events, (event) => event.record.owner, 6),
      clientRows: calendarBreakdown(events, (event) => accountLabelForRecord(event.record), 6),
      typeRows: calendarBreakdown(events, (event) => event.record.type, 4),
      qualityRows: [
        { label: "Date captured", value: dateCoverage },
        { label: "Not overdue", value: onTimeRate },
        { label: "Next 30 events", value: next30.length },
        { label: "No-date records", value: noDate.length },
      ],
    };
  }

  function renderReviewCalendarPage() {
    const model = buildReviewCalendarModel();
    return `
      <section class="calendar-desk">
        <section class="calendar-console">
          <div>
            <span class="panel-label">Review calendar</span>
            <h2>See the week before it becomes pressure.</h2>
            <p>Calendar turns tender deadlines, project milestones, overdue items, and no-date records into one review rhythm for managers, estimators, and delivery owners.</p>
            <div class="calendar-actions">
              <button class="secondary-btn" type="button" data-view="Reminders">Open reminders</button>
              <button class="ghost-btn" type="button" data-view="Bid Desk">Open Bid Desk</button>
              <button class="ghost-btn" type="button" data-view="Projects">Open projects</button>
            </div>
          </div>
          <div class="calendar-score-card">
            <span>Calendar focus</span>
            <strong>${model.focusScore}%</strong>
            <small>${model.overdue.length} overdue / ${model.noDate.length} no-date records</small>
          </div>
        </section>

        <div class="calendar-kpis">
          ${renderInsightKpi("Scheduled records", `${model.scheduled.length}`, `${model.dateCoverage}% date coverage`)}
          ${renderInsightKpi("Overdue", `${model.overdue.length}`, "Past due tender or project dates")}
          ${renderInsightKpi("Next 30 days", `${model.next30.length}`, "Upcoming review pressure")}
          ${renderInsightKpi("High-value dates", `${model.highValueRows.length}`, "Management attention candidates")}
        </div>

        <div class="calendar-layout">
          <section class="calendar-main">
            <article class="info-panel calendar-week-panel">
              <div class="info-head">
                <div>
                  <span class="metric-label">Rolling calendar</span>
                  <h3>Eight-week review strip</h3>
                </div>
                <span>${model.events.length} open events</span>
              </div>
              ${renderCalendarWeeks(model.weeks)}
            </article>

            <article class="info-panel">
              <div class="info-head">
                <div>
                  <span class="metric-label">Urgency lanes</span>
                  <h3>What needs movement</h3>
                </div>
                <span>${model.lanes.reduce((sum, lane) => sum + lane.count, 0)} items</span>
              </div>
              <div class="calendar-lanes">
                ${model.lanes.map(renderCalendarLane).join("")}
              </div>
            </article>
          </section>

          <aside class="calendar-side">
            <article class="info-panel">
              <div class="info-head">
                <div>
                  <span class="metric-label">High-value diary</span>
                  <h3>Management review dates</h3>
                </div>
                <span>${model.highValueRows.length} shown</span>
              </div>
              ${renderCalendarEventList(model.highValueRows, "No high-value open dates found.")}
            </article>

            <article class="info-panel">
              <div class="info-head">
                <div>
                  <span class="metric-label">No-date cleanup</span>
                  <h3>Records outside the calendar</h3>
                </div>
                <span>${model.noDate.length} total</span>
              </div>
              ${renderCalendarEventList(model.noDate.slice(0, 8), "Every open record has a date.")}
            </article>
          </aside>
        </div>

        <div class="calendar-analytics-grid">
          <article class="info-panel">
            <div class="info-head">
              <div>
                <span class="metric-label">Owner diary</span>
                <h3>Who carries dated work</h3>
              </div>
            </div>
            ${renderRankBars(model.ownerRows, "green")}
          </article>

          <article class="info-panel">
            <div class="info-head">
              <div>
                <span class="metric-label">Client pressure</span>
                <h3>Accounts on the calendar</h3>
              </div>
            </div>
            ${renderRankBars(model.clientRows, "blue")}
          </article>

          <article class="info-panel">
            <div class="info-head">
              <div>
                <span class="metric-label">Work type</span>
                <h3>Tender vs project dates</h3>
              </div>
            </div>
            ${renderRankBars(model.typeRows, "teal")}
          </article>

          <article class="info-panel">
            <div class="info-head">
              <div>
                <span class="metric-label">Calendar quality</span>
                <h3>Date hygiene signals</h3>
              </div>
            </div>
            ${renderRankBars(model.qualityRows, "amber")}
          </article>
        </div>
      </section>
    `;
  }

  function renderCalendarWeeks(weeks) {
    return `
      <div class="calendar-week-grid">
        ${weeks
          .map(
            (week) => `
              <div class="calendar-week-card">
                <div class="calendar-week-head">
                  <span>${escapeHtml(week.label)}</span>
                  <strong>${week.events.length}</strong>
                </div>
                <small>${escapeHtml(week.dateRange)} / ${week.tenderCount} tender / ${week.projectCount} project</small>
                <div class="calendar-mini-list">
                  ${
                    week.events.length
                      ? week.events
                          .slice(0, 3)
                          .map(
                            (event) => `
                              <button class="calendar-mini-event tone-${escapeHtml(event.tone)}" type="button" data-action="open-related-record" data-id="${escapeHtml(event.record.id)}">
                                <span>${escapeHtml(formatCalendarDay(event.date))}</span>
                                <strong>${escapeHtml(event.record.title || event.record.reference || "Untitled")}</strong>
                              </button>
                            `,
                          )
                          .join("")
                      : `<p>No dated records</p>`
                  }
                </div>
              </div>
            `,
          )
          .join("")}
      </div>
    `;
  }

  function renderCalendarLane(lane) {
    return `
      <article class="calendar-lane">
        <div class="calendar-lane-head">
          <strong>${escapeHtml(lane.name)}</strong>
          <span>${lane.count}</span>
        </div>
        <div class="calendar-event-list">
          ${lane.events.length ? lane.events.map(renderCalendarEventCard).join("") : `<div class="empty-state compact">No ${escapeHtml(lane.name.toLowerCase())} items.</div>`}
        </div>
      </article>
    `;
  }

  function renderCalendarEventList(events, emptyCopy) {
    if (!events.length) return `<div class="empty-state compact">${escapeHtml(emptyCopy)}</div>`;
    return `
      <div class="calendar-event-list">
        ${events.map(renderCalendarEventCard).join("")}
      </div>
    `;
  }

  function renderCalendarEventCard(event) {
    return `
      <button class="calendar-event-card tone-${escapeHtml(event.tone)}" type="button" data-action="open-related-record" data-id="${escapeHtml(event.record.id)}">
        <span>${escapeHtml(event.lane)}</span>
        <strong>${escapeHtml(event.record.title || event.record.reference || "Untitled record")}</strong>
        <em>${escapeHtml([event.kind, event.record.client, event.date ? formatDate(event.record.endDate) : "No date", dueLabel(event.days)].filter(Boolean).join(" / "))}</em>
        <small>${escapeHtml([event.record.type, event.record.status, event.amount ? formatCompactMoney(event.amount) : "No value"].filter(Boolean).join(" / "))}</small>
      </button>
    `;
  }

  function riskSeverityFor(score) {
    if (score >= 92) return { label: "Critical", tone: "red" };
    if (score >= 74) return { label: "High", tone: "amber" };
    if (score >= 56) return { label: "Watch", tone: "blue" };
    return { label: "Controlled", tone: "green" };
  }

  function pushRisk(risks, record, type, title, note, action, score, amountOverride) {
    const severity = riskSeverityFor(score);
    risks.push({
      id: `${record.id}-${normalize(type).replaceAll(" ", "-")}-${risks.length}`,
      record,
      type,
      title,
      note,
      action,
      score: Math.max(1, Math.min(100, Math.round(score))),
      severity: severity.label,
      tone: severity.tone,
      amount: amountOverride ?? (Number(record.valueAmount) || 0),
      days: recordDueDays(record),
    });
  }

  function riskBreakdown(risks, getter, limit = 6) {
    const rows = new Map();
    risks.forEach((risk) => {
      const label = String(getter(risk) || "Unassigned").trim() || "Unassigned";
      rows.set(label, (rows.get(label) || 0) + 1);
    });
    return Array.from(rows, ([label, value]) => ({ label, value }))
      .sort((a, b) => b.value - a.value || a.label.localeCompare(b.label))
      .slice(0, limit);
  }

  function buildRiskControlModel() {
    const records = companyRecords();
    const openRecords = records.filter((record) => !isClosedRecord(record));
    const floor = highValueThreshold(records);
    const risks = [];
    records.forEach((record) => {
      const isOpen = !isClosedRecord(record);
      const isTender = record.type === "Tender" || record.type === "EOI";
      const isProject = record.type === "Project";
      const amount = Number(record.valueAmount) || 0;
      const days = recordDueDays(record);
      const highValue = amount >= floor && amount > 0;
      const missingCore = [
        ["reference", record.reference],
        ["client", record.client],
        ["title", record.title],
        ["category", record.category],
        ["owner", record.owner],
        ["source", record.sourceSheet || record.sourceWorkbook],
      ]
        .filter(([, value]) => !String(value || "").trim())
        .map(([label]) => label);

      if (isOpen && days !== null && days < 0) {
        pushRisk(risks, record, "Schedule", "Overdue movement", `${Math.abs(days)} days past due. Status, owner, and next date need confirmation.`, "Update due date or escalation note.", 96 + Math.min(4, Math.abs(days) / 15));
      } else if (isOpen && days !== null && days <= 14) {
        pushRisk(risks, record, "Schedule", "Near-date pressure", `${days === 0 ? "Due today" : `${days} days left`}. Move this before it becomes overdue.`, "Confirm submission or delivery next step.", 76 + (14 - days));
      }

      if (isOpen && days === null) {
        pushRisk(risks, record, "Data", "No control date", "This active record is outside calendar, reminder, and forecast timing control.", "Add due, submission, or review date.", 72);
      }

      if (isOpen && !amount) {
        pushRisk(risks, record, "Value", "Missing expected value", "Value is not captured, so prioritization and management exposure are understated.", "Add estimated value or mark as intentionally unpriced.", highValue ? 80 : 66);
      }

      if (missingCore.length >= 2) {
        pushRisk(risks, record, "Data", "Core data gaps", `${missingCore.slice(0, 4).join(", ")} missing. Reporting quality is reduced.`, "Complete the missing core fields.", 58 + missingCore.length * 7);
      }

      if (highValue && isOpen) {
        const score = 70 + (days === null ? 10 : days < 0 ? 20 : days <= 30 ? 12 : 4) + (!record.owner ? 8 : 0);
        pushRisk(risks, record, "Value", "High-value control", `${formatCompactMoney(amount)} open exposure needs visible ownership and review discipline.`, "Keep owner, date, and next move current.", score, amount);
      }

      if (isTender && isOpen) {
        const decision = bidDecisionFor(record).decision;
        const readiness = bidReadinessFor(record);
        const ready = Boolean(state.data.submissionReady?.[record.id]);
        if (decision === "Watch" && (days === null || days <= 30)) {
          pushRisk(risks, record, "Bid", "Bid decision pending", "This pursuit is still on Watch while the date is close or missing.", "Set Bid or No-bid before effort increases.", days === null ? 74 : 82);
        }
        if (decision === "Bid" && !ready && days !== null && days <= 14) {
          pushRisk(risks, record, "Bid", "Submission pack not ready", "Marked Bid, but the submission pack is not ready near the due date.", "Complete and mark pack ready in Bid Desk.", 88 + Math.max(0, 14 - days));
        }
        if (readiness < 72) {
          pushRisk(risks, record, "Bid", "Low bid readiness", `Submission readiness is ${readiness}%.`, "Close reference, value, owner, source, and decision gaps.", 62 + (72 - readiness) * 0.7);
        }
      }

      if (isProject && isOpen) {
        if (days !== null && days < 0) {
          pushRisk(risks, record, "Delivery", "Project date slipped", `${Math.abs(days)} days past the captured project date.`, "Confirm delivery status and revised milestone.", 94);
        } else if (days !== null && days <= 30) {
          pushRisk(risks, record, "Delivery", "Project milestone near", `${days} days to captured project date.`, "Check delivery owner, client readiness, and next handover.", 70 + Math.max(0, 30 - days) * 0.4);
        }
        if (!record.owner) {
          pushRisk(risks, record, "Delivery", "No delivery owner", "Project record has no owner, which weakens accountability.", "Assign a project owner.", 68);
        }
      }

      if ((["Awarded", "Ongoing", "Completed"].includes(record.status) || isProject) && (!record.agreementNo || !record.loaReceived || !record.agreementReceived)) {
        const gaps = [
          !record.agreementNo ? "agreement no" : "",
          !record.loaReceived ? "LOA proof" : "",
          !record.agreementReceived ? "agreement received" : "",
        ].filter(Boolean);
        pushRisk(risks, record, "Commercial", "Commercial evidence gap", `${gaps.join(", ")} missing for commercial control.`, "Update contract evidence in the source record.", 62 + gaps.length * 8);
      }

      if ((record.rounds || []).length >= 2 && isOpen) {
        pushRisk(risks, record, "Negotiation", "Negotiation trail active", `${record.rounds.length} negotiation rounds captured. Commercial movement should stay visible.`, "Review latest negotiation note and next response.", 62 + Math.min(18, record.rounds.length * 4));
      }
    });

    const sorted = risks.sort((a, b) => b.score - a.score || (a.days ?? 9999) - (b.days ?? 9999) || a.record.client.localeCompare(b.record.client));
    const critical = sorted.filter((risk) => risk.severity === "Critical");
    const high = sorted.filter((risk) => risk.severity === "High");
    const watch = sorted.filter((risk) => risk.severity === "Watch");
    const uniqueRiskRecords = Array.from(new Map(sorted.map((risk) => [risk.record.id, risk.record])).values());
    const riskExposure = sumAmounts(uniqueRiskRecords);
    const severityPenalty = Math.min(55, critical.length * 0.6 + high.length * 0.35 + watch.length * 0.15);
    const densityPenalty = Math.min(20, (sorted.length / Math.max(openRecords.length, 1)) * 5);
    const controlScore = Math.max(15, Math.min(100, Math.round(100 - severityPenalty - densityPenalty)));
    const riskTypes = ["Schedule", "Bid", "Commercial", "Delivery", "Data", "Value", "Negotiation"];
    const heatRows = riskTypes
      .map((type) => {
        const typeRisks = sorted.filter((risk) => risk.type === type);
        return {
          label: type,
          total: typeRisks.length,
          critical: typeRisks.filter((risk) => risk.severity === "Critical").length,
          high: typeRisks.filter((risk) => risk.severity === "High").length,
          watch: typeRisks.filter((risk) => risk.severity === "Watch").length,
        };
      })
      .filter((row) => row.total);
    const lanes = [
      { name: "Critical", risks: critical.slice(0, 8), count: critical.length },
      { name: "Schedule", risks: sorted.filter((risk) => risk.type === "Schedule").slice(0, 8), count: sorted.filter((risk) => risk.type === "Schedule").length },
      { name: "Bid", risks: sorted.filter((risk) => risk.type === "Bid").slice(0, 8), count: sorted.filter((risk) => risk.type === "Bid").length },
      { name: "Commercial", risks: sorted.filter((risk) => risk.type === "Commercial").slice(0, 8), count: sorted.filter((risk) => risk.type === "Commercial").length },
      { name: "Delivery", risks: sorted.filter((risk) => risk.type === "Delivery").slice(0, 8), count: sorted.filter((risk) => risk.type === "Delivery").length },
      { name: "Data", risks: sorted.filter((risk) => risk.type === "Data" || risk.type === "Value").slice(0, 8), count: sorted.filter((risk) => risk.type === "Data" || risk.type === "Value").length },
    ];
    return {
      records,
      openRecords,
      risks: sorted,
      critical,
      high,
      watch,
      riskExposure,
      controlScore,
      lanes,
      heatRows,
      ownerRows: riskBreakdown(sorted, (risk) => risk.record.owner, 6),
      clientRows: riskBreakdown(sorted, (risk) => accountLabelForRecord(risk.record), 6),
      typeRows: riskBreakdown(sorted, (risk) => risk.type, 7),
      severityRows: [
        { label: "Critical", value: critical.length },
        { label: "High", value: high.length },
        { label: "Watch", value: watch.length },
        { label: "Controlled", value: sorted.filter((risk) => risk.severity === "Controlled").length },
      ],
      commercialDataRows: sorted.filter((risk) => ["Commercial", "Data", "Value"].includes(risk.type)).slice(0, 10),
      playbook: [
        ["Stabilize red", "Clear overdue, high-value, and pack-not-ready items before ordinary cleanup."],
        ["Assign ownership", "Every critical or high risk needs one owner and one next date."],
        ["Protect evidence", "Commercial gaps should be closed before weekly reporting or client escalation."],
        ["Reduce noise", "No-date and missing-value records should not survive the weekly review."],
      ],
    };
  }

  function renderRiskControlPage() {
    const model = buildRiskControlModel();
    return `
      <section class="risk-control">
        <section class="risk-console">
          <div>
            <span class="panel-label">Risk control room</span>
            <h2>Make the hidden problems impossible to miss.</h2>
            <p>Risk Control reads the same pursuit and project records, then turns schedule pressure, bid gaps, commercial evidence, missing data, and delivery exposure into a register the team can act on.</p>
            <div class="risk-actions">
              <button class="secondary-btn" type="button" data-view="Calendar">Open calendar</button>
              <button class="ghost-btn" type="button" data-view="Bid Desk">Open Bid Desk</button>
              <button class="ghost-btn" type="button" data-view="Governance">Open governance</button>
            </div>
          </div>
          <div class="risk-score-card">
            <span>Control score</span>
            <strong>${model.controlScore}%</strong>
            <small>${model.critical.length} critical / ${model.high.length} high risks</small>
          </div>
        </section>

        <div class="risk-kpis">
          ${renderInsightKpi("Active risks", `${model.risks.length}`, `${model.openRecords.length} open records scanned`)}
          ${renderInsightKpi("Critical risks", `${model.critical.length}`, "Immediate management attention")}
          ${renderInsightKpi("Risk exposure", formatCompactMoney(model.riskExposure), "Unique record value touched by risks")}
          ${renderInsightKpi("Commercial/data", `${model.commercialDataRows.length}`, "Evidence and hygiene risks shown")}
        </div>

        <div class="risk-layout">
          <section class="risk-main">
            <article class="info-panel">
              <div class="info-head">
                <div>
                  <span class="metric-label">Risk register</span>
                  <h3>Severity lanes</h3>
                </div>
                <span>${model.risks.length} risks</span>
              </div>
              <div class="risk-lanes">
                ${model.lanes.map(renderRiskLane).join("")}
              </div>
            </article>

            <article class="info-panel">
              <div class="info-head">
                <div>
                  <span class="metric-label">Risk heatmap</span>
                  <h3>Type and severity concentration</h3>
                </div>
              </div>
              ${renderRiskHeatmap(model.heatRows)}
            </article>
          </section>

          <aside class="risk-side">
            <article class="info-panel">
              <div class="info-head">
                <div>
                  <span class="metric-label">Critical now</span>
                  <h3>First risks to clear</h3>
                </div>
                <span>${model.critical.length} total</span>
              </div>
              ${renderRiskList(model.critical.slice(0, 8), "No critical risks currently detected.")}
            </article>

            <article class="info-panel">
              <div class="info-head">
                <div>
                  <span class="metric-label">Evidence cleanup</span>
                  <h3>Commercial and data risks</h3>
                </div>
                <span>${model.commercialDataRows.length} shown</span>
              </div>
              ${renderRiskList(model.commercialDataRows.slice(0, 8), "No commercial or data cleanup risks detected.")}
            </article>
          </aside>
        </div>

        <div class="risk-analytics-grid">
          <article class="info-panel">
            <div class="info-head">
              <div>
                <span class="metric-label">Owner exposure</span>
                <h3>Risk by owner</h3>
              </div>
            </div>
            ${renderRankBars(model.ownerRows, "green")}
          </article>

          <article class="info-panel">
            <div class="info-head">
              <div>
                <span class="metric-label">Client exposure</span>
                <h3>Accounts carrying risk</h3>
              </div>
            </div>
            ${renderRankBars(model.clientRows, "blue")}
          </article>

          <article class="info-panel">
            <div class="info-head">
              <div>
                <span class="metric-label">Risk mix</span>
                <h3>Primary risk types</h3>
              </div>
            </div>
            ${renderRankBars(model.typeRows, "amber")}
          </article>

          <article class="info-panel">
            <div class="info-head">
              <div>
                <span class="metric-label">Mitigation rhythm</span>
                <h3>Weekly control loop</h3>
              </div>
            </div>
            ${renderRiskPlaybook(model.playbook)}
          </article>
        </div>
      </section>
    `;
  }

  function renderRiskLane(lane) {
    return `
      <article class="risk-lane">
        <div class="risk-lane-head">
          <strong>${escapeHtml(lane.name)}</strong>
          <span>${lane.count}</span>
        </div>
        <div class="risk-card-list">
          ${lane.risks.length ? lane.risks.map(renderRiskCard).join("") : `<div class="empty-state compact">No ${escapeHtml(lane.name.toLowerCase())} risks.</div>`}
        </div>
      </article>
    `;
  }

  function renderRiskList(risks, emptyCopy) {
    if (!risks.length) return `<div class="empty-state compact">${escapeHtml(emptyCopy)}</div>`;
    return `<div class="risk-card-list">${risks.map(renderRiskCard).join("")}</div>`;
  }

  function renderRiskCard(risk) {
    return `
      <button class="risk-card tone-${escapeHtml(risk.tone)}" type="button" data-action="open-related-record" data-id="${escapeHtml(risk.record.id)}">
        <span>${escapeHtml(risk.severity)} / ${escapeHtml(risk.type)}</span>
        <strong>${escapeHtml(risk.title)}</strong>
        <em>${escapeHtml(risk.record.title || risk.record.reference || "Untitled record")}</em>
        <small>${escapeHtml([risk.record.client, dueLabel(risk.days), risk.amount ? formatCompactMoney(risk.amount) : "No value"].filter(Boolean).join(" / "))}</small>
        <p>${escapeHtml(risk.action)}</p>
      </button>
    `;
  }

  function renderRiskHeatmap(rows) {
    if (!rows.length) return `<div class="empty-state compact">No risk heatmap data available.</div>`;
    const max = Math.max(...rows.map((row) => row.total), 1);
    return `
      <div class="risk-heatmap">
        ${rows
          .map((row) => {
            const width = Math.max(6, Math.round((row.total / max) * 100));
            return `
              <div class="risk-heat-row">
                <div>
                  <strong>${escapeHtml(row.label)}</strong>
                  <span>${row.total} total</span>
                </div>
                <i style="--width: ${width}%"><b></b></i>
                <small>${row.critical} critical / ${row.high} high / ${row.watch} watch</small>
              </div>
            `;
          })
          .join("")}
      </div>
    `;
  }

  function renderRiskPlaybook(rows) {
    return `
      <div class="risk-playbook">
        ${rows
          .map(
            ([title, note]) => `
              <div>
                <strong>${escapeHtml(title)}</strong>
                <span>${escapeHtml(note)}</span>
              </div>
            `,
          )
          .join("")}
      </div>
    `;
  }

  function advisorBreakdown(items, getter, limit = 6) {
    const rows = new Map();
    items.forEach((item) => {
      const label = String(getter(item) || "Unassigned").trim() || "Unassigned";
      rows.set(label, (rows.get(label) || 0) + 1);
    });
    return Array.from(rows, ([label, value]) => ({ label, value }))
      .sort((a, b) => b.value - a.value || a.label.localeCompare(b.label))
      .slice(0, limit);
  }

  function addAdvisorRecommendation(recommendations, seen, item) {
    const key = `${item.source}-${item.record?.id || item.view || item.title}-${item.title}`;
    if (seen.has(key)) return;
    seen.add(key);
    recommendations.push({
      lane: item.lane || "Do now",
      source: item.source || "Advisor",
      title: item.title || "Recommended action",
      reason: item.reason || "PursuitDesk found a signal that needs review.",
      action: item.action || "Open the source and confirm the next move.",
      impact: item.impact || "Operating control",
      view: item.view || "Command",
      record: item.record || null,
      score: Math.max(1, Math.min(100, Math.round(item.score || 50))),
      tone: item.tone || "blue",
    });
  }

  function buildPursuitAdvisorModel() {
    const records = companyRecords();
    const risk = buildRiskControlModel();
    const calendar = buildReviewCalendarModel();
    const bidDesk = buildBidDeskModel();
    const forecast = buildForecastModel();
    const contracts = buildContractsModel();
    const documents = buildDocumentsModel();
    const reminders = buildReminderModel();
    const governance = buildGovernanceModel();
    const portfolio = buildClientPortfolioModel();
    const recommendations = [];
    const seen = new Set();

    risk.critical.slice(0, 6).forEach((item) =>
      addAdvisorRecommendation(recommendations, seen, {
        lane: "Do now",
        source: "Risk",
        title: item.title,
        reason: item.note,
        action: item.action,
        impact: item.amount ? formatCompactMoney(item.amount) : "Critical control",
        view: "Risk",
        record: item.record,
        score: 100 + item.score * 0.1,
        tone: "red",
      }),
    );

    risk.high.slice(0, 5).forEach((item) =>
      addAdvisorRecommendation(recommendations, seen, {
        lane: "Do now",
        source: "Risk",
        title: item.title,
        reason: item.note,
        action: item.action,
        impact: item.amount ? formatCompactMoney(item.amount) : "High risk",
        view: "Risk",
        record: item.record,
        score: 88 + item.score * 0.05,
        tone: item.tone,
      }),
    );

    bidDesk.activeRows
      .filter((row) => row.decision.decision === "Watch" && (row.dueDays === null || row.dueDays <= 30))
      .slice(0, 5)
      .forEach((row) =>
        addAdvisorRecommendation(recommendations, seen, {
          lane: "Decide",
          source: "Bid Desk",
          title: "Set bid/no-bid decision",
          reason: `${row.decision.decision} decision while ${dueLabel(row.dueDays).toLowerCase()} and ${row.readiness}% ready.`,
          action: "Decide Bid or No-bid before effort increases.",
          impact: row.amount ? formatCompactMoney(row.amount) : "Bid effort control",
          view: "Bid Desk",
          record: row.record,
          score: row.dueDays === null ? 78 : 92 - Math.max(0, row.dueDays),
          tone: "amber",
        }),
      );

    bidDesk.activeRows
      .filter((row) => row.decision.decision === "Bid" && !row.ready && row.dueDays !== null && row.dueDays <= 14)
      .slice(0, 5)
      .forEach((row) =>
        addAdvisorRecommendation(recommendations, seen, {
          lane: "Decide",
          source: "Bid Desk",
          title: "Complete submission pack",
          reason: `Bid is active but pack is not ready with ${dueLabel(row.dueDays).toLowerCase()}.`,
          action: "Close readiness gaps and mark the pack ready.",
          impact: row.amount ? formatCompactMoney(row.amount) : "Submission readiness",
          view: "Bid Desk",
          record: row.record,
          score: 90,
          tone: "red",
        }),
      );

    calendar.noDate.slice(0, 5).forEach((event) =>
      addAdvisorRecommendation(recommendations, seen, {
        lane: "Schedule",
        source: "Calendar",
        title: "Put record on the calendar",
        reason: "This open item has no control date, so it is invisible to time-based review.",
        action: "Add a due, submission, or next review date.",
        impact: event.amount ? formatCompactMoney(event.amount) : "Calendar control",
        view: "Calendar",
        record: event.record,
        score: 74,
        tone: "blue",
      }),
    );

    contracts.gaps.slice(0, 6).forEach((item) =>
      addAdvisorRecommendation(recommendations, seen, {
        lane: "Commercial",
        source: "Contracts",
        title: item.risk,
        reason: `${item.stage} has a commercial control gap.`,
        action: "Update agreement number, LOA proof, agreement receipt, or value.",
        impact: item.record.valueAmount ? formatCompactMoney(item.record.valueAmount) : "Commercial evidence",
        view: "Contracts",
        record: item.record,
        score: item.risk === "Needs agreement" ? 84 : 70,
        tone: item.risk === "Needs agreement" ? "amber" : "blue",
      }),
    );

    forecast.atRiskItems.slice(0, 5).forEach((item) =>
      addAdvisorRecommendation(recommendations, seen, {
        lane: "Forecast",
        source: "Forecast",
        title: "Clean forecast risk",
        reason: `${item.window.label} / ${item.probability}% probability is affecting forecast confidence.`,
        action: "Update date, probability-driving status, or value assumptions.",
        impact: item.amount ? formatCompactMoney(item.amount) : "Forecast quality",
        view: "Forecast",
        record: item.record,
        score: item.amount ? 78 : 62,
        tone: item.window.label === "Past due" ? "red" : "amber",
      }),
    );

    documents.gapPacks.slice(0, 6).forEach((pack) =>
      addAdvisorRecommendation(recommendations, seen, {
        lane: "Clean data",
        source: "Documents",
        title: "Close evidence gaps",
        reason: `${pack.gaps.slice(0, 3).join(", ")} missing from the document pack.`,
        action: "Complete source, agreement, LOA, date, or negotiation evidence.",
        impact: `${pack.readiness}% document readiness`,
        view: "Documents",
        record: pack.record,
        score: 64 + pack.gaps.length * 4,
        tone: "blue",
      }),
    );

    reminders.tasks.slice(0, 5).forEach((task) =>
      addAdvisorRecommendation(recommendations, seen, {
        lane: task.lane === "Overdue" ? "Do now" : "Schedule",
        source: "Reminders",
        title: task.label,
        reason: task.note,
        action: "Open the source record and close the reminder loop.",
        impact: task.record.valueAmount ? formatCompactMoney(task.record.valueAmount) : "Follow-up control",
        view: "Reminders",
        record: task.record,
        score: task.priority,
        tone: task.tone,
      }),
    );

    if (risk.critical.length || reminders.overdue) {
      addAdvisorRecommendation(recommendations, seen, {
        lane: "Do now",
        source: "Advisor",
        title: "Run a 15-minute red review",
        reason: `${risk.critical.length} critical risks and ${reminders.overdue} overdue reminders need a short management pass.`,
        action: "Open Risk, clear owners, assign next dates, then review Calendar.",
        impact: "Management rhythm",
        view: "Risk",
        score: 96,
        tone: "red",
      });
    }

    const sorted = recommendations.sort((a, b) => b.score - a.score || a.title.localeCompare(b.title));
    const laneNames = ["Do now", "Decide", "Schedule", "Commercial", "Forecast", "Clean data"];
    const lanes = laneNames.map((name) => ({
      name,
      items: sorted.filter((item) => item.lane === name).slice(0, 8),
      count: sorted.filter((item) => item.lane === name).length,
    }));
    const commercialScore = Math.max(0, 100 - Math.min(70, contracts.gapCount));
    const decisionScore = bidDesk.activeRows.length
      ? Math.round(((bidDesk.bidRows.length + bidDesk.noBidRows.length) / bidDesk.activeRows.length) * 100)
      : 100;
    const advisorScore = Math.max(
      1,
      Math.min(
        100,
        Math.round(
          risk.controlScore * 0.24 +
            calendar.focusScore * 0.18 +
            governance.governanceScore * 0.16 +
            forecast.confidence * 0.14 +
            documents.sourceCoverage * 0.12 +
            commercialScore * 0.08 +
            decisionScore * 0.08,
        ),
      ),
    );
    const uniqueRecommendationRecords = Array.from(
      new Map(sorted.filter((item) => item.record).map((item) => [item.record.id, item.record])).values(),
    );
    const recommendationValue = sumAmounts(uniqueRecommendationRecords);
    const topAction = sorted[0];
    const topForecast = forecast.topItems[0];
    const topClient = portfolio.accounts[0];
    const brief = [
      {
        label: "Opening line",
        text: `${sorted.length} advisor recommendations are active; ${risk.critical.length} are critical-risk driven and ${calendar.noDate.length} records still need dates.`,
      },
      {
        label: "First move",
        text: topAction
          ? `${topAction.title}: ${topAction.action}`
          : "No urgent action found; continue weekly review and keep the data clean.",
      },
      {
        label: "Value line",
        text: `${formatCompactMoney(recommendationValue)} is attached to advisor-linked records; base forecast remains ${formatCompactMoney(forecast.weightedValue)}.`,
      },
      {
        label: "Client note",
        text: topClient
          ? `${topClient.label} carries the hottest relationship signal with ${topClient.openCount} open items.`
          : "Client concentration will appear as relationship history grows.",
      },
    ];
    const decisionStack = [
      { label: "Risk", value: `${risk.controlScore}%`, note: `${risk.critical.length} critical / ${risk.high.length} high`, view: "Risk", tone: "red" },
      { label: "Bid decisions", value: `${decisionScore}%`, note: `${bidDesk.watchRows.length} watch items`, view: "Bid Desk", tone: "amber" },
      { label: "Calendar", value: `${calendar.focusScore}%`, note: `${calendar.noDate.length} no-date records`, view: "Calendar", tone: "blue" },
      { label: "Forecast", value: formatCompactMoney(forecast.weightedValue), note: `${forecast.atRiskItems.length} at-risk items`, view: "Forecast", tone: "green" },
      { label: "Commercial", value: `${commercialScore}%`, note: `${contracts.gapCount} gaps`, view: "Contracts", tone: "amber" },
      { label: "Evidence", value: `${documents.sourceCoverage}%`, note: `${documents.totalGaps} document gaps`, view: "Documents", tone: "blue" },
    ];
    return {
      records,
      recommendations: sorted,
      lanes,
      advisorScore,
      confidence: Math.round((governance.governanceScore + documents.sourceCoverage + forecast.confidence) / 3),
      recommendationValue,
      doNow: sorted.filter((item) => item.lane === "Do now"),
      decisionStack,
      brief,
      sourceRows: advisorBreakdown(sorted, (item) => item.source, 8),
      ownerRows: advisorBreakdown(sorted, (item) => item.record?.owner, 6),
      clientRows: advisorBreakdown(sorted, (item) => (item.record ? accountLabelForRecord(item.record) : "Management"), 6),
      playbook: [
        ["Start red", "Open Do now and clear ownership, next dates, and evidence before anything else."],
        ["Decide fast", "Move Watch bids into Bid or No-bid so effort is not wasted."],
        ["Protect forecast", "Clean past-due and no-date value before management reporting."],
        ["Close proof gaps", "Commercial and document evidence should be updated before weekly review."],
      ],
    };
  }

  function renderPursuitAdvisorPage() {
    const model = buildPursuitAdvisorModel();
    return `
      <section class="advisor-desk">
        <section class="advisor-console">
          <div>
            <span class="panel-label">Pursuit advisor</span>
            <h2>Turn every signal into the next best move.</h2>
            <p>Advisor reads Risk, Calendar, Bid Desk, Forecast, Contracts, Documents, Governance, and Reminders, then ranks the moves that will improve operating control fastest.</p>
            <div class="advisor-actions">
              <button class="secondary-btn" type="button" data-view="Risk">Open risk control</button>
              <button class="ghost-btn" type="button" data-view="Bid Desk">Open Bid Desk</button>
              <button class="ghost-btn" type="button" data-view="Reports">Open report pack</button>
            </div>
          </div>
          <div class="advisor-score-card">
            <span>Advisor score</span>
            <strong>${model.advisorScore}%</strong>
            <small>${model.doNow.length} do-now moves / ${model.confidence}% signal confidence</small>
          </div>
        </section>

        <div class="advisor-kpis">
          ${renderInsightKpi("Recommendations", `${model.recommendations.length}`, "Ranked from live workspace signals")}
          ${renderInsightKpi("Do now", `${model.doNow.length}`, "Highest priority actions")}
          ${renderInsightKpi("Value touched", formatCompactMoney(model.recommendationValue), "Unique value connected to recommendations")}
          ${renderInsightKpi("Signal confidence", `${model.confidence}%`, "Governance, evidence, and forecast quality")}
        </div>

        <div class="advisor-layout">
          <section class="advisor-main">
            <article class="info-panel">
              <div class="info-head">
                <div>
                  <span class="metric-label">Next best actions</span>
                  <h3>Advisor lanes</h3>
                </div>
                <span>${model.recommendations.length} recommendations</span>
              </div>
              <div class="advisor-lanes">
                ${model.lanes.map(renderAdvisorLane).join("")}
              </div>
            </article>

            <article class="info-panel">
              <div class="info-head">
                <div>
                  <span class="metric-label">Decision cockpit</span>
                  <h3>Rooms that need leadership</h3>
                </div>
              </div>
              <div class="advisor-decision-grid">
                ${model.decisionStack.map(renderAdvisorDecisionCard).join("")}
              </div>
            </article>
          </section>

          <aside class="advisor-side">
            <article class="info-panel">
              <div class="info-head">
                <div>
                  <span class="metric-label">Management brief</span>
                  <h3>What to say in review</h3>
                </div>
              </div>
              ${renderAdvisorBrief(model.brief)}
            </article>

            <article class="info-panel">
              <div class="info-head">
                <div>
                  <span class="metric-label">Operating rhythm</span>
                  <h3>How to work the recommendations</h3>
                </div>
              </div>
              ${renderAdvisorPlaybook(model.playbook)}
            </article>
          </aside>
        </div>

        <div class="advisor-analytics-grid">
          <article class="info-panel">
            <div class="info-head">
              <div>
                <span class="metric-label">Source signals</span>
                <h3>Where advice is coming from</h3>
              </div>
            </div>
            ${renderRankBars(model.sourceRows, "teal")}
          </article>

          <article class="info-panel">
            <div class="info-head">
              <div>
                <span class="metric-label">Owner focus</span>
                <h3>Who needs support</h3>
              </div>
            </div>
            ${renderRankBars(model.ownerRows, "green")}
          </article>

          <article class="info-panel">
            <div class="info-head">
              <div>
                <span class="metric-label">Client focus</span>
                <h3>Accounts behind recommendations</h3>
              </div>
            </div>
            ${renderRankBars(model.clientRows, "blue")}
          </article>

          <article class="info-panel">
            <div class="info-head">
              <div>
                <span class="metric-label">Advisor posture</span>
                <h3>Current operating stance</h3>
              </div>
            </div>
            <div class="advisor-posture">
              <strong>${model.advisorScore >= 72 ? "Controlled push" : model.advisorScore >= 48 ? "Focused recovery" : "Management intervention"}</strong>
              <span>${model.advisorScore >= 72 ? "Keep the weekly rhythm tight and protect high-value movement." : model.advisorScore >= 48 ? "Clear red items, decisions, and date gaps before expanding the pipeline." : "Use Risk, Calendar, and Bid Desk first; defer cosmetic cleanup until control improves."}</span>
            </div>
          </article>
        </div>
      </section>
    `;
  }

  function renderAdvisorLane(lane) {
    return `
      <article class="advisor-lane">
        <div class="advisor-lane-head">
          <strong>${escapeHtml(lane.name)}</strong>
          <span>${lane.count}</span>
        </div>
        <div class="advisor-card-list">
          ${lane.items.length ? lane.items.map(renderAdvisorCard).join("") : `<div class="empty-state compact">No ${escapeHtml(lane.name.toLowerCase())} recommendations.</div>`}
        </div>
      </article>
    `;
  }

  function renderAdvisorCard(item) {
    const attrs = item.record
      ? `data-action="open-related-record" data-id="${escapeHtml(item.record.id)}"`
      : `data-view="${escapeHtml(item.view)}"`;
    const meta = item.record
      ? [item.record.client, dueLabel(recordDueDays(item.record)), item.impact].filter(Boolean).join(" / ")
      : item.impact;
    return `
      <button class="advisor-card tone-${escapeHtml(item.tone)}" type="button" ${attrs}>
        <span>${escapeHtml(item.source)} / ${escapeHtml(item.lane)}</span>
        <strong>${escapeHtml(item.title)}</strong>
        <em>${escapeHtml(item.reason)}</em>
        <small>${escapeHtml(meta)}</small>
        <p>${escapeHtml(item.action)}</p>
      </button>
    `;
  }

  function renderAdvisorDecisionCard(item) {
    return `
      <button class="advisor-decision-card tone-${escapeHtml(item.tone)}" type="button" data-view="${escapeHtml(item.view)}">
        <span>${escapeHtml(item.label)}</span>
        <strong>${escapeHtml(item.value)}</strong>
        <small>${escapeHtml(item.note)}</small>
      </button>
    `;
  }

  function renderAdvisorBrief(rows) {
    return `
      <div class="advisor-brief-list">
        ${rows
          .map(
            (row) => `
              <div>
                <span>${escapeHtml(row.label)}</span>
                <strong>${escapeHtml(row.text)}</strong>
              </div>
            `,
          )
          .join("")}
      </div>
    `;
  }

  function renderAdvisorPlaybook(rows) {
    return `
      <div class="advisor-playbook">
        ${rows
          .map(
            ([title, note]) => `
              <div>
                <strong>${escapeHtml(title)}</strong>
                <span>${escapeHtml(note)}</span>
              </div>
            `,
          )
          .join("")}
      </div>
    `;
  }

  function buildWeeklyReviewModel() {
    const records = companyRecords();
    const openRecords = records.filter((record) => !isClosedRecord(record));
    const advisor = buildPursuitAdvisorModel();
    const report = buildReportModel();
    const reminders = buildReminderModel();
    const calendar = buildReviewCalendarModel();
    const risk = buildRiskControlModel();
    const bidDesk = buildBidDeskModel();
    const forecast = buildForecastModel();
    const contracts = buildContractsModel();
    const documents = buildDocumentsModel();
    const governance = buildGovernanceModel();
    const reviewDate = new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    const commercialScore = contracts.records.length
      ? Math.max(0, Math.round(((contracts.records.length - contracts.gapCount) / contracts.records.length) * 100))
      : 100;
    const reviewScore = Math.max(
      1,
      Math.min(
        100,
        Math.round(
          advisor.advisorScore * 0.24 +
            risk.controlScore * 0.18 +
            calendar.focusScore * 0.16 +
            forecast.confidence * 0.14 +
            documents.sourceCoverage * 0.12 +
            governance.governanceScore * 0.1 +
            commercialScore * 0.06,
        ),
      ),
    );
    const actionRegister = advisor.recommendations.slice(0, 14).map((item, index) => {
      const record = item.record;
      return {
        rank: index + 1,
        source: item.source,
        owner: record?.owner || (item.lane === "Do now" ? "Management" : "Unassigned"),
        title: item.title,
        action: item.action,
        due: record ? dueLabel(recordDueDays(record)) : "This review",
        value: record ? formatCompactMoney(record.valueAmount) : item.impact,
        client: record ? accountLabelForRecord(record) : "Operating team",
        tone: item.tone,
        record,
        view: item.view,
      };
    });
    const decisionLog = [
      {
        label: "Bid/no-bid",
        value: bidDesk.watchRows.length,
        ask: bidDesk.watchRows.length ? "Move watch items into Bid or No-bid." : "No watch decisions waiting.",
        view: "Bid Desk",
        tone: bidDesk.watchRows.length ? "amber" : "green",
      },
      {
        label: "Critical risk",
        value: risk.critical.length,
        ask: risk.critical.length ? "Confirm owners, next date, and mitigation for red risks." : "No critical risks in this review.",
        view: "Risk",
        tone: risk.critical.length ? "red" : "green",
      },
      {
        label: "No-date records",
        value: calendar.noDate.length,
        ask: calendar.noDate.length ? "Assign review dates so work enters the calendar rhythm." : "Calendar coverage is clean.",
        view: "Calendar",
        tone: calendar.noDate.length ? "blue" : "green",
      },
      {
        label: "Commercial proof",
        value: contracts.gapCount,
        ask: contracts.gapCount ? "Close agreement, LOA, value, or handover proof gaps." : "Commercial register is controlled.",
        view: "Contracts",
        tone: contracts.gapCount ? "amber" : "green",
      },
      {
        label: "Evidence gaps",
        value: documents.totalGaps,
        ask: documents.totalGaps ? "Complete source, agreement, LOA, date, and negotiation evidence." : "Document evidence is controlled.",
        view: "Documents",
        tone: documents.totalGaps ? "blue" : "green",
      },
      {
        label: "Forecast risk",
        value: forecast.atRiskItems.length,
        ask: forecast.atRiskItems.length ? "Clean past-due, no-date, and value assumptions before reporting." : "Forecast risk is contained.",
        view: "Forecast",
        tone: forecast.atRiskItems.length ? "amber" : "green",
      },
    ];
    const agenda = [
      {
        slot: "00-05",
        title: "Open the room",
        note: `${reviewScore}% review readiness with ${openRecords.length} open records and ${advisor.recommendations.length} advisor actions.`,
        view: "Command",
        tone: "green",
      },
      {
        slot: "05-15",
        title: "Red and overdue",
        note: `${risk.critical.length} critical risks, ${risk.high.length} high risks, and ${reminders.overdue} overdue follow-ups.`,
        view: "Risk",
        tone: risk.critical.length ? "red" : "amber",
      },
      {
        slot: "15-25",
        title: "Bid decisions",
        note: `${bidDesk.watchRows.length} watch decisions, ${bidDesk.due14} due-soon submissions, ${bidDesk.readyRows.length} packs ready.`,
        view: "Bid Desk",
        tone: bidDesk.watchRows.length ? "amber" : "green",
      },
      {
        slot: "25-35",
        title: "Dates and forecast",
        note: `${calendar.noDate.length} no-date records, ${calendar.next30.length} next-30 events, ${forecast.atRiskItems.length} forecast risks.`,
        view: "Calendar",
        tone: calendar.noDate.length ? "blue" : "green",
      },
      {
        slot: "35-45",
        title: "Commercial evidence",
        note: `${contracts.gapCount} commercial gaps and ${documents.totalGaps} document gaps before management pack sharing.`,
        view: "Contracts",
        tone: contracts.gapCount || documents.totalGaps ? "amber" : "green",
      },
      {
        slot: "45-55",
        title: "Owner commitments",
        note: `${actionRegister.length} ranked actions need owner, date, and closeout status before the next review.`,
        view: "Reminders",
        tone: "teal",
      },
    ];
    const ownerRows = advisor.ownerRows.length
      ? advisor.ownerRows
      : advisorBreakdown(actionRegister, (item) => item.owner, 6);
    const sourceRows = advisor.sourceRows.length
      ? advisor.sourceRows
      : advisorBreakdown(actionRegister, (item) => item.source, 6);
    const briefLines = [
      `${records.length} records are in the review base; ${openRecords.length} remain open across tenders and projects.`,
      `${advisor.doNow.length} do-now actions should be cleared before the team moves into routine updates.`,
      `${formatCompactMoney(advisor.recommendationValue)} is tied to the ranked action register for this weekly cycle.`,
      `${forecast.confidence}% forecast confidence and ${documents.sourceCoverage}% document source coverage shape the reporting posture.`,
    ];
    const closeout = [
      ["Owners", "Every red, amber, and watch item has a named owner before the meeting closes."],
      ["Dates", "Every open item has a next review, submission, or delivery date."],
      ["Decisions", "Watch bids are converted into Bid, No-bid, or a dated decision hold."],
      ["Evidence", "Commercial and document gaps are assigned to the next owner."],
      ["Report", "Reports room is ready for print once action owners are accepted."],
    ];
    return {
      reviewDate,
      reviewScore,
      advisor,
      report,
      risk,
      calendar,
      bidDesk,
      forecast,
      contracts,
      documents,
      governance,
      agenda,
      actionRegister,
      decisionLog,
      ownerRows,
      sourceRows,
      briefLines,
      closeout,
      reviewValue: advisor.recommendationValue,
      openRecords: openRecords.length,
    };
  }

  function renderWeeklyReviewPage() {
    const model = buildWeeklyReviewModel();
    return `
      <section class="weekly-review-room">
        <section class="weekly-console">
          <div>
            <span class="panel-label">Weekly review room</span>
            <h2>Turn the weekly meeting into an operating system.</h2>
            <p>Generated on ${escapeHtml(model.reviewDate)} from Advisor, Risk, Calendar, Bid Desk, Forecast, Contracts, Documents, Governance, Reminders, and Reports.</p>
            <div class="weekly-actions">
              <button class="secondary-btn" type="button" data-view="Advisor">Open advisor</button>
              <button class="ghost-btn" type="button" data-view="Reports">Open report pack</button>
              <button class="ghost-btn" type="button" data-action="print-report">Print review</button>
            </div>
          </div>
          <div class="weekly-score-card">
            <span>Review readiness</span>
            <strong>${model.reviewScore}%</strong>
            <small>${model.actionRegister.length} action lines / ${model.decisionLog.reduce((sum, item) => sum + Number(item.value || 0), 0)} decision signals</small>
          </div>
        </section>

        <div class="weekly-kpis">
          ${renderInsightKpi("Review value", formatCompactMoney(model.reviewValue), "Value connected to the action register")}
          ${renderInsightKpi("Do-now actions", `${model.advisor.doNow.length}`, "Clear before routine updates")}
          ${renderInsightKpi("Open records", `${model.openRecords}`, "Tenders and projects still moving")}
          ${renderInsightKpi("Forecast confidence", `${model.forecast.confidence}%`, "Weighted by dates, values, and status quality")}
        </div>

        <div class="weekly-layout">
          <section class="weekly-main">
            <article class="info-panel">
              <div class="info-head">
                <div>
                  <span class="metric-label">Meeting agenda</span>
                  <h3>55-minute review flow</h3>
                </div>
                <span>${model.agenda.length} blocks</span>
              </div>
              ${renderWeeklyAgenda(model.agenda)}
            </article>

            <article class="info-panel weekly-register-panel">
              <div class="info-head">
                <div>
                  <span class="metric-label">Action register</span>
                  <h3>Owner-ready follow-through</h3>
                </div>
                <span>${model.actionRegister.length} ranked</span>
              </div>
              ${renderWeeklyActionRegister(model.actionRegister)}
            </article>

            <article class="info-panel">
              <div class="info-head">
                <div>
                  <span class="metric-label">Leadership decisions</span>
                  <h3>What needs a yes, no, or owner</h3>
                </div>
              </div>
              ${renderWeeklyDecisionLog(model.decisionLog)}
            </article>
          </section>

          <aside class="weekly-side">
            <article class="info-panel">
              <div class="info-head">
                <div>
                  <span class="metric-label">Opening brief</span>
                  <h3>Read this first</h3>
                </div>
              </div>
              ${renderWeeklyBrief(model.briefLines)}
            </article>

            <article class="info-panel">
              <div class="info-head">
                <div>
                  <span class="metric-label">Owner focus</span>
                  <h3>Where help is needed</h3>
                </div>
              </div>
              ${renderRankBars(model.ownerRows, "teal")}
            </article>
          </aside>
        </div>

        <div class="weekly-analytics-grid">
          <article class="info-panel">
            <div class="info-head">
              <div>
                <span class="metric-label">Source mix</span>
                <h3>Signal origin</h3>
              </div>
            </div>
            ${renderRankBars(model.sourceRows, "green")}
          </article>

          <article class="info-panel">
            <div class="info-head">
              <div>
                <span class="metric-label">Closeout checklist</span>
                <h3>Before leaving the room</h3>
              </div>
            </div>
            ${renderWeeklyCloseout(model.closeout)}
          </article>

          <article class="info-panel">
            <div class="info-head">
              <div>
                <span class="metric-label">Report handoff</span>
                <h3>Management pack status</h3>
              </div>
            </div>
            <div class="weekly-posture">
              <strong>${model.reviewScore >= 72 ? "Ready to run" : model.reviewScore >= 48 ? "Run with controls" : "Needs intervention"}</strong>
              <span>${model.reviewScore >= 72 ? "Use Reports after owner commitments are accepted." : model.reviewScore >= 48 ? "Clear red risks, watch bids, dates, and evidence gaps before sharing." : "Keep the review tactical until core controls are repaired."}</span>
              <button class="mini-btn" type="button" data-view="Reports">Open weekly pack</button>
            </div>
          </article>
        </div>
      </section>
    `;
  }

  function renderWeeklyAgenda(rows) {
    return `
      <div class="weekly-agenda">
        ${rows
          .map(
            (row) => `
              <button class="weekly-agenda-row tone-${escapeHtml(row.tone)}" type="button" data-view="${escapeHtml(row.view)}">
                <span>${escapeHtml(row.slot)}</span>
                <strong>${escapeHtml(row.title)}</strong>
                <em>${escapeHtml(row.note)}</em>
              </button>
            `,
          )
          .join("")}
      </div>
    `;
  }

  function renderWeeklyActionRegister(rows) {
    if (!rows.length) return `<div class="empty-state compact">No action register items for this review.</div>`;
    return `
      <div class="weekly-action-list">
        ${rows.map(renderWeeklyActionRow).join("")}
      </div>
    `;
  }

  function renderWeeklyActionRow(row) {
    const attrs = row.record
      ? `data-action="open-related-record" data-id="${escapeHtml(row.record.id)}"`
      : `data-view="${escapeHtml(row.view)}"`;
    return `
      <button class="weekly-action-row tone-${escapeHtml(row.tone)}" type="button" ${attrs}>
        <span>${row.rank}</span>
        <div>
          <strong>${escapeHtml(row.title)}</strong>
          <em>${escapeHtml(row.action)}</em>
          <small>${escapeHtml([row.owner, row.client, row.due, row.value].filter(Boolean).join(" / "))}</small>
        </div>
      </button>
    `;
  }

  function renderWeeklyDecisionLog(rows) {
    return `
      <div class="weekly-decision-grid">
        ${rows
          .map(
            (row) => `
              <button class="weekly-decision-card tone-${escapeHtml(row.tone)}" type="button" data-view="${escapeHtml(row.view)}">
                <span>${escapeHtml(row.label)}</span>
                <strong>${escapeHtml(row.value)}</strong>
                <small>${escapeHtml(row.ask)}</small>
              </button>
            `,
          )
          .join("")}
      </div>
    `;
  }

  function renderWeeklyBrief(rows) {
    return `
      <div class="weekly-brief-list">
        ${rows.map((row) => `<p>${escapeHtml(row)}</p>`).join("")}
      </div>
    `;
  }

  function renderWeeklyCloseout(rows) {
    return `
      <div class="weekly-closeout">
        ${rows
          .map(
            ([title, note]) => `
              <div>
                <strong>${escapeHtml(title)}</strong>
                <span>${escapeHtml(note)}</span>
              </div>
            `,
          )
          .join("")}
      </div>
    `;
  }

  function renderIntakeDeskPage() {
    const model = buildIntakeModel();
    return `
      <section class="intake-desk">
        <section class="intake-console">
          <div>
            <span class="panel-label">Request front door</span>
            <h2>Capture opportunities before they become messy rows.</h2>
            <p>Use Intake for controlled tender and project requests: validate the minimum information, route ownership, and convert clean submissions into the live tracker with an audit trail.</p>
            <div class="intake-actions">
              <button class="secondary-btn" type="button" data-action="focus-intake-form">New request</button>
              <button class="ghost-btn" type="button" data-view="Governance">Open governance</button>
              <button class="ghost-btn" type="button" data-view="Import">Open import</button>
            </div>
          </div>
          <div class="intake-score-card">
            <span>Intake readiness</span>
            <strong>${model.score}%</strong>
            <small>${model.cleanPending.length} ready / ${model.pending.length} pending requests</small>
          </div>
        </section>

        <div class="intake-kpis">
          ${renderInsightKpi("Pending requests", `${model.pending.length}`, `${model.dueSoon} due in 30 days`)}
          ${renderInsightKpi("Ready to convert", `${model.cleanPending.length}`, `${model.blocked.length} blocked by missing fields`)}
          ${renderInsightKpi("Pending value", formatCompactMoney(model.pendingValue), "Value waiting at intake")}
          ${renderInsightKpi("Converted value", formatCompactMoney(model.convertedValue), `${model.approved.length} approved requests`)}
        </div>

        <div class="intake-layout">
          <section class="intake-main">
            <article class="info-panel intake-form-panel" id="intakeFormPanel">
              <div class="info-head">
                <div>
                  <span class="metric-label">New request</span>
                  <h3>Opportunity intake form</h3>
                </div>
                <span>${canEdit() ? "Editor enabled" : "Read only"}</span>
              </div>
              ${renderIntakeForm()}
            </article>

            <article class="info-panel intake-queue-panel">
              <div class="info-head">
                <div>
                  <span class="metric-label">Request queue</span>
                  <h3>Validate and convert</h3>
                </div>
                <span>${model.requests.length} requests</span>
              </div>
              ${renderIntakeQueue(model.requests)}
            </article>
          </section>

          <aside class="intake-side">
            <article class="info-panel">
              <div class="info-head">
                <div>
                  <span class="metric-label">Validation</span>
                  <h3>Missing-field watch</h3>
                </div>
                <span>${model.blocked.length} blocked</span>
              </div>
              ${renderIntakeValidationList(model.blocked)}
            </article>

            <article class="info-panel">
              <div class="info-head">
                <div>
                  <span class="metric-label">Priority</span>
                  <h3>What to process first</h3>
                </div>
                <span>${model.priorityRows.length} shown</span>
              </div>
              ${renderIntakePriorityList(model.priorityRows)}
            </article>
          </aside>
        </div>

        <div class="intake-analytics-grid">
          <article class="info-panel">
            <div class="info-head">
              <div>
                <span class="metric-label">Channel mix</span>
                <h3>Where requests arrive</h3>
              </div>
            </div>
            ${renderRankBars(model.channelRows, "teal")}
          </article>

          <article class="info-panel">
            <div class="info-head">
              <div>
                <span class="metric-label">Type mix</span>
                <h3>Tender or project</h3>
              </div>
            </div>
            ${renderRankBars(model.typeRows, "blue")}
          </article>

          <article class="info-panel">
            <div class="info-head">
              <div>
                <span class="metric-label">Status lane</span>
                <h3>Intake movement</h3>
              </div>
            </div>
            ${renderRankBars(model.statusRows, "amber")}
          </article>

          <article class="info-panel intake-playbook-panel">
            <div class="info-head">
              <div>
                <span class="metric-label">Intake rhythm</span>
                <h3>Conversion loop</h3>
              </div>
            </div>
            ${renderIntakePlaybook()}
          </article>
        </div>
      </section>
    `;
  }

  function renderIntakeForm() {
    const disabled = canEdit() ? "" : "disabled";
    return `
      <form class="intake-form" id="intakeForm">
        <div class="intake-form-grid">
          <label>
            <span>Type</span>
            <select name="type" ${disabled}>
              ${TYPE_OPTIONS.map((type) => `<option value="${escapeHtml(type)}" ${type === "Tender" ? "selected" : ""}>${escapeHtml(type)}</option>`).join("")}
            </select>
          </label>
          <label>
            <span>Reference</span>
            <input name="reference" placeholder="Client / tender reference" ${disabled}>
          </label>
          <label>
            <span>Client</span>
            <input name="client" placeholder="Client or account" required ${disabled}>
          </label>
          <label>
            <span>Category</span>
            <input name="category" placeholder="E&I, Software, Telecom..." required ${disabled}>
          </label>
          <label class="span-2">
            <span>Title</span>
            <input name="title" placeholder="Short opportunity or project title" required ${disabled}>
          </label>
          <label>
            <span>Due / target date</span>
            <input name="endDate" type="date" ${disabled}>
          </label>
          <label>
            <span>Value</span>
            <input name="valueText" placeholder="AED 1,250,000" ${disabled}>
          </label>
          <label>
            <span>Owner</span>
            <input name="owner" value="${escapeHtml(state.user.name)}" ${disabled}>
          </label>
          <label>
            <span>Channel</span>
            <select name="channel" ${disabled}>
              ${["Email request", "Client portal", "Management review", "Sales lead", "Procurement notice", "Operations call", "Manual request"]
                .map((channel) => `<option value="${escapeHtml(channel)}">${escapeHtml(channel)}</option>`)
                .join("")}
            </select>
          </label>
          <label class="span-2">
            <span>Notes</span>
            <textarea name="notes" placeholder="Scope, next move, commercial note..." ${disabled}></textarea>
          </label>
        </div>
        <div class="intake-form-actions">
          <button class="primary-btn" type="submit" ${disabled}>Submit request</button>
          <button class="ghost-btn" type="reset" ${disabled}>Clear</button>
        </div>
      </form>
    `;
  }

  function renderIntakeQueue(requests) {
    if (!requests.length) return `<div class="empty-state compact">No intake requests yet.</div>`;
    return `
      <div class="intake-queue-list">
        ${requests.map((request) => {
          const missing = intakeMissingFields(request);
          const converted = request.status === "Approved" && request.convertedRecordId;
          const score = intakePriority(request);
          return `
            <div class="intake-request-row tone-${escapeHtml(intakeStatusTone(request.status))}">
              <div>
                <span>${escapeHtml(request.status)}</span>
                <strong>${escapeHtml(request.title || request.reference || "Untitled request")}</strong>
                <em>${escapeHtml([request.reference, request.client, request.type, request.channel, request.endDate ? formatDate(request.endDate) : "No date"].filter(Boolean).join(" / "))}</em>
                <small>${missing.length ? `Missing ${missing.join(", ")}` : `Ready score ${score}/100`}${converted ? ` / Converted to ${request.convertedRecordId}` : ""}</small>
              </div>
              <div class="intake-row-actions">
                ${converted ? `<button class="mini-btn" type="button" data-action="open-related-record" data-id="${escapeHtml(request.convertedRecordId)}">Open</button>` : ""}
                <button class="mini-btn primary-mini" type="button" data-action="convert-intake" data-id="${escapeHtml(request.id)}" ${canEdit() && request.status !== "Approved" && !missing.length ? "" : "disabled"}>Convert</button>
                <button class="mini-btn" type="button" data-action="rework-intake" data-id="${escapeHtml(request.id)}" ${canEdit() && request.status !== "Approved" ? "" : "disabled"}>Rework</button>
                <button class="mini-btn danger" type="button" data-action="delete-intake" data-id="${escapeHtml(request.id)}" ${canEdit() ? "" : "disabled"}>Del</button>
              </div>
            </div>
          `;
        }).join("")}
      </div>
    `;
  }

  function renderIntakeValidationList(requests) {
    if (!requests.length) return `<div class="empty-state compact">All pending requests have the required fields.</div>`;
    return `
      <div class="command-list">
        ${requests.slice(0, 8).map((request) => `
          <div class="command-row tone-amber static-row">
            <span>${intakeMissingFields(request).length} gaps</span>
            <strong>${escapeHtml(request.title || request.reference || "Untitled request")}</strong>
            <em>${escapeHtml(intakeMissingFields(request).join(" / "))}</em>
          </div>
        `).join("")}
      </div>
    `;
  }

  function renderIntakePriorityList(rows) {
    if (!rows.length) return `<div class="empty-state compact">No pending requests waiting.</div>`;
    return `
      <div class="command-list">
        ${rows.map(({ request, score, missing }) => `
          <div class="command-row tone-${missing.length ? "amber" : "teal"} static-row">
            <span>${score}/100</span>
            <strong>${escapeHtml(request.title || request.reference || "Untitled request")}</strong>
            <em>${escapeHtml([request.client, request.type, request.endDate ? formatDate(request.endDate) : "No date"].filter(Boolean).join(" / "))}</em>
          </div>
        `).join("")}
      </div>
    `;
  }

  function renderIntakePlaybook() {
    const rows = [
      ["1", "Capture", "Use the form for new client, sales, or management requests."],
      ["2", "Validate", "Reference, client, title, category, date, and owner should be clean."],
      ["3", "Convert", "Clean requests become live tender or project records."],
      ["4", "Govern", "Every request and conversion appears in the audit trail."],
    ];
    return `
      <div class="command-rhythm intake-playbook">
        ${rows.map(([step, title, note]) => `
          <div>
            <span>${escapeHtml(step)}</span>
            <strong>${escapeHtml(title)}</strong>
            <em>${escapeHtml(note)}</em>
          </div>
        `).join("")}
      </div>
    `;
  }

  function intakeStatusTone(status) {
    if (status === "Approved") return "green";
    if (status === "Rework") return "amber";
    return "teal";
  }

  function renderImportStudioPage() {
    const model = buildImportStudioModel();
    const preview = model.preview;
    return `
      <section class="import-studio">
        <section class="import-console">
          <div>
            <span class="panel-label">Import control</span>
            <h2>Turn Excel exports into clean workspace rows.</h2>
            <p>Paste CSV or Excel-copied rows, preview every line, then import only clean records. Existing references, missing fields, source gaps, and coverage health stay visible before the team trusts the data.</p>
            <div class="import-actions">
              <button class="secondary-btn" type="button" data-action="load-import-sample">Load sample</button>
              <button class="ghost-btn" type="button" data-action="download-import-template">Template CSV</button>
              <label class="ghost-btn import-file-button">
                Upload CSV
                <input type="file" accept=".csv,.txt,.tsv" data-import-file>
              </label>
            </div>
          </div>
          <div class="import-score-card">
            <span>Field coverage</span>
            <strong>${model.fieldCoverage}%</strong>
            <small>${model.sourceWorkbooks} source workbooks / ${model.issueCount} intake issues</small>
          </div>
        </section>

        <div class="import-kpis">
          ${renderInsightKpi("Workspace rows", `${model.records.length}`, "Records currently stored")}
          ${renderInsightKpi("Source workbooks", `${model.sourceWorkbooks}`, `${model.sheetRows.length} source sheets visible`)}
          ${renderInsightKpi("Duplicate refs", `${model.duplicateGroups.length}`, `${model.duplicateCount} rows in duplicate groups`)}
          ${renderInsightKpi("Missing fields", `${model.missingCount}`, "Rows needing cleanup before reporting")}
        </div>

        <div class="import-layout">
          <section class="import-main">
            <article class="info-panel import-entry-panel">
              <div class="info-head">
                <div>
                  <span class="metric-label">CSV intake</span>
                  <h3>Preview before commit</h3>
                </div>
                <span>${preview ? `${preview.validCount} clean` : "Ready"}</span>
              </div>
              <textarea id="importCsvText" class="import-textarea" data-import-text spellcheck="false" placeholder="${escapeHtml(IMPORT_COLUMNS.join(","))}">${escapeHtml(state.importText)}</textarea>
              <div class="import-toolbar">
                <div class="import-message">${escapeHtml(state.importMessage || "No import queued.")}</div>
                <div class="import-toolbar-actions">
                  <button class="secondary-btn" type="button" data-action="preview-import">Preview CSV</button>
                  <button class="primary-btn" type="button" data-action="commit-import" ${preview && preview.validCount && canEdit() ? "" : "disabled"}>Import clean rows</button>
                  <button class="ghost-btn" type="button" data-action="clear-import">Clear</button>
                </div>
              </div>
            </article>

            ${renderImportPreviewPanel(preview)}
          </section>

          <aside class="import-side">
            <article class="info-panel">
              <div class="info-head">
                <div>
                  <span class="metric-label">Source health</span>
                  <h3>Workbook coverage</h3>
                </div>
                <span>${model.sourceRows.length} sources</span>
              </div>
              ${renderImportSourceRows(model.sourceRows)}
            </article>

            <article class="info-panel">
              <div class="info-head">
                <div>
                  <span class="metric-label">Field map</span>
                  <h3>Coverage by column</h3>
                </div>
                <span>${model.fieldCoverage}%</span>
              </div>
              ${renderImportCoverageRows(model.coverageRows)}
            </article>
          </aside>
        </div>

        <div class="import-analytics-grid">
          <article class="info-panel">
            <div class="info-head">
              <div>
                <span class="metric-label">Duplicate watch</span>
                <h3>Repeated references</h3>
              </div>
            </div>
            ${renderImportDuplicateList(model.duplicateGroups)}
          </article>

          <article class="info-panel">
            <div class="info-head">
              <div>
                <span class="metric-label">Cleanup queue</span>
                <h3>Missing-field records</h3>
              </div>
              <span>${model.missingCount} total</span>
            </div>
            ${renderImportMissingList(model.missingRecords)}
          </article>

          <article class="info-panel">
            <div class="info-head">
              <div>
                <span class="metric-label">Sheet heat</span>
                <h3>Most used sheets</h3>
              </div>
            </div>
            ${renderImportSourceRows(model.sheetRows)}
          </article>

          <article class="info-panel import-playbook-panel">
            <div class="info-head">
              <div>
                <span class="metric-label">Import rhythm</span>
                <h3>Governance loop</h3>
              </div>
            </div>
            ${renderImportPlaybook()}
          </article>
        </div>
      </section>
    `;
  }

  function renderImportPreviewPanel(preview) {
    if (!preview) {
      return `
        <article class="info-panel import-preview-panel">
          <div class="info-head">
            <div>
              <span class="metric-label">Preview grid</span>
              <h3>No preview yet</h3>
            </div>
          </div>
          <div class="empty-state">Paste rows or load the sample, then preview the import.</div>
        </article>
      `;
    }
    if (preview.errors.length) {
      return `
        <article class="info-panel import-preview-panel">
          <div class="info-head">
            <div>
              <span class="metric-label">Preview grid</span>
              <h3>Import blocked</h3>
            </div>
            <span>${preview.rawCount} rows</span>
          </div>
          <div class="empty-state">${escapeHtml(preview.errors[0])}</div>
        </article>
      `;
    }
    return `
      <article class="info-panel import-preview-panel">
        <div class="info-head">
          <div>
            <span class="metric-label">Preview grid</span>
            <h3>Rows waiting for import</h3>
          </div>
          <span>${preview.validCount} clean / ${preview.issueCount} issues</span>
        </div>
        <div class="import-preview-wrap">
          <table class="import-preview-table">
            <thead>
              <tr>
                <th>Row</th>
                <th>Type</th>
                <th>Reference</th>
                <th>Client</th>
                <th>Title</th>
                <th>Status</th>
                <th>Value</th>
                <th>Issues</th>
              </tr>
            </thead>
            <tbody>
              ${preview.rows
                .slice(0, 14)
                .map(
                  (row) => `
                    <tr class="${row.issues.length ? "has-issues" : "is-clean"}">
                      <td>${row.rowNumber}</td>
                      <td>${escapeHtml(row.record.type)}</td>
                      <td>${escapeHtml(row.record.reference || "-")}</td>
                      <td>${escapeHtml(row.record.client || "-")}</td>
                      <td>${escapeHtml(row.record.title || "-")}</td>
                      <td><span class="status-badge ${statusClass(row.record.status)}">${escapeHtml(row.record.status)}</span></td>
                      <td>${escapeHtml(row.record.valueAmount ? formatCompactMoney(row.record.valueAmount) : "-")}</td>
                      <td>${row.issues.length ? row.issues.map((issue) => `<span>${escapeHtml(issue)}</span>`).join("") : "<strong>Clean</strong>"}</td>
                    </tr>
                  `,
                )
                .join("")}
            </tbody>
          </table>
        </div>
        <div class="import-preview-note">${preview.rows.length > 14 ? `Showing 14 of ${preview.rows.length} parsed rows.` : `${preview.rows.length} parsed rows.`}</div>
      </article>
    `;
  }

  function renderImportSourceRows(rows) {
    if (!rows.length) return `<div class="empty-state compact">No source rows available.</div>`;
    const total = Math.max(1, rows.reduce((sum, row) => sum + row.value, 0));
    return `
      <div class="import-source-list">
        ${rows
          .map((row) => `
            <div>
              <span>${escapeHtml(row.label)}</span>
              <strong>${row.value}</strong>
              <i style="--width: ${Math.max(4, Math.round((row.value / total) * 100))}%"></i>
            </div>
          `)
          .join("")}
      </div>
    `;
  }

  function renderImportCoverageRows(rows) {
    return `
      <div class="import-coverage-list">
        ${rows
          .map((row) => `
            <div>
              <span>${escapeHtml(row.label)}</span>
              <strong>${row.rate}%</strong>
              <i style="--width: ${Math.max(4, row.rate)}%"></i>
              <small>${row.filled}/${row.total} filled</small>
            </div>
          `)
          .join("")}
      </div>
    `;
  }

  function renderImportDuplicateList(groups) {
    if (!groups.length) return `<div class="empty-state compact">No duplicate references found.</div>`;
    return `
      <div class="command-list">
        ${groups
          .map((group) => `
            <div class="command-row tone-amber static-row">
              <span>${group.count} rows</span>
              <strong>${escapeHtml(group.reference)}</strong>
              <em>${escapeHtml(group.clients.join(" / ") || "No client")}</em>
            </div>
          `)
          .join("")}
      </div>
    `;
  }

  function renderImportMissingList(items) {
    if (!items.length) return `<div class="empty-state compact">No missing-field records found.</div>`;
    return `
      <div class="command-list">
        ${items
          .map((item) => `
            <button class="command-row tone-red" type="button" data-action="open-related-record" data-id="${escapeHtml(item.record.id)}">
              <span>${item.gaps.length} gaps</span>
              <strong>${escapeHtml(item.record.title || item.record.reference || "Untitled record")}</strong>
              <em>${escapeHtml(item.gaps.join(" / "))}</em>
            </button>
          `)
          .join("")}
      </div>
    `;
  }

  function renderImportPlaybook() {
    const rows = [
      ["1", "Load source", "Paste CSV, upload a file, or use the template."],
      ["2", "Preview rows", "Check duplicate references and missing core fields."],
      ["3", "Commit clean", "Only issue-free rows enter the live workspace."],
      ["4", "Review rooms", "Open Tenders, Projects, Documents, or Reports after import."],
    ];
    return `
      <div class="command-rhythm import-playbook">
        ${rows
          .map(
            ([step, title, note]) => `
              <div>
                <span>${escapeHtml(step)}</span>
                <strong>${escapeHtml(title)}</strong>
                <em>${escapeHtml(note)}</em>
              </div>
            `,
          )
          .join("")}
      </div>
    `;
  }

  function renderGovernancePage() {
    const model = buildGovernanceModel();
    return `
      <section class="governance-desk">
        <section class="governance-console">
          <div>
            <span class="panel-label">Trust control</span>
            <h2>Keep every pursuit decision reviewable.</h2>
            <p>Governance brings the hidden management layer into the product: audit trail, high-value approvals, access control visibility, and policy health for tenders, projects, imports, reports, and evidence.</p>
            <div class="governance-actions">
              <button class="secondary-btn" type="button" data-view="Reports">Open weekly pack</button>
              <button class="ghost-btn" type="button" data-view="Reminders">Open follow-ups</button>
              <button class="ghost-btn" type="button" data-view="Membership">Review users</button>
            </div>
          </div>
          <div class="score-ring governance-score" style="--score: ${model.governanceScore}">
            <div>
              <strong>${model.governanceScore}</strong>
              <span>Trust</span>
            </div>
          </div>
        </section>

        <div class="governance-kpis">
          ${renderInsightKpi("Pending reviews", `${model.pendingReviews.length}`, `${model.reviewRows.length} policy-sensitive records`)}
          ${renderInsightKpi("Audit entries", `${model.auditRows.length}`, "Recent local activity ledger")}
          ${renderInsightKpi("Source coverage", `${model.sourceCoverage}%`, "Records linked to workbook and sheet")}
          ${renderInsightKpi("Owner coverage", `${model.ownerCoverage}%`, "Records with an accountable owner")}
        </div>

        ${renderDataArchitecturePanel(model.dataArchitecture)}

        <div class="governance-layout">
          <section class="governance-main">
            <article class="info-panel governance-review-panel">
              <div class="info-head">
                <div>
                  <span class="metric-label">Approval queue</span>
                  <h3>High-value and policy-sensitive records</h3>
                </div>
                <span>${model.pendingReviews.length} pending</span>
              </div>
              ${renderGovernanceReviewQueue(model.reviewRows)}
            </article>

            <article class="info-panel governance-audit-panel">
              <div class="info-head">
                <div>
                  <span class="metric-label">Audit trail</span>
                  <h3>Recent workspace activity</h3>
                </div>
                <span>${model.auditRows.length} entries</span>
              </div>
              ${renderAuditTimeline(model.auditRows)}
            </article>
          </section>

          <aside class="governance-side">
            <article class="info-panel">
              <div class="info-head">
                <div>
                  <span class="metric-label">Policy health</span>
                  <h3>Control checks</h3>
                </div>
                <span>${model.governanceScore}%</span>
              </div>
              ${renderGovernancePolicyRows(model.policyRows)}
            </article>

            <article class="info-panel">
              <div class="info-head">
                <div>
                  <span class="metric-label">Access matrix</span>
                  <h3>User section control</h3>
                </div>
                <span>${model.users.length} users</span>
              </div>
              ${renderGovernanceAccessRows(model.accessRows)}
            </article>
          </aside>
        </div>

        <div class="governance-analytics-grid">
          <article class="info-panel">
            <div class="info-head">
              <div>
                <span class="metric-label">Actor activity</span>
                <h3>Who changed things</h3>
              </div>
            </div>
            ${renderRankBars(model.actorRows, "teal")}
          </article>

          <article class="info-panel">
            <div class="info-head">
              <div>
                <span class="metric-label">Action mix</span>
                <h3>What changed</h3>
              </div>
            </div>
            ${renderRankBars(model.actionRows, "amber")}
          </article>

          <article class="info-panel">
            <div class="info-head">
              <div>
                <span class="metric-label">Review state</span>
                <h3>Approval progress</h3>
              </div>
            </div>
            ${renderGovernanceReviewSummary(model)}
          </article>

          <article class="info-panel governance-playbook-panel">
            <div class="info-head">
              <div>
                <span class="metric-label">Governance rhythm</span>
                <h3>Weekly control loop</h3>
              </div>
            </div>
            ${renderGovernancePlaybook()}
          </article>
        </div>
      </section>
    `;
  }

  function renderGovernanceReviewQueue(items) {
    if (!items.length) return `<div class="empty-state compact">No governance-sensitive records found.</div>`;
    return `
      <div class="governance-review-list">
        ${items.slice(0, 10).map((item) => {
          const record = item.record;
          const reviewed = Boolean(item.reviewed);
          const reviewedBy = reviewed ? `${item.reviewed.by} / ${formatAuditTime(item.reviewed.at)}` : "";
          return `
            <div class="governance-review-row ${reviewed ? "is-reviewed" : ""}">
              <div>
                <span>${escapeHtml(reviewed ? "Reviewed" : "Needs review")}</span>
                <strong>${escapeHtml(record.title || record.reference || "Untitled record")}</strong>
                <em>${escapeHtml([record.reference, record.client, record.type, record.status, formatCompactMoney(record.valueAmount)].filter(Boolean).join(" / "))}</em>
                <small>${escapeHtml(item.reasons.join(" / "))}${reviewed ? ` / ${escapeHtml(reviewedBy)}` : ""}</small>
              </div>
              <div class="governance-row-actions">
                <button class="mini-btn" type="button" data-action="open-related-record" data-id="${escapeHtml(record.id)}">Open</button>
                <button class="mini-btn ${reviewed ? "" : "primary-mini"}" type="button" data-action="mark-governance-reviewed" data-id="${escapeHtml(record.id)}" ${canEdit() && !reviewed ? "" : "disabled"}>Review</button>
              </div>
            </div>
          `;
        }).join("")}
      </div>
    `;
  }

  function renderAuditTimeline(entries) {
    if (!entries.length) return `<div class="empty-state compact">No audit entries yet.</div>`;
    return `
      <div class="audit-timeline">
        ${entries.slice(0, 16).map((entry) => `
          <button class="audit-row tone-${escapeHtml(entry.tone || "teal")}" type="button" data-action="open-related-record" data-id="${escapeHtml(entry.recordId || "")}" ${entry.recordId ? "" : "disabled"}>
            <span>${escapeHtml(formatAuditTime(entry.ts))}</span>
            <strong>${escapeHtml(entry.action)}</strong>
            <em>${escapeHtml(entry.target || "Workspace")}</em>
            <small>${escapeHtml([entry.actor, entry.role, entry.detail].filter(Boolean).join(" / "))}</small>
          </button>
        `).join("")}
      </div>
    `;
  }

  function renderGovernancePolicyRows(rows) {
    return `
      <div class="governance-policy-list">
        ${rows.map((row) => `
          <div class="tone-${escapeHtml(row.tone)}">
            <span>${escapeHtml(row.label)}</span>
            <strong>${row.value}%</strong>
            <i style="--width: ${Math.max(4, row.value)}%"></i>
            <small>${escapeHtml(row.note)}</small>
          </div>
        `).join("")}
      </div>
    `;
  }

  function renderGovernanceAccessRows(rows) {
    return `
      <div class="governance-access-list">
        ${rows.map((row) => `
          <div>
            <span>${escapeHtml(row.user.role)}</span>
            <strong>${escapeHtml(row.user.name)}</strong>
            <em>${row.access.length} sections / ${row.auditCount} recent actions</em>
            <small>${row.governance ? "Governance enabled" : "No governance access"} / ${row.commercial ? "Commercial access" : "No commercial access"}</small>
          </div>
        `).join("")}
      </div>
    `;
  }

  function renderDataArchitecturePanel(model) {
    return `
      <section class="data-architecture-panel info-panel" aria-label="${BRAND_NAME} data architecture">
        <div class="info-head">
          <div>
            <span class="metric-label">Data architecture</span>
            <h3>Separate daily trackers from commercial intelligence</h3>
          </div>
          <span>${model.layers.length} layers</span>
        </div>
        <div class="data-guard-grid">
          ${model.guardRows.map((row) => `
            <div class="data-guard-card tone-${escapeHtml(row.tone)}">
              <span>${escapeHtml(row.label)}</span>
              <strong>${row.value}%</strong>
              <i style="--width: ${Math.max(4, row.value)}%"></i>
              <small>${escapeHtml(row.note)}</small>
            </div>
          `).join("")}
        </div>
        <div class="data-layer-grid">
          ${model.layers.map((layer) => `
            <article class="data-layer-card layer-${escapeHtml(layer.tone)}">
              <div class="data-layer-head">
                <span>${escapeHtml(layer.owner)}</span>
                <strong>${escapeHtml(layer.label)}</strong>
              </div>
              <p>${escapeHtml(layer.rule)}</p>
              <div class="data-layer-meta">
                <div><span>Records ready</span><strong>${layer.count}</strong></div>
                <div><span>Readiness</span><strong>${layer.readiness}%</strong></div>
                <div><span>Users</span><strong>${layer.users}</strong></div>
              </div>
              <div class="data-chip-row">
                ${layer.sections.map((section) => `<span>${escapeHtml(section)}</span>`).join("")}
              </div>
              <div class="field-chip-row">
                ${layer.fields.map((field) => `<span>${escapeHtml(field)}</span>`).join("")}
              </div>
            </article>
          `).join("")}
        </div>
      </section>
    `;
  }

  function renderGovernanceReviewSummary(model) {
    const reviewed = model.reviewedCount;
    const pending = model.pendingReviews.length;
    const total = Math.max(1, model.reviewRows.length);
    const reviewedWidth = Math.round((reviewed / total) * 100);
    const pendingWidth = Math.round((pending / total) * 100);
    return `
      <div class="governance-summary">
        <div>
          <span>Reviewed</span>
          <strong>${reviewed}</strong>
          <i style="--width: ${Math.max(4, reviewedWidth)}%"></i>
        </div>
        <div>
          <span>Pending</span>
          <strong>${pending}</strong>
          <i class="pending" style="--width: ${Math.max(4, pendingWidth)}%"></i>
        </div>
        <p>${model.reviewRows.length} records currently carry high-value, source, negotiated submission, or agreement review signals.</p>
      </div>
    `;
  }

  function renderGovernancePlaybook() {
    const rows = [
      ["1", "Review high-value items", "Clear the approval queue before commercial meetings."],
      ["2", "Check audit trail", "Confirm imports, edits, deletes, user changes, and reviews are traceable."],
      ["3", "Tighten access", "Keep commercial and governance pages limited to the right users."],
      ["4", "Print the pack", "Open Reports when the governance score and actions are ready."],
    ];
    return `
      <div class="command-rhythm governance-playbook">
        ${rows.map(([step, title, note]) => `
          <div>
            <span>${escapeHtml(step)}</span>
            <strong>${escapeHtml(title)}</strong>
            <em>${escapeHtml(note)}</em>
          </div>
        `).join("")}
      </div>
    `;
  }

  function formatAuditTime(value) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "Now";
    return date.toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function forecastProbability(record) {
    if (record.status === "Cancelled" || record.status === "Regret") return 0;
    if (record.status === "Completed") return 100;
    if (record.status === "Awarded") return 92;
    if (record.type === "Project" && record.status === "Ongoing") return 78;
    if (record.status === "Submitted") return 62;
    if (record.status === "Pending") return 46;
    if (record.type === "EOI") return 18;
    if (record.status === "Active") return 34;
    return 30;
  }

  function forecastWindow(record) {
    if (["Awarded", "Completed"].includes(record.status)) return { label: "Committed", order: 0, tone: "green" };
    const days = recordDueDays(record);
    if (days === null) return { label: "No date", order: 6, tone: "muted" };
    if (days < 0) return { label: "Past due", order: 1, tone: "red" };
    if (days <= 30) return { label: "Next 30 days", order: 2, tone: "amber" };
    if (days <= 90) return { label: "31-90 days", order: 3, tone: "blue" };
    if (days <= 180) return { label: "91-180 days", order: 4, tone: "green" };
    return { label: "Later", order: 5, tone: "teal" };
  }

  function buildForecastModel() {
    const records = companyRecords();
    const forecastItems = records
      .filter((record) => Number(record.valueAmount) > 0 && !["Cancelled", "Regret"].includes(record.status))
      .map((record) => {
        const probability = forecastProbability(record);
        const amount = Number(record.valueAmount) || 0;
        const weightedValue = amount * (probability / 100);
        const window = forecastWindow(record);
        const confidence =
          probability +
          (record.endDate ? 8 : -10) +
          (record.client ? 4 : -4) +
          ((record.rounds || []).length ? 4 : 0) +
          (record.agreementNo ? 5 : 0);
        return {
          record,
          amount,
          probability,
          weightedValue,
          window,
          confidence: Math.max(8, Math.min(100, Math.round(confidence))),
        };
      });
    const weightedValue = forecastItems.reduce((total, item) => total + item.weightedValue, 0);
    const totalValue = forecastItems.reduce((total, item) => total + item.amount, 0);
    const next90Weighted = forecastItems
      .filter((item) => item.window.order >= 2 && item.window.order <= 3)
      .reduce((total, item) => total + item.weightedValue, 0);
    const committedValue = forecastItems
      .filter((item) => ["Awarded", "Completed"].includes(item.record.status) || item.record.type === "Project")
      .reduce((total, item) => total + item.weightedValue, 0);
    const confidence = totalValue ? Math.round((weightedValue / totalValue) * 100) : 0;
    const windowMap = new Map();
    forecastItems.forEach((item) => {
      const current = windowMap.get(item.window.label) || {
        label: item.window.label,
        value: 0,
        raw: 0,
        count: 0,
        tone: item.window.tone,
        order: item.window.order,
      };
      current.value += item.weightedValue;
      current.raw += item.amount;
      current.count += 1;
      windowMap.set(item.window.label, current);
    });
    const windowTemplate = [
      { label: "Committed", order: 0, tone: "green" },
      { label: "Past due", order: 1, tone: "red" },
      { label: "Next 30 days", order: 2, tone: "amber" },
      { label: "31-90 days", order: 3, tone: "blue" },
      { label: "91-180 days", order: 4, tone: "green" },
      { label: "Later", order: 5, tone: "teal" },
      { label: "No date", order: 6, tone: "muted" },
    ];
    const windowRows = windowTemplate.map((row) => windowMap.get(row.label) || { ...row, value: 0, raw: 0, count: 0 });
    const clientMap = new Map();
    forecastItems.forEach((item) => {
      const label = accountLabelForRecord(item.record);
      const current = clientMap.get(label) || { label, value: 0, raw: 0, count: 0, records: [] };
      current.value += item.weightedValue;
      current.raw += item.amount;
      current.count += 1;
      current.records.push(item.record);
      clientMap.set(label, current);
    });
    const clientRows = Array.from(clientMap.values()).sort((a, b) => b.value - a.value).slice(0, 7);
    const statusRows = Array.from(
      forecastItems.reduce((map, item) => {
        const label = item.record.status || "Unknown";
        const current = map.get(label) || { label, value: 0, raw: 0, count: 0 };
        current.value += item.weightedValue;
        current.raw += item.amount;
        current.count += 1;
        map.set(label, current);
        return map;
      }, new Map()).values(),
    ).sort((a, b) => b.value - a.value);
    const tenderWeighted = forecastItems
      .filter((item) => item.record.type === "Tender" || item.record.type === "EOI")
      .reduce((total, item) => total + item.weightedValue, 0);
    const projectWeighted = forecastItems
      .filter((item) => item.record.type === "Project")
      .reduce((total, item) => total + item.weightedValue, 0);
    const risks = [
      {
        label: "No date value",
        value: forecastItems.filter((item) => item.window.label === "No date").reduce((total, item) => total + item.weightedValue, 0),
        note: "Weighted value missing forecast timing",
      },
      {
        label: "Past due value",
        value: forecastItems.filter((item) => item.window.label === "Past due").reduce((total, item) => total + item.weightedValue, 0),
        note: "Weighted value with dates already passed",
      },
      {
        label: "Low probability value",
        value: forecastItems.filter((item) => item.probability < 40).reduce((total, item) => total + item.amount, 0),
        note: "Raw value below 40% conversion probability",
      },
    ];
    return {
      records,
      forecastItems,
      weightedValue,
      totalValue,
      next90Weighted,
      committedValue,
      confidence,
      tenderWeighted,
      projectWeighted,
      windowRows,
      clientRows,
      statusRows,
      risks,
      topItems: [...forecastItems].sort((a, b) => b.weightedValue - a.weightedValue).slice(0, 10),
      atRiskItems: [...forecastItems]
        .filter((item) => item.window.label === "Past due" || item.window.label === "No date" || item.probability < 40)
        .sort((a, b) => b.amount - a.amount)
        .slice(0, 6),
      scenarios: [
        { label: "Conservative", value: weightedValue * 0.72, note: "Only the strongest visible conversion is assumed." },
        { label: "Base forecast", value: weightedValue, note: "Current weighted probability by status and record quality." },
        { label: "Upside", value: Math.min(totalValue, weightedValue * 1.22), note: "Better movement on negotiations, dates, and client decisions." },
      ],
      assumptions: [
        ["Awarded", "92%", "Awarded tenders are counted close to committed."],
        ["Ongoing projects", "78%", "Live delivery carries strong but not final forecast weight."],
        ["Submitted", "62%", "Submitted bids carry mid-high conversion weight."],
        ["Active tender", "34%", "Early pipeline stays conservative until submission or negotiation."],
      ],
    };
  }

  function renderForecastPage() {
    const model = buildForecastModel();
    return `
      <section class="forecast-room">
        <section class="forecast-console">
          <div>
            <span class="panel-label">Forecast room</span>
            <h2>Turn the live tracker into a forward value view.</h2>
            <p>Forecast uses transparent probability assumptions from status, record quality, dates, and commercial proof. It gives management a practical forward view without pretending the spreadsheet is magic.</p>
            <div class="forecast-actions">
              <button class="secondary-btn" type="button" data-view="Tenders">Open tenders</button>
              <button class="ghost-btn" type="button" data-view="Projects">Open projects</button>
              <button class="ghost-btn" type="button" data-view="Reports">Open report pack</button>
            </div>
          </div>
          <div class="forecast-total-card">
            <span>Base weighted forecast</span>
            <strong>${escapeHtml(formatCompactMoney(model.weightedValue))}</strong>
            <small>${model.confidence}% weighted confidence across valued records</small>
          </div>
        </section>

        <div class="forecast-kpis">
          ${renderInsightKpi("Raw forecast pool", formatCompactMoney(model.totalValue), `${model.forecastItems.length} valued active/positive records`)}
          ${renderInsightKpi("Weighted forecast", formatCompactMoney(model.weightedValue), "Status-based expected value")}
          ${renderInsightKpi("Next 90 days", formatCompactMoney(model.next90Weighted), "Weighted value in near windows")}
          ${renderInsightKpi("Committed layer", formatCompactMoney(model.committedValue), "Awarded, completed, and live project weight")}
        </div>

        <div class="forecast-layout">
          <section class="forecast-main">
            <div class="info-head forecast-main-head">
              <div>
                <span class="metric-label">Forecast board</span>
                <h3>Largest weighted opportunities</h3>
              </div>
              <span>${model.topItems.length} shown</span>
            </div>
            <div class="forecast-card-grid">
              ${model.topItems.map(renderForecastCard).join("")}
            </div>
          </section>

          <aside class="forecast-side">
            <article class="info-panel">
              <div class="info-head">
                <div>
                  <span class="metric-label">Scenario model</span>
                  <h3>Forecast range</h3>
                </div>
              </div>
              ${renderForecastScenarios(model.scenarios)}
            </article>

            <article class="info-panel">
              <div class="info-head">
                <div>
                  <span class="metric-label">Assumptions</span>
                  <h3>Conversion logic</h3>
                </div>
              </div>
              ${renderForecastAssumptions(model.assumptions)}
            </article>
          </aside>
        </div>

        <div class="forecast-analytics-grid">
          <article class="info-panel forecast-window-panel">
            <div class="info-head">
              <div>
                <span class="metric-label">Timing</span>
                <h3>Forecast by date window</h3>
              </div>
            </div>
            ${renderForecastWindows(model.windowRows)}
          </article>

          <article class="info-panel">
            <div class="info-head">
              <div>
                <span class="metric-label">Client forecast</span>
                <h3>Weighted account value</h3>
              </div>
            </div>
            ${renderForecastClients(model.clientRows)}
          </article>

          <article class="info-panel">
            <div class="info-head">
              <div>
                <span class="metric-label">Split</span>
                <h3>Tenders versus projects</h3>
              </div>
            </div>
            ${renderForecastSplit(model)}
          </article>

          <article class="info-panel">
            <div class="info-head">
              <div>
                <span class="metric-label">Risk cleanup</span>
                <h3>Forecast hygiene</h3>
              </div>
            </div>
            ${renderForecastRisks(model.risks)}
          </article>

          <article class="info-panel forecast-risk-panel">
            <div class="info-head">
              <div>
                <span class="metric-label">At-risk forecast</span>
                <h3>Fix these to improve confidence</h3>
              </div>
            </div>
            ${renderForecastAtRisk(model.atRiskItems)}
          </article>
        </div>
      </section>
    `;
  }

  function renderForecastCard(item) {
    const record = item.record;
    return `
      <article class="forecast-card">
        <div class="forecast-card-head">
          <div>
            <span>${escapeHtml(item.window.label)}</span>
            <h3>${escapeHtml(record.title || "Untitled forecast record")}</h3>
          </div>
          <strong>${item.probability}%</strong>
        </div>
        <div class="forecast-meta-line">
          <span>${escapeHtml(record.client || "No client")}</span>
          <span>${escapeHtml(record.type)}</span>
          <span class="status-badge ${statusClass(record.status)}">${escapeHtml(record.status)}</span>
        </div>
        <div class="forecast-stat-grid">
          <div><span>Raw value</span><strong>${escapeHtml(formatCompactMoney(item.amount))}</strong></div>
          <div><span>Weighted</span><strong>${escapeHtml(formatCompactMoney(item.weightedValue))}</strong></div>
          <div><span>Due / last</span><strong>${escapeHtml(formatDate(record.endDate) || "No date")}</strong></div>
          <div><span>Confidence</span><strong>${item.confidence}%</strong></div>
        </div>
        <button class="mini-btn" type="button" data-action="open-related-record" data-id="${escapeHtml(record.id)}">Open source</button>
      </article>
    `;
  }

  function renderForecastScenarios(rows) {
    return `
      <div class="forecast-scenario-list">
        ${rows
          .map(
            (row) => `
              <div>
                <span>${escapeHtml(row.label)}</span>
                <strong>${escapeHtml(formatCompactMoney(row.value))}</strong>
                <small>${escapeHtml(row.note)}</small>
              </div>
            `,
          )
          .join("")}
      </div>
    `;
  }

  function renderForecastAssumptions(rows) {
    return `
      <div class="forecast-assumption-list">
        ${rows
          .map(
            ([label, value, note]) => `
              <div>
                <span>${escapeHtml(label)}</span>
                <strong>${escapeHtml(value)}</strong>
                <small>${escapeHtml(note)}</small>
              </div>
            `,
          )
          .join("")}
      </div>
    `;
  }

  function renderForecastWindows(rows) {
    if (!rows.length) return `<div class="empty-state compact">No dated forecast records available.</div>`;
    const max = Math.max(...rows.map((row) => row.value), 1);
    return `
      <div class="forecast-window-list">
        ${rows
          .map((row) => {
            const width = Math.max(5, Math.round((row.value / max) * 100));
            return `
              <div class="forecast-window-row tone-${escapeHtml(row.tone)}">
                <div>
                  <span>${escapeHtml(row.label)}</span>
                  <strong>${escapeHtml(formatCompactMoney(row.value))}</strong>
                  <small>${row.count} records / raw ${escapeHtml(formatCompactMoney(row.raw))}</small>
                </div>
                <i><b style="width: ${width}%"></b></i>
              </div>
            `;
          })
          .join("")}
      </div>
    `;
  }

  function renderForecastClients(rows) {
    if (!rows.length) return `<div class="empty-state compact">No client forecast available.</div>`;
    const max = Math.max(...rows.map((row) => row.value), 1);
    return `
      <div class="forecast-client-list">
        ${rows
          .map((row) => {
            const width = Math.max(5, Math.round((row.value / max) * 100));
            return `
              <div class="forecast-client-row">
                <div>
                  <span>${escapeHtml(row.label)}</span>
                  <strong>${escapeHtml(formatCompactMoney(row.value))}</strong>
                  <small>${row.count} records / raw ${escapeHtml(formatCompactMoney(row.raw))}</small>
                </div>
                <i><b style="width: ${width}%"></b></i>
              </div>
            `;
          })
          .join("")}
      </div>
    `;
  }

  function renderForecastSplit(model) {
    const total = Math.max(model.tenderWeighted + model.projectWeighted, 1);
    const rows = [
      ["Tender forecast", model.tenderWeighted, "Tender and EOI weighted value"],
      ["Project forecast", model.projectWeighted, "Project weighted delivery value"],
    ];
    return `
      <div class="forecast-split-list">
        ${rows
          .map(([label, value, note]) => {
            const width = Math.max(5, Math.round((value / total) * 100));
            return `
              <div>
                <span>${escapeHtml(label)}</span>
                <strong>${escapeHtml(formatCompactMoney(value))}</strong>
                <small>${escapeHtml(note)}</small>
                <i><b style="width: ${width}%"></b></i>
              </div>
            `;
          })
          .join("")}
      </div>
    `;
  }

  function renderForecastRisks(rows) {
    return `
      <div class="forecast-risk-list">
        ${rows
          .map(
            (row) => `
              <div>
                <span>${escapeHtml(row.label)}</span>
                <strong>${escapeHtml(formatCompactMoney(row.value))}</strong>
                <small>${escapeHtml(row.note)}</small>
              </div>
            `,
          )
          .join("")}
      </div>
    `;
  }

  function renderForecastAtRisk(items) {
    if (!items.length) return `<div class="empty-state compact">No at-risk forecast records found.</div>`;
    return `
      <div class="forecast-risk-records">
        ${items
          .map(
            (item) => `
              <button class="forecast-risk-row" type="button" data-action="open-related-record" data-id="${escapeHtml(item.record.id)}">
                <span>${escapeHtml(item.window.label)}</span>
                <strong>${escapeHtml(item.record.title || "Untitled record")}</strong>
                <em>${escapeHtml([item.record.client, `${item.probability}%`, formatCompactMoney(item.amount)].filter(Boolean).join(" / "))}</em>
              </button>
            `,
          )
          .join("")}
      </div>
    `;
  }

  function accountLabelForRecord(record) {
    return String(record.clientGroup || record.client || "Unassigned client").trim() || "Unassigned client";
  }

  function clientRecommendation(account) {
    if (account.overdueCount > 0) return "Refresh overdue follow-ups and confirm the next owner action.";
    if (account.noDateCount > 0) return "Add missing dates so the account stays visible in due-watch reviews.";
    if (account.openCount >= 6) return "Assign a weekly account review because multiple records are moving together.";
    if (account.totalValue > 0 && account.wonCount > 0) return "Convert the winning history into contract and renewal memory.";
    if (account.projectCount > 0 && account.tenderCount > 0) return "Connect pursuit handover with delivery status for this relationship.";
    return "Keep the account warm and capture the next commercial touch.";
  }

  function buildClientPortfolioModel() {
    const records = companyRecords();
    const accountsMap = new Map();
    records.forEach((record) => {
      const label = accountLabelForRecord(record);
      const key = normalize(label);
      if (!accountsMap.has(key)) {
        accountsMap.set(key, {
          label,
          records: [],
          units: new Map(),
          tenderCount: 0,
          projectCount: 0,
          openCount: 0,
          wonCount: 0,
          overdueCount: 0,
          dueWatchCount: 0,
          noDateCount: 0,
          totalValue: 0,
        });
      }
      const account = accountsMap.get(key);
      const unit = String(record.client || label).trim() || label;
      const days = recordDueDays(record);
      const open = !isClosedRecord(record);
      account.records.push(record);
      account.units.set(unit, (account.units.get(unit) || 0) + 1);
      if (record.type === "Project") account.projectCount += 1;
      if (record.type === "Tender" || record.type === "EOI") account.tenderCount += 1;
      if (open) account.openCount += 1;
      if (["Awarded", "Completed"].includes(record.status)) account.wonCount += 1;
      if (open && days === null) account.noDateCount += 1;
      if (open && days !== null && days < 0) account.overdueCount += 1;
      if (open && (days === null || days <= 30)) account.dueWatchCount += 1;
      account.totalValue += Number(record.valueAmount) || 0;
    });
    const rawAccounts = Array.from(accountsMap.values());
    const maxValue = Math.max(...rawAccounts.map((account) => account.totalValue), 1);
    const accounts = rawAccounts
      .map((account) => {
        const latest = [...account.records].sort((a, b) => recordHistoryTime(b) - recordHistoryTime(a))[0] || null;
        const unitRows = Array.from(account.units, ([label, value]) => ({ label, value }))
          .sort((a, b) => b.value - a.value || a.label.localeCompare(b.label));
        const pulse =
          account.records.length >= 16 || account.totalValue / maxValue > 0.58
            ? "Strategic account"
            : account.openCount >= 6
              ? "Active relationship"
              : account.wonCount >= 3
                ? "Proven buyer"
                : account.projectCount && account.tenderCount
                  ? "Pursuit to delivery"
                  : "Developing account";
        const score = Math.round(
          Math.min(100, account.records.length * 4 + account.openCount * 5 + account.wonCount * 4 + (account.totalValue / maxValue) * 28),
        );
        return {
          ...account,
          latest,
          unitRows,
          pulse,
          score,
          recommendation: clientRecommendation(account),
        };
      })
      .sort(
        (a, b) =>
          b.score - a.score ||
          b.openCount - a.openCount ||
          b.totalValue - a.totalValue ||
          a.label.localeCompare(b.label),
      );
    return {
      accounts,
      activeAccounts: accounts.filter((account) => account.openCount > 0).length,
      totalRecords: records.length,
      totalValue: sumAmounts(records),
      openRecords: records.filter((record) => !isClosedRecord(record)).length,
      dueWatch: accounts.reduce((total, account) => total + account.dueWatchCount, 0),
      overdue: accounts.reduce((total, account) => total + account.overdueCount, 0),
      topAccounts: accounts.slice(0, 10),
      moveAccounts: accounts
        .filter((account) => account.openCount || account.dueWatchCount || account.noDateCount)
        .sort((a, b) => b.dueWatchCount - a.dueWatchCount || b.openCount - a.openCount || b.score - a.score)
        .slice(0, 5),
    };
  }

  function renderClientPortfolioPage() {
    const model = buildClientPortfolioModel();
    return `
      <section class="client-portfolio">
        <div class="client-kpis">
          ${renderInsightKpi("Client accounts", `${model.accounts.length}`, `${model.activeAccounts} active relationships`)}
          ${renderInsightKpi("Open work", `${model.openRecords}`, `${model.totalRecords} total records`)}
          ${renderInsightKpi("Account value", formatCompactMoney(model.totalValue), "Captured tender and project value")}
          ${renderInsightKpi("Due watch", `${model.dueWatch}`, `${model.overdue} overdue items`)}
        </div>

        <div class="client-portfolio-grid">
          <section class="client-portfolio-main">
            <div class="info-head">
              <div>
                <span class="metric-label">Client portfolio</span>
                <h3>Relationship map</h3>
              </div>
              <span>${model.topAccounts.length} shown</span>
            </div>
            <div class="client-card-grid">
              ${model.topAccounts.map(renderClientPortfolioCard).join("")}
            </div>
          </section>

          <aside class="client-portfolio-side">
            <article class="info-panel">
              <div class="info-head">
                <div>
                  <span class="metric-label">Account heat</span>
                  <h3>Most active relationships</h3>
                </div>
              </div>
              ${renderClientHeatRows(model.accounts.slice(0, 7))}
            </article>

            <article class="info-panel">
              <div class="info-head">
                <div>
                  <span class="metric-label">Next moves</span>
                  <h3>Relationship follow-up</h3>
                </div>
              </div>
              ${renderClientMoveRows(model.moveAccounts)}
            </article>
          </aside>
        </div>

        <div class="client-roadmap-strip">
          ${[
            ["Clients", "Live portfolio"],
            ["Contracts", "Award memory"],
            ["Documents", "Evidence trail"],
            ["Reminders", "Follow-up engine"],
            ["Reports", "Board pack"],
          ]
            .map(
              ([label, note]) => `
                <div>
                  <span>${escapeHtml(label)}</span>
                  <strong>${escapeHtml(note)}</strong>
                </div>
              `,
            )
            .join("")}
        </div>
      </section>
    `;
  }

  function renderClientPortfolioCard(account) {
    const latestMeta = account.latest
      ? [account.latest.type, account.latest.status, formatDate(account.latest.endDate) || "No date"].filter(Boolean).join(" / ")
      : "No activity";
    const units = account.unitRows
      .slice(0, 3)
      .map((unit) => `<span>${escapeHtml(unit.label)} <b>${unit.value}</b></span>`)
      .join("");
    return `
      <article class="client-card">
        <div class="client-card-head">
          <div>
            <span>${escapeHtml(account.pulse)}</span>
            <h3>${escapeHtml(account.label)}</h3>
          </div>
          <strong>${account.score}</strong>
        </div>
        <div class="client-card-stats">
          <div><span>Records</span><strong>${account.records.length}</strong></div>
          <div><span>Open</span><strong>${account.openCount}</strong></div>
          <div><span>Due</span><strong>${account.dueWatchCount}</strong></div>
          <div><span>Value</span><strong>${escapeHtml(formatCompactMoney(account.totalValue))}</strong></div>
        </div>
        <div class="client-card-mix">
          <span>Tenders <b>${account.tenderCount}</b></span>
          <span>Projects <b>${account.projectCount}</b></span>
          <span>Won/done <b>${account.wonCount}</b></span>
        </div>
        <div class="client-card-latest">
          <span>Latest touch</span>
          <strong>${escapeHtml(account.latest?.title || "No latest record")}</strong>
          <em>${escapeHtml(latestMeta)}</em>
        </div>
        <div class="client-unit-row">
          ${units || `<span>${escapeHtml(account.label)} <b>${account.records.length}</b></span>`}
        </div>
        <div class="client-card-footer">
          <p>${escapeHtml(account.recommendation)}</p>
          <button class="mini-btn" type="button" data-action="open-related-record" data-id="${escapeHtml(account.latest?.id || "")}" ${account.latest ? "" : "disabled"}>Open latest</button>
        </div>
      </article>
    `;
  }

  function renderClientHeatRows(accounts) {
    if (!accounts.length) return `<div class="empty-state compact">No client records available.</div>`;
    const max = Math.max(...accounts.map((account) => account.records.length), 1);
    return `
      <div class="client-heat-list">
        ${accounts
          .map((account) => {
            const width = Math.max(6, Math.round((account.records.length / max) * 100));
            return `
              <button class="client-heat-row" type="button" data-action="open-related-record" data-id="${escapeHtml(account.latest?.id || "")}" ${account.latest ? "" : "disabled"}>
                <span>
                  <strong>${escapeHtml(account.label)}</strong>
                  <em>${account.records.length} records / ${account.openCount} open / ${escapeHtml(formatCompactMoney(account.totalValue))}</em>
                </span>
                <i><b style="width: ${width}%"></b></i>
              </button>
            `;
          })
          .join("")}
      </div>
    `;
  }

  function renderClientMoveRows(accounts) {
    if (!accounts.length) return `<div class="empty-state compact">No relationship follow-up needed.</div>`;
    return `
      <div class="client-move-list">
        ${accounts
          .map(
            (account) => `
              <button class="client-move-row" type="button" data-action="open-related-record" data-id="${escapeHtml(account.latest?.id || "")}" ${account.latest ? "" : "disabled"}>
                <strong>${escapeHtml(account.label)}</strong>
                <span>${account.openCount} open / ${account.dueWatchCount} due-watch / ${account.noDateCount} no-date</span>
                <p>${escapeHtml(account.recommendation)}</p>
              </button>
            `,
          )
          .join("")}
      </div>
    `;
  }

  function isYes(value) {
    return normalize(value) === "yes";
  }

  function contractCandidateRecords() {
    return companyRecords().filter(
      (record) =>
        record.type === "Project" ||
        ["Awarded", "Completed"].includes(record.status) ||
        Boolean(record.agreementNo) ||
        Boolean(record.loaReceived) ||
        Boolean(record.agreementReceived),
    );
  }

  function contractStage(record) {
    if (record.type === "Project" && record.status === "Ongoing") return "Live delivery";
    if (record.status === "Awarded") return "Award handover";
    if (record.status === "Completed") return "Closed contract";
    if (record.agreementNo) return "Agreement record";
    if (record.type === "Project") return "Project contract";
    return "Contract candidate";
  }

  function contractRisk(record) {
    const days = recordDueDays(record);
    if (!record.agreementNo) return "Needs agreement";
    if (record.status === "Awarded" && !isYes(record.loaReceived)) return "LOA gap";
    if (record.agreementNo && !isYes(record.agreementReceived)) return "Agreement follow-up";
    if (!isClosedRecord(record) && days !== null && days < 0) return "Past due";
    if (!(Number(record.valueAmount) > 0)) return "Value gap";
    return "On file";
  }

  function contractScore(record) {
    const amount = Number(record.valueAmount) || 0;
    const days = recordDueDays(record);
    let score = 28;
    if (record.agreementNo) score += 22;
    if (isYes(record.agreementReceived)) score += 18;
    if (isYes(record.loaReceived)) score += 12;
    if (amount > 0) score += 12;
    if (record.endDate) score += 10;
    if (record.type === "Project" || ["Awarded", "Completed"].includes(record.status)) score += 12;
    if (!isClosedRecord(record) && days !== null && days < 0) score -= 14;
    if (!record.agreementNo) score -= 10;
    return Math.max(12, Math.min(100, Math.round(score)));
  }

  function buildContractsModel() {
    const records = contractCandidateRecords();
    const enriched = records
      .map((record) => ({
        record,
        score: contractScore(record),
        stage: contractStage(record),
        risk: contractRisk(record),
        days: recordDueDays(record),
      }))
      .sort(
        (a, b) =>
          (a.risk === "Needs agreement" ? -1 : 0) - (b.risk === "Needs agreement" ? -1 : 0) ||
          b.score - a.score ||
          (Number(b.record.valueAmount) || 0) - (Number(a.record.valueAmount) || 0),
      );
    const gaps = enriched.filter((item) => item.risk !== "On file");
    const awarded = enriched.filter((item) => item.record.status === "Awarded");
    const liveDelivery = enriched.filter((item) => item.record.type === "Project" && !isClosedRecord(item.record));
    const renewalWatch = enriched.filter((item) => item.days !== null && item.days >= 0 && item.days <= 180);
    const agreementRows = [
      { label: "Agreement no captured", value: records.filter((record) => record.agreementNo).length },
      { label: "Agreement received", value: records.filter((record) => isYes(record.agreementReceived)).length },
      { label: "LOA received", value: records.filter((record) => isYes(record.loaReceived)).length },
      { label: "Missing agreement no", value: records.filter((record) => !record.agreementNo).length },
    ];
    return {
      records,
      enriched,
      gaps,
      awarded,
      liveDelivery,
      renewalWatch,
      withAgreement: records.filter((record) => record.agreementNo).length,
      agreementReceived: records.filter((record) => isYes(record.agreementReceived)).length,
      loaReceived: records.filter((record) => isYes(record.loaReceived)).length,
      missingAgreement: records.filter((record) => !record.agreementNo).length,
      gapCount: gaps.length,
      totalValue: sumAmounts(records),
      handoverRows: gaps.slice(0, 7),
      agreementRows,
      clientRows: topBreakdown(records, "client", 6, "No client"),
      sourceRows: topBreakdown(records, "sourceSheet", 6, "Manual entry"),
    };
  }

  function renderContractsPage() {
    const model = buildContractsModel();
    return `
      <section class="contracts-room">
        <div class="contract-kpis">
          ${renderInsightKpi("Contract records", `${model.records.length}`, `${model.liveDelivery.length} live delivery records`)}
          ${renderInsightKpi("Agreement nos", `${model.withAgreement}`, `${model.missingAgreement} missing agreement numbers`)}
          ${renderInsightKpi("Contract value", formatCompactMoney(model.totalValue), "Award, project, and agreement-linked value")}
          ${renderInsightKpi("Commercial gaps", `${model.gapCount}`, "Records needing agreement, LOA, date, or value cleanup")}
        </div>

        <div class="contracts-layout">
          <section class="contracts-main">
            <div class="info-head contract-main-head">
              <div>
                <span class="metric-label">Contract register</span>
                <h3>Awards, agreements, and delivery handover</h3>
              </div>
              <span>${model.enriched.length} records</span>
            </div>
            <div class="contract-card-grid">
              ${model.enriched.slice(0, 12).map(renderContractCard).join("")}
            </div>
          </section>

          <aside class="contracts-side">
            <article class="info-panel">
              <div class="info-head">
                <div>
                  <span class="metric-label">Handover watch</span>
                  <h3>Needs commercial movement</h3>
                </div>
                <span>${model.handoverRows.length} shown</span>
              </div>
              ${renderContractWatchList(model.handoverRows)}
            </article>

            <article class="info-panel">
              <div class="info-head">
                <div>
                  <span class="metric-label">Agreement coverage</span>
                  <h3>Document capture</h3>
                </div>
              </div>
              ${renderContractCoverage(model.agreementRows, model.records.length)}
            </article>
          </aside>
        </div>

        <div class="contract-analytics-grid">
          <article class="info-panel">
            <div class="info-head">
              <div>
                <span class="metric-label">Client contracts</span>
                <h3>Contract concentration</h3>
              </div>
            </div>
            ${renderRankBars(model.clientRows, "blue")}
          </article>

          <article class="info-panel">
            <div class="info-head">
              <div>
                <span class="metric-label">Source register</span>
                <h3>Where contract data came from</h3>
              </div>
            </div>
            ${renderRankBars(model.sourceRows, "green")}
          </article>

          <article class="info-panel contract-playbook-panel">
            <div class="info-head">
              <div>
                <span class="metric-label">Commercial playbook</span>
                <h3>Contract control rhythm</h3>
              </div>
            </div>
            ${renderContractPlaybook()}
          </article>
        </div>
      </section>
    `;
  }

  function renderContractCard(item) {
    const { record } = item;
    const agreement = record.agreementNo || "No agreement no";
    const value = Number(record.valueAmount) > 0 ? formatCompactMoney(record.valueAmount) : "No value";
    const date = formatDate(record.endDate) || "No date";
    return `
      <article class="contract-card">
        <div class="contract-card-head">
          <div>
            <span>${escapeHtml(item.stage)}</span>
            <h3>${escapeHtml(record.title || "Untitled contract record")}</h3>
          </div>
          <strong>${item.score}</strong>
        </div>
        <div class="contract-meta-line">
          <span>${escapeHtml(record.client || "No client")}</span>
          <span>${escapeHtml(record.type)}</span>
          <span class="status-badge ${statusClass(record.status)}">${escapeHtml(record.status)}</span>
        </div>
        <div class="contract-stat-grid">
          <div><span>Agreement</span><strong>${escapeHtml(agreement)}</strong></div>
          <div><span>End / last</span><strong>${escapeHtml(date)}</strong></div>
          <div><span>Value</span><strong>${escapeHtml(value)}</strong></div>
          <div><span>Risk</span><strong>${escapeHtml(item.risk)}</strong></div>
        </div>
        <div class="contract-doc-row">
          <span class="${isYes(record.loaReceived) ? "is-ok" : ""}">LOA ${isYes(record.loaReceived) ? "yes" : "open"}</span>
          <span class="${isYes(record.agreementReceived) ? "is-ok" : ""}">Agreement ${isYes(record.agreementReceived) ? "yes" : "open"}</span>
          <span>${escapeHtml(record.sourceSheet || "Manual entry")}</span>
        </div>
        <button class="mini-btn" type="button" data-action="open-related-record" data-id="${escapeHtml(record.id)}">Open source</button>
      </article>
    `;
  }

  function renderContractWatchList(rows) {
    if (!rows.length) return `<div class="empty-state compact">No contract handover gaps found.</div>`;
    return `
      <div class="contract-watch-list">
        ${rows
          .map(
            (item) => `
              <button class="contract-watch-row" type="button" data-action="open-related-record" data-id="${escapeHtml(item.record.id)}">
                <span>${escapeHtml(item.risk)}</span>
                <strong>${escapeHtml(item.record.title || "Untitled record")}</strong>
                <em>${escapeHtml([item.record.client, item.stage, item.record.agreementNo || "No agreement"].filter(Boolean).join(" / "))}</em>
              </button>
            `,
          )
          .join("")}
      </div>
    `;
  }

  function renderContractCoverage(rows, total) {
    const max = Math.max(total, 1);
    return `
      <div class="contract-coverage-list">
        ${rows
          .map((row) => {
            const width = Math.max(4, Math.round((row.value / max) * 100));
            return `
              <div>
                <span>${escapeHtml(row.label)}</span>
                <strong>${row.value}</strong>
                <i><b style="width: ${width}%"></b></i>
              </div>
            `;
          })
          .join("")}
      </div>
    `;
  }

  function renderContractPlaybook() {
    const rows = [
      ["Award", "Confirm LOA, agreement number, and handover owner when a tender is awarded."],
      ["Agreement", "Track agreement received status and source sheet for audit-friendly lookup."],
      ["Delivery", "Connect live projects back to agreement numbers and end dates."],
      ["Renewal", "Use due-watch items to start renewal or extension conversations early."],
    ];
    return `
      <div class="contract-playbook">
        ${rows
          .map(
            ([label, note]) => `
              <div>
                <strong>${escapeHtml(label)}</strong>
                <span>${escapeHtml(note)}</span>
              </div>
            `,
          )
          .join("")}
      </div>
    `;
  }

  function documentPackType(record) {
    if (record.type === "Project") return "Project file";
    if (record.status === "Awarded") return "Award file";
    if ((record.rounds || []).length) return "Negotiation file";
    if (record.type === "EOI") return "EOI file";
    return "Tender file";
  }

  function documentGaps(record) {
    const gaps = [];
    if (!record.sourceWorkbook || record.sourceWorkbook === "Manual entry") gaps.push("Source workbook");
    if (!record.sourceSheet || record.sourceSheet === "Manual entry") gaps.push("Source sheet");
    if ((record.status === "Awarded" || record.type === "Project") && !record.agreementNo) gaps.push("Agreement no");
    if (record.status === "Awarded" && !isYes(record.loaReceived)) gaps.push("LOA proof");
    if ((record.agreementNo || record.type === "Project") && !isYes(record.agreementReceived)) gaps.push("Agreement file");
    if (!record.endDate) gaps.push("Due/end date");
    if (!record.latestActivity && (record.rounds || []).length) gaps.push("Negotiation note");
    return gaps;
  }

  function documentEvidenceCount(record) {
    return [
      record.sourceWorkbook,
      record.sourceSheet,
      record.endDate,
      Number(record.valueAmount) > 0,
      record.agreementNo,
      isYes(record.loaReceived),
      isYes(record.agreementReceived),
      (record.rounds || []).length,
      record.latestActivity,
    ].filter(Boolean).length;
  }

  function documentReadiness(record, gaps) {
    let score = 42 + documentEvidenceCount(record) * 7 - gaps.length * 10;
    if (record.sourceWorkbook && record.sourceWorkbook !== "Manual entry") score += 8;
    if ((record.rounds || []).length) score += 8;
    if (record.type === "Project" || record.status === "Awarded") score += 5;
    if (!record.endDate && !isClosedRecord(record)) score -= 8;
    return Math.max(8, Math.min(100, Math.round(score)));
  }

  function buildDocumentsModel() {
    const records = companyRecords();
    const packs = records
      .map((record) => {
        const gaps = documentGaps(record);
        return {
          record,
          gaps,
          packType: documentPackType(record),
          readiness: documentReadiness(record, gaps),
          evidenceCount: documentEvidenceCount(record),
          sourceLabel: [record.sourceWorkbook || "Manual entry", record.sourceSheet || "No sheet"].filter(Boolean).join(" / "),
        };
      })
      .sort(
        (a, b) =>
          b.gaps.length - a.gaps.length ||
          a.readiness - b.readiness ||
          (Number(b.record.valueAmount) || 0) - (Number(a.record.valueAmount) || 0),
      );
    const sourceCovered = records.filter((record) => record.sourceWorkbook && record.sourceWorkbook !== "Manual entry").length;
    const sourceCoverage = records.length ? Math.round((sourceCovered / records.length) * 100) : 0;
    const gapPacks = packs.filter((pack) => pack.gaps.length);
    const packRows = Array.from(
      packs.reduce((map, pack) => map.set(pack.packType, (map.get(pack.packType) || 0) + 1), new Map()),
      ([label, value]) => ({ label, value }),
    ).sort((a, b) => b.value - a.value || a.label.localeCompare(b.label));
    const coverageRows = [
      { label: "Source workbook", value: sourceCovered },
      { label: "Source sheet", value: records.filter((record) => record.sourceSheet && record.sourceSheet !== "Manual entry").length },
      { label: "Value captured", value: records.filter((record) => Number(record.valueAmount) > 0).length },
      { label: "Negotiation trail", value: records.filter((record) => (record.rounds || []).length).length },
      { label: "Agreement proof", value: records.filter((record) => record.agreementNo || isYes(record.agreementReceived)).length },
      { label: "LOA proof", value: records.filter((record) => isYes(record.loaReceived)).length },
    ];
    return {
      records,
      packs,
      gapPacks,
      totalGaps: packs.reduce((total, pack) => total + pack.gaps.length, 0),
      sourceCoverage,
      sourceRows: topBreakdown(records, "sourceWorkbook", 6, "Manual entry"),
      sheetRows: topBreakdown(records, "sourceSheet", 8, "Manual entry"),
      packRows,
      coverageRows,
      agreementProof: records.filter((record) => record.agreementNo || isYes(record.agreementReceived) || isYes(record.loaReceived)).length,
      negotiationProof: records.filter((record) => (record.rounds || []).length).length,
    };
  }

  function renderDocumentsPage() {
    const model = buildDocumentsModel();
    return `
      <section class="documents-room">
        <div class="document-kpis">
          ${renderInsightKpi("Document packs", `${model.packs.length}`, "Tender, EOI, project, award, and negotiation files")}
          ${renderInsightKpi("Source coverage", `${model.sourceCoverage}%`, "Records connected back to source workbooks")}
          ${renderInsightKpi("Evidence gaps", `${model.totalGaps}`, `${model.gapPacks.length} records need document cleanup`)}
          ${renderInsightKpi("Agreement proof", `${model.agreementProof}`, "Agreement, LOA, or received flags captured")}
        </div>

        <div class="documents-layout">
          <section class="documents-main">
            <div class="info-head document-main-head">
              <div>
                <span class="metric-label">Evidence register</span>
                <h3>Document packs linked to source records</h3>
              </div>
              <span>${model.packs.length} packs</span>
            </div>
            <div class="document-card-grid">
              ${model.packs.slice(0, 14).map(renderDocumentCard).join("")}
            </div>
          </section>

          <aside class="documents-side">
            <article class="info-panel">
              <div class="info-head">
                <div>
                  <span class="metric-label">Gap queue</span>
                  <h3>Evidence needing cleanup</h3>
                </div>
                <span>${model.gapPacks.slice(0, 8).length} shown</span>
              </div>
              ${renderDocumentGapList(model.gapPacks.slice(0, 8))}
            </article>

            <article class="info-panel">
              <div class="info-head">
                <div>
                  <span class="metric-label">Source workbooks</span>
                  <h3>Import memory</h3>
                </div>
              </div>
              ${renderDocumentSourceList(model.sourceRows)}
            </article>
          </aside>
        </div>

        <div class="document-analytics-grid">
          <article class="info-panel">
            <div class="info-head">
              <div>
                <span class="metric-label">Source sheets</span>
                <h3>Sheet coverage</h3>
              </div>
            </div>
            ${renderRankBars(model.sheetRows, "green")}
          </article>

          <article class="info-panel">
            <div class="info-head">
              <div>
                <span class="metric-label">Pack mix</span>
                <h3>Document library shape</h3>
              </div>
            </div>
            ${renderRankBars(model.packRows, "blue")}
          </article>

          <article class="info-panel">
            <div class="info-head">
              <div>
                <span class="metric-label">Evidence coverage</span>
                <h3>Control checklist</h3>
              </div>
            </div>
            ${renderDocumentCoverage(model.coverageRows, model.records.length)}
          </article>

          <article class="info-panel document-playbook-panel">
            <div class="info-head">
              <div>
                <span class="metric-label">Document playbook</span>
                <h3>How teams should use this room</h3>
              </div>
            </div>
            ${renderDocumentPlaybook()}
          </article>
        </div>
      </section>
    `;
  }

  function renderDocumentCard(pack) {
    const record = pack.record;
    const value = Number(record.valueAmount) > 0 ? formatCompactMoney(record.valueAmount) : "No value";
    const gapLabel = pack.gaps.length ? `${pack.gaps.length} gap${pack.gaps.length === 1 ? "" : "s"}` : "Complete";
    return `
      <article class="document-card">
        <div class="document-card-head">
          <div>
            <span>${escapeHtml(pack.packType)}</span>
            <h3>${escapeHtml(record.title || "Untitled document pack")}</h3>
          </div>
          <strong>${pack.readiness}</strong>
        </div>
        <div class="document-meta-line">
          <span>${escapeHtml(record.client || "No client")}</span>
          <span>${escapeHtml(record.type)}</span>
          <span class="status-badge ${statusClass(record.status)}">${escapeHtml(record.status)}</span>
        </div>
        <div class="document-stat-grid">
          <div><span>Source</span><strong>${escapeHtml(record.sourceWorkbook || "Manual entry")}</strong></div>
          <div><span>Sheet</span><strong>${escapeHtml(record.sourceSheet || "No sheet")}</strong></div>
          <div><span>Agreement</span><strong>${escapeHtml(record.agreementNo || "No agreement no")}</strong></div>
          <div><span>Value</span><strong>${escapeHtml(value)}</strong></div>
        </div>
        <div class="document-chip-row">
          <span class="${record.sourceWorkbook && record.sourceWorkbook !== "Manual entry" ? "is-ok" : ""}">Source ${record.sourceWorkbook && record.sourceWorkbook !== "Manual entry" ? "linked" : "open"}</span>
          <span class="${isYes(record.loaReceived) ? "is-ok" : ""}">LOA ${isYes(record.loaReceived) ? "yes" : "open"}</span>
          <span class="${isYes(record.agreementReceived) ? "is-ok" : ""}">Agreement ${isYes(record.agreementReceived) ? "yes" : "open"}</span>
        </div>
        <div class="document-gap-summary ${pack.gaps.length ? "" : "is-clear"}">
          <strong>${escapeHtml(gapLabel)}</strong>
          <span>${escapeHtml(pack.gaps.length ? pack.gaps.slice(0, 3).join(" / ") : "Core evidence is captured for this pack.")}</span>
        </div>
        <button class="mini-btn" type="button" data-action="open-related-record" data-id="${escapeHtml(record.id)}">Open source</button>
      </article>
    `;
  }

  function renderDocumentGapList(packs) {
    if (!packs.length) return `<div class="empty-state compact">No document gaps found.</div>`;
    return `
      <div class="document-gap-list">
        ${packs
          .map(
            (pack) => `
              <button class="document-gap-row" type="button" data-action="open-related-record" data-id="${escapeHtml(pack.record.id)}">
                <span>${escapeHtml(pack.gaps.length)} gaps</span>
                <strong>${escapeHtml(pack.record.title || "Untitled record")}</strong>
                <em>${escapeHtml(pack.gaps.slice(0, 4).join(" / "))}</em>
              </button>
            `,
          )
          .join("")}
      </div>
    `;
  }

  function renderDocumentSourceList(rows) {
    if (!rows.length) return `<div class="empty-state compact">No source workbooks available.</div>`;
    return `
      <div class="document-source-list">
        ${rows
          .map(
            (row) => `
              <div class="document-source-row">
                <strong>${escapeHtml(row.label)}</strong>
                <span>${row.value} records</span>
              </div>
            `,
          )
          .join("")}
      </div>
    `;
  }

  function renderDocumentCoverage(rows, total) {
    const max = Math.max(total, 1);
    return `
      <div class="document-coverage-list">
        ${rows
          .map((row) => {
            const width = Math.max(4, Math.round((row.value / max) * 100));
            return `
              <div>
                <span>${escapeHtml(row.label)}</span>
                <strong>${row.value}</strong>
                <i><b style="width: ${width}%"></b></i>
              </div>
            `;
          })
          .join("")}
      </div>
    `;
  }

  function renderDocumentPlaybook() {
    const rows = [
      ["Import", "Keep the source workbook and source sheet visible for every imported record."],
      ["Award", "When a tender is awarded, attach agreement number, LOA proof, and agreement received status."],
      ["Delivery", "For live projects, connect the file pack to agreement number, end date, and project source."],
      ["Audit", "Use the gap queue before weekly reviews so missing proof is visible before management asks."],
    ];
    return `
      <div class="document-playbook">
        ${rows
          .map(
            ([label, note]) => `
              <div>
                <strong>${escapeHtml(label)}</strong>
                <span>${escapeHtml(note)}</span>
              </div>
            `,
          )
          .join("")}
      </div>
    `;
  }

  function makeReminder(record, lane, label, note, tone, priority) {
    return {
      id: `${record.id}-${normalize(lane).replaceAll(" ", "-")}-${priority}`,
      record,
      lane,
      label,
      note,
      tone,
      priority,
      days: recordDueDays(record),
    };
  }

  function reminderBreakdown(tasks, getter, limit = 6) {
    const rows = new Map();
    tasks.forEach((task) => {
      const label = String(getter(task) || "Unassigned").trim() || "Unassigned";
      rows.set(label, (rows.get(label) || 0) + 1);
    });
    return Array.from(rows, ([label, value]) => ({ label, value }))
      .sort((a, b) => b.value - a.value || a.label.localeCompare(b.label))
      .slice(0, limit);
  }

  function buildReminderModel() {
    const records = companyRecords();
    const floor = highValueThreshold(records);
    const tasks = [];
    records
      .filter((record) => !isClosedRecord(record))
      .forEach((record) => {
        const amount = Number(record.valueAmount) || 0;
        const days = recordDueDays(record);
        if (days !== null && days < 0) {
          tasks.push(
            makeReminder(
              record,
              "Overdue",
              "Refresh overdue follow-up",
              `${Math.abs(days)} days past due. Confirm status, owner, and next date.`,
              "red",
              120 + Math.min(40, Math.abs(days)),
            ),
          );
        } else if (days !== null && days <= 30) {
          tasks.push(
            makeReminder(
              record,
              "Next 30",
              days === 0 ? "Due today" : "Prepare near-date follow-up",
              days === 0 ? "Due today. Confirm submission, delivery, or client response." : `${days} days left. Move this before it becomes overdue.`,
              "amber",
              95 - days,
            ),
          );
        }
        if (days === null) {
          tasks.push(
            makeReminder(record, "Missing Data", "Add due or last date", "No end date is captured, so this record cannot be managed on the calendar.", "amber", 74),
          );
        }
        if (!amount) {
          tasks.push(
            makeReminder(record, "Missing Data", "Capture expected value", "Add a value so prioritization, account heat, and management reporting improve.", "blue", 66),
          );
        }
        if ((record.rounds || []).length && ["Active", "Pending", "Submitted", "Ongoing"].includes(record.status)) {
          tasks.push(
            makeReminder(record, "Negotiations", "Review negotiation trail", `${(record.rounds || []).length} round${(record.rounds || []).length === 1 ? "" : "s"} captured. Check the next response or commercial move.`, "green", 82),
          );
        }
        if (amount >= floor && amount > 0) {
          tasks.push(
            makeReminder(record, "High Value", "Management review", `${formatCompactMoney(amount)} deserves a visible owner, date, and next decision.`, "blue", 88),
          );
        }
      });
    const sorted = tasks.sort(
      (a, b) =>
        b.priority - a.priority ||
        (a.days ?? 9999) - (b.days ?? 9999) ||
        a.record.client.localeCompare(b.record.client),
    );
    const laneNames = ["Overdue", "Next 30", "Missing Data", "Negotiations", "High Value"];
    const lanes = laneNames.map((name) => ({
      name,
      tasks: sorted.filter((task) => task.lane === name).slice(0, 8),
    }));
    const playbook = [
      ["Clear red", "Open overdue items first and update the last date or client response."],
      ["Protect value", "Review high-value records before ordinary data cleanup."],
      ["Fix hygiene", "Add missing due dates and expected values during weekly review."],
      ["Close loop", "After negotiation updates, move the status or next date immediately."],
    ];
    return {
      tasks: sorted,
      lanes,
      overdue: sorted.filter((task) => task.lane === "Overdue").length,
      next30: sorted.filter((task) => task.lane === "Next 30").length,
      missingData: sorted.filter((task) => task.lane === "Missing Data").length,
      negotiation: sorted.filter((task) => task.lane === "Negotiations").length,
      highValue: sorted.filter((task) => task.lane === "High Value").length,
      ownerRows: reminderBreakdown(sorted, (task) => task.record.owner, 6),
      clientRows: reminderBreakdown(sorted, (task) => accountLabelForRecord(task.record), 6),
      playbook,
    };
  }

  function renderRemindersPage() {
    const model = buildReminderModel();
    return `
      <section class="reminder-desk">
        <div class="reminder-kpis">
          ${renderInsightKpi("Open reminders", `${model.tasks.length}`, "Generated from active tender and project records")}
          ${renderInsightKpi("Overdue", `${model.overdue}`, "Past due records needing immediate cleanup")}
          ${renderInsightKpi("Next 30 days", `${model.next30}`, "Near-date submission or delivery pressure")}
          ${renderInsightKpi("Missing data", `${model.missingData}`, "Records missing dates or values")}
        </div>

        <div class="reminder-layout">
          <section class="reminder-board">
            <div class="info-head">
              <div>
                <span class="metric-label">Follow-up desk</span>
                <h3>Generated action board</h3>
              </div>
              <span>${model.tasks.length} reminders</span>
            </div>
            <div class="reminder-lanes">
              ${model.lanes.map(renderReminderLane).join("")}
            </div>
          </section>

          <aside class="reminder-side">
            <article class="info-panel">
              <div class="info-head">
                <div>
                  <span class="metric-label">Owner load</span>
                  <h3>Reminder distribution</h3>
                </div>
              </div>
              ${renderRankBars(model.ownerRows, "green")}
            </article>

            <article class="info-panel">
              <div class="info-head">
                <div>
                  <span class="metric-label">Client pressure</span>
                  <h3>Accounts needing movement</h3>
                </div>
              </div>
              ${renderRankBars(model.clientRows, "blue")}
            </article>

            <article class="info-panel">
              <div class="info-head">
                <div>
                  <span class="metric-label">Daily rhythm</span>
                  <h3>How to work the desk</h3>
                </div>
              </div>
              <div class="reminder-playbook">
                ${model.playbook
                  .map(
                    ([title, note]) => `
                      <div>
                        <strong>${escapeHtml(title)}</strong>
                        <span>${escapeHtml(note)}</span>
                      </div>
                    `,
                  )
                  .join("")}
              </div>
            </article>
          </aside>
        </div>
      </section>
    `;
  }

  function renderReminderLane(lane) {
    return `
      <article class="reminder-lane">
        <div class="reminder-lane-head">
          <strong>${escapeHtml(lane.name)}</strong>
          <span>${lane.tasks.length}</span>
        </div>
        <div class="reminder-card-list">
          ${
            lane.tasks.length
              ? lane.tasks.map(renderReminderCard).join("")
              : `<div class="empty-state compact">No reminders in this lane.</div>`
          }
        </div>
      </article>
    `;
  }

  function renderReminderCard(task) {
    const record = task.record;
    const dueText =
      task.days === null
        ? "No date"
        : task.days < 0
          ? `${Math.abs(task.days)}d late`
          : task.days === 0
            ? "Due today"
            : `${task.days}d left`;
    return `
      <button class="reminder-card tone-${escapeHtml(task.tone)}" type="button" data-action="open-related-record" data-id="${escapeHtml(record.id)}">
        <span>${escapeHtml(task.label)}</span>
        <strong>${escapeHtml(record.title || "Untitled record")}</strong>
        <em>${escapeHtml([record.client || accountLabelForRecord(record), record.type, record.status, dueText].filter(Boolean).join(" / "))}</em>
        <p>${escapeHtml(task.note)}</p>
      </button>
    `;
  }

  function buildReportModel() {
    const records = companyRecords();
    const tenderRecords = sectionRecords("Tenders");
    const projectRecords = sectionRecords("Projects");
    const tenderMetrics = sectionMetrics(tenderRecords);
    const projectMetrics = sectionMetrics(projectRecords);
    const reminders = buildReminderModel();
    const portfolio = buildClientPortfolioModel();
    const openRecords = records.filter((record) => !isClosedRecord(record));
    const closedGood = records.filter((record) => ["Awarded", "Completed"].includes(record.status)).length;
    const closedBad = records.filter((record) => ["Cancelled", "Regret"].includes(record.status)).length;
    const closedTotal = closedGood + closedBad;
    const topClient = portfolio.accounts[0] || null;
    const topOpenValues = openRecords
      .filter((record) => Number(record.valueAmount) > 0)
      .sort((a, b) => Number(b.valueAmount) - Number(a.valueAmount))
      .slice(0, 6);
    const reportDate = new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    const summary = [
      `${records.length} records are tracked across ${tenderRecords.length} tender-side items and ${projectRecords.length} project-side items.`,
      `${openRecords.length} records remain open, with ${reminders.overdue} overdue follow-ups and ${reminders.missingData} missing-data reminders.`,
      `${formatCompactMoney(sumAmounts(records))} is captured in the current workspace value field across tenders and projects.`,
      topClient
        ? `${topClient.label} is the largest relationship cluster with ${topClient.records.length} records, ${topClient.openCount} open items, and ${formatCompactMoney(topClient.totalValue)} captured value.`
        : "Client concentration will appear once records are imported.",
    ];
    return {
      reportDate,
      records,
      tenderRecords,
      projectRecords,
      tenderMetrics,
      projectMetrics,
      reminders,
      portfolio,
      totalRecords: records.length,
      openRecords: openRecords.length,
      totalValue: sumAmounts(records),
      winRate: closedTotal ? Math.round((closedGood / closedTotal) * 100) : 0,
      topOpenValues,
      dueBuckets: buildDueBuckets(records),
      categoryRows: topBreakdown(records, "category", 6, "Uncategorized"),
      clientRows: portfolio.accounts.slice(0, 6).map((account) => ({ label: account.label, value: account.records.length })),
      topActions: reminders.tasks.slice(0, 8),
      topClients: portfolio.accounts.slice(0, 5),
      summary,
      checklist: [
        ["Pipeline", "Review active tenders, awards, and lost/cancelled records."],
        ["Delivery", "Check ongoing projects, completed work, and due-watch pressure."],
        ["Clients", "Confirm account concentration and relationship movement."],
        ["Actions", "Clear overdue, high-value, and missing-data follow-ups."],
        ["Next meeting", "Update owner, next date, and value before sharing the report."],
      ],
    };
  }

  function renderReportsPage() {
    const report = buildReportModel();
    return `
      <section class="reports-room">
        <section class="report-console">
          <div>
            <span class="panel-label">Management report</span>
            <h2>Weekly operating pack</h2>
            <p>Generated on ${escapeHtml(report.reportDate)} from the live PursuitDesk workspace. Use this view for weekly review, client updates, and management handoff.</p>
          </div>
          <div class="report-actions">
            <button class="secondary-btn" type="button" data-action="print-report">Print report</button>
            <button class="ghost-btn" type="button" data-view="Reminders">Open reminders</button>
            <button class="ghost-btn" type="button" data-view="Clients">Open clients</button>
          </div>
        </section>

        <div class="report-kpis">
          ${renderInsightKpi("Total records", `${report.totalRecords}`, `${report.openRecords} open records`)}
          ${renderInsightKpi("Captured value", formatCompactMoney(report.totalValue), "Tender and project value captured")}
          ${renderInsightKpi("Follow-ups", `${report.reminders.tasks.length}`, `${report.reminders.overdue} overdue actions`)}
          ${renderInsightKpi("Closed success", `${report.winRate}%`, "Awarded/completed share of closed records")}
        </div>

        <div class="report-grid">
          <article class="info-panel report-brief">
            <div class="info-head">
              <div>
                <span class="metric-label">Executive summary</span>
                <h3>What management should know</h3>
              </div>
            </div>
            <div class="report-summary-list">
              ${report.summary.map((item) => `<p>${escapeHtml(item)}</p>`).join("")}
            </div>
          </article>

          <article class="info-panel report-split-panel">
            <div class="info-head">
              <div>
                <span class="metric-label">Operating split</span>
                <h3>Tenders and projects</h3>
              </div>
            </div>
            ${renderReportSplit(report)}
          </article>

          <article class="info-panel report-actions-panel">
            <div class="info-head">
              <div>
                <span class="metric-label">Action pack</span>
                <h3>Top follow-ups</h3>
              </div>
              <span>${report.topActions.length} shown</span>
            </div>
            ${renderReportActions(report.topActions)}
          </article>

          <article class="info-panel">
            <div class="info-head">
              <div>
                <span class="metric-label">Client concentration</span>
                <h3>Relationship heat</h3>
              </div>
            </div>
            ${renderReportClients(report.topClients)}
          </article>

          <article class="info-panel">
            <div class="info-head">
              <div>
                <span class="metric-label">Value exposure</span>
                <h3>Largest open values</h3>
              </div>
            </div>
            ${renderReportValues(report.topOpenValues)}
          </article>

          <article class="info-panel">
            <div class="info-head">
              <div>
                <span class="metric-label">Due radar</span>
                <h3>Calendar pressure</h3>
              </div>
            </div>
            ${renderDueCards(report.dueBuckets)}
          </article>

          <article class="info-panel report-checklist">
            <div class="info-head">
              <div>
                <span class="metric-label">Meeting checklist</span>
                <h3>Before sending the pack</h3>
              </div>
            </div>
            ${renderReportChecklist(report.checklist)}
          </article>

          <article class="info-panel">
            <div class="info-head">
              <div>
                <span class="metric-label">Category mix</span>
                <h3>Work concentration</h3>
              </div>
            </div>
            ${renderRankBars(report.categoryRows, "amber")}
          </article>
        </div>
      </section>
    `;
  }

  function renderReportSplit(report) {
    const rows = [
      ["Tenders", report.tenderMetrics.total, report.tenderMetrics.open, report.tenderMetrics.closed, formatCompactMoney(report.tenderMetrics.value)],
      ["Projects", report.projectMetrics.total, report.projectMetrics.open, report.projectMetrics.closed, formatCompactMoney(report.projectMetrics.value)],
    ];
    return `
      <div class="report-split">
        ${rows
          .map(
            ([label, total, open, closed, value]) => `
              <div>
                <strong>${escapeHtml(label)}</strong>
                <span>${total} records</span>
                <span>${open} open</span>
                <span>${closed} closed</span>
                <b>${escapeHtml(value)}</b>
              </div>
            `,
          )
          .join("")}
      </div>
    `;
  }

  function renderReportActions(tasks) {
    if (!tasks.length) return `<div class="empty-state compact">No generated follow-ups available.</div>`;
    return `
      <div class="report-action-list">
        ${tasks
          .map((task) => {
            const record = task.record;
            const dueText =
              task.days === null
                ? "No date"
                : task.days < 0
                  ? `${Math.abs(task.days)}d late`
                  : task.days === 0
                    ? "Due today"
                    : `${task.days}d left`;
            return `
              <button class="report-action-row tone-${escapeHtml(task.tone)}" type="button" data-action="open-related-record" data-id="${escapeHtml(record.id)}">
                <span>${escapeHtml(task.lane)}</span>
                <strong>${escapeHtml(record.title || "Untitled record")}</strong>
                <em>${escapeHtml([record.client, record.type, record.status, dueText].filter(Boolean).join(" / "))}</em>
              </button>
            `;
          })
          .join("")}
      </div>
    `;
  }

  function renderReportClients(accounts) {
    if (!accounts.length) return `<div class="empty-state compact">No client accounts available.</div>`;
    return `
      <div class="report-client-list">
        ${accounts
          .map(
            (account) => `
              <button class="report-client-row" type="button" data-action="open-related-record" data-id="${escapeHtml(account.latest?.id || "")}" ${account.latest ? "" : "disabled"}>
                <span>
                  <strong>${escapeHtml(account.label)}</strong>
                  <em>${account.records.length} records / ${account.openCount} open / ${escapeHtml(formatCompactMoney(account.totalValue))}</em>
                </span>
                <b>${account.score}</b>
              </button>
            `,
          )
          .join("")}
      </div>
    `;
  }

  function renderReportValues(records) {
    if (!records.length) return `<div class="empty-state compact">No open value captured yet.</div>`;
    return `
      <div class="report-value-list">
        ${records
          .map(
            (record) => `
              <button class="report-value-row" type="button" data-action="open-related-record" data-id="${escapeHtml(record.id)}">
                <span>
                  <strong>${escapeHtml(record.client || record.reference || "Open record")}</strong>
                  <em>${escapeHtml(record.title || "Untitled record")}</em>
                </span>
                <b>${escapeHtml(formatCompactMoney(record.valueAmount))}</b>
              </button>
            `,
          )
          .join("")}
      </div>
    `;
  }

  function renderReportChecklist(rows) {
    return `
      <div class="report-check-list">
        ${rows
          .map(
            ([label, note]) => `
              <div>
                <strong>${escapeHtml(label)}</strong>
                <span>${escapeHtml(note)}</span>
              </div>
            `,
          )
          .join("")}
      </div>
    `;
  }

  function renderLensSwitch(activeLens) {
    return `
      <div class="lens-switch" aria-label="Insights lens">
        ${["Open", "All", "Tenders", "Projects", "High value"]
          .map(
            (lens) => `
              <button class="${activeLens === lens ? "active" : ""}" type="button" data-insight-lens="${escapeHtml(lens)}">
                ${escapeHtml(lens)}
              </button>
            `,
          )
          .join("")}
      </div>
    `;
  }

  function renderDecisionBoard(rows) {
    if (!rows.length) return `<div class="empty-state compact">No open pursuits in this lens.</div>`;
    return `
      <div class="decision-list">
        ${rows
          .map(({ record, score, recommendation, tone, reasons, days }) => {
            const dueText = days === null ? "No due date" : days < 0 ? `${Math.abs(days)}d late` : `${days}d left`;
            return `
              <button class="decision-row" type="button" data-action="select" data-id="${escapeHtml(record.id)}">
                <span class="decision-score tone-${escapeHtml(tone)}">${score}</span>
                <span class="decision-main">
                  <strong>${escapeHtml(record.client || record.reference || "Open pursuit")}</strong>
                  <em>${escapeHtml(record.title || "Untitled record")}</em>
                  <small>${escapeHtml([record.type, record.status, dueText].filter(Boolean).join(" / "))}</small>
                </span>
                <span class="decision-rec">
                  <strong>${escapeHtml(recommendation)}</strong>
                  <small>${escapeHtml(reasons.length ? reasons.join(" / ") : "Clean record")}</small>
                </span>
              </button>
            `;
          })
          .join("")}
      </div>
    `;
  }

  function renderRiskMatrix(rows) {
    return `
      <div class="risk-matrix">
        ${rows
          .map(
            (row) => `
              <div class="risk-cell tone-${escapeHtml(row.tone)}">
                <span>${escapeHtml(row.label)}</span>
                <strong>${row.count}</strong>
                <small>${escapeHtml(row.note)}</small>
              </div>
            `,
          )
          .join("")}
      </div>
    `;
  }

  function renderComplianceRows(rows) {
    return `
      <div class="compliance-list">
        ${rows
          .map(
            (row) => `
              <div class="compliance-row">
                <div class="compliance-meta">
                  <span>${escapeHtml(row.label)}</span>
                  <strong>${row.value}%</strong>
                </div>
                <div class="rank-track">
                  <i class="rank-fill tone-teal" style="width: ${Math.max(4, row.value)}%"></i>
                </div>
              </div>
            `,
          )
          .join("")}
      </div>
    `;
  }

  function renderPlaybookRows(rows) {
    return `
      <div class="playbook-list">
        ${rows
          .map(
            ([stage, item, status]) => `
              <div class="playbook-row">
                <span>${escapeHtml(stage)}</span>
                <strong>${escapeHtml(item)}</strong>
                <em class="${status === "Live" ? "is-live" : ""}">${escapeHtml(status)}</em>
              </div>
            `,
          )
          .join("")}
      </div>
    `;
  }

  function renderInsightKpi(label, value, note) {
    return `
      <div class="insight-kpi">
        <span>${escapeHtml(label)}</span>
        <strong>${escapeHtml(value)}</strong>
        <small>${escapeHtml(note)}</small>
      </div>
    `;
  }

  function renderFunnel(rows) {
    const max = Math.max(...rows.map((row) => row.value), 1);
    return `
      <div class="funnel-list">
        ${rows
          .map((row) => {
            const width = Math.max(5, Math.round((row.value / max) * 100));
            return `
              <div class="funnel-row">
                <div class="funnel-meta">
                  <span>${escapeHtml(row.label)}</span>
                  <strong>${row.value}</strong>
                </div>
                <div class="funnel-track">
                  <i class="funnel-fill" style="width: ${width}%"></i>
                </div>
              </div>
            `;
          })
          .join("")}
      </div>
    `;
  }

  function renderRankBars(rows, tone) {
    if (!rows.length) return `<div class="empty-state compact">No records available.</div>`;
    const max = Math.max(...rows.map((row) => row.value), 1);
    return `
      <div class="rank-list">
        ${rows
          .map((row) => {
            const width = Math.max(5, Math.round((row.value / max) * 100));
            return `
              <div class="rank-row">
                <div class="rank-meta">
                  <span>${escapeHtml(row.label)}</span>
                  <strong>${row.value}</strong>
                </div>
                <div class="rank-track">
                  <i class="rank-fill tone-${escapeHtml(tone)}" style="width: ${width}%"></i>
                </div>
              </div>
            `;
          })
          .join("")}
      </div>
    `;
  }

  function renderDueCards(rows) {
    return `
      <div class="due-grid">
        ${rows
          .map(
            (row) => `
              <div class="due-card tone-${escapeHtml(row.tone)}">
                <span>${escapeHtml(row.label)}</span>
                <strong>${row.value}</strong>
              </div>
            `,
          )
          .join("")}
      </div>
    `;
  }

  function renderValueList(records) {
    if (!records.length) return `<div class="empty-state compact">No open value captured yet.</div>`;
    return `
      <div class="value-list">
        ${records
          .map(
            (record) => `
              <div class="value-row">
                <div>
                  <strong>${escapeHtml(record.client || record.reference || "Open opportunity")}</strong>
                  <span>${escapeHtml(record.title || "Untitled record")}</span>
                </div>
                <div>
                  <em>${escapeHtml(formatCompactMoney(record.valueAmount))}</em>
                  <span class="status-badge ${statusClass(record.status)}">${escapeHtml(record.status)}</span>
                </div>
              </div>
            `,
          )
          .join("")}
      </div>
    `;
  }

  function membershipProjection(company = state.data.company) {
    const projection = pricingProjection(company);
    const seats = projection.seats;
    const selected = state.membershipPlan || "Team Workspace";
    const plan = {
      "Sample Workspace": {
        label: "Sample Workspace",
        base: 0,
        perUser: 0,
        note: "Prototype access for stakeholder testing.",
        cta: "Open demo workspace",
      },
      "Team Workspace": {
        label: "Team Workspace",
        base: 0,
        perUser: company.pricePerUser,
        note: "Launch membership for company teams using shared tender control.",
        cta: "Activate Team membership",
      },
      "Business Plus": {
        label: "Business Plus",
        base: BUSINESS_PLUS_BASE,
        perUser: company.pricePerUser,
        note: "Adds governance, audit history, import refresh, and reminders after MVP validation.",
        cta: "Reserve Plus roadmap",
      },
      "Control Desk": {
        label: "Control Desk",
        base: null,
        perUser: null,
        note: "Annual enterprise deployment for multi-company governance and approvals.",
        cta: "Request custom proposal",
      },
    }[selected];
    const monthly = plan.base === null ? null : plan.base + seats * plan.perUser;
    const annualRunRate = monthly === null ? null : monthly * 12;
    const annualPrepay = monthly === null ? null : monthly * ANNUAL_BILLABLE_MONTHS;
    return {
      ...plan,
      seats,
      monthly,
      annual: annualRunRate,
      annualPrepay,
      annualSavings: monthly === null ? null : annualRunRate - annualPrepay,
      dueNow: monthly === null ? null : projection.billingTerm === "Annual" ? annualPrepay : monthly,
      billingTerm: projection.billingTerm,
      isCustom: monthly === null,
    };
  }

  function renderMembershipPage(stats, company) {
    const membership = membershipProjection(company);
    return `
      <section class="membership-page" aria-labelledby="membershipTitle">
        <div class="membership-console">
          <div class="membership-copy">
            <span class="panel-label">Membership console</span>
            <h2 id="membershipTitle">Turn the demo into a paid company workspace.</h2>
            <p>Keep pricing simple for the first customers, then graduate them into governance, auditability, reminders, and controlled deployment.</p>
            <div class="membership-actions">
              <button class="secondary-btn" type="button" data-action="subscription-request">${escapeHtml(membership.cta)}</button>
              <button class="ghost-btn" type="button" data-action="review-seats">Review team seats</button>
            </div>
          </div>
          <div class="subscription-card">
            <span class="metric-label">Selected membership</span>
            <strong id="membershipPlanName">${escapeHtml(membership.label)}</strong>
            <p id="membershipPlanNote">${escapeHtml(membership.note)}</p>
            <div class="subscription-total">
              <span id="membershipBillingLabel">${membership.billingTerm === "Annual" ? "Annual prepaid" : "Monthly estimate"}</span>
              <strong id="membershipMonthly">${membership.isCustom ? "Custom" : formatBilling(membership.dueNow, company)}</strong>
              <small id="membershipAnnual">${membership.isCustom ? "Annual proposal" : membership.billingTerm === "Annual" ? `${formatBilling(membership.annualSavings, company)} saved vs monthly` : `${formatBilling(membership.annual, company)} annual run-rate`}</small>
            </div>
          </div>
        </div>

        <div class="membership-grid">
          <article class="membership-panel" id="membershipSeatSection">
            <span class="metric-label">Subscription builder</span>
            <h3>Plan, seats, and billing estimate</h3>
            <div class="subscription-form-grid">
              <label>
                <span>Plan</span>
                <select data-membership="plan" aria-label="Membership plan">
                  ${["Sample Workspace", "Team Workspace", "Business Plus", "Control Desk"]
                    .map(
                      (plan) =>
                        `<option value="${escapeHtml(plan)}" ${plan === state.membershipPlan ? "selected" : ""}>${escapeHtml(plan)}</option>`,
                    )
                    .join("")}
                </select>
              </label>
              <label class="membership-seat-slider">
                <span><strong id="membershipSeatCount">${membership.seats}</strong> seats</span>
                <input type="range" min="1" max="100" value="${membership.seats}" data-pricing="seats" aria-label="Membership seats">
              </label>
              <div class="billing-term-box">
                <span>Billing term</span>
                <div class="billing-term-toggle" role="group" aria-label="Billing term">
                  ${BILLING_TERMS.map(
                    (term) => `
                      <button class="${membership.billingTerm === term ? "active" : ""}" type="button" data-billing-term="${term}">
                        ${term}
                      </button>
                    `,
                  ).join("")}
                </div>
                <small>${membership.billingTerm === "Annual" ? "2 months free on annual prepaid billing" : "Monthly billing keeps the first pilot flexible"}</small>
              </div>
              <div class="subscription-mini">
                <span>Current demo seats</span>
                <strong>${stats.seats}</strong>
                <small>Admin, editor, and viewer users</small>
              </div>
              <div class="subscription-mini">
                <span>Launch price</span>
                <strong>${formatBilling(company.pricePerUser, company)}</strong>
                <small>per active user / month</small>
              </div>
            </div>
          </article>

          <article class="membership-panel">
            <span class="metric-label">Subscription request</span>
            <h3>Static MVP checkout preview</h3>
            <div class="request-preview">
              <div><span>Company</span><strong>${escapeHtml(company.name)}</strong></div>
              <div><span>Account owner</span><strong>${escapeHtml(state.user.name)}</strong></div>
              <div><span>Billing cycle</span><strong id="requestBillingCycle">${escapeHtml(membership.billingTerm)}</strong></div>
              <div><span>Due now</span><strong id="requestDueNow">${membership.isCustom ? "Custom" : formatBilling(membership.dueNow, company)}</strong></div>
              <div><span>Status</span><strong id="subscriptionStatus">Ready for pilot invoice</strong></div>
            </div>
            <p class="subscription-disclaimer">This demo prepares the membership request. A production version should connect payment, invoices, trials, and tenant provisioning to a backend.</p>
          </article>
        </div>

        ${renderMembershipAccessPanel(company)}

        ${renderPlatformRoadmapSection()}

        ${renderPricingSection(stats, company)}
      </section>
    `;
  }

  function renderPlatformRoadmapSection() {
    return `
      <section class="platform-roadmap" aria-labelledby="platformRoadmapTitle">
        <div class="section-heading">
          <div>
            <p class="eyebrow">Platform roadmap</p>
            <h2 id="platformRoadmapTitle">Grow from pursuit tracking into a full operating desk.</h2>
          </div>
          <span class="status-chip">Module-ready vision</span>
        </div>
        <div class="roadmap-summary">
          <article>
            <span class="metric-label">Current product</span>
            <strong>Tenders + Projects</strong>
            <p>The MVP stays focused on the two daily work areas while proving the shared workspace, access control, analytics, and membership model.</p>
          </article>
          <article>
            <span class="metric-label">Expansion logic</span>
            <strong>One workspace, many records</strong>
            <p>Contracts, clients, documents, reminders, and reports can be added as modules around the same company data model.</p>
          </article>
        </div>
        <div class="module-grid" aria-label="${BRAND_NAME} future modules">
          ${PLATFORM_MODULES.map(
            (module) => `
              <article class="module-card ${module.stage === "Live foundation" ? "is-live" : ""}">
                <div class="module-card-head">
                  <span class="module-code">${escapeHtml(module.code)}</span>
                  <span class="module-stage">${escapeHtml(module.stage)}</span>
                </div>
                <strong>${escapeHtml(module.name)}</strong>
                <p>${escapeHtml(module.summary)}</p>
                <small>${escapeHtml(module.signal)}</small>
              </article>
            `,
          ).join("")}
        </div>
      </section>
    `;
  }

  function renderMembershipAccessPanel(company) {
    const users = state.data.users.filter((user) => user.companyId === state.user.companyId);
    return `
      <article class="membership-panel access-panel" aria-labelledby="accessTitle">
        <div class="access-head">
          <div>
            <span class="metric-label">User access control</span>
            <h3 id="accessTitle">Choose which sections each user can open</h3>
          </div>
          <span class="status-chip">${formatBilling(company.pricePerUser)}/user monthly</span>
        </div>
        ${renderAccessBlueprint()}
        <div class="access-layout">
          <div class="access-table-wrap">
            <table class="team-table access-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Role</th>
                  <th>Section access</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                ${users.map(renderUserRow).join("")}
              </tbody>
            </table>
          </div>
          ${
            canAdmin()
              ? renderUserForm()
              : `<div class="readonly-note">Only admins can create users or change section access.</div>`
          }
        </div>
      </article>
    `;
  }

  function renderAccessBlueprint() {
    return `
      <div class="access-blueprint-grid" aria-label="${BRAND_NAME} access templates">
        ${ACCESS_BLUEPRINTS.map((blueprint) => `
          <article>
            <span>${escapeHtml(blueprint.commercial)}</span>
            <strong>${escapeHtml(blueprint.label)}</strong>
            <p>${escapeHtml(blueprint.note)}</p>
            <div>
              ${blueprint.sections.map((section) => `<em>${escapeHtml(section)}</em>`).join("")}
            </div>
          </article>
        `).join("")}
      </div>
    `;
  }

  function renderPricingSection(stats, company) {
    const projection = pricingProjection(company);
    return `
      <section id="pricing" class="pricing-band" aria-labelledby="pricingTitle">
        <div class="section-heading">
          <div>
            <p class="eyebrow">Membership model</p>
            <h2 id="pricingTitle">Light monthly fee, serious tender discipline.</h2>
          </div>
          <span class="status-chip">${formatBilling(company.pricePerUser, company)}/user launch price</span>
        </div>

        <div class="pricing-snapshot" aria-label="${BRAND_NAME} pricing economics">
          <article>
            <span class="metric-label">Current demo bill</span>
            <strong>${formatBilling(stats.bill, company)}/mo</strong>
            <p>${stats.seats} active users at ${formatBilling(company.pricePerUser, company)}/user/month.</p>
          </article>
          <article>
            <span class="metric-label">10-user company</span>
            <strong>${formatBilling(company.pricePerUser * 10, company)}/mo</strong>
            <p>A simple first sales target for small tender and project teams.</p>
          </article>
          <article>
            <span class="metric-label">100-seat base</span>
            <strong>${formatBilling(company.pricePerUser * 100, company)}/mo</strong>
            <p>A realistic milestone once several companies are active.</p>
          </article>
          <article>
            <span class="metric-label">Annual prepaid</span>
            <strong>${formatBilling(projection.annualPrepay, company)}</strong>
            <p>10 months charged upfront, saving ${formatBilling(projection.annualSavings, company)} for a ${projection.seats}-seat team.</p>
          </article>
        </div>

        <div class="seat-calculator" aria-label="${BRAND_NAME} seat price calculator">
          <div>
            <span class="metric-label">Seat calculator</span>
            <h3>Model the monthly bill before talking to a customer.</h3>
            <p>Use the launch price of ${formatBilling(company.pricePerUser, company)}/user/month and show the buyer how the bill changes as their team grows.</p>
          </div>
          <label class="seat-slider">
            <span><strong id="pricingSeatCount">${projection.seats}</strong> users</span>
            <input type="range" min="1" max="100" value="${projection.seats}" data-pricing="seats" aria-label="Pricing seats">
          </label>
          <div class="calculator-results">
            <div><span>Monthly</span><strong id="pricingMonthly">${formatBilling(projection.monthly, company)}</strong></div>
            <div><span>Annual prepaid</span><strong id="pricingAnnual">${formatBilling(projection.annualPrepay, company)}</strong></div>
            <div><span>Price per user</span><strong>${formatBilling(projection.perUser, company)}</strong></div>
            <div><span>Annual saving</span><strong id="pricingSavings">${formatBilling(projection.annualSavings, company)}</strong></div>
          </div>
        </div>

        <div class="pricing-grid" aria-label="${BRAND_NAME} pricing plan preview">
          <article class="pricing-card">
            <span class="plan-kicker">Demo</span>
            <h3>Sample Workspace</h3>
            <p class="plan-price"><strong>${formatBilling(0, company)}</strong><span>prototype access</span></p>
            <p class="price-note">For evaluating the Excel-to-online workflow before production hosting.</p>
            <ul class="pricing-feature-list">
              <li>Imported sample tender and project records</li>
              <li>Admin, editor, and viewer demo roles</li>
              <li>Local browser storage and CSV export</li>
              <li>Visual proof for stakeholder feedback</li>
            </ul>
            <button class="plan-link" type="button" data-membership-plan="Sample Workspace">Choose demo</button>
          </article>

          <article class="pricing-card is-featured">
            <span class="plan-kicker">Recommended</span>
            <h3>Team Workspace</h3>
            <p class="plan-price"><strong>${formatBilling(company.pricePerUser, company)}</strong><span>per user / month</span></p>
            <p class="annual-price">Current demo bill: ${formatBilling(stats.bill, company)}/month for ${stats.seats} users</p>
            <p class="price-note">The simple launch plan for small companies that need shared tender control without heavy software.</p>
            <ul class="pricing-feature-list">
              <li>Company-scoped tender and project tracker</li>
              <li>Role-based access for admin, editor, and viewer</li>
              <li>Quick analytics, filters, notes, and export</li>
              <li>Monthly or annual prepaid billing that stays easy to explain</li>
            </ul>
            <button class="plan-link" type="button" data-membership-plan="Team Workspace">Choose Team</button>
          </article>

          <article class="pricing-card growth-card">
            <span class="plan-kicker">Next phase</span>
            <h3>Business Plus</h3>
            <p class="plan-price"><strong>${formatBilling(BUSINESS_PLUS_BASE, company)}</strong><span>company base / month</span></p>
            <p class="price-note">For teams that need production-grade workflow controls after the MVP is validated.</p>
            <ul class="pricing-feature-list">
              <li>Backend database and secure authentication</li>
              <li>Audit history for edits and user activity</li>
              <li>Excel import refresh and attachment roadmap</li>
              <li>Email reminders for due dates and next actions</li>
            </ul>
            <button class="plan-link muted" type="button" data-membership-plan="Business Plus">Choose Plus</button>
          </article>

          <article class="pricing-card enterprise-card">
            <span class="plan-kicker">Enterprise</span>
            <h3>Control Desk</h3>
            <p class="plan-price"><strong>Custom</strong><span>annual contract</span></p>
            <p class="price-note">For larger groups needing deeper governance, multiple companies, and stricter controls.</p>
            <ul class="pricing-feature-list">
              <li>Multi-company workspace governance</li>
              <li>Advanced permissions and approval trails</li>
              <li>Custom reporting and management dashboards</li>
              <li>Priority implementation and support</li>
            </ul>
            <button class="plan-link muted" type="button" data-membership-plan="Control Desk">Request Control</button>
          </article>
        </div>

        <div class="pricing-note-grid" aria-label="${BRAND_NAME} pricing principles">
          <article class="pricing-note">
            <span class="metric-label">Launch principle</span>
            <strong>Keep the entry price obvious</strong>
            <p>${formatBilling(company.pricePerUser, company)}/user/month is easy for customers to understand, approve, and expand as more users join.</p>
          </article>
          <article class="pricing-note">
            <span class="metric-label">Value anchor</span>
            <strong>Replace messy spreadsheet coordination</strong>
            <p>The buyer is paying for one shared source of truth, safer handoffs, and faster follow-up on live opportunities.</p>
          </article>
          <article class="pricing-note">
            <span class="metric-label">Upgrade path</span>
            <strong>Sell governance after trust</strong>
            <p>Once teams rely on ${BRAND_NAME} daily, audit logs, imports, reminders, and controls become natural paid upgrades.</p>
          </article>
        </div>

        <div class="pricing-compare" aria-label="${BRAND_NAME} plan comparison">
          <div class="compare-head">
            <div>
              <span class="metric-label">Plan comparison</span>
              <strong>Keep the first sale simple, then grow into governance.</strong>
            </div>
            <span class="status-chip">Buyer-ready packaging</span>
          </div>
          <div class="compare-grid">
            <div class="compare-row compare-row-head">
              <span>Capability</span>
              <span>Demo</span>
              <span>Team</span>
              <span>Plus</span>
              <span>Control</span>
            </div>
            ${[
              ["Shared tender grid", "Yes", "Yes", "Yes", "Yes"],
              ["Role access", "Demo", "Included", "Advanced", "Custom"],
              ["Monthly seat billing", "No", `${formatBilling(company.pricePerUser, company)}/user`, "Base + seats", "Contract"],
              ["Annual prepaid option", "No", "2 months free", "Included", "Custom"],
              ["Audit history", "No", "Roadmap", "Included", "Custom"],
              ["Import automation", "Manual", "Roadmap", "Included", "Custom"],
            ]
              .map(
                (row) => `
                  <div class="compare-row">
                    ${row.map((cell) => `<span>${escapeHtml(cell)}</span>`).join("")}
                  </div>
                `,
              )
              .join("")}
          </div>
        </div>

        <div class="billing-faq-grid" aria-label="${BRAND_NAME} billing notes">
          <article>
            <span class="metric-label">Billing rule</span>
            <strong>Charge active users only</strong>
            <p>Admin, editor, and viewer seats are counted the same at launch so invoices stay easy.</p>
          </article>
          <article>
            <span class="metric-label">Upgrade trigger</span>
            <strong>Add controls when teams ask for trust</strong>
            <p>Audit logs, reminders, approvals, and import refresh can become the paid governance layer.</p>
          </article>
          <article>
            <span class="metric-label">Sales line</span>
            <strong>One shared tender sheet for ${formatBilling(company.pricePerUser, company)}/user/month</strong>
            <p>The offer should be simple enough for a first call and credible enough for a pilot invoice.</p>
          </article>
        </div>
      </section>
    `;
  }

  function renderTracker(records, selected, stats) {
    const counterRecords = sectionRecords();
    const categories = uniqueOptions("category");
    const statuses = Array.from(new Set([...STATUS_OPTIONS, ...uniqueOptions("status")]));
    const typeOptions = isProjectSection() ? ["All", "Project"] : ["All", "EOI", "Tender"];
    const isBoardMode = state.trackerMode === "Board";
    const isTimelineMode = state.trackerMode === "Timeline";
    const boardLanes = isBoardMode ? buildBoardLanes(records) : [];
    const timelineBuckets = isTimelineMode ? buildTimelineBuckets(records) : [];
    const visibleDepth = state.tableDensity === "Compact" ? 28 : 21;
    const visibleEnd = Math.min(records.length, visibleDepth);
    const trackerMeta = isBoardMode
      ? `${records.length} cards across ${boardLanes.length} lanes`
      : isTimelineMode
        ? `${records.length} records across ${timelineBuckets.length} date lanes`
        : records.length
          ? `Showing 1-${visibleEnd} of ${records.length}`
          : "No records";
    return `
      <section class="tracker-layout density-${state.tableDensity.toLowerCase()} mode-${state.trackerMode.toLowerCase()} ${state.detailCollapsed ? "detail-collapsed" : ""}">
        <aside class="left-rail">
          ${renderCommandPanel(records, counterRecords)}
          ${renderMixPanel(counterRecords)}
        </aside>

        <section class="workbench">
          <section class="toolbar" aria-label="Tracker controls">
            <div class="toolbar-filters">
              <input class="filter-input" type="search" placeholder="Search records" value="${escapeHtml(state.filters.search)}" data-filter="search">
              ${renderSelect("type", typeOptions, typeOptions.includes(state.filters.type) ? state.filters.type : "All", "filter-select")}
              ${renderSelect("status", ["All", ...statuses], state.filters.status, "filter-select")}
              ${renderSelect("category", ["All", ...categories], state.filters.category, "filter-select")}
              ${renderSelect("lane", LANE_OPTIONS, state.filters.lane || "All lanes", "filter-select lane-select")}
            </div>
            <div class="toolbar-actions">
              <div class="mode-toggle" role="group" aria-label="Tracker view">
                ${["Sheet", "Board", "Timeline"]
                  .map(
                    (mode) => `
                      <button class="${state.trackerMode === mode ? "active" : ""}" type="button" data-tracker-mode="${mode}">
                        ${mode}
                      </button>
                    `,
                  )
                  .join("")}
              </div>
              <div class="density-toggle" role="group" aria-label="Grid density">
                ${["Comfortable", "Compact"]
                  .map(
                    (density) => `
                      <button class="${state.tableDensity === density ? "active" : ""}" type="button" data-density="${density}">
                        ${density}
                      </button>
                    `,
                  )
                  .join("")}
              </div>
              <button class="ghost-btn" type="button" data-action="toggle-detail">${state.detailCollapsed ? "Show detail" : "Hide detail"}</button>
              <button class="secondary-btn" type="button" data-action="add" ${canEdit() ? "" : "disabled"}>New row</button>
              <button class="ghost-btn" type="button" data-action="export">Export CSV</button>
            </div>
          </section>

          ${renderTrackerSignalStrip(counterRecords)}

          ${renderActionQueue(records)}

          <div class="table-panel">
            <div class="table-head">
              <div>
                <span class="panel-label">Editable tracker</span>
                <h2>${state.view === "Projects" ? "Projects" : "Tenders"}</h2>
              </div>
              <div class="table-head-meta">
                <span>${records.length} visible</span>
                <strong>${trackerMeta}</strong>
              </div>
              ${
                isBoardMode || isTimelineMode
                  ? ""
                  : `<div class="column-guide" aria-hidden="true">
                <span>Reference</span>
                <span>Client</span>
                <span>Title</span>
                <span>Status</span>
                <span>Due / Last</span>
                <span>Actions</span>
              </div>`
              }
            </div>
            ${
              isBoardMode
                ? renderTrackerBoard(boardLanes)
                : isTimelineMode
                  ? renderTrackerTimeline(timelineBuckets)
                  : `<div class="table-wrap">
                    ${records.length ? renderTable(records) : `<div class="empty-state">No matching records.</div>`}
                  </div>
                  <div class="mobile-records">
                    ${records.length ? records.map(renderMobileRecord).join("") : `<div class="empty-state">No matching records.</div>`}
                  </div>`
            }
          </div>
        </section>

        ${state.detailCollapsed ? "" : renderDetail(selected)}
      </section>
    `;
  }

  function renderCommandPanel(visibleRecords, counterRecords) {
    const attention = counterRecords.filter((record) =>
      ["Active", "Pending", "Submitted", "Ongoing"].includes(record.status),
    ).length;
    const countStatus = (status) => counterRecords.filter((record) => record.status === status).length;
    const signalRows = isProjectSection()
      ? [
          ["Ongoing", "Ongoing", countStatus("Ongoing"), "teal"],
          ["Completed", "Completed", countStatus("Completed"), "green"],
          ["Cancelled", "Cancelled", countStatus("Cancelled"), "red"],
          ["Regret", "Regret", countStatus("Regret"), "red"],
        ]
      : [
          ["Active", "Active", countStatus("Active"), "teal"],
          ["Pending", "Pending", countStatus("Pending"), "amber"],
          ["Submitted", "Submitted", countStatus("Submitted"), "blue"],
          ["Awarded", "Awarded", countStatus("Awarded"), "green"],
        ];
    return `
      <div class="panel command-panel">
        <div class="panel-heading">
          <h2>Command rail</h2>
          <span>${visibleRecords.length} shown</span>
        </div>
        <div class="focus-card">
          <span>Needs movement</span>
          <strong>${attention}</strong>
          <small>${isProjectSection() ? "ongoing project records needing delivery attention" : "active, pending, and submitted tender records"}</small>
        </div>
        <div class="signal-list">
          ${signalRows
            .map(
              ([label, status, value, tone]) => `
                <button class="signal-row tone-${escapeHtml(tone)} ${state.filters.status === status ? "active" : ""}" type="button" data-quick-status="${escapeHtml(status)}">
                  <span>${label}</span>
                  <strong>${value}</strong>
                </button>
              `,
            )
            .join("")}
        </div>
      </div>
    `;
  }

  function renderTrackerSignalStrip(records) {
    const openRecords = records.filter((record) => !isClosedRecord(record));
    const dueBuckets = buildDueBuckets(records);
    const bucketValue = (label) => dueBuckets.find((bucket) => bucket.label === label)?.value || 0;
    const missingOwner = openRecords.filter((record) => !String(record.owner || "").trim()).length;
    const readyRhythm = openRecords.filter((record) => record.reference && record.client && record.title && record.status && record.owner && record.endDate).length;
    const cards = [
      ["Past due", bucketValue("Past due"), "Needs date movement", "red"],
      ["Next 30", bucketValue("Next 30 days"), "Near-term follow-up", "amber"],
      ["Missing owner", missingOwner, "Assign accountability", "blue"],
      ["Ready rhythm", readyRhythm, "Core fields complete", "green"],
    ];
    return `
      <section class="tracker-signal-strip" aria-label="${escapeHtml(state.view)} operating signals">
        ${cards
          .map(
            ([label, value, note, tone]) => `
              <article class="tracker-signal-card tone-${escapeHtml(tone)}">
                <span>${escapeHtml(label)}</span>
                <strong>${escapeHtml(value)}</strong>
                <small>${escapeHtml(note)}</small>
              </article>
            `,
          )
          .join("")}
      </section>
    `;
  }

  function renderMixPanel(records) {
    const total = Math.max(records.length, 1);
    const rows = isProjectSection()
      ? [
          ["Ongoing", records.filter((record) => record.status === "Ongoing").length, "blue"],
          ["Completed", records.filter((record) => record.status === "Completed").length, "green"],
          ["Due Watch", sectionMetrics(records).dueWatch, "amber"],
        ]
      : [
          ["Tender", records.filter((record) => record.type === "Tender").length, "teal"],
          ["EOI", records.filter((record) => record.type === "EOI").length, "amber"],
          ["Awarded", records.filter((record) => record.status === "Awarded").length, "green"],
        ];
    return `
      <div class="panel">
        <div class="panel-heading">
          <h2>${isProjectSection() ? "Project mix" : "Tender mix"}</h2>
          <span>${records.length} total</span>
        </div>
        <div class="mix-bars">
          ${rows
            .map(([label, value, tone]) => {
              const width = Math.max(4, Math.round((value / total) * 100));
              return `
                <div class="mix-row">
                  <div class="mix-meta"><span>${label}</span><strong>${value}</strong></div>
                  <div class="mix-track"><i class="mix-fill tone-${tone}" style="width: ${width}%"></i></div>
                </div>
              `;
            })
            .join("")}
        </div>
      </div>
    `;
  }

  function renderSelect(name, options, value, className) {
    return `
      <select class="${className}" data-filter="${name}" aria-label="${escapeHtml(name)}">
        ${options
          .map(
            (option) =>
              `<option value="${escapeHtml(option)}" ${option === value ? "selected" : ""}>${escapeHtml(option)}</option>`,
          )
          .join("")}
      </select>
    `;
  }

  function renderTable(records) {
    return `
      <table class="tracker-table">
        <thead>
          <tr>
            <th class="col-ref">Reference</th>
            <th class="col-client">Client</th>
            <th class="col-title">Title</th>
            <th class="col-status">Status</th>
            <th class="col-date">Due / Last</th>
            <th class="col-actions">Actions</th>
          </tr>
        </thead>
        <tbody>
          ${records.map(renderRow).join("")}
        </tbody>
      </table>
    `;
  }

  function renderRow(record) {
    const editable = canEdit();
    const selected = record.id === state.selectedId ? "selected-row" : "";
    return `
      <tr class="${selected}" data-id="${escapeHtml(record.id)}">
        <td>${editableCell(record, "reference", "mono")}</td>
        <td>${editableCell(record, "client")}</td>
        <td>
          <div class="cell-stack">
            ${editableCell(record, "title")}
            <span>${escapeHtml([record.type, record.category, record.owner].filter(Boolean).join(" / ") || "No metadata")}</span>
          </div>
        </td>
        <td>${renderRecordSelect(record, "status", STATUS_OPTIONS, editable, true)}</td>
        <td>${renderDateCell(record.endDate)}</td>
        <td>
          <div class="row-actions">
            <button class="mini-btn" type="button" data-action="select" data-id="${escapeHtml(record.id)}">View</button>
            <button class="mini-btn danger" type="button" data-action="delete" data-id="${escapeHtml(record.id)}" ${editable ? "" : "disabled"}>Del</button>
          </div>
        </td>
      </tr>
    `;
  }

  function renderMobileRecord(record) {
    const selected = record.id === state.selectedId ? "selected-card" : "";
    return `
      <button class="record-card ${selected}" type="button" data-id="${escapeHtml(record.id)}" data-action="select">
        <span class="record-card-top">
          <strong>${escapeHtml(record.reference || "No reference")}</strong>
          <span class="status-badge ${statusClass(record.status)}">${escapeHtml(record.status)}</span>
        </span>
        <span class="record-title">${escapeHtml(record.title || "Untitled record")}</span>
        <span class="record-meta">${escapeHtml(record.client || "No client")} / ${escapeHtml(record.type)} / ${escapeHtml(record.owner || "No owner")}</span>
      </button>
    `;
  }

  function renderActionQueue(records) {
    const items = buildActionQueue(records).slice(0, 5);
    const openCount = records.filter((record) => !isClosedRecord(record)).length;
    const queueLabel = items.length ? `Top ${items.length}` : "Clear";
    return `
      <section class="action-queue" aria-label="Action queue">
        <div class="action-queue-head">
          <div>
            <span class="panel-label">Action queue</span>
            <h2>${isProjectSection() ? "Project next moves" : "Tender next moves"}</h2>
            <p>${openCount} open records scanned for due dates, ownership gaps, core data, and status movement.</p>
          </div>
          <strong>${queueLabel}</strong>
        </div>
        ${
          items.length
            ? `<div class="action-card-grid">${items.map(renderActionCard).join("")}</div>`
            : `<div class="empty-state">No urgent action signals in the current view.</div>`
        }
      </section>
    `;
  }

  function buildActionQueue(records) {
    return records
      .map((record) => actionSignal(record))
      .filter(Boolean)
      .sort(
        (a, b) =>
          b.score - a.score ||
          a.dueSort - b.dueSort ||
          String(a.record.title || "").localeCompare(String(b.record.title || "")),
      );
  }

  function actionSignal(record) {
    if (isClosedRecord(record)) return null;
    const date = parseRecordDate(record.endDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const nextThirty = new Date(today);
    nextThirty.setDate(nextThirty.getDate() + 30);
    const dueSort = date ? date.getTime() : Number.MAX_SAFE_INTEGER;
    if (date && date < today) {
      return {
        record,
        dueSort,
        score: 100,
        tone: "red",
        label: "Overdue",
        nextMove: isProjectSection() ? "Escalate delivery date and confirm owner update." : "Confirm bid status and update the next action date.",
      };
    }
    if (date && date <= nextThirty) {
      return {
        record,
        dueSort,
        score: 90,
        tone: "amber",
        label: "Due watch",
        nextMove: isProjectSection() ? "Review next milestone before the date passes." : "Prepare the next tender follow-up before the due date.",
      };
    }
    if (!record.endDate) {
      return {
        record,
        dueSort,
        score: 78,
        tone: "blue",
        label: "No due date",
        nextMove: "Add a target date so the record can enter the operating rhythm.",
      };
    }
    if (!record.owner) {
      return {
        record,
        dueSort,
        score: 72,
        tone: "teal",
        label: "Missing owner",
        nextMove: "Assign an owner so the next movement has clear accountability.",
      };
    }
    if (!record.category) {
      return {
        record,
        dueSort,
        score: 64,
        tone: "green",
        label: "Missing category",
        nextMove: "Add a category so the record can route to the right operating view.",
      };
    }
    if (!record.reference) {
      return {
        record,
        dueSort,
        score: 58,
        tone: "blue",
        label: "Missing reference",
        nextMove: "Add the reference number so search, audit, and handover stay clean.",
      };
    }
    if (["Active", "Pending", "Submitted", "Ongoing"].includes(record.status)) {
      return {
        record,
        dueSort,
        score: 50,
        tone: "blue",
        label: "Status movement",
        nextMove: isProjectSection() ? "Confirm the next delivery update." : "Refresh the next tender action and current status.",
      };
    }
    return null;
  }

  function renderActionCard(item) {
    const record = item.record;
    const selected = record.id === state.selectedId ? "selected-card" : "";
    const dueLabel = formatDate(record.endDate) || "No due date";
    const ownerLabel = record.owner || "No owner";
    return `
      <button class="action-card action-${item.tone} ${selected}" type="button" data-action="select" data-id="${escapeHtml(record.id)}">
        <span class="action-card-top">
          <b>${escapeHtml(item.label)}</b>
          <i>${escapeHtml(record.status)}</i>
        </span>
        <strong>${escapeHtml(record.title || "Untitled record")}</strong>
        <em>${escapeHtml(record.reference || "No reference")} / ${escapeHtml(record.client || "No client")}</em>
        <span class="action-card-meta">
          <span>${escapeHtml(dueLabel)}</span>
          <span>${escapeHtml(ownerLabel)}</span>
        </span>
        <small>${escapeHtml(item.nextMove)}</small>
      </button>
    `;
  }

  function buildBoardLanes(records) {
    const configs = isProjectSection()
      ? [
          { key: "Ongoing", title: "Ongoing", hint: "Live delivery items", tone: "blue" },
          { key: "Due Watch", title: "Due watch", hint: "Past due and next 30 days", tone: "amber" },
          { key: "Completed", title: "Completed", hint: "Closed delivery records", tone: "green" },
          { key: "Closed", title: "Stopped / regret", hint: "Cancelled or regretted", tone: "red" },
        ]
      : [
          { key: "Active Pipeline", title: "Active pipeline", hint: "Bids that still need movement", tone: "teal" },
          { key: "Due Watch", title: "Due watch", hint: "Past due and next 30 days", tone: "amber" },
          { key: "Awarded", title: "Awarded", hint: "LOA and win records", tone: "green" },
          { key: "Closed", title: "Closed / regret", hint: "Completed, cancelled, or regret", tone: "red" },
        ];
    const lanes = configs.map((config) => ({ ...config, records: [] }));
    records.forEach((record) => {
      const target = boardLaneKey(record);
      const lane = lanes.find((item) => item.key === target) || lanes[0];
      lane.records.push(record);
    });
    return lanes;
  }

  function boardLaneKey(record) {
    if (isProjectSection()) {
      if (record.status === "Completed") return "Completed";
      if (["Cancelled", "Regret"].includes(record.status)) return "Closed";
      if (isDueWatchRecord(record)) return "Due Watch";
      return "Ongoing";
    }
    if (record.status === "Awarded") return "Awarded";
    if (["Completed", "Cancelled", "Regret"].includes(record.status)) return "Closed";
    if (isDueWatchRecord(record)) return "Due Watch";
    return "Active Pipeline";
  }

  function isDueWatchRecord(record) {
    if (isClosedRecord(record)) return false;
    const date = parseRecordDate(record.endDate);
    if (!date) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const nextThirty = new Date(today);
    nextThirty.setDate(nextThirty.getDate() + 30);
    return date <= nextThirty;
  }

  function renderTrackerBoard(lanes) {
    const total = lanes.reduce((sum, lane) => sum + lane.records.length, 0);
    if (!total) return `<div class="board-panel"><div class="empty-state">No matching records.</div></div>`;
    return `
      <div class="board-panel" aria-label="${escapeHtml(state.view)} board">
        ${lanes
          .map(
            (lane) => `
              <section class="board-lane lane-${lane.tone}">
                <div class="board-lane-head">
                  <span>
                    <strong>${escapeHtml(lane.title)}</strong>
                    <em>${escapeHtml(lane.hint)}</em>
                  </span>
                  <b>${lane.records.length}</b>
                </div>
                <div class="board-cards">
                  ${
                    lane.records.length
                      ? lane.records.map(renderBoardCard).join("")
                      : `<div class="board-empty">No records in this lane.</div>`
                  }
                </div>
              </section>
            `,
          )
          .join("")}
      </div>
    `;
  }

  function renderBoardCard(record) {
    const selected = record.id === state.selectedId ? "selected-card" : "";
    const dueLabel = formatDate(record.endDate) || "No due date";
    const ownerLabel = record.owner || "No owner";
    return `
      <button class="board-card ${selected}" type="button" data-action="select" data-id="${escapeHtml(record.id)}">
        <span class="board-card-top">
          <strong>${escapeHtml(record.reference || "No reference")}</strong>
          <span class="status-badge ${statusClass(record.status)}">${escapeHtml(record.status)}</span>
        </span>
        <span class="board-title">${escapeHtml(record.title || "Untitled record")}</span>
        <span class="board-client">${escapeHtml(record.client || "No client")}</span>
        <span class="board-card-grid">
          <span><em>Due / last</em><strong>${escapeHtml(dueLabel)}</strong></span>
          <span><em>Owner</em><strong>${escapeHtml(ownerLabel)}</strong></span>
        </span>
        <span class="board-tags">
          <span>${escapeHtml([record.type, record.category].filter(Boolean).join(" / ") || "No category")}</span>
          <span>${escapeHtml(record.department || record.status || "No department")}</span>
        </span>
      </button>
    `;
  }

  function buildTimelineBuckets(records) {
    const configs = [
      { key: "past", title: "Past due", hint: "Dates already passed", tone: "red" },
      { key: "thisMonth", title: "This month", hint: "Current month dates", tone: "teal" },
      { key: "next30", title: "Next 30", hint: "Near-term actions", tone: "amber" },
      { key: "nextQuarter", title: "Next quarter", hint: "Upcoming 90-day work", tone: "blue" },
      { key: "later", title: "Later", hint: "Longer-range schedule", tone: "green" },
      { key: "noDate", title: "No date", hint: "Needs a target date", tone: "neutral" },
    ];
    const buckets = configs.map((config) => ({ ...config, records: [] }));
    records.forEach((record) => {
      const key = timelineBucketKey(record);
      const bucket = buckets.find((item) => item.key === key) || buckets[buckets.length - 1];
      bucket.records.push(record);
    });
    buckets.forEach((bucket) => {
      bucket.records.sort((a, b) => {
        const aDate = parseRecordDate(a.endDate)?.getTime() ?? Number.MAX_SAFE_INTEGER;
        const bDate = parseRecordDate(b.endDate)?.getTime() ?? Number.MAX_SAFE_INTEGER;
        return aDate - bDate || String(a.title || "").localeCompare(String(b.title || ""));
      });
    });
    return buckets;
  }

  function timelineBucketKey(record) {
    const date = parseRecordDate(record.endDate);
    if (!date) return "noDate";
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    const nextMonthStart = new Date(today.getFullYear(), today.getMonth() + 1, 1);
    const nextThirty = new Date(today);
    nextThirty.setDate(nextThirty.getDate() + 30);
    const nextQuarter = new Date(today);
    nextQuarter.setDate(nextQuarter.getDate() + 90);
    if (date < today) return "past";
    if (date >= thisMonthStart && date < nextMonthStart) return "thisMonth";
    if (date <= nextThirty) return "next30";
    if (date <= nextQuarter) return "nextQuarter";
    return "later";
  }

  function renderTrackerTimeline(buckets) {
    const total = buckets.reduce((sum, bucket) => sum + bucket.records.length, 0);
    if (!total) return `<div class="timeline-panel"><div class="empty-state">No matching records.</div></div>`;
    return `
      <div class="timeline-panel" aria-label="${escapeHtml(state.view)} timeline">
        ${buckets
          .map(
            (bucket) => `
              <section class="timeline-lane lane-${bucket.tone}">
                <div class="timeline-lane-head">
                  <span>
                    <strong>${escapeHtml(bucket.title)}</strong>
                    <em>${escapeHtml(bucket.hint)}</em>
                  </span>
                  <b>${bucket.records.length}</b>
                </div>
                <div class="timeline-cards">
                  ${
                    bucket.records.length
                      ? bucket.records.slice(0, 10).map(renderTimelineCard).join("")
                      : `<div class="timeline-empty">No dated records here.</div>`
                  }
                  ${bucket.records.length > 10 ? `<div class="timeline-more">${bucket.records.length - 10} more in this lane</div>` : ""}
                </div>
              </section>
            `,
          )
          .join("")}
      </div>
    `;
  }

  function renderTimelineCard(record) {
    const selected = record.id === state.selectedId ? "selected-card" : "";
    const date = parseRecordDate(record.endDate);
    const day = date ? date.toLocaleDateString("en-GB", { day: "2-digit" }) : "--";
    const month = date ? date.toLocaleDateString("en-GB", { month: "short", year: "2-digit" }) : "No date";
    const ownerLabel = record.owner || "No owner";
    return `
      <button class="timeline-card ${selected}" type="button" data-action="select" data-id="${escapeHtml(record.id)}">
        <span class="timeline-date">
          <strong>${escapeHtml(day)}</strong>
          <em>${escapeHtml(month)}</em>
        </span>
        <span class="timeline-card-body">
          <span class="timeline-card-top">
            <b>${escapeHtml(record.reference || "No reference")}</b>
            <i class="status-badge ${statusClass(record.status)}">${escapeHtml(record.status)}</i>
          </span>
          <strong>${escapeHtml(record.title || "Untitled record")}</strong>
          <em>${escapeHtml(record.client || "No client")}</em>
          <small>${escapeHtml([record.type, record.category, ownerLabel].filter(Boolean).join(" / "))}</small>
        </span>
      </button>
    `;
  }

  function quickSearchResults() {
    const query = normalize(state.quickSearch);
    const records = isTenderSection() || isProjectSection() ? sectionRecords() : companyRecords();
    const source = query
      ? records.filter((record) =>
          [
            record.reference,
            record.client,
            record.clientGroup,
            record.title,
            record.category,
            record.status,
            record.owner,
            record.latestActivity,
          ]
            .map(normalize)
            .join(" ")
            .includes(query),
        )
      : records.filter((record) => !isClosedRecord(record));
    return source.slice(0, 8);
  }

  function quickSearchScopeLabel() {
    if (isProjectSection()) return "projects";
    if (isTenderSection()) return "tenders";
    return "all records";
  }

  function renderFloatingTools() {
    return `
      <div class="floating-tools" aria-label="Quick tools">
        <button class="float-btn search-float" type="button" data-action="open-quick-search" aria-label="Open quick search" title="Search records">
          <span class="search-icon" aria-hidden="true"></span>
        </button>
        <button class="float-btn arrow-float" type="button" data-action="scroll-page" aria-label="Scroll page" title="Scroll">
          <span class="arrow-icon" aria-hidden="true"></span>
        </button>
      </div>
    `;
  }

  function renderQuickSearchOverlay() {
    if (!state.quickSearchOpen) return "";
    const results = quickSearchResults();
    return `
      <div class="quick-search-backdrop">
        <section class="quick-search-panel" role="dialog" aria-modal="true" aria-labelledby="quickSearchTitle">
          <div class="quick-search-head">
            <div>
              <span class="panel-label">Quick search</span>
              <h2 id="quickSearchTitle">Find ${escapeHtml(quickSearchScopeLabel())} by reference, client, or owner.</h2>
            </div>
            <button class="mini-btn" type="button" data-action="close-quick-search">Close</button>
          </div>
          <input class="quick-search-input" type="search" placeholder="Search reference, client, title, category, status..." value="${escapeHtml(state.quickSearch)}" data-quick-search-input autocomplete="off">
          <div class="quick-search-results">
            ${
              results.length
                ? results.map(renderQuickSearchResult).join("")
                : `<div class="empty-state compact">No matching records.</div>`
            }
          </div>
        </section>
      </div>
    `;
  }

  function renderQuickSearchResult(record) {
    return `
      <button class="quick-result" type="button" data-action="open-search-result" data-id="${escapeHtml(record.id)}">
        <span>
          <strong>${escapeHtml(record.reference || "No reference")}</strong>
          <em>${escapeHtml(record.client || "No client")}</em>
        </span>
        <span>
          <strong>${escapeHtml(record.title || "Untitled record")}</strong>
          <em>${escapeHtml([record.type, record.status, record.owner].filter(Boolean).join(" / "))}</em>
        </span>
        <span class="status-badge ${statusClass(record.status)}">${escapeHtml(record.status)}</span>
      </button>
    `;
  }

  function focusQuickSearch() {
    if (!state.quickSearchOpen) return;
    requestAnimationFrame(() => {
      const input = document.querySelector("[data-quick-search-input]");
      input?.focus();
      input?.select();
    });
  }

  function renderDateCell(value) {
    return `<span class="cell-plain">${escapeHtml(formatDate(value) || "-")}</span>`;
  }

  function editableCell(record, field) {
    const editable = canEdit() ? "true" : "false";
    const value = record[field] ?? "";
    return `
      <div class="cell-edit" contenteditable="${editable}" data-id="${escapeHtml(record.id)}" data-field="${field}" spellcheck="false">
        ${escapeHtml(value)}
      </div>
    `;
  }

  function renderRecordSelect(record, field, options, editable, status = false) {
    if (!editable) {
      if (status) {
        return `<span class="status-badge ${statusClass(record[field])}">${escapeHtml(record[field])}</span>`;
      }
      return `<span class="cell-edit">${escapeHtml(record[field])}</span>`;
    }
    return `
      <select class="table-select ${status ? statusClass(record[field]) : ""}" data-id="${escapeHtml(record.id)}" data-field="${field}">
        ${Array.from(new Set([record[field], ...options]))
          .filter(Boolean)
          .map(
            (option) =>
              `<option value="${escapeHtml(option)}" ${option === record[field] ? "selected" : ""}>${escapeHtml(option)}</option>`,
          )
          .join("")}
      </select>
    `;
  }

  function buildRecordBrief(record) {
    const signal = actionSignal(record);
    const missing = [
      ["Reference", record.reference],
      ["Client", record.client],
      ["Title", record.title],
      ["Owner", record.owner],
      ["Category", record.category],
      ["Due date", record.endDate],
    ].filter(([, value]) => !value);
    const completed = 6 - missing.length;
    const readiness = Math.round((completed / 6) * 100);
    const dueDays = recordDueDays(record);
    const dueLabel =
      dueDays === null
        ? "No due date"
        : dueDays < 0
          ? `${Math.abs(dueDays)} days past due`
          : dueDays === 0
          ? "Due today"
            : `${dueDays} days left`;
    const reasons = [];
    let score = 48 + completed * 7;
    if (isClosedRecord(record)) {
      score += 10;
      reasons.push("Closed");
    }
    if (dueDays === null) {
      score -= 12;
      reasons.push("No due date");
    } else if (dueDays < 0) {
      score -= 22;
      reasons.push("Past due");
    } else if (dueDays <= 14) {
      score += 4;
      reasons.push("Near date");
    }
    if (["Submitted", "Awarded", "Completed"].includes(record.status)) {
      score += 6;
      reasons.push("Advanced status");
    }
    if (!record.owner) reasons.push("Owner gap");
    if (!record.category) reasons.push("Category gap");
    score = Math.max(1, Math.min(100, Math.round(score)));
    const healthLabel = isClosedRecord(record)
      ? "Closed record"
      : dueDays !== null && dueDays < 0
        ? "Overdue watch"
        : dueDays === null
          ? "Needs date"
          : !record.owner
            ? "Needs owner"
            : !record.category
              ? "Needs category"
              : score >= 72
                ? "Healthy"
                : score >= 52
                  ? "Needs watch"
                  : "Needs cleanup";
    const displayTone = isClosedRecord(record)
      ? "green"
      : dueDays !== null && dueDays < 0
        ? "red"
        : dueDays === null || !record.owner || !record.category
          ? "amber"
          : "green";
    const nextMove = signal?.nextMove || closedRecordMove(record) || "Keep monitoring this record and refresh the next date, owner, or status when it changes.";
    const managementLine = `${record.reference || "This record"} for ${record.client || "the client"} is ${record.status || "unassigned"} with ${dueLabel.toLowerCase()}. Next move: ${nextMove}`;
    return {
      score,
      tone: displayTone,
      reasons,
      healthLabel,
      nextMove,
      managementLine,
      missing,
      readiness,
      dueLabel,
      ownerLabel: record.owner || "No owner",
      categoryLabel: record.category || "No category",
    };
  }

  function closedRecordMove(record) {
    if (record.status === "Awarded") return "Prepare the handover path from pursuit to contract or delivery ownership.";
    if (record.status === "Completed") return "Archive completion notes, final status, and any lessons for future similar work.";
    if (["Cancelled", "Regret"].includes(record.status)) return "Capture the loss or stop reason so future pursuit decisions improve.";
    return "";
  }

  function renderSmartBrief(record) {
    const brief = buildRecordBrief(record);
    const missingLabel = brief.missing.length
      ? brief.missing.slice(0, 4).map(([label]) => `<span>${escapeHtml(label)}</span>`).join("")
      : "<span>Core data complete</span>";
    const reasons = brief.reasons.length
      ? brief.reasons.map((reason) => `<span>${escapeHtml(reason)}</span>`).join("")
      : "<span>No major flags</span>";
    return `
      <section class="smart-brief brief-${brief.tone}">
        <div class="brief-head">
          <div>
            <span class="panel-label">Smart brief</span>
            <h3>${escapeHtml(brief.healthLabel)}</h3>
          </div>
          <strong>${brief.score}</strong>
        </div>
        <div class="brief-meter" aria-hidden="true"><span style="width: ${brief.score}%"></span></div>
        <div class="brief-stat-grid">
          <div><span>Readiness</span><strong>${brief.readiness}%</strong></div>
          <div><span>Due signal</span><strong>${escapeHtml(brief.dueLabel)}</strong></div>
          <div><span>Owner</span><strong>${escapeHtml(brief.ownerLabel)}</strong></div>
          <div><span>Category</span><strong>${escapeHtml(brief.categoryLabel)}</strong></div>
        </div>
        <div class="brief-next">
          <span>Next move</span>
          <strong>${escapeHtml(brief.nextMove)}</strong>
        </div>
        <div class="brief-chip-row">
          ${reasons}
        </div>
        <div class="brief-chip-row brief-missing">
          ${missingLabel}
        </div>
        <div class="management-line">
          <span>Management line</span>
          <p>${escapeHtml(brief.managementLine)}</p>
        </div>
      </section>
    `;
  }

  function recordHistoryTime(record) {
    return (
      parseRecordDate(record.endDate)?.getTime() ||
      parseRecordDate(record.startDate)?.getTime() ||
      0
    );
  }

  function buildClientMemory(record) {
    const accountLabel = String(record.clientGroup || record.client || "Unassigned client").trim();
    const unitLabel = String(record.client || accountLabel).trim();
    const accountKey = normalize(accountLabel);
    const unitKey = normalize(unitLabel);
    const records = companyRecords().filter((item) => {
      const itemAccountKey = normalize(item.clientGroup || item.client);
      const itemUnitKey = normalize(item.client);
      return accountKey ? itemAccountKey === accountKey : itemUnitKey === unitKey;
    });
    const fallbackRecords = records.length
      ? records
      : companyRecords().filter((item) => normalize(item.client) === unitKey);
    const memoryRecords = fallbackRecords.length ? fallbackRecords : [record];
    const sorted = [...memoryRecords].sort((a, b) => recordHistoryTime(b) - recordHistoryTime(a));
    const openRecords = memoryRecords.filter((item) => !isClosedRecord(item));
    const wonRecords = memoryRecords.filter((item) => ["Awarded", "Completed"].includes(item.status));
    const overdueRecords = openRecords.filter((item) => {
      const days = recordDueDays(item);
      return days !== null && days < 0;
    });
    const related = sorted.filter((item) => item.id !== record.id).slice(0, 5);
    const unitRecords = memoryRecords.filter((item) => normalize(item.client) === unitKey);
    const tenderCount = memoryRecords.filter((item) => item.type === "Tender" || item.type === "EOI").length;
    const projectCount = memoryRecords.filter((item) => item.type === "Project").length;
    const pulse =
      memoryRecords.length >= 18
        ? "Strategic account"
        : openRecords.length >= 5
          ? "Active relationship"
          : wonRecords.length >= 3
            ? "Proven buyer"
            : related.length
              ? "Growing history"
              : "New relationship";
    const latest = sorted[0];
    const note = `${accountLabel} has ${memoryRecords.length} workspace record${memoryRecords.length === 1 ? "" : "s"}: ${tenderCount} tender-side and ${projectCount} project-side, with ${openRecords.length} still open.`;
    return {
      accountLabel,
      unitLabel,
      pulse,
      note,
      latest,
      records: memoryRecords,
      related,
      unitCount: unitRecords.length,
      openCount: openRecords.length,
      wonCount: wonRecords.length,
      overdueCount: overdueRecords.length,
      totalValue: sumAmounts(memoryRecords),
    };
  }

  function renderClientMemoryRow(record) {
    const meta = [record.reference, record.type, record.status].filter(Boolean).join(" / ");
    const dateLabel = formatDate(record.endDate) || "No date";
    return `
      <button class="client-memory-row" type="button" data-action="open-related-record" data-id="${escapeHtml(record.id)}">
        <span>
          <strong>${escapeHtml(record.title || "Untitled record")}</strong>
          <em>${escapeHtml(meta || "No record metadata")}</em>
        </span>
        <b>${escapeHtml(dateLabel)}</b>
      </button>
    `;
  }

  function renderClientMemory(record) {
    const memory = buildClientMemory(record);
    const latestLabel = memory.latest
      ? `${memory.latest.type} / ${memory.latest.status} / ${formatDate(memory.latest.endDate) || "No date"}`
      : "No activity yet";
    const overdueText = memory.overdueCount ? `${memory.overdueCount} overdue` : `${memory.wonCount} won or done`;
    return `
      <section class="client-memory">
        <div class="client-memory-head">
          <div>
            <span class="panel-label">Client memory</span>
            <h3>${escapeHtml(memory.accountLabel)}</h3>
            <p>${escapeHtml(memory.unitLabel === memory.accountLabel ? memory.pulse : `${memory.pulse} / ${memory.unitLabel}`)}</p>
          </div>
          <strong>${memory.records.length}</strong>
        </div>
        <div class="client-memory-stats">
          <div><span>Open</span><strong>${memory.openCount}</strong></div>
          <div><span>Same unit</span><strong>${memory.unitCount}</strong></div>
          <div><span>Signal</span><strong>${escapeHtml(overdueText)}</strong></div>
          <div><span>Due watch</span><strong>${memory.overdueCount}</strong></div>
        </div>
        <div class="client-pulse">
          <span>Latest touch</span>
          <strong>${escapeHtml(latestLabel)}</strong>
          <p>${escapeHtml(memory.note)}</p>
        </div>
        <div class="client-memory-list">
          <div class="client-memory-list-head">
            <span>Related records</span>
            <strong>${Math.max(0, memory.records.length - 1)} linked</strong>
          </div>
          ${
            memory.related.length
              ? memory.related.map(renderClientMemoryRow).join("")
              : `<div class="readonly-note">No other records for this client yet.</div>`
          }
        </div>
      </section>
    `;
  }

  function renderDetail(record) {
    if (!record) {
      return `
        <aside class="detail-panel">
          <div class="empty-state">Select a row to view details.</div>
        </aside>
      `;
    }
    const rounds = record.rounds || [];
    return `
      <aside class="detail-panel">
        <div class="detail-head">
          <h2>${escapeHtml(record.title || "Untitled record")}</h2>
          <p>${escapeHtml(record.reference || "No reference")} / ${escapeHtml(record.client || "No client")}</p>
        </div>
        <div class="detail-body">
          ${renderClientMemory(record)}
          ${renderSmartBrief(record)}

          <div class="detail-grid">
            <div class="detail-item"><span>Status</span><strong><span class="status-badge ${statusClass(record.status)}">${escapeHtml(record.status)}</span></strong></div>
            <div class="detail-item"><span>Category</span><strong>${escapeHtml(record.category)}</strong></div>
            <div class="detail-item"><span>Start date</span><strong>${escapeHtml(formatDate(record.startDate))}</strong></div>
            <div class="detail-item"><span>End or last date</span><strong>${escapeHtml(formatDate(record.endDate))}</strong></div>
            <div class="detail-item"><span>Owner</span><strong>${escapeHtml(record.owner || "-")}</strong></div>
            <div class="detail-item"><span>Source</span><strong>${escapeHtml(!record.sourceSheet || record.sourceSheet === "Manual entry" ? "Manual entry" : "Imported")}</strong></div>
          </div>

          <div class="rounds">
            <h3>Activity trail</h3>
            ${
              rounds.length
                ? `<div class="round-list">${rounds.map(renderRound).join("")}</div>`
                : `<div class="readonly-note">No activity trail recorded for this item.</div>`
            }
          </div>

          <div class="notes">
            <h3>Notes</h3>
            <textarea data-id="${escapeHtml(record.id)}" data-field="notes" ${canEdit() ? "" : "disabled"}>${escapeHtml(record.notes || "")}</textarea>
          </div>
        </div>
      </aside>
    `;
  }

  function renderRound(round) {
    const label = round.round ? `Update ${round.round}` : "Update";
    return `
      <div class="round-item">
        <strong>${escapeHtml(label)} / ${escapeHtml(formatDate(round.receivedDate))}</strong>
        <span>${escapeHtml(round.response || "No response captured")}</span>
      </div>
    `;
  }

  function renderTeamBilling() {
    const company = state.data.company;
    const users = state.data.users.filter((user) => user.companyId === state.user.companyId);
    const bill = users.length * company.pricePerUser;
    return `
      <section class="team-layout">
        <div class="team-panel">
          <div class="team-head">
            <h2>${escapeHtml(company.name)}</h2>
            <p>Company workspace, user roles, and monthly seat billing.</p>
          </div>
          <div class="team-body">
            <div class="billing-summary">
              <div class="billing-box"><span>Active users</span><strong>${users.length}</strong></div>
              <div class="billing-box"><span>Price per user</span><strong>${formatBilling(company.pricePerUser, company)}</strong></div>
              <div class="billing-box"><span>Monthly total</span><strong>${formatBilling(bill, company)}</strong></div>
            </div>
            <table class="team-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                ${users.map(renderUserRow).join("")}
              </tbody>
            </table>
          </div>
        </div>
        ${
          canAdmin()
            ? renderUserForm()
            : `<div class="readonly-note">Only admins can add users or change billing seats.</div>`
        }
      </section>
    `;
  }

  function renderUserRow(user) {
    const access = new Set(normalizeUserAccess(user));
    const locked = !canAdmin() || user.role === "Admin";
    return `
      <tr>
        <td>
          <strong>${escapeHtml(user.name)}</strong>
          <span>${escapeHtml(user.email)}</span>
        </td>
        <td>
          <select class="table-select" data-user-id="${escapeHtml(user.id)}" data-user-field="role" ${canAdmin() ? "" : "disabled"}>
            ${["Admin", "Editor", "Viewer"]
              .map(
                (role) =>
                  `<option value="${role}" ${role === user.role ? "selected" : ""}>${role}</option>`,
              )
              .join("")}
          </select>
        </td>
        <td>
          ${renderAccessTemplateButtons(user, locked)}
          <div class="access-checks">
            ${GRANTABLE_ACCESS_SECTIONS.map(
              (section) => `
                <label>
                  <input type="checkbox" data-user-id="${escapeHtml(user.id)}" data-user-access="${escapeHtml(section.key)}" ${access.has(section.key) ? "checked" : ""} ${locked ? "disabled" : ""}>
                  <span>${escapeHtml(section.label)}</span>
                </label>
              `,
            ).join("")}
          </div>
        </td>
        <td>
          <div class="user-action-stack">
            <button class="mini-btn" type="button" data-action="preview-user" data-user-id="${escapeHtml(user.id)}" ${canAdmin() && user.id !== state.user.id && user.role !== "Admin" ? "" : "disabled"}>
              Preview
            </button>
            <button class="mini-btn danger" type="button" data-action="delete-user" data-user-id="${escapeHtml(user.id)}" ${canAdmin() && user.id !== state.user.id ? "" : "disabled"}>
              Remove
            </button>
          </div>
        </td>
      </tr>
    `;
  }

  function renderAccessTemplateButtons(user, locked) {
    const access = normalizeUserAccess(user);
    const currentTemplate = ACCESS_BLUEPRINTS.find((blueprint) =>
      blueprint.access.every((key) => access.includes(key)) &&
      access.every((key) => blueprint.access.includes(key)),
    );
    return `
      <div class="access-template-row" aria-label="Access templates for ${escapeHtml(user.name)}">
        <span>${escapeHtml(currentTemplate ? `${currentTemplate.label} template` : "Custom access")}</span>
        <div>
          ${ACCESS_BLUEPRINTS.map((blueprint) => `
            <button class="mini-btn access-template-btn ${currentTemplate?.key === blueprint.key ? "active" : ""}" type="button" data-action="apply-access-template" data-user-id="${escapeHtml(user.id)}" data-template="${escapeHtml(blueprint.key)}" ${locked ? "disabled" : ""}>
              ${escapeHtml(blueprint.label)}
            </button>
          `).join("")}
        </div>
      </div>
    `;
  }

  function renderUserForm() {
    return `
      <form class="team-form" id="teamForm">
        <h3>Add user and section access</h3>
        <div class="field">
          <label for="newName">Name</label>
          <input id="newName" name="name" required>
        </div>
        <div class="field">
          <label for="newEmail">Email</label>
          <input id="newEmail" name="email" type="email" required>
        </div>
        <div class="field">
          <label for="newRole">Role</label>
          <select id="newRole" name="role">
            <option>Editor</option>
            <option>Viewer</option>
            <option>Admin</option>
          </select>
        </div>
        <div class="field">
          <label for="newPassword">Password</label>
          <input id="newPassword" name="password" value="demo123" required>
        </div>
        <div class="field access-field">
          <span>Section access</span>
          <div class="access-checks form-access-checks">
            ${GRANTABLE_ACCESS_SECTIONS.map(
              (section) => `
                <label>
                  <input type="checkbox" name="access" value="${escapeHtml(section.key)}" ${DEFAULT_OPERATION_ACCESS_KEYS.includes(section.key) ? "checked" : ""}>
                  <span>${escapeHtml(section.label)}</span>
                </label>
              `,
            ).join("")}
          </div>
        </div>
        <button class="primary-btn" type="submit">Add user</button>
      </form>
    `;
  }

  function submitIntakeForm(form) {
    if (!canEdit()) return;
    const formData = new FormData(form);
    const request = {
      id: `REQ-${Date.now()}`,
      companyId: state.user.companyId,
      createdAt: new Date().toISOString(),
      createdBy: state.user.name,
      status: "Pending",
      type: String(formData.get("type") || "Tender"),
      reference: String(formData.get("reference") || "").trim(),
      client: String(formData.get("client") || "").trim(),
      title: String(formData.get("title") || "").trim(),
      category: String(formData.get("category") || "").trim(),
      endDate: String(formData.get("endDate") || ""),
      valueText: String(formData.get("valueText") || "").trim(),
      owner: String(formData.get("owner") || state.user.name).trim(),
      channel: String(formData.get("channel") || "Manual request"),
      notes: String(formData.get("notes") || "").trim(),
      convertedRecordId: "",
      approvedBy: "",
      approvedAt: "",
    };
    if (!Array.isArray(state.data.intakeRequests)) state.data.intakeRequests = [];
    state.data.intakeRequests.unshift(request);
    writeAudit("Intake submitted", request.reference || request.title || "New request", `${request.type} request captured from ${request.channel}.`, "", "teal");
    persistData();
    form.reset();
    render();
  }

  function convertIntakeRequest(id) {
    if (!canEdit()) return;
    const request = intakeRequests().find((item) => item.id === id);
    if (!request || request.status === "Approved") return;
    const missing = intakeMissingFields(request);
    if (missing.length) {
      window.alert(`Please complete missing fields first: ${missing.join(", ")}`);
      return;
    }
    const type = TYPE_OPTIONS.includes(request.type) ? request.type : "Tender";
    const recordIdPrefix = type === "Project" ? "PRJ" : type === "EOI" ? "EOI" : "TDR";
    const record = {
      id: `${recordIdPrefix}-INT-${Date.now().toString().slice(-7)}`,
      companyId: state.user.companyId,
      type,
      category: request.category,
      department: request.category,
      reference: request.reference,
      clientGroup: request.client,
      client: request.client,
      title: request.title,
      status: type === "Project" ? "Ongoing" : "Active",
      startDate: new Date().toISOString().slice(0, 10),
      endDate: request.endDate,
      valueText: request.valueText,
      valueAmount: parseAmount(request.valueText),
      currency: state.data.company.currency || "AED",
      owner: request.owner || state.user.name,
      latestActivity: `Converted from Intake Desk / ${request.channel}`,
      notes: request.notes || "",
      agreementNo: type === "Project" ? request.reference : "",
      loaReceived: "",
      agreementReceived: "",
      sourceWorkbook: "Intake Desk",
      sourceSheet: request.channel || "Manual request",
      rounds: [],
    };
    state.data.records.unshift(record);
    const stored = state.data.intakeRequests.find((item) => item.id === id);
    if (stored) {
      stored.status = "Approved";
      stored.convertedRecordId = record.id;
      stored.approvedBy = state.user.name;
      stored.approvedAt = new Date().toISOString();
    }
    state.selectedId = record.id;
    writeAudit("Intake converted", request.reference || request.title || "Request", `${type} request converted into live workspace record.`, record.id, "green");
    persistData();
    render();
  }

  function reworkIntakeRequest(id) {
    if (!canEdit()) return;
    const request = state.data.intakeRequests.find((item) => item.id === id && item.companyId === state.user.companyId);
    if (!request || request.status === "Approved") return;
    request.status = request.status === "Rework" ? "Pending" : "Rework";
    writeAudit("Intake rework", request.reference || request.title || "Request", `Request moved to ${request.status}.`, "", "amber");
    persistData();
    render();
  }

  function deleteIntakeRequest(id) {
    if (!canEdit()) return;
    const request = state.data.intakeRequests.find((item) => item.id === id && item.companyId === state.user.companyId);
    if (!request) return;
    const confirmed = window.confirm(`Delete intake request ${request.reference || request.title || id}?`);
    if (!confirmed) return;
    state.data.intakeRequests = state.data.intakeRequests.filter((item) => item.id !== id);
    writeAudit("Intake deleted", request.reference || request.title || "Request", "Intake request removed from queue.", "", "red");
    persistData();
    render();
  }

  function updateRecord(id, field, value) {
    const record = state.data.records.find((item) => item.id === id);
    if (!record || !canEdit()) return;
    const previous = record[field];
    record[field] = value;
    if (field === "valueText") record.valueAmount = parseAmount(value);
    const auditFields = new Set(["type", "reference", "client", "title", "category", "status", "startDate", "endDate", "valueText", "owner", "agreementNo", "sourceSheet"]);
    if (auditFields.has(field) && String(previous ?? "") !== String(value ?? "")) {
      writeAudit(
        "Record updated",
        record.reference || record.title || "Record",
        `${auditFieldLabel(field)} changed from ${shortAuditValue(previous)} to ${shortAuditValue(value)}`,
        id,
        field === "status" ? "amber" : "teal",
      );
    }
    persistData();
  }

  function parseAmount(value) {
    const matches = String(value || "").match(/[-+]?\d[\d,\s]*(?:\.\d+)?/g);
    if (!matches) return null;
    const values = matches
      .map((item) => Number(item.replaceAll(",", "").replaceAll(" ", "")))
      .filter((item) => Number.isFinite(item));
    return values.length ? Math.max(...values) : null;
  }

  function addRecord() {
    if (!canEdit()) return;
    const preferredType =
      state.filters.type !== "All"
        ? state.filters.type
        : state.view === "Projects"
          ? "Project"
          : state.view === "Tenders"
            ? "Tender"
            : "Tender";
    const prefix = preferredType === "Project" ? "PRJ" : preferredType === "EOI" ? "EOI" : "TDR";
    const id = `${prefix}-NEW-${Date.now().toString().slice(-7)}`;
    const record = {
      id,
      companyId: state.user.companyId,
      type: preferredType,
      category: preferredType === "Project" ? "Software" : "Digital & Telecom",
      department: preferredType === "Project" ? "Software" : "Digital & Telecom",
      reference: "",
      clientGroup: "",
      client: "",
      title: "",
      status: preferredType === "Project" ? "Ongoing" : "Active",
      startDate: "",
      endDate: "",
      valueText: "",
      valueAmount: null,
      currency: "AED",
      owner: state.user.name,
      latestActivity: "",
      notes: "",
      agreementNo: "",
      loaReceived: "",
      agreementReceived: "",
      sourceWorkbook: "Manual entry",
      sourceSheet: "Manual entry",
      rounds: [],
    };
    state.data.records.unshift(record);
    state.selectedId = id;
    writeAudit("Record created", id, `${preferredType} row created manually.`, id, "green");
    persistData();
    render();
  }

  function deleteRecord(id) {
    if (!canEdit()) return;
    const record = state.data.records.find((item) => item.id === id);
    if (!record) return;
    const confirmed = window.confirm(`Delete ${record.reference || record.title || "this record"}?`);
    if (!confirmed) return;
    state.data.records = state.data.records.filter((item) => item.id !== id);
    if (state.selectedId === id) state.selectedId = null;
    writeAudit("Record deleted", record.reference || record.title || "Record", `${record.type || "Record"} removed from workspace.`, "", "red");
    persistData();
    render();
  }

  function exportCsv() {
    const rows = filterRecords();
    const columns = isOperationalTrackerSection()
      ? [
          "type",
          "reference",
          "client",
          "title",
          "category",
          "status",
          "startDate",
          "endDate",
          "owner",
          "notes",
        ]
      : [
          "type",
          "reference",
          "client",
          "title",
          "category",
          "status",
          "startDate",
          "endDate",
          "valueText",
          "owner",
          "latestActivity",
          "sourceSheet",
        ];
    const csvRows = [
      columns.join(","),
      ...rows.map((record) =>
        columns
          .map((column) => `"${String(record[column] ?? "").replaceAll('"', '""')}"`)
          .join(","),
      ),
    ];
    const blob = new Blob([csvRows.join("\n")], { type: "text/csv;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "pursuitdesk-export.csv";
    link.click();
    URL.revokeObjectURL(link.href);
  }

  function exportInsightsPack() {
    const model = insightModel(insightRecords());
    const lines = [
      `${BRAND_NAME} Board Pack`,
      `Company: ${state.data.company.name}`,
      `Lens: ${model.lens}`,
      `Pipeline score: ${model.healthScore}`,
      `Captured value: ${formatCompactMoney(model.totalValue)}`,
      `Open value: ${formatCompactMoney(model.openValue)}`,
      `Closed value: ${formatCompactMoney(model.awardedValue)}`,
      "",
      "Go / No-Go Queue",
      ...model.decisionRows.map(
        ({ record, score, recommendation, reasons }) =>
          `- ${record.client || record.reference || "Open pursuit"} | ${record.status} | ${score}/100 | ${recommendation} | ${reasons.join(", ") || "Clean record"}`,
      ),
      "",
      "Risk Map",
      ...model.riskMatrix.map((row) => `- ${row.label}: ${row.count} (${row.note})`),
      "",
      "Largest Open Opportunities",
      ...model.highValueOpen.map(
        (record) =>
          `- ${record.client || record.reference || "Open opportunity"} | ${formatCompactMoney(record.valueAmount)} | ${record.status} | ${record.title || ""}`,
      ),
    ];
    const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "pursuitdesk-board-pack.txt";
    link.click();
    URL.revokeObjectURL(link.href);
  }

  function addUser(form) {
    if (!canAdmin()) return;
    const formData = new FormData(form);
    const email = String(formData.get("email") || "").trim().toLowerCase();
    if (state.data.users.some((user) => user.email.toLowerCase() === email)) {
      window.alert("A user with this email already exists.");
      return;
    }
    const role = String(formData.get("role") || "Editor");
    const requestedAccess = formData.getAll("access").map(String);
    const user = {
      id: `u-${Date.now()}`,
      companyId: state.user.companyId,
      name: String(formData.get("name") || "").trim(),
      email,
      role,
      password: String(formData.get("password") || "demo123"),
      access: role === "Admin" ? defaultAccessForRole("Admin") : requestedAccess,
    };
    state.data.users.push({ ...user, access: normalizeUserAccess(user) });
    writeAudit("User added", user.name || user.email, `${role} created with ${normalizeUserAccess(user).length} enabled sections.`, "", "blue");
    persistData();
    render();
  }

  function deleteUser(id) {
    if (!canAdmin() || id === state.user.id) return;
    const user = state.data.users.find((item) => item.id === id);
    state.data.users = state.data.users.filter((user) => user.id !== id);
    writeAudit("User removed", user?.name || "User", "Workspace user removed by admin.", "", "red");
    persistData();
    render();
  }

  function updateUser(id, field, value) {
    if (!canAdmin()) return;
    const user = state.data.users.find((item) => item.id === id);
    if (!user) return;
    const previous = user[field];
    user[field] = value;
    if (field === "role") user.access = defaultAccessForRole(value);
    if (user.id === state.user.id) {
      state.user[field] = value;
      state.user.access = normalizeUserAccess(user);
      persistSession(state.user);
    }
    if (String(previous ?? "") !== String(value ?? "")) {
      writeAudit("User updated", user.name || user.email, `${auditFieldLabel(field)} changed from ${shortAuditValue(previous)} to ${shortAuditValue(value)}.`, "", "amber");
    }
    persistData();
    render();
  }

  function updateUserAccess(id, key, checked) {
    if (!canAdmin()) return;
    const user = state.data.users.find((item) => item.id === id);
    if (!user || user.role === "Admin") return;
    const access = new Set(normalizeUserAccess(user));
    if (checked) access.add(key);
    else access.delete(key);
    user.access = Array.from(access).filter((item) => GRANTABLE_ACCESS_SECTIONS.some((section) => section.key === item));
    if (!user.access.length) {
      window.alert("Please keep at least one section enabled for each user.");
      user.access = normalizeUserAccess(user);
    }
    writeAudit("Access changed", user.name || user.email, `${key} ${checked ? "enabled" : "disabled"} for ${user.role}.`, "", "amber");
    persistData();
    render();
  }

  function applyAccessTemplate(id, templateKey) {
    if (!canAdmin()) return;
    const user = state.data.users.find((item) => item.id === id);
    if (!user || user.role === "Admin") return;
    const template = accessBlueprintByKey(templateKey);
    const previous = accessLabelForKeys(normalizeUserAccess(user));
    user.access = [...template.access];
    const next = accessLabelForKeys(normalizeUserAccess(user));
    writeAudit(
      "Access template applied",
      user.name || user.email,
      `${template.label} applied. Access changed from ${previous || "none"} to ${next || "none"}.`,
      "",
      "blue",
    );
    persistData();
    render();
  }

  function previewUserAccess(id) {
    if (!canAdmin()) return;
    const user = state.data.users.find((item) => item.id === id);
    if (!user || user.id === state.user.id || user.role === "Admin") return;
    const admin = { ...state.user };
    writeAudit(
      "Access preview started",
      user.name || user.email,
      `${admin.name} previewed ${user.role} access with ${normalizeUserAccess(user).length} enabled sections.`,
      "",
      "blue",
    );
    state.previewAdmin = admin;
    state.user = {
      id: user.id,
      companyId: user.companyId,
      name: user.name,
      email: user.email,
      role: user.role,
      access: normalizeUserAccess(user),
    };
    state.view = defaultViewForUser(state.user) || "No Access";
    state.roomsOpen = false;
    state.quickSearchOpen = false;
    state.selectedId = null;
    persistData();
    render();
    scrollToTop();
  }

  function exitAccessPreview() {
    if (!isAccessPreviewing()) return;
    state.user = { ...state.previewAdmin };
    state.previewAdmin = null;
    state.view = canAccessView("Membership") ? "Membership" : defaultViewForUser() || "Tenders";
    state.roomsOpen = false;
    state.quickSearchOpen = false;
    state.selectedId = null;
    persistSession(state.user);
    render();
    scrollToTop();
  }

  function resetDemo() {
    const confirmed = window.confirm("Reset local demo data back to the imported Excel sample?");
    if (!confirmed) return;
    localStorage.removeItem(STORE_KEY);
    state.data = normalizeData(clone(window.SEED_DATA));
    state.selectedId = null;
    render();
  }

  function render() {
    if (!state.user) {
      renderLogin();
    } else {
      renderShell();
    }
  }

  function scrollToTop() {
    const jump = () => {
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    };
    jump();
    requestAnimationFrame(jump);
    window.setTimeout(jump, 40);
  }

  function scrollPageEdge() {
    const nearBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 120;
    requestAnimationFrame(() =>
      window.scrollTo({
        top: nearBottom ? 0 : document.documentElement.scrollHeight,
        left: 0,
        behavior: "smooth",
      }),
    );
  }

  function openSearchResult(id) {
    const record = state.data.records.find((item) => item.id === id);
    if (!record) return;
    state.quickSearchOpen = false;
    state.quickSearch = "";
    state.view = record.type === "Project" ? "Projects" : "Tenders";
    state.filters.search = "";
    state.filters.type = "All";
    state.filters.status = "All";
    state.filters.category = "All";
    state.filters.lane = "All lanes";
    state.selectedId = id;
    render();
    requestAnimationFrame(() => document.querySelector(`[data-id="${CSS.escape(id)}"]`)?.scrollIntoView({ block: "center" }));
  }

  function updatePricingCalculator() {
    const projection = pricingProjection();
    const membership = membershipProjection();
    const seatCount = document.getElementById("pricingSeatCount");
    const monthly = document.getElementById("pricingMonthly");
    const annual = document.getElementById("pricingAnnual");
    const savings = document.getElementById("pricingSavings");
    const membershipSeatCount = document.getElementById("membershipSeatCount");
    const membershipPlanName = document.getElementById("membershipPlanName");
    const membershipPlanNote = document.getElementById("membershipPlanNote");
    const membershipBillingLabel = document.getElementById("membershipBillingLabel");
    const membershipMonthly = document.getElementById("membershipMonthly");
    const membershipAnnual = document.getElementById("membershipAnnual");
    const requestBillingCycle = document.getElementById("requestBillingCycle");
    const requestDueNow = document.getElementById("requestDueNow");
    if (seatCount) seatCount.textContent = projection.seats;
    if (monthly) monthly.textContent = formatBilling(projection.monthly);
    if (annual) annual.textContent = formatBilling(projection.annualPrepay);
    if (savings) savings.textContent = formatBilling(projection.annualSavings);
    if (membershipSeatCount) membershipSeatCount.textContent = membership.seats;
    if (membershipPlanName) membershipPlanName.textContent = membership.label;
    if (membershipPlanNote) membershipPlanNote.textContent = membership.note;
    if (membershipBillingLabel) {
      membershipBillingLabel.textContent = membership.billingTerm === "Annual" ? "Annual prepaid" : "Monthly estimate";
    }
    if (membershipMonthly) membershipMonthly.textContent = membership.isCustom ? "Custom" : formatBilling(membership.dueNow);
    if (membershipAnnual) {
      membershipAnnual.textContent = membership.isCustom
        ? "Annual proposal"
        : membership.billingTerm === "Annual"
          ? `${formatBilling(membership.annualSavings)} saved vs monthly`
          : `${formatBilling(membership.annual)} annual run-rate`;
    }
    if (requestBillingCycle) requestBillingCycle.textContent = membership.billingTerm;
    if (requestDueNow) requestDueNow.textContent = membership.isCustom ? "Custom" : formatBilling(membership.dueNow);
  }

  document.addEventListener("submit", (event) => {
    if (event.target.id === "loginForm") {
      event.preventDefault();
      const form = new FormData(event.target);
      const email = String(form.get("email") || "").trim().toLowerCase();
      const password = String(form.get("password") || "");
      const user = state.data.users.find(
        (item) => item.email.toLowerCase() === email && item.password === password,
      );
      if (!user) {
        state.message = "Email or password did not match.";
        render();
        return;
      }
      state.user = {
        id: user.id,
        companyId: user.companyId,
        name: user.name,
        email: user.email,
        role: user.role,
        access: normalizeUserAccess(user),
      };
      state.message = "";
      persistSession(state.user);
      render();
      scrollToTop();
    }

    if (event.target.id === "teamForm") {
      event.preventDefault();
      addUser(event.target);
    }

    if (event.target.id === "intakeForm") {
      event.preventDefault();
      submitIntakeForm(event.target);
    }
  });

  document.addEventListener("click", (event) => {
    const button = event.target.closest(
      "[data-action], [data-view], [data-quick-status], [data-insight-lens], [data-membership-plan], [data-billing-term], [data-density], [data-tracker-mode]",
    );
    const row = event.target.closest(".tracker-table tbody tr");
    if (event.target.classList.contains("quick-search-backdrop")) {
      state.quickSearchOpen = false;
      state.quickSearch = "";
      render();
      return;
    }
    if (!button && row && !event.target.closest("button, select, input, textarea, [contenteditable]")) {
      state.selectedId = row.dataset.id;
      render();
      return;
    }
    if (!button) return;
    const action = button.dataset.action;

    if (button.dataset.quickStatus) {
      state.filters.status = state.filters.status === button.dataset.quickStatus ? "All" : button.dataset.quickStatus;
      state.selectedId = null;
      render();
      return;
    }

    if (button.dataset.insightLens) {
      state.insightLens = button.dataset.insightLens;
      render();
      return;
    }

    if (button.dataset.membershipPlan) {
      state.membershipPlan = button.dataset.membershipPlan;
      render();
      requestAnimationFrame(() => document.getElementById("membershipTitle")?.scrollIntoView({ block: "start" }));
      return;
    }

    if (button.dataset.billingTerm) {
      state.billingTerm = button.dataset.billingTerm;
      render();
      return;
    }

    if (button.dataset.density) {
      state.tableDensity = button.dataset.density;
      render();
      return;
    }

    if (button.dataset.trackerMode) {
      state.trackerMode = button.dataset.trackerMode;
      render();
      return;
    }

    if (action === "toggle-rooms") {
      state.roomsOpen = !state.roomsOpen;
      render();
      return;
    }

    if (action === "close-rooms") {
      state.roomsOpen = false;
      render();
      return;
    }

    if (action === "exit-preview") {
      exitAccessPreview();
      return;
    }

    if (action === "review-seats") {
      document.getElementById("membershipSeatSection")?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    if (button.dataset.view) {
      if (!canAccessView(button.dataset.view)) {
        window.alert("This section is not enabled for your user.");
        return;
      }
      state.view = button.dataset.view;
      state.roomsOpen = false;
      if (state.view === "Tenders Insights") state.insightLens = "Tendering";
      if (state.view === "Project Insights") state.insightLens = "Projects";
      const typeOptions = isProjectSection() ? ["All", "Project"] : ["All", "EOI", "Tender"];
      if (!typeOptions.includes(state.filters.type)) state.filters.type = "All";
      state.selectedId = null;
      render();
      scrollToTop();
      return;
    }
    if (action === "logout") {
      state.previewAdmin = null;
      state.user = null;
      state.quickSearchOpen = false;
      state.quickSearch = "";
      state.roomsOpen = false;
      persistSession(null);
      render();
      return;
    }
    if (action === "open-quick-search") {
      state.quickSearchOpen = true;
      render();
      return;
    }
    if (action === "close-quick-search") {
      state.quickSearchOpen = false;
      state.quickSearch = "";
      render();
      return;
    }
    if (action === "open-search-result") {
      openSearchResult(button.dataset.id);
      return;
    }
    if (action === "open-related-record") {
      openSearchResult(button.dataset.id);
      return;
    }
    if (action === "set-bid-decision") {
      setBidDecision(button.dataset.id, button.dataset.decision);
      return;
    }
    if (action === "toggle-submission-ready") {
      toggleSubmissionReady(button.dataset.id);
      return;
    }
    if (action === "focus-intake-form") {
      document.getElementById("intakeFormPanel")?.scrollIntoView({ behavior: "smooth", block: "start" });
      requestAnimationFrame(() => document.querySelector("#intakeForm input[name='reference']")?.focus());
      return;
    }
    if (action === "convert-intake") {
      convertIntakeRequest(button.dataset.id);
      return;
    }
    if (action === "rework-intake") {
      reworkIntakeRequest(button.dataset.id);
      return;
    }
    if (action === "delete-intake") {
      deleteIntakeRequest(button.dataset.id);
      return;
    }
    if (action === "load-import-sample") {
      loadImportSample();
      return;
    }
    if (action === "preview-import") {
      previewImportText();
      return;
    }
    if (action === "commit-import") {
      commitImportRows();
      return;
    }
    if (action === "clear-import") {
      clearImportStudio();
      return;
    }
    if (action === "download-import-template") {
      downloadImportTemplate();
      return;
    }
    if (action === "mark-governance-reviewed") {
      markGovernanceReviewed(button.dataset.id);
      return;
    }
    if (action === "apply-access-template") {
      applyAccessTemplate(button.dataset.userId, button.dataset.template);
      return;
    }
    if (action === "preview-user") {
      previewUserAccess(button.dataset.userId);
      return;
    }
    if (action === "scroll-page") {
      scrollPageEdge();
      return;
    }
    if (action === "toggle-detail") {
      state.detailCollapsed = !state.detailCollapsed;
      render();
      return;
    }
    if (action === "print-report") {
      window.print();
      return;
    }
    if (action === "reset") resetDemo();
    if (action === "add") addRecord();
    if (action === "export") exportCsv();
    if (action === "export-insights") exportInsightsPack();
    if (action === "subscription-request") {
      const status = document.getElementById("subscriptionStatus");
      if (status) status.textContent = "Membership request prepared";
      window.alert("Membership request prepared for this demo. Production checkout can connect invoices and payment later.");
    }
    if (action === "select") {
      state.selectedId = button.dataset.id;
      if (isInsightSection()) {
        const record = state.data.records.find((item) => item.id === button.dataset.id);
        state.view = record?.type === "Project" ? "Projects" : "Tenders";
      }
      render();
    }
    if (action === "delete") deleteRecord(button.dataset.id);
    if (action === "delete-user") deleteUser(button.dataset.userId);
  });

  document.addEventListener("input", (event) => {
    const filter = event.target.dataset.filter;
    if (event.target.dataset.pricing === "seats") {
      state.pricingSeats = Number(event.target.value) || 10;
      updatePricingCalculator();
      return;
    }
    if (event.target.matches("[data-import-text]")) {
      state.importText = event.target.value;
      return;
    }
    if (filter === "search") {
      state.filters.search = event.target.value;
      renderShell();
    }
    if (event.target.matches("textarea[data-field]")) {
      updateRecord(event.target.dataset.id, event.target.dataset.field, event.target.value);
    }
    if (event.target.matches("[data-quick-search-input]")) {
      state.quickSearch = event.target.value;
      renderShell();
      return;
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && state.roomsOpen) {
      state.roomsOpen = false;
      render();
      return;
    }
    if (event.key === "Escape" && state.quickSearchOpen) {
      state.quickSearchOpen = false;
      state.quickSearch = "";
      render();
      return;
    }
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k" && state.user) {
      event.preventDefault();
      state.quickSearchOpen = true;
      render();
    }
  });

  document.addEventListener("change", (event) => {
    const filter = event.target.dataset.filter;
    if (event.target.matches("[data-import-file]")) {
      readImportFile(event.target.files?.[0]);
      return;
    }
    if (filter && filter !== "search") {
      state.filters[filter] = event.target.value;
      state.selectedId = null;
      render();
      return;
    }
    if (event.target.dataset.membership === "plan") {
      state.membershipPlan = event.target.value;
      updatePricingCalculator();
      return;
    }
    if (event.target.dataset.field) {
      updateRecord(event.target.dataset.id, event.target.dataset.field, event.target.value);
      render();
      return;
    }
    if (event.target.dataset.userField) {
      updateUser(event.target.dataset.userId, event.target.dataset.userField, event.target.value);
      return;
    }
    if (event.target.dataset.userAccess) {
      updateUserAccess(event.target.dataset.userId, event.target.dataset.userAccess, event.target.checked);
    }
  });

  document.addEventListener("focusout", (event) => {
    const cell = event.target.closest('[contenteditable="true"][data-field]');
    if (!cell) return;
    updateRecord(cell.dataset.id, cell.dataset.field, cell.innerText.trim());
  });

  render();
})();
