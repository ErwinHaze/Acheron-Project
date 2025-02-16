// FILE: src/components/molecules/FilterDropdowns/AccuracyFilter.tsx
import { component$ } from '@builder.io/qwik';

export const AccuracyFilter = component$((props: {
  onChange$?: any;
  selected?: string;
}) => {
  return (
    <select class="border p-2" onChange$={props.onChange$} value={props.selected}>
      <option value="all">All Accuracy</option>
      <option value="high">High Accuracy</option>
      <option value="medium">Medium Accuracy</option>
    </select>
  );
});
