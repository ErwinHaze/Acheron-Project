// FILE: src/components/organisms/TrendingModels/TrendingModelsList.tsx
import { component$ } from '@builder.io/qwik';
import { TrendingModelItem } from './TrendingModelItem';

interface TrendingModelsListProps {
  items: {
    id: string;
    rank: number;
    modelName: string;
    performanceChange: string;
  }[];
}

  const TRENDINGMODEL = [
    {
      id: '1',
      rank: 1,
      modelName: 'GPT-4 Turbo',
      performanceChange: '+12.5%'
    },
    {
      id: '2',
      rank: 2,
      modelName: 'Stable Diffusion 3',
      performanceChange: '+8.7%'
    },
  ];

export const TrendingModelsList = component$<TrendingModelsListProps>((props) => {
  return (
    <div class="bg-gray-900 p-6 rounded-xl">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-semibold text-white">Trending AI Models</h3>
        <span class="text-gray-400 cursor-pointer">{'>'}</span>
      </div>
      <div class="space-y-3">
      {TRENDINGMODEL.map((model) => (
            <TrendingModelItem key={model.id} {...model} />
          ))};
      </div>
    </div>
  );
});