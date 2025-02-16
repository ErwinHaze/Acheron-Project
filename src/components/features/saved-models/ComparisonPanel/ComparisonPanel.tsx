import { component$ } from '@builder.io/qwik';

interface Model {
  id: string;
  name: string;
  thumbnail: string;
  price: number;
  accuracy: number;
}

interface ComparisonCardProps {
  model: Model;
  class?: string;
}

const ComparisonCard = component$<ComparisonCardProps>(({ model, class: className }) => {
  return (
    <div class={["bg-dark-700 rounded-lg p-3", className]}>
      <img 
        src={model.thumbnail} 
        class="w-full aspect-square rounded-lg mb-3 object-cover" 
        alt={model.name}
      />
      <h4 class="font-semibold truncate">{model.name}</h4>
      <div class="flex gap-2 text-sm text-gray-400">
        <span>${model.price}</span>
        <span>{model.accuracy}%</span>
      </div>
    </div>
  );
});

interface ComparisonPanelProps {
  models: Model[];
}

export const ComparisonPanel = component$<ComparisonPanelProps>(({ models }) => {
  return (
    <div class="fixed bottom-0 left-0 right-0 bg-dark-800 border-t border-dark-600">
      <div class="container mx-auto px-4 py-4">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold">
            Comparing {models.length} Models
          </h3>
          <button class="text-primary-500">Compare Now</button>
        </div>
        
        <div class="overflow-x-auto">
          <div class="flex gap-4 min-w-max">
            {models.map((model) => (
              <ComparisonCard 
                key={model.id}
                model={model}
                class="w-48 flex-shrink-0"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});