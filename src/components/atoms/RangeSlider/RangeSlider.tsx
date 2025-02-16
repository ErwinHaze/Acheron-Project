import { component$, useSignal, useTask$ } from '@builder.io/qwik';

interface RangeSliderProps {
  min: number;
  max: number;
  values: [number, number];
  onChange$: (values: [number, number]) => void;
}

export const RangeSlider = component$<RangeSliderProps>(({ min, max, values, onChange$ }) => {
  const minVal = useSignal(values[0]);
  const maxVal = useSignal(values[1]);

  useTask$(({ track }) => {
    const min = track(() => minVal.value);
    const max = track(() => maxVal.value);
    onChange$([min, max]);
  });

  return (
    <div class="relative pt-6 pb-2">
      <div class="h-1 bg-gray-200 rounded-lg">
        <div
          class="absolute h-1 bg-blue-500 rounded-lg"
          style={{
            left: `${((minVal.value - min) / (max - min)) * 100}%`,
            width: `${((maxVal.value - minVal.value) / (max - min)) * 100}%`
          }}
        />
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={minVal.value}
        class="absolute w-full top-5 h-1 appearance-none pointer-events-none opacity-0"
        onInput$={(e) => {
          const target = e.target as HTMLInputElement | null;
          if (target) {
            const value = Math.min(Number(target.value), maxVal.value - 1);
            minVal.value = value;
          }
        }}
      />
      <input
        type="range"
        min={min}
        max={max}
        value={maxVal.value}
        class="absolute w-full top-5 h-1 appearance-none pointer-events-none opacity-0"
        onInput$={(e) => {
          const target = e.target as HTMLInputElement | null;
          if (target) {
            const value = Math.max(Number(target.value), minVal.value + 1);
          }
        }}
      />
      <div class="mt-4 flex justify-between text-sm text-gray-600">
        <span>{minVal.value}</span>
        <span>{maxVal.value}</span>
      </div>
    </div>
  );
});