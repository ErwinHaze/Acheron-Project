// FILE: src/components/features/model-playground/PresetSystem/PresetItem.tsx
import { component$ } from '@builder.io/qwik';

export const PresetItem = component$((props: { preset: { id: string; name: string } }) => {
  return (
    <button class="border p-2 w-full text-left hover:bg-gray-100">
      {props.preset.name}
    </button>
  );
});
