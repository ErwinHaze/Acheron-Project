// src/routes/layout.tsx
import { component$, Slot } from '@builder.io/qwik';
import { UITemplate } from '~/components/UITemplates';
import { UIOrganism } from '~/components/UIOrganism';

export default component$(() => {
  return (
    <UITemplate type="page">
      {/* Header - Inspired by Epic Games: Bold, dynamic */}
      <UIOrganism type="header" />

      {/* Main Content Area - Inspired by Apple Store: Clean, centered */}
      <main class="flex-1 container mx-auto px-4 py-6">
        <Slot />
      </main>

      {/* Footer - Inspired by CoinMarketCap: Minimal, functional */}
      <UIOrganism type="footer" />
    </UITemplate>
  );
});