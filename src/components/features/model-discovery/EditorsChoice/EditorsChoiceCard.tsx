// FILE: src/components/features/model-discovery/EditorsChoice/EditorsChoiceCard.tsx
import { component$ } from '@builder.io/qwik';



export const EditorsChoiceCard = component$((props: { model: any }) => {
  return (
    <div class="border border-gray-200 p-6 rounded-lg shadow hover:shadow-xl transition-all duration-300 bg-white">
      {/* Conditional Thumbnail Image */}
      {props.model.image && (
        <img
          src={props.model.image}
          alt={props.model.name}
          class="w-full h-40 object-cover rounded-md mb-4"
        />
      )}
      {/* Model Title */}
      <h3 class="text-lg font-bold text-gray-900 mb-2">{props.model.name}</h3>
      {/* Model Description */}
      <p class="text-sm text-gray-600 mb-4">{props.model.description}</p>
      {/* Additional Info & Action */}
      <div class="flex items-center justify-between">
        <span class="text-xs text-blue-500 font-semibold">Editor's Choice</span>
        <button class="text-sm font-medium text-blue-500 hover:underline">
          View Details
        </button>
      </div>
    </div>
  );
});
