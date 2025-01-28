import { component$ } from '@builder.io/qwik';

export const Header = component$(() => {
  return (
    <header class="bg-gray-900 text-white">
      <div class="container mx-auto flex justify-between items-center p-4">
        <h1 class="text-xl font-bold">AI Model Store</h1>
        <nav>
          <ul class="flex space-x-4">
            <li><a href="/" class="hover:underline">Home</a></li>
            <li><a href="/categories" class="hover:underline">Categories</a></li>
            <li><a href="/creators" class="hover:underline">Creators</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
});
