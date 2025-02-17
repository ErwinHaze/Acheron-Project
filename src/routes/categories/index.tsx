import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import { createClient } from '@supabase/supabase-js';
import { CategoryCard, CategoriesFilter, MarketOverview, SortableCategoriesTable } from '~/components/features/model-discovery';

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

export default component$(() => {
  const supabase = createClient(
    import.meta.env.PUBLIC_SUPABASE_URL,
    import.meta.env.PUBLIC_SUPABASE_KEY
  );

  const categories = useSignal<Category[]>([]);
  const sortBy = useSignal('model_count');
  const filter = useSignal('all');
  const error = useSignal<string>('');
  const isLoading = useSignal(true);

  useVisibleTask$(({ track }) => {
    track(() => [sortBy.value, filter.value]);

    const fetchCategories = async () => {
      try {
        let query = supabase
          .from('categories')
          .select(`
            id,
            name,
            model_count,
            weekly_trend,
            dominance,
            total_compute_cost,
            top_model,
            icon_url,
            domain
          `);

        if (filter.value !== 'all') {
          query = query.ilike('domain', `%${filter.value}%`);
        }

        const { data, error: fetchError } = await query
          .order(sortBy.value, { ascending: false })
          .limit(100);

        if (fetchError) throw fetchError;
        categories.value = data || [];
      } catch (err: any) {
        error.value = err.message || 'Failed to fetch categories';
      } finally {
        isLoading.value = false;
      }
    };

    fetchCategories();
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