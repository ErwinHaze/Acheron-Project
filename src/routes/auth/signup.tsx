import { component$, useSignal } from '@builder.io/qwik';
import AuthLayout from '~/components/templates/AuthLayout/AuthLayout';
import SignupForm from '~/components/organisms/SignupForm/SignupForm';

export default component$(() => {
  const isLoading = useSignal(false);

  const handleSignup = $(async (name, email, password) => {
    isLoading.value = true;
    try {
      // Supabase signup logic
      console.log('Signing up with:', name, email, password);
      // Trigger email verification
    } catch (error) {
      console.error('Signup failed:', error);
    } finally {
      isLoading.value = false;
    }
  });

  return (
    <AuthLayout title="Sign Up">
      <div class="auth-page">
        <h2>Create Your Account</h2>
        <p>Join the AI Model Store and start exploring cutting-edge AI tools.</p>

        {/* Signup Form */}
        <SignupForm onSubmit$={handleSignup} isLoading={isLoading.value} />
      </div>
    </AuthLayout>
  );
});