import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import { DominanceChart, LiveCategoryRanking, CategoryBadges } from '~/components/features/analytics';

export default component$(() => {
  const timeRange = useSignal('7d');
  const leaderboardData = useSignal<CategoryMetric[]>([]);

  useVisibleTask$(({ track }) => {
    track(() => timeRange.value);

    const fetchMetrics = async () => {
      const { data } = await supabase
        .rpc('get_category_metrics', {
          range: timeRange.value
        })
        .select('*')
        .order('dominance', { ascending: false })
        .limit(25);

      leaderboardData.value = data || [];
    };

    fetchMetrics();
  });

  return (
    <div class="container mx-auto px-4">
      <div class="grid gap-6 lg:grid-cols-3">
        <div class="lg:col-span-2">
          <h1 class="text-3xl font-bold mb-6">AI Category Dominance Ranking</h1>
          
          <LiveCategoryRanking 
            categories={leaderboardData.value}
            timeRange={timeRange.value}
            onRangeChange$={(r) => timeRange.value = r}
          />
          
          <DominanceChart 
            data={leaderboardData.value}
            class="mt-8 h-96"
          />
        </div>
        
        <div class="lg:col-span-1">
          <CategoryBadges 
            categories={leaderboardData.value.slice(0, 5)}
            title="Dominant Categories"
          />
          
          <div class="mt-8">
            <h3 class="text-xl font-semibold mb-4">Market Metrics</h3>
            <MetricHub metrics={leaderboardData.value} />
          </div>
        </div>
      </div>
    </div>
  );
});