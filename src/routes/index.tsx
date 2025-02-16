// FILE: src/routes/index.tsx
import {
  component$,
  useStore,
  useResource$,
  Resource,
} from '@builder.io/qwik';
import { HeroSection } from '~/components/organisms/Hero/HeroSection';
import { CategoryGrid } from '~/components/organisms/CategoryGrid/CategoryGrid';
import { EditorsChoiceGrid } from '~/components/features/model-discovery/EditorsChoice/EditorsChoiceGrid';
import { TrendingModelsList } from '~/components/organisms/TrendingModels/TrendingModelsList';
import { StatsBlock } from '~/components/organisms/StatsBlock/StatsBlock';
import { supabaseClient } from '~/supabase/client'; // your supabase config
import type { StatsItem } from '~/components/organisms/StatsBlock/StatsBlock';
import type { Model } from '~/routes/models/[modelId]'; // or your own model interface
import type { Category } from '~/routes/categories/[categoryId]';

export default component$(() => {
  // Local store for home data
  const store = useStore({
    categories: [] as Category[],
    trendingModels: [] as Model[],
    editorsChoice: [] as Model[],
    stats: [] as StatsItem[],
    loading: false,
    error: null as string | null,
  });

  // 1. Resource to fetch homepage data from Supabase
  //    (categories, trending, editors choice, some stats)
  const homeDataResource = useResource$(async () => {
    store.loading = true;
    store.error = null;

    try {
      // Example Supabase queries: categories, trending models, etc.
      const { data: catData } = await supabaseClient
        .from('categories')
        .select('*')
        .limit(6);

      const { data: trendingData } = await supabaseClient
        .from('models')
        .select('*')
        .eq('isTrending', true)
        .limit(5);

      const { data: editorsData } = await supabaseClient
        .from('models')
        .select('*')
        .eq('editorsChoice', true)
        .limit(4);

      // Example stats
      const stats: StatsItem[] = [
        { label: 'Total Models', value: 1284 },
        { label: 'Total Labs', value: 42 },
        { label: 'Users Online', value: 321 },
        { label: 'Top Category', value: 'NLP' },
      ];

      return {
        categories: catData || [],
        trendingModels: trendingData || [],
        editorsChoice: editorsData || [],
        stats,
      };
    } catch (err: any) {
      store.error = err.message;
      return null;
    } finally {
      store.loading = false;
    }
  });

  return (
    <div class="min-h-screen flex flex-col">
      <Resource
        value={homeDataResource}
        onPending={() => <p class="m-4">Loading homepage data...</p>}
        onRejected={(error) => <p class="m-4 text-red-500">{error.message}</p>}
        onResolved={(res) => {
          if (!res) {
            return <p class="m-4">No data found.</p>;
          }

          store.categories = res.categories;
          store.trendingModels = res.trendingModels;
          store.editorsChoice = res.editorsChoice;
          store.stats = res.stats;

          return (
            <div>
              {/* Hero / Banner */}
              <HeroSection />

              {/* Stats Block (like CMC’s “Global Crypto Market Cap” section) */}
              <div class="container mx-auto py-6">
                <StatsBlock stats={store.stats} />
              </div>

              {/* Category Grid (CoinMarketCap-like categories) */}
              <div class="container mx-auto py-6">
                <h2 class="text-2xl font-bold mb-4">Explore Categories</h2>
                <CategoryGrid
                  categories={store.categories.map((cat) => ({
                    id: cat.id,
                    name: cat.name,
                    totalModels: cat.models?.length || 0,
                  }))}
                />
              </div>

              {/* Editors Choice / Featured Models */}
              <div class="container mx-auto py-6">
                <h2 class="text-2xl font-bold mb-4">Editors’ Choice</h2>
                <EditorsChoiceGrid models={store.editorsChoice} />
              </div>

              {/* Trending Models (similar to trending cryptos on CMC) */}
              <div class="container mx-auto py-6">
                <h2 class="text-2xl font-bold mb-4">Trending AI Models</h2>
                <TrendingModelsList
                  items={store.trendingModels.map((m) => ({
                    id: m.id,
                    name: m.name,
                    direction: 'up', // or 'down' based on your data
                  }))}
                />
              </div>
            </div>
          );
        }}
      />
    </div>
  );
});
