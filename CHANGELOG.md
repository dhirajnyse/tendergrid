# Changelog

## v819 - First Pilot Expansion Rollout Reuse Market Pilot Production Backend Bridge

### Changes Made
- Activated the production backend bridge as the current build.
- Added the bridge from static pilot readiness into data model, auth route, audit log, file storage, migration rehearsal, rollback route, and first-tenant cutover.
- Updated the Build Phase next queue to v820-v822 for migration, auth boundary, and audit storage proof.
- Updated cache tokens, package metadata, minified assets, and static expectations for v819.

### Files Changed
- `app.js`
- `app.min.js`
- `index.html`
- `package.json`
- `scripts/static-check.mjs`
- `CHANGELOG.md`

### Checks Run
- Passed: `node --check .\app.js`
- Passed: `npm.cmd exec terser -- app.js --compress --mangle --output app.min.js`
- Passed: `npm.cmd exec clean-css-cli -- -o styles.min.css styles.css`
- Passed: `node --check .\app.min.js`
- Passed: `npm.cmd run check`
- Passed: desktop visual QA for Command, Autopilot, Reports, and Build Phase.
- Passed: mobile Command visual QA with no document or body horizontal overflow.

### Known Risks
- The backend bridge is still a production-planning room; real database, auth, storage, audit, migration, and rollback implementation remain future work.

## v818 - First Pilot Expansion Rollout Reuse Market Pilot Billing Access Readiness

### Changes Made
- Activated billing access readiness during the batch.
- Added tenant seats, invoice proof, role boundary, checkout route, finance owner, access lock, billing smoke, and readiness closure to the runway.
- Updated cache tokens, package metadata, minified assets, and static expectations for v818.

### Files Changed
- `app.js`
- `app.min.js`
- `index.html`
- `package.json`
- `scripts/static-check.mjs`
- `CHANGELOG.md`

### Checks Run
- Passed: `node --check .\app.js`
- Passed: `npm.cmd exec terser -- app.js --compress --mangle --output app.min.js`
- Passed: `npm.cmd exec clean-css-cli -- -o styles.min.css styles.css`
- Passed: `node --check .\app.min.js`
- Passed: `npm.cmd run check`

### Known Risks
- Billing and access readiness are modeled but not wired to checkout, invoices, role enforcement, or seat reconciliation yet.

## v817 - First Pilot Expansion Rollout Reuse Market Pilot Launch Governance Pack

### Changes Made
- Activated launch governance pack during the batch.
- Added governance acceptance, audit trail, access boundary, rollback approval, sponsor signoff, launch decision, evidence seal, and governance closure.
- Updated cache tokens, package metadata, minified assets, and static expectations for v817.

### Files Changed
- `app.js`
- `app.min.js`
- `index.html`
- `package.json`
- `scripts/static-check.mjs`
- `CHANGELOG.md`

### Checks Run
- Passed: `node --check .\app.js`
- Passed: `npm.cmd exec terser -- app.js --compress --mangle --output app.min.js`
- Passed: `npm.cmd exec clean-css-cli -- -o styles.min.css styles.css`
- Passed: `node --check .\app.min.js`
- Passed: `npm.cmd run check`

### Known Risks
- Governance acceptance is still static-demo proof; signed approvals and persisted audit events are not live.

## v816 - First Pilot Expansion Rollout Reuse Market Pilot Staging Backlog

### Changes Made
- Activated staging backlog during the batch.
- Added staging tasks, test owners, smoke checks, acceptance proof, rollback notes, release gate, blocker burn-down, and staging closure.
- Updated cache tokens, package metadata, minified assets, and static expectations for v816.

### Files Changed
- `app.js`
- `app.min.js`
- `index.html`
- `package.json`
- `scripts/static-check.mjs`
- `CHANGELOG.md`

### Checks Run
- Passed: `node --check .\app.js`
- Passed: `npm.cmd exec terser -- app.js --compress --mangle --output app.min.js`
- Passed: `npm.cmd exec clean-css-cli -- -o styles.min.css styles.css`
- Passed: `node --check .\app.min.js`
- Passed: `npm.cmd run check`

