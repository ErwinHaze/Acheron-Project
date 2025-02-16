// FILE: src/components/features/analytics/MetricHub/MetricHub.tsx
import { component$ } from '@builder.io/qwik';
import { MetricCard } from './MetricCard';
import { MetricChart } from './MetricChart';

export const MetricHub = component$((props: { metrics: any[] }) => {
  return (
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      {props.metrics.map((m) => (
        <MetricCard key={m.id} metric={m} />
      ))}
      <MetricChart data={props.metrics} />
    </div>
  );
});
