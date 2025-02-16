// components/atoms/SwipeableItem.tsx
export const SwipeableItem = component$(({ onDismiss$, children }) => {
    const touchStart = useSignal(0);
  
    return (
      <div 
        onTouchStart$={(e) => touchStart.value = e.touches[0].clientX}
        onTouchEnd$={(e) => {
          if (touchStart.value - e.changedTouches[0].clientX > 100) {
            onDismiss$();
          }
        }}
      >
        {children}
      </div>
    );
  });