// components/molecules/SearchFacets.tsx
export const SearchFacets = component$(({ filters, onFilterChange$ }) => {
    return (
      <div class="space-y-6">
        <FacetGroup title="Category">
          <CategoryFilter 
            selected={filters.category}
            onChange$={(c) => onFilterChange$({ ...filters, category: c })}
          />
        </FacetGroup>
  
        <FacetGroup title="Price Range">
          <RangeSlider
            min={0}
            max={1000}
            values={filters.priceRange}
            onChange$={(range) => onFilterChange$({ ...filters, priceRange: range })}
          />
        </FacetGroup>
  
        <FacetGroup title="Minimum Accuracy">
          <AccuracySlider
            value={filters.accuracy}
            onChange$={(acc) => onFilterChange$({ ...filters, accuracy: acc })}
          />
        </FacetGroup>
      </div>
    );
  });