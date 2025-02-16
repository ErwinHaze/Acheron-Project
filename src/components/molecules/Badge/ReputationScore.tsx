// FILE: src/components/molecules/Badge/ReputationScore.tsx
import { component$ } from '@builder.io/qwik';

/**
 * A small component to visualize a reputation score (0-100).
 * Displays a colored bar + optional label + numeric score.
 */
export const ReputationScore = component$((props: {
  score: number;
  label?: string;   // e.g., "Reputation" or "Trust Score"
}) => {
  // 1. Clamp the score between 0 and 100
  const clampedScore = Math.min(Math.max(props.score, 0), 100);

  // 2. Color logic: e.g., Red for low, Yellow for medium, Green for high
  let colorClass = 'bg-red-500';
  if (clampedScore >= 70) {
    colorClass = 'bg-green-500';
  } else if (clampedScore >= 40) {
    colorClass = 'bg-yellow-500';
  }

  return (
    <div class="inline-flex items-center gap-2">
      {/* Optional Label */}
      {props.label && (
        <span class="text-sm font-medium text-gray-700">
          {props.label}
        </span>
      )}

      {/* Reputation Bar */}
      <div class="relative w-24 h-2 bg-gray-200 rounded">
        <div
          class={`${colorClass} absolute top-0 left-0 h-2 rounded transition-all`}
          style={{ width: `${clampedScore}%` }}
        />
      </div>

      {/* Numeric Score */}
      <span class="text-xs text-gray-600">
        {clampedScore}%
      </span>
    </div>
  );
});
