import { component$, useSignal, useTask$ } from '@builder.io/qwik';
import SearchBar from '~/components/molecules/SearchBar/SearchBar';
import FilterDropdowns from '~/components/molecules/FilterDropdowns/FilterDropdowns';
import ModelGrid from '~/components/organisms/ModelGrid/ModelGrid';
import { fetchModels } from '~/api/models';

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
    <div class="models-page">
      {/* Search Bar */}
      <SearchBar placeholder="Search AI Models..." />

      {/* Filters */}
      <div class="filters-section">
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