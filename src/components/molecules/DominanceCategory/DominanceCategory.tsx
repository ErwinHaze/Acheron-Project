// src/components/molecules/DominanceCategory.tsx
import { component$ } from '@builder.io/qwik';
import { InfoIcon } from '../../atoms/Icons/InfoIcon';
import { ClockIcon } from '../../atoms/Icons/ClockIcon';
export interface Category {
  name: string;
  dominance: number;
  color?: string;
  description?: string;
  updatedAt?: string;
}

export interface DominanceCategoryProps {
  category: Category;
  showPercentage?: boolean;
  interactive?: boolean;
}

export const DominanceCategory = component$<DominanceCategoryProps>(({ 
  category,
  showPercentage = true,
  interactive = false
}) => {
  return (
    <div class={`rounded-lg bg-dark-700 p-3 mb-4 ${interactive ? 'interactive' : ''}`}>
      <div class="flex justify-between items-center mb-2 text-sm">
        <span class="category-name">{category.name}</span>
        {showPercentage && (
          <span class="category-percentage">{category.dominance}%</span>
        )}
      </div>
      
      <div class="h-2 bg-dark-600 rounded overflow-hidden">
        <div 
          class="h-full transition-width duration-500 ease-in-out transition-colors duration-300"
          style={{ 
            width: `${category.dominance}%`,
            backgroundColor: category.color || '#6366f1'
          }}
          title={`${category.name} dominance: ${category.dominance}%`}
        />
      </div>
      {category.description && (
        <div class="relative category-tooltip">
          <InfoIcon />
          <div class="absolute bottom-full left-1/2 transform -translate-x-1/2 w-56 bg-dark-800 border border-dark-600 p-4 rounded opacity-0 transition-opacity duration-300 invisible group-hover:visible group-hover:opacity-100">
            <h4 class="text-base font-semibold">{category.name}</h4>
            <p class="text-sm">{category.description}</p>
            {category.updatedAt && (
              <div class="mt-2 text-xs flex items-center">
                <ClockIcon />
                <span class="ml-1">Last updated: {new Date(category.updatedAt).toLocaleDateString()}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
});