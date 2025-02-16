import { component$ } from '@builder.io/qwik';

interface Model {
  id: string;
  // ...other fields...
}

interface ModelCardCompactProps {
  model: Model;
}

export const ModelCardCompact = component$<ModelCardCompactProps>(({ model }) => {
  return (
    <div class="model-card-compact">
      <p>{model.id}</p>
      {/* ...additional model details... */}
    </div>
  );
});
