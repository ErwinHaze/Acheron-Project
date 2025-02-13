import { component$ } from "@builder.io/qwik";

export const MainCategories = component$(() => {
    const categories = ["Chat", "Photo", "Video", "Audio", "Agents", "Programming"];
    return (
        <div class="bg-white p-6 rounded-lg shadow-md">
            <h2 class="text-2xl font-bold mb-4">Main Categories</h2>
            <ul class="space-y-2">
                {categories.map(category => (
                    <li key={category} class="text-lg text-gray-700 hover:text-blue-500 transition-colors">
                        {category}
                    </li>
                ))}
            </ul>
        </div>
    );
});