import { component$ } from '@builder.io/qwik';

interface LeaderboardTableProps {
  models: Array<{ name: string; score: number }>;
}

export default component$(({ models }: LeaderboardTableProps) => {
  return (
    <div class="overflow-x-auto">
      <table class="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th class="px-4 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600">Name</th>
            <th class="px-4 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600">Score</th>
          </tr>
        </thead>
        <tbody>
          {models.map((model, index) => (
            <tr key={index} class="hover:bg-gray-50">
              <td class="px-4 py-2 border-b border-gray-200 text-sm text-gray-700">{model.name}</td>
              <td class="px-4 py-2 border-b border-gray-200 text-sm text-gray-700">{model.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});
