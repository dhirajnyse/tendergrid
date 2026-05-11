# TenderGrid

A small static MVP for tracking EOI, tenders, negotiations, and ongoing projects in a spreadsheet-style workspace.

## Brand

- Product name: TenderGrid
- Tagline: Track every bid from EOI to award.
- 3D logo asset: `assets/tendergrid-logo-3d.png`
- UI direction: compact operations workspace with a tender-control header, quick KPIs, editable grid, mobile record cards, signal rail, and record detail panel.

## Demo Login

- `admin@tendergrid.app` / `demo123`
- `editor@tendergrid.app` / `demo123`
- `viewer@tendergrid.app` / `demo123`

## What Is Included

- Company-scoped records seeded from the two supplied Excel workbooks.
- Inline table editing for Admin and Editor users.
- Viewer-only role.
- Tender, EOI, and project record types.
- Compact daily-use tracker grid with type/category/owner metadata moved into the title cell to reduce horizontal scrolling.
- Search, status/category/type filters, smarter action lanes, details panel, notes, CSV export.
- Bottom-right floating search and scroll controls with a quick search overlay for jumping directly to records.
- Top navigation now separates daily work into Tenders, Tender Insights, Projects, and Project Insights, with no All tab and no combined records pill.
- Each main section is scoped to its own content so tender records, tender analytics, project records, and project analytics do not mix.
- Commercial and seat-billing material contained inside the dedicated Membership Model page, priced globally at USD 5/user/month.
- Monthly and annual prepaid billing views, with annual showing a two-month saving.
- Admin-managed section access for each user across Tenders, Tender Insights, Projects, Project Insights, and Membership Model.
- Dedicated Membership Model page with top-level Tender Control Room navigation, subscription builder, plan selection, seat calculator, user access control, request preview, plan comparison, and billing FAQ cards.

## Production Notes

This is a local browser prototype. A hosted version should move authentication, company isolation, record storage, billing, and audit history into a backend database and API.
