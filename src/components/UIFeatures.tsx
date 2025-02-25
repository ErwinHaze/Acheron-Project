// src/components/features/UIFeature.tsx
import { component$, useSignal, useStore, useVisibleTask$ } from '@builder.io/qwik';
import { useVirtualizer } from '@builder.io/qwik-virtualizer';
import { createClient } from '@supabase/supabase-js';
import { Category } from '~/backend/categories';

interface UIFeatureProps {
  type:
    | 'rankings'
    | 'ticker'
    | 'metrics'
    | 'upload-wizard'
    | 'profile-header'
    | 'editors-choice'
    | 'filters'
    | 'comparator'
    | 'virtual-results'
    | 'demo-viewer'
    | 'presets'
    | 'model-selector'
    | 'sidebar';
  data?: any[] | { creatorName?: string; bio?: string; modelId?: string }; // Generic data prop
  timeRange?: string; // For rankings
  step?: number; // For upload-wizard
  onChange$?: (value: string) => void; // For filters/selector
  onSelect$?: (item: any) => void; // For sidebar/comparator
}

// Type definitions
type Lab = {
  id: number;
  name: string;
  reputation: number;
  models_count: number;
  papers_count: number;
  funding: number;
  location: string;
  avatar_url: string;
  trending_score: number;
};

type Category = {
  id: number;
  name: string;
  model_count: number;
  weekly_trend: number;
  dominance: number;
  total_compute_cost: number;
  top_model: string;
  icon_url: string;
  domain?: string;
};

