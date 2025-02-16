import { component$, useSignal, $ } from '@builder.io/qwik';
import { ModelCardCompact } from '~/components/organisms/ModelCard/ModelCardCompact';

interface Model {
  id: string;
  price: number;
  accuracy: number;
  // ...other fields...
}

interface Option {
  value: string;
  label: string;
}

interface SearchResultsGridProps {
  results: Model[];
  query: string;
}

const SortDropdown = component$<{ options: Option[]; onSelect$: (value: string) => void }>(
  ({ options, onSelect$ }) => {
    const selectedOption = useSignal(options[0].value);

    const handleChange = $(async (e: Event) => {
      const target = e.target as HTMLSelectElement;
      onSelect$(target.value);
    });

    return (
      <select
        class="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        value={selectedOption.value}
        onChange$={handleChange}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }
);

const SearchPagination = component$<{
  currentPage: number;
  totalPages: number;
  onPageChange$: (page: number) => void;
}>(({ currentPage, totalPages, onPageChange$ }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePageClick = $(async (page: number) => {
    onPageChange$(page);
  });

  return (
    <div class="flex justify-center mt-8">
      <nav class="inline-flex -space-x-px">
        <button
          class="py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
          onClick$={() => handlePageClick(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {pageNumbers.map((page) => (
          <button
            key={page}
            class={`py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ${
              page === currentPage ? 'bg-primary-500 text-white hover:bg-primary-600' : ''
            }`}
            onClick$={() => handlePageClick(page)}
          >
            {page}
          </button>
        ))}
        <button
          class="py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
          onClick$={() => handlePageClick(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </nav>
    </div>
  );
});

export const SearchResultsGrid = component$<SearchResultsGridProps>(({ results, query }) => {
  const currentPage = useSignal(1);
  const allResults = useSignal([...results]);
  const totalPages = useSignal(Math.ceil(results.length / 10));

  const handleSortChange = $(async (sortValue: string) => {
    switch (sortValue) {
      case 'relevance':
        allResults.value = [...results].sort((a, b) => b.id.localeCompare(a.id));
        break;
      case 'price':
        allResults.value = [...results].sort((a, b) => a.price - b.price);
        break;
      case 'accuracy':
        allResults.value = [...results].sort((a, b) => b.accuracy - a.accuracy);
        break;
      default:
        allResults.value = results;
    }
    currentPage.value = 1; // Reset to first page after sorting
  });

  const handlePageChange = $(async (page: number) => {
    currentPage.value = page;
  });

  const paginatedResults = allResults.value.slice((currentPage.value - 1) * 10, currentPage.value * 10);

  return (
    <div class="space-y-4">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-xl font-semibold">
          {paginatedResults.length} results for "{query}"
        </h2>
        <SortDropdown
          options={[
            { value: 'relevance', label: 'Relevance' },
            { value: 'price', label: 'Price' },
            { value: 'accuracy', label: 'Accuracy' }
          ]}
          onSelect$={handleSortChange}
        />
      </div>
      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {paginatedResults.map((model) => (
          <ModelCardCompact key={model.id} model={model} />
        ))}
      </div>
      <SearchPagination
        currentPage={currentPage.value}
        totalPages={totalPages.value}
        onPageChange$={handlePageChange}
      />
    </div>
  );
});