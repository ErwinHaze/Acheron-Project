// FILE: src/routes/layout.tsx
import { component$, Slot } from '@builder.io/qwik';

/**
 * Example placeholders for a top-level Header and Footer component.
 * Replace them with your actual Qwik header/footer once created.
 */
export const Layout = component$(() => {
  return (
    <div class="layout">
      <head>
        <title>AI Model Store</title>
        <meta charSet="utf-8" />
        <meta name="description" content="A Qwik-based AI Model Store inspired by coinmarketcap.com, Apple App Store, and Epic Games." />
      </head>
      <body class="min-h-screen flex flex-col bg-gray-50 text-gray-900">
        {/* Top-level site header */}
        <header class="bg-white border-b">
          {/* Insert your real Header component here */}
          <div class="container mx-auto px-4 py-2">
            <h1 class="text-xl font-bold">AI Model Store</h1>
          </div>
        </header>

        {/* Main content area */}
        <main class="flex-1 container mx-auto px-4 py-6">
          <Slot />
        </main>

        {/* Global site footer */}
        <footer class="bg-white border-t">
          {/* Insert your real Footer component here */}
          <div class="container mx-auto px-4 py-4 text-sm text-gray-600">
            <p>© 2025 AI Model Store. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </div>
  );
});

export default Layout;
