import { component$ } from '@builder.io/qwik';
import { StatsCard, StatsCardProps } from './stats-card';

/**
 * Props for displaying multiple statistics in a grid layout.
 */
interface StatsGridProps {
  stats: StatsCardProps[]; // Array of stats to display
}

export const StatsGrid = component$((props: StatsGridProps) => {
  return (
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {props.stats.map((stat, idx) => (
        <StatsCard key={idx} {...stat} />
      ))}
    </div>
  );
});
