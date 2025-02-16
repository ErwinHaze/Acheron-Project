import { component$, Slot } from '@builder.io/qwik';

interface Model {
  id: string;
  name: string;
  thumbnail: string;
  price: number;
  accuracy: number;
}

interface BottomSheetProps {
  class?: string;
}

const BottomSheet = component$<BottomSheetProps>((props) => {
  return (
    <div class={["fixed inset-x-0 bottom-0 z-50 bg-dark-800 rounded-t-2xl shadow-lg", props.class]}>
      <div class="w-12 h-1.5 bg-dark-600 rounded-full mx-auto my-3" />
      <Slot />
    </div>
  );
});

interface MobileComparisonSheetProps {
  models: Model[];
}

export const MobileComparisonSheet = component$<MobileComparisonSheetProps>(({ models }) => {
  return (
    <BottomSheet>
      <div class="space-y-4 p-4">
        {models.map((model) => (
          <div key={model.id} class="flex items-center gap-4">
            <img 
              src={model.thumbnail} 
              class="w-16 h-16 rounded-lg" 
              alt={model.name}
            />
            <div class="flex-1">
              <h4 class="font-semibold">{model.name}</h4>
              <div class="flex gap-2 text-sm">
                <span>${model.price}</span>
                <span>{model.accuracy}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </BottomSheet>
  );
});