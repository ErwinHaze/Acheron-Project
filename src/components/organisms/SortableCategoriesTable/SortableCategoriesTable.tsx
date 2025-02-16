// components/features/model-discovery/SortableCategoriesTable.tsx
export const SortableCategoriesTable = component$(({ categories, sortBy, onSort$ }) => {
    return (
      <div class="overflow-x-auto">
        <table class="w-full border-collapse">
          <thead class="bg-dark-700">
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
  });