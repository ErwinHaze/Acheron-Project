// FILE: src/components/features/model-discovery/ModelComparator/ModelComparator.tsx
import { component$, useStore } from '@builder.io/qwik';
import { ComparisonPanel } from './ComparisonPanel';

export const ModelComparator = component$(() => {
  const store = useStore({ selectedModels: [] as any[] });

  return (
    <div>
      <h2 class="text-xl font-bold">Compare Models</h2>
      <ComparisonPanel models={store.selectedModels} />
    </div>
  );
});
