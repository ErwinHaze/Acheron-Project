import { component$, useVisibleTask$, useSignal } from '@builder.io/qwik';
import { createClient } from '@supabase/supabase-js';
import { ReputationScore } from '~/components/ui/reputationScore/ReputationScore';

// components/features/analytics/LiveRanking.tsx
interface LiveRankingsProps {
  labs: Lab[];
  timeRange: string;
}

interface Lab {
  id: string;
  avatar_url: string;
  name: string;
  trending_score: number;
  models_count: number;
  reputation: number;
}

export const LiveRankings = component$((props: LiveRankingsProps) => {
    const { labs, timeRange } = props;
    const supabase = createClient();
    const labsSignal = useSignal(labs);
  
    useVisibleTask$(({ cleanup }) => {
      
      interface SupabasePayload {
        new: Lab;
      }
      
      const channel = supabase
        .channel('lab_rankings')
        .on('postgres_changes', {
          event: 'UPDATE',
          schema: 'public',
          table: 'ai_labs'
        }, (payload: SupabasePayload) => {
          const index = labsSignal.value.findIndex(l => l.id === payload.new.id);
          if (index > -1) {
            labsSignal.value = [
              ...labsSignal.value.slice(0, index),
              payload.new,
              ...labsSignal.value.slice(index + 1)
            ];
          }
        })
        .subscribe();
  
      cleanup(() => supabase.removeChannel(channel));
    });
  
    return (
      <div class="space-y-4">
        {labsSignal.value.map((lab, index) => (
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