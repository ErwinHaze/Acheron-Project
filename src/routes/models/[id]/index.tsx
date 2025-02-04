import { component$, useResource$, Resource } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';

export default component$(() => {
  const location = useLocation();
  const modelId = location.params.modelId;

  // Mock data fetching
  const modelData = useResource$(() =>
    fetch(`/mock-data/models/${modelId}.json`).then((res) => res.json())
  );

  return (
    <Resource
      value={modelData}
      onPending={() => <p>Loading...</p>}
      onRejected={() => <p>Error loading model data.</p>}
      onResolved={(data) => (
        <div>
          <h1 class="text-3xl font-bold">{data.name}</h1>
          <p class="mt-2">{data.description}</p>
          <div class="mt-4">
            <h2 class="text-2xl font-semibold">Plans</h2>
            <ul class="mt-2">
              {data.plans.map((plan) => (
                <li key={plan.id} class="mt-2">
                  <span class="font-bold">{plan.name}</span> - ${plan.price}/month
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    />
  );
});
