# PursuitDesk

A small static MVP for tracking EOI, tenders, negotiations, and ongoing projects in a spreadsheet-style workspace.

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
- Cleaner product navigation keeps Command, Advisor, Weekly Review, Tenders, Projects, Reports, and Membership visible while specialist modules sit inside a compact Rooms launcher.
- Top navigation now separates daily work into Tenders, Tenders Insights, Projects, and Project Insights, with no All tab and no combined records pill.
- Each main section is scoped to its own content so tender records, tender analytics, project records, and project analytics do not mix.
- Quick search follows the current section, so tender pages search tender/EOI records and project pages search project records.
- Commercial and seat-billing material contained inside the dedicated Membership Model page, priced globally at USD 5/user/month.
- Monthly and annual prepaid billing views, with annual showing a two-month saving.
- Admin-managed section access for each user across Command, Advisor, Weekly Review, Intake, Import, Governance, Bid Desk, Calendar, Risk, Tenders, Tenders Insights, Projects, Project Insights, Forecast, Clients, Contracts, Documents, Reminders, Reports, and Membership Model.
- Dedicated Membership Model page with top-level product navigation, subscription builder, plan selection, seat calculator, user access control, request preview, plan comparison, and billing FAQ cards.
- Platform roadmap section showing how PursuitDesk can grow into future modules for contracts, clients, documents, reminders, and reports while keeping tenders and projects as the current foundation.
- Cache-busted asset links so GitHub Pages visitors receive the latest PursuitDesk JavaScript, CSS, sample data, favicon, and logo after upload.
- Main section navigation resets the viewport to the top so Tenders, Projects, Insights, and Membership never open halfway down the page.
- Expanded desktop tracker grid so Tenders and Projects show roughly a working-sheet depth of records before internal table scrolling begins.
- Grid polish with stronger selected-row highlighting, a visible "Showing 1-N of total" range hint, Comfortable/Compact density controls, and a collapsible right detail panel.
- Tracker toolbar uses explicit filter/action rows so density controls, New row, and Export CSV remain visible beside the detail panel.
- Sticky sheet header keeps filters, actions, range hint, and column labels visible while scrolling through the expanded Tenders and Projects grids.
- Sheet/Board mode lets users keep the spreadsheet tracker or switch to a visual operating board, with tender lanes for Active Pipeline, Due Watch, Awarded, and Closed/Regret, plus project lanes for Ongoing, Due Watch, Completed, and Stopped/Regret.
- Timeline mode turns the same Tender and Project records into date lanes for Past Due, This Month, Next 30, Next Quarter, Later, and No Date, making schedule pressure visible without leaving the tracker.
- Action Queue scans the current Tender or Project view and surfaces the top next moves for overdue records, due-watch items, missing dates, missing values, high-value work, and negotiation follow-ups.
- Counter fix keeps the command rail and mix panels based on the full current section, so clicking a status filter changes visible rows without resetting the other counter values to zero.
- Bid Desk actions let editors set Bid, Watch, or No-bid, mark submission packs ready, and write those movements into the Governance audit trail.
- Review Calendar adds a rolling eight-week view, urgency lanes, date coverage score, owner diary, client pressure, work-type mix, and quality signals for dated work.
- Risk Control Room generates a risk register from existing records, including critical/high/watch severity, exposure value, owner/client risk concentration, and commercial/data cleanup queues.
- Pursuit Advisor adds a decision layer above the control rooms, with do-now, decide, schedule, commercial, forecast, and clean-data lanes plus value touched, source signal mix, owner focus, client focus, and a management review playbook.
- Weekly Review Room adds meeting cadence over the product, converting Advisor recommendations into timed agenda blocks, action rows, decision cards, owner workload, source mix, and review closeout discipline.
- Intake conversion turns clean requests into live Tender, EOI, or Project records with source marked as Intake Desk and full audit logging.
- Import governance keeps new CSV rows out of the live workspace until references, core fields, duplicates, source sheet, status, and value parsing have been reviewed in the preview grid.
- Governance audit logging captures imports, manual row creation, key record edits, deletes, user creation, role updates, section-access changes, and high-value review approvals.
- Smart Record Brief appears inside the right detail panel for selected records, showing health score, readiness, due signal, value, negotiation depth, missing data, next move, and a short management line.
- Client Memory appears at the top of the selected-record detail panel, summarizing account history across tenders and projects with open work, same-unit count, value, latest touch, and clickable related records.
- Clients Portfolio adds a dedicated relationship intelligence page with account cards, active/open work signals, due-watch pressure, value exposure, related latest-record links, and a roadmap strip toward Contracts, Documents, Reminders, and Reports.
- Contracts Room adds a commercial control register for agreement numbers, LOA/agreement received flags, award handover, live delivery contracts, contract value, document coverage, and commercial gaps.
- Documents Room adds an evidence register for tender/project document packs, source workbook and sheet coverage, agreement/LOA proof, missing document gaps, and source-record drilldowns.
- Reminders adds a generated follow-up desk with lanes for overdue work, next-30-day pressure, missing data, negotiation reviews, and high-value management reviews, with each reminder linking back to its source record.
- Reports Room adds a printable weekly operating pack with executive summary, tender/project split, follow-up actions, client concentration, value exposure, due radar, and meeting checklist.

## Production Notes

This is a local browser prototype. A hosted version should move authentication, company isolation, record storage, billing, and audit history into a backend database and API.
