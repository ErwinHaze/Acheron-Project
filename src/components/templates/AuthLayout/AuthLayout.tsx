// components/templates/AuthLayout/AuthLayout.tsx
import { component$, Slot } from '@builder.io/qwik';

interface AuthLayoutProps {
  title: string;
}

export default component$<AuthLayoutProps>(({ title }) => {
  return (
    <div class="auth-layout min-h-screen flex flex-col justify-between p-4">
      <header class="mb-4">
        <h1 class="text-xl font-bold text-center">{title}</h1>
      </header>
      <main class="flex-1">
        <Slot />
      </main>
      <footer class="mt-4 text-center text-sm text-gray-500">
        &copy; 2025 AI Model Store. All rights reserved.
      </footer>
    </div>
  );
});