// src/components/molecules/StatCard/StatCard.tsx
import { component$ } from '@builder.io/qwik';

interface StatCardProps {
  label: string;
  value: number;
}

export const StatCard = component$<StatCardProps>(({ label, value }) => {
  return (
    <div class="stat-card bg-white p-6 rounded-lg shadow-md text-center">
      <h3 class="text-xl font-semibold text-gray-800">{label}</h3>
      <p class="text-3xl font-bold text-primary-500 mt-2">{value.toLocaleString()}</p>
    </div>
  );
});