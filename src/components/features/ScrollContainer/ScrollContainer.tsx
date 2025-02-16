import { component$, Slot } from '@builder.io/qwik';

interface ScrollContainerProps {
  class?: string;
}

export const ScrollContainer = component$<ScrollContainerProps>((props) => {
  return (
    <div class={["overflow-x-auto scrollbar-hide", props.class]}>
      <div class="inline-flex space-x-4 min-w-max w-full pb-4">
        <Slot />
      </div>
    </div>
  );
});