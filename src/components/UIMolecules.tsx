// src/components/molecules/UIMolecule.tsx
import { component$, useSignal, useTask$, useVisibleTask$ } from '@builder.io/qwik';
import { createClient } from '@supabase/supabase-js';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

interface UIMoleculeProps {
  type:
    | 'badge'
    | 'chart'
    | 'filter'
    | 'search'
    | 'progress'
    | 'controls'
    | 'facets'
    | 'suggestions'
    | 'stat';
  // When type is badge, data is an object; otherwise, it's an array.
  data?: any[] | { label?: string; value?: number; score?: number; direction?: 'up' | 'down'; id?: string; name?: string };
  query?: string; // For search/suggestions
  filters?: { category: string; priceRange: [number, number]; accuracy: number }; // For facets
  onInput$?: (value: string) => void; // For search
  onChange$?: (value: string | number | [number, number]) => void; // For filter/facets
  onRemove$?: () => void; // For controls
}

export const UIMolecule = component$<UIMoleculeProps>(({
  type,
  data = [],
  query = '',
  filters = { category: '', priceRange: [0, 1000], accuracy: 0 },
  onInput$,
  onChange$,
  onRemove$,
}) => {
  const supabase = createClient(import.meta.env.PUBLIC_SUPABASE_URL, import.meta.env.PUBLIC_SUPABASE_KEY);
  // For parts that expect an array (chart, filter, etc.), we create listData:
  const listData = Array.isArray(data) ? data : data ? [data] : [];
  // For badge type, we expect a single object:
  const badgeData = !Array.isArray(data) ? data : null;
  const suggestions = useSignal<string[]>([]);

  // Chart setup – only if data is an array and non-empty
  useVisibleTask$(({ cleanup }) => {
    if (type === 'chart' && Array.isArray(data) && data.length > 0) {
      // Cast data to an array of objects with expected keys
      const chartData = data as {
        label?: string;
        value?: number;
        score?: number;
        direction?: 'up' | 'down';
        id?: string;
        name?: string;
        // Possibly other keys like impact_score or dominance
        impact_score?: number;
        dominance?: number;
      }[];
      const ctx = document.getElementById('chart') as HTMLCanvasElement;
      if (ctx) {
        const chart = new Chart(ctx, {
          type: chartData[0]?.dominance ? 'doughnut' : 'bar',
          data: {
            labels: chartData.map(d => d.name || d.label || ''),
            datasets: [{
              data: chartData.map(d => d.impact_score || d.dominance || d.value || 0),
              backgroundColor: chartData[0]?.dominance
                ? ['#6366f1', '#10b981', '#f59e0b']
                : 'rgba(99, 102, 241, 0.6)',
              borderWidth: chartData[0]?.dominance ? 0 : 1,
            }],
          },
          options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } },
        });
        cleanup(() => chart.destroy());
      }
    }
  });

  // Suggestions mock fetch
  useTask$(async ({ track }) => {
    if (type === 'suggestions' && query.length > 2) {
      track(() => query);
      suggestions.value = ['Mock1', 'Mock2']; // Replace with a real fetch later
    } else if (type === 'suggestions') {
      suggestions.value = [];
    }
  });

  return (
    <div class={`p-1 ${type === 'controls' ? 'flex gap-1' : ''}`}>
      {/* Badge type: expect data as a single object */}
      {type === 'badge' && (
        !badgeData ? (
          <span class="px-1 py-0.5 text-xs rounded bg-blue-100 text-blue-700">Badge</span>
        ) : (
          <span class={`px-1 py-0.5 text-xs rounded ${badgeData.direction ? 'bg-green-100 text-green-800 flex gap-1' : 'bg-blue-100 text-blue-700'}`}>
            {badgeData.direction && (
              <svg class="w-3 h-3" fill={badgeData.direction === 'up' ? 'green' : 'red'} viewBox="0 0 24 24">
                <path d={badgeData.direction === 'up' ? 'M3 18l9-9 9 9' : 'M3 6l9 9 9-9'} />
              </svg>
            )}
            {badgeData.score !== undefined ? (
              <>
                <div class="w-12 h-1 bg-gray-200 rounded">
                  <div class={`h-1 rounded ${badgeData.score >= 70 ? 'bg-green-500' : badgeData.score >= 40 ? 'bg-yellow-500' : 'bg-red-500'}`}
                       style={{ width: `${Math.min(Math.max(badgeData.score, 0), 100)}%` }} />
                </div>
                <span>{badgeData.score}%</span>
              </>
            ) : badgeData.label || 'Badge'}
          </span>
        )
      )}

      {/* Chart type: we assume data is an array */}
      {type === 'chart' && (
        <canvas id="chart" class="w-full h-24" />
      )}

      {/* Filter type */}
      {type === 'filter' && (
        <select
          class="border p-1 text-xs"
          onChange$={(e) =>
            onChange$ && onChange$((e.target as HTMLSelectElement).value)
          }
        >
          <option value="all">All</option>
          {listData.map((opt: any) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      )}

      {/* Search type */}
      {type === 'search' && (
        <div class="relative">
          <input
            type="text"
            class="w-full p-1 border rounded text-xs"
            placeholder={query || 'Search...'}
            value={query}
            onInput$={(e) => onInput$ && onInput$((e.target as HTMLInputElement).value)}
          />
          <svg class="absolute right-1 top-1 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          {query.length > 2 && <UIMolecule type="suggestions" query={query} />}
        </div>
      )}

      {/* Progress type */}
      {type === 'progress' && (
        <div class="w-full h-1 bg-gray-200 rounded">
          <div class={`h-1 rounded ${listData[0]?.label === 'dominance' ? 'bg-green-500' : 'bg-blue-500'}`}
               style={{ width: `${Math.min(Math.max(listData[0]?.value || 0, 0), 100)}%` }} />
        </div>
      )}

      {/* Controls type */}
      {type === 'controls' && listData[0]?.id && (
        <>
          <button class="p-1 rounded hover:bg-gray-100" onClick$={() => console.log(`Preview ${listData[0].id}`)}>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm6-8c-5 0-9 8-9 8s-4-8-9-8 9 8 9 8 4-8 9-8z" />
            </svg>
          </button>
          <button class="p-1 rounded hover:bg-gray-100 text-red-500" onClick$={onRemove$}>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M6 6h12v2H6zm2 4h8v8H8z" />
            </svg>
          </button>
        </>
      )}

      {/* Facets type */}
      {type === 'facets' && (
        <div class="space-y-2">
          <select
            class="border p-1 text-xs"
            onChange$={(e) => onChange$ && onChange$((e.target as HTMLSelectElement).value)}
          >
            <option value="">{filters.category || 'All'}</option>
            {['nlp', 'cv'].map((cat) => <option key={cat} value={cat}>{cat}</option>)}
          </select>
          <div class="relative h-6">
            <div class="w-full h-1 bg-gray-200 rounded absolute top-2">
              <div class="h-1 bg-blue-500 rounded" style={{ left: `${filters.priceRange[0] / 10}%`, width: `${(filters.priceRange[1] - filters.priceRange[0]) / 10}%` }} />
            </div>
            <input
              type="range"
              min={0}
              max={1000}
              value={filters.priceRange[0]}
              class="absolute w-full top-1 h-1 bg-transparent appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500"
              onInput$={(e) => onChange$ && onChange$([Number((e.target as HTMLInputElement).value), filters.priceRange[1]])}
            />
            <input
              type="range"
              min={0}
              max={1000}
              value={filters.priceRange[1]}
              class="absolute w-full top-1 h-1 bg-transparent appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500"
              onInput$={(e) => onChange$ && onChange$([filters.priceRange[0], Number((e.target as HTMLInputElement).value)])}
            />
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={filters.accuracy}
            class="w-full h-1 bg-gray-200 rounded appearance-none"
            onChange$={(e) => onChange$ && onChange$(Number((e.target as HTMLInputElement).value))}
          />
        </div>
      )}

      {/* Suggestions type */}
      {type === 'suggestions' && (
        <div class="absolute w-full mt-1 bg-white rounded-b text-xs shadow">
          {suggestions.value.length
            ? suggestions.value.map((s) => (
                <div key={s} class="p-1 hover:bg-gray-100">{s}</div>
              ))
            : <div class="p-1 text-gray-400">No suggestions</div>}
        </div>
      )}

      {/* Stat type */}
      {type === 'stat' && (
        <div class="p-2 rounded bg-gray-100 text-center">
          <h3 class="text-xs font-semibold">{listData[0]?.label}</h3>
          <p class="text-sm font-bold text-blue-500">{listData[0]?.value?.toLocaleString()}</p>
        </div>
      )}
    </div>
  );
});
