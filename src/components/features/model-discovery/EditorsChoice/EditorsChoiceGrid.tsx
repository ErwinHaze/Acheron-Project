// FILE: src/components/features/model-discovery/EditorsChoice/EditorsChoiceGrid.tsx
import { component$ } from '@builder.io/qwik';
import { EditorsChoiceCard } from './EditorsChoiceCard';

const EDITORSCHOICE = [
  { id: '1', name: 'ChatGPT-4o', description: 'Most accurate and fastest model out there' },
  { id: '2', name: 'DeepSeek R1', description: 'Great model for reasoning, fast to run on small devices' },
  { id: '3', name: 'Claude Sonnet', description: 'Multitasking model, built for coding and literature' },
  { id: '4', name: 'QWen Max', description: 'Big model with deep solving options, running 2.5B pps' },
  { id: '5', name: 'Grok 3', description: '"Smartest AI on earth" – Elon Musk' },
];

export const EditorsChoiceGrid = component$(() => {
  return (
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 bg-gray-50 rounded-lg shadow-md">
      {/* Section Title */}
      <h2 class="col-span-full text-xl font-bold text-gray-900 mb-4 px-2">
        Editor’s Choice AI Models
      </h2>

      {/* Display Message if No Models Exist */}
      {EDITORSCHOICE.length === 0 ? (
        <p class="col-span-full text-center text-gray-500">No featured models available.</p>
      ) : (
        EDITORSCHOICE.map((ec) => <EditorsChoiceCard key={ec.id} model={ec} />)
      )}
    </div>
  );
});
