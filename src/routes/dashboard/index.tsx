import { component$, useSignal, useTask$ } from '@builder.io/qwik';
import OverviewSection from '~/components/organisms/OverviewSection/OverviewSection';
import SavedModelsList from '~/components/organisms/SavedModelsList/SavedModelsList';
import ActivityFeed from '~/components/organisms/ActivityFeed/ActivityFeed';
import PerformanceInsightsChart from '~/components/organisms/PerformanceInsightsChart/PerformanceInsightsChart';
import { fetchDashboardData } from '~/api/dashboard';

export default component$(() => {
  const dashboardData = useSignal({
    overview: {
      savedModelsCount: 0,
      activeLabsFollowed: 0,
      recentInteractions: 0,
    },
    savedModels: [],
    activityFeed: [],
    performanceInsights: [],
  });

  // Fetch dashboard data from Supabase
  useTask$(async () => {
    const data = await fetchDashboardData();
    dashboardData.value = data;
  });

  return (
    <div class="dashboard-page">
      {/* Overview Section */}
      <OverviewSection
        savedModelsCount={dashboardData.value.overview.savedModelsCount}
        activeLabsFollowed={dashboardData.value.overview.activeLabsFollowed}
        recentInteractions={dashboardData.value.overview.recentInteractions}
      />

      {/* Saved Models List */}
      <section>
        <h2>Saved Models</h2>
        <SavedModelsList models={dashboardData.value.savedModels} />
      </section>

      {/* Activity Feed */}
      <section>
        <h2>Activity Feed</h2>
        <ActivityFeed activities={dashboardData.value.activityFeed} />
      </section>

      {/* Performance Insights */}
      <section>
        <h2>Performance Insights</h2>
        <PerformanceInsightsChart insights={dashboardData.value.performanceInsights} />
      </section>
    </div>
  );
});