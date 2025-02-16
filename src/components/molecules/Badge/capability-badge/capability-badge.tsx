// src/components/molecules/capability-badge.tsx
import { component$ } from '@builder.io/qwik';
export const CapabilityBadge = component$(({ type }: { type: string }) => {
    const icons: { [key: string]: string } = {
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