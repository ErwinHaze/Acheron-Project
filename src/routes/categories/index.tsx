import { component$ } from "@builder.io/qwik";
import type { RequestHandler} from "@builder.io/qwik-city";
import { Link, routeLoader$ } from "@builder.io/qwik-city";
import { collection, getDocs } from "firebase/firestore";
import { db } from "~/api/app";

export const onGet: RequestHandler = async ({ cacheControl }) => {
    cacheControl({
        // Always serve a cached response by default, up to a week stale
        staleWhileRevalidate: 60 * 60 * 24 * 7,
        // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
        maxAge: 5,
    });
};

export type Model = {
    id: string;
    name: string;
    description: string;
    price: number;
}

export type Category = {
    id: string;
    name: string;
    description: string;
    models: Model[];
};

export const useCategories = routeLoader$(async () => {
    const categories: Category[] = [];

    (await getDocs(collection(db, "categories"))).forEach(data => {
        const cat = data.data() as Category;
        cat.id = data.id;

        categories.push(cat);
    });

    return categories;
});

export default component$(() => {
    const categories = useCategories().value;

    return (<>
        <h1>Here is a list of all models: </h1>
        {/* <Resource value={categories} onResolved= */}{categories.map(cat => <Link key={cat.id} href={`/categories/${cat.id}`}><h1>{cat.name}</h1></Link>)} {/* /> */}
    </>);
});