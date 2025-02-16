// FILE: src/components/templates/ListingLayout/ListingItem.tsx
import { component$, Slot } from '@builder.io/qwik';

export const ListingItem = component$((props: { item: any }) => {
  return (
    <div class="border p-4 rounded hover:shadow transition">
      <Slot />
    </div>
  );
});
