// =============================================================================
// 🔧 cn — Lightweight class merger (no external deps)
// =============================================================================

export function cn(...inputs: (string | boolean | undefined | null)[]): string {
  return inputs.filter(Boolean).join(" ");
}
