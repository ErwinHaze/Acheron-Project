import { component$, useSignal, useTask$ } from '@builder.io/qwik';
import { fetchCategories } from '~/backbend/categories';
import { CategoryCard, CategoriesFilter, MarketOverview, SortableCategoriesTable } from '~/components/features/model-discovery';

// Added type definition for Category

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