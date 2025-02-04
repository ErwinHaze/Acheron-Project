import { component$ } from '@builder.io/qwik';

interface ModelCardProps {
    id: string;
    name: string;
    description: string;
    price?: number;
}

export const ModelCard = component$(({ id, name, description, price }: ModelCardProps) => {
    return (
        <a
            href={`/models/${id}`}
            class="block p-4 bg-white shadow rounded-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
        >
            <h2 class="text-lg font-bold text-gray-800 hover:text-blue-600 transition-colors">{name}</h2>
            <p class="text-sm text-gray-600 mt-2">{description}</p>
            {price && (
                <p class="mt-4 text-blue-600 font-semibold">
                    Starting at ${price}/month
                </p>
            )}
        </a>
    );
});
