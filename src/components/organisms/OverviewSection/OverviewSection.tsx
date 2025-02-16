// components/organisms/OverviewSection/OverviewSection.tsx
import { component$ } from '@builder.io/qwik';
import { StatCard } from '~/components/molecules/StatCard/StatCard';

interface OverviewSectionProps {
  savedModelsCount: any;
  activeLabsFollowed: any;
  recentInteractions: any;
}

export default component$<OverviewSectionProps>(({ savedModelsCount, activeLabsFollowed, recentInteractions }) => {
  return (
    <div class="overview-section">
      <h2>Overview</h2>
      <div class="stats-grid">
        <StatCard label="Saved Models" value={savedModelsCount} />
        <StatCard label="Active Labs Followed" value={activeLabsFollowed} />
        <StatCard label="Recent Interactions" value={recentInteractions} />
      </div>
    </div>
  );
});