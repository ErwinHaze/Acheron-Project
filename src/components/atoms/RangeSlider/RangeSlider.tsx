import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';

interface RangeSliderProps {
  min: number;
  max: number;
  values: [number, number];
  onChange$: (values: [number, number]) => void;
}

export const RangeSlider = component$<RangeSliderProps>(({ min, max, values, onChange$ }) => {
  const minVal = useSignal(values[0]);
  const maxVal = useSignal(values[1]);

  useVisibleTask$(({ track }) => {
    track(() => minVal.value);
    track(() => maxVal.value);
    
    if (minVal.value !== values[0] || maxVal.value !== values[1]) {
      onChange$([minVal.value, maxVal.value]);
    }
  });

  return (
    <div class="relative h-12">
      <div class="absolute top-4 w-full">
        <div class="h-1 bg-gray-200 rounded-lg">
          <div
            class="absolute h-1 bg-blue-500 rounded-lg"
            style={{
              left: `${((minVal.value - min) / (max - min)) * 100}%`,
              width: `${((maxVal.value - minVal.value) / (max - min)) * 100}%`
            }}
          />
        </div>
      </div>

      <input
        type="range"
        min={min}
        max={max}
        value={minVal.value}
        class="absolute w-full top-3 h-2 appearance-none bg-transparent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:cursor-pointer"
        onInput$={(e) => {
          const value = Math.min(Number((e.target as HTMLInputElement).value), maxVal.value - 1);
          minVal.value = value;
        }}
      />
      <input
        type="range"
        min={min}
        max={max}
        value={maxVal.value}
        class="absolute w-full top-3 h-2 appearance-none bg-transparent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:cursor-pointer"
        onInput$={(e) => {
          const value = Math.max(Number((e.target as HTMLInputElement).value), minVal.value + 1);
          maxVal.value = value;
        }}
      />

      <div class="absolute w-full mt-8 flex justify-between text-sm text-gray-600">
        <span>{minVal.value}</span>
        <span>{maxVal.value}</span>
      </div>
    </div>
  );
});