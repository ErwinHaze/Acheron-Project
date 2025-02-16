import { component$ } from 'src/libraries/teact/teact';
export const LeaderboardChart = component$(({ data }) => {
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
  
      cleanup(() => chart.destroy());
    });
  
    return <canvas id="labChart" class="w-full" />;
  });