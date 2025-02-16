// FILE: src/components/templates/ListingLayout/ListingLayout.tsx
import { component$ } from '@builder.io/qwik';
import { ListingItem } from './ListingItem';

export const ListingLayout = component$((props: {
  items: any[];
  renderItem: (item: any) => any;
}) => {
  return (
    <div class="grid gap-4">
      {props.items.map((item) => (
        <ListingItem key={item.id} item={item}>
          {props.renderItem(item)}
        </ListingItem>
      ))}
    </div>
  );
});
