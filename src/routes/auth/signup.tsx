import { component$, useSignal, $ } from '@builder.io/qwik';
import { UITemplate } from '~/components/UITemplates';
import { UIOrganism } from '~/components/UIOrganism';
import { supabase } from '~/lib/supabase';

export default component$(() => {
  const name = useSignal('');
  const email = useSignal('');
  const password = useSignal('');
  const isLoading = useSignal(false);
  const error = useSignal<string | null>(null);

  const handleSignup = $(async () => {
    isLoading.value = true;
    error.value = null;

    if (!name.value || !email.value || password.value.length < 6) {
      error.value = 'Please fill in all fields (password must be 6+ characters)';
      isLoading.value = false;
      return;
    }

    try {
      const { error } = await supabase.auth.signUp({
        email: email.value,
        password: password.value,
        options: { data: { name: name.value } },
      });
      if (error) throw error;
      console.log('Signed up with:', name.value, email.value);
      // Redirect to verify-email
    } catch (err) {
      error.value = 'Signup failed. Email may already be in use.';
      console.error(err);
    } finally {
      isLoading.value = false;
    }
  });

  return (
    <UITemplate type="auth" title="Sign Up">
      <div class="space-y-6 p-4 sm:max-w-md sm:mx-auto">
        <h2 class="text-2xl font-bold text-center tracking-tight">Create Your Account</h2>
        <p class="text-center text-gray-600">Join the AI Model Store community.</p>
        
        {/* Wrapper around UIOrganism with class applied here */}
        <div class="space-y-4">
          <UIOrganism type="login">
            <input
              type="text"
              value={name.value}
              onInput$={(e) => (name.value = (e.target as HTMLInputElement).value)}
              placeholder="Name"
              class="w-full p-2 border rounded"
            />
            <input
              type="email"
              value={email.value}
              onInput$={(e) => (email.value = (e.target as HTMLInputElement).value)}
              placeholder="Email"
              class="w-full p-2 border rounded"
            />
            <input
              type="password"
              value={password.value}
              onInput$={(e) => (password.value = (e.target as HTMLInputElement).value)}
              placeholder="Password"
              class="w-full p-2 border rounded"
            />
            <button
              type="button"
              onClick$={handleSignup}
              class="w-full bg-blue-500 text-white p-2 rounded"
            >
              {isLoading.value ? "Signing Up..." : "Sign Up"}
            </button>
          </UIOrganism>
        </div>
        
        {error.value && (
          <p class="text-red-500 text-center text-sm">{error.value}</p>
        )}
      </div>
    </UITemplate>
  );
});
