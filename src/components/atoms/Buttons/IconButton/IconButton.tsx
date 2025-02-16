// src/components/atoms/IconButton/IconButton.tsx
import { component$ } from '@builder.io/qwik';
import { JSX } from '@builder.io/qwik/jsx-runtime';

interface IconButtonProps {
  icon: JSX.Element;
  label: string;
  onClick$: () => void;
  class?: string;
}

export const IconButton = component$<IconButtonProps>(({ icon, label, onClick$, class: className }) => {
  return (
    <button
      class={`flex items-center justify-center p-2 rounded-full bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 ${className}`}
      onClick$={onClick$}
      aria-label={label}
    >
      {icon}
      <span class="sr-only">{label}</span>
    </button>
  );
});