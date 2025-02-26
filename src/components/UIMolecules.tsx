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
  data?: any[] | { label?: string; value?: number; score?: number; direction?: 'up' | 'down'; id?: string; name?: string };
  query?: string;
  filters?: { category: string; priceRange: [number, number]; accuracy: number };
  onInput$?: (value: string) => void;
  onChange$?: (value: string | number | [number, number]) => void;
  onRemove$?: () => void;
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
  const listData = Array.isArray(data) ? data : data ? [data] : [];
  const badgeData = !Array.isArray(data) ? data : null;
  const suggestions = useSignal<string[]>([]);

  useVisibleTask$(({ cleanup }) => {
    if (type === 'chart' && Array.isArray(data) && data.length > 0) {
      const chartData = data as {
        label?: string;
        value?: number;
        score?: number;
        direction?: 'up' | 'down';
        id?: string;
        name?: string;
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
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
          },
        });
        cleanup(() => chart.destroy());
      }
    }
  });

  useTask$(async ({ track }) => {
    if (type === 'suggestions' && query.length > 2) {
      track(() => query);
      suggestions.value = ['Mock1', 'Mock2'];
    } else if (type === 'suggestions') {
      suggestions.value = [];
    }
  });

  return (
    <div class={`p-2 relative ${type === 'controls' ? 'flex space-x-2' : ''}`}>
      {type === 'badge' && (
        !badgeData ? (
          <span class="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700">Badge</span>
        ) : (
          <span class={`px-2 py-1 text-xs rounded-full inline-flex items-center ${badgeData.direction ? 'bg-green-100 text-green-800 space-x-1' : 'bg-blue-100 text-blue-700'}`}>
            {badgeData.direction && (
              <svg class="w-4 h-4" fill={badgeData.direction === 'up' ? 'currentColor' : 'currentColor'} viewBox="0 0 24 24">
                <path d={badgeData.direction === 'up' ? 'M4 14l8-8 8 8' : 'M4 10l8 8 8-8'} />
              </svg>
            )}
            {badgeData.score !== undefined ? (
              <>
                <div class="w-16 h-1 bg-gray-200 rounded-full overflow-hidden">
                  <div class={`h-full rounded-full ${badgeData.score >= 70 ? 'bg-green-500' : badgeData.score >= 40 ? 'bg-yellow-500' : 'bg-red-500'}`}
                       style={{ width: `${Math.min(Math.max(badgeData.score, 0), 100)}%` }} />
                </div>
                <span>{badgeData.score}%</span>
              </>
            ) : badgeData.label || 'Badge'}
          </span>
        )
      )}

      {type === 'chart' && (
        <canvas id="chart" class="w-full h-28 rounded-lg shadow-sm" />
      )}

      {type === 'filter' && (
        <select
          class="w-full border border-gray-300 rounded-md px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
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

      {type === 'search' && (
        <div class="relative">
          <input
            type="text"
            class="w-full border border-gray-300 rounded-md px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="Search..."
            value={query}
            onInput$={(e) => onInput$ && onInput$((e.target as HTMLInputElement).value)}
          />
          <svg class="absolute right-3 top-3 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          {query.length > 2 && <UIMolecule type="suggestions" query={query} />}
        </div>
      )}

      {type === 'progress' && (
        <div class="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div class={`h-full rounded-full ${listData[0]?.label === 'dominance' ? 'bg-green-500' : 'bg-blue-500'}`}
               style={{ width: `${Math.min(Math.max(listData[0]?.value || 0, 0), 100)}%` }} />
        </div>
      )}

      {type === 'controls' && listData[0]?.id && (
        <>
          <button class="p-2 rounded-full hover:bg-gray-100 transition" onClick$={() => console.log(`Preview ${listData[0].id}`)}>
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm6-8c-5 0-9 8-9 8s-4-8-9-8 9 8 9 8 4-8 9-8z" />
            </svg>
          </button>
          <button class="p-2 rounded-full hover:bg-gray-100 text-red-500 transition" onClick$={onRemove$}>
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M6 6h12v2H6zm2 4h8v8H8z" />
            </svg>
          </button>
        </>
      )}

      {type === 'facets' && (
        <div class="space-y-3">
          <select
            class="w-full border border-gray-300 rounded-md px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            onChange$={(e) => onChange$ && onChange$((e.target as HTMLSelectElement).value)}
          >
            <option value="">{filters.category || 'All'}</option>
            {['nlp', 'cv'].map((cat) => <option key={cat} value={cat}>{cat}</option>)}
          </select>
          <div class="relative h-8">
            <div class="w-full h-1 bg-gray-200 rounded-full absolute top-3">
              <div class="h-1 bg-blue-500 rounded-full" style={{ left: `${filters.priceRange[0] / 10}%`, width: `${(filters.priceRange[1] - filters.priceRange[0]) / 10}%` }} />
            </div>
            <input
              type="range"
              min={0}
              max={1000}
              value={filters.priceRange[0]}
              class="absolute w-full top-2 h-1 bg-transparent appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500 transition"
              onInput$={(e) => onChange$ && onChange$([Number((e.target as HTMLInputElement).value), filters.priceRange[1]])}
            />
            <input
              type="range"
              min={0}
              max={1000}
              value={filters.priceRange[1]}
              class="absolute w-full top-2 h-1 bg-transparent appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500 transition"
              onInput$={(e) => onChange$ && onChange$([filters.priceRange[0], Number((e.target as HTMLInputElement).value)])}
            />
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={filters.accuracy}
            class="w-full h-1 bg-gray-200 rounded-full appearance-none transition"
            onChange$={(e) => onChange$ && onChange$(Number((e.target as HTMLInputElement).value))}
          />
        </div>
      )}

      {type === 'suggestions' && (
        <div class="absolute z-10 w-full mt-1 bg-white rounded-b-md text-xs shadow-lg">
          {suggestions.value.length
            ? suggestions.value.map((s) => (
                <div key={s} class="px-3 py-2 hover:bg-gray-100 transition">{s}</div>
              ))
            : <div class="px-3 py-2 text-gray-400">No suggestions</div>}
        </div>
      )}

      {type === 'stat' && (
        <div class="p-3 rounded-lg bg-gray-100 text-center shadow">
          <h3 class="text-xs font-semibold text-gray-700">{listData[0]?.label}</h3>
          <p class="text-sm font-bold text-blue-500">{listData[0]?.value?.toLocaleString()}</p>
        </div>
      )}
    </div>
  );
});
