import { component$, useSignal, useTask$, useVisibleTask$ } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import PerformanceChart from '~/components/organisms/PerformanceChart/PerformanceChart';
import CommunityFeedback from '~/components/organisms/CommunityFeedback/CommunityFeedback';
import { DemoViewer } from '~/components/features/model-playground/DemoViewer/DemoViewer';
import { fetchModelDetails } from '~/routes/api/models';
import { LoadingSpinner } from '~/components/atoms/Loaders/LoadingSpinner';
import { Model, FeedbackData } from '~/types';

export default component$(() => {
  const location = useLocation();
  const model = useSignal<Model | null>(null);
  const isLoading = useSignal(true);
  const error = useSignal<string | null>(null);
  const abortController = useSignal<AbortController | null>(null);

  // Initialize abort controller
  useVisibleTask$(() => {
    abortController.value = new AbortController();
    return () => {
      abortController.value?.abort();
    };
  });

  useTask$(async ({ track }) => {
    track(() => location.params.modelId);
    
    if (!location.params.modelId) {
      error.value = 'Model ID is required';
      return;
    }

    try {}
      isLoading.value = true;
      error.value = null;
      
      const data = await fetchModelDetails(location.params.modelId);
      if (!data || !isValidModelData(data)) {
        throw new Error('Invalid model data received');
      }
      model.value = data;
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        return;
      }
      error.value = err instanceof Error ? err.message : 'Failed to load model details';
    } finally {
      isLoading.value = false;
    }
  });

  return (
    <div class="model-details-page p-4">
      {isLoading.value ? (
        <div class="flex justify-center items-center min-h-[400px]">
          <LoadingSpinner />
        </div>
      ) : error.value ? (
        <div class="text-red-500 p-4 text-center">{error.value}</div>
      ) : !model.value ? (
        <div class="text-red-500 p-4 text-center">Model not found</div>
      ) : (
        <>
          <h1 class="text-2xl font-bold mb-2">{model.value.name}</h1>
          <p class="text-gray-700 mb-4">{model.value.description}</p>

          {model.value.performanceMetrics && (
            <PerformanceChart model={model.value} />
          )}

          <div class="documentation-section my-4">
            {model.value.documentationUrl && (
              <a 
                href={model.value.documentationUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                class="text-blue-500 hover:underline mr-4"
              >
                View Documentation
              </a>
            )}
            {model.value.repositoryUrl && (
              <a 
                href={model.value.repositoryUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                class="text-blue-500 hover:underline"
              >
                View Code Repository
              </a>
            )}
          </div>

          {model.value.feedback && (
            <CommunityFeedback feedback={model.value.feedback} />
          )}

          <DemoViewer modelId={location.params.modelId} />
        </>
      )}
    </div>
  );
});

function isValidModelData(data: any): data is Model {
  return (
    typeof data === 'object' &&
    data !== null &&
    typeof data.name === 'string' &&
    typeof data.description === 'string' &&
    (!data.documentationUrl || typeof data.documentationUrl === 'string') &&
    (!data.repositoryUrl || typeof data.repositoryUrl === 'string') &&
    (!data.performanceMetrics || Array.isArray(data.performanceMetrics)) &&
    (!data.feedback || Array.isArray(data.feedback))
  );
}