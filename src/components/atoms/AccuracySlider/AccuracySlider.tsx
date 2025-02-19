// src/components/atoms/AccuracySlider/AccuracySlider.tsx
import { component$, useSignal, useTask$, $ } from '@builder.io/qwik';

interface AccuracySliderProps {
  value: number;
  onChange$: (value: number) => void;
}

export const AccuracySlider = component$<AccuracySliderProps>(({ value, onChange$ }) => {
  const valueRef = useSignal(value);

  useTask$(({ track }) => {
    track(() => valueRef.value);
    onChange$(valueRef.value);
  });

  return (
    <div class="relative">
      <input
        type="range"
        min={0}
        max={100}
        value={valueRef.value}
        class="w-full h-1 bg-gray-200 rounded-lg appearance-none"
        onChange$={(e) => {
          if (e.target) {
            valueRef.value = parseFloat((e.target as HTMLInputElement).value);
          }
        }}
      />
      <div class="mt-2 text-sm text-gray-600">
        Minimum Accuracy: {valueRef.value}%
      </div>
    </div>
  );
});