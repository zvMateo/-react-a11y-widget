// =============================================================================
// ♿ Types — Public API types for @goodapps/react-a11y-widget
// =============================================================================

/** Features that can be enabled/disabled in the widget */
export interface A11yFeatureFlags {
  fontSize?: boolean;
  textSpacing?: boolean;
  dyslexiaFont?: boolean;
  highContrast?: boolean;
  highlightLinks?: boolean;
  pauseAnimations?: boolean;
  bigCursor?: boolean;
  readingGuide?: boolean;
  saturation?: boolean;
}

/** Labels for i18n / customization */
export interface A11yLabels {
  /** Panel title (default: "Accesibilidad") */
  title?: string;
  /** Reset button tooltip (default: "Restablecer todo") */
  reset?: string;
  /** Footer text (default: "Las preferencias se guardan automáticamente") */
  footer?: string;
  /** Close button aria-label (default: "Cerrar") */
  close?: string;
  /** Open panel aria-label (default: "Abrir panel de accesibilidad") */
  openPanel?: string;
  /** Close panel aria-label (default: "Cerrar panel de accesibilidad") */
  closePanel?: string;

  // Feature labels
  fontSize?: string;
  fontSizeDescription?: string;
  fontSizeLevels?: [string, string, string];
  textSpacing?: string;
  textSpacingDescription?: string;
  dyslexiaFont?: string;
  dyslexiaFontDescription?: string;
  highContrast?: string;
  highContrastDescription?: string;
  highlightLinks?: string;
  highlightLinksDescription?: string;
  pauseAnimations?: string;
  pauseAnimationsDescription?: string;
  bigCursor?: string;
  bigCursorDescription?: string;
  readingGuide?: string;
  readingGuideDescription?: string;
  saturation?: string;
  saturationLevels?: [string, string, string];
}

/** Widget position on screen */
export type A11yPosition =
  | "bottom-left"
  | "bottom-right"
  | "top-left"
  | "top-right";

/** Main widget props */
export interface AccessibilityWidgetProps {
  /** Widget position (default: "bottom-left") */
  position?: A11yPosition;
  /** Which features to show (default: all enabled) */
  features?: A11yFeatureFlags;
  /** Custom labels for i18n */
  labels?: A11yLabels;
  /** Additional className for the root container */
  className?: string;
  /** Whether to auto-detect OS reduced motion (default: true) */
  autoDetectMotion?: boolean;
  /** Z-index for the widget (default: 9999) */
  zIndex?: number;
}

/** Internal store state */
export interface A11yState {
  fontSize: number;
  highContrast: boolean;
  highlightLinks: boolean;
  pauseAnimations: boolean;
  dyslexiaFont: boolean;
  bigCursor: boolean;
  readingGuide: boolean;
  textSpacing: boolean;
  saturation: number;
}

/** Store actions */
export interface A11yActions {
  setFontSize: (level: number) => void;
  toggleHighContrast: () => void;
  toggleHighlightLinks: () => void;
  togglePauseAnimations: () => void;
  toggleDyslexiaFont: () => void;
  toggleBigCursor: () => void;
  toggleReadingGuide: () => void;
  toggleTextSpacing: () => void;
  setSaturation: (level: number) => void;
  resetAll: () => void;
  getActiveCount: () => number;
}

export type A11yStore = A11yState & A11yActions;
