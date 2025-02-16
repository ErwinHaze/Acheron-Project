// FILE: src/components/atoms/Buttons/IconButton.tsx
import { component$ } from '@builder.io/qwik';

export const IconButton = component$((props: {
  icon: any;
  label?: string;
  onClick$?: any;
}) => {
  return (
    <button
      class="flex items-center gap-2 px-3 py-2 border rounded hover:bg-gray-100"
      onClick$={props.onClick$}
    >
      <props.icon />
      {props.label}
    </button>
  );
});
