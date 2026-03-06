// =============================================================================
// ♿ useA11y — Syncs store state to CSS classes on <html>
// =============================================================================

import { useEffect } from "react";
import { useA11yStore } from "./store";

const FONT_SIZE_CLASSES = ["", "a11y-font-lg", "a11y-font-xl"] as const;
const SATURATION_CLASSES = [
  "",
  "a11y-saturation-low",
  "a11y-saturation-high",
] as const;

/**
 * Hook that synchronizes the accessibility store with CSS classes on `<html>`.
 *
 * @param autoDetectMotion - If `true`, auto-enables "pause animations"
 *   when the OS has `prefers-reduced-motion: reduce`. Default: `true`.
 */
export const useA11y = (autoDetectMotion = true) => {
  const {
    fontSize,
    highContrast,
    highlightLinks,
    pauseAnimations,
    dyslexiaFont,
    bigCursor,
    readingGuide,
    textSpacing,
    saturation,
  } = useA11yStore();

  const togglePauseAnimations = useA11yStore((s) => s.togglePauseAnimations);

  // Auto-detect OS reduced motion preference on mount
  useEffect(() => {
    if (!autoDetectMotion) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches && !pauseAnimations) {
      togglePauseAnimations();
    }
    // Only on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync classes to <html>
  useEffect(() => {
    const root = document.documentElement;

    // Font size
    FONT_SIZE_CLASSES.forEach((cls) => cls && root.classList.remove(cls));
    const fontClass = FONT_SIZE_CLASSES[fontSize];
    if (fontClass) root.classList.add(fontClass);

    // Saturation
    SATURATION_CLASSES.forEach((cls) => cls && root.classList.remove(cls));
    const satClass = SATURATION_CLASSES[saturation];
    if (satClass) root.classList.add(satClass);

    // Boolean toggles
    const toggleMap: Record<string, boolean> = {
      "a11y-high-contrast": highContrast,
      "a11y-highlight-links": highlightLinks,
      "a11y-pause-animations": pauseAnimations,
      "a11y-dyslexia-font": dyslexiaFont,
      "a11y-big-cursor": bigCursor,
      "a11y-reading-guide": readingGuide,
      "a11y-text-spacing": textSpacing,
    };

    Object.entries(toggleMap).forEach(([cls, active]) => {
      root.classList.toggle(cls, active);
    });
  }, [
    fontSize,
    highContrast,
    highlightLinks,
    pauseAnimations,
    dyslexiaFont,
    bigCursor,
    readingGuide,
    textSpacing,
    saturation,
  ]);
};
