// components/organisms/SavedModelsList/SavedModelsList.tsx
import { component$ } from '@builder.io/qwik';
import ModelCardCompact from '~/components/organisms/ModelCard/ModelCardCompact';

export default component$(({ models }) => {
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