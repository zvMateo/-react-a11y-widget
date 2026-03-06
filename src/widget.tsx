// =============================================================================
// ♿ AccessibilityWidget — Main widget component
// =============================================================================

import React, { useState, useCallback, useRef, useEffect } from "react";
import type {
  AccessibilityWidgetProps,
  A11yFeatureFlags,
  A11yLabels,
} from "./types";
import { useA11yStore } from "./store";
import { useA11y } from "./hook";
import { cn } from "./utils";
import { OptionToggle } from "./components/OptionToggle";
import { OptionStepper } from "./components/OptionStepper";
import { ReadingGuide } from "./components/ReadingGuide";
import {
  IconAccessibility,
  IconType,
  IconSpace,
  IconBook,
  IconEye,
  IconLink,
  IconPause,
  IconCursor,
  IconScan,
  IconDroplets,
  IconX,
  IconReset,
} from "./components/Icons";

// =============================================================================
// Default labels (Spanish — override via `labels` prop for i18n)
// =============================================================================

const DEFAULT_LABELS: Required<A11yLabels> = {
  title: "Accesibilidad",
  reset: "Restablecer todo",
  footer: "Las preferencias se guardan automáticamente",
  close: "Cerrar",
  openPanel: "Abrir panel de accesibilidad",
  closePanel: "Cerrar panel de accesibilidad",
  fontSize: "Tamaño de fuente",
  fontSizeDescription: "Ajustar tamaño del texto",
  fontSizeLevels: ["Normal", "Grande", "Extra grande"],
  textSpacing: "Separación de texto",
  textSpacingDescription: "Mayor espacio entre letras y líneas",
  dyslexiaFont: "Fuente para dislexia",
  dyslexiaFontDescription: "Tipografía legible para dislexia",
  highContrast: "Alto contraste",
  highContrastDescription: "Mejora la diferencia entre colores",
  highlightLinks: "Resaltar enlaces",
  highlightLinksDescription: "Subraya y colorea todos los links",
  pauseAnimations: "Pausar animaciones",
  pauseAnimationsDescription: "Detiene movimientos y transiciones",
  bigCursor: "Cursor grande",
  bigCursorDescription: "Aumenta el tamaño del puntero",
  readingGuide: "Guía de lectura",
  readingGuideDescription: "Línea horizontal que sigue al cursor",
  saturation: "Saturación",
  saturationLevels: ["Normal", "Baja (grises)", "Alta (vívido)"],
};

const ALL_FEATURES: Required<A11yFeatureFlags> = {
  fontSize: true,
  textSpacing: true,
  dyslexiaFont: true,
  highContrast: true,
  highlightLinks: true,
  pauseAnimations: true,
  bigCursor: true,
  readingGuide: true,
  saturation: true,
};

// =============================================================================
// Position helpers
// =============================================================================

const POSITION_CLASSES: Record<string, string> = {
  "bottom-left": "ga11y-root--bl",
  "bottom-right": "ga11y-root--br",
  "top-left": "ga11y-root--tl",
  "top-right": "ga11y-root--tr",
};

const PANEL_CLASSES: Record<string, string> = {
  "bottom-left": "ga11y-panel--bl",
  "bottom-right": "ga11y-panel--br",
  "top-left": "ga11y-panel--tl",
  "top-right": "ga11y-panel--tr",
};

// =============================================================================
// Component
// =============================================================================

