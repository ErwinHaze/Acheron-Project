import { component$, useResource$, Resource } from '@builder.io/qwik';
import { PageWrapper } from '../../../components/ui/page-wrapper';
import { ModelCard } from '../../../components/cards/model-card';
import { useLocation } from '@builder.io/qwik-city';

export default component$(() => {
  const location = useLocation();
  const categoryId = location.params.categoryId;

  const models = useResource$(() =>
    fetch(`/mock-data/categories/${categoryId}.json`).then((res) => res.json())
  );

  return (
    <PageWrapper>
      <Resource
        value={models}
        onPending={() => <p>Loading...</p>}
        onRejected={() => <p>Error loading models.</p>}
        onResolved={(data) => (
          <div class="container mx-auto">
            <h1 class="text-2xl font-bold mb-6">{data.name}</h1>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.models.map((model: any) => (
                <ModelCard
                  key={model.id}
                  id={model.id}
                  name={model.name}
                  description={model.description}
                  price={model.price}
                />
              ))}
            </div>
          </div>
        )}
      />
    </PageWrapper>
  );
});
