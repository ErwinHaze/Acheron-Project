import { component$, useSignal, $ } from '@builder.io/qwik';
import AuthLayout from '~/components/templates/AuthLayout/AuthLayout';
import LoginForm from '~/components/organisms/LoginForm/LoginForm';

// Inline SocialLoginButtons component
const SocialLoginButtons = component$(() => {
  const handleSocialLogin = $(async (provider: string) => {
    console.log('Logging in with social provider:', provider);
    // ...social login logic...
  });

  return (
    <div class="flex flex-col space-y-2">
      <button
        onClick$={() => handleSocialLogin('google')}
        class="w-full py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Continue with Google
      </button>
      <button
        onClick$={() => handleSocialLogin('facebook')}
        class="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Continue with Facebook
      </button>
    </div>
  );
});

export default component$(() => {
  const isLoading = useSignal(false);

  const handleLogin = $(async (email: string, password: string) => {
    isLoading.value = true;
    try {
      // Supabase login logic
      console.log('Logging in with:', email, password);
      // Redirect on success
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      isLoading.value = false;
    }
  });

  return (
    <AuthLayout title="Login">
      <div class="auth-page space-y-6 p-4 sm:max-w-md sm:mx-auto">
        <h2 class="text-2xl font-bold text-center">Welcome Back</h2>
        <p class="text-center text-gray-600">
          Sign in to access your AI models and saved labs.
        </p>

        {/* Login Form */}
        <LoginForm onSubmit$={handleLogin} isLoading={isLoading.value} />

        {/* Inline Social Login Buttons */}
        <SocialLoginButtons />

        {/* Forgot Password Link */}
        <a href="/auth/forgot-your-password" class="block text-center text-sm text-blue-500 hover:underline">
          Forgot your password?
        </a>
      </div>
    </AuthLayout>
  );
});