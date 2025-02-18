// FILE: src/components/organisms/CategoryGrid/CategoryGridItem.tsx
import { component$ } from '@builder.io/qwik';

export const CategoryGridItem = component$((props: {
  id: string;
  name: string;
  totalModels: number;
}) => {
  return (
    <div class="border border-gray-700 rounded-lg p-6 bg-gray-800 hover:bg-gray-700 transform hover:scale-105 transition-all duration-300 cursor-pointer">
      <h3 class="text-xl font-semibold text-white mb-2">{props.name}</h3>
      <p class="text-sm text-gray-400">{props.totalModels} models</p>
    </div>
  );
});
