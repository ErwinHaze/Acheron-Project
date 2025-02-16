// FILE: src/components/atoms/Icons/TrendArrowIcon.tsx
import { component$ } from '@builder.io/qwik';

export const TrendArrowIcon = component$((props: { direction: 'up'|'down'}) => {
  // Renders an up or down arrow
  return props.direction === 'up'
    ? <svg class="w-4 h-4 text-green-500" /* ... */> {/* arrow up */}</svg>
    : <svg class="w-4 h-4 text-red-500" /* ... */> {/* arrow down */}</svg>;
});
