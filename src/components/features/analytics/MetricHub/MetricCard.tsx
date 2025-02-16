// FILE: src/components/features/analytics/MetricHub/MetricCard.tsx
import { component$ } from '@builder.io/qwik';

export const MetricCard = component$((props: { metric: any }) => {
  return (
    <div class="border p-4 rounded shadow hover:shadow-md transition">
      <h3 class="font-bold">{props.metric.title}</h3>
      <p>{props.metric.value}</p>
    </div>
  );
});
