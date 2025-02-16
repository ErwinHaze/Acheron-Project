// FILE: src/components/features/analytics/LiveTicker/LiveTicker.tsx
import { component$, useStore } from '@builder.io/qwik';
import { TickerItem } from './TickerItem';

export const LiveTicker = component$(() => {
  const store = useStore({ items: [] as any[] });

  // TODO: real-time subscription from supabase or other source
  return (
    <div class="flex gap-2 overflow-x-auto">
      {store.items.map((it) => (
        <TickerItem key={it.id} {...it} />
      ))}
    </div>
  );
});
