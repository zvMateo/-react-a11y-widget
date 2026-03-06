// =============================================================================
// ♿ Accessibility Store — Zustand + localStorage persistence
// =============================================================================

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { A11yStore, A11yState } from "./types";

const INITIAL_STATE: A11yState = {
  fontSize: 0,
  highContrast: false,
  highlightLinks: false,
  pauseAnimations: false,
  dyslexiaFont: false,
  bigCursor: false,
  readingGuide: false,
  textSpacing: false,
  saturation: 0,
};

export const useA11yStore = create<A11yStore>()(
  persist(
    (set, get) => ({
      ...INITIAL_STATE,

      setFontSize: (level) =>
        set({ fontSize: Math.max(0, Math.min(2, Math.round(level))) }),
      toggleHighContrast: () => set((s) => ({ highContrast: !s.highContrast })),
      toggleHighlightLinks: () =>
        set((s) => ({ highlightLinks: !s.highlightLinks })),
      togglePauseAnimations: () =>
        set((s) => ({ pauseAnimations: !s.pauseAnimations })),
      toggleDyslexiaFont: () => set((s) => ({ dyslexiaFont: !s.dyslexiaFont })),
      toggleBigCursor: () => set((s) => ({ bigCursor: !s.bigCursor })),
      toggleReadingGuide: () => set((s) => ({ readingGuide: !s.readingGuide })),
      toggleTextSpacing: () => set((s) => ({ textSpacing: !s.textSpacing })),
      setSaturation: (level) =>
        set({ saturation: Math.max(0, Math.min(2, Math.round(level))) }),

      resetAll: () => set(INITIAL_STATE),

      getActiveCount: () => {
        const s = get();
        let count = 0;
        if (s.fontSize > 0) count++;
        if (s.highContrast) count++;
        if (s.highlightLinks) count++;
        if (s.pauseAnimations) count++;
        if (s.dyslexiaFont) count++;
        if (s.bigCursor) count++;
        if (s.readingGuide) count++;
        if (s.textSpacing) count++;
        if (s.saturation > 0) count++;
        return count;
      },
    }),
    {
      name: "ga-a11y-preferences",
    },
  ),
);
