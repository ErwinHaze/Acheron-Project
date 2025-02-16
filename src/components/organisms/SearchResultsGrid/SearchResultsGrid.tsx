// components/features/model-discovery/SearchResultsGrid.tsx
export const SearchResultsGrid = component$(({ results, query }) => {
    return (
      <div class="space-y-4">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-semibold">
            {results.length} results for "{query}"
          </h2>
          <SortDropdown 
            options={[
              { value: 'relevance', label: 'Relevance' },
              { value: 'price', label: 'Price' },
              { value: 'accuracy', label: 'Accuracy' }
            ]}
          />
        </div>
  
        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {results.map((model) => (
            <ModelCardCompact 
              key={model.id} 
              model={model} 
              showTrending={true}
            />
          ))}
        </div>
  
        <SearchPagination />
      </div>
    );
  });