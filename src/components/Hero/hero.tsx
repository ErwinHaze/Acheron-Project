// src/components/hero.tsx
import { component$ } from '@builder.io/qwik';

export const Hero =  component$(() => {
  return (
    <section class="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20">
      <div class="container mx-auto px-6 text-center">
        <h1 class="text-5xl font-bold mb-4">Discover the Best AI Models</h1>
        <p class="text-xl mb-8">
          Explore cutting-edge AI tools for graphic design, video editing, music generation, and more.
        </p>
        <button class="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100">
          Get Started
        </button>
      </div>
    </section>
  );
});