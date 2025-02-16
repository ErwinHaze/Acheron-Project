// src/routes/playground/layout.tsx
import { component$ } from '@builder.io/qwik';
import { useModelStore } from '~/stores/model-store';

export default component$(() => {
  const modelStore = useModelStore();
  
  return (
    <div class="playground-layout">
      <ModelSidebar />
      <main class="workspace">
        {/* Chat header and output will go here */}
      </main>
    </div>
  );
});