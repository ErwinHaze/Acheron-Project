import { component$ } from "@builder.io/qwik";

export const AiLabs = component$(() => {
    const labs = [
        { category: "Text generation", companies: ["OpenAI", "Anthropic"] },
        { category: "Photo generation", companies: ["OpenAI", "Midjourney"] },
        { category: "Audio generation", companies: ["11Labs", "Meta"] }
    ];
    return (
        <div class="bg-white p-6 rounded-lg shadow-md mt-6">
            <h2 class="text-2xl font-bold mb-4">AI Labs and Companies</h2>
            {labs.map(lab => (
                <div key={lab.category} class="mb-4">
                    <h3 class="text-xl font-semibold text-gray-800 mb-2">{lab.category}</h3>
                    <ul class="space-y-1">
                        {lab.companies.map(company => (
                            <li key={company} class="text-lg text-gray-700 hover:text-blue-500 transition-colors">
                                {company}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
});