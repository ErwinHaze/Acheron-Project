// components/templates/AuthLayout/AuthLayout.tsx
import { component$ } from '@builder.io/qwik';

export default component$(({ title, children }) => {
  return (
    <div class="auth-layout">
      <header>
        <h1>{title}</h1>
      </header>
      <main>
        {children}
      </main>
      <footer>
        <p>&copy; 2023 AI Model Store. All rights reserved.</p>
      </footer>
    </div>
  );
});