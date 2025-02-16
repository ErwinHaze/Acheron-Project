// FILE: src/components/templates/DetailLayout/DetailSection.tsx
import { component$, Slot } from '@builder.io/qwik';

export const DetailSection = component$(() => {
  return (
    <section class="my-6">
      <Slot />
    </section>
  );
});
