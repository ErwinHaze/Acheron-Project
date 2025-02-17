import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import { createClient } from '@supabase/supabase-js';
import { SortableCategoriesTable } from '~/components/organisms/SortableCategoriesTable/SortableCategoriesTable';

// Added type definition for Category
interface Category {
	id: number;
	name: string;
	model_count: number;
	weekly_trend: number;
	dominance: number;
	total_compute_cost: number;
	top_model: string;
	icon_url: string;
	domain?: string;
}

// Moved CategoryCard component
const CategoryCard = component$(({ category }: { category: Category }) => {
  return (
    <div class="category-card">
      <img src={category.icon_url} alt={category.name} />
      <h3>{category.name}</h3>
      <p>{category.model_count} models</p>
      <p>Top model: {category.top_model}</p>
    </div>
  );
});

// Moved CategoriesFilter component
const CategoriesFilter = component$(({ currentFilter, onFilter$ }: { currentFilter: string, onFilter$: (filter: string) => void }) => {
  const filters = ['all', 'domain1', 'domain2']; // Example filters
  return (
    <div class="categories-filter">
      {filters.map(filter => (
        <button
          key={filter}
          class={currentFilter === filter ? 'active' : ''}
          onClick$={() => onFilter$(filter)}
        >
          {filter}
        </button>
      ))}
    </div>
  );
});

// Moved MarketOverview component
const MarketOverview = component$(() => {
  return (
    <div class="market-overview">
      <h2>Market Overview</h2>
      <p>Some market overview content...</p>
    </div>
  );
});

export default component$(() => {
    const categories = useSignal<Promise<Category[]>[]>([]);
    const sortBy = useSignal('model_count');
    const filter = useSignal('all');
    const error = useSignal<string>('');
    const isLoading = useSignal(true);

    useTask$(({ track }) => {
        track(() => [sortBy.value, filter.value]);

        categories.value = fetchCategories(filter.value, sortBy.value);
    });

    return (
        <div class="container mx-auto px-4">
            <MarketOverview />
            {isLoading.value && <div class="text-center text-gray-500 my-4">Loading...</div>}
            {error.value ? (
                <div class="text-center text-red-500 my-4">{error.value}</div>
            ) : (
                <>
                    <div class="grid gap-6 md:grid-cols-4">
                        <div class="md:col-span-1">
                            <CategoriesFilter
                                currentFilter={filter.value}
                                onFilter$={(f) => filter.value = f}
                            />
                        </div>
                        <div class="md:col-span-3">
                            <SortableCategoriesTable
                                categories={categories.value}
                                sortBy={sortBy.value}
                                onSort$={(s) => sortBy.value = s}
                            />
                            <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-8">
                                {categories.value.slice(0, 6).map(category => (
                                    <CategoryCard key={category.id} category={category} />
                                ))}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
});