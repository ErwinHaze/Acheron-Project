import { component$, useSignal, useTask$, useVisibleTask$ } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import PerformanceChart from '~/components/organisms/PerformanceChart/PerformanceChart';
import CommunityFeedback from '~/components/organisms/CommunityFeedback/CommunityFeedback';
import { DemoViewer } from '~/components/features/model-playground/DemoViewer/DemoViewer';
import { LoadingSpinner } from '~/components/atoms/Loaders/LoadingSpinner';
import { Model, FeedbackData } from '~/types';

// Type definitions
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

// Inline components

// LabCard
const LabCard = component$(({ lab }: { lab: Lab }) => {
  return (
    <div class="bg-gray-800 p-4 rounded-md shadow text-gray-300 hover:bg-gray-700">
      <h3 class="text-lg font-semibold text-white">{lab.name}</h3>
      <p>Reputation: {lab.reputation}</p>
      <p>Models: {lab.models_count}</p>
    </div>
  );
});

// CategoryCard
const CategoryCard = component$(({ category }: { category: Category }) => {
  return (
    <div class="bg-gray-800 p-4 rounded-md shadow text-gray-300 hover:bg-gray-700">
      <img src={category.icon_url} alt={category.name} class="w-16 h-16 rounded-full mb-2" />
      <h3 class="text-lg font-semibold text-white">{category.name}</h3>
      <p>{category.model_count} models</p>
    </div>
  );
});

