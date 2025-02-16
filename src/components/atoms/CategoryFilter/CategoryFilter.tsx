// src/components/atoms/CategoryFilter/CategoryFilter.tsx
import { component$ } from '@builder.io/qwik';

interface CategoryFilterProps {
  selected: string;
  onChange$: (category: string) => void;
}

export const CategoryFilter = component$<CategoryFilterProps>(({ selected, onChange$ }) => {
  const categories = [
    { value: '', label: 'All Categories' },
    { value: 'nlp', label: 'Natural Language Processing' },
    { value: 'cv', label: 'Computer Vision' },
    { value: 'rl', label: 'Reinforcement Learning' },
    { value: 'other', label: 'Other' },
  ];

  return (
    <select
      class="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
      value={selected}
      onChange$={(e) => {
        const target = e.target as HTMLSelectElement | null;
        if (target) {
          onChange$(target.value);
        }
      }}
    >
      {categories.map((category) => (
        <option key={category.value} value={category.value}>
          {category.label}
        </option>
      ))}
    </select>
  );
});