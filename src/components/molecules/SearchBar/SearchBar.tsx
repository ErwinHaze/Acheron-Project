// FILE: src/components/molecules/SearchBar/SearchBar.tsx
import { component$ } from '@builder.io/qwik';

export const SearchBar = component$((props: {
  value?: string;
  onInput$?: any;
  placeholder?: string;
}) => {
  return (
    <input
      type="text"
      class="border p-2 w-full"
      placeholder={props.placeholder || 'Search...'}
      value={props.value}
      onInput$={props.onInput$}
    />
  );
});
