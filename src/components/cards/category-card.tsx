import { component$ } from '@builder.io/qwik';

interface CategoryCardProps {
  id: string;
  name: string;
  description?: string;
}

export const CategoryCard = component$(({ id, name, description }: CategoryCardProps) => {
  return (
    <a
      href={`/categories/${id}`}
      class="block p-4 bg-white shadow rounded-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
    >
      <h2 class="text-lg font-bold text-gray-800 hover:text-blue-600 transition-colors">{name}</h2>
      {description && <p class="text-sm text-gray-600 mt-2">{description}</p>}
    </a>
  );
});
