// FILE: src/components/organisms/ModelCard/ModelCardCompact.tsx
import { component$ } from '@builder.io/qwik';

interface ModelCardCompactProps {
  name: string;
  price: number;
}

export const ModelCardCompact = component$((props: ModelCardCompactProps) => {
  return (
    <div class="flex items-center gap-2 p-2 border-b last:border-0">
      <span class="font-semibold">{props.name}</span>
      <span class="text-xs text-gray-500 ml-auto">${props.price}</span>
    </div>
  );
});
