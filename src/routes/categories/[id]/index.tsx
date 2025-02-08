import { component$ } from '@builder.io/qwik';
import { PageWrapper } from '../../../components/ui/page-wrapper';
import { ModelCard } from '../../../components/cards/model-card';
import type { RequestHandler} from '@builder.io/qwik-city';
import { routeLoader$ } from '@builder.io/qwik-city';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '~/api/app';

export const onGet: RequestHandler = async ({ cacheControl }) => {
    cacheControl({
        // Always serve a cached response by default, up to a week stale
        staleWhileRevalidate: 60 * 60 * 24 * 7,
        // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
        maxAge: 5,
    });
};

interface Model {
    id: string;
    name: string;
    description: string;
}

interface Category {
    name: string;
    models: Model[];
}

export const useData = routeLoader$(async (requestEvent) => {
    // const category_id = requestEvent.params.id;

    const models: Model[] = [];

    (await getDocs(query(collection(db, "models"), where("category", "==", doc(collection(db, "categories"), requestEvent.params.id))))).forEach(res => {
        const m = res.data() as Model;
        models.push({ id: res.id, name: m.name, description: m.description });
    });

    const category: Category = {
        name: ((await getDoc(doc(collection(db, "categories"), requestEvent.params.id))).data() || { name: 'unknown' }).name,
        models: models
    };

    return category;
});

export default component$(() => {
    const data = useData().value;

    return (
        <PageWrapper>
            <div class="container mx-auto">
                <h1 class="text-2xl font-bold mb-6">{data.name}</h1>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {data.models.map(model => {
                        return (
                            <ModelCard
                                key={model.id}
                                id={model.id}
                                name={model.name}
                                description={model.description}
                                price={0.0}
                            />
                        )
                    })}
                </div>
            </div>
        </PageWrapper>
    );
});
