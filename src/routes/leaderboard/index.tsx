import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import { createClient } from '@supabase/supabase-js';

// Type definitions
type LabMetric = {
  id: number;
  name: string;
  ranking: number;
  // Add other relevant fields as needed
};

type CategoryMetric = {
  id: number;
  name: string;
  dominance: number;
  // Add other relevant fields as needed
};

type Lab = {
  id: number;
  name: string;
  reputation: number;
  models_count: number;
  papers_count: number;
  funding: number;
  location: string;
  avatar_url: string;
  trending_score: number;
};

// Inline component definitions

// LiveRanking component for labs leaderboard
const LiveRanking = component$(
  ({ labs, timeRange, onRangeChange$ }: { labs: LabMetric[]; timeRange: string; onRangeChange$: (r: string) => void }) => {
    return (
      <div class="bg-gray-800 p-4 rounded-md shadow">
        <select
          value={timeRange}
          onInput$={(e) => onRangeChange$((e.target as HTMLSelectElement).value)}
          class="bg-gray-700 text-white rounded-md px-2 py-1 mb-4"
        >
          <option value="7d">Last 7 Days</option>
          <option value="30d">Last 30 Days</option>
        </select>
        <table class="w-full text-left">
          <thead>
            <tr>
              <th class="px-4 py-2 font-semibold text-gray-300">Rank</th>
              <th class="px-4 py-2 font-semibold text-gray-300">Lab</th>
            </tr>
          </thead>
          <tbody>
            {labs.map((lab) => (
              <tr key={lab.id} class="hover:bg-gray-700">
                <td class="px-4 py-2 border-t border-gray-700">{lab.ranking}</td>
                <td class="px-4 py-2 border-t border-gray-700">{lab.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
);

// Placeholder LeaderboardChart component
const LeaderboardChart = component$(
  ({ data, class: className }: { data: LabMetric[]; class?: string }) => {
    return <div className={`bg-gray-800 p-4 rounded-md shadow ${className}`}>[Leaderboard Chart Placeholder]</div>;
  }
);

// LabBadges component for top labs
const LabBadges = component$(({ labs, title }: { labs: LabMetric[]; title: string }) => {
  return (
    <div class="bg-gray-800 p-4 rounded-md shadow">
      <h2 class="text-xl font-bold mb-4 text-white">{title}</h2>
      <ul>
        {labs.map((lab) => (
          <li key={lab.id} class="mb-2 text-gray-300 hover:text-white">
            {lab.name} - Rank {lab.ranking}
          </li>
        ))}
      </ul>
    </div>
  );
});

// LiveCategoryRanking component for categories leaderboard
const LiveCategoryRanking = component$(
  ({
    categories,
    timeRange,
    onRangeChange$,
  }: {
    categories: CategoryMetric[];
    timeRange: string;
    onRangeChange$: (r: string) => void;
  }) => {
    return (
      <div class="bg-gray-800 p-4 rounded-md shadow">
        <select
          value={timeRange}
          onInput$={(e) => onRangeChange$((e.target as HTMLSelectElement).value)}
          class="bg-gray-700 text-white rounded-md px-2 py-1 mb-4"
        >
          <option value="7d">Last 7 Days</option>
          <option value="30d">Last 30 Days</option>
        </select>
        <ul>
          {categories.map((cat) => (
            <li key={cat.id} class="text-gray-300 hover:text-white">
              {cat.name}: {cat.dominance}
            </li>
          ))}
        </ul>
      </div>
    );
  }
);

// Placeholder DominanceChart component
const DominanceChart = component$(
  ({ data, class: className }: { data: CategoryMetric[]; class?: string }) => {
    return <div className={`bg-gray-800 p-4 rounded-md shadow ${className}`}>[Dominance Chart Placeholder]</div>;
  }
);

// CategoryBadges component for top categories
const CategoryBadges = component$(({ category, title }: { category: CategoryMetric[]; title: string }) => {
  return (
    <div class="bg-gray-800 p-4 rounded-md shadow">
      <h2 class="text-xl font-bold mb-4 text-white">{title}</h2>
      <ul>
        {category.map((cat) => (
          <li key={cat.id} class="mb-2 text-gray-300 hover:text-white">
            {cat.name} - Dominance {cat.dominance}
          </li>
        ))}
      </ul>
    </div>
  );
});

// MetricHub component for key metrics
const MetricHub = component$(({ metrics }: { metrics: LabMetric[] | CategoryMetric[] }) => {
  return (
    <div class="grid grid-cols-2 gap-4">
      <div class="bg-gray-800 p-4 rounded-md shadow">
        <h3 class="text-lg font-semibold text-white">Total Items</h3>
        <p class="text-2xl text-gray-300">{metrics.length}</p>
      </div>
      {/* Add more metrics as needed */}
    </div>
  );
});

// LabCard component for general labs listing
const LabCard = component$(({ lab }: { lab: Lab }) => {
  return (
    <div class="bg-gray-800 p-4 rounded-md shadow text-gray-300 hover:bg-gray-700">
      <h3 class="text-lg font-semibold text-white">{lab.name}</h3>
      <p>Reputation: {lab.reputation}</p>
      <p>Models: {lab.models_count}</p>
      <p>Papers: {lab.papers_count}</p>
      <p>Funding: ${lab.funding}</p>
      <p>Location: {lab.location}</p>
    </div>
  );
});

// LabsFilter component for filtering labs
const LabsFilter = component$(
  ({ currentFilter, onFilter$ }: { currentFilter: string; onFilter$: (f: string) => void }) => {
    return (
      <div class="bg-gray-800 p-4 rounded-md shadow">
        <button
          onClick$={() => onFilter$('all')}
          class={`px-4 py-2 rounded-md ${
            currentFilter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          All
        </button>
        {/* Add more filter options as needed */}
      </div>
    );
  }
);

// LabsStats component for labs statistics
const LabsStats = component$(() => {
  return <div class="bg-gray-800 p-4 rounded-md shadow text-gray-300">Labs Stats Placeholder</div>;
});

// SortableLabsTable component for general labs listing
const SortableLabsTable = component$(
  ({ labs, sortBy, onSort$ }: { labs: Lab[]; sortBy: string; onSort$: (s: string) => void }) => {
    return (
      <div class="bg-gray-800 p-4 rounded-md shadow">
        <table class="w-full text-left">
          <thead>
            <tr>
              <th
                onClick$={() => onSort$('reputation')}
                class={`px-4 py-2 font-semibold text-gray-300 cursor-pointer ${
                  sortBy === 'reputation' ? 'text-blue-400' : ''
                }`}
              >
                Reputation
              </th>
              <th class="px-4 py-2 font-semibold text-gray-300">Name</th>
              <th class="px-4 py-2 font-semibold text-gray-300">Models</th>
              <th class="px-4 py-2 font-semibold text-gray-300">Papers</th>
              <th class="px-4 py-2 font-semibold text-gray-300">Funding</th>
              <th class="px-4 py-2 font-semibold text-gray-300">Location</th>
            </tr>
          </thead>
          <tbody>
            {labs.map((lab) => (
              <tr key={lab.id} class="hover:bg-gray-700">
                <td class="px-4 py-2 border-t border-gray-700 text-gray-300">{lab.reputation}</td>
                <td class="px-4 py-2 border-t border-gray-700 text-gray-300">{lab.name}</td>
                <td class="px-4 py-2 border-t border-gray-700 text-gray-300">{lab.models_count}</td>
                <td class="px-4 py-2 border-t border-gray-700 text-gray-300">{lab.papers_count}</td>
                <td class="px-4 py-2 border-t border-gray-700 text-gray-300">${lab.funding}</td>
                <td class="px-4 py-2 border-t border-gray-700 text-gray-300">{lab.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
);

// Main LeaderboardPage component
export default component$(() => {
  const supabase = createClient(
    import.meta.env.PUBLIC_SUPABASE_URL,
    import.meta.env.PUBLIC_SUPABASE_KEY
  );

  const selectedTab = useSignal('labs');
  const timeRange = useSignal('7d');
  const labsData = useSignal<LabMetric[]>([]);
  const categoriesData = useSignal<CategoryMetric[]>([]);
  const allLabs = useSignal<Lab[]>([]);
  const sortBy = useSignal('reputation');
  const filter = useSignal('all');
  const error = useSignal('');
  const isLoading = useSignal(true);

  useVisibleTask$(({ track }) => {
    track(() => timeRange.value);
    track(() => [sortBy.value, filter.value]);

    const fetchLeaderboardData = async () => {
      try {
        // Fetch leaderboard data for labs
        const { data: labs } = await supabase.rpc('get_lab_metrics', { range: timeRange.value });
        labsData.value = labs
          ? labs.sort((a: LabMetric, b: LabMetric) => a.ranking - b.ranking).slice(0, 25)
          : [];

        // Fetch leaderboard data for categories
        const { data: categories } = await supabase.rpc('get_category_metrics', { range: timeRange.value });
        categoriesData.value = categories
          ? categories.sort((a: CategoryMetric, b: CategoryMetric) => b.dominance - a.dominance).slice(0, 25)
          : [];
      } catch (err: any) {
        console.error('Error fetching leaderboard data:', err);
        error.value = 'Failed to fetch leaderboard data';
      }
    };

    const fetchAllLabs = async () => {
      try {
        let query = supabase
          .from('ai_labs')
          .select(`
            id,
            name,
            reputation,
            models_count,
            papers_count,
            funding,
            location,
            avatar_url,
            trending_score
          `);

        if (filter.value !== 'all') {
          query = query.ilike('specialization', `%${filter.value}%`);
        }

        const { data } = await query.order(sortBy.value, { ascending: false }).limit(100);
        allLabs.value = data || [];
      } catch (err: any) {
        console.error('Error fetching all labs:', err);
        error.value = 'Failed to fetch labs data';
      }
    };

    Promise.all([fetchLeaderboardData(), fetchAllLabs()]).finally(() => {
      isLoading.value = false;
    });
  });

  return (
    <div class="bg-black text-white min-h-screen">
      <div class="container mx-auto px-4 py-6">
        {/* Hero Banner */}
        <section class="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-8 rounded-lg mb-6">
          <h1 class="text-4xl font-bold mb-2">AI Leaderboard</h1>
          <p class="text-lg">Explore the top AI labs and categories, updated in real-time.</p>
          <button class="mt-4 bg-white text-blue-700 rounded px-6 py-2 hover:bg-gray-100">Learn More</button>
        </section>

        {/* Tabs */}
        <div class="tabs flex space-x-4 mb-6">
          <button
            onClick$={() => selectedTab.value = 'labs'}
            class={`px-4 py-2 rounded-md ${
              selectedTab.value === 'labs' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            Labs
          </button>
          <button
            onClick$={() => selectedTab.value = 'categories'}
            class={`px-4 py-2 rounded-md ${
              selectedTab.value === 'categories'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            Categories
          </button>
        </div>

        {isLoading.value ? (
          <div class="text-center text-gray-500 my-4">Loading...</div>
        ) : error.value ? (
          <div class="text-center text-red-500 my-4">{error.value}</div>
        ) : (
          <div class="grid gap-6 lg:grid-cols-3">
            <div class="lg:col-span-2">
              {selectedTab.value === 'labs' ? (
                <>
                  {/* Labs Leaderboard Section */}
                  <div class="bg-gray-900 p-6 rounded-md shadow mb-6">
                    <h2 class="text-3xl font-bold mb-6">Top AI Labs Leaderboard</h2>
                    <LiveRanking
                      labs={labsData.value}
                      timeRange={timeRange.value}
                      onRangeChange$={(r) => timeRange.value = r}
                    />
                    <LeaderboardChart data={labsData.value} class="mt-8 h-96" />
                  </div>

                  {/* General Labs Listing Section */}
                  <div class="bg-gray-900 p-6 rounded-md shadow">
                    <h2 class="text-3xl font-bold mb-6">All AI Labs</h2>
                    <LabsStats />
                    <div class="grid gap-6 md:grid-cols-4 mt-6">
                      <div class="md:col-span-1">
                        <LabsFilter
                          currentFilter={filter.value}
                          onFilter$={(f) => filter.value = f}
                        />
                      </div>
                      <div class="md:col-span-3">
                        <SortableLabsTable
                          labs={allLabs.value}
                          sortBy={sortBy.value}
                          onSort$={(s) => sortBy.value = s}
                        />
                        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-8">
                          {allLabs.value.slice(0, 6).map((lab) => (
                            <LabCard key={lab.id} lab={lab} />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Categories Leaderboard Section */}
                  <div class="bg-gray-900 p-6 rounded-md shadow">
                    <h2 class="text-3xl font-bold mb-6">AI Category Dominance Ranking</h2>
                    <LiveCategoryRanking
                      categories={categoriesData.value}
                      timeRange={timeRange.value}
                      onRangeChange$={(r) => timeRange.value = r}
                    />
                    <DominanceChart data={categoriesData.value} class="mt-8 h-96" />
                  </div>
                </>
              )}
            </div>
            <div class="lg:col-span-1 bg-gray-900 p-6 rounded-md shadow">
              {selectedTab.value === 'labs' ? (
                <LabBadges labs={labsData.value.slice(0, 5)} title="Top Performers" />
              ) : (
                <CategoryBadges category={categoriesData.value.slice(0, 5)} title="Dominant Categories" />
              )}
              <div class="mt-8">
                <h3 class="text-xl font-semibold mb-4">Key Metrics</h3>
                <MetricHub
                  metrics={selectedTab.value === 'labs' ? labsData.value : categoriesData.value}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});