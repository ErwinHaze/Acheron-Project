import { component$ } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import { collection, doc, getDoc } from 'firebase/firestore';
import { db } from '~/api/app';

interface Plan {
    name: string;
    price: number;
}

interface Model {
    id: string;
    name: string;
    description: string;
    plans: Plan[]
}

export const useData = routeLoader$(async (requestEvent) => {
    // const category_id = requestEvent.params.id;

    const model: any = (await getDoc(doc(collection(db, "models"), requestEvent.params.id))).data() as unknown;

    delete model.category;

    return model as Model;
});

export default component$(() => {
    const data = useData().value;

    return (
        <div>
            <h1 class="text-3xl font-bold">{data.name}</h1>
            <p class="mt-2">{data.description}</p>
            <div class="mt-4">
                <h2 class="text-2xl font-semibold">Plans</h2>
                <ul class="mt-2">
                    {data.plans.map((plan) => (
                        <li key={plan.name} class="mt-2">
                            <span class="font-bold">{plan.name}</span> - ${plan.price}/month
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
});
