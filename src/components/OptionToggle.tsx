// =============================================================================
// 🧩 OptionToggle — Boolean toggle row
// =============================================================================

import React, { type ComponentType } from "react";
import { cn } from "../utils";

interface OptionToggleProps {
  icon: ComponentType<{ className?: string }>;
  label: string;
  description: string;
  active: boolean;
  onToggle: () => void;
}

export const OptionToggle: React.FC<OptionToggleProps> = ({
  icon: Icon,
  label,
  description,
  active,
  onToggle,
}) => (
  <button
    onClick={onToggle}
    className={cn(
      "ga11y-option",
      active ? "ga11y-option--active" : "ga11y-option--inactive",
    )}
    role="switch"
    aria-checked={active}
    aria-label={label}
  >
    <span
      className={cn(
        "ga11y-option__icon",
        active && "ga11y-option__icon--active",
      )}
    >
      <Icon className="ga11y-icon" />
    </span>
    <span className="ga11y-option__text">
      <span className="ga11y-option__label">{label}</span>
      <span className="ga11y-option__desc">{description}</span>
    </span>
    <span className={cn("ga11y-toggle", active && "ga11y-toggle--active")}>
      <span
        className={cn(
          "ga11y-toggle__dot",
          active && "ga11y-toggle__dot--active",
        )}
      />
    </span>
  </button>
);
