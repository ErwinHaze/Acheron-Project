import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import { createClient } from '@supabase/supabase-js';
import { IntelligentSearchBar } from '~/components/molecules/IntelligentSearchBar/IntelligentSearchBar';
import { SearchResultsGrid } from '~/components/organisms/SearchResultsGrid/SearchResultsGrid';
import { SearchFacets } from '~/components/molecules/SearchFacets/SearchFacets';

interface AIModel {
  id: string;
  name: string;
  description: string;
  accuracy: number;
  price: number;
  runtime: string;
  category: string;
  creator: {
    username: string;
    avatar_url: string;
  };
  trending_score: number;
}

export interface SearchResultsGridProps {
  results: AIModel[];
  query: string;
  isLoading?: boolean;
}

const LiveSearchTrends = component$(() => {
  const trends = useSignal([
    { id: 1, term: 'Image Generation', count: 1240 },
    { id: 2, term: 'Text to Speech', count: 890 },
    { id: 3, term: 'Code Generation', count: 750 },
    { id: 4, term: 'Natural Language', count: 620 },
    { id: 5, term: 'Video Generation', count: 580 }
  ]);

  return (
    <div class="bg-dark-800 rounded-lg p-4">
      <h3 class="text-lg font-semibold mb-3">Trending Searches</h3>
      <ul class="space-y-2">
        {trends.value.map((trend) => (
          <li key={trend.id} class="flex justify-between items-center">
            <span class="text-gray-300">{trend.term}</span>
            <span class="text-sm text-gray-400">{trend.count}</span>
          </li>
        ))}
      </ul>
    </div>
  );
});

export default component$(() => {
  if (!import.meta.env.PUBLIC_SUPABASE_URL || !import.meta.env.PUBLIC_SUPABASE_KEY) {
    console.error('Missing Supabase environment variables');
    return <div>Configuration Error</div>;
  }

  const supabase = createClient(
    import.meta.env.PUBLIC_SUPABASE_URL,
    import.meta.env.PUBLIC_SUPABASE_KEY
  );

  const searchQuery = useSignal('');
  const searchResults = useSignal<AIModel[]>([]);
  const isLoading = useSignal(false);
  const error = useSignal('');
  const filters = useSignal({
    category: '',
    priceRange: [0, 1000] as [number, number],
    accuracy: 75
  });

  useVisibleTask$(({ track }) => {
    track(() => [searchQuery.value, filters.value]);

    const searchModels = async () => {
      try {
        isLoading.value = true;
        error.value = '';

        if (!searchQuery.value.trim()) {
          searchResults.value = [];
          return;
        }

        let query = supabase
          .from('ai_models')
          .select(`
            id,
            name,
            description,
            accuracy,
            price,
            runtime,
            category,
            creator:profiles(username, avatar_url),
            trending_score
          `)
          .textSearch('search_vector', searchQuery.value + ':*');

        if (filters.value.category) {
          query = query.eq('category', filters.value.category);
        }

        const { data, error: supabaseError } = await query
          .gte('accuracy', filters.value.accuracy)
          .range('price', filters.value.priceRange[0], filters.value.priceRange[1])
          .limit(50);

        if (supabaseError) {
          throw supabaseError;
        }

        searchResults.value = data || [];
      } catch (e) {
        error.value = e instanceof Error ? e.message : 'An error occurred while searching';
        searchResults.value = [];
      } finally {
        isLoading.value = false;
      }
    };

    const debounceSearch = setTimeout(searchModels, 300);
    return () => clearTimeout(debounceSearch);
  });

  return (
    <div class="container mx-auto px-4">
      <div class="mb-8">
        <IntelligentSearchBar 
          query={searchQuery.value}
          onInput$={(q: string) => searchQuery.value = q}
        />
      </div>

      {error.value && (
        <div class="text-red-500 mb-4">{error.value}</div>
      )}

      <div class="grid gap-6 md:grid-cols-4">
        <div class="md:col-span-1">
          <SearchFacets
            filters={filters.value}
            onFilterChange$={(newFilters) => filters.value = newFilters}
          />
          <div class="mt-6">
            <LiveSearchTrends />
          </div>
        </div>

        <div class="md:col-span-3">
          <SearchResultsGrid 
            results={searchResults.value}
            query={searchQuery.value}
          />
        </div>
      </div>
    </div>
  );
});