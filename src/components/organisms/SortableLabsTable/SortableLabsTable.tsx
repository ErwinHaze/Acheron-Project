import { component$ } from '@builder.io/qwik';

// Define interfaces for lab and props
interface Lab {
  id: string;
  avatar_url: string;
  name: string;
  reputation: number;
  models_count: number;
  papers_count: number;
  funding: number;
}

interface SortableLabsTableProps {
  labs: Lab[];
  sortBy: string;
  onSort$: (sortKey: string) => void;
}

// Inline definition for SortIcon
interface SortIconProps {
  active: boolean;
  direction: 'asc' | 'desc';
}
const SortIcon = component$<SortIconProps>(({ active, direction }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class={`h-5 w-5 ${active ? 'text-blue-500' : 'text-gray-500'}`}
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      {direction === 'asc' ? (
        <path
          fill-rule="evenodd"
          d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
          clip-rule="evenodd"
        />
      ) : (
        <path
          fill-rule="evenodd"
          d="M5 10a1 1 0 011 1h8a1 1 0 110-2H6a1 1 0 01-1 1z"
          clip-rule="evenodd"
        />
      )}
    </svg>
  );
});

// Inline definition for ReputationScore
const ReputationScore = component$<{ value: number }>(({ value }) => {
  return <span class="font-medium">{value.toFixed(1)}</span>;
});

// Inline definition for FundingDisplay
const FundingDisplay = component$<{ value: number }>(({ value }) => {
  return <span>${value.toLocaleString()}</span>;
});

export const SortableLabsTable = component$<SortableLabsTableProps>(
  ({ labs, sortBy, onSort$ }) => {
    return (
      <div class="overflow-x-auto">
        <table class="w-full border-collapse">
          <thead class="bg-dark-700 text-white">
            <tr>
              {['Rank', 'Lab', 'Reputation', 'Models', 'Papers', 'Funding'].map((col) => (
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
            {labs.map((lab, index) => (
              <tr key={lab.id} class="hover:bg-dark-800 transition-colors">
                <td class="px-4 py-3">#{index + 1}</td>
                <td class="px-4 py-3">
                  <div class="flex items-center gap-3">
                    <img 
                      src={lab.avatar_url} 
                      alt={lab.name}
                      class="w-8 h-8 rounded-full"
                      loading="lazy"
                    />
                    {lab.name}
                  </div>
                </td>
                <td class="px-4 py-3">
                  <ReputationScore value={lab.reputation} />
                </td>
                <td class="px-4 py-3">{lab.models_count}</td>
                <td class="px-4 py-3">{lab.papers_count}</td>
                <td class="px-4 py-3">
                  <FundingDisplay value={lab.funding} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
);