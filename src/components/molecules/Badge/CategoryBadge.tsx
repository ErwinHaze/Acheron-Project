// FILE: src/components/molecules/Badge/CategoryBadge.tsx
import { component$ } from '@builder.io/qwik';

export const CategoryBadge = component$((props: { category: string }) => {
  return (
    <span class="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
      {props.category}
    </span>
  );
});
