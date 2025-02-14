//
// File: src/components/ai-model-directory/ai-model-directory.tsx
//
import {
    component$,
    useStore,
    useResource$,
    Resource,
    $,
  } from '@builder.io/qwik';
  
  // Data structure for each AI model
  interface AiModel {
    id: string;
    name: string;
    category: string;       // e.g., 'NLP', 'Computer Vision', 'Audio', etc.
    popularity: number;     // numeric rank or usage count
    usageTrends: number[];  // weekly usage data (7 data points)
  }
  
  // Options for filtering/sorting
  interface AiModelDirectoryState {
    filterCategory: string;
    sortBy: string;
    searchTerm: string;
    models: AiModel[];
    loading: boolean;
    error: string | null;
  }
  
  export const AiModelDirectory = component$(() => {
    // 1. Store for filtering, sorting, and model data
    const store = useStore<AiModelDirectoryState>({
      filterCategory: 'All',
      sortBy: 'popularity',
      searchTerm: '',
      models: [],
      loading: false,
      error: null,
    });
  
    // 2. Fetch the AI models from an API endpoint
    //    This uses Qwik's lazy loading approach for data (Resource).
    const modelsResource = useResource$(async () => {
      store.loading = true;
      store.error = null;
      try {
        // Example endpoint: /api/ai-models
        // Adjust to your actual endpoint
        const res = await fetch('/api/ai-models');
        if (!res.ok) {
          throw new Error(`Failed to fetch AI models: ${res.status} ${res.statusText}`);
        }
        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Response is not JSON");
        }
        const data: AiModel[] = await res.json();
        return data;
      } catch (error: any) {
        store.error = error.message;
        return [];
      } finally {
        store.loading = false;
      }
    });
  
    // 3. Helper function to filter and sort models
    const getFilteredAndSortedModels = $((models: AiModel[]) => {
      let filtered = models;
      // Filter by category
      if (store.filterCategory !== 'All' && store.filterCategory) {
        filtered = filtered.filter(
          (m) => m.category?.toLowerCase() === store.filterCategory.toLowerCase()
        );
      }
      // Filter by search term
      if (store.searchTerm?.trim()) {
        const term = store.searchTerm.toLowerCase();
        filtered = filtered.filter((m) => m.name?.toLowerCase().includes(term));
      }
      // Sort by selected field
      if (store.sortBy === 'popularity') {
        // Descending by popularity
        filtered.sort((a, b) => b.popularity - a.popularity);
      } else if (store.sortBy === 'name') {
        // Alphabetical by name
        filtered.sort((a, b) => a.name.localeCompare(b.name));
      }
      return filtered;
    });
  
    return (
      <div class="p-4">
        <h1 class="text-2xl font-bold mb-4">AI Model Directory</h1>
  
        {/* --- Filtering & Sorting Controls --- */}
        <div class="flex flex-col md:flex-row gap-4 mb-4">
          {/* Category Filter */}
          <select
            class="border p-2"
            value={store.filterCategory}
            onChange$={(e) => (store.filterCategory = (e.target as HTMLSelectElement).value)}
          >
            <option value="All">All Categories</option>
            <option value="NLP">NLP</option>
            <option value="Computer Vision">Computer Vision</option>
            <option value="Audio">Audio</option>
            <option value="Multimodal">Multimodal</option>
            {/* Add more categories as needed */}
          </select>
  
          {/* Sort Options */}
          <select
            class="border p-2"
            value={store.sortBy}
            onChange$={(e) => (store.sortBy = (e.target as HTMLSelectElement).value)}
          >
            <option value="popularity">Sort by Popularity</option>
            <option value="name">Sort by Name</option>
          </select>
  
          {/* Search Box */}
          <input
            type="text"
            placeholder="Search model..."
            class="border p-2 flex-1"
            value={store.searchTerm}
            onInput$={(e) => (store.searchTerm = (e.target as HTMLInputElement).value)}
          />
        </div>
  
        {/* --- Model List --- */}
        {store.loading && <p>Loading AI models...</p>}
        {store.error && <p class="text-red-500">Error: {store.error}</p>}
        {!store.loading && !store.error && (
          <Resource
            value={modelsResource}
            onPending={() => <p>Loading AI models...</p>}
            onRejected={(error) => <p class="text-red-500">Error: {error.message}</p>}
            onResolved={(models: AiModel[]) => {
              store.models = models;
              const finalList = getFilteredAndSortedModels(models);
              if (finalList.length === 0) {
                return <p>No models match your criteria.</p>;
              }
              return (
                <table class="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr class="bg-gray-100">
                      <th class="border p-2 text-left">Model Name</th>
                      <th class="border p-2 text-left">Category</th>
                      <th class="border p-2 text-left">Popularity</th>
                      <th class="border p-2 text-left">Weekly Usage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {finalList.map((model: AiModel) => (
                      <tr key={model.id} class="border-b">
                        <td class="border p-2">{model.name}</td>
                        <td class="border p-2">{model.category}</td>
                        <td class="border p-2">{model.popularity}</td>
                        <td class="border p-2">
                          <UsageSparkline usageData={model.usageTrends} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              );
            }}
          />
        )}
      </div>
    );
  });
  
  /**
   * A small sparkline-like component to visualize weekly usage trends.
   * You can customize styling, color, or switch to a small chart library if needed.
   */
  export const UsageSparkline = component$((props: { usageData: number[] }) => {
    const maxUsage = Math.max(...props.usageData, 1); // avoid division by zero
    return (
      <div class="flex items-end h-10 space-x-1">
        {props.usageData.map((val, idx) => {
          const barHeight = (val / maxUsage) * 100; // % height
          return (
            <div
              key={idx}
              class="bg-blue-500 w-2 transition-all"
              style={{
                height: `${barHeight}%`,
              }}
            ></div>
          );
        })}
      </div>
    );
  });
