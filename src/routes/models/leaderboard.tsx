import { component$, useSignal, useTask$ } from '@builder.io/qwik';
import LeaderboardTable from '~/components/organisms/LeaderboardTable/LeaderboardTable';
import PerformanceChart from '~/components/organisms/PerformanceChart/PerformanceChart';
import { useLeaderboard } from '~/routes/api/leaderboard';

export default component$(() => {
  const leaderboard = useSignal<{ accuracy: number; precision: number; recall: number; f1Score: number } | null>(null);
  const loading = useSignal(true);
  const error = useSignal('');

  // Fetch leaderboard data from Supabase with error handling
  const leaderboardData = useLeaderboard();

  useTask$(async () => {
    try {
      leaderboard.value = leaderboardData.value[0];
    } catch (err) {
      error.value = 'Failed to load leaderboard';
    } finally {
      loading.value = false;
    }
  });

  // If loading or error, display appropriate messages
  if (loading.value) return <div>Loading...</div>;
  if (error.value) return <div>{error.value}</div>;

  return (
    <div class="leaderboard-page">
      {/* Leaderboard Table */}
      <LeaderboardTable models={leaderboard.value ? [{ name: 'Model', score: leaderboard.value.accuracy }] : []} />

      {/* Performance Chart */}
      {leaderboard.value && <PerformanceChart model={{ performanceMetrics: leaderboard.value }} />}
    </div>
  );
});