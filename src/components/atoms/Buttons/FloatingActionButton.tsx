// FILE: src/components/atoms/Buttons/FloatingActionButton.tsx
import { component$ } from '@builder.io/qwik';

export const FloatingActionButton = component$((props: { onClick$?: any }) => {
  return (
    <button
      class="fixed bottom-4 right-4 p-4 bg-pink-500 text-white rounded-full shadow-lg hover:bg-pink-600"
      onClick$={props.onClick$}
    >
      +
    </button>
  );
});
