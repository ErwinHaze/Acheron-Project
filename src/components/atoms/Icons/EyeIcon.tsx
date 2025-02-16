// src/components/atoms/icons/EyeIcon.tsx
import { component$ } from '@builder.io/qwik';

export const EyeIcon = component$(() => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      class="w-6 h-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M2.458 12C3.732 7.943 7.523 4 12 4c4.477 0 8.268 3.943 9.542 8-.147.64-.55 1.203-1.084 1.636m0 0H12m4.584-1.636a9.367 9.367 0 01-1.084-.169m-3.084 1C9.523 8 5.732 4 12 4c4.477 0 8.268 3.943 9.542 8-.147.64-.55 1.203-1.084 1.636M15 12v4.5m-4.5 0a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0V12"
      />
    </svg>
  );
});