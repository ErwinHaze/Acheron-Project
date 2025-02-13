import { component$, useStore, $ } from "@builder.io/qwik";

export default component$(() => {
    type ModelCategories = "Chat" | "Photo" | "Video" | "Audio" | "Agents" | "Programming";
    
    const state = useStore({
        selectedCategory: "Chat" as ModelCategories,
        selectedModel: "",
        categories: ["Chat", "Photo", "Video", "Audio", "Agents", "Programming"] as ModelCategories[],
        models: {
            Chat: ["Model A", "Model B"],
            Photo: ["Model C", "Model D"],
            Video: ["Model E", "Model F"],
            Audio: ["Model G", "Model H"],
            Agents: ["Model I", "Model J"],
            Programming: ["Model K", "Model L"]
        } as Record<ModelCategories, string[]>
    });

    const handleCategoryChange = $((event: Event) => {
        const target = event.target as HTMLSelectElement;
        state.selectedCategory = target.value as ModelCategories;
        state.selectedModel = "";
    });

    const handleModelChange = $((event: Event) => {
        const target = event.target as HTMLSelectElement;
        state.selectedModel = target.value;
    });

    return (
        <div class="bg-white p-6 rounded-lg shadow-md mt-6">
            <h2 class="text-2xl font-bold mb-4">Playaround</h2>
            <div class="mb-4">
                <label class="block text-gray-700">Select Category:</label>
                <select class="mt-1 block w-full" value={state.selectedCategory} onChange$={handleCategoryChange}>
                    {state.categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>
            </div>
            <div class="mb-4">
                <label class="block text-gray-700">Select Model:</label>
                <select class="mt-1 block w-full" value={state.selectedModel} onChange$={handleModelChange}>
                    <option value="">Select a model</option>
                    {state.models[state.selectedCategory].map(model => (
                        <option key={model} value={model}>{model}</option>
                    ))}
                </select>
            </div>
            {state.selectedModel && (
                <div class="mt-6">
                    <h3 class="text-xl font-semibold">Interacting with {state.selectedModel}</h3>
                    <div class="mt-4">
                        {/* Add interaction options and sections here */}
                        <p class="text-gray-600">This is where you can interact with the selected model.</p>
                        {/* Example interaction section */}
                        <div class="mt-4">
                            <label class="block text-gray-700">Input:</label>
                            <input type="text" class="mt-1 block w-full" placeholder="Enter your input here" />
                            <button class="mt-2 px-4 py-2 bg-blue-500 text-white rounded">Submit</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
});