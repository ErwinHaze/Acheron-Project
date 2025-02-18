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
import { FeaturedModelsList } from '~/components/organisms/FeaturedModels/FeaturedModelsList';
import { StatsBlock } from '~/components/organisms/StatsBlock/StatsBlock';
//import { supabaseClient } from '~/supabase/client'; // your supabase config
import type { StatsItem } from '~/components/organisms/StatsBlock/StatsBlock';
import type { Category } from '~/types/category';

const FEATUREDMODEL = [
  { id: '1', rank: 1, modelName: 'Llama 2 70B', performanceChange: '+15.2%' },
  { id: '2', rank: 2, modelName: 'DALL-E 3', performanceChange: '+10.8%' },
  { id: '3', rank: 3, modelName: 'FLUX 1L', performanceChange: '+5.8%' },
];

const TRENDINGMODEL = [
  { id: '1', name: 'ChatGPT-4o', direction: 'up' }, 
  { id: '2', name: 'DeepSeek R1', direction: 'down' },   
  { id: '3', name: 'Claude Sonnet', direction: 'down' },   
];

export default component$(() => {
  // Local store for home data
  const store = useStore({
    categories: [] as Category[],
    trendingModels: TRENDINGMODEL, // ✅ Now initialized
    featuredModels: FEATUREDMODEL, // ✅ Now initialized
    editorsChoice: [],
    stats: [] as StatsItem[],
    loading: false,
    error: null as string | null,
  });

  // Activated Resource to fetch homepage data with sample data
  const homeDataResource = useResource$(async () => {
    store.loading = true;
    store.error = null;
    try {
      // Simulate an API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // Sample stats data
      const stats: StatsItem[] = [
        { label: 'Total Models', value: 1284 },
        { label: 'Total Labs', value: 42 },
        { label: 'Users Online', value: 321 },
        { label: 'Top Category', value: 'NLP' },
      ];
      return {
        categories: [],
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
    <div class="min-h-screen flex flex-col bg-dark text-light">
      <Resource
        value={homeDataResource}
        onPending={() => <p class="m-4">Loading homepage data...</p>}
        onRejected={(error) => <p class="m-4 text-red-500">{error.message}</p>}
        onResolved={(res) => {
          if (!res) {
            return <p class="m-4">No data found.</p>;
          }

          store.categories = res.categories;
          store.stats = res.stats;

          return (
            <div>
              <HeroSection />
              <div class="container mx-auto py-6 overflow-x-auto"> 
              {/* 🔥 Trending Models Section */}
              <div class="mx-auto py-6 overflow-x-auto">
                <h2 class="text-2xl font-bold mb-4">Trending AI Models</h2>
                <TrendingModelsList items={store.trendingModels} />
              </div>

              {/* 🌟 Featured Models Section */}
              <div class=" mx-auto py-6">
                <h2 class="text-2xl font-bold mb-4">Featured Models</h2>
                <FeaturedModelsList />
              </div>
              </div> 

              {/* 📊 Stats Block */}
              <div class="container mx-auto py-6">
                <StatsBlock stats={store.stats} />
              </div>

              {/* 🏆 Editors’ Choice */}
              <div class="container mx-auto py-6">
                <h2 class="text-2xl font-bold mb-4">Editors’ Choice</h2>
                <EditorsChoiceGrid />
              </div>

              {/* 🎭 Categories */}
              <div class="container mx-auto py-6">
                <h2 class="text-2xl font-bold mb-4">Explore Categories</h2>
                <CategoryGrid />
              </div>
            </div>
          );
        }}
      />
    </div>
  );
});
