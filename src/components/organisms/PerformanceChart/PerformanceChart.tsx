import { component$ } from '@builder.io/qwik';

interface PerformanceChartProps {
  model: {
    performanceMetrics: {
      accuracy: number;
      precision: number;
      recall: number;
      f1Score: number;
    };
  };
}

export default component$<PerformanceChartProps>(({ model }) => {
  const { accuracy, precision, recall, f1Score } = model.performanceMetrics;

  return (
    <div class="performance-chart bg-white shadow-md rounded-lg p-4 mb-4">
      <h2 class="text-xl font-semibold mb-2">Performance Metrics</h2>
      <ul class="space-y-2">
        <li class="flex justify-between">
          <span>Accuracy:</span>
          <span>{accuracy}%</span>
        </li>
        <li class="flex justify-between">
          <span>Precision:</span>
          <span>{precision}%</span>
        </li>
        <li class="flex justify-between">
          <span>Recall:</span>
          <span>{recall}%</span>
        </li>
        <li class="flex justify-between">
          <span>F1 Score:</span>
          <span>{f1Score}%</span>
        </li>
      </ul>
    </div>
  );
});
