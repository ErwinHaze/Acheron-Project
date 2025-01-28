import { component$, Slot, useVisibleTask$ } from '@builder.io/qwik';

export const PageWrapper = component$(() => {
  // Add fade-in animation on component load
  useVisibleTask$(() => {
    const pageContent = document.querySelector('.page-content');
    if (pageContent) {
      pageContent.classList.add('opacity-0');
      setTimeout(() => {
        pageContent.classList.add('opacity-100');
      }, 50);
    }
  });

  return (
    <div class="page-content transition-opacity duration-500">
      <Slot />
    </div>
  );
});
