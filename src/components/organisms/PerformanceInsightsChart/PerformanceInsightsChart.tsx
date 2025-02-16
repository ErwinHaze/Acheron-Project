// components/organisms/PerformanceInsightsChart/PerformanceInsightsChart.tsx
import { component$ } from '@builder.io/qwik';
import MetricChart from '~/components/features/analytics/MetricChart/MetricChart';

export default component$(({ insights }) => {
  return (
    <div class="performance-insights-chart">
      <MetricChart data={insights} />
    </div>
  );
});