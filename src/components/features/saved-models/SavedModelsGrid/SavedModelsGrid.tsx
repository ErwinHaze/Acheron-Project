// components/features/saved-models/SavedModelsGrid.tsx
export const SavedModelsGrid = component$(({ models, selectedModels, onSelect$ }) => {
    return (
      <div class="space-y-4">
        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {models.map((model) => (
            <div 
              key={model.id} 
              class={`relative border-2 ${
                selectedModels.has(model.id) 
                  ? 'border-primary-500' 
                  : 'border-transparent'
              }`}
            >
              <ModelCardCompact
                model={model}
                onCheckbox$={(checked) => onSelect$(model.id, checked)}
              />
              <SavedItemControls modelId={model.id} />
            </div>
          ))}
        </div>
        
        <EmptyState visible={models.length === 0} />
      </div>
    );
  });