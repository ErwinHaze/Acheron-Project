// src/components/header.tsx
import { component$ } from '@builder.io/qwik';

export const Header =  component$(() => {
  return (
    <header class="bg-white shadow-md">
      <div class="container mx-auto px-6 py-4 flex justify-between items-center">
        <div class="text-2xl font-bold text-gray-800">AI Store</div>
        <nav class="flex space-x-6">
          <a href="#" class="text-gray-700 hover:text-blue-500">Categories</a>
          <a href="#" class="text-gray-700 hover:text-blue-500">Trending</a>
          <a href="#" class="text-gray-700 hover:text-blue-500">Pricing</a>
          <a href="#" class="text-gray-700 hover:text-blue-500">About</a>
        </nav>
        <div class="flex items-center">
          <input
            type="text"
            placeholder="Search AI models..."
            class="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button class="ml-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Search
          </button>
        </div>
      </div>
    </header>
  );
});