# Changelog

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
