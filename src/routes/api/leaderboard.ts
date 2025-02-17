import { useSignal, useTask$ } from '@builder.io/qwik';

async function fetchLeaderboard() {
  // Implement the logic to fetch leaderboard data from Supabase
  return [];
}

export function useLeaderboard() {
  const leaderboard = useSignal([]);

  // Fetch leaderboard data from Supabase
  useTask$(async () => {
    const data = await fetchLeaderboard();
    leaderboard.value = data;
  });

  return leaderboard;
}
