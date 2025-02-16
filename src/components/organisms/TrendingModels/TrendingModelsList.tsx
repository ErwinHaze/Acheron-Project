// FILE: src/components/organisms/TrendingModels/TrendingModelsList.tsx
import { component$ } from '@builder.io/qwik';
import { TrendingModelItem } from './TrendingModelItem';

interface TrendingModel {
  id: string;
  name: string;
  direction: 'up'|'down';
}

export const TrendingModelsList = component$((props: { items: TrendingModel[] }) => {
  return (
    <div class="border rounded p-4">
      <h2 class="text-lg font-bold mb-2">Trending Models</h2>
      {props.items.map((model) => (
        <TrendingModelItem key={model.id} {...model} />
      ))}
    </div>
  );
});
