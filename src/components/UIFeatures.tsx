import { component$, useSignal, useStore, useVisibleTask$ } from '@builder.io/qwik';
import { createClient } from '@supabase/supabase-js';

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
  data?: any[] | { creatorName?: string; bio?: string; modelId?: string };
  timeRange?: string;
  step?: number;
  onChange$?: (value: string) => void;
  onSelect$?: (item: any) => void;
}

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
  const state = useStore({ 
    selected: [] as any[], 
    step, 
    expanded: { myModels: true, explore: true } as Record<'myModels' | 'explore', boolean> 
  });
  const parentRef = useSignal<Element>();

  const virtualItems = useSignal(
    type === 'virtual-results' && items.value.length
      ? items.value.map((_, index) => ({
          key: index,
          size: 80,
          start: index * 80,
          index
        }))
      : []
  );

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

  const LabCard = component$(({ lab }: { lab: Lab }) => {
    return (
      <div class="p-4 bg-gray-800 rounded-lg shadow hover:bg-gray-700 transition">
        <h3 class="text-lg font-semibold text-white">{lab.name}</h3>
        <p class="text-sm text-gray-300">Reputation: {lab.reputation}</p>
        <p class="text-sm text-gray-300">Models: {lab.models_count}</p>
      </div>
    );
  });

  const CategoryCard = component$(({ category }: { category: Category }) => {
    return (
      <div class="p-4 bg-gray-800 rounded-lg shadow hover:bg-gray-700 transition">
        <img src={category.icon_url} alt={category.name} class="w-16 h-16 rounded-full mb-2" />
        <h3 class="text-lg font-semibold text-white">{category.name}</h3>
        <p class="text-sm text-gray-300">{category.model_count} models</p>
      </div>
    );
  });

  const Filter = component$(
    ({ currentFilter, onFilter$ }: { currentFilter: string; onFilter$: (f: string) => void }) => {
      const filters = ['all', 'domain1', 'domain2'];
      return (
        <div class="p-4 bg-gray-800 rounded-lg shadow">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick$={() => onFilter$(filter)}
              class={`px-4 py-2 rounded-lg transition ${
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

  return (
    <div class={`p-4 ${type === 'profile-header' ? 'bg-gray-900 text-white' : 'bg-white'} rounded-lg shadow`}>
      {type === 'rankings' && (
        <div class="space-y-2">
          {items.value.map((item, idx) => (
            <div key={item.id} class="flex items-center gap-3 p-3 bg-gray-800 rounded-lg shadow hover:bg-gray-700 transition">
              <span class="w-6 text-xs font-bold text-white">#{idx + 1}</span>
              <img src={item.avatar_url} alt={item.name} class="w-8 h-8 rounded-full" />
              <div class="flex-1">
                <h4 class="text-sm font-semibold text-white">{item.name}</h4>
                <span class="text-xs text-gray-300">{item.trending_score}%</span>
              </div>
              <span class="text-sm text-gray-100">{item.reputation}</span>
            </div>
          ))}
        </div>
      )}

      {type === 'ticker' && (
        <div class="flex gap-3 overflow-x-auto">
          {items.value.map((item) => (
            <div key={item.id} class="flex flex-col items-center px-4 py-2 bg-white shadow rounded-lg">
              <p class="text-sm font-bold text-gray-800">{item.name}</p>
              <p class="text-xs text-gray-500">{item.value}</p>
            </div>
          ))}
        </div>
      )}

      {type === 'metrics' && (
        <div class="grid grid-cols-1 gap-4">
          {items.value.map((m) => (
            <div key={m.id} class="p-4 bg-white shadow rounded-lg">
              <h3 class="text-sm font-semibold text-gray-800">{m.title}</h3>
              <p class="text-xs text-gray-500">{m.value}</p>
            </div>
          ))}
          <div class="p-4 bg-white shadow rounded-lg">Chart</div>
        </div>
      )}

      {type === 'upload-wizard' && (
        <div class="p-4 border border-dashed rounded-lg bg-white shadow-sm">
          <h2 class="text-base font-semibold text-gray-800">Upload</h2>
          <p class="text-sm text-gray-500">Step {state.step}/3</p>
        </div>
      )}

      {type === 'profile-header' && (
        <div class="p-4">
          <h2 class="text-xl font-bold">{(data as any).creatorName}</h2>
          <p class="text-sm text-gray-300">{(data as any).bio}</p>
        </div>
      )}

      {type === 'editors-choice' && (
        <div class="grid grid-cols-1 gap-4">
          <h2 class="text-base font-semibold text-gray-800">Editor’s Choice</h2>
          {items.value.length
            ? items.value.map((m) => (
                <div key={m.id} class="p-4 bg-white shadow rounded-lg hover:shadow-md transition">
                  {m.image && (
                    <img src={m.image} alt={m.name} class="w-full h-32 object-cover rounded-md mb-2" />
                  )}
                  <h3 class="text-sm font-semibold text-gray-800">{m.name}</h3>
                  <p class="text-xs text-gray-600">{m.description}</p>
                </div>
              ))
            : <p class="text-sm text-gray-500">No models</p>}
        </div>
      )}

      {type === 'filters' && (
        <div class="flex gap-3">
          {['Category', 'Price'].map((label) => (
            <select
              key={label}
              class="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
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
          <h2 class="text-base font-semibold text-gray-800 mb-2">Compare</h2>
          {state.selected.length ? (
            <div class="grid grid-cols-2 gap-4">
              {state.selected.map((m) => (
                <div key={m.id} class="p-4 bg-white shadow rounded-lg">
                  <h3 class="text-sm font-semibold text-gray-800">{m.name}</h3>
                  <p class="text-xs text-gray-600">{m.accuracy}%</p>
                </div>
              ))}
            </div>
          ) : <p class="text-sm text-gray-500">No models</p>}
        </div>
      )}

      {type === 'virtual-results' && (
        <div ref={parentRef} class="h-[400px] overflow-auto bg-gray-50 rounded-lg shadow-inner">
          <div style={{ height: `${items.value.length * 80}px` }}>
            {virtualItems.value.map((item) => (
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
                <div class="p-3 bg-white shadow rounded-lg">
                  <h3 class="text-sm font-semibold text-gray-800">{items.value[item.index].name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {type === 'demo-viewer' && (
        <div class="p-4 bg-white shadow rounded-lg border border-gray-200">
          <h2 class="text-base font-semibold text-gray-800">Demo</h2>
          <p class="text-sm text-gray-500">ID: {(data as any).modelId}</p>
        </div>
      )}

      {type === 'presets' && (
        <div>
          <h3 class="text-base font-semibold text-gray-800 mb-2">Presets</h3>
          <div class="grid gap-3">
            {items.value.map((p) => (
              <button key={p.id} class="px-4 py-2 bg-white shadow rounded-lg text-sm text-left hover:bg-gray-50 transition">
                {p.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {type === 'model-selector' && (
        <select
          class="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
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
          <button class="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">+ New</button>
          <div class="mt-4">
            {(['myModels', 'explore'] as Array<'myModels' | 'explore'>).map((section) => (
              <div key={section}>
                <div
                  class="flex justify-between items-center px-3 py-2 cursor-pointer bg-gray-100 rounded-lg hover:bg-gray-200 transition"
                  onClick$={() => (state.expanded[section] = !state.expanded[section])}
                >
                  <span class="text-sm font-semibold text-gray-800">{section === 'myModels' ? 'My Models' : 'Explore'}</span>
                  <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 20 20"
                    style={{ transform: state.expanded[section] ? 'rotate(90deg)' : 'none' }}
                  >
                    <path d="M7 14l4-4-4-4" />
                  </svg>
                </div>
                {state.expanded[section] && (
                  <div class="grid gap-3 mt-2">
                    {items.value
                      .filter((m) => (section === 'myModels' ? m.isSaved : true))
                      .map((m) => (
                        <div
                          key={m.id}
                          class={`px-3 py-2 bg-white shadow rounded-lg cursor-pointer hover:bg-gray-50 transition ${state.selected.some((s) => s.id === m.id) ? 'bg-gray-100' : ''}`}
                          onClick$={() => {
                            state.selected = [m];
                            onSelect$?.(m);
                          }}
                        >
                          <h3 class="text-sm font-semibold text-gray-800">{m.name}</h3>
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
