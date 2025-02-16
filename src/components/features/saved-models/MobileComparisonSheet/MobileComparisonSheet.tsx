// components/features/saved-models/MobileComparisonSheet.tsx
export const MobileComparisonSheet = component$(({ models }) => {
    return (
      <BottomSheet>
        <div class="space-y-4 p-4">
          {models.map((model) => (
            <div key={model.id} class="flex items-center gap-4">
              <img 
                src={model.thumbnail} 
                class="w-16 h-16 rounded-lg" 
                alt={model.name}
              />
              <div class="flex-1">
                <h4 class="font-semibold">{model.name}</h4>
                <div class="flex gap-2 text-sm">
                  <span>${model.price}</span>
                  <span>{model.accuracy}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </BottomSheet>
    );
  });