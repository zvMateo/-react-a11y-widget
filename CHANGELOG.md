# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2026-03-06

### Fixed

- **SSR crash in ReadingGuide** — `window.matchMedia` was called during render, causing crashes in server-side environments (Next.js, Remix). Moved to `useEffect`.
- **Pause animations broke the widget** — `html.a11y-pause-animations *` selector now excludes `.ga11y-root` and its children, keeping widget transitions functional.
- **Panel animation direction** — Panels in `top-left` / `top-right` positions now animate downward instead of upward for correct visual feedback.

### Added

- **Focus trap** — The panel now traps keyboard focus when open, preventing tab navigation from escaping the dialog. Focus returns to the first element and cycles correctly with Shift+Tab.
- **`prefers-color-scheme: dark` support** — Widget auto-detects OS dark mode via media query. Previously only supported the `.dark` class on `<html>`. Add `.light` class to `<html>` to force light mode.
- **Store input validation** — `setFontSize()` and `setSaturation()` now clamp values to valid range (0–2), preventing invalid CSS classes when using the store programmatically.

## [1.0.0] - Initial Release

### Added

- Accessibility widget with 9 features: font size, text spacing, dyslexia font, high contrast, highlight links, pause animations, big cursor, reading guide, saturation.
- Zustand store with `localStorage` persistence.
- `useA11y` hook for CSS class synchronization.
- Full i18n support via `labels` prop.
- CSS Custom Properties for theming.
- Dark mode support (`.dark` class).
- Dual ESM/CJS build via tsup.
- TypeScript strict mode with full type exports.
