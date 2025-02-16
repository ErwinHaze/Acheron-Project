// src/components/organisms/SortableCategoriesTable/SortableCategoriesTable.tsx
import { component$, useSignal } from '@builder.io/qwik';
// import { SortIcon } from '~/components/atoms/Icons/SortIcon';

interface Category {
  id: string;
  icon_url: string;
  name: string;
  model_count: number;
  dominance: number;
  total_compute_cost: number;
  weekly_trend: number;
}

interface SortableCategoriesTableProps {
  categories: Category[];
  sortBy: string;
  onSort$: (sortKey: string) => void;
}

interface SortIconProps {
  active: boolean;
  direction: 'asc' | 'desc';
}

export const SortIcon = component$<SortIconProps>(({ active, direction }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class={`h-5 w-5 ${active ? 'text-blue-500' : 'text-gray-500'}`}
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fill-rule="evenodd"
        d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
        clip-rule="evenodd"
      />
      {direction === 'asc' ? (
        <path
          fill-rule="evenodd"
          d="M5 6a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
          clip-rule="evenodd"
        />
      ) : (
        <path
          fill-rule="evenodd"
          d="M5 14a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
          clip-rule="evenodd"
        />
      )}
    </svg>
  );
});

const DominanceProgressBar = component$<{ value: number }>(({ value }) => {
  return (
    <div class="w-full bg-gray-200 rounded-full h-2">
      <div
        class="bg-blue-500 h-2 rounded-full"
        style={{ width: `${value}%` }}
      ></div>
    </div>
  );
});

const ComputeCostDisplay = component$<{ value: number }>(({ value }) => {
  return (
    <div class="text-right">
      ${value.toLocaleString()}
    </div>
  );
});

const TrendIndicator = component$<{ value: number }>(({ value }) => {
  const trendClass = value > 0 ? 'text-green-500' : value < 0 ? 'text-red-500' : 'text-gray-500';
  const trendIcon = value > 0 ? '↑' : value < 0 ? '↓' : '—';

  return (
    <div class="flex items-center justify-end">
      <span class={`mr-1 ${trendClass}`}>{trendIcon}</span>
      <span class={trendClass}>{Math.abs(value).toFixed(2)}%</span>
    </div>
  );
});

export const SortableCategoriesTable = component$<SortableCategoriesTableProps>(
  ({ categories, sortBy, onSort$ }) => {
    return (
      <div class="overflow-x-auto">
        <table class="w-full border-collapse">
          <thead class="bg-dark-700 text-white">
            <tr>
              {['Rank', 'Category', 'Models', 'Dominance', 'Compute', 'Trend'].map((col) => (
                <th 
                  key={col}
                  class="px-4 py-3 cursor-pointer"
                  onClick$={() => onSort$(col.toLowerCase())}
                >
                  <div class="flex items-center gap-2">
                    {col}
                    <SortIcon 
                      active={sortBy === col.toLowerCase()}
                      direction={sortBy.endsWith('asc') ? 'asc' : 'desc'}
                    />
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr key={category.id} class="hover:bg-dark-800 transition-colors">
                <td class="px-4 py-3">#{index + 1}</td>
                <td class="px-4 py-3">
                  <div class="flex items-center gap-3">
                    <img 
                      src={category.icon_url} 
                      alt={category.name}
                      class="w-8 h-8 rounded-lg"
                      loading="lazy"
                    />
                    {category.name}
                  </div>
                </td>
                <td class="px-4 py-3">{category.model_count}</td>
                <td class="px-4 py-3">
                  <DominanceProgressBar value={category.dominance} />
                </td>
                <td class="px-4 py-3">
                  <ComputeCostDisplay value={category.total_compute_cost} />
                </td>
                <td class="px-4 py-3">
                  <TrendIndicator value={category.weekly_trend} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
);