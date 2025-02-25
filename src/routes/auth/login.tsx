import { component$, useSignal, $ } from '@builder.io/qwik';
import { UITemplate } from '~/components/UITemplates';
import { supabase } from '~/lib/supabase';

// Define the types for the props
interface AuthFormProps {
  onSubmit: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

const AuthForm = component$(({ onSubmit, isLoading, error }: AuthFormProps) => {
  return (
    <div class="space-y-4">
      <input
        type="email"
        placeholder="Email"
        class="w-full p-2 border rounded"
      />
      <input
        type="password"
        placeholder="Password"
        class="w-full p-2 border rounded"
      />
      <button
        onClick$={onSubmit}
        disabled={isLoading}
        class="w-full bg-blue-500 text-white p-2 rounded"
      >
        {isLoading ? 'Signing In...' : 'Sign In'}
      </button>
      {error && <p class="text-red-500 text-center text-sm">{error}</p>}
    </div>
  );
});

// Define the types for the props
interface SocialLoginProps {
  onProviderClick: (provider: 'google' | 'facebook') => Promise<void>;
}

const SocialLogin = component$(({ onProviderClick }: SocialLoginProps) => {
  return (
    <div class="mt-4 space-y-2">
      <button
        onClick$={() => onProviderClick('google')}
        class="w-full bg-red-500 text-white p-2 rounded"
      >
        Sign In with Google
      </button>
      <button
        onClick$={() => onProviderClick('facebook')}
        class="w-full bg-blue-600 text-white p-2 rounded"
      >
        Sign In with Facebook
      </button>
    </div>
  );
});

export default component$(() => {
  const email = useSignal('');
  const password = useSignal('');
  const isLoading = useSignal(false);
  const error = useSignal<string | null>(null);

  // Typing the function properly
  const handleLogin = $(async () => {
    isLoading.value = true;
    error.value = null;

    if (!email.value || !password.value) {
      error.value = 'Please fill in all fields';
      isLoading.value = false;
      return;
    }

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.value,
        password: password.value,
      });
      if (error) throw error;
      console.log('Logged in with:', email.value);
      // Redirect to dashboard
    } catch (err) {
      error.value = 'Invalid email or password';
      console.error(err);
    } finally {
      isLoading.value = false;
    }
  });

  // Typing the function properly
  const handleSocialLogin = $(async (provider: 'google' | 'facebook') => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({ provider });
      if (error) throw error;
      console.log(`Logging in with ${provider}`);
    } catch (err) {
      error.value = `Failed to login with ${provider}`;
      console.error(err);
    }
  });

  return (
    <UITemplate type="auth" title="Sign In">
      <div class="space-y-6 p-4 sm:max-w-md sm:mx-auto">
        <h2 class="text-2xl font-bold text-center tracking-tight">Welcome Back</h2>
        <p class="text-center text-gray-600">Sign in to your account.</p>
        
        {/* Use custom AuthForm component */}
        <AuthForm
          onSubmit={handleLogin}
          isLoading={isLoading.value}
          error={error.value}
        />

        {/* Use custom SocialLogin component */}
        <SocialLogin onProviderClick={handleSocialLogin} />

        <a
          href="/auth/forgot-password"
          class="block text-center text-sm text-blue-500 hover:underline transition-colors duration-200"
        >
          Forgot password?
        </a>
      </div>
    </UITemplate>
  );
});
