// api/dashboard.ts
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

export async function fetchDashboardData() {
  const { data: overview } = await supabase
    .from('user_dashboard_overview')
    .select('*')
    .single();

  const { data: savedModels } = await supabase
    .from('saved_models')
    .select('*');

  const { data: activityFeed } = await supabase
    .from('user_activity_feed')
    .select('*')
    .order('timestamp', { ascending: false });

  const { data: performanceInsights } = await supabase
    .from('user_performance_insights')
    .select('*');

  return {
    overview: overview || {},
    savedModels: savedModels || [],
    activityFeed: activityFeed || [],
    performanceInsights: performanceInsights || [],
  };
}