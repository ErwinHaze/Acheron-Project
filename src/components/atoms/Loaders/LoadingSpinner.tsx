// FILE: src/components/atoms/Loaders/LoadingSpinner.tsx
import { component$ } from '@builder.io/qwik';

export const LoadingSpinner = component$(() => {
  return (
    <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
  );
});
