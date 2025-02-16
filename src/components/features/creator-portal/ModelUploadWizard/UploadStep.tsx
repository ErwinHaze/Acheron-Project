// FILE: src/components/features/creator-portal/ModelUploadWizard/UploadStep.tsx
import { component$ } from '@builder.io/qwik';

export const UploadStep = component$((props: { currentStep: number }) => {
  return (
    <div>
      <p>Step {props.currentStep} of 3</p>
      {/* minimal placeholder for step logic */}
    </div>
  );
});
