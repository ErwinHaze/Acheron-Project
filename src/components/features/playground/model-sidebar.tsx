// src/components/features/playground/model-sidebar.tsx
import { component$, useSignal, useStyles$ } from '@builder.io/qwik';
import { ModelCard } from '~/components/organisms/model-card';
import styles from './model-sidebar.css?inline';

interface SectionState {
  myModels: boolean;
  explore: boolean;
}

export default component$(() => {
  useStyles$(styles);
  
  const expanded = useSignal<SectionState>({
    myModels: true,
    explore: true
  });
  
  const selectedModel = useSignal<AIModel>();
  const models = useSignal<AIModel[]>([/* Your model data */]);

  return (
    <div class="model-sidebar">
      <div class="header">
        <button class="new-chat">
          + New Chat
          <div class="preset-dropdown">
            <button onClick$={() => handleNewChat('chat')}>Chat Model</button>
            <button onClick$={() => handleNewChat('code')}>Code Model</button>
            <button onClick$={() => handleNewChat('analysis')}>Analysis Model</button>
          </div>
        </button>
      </div>

      <div class="sections">
        <div class="section">
          <div class="section-header" onClick$={() => expanded.value.myModels = !expanded.value.myModels}>
            <span>My Models</span>
            <ChevronIcon direction={expanded.value.myModels ? 'down' : 'right'} />
          </div>
          {expanded.value.myModels && (
            <div class="model-list">
              {models.value
                .filter(m => m.isSaved)
                .map(model => (
                  <ModelCard 
                    key={model.id}
                    model={model}
                    isSelected={selectedModel.value?.id === model.id}
                    onSelect$={() => selectedModel.value = model}
                  />
                ))}
            </div>
          )}
        </div>

        <div class="section">
          <div class="section-header" onClick$={() => expanded.value.explore = !expanded.value.explore}>
            <span>Explore Models</span>
            <ChevronIcon direction={expanded.value.explore ? 'down' : 'right'} />
          </div>
          {expanded.value.explore && (
            <div class="model-list">
              {models.value.map(model => (
                <ModelCard
                  key={model.id}
                  model={model}
                  isSelected={selectedModel.value?.id === model.id}
                  onSelect$={() => selectedModel.value = model}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
});