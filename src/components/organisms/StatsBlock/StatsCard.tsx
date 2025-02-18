// FILE: src/components/organisms/StatsBlock/StatsCard.tsx
import { component$ } from '@builder.io/qwik';

export const StatsCard = component$((props: {
  label: string;
  value: string | number;
}) => {
  return (
    <div class="border p-4 rounded-full bg-black text-center border-none">
      <p class="text-sm text-white ">{props.label}</p>
      <p class="text-xl text-white font-bold">{props.value}</p>
    </div>
  );
});
