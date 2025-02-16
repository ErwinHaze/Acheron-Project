// FILE: src/components/features/model-playground/Selector/ModelSelector.tsx
import { component$ } from '@builder.io/qwik';

export const ModelSelector = component$((props: {
  models: { id: string; name: string }[];
  onSelect$?: any;
}) => {
  return (
    <select class="border p-2" onChange$={props.onSelect$}>
      <option value="">Select a model</option>
      {props.models.map((m) => (
        <option key={m.id} value={m.id}>{m.name}</option>
      ))}
    </select>
  );
});
