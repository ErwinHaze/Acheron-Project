// src/components/atoms/FacetGroup/FacetGroup.tsx
import { component$, JSX } from '@builder.io/qwik';

interface FacetGroupProps {
  title: string;
  children: JSX.Element;
}

export const FacetGroup = component$<FacetGroupProps>(({ title, children }) => {
  return (
    <div class="bg-white p-4 rounded-lg shadow-md">
      <h3 class="text-lg font-semibold mb-4">{title}</h3>
      {children}
    </div>
  );
});