### Known Risks
- Staging backlog is a front-end launch-planning surface and still needs a real staging environment and issue tracker integration.

## v815 - First Pilot Expansion Rollout Reuse Market Pilot Customer Story Room

### Changes Made
- Activated customer story room during the batch.
- Added outcome claim, proof boundary, buyer quote, privacy guard, value proof, support proof, launch narrative, and story closure.
- Updated cache tokens, package metadata, minified assets, and static expectations for v815.

### Files Changed
- `app.js`
- `app.min.js`
- `index.html`
- `package.json`
- `scripts/static-check.mjs`
- `CHANGELOG.md`

### Checks Run
- Passed: `node --check .\app.js`
- Passed: `npm.cmd exec terser -- app.js --compress --mangle --output app.min.js`
- Passed: `npm.cmd exec clean-css-cli -- -o styles.min.css styles.css`
- Passed: `node --check .\app.min.js`
- Passed: `npm.cmd run check`

### Known Risks
- Customer story content is still generated from static demo signals and needs real customer approval before external use.

## v814 - First Pilot Expansion Rollout Reuse Market Pilot Launch QA Issue Wave

### Changes Made
- Activated the pilot launch QA issue wave as the current build.
- Converted launch blockers into a QA issue wave with customer-story, staging, and governance next-build handoffs.
- Kept the v814 Build Phase track and v815-v817 next queue aligned with the release model.
- Updated cache tokens, package metadata, minified assets, and static expectations for v814.

### Files Changed
- `app.js`
- `app.min.js`
- `index.html`
- `package.json`
- `scripts/static-check.mjs`
- `CHANGELOG.md`

### Checks Run
- Passed: `node --check .\app.js`
- Passed: `npm.cmd exec terser -- app.js --compress --mangle --output app.min.js`
- Passed: `npm.cmd exec clean-css-cli -- -o styles.min.css styles.css`
- Passed: `node --check .\app.min.js`
- Passed: `npm.cmd run check`
- Passed: authenticated desktop side-rail visual QA for Command, Autopilot, Reports, and Build Phase.
- Passed: authenticated mobile Command visual QA with no document or body horizontal overflow.

### Known Risks
- The QA issue wave is still a static prototype; production launch issue tracking will need persisted owners, status history, evidence uploads, and audit trails.
- Next-build handoffs are modeled in Build Phase but not yet connected to a live staging or governance system.

## v813 - First Pilot Expansion Rollout Reuse Market Pilot Evidence Export

### Changes Made
- Activated the pilot evidence export stage during the batch.
- Added a release checkpoint for packaging launch proof, readout evidence, support notes, and sponsor-safe export language before launch QA.
- Updated cache tokens, package metadata, minified assets, and static expectations for v813.

### Files Changed
- `app.js`
- `app.min.js`
- `index.html`
- `package.json`
- `scripts/static-check.mjs`
- `CHANGELOG.md`

### Checks Run
- Passed: `node --check .\app.js`
- Passed: `npm.cmd exec terser -- app.js --compress --mangle --output app.min.js`
- Passed: `npm.cmd exec clean-css-cli -- -o styles.min.css styles.css`
- Passed: `node --check .\app.min.js`
- Passed: `npm.cmd run check`

### Known Risks
- Evidence export is currently copy-ready static output; signed files, storage, and retrieval permissions remain future backend work.

## v812 - First Pilot Expansion Rollout Reuse Market Pilot Renewal Trigger

### Changes Made
- Activated the pilot renewal trigger stage during the batch.
- Added a release checkpoint for renewal intent, sponsor thread, outcome proof, support calm, expansion option, and proof repair before evidence export.
- Updated cache tokens, package metadata, minified assets, and static expectations for v812.

### Files Changed
- `app.js`
- `app.min.js`
- `index.html`
- `package.json`
- `scripts/static-check.mjs`
- `CHANGELOG.md`

