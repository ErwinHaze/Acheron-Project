// FILE: src/components/features/model-discovery/EditorsChoice/EditorsChoiceGrid.tsx
import { component$ } from '@builder.io/qwik';
import { EditorsChoiceCard } from './EditorsChoiceCard';

export const EditorsChoiceGrid = component$((props: { models: any[] }) => {
  return (
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      {props.models.map((m) => (
        <EditorsChoiceCard key={m.id} model={m} />
      ))}
    </div>
  );
});
