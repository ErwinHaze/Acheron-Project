// FILE: src/components/molecules/ProgressBar/AccuracyProgressBar.tsx
import { component$ } from '@builder.io/qwik';

export const AccuracyProgressBar = component$((props: { accuracy: number }) => {
  const val = Math.min(Math.max(props.accuracy, 0), 100);
  return (
    <div class="w-full bg-gray-200 h-2 rounded">
      <div class="bg-blue-500 h-2 rounded" style={{ width: `${val}%` }}></div>
    </div>
  );
});
