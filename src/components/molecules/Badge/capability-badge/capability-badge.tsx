// src/components/molecules/capability-badge.tsx
export const CapabilityBadge = component$(({ type }: { type: string }) => {
    const icons = {
      math: '🧮',
      coding: '💻', 
      science: '🔬',
      analysis: '📊'
    };
  
    return (
      <span class={`capability-badge ${type}`}>
        {icons[type] || '✨'} {type.charAt(0).toUpperCase() + type.slice(1)}
      </span>
    );
  });