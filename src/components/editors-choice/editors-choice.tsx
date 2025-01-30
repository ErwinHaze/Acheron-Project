import { component$ } from '@builder.io/qwik';

export const EditorsChoice = component$(() => {
  const models = [
    { name: 'DALL-E 3', category: 'Image Generation', description: 'Generate stunning images from text prompts.', logo: 'https://via.placeholder.com/100' },
    { name: 'GPT-4', category: 'Text Generation', description: 'Advanced text generation for any use case.', logo: 'https://via.placeholder.com/100' },
    { name: 'Jukebox', category: 'Music Generation', description: 'Create music in any style or genre.', logo: 'https://via.placeholder.com/100' },
  ];

  return (
    <section class="bg-black">
      <div class="container mx-auto px-6 bg-black">
        <h2 class="text-3xl font-bold text-gray-800 mb-8">Editor's Choice</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          {models.map((model, index) => (
            <div key={index} class="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <img src={model.logo} alt={model.name} class="w-20 h-20 mx-auto mb-4" loading="lazy" />
              <h3 class="text-xl font-semibold text-gray-800">{model.name}</h3>
              <p class="text-gray-600 mb-2">{model.category}</p>
              <p class="text-gray-500">{model.description}</p>
              <button class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                Learn More
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});