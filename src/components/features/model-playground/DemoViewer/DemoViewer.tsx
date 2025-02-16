// FILE: src/components/features/model-playground/DemoViewer/DemoViewer.tsx
import { component$ } from '@builder.io/qwik';

export const DemoViewer = component$((props: { modelId: string }) => {
  return (
    <div class="border p-4">
      <h2 class="text-lg font-bold">Demo Viewer</h2>
      <p>Model ID: {props.modelId}</p>
      {/* TODO: implement actual demo logic */}
    </div>
  );
});
