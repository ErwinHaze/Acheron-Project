// src/components/model-card.tsx
import { component$ } from '@builder.io/qwik';

export const ModelCard =  component$(() => {
  const models = [
    { name: 'DALL-E 3', category: 'Image Generation', description: 'Generate stunning images from text prompts.', logo: '/dalle-logo.png', price: 'Free' },
    { name: 'GPT-4', category: 'Text Generation', description: 'Advanced text generation for any use case.', logo: '/gpt-logo.png', price: '$20/month' },
    { name: 'Jukebox', category: 'Music Generation', description: 'Create music in any style or genre.', logo: '/jukebox-logo.png', price: 'Free' },
  ];

  return (
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      {models.map((model, index) => (
        <div key={index} class="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
          <img src={model.logo} alt={model.name} class="w-20 h-20 mx-auto mb-4" />
          <h3 class="text-xl font-semibold text-white">{model.name}</h3>
          <p class="text-gray-400 mb-2">{model.category}</p>
          <p class="text-gray-300 mb-4">{model.description}</p>
          <div class="flex justify-between items-center">
            <span class="text-blue-400 font-bold">{model.price}</span>
            <button class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      ))}
    </div>
  );
});