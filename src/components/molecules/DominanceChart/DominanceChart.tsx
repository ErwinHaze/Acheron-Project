import { component$, useVisibleTask$ } from '@builder.io/qwik';
import { Chart, registerables } from 'chart.js';
import type { DominanceCategory } from '../DominanceCategory/DominanceCategory';

Chart.register(...registerables);

interface DominanceChartProps {
  data: DominanceCategory[];
}

export const DominanceChart = component$<DominanceChartProps>(({ data }) => {
  useVisibleTask$(({ cleanup }) => {
    const ctx = document.getElementById('dominanceChart') as HTMLCanvasElement;

    if (ctx) {
      interface ChartData {
        labels: string[];
        datasets: [{
          data: number[];
          backgroundColor: string[];
          borderWidth: number;
        }]
      }

      interface ChartOptions {
        responsive: boolean;
        maintainAspectRatio: boolean;
        plugins: {
          legend: { position: 'right' };
          tooltip: {
        callbacks: {
          label: (context: any) => string;
        }
          }
        }
      }

      const chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: data.map(cat => cat.name),
          datasets: [{
        data: data.map(cat => cat.dominance),
        backgroundColor: [
          '#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#3b82f6', '#16a38a', '#d97706'
        ],
        borderWidth: 0
          }]
        } as ChartData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
        legend: { position: 'right' },
        tooltip: {
          callbacks: {
            label: (context) => {
          return ` ${context.label}: ${context.raw}% dominance`;
            }
          }
        }
          }
        } as ChartOptions
      });

      cleanup(() => chart.destroy());
    }
  });

  return <canvas id="dominanceChart" class="w-full" />;
});