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
    },
    selectedId: null,
    message: "",
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
          <section class="workspace-hero">
            <div class="hero-copy">
              <span class="panel-label">Procurement command desk</span>
              <h1>From EOI to award, every live opportunity has a clear next move.</h1>
              <p>A flatter, sharper workspace inspired by the Research Desk pattern: signals on the left, editable grid in the center, record intelligence on the right.</p>
            </div>
            <div class="hero-proof">
              <div><strong>${stats.activeTenders}</strong><span>active tender motions</span></div>
              <div><strong>${stats.ongoingProjects}</strong><span>ongoing delivery records</span></div>
              <div><strong>${stats.winProgress}%</strong><span>awarded or completed</span></div>
            </div>
          </section>

          <nav class="tabs" aria-label="Primary views">
            ${["All", "Tenders", "Projects", "Team & Billing"]
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

          ${state.view === "Team & Billing" ? renderTeamBilling() : renderTracker(records, selected, stats)}
        </main>
      </div>
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
      ["Pending action", stats.pending],
      ["Submitted", stats.submitted],
      ["Awarded", stats.awarded],
      ["Risk / regret", stats.risk],
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
              ([label, value]) => `
                <div class="signal-row">
                  <span>${label}</span>
                  <strong>${value}</strong>
                </div>
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
            <th class="col-type">Type</th>
            <th class="col-ref">Reference</th>
            <th class="col-client">Client</th>
            <th class="col-title">Title</th>
            <th class="col-category">Category</th>
            <th class="col-status">Status</th>
            <th class="col-date">Start</th>
            <th class="col-date">End / Last</th>
            <th class="col-value">Value</th>
            <th class="col-owner">Owner</th>
            <th class="col-activity">Latest activity</th>
            <th class="col-source">Source</th>
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
        <td>${renderRecordSelect(record, "type", TYPE_OPTIONS, editable)}</td>
        <td>${editableCell(record, "reference", "mono")}</td>
        <td>${editableCell(record, "client")}</td>
        <td>${editableCell(record, "title")}</td>
        <td>${editableCell(record, "category")}</td>
        <td>${renderRecordSelect(record, "status", STATUS_OPTIONS, editable, true)}</td>
        <td>${editableCell(record, "startDate")}</td>
        <td>${editableCell(record, "endDate")}</td>
        <td>${editableCell(record, "valueText")}</td>
        <td>${editableCell(record, "owner")}</td>
        <td>${editableCell(record, "latestActivity")}</td>
        <td><span class="cell-edit">${escapeHtml(record.sourceSheet || record.sourceWorkbook || "")}</span></td>
        <td>
          <div class="row-actions">
            <button class="mini-btn" type="button" data-action="select" data-id="${escapeHtml(record.id)}">View</button>
            <button class="mini-btn danger" type="button" data-action="delete" data-id="${escapeHtml(record.id)}" ${editable ? "" : "disabled"}>Del</button>
          </div>
        </td>
      </tr>
    `;
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
    }

    if (event.target.id === "teamForm") {
      event.preventDefault();
      addUser(event.target);
    }
  });

  document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-action], [data-view]");
    if (!button) return;
    const action = button.dataset.action;

    if (button.dataset.view) {
      state.view = button.dataset.view;
      state.selectedId = null;
      render();
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
    if (action === "select") {
      state.selectedId = button.dataset.id;
      render();
    }
    if (action === "delete") deleteRecord(button.dataset.id);
    if (action === "delete-user") deleteUser(button.dataset.userId);
  });

  document.addEventListener("input", (event) => {
    const filter = event.target.dataset.filter;
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
