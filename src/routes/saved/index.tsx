import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import { createClient } from '@supabase/supabase-js';
import { 
  WatchlistHeader,
  SavedModelsGrid,
  ComparisonPanel,
  BulkActionsToolbar
} from '~/components/features/saved-models';

export default component$(() => {
  const supabase = createClient(
    import.meta.env.PUBLIC_SUPABASE_URL,
    import.meta.env.PUBLIC_SUPABASE_KEY
  );

  const selectedModels = useSignal<Set<string>>(new Set());
  const savedModels = useSignal<AIModel[]>([]);
  const filters = useSignal({
    category: '',
    priceRange: [0, 1000],
    savedDate: 'all'
  });

  useVisibleTask$(async () => {
    const { data: { user } } = await supabase.auth.getUser();

    const { data } = await supabase
      .from('saved_models')
      .select(`
        model:ai_models(
          id,
          name,
          price,
          accuracy,
          category,
          creator:profiles(username, avatar_url),
          last_updated,
          trending_score
        )
      `)
      .eq('user_id', user?.id)
      .order('saved_at', { ascending: false });

    savedModels.value = data?.map(item => item.model) || [];

    const channel = supabase
      .channel('saved_models')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'saved_models',
        filter: `user_id=eq.${user?.id}`
      }, handleSavedModelsUpdate)
      .subscribe();

    return () => supabase.removeChannel(channel);
  });

  const handleSavedModelsUpdate = (payload) => {
    // Implementation for real-time updates
  };

  return (
    <div class="container mx-auto px-4">
      <WatchlistHeader count={savedModels.value.length} />
      
      <BulkActionsToolbar 
        selectedCount={selectedModels.value.size}
        onDelete$={() => handleBulkDelete()}
        onCompare$={() => handleCompare()}
      />

      <div class="grid gap-6 md:grid-cols-4">
        <div class="md:col-span-1">
          <SavedFilters
            filters={filters.value}
            onFilterChange$={(newFilters) => filters.value = newFilters}
          />
        </div>

        <div class="md:col-span-3">
          <SavedModelsGrid 
            models={savedModels.value}
            selectedModels={selectedModels.value}
            onSelect$={(modelId) => handleSelectModel(modelId)}
          />
        </div>
      </div>

      <ComparisonPanel 
        models={Array.from(selectedModels.value)
          .map(id => savedModels.value.find(m => m.id === id))}
      />
    </div>
  );
}); 