// FILE: src/components/templates/PlaygroundLayout/PlaygroundPanel.tsx
import { component$, Slot } from '@builder.io/qwik';

export const PlaygroundPanel = component$(() => {
  return (
    <div class="p-4 border-l h-full">
      <Slot />
    </div>
  );
});
