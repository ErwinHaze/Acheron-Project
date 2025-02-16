import { component$, $, PropFunction } from '@builder.io/qwik';

interface ModelSelectorProps {
  models: string[];
  store: any; // Could define a more specific type if you prefer
}

export const ModelSelector = component$((props: ModelSelectorProps) => {
  const { models, store } = props;

  return (
    <div class="mt-6">
      <h2 class="text-lg font-semibold mb-2">Available Models</h2>
      <ul class="space-y-2">
        {models.map((model) => (
          <li
            key={model}
            class={`cursor-pointer p-2 rounded ${
              store.selectedModel === model ? 'bg-blue-200' : 'hover:bg-gray-200'
            }`}
            onClick$={() => (store.selectedModel = model)}
          >
            {model}
          </li>
        ))}
      </ul>
    </div>
  );
});