export const AccessibilityWidget: React.FC<AccessibilityWidgetProps> = ({
  position = "bottom-left",
  features: featuresProp,
  labels: labelsProp,
  className,
  autoDetectMotion = true,
  zIndex = 9999,
}) => {
  // Merge defaults
  const features = { ...ALL_FEATURES, ...featuresProp };
  const labels = { ...DEFAULT_LABELS, ...labelsProp };

  // Hook syncs store → DOM classes
  useA11y(autoDetectMotion);

  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const store = useA11yStore();
  const activeCount = store.getActiveCount();

  const toggle = useCallback(() => setIsOpen((p) => !p), []);
  const close = useCallback(() => setIsOpen(false), []);

  // Close on Escape
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) close();
    };
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, [isOpen, close]);

  // Close on click outside
  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (
        isOpen &&
        panelRef.current &&
        !panelRef.current.contains(e.target as Node)
      ) {
        close();
      }
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [isOpen, close]);

  // Focus trap inside the panel
  useEffect(() => {
    if (!isOpen || !panelRef.current) return;

    const panel = panelRef.current;
    const focusable = panel.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    const trap = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    first.focus();
    panel.addEventListener("keydown", trap);
    return () => panel.removeEventListener("keydown", trap);
  }, [isOpen]);

  return (
    <div
      ref={panelRef}
      className={cn("ga11y-root", POSITION_CLASSES[position], className)}
      style={{ zIndex }}
    >
      {/* FAB */}
      <button
        onClick={toggle}
        className={cn("ga11y-fab", isOpen && "ga11y-fab--open")}
        aria-label={isOpen ? labels.closePanel : labels.openPanel}
        aria-expanded={isOpen}
      >
        <IconAccessibility className="ga11y-fab__icon" />
        {activeCount > 0 && (
          <span className="ga11y-fab__badge">{activeCount}</span>
        )}
      </button>

      {/* Panel */}
      {isOpen && (
        <div
          className={cn("ga11y-panel", PANEL_CLASSES[position])}
          role="dialog"
          aria-label={labels.title}
        >
          {/* Header */}
          <div className="ga11y-panel__header">
            <div className="ga11y-panel__title-group">
              <IconAccessibility className="ga11y-icon" />
              <h2 className="ga11y-panel__title">{labels.title}</h2>
            </div>
            <div className="ga11y-panel__actions">
              <button
                onClick={() => store.resetAll()}
                className="ga11y-panel__btn"
                aria-label={labels.reset}
                title={labels.reset}
              >
                <IconReset className="ga11y-icon--sm" />
              </button>
              <button
                onClick={close}
                className="ga11y-panel__btn"
                aria-label={labels.close}
              >
                <IconX className="ga11y-icon--sm" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="ga11y-panel__content">
            {features.fontSize && (
              <OptionStepper
                icon={IconType}
                label={labels.fontSize!}
                value={store.fontSize}
                max={2}
                labels={[...labels.fontSizeLevels!]}
                onChange={store.setFontSize}
              />
            )}
            {features.textSpacing && (
              <OptionToggle
                icon={IconSpace}
                label={labels.textSpacing!}
                description={labels.textSpacingDescription!}
                active={store.textSpacing}
                onToggle={store.toggleTextSpacing}
              />
            )}
            {features.dyslexiaFont && (
              <OptionToggle
                icon={IconBook}
                label={labels.dyslexiaFont!}
                description={labels.dyslexiaFontDescription!}
                active={store.dyslexiaFont}
                onToggle={store.toggleDyslexiaFont}
              />
            )}
            {features.highContrast && (
              <OptionToggle
                icon={IconEye}
                label={labels.highContrast!}
                description={labels.highContrastDescription!}
                active={store.highContrast}
                onToggle={store.toggleHighContrast}
              />
            )}
            {features.highlightLinks && (
              <OptionToggle
                icon={IconLink}
                label={labels.highlightLinks!}
                description={labels.highlightLinksDescription!}
                active={store.highlightLinks}
                onToggle={store.toggleHighlightLinks}
              />
            )}
            {features.pauseAnimations && (
              <OptionToggle
                icon={IconPause}
                label={labels.pauseAnimations!}
                description={labels.pauseAnimationsDescription!}
                active={store.pauseAnimations}
                onToggle={store.togglePauseAnimations}
              />
            )}
            {features.bigCursor && (
              <OptionToggle
                icon={IconCursor}
                label={labels.bigCursor!}
                description={labels.bigCursorDescription!}
                active={store.bigCursor}
                onToggle={store.toggleBigCursor}
              />
            )}
            {features.readingGuide && (
              <OptionToggle
                icon={IconScan}
                label={labels.readingGuide!}
                description={labels.readingGuideDescription!}
                active={store.readingGuide}
                onToggle={store.toggleReadingGuide}
              />
            )}
            {features.saturation && (
              <OptionStepper
                icon={IconDroplets}
                label={labels.saturation!}
                value={store.saturation}
                max={2}
                labels={[...labels.saturationLevels!]}
                onChange={store.setSaturation}
              />
            )}
          </div>

          {/* Footer */}
          <div className="ga11y-panel__footer">
            <span>{labels.footer}</span>
          </div>
        </div>
      )}

      {/* Reading Guide Overlay */}
      {store.readingGuide && features.readingGuide && (
        <ReadingGuide zIndex={zIndex - 1} />
      )}
    </div>
  );
};

AccessibilityWidget.displayName = "AccessibilityWidget";
