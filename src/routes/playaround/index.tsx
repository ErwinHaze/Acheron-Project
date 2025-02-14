import { component$, useStore, useResource$, Resource, $ } from '@builder.io/qwik';
import { Footer } from '~/components/Footer/Footer';
import { Header } from '~/components/header/header';
import { ModelSelector } from '~/components/playaround/model-selector/model-selector';
import { PlayaroundOptions } from '~/components/playaround/playaround-options/playaround-options';
import { PlayaroundOutput } from '~/components/playaround/playaround-output/playaround-output';

export default component$(() => {
  // State store for customization options
  const store = useStore({
    modelType: 'GPT-4',
    responseSpeed: 'fast',
    temperature: 0.7,
    contextLength: 2048,
    outputFormat: 'text',
    selectedModel: '',      // For user’s model selection from the list
    userPrompt: '',         // The text input from the user
    response: '',           // The AI response
  });

  // Resource to fetch the list of available models
  const modelsResource = useResource$(async () => {
    const res = await fetch('/api/models');
    if (!res.ok) {
      throw new Error('Failed to fetch model list');
    }
    return res.json();
  });

  // Function to handle user prompt submission (fixed with $())
  const handleSubmit = $(async () => {
    try {
      const res = await fetch('/api/playaround', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: store.selectedModel || store.modelType,
          responseSpeed: store.responseSpeed,
          temperature: store.temperature,
          contextLength: store.contextLength,
          outputFormat: store.outputFormat,
          prompt: store.userPrompt,
        }),
      });
      const data = await res.json();
      store.response = data.response;
    } catch (error) {
      console.error('Error:', error);
    }
  });

  return (
    <>
    <Header />
    <div class="flex flex-col md:flex-row min-h-screen">
      {/* Left Panel: Model list & customizations */}
      <aside class="md:w-1/4 bg-gray-100 p-4 border-r">
        <h1 class="text-xl font-bold mb-4">Playaround</h1>

        {/* Customization options above the model list */}
        <PlayaroundOptions store={store} />

        {/* Dynamic Model Selector */}
        <Resource
          value={modelsResource}
          onPending={() => <p>Loading models...</p>}
          onRejected={(error) => <p>Error: {error.message}</p>}
          onResolved={(models: Array<string>) => (
            <ModelSelector
              models={models}
              store={store}
            />
          )}
        />
      </aside>

      {/* Main Interaction Area */}
      <main class="md:w-3/4 p-4">
        <div class="mb-4">
          <label class="block mb-2 font-semibold">Your Prompt</label>
          <textarea
            class="w-full p-2 border rounded"
            rows={6}
            value={store.userPrompt}
            onInput$={(e) => (store.userPrompt = (e.target as HTMLTextAreaElement).value)}
          />
          <button
            class="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            onClick$={handleSubmit}  // ✅ Wrapped with $()
          >
            Send
          </button>
        </div>

        <PlayaroundOutput response={store.response} />
      </main>
    </div>
    <Footer />
    </>
  );
});
