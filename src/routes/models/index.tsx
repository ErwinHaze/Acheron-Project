import { component$, useSignal, useTask$ } from '@builder.io/qwik';
import { SearchBar } from '~/components/molecules/SearchBar/SearchBar';
import { fetchModels } from '~/routes/api/models';
import { FilterDropdowns } from '~/components/molecules/FilterDropdowns/FilterDropdowns';
import { ModelGrid } from '~/components/molecules/ModelGrid/ModelGrid';

export default component$(() => {
  const models = useSignal([]);
  const filters = useSignal({
    useCase: '',
    performanceMetric: '',
    popularity: '',
    compatibility: '',
  });

  // Fetch models from Supabase
  useTask$(async () => {
    const data = await fetchModels(filters.value);
    models.value = data;
  });

  return (
    <div class="container mx-auto px-4 py-8">
      {/* Search Bar */}
      <SearchBar class="mb-4" placeholder="Search AI Models..." />

      {/* Filters */}
      <div class="mb-6">
        <FilterDropdowns
          useCase={filters.value.useCase}
          performanceMetric={filters.value.performanceMetric}
          popularity={filters.value.popularity}
          compatibility={filters.value.compatibility}
          onUpdate$={(newFilters) => (filters.value = newFilters)}
        />
      </div>

      {/* Model Grid */}
      <ModelGrid models={models.value} />
    </div>
  );
});