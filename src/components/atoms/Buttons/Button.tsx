// FILE: src/components/atoms/Buttons/Button.tsx
import { component$ } from '@builder.io/qwik';

export const Button = component$((props: { text: string; onClick$?: any }) => {
  return (
    <button
      class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      onClick$={props.onClick$}
    >
      {props.text}
    </button>
  );
});
