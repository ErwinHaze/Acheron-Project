import { component$ } from '@builder.io/qwik';
import { Header } from '../components/header/header';

export default component$(() => {
  return (
    <div>
      <Header />
      <main class="bg-gray-100 min-h-screen">
        <section class="container mx-auto text-center py-20">
          <h1 class="text-4xl font-bold mb-4">Welcome to the AI Model Store</h1>
          <p class="text-lg mb-6">Discover, purchase, and use the best AI models from leading creators.</p>
          <a href="/categories" class="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition">
            Explore Categories
          </a>
        </section>
      </main>
    </div>
  );
});
