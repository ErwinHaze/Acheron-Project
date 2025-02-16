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
    <div class={[
      "p-5 rounded-lg bg-white transition-all duration-200",
      "hover:shadow-md border border-gray-100",
      "transform hover:-translate-y-1"
    ].join(" ")}>
      <label class="flex items-start space-x-4 cursor-pointer">
        <input
          type="checkbox"
          checked={isSelected}
          onChange$={(e) => onCheckbox$((e.target as HTMLInputElement).checked)}
          class="form-checkbox mt-1 h-5 w-5 text-primary-600 rounded border-gray-300 
                 focus:ring-primary-500 transition-colors duration-200"
        />
        <div class="flex-1 min-w-0">
          <h3 class="font-semibold text-gray-900 truncate">{model.name}</h3>
          {model.description && (
            <p class="text-sm text-gray-500 mt-1 line-clamp-2">{model.description}</p>
          )}
        </div>
      </label>
    </div>
  );
});

const SavedItemControls = component$<{ modelId: string }>(({ modelId }) => {
  return (
    <div class="absolute top-3 right-3 flex space-x-1">
      <button
        onClick$={() => console.log('Edit', modelId)}
        class="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200
               text-gray-600 hover:text-gray-900"
        aria-label="Edit model"
      >
        📝
      </button>
      <button
        onClick$={() => console.log('Delete', modelId)}
        class="p-2 hover:bg-red-50 rounded-full transition-colors duration-200
               text-gray-600 hover:text-red-600"
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
    <div class="text-center py-12 px-4 rounded-lg border-2 border-dashed border-gray-200">
      <div class="text-gray-400 text-4xl mb-3">📚</div>
      <h3 class="text-lg font-medium text-gray-900 mb-1">No saved models</h3>
      <p class="text-sm text-gray-500">Your saved models will appear here</p>
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
    <div class="space-y-6">
      <div 
        class="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
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
                'relative rounded-lg overflow-hidden',
                'transition-all duration-200',
                isSelected ? 'ring-2 ring-primary-500 ring-offset-2' : 'ring-1 ring-transparent'
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