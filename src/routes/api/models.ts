// api/models.ts
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

export async function fetchModels(filters) {
  let query = supabase.from('models').select('*');
  if (filters.useCase) query = query.eq('use_case', filters.useCase);
  if (filters.performanceMetric) query = query.order(filters.performanceMetric, { ascending: false });
  const { data } = await query;
  return data || [];
}

export async function fetchLeaderboard() {
  const { data } = await supabase
    .from('leaderboard')
    .select('*')
    .order('accuracy', { ascending: false });
  return data || [];
}

export async function fetchModelDetails(modelId) {
  const { data } = await supabase
    .from('models')
    .select('*')
    .eq('id', modelId)
    .single();
  return data || null;
}