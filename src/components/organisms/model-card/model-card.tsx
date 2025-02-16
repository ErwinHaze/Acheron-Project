// src/components/organisms/model-card.tsx
import { component$ } from '@builder.io/qwik';
import { CapabilityBadge } from '~/components/molecules/capability-badge';

export default component$(({ model, isSelected }: { model: AIModel; isSelected: boolean }) => {
  return (
    <div class={`model-card ${isSelected ? 'selected' : ''}`}>
      <div class="header">
        <h3>{model.version}</h3>
        {model.isOfficial && <OfficialBadge />}
      </div>
      
      <div class="capabilities">
        {model.capabilities.map(capability => (
          <CapabilityBadge key={capability} type={capability} />
        ))}
      </div>

      <div class="meta">
        <span class="context-window" title={`Last trained: ${model.lastTrained}`}>
          {model.contextWindow.toLocaleString()} tokens
        </span>
        <div class="hover-details">
          <p>Training date: {model.lastTrained}</p>
          <p>Architecture: {model.architecture}</p>
        </div>
      </div>
    </div>
  );
});