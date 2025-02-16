// components/features/analytics/LiveRanking.tsx
export const LiveRanking = component$(({ labs, timeRange }) => {
    const supabase = createClient();
  
    useVisibleTask$(({ cleanup }) => {
      const channel = supabase
        .channel('lab_rankings')
        .on('postgres_changes', {
          event: 'UPDATE',
          schema: 'public',
          table: 'ai_labs'
        }, (payload) => {
          const index = labs.value.findIndex(l => l.id === payload.new.id);
          if (index > -1) {
            labs.value = [
              ...labs.value.slice(0, index),
              payload.new,
              ...labs.value.slice(index + 1)
            ];
          }
        })
        .subscribe();
  
      cleanup(() => supabase.removeChannel(channel));
    });
  
    return (
      <div class="space-y-4">
        {labs.value.map((lab, index) => (
          <div key={lab.id} class="flex items-center gap-4 p-4 bg-dark-700 rounded-lg">
            <span class="text-xl font-bold w-8">#{index + 1}</span>
            <img 
              src={lab.avatar_url} 
              alt={lab.name}
              class="w-12 h-12 rounded-full"
            />
            <div class="flex-1">
              <h4 class="font-semibold">{lab.name}</h4>
              <div class="flex gap-4 text-sm">
                <span>▲ {lab.trending_score}%</span>
                <span>{lab.models_count} models</span>
              </div>
            </div>
            <ReputationScore value={lab.reputation} />
          </div>
        ))}
      </div>
    );
  });