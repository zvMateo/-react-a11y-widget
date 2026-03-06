# @goodapps/react-a11y-widget

> Widget de accesibilidad para React — personalizable, persistente y listo para producción.

Un componente flotante que agrega **9 herramientas de accesibilidad** a cualquier aplicación React. Las preferencias del usuario se guardan automáticamente en `localStorage` y se aplican como clases CSS en `<html>`, haciendo tu app más inclusiva sin esfuerzo.

![React](https://img.shields.io/badge/React-%E2%89%A518-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue?logo=typescript)
![License](https://img.shields.io/badge/License-MIT-green)

---

## ✨ Features

| Feature                  | Descripción                                         |
| ------------------------ | --------------------------------------------------- |
| **Tamaño de fuente**     | 3 niveles: Normal → Grande → Extra grande           |
| **Separación de texto**  | Aumenta `letter-spacing` y `line-height`            |
| **Fuente para dislexia** | Activa OpenDyslexic (cargada auto. via CDN)         |
| **Alto contraste**       | Fuerza fondo negro + texto blanco + bordes          |
| **Resaltar enlaces**     | Subraya y colorea todos los `<a>` visibles          |
| **Pausar animaciones**   | Inyecta `* { animation: none !important }`          |
| **Cursor grande**        | Agranda el puntero del mouse                        |
| **Guía de lectura**      | Línea horizontal que sigue al cursor (solo desktop) |
| **Saturación**           | 3 niveles: Normal → Gris → Vívido                   |

Extras:

- **Persistencia automática** — las preferencias se guardan en `localStorage`.
- **Auto-detección** — detecta `prefers-reduced-motion` del SO.
- **Touch-aware** — la guía de lectura se oculta en dispositivos táctiles.
- **Dark mode** — soporte nativo para la clase `.dark` en `<html>`.
- **i18n** — todos los textos son customizables via prop `labels`.
- **Accesible** — ARIA labels, foco con teclado, cierre con Escape.
- **Zero dependencies** — solo peer deps: `react`, `react-dom`, `zustand`.
- **SSR-safe** — incluye banner `"use client"` para Next.js / RSC.

---

## 📦 Instalación

```bash
# pnpm (recomendado)
pnpm add @_goodapps/react-a11y-widget zustand

# npm
npm install @_goodapps/react-a11y-widget zustand

# bun
bun add @_goodapps/react-a11y-widget zustand
```

> `zustand` es peer dependency. Si ya lo tenés instalado, no es necesario agregarlo de nuevo.

---

## 🚀 Uso Básico

```tsx
import { AccessibilityWidget } from "@goodapps/react-a11y-widget";
import "@goodapps/react-a11y-widget/styles";

function App() {
  return (
    <>
      <YourApp />
      <AccessibilityWidget />
    </>
  );
}
```

Eso es todo. El widget aparece como un botón flotante en la esquina inferior izquierda. Al hacer clic se abre un panel con todas las opciones.

---

## ⚙️ Props

```tsx
interface AccessibilityWidgetProps {
  /** Posición del widget (default: "bottom-left") */
  position?: "bottom-left" | "bottom-right" | "top-left" | "top-right";

  /** Features a mostrar — por defecto todas activas */
  features?: A11yFeatureFlags;

  /** Labels customizables para i18n */
  labels?: A11yLabels;

  /** Clase CSS adicional en el contenedor root */
  className?: string;

  /** Auto-detectar prefers-reduced-motion del SO (default: true) */
  autoDetectMotion?: boolean;

  /** Z-index del widget (default: 9999) */
  zIndex?: number;
}
```

### `features` — Mostrar/ocultar opciones

```tsx
<AccessibilityWidget
  features={{
    fontSize: true,
    textSpacing: true,
    dyslexiaFont: true,
    highContrast: true,
    highlightLinks: true,
    pauseAnimations: true,
    bigCursor: true,
    readingGuide: true,
    saturation: true,
  }}
/>
```

Pasá `false` en cualquier feature para ocultarla. Por ejemplo, para mostrar solo las opciones de texto:

```tsx
<AccessibilityWidget
  features={{
    fontSize: true,
    textSpacing: true,
    dyslexiaFont: true,
    highContrast: false,
    highlightLinks: false,
    pauseAnimations: false,
    bigCursor: false,
    readingGuide: false,
    saturation: false,
  }}
/>
```

### `labels` — Internacionalización (i18n)

Todos los textos del widget son customizables. Pasá un objeto parcial y solo se sobreescribirán los textos que incluyas:

```tsx
<AccessibilityWidget
  labels={{
    title: "Accessibility",
    reset: "Reset all",
    footer: "Preferences are saved automatically",
    close: "Close",
    openPanel: "Open accessibility panel",
    closePanel: "Close accessibility panel",

    fontSize: "Font Size",
    fontSizeDescription: "Adjust text size",
    fontSizeLevels: ["Normal", "Large", "Extra Large"],
    textSpacing: "Text Spacing",
    textSpacingDescription: "Increase letter and line spacing",
    dyslexiaFont: "Dyslexia Font",
    dyslexiaFontDescription: "Use a more readable typeface",
    highContrast: "High Contrast",
    highContrastDescription: "Improve color differentiation",
    highlightLinks: "Highlight Links",
    highlightLinksDescription: "Underline and color all links",
    pauseAnimations: "Pause Animations",
    pauseAnimationsDescription: "Stop movements and transitions",
    bigCursor: "Big Cursor",
    bigCursorDescription: "Enlarge the mouse pointer",
    readingGuide: "Reading Guide",
    readingGuideDescription: "Horizontal line following the cursor",
    saturation: "Saturation",
    saturationLevels: ["Normal", "Low (grayscale)", "High (vivid)"],
  }}
/>
```

### `position` — Posición del widget

```tsx
<AccessibilityWidget position="bottom-right" />
<AccessibilityWidget position="top-left" />
<AccessibilityWidget position="top-right" />
```

---

## 🎨 Theming (CSS Variables)

El widget usa **CSS Custom Properties** prefijadas con `--ga11y-`. Sobreescribirlas permite adaptar la apariencia a tu brand sin tocar una sola línea de JS:

```css
:root {
  /* Core colors */
  --ga11y-primary: #172c3f;
  --ga11y-primary-fg: #ffffff;
  --ga11y-bg: #ffffff;
  --ga11y-fg: #0f172a;
  --ga11y-muted: #f1f5f9;
  --ga11y-muted-fg: #64748b;
  --ga11y-border: #e2e8f0;
  --ga11y-ring: #009ee3;

  /* Panel */
  --ga11y-panel-bg: rgba(255, 255, 255, 0.95);
  --ga11y-panel-backdrop: blur(12px);
  --ga11y-panel-shadow: 0 24px 64px rgba(0, 0, 0, 0.15);
  --ga11y-panel-radius: 1rem;
  --ga11y-panel-width: 320px;
  --ga11y-panel-max-height: 70vh;

  /* FAB (Floating Action Button) */
  --ga11y-fab-size: 48px;
  --ga11y-fab-radius: 50%;
  --ga11y-fab-shadow: 0 4px 14px rgba(0, 0, 0, 0.2);

  /* Options */
  --ga11y-option-radius: 0.75rem;
  --ga11y-option-active-bg: rgba(23, 44, 63, 0.08);
  --ga11y-option-active-border: rgba(23, 44, 63, 0.25);

  /* Toggle */
  --ga11y-toggle-bg: rgba(100, 116, 139, 0.25);
  --ga11y-toggle-active-bg: var(--ga11y-primary);

  /* Typography */
  --ga11y-font: inherit;
  --ga11y-font-sm: 0.875rem;
  --ga11y-font-xs: 0.75rem;
  --ga11y-font-2xs: 0.6875rem;
}
```

### Dark Mode

El CSS incluye overrides automáticos para la clase `.dark` en tu `<html>` o `<body>`:

```css
/* Ya incluido en los estilos — solo agregá .dark a tu <html> */
.dark {
  --ga11y-primary: #009ee3;
  --ga11y-bg: #172c3f;
  --ga11y-fg: #f8fafc;
  --ga11y-panel-bg: rgba(23, 44, 63, 0.95);
  /* ... */
}
```

### Ejemplo: Brand verde

```css
:root {
  --ga11y-primary: #16a34a;
  --ga11y-ring: #22c55e;
  --ga11y-option-active-bg: rgba(22, 163, 74, 0.08);
  --ga11y-option-active-border: rgba(22, 163, 74, 0.25);
}
```

---

## 🔧 Uso Avanzado

### Hook: `useA11y`

Este hook sincroniza el store con clases CSS en `<html>`. Se llama automáticamente dentro del widget, pero podés usarlo por separado si necesitás un layout custom:

```tsx
import { useA11y } from "@goodapps/react-a11y-widget";

function MyCustomLayout() {
  useA11y(); // Sincroniza las clases de accesibilidad

  return <div>...</div>;
}
```

### Store: `useA11yStore`

Acceso directo al store de Zustand para controlar las opciones programáticamente:

```tsx
import { useA11yStore } from "@goodapps/react-a11y-widget";

function MyToggle() {
  const { highContrast, toggleHighContrast, getActiveCount } = useA11yStore();

  return (
    <div>
      <p>Opciones activas: {getActiveCount()}</p>
      <button onClick={toggleHighContrast}>
        {highContrast ? "Desactivar" : "Activar"} alto contraste
      </button>
    </div>
  );
}
```

### Acciones disponibles en el store

```tsx
interface A11yActions {
  setFontSize: (level: number) => void; // 0 | 1 | 2
  toggleHighContrast: () => void;
  toggleHighlightLinks: () => void;
  togglePauseAnimations: () => void;
  toggleDyslexiaFont: () => void;
  toggleBigCursor: () => void;
  toggleReadingGuide: () => void;
  toggleTextSpacing: () => void;
  setSaturation: (level: number) => void; // 0 | 1 | 2
  resetAll: () => void;
  getActiveCount: () => number;
}
```

---

## 📐 Clases CSS inyectadas

El hook agrega/quita estas clases en `<html>` automáticamente. Podés usarlas en tu CSS para estilos condicionales:

| Clase                   | Cuándo se aplica                   |
| ----------------------- | ---------------------------------- |
| `a11y-font-lg`          | Fuente nivel 1 (grande)            |
| `a11y-font-xl`          | Fuente nivel 2 (extra grande)      |
| `a11y-text-spacing`     | Separación de texto activa         |
| `a11y-dyslexia-font`    | Fuente OpenDyslexic activa         |
| `a11y-high-contrast`    | Alto contraste activo              |
| `a11y-highlight-links`  | Resaltado de enlaces activo        |
| `a11y-pause-animations` | Animaciones pausadas               |
| `a11y-big-cursor`       | Cursor grande activo               |
| `a11y-reading-guide`    | Guía de lectura activa             |
| `a11y-saturation-low`   | Saturación baja (escala de grises) |
| `a11y-saturation-high`  | Saturación alta (vívido)           |

Los estilos para estas clases ya están incluidos en `@goodapps/react-a11y-widget/styles`. Si querés mayor control, podés importar solo el widget y manejar tus propios estilos basándote en estas clases.

---

## 📁 Estructura del paquete

```
dist/
├── index.js          # ESM
├── index.cjs         # CommonJS
├── index.d.ts        # TypeScript declarations
├── index.d.cts       # CTS declarations
└── styles.css        # Stylesheet
```

### Exports

```json
{
  ".": {
    "import": "./dist/index.js",
    "require": "./dist/index.cjs"
  },
  "./styles": "./dist/styles.css"
}
```

---

## 🧩 Compatibilidad

| Requisito  | Versión                                             |
| ---------- | --------------------------------------------------- |
| React      | ≥ 18.0.0                                            |
| React DOM  | ≥ 18.0.0                                            |
| Zustand    | ≥ 4.0.0                                             |
| TypeScript | ≥ 5.0 (opcional)                                    |
| Browsers   | Todos los evergreen (Chrome, Firefox, Safari, Edge) |

Funciona con: **Vite**, **Next.js** (App Router y Pages Router), **Remix**, **CRA**, **Astro** (React islands), y cualquier setup que soporte React.

---

## 📄 Licencia

[MIT](./LICENSE) — GoodApps
