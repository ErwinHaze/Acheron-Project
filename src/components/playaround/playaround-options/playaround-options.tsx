import { component$ } from '@builder.io/qwik';

interface PlayaroundOptionsProps {
  store: any; // For brevity, using 'any'
}

export const PlayaroundOptions = component$((props: PlayaroundOptionsProps) => {
  const { store } = props;

  return (
    <div class="space-y-4 mb-6">
      <div>
        <label class="block text-sm font-semibold">Model Type</label>
        <select
          class="w-full p-2 border rounded"
          value={store.modelType}
          onChange$={(e) => (store.modelType = (e.target as HTMLSelectElement).value)}
        >
          <option value="GPT-4">GPT-4</option>
          <option value="DALL-E">DALL-E</option>
          <option value="Custom-Model">Custom Model</option>
        </select>
      </div>

      <div>
        <label class="block text-sm font-semibold">Response Speed</label>
        <select
          class="w-full p-2 border rounded"
          value={store.responseSpeed}
          onChange$={(e) => (store.responseSpeed = (e.target as HTMLSelectElement).value)}
        >
          <option value="fast">Fast</option>
          <option value="medium">Medium</option>
          <option value="slow">Slow</option>
        </select>
      </div>

      <div>
        <label class="block text-sm font-semibold">Temperature</label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={store.temperature}
          class="w-full"
          onInput$={(e) => (store.temperature = +(e.target as HTMLInputElement).value)}
        />
        <span class="text-sm">Current: {store.temperature}</span>
      </div>

      <div>
        <label class="block text-sm font-semibold">Context Length</label>
        <input
          type="number"
          min="256"
          max="4096"
          value={store.contextLength}
          class="w-full p-2 border rounded"
          onInput$={(e) => (store.contextLength = +(e.target as HTMLInputElement).value)}
        />
      </div>

      <div>
        <label class="block text-sm font-semibold">Output Format</label>
        <select
          class="w-full p-2 border rounded"
          value={store.outputFormat}
          onChange$={(e) => (store.outputFormat = (e.target as HTMLSelectElement).value)}
        >
          <option value="text">Text</option>
          <option value="json">JSON</option>
          <option value="html">HTML</option>
        </select>
      </div>
    </div>
  );
});
