import { component$, useResource$ } from "@builder.io/qwik";

export const ModelsList = component$(() => {
  const modelsResource = useResource$(() =>
    fetch("https://your-backend-url.com/api/models").then((res) => res.json())
  );

  return (
    <Resource
      value={modelsResource}
      onPending={() => <p>Loading models...</p>}
      onRejected={() => <p>Error loading models.</p>}
      onResolved={(models) => (
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          {models.map((model) => (
            <div key={model.id} class="p-4 border rounded shadow-md">
              <img src={model.logo} alt={model.name} class="w-16 h-16" />
              <h2 class="text-lg font-bold">{model.name}</h2>
              <p>{model.description}</p>
              <p class="text-sm text-gray-600">{model.price}</p>
              <a href={model.demoEndpoint} class="text-blue-500 hover:underline">Try Demo</a>
            </div>
          ))}
        </div>
      )}
    />
  );
});
