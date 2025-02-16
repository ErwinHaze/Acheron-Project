import { component$ } from '@builder.io/qwik';
import { CategoryBadge } from '~/components/atoms/CategoryBadge/CategoryBadge';

export interface AIModel {
  id: string;
  name: string;
  creator: string;
  price: number;
  accuracy: number;
  category: string; // Add this line
}

export interface ModelCardProps {
  model: {
    id: string;
    name: string;
    creator: string;
    price: number;
    accuracy: number;
    category: string;
  };
  isSelected?: boolean;
  onSelect$?: () => void;
  showTrending?: boolean;
}

export const ModelCard = component$<ModelCardProps>(({ 
  model, 
  isSelected = false, 
  onSelect$, 
  showTrending = false 
}) => {
  return (
    <div 
      class={[
        'model-card cursor-pointer transition-all duration-200',
        'border rounded-lg shadow hover:shadow-lg',
        isSelected ? 'border-primary-500 bg-primary-50' : 'border-gray-200'
      ].join(' ')}
      onClick$={onSelect$}
    >
      <div class="p-4">
        <div class="flex justify-between items-start mb-2">
          <div>
            <h2 class="text-lg font-semibold text-gray-900">{model.name}</h2>
            {showTrending && (
              <span class="inline-flex items-center text-xs text-red-600 mt-1">
                <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 10l7-7 7 7-7 7-7-7z"/>
                </svg>
                Trending
              </span>
            )}
          </div>
          <CategoryBadge category={model.category} />
        </div>
        <div class="space-y-1">
          <p class="text-sm text-gray-600">By <span class="font-medium">{model.creator}</span></p>
          <p class="text-sm text-gray-600">Price: <span class="font-medium">${model.price}</span></p>
          <p class="text-sm text-gray-600">Accuracy: <span class="font-medium">{model.accuracy}%</span></p>
        </div>
      </div>
    </div>
  );
});
