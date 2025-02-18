import { component$, Slot } from '@builder.io/qwik';
import { Header } from '~/components/organisms/Header/Header';
/**
 * Example placeholders for a top-level Header and Footer component.
 * Replace them with your actual Qwik header/footer once created.
 */
export const Layout = component$(() => {
  return (
    <div>
    <Header />

      {/* Main content area */}
      <main class="flex-1 container mx-auto px-4 py-6">
        <Slot />
      </main>

      {/* Global site footer */}
      <footer class="bg-white border-t">
        <div class="container mx-auto px-4 py-4 text-sm text-gray-600">
          <p>© 2025 AI Model Store. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
});

export default Layout;
