import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import { supabase } from '~/utils/supabaseClient';

// Minimal type definition for lab metrics
type LabMetric = { 
  ranking: number; 
  // ...other fields 
};

// Define interface types outside of the component
interface LiveRankingProps {
  labs: LabMetric[];
  timeRange: string;
  onRangeChange$: (range: string) => void;
}

interface LeaderboardChartProps {
  data: LabMetric[];
  class?: string;
}

interface LabBadgesProps {
  labs: LabMetric[];
  title: string;
}

interface MetricHubProps {
  metrics: LabMetric[];
}

// Define the components directly within this file
const LiveRanking = component$(({ labs, timeRange, onRangeChange$ }: LiveRankingProps) => {
  return (
    <div>
      {/* LiveRanking component implementation */}
    </div>
  );
});

const LeaderboardChart = component$(({ data, class: className }: LeaderboardChartProps) => {
  return (
    <div className={className}>
      {/* LeaderboardChart component implementation */}
    </div>
  );
});

const LabBadges = component$(({ labs, title }: LabBadgesProps) => {
  return (
    <div>
      <h2>{title}</h2>
      {/* LabBadges component implementation */}
    </div>
  );
});

const MetricHub = component$(({ metrics }: MetricHubProps) => {
  return (
    <div>
      {/* MetricHub component implementation */}
    </div>
  );
});

export default component$(() => {
  const timeRange = useSignal('7d');
  const leaderboardData = useSignal<LabMetric[]>([]);

  useVisibleTask$(({ track }) => {
    track(() => timeRange.value);

    const fetchMetrics = async () => {
      const { data } = await supabase.rpc('get_lab_metrics', {
        range: timeRange.value
      });
      
      if (data) {
        leaderboardData.value = data
          .sort((a: LabMetric, b: LabMetric) => a.ranking - b.ranking)
          .slice(0, 25);
      } else {
        leaderboardData.value = [];
      }
    };

    fetchMetrics();
  });

  return (
    <div class="container mx-auto px-4 py-6">
      <div class="grid gap-6 lg:grid-cols-3">
        <div class="lg:col-span-2 bg-white p-6 rounded-md shadow">
          <h1 class="text-3xl font-bold mb-6 text-gray-900">Top AI Labs Leaderboard</h1>
                  
          <LiveRanking 
            labs={leaderboardData.value}
            timeRange={timeRange.value}
            onRangeChange$={(r: string) => timeRange.value = r}
          />
                  
          <LeaderboardChart 
            data={leaderboardData.value}
            class="mt-8 h-96"
          />
        </div>
        
        <div class="lg:col-span-1 bg-white p-6 rounded-md shadow">
          <LabBadges 
            labs={leaderboardData.value.slice(0, 5)}
            title="Top Performers"
          />
          
          <div class="mt-8">
            <h3 class="text-xl font-semibold mb-4 text-gray-800">Key Metrics</h3>
            <MetricHub metrics={leaderboardData.value} />
          </div>
        </div>
      </div>
    </div>
  );
});