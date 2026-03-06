// =============================================================================
// ♿ @goodapps/react-a11y-widget — Public API
// =============================================================================

// Main component
export { AccessibilityWidget } from "./widget";

// Hook (for custom integrations)
export { useA11y } from "./hook";

// Store (for advanced usage / external control)
export { useA11yStore } from "./store";

// Types
export type {
  AccessibilityWidgetProps,
  A11yFeatureFlags,
  A11yLabels,
  A11yPosition,
  A11yState,
  A11yActions,
  A11yStore,
} from "./types";
