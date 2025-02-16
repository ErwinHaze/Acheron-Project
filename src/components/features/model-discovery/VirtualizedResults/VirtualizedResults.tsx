// components/features/model-discovery/VirtualizedResults.tsx
export const VirtualizedResults = component$(({ results }) => {
    const parentRef = useSignal<Element>();
    const virtualizer = useVirtualizer({
      count: results.length,
      getScrollElement: () => parentRef.value,
      estimateSize: () => 120,
      overscan: 5,
    });
  
    return (
      <div ref={parentRef} class="h-[600px] overflow-auto">
        <div style={{ height: `${virtualizer.getTotalSize()}px` }}>
          {virtualizer.getVirtualItems().map((virtualItem) => (
            <div
              key={virtualItem.key}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: `${virtualItem.size}px`,
                transform: `translateY(${virtualItem.start}px)`,
              }}
            >
              <ModelCardCompact model={results[virtualItem.index]} />
            </div>
          ))}
        </div>
      </div>
    );
  });