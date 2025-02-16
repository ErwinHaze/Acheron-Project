// FILE: src/components/features/model-discovery/ModelComparator/ComparisonPanel.tsx
import { component$ } from '@builder.io/qwik';

export const ComparisonPanel = component$((props: { models: any[] }) => {
  if (!props.models.length) {
    return <p>No models selected for comparison.</p>;
  }

  return (
    <div class="grid grid-cols-2 gap-4">
      {props.models.map((m) => (
        <div key={m.id} class="border p-4">
          <h3 class="font-bold">{m.name}</h3>
          <p>Accuracy: {m.accuracy}%</p>
          <p>Price: ${m.price}</p>
        </div>
      ))}
    </div>
  );
});
