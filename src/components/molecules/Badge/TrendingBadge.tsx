// FILE: src/components/molecules/Badge/TrendingBadge.tsx
import { component$ } from '@builder.io/qwik';
import { TrendArrowIcon } from '~/components/atoms/Icons/TrendArrowIcon';

export const TrendingBadge = component$((props: { direction: 'up'|'down' }) => {
  return (
    <span class="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
      <TrendArrowIcon direction={props.direction} />
      Trending
    </span>
  );
});
