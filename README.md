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
- Inline table editing for Admin and Editor users.
- Viewer-only role.
- Tender, EOI, and project record types.
- Compact daily-use tracker grid with type/category/owner metadata moved into the title cell to reduce horizontal scrolling.
- Search, status/category/type filters, smarter action lanes, details panel, notes, CSV export.
- Bottom-right floating search and scroll controls with a quick search overlay for jumping directly to records.
- Top navigation now separates daily work into Tenders, Tenders Insights, Projects, and Project Insights, with no All tab and no combined records pill.
- Each main section is scoped to its own content so tender records, tender analytics, project records, and project analytics do not mix.
- Quick search follows the current section, so tender pages search tender/EOI records and project pages search project records.
- Commercial and seat-billing material contained inside the dedicated Membership Model page, priced globally at USD 5/user/month.
- Monthly and annual prepaid billing views, with annual showing a two-month saving.
- Admin-managed section access for each user across Tenders, Tenders Insights, Projects, Project Insights, and Membership Model.
- Dedicated Membership Model page with top-level product navigation, subscription builder, plan selection, seat calculator, user access control, request preview, plan comparison, and billing FAQ cards.
- Platform roadmap section showing how PursuitDesk can grow into future modules for contracts, clients, documents, reminders, and reports while keeping tenders and projects as the current foundation.
- Cache-busted asset links so GitHub Pages visitors receive the latest PursuitDesk JavaScript, CSS, sample data, favicon, and logo after upload.
- Main section navigation resets the viewport to the top so Tenders, Projects, Insights, and Membership never open halfway down the page.
- Expanded desktop tracker grid so Tenders and Projects show roughly a working-sheet depth of records before internal table scrolling begins.

## Production Notes

This is a local browser prototype. A hosted version should move authentication, company isolation, record storage, billing, and audit history into a backend database and API.
