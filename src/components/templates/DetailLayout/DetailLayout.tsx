// FILE: src/components/templates/DetailLayout/DetailLayout.tsx
import { component$, Slot } from '@builder.io/qwik';

export const DetailLayout = component$(() => {
  return (
    <div class="max-w-4xl mx-auto p-4">
      <Slot name="header" />
      <Slot />
      <Slot name="footer" />
    </div>
  );
});
