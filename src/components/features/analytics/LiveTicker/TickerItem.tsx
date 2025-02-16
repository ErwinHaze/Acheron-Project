// FILE: src/components/features/analytics/LiveTicker/TickerItem.tsx
import { component$ } from '@builder.io/qwik';

export const TickerItem = component$((props: { name: string; value: number }) => {
  return (
    <div class="p-2 border-r last:border-0">
      <p class="font-semibold">{props.name}</p>
      <p class="text-sm text-gray-600">{props.value}</p>
    </div>
  );
});
