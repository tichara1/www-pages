# Évora — F1 reimplementation (design)

Date: 2026-04-29
Scope: Phase 1 of a phased reimplementation of the Évora date-planning prototype, located at `docs/date/src/`. The prototype at `docs/date/prototype/` stays untouched as reference.

## Goals

Replace the two monolithic prototype files (`app.jsx` ~40 KB, `app-cz.jsx` ~75 KB) with a structured, multi-file zero-build app, unify CZ and EN into a single app with a runtime language switch, and ship the following user-facing features:

1. Persistence of draft, history, and favorites in `localStorage`.
2. CZ/EN language switch in the UI.
3. Curated library of ~30 fictional places with filtering, favoriting, and selection inside the config flow.
4. Calendar export (`.ics` download).
5. Invitation export as a PNG with a QR code that links back to a read-only shared view.
6. Read-only "shared invite" view via URL hash (`#s=…`).

Out of scope (deferred to F2): collaborative voting / merging two independent drafts, "Surprise me" generator, offline/PWA, notifications, accounts/backend.

## Non-goals

- Build tooling (Webpack, Vite, npm). The repo is zero-build by design (CLAUDE.md). All deps load from CDN at runtime.
- Automated test framework. F1 ships a manual testing checklist instead.
- Backwards compatibility with prototype `localStorage` data (none exists).

## Architecture

### File structure

```
docs/date/src/
├── index.html
├── css/
│   └── styles.css
├── lib/
│   ├── tokens.js
│   ├── i18n.js
│   ├── i18n/
│   │   ├── cs.js
│   │   └── en.js
│   ├── store.js
│   ├── share.js
│   ├── ics.js
│   ├── canvas-invite.js
│   └── ios-frame.jsx
├── data/
│   └── places.js
├── ui/
│   ├── primitives.jsx
│   ├── olive-branch.jsx
│   └── lang-switch.jsx
├── screens/
│   ├── entry.jsx
│   ├── couple.jsx
│   ├── mode.jsx
│   ├── config.jsx
│   ├── summary.jsx
│   ├── surprise.jsx
│   ├── confirmed.jsx
│   ├── places.jsx
│   ├── history.jsx
│   └── app.jsx
└── TESTING.md
```

### Namespace convention

Every non-component module exposes its public surface on `window.Evora.*` (single namespace, no flat globals beyond `IOSDevice`/`IOSStatusBar` from the existing `ios-frame.jsx` which is unchanged).

Examples:
- `window.Evora.C`, `window.Evora.F` — design tokens
- `window.Evora.t`, `window.Evora.useLang`, `window.Evora.setLang` — i18n
- `window.Evora.useStore`, `window.Evora.StoreProvider` — state
- `window.Evora.PLACES` — places data
- `window.Evora.buildICS`, `window.Evora.renderInvitePNG`, `window.Evora.encodeShared`, `window.Evora.decodeShared`
- Screens are React components on `window.Evora.Screens.Entry`, etc.

### Script load order in `index.html`

1. CDN: React 18, ReactDOM 18, Babel standalone, qrcode-generator (~4 KB).
2. `lib/tokens.js`, `lib/i18n/cs.js`, `lib/i18n/en.js`, `lib/i18n.js`.
3. `data/places.js`.
4. `lib/store.js`, `lib/share.js`, `lib/ics.js`, `lib/canvas-invite.js`.
5. `lib/ios-frame.jsx`.
6. `ui/primitives.jsx`, `ui/olive-branch.jsx`, `ui/lang-switch.jsx`.
7. `screens/entry.jsx`, `couple.jsx`, `mode.jsx`, `config.jsx`, `summary.jsx`, `surprise.jsx`, `confirmed.jsx`, `places.jsx`, `history.jsx`, `app.jsx`.
8. Inline `<script type="text/babel">` mount script (preserved from prototype, scaling to 402×874).

## State, persistence, i18n

