import { component$ } from "@builder.io/qwik";
import type { RequestHandler} from "@builder.io/qwik-city";
import { routeLoader$ } from "@builder.io/qwik-city";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { db } from "~/api/app";

export const onGet: RequestHandler = async ({ cacheControl }) => {
    cacheControl({
        // Always serve a cached response by default, up to a week stale
        staleWhileRevalidate: 60 * 60 * 24 * 7,
        // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
        maxAge: 5,
    });
};

export const useData = routeLoader$(async (requestEvent) => {
    const terms: string = requestEvent.params.terms;
    const tags = terms.toLowerCase().split(' ');

    console.log(tags);

    const q = query(collection(db, 'versions'), where('tags', 'array-contains-any', tags), limit(30));

    console.log(q);

    const docs = await getDocs(q);

    const results: string[] = [];

    docs.forEach(doc => {
        results.push(doc.data().name);
    });

    return results;
});

export default component$(() => {
    const data = useData().value;

    return (<>
        { data.map((v, i) => <h2 key={i} class="text-lg font-bold">{ v }</h2>) }
    </>);
});