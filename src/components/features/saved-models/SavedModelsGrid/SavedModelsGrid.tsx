import { component$ } from '@builder.io/qwik';

interface Model {
  id: string;
  name: string;
  description?: string;
  thumbnail?: string;
}

const ModelCardCompact = component$<{
  model: Model;
  onCheckbox$: (checked: boolean) => void;
  isSelected: boolean;
}>(({ model, onCheckbox$, isSelected }) => {
  return (
    <div class="p-4 rounded-lg bg-white shadow-sm">
      <label class="flex items-center space-x-3">
        <input
          type="checkbox"
          checked={isSelected}
          onChange$={(e) => onCheckbox$((e.target as HTMLInputElement).checked)}
          class="form-checkbox"
        />
        <div>
          <h3 class="font-medium">{model.name}</h3>
          {model.description && (
            <p class="text-sm text-gray-500">{model.description}</p>
          )}
        </div>
      </label>
    </div>
  );
});

const SavedItemControls = component$<{ modelId: string }>(({ modelId }) => {
  return (
    <div class="absolute top-2 right-2 flex space-x-2">
      <button
        onClick$={() => console.log('Edit', modelId)}
        class="p-1 hover:bg-gray-100 rounded"
        aria-label="Edit model"
      >
        📝
      </button>
      <button
        onClick$={() => console.log('Delete', modelId)}
        class="p-1 hover:bg-gray-100 rounded"
        aria-label="Delete model"
      >
        🗑️
      </button>
    </div>
  );
});

const EmptyState = component$<{ visible: boolean }>(({ visible }) => {
  if (!visible) return null;
  
  return (
    <div class="text-center py-8 text-gray-500">
      <p>No saved models found</p>
    </div>
  );
});

interface SavedModelsGridProps {
  models: Model[];
  selectedModels: Set<string>;
  onSelect$: (id: string, checked: boolean) => void;
}

/**
 * Grid display of saved models with selection capability
 */
export const SavedModelsGrid = component$<SavedModelsGridProps>(({
  models = [],
  selectedModels,
  onSelect$
}) => {
  const isEmpty = models.length === 0;

  return (
    <div class="space-y-4">
      <div 
        class="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
        role="grid"
        aria-label="Saved models grid"
      >
        {models.map((model) => {
          const isSelected = selectedModels.has(model.id);
          
          return (
            <div 
              key={model.id}
              role="gridcell" 
              class={[
                'relative border-2',
                isSelected ? 'border-primary-500' : 'border-transparent'
              ].join(' ')}
            >
              <ModelCardCompact
                model={model}
                onCheckbox$={(checked) => onSelect$(model.id, checked)}
                isSelected={isSelected}
              />
              <SavedItemControls modelId={model.id} />
            </div>
          );
        })}
      </div>
      
      <EmptyState visible={isEmpty} />
    </div>
  );
});