### Store (`lib/store.js`)

Single `useStore()` hook backed by React Context. Shape:

```js
{
  lang: 'cs' | 'en',
  setLang(l),

  screen: 'entry' | 'couple' | 'mode' | 'config' | 'summary'
        | 'surprise' | 'confirmed' | 'places' | 'history',
  go(name),
  back(),

  draft: {
    couple: 'her' | 'him' | 'them' | null,
    mode: 'classic' | 'cozy' | 'adventure' | null,
    config: { dinner:{on,...}, drinks:{on,...}, walk:{on,...}, ... },
    placeIds: { dinner: 'p_12', drinks: 'p_07', ... },
    date: ISOString | null,
  },
  updateDraft(patch),
  resetDraft(),

  history: [{ id, confirmedAt, ...frozenDraft }],
  pushHistory(),
  removeHistoryItem(id),

  favorites: string[],
  toggleFavorite(id),

  sharedView: null | frozenDraft,
  setSharedView(v),
  clearSharedView(),
}
```

### Persistence

- Key: `evora.v1`.
- Persisted slice: `{ lang, draft, history, favorites }`. `screen` and `sharedView` are not persisted.
- Writes are debounced 200 ms inside a `useEffect` watching the persisted slice.
- On read, if JSON.parse fails or shape mismatches, fall back to a clean default state. No migration logic in F1.

### i18n (`lib/i18n.js`)

- Dictionaries are flat dot-keyed objects in `lib/i18n/cs.js` and `lib/i18n/en.js`, each assigning to `window.Evora.I18N[lang]`.
- Public API: `t(key, vars?) → string`. Missing keys return the key itself.
- Interpolation: `t('history.count', { n: 3 })` replaces `{n}` tokens.
- `useLang()` hook subscribes components to the current language and re-renders on switch.
- Default language: `navigator.language.startsWith('cs') ? 'cs' : 'en'`. Persisted per `evora.v1.lang`.
- Switching language does not clear the draft.

### Language switch UI (`ui/lang-switch.jsx`)

A small `CZ | EN` pill placed top-right on the Entry screen and as a row inside Config screen for access during a flow.

## Places library

### Data (`data/places.js`)

`window.Evora.PLACES` is an array of ~30 fictional records. Distribution: ~12 restaurant, ~8 bar, ~5 cafe, ~5 activity. Each record:

```js
{
  id: 'p_01',
  name: { cs: '...', en: '...' },
  category: 'restaurant' | 'bar' | 'cafe' | 'activity',
  desc:  { cs: '...', en: '...' },
  price: '$' | '$$' | '$$$',
  tags:  string[],          // closed set, see below
  durationMin: 60 | 90 | 120,
  timeOfDay: ('morning' | 'afternoon' | 'evening' | 'late')[],
}
```

Closed tag set: `romantic`, `outdoor`, `indoor`, `live-music`, `quiet`, `lively`, `wine`, `cocktails`, `view`, `walk-friendly`.

### Places screen (`screens/places.jsx`)

Reachable from Entry via a "Browse places" link. UI:

- Top bar with back chevron and `Places` title.
- Horizontal chip filter for category: `All | Restaurants | Bars | Cafes | Activities`.
- A `Favorites only` toggle (when reached via the Entry "Favorites" link, this is pre-enabled).
- List of cards: name, price, tags + duration line, short description, heart icon (filled if favorited).
- Tap a card → opens a bottom sheet with full details (no "add to evening" action here).
- Tap heart → `toggleFavorite(id)`.

No search input in F1 (30 records do not justify it).

### Place selection inside Config flow

The existing `BottomSheet` for each enabled section (dinner, drinks, walk, etc.) gains a `Place` field:

```
Place
[ Choose a place ▼ ]
```

Tapping it opens a secondary sheet listing places filtered by the section's natural category (`dinner → restaurant`, `drinks → bar`, `walk → activity`, etc.). Favorites appear at the top. A `Skip — type your own` option keeps the existing free-text fallback.

