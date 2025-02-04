import { component$, useResource$, Resource } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';

export default component$(() => {
  const location = useLocation();
  const creatorId = location.params.creatorId;

  // Mock data fetching
  const creatorData = useResource$(() =>
    fetch(`/mock-data/creators/${creatorId}.json`).then((res) => res.json())
  );

  return (
    <Resource
      value={creatorData}
      onPending={() => <p>Loading...</p>}
      onRejected={() => <p>Error loading creator data.</p>}
      onResolved={(data) => (
        <div>
          <h1 class="text-3xl font-bold">{data.name}</h1>
          <p class="mt-2">{data.bio}</p>
          <h2 class="mt-4 text-2xl font-semibold">Models</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            {data.models.map((model: any) => (
              <a
                href={`/models/${model.id}`}
                key={model.id}
                class="block p-4 bg-white shadow rounded-lg hover:shadow-lg transition"
              >
                <h2 class="text-lg font-semibold">{model.name}</h2>
                <p>{model.description}</p>
              </a>
            ))}
          </div>
        </div>
      )}
    />
  );
});
