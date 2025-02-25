// src/components/templates/UITemplate.tsx
import { component$, Slot, useSignal, useStore } from '@builder.io/qwik';

interface UITemplateProps {
  type: 'auth' | 'detail' | 'listing' | 'page' | 'playground';
  title?: string; // For auth, page
  items?: any[]; // For listing
  renderItem?: (item: any) => any; // For listing
  store?: { // For playground
    selectedModel?: string;
    modelType?: string;
    responseSpeed?: string;
    temperature?: number;
    contextLength?: number;
    outputFormat?: string;
    response?: string;
  };
  models?: string[]; // For playground model-selector
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
  const state = useStore(store); // Reactive store for playground
  const sidebarVisible = useSignal(true); // Toggle for playground sidebar

  return (
    <div class={`w-full ${type === 'auth' || type === 'playground' ? 'min-h-screen' : ''} ${type === 'page' ? 'bg-gray-50' : ''}`}>
      {type === 'auth' && (
        <div class="flex flex-col justify-between h-full p-2">
          <header class="mb-2">
            <h1 class="text-lg font-bold text-center">{title}</h1>
          </header>
          <main class="flex-1">
            <Slot />
          </main>
          <footer class="mt-2 text-center text-xs text-gray-500">
            © 2025 AI Model Store
          </footer>
        </div>
      )}

      {type === 'detail' && (
        <div class="max-w-4xl mx-auto p-2">
          <Slot name="header" />
          <Slot />
          <Slot name="footer" />
        </div>
      )}

      {type === 'listing' && items && renderItem && (
        <div class="grid gap-2">
          {items.map((item) => (
            <div key={item.id} class="border p-2 rounded hover:bg-gray-100">
              {renderItem(item)}
            </div>
          ))}
        </div>
      )}

      {type === 'page' && (
        <div class="p-2">
          <header class="mb-2 bg-blue-600 text-white p-2 rounded">
            <h1 class="text-lg font-bold">{title}</h1>
          </header>
          <main class="bg-white p-2 rounded">
            <Slot />
          </main>
        </div>
      )}

      {type === 'playground' && (
        <div class="flex h-screen">
          {/* Sidebar Toggle */}
          <button
            class="fixed top-2 left-2 p-1 bg-gray-800 text-white rounded z-10 md:hidden"
            onClick$={() => sidebarVisible.value = !sidebarVisible.value}
          >
            {sidebarVisible.value ? 'Hide' : 'Show'}
          </button>

          {/* Sidebar */}
          <div class={`${sidebarVisible.value ? 'block' : 'hidden'} md:block w-full md:w-64 bg-gray-50 p-2 border-r overflow-auto`}>
            <Slot name="sidebar" />
            {models.length > 0 && (
              <div class="space-y-1 text-xs">
                <h2 class="text-sm font-semibold">Models</h2>
                <ul class="space-y-1">
                  {models.map((model) => (
                    <li
                      key={model}
                      class={`p-1 rounded cursor-pointer ${state.selectedModel === model ? 'bg-blue-200' : 'hover:bg-gray-200'}`}
                      onClick$={() => state.selectedModel = model}
                    >
                      {model}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div class="space-y-2 mt-2 text-xs">
              <div>
                <label class="block font-semibold">Type</label>
                <select class="w-full p-1 border rounded" value={state.modelType} onChange$={(e) => state.modelType = (e.target as HTMLSelectElement).value}>
                  {['GPT-4', 'DALL-E', 'Custom-Model'].map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              </div>
              <div>
                <label class="block font-semibold">Speed</label>
                <select class="w-full p-1 border rounded" value={state.responseSpeed} onChange$={(e) => state.responseSpeed = (e.target as HTMLSelectElement).value}>
                  {['fast', 'medium', 'slow'].map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              </div>
              <div>
                <label class="block font-semibold">Temperature</label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={state.temperature}
                  class="w-full"
                  onInput$={(e) => state.temperature = Number((e.target as HTMLInputElement).value)}
                />
                <span>{state.temperature}</span>
              </div>
              <div>
                <label class="block font-semibold">Context</label>
                <input
                  type="number"
                  min="256"
                  max="4096"
                  value={state.contextLength}
                  class="w-full p-1 border rounded"
                  onInput$={(e) => state.contextLength = Number((e.target as HTMLInputElement).value)}
                />
              </div>
              <div>
                <label class="block font-semibold">Format</label>
                <select class="w-full p-1 border rounded" value={state.outputFormat} onChange$={(e) => state.outputFormat = (e.target as HTMLSelectElement).value}>
                  {['text', 'json', 'html'].map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div class="flex-1 overflow-auto p-2">
            <Slot />
            {state.response && (
              <div class="bg-white p-2 rounded border h-48 overflow-auto text-xs">
                <h2 class="text-sm font-semibold">Response</h2>
                <div class="text-gray-700 whitespace-pre-wrap">{state.response}</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
});