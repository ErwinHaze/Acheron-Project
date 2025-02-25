// src/components/organisms/UIOrganism.tsx
import { component$, useSignal, $, HTMLAttributes, QwikJSX } from '@builder.io/qwik';
// Fix 1: Remove useDocumentHead import

interface UIOrganismProps {
  type:
    | 'activity'
    | 'category-grid'
    | 'feedback'
    | 'featured-models'
    | 'footer'
    | 'header'
    | 'hero'
    | 'leaderboard'
    | 'login'
    | 'model-card'
    | 'model-compact'
    | 'overview'
    | 'performance'
    | 'insights'
    | 'router-head'
    | 'saved-models'
    | 'search-grid'
    | 'sortable-categories'
    | 'sortable-labs'
    | 'stats'
    | 'trending-models';
  data?: any[] | { 
    email?: string; 
    password?: string; 
    model?: any; 
    query?: string;
    savedModelsCount?: number; // Fix 5: Add missing properties
    activeLabsFollowed?: number; // Fix 6
    recentInteractions?: number; // Fix 7
  };
  onSubmit$?: (email: string, password: string) => void;
  onSelect$?: () => void;
  onSort$?: (sortKey: string) => void;
  sortBy?: string;
  isLoading?: boolean;
  showTrending?: boolean;
}

type DataArray = any[];
type DataObject = { 
  email?: string; 
  password?: string; 
  model?: any; 
  query?: string;
  savedModelsCount?: number;
  activeLabsFollowed?: number;
  recentInteractions?: number;
};

