import { component$ } from '@builder.io/qwik';
import { useTask$, useContext, createContextId } from '@builder.io/qwik';
import { Chart } from 'chart.js/auto';
export const LeaderboardChart = component$(({ data }: { data: any[] }) => {
    useVisibleTask$(({ cleanup }) => {
      const ctx = document.getElementById('labChart');
      const chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: data.map(lab => lab.name),
          datasets: [{
            label: 'Research Impact',
            data: data.map(lab => lab.impact_score),
            backgroundColor: 'rgba(99, 102, 241, 0.6)',
            borderColor: 'rgb(99, 102, 241)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false }
          }
        }
      });
  
      cleanup(chart.destroy);
    });
  
    return <canvas id="labChart" class="w-full" />;
  });
  const VisibleTaskContextId = createContextId<{ cleanup: () => void }>(
    'visible-task-context'
  );

  function useVisibleTask$(callback: ({ cleanup }: { cleanup: () => void }) => void) {
    const cleanupContext = useContext(VisibleTaskContextId);
    useTask$(() => {
      let cleanupFn: (() => void) | undefined;

      const cleanup = () => {
        if (cleanupFn) {
          cleanupFn();
          cleanupFn = undefined;
        }
      };

      const taskContext = { cleanup };
      const taskCleanup = callback(taskContext);

      if (typeof taskCleanup === 'function') {
        cleanupFn = taskCleanup;
      }

      return () => {
        cleanup();
      };
    });
  }
