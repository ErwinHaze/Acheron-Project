import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';

// Type definitions (mocked for now)
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

type Category = {
  id: number;
  name: string;
  model_count: number;
  weekly_trend: number;
  dominance: number;
  total_compute_cost: number;
  top_model: string;
  icon_url: string;
  domain?: string;
};

// Inline component definitions

// LabCard component for AI labs
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

// SortableLabsTable component for labs
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

// CategoryCard component for categories
const CategoryCard = component$(({ category }: { category: Category }) => {
  return (
    <div class="bg-gray-800 p-4 rounded-md shadow text-gray-300 hover:bg-gray-700">
      <img src={category.icon_url} alt={category.name} class="w-16 h-16 rounded-full mb-2" />
      <h3 class="text-lg font-semibold text-white">{category.name}</h3>
      <p>{category.model_count} models</p>
      <p>Top model: {category.top_model}</p>
    </div>
  );
});

// CategoriesFilter component for filtering categories
const CategoriesFilter = component$(
  ({ currentFilter, onFilter$ }: { currentFilter: string; onFilter$: (f: string) => void }) => {
    const filters = ['all', 'domain1', 'domain2']; // Example filters
    return (
      <div class="bg-gray-800 p-4 rounded-md shadow">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick$={() => onFilter$(filter)}
            class={`px-4 py-2 rounded-md ${
              currentFilter === filter ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>
    );
  }
);

// MarketOverview component for categories market overview
const MarketOverview = component$(() => {
  return (
    <div class="bg-gray-800 p-4 rounded-md shadow text-gray-300">
      <h2 class="text-xl font-bold text-white">Market Overview</h2>
      <p>Explore the latest trends in AI categories and labs.</p>
    </div>
  );
});

// SortableCategoriesTable component for categories
const SortableCategoriesTable = component$(
  ({
    categories,
    sortBy,
    onSort$,
  }: {
    categories: Category[];
    sortBy: string;
    onSort$: (s: string) => void;
  }) => {
    return (
      <div class="bg-gray-800 p-4 rounded-md shadow">
        <table class="w-full text-left">
          <thead>
            <tr>
              <th
                onClick$={() => onSort$('model_count')}
                class={`px-4 py-2 font-semibold text-gray-300 cursor-pointer ${
                  sortBy === 'model_count' ? 'text-blue-400' : ''
                }`}
              >
                Model Count
              </th>
              <th class="px-4 py-2 font-semibold text-gray-300">Name</th>
              <th class="px-4 py-2 font-semibold text-gray-300">Weekly Trend</th>
              <th class="px-4 py-2 font-semibold text-gray-300">Dominance</th>
              <th class="px-4 py-2 font-semibold text-gray-300">Top Model</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id} class="hover:bg-gray-700">
                <td class="px-4 py-2 border-t border-gray-700 text-gray-300">{category.model_count}</td>
                <td class="px-4 py-2 border-t border-gray-700 text-gray-300">{category.name}</td>
                <td class="px-4 py-2 border-t border-gray-700 text-gray-300">{category.weekly_trend}%</td>
                <td class="px-4 py-2 border-t border-gray-700 text-gray-300">{category.dominance}</td>
                <td class="px-4 py-2 border-t border-gray-700 text-gray-300">{category.top_model}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
);

// Main CategoriesPage component
export default component$(() => {
  const selectedTab = useSignal('labs');
  const labsData = useSignal<Lab[]>([]);
  const categoriesData = useSignal<Category[]>([]);
  const sortByLabs = useSignal('reputation');
  const sortByCategories = useSignal('model_count');
  const filterLabs = useSignal('all');
  const filterCategories = useSignal('all');
  const error = useSignal('');
  const isLoading = useSignal(true);

  // Mock data for frontend development (replace with Supabase later)
  useVisibleTask$(() => {
    // Simulate data fetching
    setTimeout(() => {
      labsData.value = [
        { id: 1, name: 'Lab A', reputation: 95, models_count: 150, papers_count: 200, funding: 5000000, location: 'New York', avatar_url: '', trending_score: 85 },
        { id: 2, name: 'Lab B', reputation: 88, models_count: 120, papers_count: 150, funding: 3000000, location: 'London', avatar_url: '', trending_score: 72 },
      ];
      categoriesData.value = [
        { id: 1, name: 'Category A', model_count: 200, weekly_trend: 5, dominance: 0.3, total_compute_cost: 1000000, top_model: 'Model X', icon_url: '/category-a.jpg', domain: 'AI' },
        { id: 2, name: 'Category B', model_count: 150, weekly_trend: -2, dominance: 0.25, total_compute_cost: 800000, top_model: 'Model Y', icon_url: '/category-b.jpg', domain: 'ML' },
      ];
      isLoading.value = false;
    }, 1000); // Simulate network delay
  });

  return (
    <div class="bg-black text-white min-h-screen">
      <div class="container mx-auto px-4 py-6">
        {/* Hero Banner */}
        <section class="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-8 rounded-lg mb-6">
          <h1 class="text-4xl font-bold mb-2">AI Categories & Labs</h1>
          <p class="text-lg">Explore AI labs and categories, updated in real-time.</p>
          <button class="mt-4 bg-white text-blue-700 rounded px-6 py-2 hover:bg-gray-100">Explore Now</button>
        </section>

        {/* Tabs */}
        <div class="tabs flex space-x-4 mb-6">
          <button
            onClick$={() => selectedTab.value = 'labs'}
            class={`px-4 py-2 rounded-md ${
              selectedTab.value === 'labs' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            AI Labs
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
                <div class="bg-gray-900 p-6 rounded-md shadow">
                  <h2 class="text-3xl font-bold mb-6 text-white">AI Labs</h2>
                  <LabsStats />
                  <div class="grid gap-6 md:grid-cols-4 mt-6">
                    <div class="md:col-span-1">
                      <LabsFilter
                        currentFilter={filterLabs.value}
                        onFilter$={(f) => filterLabs.value = f}
                      />
                    </div>
                    <div class="md:col-span-3">
                      <SortableLabsTable
                        labs={labsData.value}
                        sortBy={sortByLabs.value}
                        onSort$={(s) => sortByLabs.value = s}
                      />
                      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-8">
                        {labsData.value.slice(0, 6).map((lab) => (
                          <LabCard key={lab.id} lab={lab} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div class="bg-gray-900 p-6 rounded-md shadow">
                  <h2 class="text-3xl font-bold mb-6 text-white">AI Categories</h2>
                  <MarketOverview />
                  <div class="grid gap-6 md:grid-cols-4 mt-6">
                    <div class="md:col-span-1">
                      <CategoriesFilter
                        currentFilter={filterCategories.value}
                        onFilter$={(f) => filterCategories.value = f}
                      />
                    </div>
                    <div class="md:col-span-3">
                      <SortableCategoriesTable
                        categories={categoriesData.value}
                        sortBy={sortByCategories.value}
                        onSort$={(s) => sortByCategories.value = s}
                      />
                      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-8">
                        {categoriesData.value.slice(0, 6).map((category) => (
                          <CategoryCard key={category.id} category={category} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div class="lg:col-span-1 bg-gray-900 p-6 rounded-md shadow">
              <div class="mt-8">
                <h3 class="text-xl font-semibold mb-4 text-white">Key Metrics</h3>
                <div class="grid grid-cols-2 gap-4">
                  <div class="bg-gray-800 p-4 rounded-md shadow">
                    <h4 class="text-lg font-semibold text-white">Total Labs/Categories</h4>
                    <p class="text-2xl text-gray-300">
                      {selectedTab.value === 'labs' ? labsData.value.length : categoriesData.value.length}
                    </p>
                  </div>
                  <div class="bg-gray-800 p-4 rounded-md shadow">
                    <h4 class="text-lg font-semibold text-white">Average Models</h4>
                    <p class="text-2xl text-gray-300">
                      {selectedTab.value === 'labs'
                        ? labsData.value.reduce((sum, lab) => sum + lab.models_count, 0) / labsData.value.length || 0
                        : categoriesData.value.reduce((sum, cat) => sum + cat.model_count, 0) / categoriesData.value.length || 0}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});