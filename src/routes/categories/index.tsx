import { component$, Resource, useResource$ } from "@builder.io/qwik";
import { collection, getDocs } from "firebase/firestore";
import { db } from "~/api/app";
import { Header } from "~/components/header/header";
import { MainCategories } from "~/components/categories-comps/MainCategories/MainCategories";
import { MainNiches } from "~/components/categories-comps/MainNiches/MainNiches";
import { AiLabs } from "~/components/categories-comps/AiLabs/AiLabs";
import { Footer } from '~/components/Footer/Footer';

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
        <Header />
        <MainCategories />
        <MainNiches />
        <AiLabs />
        <Footer />
    </>);
});