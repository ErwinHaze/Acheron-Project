import { component$ } from '@builder.io/qwik';

/**
 * Props for a single statistic card.
 */
export interface StatsCardProps {
  title: string;         // Title of the statistic (e.g., "Total Models")
  value: string | number; // The numeric or string value to display
  icon?: string;          // Optional icon URL
}

export const StatsCard = component$((props: StatsCardProps) => {
  return (
    <div class="bg-white p-4 rounded shadow flex items-center hover:shadow-md transition-shadow">
      {props.icon && (
        <img src={props.icon} alt={props.title} class="w-8 h-8 mr-3" />
      )}
      <div>
        <p class="text-sm text-gray-500">{props.title}</p>
        <h3 class="text-xl font-bold">{props.value}</h3>
      </div>
    </div>
  );
});
