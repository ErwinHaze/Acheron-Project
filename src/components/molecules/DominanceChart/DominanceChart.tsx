// components/molecules/DominanceChart.tsx
export const DominanceChart = component$(({ data }) => {
    useVisibleTask$(({ cleanup }) => {
      const ctx = document.getElementById('dominanceChart');
      const chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: data.map(cat => cat.name),
          datasets: [{
            data: data.map(cat => cat.dominance),
            backgroundColor: [
              '#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'
            ],
            borderWidth: 0
          }]
        },
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
        }
      });
  
      cleanup(() => chart.destroy());
    });
  
    return <canvas id="dominanceChart" class="w-full" />;
  });