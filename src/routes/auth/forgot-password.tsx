import { component$, useSignal, $ } from '@builder.io/qwik';
import { UITemplate } from '~/components/UITemplates';
import { UIOrganism } from '~/components/UIOrganism';
import { supabase } from '~/lib/supabase'; // Assuming a Supabase client

export default component$(() => {
  const email = useSignal('');
  const isLoading = useSignal(false);
  const error = useSignal<string | null>(null);

  const handleForgotPassword = $(async () => {
    isLoading.value = true;
    error.value = null;

    // Basic email validation
    if (!email.value.includes('@')) {
      error.value = 'Please enter a valid email';
      isLoading.value = false;
      return;
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email.value);
      if (error) throw error;
      console.log('Password reset email sent to:', email.value);
    } catch (err) {
      error.value = 'Failed to send reset email. Try again.';
      console.error(err);
    } finally {
      isLoading.value = false;
    }
  });

  return (
    <UITemplate type="auth" title="Reset Password">
      <div class="space-y-6 p-4 sm:max-w-md sm:mx-auto">
        <h2 class="text-2xl font-bold text-center tracking-tight">Reset Your Password</h2>
        <p class="text-center text-gray-600">Enter your email to receive a reset link.</p>
        
        {/* Wrap UIOrganism content in a div to apply class */}
        <UIOrganism
          type="login"  // Changed this to an allowed type 'login'
          onSubmit$={handleForgotPassword}
          isLoading={isLoading.value}
        >
          <div class="space-y-4"> {/* Added a div wrapper */}
            <input
              type="email"
              value={email.value}
              onInput$={(e) => {
                const target = e.target as HTMLInputElement; // Type cast to prevent 'null' error
                email.value = target.value;
              }}
              placeholder="Email"
              class="w-full p-2 border rounded"
            />
            <button
              onClick$={handleForgotPassword}
              disabled={isLoading.value}
              class="w-full bg-blue-500 text-white p-2 rounded"
            >
              {isLoading.value ? 'Sending Reset Link...' : 'Send Reset Link'}
            </button>
            {error.value && <p class="text-red-500 text-center text-sm">{error.value}</p>}
          </div>
        </UIOrganism>
      </div>
    </UITemplate>
  );
});
