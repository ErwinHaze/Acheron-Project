import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import { createClient } from '@supabase/supabase-js';
import { DominanceChart } from '~/components/molecules/DominanceChart/DominanceChart';
import { CategoryBadge as CategoryBadges } from '~/components/molecules/Badge/CategoryBadge';
import { MetricHub } from '~/components/features/analytics/MetricHub/MetricHub';

// Added type definition for CategoryMetric
interface CategoryMetric {
	id: number;
	name: string;
	dominance: number;
	// ...other properties as needed
}

// Added type definition for CategoryBadgeProps
interface CategoryBadgeProps {
  category: CategoryMetric[];
  title: string;
}

// Inline LiveCategoryRanking component
const LiveCategoryRanking = component$((props: { categories: CategoryMetric[]; timeRange: string; onRangeChange$: (r: string) => void }) => {
  return (
    <div>
      <select value={props.timeRange} onInput$={(e) => props.onRangeChange$((e.target as HTMLSelectElement).value)}>
        <option value="7d">Last 7 Days</option>
        <option value="30d">Last 30 Days</option>
        {/* ...any additional ranges... */}
      </select>
      <ul>
        {props.categories.map((cat) => (
          <li key={cat.id}>
            {cat.name}: {cat.dominance}
          </li>
        ))}
      </ul>
    </div>
  );
});

export default component$(() => {
  const supabase = createClient(
    import.meta.env.PUBLIC_SUPABASE_URL,
    import.meta.env.PUBLIC_SUPABASE_KEY
  );

  const timeRange = useSignal('7d');
  const leaderboardData = useSignal<CategoryMetric[]>([]);
  const error = useSignal<string>('');
  const isLoading = useSignal(true);

  useVisibleTask$(({ track }) => {
    track(() => timeRange.value);

    const fetchMetrics = async () => {
      try {
        const { data, error: fetchError } = await supabase
          .rpc('get_category_metrics', { range: timeRange.value });
        if (fetchError) throw fetchError;
        // Sort by dominance descending and limit to top 25
        leaderboardData.value = (data || [])
          .sort((a: CategoryMetric, b: CategoryMetric) => b.dominance - a.dominance)
          .slice(0, 25);
      } catch (err: any) {
        error.value = err.message || 'Failed to fetch metrics';
      } finally {
        isLoading.value = false;
      }
    };

    fetchMetrics();
  });

  return (
    <div class="container mx-auto px-4 py-6">
      {isLoading.value && <div class="text-center text-gray-500 my-4">Loading...</div>}
      {error.value ? (
        <div class="text-center text-red-500 my-4">{error.value}</div>
      ) : (
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
              class-name="mt-8 h-96"
            />
          </div>
          <div class="lg:col-span-1">
            <CategoryBadges
              category={leaderboardData.value.slice(0, 5)}
              title="Dominant Categories"
            />
            <div class="mt-8">
              <h3 class="text-xl font-semibold mb-4">Market Metrics</h3>
              <MetricHub metrics={leaderboardData.value} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
});