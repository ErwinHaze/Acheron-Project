// components/features/saved-models/ComparisonPanel.tsx
export const ComparisonPanel = component$(({ models }) => {
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