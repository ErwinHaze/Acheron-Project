// src/components/atoms/ClockIcon.tsx
import { component$ } from '@builder.io/qwik';

export const ClockIcon = component$(() => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      class="w-4 h-4"
    >
      <path
        fill-rule="evenodd"
        d="M12 2.25a10.002 10.002 0 00-8.72 5.22c.203.195.359.4.477.611A10.002 10.002 0 0012 21.75a9.998 9.998 0 008.718-5.219.75.75 0 00-.477-.612A9.998 9.998 0 0012 2.25zm5.25 9a.75.75 0 00-1.5 0v2.25H15a.75.75 0 000 1.5h2.25a.75.75 0 001.5 0v-2.25h1.5a.75.75 0 000-1.5h-1.5zm-2.25-2.25a.75.75 0 00-1.5 0V7.5a.75.75 0 000-1.5h2.25a.75.75 0 000 1.5H15v1.5z"
        clip-rule="evenodd"
      />
    </svg>
  );
});