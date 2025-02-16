// FILE: src/components/features/creator-portal/ProfileHeader/CreatorProfileHeader.tsx
import { component$ } from '@builder.io/qwik';

export const CreatorProfileHeader = component$((props: {
  creatorName: string;
  bio: string;
}) => {
  return (
    <div class="bg-gray-800 text-white p-4">
      <h2 class="text-2xl font-bold">{props.creatorName}</h2>
      <p class="text-sm text-gray-200">{props.bio}</p>
    </div>
  );
});
