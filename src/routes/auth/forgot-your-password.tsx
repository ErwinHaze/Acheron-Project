import { component$, useSignal } from '@builder.io/qwik';
import AuthLayout from '~/components/templates/AuthLayout/AuthLayout';
import ForgotPasswordForm from '~/components/organisms/ForgotPasswordForm/ForgotPasswordForm';

export default component$(() => {
  const isLoading = useSignal(false);

  const handleForgotPassword = $(async (email) => {
    isLoading.value = true;
    try {
      // Supabase forgot password logic
      console.log('Sending password reset email to:', email);
    } catch (error) {
      console.error('Password reset failed:', error);
    } finally {
      isLoading.value = false;
    }
  });

  return (
    <AuthLayout title="Forgot Your Password?">
      <div class="auth-page">
        <h2>Reset Your Password</h2>
        <p>Enter your email address to receive a password reset link.</p>

        {/* Forgot Password Form */}
        <ForgotPasswordForm onSubmit$={handleForgotPassword} isLoading={isLoading.value} />
      </div>
    </AuthLayout>
  );
});