// components/organisms/PerformanceInsightsChart/PerformanceInsightsChart.tsx
import { component$ } from '@builder.io/qwik';
import { MetricChart } from '~/components/features/analytics/MetricHub/MetricChart';

interface PerformanceInsightsChartProps {
  insights: any;
}

export default component$<PerformanceInsightsChartProps>(({ insights }) => {
  return (
    <div class="performance-insights-chart">
      <MetricChart data={insights} />
    </div>
  );
});