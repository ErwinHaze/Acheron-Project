// FILE: src/components/organisms/CategoryGrid/CategoryGridItem.tsx
import { component$ } from '@builder.io/qwik';

export const CategoryGridItem = component$((props: {
  id: string;
  name: string;
  totalModels: number;
}) => {
  return (
    <div class="border rounded p-4 hover:shadow transition">
      <h3 class="font-bold">{props.name}</h3>
      <p class="text-sm text-gray-600">{props.totalModels} models</p>
    </div>
  );
});
