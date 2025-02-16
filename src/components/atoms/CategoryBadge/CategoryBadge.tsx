import { component$ } from '@builder.io/qwik';

interface CategoryBadgeProps {
  category: string;
}

const getCategoryColor = (category: string): string => {
  const colors: Record<string, string> = {
    'ML': 'bg-blue-100 text-blue-800',
    'NLP': 'bg-green-100 text-green-800',
    'CV': 'bg-purple-100 text-purple-800',
    'RL': 'bg-orange-100 text-orange-800',
    'GAI': 'bg-pink-100 text-pink-800'
  };
  
  return colors[category] || 'bg-gray-100 text-gray-800';
};

export const CategoryBadge = component$<CategoryBadgeProps>(({ category }) => {
  const colorClasses = getCategoryColor(category);
  
  return (
    <span class={[
      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
      'transition-colors duration-150 ease-in-out',
      colorClasses
    ].join(' ')}>
      {category}
    </span>
  );
});
