// FILE: src/components/atoms/Icons/VerifiedIcon.tsx
import { component$ } from '@builder.io/qwik';

export const VerifiedIcon = component$(() => {
  return (
    <svg
      class="w-4 h-4 text-blue-500"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      viewBox="0 0 24 24"
      aria-label="Verified"
    >
      {/* 
        A minimal checkmark path for a 'verified' look.
        Feel free to adjust the path, stroke, or color.
      */}
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M20 6L9 17l-5-5"
      />
    </svg>
  );
});
