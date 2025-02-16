// FILE: src/components/features/model-discovery/IntelligentFilters/ModelFilter.tsx
import { component$ } from '@builder.io/qwik';

export const ModelFilter = component$((props: {
  label: string;
  options: string[];
  onChange$?: any;
}) => {
  return (
    <div>
      <p class="text-sm font-semibold">{props.label}</p>
      <select class="border p-2" onChange$={props.onChange$}>
        {props.options.map((opt) => (
          <option key={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
});
