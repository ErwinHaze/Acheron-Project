// FILE: src/components/organisms/StatsBlock/StatsCard.tsx
import { component$ } from '@builder.io/qwik';

export const StatsCard = component$((props: {
  label: string;
  value: string | number;
}) => {
  return (
    <div class="border p-4 rounded text-center">
      <p class="text-sm text-gray-500">{props.label}</p>
      <p class="text-xl font-bold">{props.value}</p>
    </div>
  );
});
