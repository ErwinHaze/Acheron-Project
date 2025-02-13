import { component$ } from '@builder.io/qwik';

/**
 * Defines a single trending model.
 */
interface TrendingModel {
  id: number;
  name: string;
  usageCount: number; // e.g., how many times it was used/viewed
}

/**
 * Props for rendering a list of trending models.
 */
interface TrendingModelsProps {
  models: TrendingModel[];
}

export const TrendingModels = component$((props: TrendingModelsProps) => {
  return (
    <div class="bg-white p-4 rounded shadow">
      <h2 class="text-xl font-bold mb-4">Trending Models</h2>
      <ul>
        {props.models.map((model) => (
          <li key={model.id} class="flex justify-between border-b py-2">
            <span>{model.name}</span>
            <span class="text-gray-600">{model.usageCount} uses</span>
          </li>
        ))}
      </ul>
    </div>
  );
});
