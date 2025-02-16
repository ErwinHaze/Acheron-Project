import { component$, useSignal, useTask$ } from '@builder.io/qwik';
import { useParams } from '@builder.io/qwik-city';
import PerformanceChart from '~/components/organisms/PerformanceChart/PerformanceChart';
import CommunityFeedback from '~/components/organisms/CommunityFeedback/CommunityFeedback';
import LiveDemo from '~/components/features/model-playground/DemoViewer/DemoViewer';
import { fetchModelDetails } from '~/api/models';

export default component$(() => {
  const params = useParams();
  const model = useSignal(null);

  // Fetch model details from Supabase
  useTask$(async () => {
    const data = await fetchModelDetails(params.modelId);
    model.value = data;
  });

  if (!model.value) return <LoadingSpinner />;

  return (
    <div class="model-details-page">
      {/* Overview */}
      <h1>{model.value.name}</h1>
      <p>{model.value.description}</p>

      {/* Performance Metrics */}
      <PerformanceChart model={model.value} />

      {/* Documentation */}
      <div class="documentation-section">
        <a href={model.value.documentationUrl}>View Documentation</a>
        <a href={model.value.repositoryUrl}>View Code Repository</a>
      </div>

      {/* Community Feedback */}
      <CommunityFeedback feedback={model.value.feedback} />

      {/* Live Demo */}
      <LiveDemo model={model.value} />
    </div>
  );
});