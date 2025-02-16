// FILE: src/components/organisms/ModelCard/ModelCard.tsx
import { component$ } from '@builder.io/qwik';
import { ModelCardProps } from '~/types/models';

export const ModelCard = component$<ModelCardProps>(({ 
  model, 
  isSelected = false, 
  onSelect$, 
  showTrending = false 
}) => {
  return (
    <div 
      class={`model-card ${isSelected ? 'selected' : ''}`}
      onClick$={onSelect$}
    >
      <div class="border p-4 rounded shadow hover:shadow-md transition">
        <div class="flex justify-between items-center">
          <h2 class="text-lg font-bold">{model.name}</h2>
          <CategoryBadge category={model.category} />
        </div>
        <p class="text-sm text-gray-600">Creator: {model.creator}</p>
        <p class="text-sm text-gray-600">Price: ${model.price}</p>
        <p class="text-sm text-gray-600">Accuracy: {model.accuracy}%</p>
      </div>
    </div>
  );
});
