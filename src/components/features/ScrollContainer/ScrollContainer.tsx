// components/atoms/ScrollContainer.tsx
export const ScrollContainer = component$(({ children }) => {
    return (
      <div class="overflow-x-auto scrollbar-hide">
        <div class="inline-flex space-x-4 min-w-max w-full pb-4">
          {children}
        </div>
      </div>
    );
  });