export const UIFeature = component$<UIFeatureProps>(({
  type,
  data = [],
  timeRange,
  step = 1,
  onChange$,
  onSelect$,
}) => {
  const supabase = createClient(
    import.meta.env.PUBLIC_SUPABASE_URL,
    import.meta.env.PUBLIC_SUPABASE_KEY
  );
  const items = useSignal<any[]>(Array.isArray(data) ? data : []);
  // Use an explicit type for expanded so we can index with 'myModels' | 'explore'
  const state = useStore({ 
    selected: [] as any[], 
    step, 
    expanded: { myModels: true, explore: true } as Record<'myModels' | 'explore', boolean> 
  });
  const parentRef = useSignal<Element>();

  // Virtualizer for virtual-results
  const virtualizer =
    type === 'virtual-results' && items.value.length
      ? useVirtualizer({
          count: items.value.length,
          getScrollElement: () => parentRef.value,
          estimateSize: () => 80,
          overscan: 5,
        })
      : null;

  // Real-time updates for rankings
  useVisibleTask$(({ cleanup }) => {
    if (type === 'rankings') {
      const channel = supabase
        .channel('lab_rankings')
        .on(
          'postgres_changes',
          { event: 'UPDATE', schema: 'public', table: 'ai_labs' },
          (payload: { new: { id: any } }) => {
            const index = items.value.findIndex((l) => l.id === payload.new.id);
            if (index > -1)
              items.value = [
                ...items.value.slice(0, index),
                payload.new,
                ...items.value.slice(index + 1),
              ];
          }
        )
        .subscribe();
      cleanup(() => supabase.removeChannel(channel));
    }
  });

  // Inline Components

  // LabCard
  const LabCard = component$(({ lab }: { lab: Lab }) => {
    return (
      <div class="bg-gray-800 p-4 rounded-md shadow text-gray-300 hover:bg-gray-700">
        <h3 class="text-lg font-semibold text-white">{lab.name}</h3>
        <p>Reputation: {lab.reputation}</p>
        <p>Models: {lab.models_count}</p>
      </div>
    );
  });

  // CategoryCard
  const CategoryCard = component$(({ category }: { category: Category }) => {
    return (
      <div class="bg-gray-800 p-4 rounded-md shadow text-gray-300 hover:bg-gray-700">
        <img src={category.icon_url} alt={category.name} class="w-16 h-16 rounded-full mb-2" />
        <h3 class="text-lg font-semibold text-white">{category.name}</h3>
        <p>{category.model_count} models</p>
      </div>
    );
  });

  // Filter (combined LabsFilter and CategoriesFilter)
  const Filter = component$(
    ({ currentFilter, onFilter$ }: { currentFilter: string; onFilter$: (f: string) => void }) => {
      const filters = ['all', 'domain1', 'domain2'];
      return (
        <div class="bg-gray-800 p-4 rounded-md shadow">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick$={() => onFilter$(filter)}
              class={`px-4 py-2 rounded-md ${
                currentFilter === filter
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      );
    }
  );

  // Main return JSX
  return (
    <div class={`p-2 ${type === 'profile-header' ? 'bg-gray-800 text-white' : 'bg-gray-50'} rounded`}>
      {type === 'rankings' && (
        <div class="space-y-1">
          {items.value.map((item, idx) => (
            <div key={item.id} class="flex items-center gap-2 p-1 bg-gray-700 rounded">
              <span class="w-5 text-xs font-bold">#{idx + 1}</span>
              <img src={item.avatar_url} alt={item.name} class="w-6 h-6 rounded-full" />
              <div class="flex-1">
                <h4 class="text-xs font-semibold">{item.name}</h4>
                <span class="text-xs">{item.trending_score}%</span>
              </div>
              <span class="text-xs">{item.reputation}</span>
            </div>
          ))}
        </div>
      )}

      {type === 'ticker' && (
        <div class="flex gap-1 overflow-x-auto">
          {items.value.map((item) => (
            <div key={item.id} class="p-1 border-r last:border-0 text-xs">
              <p class="font-semibold">{item.name}</p>
              <p>{item.value}</p>
            </div>
          ))}
        </div>
      )}

      {type === 'metrics' && (
        <div class="grid grid-cols-1 gap-1">
          {items.value.map((m) => (
            <div key={m.id} class="p-1 border rounded">
              <h3 class="text-xs font-bold">{m.title}</h3>
              <p class="text-xs">{m.value}</p>
            </div>
          ))}
          <div class="p-1 border rounded">Chart</div>
        </div>
      )}

      {type === 'upload-wizard' && (
        <div class="border p-2">
          <h2 class="text-sm font-bold">Upload</h2>
          <p class="text-xs">Step {state.step}/3</p>
        </div>
      )}

      {type === 'profile-header' && (
        <>
          <h2 class="text-lg font-bold">{(data as any).creatorName}</h2>
          <p class="text-xs text-gray-200">{(data as any).bio}</p>
        </>
      )}

      {type === 'editors-choice' && (
        <div class="grid grid-cols-1 gap-1">
          <h2 class="text-sm font-bold">Editor’s Choice</h2>
          {items.value.length
            ? items.value.map((m) => (
                <div key={m.id} class="p-1 border rounded">
                  {m.image && (
                    <img src={m.image} alt={m.name} class="w-full h-16 object-cover rounded" />
                  )}
                  <h3 class="text-xs font-bold">{m.name}</h3>
                  <p class="text-xs">{m.description}</p>
                </div>
              ))
            : <p class="text-xs">No models</p>}
        </div>
      )}

      {type === 'filters' && (
        <div class="flex gap-1">
          {['Category', 'Price'].map((label) => (
            <select
              key={label}
              class="border p-1 text-xs"
              onChange$={(e) =>
                onChange$ && onChange$((e.target as HTMLSelectElement).value)
              }
            >
              {['All', label === 'Category' ? 'NLP' : 'Free', label === 'Category' ? 'Vision' : 'Paid'].map((opt) => (
                <option key={opt}>{opt}</option>
              ))}
            </select>
          ))}
        </div>
      )}

      {type === 'comparator' && (
        <div>
          <h2 class="text-sm font-bold">Compare</h2>
          {state.selected.length ? (
            <div class="grid grid-cols-2 gap-1">
              {state.selected.map((m) => (
                <div key={m.id} class="p-1 border">
                  <h3 class="text-xs font-bold">{m.name}</h3>
                  <p class="text-xs">{m.accuracy}%</p>
                </div>
              ))}
            </div>
          ) : <p class="text-xs">No models</p>}
        </div>
      )}

      {type === 'virtual-results' && virtualizer && (
        <div ref={parentRef} class="h-[400px] overflow-auto">
          <div style={{ height: `${virtualizer.getTotalSize()}px` }}>
            {virtualizer.getVirtualItems().map((item: { key: string | number | null; size: number; start: number; index: number | string; }) => (
              <div
                key={item.key}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: `${item.size}px`,
                  transform: `translateY(${item.start}px)`,
                }}
              >
                <div class="p-1 border">
                  <h3 class="text-xs">{items.value[item.index as number].name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {type === 'demo-viewer' && (
        <div class="border p-2">
          <h2 class="text-sm font-bold">Demo</h2>
          <p class="text-xs">ID: {(data as any).modelId}</p>
        </div>
      )}

      {type === 'presets' && (
        <div>
          <h3 class="text-xs font-bold">Presets</h3>
          <div class="grid gap-1">
            {items.value.map((p) => (
              <button key={p.id} class="p-1 border text-xs text-left hover:bg-gray-100">
                {p.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {type === 'model-selector' && (
        <select
          class="border p-1 text-xs"
          onChange$={(e) =>
            onChange$ && onChange$((e.target as HTMLSelectElement).value)
          }
        >
          <option value="">Select</option>
          {items.value.map((m) => (
            <option key={m.id} value={m.id}>{m.name}</option>
          ))}
        </select>
      )}

      {type === 'sidebar' && (
        <div>
          <button class="p-1 text-xs bg-gray-100 rounded">+ New</button>
          <div class="mt-1">
            {(['myModels', 'explore'] as Array<'myModels' | 'explore'>).map((section) => (
              <div key={section}>
                <div
                  class="flex justify-between p-1 cursor-pointer"
                  onClick$={() => (state.expanded[section] = !state.expanded[section])}
                >
                  <span class="text-xs">{section === 'myModels' ? 'My Models' : 'Explore'}</span>
                  <svg
                    class="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 20 20"
                    style={{ transform: state.expanded[section] ? 'rotate(90deg)' : 'none' }}
                  >
                    <path d="M7 14l4-4-4-4" />
                  </svg>
                </div>
                {state.expanded[section] && (
                  <div class="grid gap-1">
                    {items.value
                      .filter((m) => (section === 'myModels' ? m.isSaved : true))
                      .map((m) => (
                        <div
                          key={m.id}
                          class={`p-1 border ${state.selected.some((s) => s.id === m.id) ? 'bg-gray-200' : ''}`}
                          onClick$={() => {
                            state.selected = [m];
                            onSelect$?.(m);
                          }}
                        >
                          <h3 class="text-xs">{m.name}</h3>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
});
