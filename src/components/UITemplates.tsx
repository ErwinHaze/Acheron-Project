import { component$, Slot, useSignal, useStore } from '@builder.io/qwik';

interface UITemplateProps {
  type: 'auth' | 'detail' | 'listing' | 'page' | 'playground';
  title?: string;
  items?: any[];
  renderItem?: (item: any) => any;
  store?: {
    selectedModel?: string;
    modelType?: string;
    responseSpeed?: string;
    temperature?: number;
    contextLength?: number;
    outputFormat?: string;
    response?: string;
  };
  models?: string[];
}

export const UITemplate = component$<UITemplateProps>(({
  type,
  title = '',
  items = [],
  renderItem,
  store = {
    selectedModel: '',
    modelType: 'GPT-4',
    responseSpeed: 'fast',
    temperature: 0.7,
    contextLength: 256,
    outputFormat: 'text',
    response: '',
  },
  models = [],
}) => {
  const state = useStore(store);
  const sidebarVisible = useSignal(true);

  return (
    <div class={`w-full ${type === 'auth' || type === 'playground' ? 'min-h-screen' : ''} ${type === 'page' ? 'bg-gray-50' : ''}`}>
      {type === 'auth' && (
        <div class="flex flex-col justify-between h-full p-6 max-w-md mx-auto">
          <header class="mb-4">
            <h1 class="text-2xl font-bold text-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-lg">
              {title}
            </h1>
          </header>
          <main class="flex-1">
            <Slot />
          </main>
          <footer class="mt-4 text-center text-xs text-gray-400">
            © 2025 AI Model Store
          </footer>
        </div>
      )}

      {type === 'detail' && (
        <div class="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow">
          <Slot name="header" />
          <Slot />
          <Slot name="footer" />
        </div>
      )}

      {type === 'listing' && items && renderItem && (
        <div class="grid gap-4 p-4">
          {items.map((item) => (
            <div key={item.id} class="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
              {renderItem(item)}
            </div>
          ))}
        </div>
      )}

      {type === 'page' && (
        <div class="p-6">
          <header class="mb-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4 rounded-t-lg">
            <h1 class="text-2xl font-bold">{title}</h1>
          </header>
          <main class="bg-white p-6 rounded-b-lg shadow">
            <Slot />
          </main>
        </div>
      )}

      {type === 'playground' && (
        <div class="flex h-screen">
          <button
            class="fixed top-4 left-4 p-2 bg-gray-800 text-white rounded-full z-20 hover:bg-gray-700 transition"
            onClick$={() => sidebarVisible.value = !sidebarVisible.value}
          >
            {sidebarVisible.value ? 'Hide' : 'Show'}
          </button>

          <div class={`${sidebarVisible.value ? 'block' : 'hidden'} md:block w-full md:w-72 bg-gray-100 p-6 border-r shadow-lg overflow-auto`}>
            <Slot name="sidebar" />
            {models.length > 0 && (
              <div class="mt-6 space-y-3 text-sm">
                <h2 class="font-semibold">Models</h2>
                <ul class="space-y-2">
                  {models.map((model) => (
                    <li
                      key={model}
                      class={`p-2 rounded-md cursor-pointer transition hover:bg-gray-200 ${state.selectedModel === model ? 'bg-blue-100' : ''}`}
                      onClick$={() => state.selectedModel = model}
                    >
                      {model}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div class="mt-6 space-y-4 text-sm">
              <div>
                <label class="block font-semibold mb-1">Type</label>
                <select
                  class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                  value={state.modelType}
                  onChange$={(e) => state.modelType = (e.target as HTMLSelectElement).value}
                >
                  {['GPT-4', 'DALL-E', 'Custom-Model'].map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
              <div>
                <label class="block font-semibold mb-1">Speed</label>
                <select
                  class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                  value={state.responseSpeed}
                  onChange$={(e) => state.responseSpeed = (e.target as HTMLSelectElement).value}
                >
                  {['fast', 'medium', 'slow'].map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
              <div>
                <label class="block font-semibold mb-1">Temperature</label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={state.temperature}
                  class="w-full"
                  onInput$={(e) => state.temperature = Number((e.target as HTMLInputElement).value)}
                />
                <span class="block text-right text-xs text-gray-600">{state.temperature}</span>
              </div>
              <div>
                <label class="block font-semibold mb-1">Context</label>
                <input
                  type="number"
                  min="256"
                  max="4096"
                  value={state.contextLength}
                  class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                  onInput$={(e) => state.contextLength = Number((e.target as HTMLInputElement).value)}
                />
              </div>
              <div>
                <label class="block font-semibold mb-1">Format</label>
                <select
                  class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                  value={state.outputFormat}
                  onChange$={(e) => state.outputFormat = (e.target as HTMLSelectElement).value}
                >
                  {['text', 'json', 'html'].map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div class="flex-1 overflow-auto p-6 bg-gray-50">
            <Slot />
            {state.response && (
              <div class="mt-6 bg-white p-4 rounded-lg border shadow">
                <h2 class="text-lg font-semibold mb-2">Response</h2>
                <div class="text-gray-700 whitespace-pre-wrap text-sm">{state.response}</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
});
