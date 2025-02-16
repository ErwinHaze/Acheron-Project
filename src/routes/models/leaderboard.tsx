import { component$, useSignal, useTask$ } from '@builder.io/qwik';
import LeaderboardTable from '~/components/organisms/LeaderboardTable/LeaderboardTable';
import PerformanceChart from '~/components/organisms/PerformanceChart/PerformanceChart';
import { fetchLeaderboard } from '~/api/models';

export default component$(() => {
  const leaderboard = useSignal([]);

  // Fetch leaderboard data from Supabase
  useTask$(async () => {
    const data = await fetchLeaderboard();
    leaderboard.value = data;
  });

  return (
    <div class="leaderboard-page">
      {/* Leaderboard Table */}
      <LeaderboardTable models={leaderboard.value} />

      {/* Performance Chart */}
      <PerformanceChart models={leaderboard.value} />
    </div>
  );
});