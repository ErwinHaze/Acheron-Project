import { component$ } from '@builder.io/qwik';

interface CreatorCardProps {
  id: string;
  name: string;
  bio: string;
}

export const CreatorCard = component$(({ id, name, bio }: CreatorCardProps) => {
  return (
    <a
      href={`/creators/${id}`}
      class="block p-4 bg-white shadow rounded-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
    >
      <h2 class="text-lg font-bold text-gray-800 hover:text-blue-600 transition-colors">{name}</h2>
      <p class="text-sm text-gray-600 mt-2">{bio}</p>
    </a>
  );
});
