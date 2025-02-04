import { component$ } from '@builder.io/qwik';
import { PageWrapper } from '../../../components/ui/page-wrapper';
import { ModelCard } from '../../../components/cards/model-card';
import { routeLoader$ } from '@builder.io/qwik-city';
import type { Category } from '../index';

export const useData = routeLoader$(async () => {
    // const category_id = requestEvent.params.id;

    return /* await (await fetch(`/mock-data/categories/${category_id}.json`)).json() */{
        "name": "Sucky Models",
        "description": "they fuckin' suck",
        "models": [
            {
                "id": 0,
                "name": "Penis",
                "description": "Penis is a Model that is designed to be the biggest Dick ever",
                "price": 100000000.0
            }
        ]
    } as unknown as Category;
});

export default component$(() => {
    const data = useData().value;

    return (
        <PageWrapper>
            <div class="container mx-auto">
                <h1 class="text-2xl font-bold mb-6">{data.name}</h1>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {data.models.map((model: any) => {
                        return (
                            <ModelCard
                                key={model.id}
                                id={model.id}
                                name={model.name}
                                description={model.description}
                                price={model.price}
                            />
                        )
                    })}
                </div>
            </div>
        </PageWrapper>
    );
});
