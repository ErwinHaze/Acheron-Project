import { component$ } from '@builder.io/qwik';
import { UITemplate } from '~/components/UITemplates';
import { UIOrganism } from '~/components/UIOrganism';

export default component$(() => {
  return (
    <UITemplate type="auth" title="Verify Email">
      <div class="space-y-6 p-4 sm:max-w-md sm:mx-auto">
        <h2 class="text-2xl font-bold text-center tracking-tight">Verify Your Email</h2>
        <p class="text-center text-gray-600">
          We’ve sent a verification link to your email. Please check your inbox.
        </p>
        <UIOrganism type="feedback">
          <div class="bg-blue-50 border-l-4 border-blue-500 text-blue-700 p-4">
            Check your spam folder if you don’t see the email.
          </div>
        </UIOrganism>
      </div>
    </UITemplate>
  );
});
