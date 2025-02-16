// FILE: src/components/molecules/ProgressBar/DominanceProgressBar.tsx
import { component$ } from '@builder.io/qwik';

export const DominanceProgressBar = component$((props: { dominance: number }) => {
  const val = Math.min(Math.max(props.dominance, 0), 100);
  return (
    <div class="w-full bg-gray-200 h-2 rounded">
      <div class="bg-green-500 h-2 rounded" style={{ width: `${val}%` }}></div>
    </div>
  );
});
