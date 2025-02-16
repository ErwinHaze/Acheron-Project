// FILE: src/components/features/analytics/MetricHub/MetricChart.tsx
import { component$ } from '@builder.io/qwik';

export const MetricChart = component$((props: { data: any[] }) => {
  // minimal placeholder
  return (
    <div class="border p-4 rounded">
      <p>Chart Placeholder</p>
      {/* TODO: integrate a chart library or custom canvas */}
    </div>
  );
});
