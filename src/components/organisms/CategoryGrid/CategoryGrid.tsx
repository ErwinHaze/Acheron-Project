// FILE: src/components/organisms/CategoryGrid/CategoryGrid.tsx
import { component$ } from '@builder.io/qwik';
import { CategoryGridItem } from './CategoryGridItem';

// Define your categories here
const CATEGORIES = [
  { id: '1', name: 'Natural Language Processing', totalModels: 120 },
  { id: '2', name: 'Computer Vision', totalModels: 95 },
  { id: '3', name: 'Generative AI', totalModels: 78 },
  { id: '4', name: 'Reinforcement Learning', totalModels: 45 },
  { id: '5', name: 'Speech Recognition', totalModels: 60 },
  { id: '6', name: 'Time Series Analysis', totalModels: 30 },
];

export const CategoryGrid = component$(() => {
  return (
    <div class="p-4">
      {/* Header with title, search and sort options */}
      <div class="flex flex-col md:flex-row items-center justify-between mb-6">
        <h2 class="text-2xl font-bold text-white">Categories</h2>
        <div class="flex items-center space-x-3 mt-4 md:mt-0">
          <input
            type="text"
            placeholder="Search categories..."
            class="px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select class="px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="default">Sort by</option>
            <option value="name">Name</option>
            <option value="totalModels">Total Models</option>
          </select>
        </div>
      </div>

      {/* Category Grid */}
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        {CATEGORIES.map((cat) => (
          <CategoryGridItem key={cat.id} {...cat} />
        ))}
      </div>
    </div>
  );
});