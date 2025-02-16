import { component$, useSignal } from '@builder.io/qwik';
import AuthLayout from '~/components/templates/AuthLayout/AuthLayout';
import LoginForm from '~/components/organisms/LoginForm/LoginForm';
import SocialLoginButtons from '~/components/molecules/SocialLoginButtons/SocialLoginButtons';

export default component$(() => {
  const isLoading = useSignal(false);

  const handleLogin = $(async (email, password) => {
    isLoading.value = true;
    try {
      // Supabase login logic
      console.log('Logging in with:', email, password);
      // Redirect to dashboard or homepage on success
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      isLoading.value = false;
    }
  });

  return (
    <AuthLayout title="Login">
      <div class="auth-page">
        <h2>Welcome Back</h2>
        <p>Sign in to access your AI models and saved labs.</p>

        {/* Login Form */}
        <LoginForm onSubmit$={handleLogin} isLoading={isLoading.value} />

        {/* Social Login Buttons */}
        <SocialLoginButtons />

        {/* Forgot Password Link */}
        <a href="/auth/forgot-password" class="forgot-password-link">Forgot your password?</a>
      </div>
    </AuthLayout>
  );
});