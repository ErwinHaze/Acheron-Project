// FILE: src/components/organisms/CategoryGrid/CategoryGrid.tsx
import { component$ } from '@builder.io/qwik';
import { CategoryGridItem } from './CategoryGridItem';

interface CategoryGridProps {
  categories: { id: string; name: string; totalModels: number }[];
}

export const CategoryGrid = component$((props: CategoryGridProps) => {
  return (
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      {props.categories.map((cat) => (
        <CategoryGridItem key={cat.id} {...cat} />
      ))}
    </div>
  );
});
