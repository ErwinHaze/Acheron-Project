import { component$ } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import { createClient } from '@supabase/supabase-js';
// import { createServerClient } from 'supabase-auth-helpers-qwik';

interface Version {
    name: string;
}

interface Model {
    id: string;
    name: string;
    description: string;
    versions: Version[];
}

export const useData = routeLoader$(async (requestEvent) => {
    /* const client = createServerClient(
        requestEvent.env.get('PUBLIC_SUPABASE_URL')!,
        requestEvent.env.get('PUBLIC_SUPABASE_ANON_KEY')!,
        requestEvent
    ); */
    const client = createClient(
        requestEvent.env.get('PUBLIC_SUPABASE_URL')!,
        requestEvent.env.get('PUBLIC_SUPABASE_ANON_KEY')!,
        {
            
        }
    );
    // const category_id = requestEvent.params.id;

    // console.log(await client.from("models").insert({ name: "hey", description: "yo" }));

    const { data } = await client.from("models").select("*");//.eq('id', requestEvent.params.id);
    console.log(data);

    return {} as Model;
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
                    {/* {data.versions.map((plan) => (
                        <li key={plan.name} class="mt-2">
                            <span class="font-bold">{plan.name}</span> - ${0.0}/month
                        </li>
                    ))} */}
                </ul>
            </div>
        </div>
    );
});
