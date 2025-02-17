import { server$ } from "@builder.io/qwik-city";
import { createClient } from "@supabase/supabase-js";

export interface Category {
    id: number;
    name: string;
    model_count: number;
    weekly_trend: number;
    dominance: number;
    total_compute_cost: number;
    top_model: string;
    icon_url: string;
    domain?: string;
}

export const fetchCategories = server$(async (filter: 'all' | string, sortBy: string) => {
    const supabase = createClient(
        import.meta.env.PUBLIC_SUPABASE_URL,
        import.meta.env.PUBLIC_SUPABASE_KEY
    );

    try {
        let query = supabase
            .from('categories')
            .select('*');

        if (filter !== 'all') {
            query = query.ilike('domain', `%${filter}%`);
        }

        const { data, error: fetchError } = await query
            .order(sortBy, { ascending: false })
            .limit(100);

        if (fetchError) throw fetchError;
        return data || [];
    } catch (err: any) {
        // error.value = err.message || 'Failed to fetch categories';
    } finally {
        // isLoading.value = false;
    }
});