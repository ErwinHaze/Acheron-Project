// components/organisms/SavedModelsList/SavedModelsList.tsx
import { component$ } from '@builder.io/qwik';
import { ModelCardCompact } from '~/components/organisms/ModelCard/ModelCardCompact';

interface Model {
  id: string;
  // ...other fields...
}

interface SavedModelsListProps {
  models: Model[];
}

export default component$<SavedModelsListProps>(({ models }) => {
  return (
    <div class="saved-models-list">
      {models.length > 0 ? (
        models.map((model) => <ModelCardCompact key={model.id} model={model} />)
      ) : (
        <p>No saved models yet.</p>
      )}
    </div>
  );
});

