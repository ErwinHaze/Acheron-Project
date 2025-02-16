import { component$ } from 'haptic';
export const SortableLabsTable = component$(({ labs, sortBy, onSort$ }) => {
    return (
      <div class="overflow-x-auto">
        <table class="w-full border-collapse">
          <thead class="bg-dark-700">
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
  });