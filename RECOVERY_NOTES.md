# TenderGrid / PursuitDesk Recovery Notes

Recovered on 2026-06-08 from the local backup at `C:\Users\dhiraj\Documents\GitHub\tendergrid`.

GitHub baseline checked: `dhirajnyse/tendergrid` on `main`, commit `e2d17d791c577eaf5423e50b8b4593d620dc67df` (`PursuitDesk v319 Serenity Handrail`).

The older workspace folders were left untouched:

- `C:\Users\dhiraj\Documents\New project\tendergrid`
- `C:\Users\dhiraj\Documents\New project\tendergrid-github`

Recovery cleanup in this copy:

- Replaced stale Heavyster package metadata with PursuitDesk/TenderGrid metadata.
- Replaced the stale Heavyster static check with a PursuitDesk v319 health check.
- Updated `index.html` cache tokens to `v319`.
- Updated `site.webmanifest` to PursuitDesk.
- Fixed the local static server so `/` serves `index.html` correctly on Windows.
- Removed the bad root-level `sample-data.js`; the app uses `data/sample-data.js`.
- v320 adds a Command Center Continuity Guard so the recovered baseline, health check, run path, and next-safe-build line stay visible inside the product.
- v321 adds a World Demo Script so the recovered baseline, live records, captured value, evidence health, and routed actions can be shown as one copy-ready buyer story.
- v322 adds a Pilot Close Packet so Command Center can convert the demo story into a sponsor-ready pilot ask, value case, decision gate, and copy-ready close note.
- v323 adds a Pilot Launch Board so an accepted sponsor ask turns into kickoff, workbook, access, owner, proof, and day-30 renewal control.
- v324 adds a Learning Loop Board so local actions become tenant-approved learning, privacy-filtered signals, and anonymized cross-organization playbooks without exposing client data.
