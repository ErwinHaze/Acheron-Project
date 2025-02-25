import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import { createClient } from '@supabase/supabase-js';

// Type definitions
type Model = {
  id: string;
  name: string;
  accuracy: number;
  usage?: number;
  price?: number;
  category?: string;
  creator?: { username: string; avatar_url: string };
  last_updated?: string;
  trending_score?: number;
};

type Statistic = {
  id: number;
  metric: string;
  value: number;
  trend: 'up' | 'down' | 'neutral';
};

// Inline components

// ModelCard (merged DashboardOverview card and SavedModelsGrid item)
const ModelCard = component$(
  ({ model, isSelected, onSelect$ }: { model: Model; isSelected?: boolean; onSelect$?: (id: string) => void }) => {
    return (
      <div
        class={`bg-gray-800 p-4 rounded-md shadow hover:bg-gray-700 ${isSelected ? 'border-2 border-blue-500' : ''}`}
        onClick$={() => onSelect$ && onSelect$(model.id)}
      >
        <h3 class="text-lg font-semibold text-white">{model.name}</h3>
        <p class="text-gray-300">Accuracy: {model.accuracy}%</p>
        {model.usage && <p class="text-gray-300">Usage: {model.usage}k</p>}
        {model.price && <p class="text-gray-300">Price: ${model.price}</p>}
      </div>
    );
  }
);

// MetricHub (simplified from dashboard)
const MetricHub = component$(({ models }: { models: Model[] }) => {
  const totalModels = models.length;
  const avgAccuracy = models.length ? (models.reduce((sum, m) => sum + m.accuracy, 0) / models.length).toFixed(1) : 0;
  return (
    <div class="grid grid-cols-2 gap-4">
      <div class="bg-gray-800 p-4 rounded-md shadow">
        <h3 class="text-lg font-semibold text-white">Total Models</h3>
        <p class="text-2xl text-gray-300">{totalModels}</p>
      </div>
      <div class="bg-gray-800 p-4 rounded-md shadow">
        <h3 class="text-lg font-semibold text-white">Avg Accuracy</h3>
        <p class="text-2xl text-gray-300">{avgAccuracy}%</p>
      </div>
    </div>
  );
});

// Filter (basic saved models filter)
const Filter = component$(
  ({ currentFilter, onFilter$ }: { currentFilter: string; onFilter$: (f: string) => void }) => {
    const filters = ['all', 'AI', 'ML'];
    return (
      <div class="bg-gray-800 p-4 rounded-md shadow">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick$={() => onFilter$(filter)}
            class={`px-4 py-2 rounded-md ${currentFilter === filter ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
          >
            {filter}
          </button>
        ))}
      </div>
    );
  }
);

// Main DashboardPage component
export default component$(() => {
  const supabase = createClient(import.meta.env.PUBLIC_SUPABASE_URL, import.meta.env.PUBLIC_SUPABASE_KEY);
  const selectedTab = useSignal('overview');
  const overviewModels = useSignal<Model[]>([]);
  const savedModels = useSignal<Model[]>([]);
  const selectedSavedModels = useSignal<Set<string>>(new Set());
  const filter = useSignal('all');
  const isLoading = useSignal(true);
  const error = useSignal<string | null>(null);

  // Mock data + Supabase fetch
  useVisibleTask$(async () => {
    // Mock overview data (replace with real fetch later)
    overviewModels.value = [
      { id: '1', name: 'Model A', accuracy: 95, usage: 1500 },
      { id: '2', name: 'Model B', accuracy: 88, usage: 1200 },
      { id: '3', name: 'Model C', accuracy: 92, usage: 900 },
    ];

    // Fetch saved models from Supabase
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data } = await supabase
        .from('saved_models')
        .select(`model:ai_models(id, name, accuracy, price, category)`)
        .eq('user_id', user.id)
        .order('saved_at', { ascending: false });
      savedModels.value = data?.map((item: { model: any; }) => item.model) || [];
    }

    isLoading.value = false;

    // Real-time subscription (simplified)
    const channel = supabase
      .channel('saved_models')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'saved_models', filter: `user_id=eq.${user?.id}` }, 
        () => {
          // Re-fetch or update savedModels.value here if needed
        })
      .subscribe();
    return () => supabase.removeChannel(channel);
  });

  const handleSelectModel = (modelId: string) => {
    const newSet = new Set(selectedSavedModels.value);
    if (newSet.has(modelId)) newSet.delete(modelId);
    else newSet.add(modelId);
    selectedSavedModels.value = newSet;
  };

  return (
    <div class="bg-black text-white min-h-screen">
      <div class="container mx-auto px-4 py-6">
        <section class="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-8 rounded-lg mb-6">
          <h1 class="text-4xl font-bold mb-2">Your Dashboard</h1>
          <p class="text-lg">Manage your models and insights.</p>
        </section>

        <div class="tabs flex space-x-4 mb-6">
          <button
            onClick$={() => selectedTab.value = 'overview'}
            class={`px-4 py-2 rounded-md ${selectedTab.value === 'overview' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
          >
            Overview
          </button>
          <button
            onClick$={() => selectedTab.value = 'saved'}
            class={`px-4 py-2 rounded-md ${selectedTab.value === 'saved' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
          >
            Saved Models ({savedModels.value.length})
          </button>
        </div>

        {isLoading.value ? (
          <div class="text-center text-gray-500 my-4">Loading...</div>
        ) : error.value ? (
          <div class="text-center text-red-500 my-4">{error.value}</div>
        ) : (
          <div class="grid gap-6 lg:grid-cols-3">
            <div class="lg:col-span-2">
              {selectedTab.value === 'overview' ? (
                <div class="bg-gray-900 p-6 rounded-md shadow">
                  <h2 class="text-3xl font-bold mb-6 text-white">Model Overview</h2>
                  <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {overviewModels.value.map((model) => (
                      <ModelCard key={model.id} model={model} />
                    ))}
                  </div>
                </div>
              ) : (
                <div class="bg-gray-900 p-6 rounded-md shadow">
                  <h2 class="text-3xl font-bold mb-6 text-white">Saved Models</h2>
                  <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {savedModels.value.map((model) => (
                      <ModelCard
                        key={model.id}
                        model={model}
                        isSelected={selectedSavedModels.value.has(model.id)}
                        onSelect$={handleSelectModel}
                      />
                    ))}
                  </div>
                  {selectedSavedModels.value.size > 0 && (
                    <div class="mt-4 flex space-x-4">
                      <button class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Delete Selected</button>
                      <button class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Compare</button>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div class="lg:col-span-1 bg-gray-900 p-6 rounded-md shadow">
              <Filter currentFilter={filter.value} onFilter$={(f) => filter.value = f} />
              <div class="mt-6">
                <MetricHub models={selectedTab.value === 'overview' ? overviewModels.value : savedModels.value} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});