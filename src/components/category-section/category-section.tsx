import { component$ } from '@builder.io/qwik';

export const CategorySection = component$(() => {
  const categories = [
    { name: 'Graphic Design', models: ['Canva AI', 'Adobe Firefly', 'Runway ML'] },
    { name: 'Video Editing', models: ['Pictory', 'Synthesia', 'Descript'] },
    { name: 'Music Generation', models: ['AIVA', 'Amper Music', 'Soundraw'] },
  ];

  return (
    <section class="bg-blue-400">
      <div class="container mx-auto px-6">
        <h2 class="text-3xl font-bold text-gray-800">Explore by Category</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <div key={index} class="bg-black p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <h3 class="text-xl font-semibold text-white mb-4">{category.name}</h3>
              <ul class="space-y-2">
                {category.models.map((model, idx) => (
                  <li key={idx} class="text-white hover:text-blue-500">
                    <a href="#" aria-label={`Learn more about ${model}`}>{model}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});