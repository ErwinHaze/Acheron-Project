// FILE: src/components/templates/PlaygroundLayout/PlaygroundLayout.tsx
import { component$, Slot } from '@builder.io/qwik';

export const PlaygroundLayout = component$(() => {
  return (
    <div class="flex h-screen">
      <Slot name="sidebar" />
      <div class="flex-1 overflow-auto">
        <Slot />
      </div>
    </div>
  );
});
