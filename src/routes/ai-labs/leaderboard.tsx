import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import { LeaderboardChart, LiveRanking, LabBadges } from '~/components/features/analytics';

export default component$(() => {
  const timeRange = useSignal('7d');
  const leaderboardData = useSignal<LabMetric[]>([]);

  useVisibleTask$(({ track }) => {
    track(() => timeRange.value);

    const fetchMetrics = async () => {
      const { data } = await supabase
        .rpc('get_lab_metrics', {
          range: timeRange.value
        })
        .select('*')
        .order('ranking', { ascending: true })
        .limit(25);

      leaderboardData.value = data || [];
    };

    fetchMetrics();
  });

  return (
    <div class="container mx-auto px-4">
      <div class="grid gap-6 lg:grid-cols-3">
        <div class="lg:col-span-2">
          <h1 class="text-3xl font-bold mb-6">Top AI Labs Leaderboard</h1>
          
          <LiveRanking 
            labs={leaderboardData.value}
            timeRange={timeRange.value}
            onRangeChange$={(r) => timeRange.value = r}
          />
          
          <LeaderboardChart 
            data={leaderboardData.value}
            class="mt-8 h-96"
          />
        </div>
        
        <div class="lg:col-span-1">
          <LabBadges 
            labs={leaderboardData.value.slice(0, 5)}
            title="Top Performers"
          />
          
          <div class="mt-8">
            <h3 class="text-xl font-semibold mb-4">Key Metrics</h3>
            <MetricHub metrics={leaderboardData.value} />
          </div>
        </div>
      </div>
    </div>
  );
});