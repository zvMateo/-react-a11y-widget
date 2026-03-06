// =============================================================================
// 🧩 OptionStepper — Cyclic multi-value option row
// =============================================================================

import React, { useCallback, type ComponentType } from "react";
import { cn } from "../utils";

interface OptionStepperProps {
  icon: ComponentType<{ className?: string }>;
  label: string;
  value: number;
  max: number;
  labels: string[];
  onChange: (value: number) => void;
}

export const OptionStepper: React.FC<OptionStepperProps> = ({
  icon: Icon,
  label,
  value,
  max,
  labels,
  onChange,
}) => {
  const handleCycle = useCallback(() => {
    onChange(value >= max ? 0 : value + 1);
  }, [value, max, onChange]);

  return (
    <button
      onClick={handleCycle}
      className={cn(
        "ga11y-option",
        value > 0 ? "ga11y-option--active" : "ga11y-option--inactive",
      )}
      aria-label={`${label}: ${labels[value]}`}
    >
      <span
        className={cn(
          "ga11y-option__icon",
          value > 0 && "ga11y-option__icon--active",
        )}
      >
        <Icon className="ga11y-icon" />
      </span>
      <span className="ga11y-option__text">
        <span className="ga11y-option__label">{label}</span>
        <span className="ga11y-option__desc">{labels[value]}</span>
      </span>
      <span className="ga11y-stepper-dots">
        {labels.map((_, i) => (
          <span
            key={i}
            className={cn(
              "ga11y-stepper-dot",
              i <= value && value > 0 && "ga11y-stepper-dot--active",
            )}
          />
        ))}
      </span>
    </button>
  );
};
