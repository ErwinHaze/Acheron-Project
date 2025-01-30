// src/components/header.tsx
import { component$ } from '@builder.io/qwik';

export const Header = component$(() => {
  return (
    <header class="bg-black text-white py-4 shadow-lg">
      <div class="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div class="text-2xl font-bold flex items-center">
          <img src="../public/favicon.png" alt="AI Store Logo" class="h-20 w-20 mr-2" />
          AI Store
        </div>
        {/* Navigation Links */}
        <nav class="flex space-x-6">
          <a href="#" class="hover:text-blue-400 transition-colors">Home</a>
          <a href="#" class="hover:text-blue-400 transition-colors">Categories</a>
          <a href="#" class="hover:text-blue-400 transition-colors">Trending</a>
          <a href="#" class="hover:text-blue-400 transition-colors">Pricing</a>
        </nav>

        {/* Search Bar and User Account */}
        <div class="flex items-center space-x-4">
          <div class="relative">
            <input
              type="text"
              placeholder="Search AI models..."
              class="px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button class="absolute right-2 top-2 text-gray-400 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
          <button class="px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors">Sign In</button>
        </div>
      </div>
    </header>
  );
});