// Filter (combined LabsFilter and CategoriesFilter)
const Filter = component$(
  ({ currentFilter, onFilter$ }: { currentFilter: string; onFilter$: (f: string) => void }) => {
    const filters = ['all', 'domain1', 'domain2'];
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

// Main ModelsPage component
export default component$(() => {
  const location = useLocation();
  const modelId = location.params.modelId;
  const selectedTab = useSignal('labs');
  const labsData = useSignal<Lab[]>([]);
  const categoriesData = useSignal<Category[]>([]);
  const model = useSignal<Model | null>(null);
  const sortBy = useSignal('reputation');
  const filter = useSignal('all');
  const isLoading = useSignal(true);
  const error = useSignal<string | null>(null);

  // Mock data fetching (replace with Supabase later)
  useVisibleTask$(() => {
    setTimeout(() => {
      labsData.value = [
        {
          id: 1,
          name: 'Lab A',
          reputation: 95,
          models_count: 150,
          papers_count: 200,
          funding: 5000000,
          location: 'New York',
          avatar_url: '',
          trending_score: 85,
        },
        {
          id: 2,
          name: 'Lab B',
          reputation: 88,
          models_count: 120,
          papers_count: 150,
          funding: 3000000,
          location: 'London',
          avatar_url: '',
          trending_score: 72,
        },
      ];
      categoriesData.value = [
        {
          id: 1,
          name: 'Category A',
          model_count: 200,
          weekly_trend: 5,
          dominance: 0.3,
          total_compute_cost: 1000000,
          top_model: 'Model X',
          icon_url: '/category-a.jpg',
          domain: 'AI',
        },
        {
          id: 2,
          name: 'Category B',
          model_count: 150,
          weekly_trend: -2,
          dominance: 0.25,
          total_compute_cost: 800000,
          top_model: 'Model Y',
          icon_url: '/category-b.jpg',
          domain: 'ML',
        },
      ];
      isLoading.value = false;
    }, 1000);
  });

  // Fetch model details if modelId exists (simplified mock)
  useTask$(async ({ track }) => {
    track(() => modelId);
    if (modelId) {
      isLoading.value = true;
      error.value = null;
      try {
        // Mock model data (replace with real fetch later)
        model.value = {
          id: modelId,
          name: `Model ${modelId}`,
          description: 'A powerful AI model.',
          documentationUrl: 'https://example.com/docs',
          repositoryUrl: 'https://github.com/example/repo',
          // Provide performanceMetrics as an object with the required properties
          performanceMetrics: {
            accuracy: 0.95,
            precision: 0.9,
            recall: 0.85,
            f1Score: 0.87,
          },
          // Provide feedback with the required properties: id, userId, createdAt, user, comment, and rating
          feedback: [
            {
              id: 1,
              userId: 'user1',
              user: 'User1',
              comment: 'Great model!',
              rating: 5,
              createdAt: new Date().toISOString(),
            },
          ] as unknown as FeedbackData[],
        };
      } catch (err) {
        error.value = 'Failed to load model details';
      } finally {
        isLoading.value = false;
      }
    }
  });

  return (
    <div class="bg-black text-white min-h-screen p-4">
      {isLoading.value ? (
        <div class="flex justify-center items-center min-h-[400px]">
          <LoadingSpinner />
        </div>
      ) : error.value ? (
        <div class="text-red-500 p-4 text-center">{error.value}</div>
      ) : modelId && model.value ? (
        // Model Detail View
        <div class="model-details">
          <h1 class="text-2xl font-bold mb-2">{model.value.name}</h1>
          <p class="text-gray-300 mb-4">{model.value.description}</p>
          {model.value.performanceMetrics && <PerformanceChart model={model.value} />}
          <div class="my-4">
            {model.value.documentationUrl && (
              <a
                href={model.value.documentationUrl}
                target="_blank"
                rel="noopener noreferrer"
                class="text-blue-500 hover:underline mr-4"
              >
                View Documentation
              </a>
            )}
            {model.value.repositoryUrl && (
              <a
                href={model.value.repositoryUrl}
                target="_blank"
                rel="noopener noreferrer"
                class="text-blue-500 hover:underline"
              >
                View Code Repository
              </a>
            )}
          </div>
          {model.value.feedback && <CommunityFeedback feedback={model.value.feedback} />}
          <DemoViewer modelId={modelId} />
        </div>
      ) : (
        // Category/List View
        <div class="container mx-auto">
          <section class="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-8 rounded-lg mb-6">
            <h1 class="text-4xl font-bold mb-2">Explore Models</h1>
            <p class="text-lg">Browse AI labs and categories.</p>
          </section>
          <div class="tabs flex space-x-4 mb-6">
            <button
              onClick$={() => (selectedTab.value = 'labs')}
              class={`px-4 py-2 rounded-md ${
                selectedTab.value === 'labs' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              AI Labs
            </button>
            <button
              onClick$={() => (selectedTab.value = 'categories')}
              class={`px-4 py-2 rounded-md ${
                selectedTab.value === 'categories' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Categories
            </button>
          </div>
          <div class="grid gap-6 lg:grid-cols-3">
            <div class="lg:col-span-2 bg-gray-900 p-6 rounded-md shadow">
              {selectedTab.value === 'labs' ? (
                <>
                  <h2 class="text-3xl font-bold mb-6 text-white">AI Labs</h2>
                  <Filter currentFilter={filter.value} onFilter$={(f) => (filter.value = f)} />
                  <div class="grid gap-4 md:grid-cols-2 mt-8">
                    {labsData.value.map((lab) => (
                      <LabCard key={lab.id} lab={lab} />
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <h2 class="text-3xl font-bold mb-6 text-white">AI Categories</h2>
                  <Filter currentFilter={filter.value} onFilter$={(f) => (filter.value = f)} />
                  <div class="grid gap-4 md:grid-cols-2 mt-8">
                    {categoriesData.value.map((category) => (
                      <CategoryCard key={category.id} category={category} />
                    ))}
                  </div>
                </>
              )}
            </div>
            <div class="lg:col-span-1 bg-gray-900 p-6 rounded-md shadow">
              <h3 class="text-xl font-semibold mb-4 text-white">Key Metrics</h3>
              <div class="grid grid-cols-2 gap-4">
                <div class="bg-gray-800 p-4 rounded-md shadow">
                  <h4 class="text-lg font-semibold text-white">Total</h4>
                  <p class="text-2xl text-gray-300">
                    {selectedTab.value === 'labs' ? labsData.value.length : categoriesData.value.length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});
