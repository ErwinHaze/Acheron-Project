// FILE: src/components/molecules/FilterDropdowns/CategoryFilter.tsx
import { component$ } from '@builder.io/qwik';

export const CategoryFilter = component$((props: {
  onChange$?: any;
  selected?: string;
  categories: string[];
}) => {
  return (
    <select class="border p-2" onChange$={props.onChange$} value={props.selected}>
      <option value="All">All Categories</option>
      {props.categories.map((cat) => (
        <option key={cat} value={cat}>{cat}</option>
      ))}
    </select>
  );
});
