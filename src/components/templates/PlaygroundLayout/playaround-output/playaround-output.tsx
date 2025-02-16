import { component$ } from '@builder.io/qwik';

interface PlayaroundOutputProps {
  response: string;
}

export const PlayaroundOutput = component$((props: PlayaroundOutputProps) => {
  return (
    <div class="bg-white p-4 rounded border h-64 overflow-auto">
      <h2 class="text-lg font-semibold mb-2">Model Response</h2>
      <div class="text-gray-700 whitespace-pre-wrap">{props.response}</div>
    </div>
  );
});
