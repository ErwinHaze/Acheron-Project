import { component$, useSignal, useStyles$, $ } from '@builder.io/qwik';
import { ModelCard } from '~/components/organisms/ModelCard/ModelCard';
import { AIModel } from '~/types/models';
import styles from './model-sidebar.css?inline';

// Inline ChevronIcon component
const ChevronIcon = component$<{ direction: 'down' | 'right' }>(({ direction }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-4 w-4"
      viewBox="0 0 20 20"
      fill="currentColor"
      style={{ transform: direction === 'down' ? 'rotate(90deg)' : 'none' }}
    >
      <path 
        fill-rule="evenodd" 
        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" 
        clip-rule="evenodd" 
      />
    </svg>
  );
});

// Added handleNewChat function
const handleNewChat = $((type: string) => {
  // Placeholder implementation
  console.log(`Starting new ${type} chat`);
});

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
                    onSelect$={() => (selectedModel.value = model)}
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
                  onSelect$={() => (selectedModel.value = model)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
});