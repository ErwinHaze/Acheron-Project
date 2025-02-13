import { component$, useResource$, Resource } from '@builder.io/qwik';
import { StatsGrid } from '~/components/stats/stats-grid';
import { TrendingModels } from '~/components/stats/trending-models';

export default component$(() => {
  // Simulate fetching statistics from an API or database.
  // Replace this with a real fetch from Firebase or another backend.
  const statsResource = useResource$(() => {
    // Mock data
    return {
      totalModels: 35,
      totalViews: 1200,
      totalUsers: 300,
      trendingModels: [
        { id: 1, name: 'GPT-4', usageCount: 500 },
        { id: 2, name: 'DALL-E 3', usageCount: 350 },
        { id: 3, name: 'Jukebox', usageCount: 200 },
      ],
    };
  });

  return (
    <Resource
      value={statsResource}
      onPending={() => <div class="p-4">Loading...</div>}
      onRejected={(error) => <div class="p-4">Error: {error.message}</div>}
      onResolved={(data) => (
        <div class="container mx-auto px-4 py-10">
          <h1 class="text-3xl font-bold mb-6">Store Statistics</h1>

          {/* Stats Grid for general metrics */}
          <StatsGrid
            stats={[
              { title: 'Total Models', value: data.totalModels },
              { title: 'Total Views', value: data.totalViews },
              { title: 'Total Users', value: data.totalUsers },
            ]}
          />

          {/* Trending models */}
          <div class="mt-8">
            <TrendingModels models={data.trendingModels} />
          </div>
        </div>
      )}
    />
  );
});
