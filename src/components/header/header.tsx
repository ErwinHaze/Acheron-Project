import { component$, useSignal } from '@builder.io/qwik';
import { Link, useNavigate } from '@builder.io/qwik-city';
import { HiMagnifyingGlassOutline } from '@qwikest/icons/heroicons';

const SearchBar = component$(() => {
    const searchTerms = useSignal('');

    const nav = useNavigate();

    return (
        <div class="flex w-1/3 items-center px-1 bg-slate-500 bg-opacity-50 rounded-md">
            <Link href={'/search/' + encodeURIComponent(searchTerms.value)}>
                <HiMagnifyingGlassOutline class="mr-1" />
            </Link>
            <input class="bg-transparent w-full focus:outline-none" placeholder='search ...' bind:value={searchTerms} onKeyUp$={(event) => {
                if (event.key == 'Enter') nav('/search/' + encodeURIComponent(searchTerms.value));
            }} />
        </div>
    );
});

export const Header = component$(() => {
    return (
        <header class="bg-gray-900 text-white">
            <div class="container mx-auto flex justify-between items-center p-4">
                <Link href="/"><h1 class="text-xl font-bold">AI Model Store</h1></Link>
                <SearchBar />
                <nav>
                    <ul class="flex space-x-4">
                        <li><a href="/categories" class="hover:underline">Categories</a></li>
                        <li><a href="/creators" class="hover:underline">Creators</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
});
