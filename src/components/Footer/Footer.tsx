// src/components/footer.tsx
import { component$ } from '@builder.io/qwik';

export const Footer = component$(() => {
  return (
    <footer class="bg-black text-white py-12">
      <div class="container mx-auto px-6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 class="text-xl font-bold mb-4">EpixaL</h3>
            <p class="text-gray-400">Discover the best AI tools for your needs.</p>
          </div>
          <div>
            <h4 class="text-lg font-semibold mb-4">Quick Links</h4>
            <ul class="space-y-2">
              <li><a href="#" class="text-gray-400 hover:text-white">Home</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white">Categories</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white">About</a></li>
            </ul>
          </div>
          <div>
            <h4 class="text-lg font-semibold mb-4">Legal</h4>
            <ul class="space-y-2">
              <li><a href="#" class="text-gray-400 hover:text-white">Privacy Policy</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white">Terms of Service</a></li>
            </ul>
          </div>
          <div>
            <h4 class="text-lg font-semibold mb-4">Follow Us</h4>
            <div class="flex space-x-4">
              <a href="#" class="text-gray-400 hover:text-white">X</a>
              <a href="#" class="text-gray-400 hover:text-white">LinkedIn</a>
              <a href="#" class="text-gray-400 hover:text-white">GitHub</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
});