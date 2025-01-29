// src/components/category-section.tsx
import { component$ } from '@builder.io/qwik';

export const CategorySection =  component$(() => {
  const categories = [
    { name: 'Graphic Design', models: ['Canva AI', 'Adobe Firefly', 'Runway ML'] },
    { name: 'Video Editing', models: ['Pictory', 'Synthesia', 'Descript'] },
    { name: 'Music Generation', models: ['AIVA', 'Amper Music', 'Soundraw'] },
  ];

  return (
    <section class="py-16">
      <div class="container mx-auto px-6">
        <h2 class="text-3xl font-bold text-gray-800 mb-8">Explore by Category</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <div key={index} class="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <h3 class="text-xl font-semibold text-gray-800 mb-4">{category.name}</h3>
              <ul class="space-y-2">
                {category.models.map((model, idx) => (
                  <li key={idx} class="text-gray-600 hover:text-blue-500">
                    <a href="#">{model}</a>
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