export const UIOrganism = component$<UIOrganismProps>(({
  type,
  data = [],
  onSubmit$,
  onSelect$,
  onSort$,
  sortBy = '',
  isLoading = false,
  showTrending = false,
}) => {
  const email = useSignal('');
  const password = useSignal('');
  const currentPage = useSignal(1);
  // Fix 1: Remove useDocumentHead
  const head = type === 'router-head' ? null : null; // Temporary placeholder

  const handleLogin = $(() => onSubmit$?.(email.value, password.value));
  const handleSort = $(async (value: string) => {
    if (type === 'search-grid' && Array.isArray(data)) { // Fix: Use Array.isArray instead of instanceof
      const sorted = [...data];
      switch (value) {
        case 'price': sorted.sort((a, b) => a.price - b.price); break;
        case 'accuracy': sorted.sort((a, b) => b.accuracy - a.accuracy); break;
        default: sorted.sort((a, b) => b.id.localeCompare(a.id));
      }
      // Need to handle this differently since data is read-only
      // data = sorted; // Not allowed
      currentPage.value = 1;
    }
  });
  
  // Fix 2, 3: Proper type checking for array operations
  const paginated = type === 'search-grid' && Array.isArray(data) 
    ? data.slice((currentPage.value - 1) * 10, currentPage.value * 10) 
    : data;

  return (
    <div class={`p-2 ${type === 'header' || type === 'footer' || type === 'hero' ? 'bg-black text-white' : 'bg-gray-50'} ${type === 'hero' ? 'h-64' : ''} rounded`}>
      {type === 'activity' && (
        <div class="space-y-1">
          {Array.isArray(data) && data.length ? data.map((item: any) => (
            <div key={item.id} class="p-1 border-b text-xs">
              <p>{item.description}</p>
              <small class="text-gray-500">{new Date(item.timestamp).toLocaleString()}</small>
            </div>
          )) : <p class="text-xs">No activity</p>}
        </div>
      )}

      {type === 'category-grid' && (
        <div>
          <div class="flex justify-between mb-2">
            <h2 class="text-sm font-bold">Categories</h2>
            <div class="flex gap-1">
              <input type="text" placeholder="Search..." class="p-1 rounded bg-gray-800 text-white text-xs" />
              <select class="p-1 rounded bg-gray-800 text-white text-xs">
                <option>Sort</option>
                <option>Name</option>
                <option>Models</option>
              </select>
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-1">
            {Array.isArray(data) && data.map((cat: any) => (
              <div key={cat.id} class="p-1 border rounded bg-gray-800 hover:bg-gray-700 text-xs">
                <h3 class="font-semibold">{cat.name}</h3>
                <p class="text-gray-400">{cat.totalModels} models</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {type === 'feedback' && (
        <div class="p-2 rounded">
          <h2 class="text-sm font-semibold">Feedback</h2>
          <ul class="space-y-1 text-xs">
            {Array.isArray(data) && data.map((item: any, idx: number) => (
              <li key={idx} class="border-b pb-1">
                <div class="flex justify-between">
                  <span class="font-medium">{item.user}</span>
                  <span class="text-yellow-500">{'★'.repeat(item.rating)}</span>
                </div>
                <p>{item.comment}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {type === 'featured-models' && (
        <div class="p-2 rounded bg-gray-900">
          <div class="flex justify-between mb-1">
            <h3 class="text-sm font-semibold">Featured Models</h3>
            <span class="text-xs text-gray-400">{'>'}</span>
          </div>
          <div class="space-y-1 text-xs">
            {Array.isArray(data) && data.map((m: any) => (
              <div key={m.id} class="flex justify-between p-1 hover:bg-gray-800 rounded">
                <div class="flex gap-1">
                  <div class="w-4 h-4 rounded-full bg-gray-700 flex items-center justify-center">{m.rank}</div>
                  <p class="text-white">{m.modelName}</p>
                </div>
                <p class={m.performanceChange.startsWith('+') ? 'text-green-400' : 'text-red-400'}>{m.performanceChange}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {type === 'footer' && (
        <div class="py-2">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-1 text-xs">
            <div>
              <h3 class="font-bold">EpixaL</h3>
              <p class="text-gray-400">Discover AI tools.</p>
            </div>
            <div>
              <h4 class="font-semibold">Links</h4>
              <ul class="space-y-1 text-gray-400">
                <li><a href="#" class="hover:text-white">Home</a></li>
                <li><a href="#" class="hover:text-white">Categories</a></li>
              </ul>
            </div>
            <div>
              <h4 class="font-semibold">Legal</h4>
              <ul class="space-y-1 text-gray-400">
                <li><a href="#" class="hover:text-white">Privacy</a></li>
              </ul>
            </div>
            <div>
              <h4 class="font-semibold">Follow</h4>
              <div class="flex gap-1 text-gray-400">
                <a href="#" class="hover:text-white">X</a>
                <a href="#" class="hover:text-white">GitHub</a>
              </div>
            </div>
          </div>
        </div>
      )}

      {type === 'header' && (
        <div class="flex justify-between items-center py-1">
          <a href="/" class="text-sm font-bold">EpixaL</a>
          <nav class="hidden md:flex gap-1">
            {['Playaround', 'Categories', 'Statistics', 'Docs', 'Blog'].map((link) => (
              <a key={link} href={`/${link.toLowerCase()}`} class="p-1 rounded hover:bg-gray-700 text-xs">{link}</a>
            ))}
          </nav>
          <div class="flex gap-1">
            <div class="relative">
              <input type="text" placeholder="Search..." class="p-1 rounded bg-gray-800 text-white text-xs" />
              <svg class="absolute right-1 top-1 w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" /></svg>
            </div>
            <button class="p-1 bg-blue-500 rounded text-xs hover:bg-blue-600">Sign In</button>
          </div>
        </div>
      )}

      {type === 'hero' && (
        <div class="relative flex items-center justify-center overflow-hidden">
          <video autoplay muted loop class="absolute w-full h-full object-cover opacity-50">
            <source src="/bg-motion.mp4" type="video/mp4" />
          </video>
          <div class="text-center text-white">
            <h1 class="text-xl font-bold">Discover AI</h1>
            <p class="text-xs">Explore cutting-edge models.</p>
            <button class="mt-1 p-1 bg-blue-500 rounded text-xs hover:bg-blue-600">Get Started</button>
          </div>
        </div>
      )}

      {type === 'leaderboard' && (
        <div class="overflow-x-auto">
          <table class="w-full border text-xs">
            <thead class="bg-gray-100">
              <tr>
                <th class="p-1 border-b font-semibold">Name</th>
                <th class="p-1 border-b font-semibold">Score</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(data) && data.map((m: any, idx: number) => (
                <tr key={idx} class="hover:bg-gray-50">
                  <td class="p-1 border-b">{m.name}</td>
                  <td class="p-1 border-b">{m.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {type === 'login' && (
        <form class="space-y-1" onSubmit$={handleLogin}>
          <div>
            <label class="text-xs font-bold">Email</label>
            <input type="email" class="w-full p-1 border rounded text-xs" value={email.value} onInput$={(e) => email.value = (e.target as HTMLInputElement).value} />
          </div>
          <div>
            <label class="text-xs font-bold">Password</label>
            <input type="password" class="w-full p-1 border rounded text-xs" value={password.value} onInput$={(e) => password.value = (e.target as HTMLInputElement).value} />
          </div>
          <button type="submit" class="p-1 bg-blue-500 rounded text-xs hover:bg-blue-700" disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Login'}
          </button>
        </form>
      )}

      {type === 'model-card' && !Array.isArray(data) && data?.model && (
        <div class={`p-1 border rounded hover:bg-gray-100 ${data.model.isSelected ? 'border-blue-500 bg-blue-50' : ''} text-xs`} onClick$={onSelect$}>
          <div class="flex justify-between">
            <div>
              <h2 class="font-semibold">{data.model.name}</h2>
              {showTrending && <span class="flex items-center text-red-600"><svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M5 10l7-7 7 7-7 7-7-7z"/></svg>Trending</span>}
            </div>
            <span class="px-1 rounded bg-blue-100 text-blue-700">{data.model.category}</span>
          </div>
          <p>By {data.model.creator}</p>
          <p>Price: ${data.model.price}</p>
          <p>Accuracy: {data.model.accuracy}%</p>
        </div>
      )}

      {type === 'model-compact' && !Array.isArray(data) && data?.model && (
        <div class="p-1 border rounded text-xs"><p>{data.model.id}</p></div>
      )}

      {type === 'overview' && !Array.isArray(data) && (
        <div class="space-y-1">
          <h2 class="text-sm font-bold">Overview</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-1 text-xs">
            <div class="p-1 rounded bg-gray-100 text-center"><p>Saved Models</p><p class="font-bold">{data?.savedModelsCount}</p></div>
            <div class="p-1 rounded bg-gray-100 text-center"><p>Active Labs</p><p class="font-bold">{data?.activeLabsFollowed}</p></div>
            <div class="p-1 rounded bg-gray-100 text-center"><p>Interactions</p><p class="font-bold">{data?.recentInteractions}</p></div>
          </div>
        </div>
      )}

      {type === 'performance' && !Array.isArray(data) && data?.model?.performanceMetrics && (
        <div class="p-2 rounded">
          <h2 class="text-sm font-semibold">Metrics</h2>
          <ul class="space-y-1 text-xs">
            <li class="flex justify-between"><span>Accuracy:</span><span>{data.model.performanceMetrics.accuracy}%</span></li>
            <li class="flex justify-between"><span>Precision:</span><span>{data.model.performanceMetrics.precision}%</span></li>
            <li class="flex justify-between"><span>Recall:</span><span>{data.model.performanceMetrics.recall}%</span></li>
            <li class="flex justify-between"><span>F1 Score:</span><span>{data.model.performanceMetrics.f1Score}%</span></li>
          </ul>
        </div>
      )}

      {(type === 'insights' && <div class="p-2 border rounded text-xs">Chart Placeholder</div>)}

      {/* Router head section needs to be reimplemented without useDocumentHead */}
      {type === 'router-head' && (
        <div>Router Head Placeholder</div>
      )}

      {type === 'saved-models' && (
        <div class="space-y-1 text-xs">
          {Array.isArray(data) && data.length ? data.map((m: any) => (
            <div key={m.id} class="p-1 border rounded">{m.id}</div>
          )) : <p>No saved models</p>}
        </div>
      )}

      {type === 'search-grid' && (
        <div class="space-y-1 text-xs">
          <div class="flex justify-between">
            {/* Fix for error 2: Add proper type checking for query property */}
            <h2>
              {Array.isArray(paginated) ? paginated.length : 0} results for "
              {!Array.isArray(data) && data && 'query' in data ? data.query : ''}"
            </h2>
            <select class="p-1 border rounded" onChange$={(e) => handleSort((e.target as HTMLSelectElement).value)}>
              <option value="relevance">Relevance</option>
              <option value="price">Price</option>
              <option value="accuracy">Accuracy</option>
            </select>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-1">
            {Array.isArray(paginated) && paginated.map((m: any) => (
              <div key={m.id} class="p-1 border rounded">{m.id}</div>
            ))}
          </div>
          <div class="flex justify-center gap-1">
            <button class="p-1 border rounded" onClick$={() => currentPage.value > 1 && currentPage.value--} disabled={currentPage.value === 1}>Prev</button>
            {Array.from({ length: Math.ceil(Array.isArray(data) ? data.length / 10 : 0) }, (_, i) => i + 1).map((p) => (
              <button key={p} class={`p-1 border rounded ${p === currentPage.value ? 'bg-blue-500 text-white' : ''}`} onClick$={() => currentPage.value = p}>{p}</button>
            ))}
            <button class="p-1 border rounded" onClick$={() => currentPage.value < Math.ceil(Array.isArray(data) ? data.length / 10 : 0) && currentPage.value++} disabled={currentPage.value === Math.ceil(Array.isArray(data) ? data.length / 10 : 0)}>Next</button>
          </div>
        </div>
      )}

      {type === 'sortable-categories' && (
        <div class="overflow-x-auto text-xs">
          <table class="w-full border-collapse">
            <thead class="bg-gray-700 text-white">
              <tr>
                {['Rank', 'Category', 'Models', 'Dominance', 'Compute', 'Trend'].map((col) => (
                  <th key={col} class="p-1" onClick$={() => onSort$?.(col.toLowerCase())}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.isArray(data) && data.map((cat: any, idx: number) => (
                <tr key={cat.id} class="hover:bg-gray-800">
                  <td class="p-1">#{idx + 1}</td>
                  <td class="p-1 flex gap-1"><img src={cat.icon_url} alt={cat.name} class="w-4 h-4 rounded" />{cat.name}</td>
                  <td class="p-1">{cat.model_count}</td>
                  <td class="p-1"><div class="w-full h-1 bg-gray-200 rounded"><div class="h-1 bg-blue-500 rounded" style={{ width: `${cat.dominance}%` }} /></div></td>
                  <td class="p-1">${cat.total_compute_cost.toLocaleString()}</td>
                  <td class="p-1 flex justify-end"><span class={cat.weekly_trend > 0 ? 'text-green-500' : 'text-red-500'}>{cat.weekly_trend > 0 ? '↑' : '↓'}{Math.abs(cat.weekly_trend)}%</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {type === 'sortable-labs' && (
        <div class="overflow-x-auto text-xs">
          <table class="w-full border-collapse">
            <thead class="bg-gray-700 text-white">
              <tr>
                {['Rank', 'Lab', 'Reputation', 'Models', 'Papers', 'Funding'].map((col) => (
                  <th key={col} class="p-1" onClick$={() => onSort$?.(col.toLowerCase())}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.isArray(data) && data.map((lab: any, idx: number) => (
                <tr key={lab.id} class="hover:bg-gray-800">
                  <td class="p-1">#{idx + 1}</td>
                  <td class="p-1 flex gap-1"><img src={lab.avatar_url} alt={lab.name} class="w-4 h-4 rounded" />{lab.name}</td>
                  <td class="p-1">{lab.reputation.toFixed(1)}</td>
                  <td class="p-1">{lab.models_count}</td>
                  <td class="p-1">{lab.papers_count}</td>
                  <td class="p-1">${lab.funding.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {type === 'stats' && (
        <div class="grid grid-cols-1 md:grid-cols-4 gap-1 text-xs">
          {Array.isArray(data) && data.map((stat: any) => (
            <div key={stat.label} class="p-1 rounded bg-black text-center">
              <p class="text-white">{stat.label}</p>
              <p class="text-white font-bold">{stat.value}</p>
            </div>
          ))}
        </div>
      )}

      {type === 'trending-models' && (
        <div class="p-2 rounded bg-gray-900">
          <div class="flex justify-between mb-1">
            <h3 class="text-sm font-semibold">Trending Models</h3>
            <span class="text-xs text-gray-400">{'>'}</span>
          </div>
          <div class="space-y-1 text-xs">
            {Array.isArray(data) && data.map((m: any) => (
              <div key={m.id} class="flex justify-between p-1 hover:bg-gray-800 rounded">
                <div class="flex gap-1">
                  <div class="w-4 h-4 rounded-full bg-gray-700 flex items-center justify-center">{m.rank}</div>
                  <p class="text-white">{m.modelName}</p>
                </div>
                <p class={m.performanceChange.startsWith('+') ? 'text-green-400' : 'text-red-400'}>{m.performanceChange}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
});