// FILE: src/components/features/creator-portal/ModelUploadWizard/ModelUploadWizard.tsx
import { component$, useStore } from '@builder.io/qwik';
import { UploadStep } from './UploadStep';

export const ModelUploadWizard = component$(() => {
  const store = useStore({ step: 1 });

  return (
    <div class="border p-4">
      <h2 class="text-xl font-bold mb-2">Upload Your Model</h2>
      <UploadStep currentStep={store.step} />
      {/* TODO: next/back logic */}
    </div>
  );
});
