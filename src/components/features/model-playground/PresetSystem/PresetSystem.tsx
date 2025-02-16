// FILE: src/components/features/model-playground/PresetSystem/PresetSystem.tsx
import { component$ } from '@builder.io/qwik';
import { PresetItem } from './PresetItem';

export const PresetSystem = component$(() => {
  const presets = [
    { id: 'p1', name: 'Text Summarization' },
    { id: 'p2', name: 'Image Classification' },
  ];

  return (
    <div>
      <h3 class="font-bold">Presets</h3>
      <div class="grid gap-2">
        {presets.map((p) => (
          <PresetItem key={p.id} preset={p} />
        ))}
      </div>
    </div>
  );
});
