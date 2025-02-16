// FILE: src/components/molecules/FilterDropdowns/PriceFilter.tsx
import { component$ } from '@builder.io/qwik';

export const PriceFilter = component$((props: {
  onChange$?: any;
  selected?: string;
}) => {
  return (
    <select class="border p-2" onChange$={props.onChange$} value={props.selected}>
      <option value="all">All Prices</option>
      <option value="free">Free</option>
      <option value="paid">Paid</option>
    </select>
  );
});
