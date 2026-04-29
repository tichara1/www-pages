# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

A GitHub Pages static site hosted at `tichara1.github.io/www-pages/`. It contains interactive mobile app UI prototypes — no build step, no package manager, no bundler.

## Development

Open any `.html` file directly in a browser — there is nothing to install or build. All dependencies (React 18, Babel standalone) are loaded from CDN at runtime.

To serve locally with live-reload, any static server works:
```
npx serve docs
# or
python3 -m http.server 8080 --directory docs
```

## Architecture

**Zero-build stack:** JSX files are loaded as `<script type="text/babel">` and transpiled in the browser by Babel standalone. This means edits to `.jsx` files are reflected immediately on page reload — no compile step.

**Component/global injection pattern:** `ios-frame.jsx` renders iOS device chrome and assigns components to `window` (`IOSDevice`, `IOSStatusBar`, etc.). App JSX files assign their root component to `window.App`. The inline `<script>` at the bottom of each HTML file reads from `window` to mount the app. Script load order in the HTML is significant.

**Two prototypes:**
- `docs/` — Reserve Fitness: a fitness class booking app with three roles (customer, trainer, admin). State is managed via a single `useStore` hook with `localStorage` persistence (`reserve.v1`). Role-specific screens live in `customer.jsx`, `trainer.jsx`, `admin.jsx`; shared UI in `shared.jsx` and `map.jsx`.
- `docs/date/prototype/` — Évora: a date-planning app. `app.jsx` is the English version; `app-cz.jsx` is the Czech version. Both use a flat screen-stack router (`go(screenName)` / `back()`). Design tokens are defined at the top of each app file (`C` for colors, `F` for fonts).

**Responsive scaling:** The HTML mount script reads viewport dimensions and applies a CSS `scale()` transform to fit the 402×874 iOS device frame within the window.
