(function () {
  const STORE_KEY = "tenderGrid:data:v2";
  const SESSION_KEY = "tenderGrid:session:v2";
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

  const app = document.getElementById("app");
  const state = {
    data: loadData(),
    user: loadSession(),
    view: "All",
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
    insightLens: "Open",
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
      "u-admin": ["TenderGrid Admin", "admin@tendergrid.app"],
      "u-editor": ["TenderGrid Editor", "editor@tendergrid.app"],
      "u-viewer": ["TenderGrid Viewer", "viewer@tendergrid.app"],
    };
    data.users = data.users.map((user) => {
      const demo = demoUsers[user.id];
      if (!demo) return user;
      return { ...user, name: demo[0], email: demo[1] };
    });
    return data;
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
    if (state.view === "Tenders") {
      records = records.filter((record) => record.type === "Tender" || record.type === "EOI");
    }
    if (state.view === "Projects") {
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
    return {
      seats,
      monthly,
      annual: monthly * 12,
      perUser: company.pricePerUser,
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
            <div class="login-kicker">TenderGrid / Bid workspace</div>
            <div class="brand-row">
              <div class="brand-mark"><img src="assets/tendergrid-mark.svg" alt=""></div>
              <div>
                <div class="brand-name">TenderGrid</div>
                <div class="company-pill">Track every bid from EOI to award</div>
              </div>
            </div>
            <h1>The operating desk for tenders, EOIs, negotiations, and active projects.</h1>
            <p>Turn the current Excel trackers into a governed company workspace with clean editing, role access, fast filters, and AED 10 per user monthly billing.</p>
            <div class="login-signal-strip">
              <span class="status-pill is-live">Excel-ready MVP</span>
              <span class="status-pill">Role access</span>
              <span class="status-pill">AED 10/user</span>
            </div>
            <div class="login-stats">
              <div class="login-stat"><strong>${totalRecords}</strong><span>Sample records</span></div>
              <div class="login-stat"><strong>${tenders}</strong><span>Tender records</span></div>
              <div class="login-stat"><strong>${projects}</strong><span>Project records</span></div>
            </div>
          </div>
          <div class="login-form-wrap">
            <div class="logo-showcase">
              <img src="assets/tendergrid-logo-3d.png" alt="TenderGrid 3D logo">
            </div>
            <span class="panel-label">Secure workspace</span>
            <h2>Sign in</h2>
            <form id="loginForm">
              <div class="field">
                <label for="email">Email</label>
                <input id="email" name="email" type="email" value="admin@tendergrid.app" autocomplete="username" required>
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
              <code>admin@tendergrid.app</code>, <code>editor@tendergrid.app</code>, <code>viewer@tendergrid.app</code><br>
              Password: <code>demo123</code>
            </div>
          </div>
        </section>
      </main>
    `;
  }

  function renderShell() {
    const company = state.data.company;
    const records = filterRecords();
    const selected = getSelected(records);
    const stats = metrics();
    const viewTitle =
      state.view === "All"
        ? "Opportunity pipeline"
        : state.view === "Insights"
          ? "Pipeline insights"
          : state.view;
    const viewCopy =
      state.view === "Insights"
        ? "Turn tender records into management signals: follow-up risk, workload, category concentration, and value exposure."
        : `${records.length} records in view. Track bids, negotiations, owners, dates, and delivery status without losing the spreadsheet speed.`;
    app.innerHTML = `
      <div class="shell">
        <header class="topbar">
          <div class="brand-row topbar-brand">
            <div class="brand-mark"><img src="assets/tendergrid-mark.svg" alt=""></div>
            <div>
              <div class="brand-name">TenderGrid</div>
              <div class="company-pill">${escapeHtml(company.name)}</div>
            </div>
          </div>
          <div class="status-strip">
            <span class="status-pill is-live">Live demo</span>
            <span class="status-pill">${stats.totalRecords} records</span>
            <span class="status-pill">AED ${company.pricePerUser}/seat</span>
          </div>
          <div class="topbar-actions">
            <div class="user-pill">${escapeHtml(state.user.name)} / ${escapeHtml(state.user.role)}</div>
            <button class="ghost-btn" type="button" data-action="reset">Reset demo</button>
            <button class="secondary-btn" type="button" data-action="logout">Logout</button>
          </div>
        </header>

        <main class="main">
          <section class="workspace-header">
            <div class="workspace-title">
              <span class="panel-label">Tender control room</span>
              <h1>${escapeHtml(viewTitle)}</h1>
              <p>${escapeHtml(viewCopy)}</p>
            </div>
            <div class="header-summary">
              <div><span>Active</span><strong>${stats.activeTenders}</strong></div>
              <div><span>Projects</span><strong>${stats.ongoingProjects}</strong></div>
              <div><span>Closed</span><strong>${stats.winProgress}%</strong></div>
            </div>
          </section>

          <nav class="tabs" aria-label="Primary views">
            ${["All", "Tenders", "Projects", "Insights", "Team & Billing"]
              .map(
                (view) => `
                  <button class="tab-btn ${state.view === view ? "active" : ""}" type="button" data-view="${view}">
                    ${view}
                  </button>
                `,
              )
              .join("")}
          </nav>

          <section class="analytics">
            <div class="metric"><span>Active tenders</span><strong>${stats.activeTenders}</strong><small>${stats.totalRecords} total records</small></div>
            <div class="metric"><span>Ongoing projects</span><strong>${stats.ongoingProjects}</strong><small>Software and telecom</small></div>
            <div class="metric"><span>Awarded tenders</span><strong>${stats.awarded}</strong><small>LOA or award status</small></div>
            <div class="metric"><span>Seat bill</span><strong>AED ${stats.bill}</strong><small>${stats.seats} users at AED ${company.pricePerUser}/month</small></div>
          </section>

          ${
            state.view === "Team & Billing"
              ? renderTeamBilling()
              : state.view === "Insights"
                ? renderInsights()
                : renderTracker(records, selected, stats)
          }
          ${renderPricingSection(stats, company)}
        </main>
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
    const lens = state.insightLens || "Open";
    if (lens === "All") return records;
    if (lens === "Open") return records.filter((record) => !isClosedRecord(record));
    if (lens === "Tenders") return records.filter((record) => record.type === "Tender" || record.type === "EOI");
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
    const funnel = [
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
      lens: state.insightLens || "Open",
      scopedRecords: records.length,
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

  function renderInsights() {
    const model = insightModel(insightRecords());
    return `
      <section class="insights-layout">
        <div class="insight-hero cockpit-hero">
          <div>
            <span class="panel-label">Bid command cockpit</span>
            <h2>From sheet tracking to pursuit control.</h2>
            <p>Qualification, deadline pressure, value exposure, owner load, and submission readiness in one operating view.</p>
            ${renderLensSwitch(model.lens)}
            <div class="hero-actions">
              <button class="secondary-btn" type="button" data-action="export-insights">Export board pack</button>
              <button class="ghost-btn" type="button" data-view="All">Open tracker</button>
            </div>
          </div>
          <div class="score-ring" style="--score: ${model.healthScore}">
            <strong>${model.healthScore}</strong>
            <span>Pipeline score</span>
          </div>
        </div>

        <div class="insight-kpis">
          ${renderInsightKpi("Captured value", formatCompactMoney(model.totalValue), `${model.recordsWithValue} records with value`)}
          ${renderInsightKpi("Open value", formatCompactMoney(model.openValue), "Active, pending, submitted, and ongoing")}
          ${renderInsightKpi("Closed value", formatCompactMoney(model.awardedValue), "Awarded and completed records")}
          ${renderInsightKpi("Negotiation depth", `${model.averageRounds} rounds`, `${model.negotiationRecords} records with rounds`)}
        </div>

        <div class="cockpit-grid">
          <article class="info-panel decision-panel">
            <div class="info-head">
              <div>
                <span class="metric-label">Go / no-go queue</span>
                <h3>Decision-ready pursuits</h3>
              </div>
              <span>${model.scopedRecords} in lens</span>
            </div>
            ${renderDecisionBoard(model.decisionRows)}
          </article>

          <article class="info-panel">
            <div class="info-head">
              <div>
                <span class="metric-label">Risk map</span>
                <h3>What needs management attention</h3>
              </div>
            </div>
            ${renderRiskMatrix(model.riskMatrix)}
          </article>

          <article class="info-panel">
            <div class="info-head">
              <div>
                <span class="metric-label">Submission readiness</span>
                <h3>Record completeness</h3>
              </div>
            </div>
            ${renderComplianceRows(model.complianceRows)}
          </article>

          <article class="info-panel">
            <div class="info-head">
              <div>
                <span class="metric-label">Product roadmap</span>
                <h3>Peer-inspired workflow</h3>
              </div>
            </div>
            ${renderPlaybookRows(model.playbookRows)}
          </article>
        </div>

        <div class="infographic-grid">
          <article class="info-panel info-panel-wide">
            <div class="info-head">
              <div>
                <span class="metric-label">Opportunity funnel</span>
                <h3>Bid movement at a glance</h3>
              </div>
              <span>${model.stats.totalRecords} total records</span>
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
                <h3>Largest open opportunities</h3>
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

  function renderPricingSection(stats, company) {
    const projection = pricingProjection(company);
    return `
      <section id="pricing" class="pricing-band" aria-labelledby="pricingTitle">
        <div class="section-heading">
          <div>
            <p class="eyebrow">Membership model</p>
            <h2 id="pricingTitle">Light monthly fee, serious tender discipline.</h2>
          </div>
          <span class="status-chip">AED ${company.pricePerUser}/user launch price</span>
        </div>

        <div class="pricing-snapshot" aria-label="TenderGrid pricing economics">
          <article>
            <span class="metric-label">Current demo bill</span>
            <strong>AED ${stats.bill}/mo</strong>
            <p>${stats.seats} active users at AED ${company.pricePerUser}/user/month.</p>
          </article>
          <article>
            <span class="metric-label">10-user company</span>
            <strong>AED ${company.pricePerUser * 10}/mo</strong>
            <p>A simple first sales target for small tender and project teams.</p>
          </article>
          <article>
            <span class="metric-label">100-seat base</span>
            <strong>AED ${company.pricePerUser * 100}/mo</strong>
            <p>A realistic milestone once several companies are active.</p>
          </article>
        </div>

        <div class="seat-calculator" aria-label="TenderGrid seat price calculator">
          <div>
            <span class="metric-label">Seat calculator</span>
            <h3>Model the monthly bill before talking to a customer.</h3>
            <p>Use the launch price of AED ${company.pricePerUser}/user/month and show the buyer how the bill changes as their team grows.</p>
          </div>
          <label class="seat-slider">
            <span><strong id="pricingSeatCount">${projection.seats}</strong> users</span>
            <input type="range" min="1" max="100" value="${projection.seats}" data-pricing="seats" aria-label="Pricing seats">
          </label>
          <div class="calculator-results">
            <div><span>Monthly</span><strong id="pricingMonthly">AED ${projection.monthly}</strong></div>
            <div><span>Annual run-rate</span><strong id="pricingAnnual">AED ${projection.annual}</strong></div>
            <div><span>Price per user</span><strong>AED ${projection.perUser}</strong></div>
          </div>
        </div>

        <div class="pricing-grid" aria-label="TenderGrid pricing plan preview">
          <article class="pricing-card">
            <span class="plan-kicker">Demo</span>
            <h3>Sample Workspace</h3>
            <p class="plan-price"><strong>AED 0</strong><span>prototype access</span></p>
            <p class="price-note">For evaluating the Excel-to-online workflow before production hosting.</p>
            <ul class="pricing-feature-list">
              <li>Imported sample tender and project records</li>
              <li>Admin, editor, and viewer demo roles</li>
              <li>Local browser storage and CSV export</li>
              <li>Visual proof for stakeholder feedback</li>
            </ul>
            <button class="plan-link" type="button" data-view="All">Open demo tracker</button>
          </article>

          <article class="pricing-card is-featured">
            <span class="plan-kicker">Recommended</span>
            <h3>Team Workspace</h3>
            <p class="plan-price"><strong>AED ${company.pricePerUser}</strong><span>per user / month</span></p>
            <p class="annual-price">Current demo bill: AED ${stats.bill}/month for ${stats.seats} users</p>
            <p class="price-note">The simple launch plan for small companies that need shared tender control without heavy software.</p>
            <ul class="pricing-feature-list">
              <li>Company-scoped tender and project tracker</li>
              <li>Role-based access for admin, editor, and viewer</li>
              <li>Quick analytics, filters, notes, and export</li>
              <li>Monthly seat billing that stays easy to explain</li>
            </ul>
            <button class="plan-link" type="button" data-view="Team & Billing">Open billing view</button>
          </article>

          <article class="pricing-card growth-card">
            <span class="plan-kicker">Next phase</span>
            <h3>Business Plus</h3>
            <p class="plan-price"><strong>AED 99</strong><span>company base / month</span></p>
            <p class="price-note">For teams that need production-grade workflow controls after the MVP is validated.</p>
            <ul class="pricing-feature-list">
              <li>Backend database and secure authentication</li>
              <li>Audit history for edits and user activity</li>
              <li>Excel import refresh and attachment roadmap</li>
              <li>Email reminders for due dates and next actions</li>
            </ul>
            <span class="plan-link muted">Production roadmap</span>
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
            <span class="plan-link muted">Custom deployment</span>
          </article>
        </div>

        <div class="pricing-note-grid" aria-label="TenderGrid pricing principles">
          <article class="pricing-note">
            <span class="metric-label">Launch principle</span>
            <strong>Keep the entry price obvious</strong>
            <p>AED 10/user/month is easy for customers to understand, approve, and expand as more users join.</p>
          </article>
          <article class="pricing-note">
            <span class="metric-label">Value anchor</span>
            <strong>Replace messy spreadsheet coordination</strong>
            <p>The buyer is paying for one shared source of truth, safer handoffs, and faster follow-up on live opportunities.</p>
          </article>
          <article class="pricing-note">
            <span class="metric-label">Upgrade path</span>
            <strong>Sell governance after trust</strong>
            <p>Once teams rely on TenderGrid daily, audit logs, imports, reminders, and controls become natural paid upgrades.</p>
          </article>
        </div>

        <div class="pricing-compare" aria-label="TenderGrid plan comparison">
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
              ["Monthly seat billing", "No", "AED 10/user", "Base + seats", "Contract"],
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

        <div class="billing-faq-grid" aria-label="TenderGrid billing notes">
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
            <strong>One shared tender sheet for AED 10/user/month</strong>
            <p>The offer should be simple enough for a first call and credible enough for a pilot invoice.</p>
          </article>
        </div>
      </section>
    `;
  }

  function renderTracker(records, selected, stats) {
    const categories = uniqueOptions("category");
    const statuses = Array.from(new Set([...STATUS_OPTIONS, ...uniqueOptions("status")]));
    return `
      <section class="tracker-layout">
        <aside class="left-rail">
          ${renderCommandPanel(records, stats)}
          ${renderMixPanel(stats)}
        </aside>

        <section class="workbench">
          <section class="toolbar" aria-label="Tracker controls">
            <input class="filter-input" type="search" placeholder="Search records" value="${escapeHtml(state.filters.search)}" data-filter="search">
            ${renderSelect("type", ["All", ...TYPE_OPTIONS], state.filters.type, "filter-select")}
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
                <h2>${state.view === "All" ? "All records" : escapeHtml(state.view)}</h2>
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

  function renderCommandPanel(records, stats) {
    const allRecords = companyRecords();
    const attention = allRecords.filter((record) =>
      ["Active", "Pending", "Submitted", "Ongoing"].includes(record.status),
    ).length;
    const signalRows = [
      ["Active", "Active", stats.activeTenders],
      ["Pending", "Pending", stats.pending],
      ["Submitted", "Submitted", stats.submitted],
      ["Awarded", "Awarded", stats.awarded],
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
          <small>active, pending, submitted, and ongoing records</small>
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

  function renderMixPanel(stats) {
    const total = Math.max(stats.totalRecords, 1);
    const rows = [
      ["Tender", stats.tenders, "teal"],
      ["EOI", stats.eois, "amber"],
      ["Project", stats.projects, "blue"],
    ];
    return `
      <div class="panel">
        <div class="panel-heading">
          <h2>Record mix</h2>
          <span>${stats.totalRecords} total</span>
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
              <div class="billing-box"><span>Price per user</span><strong>AED ${company.pricePerUser}</strong></div>
              <div class="billing-box"><span>Monthly total</span><strong>AED ${bill}</strong></div>
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
    return `
      <tr>
        <td>${escapeHtml(user.name)}</td>
        <td>${escapeHtml(user.email)}</td>
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
        <h3>Add user</h3>
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
    link.download = "tendergrid-export.csv";
    link.click();
    URL.revokeObjectURL(link.href);
  }

  function exportInsightsPack() {
    const model = insightModel(insightRecords());
    const lines = [
      "TenderGrid Board Pack",
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
    link.download = "tendergrid-board-pack.txt";
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
    state.data.users.push({
      id: `u-${Date.now()}`,
      companyId: state.user.companyId,
      name: String(formData.get("name") || "").trim(),
      email,
      role: String(formData.get("role") || "Editor"),
      password: String(formData.get("password") || "demo123"),
    });
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
    if (user.id === state.user.id) {
      state.user[field] = value;
      persistSession(state.user);
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

  function updatePricingCalculator() {
    const projection = pricingProjection();
    const seatCount = document.getElementById("pricingSeatCount");
    const monthly = document.getElementById("pricingMonthly");
    const annual = document.getElementById("pricingAnnual");
    if (seatCount) seatCount.textContent = projection.seats;
    if (monthly) monthly.textContent = `AED ${projection.monthly}`;
    if (annual) annual.textContent = `AED ${projection.annual}`;
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
    const button = event.target.closest("[data-action], [data-view], [data-quick-status], [data-insight-lens]");
    const row = event.target.closest(".tracker-table tbody tr");
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

    if (button.dataset.view) {
      state.view = button.dataset.view;
      state.selectedId = null;
      render();
      scrollToTop();
      return;
    }
    if (action === "logout") {
      state.user = null;
      persistSession(null);
      render();
      return;
    }
    if (action === "reset") resetDemo();
    if (action === "add") addRecord();
    if (action === "export") exportCsv();
    if (action === "export-insights") exportInsightsPack();
    if (action === "select") {
      state.selectedId = button.dataset.id;
      if (state.view === "Insights") state.view = "All";
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
  });

  document.addEventListener("change", (event) => {
    const filter = event.target.dataset.filter;
    if (filter && filter !== "search") {
      state.filters[filter] = event.target.value;
      state.selectedId = null;
      render();
      return;
    }
    if (event.target.dataset.field) {
      updateRecord(event.target.dataset.id, event.target.dataset.field, event.target.value);
      render();
      return;
    }
    if (event.target.dataset.userField) {
      updateUser(event.target.dataset.userId, event.target.dataset.userField, event.target.value);
    }
  });

  document.addEventListener("focusout", (event) => {
    const cell = event.target.closest('[contenteditable="true"][data-field]');
    if (!cell) return;
    updateRecord(cell.dataset.id, cell.dataset.field, cell.innerText.trim());
  });

  render();
})();