### History screen (`screens/history.jsx`)

Reachable from Entry via a `History` link, visible only when `history.length > 0`.

- Cards listing each past evening: confirmed date, mode, sequence of place names (or text fallback if no place chosen).
- `↻ Replicate` action copies the entry into `draft` and routes to Summary.
- A small `×` icon removes the entry (`removeHistoryItem(id)`). No undo in F1.

### Entry screen — additions

Below the primary `Begin` CTA, a single line of three muted text links: `Browse places · History · Favorites`. The `History` link is hidden when history is empty.

## Calendar export

### `lib/ics.js`

Public API:

```js
buildICS({ title, start, end, description, location }) → string
```

- Pure string template, RFC-5545 compliant `VCALENDAR` with one `VEVENT`.
- `UID` from `crypto.randomUUID()`.
- Floating local time (`DTSTART:YYYYMMDDTHHMMSS`, no `Z`, no `VTIMEZONE`).
- CRLF line endings; escape `,`, `;`, and newlines in text fields per RFC.
- No external dependencies.

### Trigger in Summary screen

Three actions appear under the timeline:

```
[ Add to Calendar ]
[ Save as Image ]
[ Confirm ]
```

`Add to Calendar` builds a `text/calendar` blob, creates an anchor with `download="evora-evening.ics"`, and clicks it programmatically. iOS Safari surfaces the standard "Add to Calendar" dialog.

### Required date/time

If `draft.date` is unset and the user taps `Add to Calendar` or `Save as Image`, a small bottom sheet asks for date and time using native `<input type="date">` and `<input type="time">`. No custom date picker.

## Invitation export (PNG with QR)

### Strategy

A canvas-based renderer produces a 1080×1350 PNG (Instagram 4:5, also fits as a Story).

### `lib/canvas-invite.js`

Public API:

```js
async renderInvitePNG(state, lang) → Blob
```

Layout, top to bottom:

1. Background `#FBF8F2` (paper).
2. Olive branch redrawn into canvas (port of `OliveBranch` SVG path data into `ctx.bezierCurveTo` calls), thin stroke in `accent` color.
3. Title in Fraunces italic: `An evening, composed` / `Večer, sestavený`. Fallback to `Georgia italic` if the font fails to load.
4. Date and mode line: e.g., `Sat 29 Apr · cozy`, Inter, ink color.
5. Hairline divider.
6. Timeline list: one row per active section, format `19:00  Dinner — U Tří Oliv`.
7. Hairline divider.
8. Footer: small `Évora` wordmark, app URL `tichara1.github.io/www-pages/date/src/`.
9. Bottom-right: 180×180 QR code rendered as `accent`-colored squares on the paper background. Below the QR, small Inter 11px caption: `Open on your phone` / `Otevři v telefonu`.

Before drawing, await `document.fonts.ready` so Fraunces and Inter are available. The QR encodes the full share URL (origin + path + `#s=<encoded>`).

### QR generation

Uses `qrcode-generator` from CDN (~4 KB minified). The library returns the module grid; we draw squares manually so we can match the `accent` color (rather than the default black).

### Trigger in Summary screen

```js
const blob = await Evora.renderInvitePNG(state, lang);
const url = URL.createObjectURL(blob);
const a = Object.assign(document.createElement('a'), {
  href: url, download: 'evora-invite.png',
});
a.click();
URL.revokeObjectURL(url);
await navigator.clipboard.writeText(shareUrl).catch(() => {});
```

After the download, the share URL is also copied to clipboard. A small confirmation row `Share link copied ✓` appears for ~2 seconds. `navigator.share` is intentionally not used (cross-browser flakiness).

### Confirmed screen

