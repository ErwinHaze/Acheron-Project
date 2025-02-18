// FILE: src/components/organisms/FeaturedModels/FeaturedModelsList.tsx
import { component$ } from '@builder.io/qwik';
import { FeaturedModelItem } from './FeaturedModelItem';

const FEATUREDMODEL = [
  { id: '1', rank: 1, modelName: 'Llama 2 70B', performanceChange: '+15.2%' },
  { id: '2', rank: 2, modelName: 'DALL-E 3', performanceChange: '+10.8%' },
  { id: '3', rank: 3, modelName: 'FLUX 1L', performanceChange: '+5.8%' },
];

export const FeaturedModelsList = component$(() => {
  return (
    <div class="bg-gray-900 p-6 rounded-xl">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-semibold text-white">Featured AI Models</h3>
        <span class="text-gray-400 cursor-pointer">{'>'}</span>
      </div>
      <div class="space-y-3">
        {FEATUREDMODEL.map((model) => (
          <FeaturedModelItem key={model.id} {...model} />
        ))}
      </div>
    </div>
  );
});
