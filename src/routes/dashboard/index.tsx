import { component$, useSignal, useTask$ } from '@builder.io/qwik';
import OverviewSection from '~/components/organisms/OverviewSection/OverviewSection';
import SavedModelsList from '~/components/organisms/SavedModelsList/SavedModelsList';
import ActivityFeed from '~/components/organisms/ActivityFeed/ActivityFeed';
import PerformanceInsightsChart from '~/components/organisms/PerformanceInsightsChart/PerformanceInsightsChart';

export default component$(() => {
  const dashboardData = useSignal({
    overview: { savedModelsCount: 0, activeLabsFollowed: 0, recentInteractions: 0 },
    savedModels: [],
    activityFeed: [],
    performanceInsights: [],
  });
  const isLoading = useSignal(true);
  const error = useSignal('');

  const fetchDashboardData = async () => {
    // ...simulate fetch logic...
    return {
      overview: { savedModelsCount: 42, activeLabsFollowed: 7, recentInteractions: 15 },
      savedModels: [/* ...models data... */],
      activityFeed: [/* ...activities data... */],
      performanceInsights: [/* ...insights data... */],
    };
  };

  useTask$(async () => {
    try {
      const data = await fetchDashboardData();
      dashboardData.value = data;
    } catch (e: any) {
      error.value = e.message || 'Failed to fetch dashboard data';
    } finally {
      isLoading.value = false;
    }
  });

  return (
    <div class="dashboard-page container mx-auto px-4 py-6">
      {isLoading.value ? (
        <div class="text-center text-gray-500">Loading dashboard...</div>
      ) : error.value ? (
        <div class="text-center text-red-500">{error.value}</div>
      ) : (
        <>
          {/* Overview Section */}
          <OverviewSection
            savedModelsCount={dashboardData.value.overview.savedModelsCount}
            activeLabsFollowed={dashboardData.value.overview.activeLabsFollowed}
            recentInteractions={dashboardData.value.overview.recentInteractions}
          />
          {/* Saved Models List */}
          <section class="mt-6">
            <h2 class="text-xl font-semibold mb-2">Saved Models</h2>
            <SavedModelsList models={dashboardData.value.savedModels} />
          </section>
          {/* Activity Feed */}
          <section class="mt-6">
            <h2 class="text-xl font-semibold mb-2">Activity Feed</h2>
            <ActivityFeed activities={dashboardData.value.activityFeed} />
          </section>
          {/* Performance Insights */}
          <section class="mt-6">
            <h2 class="text-xl font-semibold mb-2">Performance Insights</h2>
            <PerformanceInsightsChart insights={dashboardData.value.performanceInsights} />
          </section>
        </>
      )}
    </div>
  );
});