import { component$, Resource, useResource$ } from "@builder.io/qwik";
import { collection, getDocs } from "firebase/firestore";
import { db } from "~/api/app";

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

export default component$(() => {
    const categories = useResource$(async () => {
        const categories: Category[] = [];

        (await getDocs(collection(db, "categories"))).forEach(data => {
            const cat = data.data() as Category;
            cat.id = data.id;

            categories.push(cat);
        });

        return categories;
    });

    return (<>
        <h1>Here is a list of all models: </h1>
        <Resource value={categories} onResolved={(cats) => cats.map(cat => <h1 key={cat.id}>{cat.name}</h1>)} />
    </>);
});