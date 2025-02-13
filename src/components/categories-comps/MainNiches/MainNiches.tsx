import { component$ } from "@builder.io/qwik";

export const MainNiches = component$(() => {
    const niches = ["Graphic Design", "Game Development", "Marketing", "Industries", "Finance", "Entertainment"];
    return (
        <div class="bg-white p-6 rounded-lg shadow-md mt-6">
            <h2 class="text-2xl font-bold mb-4">Main Niches</h2>
            <ul class="space-y-2">
                {niches.map(niche => (
                    <li key={niche} class="text-lg text-gray-700 hover:text-blue-500 transition-colors">
                        {niche}
                    </li>
                ))}
            </ul>
        </div>
    );
});