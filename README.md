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
- Tender Control Room now uses two major area buttons, Tendering and Projects, with no All tab.
- Clean Insights desk as a top-level button between Tender Control Room and Membership Model, with Tendering and Projects as the two major analytics areas and focused statistics below.
- Commercial and seat-billing material contained inside the dedicated Membership Model page, priced globally in USD.
- Admin-managed section access for each user across Tender Control Room, Insights, and Membership Model.
- Dedicated Membership Model page with top-level Tender Control Room navigation, subscription builder, plan selection, seat calculator, user access control, request preview, plan comparison, and billing FAQ cards.

## Production Notes

This is a local browser prototype. A hosted version should move authentication, company isolation, record storage, billing, and audit history into a backend database and API.
