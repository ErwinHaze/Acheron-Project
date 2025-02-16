// FILE: src/components/features/model-discovery/IntelligentFilters/FilterGroup.tsx
import { component$ } from '@builder.io/qwik';
import { ModelFilter } from './ModelFilter';

export const FilterGroup = component$(() => {
  // Example usage of multiple filters
  return (
    <div class="flex gap-4">
      <ModelFilter label="Category" options={['All', 'NLP', 'Vision']} />
      <ModelFilter label="Price" options={['All', 'Free', 'Paid']} />
    </div>
  );
});
