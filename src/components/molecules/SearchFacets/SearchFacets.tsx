import { component$ } from '@builder.io/qwik';
import { FacetGroup } from '../../atoms/FacetGroup';
import { CategoryFilter } from '../../atoms/CategoryFilter';
import { RangeSlider } from '../../atoms/RangeSlider';
import { AccuracySlider } from '../../atoms/AccuracySlider';

interface Filters {
  category: string;
  priceRange: [number, number];
  accuracy: number;
}

interface SearchFacetsProps {
  filters: Filters;
  onFilterChange$: (filters: Filters) => void;
}

export const SearchFacets = component$<SearchFacetsProps>(({ filters, onFilterChange$ }) => {
  return (
    <div class="space-y-6">
      <FacetGroup title="Category">
        <CategoryFilter 
          selected={filters.category}
          onChange$={(c: string) => onFilterChange$({ ...filters, category: c })}
        />
      </FacetGroup>

      <FacetGroup title="Price Range">
        <RangeSlider
          min={0}
          max={1000}
          values={filters.priceRange}
          onChange$={(range: [number, number]) => onFilterChange$({ ...filters, priceRange: range })}
        />
      </FacetGroup>

      <FacetGroup title="Minimum Accuracy">
        <AccuracySlider
          value={filters.accuracy}
          onChange$={(acc: number) => onFilterChange$({ ...filters, accuracy: acc })}
        />
      </FacetGroup>
    </div>
  );
});