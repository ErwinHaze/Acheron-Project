// src/routes/statistics/index.tsx
import { component$, useResource$, Resource, useSignal, $ } from '@builder.io/qwik';
import { StatsGrid } from '~/components/stats/stats-grid';
import { TrendingModels } from '~/components/stats/trending-models';
import { Header } from '~/components/header/header';
import { Footer } from '~/components/Footer/Footer';

export default component$(() => {
  // State to control the display mode
  const viewMode = useSignal<'grid' | 'table'>('grid');

  const switchToGrid = $(() => {
    viewMode.value = 'grid';
  });

  const switchToTable = $(() => {
    viewMode.value = 'table';
  });

  // 1. Resource for main stats (like total models, total views, total usage, etc.)
  const statsResource = useResource$(() =>
    fetch('/api/statistics/summary') // Adjust to your real endpoint
      .then((res) => res.json())
      .catch(() => ({
        totalModels: 35,
        totalViews: 1200,
        totalUsers: 300,
      }))
  );

  // 2. Resource for trending models
  const trendingResource = useResource$(() =>
    fetch('/api/statistics/trending-models')
      .then((res) => res.json())
      .catch(() => [
        { id: 1, name: 'GPT-4', usageCount: 500 },
        { id: 2, name: 'DALL-E 3', usageCount: 350 },
        { id: 3, name: 'Jukebox', usageCount: 200 },
      ])
  );

  return (
      <>
      <Header />
      <div class="mt-8">
    <div class="container mx-auto px-4 py-10">
      <h1 class="text-3xl font-bold mb-6">Store Statistics</h1>

      {/* Toggle Buttons for View Mode */}
      <div class="flex space-x-4 mb-4">
        <button onClick$={switchToGrid} class="bg-blue-500 text-white px-3 py-1 rounded">
          Grid View
        </button>
        <button onClick$={switchToTable} class="bg-gray-500 text-white px-3 py-1 rounded">
          Table View
        </button>
      </div>

      {/* Render Main Stats */}
      <Resource
        value={statsResource}
        onPending={() => <div>Loading stats...</div>}
        onRejected={(error) => <div>Error loading stats: {error.message}</div>}
        onResolved={(data) => {
          const statsArray = [
            { title: 'Total Models', value: data.totalModels },
            { title: 'Total Views', value: data.totalViews },
            { title: 'Total Users', value: data.totalUsers },
          ];

          return viewMode.value === 'grid' ? (
            <StatsGrid stats={statsArray} />
          ) : (
            <table class="w-full border-collapse border border-gray-300">
              <thead>
                <tr class="bg-gray-200">
                  <th class="border border-gray-300 px-4 py-2">Metric</th>
                  <th class="border border-gray-300 px-4 py-2">Value</th>
                </tr>
              </thead>
              <tbody>
                {statsArray.map((stat, idx) => (
                  <tr key={idx} class="border border-gray-300">
                    <td class="px-4 py-2">{stat.title}</td>
                    <td class="px-4 py-2">{stat.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          );
        }}
      />

      {/* Render Trending Models */}
        <Resource
          value={trendingResource}
          onPending={() => <div>Loading trending models...</div>}
          onRejected={(error) => <div>Error loading trending models: {error.message}</div>}
          onResolved={(models) => <TrendingModels models={models} />}
        />
      </div>
    </div>
    <Footer />
    </>
  );
});
