import { component$, useContext, useStore, QRL } from '@builder.io/qwik';
import { ModelCard } from '~/components/organisms/ModelCard/ModelCard';
import { AIModel } from '~/types/models';

interface ModelListProps {
  models: AIModel[];
  selectedModel: AIModel | undefined;
  onSelectModel: QRL<(model: AIModel) => void>;
}

const ModelList = component$<ModelListProps>((props) => {
  return (
    <div class="model-list">
      {props.models.map(model => (
        <ModelCard
          key={model.id}
          model={model}
          isSelected={props.selectedModel?.id === model.id}
          onSelect$={() => props.onSelectModel(model)}
        />
      ))}
    </div>
  );
});

export default ModelList;
