// FILE: src/components/features/model-discovery/EditorsChoice/EditorsChoiceCard.tsx
import { component$ } from '@builder.io/qwik';

export const EditorsChoiceCard = component$((props: { model: any }) => {
  return (
    <div class="border p-4 rounded shadow hover:shadow-md transition">
      <h3 class="text-lg font-bold">{props.model.name}</h3>
      <p class="text-sm text-gray-600">{props.model.description}</p>
    </div>
  );
});
