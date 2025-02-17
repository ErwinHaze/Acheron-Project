import { component$, useSignal, useTask$ } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import PerformanceChart from '~/components/organisms/PerformanceChart/PerformanceChart';
import CommunityFeedback from '~/components/organisms/CommunityFeedback/CommunityFeedback';
import { DemoViewer } from '~/components/features/model-playground/DemoViewer/DemoViewer';
import { fetchModelDetails } from '~/api/models';
import { LoadingSpinner } from '~/components/atoms/Loaders/LoadingSpinner';

interface Model {
  name: string;
  description: string;
  documentationUrl: string;
  repositoryUrl: string;
  feedback: any; // Adjust the type as needed
  performanceMetrics: {
    accuracy: number;
    precision: number;
    recall: number;
    f1Score: number;
  };
}

export default component$(() => {
  const location = useLocation();
  const model = useSignal<Model | null>(null);

  // Fetch model details from Supabase
  useTask$(async () => {
    const data = await fetchModelDetails(location.params.modelId);
    model.value = data;
  });

  if (!model.value) return <LoadingSpinner />;

  return (
    <div class="model-details-page p-4">
      {/* Overview */}
      <h1 class="text-2xl font-bold mb-2">{model.value.name}</h1>
      <p class="text-gray-700 mb-4">{model.value.description}</p>

      {/* Performance Metrics */}
      <PerformanceChart model={model.value} />

      {/* Documentation */}
      <div class="documentation-section my-4">
        <a href={model.value.documentationUrl} class="text-blue-500 hover:underline mr-4">View Documentation</a>
        <a href={model.value.repositoryUrl} class="text-blue-500 hover:underline">View Code Repository</a>
      </div>

      {/* Community Feedback */}
      <CommunityFeedback feedback={model.value.feedback} />

      {/* Live Demo */}
      <DemoViewer modelId={location.params.modelId} />
    </div>
  );
});