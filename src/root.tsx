// src/root.tsx
import { component$, Fragment } from '@builder.io/qwik';
import {
  QwikCityProvider,
  RouterOutlet,
  ServiceWorkerRegister,
} from '@builder.io/qwik-city';
import { UIOrganism } from '~/components/UIOrganism';
import { isDev } from '@builder.io/qwik';
import './global.css';

export default component$(() => {
  return (
    <QwikCityProvider>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {!isDev && (
          <link
            rel="manifest"
            href={`${import.meta.env.BASE_URL}manifest.json`}
          />
        )}
        <UIOrganism type="router-head" />
      </head>
      <body lang="en" class="bg-gray-50 text-gray-900">
        <RouterOutlet />
        {!isDev && <ServiceWorkerRegister />}
      </body>
    </QwikCityProvider>
  );
});