### Checks Run
- Passed: `node --check .\app.js`
- Passed: `npm.cmd exec terser -- app.js --compress --mangle --output app.min.js`
- Passed: `npm.cmd exec clean-css-cli -- -o styles.min.css styles.css`
- Passed: `node --check .\app.min.js`
- Passed: `npm.cmd run check`

### Known Risks
- Renewal trigger scoring is prototype-derived and still needs real pilot activity, sponsor response, and renewal evidence persistence.

## v811 - First Pilot Expansion Rollout Reuse Market Pilot Support Handoff

### Changes Made
- Activated the pilot support handoff stage during the batch.
- Added a release checkpoint for support owner, escalation route, response promise, rollback support, sponsor note, and first-review coverage.
- Updated cache tokens, package metadata, minified assets, and static expectations for v811.

### Files Changed
- `app.js`
- `app.min.js`
- `index.html`
- `package.json`
- `scripts/static-check.mjs`
- `CHANGELOG.md`

### Checks Run
- Passed: `node --check .\app.js`
- Passed: `npm.cmd exec terser -- app.js --compress --mangle --output app.min.js`
- Passed: `npm.cmd exec clean-css-cli -- -o styles.min.css styles.css`
- Passed: `node --check .\app.min.js`
- Passed: `npm.cmd run check`

### Known Risks
- Support handoff remains demo-state guidance until connected to real support users, SLA timers, and incident history.

## v810 - First Pilot Expansion Rollout Reuse Market Pilot Sponsor Readout

### Changes Made
- Activated the pilot sponsor readout stage during the batch.
- Added a release checkpoint for sponsor score, executive story, value proof, launch control, billing confidence, support calm, and decision ask.
- Updated cache tokens, package metadata, minified assets, and static expectations for v810.

### Files Changed
- `app.js`
- `app.min.js`
- `index.html`
- `package.json`
- `scripts/static-check.mjs`
- `CHANGELOG.md`

### Checks Run
- Passed: `node --check .\app.js`
- Passed: `npm.cmd exec terser -- app.js --compress --mangle --output app.min.js`
- Passed: `npm.cmd exec clean-css-cli -- -o styles.min.css styles.css`
- Passed: `node --check .\app.min.js`
- Passed: `npm.cmd run check`

### Known Risks
- Sponsor readout is static-demo material and still needs a real sponsor response, signed decision receipt, and persisted commercial boundary proof.

## v809 - First Pilot Expansion Rollout Reuse Market Pilot Closeout Pack

### Changes Made
- Activated the pilot closeout pack as the current build.
- Packaged proof archive, decision receipt, risk notes, support lessons, reusable learning, sponsor closeout, and next roadmap.
- Updated the next queue to v810-v812 for the next batch.
- Replaced the heavy command release rail render with a lightweight current-runway summary so Command, Autopilot, and Reports stay responsive.
- Restored Build Phase production blockers and guarded the tracker render path so Build Phase opens reliably.
- Polished the mobile side rail into a two-column calm navigation layout with no internal horizontal scrollbar.
- Updated cache tokens, package metadata, and static expectations for v809.

### Files Changed
- `app.js`
- `app.min.js`
- `index.html`
- `package.json`
- `scripts/static-check.mjs`
- `styles.css`
- `styles.min.css`
- `CHANGELOG.md`

### Checks Run
- Passed: `node --check .\app.js`
- Passed: `node --check .\data\sample-data.js`
- Passed: `npm.cmd exec terser -- app.js --compress --mangle --output app.min.js`
- Passed: `npm.cmd exec clean-css-cli -- -o styles.min.css styles.css`
- Passed: `node --check .\app.min.js`
- Passed: `npm.cmd run check`
- Passed: authenticated desktop visual QA for Command, Autopilot, Reports, and Build Phase.
- Passed: authenticated mobile Command visual QA with no page or rail horizontal overflow.

### Known Risks
- Closeout pack evidence is still static-demo proof; backend audit trails, file archive, and signed sponsor decision receipts remain future production work.
- Build Phase still carries a large historical release archive below the fold; current route rendering is stable, but the archive should be folded into a searchable history in a future batch.

