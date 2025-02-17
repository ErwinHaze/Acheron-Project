import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import { createClient } from '@supabase/supabase-js';
// Removed import for LabCard, LabsFilter, LabsStats, SortableLabsTable

// Inline component definitions

export const LabCard = component$(({ lab }: { lab: Lab }) => {
  return <div class="lab-card">{lab.name}</div>;
});

export const LabsFilter = component$(
  ({ currentFilter, onFilter$ }: { currentFilter: string; onFilter$: (f: string) => void }) => {
    return (
      <div class="labs-filter">
        <button onClick$={() => onFilter$('all')} class={currentFilter === 'all' ? 'active' : ''}>
          All
        </button>
        {/* ...other filter options... */}
      </div>
    );
  }
);

export const LabsStats = component$(() => {
  return <div class="labs-stats">Labs Stats</div>;
});

export const SortableLabsTable = component$(
  ({ labs, sortBy, onSort$ }: { labs: Lab[]; sortBy: string; onSort$: (s: string) => void }) => {
    return (
      <table class="sortable-labs-table">
        <thead>
          <tr>
            <th onClick$={() => onSort$('reputation')}>Reputation</th>
            {/* ...other table headers... */}
          </tr>
        </thead>
        <tbody>
          {labs.map(lab => (
            <tr key={lab.id}>
              <td>{lab.name}</td>
              {/* ...other lab details... */}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
);

interface Lab {
  id: number;
  name: string;
  reputation: number;
  models_count: number;
  papers_count: number;
  funding: number;
  location: string;
  avatar_url: string;
  trending_score: number;
}

export default component$(() => {
  const supabase = createClient(
    import.meta.env.PUBLIC_SUPABASE_URL,
    import.meta.env.PUBLIC_SUPABASE_KEY
  );

  const labs = useSignal<Lab[]>([]);
  const sortBy = useSignal('reputation');
  const filter = useSignal('all');

  useVisibleTask$(({ track }) => {
    track(() => [sortBy.value, filter.value]);

    const fetchLabs = async () => {
      let query = supabase
        .from('ai_labs')
        .select(`
          id,
          name,
          reputation,
          models_count,
          papers_count,
          funding,
          location,
          avatar_url,
          trending_score
        `);

      if (filter.value !== 'all') {
        query = query.ilike('specialization', `%${filter.value}%`);
      }

      const { data } = await query
        .order(sortBy.value, { ascending: false })
        .limit(100);

      labs.value = data || [];
    };

    fetchLabs();
  });

  return (
    <div class="container mx-auto px-4">
      <LabsStats />
      
      <div class="grid gap-6 md:grid-cols-4">
        <div class="md:col-span-1">
          <LabsFilter 
            currentFilter={filter.value}
            onFilter$={(f) => filter.value = f}
          />
        </div>
        
        <div class="md:col-span-3">
          <SortableLabsTable
            labs={labs.value}
            sortBy={sortBy.value}
            onSort$={(s) => sortBy.value = s}
          />
          
          <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-8">
            {labs.value.slice(0, 6).map(lab => (
              <LabCard key={lab.id} lab={lab} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});