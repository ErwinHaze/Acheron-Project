// FILE: src/components/organisms/TrendingModels/TrendingModelItem.tsx
import { component$ } from '@builder.io/qwik';

export interface TrendingModelItemProps {
  rank: number;
  modelName: string;
  performanceChange: string;
}

export const TrendingModelItem = component$<TrendingModelItemProps>((props) => {
  return (
    <div class="flex items-center justify-between py-2 hover:bg-gray-800 px-4 rounded-lg transition-colors">
      <div class="flex items-center space-x-3">
        <div class="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center text-sm">
          {props.rank}
        </div>
        <span class="font-medium text-white">{props.modelName}</span>
      </div>
      <div class="text-right">
        <p class={`text-sm ${
          props.performanceChange.startsWith('+') 
            ? 'text-green-400' 
            : 'text-red-400'
        }`}>
          {props.performanceChange}
        </p>
      </div>
    </div>
  );
});