## v808 - First Pilot Expansion Rollout Reuse Market Pilot Expansion Decision Gate

### Changes Made
- Activated the pilot expansion decision gate as the current build.
- Turned learning proof into an explicit open, guarded, hold, or repair decision before next-scope rollout.
- Updated cache tokens, package metadata, and static expectations for v808.

### Files Changed
- `app.js`
- `index.html`
- `package.json`
- `scripts/static-check.mjs`
- `CHANGELOG.md`

### Checks Run
- Passed: `node --check .\app.js`
- Passed: `node --check .\data\sample-data.js`
- Passed: `npm.cmd exec terser -- app.js --compress --mangle --output app.min.js`
- Passed: `npm.cmd exec clean-css-cli -- -o styles.min.css styles.css`
- Passed: `node --check .\app.min.js`
- Passed: `npm.cmd run check`

### Known Risks
- The decision gate is modeled in the static UI; production use will need signed sponsor permission and persisted audit evidence.

## v807 - First Pilot Expansion Rollout Reuse Market Pilot Learning Proof

### Changes Made
- Activated the pilot learning-proof stage as the current build.
- Moved the runway from outcome watching into tenant-safe learning proof.
- Updated cache tokens, package metadata, and static expectations for v807.

### Files Changed
- `app.js`
- `index.html`
- `package.json`
- `scripts/static-check.mjs`
- `CHANGELOG.md`

### Checks Run
- Passed: `node --check .\app.js`
- Passed: `node --check .\data\sample-data.js`
- Passed: `npm.cmd exec terser -- app.js --compress --mangle --output app.min.js`
- Passed: `npm.cmd exec clean-css-cli -- -o styles.min.css styles.css`
- Passed: `node --check .\app.min.js`
- Passed: `npm.cmd run check`

### Known Risks
- Learning proof is still derived from the static sample workspace and must be backed by audited pilot outcomes later.

## v806 - First Pilot Expansion Rollout Reuse Market Pilot Outcome Watch

### Changes Made
- Activated the pilot outcome-watch stage as the current build.
- Moved the release rail from first-review receipt into watched outcome movement.
- Updated cache tokens, package metadata, and static expectations for v806.

### Files Changed
- `app.js`
- `index.html`
- `package.json`
- `scripts/static-check.mjs`
- `CHANGELOG.md`

### Checks Run
- Passed: `node --check .\app.js`
- Passed: `node --check .\data\sample-data.js`
- Passed: `npm.cmd exec terser -- app.js --compress --mangle --output app.min.js`
- Passed: `npm.cmd exec clean-css-cli -- -o styles.min.css styles.css`
- Passed: `node --check .\app.min.js`
- Passed: `npm.cmd run check`

### Known Risks
- Outcome watch scoring is still prototype-derived and does not yet persist real pilot observations.

## v805 - First Pilot Expansion Rollout Reuse Market Pilot First Review Receipt

### Changes Made
- Added the five-stage pilot runway release model for v805-v809.
- Activated v805 as the current build with first-review receipt scoring, signals, render path, release strip, and copyable handoff.
- Made Build Phase derive active pilot runway tracks, phases, and next builds from the release model.
- Added generic pilot runway styling for desktop and mobile.

### Files Changed
- `app.js`
- `styles.css`
- `index.html`
- `package.json`
- `scripts/static-check.mjs`
- `CHANGELOG.md`

### Checks Run
- Passed: `node --check .\app.js`
- Passed: `node --check .\data\sample-data.js`
- Passed: `npm.cmd exec terser -- app.js --compress --mangle --output app.min.js`
- Passed: `npm.cmd exec clean-css-cli -- -o styles.min.css styles.css`
- Passed: `node --check .\app.min.js`
- Passed: `npm.cmd run check`

### Known Risks
- The new runway rooms are powered by static prototype scoring; they still need backend persistence before real customer pilot data is used.
