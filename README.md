# PursuitDesk

A small static MVP for tracking EOI, tenders, and ongoing projects in a spreadsheet-style workspace.

## Brand

- Product name: PursuitDesk
- Tagline: From opportunity to delivery.
- 3D logo asset: `assets/pursuitdesk-logo-3d.svg`
- UI direction: compact operations workspace for pursuits, tenders, projects, insights, access control, and membership management.

## Demo Login

- `admin@pursuitdesk.app` / `demo123`
- `editor@pursuitdesk.app` / `demo123`
- `viewer@pursuitdesk.app` / `demo123`

## What Is Included

- Company-scoped records seeded from the two supplied Excel workbooks.
- Command Center home screen with operating health score, priority queue, module cockpit, management brief, evidence gaps, contract gaps, client heat, and largest open values.
- Pursuit Advisor turns live signals from Risk, Calendar, Bid Desk, Forecast, Contracts, Documents, Governance, and Reminders into ranked next-best actions, decision prompts, management brief lines, and operating recommendations.
- Weekly Review Room turns the same operating signals into a 55-minute agenda, owner-ready action register, leadership decision prompts, opening brief, closeout checklist, and management-pack handoff.
- Intake Desk for controlled tender/project request capture, required-field validation, priority scoring, rework routing, and conversion into live records.
- Import Studio for CSV or Excel-copied rows, template download, source workbook health, field coverage, duplicate reference checks, missing-field cleanup, preview before commit, and controlled clean-row import.
- Governance Desk for audit trail, high-value review queue, access control visibility, policy health checks, and review approvals.
- Governance Data Architecture panel separates Operational Tracker, Commercial Intelligence, and Governance Evidence layers with readiness, users, fields, and guard checks.
- Bid Desk for bid/no-bid decisions, submission readiness scoring, pack-ready status, deadline pressure, low-readiness cleanup, and audit-backed tender execution.
- Review Calendar for overdue work, this-week movement, next-30-day pressure, eight-week planning, high-value diary checks, and no-date cleanup.
- Risk Control Room for schedule, bid, commercial, delivery, value, and data risks with severity lanes, risk exposure, heatmap, critical queue, and mitigation rhythm.
- Forecast Room for weighted pipeline value, next-90-day forecast, scenario range, conversion assumptions, date-window timing, client forecast, and at-risk forecast cleanup.
- Inline table editing for Admin and Editor users.
- Viewer-only role.
- Tender, EOI, and project record types.
- Compact daily-use tracker grid with type/category/owner metadata moved into the title cell to reduce horizontal scrolling.
- Search, status/category/type filters, smarter action lanes, details panel, notes, CSV export.
- Bottom-right floating search and scroll controls with a quick search overlay for jumping directly to records.
- Cleaner product navigation keeps Command, Advisor, Weekly Review, Tenders, Projects, and Reports visible while specialist modules sit inside a compact Rooms launcher.
- Top navigation now separates daily work into Tenders, Tenders Insights, Projects, and Project Insights, with no All tab and no combined records pill.
- Each main section is scoped to its own content so tender records, tender analytics, project records, and project analytics do not mix.
- Quick search follows the current section, so tender pages search tender/EOI records and project pages search project records.
- Commercial and seat-billing material contained inside the dedicated Membership Model page, priced globally at USD 5/user/month.
- Tenders and Projects are operational trackers only: commercial values, pricing, and negotiation money stay out of frontline worklists and live inside Insights, Forecast, Contracts, Reports, Advisor, and management rooms.
- Monthly and annual prepaid billing views, with annual showing a two-month saving.
- Admin-managed section access for each user across Command, Advisor, Weekly Review, Intake, Import, Governance, Bid Desk, Calendar, Risk, Tenders, Tenders Insights, Projects, Project Insights, Forecast, Clients, Contracts, Documents, Reminders, and Reports.
- New users now default to operational tracker access only, while admins can deliberately add Insights, Forecast, Contracts, Reports, Governance, Import, or Documents access.
- Dedicated admin-only Membership Model page beside the admin account control, with subscription builder, plan selection, seat calculator, user access control, request preview, plan comparison, and billing FAQ cards.
- Membership access blueprints show Operations User, Pursuit Manager, and Control Admin templates so buyers can understand who should see operational, commercial, and governance rooms.
- Admins can apply those access templates directly to users from the Membership access table, with changes written into the audit trail.
- Admins can preview any non-admin user's workspace from Membership, seeing the exact enabled navigation and access profile with a clear Exit Preview control.
- Membership Model is no longer grantable to editors or viewers; it appears only for company admins and is blocked by the same access guard if a non-admin tries to open it directly.
- Command cockpit dark cards now use contrast-safe foreground colors so teal, blue, and amber boards remain readable.
- Command Center analytics now start directly below the pulse cards inside the main command column, removing the large blank gap caused by the taller right-side brief panel.
- Operating cards now follow a unified soft status-color system inspired by the Reports Calendar Pressure cards: light red, amber, blue, green, and teal surfaces with strong dark text.
- Command Center includes a Signal Legend so users understand critical, decision, evidence, healthy, and active card colors consistently across the product.
- Demo Editor now starts as an operations-only user for realistic frontline testing, while Admin keeps full workspace access.
- Platform roadmap section showing how PursuitDesk can grow into future modules for contracts, clients, documents, reminders, and reports while keeping tenders and projects as the current foundation.
- Cache-busted asset links so GitHub Pages visitors receive the latest PursuitDesk JavaScript, CSS, sample data, favicon, and logo after upload.
- Main section navigation resets the viewport to the top so Tenders, Projects, Insights, and Membership never open halfway down the page.
- Expanded desktop tracker grid so Tenders and Projects show roughly a working-sheet depth of records before internal table scrolling begins.
- Grid polish with stronger selected-row highlighting, a visible "Showing 1-N of total" range hint, Comfortable/Compact density controls, and a collapsible right detail panel.
- Tracker toolbar uses explicit filter/action rows so density controls, New row, and Export CSV remain visible beside the detail panel.
- Sticky sheet header keeps filters, actions, range hint, and column labels visible while scrolling through the expanded Tenders and Projects grids.
- Sheet/Board mode lets users keep the spreadsheet tracker or switch to a visual operating board, with tender lanes for Active Pipeline, Due Watch, Awarded, and Closed/Regret, plus project lanes for Ongoing, Due Watch, Completed, and Stopped/Regret.
- Timeline mode turns the same Tender and Project records into date lanes for Past Due, This Month, Next 30, Next Quarter, Later, and No Date, making schedule pressure visible without leaving the tracker.
- Action Queue scans the current Tender or Project view and surfaces the top operational next moves for overdue records, due-watch items, missing dates, owner gaps, category gaps, and reference cleanup.
- Counter fix keeps the command rail and mix panels based on the full current section, so clicking a status filter changes visible rows without resetting the other counter values to zero.
- Bid Desk actions let editors set Bid, Watch, or No-bid, mark submission packs ready, and write those movements into the Governance audit trail.
- Review Calendar adds a rolling eight-week view, urgency lanes, date coverage score, owner diary, client pressure, work-type mix, and quality signals for dated work.
- Risk Control Room generates a risk register from existing records, including critical/high/watch severity, exposure value, owner/client risk concentration, and commercial/data cleanup queues.
- Pursuit Advisor adds a decision layer above the control rooms, with do-now, decide, schedule, commercial, forecast, and clean-data lanes plus value touched, source signal mix, owner focus, client focus, and a management review playbook.
- Weekly Review Room adds meeting cadence over the product, converting Advisor recommendations into timed agenda blocks, action rows, decision cards, owner workload, source mix, and review closeout discipline.
- Intake conversion turns clean requests into live Tender, EOI, or Project records with source marked as Intake Desk and full audit logging.
- Import governance keeps new CSV rows out of the live workspace until references, core fields, duplicates, source sheet, status, and value parsing have been reviewed in the preview grid.
- Governance audit logging captures imports, manual row creation, key record edits, deletes, user creation, role updates, section-access changes, and high-value review approvals.
- Smart Record Brief appears inside the right detail panel for selected tracker records, showing health score, readiness, due signal, owner/category coverage, missing data, next move, and a short operating line.
- Client Memory appears at the top of the selected-record detail panel, summarizing account history across tenders and projects with open work, same-unit count, due-watch signal, latest touch, and clickable related records.
- Clients Portfolio adds a dedicated relationship intelligence page with account cards, active/open work signals, due-watch pressure, value exposure, related latest-record links, and a roadmap strip toward Contracts, Documents, Reminders, and Reports.
- Contracts Room adds a commercial control register for agreement numbers, LOA/agreement received flags, award handover, live delivery contracts, contract value, document coverage, and commercial gaps.
- Documents Room adds an evidence register for tender/project document packs, source workbook and sheet coverage, agreement/LOA proof, missing document gaps, and source-record drilldowns.
- Reminders adds a generated follow-up desk with lanes for overdue work, next-30-day pressure, missing data, negotiation reviews, and high-value management reviews, with each reminder linking back to its source record.
- Reports Room adds a printable weekly operating pack with executive summary, tender/project split, follow-up actions, client concentration, value exposure, due radar, and meeting checklist.

## Production Notes

This is a local browser prototype. A hosted version should move authentication, company isolation, record storage, billing, and audit history into a backend database and API.
