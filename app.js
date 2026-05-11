(function () {
  const BRAND_NAME = "PursuitDesk";
  const BRAND_DOMAIN = "pursuitdesk.app";
  const BRAND_MARK = "assets/pursuitdesk-mark.svg?v=22";
  const BRAND_LOGO_3D = "assets/pursuitdesk-logo-3d.svg?v=22";
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
    "High value",
    "Has negotiations",
    "Missing value",
  ];
  const BILLING_CURRENCY = "USD";
  const BILLING_PRICE_PER_USER = 5;
  const BUSINESS_PLUS_BASE = 49;
  const ANNUAL_BILLABLE_MONTHS = 10;
  const BILLING_TERMS = ["Monthly", "Annual"];
  const ACCESS_SECTIONS = [
    { key: "tenders", label: "Tenders", view: "Tenders" },
    { key: "tenderInsights", label: "Tenders Insights", view: "Tenders Insights" },
    { key: "projects", label: "Projects", view: "Projects" },
    { key: "projectInsights", label: "Project Insights", view: "Project Insights" },
    { key: "membership", label: "Membership Model", view: "Membership" },
  ];
  const PLATFORM_MODULES = [
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
      name: "Contracts",
      code: "CT",
      stage: "Next module",
      summary: "Agreement numbers, award history, contract value, renewal dates, and obligations.",
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
      stage: "Roadmap",
      summary: "Tender files, submissions, commercial clarifications, attachments, and document trails.",
      signal: "Evidence locker",
    },
    {
      name: "Reminders",
      code: "RM",
      stage: "Roadmap",
      summary: "Submission dates, follow-ups, negotiation tasks, renewals, and escalation nudges.",
      signal: "Action engine",
    },
    {
      name: "Reports",
      code: "RP",
      stage: "Roadmap",
      summary: "Management reports, win-rate packs, project summaries, and executive exports.",
      signal: "Decision layer",
    },
  ];

  const app = document.getElementById("app");
  const state = {
    data: loadData(),
    user: loadSession(),
    view: "Tenders",
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
  };

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
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
    data.company = {
      ...data.company,
      billingCurrency: BILLING_CURRENCY,
      pricePerUser: BILLING_PRICE_PER_USER,
      billingCycle: "monthly",
    };
    data.users = data.users.map((user) => {
      const demo = demoUsers[user.id];
      const normalized = demo ? { ...user, name: demo[0], email: demo[1] } : user;
      return { ...normalized, access: normalizeUserAccess(normalized) };
    });
    return data;
  }

  function defaultAccessForRole(role) {
    if (role === "Admin") return ACCESS_SECTIONS.map((section) => section.key);
    if (role === "Editor") return ["tenders", "tenderInsights", "projects", "projectInsights"];
    return ["tenders", "projects"];
  }

  function normalizeUserAccess(user) {
    const valid = new Set(ACCESS_SECTIONS.map((section) => section.key));
    if (user.role === "Admin") return ACCESS_SECTIONS.map((section) => section.key);
    const legacyMap = {
      control: ["tenders", "projects"],
      insights: ["tenderInsights", "projectInsights"],
      membership: ["membership"],
    };
    const requested = Array.isArray(user.access)
      ? user.access.flatMap((key) => legacyMap[key] || key).filter((key) => valid.has(key))
      : [];
    return requested.length ? requested : defaultAccessForRole(user.role);
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

  function billingCurrency(company = state.data.company) {
    return company.billingCurrency || BILLING_CURRENCY;
  }

  function formatBilling(amount, company = state.data.company) {
    return `${billingCurrency(company)} ${Number(amount || 0).toLocaleString("en-US")}`;
  }

  function isTenderSection(view = state.view) {
    return view === "Tenders" || view === "Tender Insights" || view === "Tenders Insights";
  }

  function isProjectSection(view = state.view) {
    return view === "Projects" || view === "Project Insights";
  }

  function isInsightSection(view = state.view) {
    return view === "Tender Insights" || view === "Tenders Insights" || view === "Project Insights";
  }

  function sectionForView(view) {
    if (view === "Tender Insights" || view === "Tenders Insights") return "tenderInsights";
    if (view === "Project Insights") return "projectInsights";
    if (view === "Projects") return "projects";
    if (view === "Tenders") return "tenders";
    if (view === "Membership") return "membership";
    return "tenders";
  }

  function userAccess(user = state.user) {
    if (!user) return [];
    if (user.role === "Admin") return ACCESS_SECTIONS.map((section) => section.key);
    return normalizeUserAccess(user);
  }

  function hasSectionAccess(key, user = state.user) {
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
      persistSession(null);
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
    persistSession(state.user);
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
    const amount = Number(record.valueAmount) || 0;
    const highValueFloor = highValueThreshold(companyRecords());
    if (lane === "Needs decision") {
      return !isClosedRecord(record) && ["Active", "Pending", "Submitted"].includes(record.status);
    }
    if (lane === "Past due") {
      return !isClosedRecord(record) && date && date < today;
    }
    if (lane === "No due date") {
      return !isClosedRecord(record) && !record.endDate;
    }
    if (lane === "High value") {
      return amount >= highValueFloor && amount > 0;
    }
    if (lane === "Has negotiations") {
      return (record.rounds || []).length > 0;
    }
    if (lane === "Missing value") {
      return !amount;
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
    return ACCESS_SECTIONS.map((section) => {
      if (!hasSectionAccess(section.key)) return "";
      const active = state.view === section.view;
      return `
        <button class="mode-btn ${active ? "active" : ""}" type="button" data-view="${section.view}">
          ${escapeHtml(section.label)}
        </button>
      `;
    }).join("");
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
    if (isInsightSection(view) || view === "Membership") return "";
    const cards = isProjectSection(view)
      ? [
          ["Ongoing projects", metrics.ongoing, `${metrics.total} project records`],
          ["Completed projects", metrics.completed, "Closed delivery records"],
          ["Due watch", metrics.dueWatch, "Past due and next 30 days"],
          ["Captured value", formatCompactMoney(metrics.value), "Project value captured"],
        ]
      : [
          ["Active tenders", metrics.active, `${metrics.total} tender and EOI records`],
          ["Submitted", metrics.submitted, "Submitted tender records"],
          ["Awarded tenders", metrics.awarded, "LOA or award status"],
          ["Captured value", formatCompactMoney(metrics.value), "Tender value captured"],
        ];
    return `
      <section class="analytics">
        ${cards
          .map(
            ([label, value, note]) => `
              <div class="metric"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong><small>${escapeHtml(note)}</small></div>
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
      state.view === "Tenders"
        ? "Tenders workspace"
        : state.view === "Projects"
          ? "Project workspace"
        : state.view === "Tenders Insights"
          ? "Tenders insights"
        : state.view === "Project Insights"
          ? "Project insights"
          : state.view === "Membership"
            ? "Membership model"
          : state.view;
    const viewCopy =
      state.view === "Tenders Insights"
        ? "Tender-only management signals for follow-up risk, submission readiness, value exposure, and bid decisions."
        : state.view === "Project Insights"
          ? "Project-only management signals for delivery movement, due-date pressure, owner load, and completion health."
        : state.view === "Membership"
          ? "Manage launch pricing, seats, subscription packaging, and the upgrade path from demo workspace to paid company plan."
        : `${records.length} records in view. Track bids, negotiations, owners, dates, and delivery status without losing the spreadsheet speed.`;
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
            <div class="user-pill">${escapeHtml(state.user.name)} / ${escapeHtml(state.user.role)}</div>
            <button class="ghost-btn" type="button" data-action="reset">Reset demo</button>
            <button class="secondary-btn" type="button" data-action="logout">Logout</button>
          </div>
        </header>

        <main class="main">
          <section class="workspace-header">
            <div class="workspace-title">
              <h1>${escapeHtml(viewTitle)}</h1>
              <p>${escapeHtml(viewCopy)}</p>
            </div>
            ${renderHeaderSummaryForView(state.view, scopedMetrics)}
          </section>

          ${renderMetricsForView(state.view, scopedMetrics)}

          ${
            isInsightSection(state.view)
              ? renderInsights()
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
    const categories = uniqueOptions("category");
    const statuses = Array.from(new Set([...STATUS_OPTIONS, ...uniqueOptions("status")]));
    const typeOptions = isProjectSection() ? ["All", "Project"] : ["All", "EOI", "Tender"];
    return `
      <section class="tracker-layout">
        <aside class="left-rail">
          ${renderCommandPanel(records)}
          ${renderMixPanel(records)}
        </aside>

        <section class="workbench">
          <section class="toolbar" aria-label="Tracker controls">
            <input class="filter-input" type="search" placeholder="Search records" value="${escapeHtml(state.filters.search)}" data-filter="search">
            ${renderSelect("type", typeOptions, typeOptions.includes(state.filters.type) ? state.filters.type : "All", "filter-select")}
            ${renderSelect("status", ["All", ...statuses], state.filters.status, "filter-select")}
            ${renderSelect("category", ["All", ...categories], state.filters.category, "filter-select")}
            ${renderSelect("lane", LANE_OPTIONS, state.filters.lane || "All lanes", "filter-select lane-select")}
            <div class="toolbar-actions">
              <button class="secondary-btn" type="button" data-action="add" ${canEdit() ? "" : "disabled"}>New row</button>
              <button class="ghost-btn" type="button" data-action="export">Export CSV</button>
            </div>
          </section>

          <div class="table-panel">
            <div class="table-head">
              <div>
                <span class="panel-label">Editable tracker</span>
                <h2>${state.view === "Projects" ? "Projects" : "Tenders"}</h2>
              </div>
              <span>${records.length} visible</span>
            </div>
            <div class="table-wrap">
              ${records.length ? renderTable(records) : `<div class="empty-state">No matching records.</div>`}
            </div>
            <div class="mobile-records">
              ${records.length ? records.map(renderMobileRecord).join("") : `<div class="empty-state">No matching records.</div>`}
            </div>
          </div>
        </section>

        ${renderDetail(selected)}
      </section>
    `;
  }

  function renderCommandPanel(records) {
    const attention = records.filter((record) =>
      ["Active", "Pending", "Submitted", "Ongoing"].includes(record.status),
    ).length;
    const countStatus = (status) => records.filter((record) => record.status === status).length;
    const signalRows = isProjectSection()
      ? [
          ["Ongoing", "Ongoing", countStatus("Ongoing")],
          ["Completed", "Completed", countStatus("Completed")],
          ["Cancelled", "Cancelled", countStatus("Cancelled")],
          ["Regret", "Regret", countStatus("Regret")],
        ]
      : [
          ["Active", "Active", countStatus("Active")],
          ["Pending", "Pending", countStatus("Pending")],
          ["Submitted", "Submitted", countStatus("Submitted")],
          ["Awarded", "Awarded", countStatus("Awarded")],
        ];
    return `
      <div class="panel command-panel">
        <div class="panel-heading">
          <h2>Command rail</h2>
          <span>${records.length} shown</span>
        </div>
        <div class="focus-card">
          <span>Needs movement</span>
          <strong>${attention}</strong>
          <small>${isProjectSection() ? "ongoing project records needing delivery attention" : "active, pending, and submitted tender records"}</small>
        </div>
        <div class="signal-list">
          ${signalRows
            .map(
              ([label, status, value]) => `
                <button class="signal-row ${state.filters.status === status ? "active" : ""}" type="button" data-quick-status="${escapeHtml(status)}">
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
            <th class="col-value">Value</th>
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
        <td>${renderMoneyCell(record)}</td>
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

  function renderMoneyCell(record) {
    const label = Number(record.valueAmount) > 0 ? formatCompactMoney(record.valueAmount) : record.valueText || "-";
    return `<span class="cell-money" title="${escapeHtml(record.valueText || "")}">${escapeHtml(label)}</span>`;
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
          <div class="detail-grid">
            <div class="detail-item"><span>Status</span><strong><span class="status-badge ${statusClass(record.status)}">${escapeHtml(record.status)}</span></strong></div>
            <div class="detail-item"><span>Category</span><strong>${escapeHtml(record.category)}</strong></div>
            <div class="detail-item"><span>Start date</span><strong>${escapeHtml(formatDate(record.startDate))}</strong></div>
            <div class="detail-item"><span>End or last date</span><strong>${escapeHtml(formatDate(record.endDate))}</strong></div>
            <div class="detail-item"><span>Agreement no</span><strong>${escapeHtml(record.agreementNo || "-")}</strong></div>
            <div class="detail-item"><span>Source sheet</span><strong>${escapeHtml(record.sourceSheet || "-")}</strong></div>
          </div>

          <div class="rounds">
            <h3>Negotiation rounds</h3>
            ${
              rounds.length
                ? `<div class="round-list">${rounds.map(renderRound).join("")}</div>`
                : `<div class="readonly-note">No negotiation rounds recorded for this item.</div>`
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
    const money = [round.submittedPrice, round.targetPrice, round.providedPrice]
      .filter(Boolean)
      .join(" | ");
    return `
      <div class="round-item">
        <strong>${escapeHtml(round.label || `Round ${round.round}`)} / ${escapeHtml(formatDate(round.receivedDate))}</strong>
        <span>${escapeHtml(money || "No price captured")}</span>
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
          <div class="access-checks">
            ${ACCESS_SECTIONS.map(
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
          <button class="mini-btn danger" type="button" data-action="delete-user" data-user-id="${escapeHtml(user.id)}" ${canAdmin() && user.id !== state.user.id ? "" : "disabled"}>
            Remove
          </button>
        </td>
      </tr>
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
            ${ACCESS_SECTIONS.map(
              (section) => `
                <label>
                  <input type="checkbox" name="access" value="${escapeHtml(section.key)}" ${section.key !== "membership" ? "checked" : ""}>
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

  function updateRecord(id, field, value) {
    const record = state.data.records.find((item) => item.id === id);
    if (!record || !canEdit()) return;
    record[field] = value;
    if (field === "valueText") record.valueAmount = parseAmount(value);
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
    persistData();
    render();
  }

  function exportCsv() {
    const rows = filterRecords();
    const columns = [
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
    persistData();
    render();
  }

  function deleteUser(id) {
    if (!canAdmin() || id === state.user.id) return;
    state.data.users = state.data.users.filter((user) => user.id !== id);
    persistData();
    render();
  }

  function updateUser(id, field, value) {
    if (!canAdmin()) return;
    const user = state.data.users.find((item) => item.id === id);
    if (!user) return;
    user[field] = value;
    if (field === "role") user.access = normalizeUserAccess(user);
    if (user.id === state.user.id) {
      state.user[field] = value;
      state.user.access = normalizeUserAccess(user);
      persistSession(state.user);
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
    user.access = Array.from(access).filter((item) => ACCESS_SECTIONS.some((section) => section.key === item));
    if (!user.access.length) {
      window.alert("Please keep at least one section enabled for each user.");
      user.access = normalizeUserAccess(user);
    }
    persistData();
    render();
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
    requestAnimationFrame(() => window.scrollTo({ top: 0, left: 0, behavior: "auto" }));
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
  });

  document.addEventListener("click", (event) => {
    const button = event.target.closest(
      "[data-action], [data-view], [data-quick-status], [data-insight-lens], [data-membership-plan], [data-billing-term]",
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
      state.user = null;
      state.quickSearchOpen = false;
      state.quickSearch = "";
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
    if (action === "scroll-page") {
      scrollPageEdge();
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
