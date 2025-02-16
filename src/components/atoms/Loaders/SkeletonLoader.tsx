// FILE: src/components/atoms/Loaders/SkeletonLoader.tsx
import { component$ } from '@builder.io/qwik';

export const SkeletonLoader = component$(() => {
  return <div class="bg-gray-200 h-4 w-full animate-pulse"></div>;
});
