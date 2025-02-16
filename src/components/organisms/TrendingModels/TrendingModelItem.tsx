// FILE: src/components/organisms/TrendingModels/TrendingModelItem.tsx
import { component$ } from '@builder.io/qwik';
import { TrendArrowIcon } from '~/components/atoms/Icons/TrendArrowIcon';

export const TrendingModelItem = component$((props: {
  id: string;
  name: string;
  direction: 'up'|'down';
}) => {
  return (
    <div class="flex items-center gap-2 py-1 border-b last:border-0">
      <span>{props.name}</span>
      <TrendArrowIcon direction={props.direction} />
    </div>
  );
});
