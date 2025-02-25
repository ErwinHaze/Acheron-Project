import { component$, useSignal } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import { UITemplate } from '~/components/UITemplates';
import { UIOrganism } from '~/components/UIOrganism';
import { UIMolecule } from '~/components/UIMolecules';
import { UIAtom } from '~/components/UIAtom';
// Import necessary hooks and data fetching logic
import { useLabsData, useCategoriesData, useModelData } from '~/hooks/models';

type Filter = { category: string; priceRange: [number, number]; accuracy: number };

export default component$(() => {
  const loc = useLocation();
  const modelId = loc.params.modelId;

  // Fetch data using custom hooks (assumed to exist)
  const labsData = useLabsData();
  const categoriesData = useCategoriesData();
  const model = useModelData(modelId);
  const isLoading = labsData.isLoading || categoriesData.isLoading || model.isLoading;
  const error = labsData.error || categoriesData.error || model.error;

  // Provide a default filter value that meets the required type
  const defaultFilter: Filter = { category: '', priceRange: [0, 100], accuracy: 0 };

  // Reactive state for tabs and filters (simplified)
  const selectedTab = useSignal('labs');
  const filterLabs = useSignal<Filter>(defaultFilter);
  const filterCategories = useSignal<Filter>(defaultFilter);
  const sortByLabs = useSignal('name');
  const sortByCategories = useSignal('name');

  return (
    // Using an allowed template type ("page")
    <UITemplate type="page">
      {isLoading ? (
        <UIAtom type="loader" />
      ) : error ? (
        <div class="error text-red-500">{error}</div>
      ) : modelId && model.value ? (
        // Detail View
        <div class="model-details max-w-4xl mx-auto p-6">
          <h1 class="text-3xl font-bold mb-4">{model.value.name}</h1>
          <p class="text-gray-600 mb-6">{model.value.description}</p>
          <UIOrganism type="performance" data={model.value as any} />
          <div class="flex gap-4 mb-6">
            {model.value.documentationUrl && (
              <a href={model.value.documentationUrl} class="text-blue-500">
                Docs
              </a>
            )}
            {model.value.repositoryUrl && (
              <a href={model.value.repositoryUrl} class="text-blue-500">
                Repo
              </a>
            )}
          </div>
          <UIOrganism type="feedback" data={model.value.feedback as any} />
        </div>
      ) : (
        // List View
        <>
          <UIOrganism type="hero" />
          <div class="tabs flex space-x-4 mb-6 px-6">
            <button
              class={`px-4 py-2 ${
                selectedTab.value === 'labs' ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
              onClick$={() => (selectedTab.value = 'labs')}
            >
              Labs
            </button>
            <button
              class={`px-4 py-2 ${
                selectedTab.value === 'categories' ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
              onClick$={() => (selectedTab.value = 'categories')}
            >
              Categories
            </button>
          </div>
          <div class="grid gap-6 lg:grid-cols-3 px-6">
            <div class="lg:col-span-2">
              {selectedTab.value === 'labs' ? (
                <>
                  <UIOrganism type="stats" data={labsData.value} />
                  <UIMolecule
                    type="filter"
                    filters={filterLabs.value}
                    onChange$={(f) => {
                      if (typeof f === 'string') {
                        filterLabs.value = { ...filterLabs.value, category: f };
                      } else if (typeof f === 'number') {
                        filterLabs.value = { ...filterLabs.value, accuracy: f };
                      } else if (Array.isArray(f)) {
                        filterLabs.value = { ...filterLabs.value, priceRange: f };
                      }
                    }}
                  />
                  <UIOrganism
                    type="sortable-labs"
                    data={labsData.value}
                    sortBy={sortByLabs.value}
                    onSort$={(s) => (sortByLabs.value = s)}
                  />
                  <div class="grid gap-4 md:grid-cols-2">
                    {labsData.value.map((lab) => (
                      <UIOrganism key={lab.id} type="model-card" data={lab as unknown as any[]} />
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <UIOrganism type="overview" data={categoriesData.value} />
                  <UIMolecule
                    type="filter"
                    filters={filterCategories.value}
                    onChange$={(f) => {
                      if (typeof f === 'string') {
                        filterCategories.value = { ...filterCategories.value, category: f };
                      } else if (typeof f === 'number') {
                        filterCategories.value = { ...filterCategories.value, accuracy: f };
                      } else if (Array.isArray(f)) {
                        filterCategories.value = { ...filterCategories.value, priceRange: f };
                      }
                    }}
                  />
                  <UIOrganism
                    type="sortable-categories"
                    data={categoriesData.value}
                    sortBy={sortByCategories.value}
                    onSort$={(s) => (sortByCategories.value = s)}
                  />
                  <div class="grid gap-4 md:grid-cols-2">
                    {categoriesData.value.map((category) => (
                      <UIOrganism
                        key={category.id}
                        type="category-grid"
                        data={category as any}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
            <div class="lg:col-span-1">
              <UIOrganism
                type="stats"
                data={
                  {
                    total:
                      selectedTab.value === 'labs'
                        ? labsData.value.length
                        : categoriesData.value.length,
                  } as any
                }
              />
            </div>
          </div>
        </>
      )}
    </UITemplate>
  );
});