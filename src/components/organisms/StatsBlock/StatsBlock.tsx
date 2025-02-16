// FILE: src/components/organisms/StatsBlock/StatsBlock.tsx
import { component$ } from '@builder.io/qwik';
import { StatsCard } from './StatsCard';

export interface StatsItem {
  label: string;
  value: string | number;
}

export const StatsBlock = component$((props: { stats: StatsItem[] }) => {
  return (
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      {props.stats.map((stat) => (
        <StatsCard key={stat.label} label={stat.label} value={stat.value} />
      ))}
    </div>
  );
});
