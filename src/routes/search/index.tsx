import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import { 
  IntelligentSearchBar, 
  SearchResultsGrid,
  SearchFacets,
  LiveSearchTrends 
} from '~/components/features/model-discovery';

export default component$(() => {
  const supabase = createClient(
    import.meta.env.PUBLIC_SUPABASE_URL,
    import.meta.env.PUBLIC_SUPABASE_KEY
  );

  const searchQuery = useSignal('');
  const searchResults = useSignal<AIModel[]>([]);
  const filters = useSignal({
    category: '',
    priceRange: [0, 1000],
    accuracy: 75
  });

  useVisibleTask$(({ track }) => {
    track(() => [searchQuery.value, filters.value]);

    const searchModels = async () => {
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

      const { data } = await query
        .gte('accuracy', filters.value.accuracy)
        .range('price', filters.value.priceRange[0], filters.value.priceRange[1])
        .limit(50);

      searchResults.value = data || [];
    };

    const debounceSearch = setTimeout(searchModels, 300);
    return () => clearTimeout(debounceSearch);
  });

  return (
    <div class="container mx-auto px-4">
      <div class="mb-8">
        <IntelligentSearchBar 
          query={searchQuery.value}
          onInput$={(q) => searchQuery.value = q}
        />
      </div>

      <div class="grid gap-6 md:grid-cols-4">
        <div class="md:col-span-1">
          <SearchFacets
            filters={filters.value}
            onFilterChange$={(newFilters) => filters.value = newFilters}
          />
          <LiveSearchTrends class="mt-6" />
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