`Confirm` triggers `pushHistory()` (freezing `draft` into `history` with `confirmedAt = new Date().toISOString()`) and `resetDraft()`. The Confirmed screen still exposes `Save as Image` and `Add to Calendar` for users who didn't act before confirming.

## Sharing (URL hash, F1 subset)

### `lib/share.js`

Public API:

```js
encodeShared(draft) → string     // base64url(JSON)
decodeShared(string) → draft | null
```

- Encoded fields: `couple`, `mode`, `placeIds`, `date`, `lang`. The `config` object is intentionally excluded for size; the receiver re-derives section toggles from the keys present in `placeIds` and from `mode` defaults.
- Output is base64url (URL-safe, no padding). Decoding catches all errors and returns `null`.

### Read-only shared view

On boot, `screens/app.jsx` checks `window.location.hash`. If it begins with `#s=`, it decodes the payload into `sharedView` (a separate store slice, never written to `draft`).

When `sharedView` is set, the app routes to `summary` with the Summary component switching into a read-only mode (one component, internal flag — not a separate screen name). The Summary component reads from `sharedView` instead of `draft` and replaces the action row with:

```
[ Use this as my draft ]    [ Decline ]
```

`Use this as my draft` copies `sharedView` into `draft`, clears `sharedView`, removes the hash, and re-routes to `summary` (editable). `Decline` clears `sharedView`, removes the hash, and routes to `entry`.

If decoding fails, `sharedView` stays null, the hash is preserved (so the user sees the broken link survived), and the app boots normally to Entry.

Voting / merging two independent drafts is explicitly F2 and not part of this view.

## Routing

`screens/app.jsx` maintains a screen stack as `string[]`.

- `go(name)` pushes; transitions use the existing `screenIn` keyframes from prototype CSS.
- `back()` pops if `stack.length > 1`; no-op otherwise.
- The stack is not persisted. After reload, the app routes to `entry`. Exception: if the URL has a valid `#s=…`, the stack is initialized to `['entry', 'summary']` with `sharedView` set, which puts Summary into its read-only mode.

## Cleanup tasks

The current `docs/date/src/` contains stray copies of the prototype files placed there during an earlier mistake (`app.jsx`, `app-cz.jsx`, `index.html`, `index-en.html`, `ios-frame.jsx`). The first step of the implementation plan is to delete these so F1 starts on a clean directory.

`docs/date/index.html` currently links to `prototype/`. After F1 ships, it should link to `src/` while keeping a smaller secondary link to the prototype for reference.

## Testing

No automated test framework is added. F1 ships `docs/date/src/TESTING.md` with a manual checklist covering at minimum:

1. Cold load in CZ → full flow Entry → Confirmed.
2. Cold load in EN → full flow.
3. Toggle language mid-flow; draft survives, copy updates.
4. Reload mid-flow; draft is restored, screen resets to Entry.
5. Browse places, filter by category, toggle favorite, reload, favorite persists.
6. Pick a place inside Config bottom sheet; appears in Summary timeline.
7. Confirm an evening; appears in History; Replicate restores it as draft.
8. Remove a History entry; gone after reload.
9. `Add to Calendar` from Summary; `.ics` opens in macOS Calendar / iOS Calendar.
10. `Save as Image` from Summary; PNG downloads, fonts render, QR is scannable.
11. Scan QR on a second device; opens read-only Summary; `Use this as my draft` works.
12. Open app with broken `#s=…`; falls back to Entry without crashing.
13. Date/time prompt appears when `Add to Calendar` is tapped without a date.
14. Lang switch persisted across reload.
15. Empty history hides the History link on Entry.

Acceptance criterion: every scenario passes manually before F1 is considered done.

## Known limitations

- No cross-device sync beyond URL/QR handoff.
- No notifications, no offline cache, no service worker.
- No accounts, no backend.
- Voting and merge between two independent drafts deferred to F2.
- Surprise-me generator deferred to F2.
- Single device-frame size (402×874) preserved from prototype.
