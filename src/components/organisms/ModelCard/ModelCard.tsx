// FILE: src/components/organisms/ModelCard/ModelCard.tsx
import { component$ } from '@builder.io/qwik';
import { CategoryBadge } from '~/components/molecules/Badge/CategoryBadge';

interface ModelCardProps {
  name: string;
  category: string;
  price: number;
  accuracy: number;
  creator: string;
}

export const ModelCard = component$((props: ModelCardProps) => {
  return (
    <div class="border p-4 rounded shadow hover:shadow-md transition">
      <div class="flex justify-between items-center">
        <h2 class="text-lg font-bold">{props.name}</h2>
        <CategoryBadge category={props.category} />
      </div>
      <p class="text-sm text-gray-600">Creator: {props.creator}</p>
      <p class="text-sm text-gray-600">Price: ${props.price}</p>
      <p class="text-sm text-gray-600">Accuracy: {props.accuracy}%</p>
    </div>
  );
});
